import './SearchResultPage.css';
import {useLocation, useNavigate} from 'react-router-dom';

export default function SearchResultPage() {
    const navigate = useNavigate();
    const location = useLocation();

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