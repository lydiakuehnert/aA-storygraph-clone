import React, { useState } from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const history = useHistory();


  if (sessionUser) return <Redirect to="/books" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const loginDemo = (e) => {
    e.preventDefault();

    dispatch(login('demo@aa.io', 'password')).then(history.push('/books'))
  }

  return (
    <div className="login-outer-box">
      <div className="login-upper-box">
        <NavLink exact to="/">
          <i class="fa-solid fa-book-open-reader"></i>
        </NavLink>
        <h2>THE</h2>
        <h2>PORCHSTORY</h2>
      </div>
      <div className="login-box">
        <form className="login-form" onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li className='errors' key={idx}>{error}</li>
          ))}
        </ul>
        <label>Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          /><br/>
        <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          /><br/>
        <button type="submit">Log In</button>
        <button id="login-demo" className='demo-button' onClick={loginDemo} >Demo User</button>
      </form>
      </div>
    </div>
  );
}

export default LoginFormPage;
