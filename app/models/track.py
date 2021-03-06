from .db import db


track_artists = db.Table(
  'track_artists',
  db.Model.metadata,
  db.Column('track_id', db.Integer, db.ForeignKey('tracks.id'), primary_key=True),
  db.Column('artist_id', db.Integer, db.ForeignKey('artists.id'), primary_key=True),
)

class Track(db.Model):
  __tablename__ = 'tracks'

  id = db.Column(db.Integer, primary_key = True)
  title = db.Column(db.String, nullable = False)
  track_num = db.Column(db.Integer, nullable = False)
  num_plays = db.Column(db.Integer)
  audio_src = db.Column(db.String, nullable = False)
  vid_src = db.Column(db.String)
  length = db.Column(db.String, nullable = False)
  album_id = db.Column(db.Integer, db.ForeignKey('albums.id'), nullable = False)

  album = db.relationship('Album', back_populates='tracks')
  artists = db.relationship('Artist', secondary=track_artists, back_populates='tracks')
  playlist_tracks = db.relationship('PlaylistTrack', back_populates='track')

  def to_dict(self):
    return {
      'id': self.id,
      'title': self.title,
      'num_plays': self.num_plays,
      'track_num': self.track_num,
      'audio_src': self.audio_src,
      'vid_src': self.vid_src,
      'time': self.length,
      'album': self.album.to_no_artist_dict(),
      'artists': [artist.to_no_tracks_dict() for artist in self.artists],
    }

  def to_no_album_dict(self):
    return {
      'id': self.id,
      'title': self.title,
      'num_plays': self.num_plays,
      'audio_src': self.audio_src,
      'vid_src': self.vid_src,
      'time': self.length,
      'artists': [artist.to_no_tracks_dict() for artist in self.artists],
    }

  def to_art_dict(self):
    return {
      'id': self.id,
      'art': self.album.to_only_art_dict(),
    }

  def to_search_dict(self):
    return {
      'id': self.id,
      'title': self.title,
      'artists': [artist.to_only_name_dict() for artist in self.artists],
      'art': self.album.to_only_art_dict(),
    }
