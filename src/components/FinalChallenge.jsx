import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { playFinaleSound } from "../utils/soundManager";
import Celebration from "./Celebration";

export default function FinalChallenge({
  collectedLetters,
  onComplete,
  onClose,
  forceReveal = false,
}) {
  const [guess, setGuess] = useState("");
  const [solved, setSolved] = useState(forceReveal);
  const [shakeKey, setShakeKey] = useState(0);
  const [wrongFeedback, setWrongFeedback] = useState(false);
  const inputRef = useRef(null);

  const scrambleOrder = [
    5, 18, 0, 12, 9, 3, 15, 7, 20, 1, 11, 22, 6, 14, 2, 17, 8, 19, 4, 10,
    13, 16, 21,
  ];
  const scrambledLetters = scrambleOrder.map((i) => collectedLetters[i] || "");

  useEffect(() => {
    if (inputRef.current && !forceReveal) {
      setTimeout(() => inputRef.current.focus(), 300);
    }
  }, [forceReveal]);

  useEffect(() => {
    if (forceReveal) {
      playFinaleSound();
    }
  }, [forceReveal]);

  const normalize = (str) =>
    str
      .toUpperCase()
      .replace(/[^A-Z]/g, "")
      .trim();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!guess.trim() || solved) return;

    const normalizedGuess = normalize(guess);
    const targets = [
      "WILLYOUBEMYVALENTINE",
    ];

    if (targets.includes(normalizedGuess)) {
      setSolved(true);
      playFinaleSound();
      onComplete();
    } else {
      setShakeKey((k) => k + 1);
      setWrongFeedback(true);
      setTimeout(() => setWrongFeedback(false), 2000);
    }
  };

  if (solved) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 z-[60] flex items-center justify-center p-6
                   bg-gradient-to-b from-pink-soft via-rose-red/90 to-warm-coral overflow-auto"
      >
        <Celebration type="finale" />
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 120, delay: 0.3 }}
          className="text-center max-w-md"
        >
          <motion.h1
            className="text-5xl md:text-6xl font-cursive text-white mb-6
                       drop-shadow-lg leading-tight"
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
          >
            Will You Be My Valentine?
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <p className="text-white/90 text-lg md:text-xl font-body mb-2">
              Suhani, you mean the world to me.
            </p>
            <p className="text-white/90 text-lg md:text-xl font-body mb-6">
              Every moment with you is a treasure I hold close to my heart.
            </p>
          </motion.div>

          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.8, type: "spring" }}
            className="text-7xl inline-block animate-heartbeat"
          >
            ❤️
          </motion.span>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
            className="text-white/80 text-base mt-6 italic font-body"
          >
            — With all my love, Yash
          </motion.p>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4
                 bg-black/40 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        className="bg-white rounded-modal w-full max-w-md p-6 shadow-xl relative"
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

        <h2 className="text-2xl font-cursive text-rose-red text-center mb-2">
          The Final Challenge!
        </h2>
        <p className="text-sm text-charcoal/60 text-center mb-5">
          Unscramble these letters to reveal the hidden message:
        </p>

        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {scrambledLetters.map((letter, idx) => (
            <motion.span
              key={idx}
              initial={{ rotate: Math.random() * 20 - 10, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ delay: idx * 0.03, type: "spring" }}
              className="inline-flex items-center justify-center w-9 h-9
                         bg-gradient-to-br from-rose-red to-warm-coral
                         text-white font-bold rounded-lg shadow-md text-base
                         cursor-default select-none"
            >
              {letter}
            </motion.span>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <motion.input
            key={shakeKey}
            ref={inputRef}
            type="text"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="Type the unscrambled message..."
            animate={shakeKey > 0 ? { x: [-8, 8, -8, 8, 0] } : {}}
            transition={{ duration: 0.4 }}
            className="w-full px-4 py-3 rounded-xl border-2 border-pink-200
                       focus:border-rose-red focus:outline-none
                       text-center text-charcoal bg-cream/50 text-base"
            autoComplete="off"
          />
          <button
            type="submit"
            disabled={!guess.trim()}
            className="w-full py-3 bg-gradient-to-r from-rose-red to-warm-coral
                       text-white font-semibold rounded-button shadow-soft
                       hover:shadow-glow transition-shadow cursor-pointer
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Reveal the Message! 💝
          </button>
        </form>

        {wrongFeedback && (
          <motion.p
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mt-3 text-sm text-warm-coral font-medium"
          >
            Not quite... Try again! Think about what these letters could spell 💭
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  );
}
