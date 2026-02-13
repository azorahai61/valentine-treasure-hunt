export default function FloatingHearts() {
  const hearts = [
    { left: "5%", delay: "0s", duration: "6s", size: "20px", opacity: 0.15 },
    { left: "15%", delay: "2s", duration: "8s", size: "14px", opacity: 0.1 },
    { left: "28%", delay: "4s", duration: "7s", size: "18px", opacity: 0.12 },
    { left: "42%", delay: "1s", duration: "9s", size: "16px", opacity: 0.1 },
    { left: "58%", delay: "3s", duration: "6s", size: "22px", opacity: 0.15 },
    { left: "72%", delay: "5s", duration: "8s", size: "12px", opacity: 0.08 },
    { left: "85%", delay: "2.5s", duration: "7s", size: "20px", opacity: 0.12 },
    { left: "93%", delay: "6s", duration: "10s", size: "14px", opacity: 0.1 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((h, i) => (
        <span
          key={i}
          className="absolute animate-float"
          style={{
            left: h.left,
            top: `${10 + i * 11}%`,
            animationDelay: h.delay,
            animationDuration: h.duration,
            fontSize: h.size,
            opacity: h.opacity,
          }}
        >
          ❤
        </span>
      ))}
    </div>
  );
}
