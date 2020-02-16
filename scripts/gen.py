# Generates a background for my website (paper texture)
from PIL import Image
import random
 
def random_grey(lo, hi):
    return (random.randint(lo, hi), random.randint(lo, hi), random.randint(lo, hi))

dimensions = (256, 256)
# array = [random_grey(0xea, 0xf5) for i in range(dimensions[0] * dimensions[1])]
array = [random_grey(0xef, 0xfa) for i in range(dimensions[0] * dimensions[1])]

img = Image.new("RGB", size=dimensions)
img.putdata(array)

img.save("../assets/background.png")