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
    description: "Matches the standard required by fire safety awareness assessments",
  },
  {
    icon: RotateCcw,
    label: "Unlimited Retakes",
    description: "Practise as many times as you need until you feel confident",
  },
];

const preparationTips = [
  {
    title: "Know the Regulatory Reform Order",
    description:
      "RRFSO 2005 structure, articles, responsible person duties, and relationship to other fire safety legislation.",
  },
  {
    title: "Learn the Fire Classes",
    description:
      "Know all 6 classes (A-F), examples of each, and which extinguisher types are suitable (including which ones must NEVER be used on certain classes).",
  },
  {
    title: "Understand Detection Standards",
    description:
      "BS 5839 Part 1 category system (L1-L5, P1-P2), detector types, and where each is appropriate.",
  },
  {
    title: "Master Evacuation Strategies",
    description:
      "Simultaneous, phased, progressive horizontal, and defend-in-place, PEEPs, refuges, and role of fire marshals.",
  },
  {
    title: "Know Your Extinguishers",
    description:
      "Colour codes (BS EN 3), operating procedures (PASS technique), placement rules, and maintenance requirements.",
  },
  {
    title: "Flag and Return",
    description:
      "During the exam you can flag questions you are unsure about and return to them later. Do not spend too long on any single question.",
  },
];

export default function FireSafetyModule6() {
  useSEO({
    title: "Fire Safety & Fire Marshal Mock Exam | Module 6",
    description:
      "Test your fire safety and fire marshal knowledge with a timed mock examination. 200-question bank, 20 random questions, 30-minute timer.",
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
            <Link to="../fire-safety-course">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Fire Safety
            </Link>
          </Button>
        </div>
      </div>

      <main className="px-4 sm:px-6 py-6 sm:py-8 pb-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3">
              <span className="text-rose-400 text-xs font-semibold">MODULE 6</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">Mock Examination</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Mock Exam
            </h1>
            <p className="text-white/60 text-sm sm:text-base">
              Put your fire safety and fire marshal knowledge to the test under timed exam conditions.
              Questions are drawn from a 200-question bank covering all five content modules.
            </p>
          </div>

          <Card className="border-rose-500/20 bg-white/[0.02] mb-6">
            <CardContent className="p-5 sm:p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/10 border border-rose-500/20">
                  <GraduationCap className="h-5 w-5 text-rose-400" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-white">Exam Format</h2>
                  <p className="text-white/50 text-xs">Simulates real fire safety awareness assessment conditions</p>
                </div>
              </div>

              <div className="space-y-3">
                {examFeatures.map((feature) => (
                  <div
                    key={feature.label}
                    className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.03] border border-white/5"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-500/10 flex-shrink-0 mt-0.5">
                      <feature.icon className="h-4 w-4 text-rose-400" />
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
                <Target className="h-4 w-4 text-rose-400" />
                <h3 className="text-sm font-semibold text-white">Category Coverage</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  { module: "Module 1", name: "Understanding Fire", count: 40 },
                  { module: "Module 2", name: "Fire Safety Legislation", count: 40 },
                  { module: "Module 3", name: "Fire Prevention & Detection", count: 40 },
                  { module: "Module 4", name: "Fire Marshal Duties & Evacuation", count: 40 },
                  { module: "Module 5", name: "Firefighting Equipment & Incident Response", count: 40 },
                ].map((cat) => (
                  <div
                    key={cat.name}
                    className="flex items-center justify-between p-2.5 rounded-lg border border-white/5 bg-white/[0.02]"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-rose-400" />
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
              className="w-full bg-rose-500 hover:bg-rose-500/90 text-white font-bold py-4 text-base min-h-[52px] rounded-xl touch-manipulation active:scale-[0.98] shadow-lg shadow-rose-500/20"
            >
              <Link to="../fire-safety-mock-exam">
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
                <AlertTriangle className="h-4 w-4 text-amber-400" />
                <h3 className="text-sm font-semibold text-white">Preparation Tips</h3>
              </div>

              <div className="space-y-4">
                {preparationTips.map((tip, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-500/10 border border-rose-500/20 flex-shrink-0 mt-0.5">
                      <span className="text-[10px] font-bold text-rose-400">{index + 1}</span>
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
