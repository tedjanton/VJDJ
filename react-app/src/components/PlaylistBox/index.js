import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import playlist_placeholder from '../../images/playlist_placeholder.png';
import './PlaylistBox.css';


const PlaylistBox = ({ playlist }) => {
  const history = useHistory();
  const [images, setImages] = useState([]);

  useEffect(() => {
    let imgs = [];
    if (playlist.tracks) {
      for (let i = 0; i < playlist.tracks.length; i++) {
        imgs.push(playlist.tracks[i].track.album.art_src);
      }
    }
    let square = imgs.filter((img, i) => i < 4)
    setImages(square);
  }, [])

  return (
    <div onClick={() => history.push(`/playlists/${playlist.id}`)}className="plb-container-inner">
      <div className="plb-image-container">
        {images.length < 4 ? (
          <div className="plb-image placeholder">
            <img src={playlist_placeholder} alt="art" />
          </div>
        ) : (
          <>
          {images?.map((image, i) => (
            <div key={i} className={`plb-image image-${i}`}>
              <img src={image} alt="art" />
            </div>
          ))}
          </>
        )}
      </div>
      <div className="plb-name">
        <p>{playlist.name}</p>
      </div>
      <div className="plb-by">
        <p>{`by ${playlist.user.firstName} ${playlist.user.lastName}`}</p>
      </div>
    </div>

  )
}

export default PlaylistBox;
