import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ConfettiPiece {
  id: number;
  x: number;
  delay: number;
  duration: number;
  color: string;
  size: number;
  rotation: number;
}

interface ConfettiProps {
  active: boolean;
  duration?: number;
  particleCount?: number;
  className?: string;
}

const COLORS = [
  "#FFDC00", // elec-yellow
  "#3B82F6", // blue
  "#22C55E", // green
  "#F97316", // orange
  "#EC4899", // pink
  "#8B5CF6", // purple
];

export function Confetti({
  active,
  duration = 3000,
  particleCount = 50,
  className,
}: ConfettiProps) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (active) {
      // Generate confetti pieces
      const newPieces: ConfettiPiece[] = [];
      for (let i = 0; i < particleCount; i++) {
        newPieces.push({
          id: i,
          x: Math.random() * 100,
          delay: Math.random() * 0.5,
          duration: 2 + Math.random() * 2,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          size: 8 + Math.random() * 8,
          rotation: Math.random() * 360,
        });
      }
      setPieces(newPieces);
      setIsVisible(true);

      // Hide after duration
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [active, duration, particleCount]);

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 pointer-events-none z-50 overflow-hidden",
        className
      )}
    >
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute animate-confetti-fall"
          style={{
            left: `${piece.x}%`,
            top: "-20px",
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
          }}
        >
          <div
            className="animate-confetti-spin"
            style={{
              width: piece.size,
              height: piece.size * 0.6,
              backgroundColor: piece.color,
              transform: `rotate(${piece.rotation}deg)`,
              borderRadius: "2px",
            }}
          />
        </div>
      ))}
    </div>
  );
}

// Celebration burst effect
interface CelebrationBurstProps {
  active: boolean;
  className?: string;
}

export function CelebrationBurst({ active, className }: CelebrationBurstProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (active) {
      setIsVisible(true);
      const timer = setTimeout(() => setIsVisible(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [active]);

  if (!isVisible) return null;

  return (
    <div className={cn("absolute inset-0 pointer-events-none", className)}>
      {/* Radial burst lines */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute top-1/2 left-1/2 w-1 h-16 bg-gradient-to-t from-elec-yellow to-transparent origin-bottom animate-burst"
          style={{
            transform: `rotate(${i * 30}deg) translateY(-100%)`,
            animationDelay: `${i * 0.02}s`,
          }}
        />
      ))}
      {/* Center flash */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-elec-yellow/50 rounded-full animate-ping" />
    </div>
  );
}

// Star burst for achievements
interface StarBurstProps {
  active: boolean;
  count?: number;
  className?: string;
}

export function StarBurst({ active, count = 8, className }: StarBurstProps) {
  const [stars, setStars] = useState<{ id: number; angle: number; delay: number }[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (active) {
      const newStars = [...Array(count)].map((_, i) => ({
        id: i,
        angle: (360 / count) * i,
        delay: i * 0.05,
      }));
      setStars(newStars);
      setIsVisible(true);

      const timer = setTimeout(() => setIsVisible(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [active, count]);

  if (!isVisible) return null;

  return (
    <div className={cn("absolute inset-0 pointer-events-none", className)}>
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute top-1/2 left-1/2 animate-star-burst"
          style={{
            transform: `rotate(${star.angle}deg)`,
            animationDelay: `${star.delay}s`,
          }}
        >
          <svg
            className="w-4 h-4 text-elec-yellow fill-current"
            viewBox="0 0 24 24"
            style={{ transform: "translateX(40px)" }}
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>
      ))}
    </div>
  );
}
