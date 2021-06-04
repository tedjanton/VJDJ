import React, { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppWithContext from '../../context/AppWithContext';
import { getAlbums } from '../../store/albums';
import ArtistAlbumBox from '../ArtistAlbumBox';
import './AlbumBrowser.css';

const AlbumBrowser = () => {
  const dispatch = useDispatch();
  const { setInBrowse } = useContext(AppWithContext);
  const albums = useSelector(state => state.albums.all);

  useEffect(() => {
    setInBrowse(true);
    document.getElementById("nav-home").classList.add("browser")
  })

  useEffect(() => dispatch(getAlbums()), [dispatch]);

  return (
    <div className="plbrow-container">
      <div className="plbrow-title">
        <h2>All Albums</h2>
      </div>
      <div className="plb-container">
        {albums?.map(album => (
          <div key={album.id} className="pb-container">
            <ArtistAlbumBox album={album} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default AlbumBrowser;
