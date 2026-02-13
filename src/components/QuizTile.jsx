import { motion } from "motion/react";

export default function QuizTile({ quiz, isCompleted, onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.25, y: -4 }}
      whileTap={{ scale: 0.85 }}
      onClick={onClick}
      className="relative flex items-center justify-center w-14 h-14
                 md:w-16 md:h-16 cursor-pointer bg-transparent border-none
                 outline-none p-0"
      style={{
        filter: isCompleted
          ? "drop-shadow(0 0 8px rgba(255, 107, 157, 0.6))"
          : "none",
      }}
      aria-label={quiz.topic}
    >
      <span
        className={`text-4xl md:text-[2.5rem] select-none transition-all duration-300
                    ${isCompleted ? "" : "grayscale-[20%] opacity-75"}`}
      >
        {quiz.emoji}
      </span>

      {isCompleted && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-green-500
                     rounded-full flex items-center justify-center shadow-sm"
        >
          <span className="text-white text-[10px] font-bold">&#10003;</span>
        </motion.div>
      )}

      {isCompleted && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -bottom-1 right-0 text-[10px] font-bold
                     text-rose-red bg-white/90 rounded-full w-4 h-4
                     flex items-center justify-center shadow-sm"
        >
          {quiz.letter}
        </motion.div>
      )}
    </motion.button>
  );
}
