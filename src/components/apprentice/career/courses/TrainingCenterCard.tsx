
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

interface TrainingCenterCardProps {
  center: {
    id: number;
    name: string;
    location: string;
    address: string;
    contact: string;
    courses: string[];
    facilities: string[];
  };
  onViewDetails: (center: any) => void;
}

const TrainingCenterCard = ({ center, onViewDetails }: TrainingCenterCardProps) => {
  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader className="pb-2">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
          <div>
            <CardTitle className="text-xl">{center.name}</CardTitle>
            <div className="flex items-center gap-1.5 text-sm mt-1">
              <MapPin className="h-3.5 w-3.5 text-elec-yellow" />
              <span>{center.location}</span>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10 self-start"
            onClick={() => onViewDetails(center)}
          >
            View Center Details
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-elec-yellow mb-2">Available Courses:</h4>
            <ul className="text-xs grid gap-1.5">
              {center.courses.map((course, idx) => (
                <li key={idx} className="flex items-center gap-1">
                  <span className="h-1 w-1 rounded-full bg-elec-yellow"></span>
                  <span>{course}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium text-elec-yellow mb-2">Facilities:</h4>
            <ul className="text-xs grid gap-1.5">
              {center.facilities.map((facility, idx) => (
                <li key={idx} className="flex items-center gap-1">
                  <span className="h-1 w-1 rounded-full bg-elec-yellow"></span>
                  <span>{facility}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrainingCenterCard;
