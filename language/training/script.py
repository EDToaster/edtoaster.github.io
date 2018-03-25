files = ["random","key","english","spanish","french","german","japanese",
"swahili","mandarin","esperanto","dutch","polish","lojban"];

for file in files:
    with open(file + "_raw.txt") as f:
        content = f.readlines()
    contentstr = ",".join([x.split(",")[0].strip().upper() for x in content if len(x.split(",")[0].strip()) <= 15]);

    with open(file + ".txt", "w") as out:
        out.write(contentstr)
        out.close()
