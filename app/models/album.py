from .db import db


class Album(db.Model):
  __tablename__ = 'albums'

  id = db.Column(db.Integer, primary_key = True)
  title = db.Column(db.String(50), nullable = False)
  year = db.Column(db.Integer, nullable = False)
  art_src = db.Column(db.String, nullable = False)
  artist_id = db.Column(db.Integer, db.ForeignKey("artists.id"), nullable = False)

  artist = db.relationship('Artist', back_populates='albums')
  tracks = db.relationship('Track', back_populates='album')

  def to_dict(self):
    sorted_tracks = sorted(self.tracks, key=lambda track: track.track_num)

    return {
      'id': self.id,
      'title': self.title,
      'year': self.year,
      'art_src': self.art_src,
      'artist': self.artist.to_no_tracks_dict(),
      'tracks': [track.to_dict() for track in sorted_tracks]
    }


  def to_no_artist_dict(self):
    return {
      'id': self.id,
      'title': self.title,
      'year': self.year,
      'art_src': self.art_src,
    }

  def to_only_art_dict(self):
    return self.art_src
