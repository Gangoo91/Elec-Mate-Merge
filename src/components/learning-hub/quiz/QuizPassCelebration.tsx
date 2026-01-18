import React, { useEffect, useState, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, Star, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface QuizPassCelebrationProps {
  score: number;
  onContinue: () => void;
}

const QuizPassCelebration: React.FC<QuizPassCelebrationProps> = ({
  score,
  onContinue
}) => {
  const [displayScore, setDisplayScore] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Determine celebration level based on score
  const isPerfect = score === 100;
  const isOutstanding = score >= 90 && score < 100;
  const isExcellent = score >= 80 && score < 90;
  // 70-79% is just "Passed"

  const getStatusText = () => {
    if (isPerfect) return 'Perfect Score!';
    if (isOutstanding) return 'Outstanding!';
    if (isExcellent) return 'Excellent!';
    return 'Passed!';
  };

  const getStatusColor = () => {
    if (isPerfect) return 'from-purple-500 via-pink-500 to-yellow-500';
    if (isOutstanding || isExcellent) return 'from-yellow-500 to-amber-600';
    return 'from-green-500 to-emerald-600';
  };

  const getIconColor = () => {
    if (isPerfect) return 'text-yellow-400';
    if (isOutstanding || isExcellent) return 'text-yellow-400';
    return 'text-green-400';
  };

  const getRingColor = () => {
    if (isPerfect) return 'ring-purple-500/50';
    if (isOutstanding || isExcellent) return 'ring-yellow-500/50';
    return 'ring-green-500/50';
  };

  // Fire confetti
  const fireConfetti = useCallback(() => {
    const duration = isPerfect ? 3000 : isOutstanding ? 2500 : isExcellent ? 2000 : 1500;
    const particleCount = isPerfect ? 150 : isOutstanding ? 100 : isExcellent ? 70 : 50;

    // Center burst
    confetti({
      particleCount,
      spread: 70,
      origin: { y: 0.6 },
      colors: isPerfect
        ? ['#ff0000', '#ff7700', '#ffff00', '#00ff00', '#0099ff', '#6633ff', '#ff00ff']
        : isOutstanding || isExcellent
          ? ['#FFD700', '#FFA500', '#FFE4B5', '#FFEFD5', '#FFF8DC']
          : ['#22c55e', '#16a34a', '#10b981', '#059669', '#047857'],
      ticks: 200,
      gravity: 1.2,
      decay: 0.94,
      startVelocity: 30,
    });

    // Side bursts for 80%+ scores
    if (isExcellent || isOutstanding || isPerfect) {
      setTimeout(() => {
        // Left side
        confetti({
          particleCount: 40,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.6 },
          colors: isPerfect
            ? ['#ff0000', '#ff7700', '#ffff00', '#00ff00', '#0099ff', '#6633ff']
            : ['#FFD700', '#FFA500', '#FFE4B5'],
        });
        // Right side
        confetti({
          particleCount: 40,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.6 },
          colors: isPerfect
            ? ['#ff0000', '#ff7700', '#ffff00', '#00ff00', '#0099ff', '#6633ff']
            : ['#FFD700', '#FFA500', '#FFE4B5'],
        });
      }, 300);
    }

    // Extra effects for perfect score
    if (isPerfect) {
      setTimeout(() => {
        confetti({
          particleCount: 50,
          spread: 100,
          origin: { y: 0.5 },
          colors: ['#FFD700', '#FFA500', '#ffffff'],
          shapes: ['star'],
          gravity: 0.8,
        });
      }, 600);
    }

    return duration;
  }, [isPerfect, isOutstanding, isExcellent]);

  // Animate score count-up
  useEffect(() => {
    // Fade in overlay
    setIsVisible(true);

    // Fire confetti immediately
    const duration = fireConfetti();

    // Count up animation (1.5 seconds)
    const countDuration = 1500;
    const steps = 60;
    const increment = score / steps;
    let current = 0;
    const interval = countDuration / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= score) {
        setDisplayScore(score);
        clearInterval(timer);
      } else {
        setDisplayScore(Math.floor(current));
      }
    }, interval);

    // Show continue button after animation
    const buttonTimer = setTimeout(() => {
      setShowButton(true);
    }, 2000);

    // Auto-dismiss after 4 seconds
    const autoDismissTimer = setTimeout(() => {
      onContinue();
    }, 4000);

    return () => {
      clearInterval(timer);
      clearTimeout(buttonTimer);
      clearTimeout(autoDismissTimer);
    };
  }, [score, fireConfetti, onContinue]);

  // Tap anywhere to dismiss
  const handleOverlayClick = () => {
    onContinue();
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-200 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleOverlayClick}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-6 p-8">
        {/* Trophy icon with animation */}
        <div
          className={`relative w-24 h-24 rounded-full bg-gradient-to-br ${getStatusColor()} flex items-center justify-center ring-4 ${getRingColor()} animate-bounce`}
          style={{ animationDuration: '1s', animationIterationCount: '3' }}
        >
          <Trophy className={`h-12 w-12 ${getIconColor()}`} />

          {/* Sparkle decorations */}
          {(isPerfect || isOutstanding) && (
            <>
              <Sparkles className="absolute -top-2 -right-2 h-6 w-6 text-yellow-400 animate-pulse" />
              <Star className="absolute -bottom-1 -left-2 h-5 w-5 text-yellow-400 animate-pulse" style={{ animationDelay: '0.3s' }} />
            </>
          )}
        </div>

        {/* Score display */}
        <div className="text-center">
          <div
            className={`text-7xl font-bold bg-gradient-to-r ${getStatusColor()} bg-clip-text text-transparent`}
          >
            {displayScore}%
          </div>
        </div>

        {/* Status badge */}
        <div
          className={`px-6 py-2 rounded-full bg-gradient-to-r ${getStatusColor()} text-white font-bold text-xl shadow-lg transform transition-all duration-300 ${
            displayScore === score ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
          }`}
        >
          {getStatusText()}
        </div>

        {/* Continue button */}
        <div
          className={`transition-all duration-300 ${
            showButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onContinue();
            }}
            className="min-h-[48px] px-8 bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm"
          >
            Continue
          </Button>
        </div>

        {/* Tap to skip hint */}
        <p className="text-white/50 text-sm">Tap anywhere to continue</p>
      </div>
    </div>
  );
};

export default QuizPassCelebration;
