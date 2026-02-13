import { motion } from "motion/react";
import QuizTile from "./QuizTile";

export default function QuizGrid({ quizData, completedQuizzes, onSelectQuiz }) {
  return (
    <div className="relative z-10 px-4 md:px-8 max-w-2xl mx-auto pb-8">
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
        {quizData.map((quiz, index) => (
          <motion.div
            key={quiz.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04 }}
          >
            <QuizTile
              quiz={quiz}
              isCompleted={completedQuizzes.includes(quiz.id)}
              onClick={() => onSelectQuiz(quiz)}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
