from werkzeug.security import generate_password_hash
from app.models import db, User
from faker import Faker
fake = Faker()


def generate_users():
    users = []
    i = 0
    while i < 10:
        user = User(username=fake.user_name(),
                    first_name=fake.first_name(),
                    last_name=fake.last_name(),
                    email=fake.email(),
                    password=fake.password())
        users.append(user)
        i += 1
    for user in users:
        db.session.add(user)


# Adds a demo user, you can add other users here if you want
def seed_users():

    demo = User(username='demo-lition',
                first_name='Demo',
                last_name='Lition',
                email='demo@lition.com',
                password='password')

    db.session.add(demo)
    generate_users()
    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_users():
    db.session.execute('TRUNCATE users CASCADE;')
    db.session.commit()
