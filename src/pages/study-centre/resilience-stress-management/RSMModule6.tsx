import { ArrowLeft, GraduationCap, Clock, Target, BookOpen, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import useSEO from '@/hooks/useSEO';

export default function RSMModule6() {
  useSEO({
    title: 'Module 6: Mock Exam | Resilience & Stress Management',
    description:
      'Resilience & Stress Management mock examination — 20 random questions from a 200-question bank, 30-minute timer, 80% pass mark.',
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-8 lg:px-12 py-2">
          <div className="max-w-4xl mx-auto">
            <Button
              variant="ghost"
              size="lg"
              className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../resilience-stress-management">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Resilience &amp; Stress Management
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-8 lg:px-12 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3">
              <span className="text-rose-400 text-xs font-semibold">MODULE 6</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">Mock Exam</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">30 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Mock Examination</h1>
            <p className="text-white/60 text-sm sm:text-base">
              Test your knowledge across all 5 modules with a timed, randomised exam
            </p>
          </div>

          <div className="space-y-6">
            {/* Exam Info Card */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-rose-500/10 via-rose-400/5 to-transparent border border-rose-500/15 p-5 sm:p-8">
              <div className="absolute top-0 right-0 w-48 h-48 bg-rose-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-rose-500/20 to-rose-400/20 border border-rose-500/20">
                    <GraduationCap className="h-6 w-6 text-rose-400" />
                  </div>
                  <h2 className="text-lg font-semibold text-white">Exam Details</h2>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
                    <BookOpen className="h-5 w-5 text-rose-400 mx-auto mb-1" />
                    <p className="text-lg font-bold text-white">20</p>
                    <p className="text-xs text-white/80">Questions</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
                    <Clock className="h-5 w-5 text-rose-400 mx-auto mb-1" />
                    <p className="text-lg font-bold text-white">30</p>
                    <p className="text-xs text-white/80">Minutes</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
                    <Target className="h-5 w-5 text-rose-400 mx-auto mb-1" />
                    <p className="text-lg font-bold text-white">80%</p>
                    <p className="text-xs text-white/80">Pass Mark</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
                    <GraduationCap className="h-5 w-5 text-rose-400 mx-auto mb-1" />
                    <p className="text-lg font-bold text-white">200</p>
                    <p className="text-xs text-white/80">Question Bank</p>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <h3 className="text-sm font-semibold text-white">How It Works</h3>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                      <span>
                        20 questions randomly selected from a bank of 200, balanced across all 5
                        modules
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                      <span>
                        30-minute timer &mdash; you will receive a warning at the 5-minute mark
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                      <span>
                        80% pass mark (16 out of 20 correct) &mdash; matches industry assessment
                        standards
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                      <span>Full review after completion with explanations for every question</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                      <span>Category breakdown shows your strengths and areas for improvement</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                      <span>
                        Retake as many times as you like &mdash; different questions each time
                      </span>
                    </li>
                  </ul>
                </div>

                <Button
                  size="lg"
                  className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
                  asChild
                >
                  <Link to="../rsm-mock-exam">
                    Start Mock Exam
                    <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Categories Covered */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-white mb-3">Categories Covered</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  'Understanding Stress',
                  'Understanding Resilience',
                  'Coping Strategies & Mindfulness',
                  'Building Daily Resilience',
                  'Switching Off & Sustaining Wellbeing',
                ].map((cat) => (
                  <div
                    key={cat}
                    className="flex items-center gap-2 text-sm text-white/80 bg-white/5 rounded-lg p-2.5"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-rose-400 flex-shrink-0" />
                    {cat}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
