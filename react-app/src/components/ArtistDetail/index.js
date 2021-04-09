import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import verified from '../../images/verified.png';
import { getArtist } from '../../store/artists';
import './ArtistDetail.css';


const ArtistDetail = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const artist = useSelector(state => state.artists.selected);

  useEffect(() => {
    dispatch(getArtist(params.id))
  }, [dispatch])

  return (
    <div className="ad-container">
      <div className="ad-header">
        <div className="ad-header-top">
          <img src={verified} alt="verified" />
          <p>Verified Artist</p>
        </div>
        <div className="ad-header-name">
          <h1></h1>
        </div>
      </div>
    </div>
  )
}

export default ArtistDetail;
