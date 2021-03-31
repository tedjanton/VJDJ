const LOAD = "user/LOAD";
const REMOVE = "user/REMOVE";

const load = (user) => ({
  type: LOAD,
  user
});

const remove = () => ({
  type: REMOVE
});

export const authenticate = () => async dispatch => {
  const res = await fetch('/api/auth/')
  const user = await res.json()
  dispatch(load(user))
  return user;
}

export const login = (email, password) => async dispatch => {
  const res = await fetch('/api/auth/login/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const user = await res.json();
  dispatch(load(user));
  return user;
}

export const logout = () => async dispatch => {
  const res = await fetch("/api/auth/logout/");
  dispatch(remove());
  return await res.json();
};

export const signUp = (
  username,
  firstName,
  lastName,
  email,
  password
  ) => async dispatch => {
  const res = await fetch("/api/auth/signup/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username,
      first_name: firstName,
      last_name: lastName,
      email,
      password,
    }),
  });
  const user = await res.json();
  dispatch(load(user));
  return user;
}

const sessionReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD:
      return { ...state, user: action.user }
    case REMOVE:
      return { ...state, user: null }
    default:
      return state;
  }
}

export default sessionReducer;
