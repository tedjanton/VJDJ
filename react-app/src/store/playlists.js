const GET_USER_PLS = 'playlists/GET_USER_PLS';
const GET_PL = 'playlist/GET_PL';

const load = (playlists) => ({
  type: GET_USER_PLS,
  playlists
});

const loadOne = (playlist) => ({
  type: GET_PL,
  playlist
})

export const getUserPls = (userId) => async dispatch => {
  const res = await fetch(`/api/users/${userId}/playlists/`);

  const playlists = await res.json();
  dispatch(load(playlists.playlists));
  return playlists.playlists;
};

export const getPlaylist = (playlistId) => async dispatch => {
  const res = await fetch(`/api/playlists/${playlistId}/`);

  const playlist = await res.json();
  dispatch(loadOne(playlist))
  return playlist;
}

const playlistsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_USER_PLS:
      return { ...state, userPls: action.playlists };
    case GET_PL:
      return { ...state, selected: action.playlist };
    default:
      return state;
  }
}

export default playlistsReducer;
