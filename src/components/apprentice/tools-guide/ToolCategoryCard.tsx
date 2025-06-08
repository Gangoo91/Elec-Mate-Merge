
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface ToolCategoryCardProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  link: string;
  itemCount: number;
}

const ToolCategoryCard = ({ title, icon, description, link, itemCount }: ToolCategoryCardProps) => {
  return (
    <Card className="border-elec-yellow/20 bg-elec-gray/50 backdrop-blur hover:border-elec-yellow/50 transition-all duration-300 hover:shadow-lg group h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-3 text-elec-yellow group-hover:text-elec-yellow/90 transition-colors">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 flex flex-col h-full">
        <p className="text-sm text-muted-foreground leading-relaxed flex-1">
          {description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-xs text-elec-yellow/70">
            {itemCount} essential items
          </span>
          <Button 
            asChild 
            variant="outline" 
            size="sm"
            className="bg-elec-yellow/10 border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow hover:text-black transition-all duration-300"
          >
            <Link to={link} className="flex items-center gap-2">
              View Details
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ToolCategoryCard;
