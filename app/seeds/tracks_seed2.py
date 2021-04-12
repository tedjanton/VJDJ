from app.models import db, Track, Artist


def tracks_seed2():
  # track8
  good_as_hell = Track(title="Good As Hell",
                track_num=15,
                num_plays=3058,
                audio_src="https://vjdj.s3.amazonaws.com/music/lizzo/Lizzo+-+Good+As+Hell+(Video)+(320+kbps).mp3",
                vid_src="https://www.youtube.com/embed/vuq-VAiW9kw",
                length="2:39",
                album_id=4,
                artists=[Artist.query.get(5)])
  # track9
  juice = Track(title="Juice",
                track_num=3,
                num_plays=489295,
                audio_src="https://vjdj.s3.amazonaws.com/music/lizzo/Lizzo+-+Juice+(Official+Video)+(320+kbps).mp3",
                vid_src="https://www.youtube.com/embed/XaCrQL_8eMY",
                length="3:15",
                album_id=4,
                artists=[Artist.query.get(5)])
  # track10
  blinding_lights = Track(title="Blinding Lights",
                     track_num=9,
                     num_plays=23493,
                     audio_src="https://vjdj.s3.amazonaws.com/music/the-weeknd/The+Weeknd+-+Blinding+Lights+(Lyrics)+(320+kbps).mp3",
                     vid_src="https://www.youtube.com/embed/4NRXx6U8ABQ",
                     length="3:20",
                     album_id=5,
                     artists=[Artist.query.get(6)])
  # track11
  prisoner = Track(title="Prisoner",
                           track_num=4,
                           num_plays=549943,
                           audio_src="https://vjdj.s3.amazonaws.com/music/miley-cyrus/Miley+Cyrus+-+Prisoner+(Official+Video)+ft.+Dua+Lipa+(320+kbps).mp3",
                           vid_src="https://www.youtube.com/embed/0ir1qkPXPVM",
                           length="2:49",
                           album_id=6,
                           artists=[Artist.query.get(2), Artist.query.get(7)])
  # track12
  midnight_sky = Track(title="Midnight Sky",
                         track_num=2,
                         num_plays=36729,
                         audio_src="https://vjdj.s3.amazonaws.com/music/miley-cyrus/Miley+Cyrus+-+Midnight+Sky+(Official+Video)+(320+kbps).mp3",
                         vid_src="https://www.youtube.com/embed/aS1no1myeTM",
                         length="3:43",
                         album_id=6,
                         artists=[Artist.query.get(7)])
  # track13
  up = Track(title="Up",
               track_num=3,
               num_plays=52455,
               audio_src="https://vjdj.s3.amazonaws.com/music/cardi-b/Cardi+B+-+Up+(Lyrics)+(320+kbps).mp3",
               vid_src="https://www.youtube.com/embed/rCiBgLOcuKU",
               length="2:36",
               album_id=7,
               artists=[Artist.query.get(8)])
  # track14
  a3435 = Track(title="34+35",
                track_num=2,
                num_plays=234505,
                audio_src="https://vjdj.s3.amazonaws.com/music/ariana-grande/Ariana+Grande+-+34%2B35+(official+video)+(320+kbps).mp3",
                vid_src="https://www.youtube.com/embed/B6_iQvaIjXw",
                length="3:40",
                album_id=8,
                artists=[Artist.query.get(4)])
  # track15
  positions = Track(title="positions",
                    track_num=12,
                    num_plays=50235,
                    audio_src="https://vjdj.s3.amazonaws.com/music/ariana-grande/Ariana+Grande+-+positions+(official+video)+(320+kbps).mp3",
                    vid_src="https://www.youtube.com/embed/tcYodQoapMg",
                    length="2:57",
                    album_id=8,
                    artists=[Artist.query.get(4)])
  # track16
  break_up = Track(title="break up with your girlfriend, i'm bored",
                   track_num=12,
                   num_plays=85783,
                   audio_src="https://vjdj.s3.amazonaws.com/music/ariana-grande/Ariana+Grande+-+break+up+with+your+girlfriend%2C+i'm+bored+(Official+Video)+(320+kbps).mp3",
                   vid_src="https://www.youtube.com/embed/LH4Y1ZUUx2g",
                   length="3:24",
                   album_id=9,
                   artists=[Artist.query.get(4)])
  # track17
  black_parade = Track(title="BLACK PARADE",
                       track_num=1,
                       num_plays=94379,
                       audio_src="https://vjdj.s3.amazonaws.com/music/beyonce/Beyonce%CC%81+BLACK+PARADE+(Official+Audio)+(320+kbps).mp3",
                       vid_src="https://www.youtube.com/embed/Tinhb9l6PIc",
                       length="4:48",
                       album_id=10,
                       artists=[Artist.query.get(9)])
  # track18
  everything_he_needs = Track(title="Everything He Needs",
                              track_num=5,
                              num_plays=494502,
                              audio_src="https://vjdj.s3.amazonaws.com/music/carly-rae-jepsen/Carly+Rae+Jepsen+-+Everything+He+Needs+%5BAudio%5D+(320+kbps).mp3",
                              vid_src="",
                              length="3:38",
                              album_id=11,
                              artists=[Artist.query.get(10)])
  # track19
  julien = Track(title="Julien",
                  track_num=1,
                  num_plays=463745,
                  audio_src="https://vjdj.s3.amazonaws.com/music/carly-rae-jepsen/Carly+Rae+Jepsen+-+Julien+%5BAudio%5D+(320+kbps).mp3",
                  vid_src="",
                  length="3:54",
                  album_id=11,
                  artists=[Artist.query.get(10)])
  # track20
  therefore_i_am = Track(title="Therefore I Am",
                         track_num=1,
                         num_plays=593920,
                         audio_src="https://vjdj.s3.amazonaws.com/music/billie-eilish/Billie+Eilish+-+Therefore+I+Am+(Lyrics)+(320+kbps).mp3",
                         vid_src="https://www.youtube.com/embed/RUQl6YcMalg",
                         length="2:54",
                         album_id=12,
                         artists=[Artist.query.get(11)])
  # track21
  say_so = Track(title="Say So ft. Nicki Minaj",
                 track_num=13,
                 num_plays=94032,
                 audio_src="https://vjdj.s3.amazonaws.com/music/doja-cat/Doja+Cat+-+Say+So+ft.+Nicki+Minaj+(320+kbps).mp3",
                 vid_src="https://www.youtube.com/embed/marAFsQo3VE",
                 length="3:26",
                 album_id=13,
                 artists=[Artist.query.get(12), Artist.query.get(13)])
  # track22
  high_horse = Track(title="High Horse",
                     track_num=11,
                     num_plays=402385,
                     audio_src="https://vjdj.s3.amazonaws.com/music/kacey-musgraves/Kacey+Musgraves+-+High+Horse+(Lyric+Video)+(320+kbps).mp3",
                     vid_src="https://www.youtube.com/embed/fbNDJRwXKGc",
                     length="3:33",
                     album_id=14,
                     artists=[Artist.query.get(14)])
  # track23
  heart_to_break = Track(title="Heart To Break",
                         track_num=1,
                         num_plays=23040,
                         audio_src="https://vjdj.s3.amazonaws.com/music/kim-petras/Heart+to+Break+-+Kim+Petras+(Official+Music+Video)+(320+kbps).mp3",
                         vid_src="https://www.youtube.com/embed/5CPeHQHAQyo",
                         length="3:45",
                         album_id=15,
                         artists=[Artist.query.get(15)])
  # track24
  i_dont_want = Track(title="I Don't Want It At All",
                      track_num=1,
                      num_plays=49298,
                      audio_src="https://vjdj.s3.amazonaws.com/music/kim-petras/I+Don't+Want+It+At+All+-+Kim+Petras+(Official+Music+Video)+(320+kbps).mp3",
                      vid_src="https://www.youtube.com/embed/JC9FA8lZRy8",
                      length="4:11",
                      album_id=16,
                      artists=[Artist.query.get(15)])
  # track25
  malibu = Track(title="Malibu",
                 track_num=1,
                 num_plays=235810,
                 audio_src="https://vjdj.s3.amazonaws.com/music/kim-petras/Malibu+-+Kim+Petras+(At+Home+Edition)+(320+kbps).mp3",
                 vid_src="https://www.youtube.com/embed/oLmn8qkqzJI",
                 length="3:11",
                 album_id=17,
                 artists=[Artist.query.get(15)])
  # track26
  chromatica_1 = Track(title="Chromatica I",
                       track_num=1,
                       num_plays=23034,
                       audio_src="https://vjdj.s3.amazonaws.com/music/lady-gaga/Chromatica/01+Chromatica+I.m4a",
                       vid_src="",
                       length="1:00",
                       album_id=1,
                       artists=[Artist.query.get(1)])
  # track27
  free_woman = Track(title="Free Woman",
                       track_num=5,
                       num_plays=35636,
                       audio_src="https://vjdj.s3.amazonaws.com/music/lady-gaga/Chromatica/05+Free+Woman.m4a",
                       vid_src="",
                       length="3:11",
                       album_id=1,
                       artists=[Artist.query.get(1)])
  # track28
  fun_tonight = Track(title="Fun Tonight",
                       track_num=6,
                       num_plays=23598,
                       audio_src="https://vjdj.s3.amazonaws.com/music/lady-gaga/Chromatica/06+Fun+Tonight.m4a",
                       vid_src="",
                       length="2:53",
                       album_id=1,
                       artists=[Artist.query.get(1)])
  # track29
  chromatica_2 = Track(title="Chromatica II",
                       track_num=7,
                       num_plays=90203,
                       audio_src="https://vjdj.s3.amazonaws.com/music/lady-gaga/Chromatica/07+Chromatica+II.m4a",
                       vid_src="",
                       length="0:41",
                       album_id=1,
                       artists=[Artist.query.get(1)])
  # track30
  c911 = Track(title="911",
                       track_num=8,
                       num_plays=182035,
                       audio_src="https://vjdj.s3.amazonaws.com/music/lady-gaga/Chromatica/08+911.m4a",
                       vid_src="https://www.youtube.com/embed/58hoktsqk_Q",
                       length="2:52",
                       album_id=1,
                       artists=[Artist.query.get(1)])
  # track31
  plastic_doll = Track(title="Plastic Doll",
                       track_num=9,
                       num_plays=23454,
                       audio_src="https://vjdj.s3.amazonaws.com/music/lady-gaga/Chromatica/09+Plastic+Doll.m4a",
                       vid_src="",
                       length="3:41",
                       album_id=1,
                       artists=[Artist.query.get(1)])
  # track32
  sour_candy = Track(title="Sour Candy",
                     track_num=10,
                     num_plays=392034,
                     audio_src="https://vjdj.s3.amazonaws.com/music/lady-gaga/Chromatica/10+Sour+Candy.m4a",
                     vid_src="https://www.youtube.com/embed/Fc2qWBIToKU",
                     length="2:37",
                     album_id=1,
                     artists=[Artist.query.get(1), Artist.query.get(16)])
  # track33
  enigma = Track(title="Enigma",
                 track_num=11,
                 num_plays=101303,
                 audio_src="https://vjdj.s3.amazonaws.com/music/lady-gaga/Chromatica/11+Enigma.m4a",
                 vid_src="",
                 length="2:59",
                 album_id=1,
                 artists=[Artist.query.get(1)])
