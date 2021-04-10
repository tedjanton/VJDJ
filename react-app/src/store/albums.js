const GET_ALL = "albums/GET_ALL";
const GET_ONE = 'albums/GET_ONE';

const loadAll = (albums) => ({
  type: GET_ALL,
  albums
});

const loadOne = (album) => ({
  type: GET_ONE,
  album
})

export const getAlbums = () => async dispatch => {
  const res = await fetch('/api/albums/')

  const albums = await res.json()
  console.log(albums);
  dispatch(loadAll(albums.albums));
  return albums.albums
};

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
