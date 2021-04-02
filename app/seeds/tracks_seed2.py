from app.models import db, Track, Artist


def tracks_seed2():
  good_as_hell = Track(title="Good As Hell",
                track_num=15,
                num_plays=3058,
                audio_src="https://vjdj.s3.amazonaws.com/music/lizzo/Lizzo+-+Good+As+Hell+(Video)+(320+kbps).mp3",
                vid_src="https://www.youtube.com/embed/vuq-VAiW9kw",
                album_id=4,
                artists=[Artist.query.get(5)])
  juice = Track(title="Juice",
                track_num=3,
                num_plays=489295,
                audio_src="https://vjdj.s3.amazonaws.com/music/lizzo/Lizzo+-+Juice+(Official+Video)+(320+kbps).mp3",
                vid_src="https://www.youtube.com/embed/XaCrQL_8eMY",
                album_id=4,
                artists=[Artist.query.get(5)])
  blinding_lights = Track(title="Blinding Lights",
                     track_num=9,
                     num_plays=23493,
                     audio_src="https://vjdj.s3.amazonaws.com/music/the-weeknd/The+Weeknd+-+Blinding+Lights+(Lyrics)+(320+kbps).mp3",
                     vid_src="https://www.youtube.com/embed/4NRXx6U8ABQ",
                     album_id=5,
                     artists=[Artist.query.get(6)])
  prisoner = Track(title="Prisoner",
                           track_num=4,
                           num_plays=549943,
                           audio_src="https://vjdj.s3.amazonaws.com/music/miley-cyrus/Miley+Cyrus+-+Prisoner+(Official+Video)+ft.+Dua+Lipa+(320+kbps).mp3",
                           vid_src="https://www.youtube.com/embed/0ir1qkPXPVM",
                           album_id=6,
                           artists=[Artist.query.get(7), Artist.query.get(2)])
  midnight_sky = Track(title="Midnight Sky",
                         track_num=2,
                         num_plays=36729,
                         audio_src="https://vjdj.s3.amazonaws.com/music/miley-cyrus/Miley+Cyrus+-+Prisoner+(Official+Video)+ft.+Dua+Lipa+(320+kbps).mp3",
                         vid_src="https://www.youtube.com/embed/aS1no1myeTM",
                         album_id=6,
                         artists=[Artist.query.get(7)])

  up = Track(title="Up",
               track_num=3,
               num_plays=52455,
               audio_src="https://vjdj.s3.amazonaws.com/music/cardi-b/Cardi+B+-+Up+(Lyrics)+(320+kbps).mp3",
               vid_src="https://www.youtube.com/embed/rCiBgLOcuKU",
               album_id=7,
               artists=[Artist.query.get(8)])


  db.session.add(good_as_hell)
  db.session.add(juice)
  db.session.add(blinding_lights)
  db.session.add(prisoner)
  db.session.add(midnight_sky)
  db.session.add(up)
  db.session.commit()

def undo_tracks_seed2():
  db.session.execute('TRUNICATE tracks CASCADE;')
  db.session.commit()
