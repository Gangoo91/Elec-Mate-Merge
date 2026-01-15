import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Users, Wrench, HelpCircle, Bot } from 'lucide-react';

interface StatItem {
  icon: React.ReactNode;
  value: number;
  suffix: string;
  label: string;
}

const stats: StatItem[] = [
  { icon: <Wrench className="w-5 h-5" />, value: 50, suffix: '+', label: 'Calculators' },
  { icon: <HelpCircle className="w-5 h-5" />, value: 6800, suffix: '+', label: 'Questions' },
  { icon: <Users className="w-5 h-5" />, value: 14, suffix: '', label: 'Study Topics' },
  { icon: <Bot className="w-5 h-5" />, value: 8, suffix: '', label: 'AI Agents' },
];

const AnimatedCounter = ({ value, suffix, isInView }: { value: number; suffix: string; isInView: boolean }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView && count === 0) {
      const duration = 1500;
      const steps = 40;
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
    <section ref={ref} className="w-full bg-neutral-900/80 border-y border-white/5 py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-yellow-400">{stat.icon}</span>
                <span className="text-2xl sm:text-3xl font-bold text-white">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} isInView={isInView} />
                </span>
              </div>
              <p className="text-sm text-white/60">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
