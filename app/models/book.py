from .db import db, environment, SCHEMA
from .readalready import readalready
from .db import add_prefix_for_prod
from flask_login import UserMixin


class Book(db.Model, UserMixin):
    __tablename__ = 'books'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(400), nullable=False)
    author = db.Column(db.String(500), nullable=False)
    page_num = db.Column(db.Integer, nullable=False)
    yr_published = db.Column(db.Integer, nullable=False)
    genre = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    picture = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    # relationship attributes
    user = db.relationship("User", back_populates="books")
    reviews = db.relationship("Review", back_populates="book", cascade="all, delete-orphan")
    tags = db.relationship("Tag", back_populates="book", cascade="all, delete-orphan")
    book_read = db.relationship(
        "User",
        secondary=readalready,
        back_populates="user_read"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "author": self.author,
            "pageNum": self.page_num,
            "yrPublished": self.yr_published,
            "genre": self.genre,
            "description": self.description,
            "picture": self.picture,
            "user": self.user.to_dict_no(),
            "tags": [tag.to_dict() for tag in self.tags],
            "avgRating": self.avgrating
       }
    
    def to_dict_no(self):
        return {
            "id": self.id,
            "title": self.title,
            "author": self.author,
            "pageNum": self.page_num,
            "yrPublished": self.yr_published,
            "genre": self.genre,
            "description": self.description,
            "picture": self.picture,
       }
    
    def avgrating(self):
        li = [review.to_dict()['stars'] for review in self.reviews]
        avg_rating = sum(li) / len(li)
        return avg_rating