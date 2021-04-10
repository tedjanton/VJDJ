from flask import Blueprint, session, request
from flask_login import login_required
from app.models import db, Album, Track

album_routes = Blueprint('albums', __name__)


@album_routes.route('/')
@login_required
def get_albums():
  albums = Album.query.order_by(Album.title).all()

  return {"albums": [album.to_dict() for album in albums]}


@album_routes.route('/<int:id>/')
@login_required
def get_album_content(id):
  album = Album.query.get(id)

  return album.to_dict()
