import { NavLink, Route, Routes } from "react-router-dom";
import { RequiresAuth } from "./components/RequiresAuth/RequiresAuth";
import { History } from "./pages/History/History";
import { Home } from "./pages/Home/Home";
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
      <Routes>
        <Route path="/" element={<Home />} />
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
