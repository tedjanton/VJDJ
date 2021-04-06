from app.models import db, Album


def albums_seed2():
  cuz_i_love_you = Album(title="Cuz I Love You",
                     year=2021,
                     art_src="/static/album-art/cuz-i-love-you.png",
                     artist_id=5)
  after_hours = Album(title="After Hours",
                  year=2021,
                  art_src="/static/album-art/after-hours.png",
                  artist_id=6)
  plastic_hearts = Album(title="Plastic Hearts",
                  year=2021,
                  art_src="/static/album-art/plastic-hearts.png",
                  artist_id=7)
  up = Album(title="Up",
                     year=2021,
                     art_src="/static/album-art/up.jpeg",
                     artist_id=8)
  positions = Album(title="positions",
                    year=2020,
                    art_src="/static/album-art/positions.png",
                    artist_id=4)
  thankunext = Album(title="thank u, next",
                     year=2019,
                     art_src="/static/album-art/thank-u-next.jpeg",
                     artist_id=4)

  db.session.add(cuz_i_love_you)
  db.session.add(after_hours)
  db.session.add(plastic_hearts)
  db.session.add(up)
  db.session.add(positions)
  db.session.add(thankunext)
  db.session.commit()

def undo_albums_seed2():
  db.session.execute('TRUNCATE albums CASCADE;')
  db.session.commit()
