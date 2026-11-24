// // import './PlayerPage.css';
// // import { useEffect, useMemo, useRef, useState } from "react";
// // import { useLocation, useNavigate  } from "react-router-dom";
// // import EmotionMapModal from "../components/EmotionMapModal";
// // import { getCurrentUserNo } from "../utils/auth";
// //
// // export default function PlayerPage() {
// //
// //     const location = useLocation();
// //     const navigate = useNavigate();
// //
// //     const [isSpecOpen, setIsSpecOpen] = useState(false);
// //     const [isEmotionOpen, setIsEmotionOpen] = useState(false);
// //     const [currentIndex, setCurrentIndex] = useState(0);
// //     const [youtubeMap, setYoutubeMap] = useState({});
// //     const [isPlaying, setIsPlaying] = useState(false);
// //
// //     const playerRef = useRef(null);
// //     const playerContainerRef = useRef(null);
// //
// //     const playHistoryIdRef = useRef(null);
// //     const currentSongIdRef = useRef(null);
// //
// //
// //
// //
// //     const mood = location.state?.mood;
// //     const keyword = location.state?.keyword || mood?.label || "설렘";
// //     const playlist = location.state?.playlist || [];
// //
// //     const getSongId = (song, index) => {
// //         return song.song_id ?? song.id ?? `${song.title}-${song.artist_name}-${index}`;
// //     };
// //
// //     const selectedSong =
// //         playlist[currentIndex] ||
// //         location.state?.selectedSong ||
// //         playlist[0];
// //
// //     const currentTrack = selectedSong
// //         ? {
// //             id: getSongId(selectedSong, currentIndex),
// //             title: selectedSong.title,
// //             artist: selectedSong.artist_name,
// //             image: selectedSong.image || `https://picsum.photos/900/900?${currentIndex}`,
// //             spectrogramImage: "/spectrograms/spring-in-me.png",
// //             x: selectedSong.valence * 100,
// //             y: selectedSong.arousal * 100,
// //             mood: keyword,
// //         }
// //         : {
// //             id: 999,
// //             title: "재생할 곡이 없습니다",
// //             artist: "",
// //             image: "https://picsum.photos/900/900?10",
// //             spectrogramImage: "/spectrograms/spring-in-me.png",
// //             x: 0,
// //             y: 0,
// //             mood: keyword,
// //         };
// //
// //
// //     useEffect(() => {
// //         if (!location.state?.selectedSong) return;
// //
// //         const index = playlist.findIndex(
// //             song =>
// //                 String(song.song_id) ===
// //                 String(location.state.selectedSong.song_id)
// //         );
// //
// //         if (index >= 0) {
// //             setCurrentIndex(index);
// //         }
// //     }, [playlist]);
// //
// //
// //     useEffect(() => {
// //         if (!playlist.length) return;
// //
// //         const fetchTrackThumbnails = async () => {
// //             const results = {};
// //
// //             await Promise.all(
// //                 playlist.map(async (song, index) => {
// //                     try {
// //                         const id = getSongId(song, index);
// //
// //                         const params = new URLSearchParams({
// //                             title: song.title,
// //                             artist: song.artist_name || "",
// //                         });
// //
// //                         const response = await fetch(
// //                             `${import.meta.env.VITE_API_BASE_URL}/api/youtube/search?${params}`
// //                         );
// //
// //                         if (!response.ok) return;
// //
// //                         const result = await response.json();
// //
// //                         results[id] = result.data;
// //                     } catch (error) {
// //                         console.error("YouTube 썸네일 가져오기 실패:", error);
// //                     }
// //                 })
// //             );
// //
// //             setYoutubeMap(results);
// //         };
// //
// //         fetchTrackThumbnails();
// //     }, [playlist]);
// //
// //     const currentYoutube = youtubeMap[currentTrack.id];
// //
// //     const currentImage =
// //         currentYoutube?.thumbnail ||
// //         currentTrack.image;
// //
// //     const currentVideoId = currentYoutube?.videoId;
// //
// //     const nextTracks = playlist.map((song, index) => {
// //         const id = getSongId(song, index);
// //         const youtube = youtubeMap[id];
// //
// //         return {
// //             id,
// //             title: song.title,
// //             artist: song.artist_name,
// //             duration: "3:30",
// //             image:
// //                 youtube?.thumbnail ||
// //                 song.image ||
// //                 `https://picsum.photos/80/80?${index}`,
// //             active: index === currentIndex,
// //             x: song.valence * 100,
// //             y: song.arousal * 100,
// //             mood: keyword,
// //             index,
// //         };
// //     });
// //
// //     //좋아요
// //     const [isLiked, setIsLiked] = useState(false);
// //     const [likeLoading, setLikeLoading] = useState(false);
// //
// //     useEffect(() => {
// //         if (!currentTrack?.id || currentTrack.id === 999) return;
// //
// //         const fetchLikeStatus = async () => {
// //             try {
// //                 const userNo = getCurrentUserNo();
// //
// //                 const response = await fetch(
// //                     `${import.meta.env.VITE_API_BASE_URL}/api/songs/${currentTrack.id}/like?user_no=${userNo}`
// //                 );
// //
// //                 if (!response.ok) {
// //                     setIsLiked(false);
// //                     return;
// //                 }
// //
// //                 const result = await response.json();
// //                 setIsLiked(result.liked);
// //             } catch (error) {
// //                 console.error("좋아요 상태 조회 실패:", error);
// //                 setIsLiked(false);
// //             }
// //         };
// //
// //         fetchLikeStatus();
// //     }, [currentTrack.id]);
// //
// //     //좋아요 토글
// //     const handleToggleLike = async () => {
// //         if (!currentTrack?.id || currentTrack.id === 999) return;
// //         if (likeLoading) return;
// //
// //         try {
// //             setLikeLoading(true);
// //
// //             const userNo = getCurrentUserNo();
// //
// //             const response = await fetch(
// //                 `${import.meta.env.VITE_API_BASE_URL}/api/songs/${currentTrack.id}/like`,
// //                 {
// //                     method: isLiked ? "DELETE" : "POST",
// //                     headers: {
// //                         "Content-Type": "application/json",
// //                     },
// //                     body: JSON.stringify({
// //                         user_no: userNo,
// //                     }),
// //                 }
// //             );
// //
// //             if (!response.ok) {
// //                 throw new Error("좋아요 처리 실패");
// //             }
// //
// //             const result = await response.json();
// //             setIsLiked(result.liked);
// //         } catch (error) {
// //             console.error("좋아요 처리 실패:", error);
// //         } finally {
// //             setLikeLoading(false);
// //         }
// //     };
// //
// //
// //
// //
// //
// //     const handlePlayPause = () => {
// //         if (!playerRef.current) return;
// //
// //         if (isPlaying) {
// //             playerRef.current.pauseVideo();
// //         } else {
// //             playerRef.current.playVideo();
// //         }
// //     };
// //
// //     const handleNextTrack = async () => {
// //         if (playlist.length === 0) return;
// //
// //         await endPlayHistory();
// //
// //         setCurrentIndex((prev) => {
// //             if (prev >= playlist.length - 1) return 0;
// //             return prev + 1;
// //         });
// //     };
// //
// //     const handlePrevTrack = async () => {
// //         if (playlist.length === 0) return;
// //
// //         await endPlayHistory();
// //
// //         setCurrentIndex((prev) => {
// //             if (prev <= 0) return playlist.length - 1;
// //             return prev - 1;
// //         });
// //     };
// //
// //     const handleSelectTrack = async (index) => {
// //         await endPlayHistory();
// //         setCurrentIndex(index);
// //     };
// //
// //     const emotionPoints = useMemo(() => {
// //         return nextTracks.map((track) => ({
// //             id: track.id,
// //             title: track.title,
// //             artist: track.artist,
// //             x: track.x,
// //             y: track.y,
// //             mood: track.mood,
// //         }));
// //     }, [nextTracks]);
// //
// //
// //
// //     useEffect(() => {
// //         if (!currentVideoId) return;
// //
// //         const createPlayer = () => {
// //             if (
// //                 playerRef.current &&
// //                 typeof playerRef.current.loadVideoById === "function"
// //             ) {
// //                 playerRef.current.loadVideoById(currentVideoId);
// //                 setIsPlaying(false);
// //                 return;
// //             }
// //
// //             playerRef.current = new window.YT.Player(playerContainerRef.current, {
// //                 width: "300",
// //                 height: "200",
// //                 videoId: currentVideoId,
// //                 playerVars: {
// //                     autoplay: 0,
// //                     controls: 0,
// //                     playsinline: 1,
// //                 },
// //                 events: {
// //                     onStateChange: (event) => {
// //                         if (event.data === window.YT.PlayerState.PLAYING) {
// //                             setIsPlaying(true);
// //
// //                             if (!playHistoryIdRef.current) {
// //                                 startPlayHistory();
// //                             }
// //                         }
// //
// //                         if (event.data === window.YT.PlayerState.PAUSED) {
// //                             setIsPlaying(false);
// //                         }
// //
// //                         if (event.data === window.YT.PlayerState.ENDED) {
// //                             setIsPlaying(false);
// //                             endPlayHistory();
// //                             handleNextTrack();
// //                         }
// //                     },
// //                 },
// //             });
// //         };
// //
// //         if (window.YT && window.YT.Player) {
// //             createPlayer();
// //         } else {
// //             const existingScript = document.querySelector(
// //                 'script[src="https://www.youtube.com/iframe_api"]'
// //             );
// //
// //             if (!existingScript) {
// //                 const tag = document.createElement("script");
// //                 tag.src = "https://www.youtube.com/iframe_api";
// //                 document.body.appendChild(tag);
// //             }
// //
// //             window.onYouTubeIframeAPIReady = createPlayer;
// //         }
// //     }, [currentVideoId]);
// //
// //     //재생기록용
// //     const startPlayHistory = async () => {
// //         console.log("startPlayHistory 호출");
// //
// //         if (!currentTrack?.id || currentTrack.id === 999) return;
// //         if (playHistoryIdRef.current) return;
// //
// //         try {
// //             const durationSeconds = playerRef.current?.getDuration
// //                 ? Math.floor(playerRef.current.getDuration())
// //                 : null;
// //
// //             const response = await fetch(
// //                 `${import.meta.env.VITE_API_BASE_URL}/api/songs/${currentTrack.id}/play/start`,
// //                 {
// //                     method: "POST",
// //                     headers: {
// //                         "Content-Type": "application/json",
// //                     },
// //                     body: JSON.stringify({
// //                         user_no: getCurrentUserNo(),
// //                         duration_seconds: durationSeconds,
// //                     }),
// //                 }
// //             );
// //
// //             const result = await response.json();
// //
// //             if (result.success) {
// //                 playHistoryIdRef.current = result.history_id;
// //                 currentSongIdRef.current = currentTrack.id;
// //             }
// //         } catch (error) {
// //             console.error("재생 시작 기록 실패:", error);
// //         }
// //     };
// //
// //     const endPlayHistory = async () => {
// //         if (!playHistoryIdRef.current) return;
// //
// //         try {
// //             const playedSeconds = playerRef.current?.getCurrentTime
// //                 ? Math.floor(playerRef.current.getCurrentTime())
// //                 : 0;
// //
// //             const durationSeconds = playerRef.current?.getDuration
// //                 ? Math.floor(playerRef.current.getDuration())
// //                 : null;
// //
// //             await fetch(
// //                 `${import.meta.env.VITE_API_BASE_URL}/api/songs/play-history/${playHistoryIdRef.current}/end`,
// //                 {
// //                     method: "PATCH",
// //                     headers: {
// //                         "Content-Type": "application/json",
// //                     },
// //                     body: JSON.stringify({
// //                         played_seconds: playedSeconds,
// //                         duration_seconds: durationSeconds,
// //                     }),
// //                 }
// //             );
// //         } catch (error) {
// //             console.error("재생 종료 기록 실패:", error);
// //         } finally {
// //             playHistoryIdRef.current = null;
// //             currentSongIdRef.current = null;
// //         }
// //     };
// //
// //     //페이지 나가도 기록되게
// //     useEffect(() => {
// //         return () => {
// //             endPlayHistory();
// //         };
// //     }, []);
// //
// //
// //     return (
// //         <div className="player-page">
// //             <div className="player-page__top-actions">
// //                 <button
// //                     className="player-page__home-btn"
// //                     onClick={() => navigate(-1)}>
// //                     뒤로
// //                 </button>
// //             </div>
// //             <div className="player-page__container">
// //                 <section className="player-main">
// //                     <div className="player-main__top-tabs">
// //                         <button className="is-active">노래</button>
// //                         <button>동영상</button>
// //                     </div>
// //
// //                     <div className="player-main__art-card">
// //                         <div className="player-main__art-frame">
// //                             <img
// //                                 src={currentImage}
// //                                 alt={currentTrack.title}
// //                                 className="player-main__art-image"
// //                             />
// //                         </div>
// //                         <div className="player-main__barcode" />
// //                     </div>
// //                 </section>
// //
// //                 <aside className="player-sidebar">
// //                     <div className="player-sidebar__header">
// //                         <h2>다음 트랙</h2>
// //                     </div>
// //
// //                     <p className="player-sidebar__source-label">#{keyword} 감정 재생목록</p>
// //                     <p className="player-sidebar__source-title">{currentTrack.title}</p>
// //
// //                     {/*<div className="player-sidebar__filters">*/}
// //                     {/*    <button className="is-active">All</button>*/}
// //                     {/*    <button>친숙한 곡</button>*/}
// //                     {/*    <button>처음 듣는 곡</button>*/}
// //                     {/*    <button>인기</button>*/}
// //                     {/*    <button>숨은 명곡</button>*/}
// //                     {/*</div>*/}
// //
// //                     <div className="player-sidebar__list">
// //                         {nextTracks.map((track) => (
// //                             <div
// //                                 className={`track-item ${track.active ? "is-active" : ""}`}
// //                                 key={`${track.id}-${track.title}`}
// //                                 onClick={() => handleSelectTrack(track.index)}
// //                             >
// //                                 <div className="track-item__cover-wrap">
// //                                     <img
// //                                         src={track.image}
// //                                         alt={track.title}
// //                                         className="track-item__cover"
// //                                     />
// //
// //                                     {track.active && (
// //                                         <span className="track-item__playing-badge">
// //                                             재생중
// //                                         </span>
// //                                     )}
// //                                 </div>
// //
// //                                 <div className="track-item__meta">
// //                                     <p className="track-item__title">{track.title}</p>
// //                                     <p className="track-item__artist">{track.artist}</p>
// //                                 </div>
// //
// //                                 <span className="track-item__duration">{track.duration}</span>
// //                             </div>
// //                         ))}
// //                     </div>
// //                 </aside>
// //             </div>
// //
// //             <footer className="bottom-player">
// //                 <div className="bottom-player__left">
// //                     <button className="icon-btn" onClick={handlePrevTrack}>⏮</button>
// //
// //                     <button
// //                         className="icon-btn icon-btn--play"
// //                         onClick={handlePlayPause}
// //                     >
// //                         {isPlaying ? "⏸" : "▶"}
// //                     </button>
// //
// //                     <button className="icon-btn" onClick={handleNextTrack}>⏭</button>
// //
// //                     <span className="bottom-player__time">0:01 / 4:31</span>
// //                 </div>
// //
// //                 <div className="bottom-player__center">
// //                     <img
// //                         src={currentImage}
// //                         alt={currentTrack.title}
// //                         className="bottom-player__cover"
// //                     />
// //
// //                     <div className="bottom-player__info">
// //                         <p className="bottom-player__title">{currentTrack.title}</p>
// //                         <p className="bottom-player__artist">{currentTrack.artist}</p>
// //                     </div>
// //                 </div>
// //
// //                 <div className="bottom-player__right">
// //                     <button
// //                         className="player-wave-btn"
// //                         onClick={() => setIsSpecOpen(true)}
// //                         aria-label="멜스펙트로그램 보기"
// //                     >
// //                         <svg
// //                             width="28"
// //                             height="28"
// //                             viewBox="0 0 100 60"
// //                             fill="none"
// //                             xmlns="http://www.w3.org/2000/svg"
// //                         >
// //                             <rect x="0" y="20" width="6" height="20" rx="3" fill="currentColor" />
// //                             <rect x="10" y="10" width="6" height="40" rx="3" fill="currentColor" />
// //                             <rect x="20" y="5" width="6" height="50" rx="3" fill="currentColor" />
// //                             <rect x="30" y="15" width="6" height="30" rx="3" fill="currentColor" />
// //                             <rect x="40" y="0" width="6" height="60" rx="3" fill="currentColor" />
// //                             <rect x="50" y="15" width="6" height="30" rx="3" fill="currentColor" />
// //                             <rect x="60" y="5" width="6" height="50" rx="3" fill="currentColor" />
// //                             <rect x="70" y="10" width="6" height="40" rx="3" fill="currentColor" />
// //                             <rect x="80" y="20" width="6" height="20" rx="3" fill="currentColor" />
// //                         </svg>
// //                     </button>
// //
// //                     <button
// //                         className="player-emotion-btn"
// //                         onClick={() => setIsEmotionOpen(true)}
// //                         aria-label="감정 분포 보기"
// //                     >
// //                         감정
// //                     </button>
// //
// //                     <button
// //                         className={`icon-btn ${isLiked ? "active" : ""}`}
// //                         aria-label={isLiked ? "좋아요 취소" : "좋아요"}
// //                         onClick={handleToggleLike}
// //                         disabled={likeLoading}
// //                     >
// //                         {isLiked ? "♥" : "♡"}
// //                     </button>
// //
// //                     <button className="icon-btn" aria-label="볼륨">🔊</button>
// //                     <button className="icon-btn" aria-label="셔플">🔀</button>
// //                 </div>
// //             </footer>
// //
// //             <div className="youtube-hidden-player">
// //                 <div ref={playerContainerRef} />
// //             </div>
// //
// //             {isSpecOpen && (
// //                 <div className="spec-modal" onClick={() => setIsSpecOpen(false)}>
// //                     <div
// //                         className="spec-modal__panel"
// //                         onClick={(e) => e.stopPropagation()}
// //                     >
// //                         <div className="spec-modal__header">
// //                             <div>
// //                                 <p className="spec-modal__eyebrow">멜스펙트로그램</p>
// //                                 <h3 className="spec-modal__title">{currentTrack.title}</h3>
// //                             </div>
// //
// //                             <button
// //                                 className="spec-modal__close"
// //                                 onClick={() => setIsSpecOpen(false)}
// //                             >
// //                                 ✕
// //                             </button>
// //                         </div>
// //
// //                         <div className="spec-modal__body">
// //                             <img
// //                                 src={currentTrack.spectrogramImage}
// //                                 alt={`${currentTrack.title} 멜스펙트로그램`}
// //                                 className="spec-modal__image"
// //                             />
// //                         </div>
// //                     </div>
// //                 </div>
// //             )}
// //
// //             <EmotionMapModal
// //                 open={isEmotionOpen}
// //                 onClose={() => setIsEmotionOpen(false)}
// //                 searchedTrack={currentTrack}
// //                 tracks={emotionPoints}
// //                 title="현재 곡 감정 분포"
// //             />
// //         </div>
// //     );
// // }
//
//
// import './PlayerPage.css';
// import './PlayerTimeline.css';
// import { useEffect, useMemo, useRef, useState } from "react";
// import { useLocation, useNavigate  } from "react-router-dom";
// import EmotionMapModal from "../components/EmotionMapModal";
// import { getCurrentUserNo } from "../utils/auth";
//
// export default function PlayerPage() {
//
//     const location = useLocation();
//     const navigate = useNavigate();
//
//     const [isSpecOpen, setIsSpecOpen] = useState(false);
//     const [isEmotionOpen, setIsEmotionOpen] = useState(false);
//     const [currentIndex, setCurrentIndex] = useState(0);
//     const [youtubeMap, setYoutubeMap] = useState({});
//     const [isPlaying, setIsPlaying] = useState(false);
//     const [currentTime, setCurrentTime] = useState(0);
//     const [duration, setDuration] = useState(0);
//
//     const playerRef = useRef(null);
//     const playerContainerRef = useRef(null);
//
//     const playHistoryIdRef = useRef(null);
//     const currentSongIdRef = useRef(null);
//
//
//
//
//     const mood = location.state?.mood;
//     const keyword = location.state?.keyword || mood?.label || "설렘";
//     const playlist = location.state?.playlist || [];
//
//     const getSongId = (song, index) => {
//         return song.song_id ?? song.id ?? `${song.title}-${song.artist_name}-${index}`;
//     };
//
//     const selectedSong =
//         playlist[currentIndex] ||
//         location.state?.selectedSong ||
//         playlist[0];
//
//     const currentTrack = selectedSong
//         ? {
//             id: getSongId(selectedSong, currentIndex),
//             title: selectedSong.title,
//             artist: selectedSong.artist_name,
//             image: selectedSong.image || `https://picsum.photos/900/900?${currentIndex}`,
//             spectrogramImage: "/spectrograms/spring-in-me.png",
//             x: selectedSong.valence * 100,
//             y: selectedSong.arousal * 100,
//             mood: keyword,
//         }
//         : {
//             id: 999,
//             title: "재생할 곡이 없습니다",
//             artist: "",
//             image: "https://picsum.photos/900/900?10",
//             spectrogramImage: "/spectrograms/spring-in-me.png",
//             x: 0,
//             y: 0,
//             mood: keyword,
//         };
//
//
//     useEffect(() => {
//         if (!location.state?.selectedSong) return;
//
//         const index = playlist.findIndex(
//             song =>
//                 String(song.song_id) ===
//                 String(location.state.selectedSong.song_id)
//         );
//
//         if (index >= 0) {
//             setCurrentIndex(index);
//         }
//     }, [playlist]);
//
//
//     useEffect(() => {
//         if (!playlist.length) return;
//
//         const fetchTrackThumbnails = async () => {
//             const results = {};
//
//             await Promise.all(
//                 playlist.map(async (song, index) => {
//                     try {
//                         const id = getSongId(song, index);
//
//                         const params = new URLSearchParams({
//                             title: song.title,
//                             artist: song.artist_name || "",
//                         });
//
//                         const response = await fetch(
//                             `${import.meta.env.VITE_API_BASE_URL}/api/youtube/search?${params}`
//                         );
//
//                         if (!response.ok) return;
//
//                         const result = await response.json();
//
//                         results[id] = result.data;
//                     } catch (error) {
//                         console.error("YouTube 썸네일 가져오기 실패:", error);
//                     }
//                 })
//             );
//
//             setYoutubeMap(results);
//         };
//
//         fetchTrackThumbnails();
//     }, [playlist]);
//
//     const currentYoutube = youtubeMap[currentTrack.id];
//
//     const currentImage =
//         currentYoutube?.thumbnail ||
//         currentTrack.image;
//
//     const currentVideoId = currentYoutube?.videoId;
//
//     const nextTracks = playlist.map((song, index) => {
//         const id = getSongId(song, index);
//         const youtube = youtubeMap[id];
//
//         return {
//             id,
//             title: song.title,
//             artist: song.artist_name,
//             duration: "3:30",
//             image:
//                 youtube?.thumbnail ||
//                 song.image ||
//                 `https://picsum.photos/80/80?${index}`,
//             active: index === currentIndex,
//             x: song.valence * 100,
//             y: song.arousal * 100,
//             mood: keyword,
//             index,
//         };
//     });
//
//     //좋아요
//     const [isLiked, setIsLiked] = useState(false);
//     const [likeLoading, setLikeLoading] = useState(false);
//
//     useEffect(() => {
//         if (!currentTrack?.id || currentTrack.id === 999) return;
//
//         const fetchLikeStatus = async () => {
//             try {
//                 const userNo = getCurrentUserNo();
//
//                 const response = await fetch(
//                     `${import.meta.env.VITE_API_BASE_URL}/api/songs/${currentTrack.id}/like?user_no=${userNo}`
//                 );
//
//                 if (!response.ok) {
//                     setIsLiked(false);
//                     return;
//                 }
//
//                 const result = await response.json();
//                 setIsLiked(result.liked);
//             } catch (error) {
//                 console.error("좋아요 상태 조회 실패:", error);
//                 setIsLiked(false);
//             }
//         };
//
//         fetchLikeStatus();
//     }, [currentTrack.id]);
//
//     //좋아요 토글
//     const handleToggleLike = async () => {
//         if (!currentTrack?.id || currentTrack.id === 999) return;
//         if (likeLoading) return;
//
//         try {
//             setLikeLoading(true);
//
//             const userNo = getCurrentUserNo();
//
//             const response = await fetch(
//                 `${import.meta.env.VITE_API_BASE_URL}/api/songs/${currentTrack.id}/like`,
//                 {
//                     method: isLiked ? "DELETE" : "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                     body: JSON.stringify({
//                         user_no: userNo,
//                     }),
//                 }
//             );
//
//             if (!response.ok) {
//                 throw new Error("좋아요 처리 실패");
//             }
//
//             const result = await response.json();
//             setIsLiked(result.liked);
//         } catch (error) {
//             console.error("좋아요 처리 실패:", error);
//         } finally {
//             setLikeLoading(false);
//         }
//     };
//
//
//
//
//
//     // 현재 재생 위치와 전체 길이를 실시간으로 갱신
//     useEffect(() => {
//         if (!currentVideoId) return;
//
//         const interval = setInterval(() => {
//             const player = playerRef.current;
//             if (
//                 typeof player?.getCurrentTime !== "function" ||
//                 typeof player?.getDuration !== "function" ||
//                 player.getVideoData?.()?.video_id !== currentVideoId
//             ) return;
//
//             setCurrentTime(player.getCurrentTime() || 0);
//             setDuration(player.getDuration() || 0);
//         }, 250);
//
//         return () => clearInterval(interval);
//     }, [currentVideoId]);
//
//     // 타임라인 클릭 및 드래그로 재생 위치 이동
//     const handleSeek = (e) => {
//         const time = Number(e.target.value);
//         if (duration <= 0 || typeof playerRef.current?.seekTo !== "function") return;
//         playerRef.current.seekTo(time, true);
//         setCurrentTime(time);
//     };
//
//     const formatTime = (seconds) => {
//         const total = Math.max(0, Math.floor(seconds || 0));
//         return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
//     };
//
//     const handlePlayPause = () => {
//         if (!playerRef.current) return;
//
//         if (isPlaying) {
//             playerRef.current.pauseVideo();
//         } else {
//             playerRef.current.playVideo();
//         }
//     };
//
//     const handleNextTrack = async () => {
//         if (playlist.length === 0) return;
//
//         await endPlayHistory();
//
//         setCurrentIndex((prev) => {
//             if (prev >= playlist.length - 1) return 0;
//             return prev + 1;
//         });
//     };
//
//     const handlePrevTrack = async () => {
//         if (playlist.length === 0) return;
//
//         await endPlayHistory();
//
//         setCurrentIndex((prev) => {
//             if (prev <= 0) return playlist.length - 1;
//             return prev - 1;
//         });
//     };
//
//     const handleSelectTrack = async (index) => {
//         await endPlayHistory();
//         setCurrentIndex(index);
//     };
//
//     const emotionPoints = useMemo(() => {
//         return nextTracks.map((track) => ({
//             id: track.id,
//             title: track.title,
//             artist: track.artist,
//             x: track.x,
//             y: track.y,
//             mood: track.mood,
//         }));
//     }, [nextTracks]);
//
//
//
//     useEffect(() => {
//         setCurrentTime(0);
//         setDuration(0);
//         if (!currentVideoId) return;
//
//         const createPlayer = () => {
//             if (
//                 playerRef.current &&
//                 typeof playerRef.current.loadVideoById === "function"
//             ) {
//                 playerRef.current.loadVideoById(currentVideoId);
//                 setIsPlaying(false);
//                 return;
//             }
//
//             playerRef.current = new window.YT.Player(playerContainerRef.current, {
//                 width: "300",
//                 height: "200",
//                 videoId: currentVideoId,
//                 playerVars: {
//                     autoplay: 0,
//                     controls: 0,
//                     playsinline: 1,
//                 },
//                 events: {
//                     onStateChange: (event) => {
//                         if (event.data === window.YT.PlayerState.PLAYING) {
//                             setIsPlaying(true);
//
//                             if (!playHistoryIdRef.current) {
//                                 startPlayHistory();
//                             }
//                         }
//
//                         if (event.data === window.YT.PlayerState.PAUSED) {
//                             setIsPlaying(false);
//                         }
//
//                         if (event.data === window.YT.PlayerState.ENDED) {
//                             setIsPlaying(false);
//                             endPlayHistory();
//                             handleNextTrack();
//                         }
//                     },
//                 },
//             });
//         };
//
//         if (window.YT && window.YT.Player) {
//             createPlayer();
//         } else {
//             const existingScript = document.querySelector(
//                 'script[src="https://www.youtube.com/iframe_api"]'
//             );
//
//             if (!existingScript) {
//                 const tag = document.createElement("script");
//                 tag.src = "https://www.youtube.com/iframe_api";
//                 document.body.appendChild(tag);
//             }
//
//             window.onYouTubeIframeAPIReady = createPlayer;
//         }
//     }, [currentVideoId]);
//
//     //재생기록용
//     const startPlayHistory = async () => {
//         console.log("startPlayHistory 호출");
//
//         if (!currentTrack?.id || currentTrack.id === 999) return;
//         if (playHistoryIdRef.current) return;
//
//         try {
//             const durationSeconds = playerRef.current?.getDuration
//                 ? Math.floor(playerRef.current.getDuration())
//                 : null;
//
//             const response = await fetch(
//                 `${import.meta.env.VITE_API_BASE_URL}/api/songs/${currentTrack.id}/play/start`,
//                 {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                     body: JSON.stringify({
//                         user_no: getCurrentUserNo(),
//                         duration_seconds: durationSeconds,
//                     }),
//                 }
//             );
//
//             const result = await response.json();
//
//             if (result.success) {
//                 playHistoryIdRef.current = result.history_id;
//                 currentSongIdRef.current = currentTrack.id;
//             }
//         } catch (error) {
//             console.error("재생 시작 기록 실패:", error);
//         }
//     };
//
//     const endPlayHistory = async () => {
//         if (!playHistoryIdRef.current) return;
//
//         try {
//             const playedSeconds = playerRef.current?.getCurrentTime
//                 ? Math.floor(playerRef.current.getCurrentTime())
//                 : 0;
//
//             const durationSeconds = playerRef.current?.getDuration
//                 ? Math.floor(playerRef.current.getDuration())
//                 : null;
//
//             await fetch(
//                 `${import.meta.env.VITE_API_BASE_URL}/api/songs/play-history/${playHistoryIdRef.current}/end`,
//                 {
//                     method: "PATCH",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                     body: JSON.stringify({
//                         played_seconds: playedSeconds,
//                         duration_seconds: durationSeconds,
//                     }),
//                 }
//             );
//         } catch (error) {
//             console.error("재생 종료 기록 실패:", error);
//         } finally {
//             playHistoryIdRef.current = null;
//             currentSongIdRef.current = null;
//         }
//     };
//
//     //페이지 나가도 기록되게
//     useEffect(() => {
//         return () => {
//             endPlayHistory();
//         };
//     }, []);
//
//
//     return (
//         <div className="player-page">
//             <div className="player-page__top-actions">
//                 <button
//                     className="player-page__home-btn"
//                     onClick={() => navigate(-1)}>
//                     뒤로
//                 </button>
//             </div>
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
//                                 src={currentImage}
//                                 alt={currentTrack.title}
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
//                     <p className="player-sidebar__source-label">#{keyword} 감정 재생목록</p>
//                     <p className="player-sidebar__source-title">{currentTrack.title}</p>
//
//                     {/*<div className="player-sidebar__filters">*/}
//                     {/*    <button className="is-active">All</button>*/}
//                     {/*    <button>친숙한 곡</button>*/}
//                     {/*    <button>처음 듣는 곡</button>*/}
//                     {/*    <button>인기</button>*/}
//                     {/*    <button>숨은 명곡</button>*/}
//                     {/*</div>*/}
//
//                     <div className="player-sidebar__list">
//                         {nextTracks.map((track) => (
//                             <div
//                                 className={`track-item ${track.active ? "is-active" : ""}`}
//                                 key={`${track.id}-${track.title}`}
//                                 onClick={() => handleSelectTrack(track.index)}
//                             >
//                                 <div className="track-item__cover-wrap">
//                                     <img
//                                         src={track.image}
//                                         alt={track.title}
//                                         className="track-item__cover"
//                                     />
//
//                                     {track.active && (
//                                         <span className="track-item__playing-badge">
//                                             재생중
//                                         </span>
//                                     )}
//                                 </div>
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
//                 <input
//                     type="range"
//                     className="bottom-player__progress"
//                     aria-label="음악 재생 위치"
//                     aria-valuetext={formatTime(currentTime)}
//                     min={0}
//                     max={duration || 1}
//                     step={0.1}
//                     value={Math.min(currentTime, duration || 1)}
//                     onChange={handleSeek}
//                     disabled={duration <= 0}
//                     style={{
//                         "--progress": `${duration > 0
//                             ? Math.min(100, currentTime / duration * 100)
//                             : 0}%`
//                     }}
//                 />
//                 <div className="bottom-player__left">
//                     <button className="icon-btn" onClick={handlePrevTrack}>⏮</button>
//
//                     <button
//                         className="icon-btn icon-btn--play"
//                         onClick={handlePlayPause}
//                     >
//                         {isPlaying ? "⏸" : "▶"}
//                     </button>
//
//                     <button className="icon-btn" onClick={handleNextTrack}>⏭</button>
//
//                     <span className="bottom-player__time">
//                         {formatTime(currentTime)} / {formatTime(duration)}
//                     </span>
//                 </div>
//
//                 <div className="bottom-player__center">
//                     <img
//                         src={currentImage}
//                         alt={currentTrack.title}
//                         className="bottom-player__cover"
//                     />
//
//                     <div className="bottom-player__info">
//                         <p className="bottom-player__title">{currentTrack.title}</p>
//                         <p className="bottom-player__artist">{currentTrack.artist}</p>
//                     </div>
//                 </div>
//
//                 <div className="bottom-player__right">
//                     <button
//                         className="player-wave-btn"
//                         onClick={() => setIsSpecOpen(true)}
//                         aria-label="멜스펙트로그램 보기"
//                     >
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
//                     <button
//                         className="player-emotion-btn"
//                         onClick={() => setIsEmotionOpen(true)}
//                         aria-label="감정 분포 보기"
//                     >
//                         감정
//                     </button>
//
//                     <button
//                         className={`icon-btn ${isLiked ? "active" : ""}`}
//                         aria-label={isLiked ? "좋아요 취소" : "좋아요"}
//                         onClick={handleToggleLike}
//                         disabled={likeLoading}
//                     >
//                         {isLiked ? "♥" : "♡"}
//                     </button>
//
//                     <button className="icon-btn" aria-label="볼륨">🔊</button>
//                     <button className="icon-btn" aria-label="셔플">🔀</button>
//                 </div>
//             </footer>
//
//             <div className="youtube-hidden-player">
//                 <div ref={playerContainerRef} />
//             </div>
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
//             <EmotionMapModal
//                 open={isEmotionOpen}
//                 onClose={() => setIsEmotionOpen(false)}
//                 searchedTrack={currentTrack}
//                 tracks={emotionPoints}
//                 title="현재 곡 감정 분포"
//             />
//         </div>
//     );
// }


