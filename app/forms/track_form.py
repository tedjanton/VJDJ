from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired


class TrackForm(FlaskForm):
  title = StringField('Track', validators=[DataRequired()])
  track_num = IntegerField('Track Number', validators=[DataRequired()])
  num_plays = IntegerField('Number of Plays', validators=[DataRequired()])
  audio_src = StringField('Audio Source', validators=[DataRequired()])
  vid_src = StringField('Video Source', validators=[DataRequired()])
  album_id = IntegerField('Album Id', validators=[DataRequired()])
