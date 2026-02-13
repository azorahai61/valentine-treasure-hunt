import { motion } from "motion/react";
import QuizGrid from "./QuizGrid";
import ProgressTracker from "./ProgressTracker";
import FloatingHearts from "./FloatingHearts";

export default function LandingPage({
  quizData,
  completedQuizzes,
  collectedLetters,
  allComplete,
  onSelectQuiz,
  onOpenFinalChallenge,
}) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-cream via-pink-100 to-cream">
      <FloatingHearts />

      <header className="relative z-10 pt-8 pb-4 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-1"
        >
          <span className="text-4xl">💝</span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-cursive text-rose-red"
        >
          Suhani's Treasure Hunt
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-2 text-charcoal/70 text-sm md:text-base max-w-md mx-auto font-body"
        >
          Solve each clue to collect a letter. Gather all 23 and unscramble
          them to reveal a special message!
        </motion.p>
      </header>

      <ProgressTracker
        total={quizData.length}
        completed={completedQuizzes.length}
        collectedLetters={collectedLetters}
      />

      <QuizGrid
        quizData={quizData}
        completedQuizzes={completedQuizzes}
        onSelectQuiz={onSelectQuiz}
      />

      {allComplete && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-8 px-4"
        >
          <p className="text-charcoal/60 text-sm mb-3 font-medium">
            All letters collected! Ready for the final challenge?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenFinalChallenge}
            className="bg-gradient-to-r from-rose-red to-warm-coral text-white
                       font-semibold py-4 px-8 rounded-button text-lg
                       shadow-glow animate-heartbeat cursor-pointer"
          >
            Unscramble the Message!
          </motion.button>
        </motion.div>
      )}

      <div className="text-center pb-6 text-charcoal/30 text-xs">
        Made with ❤ by Yash
      </div>
    </div>
  );
}
