
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface MentalHealthCardProps {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
  type: string;
  link: string;
}

const MentalHealthCard = ({ 
  id, 
  title, 
  description, 
  icon: Icon, 
  type, 
  link 
}: MentalHealthCardProps) => {
  return (
    <Link 
      to={link} 
      key={id} 
      className="block transition-all hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow focus-visible:ring-offset-2 rounded-lg"
    >
      <Card className="border-elec-yellow/20 bg-elec-gray h-full hover:shadow-md hover:border-elec-yellow/30 transition-colors">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-base sm:text-xl">{title}</CardTitle>
            <span className="text-xs px-2 py-1 bg-elec-yellow/10 rounded-md text-elec-yellow">
              {type}
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">{description}</p>
          <div className="flex items-center justify-between">
            <Button className="text-sm" size="sm">Access Resource</Button>
            <Icon className="h-5 w-5 text-elec-yellow/80" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default MentalHealthCard;
