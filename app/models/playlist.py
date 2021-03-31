from .db import db


playlist_tracks = db.Table(
  'playlist_tracks',
  db.Model.metadata,
  db.Column('track_id', db.Integer, db.ForeignKey('tracks.id'), primary_key=True),
  db.Column('playlist_id', db.Integer, db.ForeignKey('playlists.id'), primary_key=True)
)

class Playlist(db.Model):
  __tablename__ = 'playlists'

  id = db.Column(db.Integer, primary_key = True)
  name = db.Column(db.String(30), nullable = False)
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable = False)
  created_at = db.Column(db.DateTime, nullable = False)

  user = db.relationship("User", back_populates='playlists')
  tracks = db.relationship("Track", secondary=playlist_tracks, back_populates="playlists")


  def to_dict(self):
    return {
      'id': self.id,
      'name': self.name,
      'user': self.user.to_dict(),
      'tracks': [track.to_dict() for track in self.tracks],
      'created_at': self.created_at,
    }

  def to_no_user_dict(self):
    return {
      'id': self.id,
      'name': self.name,
      'tracks': [track.to_dict() for track in self.tracks],
      'created_at': self.created_at,
    }
