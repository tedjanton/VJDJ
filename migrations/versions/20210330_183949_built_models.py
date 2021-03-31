"""built models

Revision ID: 37a7057d34ef
Revises: 8fcebf6d4203
Create Date: 2021-03-30 18:39:49.509192

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '37a7057d34ef'
down_revision = '8fcebf6d4203'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('artists',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=50), nullable=False),
    sa.Column('bio', sa.String(length=2000), nullable=False),
    sa.Column('image', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('albums',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=50), nullable=False),
    sa.Column('year', sa.Integer(), nullable=False),
    sa.Column('art_src', sa.String(), nullable=False),
    sa.Column('artist_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['artist_id'], ['artists.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('playlists',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=30), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('tracks',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(), nullable=False),
    sa.Column('track_num', sa.Integer(), nullable=False),
    sa.Column('num_plays', sa.Integer(), nullable=True),
    sa.Column('audio_src', sa.String(), nullable=False),
    sa.Column('vid_src', sa.String(), nullable=True),
    sa.Column('album_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['album_id'], ['albums.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('playlist_tracks',
    sa.Column('track_id', sa.Integer(), nullable=False),
    sa.Column('playlist_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['playlist_id'], ['playlists.id'], ),
    sa.ForeignKeyConstraint(['track_id'], ['tracks.id'], ),
    sa.PrimaryKeyConstraint('track_id')
    )
    op.create_table('track_artists',
    sa.Column('track_id', sa.Integer(), nullable=False),
    sa.Column('artist_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['artist_id'], ['artists.id'], ),
    sa.ForeignKeyConstraint(['track_id'], ['tracks.id'], ),
    sa.PrimaryKeyConstraint('track_id', 'artist_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('track_artists')
    op.drop_table('playlist_tracks')
    op.drop_table('tracks')
    op.drop_table('playlists')
    op.drop_table('albums')
    op.drop_table('artists')
    # ### end Alembic commands ###