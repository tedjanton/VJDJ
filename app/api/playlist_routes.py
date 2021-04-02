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
