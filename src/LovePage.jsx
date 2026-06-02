import { useMemo, useState } from "react";

const HEART_COUNT = 30;

const photos = [
  { src: "/youandme.JPG",         desc: "เราสองคน 🥰" },
  { src: "/peanut_miniheart.JPG", desc: "พีนัท ♥" },
  { src: "/my_smile.JPG",         desc: "รอยยิ้มที่ชอบที่สุด" },
  { src: "/kitty.JPG",            desc: "ตอนที่บี๋ได้คิตตี้ 2 ตัว" },
  { src: "/sushiro.jpeg",         desc: "วันที่ไปกิน Sushiro ด้วยกันครั้งแรก 🍣" },
  { src: "/airport.JPG",          desc: "ที่สนามบิน ✈️" },
  { src: "/sea.JPG",              desc: "วันที่ไปหัวหิน 🌊" },
  { src: "/exercise.JPG",         desc: "วันที่ออกกำลังกายด้วยกัน 💪" },
  { src: "/sleeping.PNG",         desc: "นอนหลับนรอพระอาทิตย์ขึ้น น่ารักมากก" },
  { src: "/zootopia.PNG",         desc: "ดูหนังด้วยกัน 🎬" },
  { src: "/bibiwithpnong.jpg",    desc: "บี๋ๆกับพี่โหน่ง 🐻" },
  { src: "/somjaipang.jpg",       desc: "สมใจปังกับเธอ" },
  { src: "/sticker_image.PNG",    desc: "อันนี้ไว้ไปถ่ยที่ตู้กันคับ 555555" },
];

export default function LovePage({ musicOn, toggleMusic }) {
  const [selected, setSelected] = useState(null);

  const hearts = useMemo(() =>
    Array.from({ length: HEART_COUNT }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: `${14 + Math.random() * 22}px`,
      duration: `${4 + Math.random() * 6}s`,
      delay: `${Math.random() * 6}s`,
      opacity: 0.25 + Math.random() * 0.55,
    })), []
  );

  return (
    <div className="love-bg">
      {/* Floating hearts */}
      <div className="hearts">
        {hearts.map((h) => (
          <div
            key={h.id}
            className="heart"
            style={{
              left: h.left,
              fontSize: h.size,
              animationDuration: h.duration,
              animationDelay: h.delay,
              opacity: h.opacity,
            }}
          >
            ♥
          </div>
        ))}
      </div>

      {/* Music toggle */}
      <button className="music-btn love-music-btn" onClick={toggleMusic} title={musicOn ? "หยุดเพลง" : "เปิดเพลง"}>
        {musicOn ? "🔇" : "🎵"}
      </button>

      {/* Gallery */}
      <div className="gallery-wrap">
        <h2 className="gallery-title gallery-fade-in" style={{ animationDelay: "0ms" }}>March and Peanut ♥</h2>
        <div className="gallery-grid">
          {photos.map((photo, i) => (
            <div
              key={i}
              className="gallery-item gallery-pop-in"
              style={{ animationDelay: `${120 + i * 80}ms` }}
              onClick={() => setSelected(photo)}
            >
              <img src={photo.src} alt={photo.desc} className="gallery-thumb" />
            </div>
          ))}
        </div>
        <p className="gallery-footer-text gallery-fade-in" style={{ animationDelay: `${120 + photos.length * 80 + 100}ms` }}>เค้าชอบตอนที่อยู่กับเธอที่สุด</p>
        <p className="gallery-footer-text gallery-fade-in" style={{ animationDelay: `${120 + photos.length * 80 + 300}ms` }}>การได้มีเธอคือความโชคดีที่สุดในชีวิตเค้าครั้งนึง</p>
        <p className="gallery-footer-text gallery-fade-in" style={{ animationDelay: `${120 + photos.length * 80 + 500}ms` }}>ขอบคุณที่อยู่ข้างๆกันมาตลอด</p>
        <p className="gallery-footer-text gallery-fade-in" style={{ animationDelay: `${120 + photos.length * 80 + 700}ms` }}>เบ้บๆรักบี๋ๆมากๆนะ รักที่สุดเลย 🐱🐶💗</p>
      </div>

      {/* Modal */}
      {selected && (
        <div className="photo-overlay" onClick={() => setSelected(null)}>
          <div className="photo-card" onClick={(e) => e.stopPropagation()}>
            <img src={selected.src} alt={selected.desc} className="photo-card-img" />
            <p className="photo-card-desc">{selected.desc}</p>
            <button className="photo-card-close" onClick={() => setSelected(null)}>✕</button>
          </div>
        </div>
      )}
    </div>
  );
}
