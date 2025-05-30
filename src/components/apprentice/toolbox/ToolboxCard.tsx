
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link, useLocation } from "react-router-dom";

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
      className={`border-elec-yellow/20 bg-elec-gray transition-colors h-full flex flex-col ${
        comingSoon ? 'opacity-60' : 'hover:bg-elec-gray/80 cursor-pointer'
      }`}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-md bg-elec-yellow/10">
            {icon}
          </div>
          <div className="flex-1">
            <CardTitle className="text-lg flex items-center gap-2">
              {title}
              {comingSoon && (
                <Badge variant="outline" className="text-xs border-orange-500 text-orange-400">
                  Coming Soon
                </Badge>
              )}
            </CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col flex-1 justify-between">
        {description && (
          <div className="text-sm text-muted-foreground mb-4">
            {description}
          </div>
        )}
        <Button 
          className="w-full mt-auto" 
          disabled={comingSoon}
          variant={comingSoon ? "outline" : "default"}
        >
          {comingSoon ? "Coming Soon" : (link ? "View Details" : `Open ${title}`)}
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
