from flask import Blueprint
from flask_login import login_required
from app.models import Playlist

playlist_routes = Blueprint('playlists', __name__)


# @playlist_routes.route('/')
