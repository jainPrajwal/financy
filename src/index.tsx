import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './contexts/auth-context';
import { VideosProvider } from './contexts/videos-context';
import { BrowserRouter as Router } from 'react-router-dom';
import { PlaylistsProvider } from './contexts/playlists-context';
import { ProfileProvider } from './contexts/profile-context';
import { ToastProvider } from "kaali-ui";
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Router>
    <ToastProvider>
      <AuthProvider>
        <ProfileProvider>
          <PlaylistsProvider>
            <VideosProvider>
              <App />
            </VideosProvider>
          </PlaylistsProvider>
        </ProfileProvider>
      </AuthProvider>
    </ToastProvider>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