# track34
  replay = Track(title="Replay",
                 track_num=12,
                 num_plays=293983,
                 audio_src="https://vjdj.s3.amazonaws.com/music/lady-gaga/Chromatica/12+Replay.m4a",
                 vid_src="",
                 length="3:06",
                 album_id=1,
                 artists=[Artist.query.get(1)])
# track35
  chromatica_3 = Track(title="Chromatica III",
                 track_num=13,
                 num_plays=23948,
                 audio_src="https://vjdj.s3.amazonaws.com/music/lady-gaga/Chromatica/13+Chromatica+III.m4a",
                 vid_src="",
                 length="0:27",
                 album_id=1,
                 artists=[Artist.query.get(1)])
# track36
  sine_from_above = Track(title="Sine From Above",
                 track_num=14,
                 num_plays=37292,
                 audio_src="https://vjdj.s3.amazonaws.com/music/lady-gaga/Chromatica/14+Sine+From+Above.m4a",
                 vid_src="",
                 length="4:04",
                 album_id=1,
                 artists=[Artist.query.get(1), Artist.query.get(17)])
# track37
  c1000_doves = Track(title="1000 Doves",
                 track_num=15,
                 num_plays=28466,
                 audio_src="https://vjdj.s3.amazonaws.com/music/lady-gaga/Chromatica/15+1000+Doves.m4a",
                 vid_src="",
                 length="3:35",
                 album_id=1,
                 artists=[Artist.query.get(1)])
