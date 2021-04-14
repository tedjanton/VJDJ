import React, { useState, useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { AppWithContext } from '../../App';
import { searchTables } from '../../store/search';
import './SearchPage.css';


const SearchPage = () => {
  const dispatch = useDispatch();
  const { inBrowse, setInBrowse } = useContext(AppWithContext);
  const [query, setQuery] = useState("");

  const removeBackground = (e) => {
    document.getElementById("nav-home").classList.remove("browser")
  }

  useEffect(() => {
    removeBackground()
  }, []);

  useEffect(() => {
    setInBrowse(false)
  }, [inBrowse, setInBrowse]);

  useEffect(() => {
    if (query.length <= 1) return;
    if (query.length % 2 !== 0) return;
    dispatch(searchTables(query));
  }, [query])

  return (
    <>
      <div className="search-bar-container">
        <input
          type="text"
          name="search-bar"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Artists, songs, or playlists"
        />
      </div>
    </>
  )
};

export default SearchPage;
