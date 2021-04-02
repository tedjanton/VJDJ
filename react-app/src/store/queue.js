const ADD = "queue/ADD";

const load = (tracks) => ({
  type: ADD,
  tracks
})

export const addOneTrack = (trackId) => async dispatch => {
  const res = await fetch(`/api/tracks/${trackId}/`);

  const track = await res.json();
  dispatch(load(track));
  return track;
}

export const addMultipleTracks = (plTracks) => dispatch => {
  dispatch(load(plTracks));
  return plTracks;
}

const queueReducer = (state = [], action) => {
  switch (action.type) {
    case ADD:
      return [...state, action.tracks]
    default:
      return state;
  }
}

export default queueReducer;
