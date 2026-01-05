import { LucideIcon, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";

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

  const CardContent = (
    <div className="p-4 sm:p-6 h-full flex flex-col items-center text-center justify-start relative">
      {comingSoon && (
        <span className="absolute top-2 right-2 bg-elec-yellow/20 text-elec-yellow text-xs px-2 py-1 rounded">
          Coming Soon
        </span>
      )}
      <div className="mb-3 sm:mb-4 flex-shrink-0">
        <Icon className={`h-7 w-7 sm:h-8 sm:w-8 ${comingSoon ? 'text-elec-yellow/50' : 'text-elec-yellow'}`} />
      </div>
      <h4 className={`font-semibold text-sm sm:text-base mb-1.5 sm:mb-2 flex-shrink-0 ${comingSoon ? 'text-elec-yellow/50' : 'text-elec-yellow'}`}>
        {number}
      </h4>
      <h3 className={`font-semibold text-sm sm:text-base mb-2 sm:mb-3 transition-colors leading-tight flex-shrink-0 ${comingSoon ? 'text-elec-light/50' : 'text-elec-light group-hover:text-elec-yellow group-active:text-elec-yellow'}`}>
        {title}
      </h3>
      <p className={`leading-relaxed text-xs sm:text-sm line-clamp-3 sm:line-clamp-4 ${comingSoon ? 'text-muted-foreground/50' : 'text-muted-foreground'}`}>
        {description}
      </p>
      {!comingSoon && (
        <ChevronRight className="absolute bottom-3 right-3 w-4 h-4 sm:w-5 sm:h-5 text-elec-yellow/40 group-hover:text-elec-yellow group-active:text-elec-yellow transition-colors" />
      )}
    </div>
  );

  const handleClick = () => {
    if (comingSoon) return;
    if (href) {
      navigate(href);
    }
  };

  return (
    <Card
      className={`group relative overflow-hidden bg-elec-card border border-elec-yellow/20 transition-all duration-200 min-h-[180px] sm:min-h-[200px] flex flex-col ${comingSoon ? 'opacity-75 cursor-not-allowed' : 'hover:border-elec-yellow/40 active:border-elec-yellow/60 active:bg-elec-card/80 cursor-pointer touch-manipulation'}`}
      onClick={handleClick}
    >
      {CardContent}
    </Card>
  );
}
