import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { playlistImageBuilder } from '../../utils';
import playlist_placeholder from '../../images/playlist_placeholder.png';
import './NonTrackBox.css';

/*
This component is reused for all boxes (except a single
Track Box) and is used on the search page.
*/

const NonTrackBox = ({ artist, album, playlist }) => {
  const history = useHistory();
  const [images, setImages] = useState([]);

  // If a playlist box, build the image collage
  useEffect(() => {
    if (playlist) {
      setImages(playlistImageBuilder(playlist));
    }
  }, [playlist]);

  if (artist) {
    return (
      <div
        onClick={() => history.push(`/artists/${artist.id}`)}
        className="plb-container-inner">
        <div className="ab-image-container">
          <img src={artist.image} alt="artist" />
        </div>
        <div className="plb-name">
          <p>{artist.name}</p>
        </div>
        <div className="plb-by">
          <p>Artist</p>
        </div>
      </div>
    )
  } else if (album) {
    return (
      <div
        onClick={() => history.push(`/albums/${album.id}`)}
        className="plb-container-inner">
        <div className="album-image-container">
          <img src={album.art_src} alt="artist" />
        </div>
        <div className="plb-name">
          <p>{album.title}</p>
        </div>
        <div className="plb-by">
          <p>{album.artist.name}</p>
        </div>
      </div>
    )
  } else {
    return (
      <div
        onClick={() => history.push(`/playlists/${playlist.id}`)}
        className="plb-container-inner">
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
  };
};

export default NonTrackBox;
