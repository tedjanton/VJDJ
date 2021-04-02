from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateTimeField
from wtforms.validators import DataRequired
from datetime import datetime


class PlaylistForm(FlaskForm):
  name = StringField("Name", validators=[DataRequired()])
  user_id = IntegerField("User Id", validators=[DataRequired()])
  created_at = DateTimeField("Created At", default=datetime.now())
