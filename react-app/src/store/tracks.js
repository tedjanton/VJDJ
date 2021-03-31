const GET_TRACKS = 'tracks/GET_TRACKS';

const load = (tracks) => ({
  type: GET_TRACKS,
  tracks
})

export const getPopTracks = () => async dispatch => {
  const res = await fetch('/api/tracks/popular/');

  const tracks = await res.json();
  dispatch(load(tracks.pop_tracks));
  return tracks;
}

const tracksReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_TRACKS:
      return { ...state, popTracks: action.tracks };
    default:
      return state;
  }
}

export default tracksReducer;
