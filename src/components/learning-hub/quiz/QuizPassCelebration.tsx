import React, { useEffect, useState } from 'react';
import { Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface QuizPassCelebrationProps {
  score: number;
  onContinue: () => void;
}

const QuizPassCelebration: React.FC<QuizPassCelebrationProps> = ({ score, onContinue }) => {
  const [displayScore, setDisplayScore] = useState(0);
  const [showButton, setShowButton] = useState(false);

  const isPerfect = score === 100;
  const isOutstanding = score >= 90;

  const getStatusText = () => {
    if (isPerfect) return 'Perfect Score!';
    if (isOutstanding) return 'Outstanding!';
    if (score >= 80) return 'Excellent!';
    return 'Passed!';
  };

  // Animate score counting up
  useEffect(() => {
    let current = 0;
    const increment = Math.ceil(score / 30);
    const timer = setInterval(() => {
      current += increment;
      if (current >= score) {
        setDisplayScore(score);
        clearInterval(timer);
        setTimeout(() => setShowButton(true), 500);
      } else {
        setDisplayScore(current);
      }
    }, 40);
    return () => clearInterval(timer);
  }, [score]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
        className="text-center space-y-6 max-w-sm w-full"
      >
        {/* Trophy */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <div className={`w-20 h-20 rounded-3xl mx-auto flex items-center justify-center ${isPerfect ? 'bg-yellow-400/20' : 'bg-green-500/20'}`}>
            <Trophy className={`h-10 w-10 ${isPerfect ? 'text-yellow-400' : 'text-green-400'}`} />
          </div>
        </motion.div>

        {/* Score */}
        <div>
          <p className={`text-6xl font-black ${isPerfect ? 'text-yellow-400' : 'text-green-400'}`}>
            {displayScore}%
          </p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-lg font-semibold text-white mt-2"
          >
            {getStatusText()}
          </motion.p>
        </div>

        {/* Message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-sm text-white"
        >
          {isPerfect
            ? 'Every single question correct. Outstanding knowledge.'
            : isOutstanding
              ? 'Near-perfect performance. Exceptional understanding.'
              : score >= 80
                ? 'Strong knowledge demonstrated across all areas.'
                : 'You passed! Keep practising to improve further.'}
        </motion.p>

        {/* Continue button */}
        {showButton && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              onClick={onContinue}
              className="w-full h-12 bg-yellow-400 text-black hover:bg-yellow-300 font-semibold rounded-xl touch-manipulation active:scale-[0.98] text-sm"
            >
              See Full Results
            </Button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default QuizPassCelebration;
