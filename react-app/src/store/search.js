const GET = "search/GET";

const load = (found) => ({
  type: GET,
  found
})

export const searchTables = (query) => async dispatch => {
  const res = await fetch(`/api/search/${query}/`);

  const found = await res.json();
  dispatch(load(found));
  return found;
}

const searchReducer = (state = {}, action) => {
  switch (action.type) {
    case GET:
      return {...state, found: action.found}
    default:
      return state;
  }
}

export default searchReducer;
