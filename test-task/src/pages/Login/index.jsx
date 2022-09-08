import React, { useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import styles from "./Login.module.scss";
import { fetchAuth, selectIsAuth } from "../../redux/slices/auth";
import { Navigate } from "react-router-dom";

export const Login = () => {

  const isAuth = useSelector(selectIsAuth);

  const [user, setUser] = useState("");

  const [password, setPassword] = useState("");


  const onChangeUserHandler = (event) => {
    setUser(event.target.value);
  };

  const onChangePasswordHandler = (event) => {
    setPassword(event.target.value);
  };

  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await dispatch(
      fetchAuth({ username: user, password: password })
    );

    if (!response.payload) {
      return alert("Не удалось авторизоваться");
    }
    if ("access_token" in response.payload) {
      window.localStorage.setItem("access_token", response.payload.access_token);
    } 
    return alert("Пользователь залогинился");
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <form onSubmit={onSubmit}>
        <TextField
          className={styles.field}
          onChange={onChangeUserHandler}
          label="Username"
          fullWidth
        />
        <TextField
          className={styles.field}
          onChange={onChangePasswordHandler}
          label="Password"
          type="password"
          fullWidth
        />
        <Button type="submit" size="large" variant="contained" fullWidth>
          Войти
        </Button>
      </form>
    </Paper>
  );
};
