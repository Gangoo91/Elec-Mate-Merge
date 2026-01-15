import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Heart, MessageCircle, Users, Phone, Moon, BookHeart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: MessageCircle,
    title: 'Mental Health Mate',
    description: '24/7 AI companion that understands the pressures of the trade',
    color: 'text-pink-400',
    bg: 'bg-pink-500/20',
  },
  {
    icon: Users,
    title: 'Mental Health Mates',
    description: 'Real people who volunteer as listening ears when you need a craic',
    color: 'text-purple-400',
    bg: 'bg-purple-500/20',
  },
  {
    icon: Moon,
    title: 'Mood & Sleep Tracking',
    description: 'Track your wellbeing with insights and patterns',
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/20',
  },
  {
    icon: Phone,
    title: 'Crisis Resources',
    description: 'Instant access to helplines and local support',
    color: 'text-red-400',
    bg: 'bg-red-500/20',
  },
  {
    icon: BookHeart,
    title: 'Wellbeing Journal',
    description: 'Private space to reflect and process your thoughts',
    color: 'text-teal-400',
    bg: 'bg-teal-500/20',
  },
];

export const MentalHealthPreview = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="w-full py-16 sm:py-24 bg-gradient-to-b from-black to-neutral-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/20 border border-pink-500/30 mb-4">
            <Heart className="w-4 h-4 text-pink-400" />
            <span className="text-sm font-medium text-pink-400">Mental Health Hub</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Your Wellbeing{' '}
            <span className="text-pink-400">Matters</span>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            The electrical trade can be tough. Our Mental Health Hub gives you the tools,
            support, and community to look after yourself - because you can't pour from an empty cup.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-pink-500/30 active:border-pink-500/30 transition-colors touch-manipulation"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + index * 0.08 }}
            >
              <div className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-4`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
              <p className="text-sm text-white/60">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Stats bar */}
        <motion.div
          className="flex flex-wrap justify-center gap-6 sm:gap-10 mb-10 py-6 px-4 rounded-2xl bg-white/5 border border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
        >
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-pink-400">24/7</div>
            <div className="text-xs sm:text-sm text-white/60">AI Support</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-purple-400">100%</div>
            <div className="text-xs sm:text-sm text-white/60">Confidential</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-indigo-400">Free</div>
            <div className="text-xs sm:text-sm text-white/60">For All Users</div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
        >
          <Link to="/auth/signup">
            <Button
              size="lg"
              className="h-14 px-8 bg-pink-500 hover:bg-pink-400 text-white font-semibold touch-manipulation"
            >
              Access Mental Health Hub
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
