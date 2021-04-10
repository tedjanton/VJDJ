import React, { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppWithContext } from '../../App';
import { getAlbums } from '../../store/albums';
import ArtistBox from '../ArtistBox';
import './AlbumBrowser.css';

const AlbumBrowser = () => {
  const dispatch = useDispatch();
  const { setInBrowse } = useContext(AppWithContext);
  const albums = useSelector(state => state.albums.all);

  const addBackground = (e) => {
    document.getElementById("nav-home").classList.add("browser")
  }

  useEffect(() => {
    setInBrowse(true);
    addBackground()
  })

  useEffect(() => {
    dispatch(getAlbums())
  }, [dispatch])

  return (
    <div className="plbrow-container">
      <div className="plbrow-title">
        <h2>All Artists</h2>
      </div>
      <div className="plb-container">
        {albums?.map(album => (
          <div key={album.id} className="pb-container">
            <ArtistBox album={album} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default AlbumBrowser;
