import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [profile_pic, setProfilePic] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [errorObject, setErrorObject] = useState({})
  const [submitted, setSubmitted] = useState(false);

  
  useEffect(() => {
    const errorObj = {};
    const imageTypes = [".pdf", ".png", ".jpeg", ".jpg", ".gif"];
    if (username.length >= 40) errorObj["username"] = "Username must be 40 characters or less";
    if (!username.length) errorObj["username"] = "Username cannot be blank";
    if (username.includes('@')) errorObj["username"] = "Username cannot be an email";
    if (email >= 255) errorObj["email"] = "Email must be must be 255 characters or less";
    if (!email.includes('@') || !email.includes('.')) errorObj["email"] = "Invalid email";
    if (!email.length) errorObj["email"] = "Email cannot be blank";
    if (firstname.length >= 100) errorObj['firstname'] = "First name must be must be 100 characters or less";
    if (lastname.length >= 100) errorObj['lastname'] = "Last name must be must be 100 characters or less";
    if (password !== confirmPassword) errorObj['password'] = 'Passwords must match';
    if (password.length < 6) errorObj['password'] = "Password must be at least 6 characters long";

    if (profile_pic && !(imageTypes.some(type => {
      return profile_pic.name.endsWith(type)
    }))) {
      errorObj.profile_pic = 'Acceptable image files must end in .pdf, .png, .jpg, .jpeg or .gif'
    }
    
    if (submitted) {
      setErrorObject(errorObj)
    }
  }, [username, email, password, confirmPassword, submitted, firstname, lastname, profile_pic])
  
  if (sessionUser) return <Redirect to="/books" />;
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    setErrorObject({})
    if (!Object.values(errorObject).length) {
      if (password === confirmPassword) {

          const formData = new FormData()
          formData.append("username", username)
          formData.append("email", email)
          formData.append("password", password)
          formData.append("firstname", firstname)
          formData.append("lastname", lastname)
          formData.append("profile_pic", profile_pic)

          const data = await dispatch(signUp(formData));
          if (data) {
            setErrors(data)
          }
      } else {
          setErrors(['Confirm Password field must be the same as the Password field']);
      }
    }
  };

  return (
    <div className="signup-outer-box">
      <div className="upper-box">
        <NavLink exact to="/">
            <i class="fa-solid fa-book-open-reader"></i>
        </NavLink>
            <h2>THE</h2>
            <h2>PORCHSTORY</h2>
      </div>
      <div className="signup-box">
        <form className="signup-form" onSubmit={handleSubmit} enctype="multipart/form-data">
          <ul>
            {errors.map((error, idx) => (
              <li className='errors' key={idx}>{error}</li>
            ))}
          </ul>
          <label>Email address</label>
            <input className='signup-input'
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
          /><br />
          {errorObject.email && <p className='errors'>{errorObject.email}</p>}

          <label>Username</label>
            <input className='signup-input'
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
          /><br />
          {errorObject.username && <p className='errors'>{errorObject.username}</p>}

          <label>First Name (optional)</label>
            <input className='signup-input'
              type="text"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            /><br/>
          {errorObject.firstname && <p className='errors'>{errorObject.firstname}</p>}

          <label>Last Name (optional)</label>
            <input className='signup-input'
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            /><br/>
          {errorObject.lastname && <p className='errors'>{errorObject.lastname}</p>}

          <label>Profile Picture (optional)</label>
            <input className='signup-input'
              type="file"
              accept='.pdf, .png, .jpg, .jpeg, .gif'
              onChange={(e) => setProfilePic(e.target.files[0])}
            /><br/>
          {errorObject.profile_pic && <p className='errors'>{errorObject.profile_pic}</p>}

          <label>Password</label>
            <input className='signup-input'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            /><br/>
          {errorObject.password && <p className='errors'>{errorObject.password}</p>}

          <label>Confirm Password</label>
            <input className='signup-input'
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            /><br/>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default SignupFormPage;
