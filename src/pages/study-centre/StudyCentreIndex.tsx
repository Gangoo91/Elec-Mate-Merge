import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { GraduationCap, Zap, BookOpen, Award, Users, ChevronRight } from "lucide-react";

interface HubCardProps {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  accentColor: string;
  bgImage?: string;
}

function HubCard({ title, subtitle, description, icon, path, accentColor, bgImage }: HubCardProps) {
  const navigate = useNavigate();

  return (
    <Card
      className={`
        group relative overflow-hidden cursor-pointer
        bg-elec-gray/80 border border-elec-yellow/10
        hover:border-elec-yellow/40
        active:scale-[0.98]
        transition-all duration-300 ease-out
        hover:shadow-xl hover:shadow-elec-yellow/10
      `}
      onClick={() => navigate(path)}
    >
      {/* Background image if provided */}
      {bgImage && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
            style={{ backgroundImage: `url(${bgImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-elec-dark via-elec-dark/80 to-elec-dark/40" />
        </>
      )}

      {/* Background glow on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${accentColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

      {/* Decorative corner */}
      <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-28 h-28 bg-elec-yellow/5 rotate-45 translate-x-14 -translate-y-14 group-hover:bg-elec-yellow/10 transition-colors" />
      </div>

      {/* Content */}
      <div className="relative z-10 p-4 sm:p-5 md:p-6 flex flex-col h-full min-h-[160px] sm:min-h-[200px]">
        {/* Icon and badge row */}
        <div className="flex items-start justify-between mb-3 sm:mb-4">
          <div className={`
            p-2.5 sm:p-3 rounded-xl
            bg-elec-yellow/10 text-elec-yellow
            backdrop-blur-sm
            group-hover:bg-elec-yellow group-hover:text-elec-dark
            transition-all duration-300
            group-hover:scale-105
          `}>
            {icon}
          </div>
          <span className="text-[10px] sm:text-xs font-medium text-elec-yellow/60 uppercase tracking-wider backdrop-blur-sm px-2 py-0.5 rounded bg-elec-dark/30">
            {subtitle}
          </span>
        </div>

        {/* Text */}
        <div className="flex-grow">
          <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-1 sm:mb-2 group-hover:text-elec-yellow transition-colors drop-shadow-sm">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed line-clamp-2 drop-shadow-sm">
            {description}
          </p>
        </div>

        {/* Action row */}
        <div className="mt-3 sm:mt-4 flex items-center justify-between">
          <span className="text-xs sm:text-sm font-medium text-elec-yellow/80 group-hover:text-elec-yellow transition-colors">
            Start Learning
          </span>
          <div className="
            w-7 h-7 sm:w-8 sm:h-8 rounded-full
            bg-elec-yellow/10 backdrop-blur-sm
            flex items-center justify-center
            group-hover:bg-elec-yellow group-hover:text-elec-dark
            transition-all duration-300
          ">
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-elec-yellow group-hover:text-elec-dark group-hover:translate-x-0.5 transition-all" />
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-elec-yellow/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </Card>
  );
}

export default function StudyCentreIndex() {
  const pathways: HubCardProps[] = [
    {
      title: "Apprentice Courses",
      subtitle: "Training",
      description: "Level 2, AM2 preparation, and apprentice fundamentals.",
      icon: <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6" />,
      path: "/study-centre/apprentice",
      bgImage: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop&q=80",
      accentColor: "from-blue-500/10 via-transparent to-transparent"
    },
    {
      title: "Electrical Upskilling",
      subtitle: "Professional",
      description: "BS7671, BMS, EV charging, and 14+ advanced courses.",
      icon: <Zap className="h-5 w-5 sm:h-6 sm:w-6" />,
      path: "/study-centre/upskilling",
      bgImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&q=80",
      accentColor: "from-elec-yellow/10 via-transparent to-transparent"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-elec-dark via-background to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
        {/* Hero Header */}
        <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-elec-gray via-elec-gray to-elec-dark">
          <div className="absolute inset-0 bg-gradient-to-r from-elec-yellow/5 via-transparent to-elec-yellow/5 animate-pulse" />
          <div className="absolute inset-0 backdrop-blur-[2px]" />
          <div className="absolute top-0 right-0 w-32 sm:w-64 h-32 sm:h-64 bg-elec-yellow/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

          <div className="relative z-10 p-5 sm:p-6 md:p-8">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="p-2.5 sm:p-3 rounded-xl bg-elec-yellow/10">
                <BookOpen className="h-6 w-6 sm:h-8 sm:w-8 text-elec-yellow" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                  Study Centre
                </h1>
                <p className="text-sm sm:text-base text-gray-400 mt-1">
                  Master your electrical knowledge with structured courses
                </p>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-elec-yellow/50 to-transparent" />
        </Card>

        {/* Pathway Cards */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-elec-yellow rounded-full"></span>
            Choose Your Path
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {pathways.map((pathway) => (
              <HubCard key={pathway.path} {...pathway} />
            ))}
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {[
            { icon: <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" />, value: "23", label: "Total Modules" },
            { icon: <Award className="h-4 w-4 sm:h-5 sm:w-5" />, value: "6.8k+", label: "Questions" },
            { icon: <Users className="h-4 w-4 sm:h-5 sm:w-5" />, value: "2.5k+", label: "Students" },
            { icon: <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5" />, value: "98%", label: "Pass Rate" }
          ].map((stat, index) => (
            <Card key={index} className="bg-elec-gray/50 border-elec-yellow/10 p-3 sm:p-4">
              <div className="flex flex-col items-center text-center">
                <div className="p-2 rounded-lg bg-elec-yellow/10 text-elec-yellow mb-2">
                  {stat.icon}
                </div>
                <span className="text-lg sm:text-xl font-bold text-white">{stat.value}</span>
                <span className="text-[10px] sm:text-xs text-gray-400">{stat.label}</span>
              </div>
            </Card>
          ))}
        </div>

        {/* Info Section */}
        <Card className="bg-elec-gray/50 border-elec-yellow/10 p-4 sm:p-6">
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="p-2.5 sm:p-3 rounded-xl bg-elec-yellow/10 flex-shrink-0">
              <Award className="h-5 w-5 sm:h-6 sm:w-6 text-elec-yellow" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-white mb-1 sm:mb-2">Why Study With ElecMate?</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Our courses are designed by industry professionals and aligned with current regulations.
                Track your progress, test your knowledge with interactive quizzes, and prepare for
                real-world assessments with confidence.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
