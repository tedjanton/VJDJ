const GET_USER_PLS = 'playlists/GET_USER_PLS';

const load = (playlists) => ({
  type: GET_USER_PLS,
  playlists
});

export const getUserPls = (userId) => async dispatch => {
  const res = await fetch(`/api/users/${userId}/playlists/`);

  const playlists = await res.json();
  dispatch(load(playlists.playlists));
  return playlists.playlists;
};

const playlistsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_USER_PLS:
      return { ...state, userPls: action.playlists };
    default:
      return state;
  }
}

export default playlistsReducer;
