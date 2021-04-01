import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPlaylist } from '../../store/playlists';
import './PlaylistDetail.css';


const PlaylistDetail = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const playlist = useSelector(state => state.playlists.selected);
  const [images, setImages] = useState([])

  useEffect(async () => {
    let pl = await dispatch(getPlaylist(params.id))
    let imgs = [];
    if (pl.tracks) {
      for (let i = 0; i < 4; i++) {
        imgs.push(pl.tracks[i].track.album.art_src);
      }
    }
    setImages(imgs);
  }, [dispatch, params])

  console.log(images);


  return (
    <div className="pl-page-container">
      <div className="pl-header-container">
        <h1>Playlist Detail</h1>
      </div>
    </div>
  )
}

export default PlaylistDetail;
