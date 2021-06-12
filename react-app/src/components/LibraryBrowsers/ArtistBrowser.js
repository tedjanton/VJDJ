import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getArtists } from '../../store/artists';
import { useBrowsingState } from '../../utils';
import NonTrackBox from '../NonTrackBox';
import './Browser.css';

const ArtistBrowser = () => {
  const dispatch = useDispatch();
  const artists = useSelector(state => state.artists.all);
  useBrowsingState();

  useEffect(() => dispatch(getArtists()), [dispatch]);

  return (
    <div className="browser-page-container">
      <div className="browser-title">
        <h2>All Artists</h2>
      </div>
      <div className="browser-content-container">
        {artists?.map(artist => (
          <div key={artist.id} className="pb-container">
            <NonTrackBox artist={artist} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ArtistBrowser;