# track38
  babylon = Track(title="Babylon",
                 track_num=16,
                 num_plays=56084,
                 audio_src="https://vjdj.s3.amazonaws.com/music/lady-gaga/Chromatica/16+Babylon.m4a",
                 vid_src="",
                 length="2:41",
                 album_id=1,
                 artists=[Artist.query.get(1)])
# track39
  love_is_religion = Track(title="Love Is Religion",
                           track_num=12,
                           num_plays=204845,
                           audio_src="https://vjdj.s3.amazonaws.com/music/dua-lipa/club-future-nostalgia/Love+Is+Religion+(The+Blessed+Madonna+Remix)+(320+kbps).mp3",
                           vid_src="",
                           length="3:29",
                           album_id=18,
                           artists=[Artist.query.get(2)])
# track40
  physical = Track(title="Physical",
                           track_num=4,
                           num_plays=92384,
                           audio_src="https://vjdj.s3.amazonaws.com/music/dua-lipa/future-nostalgia/04-dua_lipa-physical.mp3",
                           vid_src="https://www.youtube.com/embed/9HDEHj2yzew",
                           length="3:13",
                           album_id=2,
                           artists=[Artist.query.get(2)])
# track41
  levitating = Track(title="Levitating",
                           track_num=5,
                           num_plays=618345,
                           audio_src="https://vjdj.s3.amazonaws.com/music/dua-lipa/future-nostalgia/05-dua_lipa-levitating.mp3",
                           vid_src="",
                           length="3:23",
                           album_id=2,
                           artists=[Artist.query.get(2)])
