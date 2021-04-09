const GET_ALL = "artists/GET_ALL";
const GET_ONE = 'artists/GET_ONE';

const loadAll = (artists) => ({
  type: GET_ALL,
  artists
});

const loadOne = (artist) => ({
  type: GET_ONE,
  artist
})

export const getArtists = () => async dispatch => {
  const res = await fetch('/api/artists/')

  const artists = await res.json()
  dispatch(loadAll(artists.artists));
  return artists.artists
};

export const getArtist = (artistId) => async dispatch => {
  const res = await fetch(`/api/artists/${artistId}/`)

  const artist = await res.json();
  dispatch(loadOne(artist));
  return artist;
}

const artistReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL:
      return { ...state, all: action.artists }
    case GET_ONE:
      return { ...state, selected: action.artist }
    default:
      return state;
  }
};

export default artistReducer;
