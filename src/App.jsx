import { useState } from "react";
import "./App.css";

export default function App() {
  const [scale, setScale] = useState(1);
  const [accepted, setAccepted] = useState(false);

  const handleNo = () => {
    setScale((prev) => Math.min(prev * 1.3, 5));
  };

  const reset = () => {
    setScale(1);
    setAccepted(false);
  };

  if (accepted) {
    return (
      <div className="yes-screen">
        <img src="https://www.nylabone.com/-/media/project/oneweb/nylabone/images/dog101/10-intelligent-dog-breeds/golden-retriever-tongue-out.jpg?h=430&w=710&hash=7FEB820D235A44B76B271060E03572C7
            " alt="Us 💕" />
        <h1 className="text">
          Best choice ever 💘
          <br />
          I love you 😍
        </h1>
        <button className="reset" onClick={reset}>
          Reset 🔄
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card">
        <h1>Will you be my Valentine? 💖</h1>

        <div className="buttons">
          <button
            className="yes"
            style={{ transform: `scale(${scale})` }}
            onClick={() => setAccepted(true)}
          >
            Yes 😍
          </button>

          {scale < 3 && (
            <button className="no" onClick={handleNo}>
              No 🙃
            </button>
          )}
        </div>
      </div>
    </div>
  );
}