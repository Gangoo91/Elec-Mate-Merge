
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface ToolboxCardProps {
  title: string;
  icon: React.ReactNode;
  link?: string;
  onSelect?: () => void;
  description?: string;
}

const ToolboxCard = ({ title, icon, link, onSelect, description }: ToolboxCardProps) => {
  // If link is provided, render as a Link, otherwise as a button
  const cardContent = (
    <Card 
      className="border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/50 transition-all flex flex-col h-full cursor-pointer"
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col flex-1 justify-between">
        {description && (
          <div className="text-sm text-muted-foreground mb-4">
            {description}
          </div>
        )}
        <Button className="w-full mt-auto">
          {link ? "View Details" : `Open ${title}`}
        </Button>
      </CardContent>
    </Card>
  );

  if (link) {
    return (
      <Link to={link} className="block">
        {cardContent}
      </Link>
    );
  }

  return <div onClick={onSelect}>{cardContent}</div>;
};

export default ToolboxCard;
