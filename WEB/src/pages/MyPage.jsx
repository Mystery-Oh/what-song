import './MyPage.css';
import { useNavigate } from 'react-router-dom';

export default function MyPage() {
    const navigate = useNavigate();

    const recentTracks = [
        { title: 'Retro Tape', image: 'https://picsum.photos/260/180?1', active: true },
        { title: 'Green Cassette', image: 'https://picsum.photos/260/180?2' },
        { title: 'Coastal Serenity', image: 'https://picsum.photos/260/180?3' },
        { title: 'Blue Eye', image: 'https://picsum.photos/260/180?4' },
        { title: 'Midnight Chill', image: 'https://picsum.photos/260/180?5' },
        { title: 'City Mood', image: 'https://picsum.photos/260/180?6' },
    ];

    const likedTracks = [
        { title: 'Orchestra Melody', image: 'https://picsum.photos/260/180?7', active: true },
        { title: 'DNA Pulse', image: 'https://picsum.photos/260/180?8' },
        { title: 'Happy Friends', image: 'https://picsum.photos/260/180?9' },
        { title: 'Alpine Whispers', image: 'https://picsum.photos/260/180?10' },
        { title: 'Cosmic Journey', image: 'https://picsum.photos/260/180?11' },
        { title: 'Morning Fog', image: 'https://picsum.photos/260/180?12' },
    ];

    return (
        <div className="mypage">
            <div className="mypage__container">
                <div className="mypage-top-actions">
                    <button className="mypage-create-btn">
                        <span className="mypage-create-btn__icon">+</span>
                        <span>나만의 플레이 만들기</span>
                    </button>
                    <button className="mypage-home-btn" onClick={() => navigate('/')}>검색 홈</button>
                </div>

                <section className="mypage-section">
                    <div className="mypage-section__header">
                        <h2>최근 들은 곡</h2>
                        <button
                            className="mypage-section__more"
                            onClick={() =>
                                navigate('/track-list', {
                                    state: { type: 'recent', title: '최근 들은 곡' },
                                })
                            }
                        >
                            {'>'}
                        </button>
                    </div>

                    <div className="mypage-track-row">
                        {recentTracks.map((track) => (
                            <div
                                className={`mypage-track-item ${track.active ? 'is-active' : ''}`}
                                key={track.title}
                            >
                                <div className="mypage-track-card">
                                    <img src={track.image} alt={track.title} />
                                </div>
                                <p className="mypage-track-title">{track.title}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mypage-section">
                    <div className="mypage-section__header">
                        <h2>좋아요 곡</h2>
                        <button
                            className="mypage-section__more"
                            onClick={() =>
                                navigate('/track-list', {
                                    state: { type: 'liked', title: '좋아요 곡' },
                                })
                            }
                        >
                            {'>'}
                        </button>
                    </div>

                    <div className="mypage-track-row">
                        {likedTracks.map((track) => (
                            <div
                                className={`mypage-track-item ${track.active ? 'is-active' : ''}`}
                                key={track.title}
                            >
                                <div className="mypage-track-card">
                                    <img src={track.image} alt={track.title} />
                                </div>
                                <p className="mypage-track-title">{track.title}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}