from flask import Blueprint
from app.models import Playlist

playlist_routes = Blueprint('playlists', __name__)


# @playlist_routes.route('/')
