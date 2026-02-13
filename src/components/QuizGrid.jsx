import { motion } from "motion/react";
import QuizTile from "./QuizTile";

// Deterministic pseudo-random based on seed
function seededRandom(seed) {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

export default function QuizGrid({ quizData, completedQuizzes, onSelectQuiz }) {
  return (
    <div className="relative z-10 px-2 md:px-8 max-w-2xl mx-auto pb-8">
      <div className="flex flex-wrap justify-center items-center">
        {quizData.map((quiz, index) => {
          const rotation = seededRandom(quiz.id) * 24 - 12;
          const marginTop = Math.floor(seededRandom(quiz.id + 100) * 14);
          const marginX = 6 + Math.floor(seededRandom(quiz.id + 200) * 10);
          const marginBottom = Math.floor(seededRandom(quiz.id + 300) * 10);

          return (
            <motion.div
              key={quiz.id}
              initial={{ opacity: 0, scale: 0.3, rotate: rotation * 2 }}
              animate={{ opacity: 1, scale: 1, rotate: rotation }}
              transition={{
                delay: index * 0.04,
                type: "spring",
                stiffness: 200,
                damping: 15,
              }}
              style={{
                marginTop: `${marginTop}px`,
                marginLeft: `${marginX}px`,
                marginRight: `${marginX}px`,
                marginBottom: `${marginBottom}px`,
              }}
            >
              <QuizTile
                quiz={quiz}
                isCompleted={completedQuizzes.includes(quiz.id)}
                onClick={() => onSelectQuiz(quiz)}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
