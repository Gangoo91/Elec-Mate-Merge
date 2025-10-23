import React, { useEffect, useState } from 'react';
import { CheckCircle2, Zap, Clock, Shield, FileText, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { triggerHaptic } from '@/utils/animation-helpers';

interface CompletionCelebrationProps {
  hazardCount: number;
  controlMeasuresCount: number;
  methodStepsCount: number;
  generationTimeSeconds: number;
  onClose?: () => void;
}

export const CompletionCelebration: React.FC<CompletionCelebrationProps> = ({
  hazardCount,
  controlMeasuresCount,
  methodStepsCount,
  generationTimeSeconds,
  onClose
}) => {
  const [visible, setVisible] = useState(false);
  const [confettiPieces, setConfettiPieces] = useState<Array<{ id: number; left: number; color: string; delay: number; duration: number }>>([]);

  useEffect(() => {
    // Trigger haptic feedback on mount
    triggerHaptic([100, 50, 100]);

    // Show animation
    setTimeout(() => setVisible(true), 100);

    // Generate confetti pieces
    const pieces = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      color: ['#FFC107', '#34D399', '#60A5FA', '#F59E0B'][Math.floor(Math.random() * 4)],
      delay: Math.random() * 0.5,
      duration: 2 + Math.random() * 1
    }));
    setConfettiPieces(pieces);

    // Auto-dismiss after 8 seconds
    const timer = setTimeout(() => {
      handleClose();
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => {
      onClose?.();
    }, 300);
  };

  const timeSavedHours = 2.5;
  const formatGenerationTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}m ${secs}s`;
  };

  return (
    <div className={`
      fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm
      transition-opacity duration-300
      ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}
    `}>
      {/* Confetti */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {confettiPieces.map((piece) => (
          <div
            key={piece.id}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: `${piece.left}%`,
              top: '-10px',
              backgroundColor: piece.color,
              animation: `confetti-fall ${piece.duration}s linear forwards`,
              animationDelay: `${piece.delay}s`
            }}
          />
        ))}
      </div>

      {/* Celebration card */}
      <div className={`
        relative max-w-lg w-full bg-gradient-to-br from-card via-card to-elec-dark/50
        rounded-2xl border-2 border-elec-yellow/30 shadow-2xl
        transform transition-all duration-500
        ${visible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}
      `}>
        {/* Close button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleClose}
          className="absolute top-3 right-3 text-muted-foreground hover:text-foreground z-10"
        >
          <X className="h-4 w-4" />
        </Button>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Success icon with animation */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl animate-pulse" />
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center animate-bounce-in shadow-lg">
                <CheckCircle2 className="h-10 w-10 sm:h-12 sm:w-12 text-white" />
              </div>
            </div>
          </div>

          {/* Title */}
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-elec-yellow via-green-400 to-green-500 bg-clip-text text-transparent">
              RAMS Generated Successfully!
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              Your professional safety documentation is ready for review
            </p>
          </div>

          {/* Statistics grid */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <StatCard
              icon={<Shield className="h-5 w-5" />}
              label="Hazards Identified"
              value={hazardCount}
              color="text-red-400"
            />
            <StatCard
              icon={<FileText className="h-5 w-5" />}
              label="Control Measures"
              value={controlMeasuresCount}
              color="text-blue-400"
            />
            <StatCard
              icon={<FileText className="h-5 w-5" />}
              label="Method Steps"
              value={methodStepsCount}
              color="text-purple-400"
            />
            <StatCard
              icon={<Clock className="h-5 w-5" />}
              label="Generated In"
              value={formatGenerationTime(generationTimeSeconds)}
              color="text-green-400"
              isTime
            />
          </div>

          {/* Time saved highlight */}
          <div className="flex items-center justify-center gap-2 p-4 bg-gradient-to-r from-green-500/10 via-green-400/10 to-green-500/10 rounded-xl border border-green-500/20">
            <Zap className="h-5 w-5 text-green-400" />
            <p className="text-sm sm:text-base font-medium">
              <span className="text-muted-foreground">Time saved: </span>
              <span className="text-green-400 font-bold">~{timeSavedHours} hours</span>
              <span className="text-muted-foreground"> vs manual creation</span>
            </p>
          </div>

          {/* Action button */}
          <Button
            onClick={handleClose}
            className="w-full bg-gradient-to-r from-elec-yellow to-yellow-500 hover:from-elec-yellow/90 hover:to-yellow-500/90 text-elec-dark font-bold text-base sm:text-lg py-6"
          >
            View Results
            <CheckCircle2 className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>

      <style>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(-10px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }

        @keyframes bounce-in {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-bounce-in {
          animation: bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
      `}</style>
    </div>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  color: string;
  isTime?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, color, isTime = false }) => {
  return (
    <div className="p-4 bg-muted/30 rounded-xl border border-border/50 hover:border-elec-yellow/30 transition-all duration-300 hover:scale-102">
      <div className="flex items-center gap-2 mb-2">
        <div className={color}>{icon}</div>
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
      <p className={`text-xl sm:text-2xl font-bold ${color} ${isTime ? 'text-base sm:text-lg' : ''}`}>
        {value}
      </p>
    </div>
  );
};
