import './MainPage.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function MainPage() {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState('');


    const moods = [
        { icon: '✨', label: '설렘', active: true },
        { icon: '≋', label: '평온' },
        { icon: '💧', label: '우울' },
        { icon: '⚡', label: '활기찬' },
        { icon: '☁', label: '지침' },
        { icon: '🛋', label: '편안함' },
        { icon: '☺', label: '기쁨' },
        { icon: '∿', label: '긴장됨' },
    ];

    const goToResultByKeyword = () => {
        const trimmed = keyword.trim();
        if (!trimmed) return;

        navigate('/result', {
            state: {
                type: 'keyword',
                keyword: trimmed,
            },
        });
    };

    const goToResultByMood = (mood) => {
        navigate('/result', {
            state: {
                type: 'mood',
                keyword: mood,
            },
        });
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            goToResultByKeyword();
        }
    };



    return (
        <div className="main-page">
            <div className="main-page__bg-glow" />
            <div className="main-page__bg-noise" />

            <img src="/maintext2.png" className="main-page__hero-image" />

            <main className="main-page__content">
                {/*<p className="main-page__subtitle">감정 기반 음악 큐레이션</p>*/}

                {/*<div className="main-page__hero-bg">*/}
                {/*    <span className="hero-bg-line hero-bg-line--1">당신의 감정을</span>*/}
                {/*    <span className="hero-bg-line hero-bg-line--2">검색하세요</span>*/}
                {/*</div>*/}

                <div className="main-page__search-wrap">
                    <div className="main-page__search-box neon-border-flow">
                        <input
                            type="text"
                            placeholder="가사나 곡명 대신 기분을 입력하세요..."
                            className="main-page__search-input"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                </div>

                <div className="main-page__mood-grid">
                    {moods.map((mood) => (
                        <button
                            key={mood.label}
                            className={`main-page__mood-btn ${mood.active ? 'is-active' : ''}`}
                            onClick={() => goToResultByMood(mood.label)}
                        >
                            <span className="main-page__mood-icon">{mood.icon}</span>
                            <span>#{mood.label}</span>
                        </button>
                    ))}
                </div>

                <nav className="main-page__footer-nav">
                    <a href="#">ABOUT</a>
                    <span>|</span>
                    <a href="/mypage">MY MOOD LOG</a>
                    <span>|</span>
                    {/*<a href="#">SETTINGS</a>*/}
                </nav>
            </main>
        </div>
    );
}




