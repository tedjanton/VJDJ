from app.models import db, PlaylistTrack


def playlist_tracks_seed2():
  track1 = PlaylistTrack(order_num=1, track_id=13, playlist_id=2)
  track2 = PlaylistTrack(order_num=2, track_id=34, playlist_id=2)
  track3 = PlaylistTrack(order_num=3, track_id=14, playlist_id=2)
  track4 = PlaylistTrack(order_num=4, track_id=5, playlist_id=2)
  track5 = PlaylistTrack(order_num=5, track_id=41, playlist_id=2)
  track6 = PlaylistTrack(order_num=6, track_id=7, playlist_id=2)
  track7 = PlaylistTrack(order_num=7, track_id=15, playlist_id=2)

  track8 = PlaylistTrack(order_num=1, track_id=11, playlist_id=3)
  track9 = PlaylistTrack(order_num=2, track_id=2, playlist_id=3)
  track10 = PlaylistTrack(order_num=3, track_id=8, playlist_id=3)
  track10a = PlaylistTrack(order_num=4, track_id=49, playlist_id=3)

  track11 = PlaylistTrack(order_num=1, track_id=30, playlist_id=4)
  track12 = PlaylistTrack(order_num=2, track_id=28, playlist_id=4)
  track13 = PlaylistTrack(order_num=3, track_id=14, playlist_id=4)
  track14 = PlaylistTrack(order_num=4, track_id=9, playlist_id=4)

  track13 = PlaylistTrack(order_num=1, track_id=30, playlist_id=5)
  track14 = PlaylistTrack(order_num=2, track_id=47, playlist_id=5)
  track15 = PlaylistTrack(order_num=3, track_id=2, playlist_id=5)
  track16 = PlaylistTrack(order_num=4, track_id=23, playlist_id=5)

  track17 = PlaylistTrack(order_num=1, track_id=31, playlist_id=6)
  track18 = PlaylistTrack(order_num=2, track_id=46, playlist_id=6)
  track19 = PlaylistTrack(order_num=3, track_id=20, playlist_id=6)
  track20 = PlaylistTrack(order_num=4, track_id=19, playlist_id=6)

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
  db.session.add(track10a)
  db.session.add(track11)
  db.session.add(track12)
  db.session.add(track13)
  db.session.add(track14)
  db.session.add(track15)
  db.session.add(track16)
  db.session.add(track17)
  db.session.add(track18)
  db.session.add(track19)
  db.session.add(track20)
  db.session.commit()


def undo_playlist_tracks_seed2():
  db.session.execute('TRUNCATE playlist_tracks CASCADE;')
  db.session.commit()
