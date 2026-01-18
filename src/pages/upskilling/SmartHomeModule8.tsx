import { ArrowLeft, ClipboardCheck, Clock, BookOpen, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const SmartHomeModule8 = () => {
  const infoCards = [
    {
      id: 1,
      title: "Exam Overview",
      icon: ClipboardCheck,
      items: [
        "30 multiple-choice questions",
        "45-minute time limit",
        "Pass mark: 70% (21 correct answers)",
        "Covers all smart home technology areas",
        "Immediate results and detailed feedback"
      ]
    },
    {
      id: 2,
      title: "Topics Covered",
      icon: BookOpen,
      items: [
        "Smart home system fundamentals",
        "Communication protocols",
        "Lighting and scene programming",
        "HVAC and environmental control",
        "Security and access control",
        "Hubs and voice assistants",
        "Installation and safety"
      ]
    }
  ];

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/electrician/upskilling/smart-home-course">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Smart Home Course
            </Link>
          </Button>
        </div>
      </div>

      <div className="px-4 sm:px-6 py-6 sm:py-8">
        {/* Module Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-elec-yellow/10 border border-elec-yellow/20 mb-3">
            <span className="text-elec-yellow text-xs font-semibold">MODULE 8</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/60 text-xs">45 minutes</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/60 text-xs">30 Questions</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Mock Exam
          </h1>
          <p className="text-white/60 text-sm sm:text-base">
            Test your knowledge with a comprehensive mock examination covering all aspects of smart home technology
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 gap-4 max-w-3xl mb-6">
          {infoCards.map((card) => (
            <div
              key={card.id}
              className="group relative overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 hover:border-elec-yellow/30 hover:shadow-lg hover:shadow-elec-yellow/10 transition-all duration-300 h-full"
            >
              {/* Accent line at top */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-elec-yellow/50 to-transparent" />

              {/* Hover glow */}
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl bg-elec-yellow/20 opacity-0 group-hover:opacity-30 transition-opacity duration-500" />

              <div className="relative p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-amber-500/20 border border-white/10">
                    <card.icon className="h-6 w-6 text-elec-yellow" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-bold text-white">{card.title}</h3>
                </div>
                <div className="space-y-3 text-white/70">
                  {card.items.map((item, i) => (
                    <p key={i} className="flex items-start gap-2">
                      <span className="text-elec-yellow mt-1">•</span>
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Before You Begin Card */}
        <div className="max-w-3xl mb-6">
          <div
            className="group relative overflow-hidden bg-elec-yellow/10 backdrop-blur-sm border border-elec-yellow/30 rounded-xl hover:bg-elec-yellow/15 hover:shadow-lg hover:shadow-elec-yellow/10 transition-all duration-300"
          >
            {/* Accent line at top */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-elec-yellow/50 to-transparent" />

            {/* Hover glow */}
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl bg-elec-yellow/20 opacity-0 group-hover:opacity-30 transition-opacity duration-500" />

            <div className="relative p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-amber-500/20 border border-white/10">
                  <CheckCircle className="h-6 w-6 text-elec-yellow" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-white">Before You Begin</h3>
              </div>
              <div className="space-y-3 text-white/70">
                <p className="flex items-start gap-2"><span className="text-elec-yellow mt-1">•</span>Ensure you have completed all previous modules</p>
                <p className="flex items-start gap-2"><span className="text-elec-yellow mt-1">•</span>Review your module notes and key concepts</p>
                <p className="flex items-start gap-2"><span className="text-elec-yellow mt-1">•</span>Find a quiet environment with stable internet connection</p>
                <p className="flex items-start gap-2"><span className="text-elec-yellow mt-1">•</span>Allow uninterrupted time for the full 60-minute duration</p>
                <p className="flex items-start gap-2"><span className="text-elec-yellow mt-1">•</span>Have a calculator and notepad available if needed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Start Exam Button */}
        <div className="flex justify-center pt-6">
          <Link to="/electrician/upskilling/smart-home-mock-exam">
            <Button
              className="bg-elec-yellow text-black hover:bg-elec-yellow/90 transition-all duration-200 px-8 py-3 text-lg font-semibold min-h-[48px] touch-manipulation active:scale-[0.98]"
            >
              <Clock className="mr-2 h-5 w-5" />
              Start Mock Exam
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SmartHomeModule8;
