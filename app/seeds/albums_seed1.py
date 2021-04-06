from app.models import db, Album


def albums_seed1():
  chromatica = Album(title="Chromatica",
                     year=2020,
                     art_src="/static/album-art/chromatica.jpeg",
                     artist_id=1)
  future_nostalgia = Album(title="Future Nostalgia",
                     year=2020,
                     art_src="/static/album-art/future-nostalgia.jpeg",
                     artist_id=2)
  montero = Album(title="MONTERO (Call Me By Your Name)",
                  year=2021,
                  art_src="/static/album-art/montero.jpeg",
                  artist_id=3)

  db.session.add(chromatica)
  db.session.add(future_nostalgia)
  db.session.add(montero)
  db.session.commit()

def undo_albums_seed1():
  db.session.execute('TRUNCATE albums CASCADE;')
  db.session.commit()
