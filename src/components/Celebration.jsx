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
    } else if (type === "acceptance") {
      // Immediate big burst
      confetti({
        particleCount: 150,
        spread: 180,
        origin: { y: 0.4, x: 0.5 },
        colors: ["#FF6B9D", "#FFB6C1", "#FF7F7F", "#FFD700", "#FF69B4", "#FF0000"],
        scalar: 1.8,
        shapes: ["circle"],
      });

      // Continuous side-streams for 8 seconds
      const duration = 8000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 60,
          origin: { x: 0, y: 0.5 },
          colors: ["#FF6B9D", "#FFB6C1", "#FF7F7F", "#FFD700", "#FF69B4"],
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 60,
          origin: { x: 1, y: 0.5 },
          colors: ["#FF6B9D", "#FFB6C1", "#FF7F7F", "#FFD700", "#FF69B4"],
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();

      // Second burst at 1.5s
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 120,
          origin: { y: 0.5, x: 0.5 },
          shapes: ["circle"],
          colors: ["#FF6B9D", "#FF0000", "#FF69B4", "#FFB6C1"],
          scalar: 1.5,
        });
      }, 1500);

      // Third burst at 3s
      setTimeout(() => {
        confetti({
          particleCount: 80,
          spread: 160,
          origin: { y: 0.3, x: 0.5 },
          shapes: ["circle"],
          colors: ["#FFD700", "#FF6B9D", "#FF69B4"],
          scalar: 2.0,
        });
      }, 3000);
    }
  }, [type]);

  return null;
}
