import json

def cut_zhushi(zhushi):
    flag = False
    last_dot = -1
    last_last_dot = 0
    res = []
    for idx, c in enumerate(zhushi):
        if c == "：":
            if flag:
                res.append(zhushi[last_last_dot:last_dot])
                last_last_dot = last_dot + 1
            flag = False
        elif c == "。":
            last_dot = idx
            flag = True
        elif c in ["“", "”", "》", "《"]:
            flag = False
    else:
        res.append(zhushi[last_last_dot:-1])
    return res

with open("./formatted-data/poetry-comment/database_export-R5rzpSN9aTaO.json", "r") as in_file:
    json_dicts = json.load(in_file)
    for idx, json_dict in enumerate(json_dicts):
        fanyis = json_dict["fanyi"]
        json_dict["fanyi"] = []
        json_dict["zhushi"] = []
        for fanyi in fanyis:
            fanyi = fanyi.split("▲")[0]
            temp = fanyi.split("注释")
            if len(temp) == 1:
                fanyi = temp[0]
            if len(temp) >= 2:
                fanyi = temp[-2]
                zhushi = temp[-1]
                json_dict["zhushi"].append(cut_zhushi(zhushi))
            json_dict["fanyi"].append(fanyi.split("译文")[-1])
        json_dicts[idx] = json_dict
    with open("./formatted-data/poetry-comment/database_export-R5rzpSN9aTaO_formatted.json", "w") as out_file:
        json.dump(json_dicts, out_file)