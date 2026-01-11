import { motion } from 'framer-motion';
import { TrendingUp, Percent, Shield, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

interface QuoteHeroCardProps {
  recommendedQuote: number;
  profit: number;
  margin: number;
  confidence: number;
}

export function QuoteHeroCard({
  recommendedQuote,
  profit,
  margin,
  confidence
}: QuoteHeroCardProps) {
  const [showConfetti, setShowConfetti] = useState(false);
  const [animatedQuote, setAnimatedQuote] = useState(0);

  // Animate quote number counting up
  useEffect(() => {
    setShowConfetti(true);
    const duration = 1500;
    const steps = 60;
    const increment = recommendedQuote / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= recommendedQuote) {
        setAnimatedQuote(recommendedQuote);
        clearInterval(timer);
      } else {
        setAnimatedQuote(Math.round(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [recommendedQuote]);

  // Confetti particles
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 0.5,
    duration: 1 + Math.random() * 0.5,
    color: ['#fbbf24', '#f59e0b', '#10b981', '#3b82f6'][Math.floor(Math.random() * 4)]
  }));

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-elec-yellow/20 via-amber-500/10 to-orange-500/10 border border-elec-yellow/30 p-6"
    >
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute -top-10 -right-10 w-40 h-40 bg-elec-yellow/30 rounded-full blur-3xl"
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-10 -left-10 w-32 h-32 bg-amber-500/20 rounded-full blur-2xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />

      {/* Confetti animation */}
      {showConfetti && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-2 h-2 rounded-full"
              style={{
                left: `${particle.x}%`,
                backgroundColor: particle.color,
              }}
              initial={{ y: -20, opacity: 1, scale: 1 }}
              animate={{
                y: 300,
                opacity: 0,
                scale: 0.5,
                rotate: 360
              }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                ease: "easeOut"
              }}
            />
          ))}
        </div>
      )}

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center gap-2 mb-4"
        >
          <Sparkles className="h-4 w-4 text-elec-yellow" />
          <span className="text-white/60 text-sm font-medium uppercase tracking-wider">
            Recommended Quote
          </span>
          <Sparkles className="h-4 w-4 text-elec-yellow" />
        </motion.div>

        {/* Main quote price */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
          className="text-center mb-6"
        >
          <div className="inline-flex items-baseline">
            <span className="text-2xl font-bold text-elec-yellow">£</span>
            <motion.span
              key={animatedQuote}
              className="text-5xl sm:text-6xl font-bold text-elec-yellow tabular-nums"
            >
              {animatedQuote.toLocaleString()}
            </motion.span>
          </div>
        </motion.div>

        {/* Metrics row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-3 gap-4"
        >
          {/* Profit */}
          <div className="text-center p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
            <div className="flex items-center justify-center gap-1 mb-1">
              <TrendingUp className="h-4 w-4 text-emerald-400" />
            </div>
            <p className="text-emerald-400 font-bold text-lg">
              £{profit.toLocaleString()}
            </p>
            <p className="text-white/40 text-xs">Profit</p>
          </div>

          {/* Margin */}
          <div className="text-center p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Percent className="h-4 w-4 text-cyan-400" />
            </div>
            <p className="text-cyan-400 font-bold text-lg">
              {margin.toFixed(1)}%
            </p>
            <p className="text-white/40 text-xs">Margin</p>
          </div>

          {/* Confidence */}
          <div className="text-center p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Shield className="h-4 w-4 text-amber-400" />
            </div>
            <p className="text-amber-400 font-bold text-lg">
              {confidence}%
            </p>
            <p className="text-white/40 text-xs">Confidence</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
