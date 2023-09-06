from .db import db
import os
from .db import add_prefix_for_prod
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

readalready = db.Table(
    "readalready",
    db.Model.metadata,
    db.Column("user_id", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id"), ondelete="CASCADE"), primary_key=True),
    db.Column("book_id", db.Integer, db.ForeignKey(add_prefix_for_prod("books.id"), ondelete="CASCADE"), primary_key=True)
)

if environment == "production":
    readalready.schema = SCHEMA