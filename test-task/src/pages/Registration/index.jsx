import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import styles from "./Login.module.scss";
import { fetchRegister,fetchAuth} from "../../redux/slices/auth";
import { useDispatch} from "react-redux";

export const Registration = () => {
 
  const [username, setUsername] = useState("");

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
      fetchRegister({ username: user, password: password })
    );
    const response2 = await dispatch(
      fetchAuth({ username: user, password: password })
    );
    if ("access_token" in response2.payload) {
      window.localStorage.setItem("access_token", response.payload.access_token);
    } 

    if (!response.payload) {
      return alert("Не удалось зарегистрироваться");
    }

    setUsername(response.payload.username);

    return alert("Пользователь зарегистрирован");
  };

 //переменная , которая берется из успешного ответа на запрос
  if (username) {
    return <div>Пользователь успешно зарегистрирован</div>
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
          type="password"
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
