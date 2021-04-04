from flask import Blueprint, session, request
from flask_login import login_required
from app.models import db, PlaylistTrack, Playlist
from app.forms import PlaylistForm

playlist_routes = Blueprint('playlists', __name__)


@playlist_routes.route('/<int:id>/')
@login_required
def get_playlist(id):
  tracks = PlaylistTrack.query.filter(PlaylistTrack.playlist_id == id).order_by(PlaylistTrack.order_num).all()
  playlist = Playlist.query.get(id)
  return {
    "playlist": playlist.to_pl_name_dict(),
    "tracks": [track.to_dict() for track in tracks],
    }


@playlist_routes.route('/create/', methods=["POST"])
@login_required
def create_playlist():
  form = PlaylistForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    pl = Playlist(name=form.name.data,
                      user_id=form.user_id.data,
                      created_at=form.created_at.data)

    db.session.add(pl)
    db.session.commit()
    return pl.to_pl_name_dict()
  else:
    return {"errors": "invalid submission"}


@playlist_routes.route('/<int:id>/edit/', methods=["POST"])
@login_required
def edit_playlist(id):
  pl_tracks = PlaylistTrack.query.filter(PlaylistTrack.playlist_id == id).all();
  req = request.get_json()

  new_list = []

  print("PLTRACKSSSSSSSSSSSS", [pl_track.track_id for pl_track in pl_tracks])
  print("REQQQQQQQQQQQQQQQ", [item["track_id"] for item in req])

  i = 0
  while i < len(req):
    for pl_track in pl_tracks:
      if req[i]["track_id"] == pl_track.track_id:
        new_list.append(pl_track)
    i += 1

  y = 0
  while y < len(new_list):
    new_list[y].order_num = y + 1
    y += 1

  db.session.commit()
  return {"editedPL": [pl_track.to_dict() for pl_track in pl_tracks]}
