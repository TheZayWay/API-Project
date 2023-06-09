// frontend/src/components/LoginFormModal/index.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom"
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .then(() => history.push('/'))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  const isDisabled = credential.length < 4 || password.length < 6;

  return (
    <div className="entire-login-modal">
      <h3 className="login-title">Log In</h3>
      <form className="login-form" onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
            placeholder='Username or Email'
            className="credential-input"
          />
        </label>
        <label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder='Password'
            className="password-input"
          />
        </label>
        {errors.credential && (
          <p>{errors.credential}</p>
        )}
        <button className="login-button" type="submit" disabled={isDisabled}>Log In</button>
        <button
          className='demo-user-button'
          type='submit'
          onClick={() => {
            setCredential('Demo-lition');
            setPassword('password')
          }}>
          Demo User 
        </button>
      </form>
      
    </div>
  );
}

export default LoginFormModal;