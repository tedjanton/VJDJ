const GET_USER_PLS = 'playlists/GET_USER_PLS';
const GET_PL = 'playlist/GET_PL';
const ADD_TRACK = 'playlist/ADD_TRACK';

const load = (playlists) => ({
  type: GET_USER_PLS,
  playlists
});

const loadOne = (playlist) => ({
  type: GET_PL,
  playlist
});

const addTrack = (playlistTrack) => ({
  type: ADD_TRACK,
  playlistTrack
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

export const createPlaylist = (newPlaylist) => async dispatch => {
  const { name, user_id } = newPlaylist;
  const res = await fetch('/api/playlists/create/', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, user_id })
  });

  const newPl = await res.json();
  dispatch(loadOne(newPl));
  return newPl;
};

export const editPlaylist = (editedPl, playlistId) => async dispatch => {
  const res = await fetch(`/api/playlists/${playlistId}/edit/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(editedPl)
  });

  const playlist = await res.json();
  dispatch(loadOne(playlist));
  return playlist;
};

export const addToPlaylist = (playlistTrack) => async dispatch => {
  const { track_id, playlist_id, order_num } = playlistTrack;
  const res = await fetch(`/api/playlists/${playlist_id}/add/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ track_id, playlist_id, order_num })
  })

  const newPlaylistTrack = await res.json();
  console.log(newPlaylistTrack)
  // dispatch(addTrack(newPlaylistTrack))
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
