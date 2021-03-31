from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Playlist

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}


@user_routes.route('/<int:id>/')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/<int:id>/playlists/')
@login_required
def user_playlists(id):
    playlists = Playlist.query.filter(Playlist.user_id == id).all()
    return {'playlists': [playlist.to_no_user_dict() for playlist in playlists]}
