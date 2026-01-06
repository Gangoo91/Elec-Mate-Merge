import { LucideIcon, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

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
      className={`group relative overflow-hidden border border-white/10 bg-transparent transition-all duration-200 ${
        comingSoon
          ? 'opacity-60 cursor-not-allowed'
          : 'hover:bg-white/5 hover:border-elec-yellow/40 active:scale-[0.98] cursor-pointer touch-manipulation'
      }`}
      onClick={handleClick}
    >
      <CardContent className="p-4 sm:p-5">
        <div className="flex items-start gap-4">
          {/* Icon container */}
          <div className={`p-2.5 sm:p-3 rounded-xl flex-shrink-0 transition-colors ${
            comingSoon
              ? 'bg-elec-yellow/5'
              : 'bg-elec-yellow/10 group-hover:bg-elec-yellow/20'
          }`}>
            <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${
              comingSoon ? 'text-elec-yellow/50' : 'text-elec-yellow'
            }`} />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-xs font-medium ${
                comingSoon ? 'text-elec-yellow/50' : 'text-elec-yellow'
              }`}>
                {number}
              </span>
              {comingSoon && (
                <Badge className="bg-white/10 text-white/60 border-white/20 text-[10px] px-1.5 py-0 h-4">
                  Coming Soon
                </Badge>
              )}
            </div>
            <h3 className={`font-semibold text-sm sm:text-base mb-1.5 leading-tight transition-colors ${
              comingSoon
                ? 'text-foreground/50'
                : 'text-foreground group-hover:text-elec-yellow'
            }`}>
              {title}
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed line-clamp-2 ${
              comingSoon ? 'text-muted-foreground/50' : 'text-muted-foreground'
            }`}>
              {description}
            </p>
          </div>

          {/* Arrow indicator */}
          {!comingSoon && (
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground/40 group-hover:text-elec-yellow/70 transition-colors mt-1 flex-shrink-0" />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
