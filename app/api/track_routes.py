from flask import Blueprint
from flask_login import login_required
from app.models import Track

track_routes = Blueprint('tracks', __name__)


@track_routes.route('/popular/')
@login_required
def pop_tracks():
  tracks = Track.query.order_by(Track.num_plays.desc()).limit(5)
  return {'pop_tracks': [track.to_dict() for track in tracks]}
