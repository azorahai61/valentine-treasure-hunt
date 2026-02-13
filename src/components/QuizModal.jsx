import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { validateAnswer } from "../utils/answerValidator";
import { playCorrectSound } from "../utils/soundManager";

export default function QuizModal({ quiz, onComplete, onClose, isCompleted }) {
  const [userInput, setUserInput] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [solved, setSolved] = useState(isCompleted);
  const [showAnswer, setShowAnswer] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current && !isCompleted) {
      setTimeout(() => inputRef.current.focus(), 300);
    }
  }, [isCompleted]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userInput.trim() || solved) return;

    const result = validateAnswer(userInput, quiz.answers);
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (result.isCorrect) {
      setSolved(true);
      setFeedback({ type: "correct", message: "You got it! 🎉" });
      playCorrectSound();
      onComplete(quiz.id);
      setTimeout(onClose, 2500);
    } else if (newAttempts >= 3) {
      setSolved(true);
      setShowAnswer(true);
      setFeedback({
        type: "gifted",
        message: `The answer was "${quiz.answers[0]}" — but here's the letter anyway, because I love you! 💕`,
      });
      playCorrectSound();
      onComplete(quiz.id);
      setTimeout(onClose, 3500);
    } else {
      if (result.closeness === "close") {
        setFeedback({ type: "close", message: "So close! Try again 💭" });
      } else {
        setFeedback({ type: "wrong", message: "Not quite... Try again! 🤔" });
      }
      if (newAttempts >= 2 && quiz.hint) {
        setShowHint(true);
      }
      setUserInput("");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4
                 bg-black/40 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget && !solved) onClose();
      }}
    >
      <motion.div
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        className="bg-white rounded-modal w-full max-w-sm p-6 shadow-xl relative"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 rounded-full
                     bg-pink-100 text-charcoal/60 hover:bg-pink-200
                     flex items-center justify-center text-sm font-bold
                     cursor-pointer transition-colors"
          aria-label="Close"
        >
          ✕
        </button>

        <div className="text-center mb-4">
          <span className="text-5xl block mb-2">{quiz.emoji}</span>
          <h2 className="text-lg font-semibold text-charcoal">{quiz.topic}</h2>
        </div>

        <p className="text-center text-charcoal/80 mb-5 leading-relaxed text-sm">
          {quiz.question}
        </p>

        {!solved && (
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              ref={inputRef}
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type your answer..."
              className="w-full px-4 py-3 rounded-xl border-2 border-pink-200
                         focus:border-rose-red focus:outline-none
                         text-center text-charcoal bg-cream/50 text-base"
              autoComplete="off"
              autoCapitalize="off"
            />
            <button
              type="submit"
              disabled={!userInput.trim()}
              className="w-full py-3 bg-gradient-to-r from-rose-red to-warm-coral
                         text-white font-semibold rounded-button shadow-soft
                         hover:shadow-glow transition-shadow cursor-pointer
                         disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit ({3 - attempts} {3 - attempts === 1 ? "attempt" : "attempts"} left)
            </button>
          </form>
        )}

        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-center mt-4 p-3 rounded-xl text-sm font-medium
              ${feedback.type === "correct" ? "bg-green-50 text-green-700" : ""}
              ${feedback.type === "close" ? "bg-amber-50 text-amber-700" : ""}
              ${feedback.type === "wrong" ? "bg-red-50 text-red-600" : ""}
              ${feedback.type === "gifted" ? "bg-pink-50 text-rose-red" : ""}
            `}
          >
            {feedback.message}
          </motion.div>
        )}

        {showHint && !solved && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-3 text-xs text-charcoal/50 italic"
          >
            Hint: {quiz.hint}
          </motion.p>
        )}

        {solved && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="text-center mt-4"
          >
            <p className="text-sm text-charcoal/60 mb-2">Letter earned:</p>
            <span
              className="inline-flex items-center justify-center w-14 h-14
                         bg-gradient-to-br from-rose-red to-warm-coral
                         text-white text-2xl font-bold rounded-xl shadow-glow"
            >
              {quiz.letter}
            </span>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
