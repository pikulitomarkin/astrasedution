#!/usr/bin/env python3
"""Smoke Fase 2 dentro do container API."""
from __future__ import annotations

import json
import urllib.error
import urllib.request

from app.database import SessionLocal
from app import models

BASE = "http://127.0.0.1:8000/api/v1"
EMAIL = "fase2smoke@example.com"
PASSWORD = "Test123456"


def req(method: str, path: str, body=None, token=None):
    data = None if body is None else json.dumps(body).encode()
    headers = {"Content-Type": "application/json"}
    if token:
        headers["Authorization"] = f"Bearer {token}"
    request = urllib.request.Request(BASE + path, data=data, headers=headers, method=method)
    try:
        with urllib.request.urlopen(request, timeout=180) as resp:
            return resp.status, json.loads(resp.read().decode())
    except urllib.error.HTTPError as exc:
        raw = exc.read().decode()
        try:
            payload = json.loads(raw)
        except Exception:
            payload = {"raw": raw}
        return exc.code, payload


def cleanup():
    db = SessionLocal()
    user = db.query(models.User).filter(models.User.email == EMAIL).first()
    if user:
        db.query(models.Generation).filter(models.Generation.user_id == user.id).delete()
        db.query(models.ConsistencyBatch).filter(models.ConsistencyBatch.user_id == user.id).delete()
        db.query(models.IdentityPassport).filter(models.IdentityPassport.user_id == user.id).delete()
        db.delete(user)
        db.commit()
    db.close()


def main():
    cleanup()
    status, reg = req(
        "POST",
        "/auth/register",
        {"name": "Fase2 Smoke", "email": EMAIL, "password": PASSWORD},
    )
    print("register", status, list(reg.keys()))
    assert status in (200, 201), reg
    token = reg["tokens"]["access_token"]

    db = SessionLocal()
    user = db.query(models.User).filter(models.User.email == EMAIL).one()
    if hasattr(user, "email_verified"):
        user.email_verified = True
    if hasattr(user, "is_verified"):
        user.is_verified = True
    db.commit()
    credits_before = user.credits
    db.close()
    print("credits_before", credits_before)

    status, identity = req(
        "POST",
        "/identities",
        {
            "name": "Twin Smoke",
            "product_line": "future",
            "tier": "preferencial",
            "apparent_age": 28,
            "consent_synthetic_only": True,
            "consent_no_real_person": True,
            "attributes": {
                "hair": "long, voluminous",
                "ethnicity": "medium",
                "height_cm": 172,
            },
        },
        token,
    )
    print(
        "identity",
        status,
        {k: identity.get(k) for k in ("id", "seed", "apparent_age", "product_line")},
    )
    assert status in (200, 201), identity
    identity_id = identity["id"]

    status, battery = req(
        "POST",
        f"/identities/{identity_id}/consistency-battery",
        {"max_variants": 12},
        token,
    )
    summary = {k: battery.get(k) for k in battery if k != "generations"}
    print("battery", status, summary)
    assert status == 200, battery
    assert battery.get("variant_count") == 12, battery
    assert battery.get("success_count", 0) >= 1, battery
    assert battery.get("credits_remaining") == credits_before - 1, battery

    status, teaser = req(
        "POST",
        "/generate/teaser",
        {
            "style": "solo_lifestyle",
            "identity_id": identity_id,
            "variant": "front_neutral",
        },
        token,
    )
    generation = teaser.get("generation") or teaser
    print("teaser", status, {k: generation.get(k) for k in ("id", "identity_id", "provider", "status")})
    assert status == 200, teaser
    assert generation.get("identity_id") == identity_id, teaser

    status, blocked = req(
        "POST",
        "/identities",
        {
            "name": "Bad",
            "product_line": "future",
            "tier": "experimental",
            "apparent_age": 16,
            "consent_synthetic_only": True,
            "consent_no_real_person": True,
            "attributes": {},
        },
        token,
    )
    print("juvenile", status, blocked)
    assert status == 422, blocked
    print("ALL_SMOKE_OK")


if __name__ == "__main__":
    main()
