from app.models import db, readalready, environment, SCHEMA
from sqlalchemy.sql import text

def undo_readalready():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.readalready RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM readalready"))

    db.session.commit()