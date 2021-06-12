import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPlaylists } from '../../store/playlists';
import { useBrowsingState } from '../../utils';
import NonTrackBox from '../NonTrackBox';
import './Browser.css';

const PlaylistBrowser = () => {
  const dispatch = useDispatch();
  const playlists = useSelector(state => state.playlists.allPls)
  useBrowsingState();

  useEffect(() => dispatch(getAllPlaylists()), [dispatch]);

  return (
    <div className="browser-page-container">
      <div className="browser-title">
        <h2>Recent Playlists</h2>
      </div>
      <div className="browser-content-container">
        {playlists?.map(pl => (
          <div key={pl.id} className="pb-container">
            <NonTrackBox playlist={pl} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default PlaylistBrowser;