# track42
  pretty_please = Track(title="Pretty Please",
                           track_num=6,
                           num_plays=76453,
                           audio_src="https://vjdj.s3.amazonaws.com/music/dua-lipa/future-nostalgia/06-dua_lipa-pretty_please.mp3",
                           vid_src="",
                           length="3:14",
                           album_id=2,
                           artists=[Artist.query.get(2)])
# track43
  hallucinate = Track(title="Hallucinate",
                           track_num=7,
                           num_plays=54312,
                           audio_src="https://vjdj.s3.amazonaws.com/music/dua-lipa/future-nostalgia/07-dua_lipa-hallucinate.mp3",
                           vid_src="https://www.youtube.com/embed/qcZ7e9EOQTY",
                           length="3:28",
                           album_id=2,
                           artists=[Artist.query.get(2)])
# track44
  love_again = Track(title="Love Again",
                           track_num=8,
                           num_plays=205812,
                           audio_src="https://vjdj.s3.amazonaws.com/music/dua-lipa/future-nostalgia/08-dua_lipa-love_again.mp3",
                           vid_src="",
                           length="4:18",
                           album_id=2,
                           artists=[Artist.query.get(2)])
# track45
  break_my_heart = Track(title="Break My Heart",
                           track_num=9,
                           num_plays=65432,
                           audio_src="https://vjdj.s3.amazonaws.com/music/dua-lipa/future-nostalgia/09-dua_lipa-break_my_heart.mp3",
                           vid_src="https://www.youtube.com/embed/Nj2U6rhnucI",
                           length="3:41",
                           album_id=2,
                           artists=[Artist.query.get(2)])
