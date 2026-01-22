import { Brain, ArrowLeft, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toolOptions } from "@/components/electrician-tools/ai-tools/constants";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.03, delayChildren: 0 },
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

// Color assignments for each tool
const toolColors: Record<string, string> = {
  'component-identify': 'from-blue-400 to-blue-500',
  'wiring-instruction': 'from-emerald-400 to-green-500',
  'fault-diagnosis': 'from-orange-400 to-red-500',
  'installation-verify': 'from-cyan-400 to-teal-500',
  'explainer': 'from-pink-400 to-rose-500',
};

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
        className="px-4 py-4 space-y-6"
      >
        {/* Hero Header */}
        <motion.div variants={itemVariants} className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
            <Brain className="h-6 w-6 text-purple-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">AI Tooling Suite</h1>
            <p className="text-sm text-white/70">Smart analysis tools for UK electricians</p>
          </div>
        </motion.div>

        {/* Tools List */}
        <motion.section variants={itemVariants} className="space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="h-1.5 w-1.5 rounded-full bg-purple-400" />
            <h2 className="text-base font-bold text-white">Available Tools</h2>
            <Badge variant="secondary" className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs">
              {toolOptions.length} Active
            </Badge>
          </div>

          <motion.div variants={containerVariants} className="space-y-2">
            {toolOptions.map((tool) => {
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
                          {/* Icon with gradient background */}
                          <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${gradient}`}>
                            <IconComponent className="h-6 w-6 text-white" />
                          </div>

                          <div className="flex-1 min-w-0">
                            {/* Title */}
                            <h3 className="text-[15px] font-bold text-white">
                              {tool.label}
                            </h3>
                            {/* Description */}
                            <p className="text-[13px] text-white/70 line-clamp-1">
                              {tool.description}
                            </p>
                          </div>

                          {/* Arrow indicator */}
                          <div className="flex-shrink-0 w-9 h-9 rounded-full bg-white/[0.08] flex items-center justify-center group-active:bg-white/[0.12] transition-colors">
                            <ArrowRight className="h-4 w-4 text-white/70" />
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
