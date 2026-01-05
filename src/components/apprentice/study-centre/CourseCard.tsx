import { LucideIcon } from "lucide-react";
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
    <div className="p-6 h-full flex flex-col items-center text-center justify-start">
      {comingSoon && (
        <div className="absolute top-3 right-3 z-10">
          <span className="bg-elec-yellow text-elec-dark text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full">
            Coming Soon
          </span>
        </div>
      )}
      <div className={`mb-4 flex-shrink-0 ${comingSoon ? 'opacity-70' : ''}`}>
        <Icon className="h-8 w-8 text-elec-yellow" />
      </div>
      {number && (
        <h4 className={`text-elec-yellow font-semibold text-base mb-2 flex-shrink-0 ${comingSoon ? 'opacity-70' : ''}`}>
          {number}
        </h4>
      )}
      <h3 className={`text-elec-light font-semibold text-base mb-3 group-hover:text-elec-yellow transition-colors leading-tight flex-shrink-0 ${comingSoon ? 'opacity-70' : ''}`}>
        {title}
      </h3>
      <p className={`text-muted-foreground leading-relaxed text-sm line-clamp-4 ${comingSoon ? 'opacity-70' : ''}`}>
        {description}
      </p>
    </div>
  );

  if (href && !comingSoon) {
    return (
      <Link to={href} className="block h-full">
        <Card className="group relative overflow-hidden hover:bg-[#222222] hover:border-elec-yellow/40 cursor-pointer h-[200px] flex flex-col active:scale-[0.98]">
          {CardContent}
        </Card>
      </Link>
    );
  }

  return (
    <Card className={`group relative overflow-hidden h-[200px] flex flex-col ${comingSoon ? 'cursor-not-allowed opacity-80' : 'hover:bg-[#222222] hover:border-elec-yellow/40 cursor-pointer active:scale-[0.98]'}`}>
      {CardContent}
    </Card>
  );
}