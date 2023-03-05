import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { auth } from 'utils/firebaseConfig';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { toast } from 'react-toastify';

import Modal from 'components/Modal';
import { CloseAuth } from './Authentication.styled';
import { Button } from 'components/App/App.styled';
import { Input } from 'components/Searchbar';
import { useUser } from 'utils/userContext';

export default function Authentification({ className, closeAuth }) {
  const [isSignedUpForm, setIsSignedUpForm] = useState(false);
  const { logIn } = useUser();

  async function register(email, name, password) {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      logIn(name, email);
      closeAuth();
      toast.success(
        `${name}, you've successfully registered with email: ${email}`
      );
    } catch (error) {
      closeAuth();
      toast.error(error.message);
      console.error(error.message);
    }
  }
  async function authLogin(email, password) {
    try {
      //todo get name from firebase
      const name = '';
      await signInWithEmailAndPassword(auth, email, password);
      logIn(name, email);
      closeAuth();
      toast.success(
        `${name}, you've successfully logged in with email: ${email}`
      );
    } catch (error) {
      closeAuth();
      toast.error(error.message);
      console.error(error);
    }
  }

  function handleAuthSubmit(evt) {
    evt.preventDefault();
    const email = evt.target.elements.email.value;
    const password = evt.target.elements.password.value;
    const name = evt.target.elements.name?.value;

    //login in for existing users
    if (!isSignedUpForm) {
      authLogin(email, password);
    }
    //register new user in Firebase
    if (isSignedUpForm) {
      register(email, name, password);
    }
    evt.target.reset();
  }

  function handleSignInOrUp() {
    setIsSignedUpForm(prev => !prev);
  }

  return (
    <Modal
      className={className}
      contentLabel="login form modal"
      closeModal={closeAuth}
    >
      <button type="button" onClick={closeAuth} className="auth__close-btn">
        <CloseAuth width="40" height="40" />
      </button>
      <h2 className="auth__heading">{isSignedUpForm ? 'Sign up' : 'Login'}</h2>
      <form onSubmit={handleAuthSubmit} className="auth__form">
        <label className="auth__label">
          <p className="auth__label-text">Email</p>
          <Input
            name="email"
            type={'email'}
            required
            autoFocus
            placeholder="Enter your email"
            className="auth__input"
          />
        </label>
        {isSignedUpForm && (
          <label className="auth__label">
            <p className="auth__label-text">Name</p>
            <Input
              name="name"
              type={'text'}
              required
              autoFocus
              placeholder="Enter your name"
              className="auth__input"
            />
          </label>
        )}
        <label className="auth__label">
          <p className="auth__label-text">Password</p>
          <Input
            name="password"
            type={'password'}
            required
            placeholder="Enter your password"
            className="auth__input"
          />
        </label>
        <Button type="submit" className="auth__submit-btn">
          {isSignedUpForm ? 'Sign up' : 'Login'}
        </Button>
      </form>
      <p className="auth__or">/</p>
      <Button
        type="button"
        className="auth__submit-btn"
        onClick={handleSignInOrUp}
      >
        {isSignedUpForm ? 'Go to Login' : 'Go to Sign up'}
      </Button>
    </Modal>
  );
}

Authentification.propTypes = {
  className: PropTypes.string.isRequired,
};
