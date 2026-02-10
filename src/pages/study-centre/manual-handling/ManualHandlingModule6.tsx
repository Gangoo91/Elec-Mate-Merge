import { ArrowLeft, GraduationCap, Clock, Target, RotateCcw, BookOpen, ShieldCheck, AlertTriangle, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import useSEO from "@/hooks/useSEO";

const examFeatures = [
  {
    icon: BookOpen,
    label: "200-Question Bank",
    description: "Randomly selected each attempt so no two exams are the same",
  },
  {
    icon: Target,
    label: "20 Questions Per Exam",
    description: "Balanced across all five content modules for fair coverage",
  },
  {
    icon: Clock,
    label: "30-Minute Timer",
    description: "Timed under exam conditions with a 5-minute warning alert",
  },
  {
    icon: ShieldCheck,
    label: "80% Pass Mark (16/20)",
    description: "Matches the standard required by manual handling assessments",
  },
  {
    icon: RotateCcw,
    label: "Unlimited Retakes",
    description: "Practise as many times as you need until you feel confident",
  },
];

const preparationTips = [
  {
    title: "Review All Five Modules",
    description:
      "Questions are drawn equally from Understanding Manual Handling, Principles of Safe Lifting, Risk Assessment & Reduction, Workplace-Specific Handling, and Health, Welfare & Responsibilities. Make sure you have covered every module before attempting the exam.",
  },
  {
    title: "Master the TILE Framework",
    description:
      "Task, Individual, Load, Environment is the core risk assessment tool. Understand how each factor affects manual handling operations and how to apply the framework in real-world scenarios.",
  },
  {
    title: "Know MHOR 1992 Inside Out",
    description:
      "The Manual Handling Operations Regulations 1992 is the primary legislation. Know the key duties, the hierarchy of measures (avoid, assess, reduce), and how it interacts with HASAWA 1974 and the Management Regs 1999.",
  },
  {
    title: "Understand the Kinetic Lifting Technique",
    description:
      "Know every step of the eight-step safe lift — from planning the lift to setting down the load. Understand base of support, centre of gravity, and why smooth controlled movements prevent injury.",
  },
  {
    title: "Learn the Mechanical Aids",
    description:
      "Know when to use trolleys, sack trucks, hoists, pallet trucks, and other equipment. Understand how mechanical aids reduce risk and when manual handling can be designed out entirely.",
  },
  {
    title: "Flag and Return",
    description:
      "During the exam you can flag questions you are unsure about and return to them later. Do not spend too long on any single question.",
  },
];

export default function ManualHandlingModule6() {
  useSEO({
    title: "Manual Handling Mock Exam | Module 6",
    description:
      "Test your manual handling knowledge with a timed mock examination. 200-question bank, 20 random questions, 30-minute timer.",
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../manual-handling-course">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Manual Handling
            </Link>
          </Button>
        </div>
      </div>

      <main className="px-4 sm:px-6 py-6 sm:py-8 pb-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-3">
              <span className="text-emerald-400 text-xs font-semibold">MODULE 6</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">Mock Examination</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Mock Exam
            </h1>
            <p className="text-white/60 text-sm sm:text-base">
              Put your manual handling knowledge to the test under timed exam conditions.
              Questions are drawn from a 200-question bank covering all five content modules.
            </p>
          </div>

          <Card className="border-emerald-500/20 bg-white/[0.02] mb-6">
            <CardContent className="p-5 sm:p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <GraduationCap className="h-5 w-5 text-emerald-400" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-white">Exam Format</h2>
                  <p className="text-white/50 text-xs">Simulates real manual handling assessment conditions</p>
                </div>
              </div>

              <div className="space-y-3">
                {examFeatures.map((feature) => (
                  <div
                    key={feature.label}
                    className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.03] border border-white/5"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 flex-shrink-0 mt-0.5">
                      <feature.icon className="h-4 w-4 text-emerald-400" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white">{feature.label}</p>
                      <p className="text-xs text-white/50 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-white/[0.02] mb-6">
            <CardContent className="p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-4">
                <Target className="h-4 w-4 text-emerald-400" />
                <h3 className="text-sm font-semibold text-white">Category Coverage</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  { module: "Module 1", name: "Understanding Manual Handling", count: 40 },
                  { module: "Module 2", name: "Principles of Safe Lifting", count: 40 },
                  { module: "Module 3", name: "Risk Assessment & Reduction", count: 40 },
                  { module: "Module 4", name: "Workplace-Specific Handling", count: 40 },
                  { module: "Module 5", name: "Health, Welfare & Responsibilities", count: 40 },
                ].map((cat) => (
                  <div
                    key={cat.name}
                    className="flex items-center justify-between p-2.5 rounded-lg border border-white/5 bg-white/[0.02]"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span className="text-sm text-white">{cat.name}</span>
                    </div>
                    <span className="text-xs text-white/40">{cat.count} questions</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-white/40 mt-3 text-centre">
                4 questions drawn from each category per exam (20 total)
              </p>
            </CardContent>
          </Card>

          <div className="mb-8">
            <Button
              asChild
              size="lg"
              className="w-full bg-emerald-500 hover:bg-emerald-500/90 text-white font-bold py-4 text-base min-h-[52px] rounded-xl touch-manipulation active:scale-[0.98] shadow-lg shadow-emerald-500/20"
            >
              <Link to="../manual-handling-mock-exam">
                <GraduationCap className="h-5 w-5 mr-2" />
                Start Mock Exam
                <Clock className="h-4 w-4 ml-2 opacity-70" />
              </Link>
            </Button>
            <p className="text-centre text-xs text-white/40 mt-2">
              You can retake the exam as many times as you like with different questions each time
            </p>
          </div>

          <Card className="border-white/10 bg-white/[0.02]">
            <CardContent className="p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-5">
                <AlertTriangle className="h-4 w-4 text-emerald-400" />
                <h3 className="text-sm font-semibold text-white">Preparation Tips</h3>
              </div>

              <div className="space-y-4">
                {preparationTips.map((tip, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20 flex-shrink-0 mt-0.5">
                      <span className="text-[10px] font-bold text-emerald-400">{index + 1}</span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white mb-0.5">{tip.title}</p>
                      <p className="text-xs text-white/50 leading-relaxed">
                        {tip.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 p-3 rounded-lg border border-green-500/20 bg-green-500/5">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-green-300 leading-relaxed">
                    After completing the exam you will see a full breakdown by category, including
                    which areas need more revision. Use this to focus your study before retaking.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
