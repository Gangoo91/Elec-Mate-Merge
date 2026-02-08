import { useNavigate, Link } from "react-router-dom";
import { GraduationCap, Zap, BookOpen, Award, Clock, Target, TrendingUp, Play, ChevronRight, Flame, Star, Sparkles, ArrowLeft, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useStudyStreak } from "@/hooks/useStudyStreak";
import { useQuizResults } from "@/hooks/useQuizResults";
import { useAuth } from "@/contexts/AuthContext";
import useSEO from "@/hooks/useSEO";

export default function StudyCentreIndex() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const studyStreakData = useStudyStreak();
  const quizData = useQuizResults();

  // SEO for study centre - high priority for Google ranking
  useSEO({
    title: 'Study Centre | Electrical Training & CPD Courses',
    description: 'Comprehensive electrical training for apprentices and qualified electricians. Level 2 & 3 courses, 18th Edition BS 7671, inspection & testing, EV charging, solar PV, and 2,000+ practice questions.',
    schema: {
      '@type': 'CollectionPage',
      name: 'Elec-Mate Study Centre',
      description: 'Educational hub for UK electrical professionals - apprenticeship training and CPD courses',
      provider: {
        '@type': 'Organization',
        name: 'Elec-Mate',
      },
    },
  });

  const currentStreak = studyStreakData?.streak?.currentStreak || 0;
  const quizResults = quizData?.quizResults || [];
  const totalQuizzesTaken = quizResults?.length || 0;
  const averageScore = quizResults?.length > 0
    ? Math.round(quizResults.reduce((acc: number, r: any) => acc + (r.score || 0), 0) / quizResults.length)
    : 0;

  return (
    <div className="pb-24 momentum-scroll-y">
      {/* Back Button */}
      <div className="px-4 pt-4">
        <Link to="/dashboard">
          <Button
            variant="ghost"
            className="text-white/70 hover:text-white hover:bg-white/[0.05] active:bg-white/[0.08] active:scale-[0.98] -ml-2 h-11 touch-manipulation transition-all"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Dashboard
          </Button>
        </Link>
      </div>

      {/* Premium Hero Section */}
      <div className="relative overflow-hidden">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-elec-dark via-neutral-900 to-elec-dark" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-elec-yellow/10 via-transparent to-transparent" />

        {/* Floating orbs */}
        <motion.div
          className="absolute top-10 right-10 w-32 h-32 rounded-full bg-elec-yellow/5 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 left-10 w-24 h-24 rounded-full bg-amber-500/10 blur-2xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        />

        <div className="relative px-4 pt-8 pb-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            {/* Icon with glow */}
            <div className="relative inline-flex mb-4">
              <div className="absolute inset-0 bg-elec-yellow/30 rounded-2xl blur-xl animate-pulse" />
              <div className="relative p-4 rounded-2xl bg-gradient-to-br from-elec-yellow via-amber-400 to-orange-500 shadow-2xl shadow-elec-yellow/25">
                <BookOpen className="h-8 w-8 text-elec-dark" />
              </div>
            </div>

            <h1 className="text-3xl font-bold mb-2">
              <span className="bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
                Study Centre
              </span>
            </h1>
            <p className="text-sm text-white/50 max-w-[280px] mx-auto">
              Master electrical knowledge with industry-leading courses
            </p>
          </motion.div>

          {/* Premium Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-6 grid grid-cols-4 gap-2 touch-grid"
          >
            {[
              { value: "36", label: "Courses", icon: BookOpen, color: "from-blue-500 to-cyan-400" },
              { value: totalQuizzesTaken || "0", label: "Quizzes", icon: Target, color: "from-purple-500 to-pink-400" },
              { value: averageScore > 0 ? `${averageScore}%` : "—", label: "Score", icon: Award, color: "from-emerald-500 to-teal-400" },
              { value: currentStreak || "0", label: "Streak", icon: Flame, color: "from-orange-500 to-red-400" },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + idx * 0.05 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity rounded-xl blur-lg"
                  style={{ backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }}
                />
                <div className="relative flex flex-col items-center p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all">
                  <div className={cn("p-1.5 rounded-lg bg-gradient-to-br mb-1.5", stat.color)}>
                    <stat.icon className="h-3.5 w-3.5 text-white" />
                  </div>
                  <span className="text-lg font-bold text-white">{stat.value}</span>
                  <span className="text-[10px] text-white/50 uppercase tracking-wider font-medium">{stat.label}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Course Cards Section */}
      <div className="px-4 -mt-2 space-y-4">
        {/* Apprentice Training Card - Premium Dark Theme */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          onClick={() => navigate("/study-centre/apprentice")}
          className="group relative overflow-hidden rounded-2xl cursor-pointer active:scale-[0.98] transition-all duration-300 touch-manipulation min-h-[200px]"
        >
          {/* Multi-layer background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-neutral-900" />
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 via-transparent to-purple-600/10" />

          {/* Animated mesh gradient */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-500/40 to-transparent rounded-full blur-2xl transform translate-x-10 -translate-y-10 group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-500/30 to-transparent rounded-full blur-2xl transform -translate-x-5 translate-y-5 group-hover:scale-110 transition-transform duration-500" />
          </div>

          {/* Accent border glow */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />

          <div className="relative p-5">
            {/* Header Row */}
            <div className="flex items-start justify-between mb-4">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 backdrop-blur-sm">
                <GraduationCap className="h-6 w-6 text-blue-400" />
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/10 text-white/80 border border-white/10 backdrop-blur-sm">
                  8 Courses
                </span>
              </div>
            </div>

            {/* Title & Description */}
            <h3 className="text-xl font-bold text-white mb-1.5 group-hover:text-blue-100 transition-colors">
              Apprentice Training
            </h3>
            <p className="text-sm text-white/50 mb-4 leading-relaxed">
              Level 2 & 3 qualifications, AM2 preparation, and essential fundamentals
            </p>

            {/* Feature Tags */}
            <div className="flex flex-wrap gap-1.5 mb-5">
              {[
                { label: "Level 2", color: "from-blue-500/20 to-blue-600/20 border-blue-500/30 text-blue-300" },
                { label: "Level 3", color: "from-purple-500/20 to-purple-600/20 border-purple-500/30 text-purple-300" },
                { label: "AM2", color: "from-cyan-500/20 to-cyan-600/20 border-cyan-500/30 text-cyan-300" },
                { label: "Mock Exams", color: "from-indigo-500/20 to-indigo-600/20 border-indigo-500/30 text-indigo-300" },
              ].map((tag) => (
                <span
                  key={tag.label}
                  className={cn(
                    "px-2.5 py-1 text-[10px] font-semibold rounded-full bg-gradient-to-r border",
                    tag.color
                  )}
                >
                  {tag.label}
                </span>
              ))}
            </div>

            {/* CTA Row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-blue-500/20">
                  <Play className="h-3.5 w-3.5 text-blue-400 fill-blue-400" />
                </div>
                <span className="text-sm font-semibold text-white/80">Start Learning</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center group-hover:from-blue-500 group-hover:to-purple-500 group-hover:border-transparent group-hover:scale-110 transition-all duration-300 shadow-lg shadow-black/20">
                <ChevronRight className="h-5 w-5 text-white/60 group-hover:text-white transition-colors" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Professional Upskilling Card - Premium Gold/Yellow Theme */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          onClick={() => navigate("/study-centre/upskilling")}
          className="group relative overflow-hidden rounded-2xl cursor-pointer active:scale-[0.98] transition-all duration-300 touch-manipulation min-h-[200px]"
        >
          {/* Multi-layer background */}
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900" />
          <div className="absolute inset-0 bg-gradient-to-tr from-elec-yellow/15 via-transparent to-amber-500/10" />

          {/* Animated mesh gradient */}
          <div className="absolute inset-0 opacity-40">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-elec-yellow/30 to-transparent rounded-full blur-2xl transform translate-x-10 -translate-y-10 group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-amber-500/20 to-transparent rounded-full blur-2xl transform -translate-x-5 translate-y-5 group-hover:scale-110 transition-transform duration-500" />
          </div>

          {/* Accent border glow */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-elec-yellow/60 to-transparent" />

          <div className="relative p-5">
            {/* Header Row */}
            <div className="flex items-start justify-between mb-4">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-amber-500/20 border border-elec-yellow/20 backdrop-blur-sm">
                <Zap className="h-6 w-6 text-elec-yellow" />
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-elec-yellow/10 border border-elec-yellow/20">
                  <Star className="h-3 w-3 text-elec-yellow fill-elec-yellow" />
                  <span className="text-[10px] font-bold text-elec-yellow">PRO</span>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-elec-yellow/10 text-elec-yellow border border-elec-yellow/20 backdrop-blur-sm">
                  14 Courses
                </span>
              </div>
            </div>

            {/* Title & Description */}
            <h3 className="text-xl font-bold text-white mb-1.5 group-hover:text-elec-yellow/90 transition-colors">
              Professional Upskilling
            </h3>
            <p className="text-sm text-white/50 mb-4 leading-relaxed">
              BS7671, EV charging, solar PV, smart home technology, and specialist courses
            </p>

            {/* Feature Tags */}
            <div className="flex flex-wrap gap-1.5 mb-5">
              {[
                { label: "BS7671", color: "from-elec-yellow/20 to-amber-500/20 border-elec-yellow/30 text-elec-yellow" },
                { label: "EV Charging", color: "from-green-500/20 to-emerald-500/20 border-green-500/30 text-green-400" },
                { label: "Solar PV", color: "from-orange-500/20 to-amber-500/20 border-orange-500/30 text-orange-400" },
                { label: "Smart Home", color: "from-cyan-500/20 to-blue-500/20 border-cyan-500/30 text-cyan-400" },
              ].map((tag) => (
                <span
                  key={tag.label}
                  className={cn(
                    "px-2.5 py-1 text-[10px] font-semibold rounded-full bg-gradient-to-r border",
                    tag.color
                  )}
                >
                  {tag.label}
                </span>
              ))}
            </div>

            {/* CTA Row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-elec-yellow/20">
                  <Play className="h-3.5 w-3.5 text-elec-yellow fill-elec-yellow" />
                </div>
                <span className="text-sm font-semibold text-white/80">Start Learning</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-amber-500/20 border border-elec-yellow/20 flex items-center justify-center group-hover:from-elec-yellow group-hover:to-amber-500 group-hover:border-transparent group-hover:scale-110 transition-all duration-300 shadow-lg shadow-black/20">
                <ChevronRight className="h-5 w-5 text-elec-yellow/60 group-hover:text-elec-dark transition-colors" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* General Upskilling Card - Emerald/Green Theme */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          onClick={() => navigate("/study-centre/general-upskilling")}
          className="group relative overflow-hidden rounded-2xl cursor-pointer active:scale-[0.98] transition-all duration-300 touch-manipulation min-h-[200px]"
        >
          {/* Multi-layer background */}
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900" />
          <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/15 via-transparent to-green-500/10" />

          {/* Animated mesh gradient */}
          <div className="absolute inset-0 opacity-40">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-emerald-500/30 to-transparent rounded-full blur-2xl transform translate-x-10 -translate-y-10 group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-green-500/20 to-transparent rounded-full blur-2xl transform -translate-x-5 translate-y-5 group-hover:scale-110 transition-transform duration-500" />
          </div>

          {/* Accent border glow */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent" />

          <div className="relative p-5">
            {/* Header Row */}
            <div className="flex items-start justify-between mb-4">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-emerald-500/20 to-green-500/20 border border-emerald-500/20 backdrop-blur-sm">
                <Shield className="h-6 w-6 text-emerald-400" />
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 backdrop-blur-sm">
                  14 Courses
                </span>
              </div>
            </div>

            {/* Title & Description */}
            <h3 className="text-xl font-bold text-white mb-1.5 group-hover:text-emerald-300 transition-colors">
              General Upskilling
            </h3>
            <p className="text-sm text-white/50 mb-4 leading-relaxed">
              Cross-industry safety training — IPAF, first aid, working at height, and essential site skills
            </p>

            {/* Feature Tags */}
            <div className="flex flex-wrap gap-1.5 mb-5">
              {[
                { label: "IPAF Scaffold", color: "from-emerald-500/20 to-green-500/20 border-emerald-500/30 text-emerald-400" },
                { label: "First Aid", color: "from-red-500/20 to-rose-500/20 border-red-500/30 text-red-400" },
                { label: "COSHH", color: "from-orange-500/20 to-amber-500/20 border-orange-500/30 text-orange-400" },
                { label: "Fire Safety", color: "from-yellow-500/20 to-amber-500/20 border-yellow-500/30 text-yellow-400" },
              ].map((tag) => (
                <span
                  key={tag.label}
                  className={cn(
                    "px-2.5 py-1 text-[10px] font-semibold rounded-full bg-gradient-to-r border",
                    tag.color
                  )}
                >
                  {tag.label}
                </span>
              ))}
            </div>

            {/* CTA Row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-emerald-500/20">
                  <Play className="h-3.5 w-3.5 text-emerald-400 fill-emerald-400" />
                </div>
                <span className="text-sm font-semibold text-white/80">Start Learning</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-green-500/20 border border-emerald-500/20 flex items-center justify-center group-hover:from-emerald-500 group-hover:to-green-500 group-hover:border-transparent group-hover:scale-110 transition-all duration-300 shadow-lg shadow-black/20">
                <ChevronRight className="h-5 w-5 text-emerald-400/60 group-hover:text-white transition-colors" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Streak Banner - Only show when logged in with streak */}
      {user && currentStreak > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="mx-4 mt-4"
        >
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-elec-yellow/10 border border-orange-500/20 p-4">
            {/* Animated fire glow */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 w-16 h-16 bg-orange-500/20 rounded-full blur-2xl animate-pulse" />

            <div className="relative flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 shadow-lg shadow-orange-500/25">
                <Flame className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-base font-bold text-white">
                    {currentStreak} Day Streak!
                  </p>
                  <Sparkles className="h-4 w-4 text-elec-yellow animate-pulse" />
                </div>
                <p className="text-xs text-white/50">
                  Keep learning daily to maintain your streak
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Quick Tips Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="px-4 mt-6"
      >
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="h-4 w-4 text-elec-yellow" />
          <span className="text-xs font-semibold text-white/60 uppercase tracking-wider">Quick Tip</span>
        </div>
        <div className="p-3 rounded-xl bg-white/5 border border-white/10">
          <p className="text-xs text-white/50 leading-relaxed">
            Complete at least one quiz daily to build your streak and reinforce your learning. Consistency beats intensity!
          </p>
        </div>
      </motion.div>
    </div>
  );
}
