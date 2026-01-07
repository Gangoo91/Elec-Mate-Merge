import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ResultsSuccessAnimationProps {
  isVisible: boolean;
  onContinue: () => void;
  totalAmount?: number;
  projectName?: string;
}

export const ResultsSuccessAnimation = ({
  isVisible,
  onContinue,
  totalAmount,
  projectName
}: ResultsSuccessAnimationProps) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setShowContent(true), 400);
      return () => clearTimeout(timer);
    } else {
      setShowContent(false);
    }
  }, [isVisible]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black flex items-center justify-center safe-top safe-bottom"
          onClick={onContinue}
        >
          {/* Background particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-elec-yellow/40"
                initial={{
                  x: '50vw',
                  y: '50vh',
                  scale: 0
                }}
                animate={{
                  x: `${Math.random() * 100}vw`,
                  y: `${Math.random() * 100}vh`,
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.05,
                  ease: 'easeOut'
                }}
              />
            ))}
          </div>

          {/* Central glow */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-elec-yellow/10 blur-[80px]"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          />

          {/* Content */}
          <div className="relative z-10 text-center px-6">
            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 15,
                delay: 0.1
              }}
              className="relative inline-flex mb-6"
            >
              {/* Outer ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-elec-yellow/30"
                style={{ width: 96, height: 96, margin: -8 }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: [1, 1.2, 1], opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
              />

              {/* Icon container */}
              <div className="w-20 h-20 rounded-full bg-elec-yellow/20 flex items-center justify-center">
                <CheckCircle2 className="h-10 w-10 text-elec-yellow" />
              </div>
            </motion.div>

            {/* Text content */}
            <AnimatePresence>
              {showContent && (
                <>
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-ios-title-1 text-white mb-2"
                  >
                    Analysis Complete
                  </motion.h1>

                  {projectName && (
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-ios-body text-white/60 mb-4"
                    >
                      {projectName}
                    </motion.p>
                  )}

                  {totalAmount && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
                      className="mb-8"
                    >
                      <p className="text-ios-caption-1 text-white/40 mb-1">Recommended Quote</p>
                      <p className="text-4xl font-bold text-elec-yellow">
                        {formatCurrency(totalAmount)}
                      </p>
                    </motion.div>
                  )}

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Button
                      variant="ios-primary"
                      size="ios-large"
                      onClick={(e) => {
                        e.stopPropagation();
                        onContinue();
                      }}
                      className="min-w-[200px]"
                    >
                      <Sparkles className="h-5 w-5 mr-2" />
                      View Results
                    </Button>
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="text-ios-caption-1 text-white/30 mt-4"
                  >
                    Tap anywhere to continue
                  </motion.p>
                </>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResultsSuccessAnimation;
