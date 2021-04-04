import React, { useEffect, useState, useContext, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ColorExtractor } from 'react-color-extractor';
import { useHistory, useParams } from 'react-router-dom';
import { AppWithContext } from '../../App';
import TrackListing from './TrackListing';
import { formatTrack } from '../../utils';
import { editPlaylist, getPlaylist } from '../../store/playlists';
import { addMultipleTracks } from '../../store/queue';
import './PlaylistDetail.css';

const initialDnDState = {
  draggedFrom: null,
  draggedTo: null,
  isDragging: false,
  originalOrder: [],
  updatedOrder: [],
}

const PlaylistDetail = () => {
  const { trackQueue, setTrackQueue, isPlaying, setIsPlaying } = useContext(AppWithContext)
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const playlist = useSelector(state => state.playlists.selected?.playlist);
  const tracks = useSelector(state => state.playlists.selected?.tracks);
  const [images, setImages] = useState([]);
  const [colors, getColors] = useState([]);
  const [draggable, setDraggable] = useState(false);
  const [dragAndDrop, setDragAndDrop] = useState(initialDnDState)
  const [list, setList] = useState();
  const [openMenu, setOpenMenu] = useState(false);
  const [newPl, setNewPl] = useState();

  useEffect(() => {
    setList(tracks);
  }, [tracks])


  useEffect(() => {
    (async() => {
      let pl = await dispatch(getPlaylist(params.id))
      let imgs = [];
      if (pl.tracks) {
        for (let i = 0; i < pl.tracks.length; i++) {
          imgs.push(pl.tracks[i].track.album.art_src);
        }
      }
      let square = imgs.filter((img, i) => i < 4)
      setImages(square);
    })();
  }, [dispatch, params])

  const addToQueue = () => {
    if (trackQueue.length) {
      setIsPlaying(false)
      setTrackQueue([])
    } else {
      const plTracks = tracks.map(({ track }) => formatTrack(track));
      setTrackQueue([...trackQueue, ...plTracks])
      setIsPlaying(true);
    }
  }

  const onDragStart = (e) => {
    const initialPosition = Number(e.currentTarget.dataset.position)
    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: initialPosition,
      isDragging: true,
      originalOrder: list,
    })
    e.dataTransfer.setData('text/html', '');
  }

  const onDragOver = (e) => {
    e.preventDefault();
    let newList = dragAndDrop.originalOrder;
    const draggedFrom = dragAndDrop.draggedFrom;
    const draggedTo = Number(e.currentTarget.dataset.position);
    const itemDragged = newList[draggedFrom];
    const remainingItems = newList.filter((track, i) => i !== draggedFrom);
    newList = [
      ...remainingItems.slice(0, draggedTo),
      itemDragged,
      ...remainingItems.slice(draggedTo)
    ];

    if (draggedTo !== dragAndDrop.draggedTo) {
      setDragAndDrop({
        ...dragAndDrop,
        updatedOrder: newList,
        draggedTo: draggedTo
      })
    }
  }

  const onDrop = () => {
    setList(dragAndDrop.updatedOrder);
    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: null,
      draggedTo: null,
      isDragging: false
    });
  };

  const playlistMenu = () => {
    setOpenMenu(!openMenu)
  }

  const handleEdit = () => {
    setOpenMenu(false);
    setDraggable(true);
  }

  const submitEdits = async () => {
    const submission = dragAndDrop.updatedOrder.map(({track}, i) => {
      return {
        track_id: track.id,
        order_num: i + 1,
      }
    })
    dispatch(editPlaylist(submission, playlist.id))
    window.location.reload();
  }


  return (
    <div className="pl-page-container">
      <div className="pl-header-container" style={{ backgroundColor: `${colors[3]}80`}}>
        <div className="pl-header-image-container">
        {images && images?.map((image, i) => (
          <div key={i} className="pl-image">
            <ColorExtractor getColors={(c) => getColors(c)}>
              <img src={image} alt="art" />
            </ColorExtractor>
          </div>
        ))}
        </div>
        <div className="pl-header-details-container">
          <div className="pl-header-playlist">
            <p>PLAYLIST</p>
          </div>
          <div className="pl-header-name">
            <h2>{playlist?.name}</h2>
          </div>
          <div className="pl-subheader">
            <div className="pl-user-name">
              <p>{`${playlist?.user.firstName} ${playlist?.user.lastName} •`}</p>
            </div>
            <div className="pl-num-songs">
              <p>{`${tracks?.length} ${tracks?.length === 1 ? "song" : "songs" }`}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="pl-bottom-container">
        <div className="pl-bottom-header">
          <div className="pl-bottom-header-left">
            <div className="pl-music-play-buttons">
            {isPlaying ? (
              <button
                type="button"
                className="pl-pause"
                aria-label="Pause"
                onClick={addToQueue}
              >
                <i className="pl fas fa-pause" />
              </button>
            ) : (
              <button
                type="button"
                className="pl-play"
                aria-label="Play"
                onClick={addToQueue}
              >
                <i className="pl fas fa-play" />
              </button>
            )}
            </div>
            <div className="pl-like-button">
              <i className="pl fas fa-heart" />
            </div>
            <div
              className="pl-dot-menu"
              onClick={playlistMenu}>
              <i className="pl fas fa-ellipsis-h" />
            </div>
            {openMenu && (
              <div className="pl-menu-box">
                <div className="pl-add-songs-button">
                  <button>Add Songs</button>
                </div>
                <div className="pl-edit-button">
                  <button onClick={handleEdit}>Edit Playlist</button>
                </div>
                <div className="pl-delete-button">
                  <button>Delete Playlist</button>
                </div>
              </div>
            )}
          </div>
          <div className="pl-bottom-header-right">
            {draggable && (
              <div className="pl-edit-confirm-button">
                <button onClick={submitEdits}>Confirm Changes</button>
              </div>
            )}
          </div>
        </div>
        <div className="pl-table-container">
          <div className="pl-table-header">
            <div className="pl-header-num-title-container">
              <div className="pl-header-track-num">
                <p>#</p>
              </div>
              <div className="pl-header-title">
                <p>TITLE</p>
              </div>
            </div>
            <div className="pl-header-album">
              <p>ALBUM</p>
            </div>
            <div className="pl-header-vid">
              <p>WATCH VIDEO</p>
            </div>
            <div className="pl-header-time">
              <i className="far fa-clock" />
            </div>
          </div>
        </div>
      </div>
      <section>
        <div className="tracks-container">
          {list?.map((track, i) => (
            <div
              data-position={i}
              key={track.id}
              draggable={draggable}
              onDragStart={onDragStart}
              onDragOver={onDragOver}
              onDrop={onDrop}
              className="track-draggable"
            >
              <TrackListing
                track={track}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                key={track.id}
              />
            </div>
          ))}
        </div>
      </section>
      <div className="pl-margin-bottom"></div>
    </div>
  )
}

export default PlaylistDetail;
