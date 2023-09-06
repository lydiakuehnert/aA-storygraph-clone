from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin


class Review(db.Model, UserMixin):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    review = db.Column(db.Text, nullable=False)
    stars = db.Column(db.Integer, nullable=False)
    date = db.Column(db.Date, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    book_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("books.id")), nullable=False)

    # relationship attributes
    user = db.relationship("User", back_populates="reviews")
    book = db.relationship("Book", back_populates="reviews")

    def to_dict(self):
        return {
            "id": self.id,
            "review": self.review,
            "stars": self.stars,
            "date": self.date,
            "user": self.user.to_dict_no(),
            "book": self.book.to_dict_no()
       }
