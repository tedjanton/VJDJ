const GET_ALL = "artists/GET_ALL";

const loadAll = (artists) => ({
  type: GET_ALL,
  artists
});

export const getArtists = () => async dispatch => {
  const res = await fetch('/api/artists/')

  const artists = await res.json()
  dispatch(loadAll(artists.artists));
  return artists.artists
};

const artistReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL:
      return { ...state, all: action.artists }
    default:
      return state;
  }
};

export default artistReducer;
