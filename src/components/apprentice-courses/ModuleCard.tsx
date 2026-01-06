import { LucideIcon, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ModuleCardProps {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
  href?: string;
  comingSoon?: boolean;
}

export function ModuleCard({ number, title, description, icon: Icon, href, comingSoon }: ModuleCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (comingSoon) return;
    if (href) {
      navigate(href);
    }
  };

  return (
    <Card
      className={cn(
        "group relative overflow-hidden transition-all duration-300 h-full min-h-[120px]",
        "bg-white/5 border-white/10",
        comingSoon
          ? "opacity-60 cursor-not-allowed"
          : "hover:bg-white/10 hover:border-white/20 active:scale-[0.98] cursor-pointer hover:shadow-lg hover:shadow-black/20"
      )}
      onClick={handleClick}
    >
      {/* Accent line at top */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

      {/* Hover glow effect */}
      {!comingSoon && (
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-br from-blue-500 to-purple-500" />
      )}

      <CardContent className="relative p-4 sm:p-5">
        <div className="flex items-start gap-4">
          {/* Icon container */}
          <div className={cn(
            "p-2.5 sm:p-3 rounded-xl flex-shrink-0 transition-colors bg-gradient-to-br border border-white/10",
            comingSoon
              ? "from-blue-500/5 to-purple-500/5"
              : "from-blue-500/20 to-purple-500/20 group-hover:from-blue-500/30 group-hover:to-purple-500/30"
          )}>
            <Icon className={cn(
              "h-5 w-5 sm:h-6 sm:w-6",
              comingSoon ? "text-blue-400/50" : "text-blue-400"
            )} />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              <span className={cn(
                "text-xs font-semibold",
                comingSoon ? "text-blue-400/50" : "text-blue-400"
              )}>
                {number}
              </span>
              {comingSoon && (
                <Badge className="bg-white/10 text-white/60 border-white/20 text-[10px] px-1.5 py-0 h-4">
                  Coming Soon
                </Badge>
              )}
            </div>
            <h3 className={cn(
              "font-semibold text-sm sm:text-base mb-1.5 leading-tight transition-colors",
              comingSoon
                ? "text-white/50"
                : "text-white group-hover:text-blue-100"
            )}>
              {title}
            </h3>
            <p className={cn(
              "text-xs sm:text-sm leading-relaxed line-clamp-2",
              comingSoon ? "text-white/30" : "text-white/50"
            )}>
              {description}
            </p>
          </div>

          {/* Arrow indicator */}
          {!comingSoon && (
            <div className="p-1.5 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors shrink-0 self-center">
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-white/40 group-hover:text-blue-400 transition-colors" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
