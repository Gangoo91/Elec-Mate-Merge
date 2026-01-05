import { LucideIcon, ChevronRight } from "lucide-react";
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
    <div className="p-3 sm:p-4 h-full flex flex-col items-center text-center justify-start relative">
      {comingSoon && (
        <div className="absolute top-2 right-2 z-10">
          <span className="bg-primary text-primary-foreground text-[9px] sm:text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full">
            Soon
          </span>
        </div>
      )}
      <div className={`mb-2 sm:mb-3 flex-shrink-0 ${comingSoon ? 'opacity-50' : ''}`}>
        <div className="p-2 sm:p-2.5 rounded-lg bg-primary/10">
          <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" strokeWidth={2} />
        </div>
      </div>
      {number && (
        <h4 className={`text-primary font-semibold text-xs sm:text-sm mb-1 flex-shrink-0 ${comingSoon ? 'opacity-50' : ''}`}>
          {number}
        </h4>
      )}
      <h3 className={`text-foreground font-semibold text-sm sm:text-base mb-1.5 sm:mb-2 leading-tight flex-shrink-0 line-clamp-2 ${comingSoon ? 'opacity-50' : ''}`}>
        {title}
      </h3>
      <p className={`text-muted-foreground leading-relaxed text-[10px] sm:text-xs line-clamp-2 ${comingSoon ? 'opacity-50' : ''}`}>
        {description}
      </p>
      {!comingSoon && href && (
        <ChevronRight className="absolute bottom-2 right-2 w-4 h-4 text-primary/50" />
      )}
    </div>
  );

  if (href && !comingSoon) {
    return (
      <Link to={href} className="block h-full">
        <div className="group relative overflow-hidden bg-card/50 rounded-lg active:scale-[0.98] active:bg-card/70 transition-all duration-200 cursor-pointer min-h-[140px] sm:min-h-[160px] flex flex-col touch-manipulation">
          {CardContent}
        </div>
      </Link>
    );
  }

  return (
    <div className={`group relative overflow-hidden bg-card/30 rounded-lg transition-all duration-200 min-h-[140px] sm:min-h-[160px] flex flex-col ${comingSoon ? 'cursor-not-allowed' : 'cursor-pointer touch-manipulation'}`}>
      {CardContent}
    </div>
  );
}