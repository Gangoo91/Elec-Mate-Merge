import { LucideIcon, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface CourseCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href?: string;
  number?: string;
  comingSoon?: boolean;
}

export function CourseCard({ title, description, icon: Icon, href, number, comingSoon }: CourseCardProps) {
  const CardContent = (
    <div className="p-4 sm:p-6 h-full flex flex-col items-center text-center justify-start relative">
      {comingSoon && (
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10">
          <span className="bg-elec-yellow text-elec-dark text-[10px] sm:text-xs font-semibold uppercase tracking-wide px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
            Coming Soon
          </span>
        </div>
      )}
      <div className={`mb-3 sm:mb-4 flex-shrink-0 ${comingSoon ? 'opacity-70' : ''}`}>
        <Icon className="h-7 w-7 sm:h-8 sm:w-8 text-elec-yellow" />
      </div>
      {number && (
        <h4 className={`text-elec-yellow font-semibold text-sm sm:text-base mb-1.5 sm:mb-2 flex-shrink-0 ${comingSoon ? 'opacity-70' : ''}`}>
          {number}
        </h4>
      )}
      <h3 className={`text-elec-light font-semibold text-sm sm:text-base mb-2 sm:mb-3 group-hover:text-elec-yellow group-active:text-elec-yellow transition-colors leading-tight flex-shrink-0 ${comingSoon ? 'opacity-70' : ''}`}>
        {title}
      </h3>
      <p className={`text-muted-foreground leading-relaxed text-xs sm:text-sm line-clamp-3 sm:line-clamp-4 ${comingSoon ? 'opacity-70' : ''}`}>
        {description}
      </p>
      {!comingSoon && href && (
        <ChevronRight className="absolute bottom-3 right-3 w-4 h-4 sm:w-5 sm:h-5 text-elec-yellow/40 group-hover:text-elec-yellow group-active:text-elec-yellow transition-colors" />
      )}
    </div>
  );

  if (href && !comingSoon) {
    return (
      <Link to={href} className="block h-full">
        <Card className="group relative overflow-hidden bg-elec-card border border-elec-yellow/20 hover:border-elec-yellow/40 active:border-elec-yellow/60 active:bg-elec-card/80 transition-all duration-200 cursor-pointer min-h-[180px] sm:min-h-[200px] flex flex-col touch-manipulation">
          {CardContent}
        </Card>
      </Link>
    );
  }

  return (
    <Card className={`group relative overflow-hidden bg-elec-card border border-elec-yellow/20 transition-all duration-200 min-h-[180px] sm:min-h-[200px] flex flex-col ${comingSoon ? 'cursor-not-allowed' : 'hover:border-elec-yellow/40 cursor-pointer touch-manipulation'}`}>
      {CardContent}
    </Card>
  );
}