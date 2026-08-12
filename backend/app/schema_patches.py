"""Schema patches leves (create_all não altera tabelas existentes)."""

from sqlalchemy import inspect, text
from sqlalchemy.engine import Engine

from app.database import Base


def ensure_schema(engine: Engine) -> None:
    Base.metadata.create_all(bind=engine)
    inspector = inspect(engine)
    if "users" not in inspector.get_table_names():
        return

    columns = {col["name"] for col in inspector.get_columns("users")}
    with engine.begin() as conn:
        if "first_recharge_claimed" not in columns:
            conn.execute(
                text(
                    "ALTER TABLE users "
                    "ADD COLUMN first_recharge_claimed BOOLEAN NOT NULL DEFAULT FALSE"
                )
            )
