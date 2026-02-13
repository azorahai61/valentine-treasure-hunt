import { motion } from "motion/react";

export default function LetterDisplay({ letters }) {
  const scrambleOrder = [
    5, 18, 0, 12, 9, 3, 15, 7, 20, 1, 11, 22, 6, 14, 2, 17, 8, 19, 4, 10,
    13, 16, 21,
  ];

  const displayLetters = scrambleOrder
    .filter((i) => i < letters.length)
    .map((i) => letters[i])
    .filter(Boolean);

  if (displayLetters.length === 0) return null;

  return (
    <div className="mt-3 flex flex-wrap gap-1.5 justify-center">
      {displayLetters.map((letter, idx) => (
        <motion.span
          key={`${idx}-${letter}`}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="inline-flex items-center justify-center w-8 h-8
                     bg-gradient-to-br from-rose-red to-warm-coral
                     text-white font-bold rounded-lg text-sm shadow-sm"
        >
          {letter}
        </motion.span>
      ))}
    </div>
  );
}
