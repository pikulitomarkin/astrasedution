from __future__ import annotations

import threading
from dataclasses import dataclass
from time import monotonic

from fastapi import Depends, HTTPException, Request, status


@dataclass
class _Bucket:
    window_start: float
    count: int


class InMemoryRateLimiter:
    def __init__(self) -> None:
        self._buckets: dict[str, dict[str, _Bucket]] = {}
        self._lock = threading.Lock()

    def check(self, key: str, scope: str, limit: int, window_seconds: int) -> tuple[bool, int]:
        now = monotonic()
        with self._lock:
            scope_buckets = self._buckets.setdefault(scope, {})
            bucket = scope_buckets.get(key)
            if bucket is None or now - bucket.window_start >= window_seconds:
                scope_buckets[key] = _Bucket(window_start=now, count=1)
                return True, 0
            if bucket.count >= limit:
                retry_after = int(window_seconds - (now - bucket.window_start)) + 1
                return False, max(1, retry_after)
            bucket.count += 1
            return True, 0


limiter = InMemoryRateLimiter()


def client_ip(request: Request) -> str:
    forwarded = request.headers.get("x-forwarded-for")
    if forwarded:
        return forwarded.split(",")[0].strip()
    if request.client and request.client.host:
        return request.client.host
    return "unknown"


def rate_limit(scope: str, limit: int, window_seconds: int):
    def dependency(request: Request) -> None:
        allowed, retry_after = limiter.check(
            client_ip(request),
            scope,
            limit,
            window_seconds,
        )
        if not allowed:
            raise HTTPException(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                detail=f"Muitas tentativas. Aguarde {retry_after}s e tente novamente.",
                headers={"Retry-After": str(retry_after)},
            )

    return Depends(dependency)
