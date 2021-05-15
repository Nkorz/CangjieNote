import os
import json

project_name = "CangjieNote"
path = os.getcwd()
root_path = path[0:path.index(project_name) + len(project_name)]
tgt_dir_path = os.path.join(root_path, 
                            "formatted-data",
                            "poetry",
                            "shijing")
src_dir_path = os.path.join(root_path, 
                            "data",
                            "poetry",
                            "shijing")
tgt_path = os.path.join(tgt_dir_path, "shijing.json")
src_path = os.path.join(src_dir_path, "shijing.json")

if not os.path.exists(tgt_dir_path):
    os.makedirs(tgt_dir_path)

with open(src_path, "r") as src_file:
    src = json.load(src_file)
    out_arr = []
    for poem in src:
        out_arr.append({
            "flag": "诗经",
            "title": poem["title"],
            "content": poem["content"],
            "additional_data": {
                "chapter": poem["chapter"],
                "section": poem["section"]
            }
        })
    with open(tgt_path, "w") as tgt_file:
        json.dump(out_arr, tgt_file)
