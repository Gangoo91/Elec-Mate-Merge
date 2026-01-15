import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { BookOpen, CheckCircle, ArrowRight, Brain, Target, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const topics = [
  { name: 'Apprentice Level 2 & 3', questions: 2100, mastery: 78 },
  { name: '18th Edition BS7671', questions: 1850, mastery: 65 },
  { name: 'AM2 Exam Preparation', questions: 890, mastery: 82 },
  { name: 'Solar PV & Battery Storage', questions: 520, mastery: 71 },
  { name: 'EV Charging Installation', questions: 480, mastery: 88 },
  { name: 'Inspection & Testing', questions: 960, mastery: 59 },
];

const features = [
  {
    icon: Brain,
    title: 'Adaptive Learning',
    description: 'AI adjusts difficulty based on your performance',
  },
  {
    icon: Target,
    title: 'Focused Practice',
    description: 'Target weak areas with smart question selection',
  },
  {
    icon: Trophy,
    title: 'Track Progress',
    description: 'Visual progress tracking and achievements',
  },
];

export const StudyCentrePreview = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="w-full py-16 sm:py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-500/30 mb-4">
            <BookOpen className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-400">Study Centre</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Learn, Train & Upskill
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            6,800+ practice questions across apprentice courses, 18th Edition, AM2 prep, and specialist upskilling modules.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left: Topic cards */}
          <motion.div
            className="space-y-3"
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {topics.map((topic) => (
              <div
                key={topic.name}
                className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/30 active:border-blue-500/30 transition-colors touch-manipulation"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-white text-sm">{topic.name}</h4>
                  <span className="text-xs text-white/60">{topic.questions} questions</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${topic.mastery}%` } : {}}
                      transition={{ duration: 0.8, delay: 0.3 }}
                    />
                  </div>
                  <span className="text-xs font-medium text-blue-400 w-10">{topic.mastery}%</span>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Right: Features + CTA */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/20">
              <h3 className="text-xl font-semibold text-white mb-6">Why Study With Us</h3>
              <div className="space-y-4">
                {features.map((feature) => (
                  <div
                    key={feature.title}
                    className="flex items-start gap-4"
                  >
                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">{feature.title}</h4>
                      <p className="text-sm text-white/60">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-green-500/10 border border-green-500/20">
              <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
              <p className="text-sm text-white/80">
                <span className="font-semibold text-green-400">93% pass rate</span> for users who complete our practice tests
              </p>
            </div>

            <Link to="/auth/signup" className="block">
              <Button
                size="lg"
                className="w-full h-14 bg-blue-500 hover:bg-blue-400 text-white font-semibold touch-manipulation"
              >
                Start Learning Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
