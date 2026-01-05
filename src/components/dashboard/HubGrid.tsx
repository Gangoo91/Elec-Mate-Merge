import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { GraduationCap, Zap, Briefcase, ChevronRight } from "lucide-react";

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
        active:scale-[0.97]
        transition-all duration-200 ease-out
        touch-manipulation
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
          <h3 className="text-base sm:text-lg md:text-xl font-bold text-foreground mb-1 sm:mb-2 group-hover:text-elec-yellow transition-colors">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed line-clamp-2">
            {description}
          </p>
        </div>

        {/* Action row */}
        <div className="mt-3 sm:mt-4 flex items-center justify-between">
          <span className="text-xs sm:text-sm font-medium text-elec-yellow/80 group-hover:text-elec-yellow transition-colors">
            Enter Hub
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

export function HubGrid() {
  const hubs: HubCardProps[] = [
    {
      title: "Apprentice Hub",
      subtitle: "Training",
      description: "Track your journey, log training hours, and build your portfolio.",
      icon: <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6" />,
      path: "/apprentice",
      accentColor: "from-blue-500/10 via-transparent to-transparent",
      bgImage: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop&q=80"
    },
    {
      title: "Electrical Hub",
      subtitle: "Tools",
      description: "Inspection tools, certificates, pricing, and AI assistants.",
      icon: <Zap className="h-5 w-5 sm:h-6 sm:w-6" />,
      path: "/electrician",
      accentColor: "from-elec-yellow/10 via-transparent to-transparent",
      bgImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&q=80"
    },
    {
      title: "Employer Hub",
      subtitle: "Manage",
      description: "Employees, jobs, timesheets, and business management.",
      icon: <Briefcase className="h-5 w-5 sm:h-6 sm:w-6" />,
      path: "/employer",
      accentColor: "from-purple-500/10 via-transparent to-transparent",
      bgImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300&fit=crop&q=80"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
      {hubs.map((hub) => (
        <HubCard key={hub.path} {...hub} />
      ))}
    </div>
  );
}
