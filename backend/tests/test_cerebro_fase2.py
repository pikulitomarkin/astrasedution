"""Testes unitários Fase 2 — Cérebro / seed / prompt."""

from app.services.cerebro import _seed_to_int, build_prompt


def test_seed_to_int_stable():
    a = _seed_to_int("abcdef0123456789")
    b = _seed_to_int("abcdef0123456789")
    assert a == b
    assert 0 <= a < 2**31 - 1


def test_build_prompt_maps_numeric_ethnicity_and_hair():
    prompt = build_prompt(
        product_line="future",
        style="portrait_front",
        variant="front_neutral",
        attributes={
            "apparent_age": 28,
            "ethnicity": 80,
            "hair_length": 90,
            "makeup_intensity": 40,
            "height_cm": 172,
        },
        seed="deadbeefcafebabe",
    )
    assert "deep skin" in prompt
    assert "very long hair" in prompt
    assert "apparent age 28" in prompt
    assert "height 172cm" in prompt
    assert "HeyGen-quality" in prompt


def test_build_prompt_uses_string_hair():
    prompt = build_prompt(
        product_line="seduction",
        style="detail_hands",
        variant="hands_rest",
        attributes={"hair": "long, voluminous", "ethnicity": "medium", "age": 30},
        seed="1122334455667788",
    )
    assert "long, voluminous hair" in prompt
    assert "non-juvenile" in prompt
