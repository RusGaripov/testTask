import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import styles from "./Login.module.scss";
import { Navigate } from "react-router-dom";
import { fetchRegister, selectIsAuth } from "../../redux/slices/auth";
import { useDispatch, useSelector } from "react-redux";

export const Registration = () => {
 
  const [username, setUsername] = useState("");

  const [user, setUser] = useState("");

  const [password, setPassword] = useState("");

  const onChangeUserHandler = (event) => {
    setUser(event.target.value);
  };

  const onChangePasswordHandler = (event) => {
    setPassword(event.target.value);
    console.log(password);
  };

  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();

    const response = await dispatch(
      fetchRegister({ username: user, password: password })
    );

    if (!response.payload) {
      return alert("Не удалось зарегистрироваться");
    }

    setUsername(response.payload.username);

    return alert("Пользователь зарегистрирован");
  };

 //переменная , которая берется из успешного ответа на запрос
  if (username) {
    return <Navigate to="/" />;
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={onSubmit}>
        <TextField
          className={styles.field}
          label="Username"
          onChange={onChangeUserHandler}
          fullWidth
        />
        <TextField
          className={styles.field}
          label="Password"
          onChange={onChangePasswordHandler}
          fullWidth
        />
        <Button type="submit" size="large" variant="contained" fullWidth>
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  );
};
