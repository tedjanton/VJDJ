import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import { signUp } from '../../store/session';
import { getWindowDimensions } from '../../utils';
import Recaptcha from './Recaptcha';

const SignUpForm = ({ setNav, authenticated, setAuthenticated }) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [errors, setErrors] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [windowDims, setWindowDims] = useState(getWindowDimensions());

  useEffect(() => setNav(false), [setNav]);

  useEffect(() => {
    const handleResize = () => {
      setWindowDims(getWindowDimensions());
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [])

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const user = await dispatch(signUp(
        username,
        firstName,
        lastName,
        email,
        password
      ));
      if (!user.errors) {
        setNav(true);
        setAuthenticated(true);
      } else {
        setErrors(user.errors);
      }
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
      <div className="login-container signup">
        <div className="login-logo signup">
          <i className="fab fa-spotify login" />
          <div className="login-logo-title">
            <span className="v login">V</span>
            <span className="j login">J</span>
            <span className="d login">D</span>
            <span className="j login">J</span>
          </div>
        </div>
        <div className="signup-instructions">
          <p>Sign up for free to start listening... and watching.</p>
        </div>
        <div className="login-fb-auth">
          <button>
            <i className="fab fa-facebook" />
            SIGN UP WITH FACEBOOK
          </button>
        </div>
        <div className="login-or-separator">
          <div className="login-or-line"></div>
          <div className="login-or">OR</div>
          <div className="login-or-line"></div>
        </div>
        <form className="signup-form" onSubmit={onSignUp}>
          <div className="login-form-errors">
            {errors.map((error) => (
              <div>{error}</div>
              ))}
          </div>
          <div className="login-email">
            <label>What's your username?</label>
            <input
              type='text'
              name='username'
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            ></input>
          </div>
          <div className="login-email">
            <label>What's your first name?</label>
            <input
              type='text'
              name='firstName'
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
            ></input>
          </div>
          <div className="login-email">
            <label>And your last name?</label>
            <input
              type='text'
              name='lastName'
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
            ></input>
          </div>
          <div className="login-email">
            <label>What's your email?</label>
            <input
              type='email'
              name='email'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            ></input>
          </div>
          <div className="login-email">
            <label>Create a password</label>
            <input
              type='password'
              name='password'
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            ></input>
          </div>
          <div className="login-email">
            <label>Confirm your password</label>
            <input
              type='password'
              name='repeat_password'
              onChange={(e) => setRepeatPassword(e.target.value)}
              value={repeatPassword}
              required={true}
            ></input>
          </div>
          <div className="sign-up-recaptcha">
            <Recaptcha />
          </div>
          <div className="signup-disclaimer">
            <p>{`By clicking on Sign up, you agree to VjDj's Terms and Conditions (lol).`}</p>
            <p>To learn more about how VjDj collects, uses, shares and protects your personal data, it doesn't, so phew!</p>
          </div>
          <div className="landing-demo signup">
            <button type='submit'>Sign Up</button>
          </div>
        </form>
        <div className="already-have-account">
          <p>Already have an account?</p>
          <NavLink id="to-login" to="/login">Sign in.</NavLink>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
