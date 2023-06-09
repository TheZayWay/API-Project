import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { NavLink, useHistory } from 'react-router-dom';
import './ProfileButton.css'

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history = useHistory();


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

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push("/")
    closeMenu();
  };

  const handleClick = () => {
    closeMenu()
  }

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
// 
  return (
    <>
      <button className="menu-button"onClick={openMenu}>
        <i className="fa fa-bars fa-lg"></i>
        <i className="fas fa-user-circle" />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        <div className="menu-user-items">
        {user ? (
          <>
            {/* <li className="li-input">{user.username}</li> */}
            <li className="li-input">Hello {user.firstName}! </li>
            {/* {user.lastName} */}
            <li className="li-input">{user.email}</li>
            <hr className="divider"></hr>
            <li><NavLink className="profile-button-nav" onClick={handleClick} to={`/spots/current`}>Manage Spots</NavLink></li>
            {/* <li><NavLink className="profile-button-nav" onClick={handleClick} to={`/users/${user.id}/trips`}>My Trips</NavLink></li> */}
            <li>
              <button onClick={logout} className="logout-button">Log Out</button>
            </li>
          </>
        ) : (
          <>
            <OpenModalMenuItem
              itemText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            <OpenModalMenuItem
              itemText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
        </div>  
      </ul>
    </>
  );
}

export default ProfileButton;