import random

rpath = './japanese_novel.csv'
wpath = './japanese_novel.csv'

with open(rpath) as f:
  lines = f.readlines()

header = lines[0]
lines.pop(0)
random.shuffle(lines)
lines = [header] + lines

with open(wpath, 'w') as f:
  f.writelines(lines)