import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { NavLink, Route, Routes } from "react-router-dom";



function App() {
  return (
    <>
      <header
        className="d-flex jc-space-around p-1"
        style={{ boxShadow: `4px 2px 5px grey` }}
      >
        <div className="header header-secondary">
          <NavLink to="/login">Login</NavLink>
        </div>
        <div className="header header-secondary">
          <NavLink to="/liked">Liked</NavLink>
        </div>
        <div className="header header-secondary">
          <NavLink to="/watchlater">Watch Later</NavLink>
        </div>
        <div className="header header-secondary">
          <NavLink to="/playlists">Playlists</NavLink>
        </div>
        <div className="header header-secondary">
          <NavLink to="/videos">Videos</NavLink>
        </div>
        <div className="header header-tertiary">
          <button
            className="btn btn-secondary"

          >
            logout
          </button>
        </div>
      </header>
      <Routes>
        <Route path="/" element={<Videos />} />
        <Route path="/login" element={<Login />} />
        <Route path="/videos" element={<Videos />} />
      </Routes>
    </>
  );
}

export default App;
