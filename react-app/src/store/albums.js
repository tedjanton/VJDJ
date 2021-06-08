const GET_ALL = "albums/GET_ALL";
const GET_ONE = 'albums/GET_ONE';


// ACTION CREATORS
const loadAll = (albums) => ({
  type: GET_ALL,
  albums
});

const loadOne = (album) => ({
  type: GET_ONE,
  album
})

// THUNK ACTIONS
// API request for all albums
export const getAlbums = () => async dispatch => {
  const res = await fetch('/api/albums/')

  const albums = await res.json()
  dispatch(loadAll(albums.albums));
  return albums.albums
};

// API request for one album by album ID
export const getAlbum = (albumId) => async dispatch => {
  const res = await fetch(`/api/albums/${albumId}/`)

  const album = await res.json();
  dispatch(loadOne(album));
  return album;
}

const albumReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL:
      return { ...state, all: action.albums }
    case GET_ONE:
      return { ...state, selected: action.album }
    default:
      return state;
  }
};

export default albumReducer;
