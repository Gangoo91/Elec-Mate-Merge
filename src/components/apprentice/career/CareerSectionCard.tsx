
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Star } from "lucide-react";

interface CareerSectionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const CareerSectionCard = ({ title, description, icon, onClick }: CareerSectionCardProps) => {
  return (
    <Card 
      className="border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/50 hover:bg-elec-gray/80 transition-all duration-300 cursor-pointer h-full flex flex-col group"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg text-elec-yellow group-hover:text-elec-yellow/90 transition-colors">
              {title}
            </CardTitle>
          </div>
          <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-elec-yellow transition-colors" />
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col justify-between pt-0">
        <p className="text-sm text-elec-light/80 leading-relaxed mb-4">
          {description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="transition-transform group-hover:scale-110 duration-300">
            {icon}
          </div>
          
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="h-3 w-3 fill-current text-elec-yellow" />
            <span>Popular</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CareerSectionCard;
