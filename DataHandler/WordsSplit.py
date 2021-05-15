import json
import os

project_name = "CangjieNote"
path = os.getcwd()
root_path = path[0:path.index(project_name) + len(project_name)]
tgt_dir_path = os.path.join(root_path, 
                            "formatted-data",
                            "chaizi")
src_dir_path = os.path.join(root_path, 
                            "data",
                            "chaizi")
tgt_path = os.path.join(tgt_dir_path, "chaizi-jt.txt")
src_path = os.path.join(src_dir_path, "chaizi-jt.txt")

if not os.path.exists(tgt_dir_path):
    os.mkdir(tgt_dir_path)

with open(src_path, "r") as src_file:
    lines = src_file.readlines()
    json_arr = []
    for _id, line in enumerate(lines):
        parts = line.split("\t")
        char = parts[0]
        radicals = [parts[i].split(" ") for i in range(1, len(parts))]
        json_arr.append({
            ### 不设置 _id 交给小程序自动设置
            # "_id": _id,
            "character": char,
            "radicals": radicals
        })
    with open(tgt_path, "w") as tgt_file:
        json.dump(json_arr, tgt_file)
    