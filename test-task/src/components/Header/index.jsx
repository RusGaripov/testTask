import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import Container from "@mui/material/Container";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  logout,
  selectIsAuth,
  fetchAuthMe,
  fetchAuth,
} from "../../redux/slices/auth";

export const Header = () => {
  let isAuth = useSelector(selectIsAuth);

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (localStorage.getItem("access_token") !== null) {
      const response = dispatch(
        fetchAuth({ username: "reggir", password: "123456" })
      );
      console.log(response);
    }
  }, []);

  const onClickLogout = () => {
    if (window.confirm("Вы действительно хотите выйти ?")) dispatch(logout());
    window.localStorage.removeItem('access_token');
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>ГЛАВНАЯ </div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to="/links/convert-link">
                  <Button variant="contained">Преобразовать ссылку</Button>
                </Link>
                <Button
                  onClick={onClickLogout}
                  variant="contained"
                  color="error"
                >
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Войти</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Создать аккаунт</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
