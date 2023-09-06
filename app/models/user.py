from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .readalready import readalready


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    firstname = db.Column(db.String(100))
    lastname = db.Column(db.String(100))
    profile_pic = db.Column(db.String(255))

    books = db.relationship("Book", back_populates="user", cascade="all, delete-orphan")
    reviews = db.relationship("Review", back_populates="user", cascade="all, delete-orphan")
    tags = db.relationship("Tag", back_populates="user", cascade="all, delete-orphan")
    user_read = db.relationship(
        "Book",
        secondary=readalready,
        back_populates="book_read"
    )

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "firstname": self.firstname,
            "lastname": self.lastname,
            "email": self.email,
            "profile_pic": self.profile_pic,
            "books": [book.to_dict() for book in self.books],
            "reviews": [review.to_dict() for review in self.reviews],
            "books_read": [book.to_dict() for book in self.user_read]
        }
    
    def to_dict_no(self):
        return {
            "id": self.id,
            "username": self.username,
            "firstname": self.firstname,
            "lastname": self.lastname,
            "email": self.email,
            "profile_pic": self.profile_pic
        }
