
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link, useLocation } from "react-router-dom";
import { Clock } from "lucide-react";

interface ToolboxCardProps {
  title: string;
  icon: React.ReactNode;
  link?: string;
  onSelect?: () => void;
  description?: string;
  comingSoon?: boolean;
}

const ToolboxCard = ({ title, icon, link, onSelect, description, comingSoon }: ToolboxCardProps) => {
  // Get current location to check if router is available
  const location = useLocation();
  
  // Create the card content
  const cardContent = (
    <Card 
      className={`border-elec-yellow/20 bg-elec-gray transition-all duration-300 h-full flex flex-col relative overflow-hidden ${
        comingSoon 
          ? 'opacity-80 border-amber-500/30' 
          : 'hover:bg-elec-gray/80 cursor-pointer hover:scale-102'
      }`}
    >
      {comingSoon && (
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-orange-500/5 pointer-events-none" />
      )}
      <CardHeader className="pb-2 relative z-10">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-md transition-colors ${
            comingSoon ? 'bg-amber-500/20' : 'bg-elec-yellow/10'
          }`}>
            {icon}
          </div>
          <div className="flex-1">
            <CardTitle className="text-lg flex items-center gap-2 flex-wrap">
              {title}
              {comingSoon && (
                <Badge 
                  variant="outline" 
                  className="text-xs border-amber-500/60 text-amber-400 bg-amber-500/10 animate-pulse flex items-center gap-1"
                >
                  <Clock className="h-3 w-3" />
                  Coming Soon
                </Badge>
              )}
            </CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col flex-1 justify-between relative z-10">
        {description && (
          <div className={`text-sm mb-4 ${
            comingSoon ? 'text-muted-foreground/70' : 'text-muted-foreground'
          }`}>
            {description}
          </div>
        )}
        <Button 
          className={`w-full mt-auto transition-all duration-300 ${
            comingSoon 
              ? 'bg-amber-600/20 border-amber-500/40 text-amber-300 hover:bg-amber-600/20 cursor-not-allowed' 
              : ''
          }`}
          disabled={comingSoon}
          variant={comingSoon ? "outline" : "default"}
        >
          {comingSoon ? (
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4 animate-spin" />
              Coming Soon
            </span>
          ) : (
            link ? "View Details" : `Open ${title}`
          )}
        </Button>
      </CardContent>
    </Card>
  );

  // If coming soon, render as disabled div
  if (comingSoon) {
    return <div className="h-full">{cardContent}</div>;
  }

  // If link is provided, render as a Link, otherwise as a button
  if (link) {
    return (
      <Link to={link} className="block h-full">
        {cardContent}
      </Link>
    );
  }

  return <div onClick={onSelect} className="h-full">{cardContent}</div>;
};

export default ToolboxCard;
