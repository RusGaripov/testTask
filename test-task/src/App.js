import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Header } from './components/Header';
import { Registration } from './pages/Registration';
import { Login } from './pages/Login';
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthMe, selectIsAuth } from "./redux/slices/auth";

function App() {
  let isAuth = useSelector(selectIsAuth);

  // const dispatch = useDispatch();

  // React.useEffect(() => {
  //   dispatch(fetchAuthMe());
  //   console.log(isAuth)
  // }, []);
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/posts/:id" element={<FullPost />} />
        <Route path="posts/:id/edit" element={<AddPost />} />
        <Route path="posts/add-post" element={<AddPost />} />
         */}
      </Routes>

    </>
  );
}

export default App;
