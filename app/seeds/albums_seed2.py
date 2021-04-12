from app.models import db, Album


def albums_seed2():
  # album4
  cuz_i_love_you = Album(title="Cuz I Love You",
                     year=2021,
                     art_src="/static/album-art/cuz-i-love-you.png",
                     artist_id=5)
  # album5
  after_hours = Album(title="After Hours",
                  year=2021,
                  art_src="/static/album-art/after-hours.png",
                  artist_id=6)
  # album6
  plastic_hearts = Album(title="Plastic Hearts",
                  year=2021,
                  art_src="/static/album-art/plastic-hearts.png",
                  artist_id=7)
  # album7
  up = Album(title="Up",
                     year=2021,
                     art_src="/static/album-art/up.jpeg",
                     artist_id=8)
  # album8
  positions = Album(title="positions",
                    year=2020,
                    art_src="/static/album-art/positions.png",
                    artist_id=4)
  # album9
  thankunext = Album(title="thank u, next",
                     year=2019,
                     art_src="/static/album-art/thank-u-next.jpeg",
                     artist_id=4)
  # album10
  black_parade = Album(title="BLACK PARADE",
                       year=2020,
                       art_src="/static/album-art/black-parade.png",
                       artist_id=9)
  # album11
  dedicated = Album(title="Dedicated",
                    year=2019,
                    art_src="/static/album-art/dedicated.png",
                    artist_id=10)
  # album12
  therefore_i_am = Album(title="Therefore I Am",
                         year=2020,
                         art_src="/static/album-art/therefore-i-am.png",
                         artist_id=11)
  # album13
  hot_pink = Album(title="Hot Pink",
                   year=2019,
                   art_src="/static/album-art/hot-pink.png",
                   artist_id=12)
  # album14
  golden_hour = Album(title="Golden Hour",
                      year=2018,
                      art_src="/static/album-art/golden-hour.png",
                      artist_id=14)
  # album15
  heart_to_break = Album(title="Heart To Break",
                         year=2018,
                         art_src="/static/album-art/heart-to-break.jpeg",
                         artist_id=15)
  # album16
  i_dont_want = Album(title="I Don't Want It At All",
                      year=2017,
                      art_src="/static/album-art/i-dont-want-it-at-all.png",
                      artist_id=15)
  # album17
  malibu = Album(title="Malibu",
                 year=2020,
                 art_src="/static/album-art/malibu.png",
                 artist_id=15)
  # album18
  club_fn = Album(title="Club Future Nostalgia",
                  year=2020,
                  art_src="/static/album-art/club-fn.png",
                  artist_id=2)
  # album19
  fn_moonlight = Album(title="Future Nostalgia (The Moonlight Edition)",
                  year=2021,
                  art_src="/static/album-art/fn-moonlight.jpeg",
                  artist_id=2)


  db.session.add(cuz_i_love_you)
  db.session.add(after_hours)
  db.session.add(plastic_hearts)
  db.session.add(up)
  db.session.add(positions)
  db.session.add(thankunext)
  db.session.add(black_parade)
  db.session.add(dedicated)
  db.session.add(therefore_i_am)
  db.session.add(hot_pink)
  db.session.add(golden_hour)
  db.session.add(heart_to_break)
  db.session.add(i_dont_want)
  db.session.add(malibu)
  db.session.add(club_fn)
  db.session.add(fn_moonlight)
  db.session.commit()

def undo_albums_seed2():
  db.session.execute('TRUNCATE albums CASCADE;')
  db.session.commit()
