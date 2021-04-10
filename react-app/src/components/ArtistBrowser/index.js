import React, { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppWithContext } from '../../App';
import { getArtists } from '../../store/artists';
import ArtistBox from '../ArtistBox';
import './ArtistBrowser.css';

const ArtistBrowser = () => {
  const dispatch = useDispatch();
  const { setInBrowse } = useContext(AppWithContext);
  const artists = useSelector(state => state.artists.all);

  const addBackground = (e) => {
    document.getElementById("nav-home").classList.add("browser")
  }

  useEffect(() => {
    setInBrowse(true);
    addBackground()
  })

  useEffect(() => {
    dispatch(getArtists())
  }, [dispatch])

  return (
    <div className="plbrow-container">
      <div className="plbrow-title">
        <h2>All Artists</h2>
      </div>
      <div className="plb-container">
        {artists?.map(artist => (
          <div key={artist.id} className="pb-container">
            <ArtistBox artist={artist} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ArtistBrowser;
