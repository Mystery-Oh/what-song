import {useLocation, useNavigate} from 'react-router-dom';
import React, { useEffect, useState } from "react";
import './SearchResultPage.css';
import EmotionMapModal from "../components/EmotionMapModal";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function SearchResultPage() {
    const navigate = useNavigate();
    const location = useLocation();

    // const [isEmotionModalOpen, setIsEmotionModalOpen] = useState(false);

    // const type = location.state?.type || 'mood';
    // const keyword = location.state?.keyword || '설렘';

    const type = location.state?.type || 'mood';
    const mood = location.state?.mood || null;
    const keyword = location.state?.keyword || mood?.label || '설렘';

    const [mainCards, setMainCards] = useState([]);
    const [loading, setLoading] = useState(false);


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

    //우측 감정 검색용  퀵버튼
    const goToResultByMood = (selectedMood) => {
        navigate('/result', {
            replace: true,
            state: {
                type: 'mood',
                mood: selectedMood,
            },
        });
    };

    //api 연결
    useEffect(() => {
        const fetchRecommendSongs = async () => {
            if (type !== 'mood' || !mood) return;

            try {
                setLoading(true);

                const res = await fetch(
                    `${API_BASE_URL}/api/songs/emotion/recommend?x=${mood.x}&y=${mood.y}&limit=6`
                );

                const result = await res.json();

                if (result.success) {
                    setMainCards(result.data);
                } else {
                    setMainCards([]);
                }
            } catch (error) {
                console.error('감정 추천곡 조회 실패:', error);
                setMainCards([]);
            } finally {
                setLoading(false);
            }
        };

        fetchRecommendSongs();
    }, [type, mood]);

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

                <h1 className="result-title">
                    당신의 기분은 <span>#{keyword}!</span>
                </h1>

                <div className="result-main">
                    <div className="result-cards">

                        {loading && <p className="loading-text">추천곡을 불러오는 중...</p>}

                        {!loading && mainCards.slice(0,2).map((item) => (
                            <div className="card large" key={item.song_id}>

                                <div className="album-stack album-stack--large">
                                    <span className="album-stack__layer album-stack__layer--1"></span>
                                    <span className="album-stack__layer album-stack__layer--2"></span>
                                    <img
                                        src={item.image || `https://picsum.photos/420/420?${item.song_id}`}
                                        alt={item.title}
                                        className="album-stack__image"
                                        onClick={() =>
                                            navigate('/player', {
                                                state: {
                                                    type: 'mood',
                                                    mood,
                                                    keyword,
                                                    playlist: mainCards,
                                                    selectedSong: item,
                                                },
                                            })
                                        }
                                    />

                                </div>

                                <p className="title">{item.title}</p>
                                <p className="artist">{item.artist_name}</p>
                            </div>
                        ))}
                    </div>

                    <div className="result-tags">
                        {moods.map((item) => (
                            <button
                                key={item.label}
                                className={keyword === item.label ? 'active' : ''}
                                onClick={() => goToResultByMood(item)} >
                                <span className="result-tags__icon">{item.icon}</span>
                                <span>{item.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <section className="result-section">
                    <h2>지금 당신에게 어울리는 곡</h2>

                    <div className="small-cards">
                        {/*{trendingCards.map((item) => (*/}
                        {mainCards.slice(2, 6).map((item) => (
                            <div className="card small" key={item.title}>
                                <div className="album-stack album-stack--small">
                                    {/*<span className="album-stack__layer album-stack__layer--1"></span>*/}
                                    <span className="album-stack__layer album-stack__layer--2"></span>
                                    <img
                                        src={`https://picsum.photos/300/300?${item.song_id}`}
                                        alt={item.title}
                                        className="album-stack__image"
                                        onClick={() =>
                                            navigate('/player', {
                                                state: {
                                                    type: 'mood',
                                                    mood,
                                                    keyword,
                                                    playlist: mainCards,
                                                    selectedSong: item,
                                                },
                                            })
                                        }
                                    />
                                </div>

                                <p className="title">{item.title}</p>
                                <p className="artist">{item.artist}</p>
                            </div>
                        ))}
                    </div>
                </section>


                {/*<div style={{ padding: "40px", color: "#fff", background: "#0b1020", minHeight: "100vh" }}>*/}
                {/*    <h1>Search Page</h1>*/}
                {/*    <p>검색 결과 예시 화면</p>*/}

                {/*    <div*/}
                {/*        style={{*/}
                {/*            marginTop: "24px",*/}
                {/*            padding: "20px",*/}
                {/*            borderRadius: "16px",*/}
                {/*            background: "rgba(255,255,255,0.06)",*/}
                {/*            border: "1px solid rgba(255,255,255,0.08)",*/}
                {/*            maxWidth: "520px",*/}
                {/*        }}*/}
                {/*    >*/}
                {/*        <h2 style={{ marginTop: 0 }}>{searchedTrack.title}</h2>*/}
                {/*        <p style={{ color: "rgba(255,255,255,0.7)" }}>{searchedTrack.artist}</p>*/}

                {/*        <button*/}
                {/*            onClick={() => setIsEmotionModalOpen(true)}*/}
                {/*            style={{*/}
                {/*                marginTop: "12px",*/}
                {/*                padding: "12px 18px",*/}
                {/*                borderRadius: "12px",*/}
                {/*                border: "1px solid rgba(34,211,238,0.3)",*/}
                {/*                background: "rgba(34,211,238,0.14)",*/}
                {/*                color: "#d9fbff",*/}
                {/*                cursor: "pointer",*/}
                {/*            }}*/}
                {/*        >*/}
                {/*            감정 분포 보기*/}
                {/*        </button>*/}
                {/*    </div>*/}

                {/*    <EmotionMapModal*/}
                {/*        open={isEmotionModalOpen}*/}
                {/*        onClose={() => setIsEmotionModalOpen(false)}*/}
                {/*        searchedTrack={searchedTrack}*/}
                {/*        tracks={emotionPoints}*/}
                {/*        title="감정 분포 보기"*/}
                {/*    />*/}
                {/*</div>*/}






                <footer className="result-footer">
                    <a href="#">ABOUT</a>
                    <span>|</span>
                    <a href="/mypage">MY MOOD LOG</a>
                    <span>|</span>
                    {/*<a href="#">SETTINGS</a>*/}
                </footer>
            </div>
        </div>
    );
}