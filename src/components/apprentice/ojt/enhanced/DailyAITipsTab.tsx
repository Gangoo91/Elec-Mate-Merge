
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Lightbulb,
  RefreshCw,
  BookOpen,
  Zap,
  Clock,
  CheckCircle,
  Target,
  AlertTriangle,
  Calculator,
  Wrench,
  Flame,
  Trophy,
  Star,
  ChevronRight,
  Calendar,
  Brain,
  Shield,
  Sparkles,
  Award
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
  focus: string;
  icon: React.ElementType;
  color: string;
  gradient: string;
}

const DailyAITipsTab = () => {
  const [completedTips, setCompletedTips] = useState<Set<string>>(new Set());
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [streak, setStreak] = useState(12);

  // Day themes based on actual day of week
  const dayThemes: Record<number, DayTheme> = {
    0: { name: "Study Sunday", focus: "Revision & Regulations", icon: BookOpen, color: "text-purple-500", gradient: "from-purple-500/20 to-indigo-500/20" },
    1: { name: "Safety Monday", focus: "Health & Safety", icon: Shield, color: "text-red-500", gradient: "from-red-500/20 to-orange-500/20" },
    2: { name: "Technical Tuesday", focus: "Calculations & Theory", icon: Calculator, color: "text-blue-500", gradient: "from-blue-500/20 to-cyan-500/20" },
    3: { name: "Workshop Wednesday", focus: "Practical Skills", icon: Wrench, color: "text-green-500", gradient: "from-green-500/20 to-emerald-500/20" },
    4: { name: "Testing Thursday", focus: "Inspection & Testing", icon: Zap, color: "text-yellow-500", gradient: "from-yellow-500/20 to-amber-500/20" },
    5: { name: "Focus Friday", focus: "Career & Portfolio", icon: Target, color: "text-cyan-500", gradient: "from-cyan-500/20 to-teal-500/20" },
    6: { name: "Skills Saturday", focus: "Industry Knowledge", icon: Brain, color: "text-pink-500", gradient: "from-pink-500/20 to-rose-500/20" },
  };

  const today = new Date();
  const dayOfWeek = today.getDay();
  const currentTheme = dayThemes[dayOfWeek];

  // Generate tips based on day theme
  const dailyTips = useMemo<Tip[]>(() => {
    const allTips: Record<number, Tip[]> = {
      0: [ // Sunday - Study
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
          content: "The 2391 requires you to understand not just HOW to test, but WHY. Know the purpose of each test, the expected results, and what faults each test identifies. The practical exam requires methodical, safe working.",
          icon: Target,
          difficulty: "Expert",
          actionStep: "Practice completing a full EICR on a domestic installation, timing yourself",
          regulation: "GN3 - Guidance Note 3"
        }
      ],
      1: [ // Monday - Safety
        {
          id: "mon1",
          category: "Safe Isolation",
          title: "The GS38 Approved Voltage Indicator",
          content: "Your voltage indicator MUST meet GS38 requirements: fused probes (max 500mA), shrouded probes with max 4mm exposed tip, finger barriers, and insulated leads. Test on known live source before AND after isolation - every single time.",
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
          content: "For live working (which should be rare), use insulated gloves rated to the voltage you're working with. Class 00 for up to 500V AC. But here's the thing - if you need gloves, ask yourself if you should be working live at all. Usually the answer is no.",
          icon: Shield,
          difficulty: "Developing",
          actionStep: "Check your PPE kit - ensure you have Class 00 gloves and they're within test date",
          regulation: "Regulation 14 EAWR"
        },
        {
          id: "mon3",
          category: "Risk Assessment",
          title: "Dynamic Risk Assessment On Site",
          content: "Your written RA is just the start. On site, constantly reassess: Has anything changed? Are there new hazards? Is the isolation still secure? I've seen jobs go wrong because someone reconnected power without checking. Never assume - verify.",
          icon: Brain,
          difficulty: "Competent",
          actionStep: "Before each task today, spend 30 seconds identifying hazards that weren't on the original RA",
          proTip: "Take photos of isolation points - if someone questions your isolation, you've got evidence"
        }
      ],
      2: [ // Tuesday - Calculations
        {
          id: "tue1",
          category: "Cable Sizing",
          title: "The Voltage Drop Calculation Decoded",
          content: "Voltage drop = (mV/A/m × Ib × L) ÷ 1000. The mV/A/m value comes from the tables (Appendix 4). For 2.5mm² T&E it's 18mV/A/m. Keep total drop under 5% (11.5V) with max 3% (6.9V) on final circuits.",
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
          content: "It × Ca × Cg × Ci × Cc ≥ Ib. Thermal insulation (Ci) is the killer - cables enclosed in insulation can only carry 0.5 times their normal current. Group rating (Cg) catches people out on larger installations. Check EVERY factor.",
          icon: Zap,
          difficulty: "Competent",
          actionStep: "Find a job with grouped cables and calculate the correct Cg factor from Table 4C1",
          regulation: "Section 523, Tables 4C1-4C6"
        },
        {
          id: "tue3",
          category: "Earth Fault Loop",
          title: "Zs Maximum Values",
          content: "For a 32A Type B MCB on a TN system, max Zs is 1.37Ω (from Table 41.3). But wait - that's at operating temperature. If you're testing cold, apply 0.8 multiplier to your reading, or use 80% of table value as your limit.",
          icon: Calculator,
          difficulty: "Competent",
          actionStep: "Measure Zs on three circuits and verify against corrected table values",
          regulation: "Regulation 411.4.4, Table 41.3"
        }
      ],
      3: [ // Wednesday - Practical
        {
          id: "wed1",
          category: "Installation",
          title: "Professional Cable Management",
          content: "Support cables every 300mm horizontally, 400mm vertically. At accessories, leave 150mm service loop. Label every cable at both ends. Your installation will be inspected and maintained for 20+ years - make it easy for whoever comes next.",
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
          content: "Strip outer sheath 50mm minimum. Use proper gland - indoor or outdoor rated as needed. Earth tag under gland locknut. Torque to spec (not just 'tight'). Common mistake: not leaving enough armour for proper contact with gland.",
          icon: Wrench,
          difficulty: "Developing",
          actionStep: "Practice SWA termination on scrap cable until you can do it cleanly in under 10 minutes",
          proTip: "Mark the sheath before cutting - measure twice, cut once applies here"
        },
        {
          id: "wed3",
          category: "Consumer Units",
          title: "The 18th Edition CU Install",
          content: "Metal consumer units are now standard (Regulation 421.1.201). All circuits need RCD protection via RCBO or split-load. Keep Type A RCBOs for circuits with electronic equipment. Tails must be adequately protected or enclosed.",
          icon: Zap,
          difficulty: "Developing",
          actionStep: "Research: When would you use a Type B RCD instead of Type A?",
          regulation: "Section 421, Amendment 2"
        }
      ],
      4: [ // Thursday - Testing
        {
          id: "thu1",
          category: "Initial Verification",
          title: "The Testing Sequence - And Why It Matters",
          content: "Dead tests first (continuity, IR), then live tests (Zs, RCD). This isn't arbitrary - you need to verify insulation resistance before applying voltage, and earth continuity before checking Zs. Skipping the order creates unsafe conditions.",
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
          content: "Three readings: L-L, N-N, CPC-CPC should be roughly equal. Then cross-connect (L1 to N2, N1 to L2) and test at each socket. All readings should be virtually identical. If not, you've got a fault to find.",
          icon: Calculator,
          difficulty: "Developing",
          actionStep: "Draw a ring circuit diagram showing the cross-connection method - understand WHY it works",
          regulation: "GN3 Chapter 3"
        },
        {
          id: "thu3",
          category: "RCD Testing",
          title: "Full RCD Test Protocol",
          content: "Test at 50%, 100%, and 5x rated current. 30mA RCD: 15mA should NOT trip, 30mA must trip <300ms, 150mA (5x) must trip <40ms. Don't forget the ramp test to verify no-trip at 50%. Document all readings.",
          icon: Zap,
          difficulty: "Competent",
          actionStep: "Perform full RCD tests on three devices and record results to NICEIC format",
          regulation: "Regulation 411.4.4"
        }
      ],
      5: [ // Friday - Career
        {
          id: "fri1",
          category: "Portfolio",
          title: "Evidence That Actually Counts",
          content: "Quality over quantity. One well-documented job with before/during/after photos, sketches, and clear explanation of your decision-making beats ten quick snaps. Your assessor wants to see UNDERSTANDING, not just completion.",
          icon: Target,
          difficulty: "Foundation",
          actionStep: "Review your last portfolio entry - does it show your thought process or just the result?",
          proTip: "Record voice notes while working to capture your thinking - transcribe later"
        },
        {
          id: "fri2",
          category: "Progression",
          title: "The Path to Qualified Supervisor",
          content: "After your apprenticeship: 2391 (Inspection & Testing), 2 years experience, then consider Qualified Supervisor route. Need to demonstrate design, installation, inspection AND supervision competence. NICEIC/NAPIT routes differ slightly.",
          icon: Trophy,
          difficulty: "Competent",
          actionStep: "Research the QS requirements for your preferred scheme (NICEIC/NAPIT/ELECSA)",
          proTip: "Start logging your supervision experience now - you'll need it later"
        },
        {
          id: "fri3",
          category: "Industry",
          title: "Specialisation vs Generalisation",
          content: "Domestic is steady but competitive. Commercial and industrial pay more but have longer travel. Specialist areas (fire alarm, data, EV charging, solar PV) can command premium rates. Think about what genuinely interests you.",
          icon: Brain,
          difficulty: "Developing",
          actionStep: "Speak to three qualified electricians in different sectors about their career paths"
        }
      ],
      6: [ // Saturday - Industry
        {
          id: "sat1",
          category: "Industry Trends",
          title: "Electric Vehicle Charging Installation",
          content: "EV charging is booming. Requirements: dedicated circuit, RCD Type A minimum (Type B for certain chargers), PME earthing considerations, max Zs 0.35Ω for TN systems. The 2919 qualification is specifically for EV installation.",
          icon: Zap,
          difficulty: "Developing",
          actionStep: "Research the differences between Mode 2, Mode 3, and Mode 4 charging",
          regulation: "IET Code of Practice for EV Charging"
        },
        {
          id: "sat2",
          category: "Technology",
          title: "Smart Home Systems Integration",
          content: "More clients want smart switches, automated lighting, and integrated systems. Understanding protocols (Zigbee, Z-Wave, WiFi), neutral requirements for smart switches, and basic networking makes you more valuable. It's electrical, but evolving.",
          icon: Brain,
          difficulty: "Competent",
          actionStep: "Install a smart switch in your own home - understand the neutral wire requirement",
          proTip: "The electrician who can also program the system wins the job"
        },
        {
          id: "sat3",
          category: "Business",
          title: "Customer Communication Skills",
          content: "Technical skill gets you hired once. Communication gets you rehired and recommended. Explain work in terms customers understand. Under-promise, over-deliver. Leave sites clean. Return calls promptly. These basics beat cheap prices every time.",
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
      }
      return newSet;
    });
  };

  const nextTip = () => {
    setCurrentTipIndex(prev => (prev + 1) % dailyTips.length);
  };

  const prevTip = () => {
    setCurrentTipIndex(prev => (prev - 1 + dailyTips.length) % dailyTips.length);
  };

  const currentTip = dailyTips[currentTipIndex];
  const progressPercentage = (completedTips.size / dailyTips.length) * 100;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Foundation": return "bg-green-500/20 text-green-400 border-green-500/50";
      case "Developing": return "bg-blue-500/20 text-blue-400 border-blue-500/50";
      case "Competent": return "bg-purple-500/20 text-purple-400 border-purple-500/50";
      case "Expert": return "bg-orange-500/20 text-orange-400 border-orange-500/50";
      default: return "bg-white/10 text-white border-white/50";
    }
  };

  return (
    <div className="space-y-4">
      {/* Daily Theme Header */}
      <Card className={`border-elec-yellow/30 bg-gradient-to-br ${currentTheme.gradient}`}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-background/50 ${currentTheme.color}`}>
                <currentTheme.icon className="h-6 w-6" />
              </div>
              <div>
                <h2 className={`text-lg font-bold ${currentTheme.color}`}>{currentTheme.name}</h2>
                <p className="text-sm text-white">Today's Focus: {currentTheme.focus}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-white" />
              <span className="text-sm text-white">
                {today.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short' })}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress & Streak */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="border-elec-yellow/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-elec-yellow/20">
                <Flame className="h-5 w-5 text-orange-500" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Learning Streak</span>
                  <span className="text-lg font-bold text-elec-yellow">{streak} days</span>
                </div>
                <p className="text-xs text-white">Complete today's tips to keep it going!</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-elec-yellow/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-elec-yellow/20">
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Today's Progress</span>
                  <span className="text-lg font-bold text-elec-yellow">{completedTips.size}/{dailyTips.length}</span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Tip Card */}
      <Card className="border-elec-yellow/30 overflow-hidden">
        <CardHeader className="pb-3 bg-white/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className={currentTheme.color}>
                {currentTip.category}
              </Badge>
              <Badge variant="outline" className={getDifficultyColor(currentTip.difficulty)}>
                {currentTip.difficulty}
              </Badge>
            </div>
            <div className="flex items-center gap-1 text-sm text-white">
              <span>{currentTipIndex + 1}</span>
              <span>/</span>
              <span>{dailyTips.length}</span>
            </div>
          </div>
          <CardTitle className="text-xl mt-2 flex items-center gap-2">
            <currentTip.icon className={`h-5 w-5 ${currentTheme.color}`} />
            {currentTip.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-4">
          <p className="text-white leading-relaxed">{currentTip.content}</p>

          {currentTip.regulation && (
            <div className="flex items-center gap-2 text-sm">
              <BookOpen className="h-4 w-4 text-orange-500" />
              <span className="text-orange-400">Reference: {currentTip.regulation}</span>
            </div>
          )}

          {currentTip.proTip && (
            <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="h-4 w-4 text-elec-yellow" />
                <span className="font-medium text-elec-yellow text-sm">Pro Tip</span>
              </div>
              <p className="text-sm text-white">{currentTip.proTip}</p>
            </div>
          )}

          {/* Action Step */}
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-4 w-4 text-green-500" />
              <span className="font-medium text-green-400 text-sm">Action Step</span>
            </div>
            <p className="text-sm text-white mb-3">{currentTip.actionStep}</p>
            <Button
              size="sm"
              variant={completedTips.has(currentTip.id) ? "default" : "outline"}
              className={completedTips.has(currentTip.id) ? "bg-green-600 hover:bg-green-700" : "border-green-500/50 hover:bg-green-500/20"}
              onClick={() => handleMarkComplete(currentTip.id)}
            >
              {completedTips.has(currentTip.id) ? (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Completed
                </>
              ) : (
                <>
                  <Target className="h-4 w-4 mr-2" />
                  Mark as Done
                </>
              )}
            </Button>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-2">
            <Button variant="outline" size="sm" onClick={prevTip} className="border-elec-yellow/30">
              Previous
            </Button>
            <div className="flex gap-1">
              {dailyTips.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTipIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentTipIndex
                      ? 'bg-elec-yellow'
                      : completedTips.has(dailyTips[index].id)
                        ? 'bg-green-500'
                        : 'bg-white/5'
                  }`}
                />
              ))}
            </div>
            <Button variant="outline" size="sm" onClick={nextTip} className="border-elec-yellow/30">
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Achievement */}
      {progressPercentage === 100 && (
        <Card className="border-elec-yellow/50 bg-gradient-to-br from-elec-yellow/20 to-orange-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-elec-yellow/20">
                <Award className="h-6 w-6 text-elec-yellow" />
              </div>
              <div>
                <h3 className="font-bold text-elec-yellow">Daily Tips Complete!</h3>
                <p className="text-sm text-white">
                  Brilliant work! You've completed all of today's learning tips. Your streak continues!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Skills Overview */}
      <Card className="border-elec-yellow/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Trophy className="h-4 w-4 text-elec-yellow" />
            This Week's Learning Journey
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-7 gap-1">
          {Object.entries(dayThemes).map(([day, theme]) => {
            const isToday = parseInt(day) === dayOfWeek;
            const isPast = parseInt(day) < dayOfWeek;
            return (
              <div
                key={day}
                className={`text-center p-2 rounded-lg ${
                  isToday
                    ? 'bg-elec-yellow/20 border border-elec-yellow/50'
                    : isPast
                      ? 'bg-green-500/10 border border-green-500/30'
                      : 'bg-white/5 border border-transparent'
                }`}
              >
                <theme.icon className={`h-4 w-4 mx-auto mb-1 ${isToday ? theme.color : isPast ? 'text-green-500' : 'text-white'}`} />
                <span className={`text-xs ${isToday ? 'font-medium' : 'text-white'}`}>
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'][parseInt(day)]}
                </span>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};

export default DailyAITipsTab;
