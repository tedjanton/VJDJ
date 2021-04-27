from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField
from wtforms.validators import DataRequired, Email, ValidationError, Length, EqualTo
from app.models import User


def email_exists(form, field):
    print("Checking if email exits", field.data)
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError("Email is already registered.")

def username_exists(form, field):
    print("Checking if username exits", field.data)
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError("Username is already registered.")


class SignUpForm(FlaskForm):

    username = StringField('Username', [DataRequired(), Length(min=4, max=25, message='Username must be between 4 and 25 characters.'), username_exists])
    first_name = StringField('First Name', [DataRequired(), Length(min=2, max=25, message='First name must be between 4 and 25 characters.')])
    last_name = StringField('Last Name', [DataRequired(), Length(min=2, max=25, message='Last name must be between 4 and 25 characters.')])
    email = StringField('Email', [DataRequired(), Length(min=6, max=50, message='Email must be between 6 and 50 characters.'), email_exists])
    password = PasswordField('Password', [DataRequired(), Length(min=6, max=30, message='Password must be between 6 and 30 characters.')])
