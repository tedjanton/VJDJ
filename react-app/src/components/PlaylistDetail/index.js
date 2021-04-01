import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ColorExtractor } from 'react-color-extractor';
import { useParams } from 'react-router-dom';
import { getPlaylist } from '../../store/playlists';
import './PlaylistDetail.css';


const PlaylistDetail = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const playlist = useSelector(state => state.playlists.selected?.playlist);
  const tracks = useSelector(state => state.playlists.selected?.tracks);
  const [images, setImages] = useState([]);
  const [colors, getColors] = useState([]);

  useEffect(() => {
    (async() => {
      let pl = await dispatch(getPlaylist(params.id))
      let imgs = [];
      if (pl.tracks) {
        for (let i = 0; i < 4; i++) {
          imgs.push(pl.tracks[i].track.album.art_src);
        }
      }
      setImages(imgs);
    })();
  }, [dispatch, params])

  return (
    <div className="pl-page-container" style={{ backgroundColor: `${colors[3]}80`}}>
      <div className="pl-header-container">
        <div className="pl-header-image-container">
        {images?.map((image, i) => (
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
    </div>
  )
}

export default PlaylistDetail;
