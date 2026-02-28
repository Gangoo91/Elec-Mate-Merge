import { Brain, ArrowLeft, ArrowRight, Camera, FileText, Lightbulb } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toolOptions } from '@/components/electrician-tools/ai-tools/constants';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, ease: 'easeOut' },
  },
};

const toolColors: Record<string, string> = {
  'component-identify': 'from-blue-400 to-blue-500',
  'wiring-instruction': 'from-emerald-400 to-green-500',
  'fault-diagnosis': 'from-orange-400 to-red-500',
  'installation-verify': 'from-cyan-400 to-teal-500',
  explainer: 'from-pink-400 to-rose-500',
};

const visualTools = toolOptions.filter((t) => t.category === 'visual');
const textTools = toolOptions.filter((t) => t.category === 'text');

const AITooling = () => {
  const navigate = useNavigate();

  return (
    <div className="-mt-3 sm:-mt-4 md:-mt-6 bg-background pb-24">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/10">
        <div className="px-4 py-2">
          <button
            onClick={() => navigate('/electrician')}
            className="flex items-center gap-2 text-white active:opacity-70 active:scale-[0.98] transition-all touch-manipulation h-11 -ml-2 px-2 rounded-lg"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm font-medium">Electrician Hub</span>
          </button>
        </div>
      </div>

      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="px-4 py-4 space-y-5"
      >
        {/* Hero Header */}
        <motion.div variants={itemVariants} className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
            <Brain className="h-6 w-6 text-purple-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">AI Tooling Suite</h1>
            <p className="text-sm text-white">Smart analysis tools for UK electricians</p>
          </div>
        </motion.div>

        {/* Pro Tip */}
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-2.5 bg-purple-500/8 border border-purple-500/15 rounded-xl px-3.5 py-2.5"
        >
          <Lightbulb className="h-4 w-4 text-purple-400 flex-shrink-0" />
          <p className="text-xs text-white">
            Photograph clearly with good lighting for best AI results
          </p>
        </motion.div>

        {/* Quick Capture Card */}
        <motion.div variants={itemVariants}>
          <Link
            to="/electrician-tools/ai-tooling/component-identify"
            className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 rounded-2xl touch-manipulation"
          >
            <div className="relative overflow-hidden bg-gradient-to-br from-blue-500/15 to-purple-500/15 border border-blue-500/20 rounded-2xl group active:scale-[0.98] transition-all">
              <div className="p-5">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg shadow-blue-500/20">
                    <Camera className="h-7 w-7 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-base font-bold text-white">Quick Capture</h2>
                    <p className="text-sm text-white mt-0.5">
                      Photograph any component for instant identification
                    </p>
                  </div>
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-active:bg-white/15 transition-colors">
                    <ArrowRight className="h-5 w-5 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Visual Analysis Section */}
        <motion.section variants={itemVariants} className="space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="h-1.5 w-1.5 rounded-full bg-blue-400" />
            <h2 className="text-base font-bold text-white">Visual Analysis</h2>
            <Badge
              variant="secondary"
              className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs"
            >
              Camera
            </Badge>
          </div>

          <motion.div variants={containerVariants} className="grid grid-cols-2 gap-2.5">
            {visualTools.map((tool) => {
              const IconComponent = tool.icon;
              const gradient = toolColors[tool.value] || 'from-gray-400 to-gray-500';

              return (
                <motion.div key={tool.value} variants={itemVariants}>
                  <Link
                    to={`/electrician-tools/ai-tooling/${tool.value}`}
                    className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50 rounded-2xl touch-manipulation"
                  >
                    <div className="relative overflow-hidden bg-white/[0.03] border border-white/[0.08] rounded-2xl group active:bg-white/[0.06] active:scale-[0.97] transition-all h-full">
                      <div className="p-3.5">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br ${gradient} mb-2.5`}
                        >
                          <IconComponent className="h-5 w-5 text-white" />
                        </div>
                        <h3 className="text-[13px] font-bold text-white leading-tight">
                          {tool.label}
                        </h3>
                        <p className="text-[11px] text-white mt-1 line-clamp-2 leading-relaxed">
                          {tool.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.section>

        {/* Text AI Section */}
        <motion.section variants={itemVariants} className="space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="h-1.5 w-1.5 rounded-full bg-pink-400" />
            <h2 className="text-base font-bold text-white">Text AI</h2>
            <Badge
              variant="secondary"
              className="bg-pink-500/20 text-pink-400 border-pink-500/30 text-xs"
            >
              <FileText className="h-3 w-3 mr-1" />
              Text
            </Badge>
          </div>

          <motion.div variants={containerVariants} className="space-y-2">
            {textTools.map((tool) => {
              const IconComponent = tool.icon;
              const gradient = toolColors[tool.value] || 'from-gray-400 to-gray-500';

              return (
                <motion.div key={tool.value} variants={itemVariants}>
                  <Link
                    to={`/electrician-tools/ai-tooling/${tool.value}`}
                    className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50 rounded-2xl touch-manipulation"
                  >
                    <div className="relative overflow-hidden bg-white/[0.03] border border-white/[0.08] rounded-2xl group active:bg-white/[0.06] active:scale-[0.98] transition-all">
                      <div className="p-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${gradient}`}
                          >
                            <IconComponent className="h-6 w-6 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-[15px] font-bold text-white">{tool.label}</h3>
                            <p className="text-[13px] text-white line-clamp-1">
                              {tool.description}
                            </p>
                          </div>
                          <div className="flex-shrink-0 w-9 h-9 rounded-full bg-white/[0.08] flex items-center justify-center group-active:bg-white/[0.12] transition-colors">
                            <ArrowRight className="h-4 w-4 text-white" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.section>
      </motion.main>
    </div>
  );
};

export default AITooling;
