from os import listdir
from os.path import isfile, join
mypath = "C:\\Users\\class\\Desktop\\Git\\edtoaster.github.io\\javascript\\doodle\\data\\"
onlyfiles = [f for f in listdir(mypath) if isfile(join(mypath, f))]

out = [] 
for file in onlyfiles:
    if file.endswith(".bin"):
        file2=file.replace(".bin", "");
        
        out.append( "{name:\"" + file2 + "\"}")
print(",".join(out))
