import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { playFinaleSound, playAcceptanceSound } from "../utils/soundManager";
import Celebration from "./Celebration";
import { SCRAMBLE_ORDER } from "../data/quizData";

export default function FinalChallenge({
  collectedLetters,
  onComplete,
  onClose,
  forceReveal = false,
  onStartOver,
}) {
  const [guess, setGuess] = useState("");
  const [solved, setSolved] = useState(forceReveal);
  const [shakeKey, setShakeKey] = useState(0);
  const [wrongFeedback, setWrongFeedback] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [showStartOver, setShowStartOver] = useState(false);
  const inputRef = useRef(null);

  const scrambledLetters = SCRAMBLE_ORDER.map((i) => collectedLetters[i] || "");

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

  // Play acceptance sound and show Start Over after delay
  useEffect(() => {
    if (accepted) {
      playAcceptanceSound();
    }
  }, [accepted]);

  useEffect(() => {
    if (accepted && onStartOver) {
      const timer = setTimeout(() => setShowStartOver(true), 3500);
      return () => clearTimeout(timer);
    }
  }, [accepted, onStartOver]);

  const normalize = (str) =>
    str
      .toUpperCase()
      .replace(/[^A-Z]/g, "")
      .trim();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!guess.trim() || solved) return;

    const normalizedGuess = normalize(guess);
    const targets = ["WILLYOUBEMYVALENTINE"];

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

  // ── Acceptance celebration screen ──
  if (solved && accepted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 z-[60] flex items-center justify-center p-6
                   bg-gradient-to-b from-pink-soft via-rose-red/90 to-warm-coral overflow-auto"
      >
        <Celebration type="acceptance" />
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}
          className="text-center max-w-md"
        >
          <motion.h1
            className="text-6xl md:text-7xl font-cursive text-white mb-4
                       drop-shadow-lg leading-tight"
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 150, delay: 0.3 }}
          >
            I Knew It! 💖
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex justify-center gap-3 mb-6"
          >
            {["❤️", "💕", "💖", "💗", "💝"].map((heart, i) => (
              <motion.span
                key={i}
                className="text-4xl"
                animate={{
                  y: [0, -12, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  delay: i * 0.15,
                  ease: "easeInOut",
                }}
              >
                {heart}
              </motion.span>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="text-white text-xl md:text-2xl font-cursive mb-3"
          >
            Forever & Always
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6 }}
            className="text-white/90 text-base md:text-lg font-body mb-6"
          >
            This is just the beginning of our beautiful story...
          </motion.p>

          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 2.0, type: "spring" }}
            className="text-8xl inline-block animate-heartbeat"
          >
            💕
          </motion.span>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
            className="text-white/80 text-base mt-6 italic font-body"
          >
            — With all my love, forever, Yash
          </motion.p>

          {showStartOver && onStartOver && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={onStartOver}
              className="mt-8 px-6 py-2 bg-white/20 text-white/80 text-sm
                         rounded-full border border-white/30 cursor-pointer
                         hover:bg-white/30 hover:text-white transition-all
                         backdrop-blur-sm"
            >
              Start Over
            </motion.button>
          )}
        </motion.div>
      </motion.div>
    );
  }

  // ── Proposal screen with Yes / Definitely Yes buttons ──
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.8 }}
            className="mt-8 flex flex-col sm:flex-row gap-3 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setAccepted(true)}
              className="px-8 py-3 bg-white/90 text-rose-red font-semibold
                         rounded-button shadow-soft hover:shadow-glow
                         transition-all cursor-pointer text-lg"
            >
              Yes 💕
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setAccepted(true)}
              className="px-10 py-4 bg-white text-rose-red font-bold
                         rounded-button shadow-glow
                         hover:shadow-[0_0_30px_rgba(255,107,157,0.6)]
                         transition-all cursor-pointer text-xl
                         border-2 border-white/50"
            >
              Definitely, Yes! 💝
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    );
  }

  // ── Unscramble challenge form ──
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
