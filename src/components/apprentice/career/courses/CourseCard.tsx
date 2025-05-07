
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Star, Calendar, MapPin, Users, BookOpen } from "lucide-react";

interface CourseCardProps {
  course: {
    id: number;
    title: string;
    provider: string;
    description: string;
    duration: string;
    level: string;
    price: string;
    format: string;
    nextDates: string[];
    rating: number;
    locations: string[];
  };
  onViewDetails: (course: any) => void;
}

const CourseCard = ({ course, onViewDetails }: CourseCardProps) => {
  return (
    <Card className="border-elec-yellow/20 bg-elec-gray h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{course.title}</CardTitle>
          <div className="flex items-center gap-1 bg-amber-400/20 text-amber-400 px-2 py-1 rounded text-xs">
            <Star className="h-3 w-3 fill-amber-400" />
            <span>{course.rating}</span>
          </div>
        </div>
        <p className="text-sm text-amber-400">Provider: {course.provider}</p>
      </CardHeader>
      <CardContent className="pt-2 flex-grow flex flex-col">
        <p className="text-sm mb-4">{course.description}</p>
        
        <div className="mt-auto space-y-4">
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-center gap-2">
              <Clock className="h-3.5 w-3.5 text-elec-yellow" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-3.5 w-3.5 text-elec-yellow" />
              <span>{course.level}</span>
            </div>
            <div className="flex items-center gap-2 col-span-2">
              <BookOpen className="h-3.5 w-3.5 text-elec-yellow" />
              <span>{course.format}</span>
            </div>
            <div className="flex items-center gap-2 col-span-2">
              <MapPin className="h-3.5 w-3.5 text-elec-yellow" />
              <span>
                {course.locations.slice(0, 3).join(", ")}
                {course.locations.length > 3 ? ", +" + (course.locations.length - 3) : ""}
              </span>
            </div>
          </div>
          
          <div className="border-t border-elec-yellow/10 pt-3 space-y-2">
            <p className="text-xs text-elec-yellow flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              <span>Upcoming Dates:</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {course.nextDates.map((date, idx) => (
                <span 
                  key={idx} 
                  className="text-xs bg-elec-dark/60 px-2 py-1 rounded-md"
                >
                  {date}
                </span>
              ))}
            </div>
            <div className="flex justify-between items-center mt-3">
              <p className="text-xs text-amber-400/80">
                Price range: {course.price}
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
                onClick={() => onViewDetails(course)}
              >
                View Details
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
