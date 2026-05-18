import { useEffect, useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './SearchResultPage.css';
import EmotionMapModal from "../components/EmotionMapModal";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function SearchResultPage() {
    const navigate = useNavigate();
    const location = useLocation();

    const type = location.state?.type || 'keyword';
    const mood = location.state?.mood || null;
    const keyword = location.state?.keyword || mood?.label || '설렘';

    const [playlists, setPlaylists] = useState([]);
    const [aiMood, setAiMood] = useState(null);
    const [loading, setLoading] = useState(false);

    const [isEmotionOpen, setIsEmotionOpen] = useState(false);

    const today = new Date();
    const formatted = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`;

    const moods = [
        { label: "설렘", icon: "✨", x: 0.8, y: 0.7 },
        { label: "평온", icon: "≋", x: 0.5, y: -0.8 },
        { label: "우울", icon: "💧", x: -0.7, y: -0.6 },
        { label: "활기찬", icon: "⚡", x: 0.6, y: 0.9 },
        { label: "지침", icon: "☁", x: -0.3, y: -0.9 },
        { label: "편안함", icon: "🛋", x: 0.8, y: -0.5 },
        { label: "기쁨", icon: "☺", x: 0.7, y: 0.5 },
        { label: "긴장됨", icon: "〰", x: -0.6, y: 0.7 },
    ];

    const makePlaylists = (songs, moodData, searchKeyword) => {
        const safeSongs = songs || [];

        const closest = [...safeSongs]
            .sort((a, b) => Number(a.distance) - Number(b.distance))
            .slice(0, 5);

        const brighter = [...safeSongs]
            .sort((a, b) => Number(b.valence) - Number(a.valence))
            .slice(0, 5);

        const calmer = [...safeSongs]
            .sort((a, b) => Number(a.arousal) - Number(b.arousal))
            .slice(0, 5);

        const energetic = [...safeSongs]
            .sort((a, b) => Number(b.arousal) - Number(a.arousal))
            .slice(0, 5);

        const emotional = [...safeSongs]
            .sort((a, b) => Number(a.distance) - Number(b.distance))
            .slice(5, 10);

        const positive = [...safeSongs]
            .sort((a, b) => Number(b.valence) - Number(a.valence))
            .slice(5, 10);

        return [
            {
                playlistId: "closest",
                title: `${searchKeyword}에 가장 가까운 곡`,
                description: "AI가 분석한 감정 좌표와 가장 가까운 곡들이에요.",
                songs: closest,
                coverSong: closest[0],
            },
            {
                playlistId: "brighter",
                title: "조금 더 밝게 듣기",
                description: "긍정도가 높은 곡들이에요.",
                songs: brighter,
                coverSong: brighter[0],
            },
            {
                playlistId: "calmer",
                title: "조금 더 차분하게 듣기",
                description: "안정적이고 편안한 분위기의 곡들이에요.",
                songs: calmer,
                coverSong: calmer[0],
            },
            {
                playlistId: "energetic",
                title: "기분을 끌어올리는 곡",
                description: "에너지가 높은 곡들이에요.",
                songs: energetic,
                coverSong: energetic[0],
            },
            {
                playlistId: "emotional",
                title: "감정선이 비슷한 곡",
                description: "현재 감정 흐름과 유사한 곡들이에요.",
                songs: emotional,
                coverSong: emotional[0],
            },
            {
                playlistId: "positive",
                title: "조금 더 긍정적인 곡",
                description: "긍정적인 분위기의 곡들이에요.",
                songs: positive,
                coverSong: positive[0],
            },
        ].filter((playlist) => playlist.coverSong);
    };

    const fetchAiRecommend = async (query) => {
        try {
            setLoading(true);

            const res = await fetch(`${API_BASE_URL}/api/songs/recommend/text`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query,
                    limit: 20,
                }),
            });

            const result = await res.json();

            if (!result.success) {
                setPlaylists([]);
                return;
            }

            setAiMood(result.mood);

            const createdPlaylists = makePlaylists(
                result.data,
                result.mood,
                query
            );

            setPlaylists(createdPlaylists);
        } catch (error) {
            console.error('AI 추천 조회 실패:', error);
            setPlaylists([]);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        if (type === 'keyword') {
            fetchAiRecommend(keyword);
        }

        if (type === 'mood' && mood) {
            fetchAiRecommend(mood.label);
        }
    }, [type, keyword, mood]);


    const topPlaylists = playlists.slice(0, 2);
    const bottomPlaylists = playlists.slice(2, 6);

    const emotionPoints = useMemo(() => {
        return playlists
            .flatMap((playlist) => playlist.songs || [])
            .map((song, index) => ({
                id: song.song_id ?? index,
                title: song.title,
                artist: song.artist_name,
                x: Number(song.valence) * 100,
                y: Number(song.arousal) * 100,
                mood: keyword,
            }));
    }, [playlists, keyword]);

    const searchedTrack = {
        title: keyword,
        artist: "AI 감정 분석",
        x: Number(aiMood?.valence || 0) * 100,
        y: Number(aiMood?.arousal || 0) * 100,
        mood: keyword,
    };


    const goToResultByMood = (selectedMood) => {
        navigate('/result', {
            replace: true,
            state: {
                type: 'mood',
                mood: selectedMood,
            },
        });
    };

    return (
        <div className="result-page">
            <div className="result-container">
                <header className="result-header">
                    <div className="header-left">
                        <span>#{keyword}_리스트</span>
                        <span>Date: {formatted}</span>
                        <span>Page: 1</span>
                    </div>

                    <div className="header-right">
                        <button onClick={() => navigate('/')}>검색 홈</button>
                        <button className="outline" onClick={() => navigate('/login')}>로그인</button>
                    </div>
                </header>

                <div className="result-title-row">
                    <h1 className="result-title">
                        당신의 기분은 <span>#{keyword}!</span>
                    </h1>

                    <button
                        className="result-emotion-btn"
                        onClick={() => setIsEmotionOpen(true)}
                    >
                        감정 분석
                    </button>
                </div>

                {aiMood?.reason && (
                    <p className="result-description">
                        {aiMood.reason}
                    </p>
                )}

                <div className="result-main">
                    <div className="result-cards">
                        {loading && (
                            <p className="loading-text">재생목록을 만들고 있어요...</p>
                        )}

                        {!loading && topPlaylists.map((playlist) => (
                            <div className="card large" key={playlist.playlistId}>
                                <div className="album-stack album-stack--large">
                                    <span className="album-stack__layer album-stack__layer--1"></span>
                                    <span className="album-stack__layer album-stack__layer--2"></span>

                                    <img
                                        src={`https://picsum.photos/420/420?${encodeURIComponent(playlist.title)}`}
                                        alt={playlist.title}
                                        className="album-stack__image"
                                        onClick={() =>
                                            navigate('/player', {
                                                state: {
                                                    type: 'playlist',
                                                    keyword,
                                                    mood: aiMood || mood,
                                                    playlistTitle: playlist.title,
                                                    playlist: playlist.songs,
                                                    selectedSong: playlist.coverSong,
                                                },
                                            })
                                        }
                                    />
                                </div>

                                <p className="title">{playlist.title}</p>
                                <p className="artist">{playlist.description}</p>
                            </div>
                        ))}
                    </div>

                    <div className="result-tags">
                        {moods.map((item) => (
                            <button
                                key={item.label}
                                className={keyword === item.label ? 'active' : ''}
                                onClick={() => goToResultByMood(item)}
                            >
                                <span className="result-tags__icon">{item.icon}</span>
                                <span>{item.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <section className="result-section">
                    <h2>추천 재생목록</h2>

                    <div className="small-cards">
                        {/*{playlists.slice(0, 3).map((playlist) => (*/}
                        {bottomPlaylists.map((playlist) => (
                            <div className="card small" key={`small-${playlist.playlistId}`}>
                                <div className="album-stack album-stack--small">
                                    <span className="album-stack__layer album-stack__layer--2"></span>

                                    <img
                                        src={`https://picsum.photos/300/300?${encodeURIComponent(playlist.title)}`}
                                        alt={playlist.title}
                                        className="album-stack__image"
                                        onClick={() =>
                                            navigate('/player', {
                                                state: {
                                                    type: 'playlist',
                                                    keyword,
                                                    mood: aiMood || mood,
                                                    playlistTitle: playlist.title,
                                                    playlist: playlist.songs,
                                                    selectedSong: playlist.coverSong,
                                                },
                                            })
                                        }
                                    />
                                </div>

                                <p className="title">{playlist.title}</p>
                                <p className="artist">{playlist.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <footer className="result-footer">
                    <a href="#">ABOUT</a>
                    <span>|</span>
                    <a href="/mypage">MY MOOD LOG</a>
                    <span>|</span>
                </footer>
            </div>

            <EmotionMapModal
                open={isEmotionOpen}
                onClose={() => setIsEmotionOpen(false)}
                searchedTrack={searchedTrack}
                tracks={emotionPoints}
                title={`${keyword} 추천곡 감정 분포`}
            />


        </div>
    );
}