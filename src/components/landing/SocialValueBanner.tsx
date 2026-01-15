import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Heart, GraduationCap, HandHeart } from 'lucide-react';

export const SocialValueBanner = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section ref={ref} className="w-full py-12 sm:py-16 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-pink-500/10 border-y border-pink-500/20">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/20 border border-pink-500/30 mb-6">
            <HandHeart className="w-4 h-4 text-pink-400" />
            <span className="text-sm font-medium text-pink-400">Our Social Value Commitment</span>
          </div>

          {/* Main heading */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            <span className="text-pink-400">£1</span> from every mobile app subscription
            <br className="sm:hidden" /> going back to the trade
          </h2>

          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">
            From month 6, we're committing £1 from every mobile app subscription to support
            mental health charities and help self-funded adult learners and apprentices pass their exams.
          </p>

          {/* Two pillars */}
          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <motion.div
              className="p-6 rounded-2xl bg-white/5 border border-white/10"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              <div className="w-14 h-14 rounded-xl bg-pink-500/20 flex items-center justify-center mx-auto mb-4">
                <Heart className="w-7 h-7 text-pink-400" />
              </div>
              <h3 className="font-semibold text-white text-lg mb-2">Mental Health Charities</h3>
              <p className="text-sm text-white/60">
                Supporting Andy's Man Club, Mates in Mind, Electrical Industries Charity,
                and Lighthouse Construction Industry Charity.
              </p>
            </motion.div>

            <motion.div
              className="p-6 rounded-2xl bg-white/5 border border-white/10"
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 }}
            >
              <div className="w-14 h-14 rounded-xl bg-purple-500/20 flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-7 h-7 text-purple-400" />
              </div>
              <h3 className="font-semibold text-white text-lg mb-2">Learner Support Fund</h3>
              <p className="text-sm text-white/60">
                Helping self-funded adult learners and apprentices who are struggling to afford exam fees or resits.
                Everyone deserves a fair chance to qualify.
              </p>
            </motion.div>
          </div>

          {/* Footer note */}
          <motion.p
            className="mt-8 text-sm text-white/50"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
          >
            Your subscription won't just help you - it'll help the whole trade.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};
