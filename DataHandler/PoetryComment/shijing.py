from selenium import webdriver
import json

driver = webdriver.Safari()
driver.get("https://so.gushiwen.cn/gushi/shijing.aspx")
typeconts = driver.find_elements_by_class_name("typecont")
json_dicts = []

for chapter in typeconts:
    poems = chapter.find_elements_by_tag_name("a")
    for poem in poems:
        title = poem.text
        shangxi = []
        fanyi = []
        href_link = poem.get_attribute("href")
        if href_link:
            driver.get(href_link)
            sons = driver.find_elements_by_class_name("sons")
            for son in sons:
                _id = son.get_attribute("id")
                if _id.startswith("fanyiquan"):
                    fanyi.append(son.text)
                if _id.startswith("shangxiquan"):
                    shangxi.append(son.text)
                try:
                    _as = son.find_elements_by_tag_name("a")
                    for a in _as:
                        print(a.text)
                        if a.text.startswith("展开"):
                            driver.execute_script("arguments[0].click();", a)
                            break
                except Exception as e:
                    continue
        json_dicts.append({
            "title": title,
            "poem_id": "",
            "fanyi": fanyi,
            "shangxi": shangxi
        })
        driver.back()
with open("./spy.json", "w") as out_f:
    json.dump(json_dicts, out_f)