from app.models import db, Track, Artist


def tracks_seed2():
  good_as_hell = Track(title="Good As Hell",
                track_num=15,
                num_plays=3058,
                audio_src="https://vjdj.s3.amazonaws.com/music/lizzo/Lizzo+-+Good+As+Hell+(Video)+(320+kbps).mp3",
                vid_src="https://www.youtube.com/embed/vuq-VAiW9kw",
                length="2:39",
                album_id=4,
                artists=[Artist.query.get(5)])
  juice = Track(title="Juice",
                track_num=3,
                num_plays=489295,
                audio_src="https://vjdj.s3.amazonaws.com/music/lizzo/Lizzo+-+Juice+(Official+Video)+(320+kbps).mp3",
                vid_src="https://www.youtube.com/embed/XaCrQL_8eMY",
                length="3:15",
                album_id=4,
                artists=[Artist.query.get(5)])
  blinding_lights = Track(title="Blinding Lights",
                     track_num=9,
                     num_plays=23493,
                     audio_src="https://vjdj.s3.amazonaws.com/music/the-weeknd/The+Weeknd+-+Blinding+Lights+(Lyrics)+(320+kbps).mp3",
                     vid_src="https://www.youtube.com/embed/4NRXx6U8ABQ",
                     length="3:20",
                     album_id=5,
                     artists=[Artist.query.get(6)])
  prisoner = Track(title="Prisoner",
                           track_num=4,
                           num_plays=549943,
                           audio_src="https://vjdj.s3.amazonaws.com/music/miley-cyrus/Miley+Cyrus+-+Prisoner+(Official+Video)+ft.+Dua+Lipa+(320+kbps).mp3",
                           vid_src="https://www.youtube.com/embed/0ir1qkPXPVM",
                           length="2:49",
                           album_id=6,
                           artists=[Artist.query.get(7), Artist.query.get(2)])
  midnight_sky = Track(title="Midnight Sky",
                         track_num=2,
                         num_plays=36729,
                         audio_src="https://vjdj.s3.amazonaws.com/music/miley-cyrus/Miley+Cyrus+-+Midnight+Sky+(Official+Video)+(320+kbps).mp3",
                         vid_src="https://www.youtube.com/embed/aS1no1myeTM",
                         length="3:43",
                         album_id=6,
                         artists=[Artist.query.get(7)])

  up = Track(title="Up",
               track_num=3,
               num_plays=52455,
               audio_src="https://vjdj.s3.amazonaws.com/music/cardi-b/Cardi+B+-+Up+(Lyrics)+(320+kbps).mp3",
               vid_src="https://www.youtube.com/embed/rCiBgLOcuKU",
               length="2:36",
               album_id=7,
               artists=[Artist.query.get(8)])

  a3435 = Track(title="34+35",
                track_num=2,
                num_plays=234505,
                audio_src="https://vjdj.s3.amazonaws.com/music/ariana-grande/Ariana+Grande+-+34%2B35+(official+video)+(320+kbps).mp3",
                vid_src="https://www.youtube.com/embed/B6_iQvaIjXw",
                length="3:40",
                album_id=8,
                artists=[Artist.query.get(4)])

  positions = Track(title="positions",
                    track_num=12,
                    num_plays=50235,
                    audio_src="https://vjdj.s3.amazonaws.com/music/ariana-grande/Ariana+Grande+-+positions+(official+video)+(320+kbps).mp3",
                    vid_src="https://www.youtube.com/embed/tcYodQoapMg",
                    length="2:57",
                    album_id=8,
                    artists=[Artist.query.get(4)])

  break_up = Track(title="break up with your girlfriend, i'm bored",
                   track_num=12,
                   num_plays=85783,
                   audio_src="https://vjdj.s3.amazonaws.com/music/ariana-grande/Ariana+Grande+-+break+up+with+your+girlfriend%2C+i'm+bored+(Official+Video)+(320+kbps).mp3",
                   vid_src="https://www.youtube.com/embed/LH4Y1ZUUx2g",
                   length="3:24",
                   album_id=9,
                   artists=[Artist.query.get(4)])


  db.session.add(good_as_hell)
  db.session.add(juice)
  db.session.add(blinding_lights)
  db.session.add(prisoner)
  db.session.add(midnight_sky)
  db.session.add(a3435)
  db.session.add(positions)
  db.session.add(up)
  db.session.add(break_up)
  db.session.commit()

def undo_tracks_seed2():
  db.session.execute('TRUNCATE tracks CASCADE;')
  db.session.commit()
