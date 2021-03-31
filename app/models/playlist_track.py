from .db import db


class PlaylistTrack(db.Model):
  __tablename__ = 'playlist_tracks'

  id = db.Column(db.Integer, primary_key = True)
  order_num = db.Column(db.Integer, nullable = False)
  track_id = db.Column(db.Integer, db.ForeignKey('tracks.id'), nullable = False)
  playlist_id = db.Column(db.Integer, db.ForeignKey('playlists.id'), nullable = False)

  tracks = db.relationship('Track', back_populates='playlist_tracks')
  playlist = db.relationship('Playlist', back_populates='playlist_tracks')

  def to_dict(self):
    return {
      'id': self.id,
      'order_num': self.order_num,
      'track': self.track.to_dict(),
      'playlist': self.playlist.to_no_tracks_dict(),
    }
