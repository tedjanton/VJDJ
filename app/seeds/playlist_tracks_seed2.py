from app.models import db, PlaylistTrack


def playlist_tracks_seed2():
  track1 = PlaylistTrack(order_num=1, track_id=13, playlist_id=2)
  track2 = PlaylistTrack(order_num=2, track_id=9, playlist_id=2)
  track3 = PlaylistTrack(order_num=3, track_id=3, playlist_id=2)
  track4 = PlaylistTrack(order_num=4, track_id=5, playlist_id=2)
  track5 = PlaylistTrack(order_num=5, track_id=10, playlist_id=2)
  track6 = PlaylistTrack(order_num=6, track_id=7, playlist_id=2)
  track7 = PlaylistTrack(order_num=7, track_id=12, playlist_id=2)

  track8 = PlaylistTrack(order_num=1, track_id=11, playlist_id=3)
  track9 = PlaylistTrack(order_num=2, track_id=2, playlist_id=3)
  track10 = PlaylistTrack(order_num=3, track_id=8, playlist_id=3)

  db.session.add(track1)
  db.session.add(track2)
  db.session.add(track3)
  db.session.add(track4)
  db.session.add(track5)
  db.session.add(track6)
  db.session.add(track7)
  db.session.add(track8)
  db.session.add(track9)
  db.session.add(track10)
  db.session.commit()


def undo_playlist_tracks_seed2():
  db.session.execute('TRUNCATE playlist_tracks CASCADE;')
  db.session.commit()
