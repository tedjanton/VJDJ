import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import { signUp } from '../../store/session';
import ComingSoon from '../ComingSoon';
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
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [recaptcha, setRecaptcha] = useState(false);
  const [recaptchaErr, setRecaptchaErr] = useState('');

  useEffect(() => setNav(false), [setNav]);

  const onSignUp = async (e) => {
    e.preventDefault();
    if (!recaptcha) {
      setRecaptchaErr("Please confirm you're not a robot!")
    } else {
      setRecaptchaErr("")
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
      } else {
        setErrors(["Passwords must match"])
      }
    }
  };

  const comingSoon = () => {
    setShowComingSoon(true);
    setTimeout(() => {
      setShowComingSoon(false);
    }, 2900)
  };

  if (authenticated) {
    return <Redirect to='/home' />;
  };

  return (
    <div className="login-page">
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
          <button onClick={comingSoon}>
            <i className="fab fa-facebook" />
            SIGN UP WITH FACEBOOK
          </button>
          {showComingSoon && (
            <ComingSoon />
          )}
        </div>
        <div className="login-or-separator">
          <div className="login-or-line"></div>
          <div className="login-or">OR</div>
          <div className="login-or-line"></div>
        </div>
        <form className="signup-form" onSubmit={onSignUp}>
          <div className="login-form-errors">
            {errors.map((error) => (
              <div key={error}>{error}</div>
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
            <Recaptcha recaptcha={recaptcha} setRecaptcha={setRecaptcha} />
            {recaptchaErr && (
              <div className="recaptcha-errors">{recaptchaErr}</div>
            )}
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
