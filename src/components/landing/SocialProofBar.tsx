import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Calculator, HelpCircle, BookOpen, Bot } from 'lucide-react';

interface StatItem {
  icon: React.ReactNode;
  value: number;
  suffix: string;
  label: string;
}

const stats: StatItem[] = [
  { icon: <Calculator className="w-4 h-4 sm:w-5 sm:h-5" />, value: 50, suffix: '+', label: 'Calculators' },
  { icon: <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5" />, value: 6800, suffix: '+', label: 'Questions' },
  { icon: <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />, value: 14, suffix: '', label: 'Study Topics' },
  { icon: <Bot className="w-4 h-4 sm:w-5 sm:h-5" />, value: 8, suffix: '', label: 'AI Agents' },
];

const AnimatedCounter = ({ value, suffix, isInView }: { value: number; suffix: string; isInView: boolean }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView && count === 0) {
      const duration = 1200;
      const steps = 30;
      const increment = value / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView, value, count]);

  return (
    <span className="tabular-nums">
      {count.toLocaleString()}{suffix}
    </span>
  );
};

export const SocialProofBar = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <section ref={ref} className="w-full bg-white/[0.02] border-y border-white/[0.04] py-6 sm:py-8">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <motion.div
          className="flex justify-between sm:grid sm:grid-cols-4 gap-4 sm:gap-6"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center flex-1"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <div className="flex flex-col items-center gap-1 sm:gap-2">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="text-yellow-400/80">{stat.icon}</span>
                  <span className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} isInView={isInView} />
                  </span>
                </div>
                <p className="text-[10px] sm:text-xs text-white/40 font-medium uppercase tracking-wider">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
