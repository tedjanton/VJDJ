from flask.cli import AppGroup
from .users import seed_users, undo_users
from .artists_seed1 import artists_seed1, undo_artists_seed1
from .albums_seed1 import albums_seed1, undo_albums_seed1
from .tracks_seed1 import tracks_seed1, undo_tracks_seed1
from .playlists_seeds1 import playlists_seed1, undo_playlists_seed1
from .playlist_tracks_seed1 import playlist_tracks_seed1, undo_playlist_tracks_seed1

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    # playlist_tracks_seed1()
    # playlists_seed1()
    # tracks_seed1()
    # albums_seed1()
    # artists_seed1()
    # seed_users()
    # Add other seed functions here

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    # undo_playlist_tracks_seed1()
    # undo_playlists_seed1()
    # undo_tracks_seed1()
    # undo_albums_seed1()
    # undo_artists_seed1()
    # undo_users()
    # Add other undo functions here
