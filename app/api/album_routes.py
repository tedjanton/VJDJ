from flask import Blueprint
from flask_login import login_required
from app.models import Album

album_routes = Blueprint('albums', __name__)


@album_routes.route('/')
@login_required
def get_albums():
  """
  Queries all albums from the database and orders them
  in alphabetical order by album title
  """
  albums = Album.query.order_by(Album.title).all()

  return {"albums": [album.to_dict() for album in albums]}


@album_routes.route('/<int:id>/')
@login_required
def get_album_content(id):
  """
  Finds a single album by album ID
  """
  album = Album.query.get(id)

  return album.to_dict()
