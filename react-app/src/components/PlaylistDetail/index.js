import React, { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ColorExtractor } from 'react-color-extractor';
import { useParams } from 'react-router-dom';
import playlist_placeholder from '../../images/playlist_placeholder.png';
import { AppWithContext } from '../../App';
import TrackListing from '../TrackListing';
import { getPlaylist } from '../../store/playlists';
import './PlaylistDetail.css';
import PlaylistActions from './PlaylistActions';
import { playlistImageBuilder } from '../../utils';

const initialDnDState = {
  draggedFrom: null,
  draggedTo: null,
  isDragging: false,
  originalOrder: [],
  updatedOrder: [],
}

const PlaylistDetail = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const playlist = useSelector(state => state.playlists.selected?.playlist);
  const tracks = useSelector(state => state.playlists.selected?.tracks);
  const following = useSelector(state => state.playlists.following);
  const user = useSelector(state => state.session.user);
  const [images, setImages] = useState([]);
  const [colors, getColors] = useState([]);
  const [draggable, setDraggable] = useState(false);
  const [dragAndDrop, setDragAndDrop] = useState(initialDnDState);
  const [list, setList] = useState();
  const [editState, setEditState] = useState(null);
  const [isUserPlaylist, setIsUserPlaylist] = useState();
  const { setInBrowse } = useContext(AppWithContext);

  useEffect(() => {
    document.getElementById("nav-home").classList.remove("browser");
  }, []);

  useEffect(() => setList(tracks), [tracks]);

  useEffect(() => setInBrowse(false), [setInBrowse]);

  useEffect(() => {
    (async() => {
      let pl = await dispatch(getPlaylist(params.id))
      setImages(playlistImageBuilder(pl));
    })();
  }, [dispatch, params]);

  const onDragStart = (e) => {
    const initialPosition = Number(e.currentTarget.dataset.position)
    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: initialPosition,
      isDragging: true,
      originalOrder: list,
    });
    e.dataTransfer.setData('text/html', '');
  };

  const onDragOver = (e) => {
    e.preventDefault();
    let newList = dragAndDrop.originalOrder;
    const draggedFrom = dragAndDrop.draggedFrom;
    const draggedTo = Number(e.currentTarget.dataset.position);
    const trackDragged = newList[draggedFrom];
    const tracksRemaining = newList.filter((track, i) => i !== draggedFrom);
    newList = [
      ...tracksRemaining.slice(0, draggedTo),
      trackDragged,
      ...tracksRemaining.slice(draggedTo)
    ];

    if (draggedTo !== dragAndDrop.draggedTo) {
      setDragAndDrop({
        ...dragAndDrop,
        updatedOrder: newList,
        draggedTo: draggedTo
      })
    };
  };

  const onDrop = () => {
    setList(dragAndDrop.updatedOrder);
    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: null,
      draggedTo: null,
      isDragging: false
    });
  };

  return (
    <div className="pl-page-container" style={{ backgroundColor: `${colors[3]}80`}}>
      <div className="pl-header-container">
        <div className="pl-header-image-container">
        {images.length < 4 ? (
          <div className="pl-image placeholder">
            <img src={playlist_placeholder} alt="placeholder" />
          </div>
        ) : (
          <>
          {images?.map((image, i) => (
            <div key={i} className="pl-image">
              <ColorExtractor getColors={(c) => getColors(c)}>
                <img src={image} alt="art" />
              </ColorExtractor>
            </div>
          ))}
          </>
        )}
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
              <p>{`${playlist?.user.firstName} ${playlist?.user.lastName}`}</p>
            </div>
            <div className="pl-num-songs">
              <p>{`• ${tracks?.length} ${tracks?.length === 1 ? "song" : "songs" }`}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="pl-bottom-container">
        <PlaylistActions
          playlist={playlist}
          tracks={tracks}
          following={following}
          user={user}
          setDraggable={setDraggable}
          setEditState={setEditState}
          draggable={draggable}
          dragAndDrop={dragAndDrop}
          isUserPlaylist={isUserPlaylist}
          setIsUserPlaylist={setIsUserPlaylist}
          setList={setList} />
        <div className="pl-table-container">
          <div className="pl-table-header">
            <div className="pl-header-track-num">
              <p>#</p>
            </div>
            <div className="pl-header-title">
              <p>TITLE</p>
            </div>
            <div className="pl-header-album">
              <p>ALBUM</p>
            </div>
            <div className="pl-header-vid">
              <p>VIDEO</p>
            </div>
            <div className="pl-header-time">
              <i className="far fa-clock" />
            </div>
          </div>
        </div>
        <section>
          <div className="tracks-container" style={{backgroundColor: editState }}>
            {list?.map((track, i) => (
              <div
                data-position={i}
                key={track.id}
                draggable={draggable}
                onDragStart={onDragStart}
                onDragOver={onDragOver}
                onDrop={onDrop}
                className={
                  dragAndDrop &&
                  dragAndDrop.draggedTo === Number(i) ?
                  "drop-area track-draggable" : "track-draggable"}
              >
                <TrackListing
                  track={track.track}
                  trackList={list}
                  index={i}
                  playlist={playlist}
                  key={track.id}
                  isUserPlaylist={isUserPlaylist}

                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default PlaylistDetail;
