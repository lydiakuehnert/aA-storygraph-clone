from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin


class Tag(db.Model, UserMixin):
    __tablename__ = 'tags'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    book_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("books.id")), nullable=False)

    user = db.relationship("User", back_populates="tags")
    book = db.relationship("Book", back_populates="tags")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "user": self.user.to_dict_no(),
            "book": self.book.to_dict_no()
       }
