import { LucideIcon, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface CourseCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href?: string;
  number?: string;
  comingSoon?: boolean;
}

export function CourseCard({ title, description, icon: Icon, href, number, comingSoon }: CourseCardProps) {
  const CardWrapper = ({ children }: { children: React.ReactNode }) => {
    if (href && !comingSoon) {
      return (
        <Link to={href} className="block h-full">
          {children}
        </Link>
      );
    }
    return <>{children}</>;
  };

  return (
    <CardWrapper>
      <Card
        className={cn(
          "group relative overflow-hidden transition-all duration-300 h-full min-h-[180px]",
          "bg-white/5 border-white/10",
          comingSoon
            ? "opacity-60 cursor-not-allowed"
            : "hover:bg-white/10 hover:border-white/20 active:scale-[0.98] cursor-pointer hover:shadow-lg hover:shadow-black/20"
        )}
      >
        {/* Accent line at top */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-elec-yellow/50 to-transparent" />

        {/* Hover glow effect */}
        {!comingSoon && (
          <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-br from-elec-yellow to-amber-500" />
        )}

        {/* Coming Soon badge */}
        {comingSoon && (
          <div className="absolute top-2 right-2 z-10">
            <Badge className="bg-white/10 text-white/60 border-white/20 text-[10px] px-1.5 py-0 h-4">
              Coming Soon
            </Badge>
          </div>
        )}

        <CardContent className="relative p-4 h-full flex flex-col">
          {/* Icon container */}
          <div className={cn(
            "p-2.5 rounded-xl mb-3 w-fit transition-colors bg-gradient-to-br border border-white/10",
            comingSoon
              ? "from-elec-yellow/5 to-amber-500/5"
              : "from-elec-yellow/20 to-amber-500/20 group-hover:from-elec-yellow/30 group-hover:to-amber-500/30"
          )}>
            <Icon className={cn(
              "h-5 w-5",
              comingSoon ? "text-elec-yellow/50" : "text-elec-yellow"
            )} />
          </div>

          {/* Module number */}
          {number && (
            <span className={cn(
              "text-xs font-semibold mb-1",
              comingSoon ? "text-elec-yellow/50" : "text-elec-yellow"
            )}>
              {number}
            </span>
          )}

          {/* Title */}
          <h3 className={cn(
            "font-semibold text-sm mb-2 leading-tight line-clamp-2 transition-colors",
            comingSoon
              ? "text-white/50"
              : "text-white group-hover:text-elec-yellow/90"
          )}>
            {title}
          </h3>

          {/* Description */}
          <p className={cn(
            "text-xs leading-relaxed line-clamp-2 flex-grow",
            comingSoon ? "text-white/30" : "text-white/50"
          )}>
            {description}
          </p>

          {/* Arrow indicator */}
          {!comingSoon && href && (
            <div className="mt-3 flex justify-end">
              <div className="p-1 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                <ChevronRight className="h-4 w-4 text-white/40 group-hover:text-elec-yellow transition-colors" />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </CardWrapper>
  );
}
