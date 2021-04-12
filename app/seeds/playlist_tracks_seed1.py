from app.models import db, PlaylistTrack


def playlist_tracks_seed1():
  track1 = PlaylistTrack(order_num=1, track_id=3, playlist_id=1)
  track2 = PlaylistTrack(order_num=2, track_id=12, playlist_id=1)
  track3 = PlaylistTrack(order_num=3, track_id=35, playlist_id=1)
  track4 = PlaylistTrack(order_num=4, track_id=4, playlist_id=1)
  track5 = PlaylistTrack(order_num=5, track_id=24, playlist_id=1)
  track6 = PlaylistTrack(order_num=6, track_id=7, playlist_id=1)
  track7 = PlaylistTrack(order_num=7, track_id=40, playlist_id=1)

  db.session.add(track1)
  db.session.add(track2)
  db.session.add(track3)
  db.session.add(track4)
  db.session.add(track5)
  db.session.add(track6)
  db.session.add(track7)
  db.session.commit()


def undo_playlist_tracks_seed1():
  db.session.execute('TRUNCATE playlist_tracks CASCADE;')
  db.session.commit()
