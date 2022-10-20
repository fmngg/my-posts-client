import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styles from "./Auth.module.scss";

import { isAuth, register } from "../../redux/slices/authSlice";

const Register = () => {
  const checkIsAuth = useSelector(isAuth);
  const dispatch = useDispatch();

  const [values, setValues] = React.useState({
    nickname: "TestName",
    email: "ilyafomin9284@mail.ru",
    password: "12345678",
  });

  const onSubmit = async (e) => {
    await e.preventDefault();
    const data = await dispatch(register(values));
    if (!data.payload) {
      return alert("Registration error");
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
          type="text"
          onChange={(event) => {
            setValues({
              ...values,
              nickname: event.target.value,
            });
          }}
          value={values.nickname}
          placeholder="Name"
        />
        <input
          type="email"
          onChange={(event) => {
            setValues({ ...values, email: event.target.value });
          }}
          value={values.email}
          placeholder="E-Mail"
        />
        <input
          onChange={(event) => {
            setValues({
              ...values,
              password: event.target.value,
            });
          }}
          minLength={8}
          value={values.password}
          placeholder="Password"
          type="password"
        />
      </div>
      <div className={styles.buttons}>
        <button type="submit">Sign Up {">"}</button>
        <p>
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </form>
  );
};

export default Register;
