import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import SearchResultPage from './pages/SearchResultPage';
import PlayerPage from './pages/PlayerPage';
import MyPage from './pages/MyPage';
import TrackListPage from './pages/TrackListPage';
import LoginPage from "./pages/LoginPage.jsx";

function App() {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/result" element={<SearchResultPage />} />
            <Route path="/player" element={<PlayerPage />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/track-list" element={<TrackListPage />} />
            <Route path="/login" element={<LoginPage />} />
        </Routes>
    );
}

export default App;