from app.models import db, Book, environment, SCHEMA
from sqlalchemy.sql import text
from random import choice, sample, randint


def seed_books(all_users):
    book1 = Book(
        title='The Sand of Time',
        author='John Doe',
        page_num='300',
        yr_published='2007',
        genre='fiction',
        description='Roshar is a world of stone and storms. Uncanny tempests of incredible power sweep across the rocky terrain so frequently that they have shaped ecology and civilization alike. Animals hide in shells, trees pull in branches, and grass retracts into the soilless ground. Cities are built only where the topography offers shelter.',
        picture='https://edit.org/images/cat/book-covers-big-2019101610.jpg',
        user_id=1,
        book_read=sample(all_users, randint(0, len(all_users)))
        )
    book2 = Book(
        title='The Rock of Time',
        author='John Doe',
        page_num='500',
        yr_published='2010',
        genre='history',
        description='It has been centuries since the fall of the ten consecrated orders known as the Knights Radiant, but their Shardblades and Shardplate remain: mystical swords and suits of armor that transform ordinary men into near-invincible warriors. Men trade kingdoms for Shardblades. Wars were fought for them, and won by them.',
        picture='https://template.canva.com/EADaopxBna4/1/0/251w-ujD6UPGa9hw.jpg',
        user_id=2,
        book_read=sample(all_users, randint(0, len(all_users)))
        )
    book3 = Book(
        title='The Stone of Time',
        author='John Doe',
        page_num='1100',
        yr_published='1997',
        genre='autobiography',
        description='It has been centuries since the fall of the ten consecrated orders known as the Knights Radiant, but their Shardblades and Shardplate remain: mystical swords and suits of armor that transform ordinary men into near-invincible warriors. Men trade kingdoms for Shardblades. Wars were fought for them, and won by them.',
        picture='https://imgv3.fotor.com/images/gallery/Fiction-Book-Covers.jpg',
        user_id=3,
        book_read=sample(all_users, randint(0, len(all_users)))
        )
    book4 = Book(
        title='The Sand of Time',
        author='John Doe',
        page_num='300',
        yr_published='2007',
        genre='fiction',
        description='Roshar is a world of stone and storms. Uncanny tempests of incredible power sweep across the rocky terrain so frequently that they have shaped ecology and civilization alike. Animals hide in shells, trees pull in branches, and grass retracts into the soilless ground. Cities are built only where the topography offers shelter.',
        picture='https://edit.org/images/cat/book-covers-big-2019101610.jpg',
        user_id=1,
        book_read=sample(all_users, randint(0, len(all_users)))
        )
    book5 = Book(
        title='The Rock of Time',
        author='John Doe',
        page_num='500',
        yr_published='2010',
        genre='history',
        description='It has been centuries since the fall of the ten consecrated orders known as the Knights Radiant, but their Shardblades and Shardplate remain: mystical swords and suits of armor that transform ordinary men into near-invincible warriors. Men trade kingdoms for Shardblades. Wars were fought for them, and won by them.',
        picture='https://template.canva.com/EADaopxBna4/1/0/251w-ujD6UPGa9hw.jpg',
        user_id=2,
        book_read=sample(all_users, randint(0, len(all_users)))
        )
    book6 = Book(
        title='The Stone of Time',
        author='John Doe',
        page_num='1100',
        yr_published='1997',
        genre='autobiography',
        description='It has been centuries since the fall of the ten consecrated orders known as the Knights Radiant, but their Shardblades and Shardplate remain: mystical swords and suits of armor that transform ordinary men into near-invincible warriors. Men trade kingdoms for Shardblades. Wars were fought for them, and won by them.',
        picture='https://imgv3.fotor.com/images/gallery/Fiction-Book-Covers.jpg',
        user_id=3,
        book_read=sample(all_users, randint(0, len(all_users)))
        )
    book7 = Book(
        title='The Sand of Time',
        author='John Doe',
        page_num='300',
        yr_published='2007',
        genre='fiction',
        description='Roshar is a world of stone and storms. Uncanny tempests of incredible power sweep across the rocky terrain so frequently that they have shaped ecology and civilization alike. Animals hide in shells, trees pull in branches, and grass retracts into the soilless ground. Cities are built only where the topography offers shelter.',
        picture='https://edit.org/images/cat/book-covers-big-2019101610.jpg',
        user_id=1,
        book_read=sample(all_users, randint(0, len(all_users)))
        )
    book8 = Book(
        title='The Rock of Time',
        author='John Doe',
        page_num='500',
        yr_published='2010',
        genre='history',
        description='It has been centuries since the fall of the ten consecrated orders known as the Knights Radiant, but their Shardblades and Shardplate remain: mystical swords and suits of armor that transform ordinary men into near-invincible warriors. Men trade kingdoms for Shardblades. Wars were fought for them, and won by them.',
        picture='https://template.canva.com/EADaopxBna4/1/0/251w-ujD6UPGa9hw.jpg',
        user_id=2,
        book_read=sample(all_users, randint(0, len(all_users)))
        )
    book9 = Book(
        title='The Stone of Time',
        author='John Doe',
        page_num='1100',
        yr_published='1997',
        genre='autobiography',
        description='It has been centuries since the fall of the ten consecrated orders known as the Knights Radiant, but their Shardblades and Shardplate remain: mystical swords and suits of armor that transform ordinary men into near-invincible warriors. Men trade kingdoms for Shardblades. Wars were fought for them, and won by them.',
        picture='https://imgv3.fotor.com/images/gallery/Fiction-Book-Covers.jpg',
        user_id=3,
        book_read=sample(all_users, randint(0, len(all_users)))
        )
    


    all_books = [book1, book2, book3, book4, book5, book6, book7, book8, book9]
    add_books = [db.session.add(book) for book in all_books]
    db.session.commit()
    return all_books


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_books():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.books RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM books"))

    db.session.commit()