from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired


class PlaylistTrackForm(FlaskForm):
  track_id = IntegerField("Track Id", validators=[DataRequired()])
  playlist_id = IntegerField("Playlist Id", validators=[DataRequired()])
  order_num = IntegerField("Order Num", validators=[DataRequired()])
