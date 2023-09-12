import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from 'react-router-dom';
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [errors, setErrors] = useState([]);
  const [errors, setErrors] = useState("");
  const { closeModal } = useModal();
  const history = useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      // setErrors(data);
      setErrors("Invalid Credentials");
    } else {
        closeModal()
    }
  };

  const loginDemo = (e) => {
    e.preventDefault();

    dispatch(login('demo@aa.io', 'password')).then(closeModal()).then(history.push('/books'))
  }

  return (
    <div className="modal-login-outer-box">
    <div className="modal-login-box">
      <form className="modal-login-form" onSubmit={handleSubmit}>
        {/* <ul>
          {errors.map((error, idx) => (
            <li className="errors" key={idx}>{error}</li>
          ))}
        </ul> */}
        {errors && <p className='errors'>{errors}</p>}
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        <button id="login-nodemo" className='modal-login-button' type="submit">Log in</button>
        <button id="login-demo2" className='modal-login-button' onClick={loginDemo} >Demo User</button>
      </form>
    </div>
    </div>
  );
}

export default LoginFormModal;
