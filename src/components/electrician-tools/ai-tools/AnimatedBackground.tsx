import { motion } from 'framer-motion';

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Animated gradient mesh */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            'radial-gradient(circle at 0% 0%, hsl(var(--primary)) 0%, transparent 50%), radial-gradient(circle at 100% 100%, hsl(var(--elec-blue)) 0%, transparent 50%)',
            'radial-gradient(circle at 100% 0%, hsl(var(--elec-blue)) 0%, transparent 50%), radial-gradient(circle at 0% 100%, hsl(var(--primary)) 0%, transparent 50%)',
            'radial-gradient(circle at 0% 0%, hsl(var(--primary)) 0%, transparent 50%), radial-gradient(circle at 100% 100%, hsl(var(--elec-blue)) 0%, transparent 50%)',
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Circuit pattern overlay */}
      <svg
        className="absolute inset-0 w-full h-full opacity-5"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="circuit"
            x="0"
            y="0"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="10" cy="10" r="2" fill="currentColor" className="text-elec-yellow" />
            <circle cx="90" cy="90" r="2" fill="currentColor" className="text-elec-yellow" />
            <line x1="10" y1="10" x2="90" y2="10" stroke="currentColor" strokeWidth="0.5" className="text-elec-yellow/50" />
            <line x1="10" y1="10" x2="10" y2="90" stroke="currentColor" strokeWidth="0.5" className="text-elec-yellow/50" />
            <line x1="90" y1="10" x2="90" y2="90" stroke="currentColor" strokeWidth="0.5" className="text-elec-yellow/50" />
            <line x1="10" y1="90" x2="90" y2="90" stroke="currentColor" strokeWidth="0.5" className="text-elec-yellow/50" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circuit)" />
      </svg>
    </div>
  );
}
