import { useState, useCallback } from "react";
import { AnimatePresence } from "motion/react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { quizData } from "./data/quizData";
import { initAudio } from "./utils/soundManager";
import LandingPage from "./components/LandingPage";
import QuizModal from "./components/QuizModal";
import FinalChallenge from "./components/FinalChallenge";
import Celebration from "./components/Celebration";

function App() {
  const [completedQuizzes, setCompletedQuizzes] = useLocalStorage(
    "valentine-completed",
    []
  );
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [showFinalChallenge, setShowFinalChallenge] = useState(false);
  const [celebrationType, setCelebrationType] = useState(null);
  const [showGrandFinale, setShowGrandFinale] = useState(false);
  const [audioInitialized, setAudioInitialized] = useState(false);

  // Sparse array: index = quiz position in quizData, value = letter or null
  const collectedLetters = quizData.map((q) =>
    completedQuizzes.includes(q.id) ? q.letter : null
  );

  const allComplete = completedQuizzes.length === quizData.length;

  const handleFirstInteraction = useCallback(() => {
    if (!audioInitialized) {
      initAudio();
      setAudioInitialized(true);
    }
  }, [audioInitialized]);

  const handleQuizComplete = useCallback(
    (quizId) => {
      if (!completedQuizzes.includes(quizId)) {
        setCompletedQuizzes((prev) => [...prev, quizId]);
      }
      setCelebrationType("quiz");
      setTimeout(() => setCelebrationType(null), 2500);
    },
    [completedQuizzes, setCompletedQuizzes]
  );

  const handleCloseQuiz = useCallback(() => {
    setSelectedQuiz(null);
  }, []);

  const handleFinaleComplete = useCallback(() => {
    setShowFinalChallenge(false);
    setShowGrandFinale(true);
  }, []);

  // Reset a single quiz
  const handleResetQuiz = useCallback(
    (quizId) => {
      setCompletedQuizzes((prev) => prev.filter((id) => id !== quizId));
    },
    [setCompletedQuizzes]
  );

  // Reset all progress
  const handleResetAll = useCallback(() => {
    setCompletedQuizzes([]);
    setShowFinalChallenge(false);
    setShowGrandFinale(false);
    setSelectedQuiz(null);
  }, [setCompletedQuizzes]);

  if (showGrandFinale) {
    return (
      <div onClick={handleFirstInteraction}>
        <FinalChallenge
          collectedLetters={collectedLetters}
          onComplete={() => {}}
          onClose={() => {}}
          forceReveal={true}
          onStartOver={handleResetAll}
        />
      </div>
    );
  }

  return (
    <div onClick={handleFirstInteraction} className="min-h-screen">
      <LandingPage
        quizData={quizData}
        completedQuizzes={completedQuizzes}
        collectedLetters={collectedLetters}
        allComplete={allComplete}
        onSelectQuiz={setSelectedQuiz}
        onOpenFinalChallenge={() => setShowFinalChallenge(true)}
        onResetAll={handleResetAll}
      />

      <AnimatePresence>
        {selectedQuiz && (
          <QuizModal
            key={selectedQuiz.id}
            quiz={selectedQuiz}
            onComplete={handleQuizComplete}
            onClose={handleCloseQuiz}
            isCompleted={completedQuizzes.includes(selectedQuiz.id)}
            onResetQuiz={handleResetQuiz}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showFinalChallenge && !showGrandFinale && (
          <FinalChallenge
            collectedLetters={collectedLetters}
            onComplete={handleFinaleComplete}
            onClose={() => setShowFinalChallenge(false)}
            onStartOver={handleResetAll}
          />
        )}
      </AnimatePresence>

      {celebrationType && <Celebration type={celebrationType} />}
    </div>
  );
}

export default App;
