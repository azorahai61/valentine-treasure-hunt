import { useEffect } from "react";
import confetti from "canvas-confetti";

export default function Celebration({ type = "quiz" }) {
  useEffect(() => {
    if (type === "quiz") {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.7 },
        colors: ["#FF6B9D", "#FFB6C1", "#FF7F7F", "#FFD700", "#FF69B4"],
      });
    } else if (type === "finale") {
      const duration = 6000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 4,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.65 },
          colors: ["#FF6B9D", "#FFB6C1", "#FF7F7F", "#FFD700", "#FF69B4"],
        });
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.65 },
          colors: ["#FF6B9D", "#FFB6C1", "#FF7F7F", "#FFD700", "#FF69B4"],
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();

      setTimeout(() => {
        confetti({
          particleCount: 120,
          spread: 120,
          origin: { y: 0.5, x: 0.5 },
          shapes: ["circle"],
          colors: ["#FF6B9D", "#FF0000", "#FF69B4", "#FFB6C1"],
          scalar: 1.5,
        });
      }, 1500);
    }
  }, [type]);

  return null;
}
