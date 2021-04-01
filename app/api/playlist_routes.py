from flask import Blueprint
from flask_login import login_required
from app.models import PlaylistTrack, Playlist

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