import './PlayerPage.css';
import './PlayerTimeline.css';
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate  } from "react-router-dom";
import EmotionMapModal from "../components/EmotionMapModal";
import { getCurrentUserNo } from "../utils/auth";

export default function PlayerPage() {

    const location = useLocation();
    const navigate = useNavigate();

    const [isSpecOpen, setIsSpecOpen] = useState(false);
    const [isEmotionOpen, setIsEmotionOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(() => {
        const songs = location.state?.playlist || [];
        const selected = location.state?.selectedSong;
        if (!selected) return 0;
        const index = songs.findIndex(song =>
            String(song.song_id ?? song.id) === String(selected.song_id ?? selected.id)
        );
        return Math.max(0, index);
    });
    const [youtubeMap, setYoutubeMap] = useState({});
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const youtubeRequestsRef = useRef(new Map());
    const playerEventsRef = useRef(null);
    const playerRef = useRef(null);
    const playerContainerRef = useRef(null);

    const playHistoryIdRef = useRef(null);
    const currentSongIdRef = useRef(null);




    const mood = location.state?.mood;
    const keyword = location.state?.keyword || mood?.label || "설렘";
    const playlist = location.state?.playlist || [];

    const getSongId = (song, index) => {
        return song.song_id ?? song.id ?? `${song.title}-${song.artist_name}-${index}`;
    };

    const selectedSong =
        playlist[currentIndex] ||
        location.state?.selectedSong ||
        playlist[0];

    const currentTrack = selectedSong
        ? {
            id: getSongId(selectedSong, currentIndex),
            title: selectedSong.title,
            artist: selectedSong.artist_name,
            image: selectedSong.image || `https://picsum.photos/900/900?${currentIndex}`,
            spectrogramImage: "/spectrograms/spring-in-me.png",
            x: selectedSong.valence * 100,
            y: selectedSong.arousal * 100,
            mood: keyword,
        }
        : {
            id: 999,
            title: "재생할 곡이 없습니다",
            artist: "",
            image: "https://picsum.photos/900/900?10",
            spectrogramImage: "/spectrograms/spring-in-me.png",
            x: 0,
            y: 0,
            mood: keyword,
        };


    useEffect(() => {
        if (!location.state?.selectedSong) return;

        const index = playlist.findIndex(
            song =>
                String(song.song_id) ===
                String(location.state.selectedSong.song_id)
        );

        if (index >= 0) {
            setCurrentIndex(index);
        }
    }, [playlist]);


    // 현재 선택된 곡만 검색하고, 이미 조회한 결과와 진행 중 요청을 재사용
    useEffect(() => {
        if (!selectedSong || currentTrack.id === 999) return;
        const songId = currentTrack.id;
        if (youtubeMap[songId]) return;

        const requests = youtubeRequestsRef.current;
        if (requests.has(songId)) return;

        const fetchCurrentYoutube = async () => {
            try {
                const params = new URLSearchParams({
                    title: selectedSong.title,
                    artist: selectedSong.artist_name || "",
                });
                const response = await fetch(
                    `${import.meta.env.VITE_API_BASE_URL}/api/youtube/search?${params}`
                );
                if (!response.ok) throw new Error(`YouTube 검색 실패: ${response.status}`);
                const result = await response.json();
                if (!result.data?.videoId) return;
                setYoutubeMap(prev => ({ ...prev, [songId]: result.data }));
            } catch (error) {
                console.error("YouTube 정보 조회 실패:", error);
            } finally {
                requests.delete(songId);
            }
        };
        requests.set(songId, true);
        fetchCurrentYoutube();
    }, [currentTrack.id, currentTrack.title, currentTrack.artist, youtubeMap]);

    const currentYoutube = youtubeMap[currentTrack.id];

    const currentImage =
        currentYoutube?.thumbnail ||
        currentTrack.image;

    const currentVideoId = currentYoutube?.videoId;

    const nextTracks = playlist.map((song, index) => {
        const id = getSongId(song, index);
        const youtube = youtubeMap[id];

        return {
            id,
            title: song.title,
            artist: song.artist_name,
            duration: "3:30",
            image:
                youtube?.thumbnail ||
                song.image ||
                `https://picsum.photos/80/80?${index}`,
            active: index === currentIndex,
            x: song.valence * 100,
            y: song.arousal * 100,
            mood: keyword,
            index,
        };
    });

    //좋아요
    const [isLiked, setIsLiked] = useState(false);
    const [likeLoading, setLikeLoading] = useState(false);

    useEffect(() => {
        if (!currentTrack?.id || currentTrack.id === 999) return;

        const fetchLikeStatus = async () => {
            try {
                const userNo = getCurrentUserNo();

                const response = await fetch(
                    `${import.meta.env.VITE_API_BASE_URL}/api/songs/${currentTrack.id}/like?user_no=${userNo}`
                );

                if (!response.ok) {
                    setIsLiked(false);
                    return;
                }

                const result = await response.json();
                setIsLiked(result.liked);
            } catch (error) {
                console.error("좋아요 상태 조회 실패:", error);
                setIsLiked(false);
            }
        };

        fetchLikeStatus();
    }, [currentTrack.id]);

    //좋아요 토글
    const handleToggleLike = async () => {
        if (!currentTrack?.id || currentTrack.id === 999) return;
        if (likeLoading) return;

        try {
            setLikeLoading(true);

            const userNo = getCurrentUserNo();

            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/api/songs/${currentTrack.id}/like`,
                {
                    method: isLiked ? "DELETE" : "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        user_no: userNo,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("좋아요 처리 실패");
            }

            const result = await response.json();
            setIsLiked(result.liked);
        } catch (error) {
            console.error("좋아요 처리 실패:", error);
        } finally {
            setLikeLoading(false);
        }
    };





    // 현재 재생 위치와 전체 길이를 실시간으로 갱신
    useEffect(() => {
        if (!currentVideoId) return;

        const interval = setInterval(() => {
            const player = playerRef.current;
            if (
                typeof player?.getCurrentTime !== "function" ||
                typeof player?.getDuration !== "function" ||
                player.getVideoData?.()?.video_id !== currentVideoId
            ) return;

            setCurrentTime(player.getCurrentTime() || 0);
            setDuration(player.getDuration() || 0);
        }, 250);

        return () => clearInterval(interval);
    }, [currentVideoId]);

    // 타임라인 클릭 및 드래그로 재생 위치 이동
    const handleSeek = (e) => {
        const time = Number(e.target.value);
        if (duration <= 0 || typeof playerRef.current?.seekTo !== "function") return;
        playerRef.current.seekTo(time, true);
        setCurrentTime(time);
    };

    const formatTime = (seconds) => {
        const total = Math.max(0, Math.floor(seconds || 0));
        return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
    };

    const handlePlayPause = () => {
        if (!currentVideoId || typeof playerRef.current?.playVideo !== "function") return;

        if (isPlaying) {
            playerRef.current.pauseVideo();
        } else {
            playerRef.current.playVideo();
        }
    };

    const handleNextTrack = async () => {
        if (playlist.length === 0) return;

        await endPlayHistory();

        setCurrentIndex((prev) => {
            if (prev >= playlist.length - 1) return 0;
            return prev + 1;
        });
    };

    const handlePrevTrack = async () => {
        if (playlist.length === 0) return;

        await endPlayHistory();

        setCurrentIndex((prev) => {
            if (prev <= 0) return playlist.length - 1;
            return prev - 1;
        });
    };

    const handleSelectTrack = async (index) => {
        await endPlayHistory();
        setCurrentIndex(index);
    };

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



    useEffect(() => {
        setCurrentTime(0);
        setDuration(0);
        setIsPlaying(false);
        if (!currentVideoId) {
            playerRef.current?.pauseVideo?.();
            return;
        }
        let cancelled = false;

        const createPlayer = () => {
            if (cancelled || !playerContainerRef.current) return;
            if (
                playerRef.current &&
                typeof playerRef.current.loadVideoById === "function"
            ) {
                playerRef.current.loadVideoById(currentVideoId);
                setIsPlaying(false);
                return;
            }

            playerRef.current = new window.YT.Player(playerContainerRef.current, {
                width: "300",
                height: "200",
                videoId: currentVideoId,
                playerVars: {
                    autoplay: 0,
                    controls: 0,
                    playsinline: 1,
                },
                events: {
                    onStateChange: (event) => playerEventsRef.current?.(event),
                },
            });
        };

        if (window.YT && window.YT.Player) {
            createPlayer();
        } else {
            const existingScript = document.querySelector(
                'script[src="https://www.youtube.com/iframe_api"]'
            );

            if (!existingScript) {
                const tag = document.createElement("script");
                tag.src = "https://www.youtube.com/iframe_api";
                document.body.appendChild(tag);
            }

            window.onYouTubeIframeAPIReady = createPlayer;
        }
        return () => {
            cancelled = true;
        };
    }, [currentVideoId, currentTrack.id]);

    //재생기록용
    const startPlayHistory = async () => {
        console.log("startPlayHistory 호출");

        if (!currentTrack?.id || currentTrack.id === 999) return;
        if (playHistoryIdRef.current) return;

        try {
            const durationSeconds = playerRef.current?.getDuration
                ? Math.floor(playerRef.current.getDuration())
                : null;

            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/api/songs/${currentTrack.id}/play/start`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        user_no: getCurrentUserNo(),
                        duration_seconds: durationSeconds,
                    }),
                }
            );

            const result = await response.json();

            if (result.success) {
                playHistoryIdRef.current = result.history_id;
                currentSongIdRef.current = currentTrack.id;
            }
        } catch (error) {
            console.error("재생 시작 기록 실패:", error);
        }
    };

    const endPlayHistory = async () => {
        if (!playHistoryIdRef.current) return;

        try {
            const playedSeconds = playerRef.current?.getCurrentTime
                ? Math.floor(playerRef.current.getCurrentTime())
                : 0;

            const durationSeconds = playerRef.current?.getDuration
                ? Math.floor(playerRef.current.getDuration())
                : null;

            await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/api/songs/play-history/${playHistoryIdRef.current}/end`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        played_seconds: playedSeconds,
                        duration_seconds: durationSeconds,
                    }),
                }
            );
        } catch (error) {
            console.error("재생 종료 기록 실패:", error);
        } finally {
            playHistoryIdRef.current = null;
            currentSongIdRef.current = null;
        }
    };

    // 기존 IFrame 인스턴스에서도 현재 곡의 재생 기록과 다음 곡 함수 사용
    useEffect(() => {
        playerEventsRef.current = (event) => {
            if (!currentVideoId || event.target.getVideoData?.()?.video_id !== currentVideoId) return;
            if (event.data === window.YT.PlayerState.PLAYING) {
                setIsPlaying(true);
                if (!playHistoryIdRef.current) startPlayHistory();
            } else if (event.data === window.YT.PlayerState.PAUSED) {
                setIsPlaying(false);
            } else if (event.data === window.YT.PlayerState.ENDED) {
                setIsPlaying(false);
                handleNextTrack();
            }
        };
    });

    //페이지 나가도 기록되게
    useEffect(() => {
        return () => {
            endPlayHistory();
        };
    }, []);


    return (
        <div className="player-page">
            <div className="player-page__top-actions">
                <button
                    className="player-page__home-btn"
                    onClick={() => navigate(-1)}>
                    뒤로
                </button>
            </div>
            <div className="player-page__container">
                <section className="player-main">
                    <div className="player-main__top-tabs">
                        <button className="is-active">노래</button>
                        <button>동영상</button>
                    </div>

                    <div className="player-main__art-card">
                        <div className="player-main__art-frame">
                            <img
                                src={currentImage}
                                alt={currentTrack.title}
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

                    <p className="player-sidebar__source-label">#{keyword} 감정 재생목록</p>
                    <p className="player-sidebar__source-title">{currentTrack.title}</p>

                    {/*<div className="player-sidebar__filters">*/}
                    {/*    <button className="is-active">All</button>*/}
                    {/*    <button>친숙한 곡</button>*/}
                    {/*    <button>처음 듣는 곡</button>*/}
                    {/*    <button>인기</button>*/}
                    {/*    <button>숨은 명곡</button>*/}
                    {/*</div>*/}

                    <div className="player-sidebar__list">
                        {nextTracks.map((track) => (
                            <div
                                className={`track-item ${track.active ? "is-active" : ""}`}
                                key={`${track.id}-${track.title}`}
                                onClick={() => handleSelectTrack(track.index)}
                            >
                                <div className="track-item__cover-wrap">
                                    <img
                                        src={track.image}
                                        alt={track.title}
                                        className="track-item__cover"
                                    />

                                    {track.active && (
                                        <span className="track-item__playing-badge">
                                            재생중
                                        </span>
                                    )}
                                </div>

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
                <input
                    type="range"
                    className="bottom-player__progress"
                    aria-label="음악 재생 위치"
                    aria-valuetext={formatTime(currentTime)}
                    min={0}
                    max={duration || 1}
                    step={0.1}
                    value={Math.min(currentTime, duration || 1)}
                    onChange={handleSeek}
                    disabled={duration <= 0}
                    style={{
                        "--progress": `${duration > 0
                            ? Math.min(100, currentTime / duration * 100)
                            : 0}%`
                    }}
                />
                <div className="bottom-player__left">
                    <button className="icon-btn" onClick={handlePrevTrack}>⏮</button>

                    <button
                        className="icon-btn icon-btn--play"
                        onClick={handlePlayPause}
                    >
                        {isPlaying ? "⏸" : "▶"}
                    </button>

                    <button className="icon-btn" onClick={handleNextTrack}>⏭</button>

                    <span className="bottom-player__time">
                        {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                </div>

                <div className="bottom-player__center">
                    <img
                        src={currentImage}
                        alt={currentTrack.title}
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

                    <button
                        className={`icon-btn ${isLiked ? "active" : ""}`}
                        aria-label={isLiked ? "좋아요 취소" : "좋아요"}
                        onClick={handleToggleLike}
                        disabled={likeLoading}
                    >
                        {isLiked ? "♥" : "♡"}
                    </button>

                    <button className="icon-btn" aria-label="볼륨">🔊</button>
                    <button className="icon-btn" aria-label="셔플">🔀</button>
                </div>
            </footer>

            <div className="youtube-hidden-player">
                <div ref={playerContainerRef} />
            </div>

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
