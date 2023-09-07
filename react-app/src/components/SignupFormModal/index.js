import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [firstname, setFirstname] = useState("");
	const [lastname, setLastname] = useState("");
	const [profile_pic, setProfilePic] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const [errorObject, setErrorObject] = useState({})
	const { closeModal } = useModal();
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

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSubmitted(true);
		setErrorObject({})

		if (!Object.values(errorObject).length) {
			if (password === confirmPassword) {
				const data = await dispatch(signUp(username, email, password, firstname, lastname, profile_pic));
				if (data) {
					setErrors(data);
				} else {
					closeModal();
				}
			} else {
				setErrors([
					"Confirm Password field must be the same as the Password field",
				]);
			}
		}
	};

	return (
		<div className="signup-outer-box">
		<div className="signup-box">
			<h1>Sign Up</h1>
			<form onSubmit={handleSubmit}>
				<ul>
					{errors.map((error, idx) => (
						<li className='errors' key={idx}>{error}</li>
					))}
				</ul>
				<label>
					Email address
					<input className='signup-input'
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</label>
				{errorObject.email && <p className='errors'>{errorObject.email}</p>}

				<label>
					Username
					<input className='signup-input'
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</label>
				{errorObject.username && <p className='errors'>{errorObject.username}</p>}

				<label>
					First Name
					<input className='signup-input'
						type="text"
						value={firstname}
						onChange={(e) => setFirstname(e.target.value)}
					/>
				</label>
				{errorObject.firstname && <p className='errors'>{errorObject.firstname}</p>}

				<label>
					Last Name
					<input className='signup-input'
						type="text"
						value={lastname}
						onChange={(e) => setLastname(e.target.value)}
					/>
				</label>
				{errorObject.lastname && <p className='errors'>{errorObject.lastname}</p>}

				<label>
					Profile Picture
					<input className='signup-input'
						type="text"
						value={profile_pic}
						onChange={(e) => setProfilePic(e.target.value)}
					/>
				</label>
				{errorObject.profile_pic && <p className='errors'>{errorObject.profile_pic}</p>}

				<label>
					Password
					<input className='signup-input'
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</label>
				{errorObject.password && <p className='errors'>{errorObject.password}</p>}

				<label>
					Confirm Password
					<input className='signup-input'
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</label>
				<button type="submit">Sign Up</button>
			</form>
		</div>
		</div>
	);
}

export default SignupFormModal;