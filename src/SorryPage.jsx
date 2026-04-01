const photoSources = [
  "/airport.JPG",
  "/exercise.JPG",
  "/kitty.JPG",
  "/sea.JPG",
  "/sleeping.PNG",
  "/sushiro.jpeg",
  "/youandme.JPG",
  "/zootopia.PNG",
];

const shuffle = (items) =>
  [...items].sort(() => Math.random() - 0.5);

const floatingCards = shuffle(photoSources).map((src, index) => ({
  id: `${src}-${index}`,
  src,
  left: `${4 + Math.random() * 86}%`,
  delay: `${Math.random() * 6 + index * 0.3}s`,
  duration: `${12 + Math.random() * 8}s`,
  rotation: `${-12 + Math.random() * 24}deg`,
  scale: 0.78 + Math.random() * 0.42,
  opacity: 0.2 + Math.random() * 0.26,
}));

const messages = [
  "เค้าขอโทษที่ทำให้เธอรู้สึกหนักใจนะ",
  "เค้ารู้ว่าตัวเองทำให้เธอรู้สึกหนักใจ",
  "เธอมีความหมายกับเค้ามากๆ",
  "เค้ารักเธอมากๆ รักที่สุดเลยนะ",
];

export default function SorryPage() {
  return (
    <main className="sorry-page">
      <div className="sorry-glow sorry-glow-left" aria-hidden="true" />
      <div className="sorry-glow sorry-glow-right" aria-hidden="true" />

      <div className="floating-card-field" aria-hidden="true">
        {floatingCards.map((card) => (
          <div
            key={card.id}
            className="floating-photo-card"
            style={{
              left: card.left,
              animationDelay: card.delay,
              animationDuration: card.duration,
              rotate: card.rotation,
              scale: card.scale,
              opacity: card.opacity,
            }}
          >
            <img src={card.src} alt="" />
          </div>
        ))}
      </div>

      <section className="sorry-card" aria-label="Sorry message card">
        <span className="sorry-badge">A small apology</span>
        <h1 className="sorry-title">Sorry</h1>
        <p className="sorry-intro">
          Some words I wanted to say, wrapped in a softer page.
        </p>

        <a className="sorry-next-link" href="#/apology">
          Open The Next Page
        </a>

        <div className="sorry-lines">
          {messages.map((message, index) => (
            <p
              key={message}
              className="sorry-line"
              style={{ animationDelay: `${0.35 + index * 0.18}s` }}
            >
              {message}
            </p>
          ))}
        </div>

        <div className="sorry-heartbeat" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </section>
    </main>
  );
}