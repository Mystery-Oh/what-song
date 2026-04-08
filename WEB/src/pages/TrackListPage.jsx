import { useLocation, useNavigate } from 'react-router-dom';
import './TrackListPage.css';

export default function TrackListPage() {
    const navigate = useNavigate();
    const location = useLocation();

    const pageTitle = location.state?.title || '트랙 목록';
    const type = location.state?.type || 'recent';

    const recentTracks = [
        { title: 'Song A', artist: 'Artist', duration: '03:49', image: 'https://picsum.photos/120/80?1' },
        { title: 'Song B', artist: 'Artist', duration: '04:21', image: 'https://picsum.photos/120/80?2' },
        { title: 'Song C', artist: 'Artist', duration: '02:55', image: 'https://picsum.photos/120/80?3' },
        { title: 'Song D', artist: 'Artist', duration: '04:30', image: 'https://picsum.photos/120/80?4' },
        { title: 'Song E', artist: 'Artist', duration: '03:20', image: 'https://picsum.photos/120/80?5' },
    ];

    const likedTracks = [
        { title: 'Like A', artist: 'Artist', duration: '03:11', image: 'https://picsum.photos/120/80?6' },
        { title: 'Like B', artist: 'Artist', duration: '04:02', image: 'https://picsum.photos/120/80?7' },
        { title: 'Like C', artist: 'Artist', duration: '02:48', image: 'https://picsum.photos/120/80?8' },
        { title: 'Like D', artist: 'Artist', duration: '05:10', image: 'https://picsum.photos/120/80?9' },
        { title: 'Like E', artist: 'Artist', duration: '03:58', image: 'https://picsum.photos/120/80?10' },
    ];

    const tracks = type === 'liked' ? likedTracks : recentTracks;

    return (
        <div className="track-list-page">

            <div className="track-list-page__container">
                <h1 className="track-list-page__title">{pageTitle}</h1>
                {/*<button className="track-list-page__back" onClick={() => navigate(-1)}>*/}
                {/*    ← 뒤로*/}
                {/*</button>*/}
                <div className="track-list">
                    {tracks.map((track) => (
                        <div className="track-row" key={`${track.title}-${track.duration}`}>
                            <img src={track.image} alt={track.title} className="track-row__cover" />

                            <div className="track-row__meta">
                                <p className="track-row__title">{track.title}</p>
                                <p className="track-row__artist">{track.artist}</p>
                            </div>

                            <span className="track-row__duration">{track.duration}</span>
                        </div>
                    ))}

                    <div className="track-list__load-hint">
                        <div className="track-list__load-dot"></div>
                        <div className="track-list__load-bar"></div>
                        <span>아래로 내려 더 많은 곡 보기</span>
                    </div>
                </div>
            </div>
        </div>
    );
}