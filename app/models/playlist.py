from .db import db
from .user import follows

class Playlist(db.Model):
  __tablename__ = 'playlists'

  id = db.Column(db.Integer, primary_key = True)
  name = db.Column(db.String(30), nullable = False)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable = False)
  created_at = db.Column(db.DateTime, nullable = False)

  user = db.relationship('User', back_populates='playlists')
  tracks = db.relationship('PlaylistTrack', back_populates='playlist')
  user_follows = db.relationship('User', secondary=follows, back_populates='pl_follows')

  def to_dict(self):
    return {
      'id': self.id,
      'name': self.name,
      'tracks': [track.to_dict() for track in self.tracks],
      'created_at': self.created_at,
    }

  def to_pl_name_dict(self):
    return {
      'id': self.id,
      'name': self.name,
      'user': self.user.to_dict(),
      'created_at': self.created_at,
    }

  def to_name_art_dict(self):
    sorted_tracks = sorted(self.tracks, key=lambda track: track.order_num)
    return {
      'id': self.id,
      'name': self.name,
      'user': self.user.to_dict(),
      'tracks': [track.to_dict() for track in sorted_tracks],
      'created_at': self.created_at,
    }

  def to_search_dict(self):
    return {
      'id': self.id,
      'name': self.name,
      'user': self.user.to_dict(),
    }
