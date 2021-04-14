from flask import Blueprint, session, request
from flask_login import login_required
from app.models import db, Playlist, Artist, Album, Track


search_routes = Blueprint('search', __name__)


@search_routes.route('/<query>/')
@login_required
def find_results(query):

  playlists = Playlist.query.filter(Playlist.name.ilike(f"%{query}%")).all()
  artists = Artist.query.filter(Artist.name.ilike(f"%{query}%")).all()
  albums = Album.query.filter(Album.title.ilike(f"%{query}%")).all()
  tracks = Track.query.filter(Track.title.ilike(f"%{query}%")).all()

  found_pls = [pl.to_search_dict() for pl in playlists]
  found_artists = [artist.to_search_dict() for artist in artists]
  found_albums = [album.to_search_dict() for album in albums]
  found_tracks = [track.to_search_dict() for track in tracks]

  return {"playlists": found_pls,
          "artists": found_artists,
          "albums": found_albums,
          "tracks": found_tracks}
