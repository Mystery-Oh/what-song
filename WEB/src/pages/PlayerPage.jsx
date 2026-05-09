// import './PlayerPage.css';
// import {useState} from "react";
//
// export default function PlayerPage() {
//     const [isSpecOpen, setIsSpecOpen] = useState(false);
//
//     const currentTrack = {
//         title: '벚꽃잎 Spring in me (feat. Dalchong)',
//         artist: 'YESUNG',
//         spectrogramImage: '/spectrograms/spring-in-me.png',
//     };
//
//     const nextTracks = [
//         {
//             title: '벚꽃잎 Spring in me (feat. Dalchong)',
//             artist: 'YESUNG',
//             duration: '4:31',
//             image: 'https://picsum.photos/80/80?1',
//             active: true,
//         },
//         {
//             title: '비처럼 가지 마요 One More Chance',
//             artist: 'SUPER JUNIOR',
//             duration: '4:16',
//             image: 'https://picsum.photos/80/80?2',
//         },
//         {
//             title: 'Jumping Machine (跳楼机)',
//             artist: 'LBI',
//             duration: '3:22',
//             image: 'https://picsum.photos/80/80?3',
//         },
//         {
//             title: 'New Day',
//             artist: '풀림',
//             duration: '4:03',
//             image: 'https://picsum.photos/80/80?4',
//         },
//         {
//             title: '하루의 끝 (End of a day)',
//             artist: 'JONGHYUN',
//             duration: '4:38',
//             image: 'https://picsum.photos/80/80?5',
//         },
//         {
//             title: '끝이 아닐 (with 유주)',
//             artist: '권순관 및 유주',
//             duration: '4:01',
//             image: 'https://picsum.photos/80/80?6',
//         },
//     ];
//
//     return (
//         <div className="player-page">
//             <div className="player-page__container">
//                 <section className="player-main">
//                     <div className="player-main__top-tabs">
//                         <button className="is-active">노래</button>
//                         <button>동영상</button>
//                     </div>
//
//                     <div className="player-main__art-card">
//                         <div className="player-main__art-frame">
//                             <img
//                                 src="https://picsum.photos/900/900?10"
//                                 alt="album art"
//                                 className="player-main__art-image"
//                             />
//                         </div>
//                         <div className="player-main__barcode" />
//                     </div>
//                 </section>
//
//                 <aside className="player-sidebar">
//                     <div className="player-sidebar__header">
//                         <h2>다음 트랙</h2>
//                     </div>
//
//                     <p className="player-sidebar__source-label">재생 중인 트랙 출처</p>
//                     <p className="player-sidebar__source-title">벚꽃잎 Spring in me 뮤직 스테이션</p>
//
//                     <div className="player-sidebar__filters">
//                         <button className="is-active">All</button>
//                         <button>친숙한 곡</button>
//                         <button>처음 듣는 곡</button>
//                         <button>인기</button>
//                         <button>숨은 명곡</button>
//                     </div>
//
//                     <div className="player-sidebar__list">
//                         {nextTracks.map((track) => (
//                             <div
//                                 className={`track-item ${track.active ? 'is-active' : ''}`}
//                                 key={`${track.title}-${track.artist}`}
//                             >
//                                 <img src={track.image} alt={track.title} className="track-item__thumb" />
//
//                                 <div className="track-item__meta">
//                                     <p className="track-item__title">{track.title}</p>
//                                     <p className="track-item__artist">{track.artist}</p>
//                                 </div>
//
//                                 <span className="track-item__duration">{track.duration}</span>
//                             </div>
//                         ))}
//                     </div>
//                 </aside>
//             </div>
//
//             <footer className="bottom-player">
//                 <div className="bottom-player__left">
//                     <button className="icon-btn">⏮</button>
//                     <button className="icon-btn icon-btn--play">▶</button>
//                     <button className="icon-btn">⏭</button>
//
//                     <span className="bottom-player__time">0:01 / 4:31</span>
//                 </div>
//
//                 <div className="bottom-player__center">
//                     <img
//                         src="https://picsum.photos/80/80?10"
//                         alt="current track"
//                         className="bottom-player__cover"
//                     />
//
//
//                     <div className="bottom-player__info">
//                         <p className="bottom-player__title">{currentTrack.title}</p>
//                         <p className="bottom-player__artist">{currentTrack.artist}</p>
//                     </div>
//
//                 </div>
//
//                 <div className="bottom-player__right">
//                     <button
//                         className="player-wave-btn"
//                         onClick={() => setIsSpecOpen(true)}
//                         aria-label="멜스펙트로그램 보기"
//                     >
//
//                         <svg
//                             width="28"
//                             height="28"
//                             viewBox="0 0 100 60"
//                             fill="none"
//                             xmlns="http://www.w3.org/2000/svg"
//                         >
//                             <rect x="0" y="20" width="6" height="20" rx="3" fill="currentColor" />
//                             <rect x="10" y="10" width="6" height="40" rx="3" fill="currentColor" />
//                             <rect x="20" y="5" width="6" height="50" rx="3" fill="currentColor" />
//                             <rect x="30" y="15" width="6" height="30" rx="3" fill="currentColor" />
//                             <rect x="40" y="0" width="6" height="60" rx="3" fill="currentColor" />
//                             <rect x="50" y="15" width="6" height="30" rx="3" fill="currentColor" />
//                             <rect x="60" y="5" width="6" height="50" rx="3" fill="currentColor" />
//                             <rect x="70" y="10" width="6" height="40" rx="3" fill="currentColor" />
//                             <rect x="80" y="20" width="6" height="20" rx="3" fill="currentColor" />
//                         </svg>
//                     </button>
//
//                     <button className="icon-btn">👍</button>
//                     <button className="icon-btn">🔉</button>
//                     <button className="icon-btn">🔀</button>
//                 </div>
//             </footer>
//
//             {isSpecOpen && (
//                 <div className="spec-modal" onClick={() => setIsSpecOpen(false)}>
//                     <div
//                         className="spec-modal__panel"
//                         onClick={(e) => e.stopPropagation()}
//                     >
//                         <div className="spec-modal__header">
//                             <div>
//                                 <p className="spec-modal__eyebrow">멜스펙트로그램</p>
//                                 <h3 className="spec-modal__title">{currentTrack.title}</h3>
//                             </div>
//
//                             <button
//                                 className="spec-modal__close"
//                                 onClick={() => setIsSpecOpen(false)}
//                             >
//                                 ✕
//                             </button>
//                         </div>
//
//                         <div className="spec-modal__body">
//                             <img
//                                 src={currentTrack.spectrogramImage}
//                                 alt={`${currentTrack.title} 멜스펙트로그램`}
//                                 className="spec-modal__image"
//                             />
//                         </div>
//                     </div>
//                 </div>
//             )}
//
//         </div>
//     );
// }


