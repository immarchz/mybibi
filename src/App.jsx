import { useEffect, useState } from "react";
import "./App.css";
import SorryPage from "./SorryPage";

export default function App() {
  const getPage = () =>
    window.location.hash.replace("#", "") === "/sorry" ? "sorry" : "home";

  const [scale, setScale] = useState(1);
  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(getPage);

  useEffect(() => {
    const syncPage = () => setPage(getPage());
    window.addEventListener("hashchange", syncPage);
    return () => window.removeEventListener("hashchange", syncPage);
  }, []);

  const handleNo = () => {
    setScale((prev) => Math.min(prev * 1.3, 5));
  };

  const reset = () => {
    setScale(1);
    setAccepted(false);
    setLoading(false);
  };

  useEffect(() => {
    if (!loading) return;
    const timer = setTimeout(() => {
      setAccepted(true);
      setLoading(false);
    }, 18000);
    return () => clearTimeout(timer);
  }, [loading]);

  if (page === "sorry") {
    return <SorryPage />;
  }

  if (accepted) {
    return (
      <div className="yes-screen">
        <a className="page-link" href="#/sorry">
          Open Sorry Page
        </a>
        <img src="/youandme.JPG
            " alt="Us 💕" />
        <h1 className="text">
          I really miss you my Bibi. Love you so much.
          <br />
          Thank you for being my Valentine 💘.
           <br />
            <br />
           รักนะจุ๊บๆ 😘
        </h1>
        <button className="reset" onClick={reset}>
          Reset 🔄
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      <a className="page-link" href="#/sorry">
        Open Sorry Page
      </a>
      {loading && (
        <div className="loading-overlay" aria-hidden="true">
          <div className="loading-stack">
            <div className="polaroid-card">
              <img
                src="/sushiro.jpeg"
                alt=""
              />
              <div className="polaroid-caption">Sushiro Date</div>
            </div>
            <div className="polaroid-card">
              <img
                src="/sleeping.PNG"
                alt=""
              />
              <div className="polaroid-caption">You and me at my room</div>
            </div>
            <div className="polaroid-card">
              <img
                src="/zootopia.PNG"
                alt=""
              />
              <div className="polaroid-caption">Zootopia</div>
            </div>
            <div className="polaroid-card">
              <img
                src="/exercise.JPG"
                alt=""
              />
              <div className="polaroid-caption">First time exercising together</div>
            </div>
            <div className="polaroid-card">
              <img
                src="/kitty.JPG"
                alt=""
              />
              <div className="polaroid-caption">Merry and Chagee {">"}{"<"}</div>
            </div>
            <div className="polaroid-card">
              <img
                src="/sea.JPG"
                alt=""
              />
              <div className="polaroid-caption">Beach trip with you</div>
            </div>
             <div className="polaroid-card">
              <img
                src="/airport.JPG"
                alt=""
              />
              <div className="polaroid-caption">Back to BKK TT</div>
            </div>
          </div>
        </div>
      )}
      <div className="card">
        <h2 className="pink-text">Will you be my Valentine? 💖</h2>

        <div className="buttons">
          <button
            className="yes"
            style={{ transform: `scale(${scale})` }}
            onClick={() => setLoading(true)}
            disabled={loading}
          >
            Yes 😍
          </button>

          {scale < 3 && (
            <button className="no" onClick={handleNo} disabled={loading}>
              No 🙃
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
