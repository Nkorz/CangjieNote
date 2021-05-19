import json

with open("./formatted-data/poetry-comment/spy.json", "r") as infile:
    json_dicts = []
    jd = json.load(infile)
    for j in jd:
        json_dicts.append({
            "title": j["title"],
            "poem_id": "",
            "fanyi": j["fanyi"],
            "shangxi": j["shangxi"]
        })
    with open("./formatted-data/poetry-comment/shijing.json", "w") as outfile:
        json.dump(json_dicts, outfile)