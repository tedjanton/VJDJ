from .db import db
from .track import track_artists


class Artist(db.Model):
  __tablename__ = 'artists'

  id = db.Column(db.Integer, primary_key = True)
  name = db.Column(db.String(50), nullable = False)
  bio = db.Column(db.String(2000), nullable = False)
  image = db.Column(db.String, nullable = False)

  albums = db.relationship('Album', back_populates='artist')
  tracks = db.relationship('Track', secondary=track_artists, back_populates='artists')

  # def to_dict(self):
  #   return {
  #     'id': self.id,
  #     'name': self.name,
  #     'bio': self.bio,
  #     'image': self.image,
  #     'tracks': [track.to_no_artists_album_dict() for track in self.tracks]
  #   }


  def to_no_tracks_dict(self):
    return {
      'id': self.id,
      'name': self.name,
      'bio': self.bio,
      'image': self.image,
    }
