import { NavLink, Route, Routes } from "react-router-dom";
import { RequiresAuth } from "./components/RequiresAuth/RequiresAuth";
import { History } from "./pages/History/History";
import { Liked } from "./pages/Liked/Liked";

import { Login } from "./pages/Login/Login";
import { Playlists } from "./pages/Playlists/Playlists";
import { SingleVideoPage } from "./pages/SingleVideoPage/SingleVideoPage";
import { Trending } from "./pages/Trending/Trending";
import { Videos } from "./pages/Videos/Videos";
import { WatchLater } from "./pages/WatchLater/WatchLater";




function App() {

  return (
    <>
      <header
        className="d-flex jc-space-around p-1"
        style={{ boxShadow: `4px 2px 5px grey` }}
      >
        <div className="header header-tertiary">
          <NavLink to="/login">Login</NavLink>
        </div>
        <div className="header header-tertiary">
          <NavLink to="/liked">Liked</NavLink>
        </div>
        <div className="header header-tertiary">
          <NavLink to="/watchlater">Watch Later</NavLink>
        </div>
        <div className="header header-tertiary">
          <NavLink to="/playlists">Playlists</NavLink>
        </div>
        <div className="header header-tertiary">
          <NavLink to="/videos">Videos</NavLink>
        </div>
        <div className="header header-tertiary">
          <NavLink to="/trending">Trending</NavLink>
        </div>
        <div className="header header-tertiary">
          <NavLink to="/history">History</NavLink>
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
        <Route path="/trending" element={<Trending />} />
        <Route path="/playlists" element={<RequiresAuth> <Playlists /> </RequiresAuth>} />
        <Route path="/watchlater" element={<RequiresAuth> <WatchLater /> </RequiresAuth>} />
        <Route path="/liked" element={<RequiresAuth> <Liked /> </RequiresAuth>} />
        <Route path="/history" element={<RequiresAuth> <History /> </RequiresAuth>} />
        <Route path="/videos/:videoId" element={<SingleVideoPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
