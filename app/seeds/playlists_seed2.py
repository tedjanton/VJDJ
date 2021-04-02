from app.models import db, Track, Playlist
from datetime import datetime


def playlists_seed2():
  pl2 = Playlist(name="Let's Partayyy",
                 user_id=1,
                 created_at=(datetime.now()))

  pl3 = Playlist(name="She's a VJDJ",
                 user_id=1,
                 created_at=(datetime.now()))

  db.session.add(pl2)
  db.session.add(pl3)
  db.session.commit()


def undo_playlists_seed2():
  db.session.execute('TRUNICATE playlists CASCADE;')
  db.session.commit()
