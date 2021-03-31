from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired


class ArtistForm(FlaskForm):
  name = StringField("Name", validators=[DataRequired()])
  bio = TextAreaField("Biography", validators=[DataRequired()])
  image = StringField("Artist Image", validators=[DataRequired()])
