import { useMemo, useState, useEffect, useRef } from "react";
import "./index.css";
import LovePage from "./LovePage";
import TransitionPage from "./TransitionPage";
import QuestionPage from "./QuestionPage";

const YT_VIDEO_ID = "LXIEBWnqiBA";
const YT_START = 33;
const YT_END = 85;

const RAIN_COUNT = 60;
const STAR_COUNT = 40;

const messages = [
  "มี๊คับ นี่จ๋อยนะ ป๊าทำมี๊เสียใจอีกแล้วใช่มั้ย",
  "ตอนป๊าทำ ป๊าไม่เคยคิดเลยว่ามันจะทำให้มี๊เสียใจขนาดนี้ แต่ตอนนี้ป๊ารู้แล้วว่าตัวเองผิดแค่ไหน",
  "ป๊าฝากจ๋อยมาบอกมี๊ว่า มาร์ชขอโทษจริงๆ ที่พูดไม่ดี เอาแต่ตัวเอง และไม่เคยใส่ใจความรู้สึกของพีนัทมากพอ ทั้งที่พีนัทคอยเตือนเค้ามาตลอด",
  "เค้าไม่มีข้อแก้ตัวอะไรเลย เค้าผิดจริงๆ",
  "เค้าไม่เคยอยากให้เราต้องมาถึงจุดที่เสียความรู้สึกกันแบบนี้ และไม่เคยอยากเสียเธอไปเลย",
  "ขอบคุณที่ยังอยู่กับเค้า และยังให้โอกาสเค้าอยู่",
  "ป๊ามีอะไรให้ดูด้วยคับมี๊ กดต่อไปได้เลยคับบ"
];

export default function App() {
  const [msgIndex, setMsgIndex] = useState(0);
  const [musicOn, setMusicOn] = useState(false);
  const [page, setPage] = useState("sad");
  const playerRef = useRef(null);
  const ytReadyRef = useRef(false);

  useEffect(() => {
    const initPlayer = () => {
      playerRef.current = new window.YT.Player("yt-player", {
        videoId: YT_VIDEO_ID,
        playerVars: {
          start: YT_START,
          end: YT_END,
          autoplay: 0,
          controls: 0,
          loop: 1,
          playlist: YT_VIDEO_ID,
          mute: 0,
        },
        events: {
          onStateChange: (e) => {
            if (e.data === window.YT.PlayerState.ENDED) {
              playerRef.current.seekTo(YT_START, true);
              playerRef.current.playVideo();
            }
          },
        },
      });
      ytReadyRef.current = true;
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = initPlayer;
      if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(tag);
      }
    }
    return () => {
      if (playerRef.current) playerRef.current.destroy();
    };
  }, []);

  const toggleMusic = () => {
    if (!playerRef.current || !ytReadyRef.current) return;
    if (!musicOn) {
      playerRef.current.seekTo(YT_START, true);
      playerRef.current.playVideo();
      setMusicOn(true);
    } else {
      playerRef.current.pauseVideo();
      setMusicOn(false);
    }
  };

  const drops = useMemo(() =>
    Array.from({ length: RAIN_COUNT }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      height: `${60 + Math.random() * 80}px`,
      duration: `${0.6 + Math.random() * 0.8}s`,
      delay: `${Math.random() * 3}s`,
      opacity: 0.2 + Math.random() * 0.4,
    })), []
  );

  const stars = useMemo(() =>
    Array.from({ length: STAR_COUNT }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 70}%`,
      size: `${1 + Math.random() * 2}px`,
      duration: `${2 + Math.random() * 3}s`,
      delay: `${Math.random() * 4}s`,
    })), []
  );

  const handleNext = () => {
    if (msgIndex < messages.length - 1) {
      setMsgIndex((prev) => prev + 1);
    }
  };

  const goToLove = () => {
    setPage("question");
  };

  return (
    <>
      {/* YouTube player — always mounted so music survives page switch */}
      <div id="yt-player" style={{ display: "none" }} />

      {page === "question" ? (
        <QuestionPage onDone={() => {
          if (playerRef.current && ytReadyRef.current && !musicOn) {
            playerRef.current.seekTo(YT_START, true);
            playerRef.current.playVideo();
            setMusicOn(true);
          }
          setPage("transition");
        }} />
      ) : page === "transition" ? (
        <TransitionPage onDone={() => setPage("love")} />
      ) : page === "love" ? (
        <LovePage musicOn={musicOn} toggleMusic={toggleMusic} />
      ) : (
      <div className="sad-bg">
      {/* Rain */}
      <div className="rain">
        {drops.map((d) => (
          <div
            key={d.id}
            className="drop"
            style={{
              left: d.left,
              height: d.height,
              animationDuration: d.duration,
              animationDelay: d.delay,
              opacity: d.opacity,
            }}
          />
        ))}
      </div>

      {/* Stars / dust */}
      <div className="stars">
        {stars.map((s) => (
          <div
            key={s.id}
            className="star"
            style={{
              left: s.left,
              top: s.top,
              width: s.size,
              height: s.size,
              animationDuration: s.duration,
              animationDelay: s.delay,
            }}
          />
        ))}
      </div>

      {/* Fog */}
      <div className="fog">
        <div className="fog-layer" />
        <div className="fog-layer" />
        <div className="fog-layer" />
      </div>

      {/* Bear + speech bubble as one unit */}
      <div className="bear-unit">
        <div className="speech-bubble" onClick={handleNext}>
          <p key={msgIndex} className="bubble-text">{messages[msgIndex]}</p>
          {msgIndex < messages.length - 1 ? (
            <span className="bubble-hint">แตะเพื่อถัดไป ▶</span>
          ) : (
            <button
              className="go-next-btn"
              onClick={(e) => { e.stopPropagation(); goToLove(); }}
            >
              ถัดไป →
            </button>
          )}
          <div className="bubble-dots">
            {messages.map((_, i) => (
              <span key={i} className={`dot ${i === msgIndex ? "active" : ""}`} />
            ))}
          </div>
        </div>
        <img src="/จ๋อย.png" alt="Grumpy Bear" className="bear-img" />
      </div>
    </div>
      )}
    </>
  );
}
