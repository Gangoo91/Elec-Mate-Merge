import { useNavigate } from "react-router-dom";
import { GraduationCap, Zap, BookOpen, Award, Users, ChevronRight } from "lucide-react";

interface HubCardProps {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  bgImage?: string;
}

function HubCard({ title, subtitle, description, icon, path, bgImage }: HubCardProps) {
  const navigate = useNavigate();

  return (
    <div
      className="group relative overflow-hidden cursor-pointer bg-card/50 rounded-lg active:scale-[0.98] transition-all duration-300"
      onClick={() => navigate(path)}
    >
      {/* Background image if provided */}
      {bgImage && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
            style={{ backgroundImage: `url(${bgImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
        </>
      )}

      {/* Content */}
      <div className="relative z-10 p-4 sm:p-5 flex flex-col h-full min-h-[160px] sm:min-h-[200px]">
        {/* Icon and badge row */}
        <div className="flex items-start justify-between mb-3 sm:mb-4">
          <div className="p-2.5 sm:p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-background transition-all duration-300 group-hover:scale-105">
            {icon}
          </div>
          <span className="text-[10px] sm:text-xs font-medium text-primary/60 uppercase tracking-wider px-2 py-0.5 rounded bg-card/30">
            {subtitle}
          </span>
        </div>

        {/* Text */}
        <div className="flex-grow">
          <h3 className="text-base sm:text-lg md:text-xl font-bold text-foreground mb-1 sm:mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {description}
          </p>
        </div>

        {/* Action row */}
        <div className="mt-3 sm:mt-4 flex items-center justify-between">
          <span className="text-xs sm:text-sm font-medium text-primary/80 group-hover:text-primary transition-colors">
            Start Learning
          </span>
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-background transition-all duration-300">
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-primary group-hover:text-background group-hover:translate-x-0.5 transition-all" />
          </div>
        </div>
      </div>
    </div>
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
      bgImage: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop&q=80"
    },
    {
      title: "Electrical Upskilling",
      subtitle: "Professional",
      description: "BS7671, BMS, EV charging, and 14+ advanced courses.",
      icon: <Zap className="h-5 w-5 sm:h-6 sm:w-6" />,
      path: "/study-centre/upskilling",
      bgImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&q=80"
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="p-2.5 sm:p-3 rounded-xl bg-primary/10">
          <BookOpen className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground tracking-tight">
            Study Centre
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Master your electrical knowledge with structured courses
          </p>
        </div>
      </div>

      {/* Pathway Cards */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="w-1 h-5 bg-primary rounded-full"></span>
          <h2 className="text-sm sm:text-base font-semibold text-foreground">Choose Your Path</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {pathways.map((pathway) => (
            <HubCard key={pathway.path} {...pathway} />
          ))}
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
        {[
          { icon: <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" />, value: "23", label: "Total Modules" },
          { icon: <Award className="h-4 w-4 sm:h-5 sm:w-5" />, value: "6.8k+", label: "Questions" },
          { icon: <Users className="h-4 w-4 sm:h-5 sm:w-5" />, value: "2.5k+", label: "Students" },
          { icon: <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5" />, value: "98%", label: "Pass Rate" }
        ].map((stat, index) => (
          <div key={index} className="bg-card/50 rounded-lg p-3 sm:p-4">
            <div className="flex flex-col items-center text-center">
              <div className="p-2 rounded-lg bg-primary/10 text-primary mb-2">
                {stat.icon}
              </div>
              <span className="text-lg sm:text-xl font-bold text-foreground">{stat.value}</span>
              <span className="text-[10px] sm:text-xs text-muted-foreground">{stat.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Info Section */}
      <div className="bg-card/50 rounded-lg p-4 sm:p-5">
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="p-2.5 sm:p-3 rounded-xl bg-primary/10 flex-shrink-0">
            <Award className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-semibold text-foreground mb-1 sm:mb-2">Why Study With ElecMate?</h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Our courses are designed by industry professionals and aligned with current regulations.
              Track your progress, test your knowledge with interactive quizzes, and prepare for
              real-world assessments with confidence.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
