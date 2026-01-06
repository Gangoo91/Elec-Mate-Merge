import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, CheckCircle2, Clock, ChevronRight, Award } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModuleCardProps {
  title: string;
  description?: string;
  category?: string;
  duration?: string;
  progress?: number;
  completed?: boolean;
  lessonsCount?: number;
  questionsCount?: number;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
}

// Get category-based colors
const getCategoryColors = (category?: string) => {
  switch (category) {
    case "Level 2":
      return {
        accent: "from-blue-500 to-cyan-500",
        accentLine: "from-transparent via-blue-500/50 to-transparent",
        badge: "bg-blue-500/20 text-blue-300 border-blue-500/30",
        iconBg: "from-blue-500/20 to-cyan-500/20",
        progress: "from-blue-500 to-cyan-500"
      };
    case "Level 3":
      return {
        accent: "from-cyan-500 to-teal-500",
        accentLine: "from-transparent via-cyan-500/50 to-transparent",
        badge: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
        iconBg: "from-cyan-500/20 to-teal-500/20",
        progress: "from-cyan-500 to-teal-500"
      };
    case "AM2":
      return {
        accent: "from-elec-yellow to-amber-500",
        accentLine: "from-transparent via-elec-yellow/50 to-transparent",
        badge: "bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30",
        iconBg: "from-elec-yellow/20 to-amber-500/20",
        progress: "from-elec-yellow to-amber-500"
      };
    case "Mock Exams":
      return {
        accent: "from-green-500 to-emerald-500",
        accentLine: "from-transparent via-green-500/50 to-transparent",
        badge: "bg-green-500/20 text-green-300 border-green-500/30",
        iconBg: "from-green-500/20 to-emerald-500/20",
        progress: "from-green-500 to-emerald-500"
      };
    default:
      return {
        accent: "from-purple-500 to-pink-500",
        accentLine: "from-transparent via-purple-500/50 to-transparent",
        badge: "bg-purple-500/20 text-purple-300 border-purple-500/30",
        iconBg: "from-purple-500/20 to-pink-500/20",
        progress: "from-purple-500 to-pink-500"
      };
  }
};

export function ModuleCard({
  title,
  description,
  category,
  duration,
  progress = 0,
  completed = false,
  lessonsCount,
  questionsCount,
  onClick,
  className,
  icon
}: ModuleCardProps) {
  const isInProgress = progress > 0 && progress < 100;
  const colors = getCategoryColors(category);

  return (
    <Card
      className={cn(
        "group relative overflow-hidden cursor-pointer transition-all duration-300 active:scale-[0.98] h-full min-h-[180px]",
        "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20",
        "hover:shadow-lg hover:shadow-black/20",
        className
      )}
      onClick={onClick}
    >
      {/* Accent line at top */}
      <div className={cn("absolute inset-x-0 top-0 h-px bg-gradient-to-r", colors.accentLine)} />

      {/* Hover glow effect */}
      <div className={cn(
        "absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500",
        `bg-gradient-to-br ${colors.accent}`
      )} />

      <CardContent className="relative p-4 space-y-3">
        {/* Header - Icon, Title & Category */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-1.5">
              {/* Icon container */}
              <div className={cn(
                "p-1.5 rounded-lg bg-gradient-to-br border border-white/10",
                colors.iconBg
              )}>
                {icon || <BookOpen className="h-4 w-4 text-white/70" />}
              </div>
              {category && (
                <Badge
                  variant="outline"
                  className={cn("text-[10px] font-semibold border", colors.badge)}
                >
                  {category}
                </Badge>
              )}
            </div>
            <h3 className="font-semibold text-white text-sm leading-tight line-clamp-2 group-hover:text-white/90 transition-colors">
              {title}
            </h3>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            {completed ? (
              <div className="p-1.5 rounded-full bg-green-500/20">
                <CheckCircle2 className="h-4 w-4 text-green-400" />
              </div>
            ) : (
              <div className="p-1.5 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                <ChevronRight className="h-4 w-4 text-white/40 group-hover:text-white/60 transition-colors" />
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        {description && (
          <p className="text-xs text-white/50 line-clamp-2 leading-relaxed">
            {description}
          </p>
        )}

        {/* Progress Bar (if started) */}
        {isInProgress && (
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="text-white/40">Progress</span>
              <span className="font-bold text-white">{progress}%</span>
            </div>
            <div className="relative h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
              <div
                className={cn("h-full rounded-full transition-all duration-300 bg-gradient-to-r", colors.progress)}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Footer - Metadata */}
        <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
          <div className="flex items-center gap-3 text-white/40">
            {duration && (
              <div className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 shrink-0" />
                <span>{duration}</span>
              </div>
            )}
            {lessonsCount !== undefined && (
              <div className="flex items-center gap-1">
                <BookOpen className="h-3.5 w-3.5 shrink-0" />
                <span>{lessonsCount}</span>
              </div>
            )}
          </div>

          {questionsCount !== undefined && (
            <div className={cn(
              "flex items-center gap-1 font-bold",
              category === "AM2" ? "text-elec-yellow" : "text-blue-400"
            )}>
              <Award className="h-3.5 w-3.5" />
              <span>{questionsCount} Q</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
