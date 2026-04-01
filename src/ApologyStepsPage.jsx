import { useState } from "react";

const pawAssets = ["/cat-paw.svg", "/cat-paw-round.svg", "/cat-paw-heart.svg"];

const pawPrints = [
  { id: 1, left: "8%", delay: "0s", duration: "15s", scale: 0.8, rotate: "-12deg" },
  { id: 2, left: "22%", delay: "4s", duration: "17s", scale: 1, rotate: "10deg" },
  { id: 3, left: "38%", delay: "1.5s", duration: "16s", scale: 0.72, rotate: "-8deg" },
  { id: 4, left: "58%", delay: "6s", duration: "18s", scale: 0.94, rotate: "14deg" },
  { id: 5, left: "73%", delay: "2.5s", duration: "14s", scale: 0.78, rotate: "-10deg" },
  { id: 6, left: "88%", delay: "8s", duration: "19s", scale: 0.9, rotate: "8deg" },
].map((paw, index) => ({
  ...paw,
  src: pawAssets[index % pawAssets.length],
}));

const apologyLines = [
  "วันนี้ทำงานเหนื่อยมั้ย เค้ามีกำลังใจเล็กๆมาฝากครับ",
  "เค้าอยากให้เธอรู้ว่าเธอไม่ต้องแบกรับความรู้สึกแย่ๆ ไว้คนเดียวอีกแล้วนะ",
  "แต่ช่วงนี้มีหมาบ้า มาทำให้ไม่ค่อยยิ้มแถมทำให้เหนื่อยกว่าเดิมอีก",
  "ถ้าวันไหนเธอเหนื่อยหรือไม่ไหว เค้าอยากเป็นคนที่อยู่ข้างๆ และปลอบเธอ ไม่ใช่คนที่ทำให้เธอเจ็บ",
  "ไหนอ่านถึงตรงนี้แล้วยิ้มรึยัง ได้มุมปากก็ยังดี แหะ",
  "เค้าชอบเวลาเธอยิ้มที่สุดเลย เค้าจะไม่ทำให้รอยยิ้มนี้หายไปไหนแล้ว",
  "วันนี้ที่รักทำงานสู้ๆนะ เค้าจะคอยเป็นกำลังใจ คอย support เธออยู่ตรงนี้ จะอยู่ข้างเธอเหมือนที่เธอ อยู่ข้างเค้า ให้กำลังใจเค้า ทำทุกอย่างเพื่อเค้า ว่างแล้วโทรมานะ เค้าจะรอกอดเธอ โอ๋เธอในวันที่เหนื่อยๆแบบนี้เองครับ",
];

const finalMessage =
  "สุดท้ายนี้เธอก็คือคนที่เค้ารักมากที่สุด คือแฟนที่ดีที่สุด เค้าไม่เคยมองว่าเธอเป็นแฟนที่ไม่ดีเลยนะ เธอคือของขวัญที่พิเศษที่สุด เธอคือคนที่เค้าอยากจะอยู่ด้วยไปตลอดในทุกๆปี ถึงจะมีทะเลาะกันบ้าง (เค้าเริ่ม) แต่ก็ยังอยู่เคียงข้างกันตลอด เธอคือ 1 ในกำลังใจที่สำคัญมากๆของเค้านะคะ เค้ารักบี๋มากๆนะ";

const secondStepMessage =
  "อันนี้แฟนเค้าเอง สวยมั้ย เค้าว่าสวยมากน่ารักมาก ยิ้มสวยที่สุดเลย";

const fourthStepMessage =
  "อันนี้ตอนหมาอยู่กับเจ้าของครับ ดูไม่ดื้อแต่ดื้อสุดใจ";

const sixthStepMessage =
  "เค้าชอบเวลาเธอยิ้มที่สุดเลย เค้าจะไม่ทำให้รอยยิ้มนี้หายไปไหนแล้ว";

export default function ApologyStepsPage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const isComplete = currentIndex >= apologyLines.length - 1;
  const showFinalCard = currentIndex >= apologyLines.length;
  const showSecondStepCard = currentIndex === 1;
  const showFourthStepCard = currentIndex === 3;
  const showSixthStepCard = currentIndex === 5;
  const currentLine = currentIndex >= 0 ? apologyLines[currentIndex] : "";

  const handleNext = () => {
    setCurrentIndex((current) => {
      if (current >= apologyLines.length) {
        return 0;
      }

      return current + 1;
    });
  };

  return (
    <main className="apology-page">
      <div className="apology-paws" aria-hidden="true">
        {pawPrints.map((paw) => (
          <div
            key={paw.id}
            className="paw-print"
            style={{
              left: paw.left,
              animationDelay: paw.delay,
              animationDuration: paw.duration,
              "--paw-scale": paw.scale,
              "--paw-rotate": paw.rotate,
            }}
          >
            <img src={paw.src} alt="" />
          </div>
        ))}
      </div>

      <section className="apology-text-stage" aria-label="Step by step apology">
        {showFinalCard ? (
          <div className="apology-final-card">
            <img src="/sea.JPG" alt="Us together" />
            <p className="apology-final-text">{finalMessage}</p>
          </div>
        ) : showSecondStepCard ? (
          <div className="apology-final-card">
            <img src="/my_smile.JPG" alt="My girlfriend" />
            <p className="apology-final-text">{secondStepMessage}</p>
          </div>
        ) : showFourthStepCard ? (
          <div className="apology-final-card">
            <img src="/sleeping.PNG" alt="Me with my girlfriend" />
            <p className="apology-final-text">{fourthStepMessage}</p>
          </div>
        ) : showSixthStepCard ? (
          <div className="apology-final-card">
            <img src="/peanut_miniheart.JPG" alt="My girlfriend smiling" />
            <p className="apology-final-text">{sixthStepMessage}</p>
          </div>
        ) : (
          <p key={currentIndex} className="apology-line-single">
            <span className="apology-line-reveal">{currentLine}</span>
          </p>
        )}

        <button className="apology-next" onClick={handleNext}>
          {showFinalCard ? "เริ่มอีกครั้ง" : isComplete ? "อ่านข้อความสุดท้าย" : "อ่านข้อความต่อ"}
        </button>
      </section>
    </main>
  );
}