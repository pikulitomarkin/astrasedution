import hashlib
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


def _seed_palette(seed: str) -> tuple[tuple[int, int, int], tuple[int, int, int]]:
    digest = hashlib.sha256(seed.encode()).hexdigest()
    r1, g1, b1 = int(digest[0:2], 16), int(digest[2:4], 16), int(digest[4:6], 16)
    r2, g2, b2 = int(digest[6:8], 16), int(digest[8:10], 16), int(digest[10:12], 16)
    return (20 + r1 % 80, 20 + g1 % 60, 40 + b1 % 80), (80 + r2 % 120, 60 + g2 % 100, 20 + b2 % 60)


def create_teaser_image(output_path: Path, style: str, seed: str) -> None:
    width, height = 768, 1024
    top, bottom = _seed_palette(seed)

    image = Image.new("RGB", (width, height), top)
    draw = ImageDraw.Draw(image)

    for y in range(height):
        ratio = y / height
        r = int(top[0] * (1 - ratio) + bottom[0] * ratio)
        g = int(top[1] * (1 - ratio) + bottom[1] * ratio)
        b = int(top[2] * (1 - ratio) + bottom[2] * ratio)
        draw.line([(0, y), (width, y)], fill=(r, g, b))

    # Silhueta lifestyle (placeholder Fase 1 — substituído por Flux na Fase 2)
    draw.ellipse([220, 120, 548, 480], fill=(30, 28, 35))
    draw.rounded_rectangle([250, 420, 518, 900], radius=80, fill=(45, 42, 52))
    draw.ellipse([180, 500, 320, 700], fill=(35, 33, 40))
    draw.ellipse([448, 500, 588, 700], fill=(35, 33, 40))

    font = ImageFont.load_default()
    title = "Astra Seduction"
    subtitle = f"Teaser · {style.replace('_', ' ').title()}"
    draw.text((36, 36), title, fill=(212, 175, 55), font=font)
    draw.text((36, 56), subtitle, fill=(200, 200, 210), font=font)

    # Watermark diagonal
    watermark = "Astra Free"
    for i in range(-2, 6):
        x = i * 180
        y = height - 120 - (i * 40)
        draw.text((x, y), watermark, fill=(255, 255, 255, 128), font=font)

    # Faixa inferior watermark
    draw.rectangle([0, height - 72, width, height], fill=(0, 0, 0, 180))
    draw.text((width // 2 - 40, height - 48), "ASTRA FREE · WATERMARK", fill=(6, 182, 212), font=font)

    output_path.parent.mkdir(parents=True, exist_ok=True)
    image.save(output_path, format="PNG", optimize=True)
