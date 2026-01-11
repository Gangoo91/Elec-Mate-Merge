
import React, { useState, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import {
  BookOpen,
  Zap,
  CheckCircle,
  Target,
  AlertTriangle,
  Calculator,
  Wrench,
  Flame,
  Trophy,
  Star,
  ChevronLeft,
  ChevronRight,
  Brain,
  Shield,
  Sparkles,
} from "lucide-react";

interface Tip {
  id: string;
  category: string;
  title: string;
  content: string;
  icon: React.ElementType;
  difficulty: "Foundation" | "Developing" | "Competent" | "Expert";
  actionStep: string;
  regulation?: string;
  proTip?: string;
}

interface DayTheme {
  name: string;
  shortName: string;
  focus: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
}

const DailyAITipsTab = () => {
  const [completedTips, setCompletedTips] = useState<Set<string>>(new Set());
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const streak = 12;

  const dayThemes: Record<number, DayTheme> = {
    0: { name: "Study Sunday", shortName: "Study", focus: "Revision & Regulations", icon: BookOpen, color: "text-purple-400", bgColor: "bg-purple-500/20" },
    1: { name: "Safety Monday", shortName: "Safety", focus: "Health & Safety", icon: Shield, color: "text-red-400", bgColor: "bg-red-500/20" },
    2: { name: "Technical Tuesday", shortName: "Technical", focus: "Calculations & Theory", icon: Calculator, color: "text-blue-400", bgColor: "bg-blue-500/20" },
    3: { name: "Workshop Wednesday", shortName: "Workshop", focus: "Practical Skills", icon: Wrench, color: "text-green-400", bgColor: "bg-green-500/20" },
    4: { name: "Testing Thursday", shortName: "Testing", focus: "Inspection & Testing", icon: Zap, color: "text-yellow-400", bgColor: "bg-yellow-500/20" },
    5: { name: "Focus Friday", shortName: "Focus", focus: "Career & Portfolio", icon: Target, color: "text-cyan-400", bgColor: "bg-cyan-500/20" },
    6: { name: "Skills Saturday", shortName: "Skills", focus: "Industry Knowledge", icon: Brain, color: "text-pink-400", bgColor: "bg-pink-500/20" },
  };

  const today = new Date();
  const dayOfWeek = today.getDay();
  const currentTheme = dayThemes[dayOfWeek];

  const dailyTips = useMemo<Tip[]>(() => {
    const allTips: Record<number, Tip[]> = {
      0: [
        {
          id: "sun1",
          category: "Regulations",
          title: "BS 7671 Part 4 - Protection for Safety",
          content: "Part 4 covers protection against electric shock, thermal effects, overcurrent, voltage disturbances, and electromagnetic influences. Chapter 41 (shock protection) is heavily tested - know the difference between basic protection and fault protection.",
          icon: BookOpen,
          difficulty: "Developing",
          actionStep: "Read Chapter 41 and list the 5 methods of fault protection",
          regulation: "Part 4: Protection for Safety",
          proTip: "Create flashcards for each chapter's key requirements - they're gold dust for revision"
        },
        {
          id: "sun2",
          category: "Theory",
          title: "Understanding Impedance vs Resistance",
          content: "Resistance (R) opposes DC current. Impedance (Z) opposes AC current and includes resistance plus reactance. For most domestic work, the difference is negligible, but in larger installations with longer cable runs, inductance matters.",
          icon: Calculator,
          difficulty: "Competent",
          actionStep: "Calculate Ze + (R1+R2) for a circuit and compare with measured Zs",
          proTip: "When your calculated and measured Zs don't match, temperature correction is usually why"
        },
        {
          id: "sun3",
          category: "Exam Prep",
          title: "2391 Inspection & Testing Prep",
          content: "The 2391 requires you to understand not just HOW to test, but WHY. Know the purpose of each test, the expected results, and what faults each test identifies.",
          icon: Target,
          difficulty: "Expert",
          actionStep: "Practice completing a full EICR on a domestic installation, timing yourself",
          regulation: "GN3 - Guidance Note 3"
        }
      ],
      1: [
        {
          id: "mon1",
          category: "Safe Isolation",
          title: "The GS38 Approved Voltage Indicator",
          content: "Your voltage indicator MUST meet GS38 requirements: fused probes (max 500mA), shrouded probes with max 4mm exposed tip, finger barriers, and insulated leads. Test on known live source before AND after isolation.",
          icon: AlertTriangle,
          difficulty: "Foundation",
          actionStep: "Inspect your voltage indicator against GS38 checklist - replace if non-compliant",
          regulation: "HSE GS38",
          proTip: "Proving units are brilliant - they let you prove your tester works even when you can't find a known live source"
        },
        {
          id: "mon2",
          category: "PPE",
          title: "Selecting the Right Gloves",
          content: "For live working (which should be rare), use insulated gloves rated to the voltage you're working with. Class 00 for up to 500V AC. But here's the thing - if you need gloves, ask yourself if you should be working live at all.",
          icon: Shield,
          difficulty: "Developing",
          actionStep: "Check your PPE kit - ensure you have Class 00 gloves and they're within test date",
          regulation: "Regulation 14 EAWR"
        },
        {
          id: "mon3",
          category: "Risk Assessment",
          title: "Dynamic Risk Assessment On Site",
          content: "Your written RA is just the start. On site, constantly reassess: Has anything changed? Are there new hazards? Is the isolation still secure? Never assume - verify.",
          icon: Brain,
          difficulty: "Competent",
          actionStep: "Before each task today, spend 30 seconds identifying hazards that weren't on the original RA",
          proTip: "Take photos of isolation points - if someone questions your isolation, you've got evidence"
        }
      ],
      2: [
        {
          id: "tue1",
          category: "Cable Sizing",
          title: "The Voltage Drop Calculation Decoded",
          content: "Voltage drop = (mV/A/m × Ib × L) ÷ 1000. The mV/A/m value comes from Appendix 4. For 2.5mm² T&E it's 18mV/A/m. Keep total drop under 5% (11.5V) with max 3% (6.9V) on final circuits.",
          icon: Calculator,
          difficulty: "Developing",
          actionStep: "Calculate: 32A ring, 25m route, 2.5mm² T&E. Is it compliant?",
          regulation: "Appendix 4, Table 4Ab",
          proTip: "Always calculate for the worst case - full design current, not what you expect in practice"
        },
        {
          id: "tue2",
          category: "Design",
          title: "Applying Correction Factors",
          content: "It × Ca × Cg × Ci × Cc ≥ Ib. Thermal insulation (Ci) is the killer - cables enclosed in insulation can only carry 0.5 times their normal current. Check EVERY factor.",
          icon: Zap,
          difficulty: "Competent",
          actionStep: "Find a job with grouped cables and calculate the correct Cg factor from Table 4C1",
          regulation: "Section 523, Tables 4C1-4C6"
        },
        {
          id: "tue3",
          category: "Earth Fault Loop",
          title: "Zs Maximum Values",
          content: "For a 32A Type B MCB on a TN system, max Zs is 1.37Ω. But that's at operating temperature. If testing cold, apply 0.8 multiplier to your reading, or use 80% of table value as your limit.",
          icon: Calculator,
          difficulty: "Competent",
          actionStep: "Measure Zs on three circuits and verify against corrected table values",
          regulation: "Regulation 411.4.4, Table 41.3"
        }
      ],
      3: [
        {
          id: "wed1",
          category: "Installation",
          title: "Professional Cable Management",
          content: "Support cables every 300mm horizontally, 400mm vertically. At accessories, leave 150mm service loop. Label every cable at both ends. Your installation will be inspected for 20+ years.",
          icon: Wrench,
          difficulty: "Foundation",
          actionStep: "Check your last installation against these standards - would it pass scrutiny?",
          regulation: "Table 4A (IET OSG)",
          proTip: "Invest in a label printer. Handwritten labels fade and look amateur"
        },
        {
          id: "wed2",
          category: "Termination",
          title: "Getting SWA Right First Time",
          content: "Strip outer sheath 50mm minimum. Use proper gland - indoor or outdoor rated as needed. Earth tag under gland locknut. Torque to spec, not just 'tight'.",
          icon: Wrench,
          difficulty: "Developing",
          actionStep: "Practice SWA termination on scrap cable until you can do it cleanly in under 10 minutes",
          proTip: "Mark the sheath before cutting - measure twice, cut once applies here"
        },
        {
          id: "wed3",
          category: "Consumer Units",
          title: "The 18th Edition CU Install",
          content: "Metal consumer units are now standard (Regulation 421.1.201). All circuits need RCD protection via RCBO or split-load. Keep Type A RCBOs for circuits with electronic equipment.",
          icon: Zap,
          difficulty: "Developing",
          actionStep: "Research: When would you use a Type B RCD instead of Type A?",
          regulation: "Section 421, Amendment 2"
        }
      ],
      4: [
        {
          id: "thu1",
          category: "Initial Verification",
          title: "The Testing Sequence - And Why It Matters",
          content: "Dead tests first (continuity, IR), then live tests (Zs, RCD). This isn't arbitrary - you need to verify insulation resistance before applying voltage, and earth continuity before checking Zs.",
          icon: Zap,
          difficulty: "Foundation",
          actionStep: "Write out the full testing sequence from memory, then check against GN3",
          regulation: "GN3 - Inspection & Testing",
          proTip: "Create a laminated checklist for your toolbag - it's not cheating, it's professional"
        },
        {
          id: "thu2",
          category: "Continuity",
          title: "R1+R2 Ring Testing Demystified",
          content: "Three readings: L-L, N-N, CPC-CPC should be roughly equal. Then cross-connect and test at each socket. All readings should be virtually identical. If not, you've got a fault.",
          icon: Calculator,
          difficulty: "Developing",
          actionStep: "Draw a ring circuit diagram showing the cross-connection method - understand WHY it works",
          regulation: "GN3 Chapter 3"
        },
        {
          id: "thu3",
          category: "RCD Testing",
          title: "Full RCD Test Protocol",
          content: "Test at 50%, 100%, and 5x rated current. 30mA RCD: 15mA should NOT trip, 30mA must trip <300ms, 150mA must trip <40ms. Document all readings.",
          icon: Zap,
          difficulty: "Competent",
          actionStep: "Perform full RCD tests on three devices and record results to NICEIC format",
          regulation: "Regulation 411.4.4"
        }
      ],
      5: [
        {
          id: "fri1",
          category: "Portfolio",
          title: "Evidence That Actually Counts",
          content: "Quality over quantity. One well-documented job with before/during/after photos, sketches, and clear explanation of your decision-making beats ten quick snaps.",
          icon: Target,
          difficulty: "Foundation",
          actionStep: "Review your last portfolio entry - does it show your thought process or just the result?",
          proTip: "Record voice notes while working to capture your thinking - transcribe later"
        },
        {
          id: "fri2",
          category: "Progression",
          title: "The Path to Qualified Supervisor",
          content: "After your apprenticeship: 2391 (Inspection & Testing), 2 years experience, then consider Qualified Supervisor route. Need to demonstrate design, installation, inspection AND supervision competence.",
          icon: Trophy,
          difficulty: "Competent",
          actionStep: "Research the QS requirements for your preferred scheme (NICEIC/NAPIT/ELECSA)",
          proTip: "Start logging your supervision experience now - you'll need it later"
        },
        {
          id: "fri3",
          category: "Industry",
          title: "Specialisation vs Generalisation",
          content: "Domestic is steady but competitive. Commercial and industrial pay more but have longer travel. Specialist areas (fire alarm, data, EV charging, solar PV) can command premium rates.",
          icon: Brain,
          difficulty: "Developing",
          actionStep: "Speak to three qualified electricians in different sectors about their career paths"
        }
      ],
      6: [
        {
          id: "sat1",
          category: "Industry Trends",
          title: "Electric Vehicle Charging Installation",
          content: "EV charging is booming. Requirements: dedicated circuit, RCD Type A minimum, PME earthing considerations, max Zs 0.35Ω for TN systems. The 2919 qualification is specifically for EV installation.",
          icon: Zap,
          difficulty: "Developing",
          actionStep: "Research the differences between Mode 2, Mode 3, and Mode 4 charging",
          regulation: "IET Code of Practice for EV Charging"
        },
        {
          id: "sat2",
          category: "Technology",
          title: "Smart Home Systems Integration",
          content: "More clients want smart switches, automated lighting, and integrated systems. Understanding protocols (Zigbee, Z-Wave, WiFi), neutral requirements for smart switches, and basic networking makes you more valuable.",
          icon: Brain,
          difficulty: "Competent",
          actionStep: "Install a smart switch in your own home - understand the neutral wire requirement",
          proTip: "The electrician who can also program the system wins the job"
        },
        {
          id: "sat3",
          category: "Business",
          title: "Customer Communication Skills",
          content: "Technical skill gets you hired once. Communication gets you rehired and recommended. Explain work in terms customers understand. Under-promise, over-deliver. Leave sites clean.",
          icon: Target,
          difficulty: "Developing",
          actionStep: "Practice explaining earthing to a non-technical person using the water analogy"
        }
      ]
    };

    return allTips[dayOfWeek];
  }, [dayOfWeek]);

  const handleMarkComplete = (tipId: string) => {
    setCompletedTips(prev => {
      const newSet = new Set(prev);
      if (newSet.has(tipId)) {
        newSet.delete(tipId);
      } else {
        newSet.add(tipId);
        // Haptic feedback on complete
        if ('vibrate' in navigator) {
          navigator.vibrate(50);
        }
      }
      return newSet;
    });
  };

  const nextTip = () => {
    setDirection(1);
    setCurrentTipIndex(prev => (prev + 1) % dailyTips.length);
  };

  const prevTip = () => {
    setDirection(-1);
    setCurrentTipIndex(prev => (prev - 1 + dailyTips.length) % dailyTips.length);
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > 80) {
      prevTip();
    } else if (info.offset.x < -80) {
      nextTip();
    }
  };

  const currentTip = dailyTips[currentTipIndex];
  const progressPercentage = (completedTips.size / dailyTips.length) * 100;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Foundation": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Developing": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "Competent": return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "Expert": return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      default: return "bg-white/10 text-white border-white/20";
    }
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0
    })
  };

  return (
    <div className="flex flex-col h-[calc(100dvh-280px)] sm:h-[600px]">
      {/* Compact Header */}
      <div className="flex items-center justify-between px-1 py-2 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded-lg ${currentTheme.bgColor}`}>
            <currentTheme.icon className={`h-4 w-4 ${currentTheme.color}`} />
          </div>
          <div>
            <span className={`font-medium text-sm ${currentTheme.color}`}>{currentTheme.shortName}</span>
            <span className="text-white/50 text-xs ml-2">{currentTheme.focus}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Flame className="h-4 w-4 text-orange-400" />
            <span className="text-sm font-medium">{streak}</span>
          </div>
          {/* Progress Ring */}
          <div className="relative w-8 h-8">
            <svg className="w-8 h-8 transform -rotate-90">
              <circle
                cx="16"
                cy="16"
                r="12"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                className="text-white/10"
              />
              <circle
                cx="16"
                cy="16"
                r="12"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                strokeDasharray={75.4}
                strokeDashoffset={75.4 - (75.4 * progressPercentage) / 100}
                className="text-elec-yellow transition-all duration-300"
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-xs font-medium">
              {completedTips.size}/{dailyTips.length}
            </span>
          </div>
        </div>
      </div>

      {/* Swipeable Tip Area */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentTipIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            className="absolute inset-0 p-4 touch-pan-y"
          >
            <div className="h-full flex flex-col bg-gradient-to-br from-white/5 to-white/0 rounded-2xl p-4 sm:p-5 border border-white/10">
              {/* Badges */}
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="outline" className={currentTheme.color + " border-current/30"}>
                  {currentTip.category}
                </Badge>
                <Badge variant="outline" className={getDifficultyColor(currentTip.difficulty)}>
                  {currentTip.difficulty}
                </Badge>
              </div>

              {/* Title */}
              <h2 className="text-lg sm:text-xl font-bold mb-3 flex items-center gap-2">
                <currentTip.icon className={`h-5 w-5 ${currentTheme.color} shrink-0`} />
                {currentTip.title}
              </h2>

              {/* Content */}
              <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-4 flex-1 overflow-y-auto">
                {currentTip.content}
              </p>

              {/* Regulation Reference */}
              {currentTip.regulation && (
                <div className="flex items-center gap-2 text-xs mb-3 text-orange-400">
                  <BookOpen className="h-3.5 w-3.5" />
                  <span>{currentTip.regulation}</span>
                </div>
              )}

              {/* Pro Tip */}
              {currentTip.proTip && (
                <div className="bg-elec-yellow/10 border border-elec-yellow/20 rounded-xl p-3 mb-4">
                  <div className="flex items-start gap-2">
                    <Sparkles className="h-4 w-4 text-elec-yellow shrink-0 mt-0.5" />
                    <p className="text-sm text-white/80">{currentTip.proTip}</p>
                  </div>
                </div>
              )}

              {/* Action Step */}
              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-3">
                <div className="flex items-start gap-2 mb-2">
                  <Target className="h-4 w-4 text-green-400 shrink-0 mt-0.5" />
                  <p className="text-sm text-white/80 flex-1">{currentTip.actionStep}</p>
                </div>
                <Button
                  size="sm"
                  onClick={() => handleMarkComplete(currentTip.id)}
                  className={`w-full h-10 touch-manipulation active:scale-95 transition-all ${
                    completedTips.has(currentTip.id)
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : "bg-white/10 hover:bg-green-500/20 border border-green-500/30"
                  }`}
                >
                  {completedTips.has(currentTip.id) ? (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Done!
                    </>
                  ) : (
                    <>
                      <Star className="h-4 w-4 mr-2" />
                      Mark Complete
                    </>
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows - Desktop */}
        <button
          onClick={prevTip}
          className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={nextTip}
          className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Bottom Dot Navigation */}
      <div className="flex items-center justify-center gap-2 py-3">
        {dailyTips.map((tip, index) => (
          <button
            key={tip.id}
            onClick={() => {
              setDirection(index > currentTipIndex ? 1 : -1);
              setCurrentTipIndex(index);
            }}
            className={`h-2 rounded-full transition-all duration-300 touch-manipulation ${
              index === currentTipIndex
                ? 'w-6 bg-elec-yellow'
                : completedTips.has(tip.id)
                  ? 'w-2 bg-green-500'
                  : 'w-2 bg-white/20'
            }`}
          />
        ))}
      </div>

      {/* Completion Celebration */}
      <AnimatePresence>
        {progressPercentage === 100 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mx-4 mb-2 p-3 bg-gradient-to-r from-elec-yellow/20 to-orange-500/20 border border-elec-yellow/30 rounded-xl"
          >
            <div className="flex items-center gap-3">
              <Trophy className="h-6 w-6 text-elec-yellow" />
              <div>
                <p className="font-medium text-elec-yellow">All tips complete!</p>
                <p className="text-xs text-white/60">Your streak continues tomorrow</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Swipe Hint - Mobile Only */}
      <p className="text-center text-xs text-white/30 pb-2 sm:hidden">
        Swipe left or right to navigate
      </p>
    </div>
  );
};

export default DailyAITipsTab;
