from app.models import db, Track, Playlist, User
from datetime import datetime


def playlists_seed2():
  pl2 = Playlist(name="Let's Partayyy",
                 user_id=1,
                 created_at=(datetime.now()),
                 user_follows=[User.query.get(2), User.query.get(3), User.query.get(4)])

  pl3 = Playlist(name="She's a VJDJ",
                 user_id=1,
                 created_at=(datetime.now()),
                 user_follows=[User.query.get(5), User.query.get(6)])

  pl4 = Playlist(name="Yas Qween",
                 user_id=2,
                 created_at=(datetime.now()),
                 user_follows=[User.query.get(1), User.query.get(3), User.query.get(8)])

  db.session.add(pl2)
  db.session.add(pl3)
  db.session.add(pl4)
  db.session.commit()


def undo_playlists_seed2():
  db.session.execute('TRUNCATE playlists CASCADE;')
  db.session.commit()
