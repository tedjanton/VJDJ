from flask import Blueprint, session, request
from flask_login import login_required
from app.models import db, PlaylistTrack, Playlist
from app.forms import PlaylistForm, PlaylistTrackForm

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
    return {"errors": "invalid playlist create submission"}


@playlist_routes.route('/<int:id>/edit/', methods=["POST"])
@login_required
def edit_playlist(id):
  pl_tracks = PlaylistTrack.query.filter(PlaylistTrack.playlist_id == id).all();
  req = request.get_json()

  for item in req:
    for pl_track in pl_tracks:
      if item["pl_track_id"] == pl_track.id:
        pl_track.order_num = item["order_num"]

  db.session.commit()
  return {"editedPL": [pl_track.to_dict() for pl_track in pl_tracks]}


@playlist_routes.route('/add/<int:id>/', methods=["POST"])
@login_required
def add_to_playlist(id):
  playlist_tracks = PlaylistTrack.query.filter(PlaylistTrack.playlist_id == id).all()
  req = request.get_json()

  form = PlaylistTrackForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    playlist_track = PlaylistTrack(track_id=form.track_id.data,
                                   playlist_id=form.playlist_id.data,
                                   order_num=len(playlist_tracks) + 1)
    db.session.add(playlist_track)
    db.session.commit()
    playlists = Playlist.query.filter(Playlist.user_id == req["userId"]).all()

    return {'playlists': [playlist.to_pl_name_dict() for playlist in playlists]}
  else:
    return {"errors": form.errors }


@playlist_routes.route('/<int:id>/remove-track/', methods=['POST'])
@login_required
def remove_track(id):
  req = request.get_json()
  pl_tracks = PlaylistTrack.query.filter(PlaylistTrack.playlist_id == id).order_by(PlaylistTrack.order_num).all()
  found = [pl_track for pl_track in pl_tracks if pl_track.order_num == req['order_num']]

  db.session.delete(found[0])
  db.session.commit()

  new_ordered = PlaylistTrack.query.filter(PlaylistTrack.playlist_id == id).order_by(PlaylistTrack.order_num).all()

  i = 0
  while i < len(new_ordered):
    new_ordered[i].order_num = i + 1
    i += 1
  playlist = Playlist.query.get(id)

  db.session.commit()
  return {
    "playlist": playlist.to_pl_name_dict(),
    "tracks": [track.to_dict() for track in new_ordered],
    }


@playlist_routes.route('/')
@login_required
def all_playlists():
  playlists = Playlist.query.order_by(Playlist.created_at).all()

  return {'playlists': [pl.to_name_art_dict() for pl in playlists]}


@playlist_routes.route('/<int:id>/delete/')
@login_required
def delete_playlist(id):
  playlist = Playlist.query.get(id)
  pl_tracks = PlaylistTrack.query.filter(PlaylistTrack.playlist_id == id).all()

  for track in pl_tracks:
    db.session.delete(track)

  db.session.delete(playlist)
  db.session.commit()

  playlists = Playlist.query.order_by(Playlist.created_at).all()
  return {'playlists': [pl.to_name_art_dict() for pl in playlists]}
