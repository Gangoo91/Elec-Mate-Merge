import { motion } from 'framer-motion';
import { type LucideIcon } from 'lucide-react';

interface WalkthroughSlideProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  accentColour: string;
  iconBgColour: string;
}

const WalkthroughSlide = ({
  icon: Icon,
  title,
  description,
  features,
  accentColour,
  iconBgColour,
}: WalkthroughSlideProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col items-center text-center px-6"
    >
      <div
        className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 border border-white/10"
        style={{ backgroundColor: iconBgColour }}
      >
        <Icon className="h-10 w-10" style={{ color: accentColour }} />
      </div>

      <h2 className="text-2xl font-bold text-white mb-3 leading-tight">{title}</h2>

      <p className="text-white/60 text-base mb-8 max-w-sm leading-relaxed">{description}</p>

      <div className="space-y-3 w-full max-w-xs">
        {features.map((feature) => (
          <div key={feature} className="flex items-center gap-3 text-left">
            <div
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: accentColour }}
            />
            <span className="text-sm text-white/80">{feature}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default WalkthroughSlide;
