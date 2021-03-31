import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPopTracks } from '../../store/tracks';
import TrackBox from '../TrackBox';
import './Popular.css';

const Popular = () => {
  const dispatch = useDispatch();
  const popTracks = useSelector(state => state.tracks.popTracks);

  useEffect(() => {
    dispatch(getPopTracks())
  }, [dispatch])

  return (
    <div className="popular-container">
      <div className="popular-header">
        <h2>Popular songs</h2>
      </div>
      <div className="popular-songs-container">
      {popTracks?.map(track => (
        <div className="track-container" key={track.id}>
          <TrackBox track={track} />
        </div>
      ))}
      </div>
    </div>
  )
}

export default Popular;
