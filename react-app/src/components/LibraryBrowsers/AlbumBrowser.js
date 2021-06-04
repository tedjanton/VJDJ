import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAlbums } from '../../store/albums';
import { useBrowsingState } from '../../utils';
import ArtistAlbumBox from '../ArtistAlbumBox';
import './Browser.css';

const AlbumBrowser = () => {
  const dispatch = useDispatch();
  const albums = useSelector(state => state.albums.all);
  useBrowsingState();

  useEffect(() => dispatch(getAlbums()), [dispatch]);

  return (
    <div className="browser-page-container">
      <div className="browser-title">
        <h2>All Albums</h2>
      </div>
      <div className="browser-content-container">
        {albums?.map(album => (
          <div key={album.id} className="pb-container">
            <ArtistAlbumBox album={album} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlbumBrowser;
