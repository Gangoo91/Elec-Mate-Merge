
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface ToolboxCardProps {
  title: string;
  icon: React.ReactNode;
  link?: string;
  onSelect?: () => void;
  description?: string;
}

const ToolboxCard = ({ title, icon, link, onSelect, description }: ToolboxCardProps) => {
  // Create the card content
  const cardContent = (
    <Card 
      className="border-elec-yellow/20 bg-elec-gray hover:bg-elec-gray/80 transition-colors cursor-pointer h-full flex flex-col"
    >
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-md bg-elec-yellow/10">
            {icon}
          </div>
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
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
