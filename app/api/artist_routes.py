from flask import Blueprint, session, request
from flask_login import login_required
from app.models import db, Artist, Track

artist_routes = Blueprint('artists', __name__)


@artist_routes.route('/')
@login_required
def get_artists():
  artists = Artist.query.order_by(Artist.name).all()

  return {"artists": [artist.to_no_tracks_dict() for artist in artists]}


@artist_routes.route('/<int:id>/')
@login_required
def get_artist_content(id):
  artist = Artist.query.get(id)

  return artist.to_dict()
