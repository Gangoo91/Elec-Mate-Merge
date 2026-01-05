import React, { useEffect, useState } from 'react';
import { CheckCircle2, Zap, Clock, Shield, FileText, X, Sparkles, ArrowRight } from 'lucide-react';
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
        relative max-w-lg w-full bg-[#1e1e1e]
        rounded-3xl border border-green-500/30 shadow-2xl shadow-green-500/10
        transform transition-all duration-500 overflow-hidden
        ${visible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}
      `}>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-elec-yellow/5 pointer-events-none" />

        {/* Close button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleClose}
          className="absolute top-4 right-4 text-white/40 hover:text-white hover:bg-white/10 z-10 h-8 w-8"
        >
          <X className="h-4 w-4" />
        </Button>

        <div className="relative p-6 sm:p-8 space-y-6">
          {/* Success icon with animation */}
          <div className="flex justify-center">
            <div className="relative">
              {/* Outer glow rings */}
              <div className="absolute inset-0 scale-150 bg-green-500/10 rounded-full blur-2xl animate-pulse" />
              <div className="absolute inset-0 scale-125 bg-green-500/15 rounded-full blur-xl" style={{ animationDelay: '0.5s' }} />

              {/* Main icon container */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center animate-bounce-in shadow-lg shadow-green-500/30">
                <CheckCircle2 className="h-10 w-10 sm:h-12 sm:w-12 text-white" />
              </div>

              {/* Sparkle accents */}
              <Sparkles className="absolute -top-2 -right-2 h-5 w-5 text-elec-yellow animate-pulse" />
              <Sparkles className="absolute -bottom-1 -left-2 h-4 w-4 text-green-400 animate-pulse" style={{ animationDelay: '0.3s' }} />
            </div>
          </div>

          {/* Title */}
          <div className="text-center space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              RAMS Generated!
            </h2>
            <div className="flex items-center justify-center gap-2">
              <div className="h-1 w-1 rounded-full bg-green-500" />
              <p className="text-white/50 text-sm sm:text-base">
                Professional safety documentation ready
              </p>
              <div className="h-1 w-1 rounded-full bg-green-500" />
            </div>
          </div>

          {/* Statistics grid */}
          <div className="grid grid-cols-2 gap-3">
            <StatCard
              icon={<Shield className="h-4 w-4 sm:h-5 sm:w-5" />}
              label="Hazards"
              value={hazardCount}
              bgColor="bg-red-500/10"
              borderColor="border-red-500/20"
              textColor="text-red-400"
            />
            <StatCard
              icon={<FileText className="h-4 w-4 sm:h-5 sm:w-5" />}
              label="Controls"
              value={controlMeasuresCount}
              bgColor="bg-blue-500/10"
              borderColor="border-blue-500/20"
              textColor="text-blue-400"
            />
            <StatCard
              icon={<FileText className="h-4 w-4 sm:h-5 sm:w-5" />}
              label="Steps"
              value={methodStepsCount}
              bgColor="bg-purple-500/10"
              borderColor="border-purple-500/20"
              textColor="text-purple-400"
            />
            <StatCard
              icon={<Clock className="h-4 w-4 sm:h-5 sm:w-5" />}
              label="Time"
              value={formatGenerationTime(generationTimeSeconds)}
              bgColor="bg-green-500/10"
              borderColor="border-green-500/20"
              textColor="text-green-400"
              isTime
            />
          </div>

          {/* Time saved highlight */}
          <div className="relative p-4 rounded-2xl bg-[#1a1a1a] border border-elec-yellow/20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-elec-yellow/5 via-transparent to-green-500/5" />
            <div className="relative flex items-center justify-center gap-3">
              <div className="p-2 rounded-xl bg-elec-yellow/10">
                <Zap className="h-5 w-5 text-elec-yellow" />
              </div>
              <div className="text-center sm:text-left">
                <p className="text-xs text-white/40 uppercase tracking-wider">Time Saved</p>
                <p className="text-lg sm:text-xl font-bold text-elec-yellow">
                  ~{timeSavedHours} hours
                </p>
              </div>
            </div>
          </div>

          {/* Action button */}
          <Button
            onClick={handleClose}
            className="w-full h-14 bg-gradient-to-r from-elec-yellow to-amber-500 hover:from-elec-yellow/90 hover:to-amber-500/90 text-black font-bold text-base sm:text-lg rounded-xl shadow-lg shadow-elec-yellow/20 group"
          >
            View Your RAMS
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
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
  bgColor: string;
  borderColor: string;
  textColor: string;
  isTime?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, bgColor, borderColor, textColor, isTime = false }) => {
  return (
    <div className={`p-3 sm:p-4 rounded-xl ${bgColor} border ${borderColor} transition-all duration-300`}>
      <div className="flex flex-col items-center text-center gap-1.5">
        <div className={`p-2 rounded-lg ${bgColor} ${textColor}`}>
          {icon}
        </div>
        <p className="text-[10px] sm:text-xs text-white/40 uppercase tracking-wider">{label}</p>
        <p className={`text-xl sm:text-2xl font-bold ${textColor} ${isTime ? 'text-base sm:text-lg' : ''}`}>
          {value}
        </p>
      </div>
    </div>
  );
};
