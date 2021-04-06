from app.models import db, Track, Artist


def tracks_seed1():
  alice = Track(title="Alice",
                track_num=2,
                num_plays=9281,
                audio_src="https://vjdj.s3.amazonaws.com/music/lady-gaga/Chromatica/02+Alice.m4a",
                vid_src="",
                length="2:57",
                album_id=1,
                artists=[Artist.query.get(1)])

  stupid_love = Track(title="Stupid Love",
                track_num=3,
                num_plays=11013,
                audio_src="https://vjdj.s3.amazonaws.com/music/lady-gaga/Chromatica/03+Stupid+Love.m4a",
                vid_src="https://www.youtube.com/embed/5L6xyaeiV58",
                length="3:13",
                album_id=1,
                artists=[Artist.query.get(1)])

  rain_on_me = Track(title="Rain On Me",
                     track_num=4,
                     num_plays=934934,
                     audio_src="https://vjdj.s3.amazonaws.com/music/lady-gaga/Chromatica/04+Rain+On+Me.m4a",
                     vid_src="https://www.youtube.com/embed/AoAm4om0wTs",
                     length="3:02",
                     album_id=1,
                     artists=[Artist.query.get(1), Artist.query.get(4)])

  future_nostalgia = Track(title="Future Nostalgia",
                           track_num=1,
                           num_plays=2993,
                           audio_src="https://vjdj.s3.amazonaws.com/music/dua-lipa/future-nostalgia/01-dua_lipa-future_nostalgia.mp3",
                           vid_src="",
                           length="3:04",
                           album_id=2,
                           artists=[Artist.query.get(2)])

  dont_start_now = Track(title="Don't Start Now",
                         track_num=2,
                         num_plays=95382,
                         audio_src="https://vjdj.s3.amazonaws.com/music/dua-lipa/future-nostalgia/02-dua_lipa-dont_start_now.mp3",
                         vid_src="https://www.youtube.com/embed/oygrmJFKYZY",
                         length="3:03",
                         album_id=2,
                         artists=[Artist.query.get(2)])

  cool = Track(title="Cool",
               track_num=3,
               num_plays=5245,
               audio_src="https://vjdj.s3.amazonaws.com/music/dua-lipa/future-nostalgia/03-dua_lipa-cool.mp3",
               vid_src="",
               length="3:29",
               album_id=2,
               artists=[Artist.query.get(2)])

  montero = Track(title="MONTERO (Call Me By Your Name)",
                  track_num=1,
                  num_plays=585,
                  audio_src="https://vjdj.s3.amazonaws.com/music/lil-nas-x/Lil+Nas+X+-+MONTERO+(Call+Me+By+Your+Name)+(Lyrics)+(320+kbps).mp3",
                  vid_src="https://www.youtube.com/embed/6swmTBVI83k",
                  length="2:17",
                  album_id=3,
                  artists=[Artist.query.get(3)])

  db.session.add(alice)
  db.session.add(stupid_love)
  db.session.add(rain_on_me)
  db.session.add(future_nostalgia)
  db.session.add(dont_start_now)
  db.session.add(cool)
  db.session.add(montero)
  db.session.commit()

def undo_tracks_seed1():
  db.session.execute('TRUNCATE tracks CASCADE;')
  db.session.commit()
