from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired


class AlbumForm(FlaskForm):
  title = StringField("Title", validators=[DataRequired()])
  year = IntegerField("Year Released", validators=[DataRequired()])
  art_src = StringField("Album Art", validators=[DataRequired()])
  artist_id = IntegerField("Artist Id", validators=[DataRequired()])
