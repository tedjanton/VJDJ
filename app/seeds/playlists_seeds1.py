from app.models import db, Track, Playlist
from datetime import datetime


def playlists_seed1():
  pl1 = Playlist(name="2021 Summer Bops",
                 user_id=1,
                 created_at=(datetime.now()))

  db.session.add(pl1)
  db.session.commit()


def undo_playlists_seed1():
  db.session.execute('TRUNICATE playlists CASCADE;')
  db.session.commit()
