import { useNavigate } from "react-router-dom";
import { GraduationCap, Zap, Briefcase, ChevronRight } from "lucide-react";

interface HubCardProps {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  iconColor: string;
  iconBg: string;
}

function HubCard({ title, subtitle, description, icon, path, iconColor, iconBg }: HubCardProps) {
  const navigate = useNavigate();

  return (
    <button
      className="
        w-full text-left
        group relative overflow-hidden rounded-2xl
        bg-[#1a1a1a] border border-white/[0.06]
        hover:border-white/[0.12] hover:bg-[#1e1e1e]
        active:scale-[0.98] active:opacity-90
        transition-all duration-200
        touch-manipulation
      "
      onClick={() => navigate(path)}
    >
      {/* Content */}
      <div className="p-4 sm:p-5 flex flex-col h-full min-h-[140px] sm:min-h-[160px]">
        {/* Top row - Icon and badge */}
        <div className="flex items-start justify-between mb-3">
          <div className={`
            p-2.5 sm:p-3 rounded-xl
            ${iconBg} ${iconColor}
            transition-transform duration-200
            group-hover:scale-105
          `}>
            {icon}
          </div>
          <span className="text-[10px] sm:text-xs font-medium text-white/40 uppercase tracking-wider px-2 py-1 rounded-md bg-white/[0.04]">
            {subtitle}
          </span>
        </div>

        {/* Text content */}
        <div className="flex-grow">
          <h3 className="text-base sm:text-lg font-semibold text-white mb-1 group-hover:text-elec-yellow transition-colors">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-white/50 leading-relaxed line-clamp-2">
            {description}
          </p>
        </div>

        {/* Bottom action row */}
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs sm:text-sm font-medium text-elec-yellow/70 group-hover:text-elec-yellow transition-colors">
            Open
          </span>
          <div className="
            w-7 h-7 sm:w-8 sm:h-8 rounded-full
            bg-white/[0.05]
            flex items-center justify-center
            group-hover:bg-elec-yellow group-hover:text-black
            transition-all duration-200
          ">
            <ChevronRight className="w-4 h-4 text-white/60 group-hover:text-black group-hover:translate-x-0.5 transition-all" />
          </div>
        </div>
      </div>

      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-elec-yellow/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </button>
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
      iconColor: "text-blue-400",
      iconBg: "bg-blue-500/10"
    },
    {
      title: "Electrical Hub",
      subtitle: "Tools",
      description: "Inspection tools, certificates, pricing, and AI assistants.",
      icon: <Zap className="h-5 w-5 sm:h-6 sm:w-6" />,
      path: "/electrician",
      iconColor: "text-elec-yellow",
      iconBg: "bg-elec-yellow/10"
    },
    {
      title: "Employer Hub",
      subtitle: "Manage",
      description: "Employees, jobs, timesheets, and business management.",
      icon: <Briefcase className="h-5 w-5 sm:h-6 sm:w-6" />,
      path: "/employer",
      iconColor: "text-purple-400",
      iconBg: "bg-purple-500/10"
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
