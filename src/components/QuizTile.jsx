import { motion } from "motion/react";

export default function QuizTile({ quiz, isCompleted, onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`relative w-full aspect-square rounded-tile flex flex-col
                  items-center justify-center gap-1 p-2 cursor-pointer
                  transition-shadow duration-300 border-2
                  ${
                    isCompleted
                      ? "bg-gradient-to-br from-pink-200 to-pink-soft shadow-tile border-rose-red/30"
                      : "bg-white shadow-tile hover:shadow-tile-hover border-transparent"
                  }`}
    >
      <span className="text-2xl md:text-3xl" role="img" aria-label={quiz.topic}>
        {quiz.emoji}
      </span>

      <span
        className="text-[10px] md:text-xs font-medium text-charcoal/80
                    leading-tight text-center line-clamp-2"
      >
        {quiz.topic}
      </span>

      {isCompleted && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 w-6 h-6 bg-green-500
                     rounded-full flex items-center justify-center shadow-sm"
        >
          <span className="text-white text-xs font-bold">&#10003;</span>
        </motion.div>
      )}

      {isCompleted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute bottom-0.5 right-1.5 text-xs font-bold text-rose-red"
        >
          {quiz.letter}
        </motion.div>
      )}
    </motion.button>
  );
}