# track46
  good_in_bed = Track(title="Good In Bed",
                           track_num=10,
                           num_plays=72557,
                           audio_src="https://vjdj.s3.amazonaws.com/music/dua-lipa/future-nostalgia/10-dua_lipa-good_in_bed.mp3",
                           vid_src="",
                           length="3:38",
                           album_id=2,
                           artists=[Artist.query.get(2)])
# track47
  boys_will_be_boys = Track(title="Boys Will Be Boys",
                           track_num=11,
                           num_plays=87654,
                           audio_src="https://vjdj.s3.amazonaws.com/music/dua-lipa/future-nostalgia/11-dua_lipa-boys_will_be_boys.mp3",
                           vid_src="",
                           length="2:46",
                           album_id=2,
                           artists=[Artist.query.get(2)])
# track48
  if_it_aint_me = Track(title="If It Ain't Me",
                           track_num=15,
                           num_plays=83456,
                           audio_src="https://vjdj.s3.amazonaws.com/music/dua-lipa/future-nostalgia/12-dua_lipa-if_it_aint_me.mp3",
                           vid_src="",
                           length="2:46",
                           album_id=19,
                           artists=[Artist.query.get(2)])
# track49
  that_kind_of_woman = Track(title="That Kind of Woman",
                           track_num=16,
                           num_plays=91244,
                           audio_src="https://vjdj.s3.amazonaws.com/music/dua-lipa/future-nostalgia/That+Kind+Of+Woman.mp3",
                           vid_src="",
                           length="3:20",
                           album_id=19,
                           artists=[Artist.query.get(2)])



  db.session.add(good_as_hell)
  db.session.add(juice)
  db.session.add(blinding_lights)
  db.session.add(prisoner)
  db.session.add(midnight_sky)
  db.session.add(a3435)
  db.session.add(positions)
  db.session.add(up)
  db.session.add(break_up)
  db.session.add(black_parade)
  db.session.add(everything_he_needs)
  db.session.add(julien)
  db.session.add(therefore_i_am)
  db.session.add(say_so)
  db.session.add(high_horse)
  db.session.add(heart_to_break)
  db.session.add(i_dont_want)
  db.session.add(malibu)
  db.session.add(chromatica_1)
  db.session.add(free_woman)
  db.session.add(fun_tonight)
  db.session.add(chromatica_2)
  db.session.add(c911)
  db.session.add(plastic_doll)
  db.session.add(sour_candy)
  db.session.add(enigma)
  db.session.add(replay)
  db.session.add(chromatica_3)
  db.session.add(sine_from_above)
  db.session.add(c1000_doves)
  db.session.add(babylon)
  db.session.add(physical)
  db.session.add(levitating)
  db.session.add(pretty_please)
  db.session.add(hallucinate)
  db.session.add(love_again)
  db.session.add(break_my_heart)
  db.session.add(good_in_bed)
  db.session.add(boys_will_be_boys)
  db.session.add(if_it_aint_me)
  db.session.add(that_kind_of_woman)
  db.session.commit()

def undo_tracks_seed2():
  db.session.execute('TRUNCATE tracks CASCADE;')
  db.session.commit()
