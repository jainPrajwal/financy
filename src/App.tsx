import { NavLink, Route, Routes } from "react-router-dom";
import { RequiresAuth } from "./components/RequiresAuth/RequiresAuth";
import { Explore } from "./pages/Explore/Explore";
import { History } from "./pages/History/History";
import { Home } from "./pages/Home/Home";
import { Liked } from "./pages/Liked/Liked";

import { Login } from "./pages/Auth/Login";
import { Playlists } from "./pages/Playlists/Playlists";
import { Settings } from "./pages/Settings/Settings";
import { SinglePlaylistPage } from "./pages/SinglePlaylistPage/SinglePlaylistPage";
import { SingleVideoPage } from "./pages/SingleVideoPage/SingleVideoPage";
import { Trending } from "./pages/Trending/Trending";
import { UploadVideo } from "./pages/UploadVideo/UploadVideo";
import { Videos } from "./pages/Videos/Videos";
import { WatchLater } from "./pages/WatchLater/WatchLater";
import { Signup } from "./pages/Auth/Signup";
import { TrendingVideosProvider } from "./contexts/trending-videos-context";
import { MostWatchedVideosProvider } from "./contexts/most-watched-videos-context";






function App() {
 
  return (
    <>
      <Routes>
        <Route path="/" element={<Explore />} />
        <Route path="/home" element={
          <MostWatchedVideosProvider>
            <Home />
          </MostWatchedVideosProvider>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/trending" element={
          <TrendingVideosProvider>
            <Trending />
          </TrendingVideosProvider>
        } />
        <Route path="/playlists" element={<RequiresAuth> <Playlists /> </RequiresAuth>} />
        <Route path="/playlists/:playlistId" element={<RequiresAuth> <SinglePlaylistPage /> </RequiresAuth>} />
        <Route path="/watchlater" element={<RequiresAuth> <WatchLater /> </RequiresAuth>} />
        <Route path="/liked" element={<RequiresAuth> <Liked /> </RequiresAuth>} />
        <Route path="/upload" element={<RequiresAuth> <UploadVideo /> </RequiresAuth>} />
        <Route path="/history" element={<RequiresAuth> <History /> </RequiresAuth>} />
        <Route path="/settings" element={<RequiresAuth> <Settings /> </RequiresAuth>} />
        <Route path="/videos/:videoId" element={
          <TrendingVideosProvider>
            <MostWatchedVideosProvider>
              <SingleVideoPage />
            </MostWatchedVideosProvider>
          </TrendingVideosProvider>
        }></Route>
      </Routes>
    </>
  );
}

export default App;
