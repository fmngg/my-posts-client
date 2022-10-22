import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styles from "./Auth.module.scss";

import { login, isAuth } from "../../redux/slices/authSlice";

const Login = () => {
  const checkIsAuth = useSelector(isAuth);
  const dispatch = useDispatch();

  const [values, setValues] = React.useState({
    email: "",
    password: "",
  });

  const onSubmit = async (e) => {
    await e.preventDefault();
    const data = await dispatch(login(values));

    if (!data.payload) {
      return alert("E-mail or password is invalid");
    }

    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
  };

  if (checkIsAuth) {
    return <Navigate to="/" />;
  }

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <Link to="/" style={{ color: "black", textDecoration: "none" }}>
        <h1>MyPosts.</h1>
      </Link>
      <div className={styles.inputs}>
        <input
          type="email"
          onChange={(event) => {
            setValues({ email: event.target.value, password: values.password });
          }}
          value={values.email}
          placeholder="E-Mail"
        />
        <input
          onChange={(event) => {
            setValues({ password: event.target.value, email: values.email });
          }}
          minLength={8}
          value={values.password}
          placeholder="Password"
          type="password"
        />
      </div>
      <div className={styles.buttons}>
        <button type="submit">Sign In {">"}</button>
        <p>
          New? <Link to="/register">Create account</Link>
        </p>
      </div>
    </form>
  );
};

export default Login;
