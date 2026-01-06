import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";

interface ModuleCardProps {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
  href?: string;
}

export function ModuleCard({ number, title, description, icon: Icon, href }: ModuleCardProps) {
  const navigate = useNavigate();
  
  const CardContent = (
    <div className="p-6 h-full flex flex-col items-center text-center justify-start">
      <div className="mb-4 flex-shrink-0">
        <Icon className="h-8 w-8 text-elec-yellow" />
      </div>
      <h4 className="text-elec-yellow font-semibold text-base mb-2 flex-shrink-0">
        {number}
      </h4>
      <h3 className="text-elec-light font-semibold text-base mb-3 group-hover:text-elec-yellow transition-colors leading-tight flex-shrink-0">
        {title}
      </h3>
      <p className="text-white leading-relaxed text-sm line-clamp-4">
        {description}
      </p>
    </div>
  );

  const handleClick = () => {
    console.log(`ModuleCard clicked with href: ${href}`);
    if (href) {
      console.log(`Navigating to: ${href}`);
      navigate(href);
    } else {
      console.log("No href provided - card click ignored");
    }
  };

  if (href) {
    return (
      <Card
        className="group relative overflow-hidden hover:bg-[#222222] hover:border-elec-yellow/40 cursor-pointer h-[200px] flex flex-col active:scale-[0.98]"
        onClick={handleClick}
      >
        {CardContent}
      </Card>
    );
  }

  return (
    <Card
      className="group relative overflow-hidden hover:bg-[#222222] hover:border-elec-yellow/40 cursor-pointer h-[200px] flex flex-col active:scale-[0.98]"
      onClick={handleClick}
    >
      {CardContent}
    </Card>
  );
}