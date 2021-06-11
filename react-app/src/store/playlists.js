const GET_USER_PLS = 'playlists/GET_USER_PLS';
const GET_PL = 'playlist/GET_PL';
const GET_USER_FOLLOWING = "following/GET_USER_FOLLOWING";
const GET_ALL = "playlists/GET_ALL";

const loadFollowing = (playlists) => ({
  type: GET_USER_FOLLOWING,
  playlists
})

const load = (playlists) => ({
  type: GET_USER_PLS,
  playlists
});

const loadOne = (playlist) => ({
  type: GET_PL,
  playlist
});

const loadAll = (playlists) => ({
  type: GET_ALL,
  playlists
});

export const getUserPls = (userId) => async dispatch => {
  const res = await fetch(`/api/users/${userId}/playlists/`);

  const playlists = await res.json()
  dispatch(load(playlists.userPls));
  return playlists.userPls;
};

export const getUserFollowedPls = (userId) => async dispatch => {
  const res = await fetch(`/api/users/${userId}/following/`)

  const playlists = await res.json();
  dispatch(loadFollowing(playlists.following))
  return playlists.following;
}

export const getPlaylist = (playlistId) => async dispatch => {
  const res = await fetch(`/api/playlists/${playlistId}/`);

  const playlist = await res.json();
  dispatch(loadOne(playlist))
  return playlist;
}

export const getAllPlaylists = () => async dispatch => {
  const res = await fetch('/api/playlists/')

  const playlists = await res.json();
  dispatch(loadAll(playlists.playlists));
  return playlists.playlists;
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

export const addToPlaylist = (playlistTrack, userId) => async dispatch => {
  const { track_id, playlist_id } = playlistTrack;
  const res = await fetch(`/api/playlists/add/${playlist_id}/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ track_id, playlist_id, userId })
  })

  const userPlaylists = await res.json();
  dispatch(load(userPlaylists.playlists))
  return userPlaylists.playlist;
};

export const deleteFromPlaylist = (track) => async dispatch => {
  const { track_id, playlist_id, order_num } = track;
  const res = await fetch( `/api/playlists/${playlist_id}/remove-track/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ track_id, playlist_id, order_num })
  })

  const playlist = await res.json();
  dispatch(loadOne(playlist));
  return playlist;
};

export const addFollow = ({ userId, playlistId }) => async dispatch => {
  const res = await fetch(`/api/users/${userId}/add-follow/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ playlistId })
  })

  const playlists = await res.json();
  dispatch(loadFollowing(playlists.following))
  return playlists.following;
};

export const unfollow = ({ userId, playlistId }) => async dispatch => {
  const res = await fetch(`/api/users/${userId}/unfollow/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ playlistId })
  })

  const playlists = await res.json();
  dispatch(loadFollowing(playlists.following))
  return playlists.following;
};

export const deletePlaylist = (playlistId) => async dispatch => {
  const res = await fetch(`/api/playlists/${playlistId}/delete/`)

  const playlists = await res.json();
  dispatch(loadAll(playlists.playlists));
  return playlists.playlists;
}

const playlistsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_USER_PLS:
      return { ...state, userPls: action.playlists };
    case GET_PL:
      return { ...state, selected: action.playlist };
    case GET_USER_FOLLOWING:
      return { ...state, following: action.playlists };
    case GET_ALL:
      return { ...state, allPls: action.playlists };
    default:
      return state;
  }
}

export default playlistsReducer;
