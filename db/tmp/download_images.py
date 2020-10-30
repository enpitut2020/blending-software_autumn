import pandas as pd
import urllib.request
import time
import os

book_info = pd.read_csv("japanese_novel.csv", sep=";").dropna()

print("----downloading----")
for url, title in zip(book_info["imageLink"].values, book_info["title"].values):
    print(f"- title: {title}, url: {url}")
    with urllib.request.urlopen(url) as web_file:
        data = web_file.read()
        with open("images/"+title+".png", "wb") as image_file:
            image_file.write(data)
    time.sleep(1)
print("----done----")