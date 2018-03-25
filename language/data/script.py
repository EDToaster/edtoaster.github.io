files = ["english"];

for file in files:
    with open(file + "_raw.txt") as f:
        content = f.readlines()
    contentstr = ",".join([x.strip() for x in content if len(x) <= 15]);

    with open(file + ".txt", "w") as out:
        out.write(contentstr)
        out.close()
