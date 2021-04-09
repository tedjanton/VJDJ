from flask import Blueprint, session, request
from flask_login import login_required
from app.models import db, Artist, Track

artist_routes = Blueprint('artists', __name__)

# def quick_sort(tracks):
#   if len(tracks) <= 1:
#     return tracks

#   pivot = tracks.pop(0);
#   left = [track for track in tracks if track.num_plays < pivot.num_plays]
#   right = [track for track in tracks if track.num_plays >= pivot.num_plays]

#   left_sorted = quick_sort(left)
#   right_sorted = quick_sort(right)

#   data = [*left_sorted, pivot, *right_sorted]
#   flat_list = []
#   def flatten_list(dataset):
#     for track in dataset:
#       if type(track) == list:
#         flatten_list(track)
#       else:
#         flat_list.append(track)
#   flatten_list(data)
#   return flat_list

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
