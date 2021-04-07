import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPlaylists } from '../../store/playlists';
import PlaylistBox from '../PlaylistBox';
import './PlaylistBrowser.css';

const PlaylistBrowser = () => {
  const dispatch = useDispatch();
  const playlists = useSelector(state => state.playlists.allPls)
  const [backgroundColor, setBackgroundColor] = useState("none");

  const addBackground = (e) => {
    document.getElementById("nav-home").classList.add("browser")
  }

  useEffect(() => {
    addBackground()
  }, [])

  useEffect(() => {
    dispatch(getAllPlaylists());
  }, []);


  return (
    <div className="plbrow-container">
      <div className="plbrow-title">
        <h2>Recent Playlists</h2>
      </div>
      <div className="plb-container">
        {playlists?.map(pl => (
          <div key={pl.id} className="pb-container">
            <PlaylistBox playlist={pl} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default PlaylistBrowser;
