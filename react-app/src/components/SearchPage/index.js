import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppWithContext } from '../../App';
import { searchTables } from '../../store/search';
import ArtistAlbumBox from '../ArtistAlbumBox';
import PlaylistBox from '../PlaylistBox';
import TrackBox from '../TrackBox';
import './SearchPage.css';

const SearchPage = () => {
  const dispatch = useDispatch();
  const { inBrowse, setInBrowse } = useContext(AppWithContext);
  const results = useSelector(state => state.search.found);
  const [query, setQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    document.getElementById("nav-home").classList.remove("browser");
  }, []);

  useEffect(() => {
    setInBrowse(false)
  }, [inBrowse, setInBrowse]);

  useEffect(() => {
    if (query.length <= 2) return;
    dispatch(searchTables(query));
  }, [query, dispatch])

  useEffect(() => {
    let count = 0
    if (results) {
      for (let key in results) {
        if (results[key].length === 0) {
          count += 1
        }
      }
    }
    if (count === 4) setNoResults(true);
    else setNoResults(false);
  }, [results])

  return (
    <div className="search-page-container">
      <div className="search-bar-container">
        <i className="fas fa-search search-bar" />
        <input
          type="text"
          name="search-bar"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Artists, songs, or playlists"
        />
      </div>
      {query.length <= 2 ? (
        <div className="search-placeholder">
          <div className="search-music-icon">
            <i className="fas fa-music search" />
          </div>
          <h1>Discover your new favorite music...</h1>
        </div>
      ) : (
        <div className="search-results-container">
          {results?.artists && (
            <>
              {results.artists.length > 0 && (
                <h2 className="search-results-artists-header">Artists</h2>
              )}
              <div className="search-results-artists">
                {results.artists.map(artist => (
                  <ArtistAlbumBox key={artist.id} artist={artist} />
                ))}
              </div>
            </>
          )}
          {results?.albums && (
            <>
              {results.albums.length > 0 && (
                <h2 className="search-results-albums-header">Albums</h2>
              )}
              <div className="search-results-albums">
                {results.albums.map(album => (
                  <ArtistAlbumBox key={album.id} album={album} />
                ))}
              </div>
            </>
          )}
          {results?.playlists && (
            <>
              {results.playlists.length > 0 && (
                <h2 className="search-results-playlists-header">Playlists</h2>
              )}
              <div className="search-results-playlists">
                {results.playlists.map(playlist => (
                  <PlaylistBox key={playlist.id} playlist={playlist} />
                ))}
              </div>
            </>
          )}
          {results?.tracks && (
            <>
              {results.tracks.length > 0 && (
                <h2 className="search-results-tracks-header">Songs</h2>
              )}
              <div className="search-results-tracks">
                {results.tracks.map((track, i) => (
                  <TrackBox key={track.id} track={track} trackList={results.tracks} index={i} />
                ))}
              </div>
            </>
          )}
        </div>
      )}
      {noResults && query.length > 2 && (
        <div className="search-placeholder">
          <h1>No luck with that...please try again.</h1>
        </div>
      )}
    </div>
  )
};

export default SearchPage;
