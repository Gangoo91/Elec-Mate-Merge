
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Star, Calendar, MapPin, Users, BookOpen, PoundSterling } from "lucide-react";

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
    <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-elec-yellow/20 hover:border-elec-yellow/40 h-full flex flex-col overflow-hidden relative transition-all">
      <div className="absolute top-0 right-0 w-32 h-32 bg-elec-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <CardHeader className="pb-2 relative">
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-lg text-white">{course.title}</CardTitle>
          <div className="flex items-center gap-1 bg-amber-500/20 text-amber-400 px-2.5 py-1 rounded-lg text-xs border border-amber-500/30">
            <Star className="h-3 w-3 fill-amber-400" />
            <span className="font-medium">{course.rating}</span>
          </div>
        </div>
        <p className="text-sm text-elec-yellow">{course.provider}</p>
      </CardHeader>
      <CardContent className="pt-2 flex-grow flex flex-col relative">
        <p className="text-sm text-white/70 mb-4 line-clamp-2">{course.description}</p>

        <div className="mt-auto space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5">
              <Clock className="h-3.5 w-3.5 text-elec-yellow" />
              <span className="text-xs text-white/70">{course.duration}</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5">
              <Users className="h-3.5 w-3.5 text-elec-yellow" />
              <span className="text-xs text-white/70">{course.level}</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5 col-span-2">
              <BookOpen className="h-3.5 w-3.5 text-elec-yellow" />
              <span className="text-xs text-white/70">{course.format}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-white/60">
            <MapPin className="h-3.5 w-3.5 text-elec-yellow flex-shrink-0" />
            <span className="line-clamp-1">
              {course.locations.slice(0, 3).join(", ")}
              {course.locations.length > 3 ? `, +${course.locations.length - 3}` : ""}
            </span>
          </div>

          <div className="border-t border-white/10 pt-3 space-y-3">
            <div className="flex items-center gap-2 text-xs text-elec-yellow">
              <Calendar className="h-3.5 w-3.5" />
              <span>Upcoming Dates:</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {course.nextDates.map((date, idx) => (
                <Badge
                  key={idx}
                  variant="outline"
                  className="text-[10px] bg-white/5 text-white/70 border-white/20"
                >
                  {date}
                </Badge>
              ))}
            </div>
            <div className="flex justify-between items-center pt-2">
              <div className="flex items-center gap-1 text-xs text-green-400">
                <PoundSterling className="h-3.5 w-3.5" />
                <span className="font-medium">{course.price}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="h-9 border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10 touch-manipulation active:scale-95 transition-all"
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
