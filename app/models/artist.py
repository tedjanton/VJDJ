from .db import db
from .track import track_artists

def quickSort(tracks):
  if len(tracks) <= 1:
    return tracks

  pivot = tracks.pop(0);
  left = [track for track in tracks if track.num_plays >= pivot.num_plays]
  right = [track for track in tracks if track.num_plays < pivot.num_plays]

  leftSorted = quickSort(left)
  rightSorted = quickSort(right)

  data = [*leftSorted, pivot, *rightSorted]
  flat_list = []
  def flatten_list(dataset):
    for track in dataset:
      if type(track) == list:
        flatten_list(track)
      else:
        flat_list.append(track)
  flatten_list(data)
  return flat_list


class Artist(db.Model):
  __tablename__ = 'artists'

  id = db.Column(db.Integer, primary_key = True)
  name = db.Column(db.String(50), nullable = False)
  bio = db.Column(db.String(2000), nullable = False)
  image = db.Column(db.String, nullable = False)

  albums = db.relationship('Album', back_populates='artist')
  tracks = db.relationship('Track', secondary=track_artists, back_populates='artists')

  def to_dict(self):
    sorted_tracks = quickSort(self.tracks)

    return {
      'id': self.id,
      'name': self.name,
      'bio': self.bio,
      'image': self.image,
      'tracks': [track.to_dict() for track in sorted_tracks]
    }


  def to_no_tracks_dict(self):
    return {
      'id': self.id,
      'name': self.name,
      'bio': self.bio,
      'image': self.image,
    }
