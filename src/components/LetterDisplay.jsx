import { motion } from "motion/react";
import { SCRAMBLE_ORDER } from "../data/quizData";

export default function LetterDisplay({ letters }) {
  const displayLetters = SCRAMBLE_ORDER
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
