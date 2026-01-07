import React, { useEffect, useState, useCallback } from 'react';
import { CheckCircle2, Zap, Clock, Shield, FileText, X, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { triggerHaptic } from '@/utils/animation-helpers';
import { cn } from '@/lib/utils';

interface CompletionCelebrationProps {
  hazardCount: number;
  controlMeasuresCount: number;
  methodStepsCount: number;
  generationTimeSeconds: number;
  onClose?: () => void;
}

interface ConfettiPiece {
  id: number;
  left: number;
  color: string;
  delay: number;
  duration: number;
  size: number;
  shape: 'circle' | 'square' | 'rect';
  rotation: number;
}

export const CompletionCelebration: React.FC<CompletionCelebrationProps> = ({
  hazardCount,
  controlMeasuresCount,
  methodStepsCount,
  generationTimeSeconds,
  onClose
}) => {
  const [phase, setPhase] = useState<'enter' | 'stats' | 'complete'>('enter');
  const [confettiPieces, setConfettiPieces] = useState<ConfettiPiece[]>([]);
  const [statsVisible, setStatsVisible] = useState([false, false, false, false]);

  useEffect(() => {
    // Phase 1: Entrance - trigger strong haptic
    triggerHaptic([150, 50, 150, 50, 100]);

    // Generate varied confetti
    const shapes: Array<'circle' | 'square' | 'rect'> = ['circle', 'square', 'rect'];
    const colors = ['#FFC107', '#34D399', '#60A5FA', '#F59E0B', '#A78BFA', '#F472B6'];
    const pieces: ConfettiPiece[] = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 0.8,
      duration: 2.5 + Math.random() * 1.5,
      size: 6 + Math.random() * 8,
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      rotation: Math.random() * 360
    }));
    setConfettiPieces(pieces);

    // Phase 2: Show stats sequentially
    const statsTimers = [
      setTimeout(() => {
        setStatsVisible(prev => [true, prev[1], prev[2], prev[3]]);
        triggerHaptic([30]);
      }, 400),
      setTimeout(() => {
        setStatsVisible(prev => [prev[0], true, prev[2], prev[3]]);
        triggerHaptic([30]);
      }, 550),
      setTimeout(() => {
        setStatsVisible(prev => [prev[0], prev[1], true, prev[3]]);
        triggerHaptic([30]);
      }, 700),
      setTimeout(() => {
        setStatsVisible(prev => [prev[0], prev[1], prev[2], true]);
        triggerHaptic([30]);
        setPhase('stats');
      }, 850),
    ];

    // Phase 3: Complete state
    const completeTimer = setTimeout(() => {
      setPhase('complete');
      triggerHaptic([50, 30, 50]);
    }, 1200);

    // Auto-dismiss after 10 seconds
    const dismissTimer = setTimeout(() => {
      handleClose();
    }, 10000);

    return () => {
      statsTimers.forEach(clearTimeout);
      clearTimeout(completeTimer);
      clearTimeout(dismissTimer);
    };
  }, []);

  const handleClose = useCallback(() => {
    setPhase('enter'); // Reuse enter state for exit
    triggerHaptic([50]);
    setTimeout(() => {
      onClose?.();
    }, 300);
  }, [onClose]);

  const timeSavedHours = 2.5;
  const formatGenerationTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}m ${secs}s`;
  };

  const stats = [
    {
      icon: <Shield className="h-5 w-5" />,
      label: "Hazards",
      value: hazardCount,
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/20",
      textColor: "text-red-400",
    },
    {
      icon: <FileText className="h-5 w-5" />,
      label: "Controls",
      value: controlMeasuresCount,
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
      textColor: "text-blue-400",
    },
    {
      icon: <FileText className="h-5 w-5" />,
      label: "Steps",
      value: methodStepsCount,
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20",
      textColor: "text-purple-400",
    },
    {
      icon: <Clock className="h-5 w-5" />,
      label: "Time",
      value: formatGenerationTime(generationTimeSeconds),
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20",
      textColor: "text-green-400",
      isTime: true,
    },
  ];

  return (
    <div className={cn(
      "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md",
      "transition-all duration-300 ease-out",
      phase !== 'enter' ? 'opacity-100' : 'opacity-0'
    )}>
      {/* Confetti layer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {confettiPieces.map((piece) => (
          <div
            key={piece.id}
            className="absolute confetti-piece"
            style={{
              left: `${piece.left}%`,
              top: '-20px',
              width: piece.shape === 'rect' ? piece.size * 1.5 : piece.size,
              height: piece.shape === 'rect' ? piece.size * 0.6 : piece.size,
              backgroundColor: piece.color,
              borderRadius: piece.shape === 'circle' ? '50%' : piece.shape === 'square' ? '2px' : '1px',
              transform: `rotate(${piece.rotation}deg)`,
              animationDelay: `${piece.delay}s`,
              animationDuration: `${piece.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Celebration card */}
      <div className={cn(
        "relative w-full max-w-lg bg-elec-dark",
        "rounded-3xl border border-green-500/30 shadow-2xl shadow-green-500/20",
        "transform transition-all duration-500 ease-out overflow-hidden",
        phase !== 'enter'
          ? 'scale-100 translate-y-0 opacity-100'
          : 'scale-90 translate-y-8 opacity-0'
      )}>
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-elec-yellow/10 pointer-events-none" />

        {/* Radial glow behind icon */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-green-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleClose}
          className="absolute top-4 right-4 text-white/40 hover:text-white hover:bg-white/10 z-10 h-9 w-9 rounded-xl"
        >
          <X className="h-4 w-4" />
        </Button>

        <div className="relative p-6 sm:p-8 space-y-6">
          {/* Success icon with spring animation */}
          <div className="flex justify-center">
            <div className="relative">
              {/* Outer glow rings - animated */}
              <div className="absolute inset-0 scale-[2] bg-green-500/10 rounded-full blur-2xl animate-pulse-slow" />
              <div className="absolute inset-0 scale-150 bg-green-500/15 rounded-full blur-xl animate-pulse-slower" />

              {/* Main icon container with spring */}
              <div className={cn(
                "relative w-24 h-24 rounded-3xl bg-gradient-to-br from-green-400 to-green-600",
                "flex items-center justify-center shadow-xl shadow-green-500/40",
                "icon-spring"
              )}>
                <CheckCircle2 className="h-12 w-12 text-white drop-shadow-lg" />
              </div>

              {/* Sparkle accents */}
              <Sparkles className="absolute -top-3 -right-3 h-6 w-6 text-elec-yellow sparkle-1" />
              <Sparkles className="absolute -bottom-2 -left-3 h-5 w-5 text-green-300 sparkle-2" />
              <Sparkles className="absolute top-1/2 -right-4 h-4 w-4 text-amber-400 sparkle-3" />
            </div>
          </div>

          {/* Title with fade-up */}
          <div className={cn(
            "text-center space-y-3 transition-all duration-500",
            phase !== 'enter' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )} style={{ transitionDelay: '200ms' }}>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              RAMS Generated!
            </h2>
            <div className="flex items-center justify-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
              <p className="text-white/50 text-sm sm:text-base">
                Professional safety documentation ready
              </p>
              <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
            </div>
          </div>

          {/* Statistics grid - sequential reveal */}
          <div className="grid grid-cols-2 gap-3">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={cn(
                  "stat-card",
                  statsVisible[index] ? 'stat-visible' : 'stat-hidden'
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <StatCard {...stat} />
              </div>
            ))}
          </div>

          {/* Time saved highlight */}
          <div className={cn(
            "relative p-4 rounded-2xl bg-white/[0.03] border border-elec-yellow/20 overflow-hidden",
            "transition-all duration-500",
            phase === 'complete' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )} style={{ transitionDelay: '400ms' }}>
            <div className="absolute inset-0 bg-gradient-to-r from-elec-yellow/10 via-transparent to-green-500/10" />
            <div className="relative flex items-center justify-center gap-4">
              <div className="p-2.5 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20">
                <Zap className="h-6 w-6 text-elec-yellow" />
              </div>
              <div className="text-center sm:text-left">
                <p className="text-xs text-white/40 uppercase tracking-wider">Time Saved</p>
                <p className="text-xl sm:text-2xl font-bold text-elec-yellow">
                  ~{timeSavedHours} hours
                </p>
              </div>
            </div>
          </div>

          {/* Action button */}
          <Button
            onClick={handleClose}
            className={cn(
              "w-full h-14 bg-gradient-to-r from-elec-yellow to-amber-500",
              "hover:from-elec-yellow/90 hover:to-amber-500/90",
              "text-black font-bold text-base sm:text-lg rounded-xl",
              "shadow-lg shadow-elec-yellow/25 group",
              "transition-all duration-500 transform",
              phase === 'complete' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}
            style={{ transitionDelay: '500ms' }}
          >
            View Your RAMS
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1.5 transition-transform" />
          </Button>
        </div>
      </div>

      <style>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(-20px) rotate(0deg) scale(1);
            opacity: 1;
          }
          25% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg) scale(0.5);
            opacity: 0;
          }
        }

        .confetti-piece {
          animation: confetti-fall ease-out forwards;
          will-change: transform, opacity;
        }

        @keyframes icon-spring {
          0% {
            transform: scale(0) rotate(-10deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.15) rotate(5deg);
          }
          70% {
            transform: scale(0.95) rotate(-2deg);
          }
          85% {
            transform: scale(1.02) rotate(1deg);
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }

        .icon-spring {
          animation: icon-spring 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        @keyframes sparkle-float-1 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 1; }
          50% { transform: translate(3px, -5px) scale(1.2); opacity: 0.7; }
        }

        @keyframes sparkle-float-2 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.8; }
          50% { transform: translate(-4px, 4px) scale(1.1); opacity: 1; }
        }

        @keyframes sparkle-float-3 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.6; }
          50% { transform: translate(5px, -3px) scale(1.3); opacity: 1; }
        }

        .sparkle-1 { animation: sparkle-float-1 2s ease-in-out infinite; animation-delay: 0.2s; }
        .sparkle-2 { animation: sparkle-float-2 2.5s ease-in-out infinite; animation-delay: 0.5s; }
        .sparkle-3 { animation: sparkle-float-3 1.8s ease-in-out infinite; animation-delay: 0.8s; }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(2); }
          50% { opacity: 0.5; transform: scale(2.2); }
        }

        @keyframes pulse-slower {
          0%, 100% { opacity: 0.4; transform: scale(1.5); }
          50% { opacity: 0.6; transform: scale(1.7); }
        }

        .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
        .animate-pulse-slower { animation: pulse-slower 4s ease-in-out infinite; }

        .stat-card {
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .stat-hidden {
          opacity: 0;
          transform: translateY(20px) scale(0.9);
        }

        .stat-visible {
          opacity: 1;
          transform: translateY(0) scale(1);
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
    <div className={cn(
      "p-4 rounded-xl border transition-all duration-300",
      bgColor,
      borderColor,
      "hover:scale-[1.02]"
    )}>
      <div className="flex flex-col items-center text-center gap-2">
        <div className={cn("p-2 rounded-lg", bgColor, textColor)}>
          {icon}
        </div>
        <p className="text-xs text-white/40 uppercase tracking-wider">{label}</p>
        <p className={cn(
          "font-bold tabular-nums",
          textColor,
          isTime ? "text-lg" : "text-2xl"
        )}>
          {value}
        </p>
      </div>
    </div>
  );
};
