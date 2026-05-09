import {useLocation, useNavigate} from 'react-router-dom';
// import React, { useMemo, useState } from "react";
import './SearchResultPage.css';
import EmotionMapModal from "../components/EmotionMapModal";

export default function SearchResultPage() {
    const navigate = useNavigate();
    const location = useLocation();

    // const [isEmotionModalOpen, setIsEmotionModalOpen] = useState(false);

    // const type = location.state?.type || 'mood';
    const keyword = location.state?.keyword || '설렘';

    const today = new Date();
    const formatted = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`;

    const moods = [
        { icon: '✨', label: '설렘' },
        { icon: '≋', label: '평온' },
        { icon: '💧', label: '우울' },
        { icon: '⚡', label: '활기찬' },
        { icon: '☁', label: '지침' },
        { icon: '🛋', label: '편안함' },
        { icon: '☺', label: '기쁨' },
        { icon: '∿', label: '긴장됨' },
    ];
    const mainCards = [
        {
            title: '벚꽃엔딩',
            artist: '김길동',
            image: 'https://picsum.photos/420/420?1',
        },
        {
            title: '두근거림',
            artist: '아이돌',
            image: 'https://picsum.photos/420/420?2',
        },
    ];

    const trendingCards = [
        {
            title: '산책에는',
            artist: '가수 A',
            image: 'https://picsum.photos/300/300?3',
        },
        {
            title: '새학기',
            artist: '여러 아티스트',
            image: 'https://picsum.photos/300/300?4',
        },
        {
            title: '빠른 템포',
            artist: '여러 아티스트',
            image: 'https://picsum.photos/300/300?5',
        },
        {
            title: '인기있는 노래',
            artist: '여러 아티스트',
            image: 'https://picsum.photos/300/300?6',
        },
    ];

    // 곡분석 모달
    // 검색한 곡 임시 데이터
    // const searchedTrack = {
    //     id: 999,
    //     title: "사랑이 흩날릴 때",
    //     artist: "뮤직조아 추천",
    //     x: 52,
    //     y: 54,
    // };
    //
    // // 전체 곡 분포 임시 데이터
    // const emotionPoints = useMemo(() => {
    //     return [
    //         { id: 1, title: "Blue Night", artist: "SORA", x: -42, y: 58, mood: "평온" },
    //         { id: 2, title: "Run to You", artist: "Neon Day", x: 61, y: 48, mood: "설렘" },
    //         { id: 3, title: "Cloud Step", artist: "Mello", x: -15, y: 24, mood: "안정" },
    //         { id: 4, title: "Heat Wave", artist: "FLEX", x: 74, y: 68, mood: "흥분" },
    //         { id: 5, title: "After Rain", artist: "Nuit", x: -58, y: -20, mood: "우울" },
    //         { id: 6, title: "Moonlight Taxi", artist: "Haru", x: 20, y: -32, mood: "나른" },
    //         { id: 7, title: "Diving", artist: "Lime Soda", x: 44, y: 12, mood: "기쁨" },
    //         { id: 8, title: "Stay Here", artist: "MIRA", x: -22, y: -46, mood: "차분" },
    //         { id: 9, title: "Shine Loop", artist: "Vivid", x: 46, y: 36, mood: "행복" },
    //         { id: 10, title: "Slow Letter", artist: "Muun", x: -36, y: 8, mood: "편안" },
    //         { id: 11, title: "Orbit Love", artist: "PLAIN", x: 66, y: 20, mood: "즐거움" },
    //         { id: 12, title: "Faded Lake", artist: "Rin", x: -64, y: -52, mood: "침잠" },
    //     ];
    // }, []);

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
                        {mainCards.map((item) => (
                            <div className="card large" key={item.title}>
                                <div className="album-stack album-stack--large">
                                    <span className="album-stack__layer album-stack__layer--1"></span>
                                    <span className="album-stack__layer album-stack__layer--2"></span>
                                    <img src={item.image} alt={item.title} className="album-stack__image"
                                         onClick={() => navigate('/player')}/>
                                </div>

                                <p className="title">{item.title}</p>
                                <p className="artist">{item.artist}</p>
                            </div>
                        ))}
                    </div>

                    <div className="result-tags">
                        {moods.map((mood) => (
                            <button
                                key={mood.label}
                                className={keyword === mood.label ? 'active' : ''}
                            >
                                <span className="result-tags__icon">{mood.icon}</span>
                                <span>{mood.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <section className="result-section">
                    <h2>지금 뜨는 곡</h2>

                    <div className="small-cards">
                        {trendingCards.map((item) => (
                            <div className="card small" key={item.title}>
                                <div className="album-stack album-stack--small">
                                    {/*<span className="album-stack__layer album-stack__layer--1"></span>*/}
                                    <span className="album-stack__layer album-stack__layer--2"></span>
                                    <img src={item.image} alt={item.title} className="album-stack__image" />
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