import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Sparkles } from "lucide-react";

interface SimpleCareerCardProps {
  title: string;
  description?: string;
  icon: React.ReactNode;
  onClick: () => void;
  showComingSoon?: boolean;
  stats?: {
    label: string;
    value: string;
  }[];
  badge?: string;
  accentColor?: "yellow" | "green" | "blue" | "purple" | "orange";
}

const SimpleCareerCard = ({
  title,
  description,
  icon,
  onClick,
  showComingSoon,
  stats,
  badge,
  accentColor = "yellow"
}: SimpleCareerCardProps) => {
  const colorMap = {
    yellow: {
      border: "border-elec-yellow/30 hover:border-elec-yellow/60",
      bg: "bg-gradient-to-br from-elec-gray to-elec-dark/50",
      badge: "bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30",
      icon: "text-elec-yellow",
      glow: "group-hover:shadow-elec-yellow/20"
    },
    green: {
      border: "border-green-500/30 hover:border-green-500/60",
      bg: "bg-gradient-to-br from-elec-gray to-green-950/20",
      badge: "bg-green-500/20 text-green-400 border-green-500/30",
      icon: "text-green-400",
      glow: "group-hover:shadow-green-500/20"
    },
    blue: {
      border: "border-blue-500/30 hover:border-blue-500/60",
      bg: "bg-gradient-to-br from-elec-gray to-blue-950/20",
      badge: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      icon: "text-blue-400",
      glow: "group-hover:shadow-blue-500/20"
    },
    purple: {
      border: "border-purple-500/30 hover:border-purple-500/60",
      bg: "bg-gradient-to-br from-elec-gray to-purple-950/20",
      badge: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      icon: "text-purple-400",
      glow: "group-hover:shadow-purple-500/20"
    },
    orange: {
      border: "border-orange-500/30 hover:border-orange-500/60",
      bg: "bg-gradient-to-br from-elec-gray to-orange-950/20",
      badge: "bg-orange-500/20 text-orange-400 border-orange-500/30",
      icon: "text-orange-400",
      glow: "group-hover:shadow-orange-500/20"
    }
  };

  const colors = colorMap[accentColor];

  return (
    <Card
      className={`group relative ${colors.border} ${colors.bg} h-full transition-all duration-300 cursor-pointer overflow-hidden hover:shadow-lg ${colors.glow} hover:-translate-y-1`}
      onClick={onClick}
    >
      {/* Coming Soon Ribbon */}
      {showComingSoon && (
        <div className="absolute top-0 right-0 overflow-hidden w-28 h-28 pointer-events-none z-10">
          <div className="absolute top-5 right-[-28px] w-36 bg-gradient-to-r from-amber-500 to-yellow-500 text-black text-[10px] font-bold py-1 text-center transform rotate-45 shadow-lg flex items-center justify-center gap-1">
            <Sparkles className="h-3 w-3" />
            Coming Soon
          </div>
        </div>
      )}

      {/* Badge */}
      {badge && !showComingSoon && (
        <div className="absolute top-3 right-3 z-10">
          <Badge variant="outline" className={`${colors.badge} text-[10px] font-medium`}>
            {badge}
          </Badge>
        </div>
      )}

      <CardHeader className="flex flex-col items-center justify-center text-center pt-6 pb-3">
        {/* Icon Container */}
        <div className={`relative mb-4 p-4 rounded-2xl bg-white/10 border border-white/5 group-hover:scale-110 transition-transform duration-300`}>
          <div className={colors.icon}>
            {icon}
          </div>
          {/* Subtle glow effect */}
          <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
        </div>

        <CardTitle className="text-base sm:text-lg font-semibold leading-tight text-white group-hover:text-elec-yellow transition-colors duration-300">
          {title}
        </CardTitle>
      </CardHeader>

      {(description || stats) && (
        <CardContent className="pt-0 pb-4 px-4">
          {description && (
            <p className="text-xs sm:text-sm text-white text-center mb-3 line-clamp-2">
              {description}
            </p>
          )}

          {stats && stats.length > 0 && (
            <div className={`grid ${stats.length === 1 ? 'grid-cols-1' : 'grid-cols-2'} gap-2 mt-3`}>
              {stats.map((stat, index) => (
                <div key={index} className="bg-white/10 rounded-lg p-2 text-center">
                  <div className={`text-sm font-bold ${colors.icon}`}>{stat.value}</div>
                  <div className="text-[10px] text-white">{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      )}

      {/* Explore indicator */}
      <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className={`flex items-center gap-1 text-xs ${colors.icon}`}>
          <span>Explore</span>
          <ChevronRight className="h-3 w-3" />
        </div>
      </div>

      {/* Bottom accent line */}
      <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-current to-transparent ${colors.icon} opacity-0 group-hover:opacity-50 transition-opacity duration-300`} />
    </Card>
  );
};

export default SimpleCareerCard;
