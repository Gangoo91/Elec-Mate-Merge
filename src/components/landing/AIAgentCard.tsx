import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface AIAgentCardProps {
  name: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  iconBg: string;
  delay?: number;
}

export const AIAgentCard = ({
  name,
  description,
  icon: Icon,
  gradient,
  iconBg,
  delay = 0,
}: AIAgentCardProps) => {
  return (
    <motion.div
      className={`flex-shrink-0 w-[280px] sm:w-auto rounded-2xl p-5 ${gradient} border border-white/10 touch-manipulation`}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ delay, type: 'spring', stiffness: 100 }}
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${iconBg} mb-3`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h4 className="text-lg font-semibold text-white mb-1">{name}</h4>
      <p className="text-sm text-white/70 leading-relaxed">{description}</p>
    </motion.div>
  );
};
