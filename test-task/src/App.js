import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Header } from './components/Header';
import { Registration } from './pages/Registration';
import { Login } from './pages/Login';
import { AddLongLink } from "./pages/AddLongLink";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/links/convert-link" element={<AddLongLink />} />
      </Routes>

    </>
  );
}

export default App;
