"""Schema patches leves (create_all não altera tabelas existentes)."""

from sqlalchemy import inspect, text
from sqlalchemy.engine import Engine

from app.database import Base

GENERATION_COLUMNS: dict[str, str] = {
    "identity_id": "VARCHAR(64)",
    "batch_id": "VARCHAR(64)",
    "variant": "VARCHAR(64)",
    "product_line": "VARCHAR(32) NOT NULL DEFAULT 'future'",
    "provider": "VARCHAR(64)",
    "model_id": "VARCHAR(128)",
    "prompt_hash": "VARCHAR(64)",
    "status": "VARCHAR(32) NOT NULL DEFAULT 'completed'",
    "error_message": "TEXT",
    "cost_usd_cents": "INTEGER NOT NULL DEFAULT 0",
    "latency_ms": "INTEGER NOT NULL DEFAULT 0",
}


def ensure_schema(engine: Engine) -> None:
    Base.metadata.create_all(bind=engine)
    inspector = inspect(engine)
    tables = set(inspector.get_table_names())

    with engine.begin() as conn:
        if "users" in tables:
            columns = {col["name"] for col in inspector.get_columns("users")}
            if "first_recharge_claimed" not in columns:
                conn.execute(
                    text(
                        "ALTER TABLE users "
                        "ADD COLUMN first_recharge_claimed BOOLEAN NOT NULL DEFAULT FALSE"
                    )
                )

        if "generations" in tables:
            columns = {col["name"] for col in inspector.get_columns("generations")}
            for name, ddl in GENERATION_COLUMNS.items():
                if name not in columns:
                    conn.execute(text(f"ALTER TABLE generations ADD COLUMN {name} {ddl}"))
            # índices úteis (IF NOT EXISTS — Postgres)
            conn.execute(
                text(
                    "CREATE INDEX IF NOT EXISTS ix_generations_identity_id "
                    "ON generations (identity_id)"
                )
            )
            conn.execute(
                text(
                    "CREATE INDEX IF NOT EXISTS ix_generations_batch_id "
                    "ON generations (batch_id)"
                )
            )
