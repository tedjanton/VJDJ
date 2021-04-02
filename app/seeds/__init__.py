from flask.cli import AppGroup
from .users import seed_users, undo_users
from .artists_seed1 import artists_seed1, undo_artists_seed1
from .albums_seed1 import albums_seed1, undo_albums_seed1
from .tracks_seed1 import tracks_seed1, undo_tracks_seed1
from .playlists_seed1 import playlists_seed1, undo_playlists_seed1
from .playlist_tracks_seed1 import playlist_tracks_seed1, undo_playlist_tracks_seed1
from .artists_seed2 import artists_seed2, undo_artists_seed2
from .albums_seed2 import albums_seed2, undo_albums_seed2
from .tracks_seed2 import tracks_seed2, undo_tracks_seed2
from .playlists_seed2 import playlists_seed2, undo_playlists_seed2
from .playlist_tracks_seed2 import playlist_tracks_seed2, undo_playlist_tracks_seed2

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    artists_seed1()
    albums_seed1()
    tracks_seed1()
    playlists_seed1()
    playlist_tracks_seed1()
    artists_seed2()
    albums_seed2()
    tracks_seed2()
    playlists_seed2()
    playlist_tracks_seed2()
    # Add other seed functions here

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_artists_seed1()
    undo_albums_seed1()
    undo_tracks_seed1()
    undo_playlists_seed1()
    undo_playlist_tracks_seed1()
    undo_artists_seed2()
    undo_albums_seed2()
    undo_tracks_seed2()
    undo_playlists_seed2()
    undo_playlist_tracks_seed2()
    # Add other undo functions here
