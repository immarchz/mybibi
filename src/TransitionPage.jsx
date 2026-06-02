import { useMemo, useEffect } from "react";

const HEART_COUNT = 20;

const lines = [
  "ช่วงนี้เหนื่อยใช่มั้ย",
  "เค้ามีอะไรให้ดู",
];

// each line fades in 1s apart, auto-advance 1.5s after last line appears
const LINE_INTERVAL = 1000;
const AUTO_ADVANCE = LINE_INTERVAL * lines.length + 1500;

export default function TransitionPage({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, AUTO_ADVANCE);
    return () => clearTimeout(t);
  }, [onDone]);

  const hearts = useMemo(() =>
    Array.from({ length: HEART_COUNT }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: `${12 + Math.random() * 18}px`,
      duration: `${5 + Math.random() * 6}s`,
      delay: `${Math.random() * 6}s`,
      opacity: 0.2 + Math.random() * 0.45,
    })), []
  );

  return (
    <div className="love-bg transition-page">
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

      <div className="transition-content">
        {lines.map((line, i) => (
          <p
            key={i}
            className="transition-line"
            style={{ animationDelay: `${i * LINE_INTERVAL}ms` }}
          >
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}
