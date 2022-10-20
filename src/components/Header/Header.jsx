import React from "react";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styles from "./Header.module.scss";
import { isAuth, logout } from "../../redux/slices/authSlice";

import edit from "../../assets/edit.svg";
import exit from "../../assets/exit.svg";
import user from "../../assets/user.svg";

const Header = () => {
  const checkIsAuth = useSelector(isAuth);
  const dispatch = useDispatch();

  return (
    <header className={styles.header}>
      <div className="wrapper">
        <div className={styles.container}>
          <Link to="/" style={{ color: "black", textDecoration: "none" }}>
            <div className={styles.logo}>
              <p>MyPosts.</p>
            </div>
          </Link>
          <div className={styles.buttons}>
            {checkIsAuth ? (
              <div>
                <Link to="/edit">
                  <img src={edit} alt="Create post" />
                </Link>
                <img
                  onClick={() => {
                    dispatch(logout());
                    window.localStorage.removeItem("token");
                  }}
                  src={exit}
                  alt="Logout"
                />
              </div>
            ) : (
              <Link to="/login">
                <img src={user} alt="Sign In" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