import './PlayerPage.css';
import { useMemo, useState } from "react";
import EmotionMapModal from "../components/EmotionMapModal";

export default function PlayerPage() {
    const [isSpecOpen, setIsSpecOpen] = useState(false);
    const [isEmotionOpen, setIsEmotionOpen] = useState(false);

    const currentTrack = {
        id: 999,
        title: '벚꽃잎 Spring in me (feat. Dalchong)',
        artist: 'YESUNG',
        spectrogramImage: '/spectrograms/spring-in-me.png',
        x: 52,
        y: 54,
    };

    const nextTracks = [
        {
            id: 1,
            title: '벚꽃잎 Spring in me (feat. Dalchong)',
            artist: 'YESUNG',
            duration: '4:31',
            image: 'https://picsum.photos/80/80?1',
            active: true,
            x: 48,
            y: 50,
            mood: '설렘',
        },
        {
            id: 2,
            title: '비처럼 가지 마요 One More Chance',
            artist: 'SUPER JUNIOR',
            duration: '4:16',
            image: 'https://picsum.photos/80/80?2',
            x: -12,
            y: -26,
            mood: '차분',
        },
        {
            id: 3,
            title: 'Jumping Machine (跳楼机)',
            artist: 'LBI',
            duration: '3:22',
            image: 'https://picsum.photos/80/80?3',
            x: 66,
            y: 24,
            mood: '활기',
        },
        {
            id: 4,
            title: 'New Day',
            artist: '풀림',
            duration: '4:03',
            image: 'https://picsum.photos/80/80?4',
            x: 18,
            y: -18,
            mood: '편안',
        },
        {
            id: 5,
            title: '하루의 끝 (End of a day)',
            artist: 'JONGHYUN',
            duration: '4:38',
            image: 'https://picsum.photos/80/80?5',
            x: -48,
            y: -42,
            mood: '우울',
        },
        {
            id: 6,
            title: '끝이 아닐 (with 유주)',
            artist: '권순관 및 유주',
            duration: '4:01',
            image: 'https://picsum.photos/80/80?6',
            x: -8,
            y: 22,
            mood: '안정',
        },
    ];

    const emotionPoints = useMemo(() => {
        return nextTracks.map((track) => ({
            id: track.id,
            title: track.title,
            artist: track.artist,
            x: track.x,
            y: track.y,
            mood: track.mood,
        }));
    }, [nextTracks]);

    return (
        <div className="player-page">
            <div className="player-page__container">
                <section className="player-main">
                    <div className="player-main__top-tabs">
                        <button className="is-active">노래</button>
                        <button>동영상</button>
                    </div>

                    <div className="player-main__art-card">
                        <div className="player-main__art-frame">
                            <img
                                src="https://picsum.photos/900/900?10"
                                alt="album art"
                                className="player-main__art-image"
                            />
                        </div>
                        <div className="player-main__barcode" />
                    </div>
                </section>

                <aside className="player-sidebar">
                    <div className="player-sidebar__header">
                        <h2>다음 트랙</h2>
                    </div>

                    <p className="player-sidebar__source-label">재생 중인 트랙 출처</p>
                    <p className="player-sidebar__source-title">벚꽃잎 Spring in me 뮤직 스테이션</p>

                    <div className="player-sidebar__filters">
                        <button className="is-active">All</button>
                        <button>친숙한 곡</button>
                        <button>처음 듣는 곡</button>
                        <button>인기</button>
                        <button>숨은 명곡</button>
                    </div>

                    <div className="player-sidebar__list">
                        {nextTracks.map((track) => (
                            <div
                                className={`track-item ${track.active ? 'is-active' : ''}`}
                                key={`${track.title}-${track.artist}`}
                            >
                                <img src={track.image} alt={track.title} className="track-item__thumb" />

                                <div className="track-item__meta">
                                    <p className="track-item__title">{track.title}</p>
                                    <p className="track-item__artist">{track.artist}</p>
                                </div>

                                <span className="track-item__duration">{track.duration}</span>
                            </div>
                        ))}
                    </div>
                </aside>
            </div>

            <footer className="bottom-player">
                <div className="bottom-player__left">
                    <button className="icon-btn">⏮</button>
                    <button className="icon-btn icon-btn--play">▶</button>
                    <button className="icon-btn">⏭</button>

                    <span className="bottom-player__time">0:01 / 4:31</span>
                </div>

                <div className="bottom-player__center">
                    <img
                        src="https://picsum.photos/80/80?10"
                        alt="current track"
                        className="bottom-player__cover"
                    />

                    <div className="bottom-player__info">
                        <p className="bottom-player__title">{currentTrack.title}</p>
                        <p className="bottom-player__artist">{currentTrack.artist}</p>
                    </div>
                </div>

                <div className="bottom-player__right">
                    <button
                        className="player-wave-btn"
                        onClick={() => setIsSpecOpen(true)}
                        aria-label="멜스펙트로그램 보기"
                    >
                        <svg
                            width="28"
                            height="28"
                            viewBox="0 0 100 60"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect x="0" y="20" width="6" height="20" rx="3" fill="currentColor" />
                            <rect x="10" y="10" width="6" height="40" rx="3" fill="currentColor" />
                            <rect x="20" y="5" width="6" height="50" rx="3" fill="currentColor" />
                            <rect x="30" y="15" width="6" height="30" rx="3" fill="currentColor" />
                            <rect x="40" y="0" width="6" height="60" rx="3" fill="currentColor" />
                            <rect x="50" y="15" width="6" height="30" rx="3" fill="currentColor" />
                            <rect x="60" y="5" width="6" height="50" rx="3" fill="currentColor" />
                            <rect x="70" y="10" width="6" height="40" rx="3" fill="currentColor" />
                            <rect x="80" y="20" width="6" height="20" rx="3" fill="currentColor" />
                        </svg>
                    </button>

                    <button
                        className="player-emotion-btn"
                        onClick={() => setIsEmotionOpen(true)}
                        aria-label="감정 분포 보기"
                    >
                        감정
                    </button>


                    <div className="bottom-player__right">
                        <button className="icon-btn" aria-label="좋아요"
                        >
                            <svg viewBox="0 0 24 24" fill="none">
                                <path
                                    d="M12 21s-6.5-4.35-9-8.28C1.5 9.5 3.24 6 6.5 6c1.86 0 3.06 1.04 3.5 2.09C10.44 7.04 11.64 6 13.5 6 16.76 6 18.5 9.5 17 12.72 14.5 16.65 12 21 12 21z"
                                    stroke="currentColor"
                                    strokeWidth="1.6"
                                />
                            </svg>
                        </button>

                        <button className="icon-btn" aria-label="볼륨">
                            <svg viewBox="0 0 24 24" fill="none">
                                <path
                                    d="M5 9v6h4l5 4V5L9 9H5z"
                                    stroke="currentColor"
                                    strokeWidth="1.6"
                                />
                                <path
                                    d="M16 9c1.5 1.5 1.5 4.5 0 6"
                                    stroke="currentColor"
                                    strokeWidth="1.6"
                                />
                            </svg>
                        </button>

                        <button className="icon-btn" aria-label="셔플">
                            <svg viewBox="0 0 24 24" fill="none">
                                <path
                                    d="M4 4h4l8 16h4"
                                    stroke="currentColor"
                                    strokeWidth="1.6"
                                />
                                <path
                                    d="M20 4l-4 4 4 4"
                                    stroke="currentColor"
                                    strokeWidth="1.6"
                                />
                            </svg>
                        </button>
                    </div>

                </div>
            </footer>

            {isSpecOpen && (
                <div className="spec-modal" onClick={() => setIsSpecOpen(false)}>
                    <div
                        className="spec-modal__panel"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="spec-modal__header">
                            <div>
                                <p className="spec-modal__eyebrow">멜스펙트로그램</p>
                                <h3 className="spec-modal__title">{currentTrack.title}</h3>
                            </div>

                            <button
                                className="spec-modal__close"
                                onClick={() => setIsSpecOpen(false)}
                            >
                                ✕
                            </button>
                        </div>

                        <div className="spec-modal__body">
                            <img
                                src={currentTrack.spectrogramImage}
                                alt={`${currentTrack.title} 멜스펙트로그램`}
                                className="spec-modal__image"
                            />
                        </div>
                    </div>
                </div>
            )}

            <EmotionMapModal
                open={isEmotionOpen}
                onClose={() => setIsEmotionOpen(false)}
                searchedTrack={currentTrack}
                tracks={emotionPoints}
                title="현재 곡 감정 분포"
            />
        </div>
    );
}