import { motion } from "motion/react";
import LetterDisplay from "./LetterDisplay";

export default function ProgressTracker({ total, completed, collectedLetters }) {
  const percentage = Math.round((completed / total) * 100);

  return (
    <div className="relative z-10 mx-4 md:mx-auto max-w-lg mb-6">
      <div className="bg-white/80 backdrop-blur-sm rounded-card p-4 shadow-soft">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-charcoal/70">
            {completed}/{total} letters collected
          </span>
          <span className="text-sm font-semibold text-rose-red">
            {percentage}%
          </span>
        </div>
        <div className="w-full h-3 bg-pink-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-rose-red to-warm-coral rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>

        {completed > 0 && <LetterDisplay letters={collectedLetters} />}
      </div>
    </div>
  );
}
