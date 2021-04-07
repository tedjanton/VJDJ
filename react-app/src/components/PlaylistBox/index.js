import React, { useEffect, useState } from 'react';
import './PlaylistBox.css';


const PlaylistBox = ({ playlist }) => {
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

  console.log(images);

  return (
    <div className="plb-container-inner">
      <div className="plb-image-container">
        {images?.map((image, i) => (
          <div key={i} className={`plb-image image-${i}`}>
            <img src={image} alt="art" />
          </div>
        ))}
      </div>
      <p>{playlist.name}</p>
    </div>

  )
}

export default PlaylistBox;
