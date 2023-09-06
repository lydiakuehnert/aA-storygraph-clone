from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_reviews():
    review1 = Review(
        review='This is a great book!',
        stars=5,
        user_id=2,
        book_id=1,
        date=datetime.utcnow()
    )
    review2 = Review(
        review='I love this book.',
        stars=3,
        user_id=3,
        book_id=3,
        date=datetime.utcnow()
    )
    review3 = Review(
        review='This is a favorite of mine!',
        stars=1,
        user_id=3,
        book_id=2,
        date=datetime.utcnow()
    )
    review4 = Review(
        review='This is a great book!',
        stars=5,
        user_id=2,
        book_id=1,
        date=datetime.utcnow()
    )
    review5 = Review(
        review='I love this book.',
        stars=3,
        user_id=3,
        book_id=3,
        date=datetime.utcnow()
    )
    review6 = Review(
        review='This is a favorite of mine!',
        stars=1,
        user_id=3,
        book_id=2,
        date=datetime.utcnow()
    )

    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)
    db.session.add(review4)
    db.session.add(review5)
    db.session.add(review6)
    db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
