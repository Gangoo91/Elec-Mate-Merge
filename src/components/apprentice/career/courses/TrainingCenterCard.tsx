
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Building, BookOpen, CheckCircle } from "lucide-react";

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
    <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-elec-yellow/20 hover:border-elec-yellow/40 transition-all overflow-hidden relative">
      <div className="absolute top-0 right-0 w-48 h-48 bg-elec-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

      <CardHeader className="pb-2 relative">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
          <div>
            <CardTitle className="text-xl text-white flex items-center gap-2">
              <div className="p-2 rounded-lg bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30">
                <Building className="h-4 w-4 text-elec-yellow" />
              </div>
              {center.name}
            </CardTitle>
            <div className="flex items-center gap-1.5 text-sm mt-2 text-white/70">
              <MapPin className="h-3.5 w-3.5 text-elec-yellow" />
              <span>{center.location}</span>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="h-10 border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10 self-start touch-manipulation active:scale-95 transition-all"
            onClick={() => onViewDetails(center)}
          >
            View Center Details
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pt-3 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <h4 className="text-sm font-medium text-elec-yellow mb-3 flex items-center gap-2">
              <div className="p-1.5 rounded bg-elec-yellow/20">
                <BookOpen className="h-3.5 w-3.5" />
              </div>
              Available Courses
            </h4>
            <ul className="text-xs space-y-2">
              {center.courses.map((course, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-elec-yellow flex-shrink-0" />
                  <span className="text-white/80">{course}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <h4 className="text-sm font-medium text-elec-yellow mb-3 flex items-center gap-2">
              <div className="p-1.5 rounded bg-elec-yellow/20">
                <CheckCircle className="h-3.5 w-3.5" />
              </div>
              Facilities
            </h4>
            <ul className="text-xs space-y-2">
              {center.facilities.map((facility, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400 flex-shrink-0" />
                  <span className="text-white/80">{facility}</span>
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
