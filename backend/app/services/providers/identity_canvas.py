"""Renderer determinístico ligado ao seed do Identity Passport (prova de consistência)."""

from __future__ import annotations

import hashlib
import math
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


def _digest(seed: str) -> str:
    return hashlib.sha256(seed.encode("utf-8")).hexdigest()


def _rgb(digest: str, offset: int) -> tuple[int, int, int]:
    return (
        40 + int(digest[offset : offset + 2], 16) % 180,
        40 + int(digest[offset + 2 : offset + 4], 16) % 180,
        40 + int(digest[offset + 4 : offset + 6], 16) % 180,
    )


def render_identity_canvas(
    output_path: Path,
    *,
    seed: str,
    style: str,
    variant: str,
    product_line: str,
    attributes: dict,
    watermark: bool = True,
) -> None:
    """
    PNG determinístico a partir do seed + variant.
    Mesmo seed ⇒ mesma paleta/estrutura; variant muda pose/luz/enquadramento.
    """
    width, height = 768, 1024
    base = _digest(seed)
    var = _digest(f"{seed}:{variant}:{style}")
    skin = _rgb(base, 0)
    hair = _rgb(base, 6)
    accent = _rgb(base, 12)
    bg_a = _rgb(var, 0)
    bg_b = _rgb(var, 8)

    image = Image.new("RGB", (width, height), bg_a)
    draw = ImageDraw.Draw(image)

    for y in range(height):
        t = y / max(height - 1, 1)
        shift = (int(var[0:2], 16) % 40) / 100.0
        r = int(bg_a[0] * (1 - t + shift) + bg_b[0] * (t - shift / 2))
        g = int(bg_a[1] * (1 - t + shift) + bg_b[1] * (t - shift / 2))
        b = int(bg_a[2] * (1 - t + shift) + bg_b[2] * (t - shift / 2))
        draw.line(
            [(0, y), (width, y)],
            fill=(max(0, min(255, r)), max(0, min(255, g)), max(0, min(255, b))),
        )

    angle_bias = (int(var[4:6], 16) - 128) / 128.0
    cx = int(width / 2 + angle_bias * 70)
    head_y = 160 + (int(var[6:8], 16) % 40)
    head_r = 140

    draw.ellipse(
        [cx - head_r - 20, head_y - 30, cx + head_r + 20, head_y + head_r + 80],
        fill=hair,
    )
    draw.ellipse([cx - head_r, head_y, cx + head_r, head_y + head_r * 2], fill=skin)

    eye_gap = 48
    eye_y = head_y + 110
    eye_dx = int(angle_bias * 12)
    draw.ellipse(
        [cx - eye_gap - 16 + eye_dx, eye_y, cx - eye_gap + 16 + eye_dx, eye_y + 22],
        fill=(20, 20, 28),
    )
    draw.ellipse(
        [cx + eye_gap - 16 + eye_dx, eye_y, cx + eye_gap + 16 + eye_dx, eye_y + 22],
        fill=(20, 20, 28),
    )

    body_top = head_y + head_r * 2 - 20
    draw.rounded_rectangle(
        [cx - 120, body_top, cx + 120, height - 80],
        radius=60,
        fill=(max(0, skin[0] - 25), max(0, skin[1] - 25), max(0, skin[2] - 20)),
    )

    nail = accent
    hand_y = body_top + 220 + (int(var[10:12], 16) % 40)
    for sign in (-1, 1):
        hx = cx + sign * 150
        draw.ellipse([hx - 36, hand_y, hx + 36, hand_y + 56], fill=skin)
        for i in range(5):
            nx = hx - 24 + i * 12
            draw.rounded_rectangle([nx, hand_y - 14, nx + 8, hand_y + 2], radius=2, fill=nail)

    if "feet" in variant or "foot" in variant:
        fy = height - 160
        for sign in (-1, 1):
            fx = cx + sign * 70
            draw.ellipse([fx - 50, fy, fx + 50, fy + 90], fill=skin)
            for i in range(5):
                draw.ellipse(
                    [fx - 40 + i * 16, fy - 10, fx - 28 + i * 16, fy + 8],
                    fill=nail,
                )

    ring_r = 28 + (int(base[18:20], 16) % 20)
    for i in range(0, 360, 12):
        rad = math.radians(i + int(base[20:22], 16))
        x = cx + int(math.cos(rad) * ring_r)
        y = head_y + 40 + int(math.sin(rad) * ring_r)
        draw.point((x, y), fill=accent)

    font = ImageFont.load_default()
    age = attributes.get("age") or attributes.get("apparent_age") or "?"
    label = f"ID {seed[:8]} · {variant} · {product_line}"
    draw.text((24, 24), "Astra Identity Canvas", fill=(212, 175, 55), font=font)
    draw.text((24, 44), label, fill=(230, 230, 235), font=font)
    draw.text((24, 64), f"age={age} style={style}", fill=(180, 180, 190), font=font)

    if watermark:
        draw.rectangle([0, height - 64, width, height], fill=(0, 0, 0))
        draw.text(
            (width // 2 - 90, height - 42),
            "ASTRA FASE2 · WATERMARK",
            fill=(6, 182, 212),
            font=font,
        )

    output_path.parent.mkdir(parents=True, exist_ok=True)
    image.save(output_path, format="PNG", optimize=True)
