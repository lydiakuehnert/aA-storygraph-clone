import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import noProfileImg from './book-png-26.png';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  // const closeMenu = () => setShowMenu(false);



  return (
    <div className="menu-div">
      <div onClick={openMenu} className="menu-button">
        <img className='profile-menu' src={user.profile_pic || noProfileImg} alt="profile menu"></img>
        <i className="fa-solid fa-angle-down"></i>
      </div>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li>{user.username}</li>
            <li>{user.email}</li>
            <li>{user.firstname} {user.lastname}</li>
            {/* <li className="clicky" id="profile-link"><Link to='/profile' onClick={closeMenu}>Profile</Link></li> */}
            <li>
              <button onClick={handleLogout}>Sign Out</button>
            </li>
          </>
        ) : (
          <></>
        )}
      </ul>
    </div>
  );
}

export default ProfileButton;
