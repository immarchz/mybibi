import { useState, useEffect } from "react";

const LS_KEY = "q-seen";
const OTHER = { เสียใจ: "ชินแล้ว", ชินแล้ว: "เสียใจ" };

const ANSWERS = {
  เสียใจ: `เค้าเสียใจที่ทำให้เธอเสียความรู้สึกขนาดนี้

เสียใจที่ทำให้เธอต้องไม่มั่นใจว่าตัวเองรักเค้าได้ดีพอหรือยัง ทั้งที่จริงๆ แล้วเธอทำดีที่สุดมาตลอด

เสียใจที่ทำให้เธอต้องคอยสงสัยว่าทำไมเราถึงทะเลาะกันบ่อย ทั้งที่คนที่ควรกลับมาทบทวนตัวเองมากที่สุดคือเค้า

เค้าจะตั้งสติให้ดีกว่านี้ ฟังเธอให้มากกว่านี้ และไม่ปล่อยให้อารมณ์หรือความน้อยใจมาทำร้ายความรู้สึกของเธออีก

เค้ามีอะไรอยากให้บี๋ดูต่อด้วยนะคับ ❤️`,

  ชินแล้ว: `เค้าขอโทษที่เรื่องแบบนี้มันเกิดขึ้นซ้ำๆ และเค้าไม่เคยแก้ไขมันได้จริงๆ

ตอนนี้เค้ารู้แล้วว่าปัญหามันเกิดจากการที่เค้าไม่ยอมรับว่าตัวเองเป็นยังไง รู้สึกยังไง ไม่เข้าใจเธอมากพอ ไม่พยายามเข้าใจ ไม่ฟังเธอ และเอาแต่ความรู้สึกของตัวเอง จนสุดท้ายทำให้เธอเสียใจ

เค้าขอโทษจริงๆ

เค้าชอบเธอในวันที่เรามีความสุขไปด้วยกัน ชอบตอนที่เราอ้อนกัน หัวเราะด้วยกัน และอยู่ด้วยกันแบบสบายใจ

เค้าไม่อยากให้เธอต้องคอยกังวลว่าเค้าจะน้อยใจมั้ย ไม่อยากให้เธอต้องระวังว่าจะเจอคำพูดแย่ๆ หรือความ toxic จากเค้าอีก

เค้าไม่เคยตั้งใจให้มันเป็นแบบนี้เลย แต่เค้ารู้ว่าความเสียใจที่เธอได้รับมันเกิดขึ้นจริงจากการกระทำของเค้า

จากนี้เค้าจะไม่เอาแต่พูดแล้ว แต่จะพยายามเปลี่ยนแปลงตัวเองจริงๆ

เค้าขอโทษนะ

แล้วก็เค้ามีอะไรอยากให้เธอดูด้วย ❤️`,
};

function getSeen() {
  try { return JSON.parse(localStorage.getItem(LS_KEY)) ?? []; }
  catch { return []; }
}

function addSeen(choice) {
  const seen = getSeen();
  if (!seen.includes(choice)) {
    localStorage.setItem(LS_KEY, JSON.stringify([...seen, choice]));
  }
}

export default function QuestionPage({ onDone }) {
  const [chosen, setChosen] = useState(null);
  const [seen, setSeen] = useState([]);
  const [cameBackForThis, setCameBackForThis] = useState(false);

  useEffect(() => {
    setSeen(getSeen());
  }, []);

  const pick = (choice) => {
    const prevSeen = getSeen(); // capture before adding
    const cameBack = prevSeen.includes(OTHER[choice]) && !prevSeen.includes(choice);
    addSeen(choice);
    setSeen(getSeen());
    setChosen(choice);
    setCameBackForThis(cameBack);
  };

  const isReturning = seen.length > 0 && !chosen;

  return (
    <div className="love-bg">
      <div className="q-wrap">
        {!chosen ? (
          <div className="q-card q-card-enter">
            {isReturning && (
              <p className="q-returning-hint">แอบกลับมาดูอีกคำตอบอยู่ใช่มั้ยเนี่ย 🐾</p>
            )}
            <p className="q-question">ช่วงนี้เสียใจเพราะเค้ามากๆเลยใช่มั้ย</p>
            <div className="q-btns">
              <button
                className={`q-btn q-btn-yes ${seen.includes("เสียใจ") ? "" : isReturning ? "q-btn-glow" : ""}`}
                onClick={() => pick("เสียใจ")}
              >
                เสียใจ
                {!seen.includes("เสียใจ")}
              </button>
              <button
                className={`q-btn q-btn-no ${seen.includes("ชินแล้ว") ? "" : isReturning ? "q-btn-glow" : ""}`}
                onClick={() => pick("ชินแล้ว")}
              >
                ชินแล้ว
                {!seen.includes("ชินแล้ว")}
              </button>
            </div>
            {seen.length === 2 && (
              <p className="q-all-seen-hint">อ่านครบทั้งสองคำตอบแล้วนะ 🐱 กดดูอีกทีได้เลย</p>
            )}
          </div>
        ) : (
          <div key={chosen} className="q-card q-answer-card q-card-enter">
            {cameBackForThis && (
              <p className="q-sneak-peek">แน๊แอบมาดูอีกคำตอบหรอ &gt;&lt;</p>
            )}
            <div className="q-answer-text">
              {ANSWERS[chosen].split("\n").map((line, i) =>
                line === "" ? <br key={i} /> : <p key={i}>{line}</p>
              )}
            </div>
            <div className="q-answer-actions">
              <button className="q-next-btn" onClick={() => {
                const nowSeen = getSeen();
                if (nowSeen.length >= 2) {
                  localStorage.removeItem(LS_KEY);
                }
                onDone();
              }}>
                ดูต่อเลย ❤️ (มีเสียงเพลง)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

