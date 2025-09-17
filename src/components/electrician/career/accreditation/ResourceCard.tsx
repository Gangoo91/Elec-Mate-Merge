import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface ResourceCardProps {
  title: string;
  description: string;
  url: string;
  isMobile?: boolean;
}

const ResourceCard = ({ title, description, url, isMobile = false }: ResourceCardProps) => {
  const handleClick = () => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex items-center justify-between p-4 rounded-lg bg-elec-grey/50 border border-elec-yellow/10 hover:border-elec-yellow/30 transition-all duration-200 hover:shadow-lg hover:shadow-elec-yellow/10 h-full">
      <div className="flex-1 min-w-0">
        <p className="font-medium text-white leading-tight mb-2">{title}</p>
        <p className="text-sm text-white/80 leading-relaxed">{description}</p>
      </div>
      <Button 
        variant="ghost" 
        size={isMobile ? "sm" : "default"}
        className="ml-4 flex-shrink-0 text-elec-yellow hover:text-white hover:bg-elec-yellow/20 transition-colors"
        onClick={handleClick}
        aria-label={`Visit ${title} website`}
      >
        <ExternalLink className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />
      </Button>
    </div>
  );
};

export default ResourceCard;