import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { login } from '../../store/session';
import google from '../../images/google.png';
import "./LoginForm.css";

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return { width, height };
}

const LoginForm = ({ setNav, authenticated, setAuthenticated }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [windowDims, setWindowDims] = useState(getWindowDimensions());

  useEffect(() => {
    const handleResize = () => {
      setWindowDims(getWindowDimensions());
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [])

  useEffect(() => {
    setNav(false)
  }, [setNav])

  const onLogin = async (e) => {
    e.preventDefault();
    const user = await dispatch(login(email, password));
    if (!user.errors) {
      setNav(true);
      setAuthenticated(true);
    } else {
      setErrors(user.errors);
    }
  };

  if (authenticated) {
    return <Redirect to='/home' />;
  }

  return (
    <div
      className="login-page"
      style={{ width: windowDims.width, height: windowDims.height}}
    >
      <div className="login-container">
        <div className="login-logo">
          <i className="fab fa-spotify login" />
          <div className="login-logo-title">
            <span className="v login">V</span>
            <span className="j login">J</span>
            <span className="d login">D</span>
            <span className="j login">J</span>
          </div>
        </div>
        <div className="login-instructions">
          <p>To continue, log in to VjDj.</p>
        </div>
        <div className="login-fb-auth">
          <button>
            <i className="fab fa-facebook" />
            CONTINUE WITH FACEBOOK
          </button>
        </div>
        <div className="login-apple-auth">
          <button>
            <i className="fab fa-apple" />
            CONTINUE WITH APPLE
          </button>
        </div>
        <div className="login-google-auth">
          <button>
            <img className="google-logo" src={google} alt="google" />
            CONTINUE WITH GOOGLE
          </button>
        </div>
        <div className="login-or-separator">
          <div className="login-or-line"></div>
          <div className="login-or">OR</div>
          <div className="login-or-line"></div>
        </div>
        <form className="login-form" onSubmit={onLogin}>
          <div className="login-form-errors">
            {errors.map((error) => (
              <div>{error}</div>
              ))}
          </div>
          <div className="login-email">
            <label htmlFor='email'>Email address</label>
            <input
              name='email'
              type='text'
              placeholder='Email address'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              />
          </div>
          <div className="login-password">
            <label htmlFor='password'>Password</label>
            <input
              name='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="login-forgot-password">
            <p>Forgot your password?</p>
          </div>
          <div className="login-remember-button-container">
            <div className="login-remember-container">
              <input name="remember" type="checkbox" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <div className="login-submit">
              <button type="submit">LOG IN</button>
            </div>
          </div>
          <div className="login-no-account">
            <p>Don't have an account?</p>
            <button onClick={() => history.push("/sign-up")}>SIGN UP FOR VJDJ</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
