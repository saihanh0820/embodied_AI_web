import math
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


source = Path(sys.argv[1])
target = Path(sys.argv[2])
files = sorted(source.glob("*"))
tile_width = 280
tile_height = 210
columns = 4
rows_per_sheet = 5
font = ImageFont.load_default()

target.mkdir(parents=True, exist_ok=True)
for sheet_index in range(math.ceil(len(files) / (columns * rows_per_sheet))):
    selection = files[sheet_index * columns * rows_per_sheet:(sheet_index + 1) * columns * rows_per_sheet]
    sheet = Image.new("RGB", (tile_width * columns, tile_height * rows_per_sheet), "#e9edf4")
    draw = ImageDraw.Draw(sheet)
    for index, file in enumerate(selection):
        image = Image.open(file).convert("RGB")
        image.thumbnail((tile_width - 20, tile_height - 48))
        x = (index % columns) * tile_width
        y = (index // columns) * tile_height
        image_x = x + (tile_width - image.width) // 2
        image_y = y + 8 + (tile_height - 48 - image.height) // 2
        sheet.paste(image, (image_x, image_y))
        draw.text((x + 8, y + tile_height - 34), file.stem[:12], fill="#101828", font=font)
        draw.text((x + 8, y + tile_height - 20), f"{Image.open(file).width}x{Image.open(file).height}", fill="#667085", font=font)
    sheet.save(target / f"contact-{sheet_index + 1}.jpg", quality=88)

print(f"Created {math.ceil(len(files) / (columns * rows_per_sheet))} contact sheets")
