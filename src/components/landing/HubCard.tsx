import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface HubCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  features: string[];
  href: string;
  gradient: string;
  iconColor: string;
  delay?: number;
  comingSoon?: boolean;
}

export const HubCard = ({
  title,
  description,
  icon: Icon,
  features,
  href,
  gradient,
  iconColor,
  delay = 0,
  comingSoon = false,
}: HubCardProps) => {
  const CardWrapper = comingSoon ? 'div' : Link;
  const cardProps = comingSoon ? {} : { to: href };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay, type: 'spring', stiffness: 100 }}
    >
      <CardWrapper {...cardProps} className={`block group touch-manipulation ${comingSoon ? 'cursor-default' : ''}`}>
        <motion.div
          className={`relative overflow-hidden rounded-2xl p-6 sm:p-8 ${gradient} border border-white/10 h-full`}
          whileHover={comingSoon ? {} : { scale: 1.02 }}
          whileTap={comingSoon ? {} : { scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
          {/* Coming Soon Banner */}
          {comingSoon && (
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-purple-500 text-white text-xs font-semibold">
              Coming Soon
            </div>
          )}

          {/* Icon */}
          <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${iconColor} bg-white/10 mb-4`}>
            <Icon className="w-6 h-6" />
          </div>

          {/* Title */}
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{title}</h3>

          {/* Description */}
          <p className="text-white mb-4 text-sm sm:text-base leading-relaxed">{description}</p>

          {/* Features */}
          <div className="flex flex-wrap gap-2 mb-4">
            {features.map((feature) => (
              <span
                key={feature}
                className="px-3 py-1 rounded-full bg-white/10 text-white text-xs font-medium"
              >
                {feature}
              </span>
            ))}
          </div>

          {/* Arrow indicator */}
          {comingSoon ? (
            <div className="h-5" />
          ) : (
            <div className="flex items-center text-white/80 group-hover:text-white group-active:text-white transition-colors">
              <span className="text-sm font-medium">Explore</span>
              <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 group-active:translate-x-1 transition-transform" />
            </div>
          )}

          {/* Hover/tap glow effect */}
          {!comingSoon && (
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
            </div>
          )}
        </motion.div>
      </CardWrapper>
    </motion.div>
  );
};
