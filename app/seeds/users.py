from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', firstname='John', lastname='Smith', profile_pic='https://www.freepnglogos.com/uploads/dog-png/bow-wow-gourmet-dog-treats-are-healthy-natural-low-4.png')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', firstname='Marnie', lastname='Smith', profile_pic='https://img.freepik.com/free-photo/cute-shepherd-dog-posing-isolated-white-background_155003-46179.jpg')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', firstname='Bobbie', lastname='Smith', profile_pic='https://e7.pngegg.com/pngimages/552/1/png-clipart-dogs-dogs-thumbnail.png')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.commit()
    all_users = [demo, marnie, bobbie]
    return all_users


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()