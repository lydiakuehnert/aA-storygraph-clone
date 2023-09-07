import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	const location = useLocation()

	if (location.pathname === '/' || location.pathname === '/login' || location.pathname === '/signup') {
		return null
	}

	return (
		<div className="nav-background">
		<ul className='nav-bar'>
			<li className="logo-li">
				<NavLink exact to="/" id="noDeco"><i class="fa-solid fa-book-open-reader"></i><span id="logo">The PorchStory</span></NavLink>
			</li>
			<li className='searchbar-li'>
				{/* <BookSearchBar id='searchbar' /> */}
			</li>

			{sessionUser ? (
					<>
						{isLoaded && (
							<>
								{/* <li className="read-books-li">
									<NavLink className='readBooksClass' exact to={`/read`}>Read Books</NavLink>
								</li> */}
								<li className="add-book-button">
									<NavLink className='navlink-link' exact to={`/new`}>Add a Book</NavLink>
								</li>
								<li className="user-books-button">
									<NavLink className='navlink-link' exact to={`/books/user`}>Your Books</NavLink>
								</li>
								<li className="profile-button">
									<ProfileButton user={sessionUser} />
								</li>

							</>
						)}
					</>

				) : (
					<>
						<li className="login-button">
							<OpenModalButton
								buttonText="Sign In"
								buttonClass='button-black'
								modalComponent={<LoginFormModal />}
							/>
						</li>
						<li className="signup-button">
							<OpenModalButton
								buttonText="Create Account"
								buttonClass='button-orange'
								modalComponent={<SignupFormModal />}
							/>
						</li>
					</>
				)
			}
		</ul>
		</div>
	);
}

export default Navigation;