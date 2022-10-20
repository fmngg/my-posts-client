import "./index.scss";

import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Home from "./pages/Home/Home";
import Edit from "./pages/Edit/Edit";
import Post from "./pages/Post/Post";
import NotFound from "./pages/NotFound/NotFound";

import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";

import { getMe } from "./redux/slices/authSlice";

import React from "react";

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getMe());
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/:id" element={<Post />} />
        <Route path="/posts/:id/edit" element={<Edit />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
