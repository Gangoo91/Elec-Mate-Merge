
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Play } from "lucide-react";

interface CourseCardProps {
  id: number;
  title: string;
  progress?: number;
  students?: number;
  category: string;
  image: string;
}

const CourseCard = ({ id, title, progress, students, category, image }: CourseCardProps) => {
  return (
    <Card key={id} className="overflow-hidden border-elec-yellow/20 bg-elec-gray hover:bg-elec-gray/90 transition-all">
      <div className="aspect-video relative bg-elec-dark/30">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
        />
        <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 bg-elec-dark/80 text-xs px-2 py-1 rounded">
          {category}
        </div>
        {progress !== undefined && progress > 0 && (
          <div className="absolute bottom-0 left-0 w-full h-0.5 sm:h-1 bg-elec-dark/50">
            <div 
              className="h-full bg-elec-yellow" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}
      </div>
      <CardHeader className="pb-2 p-3 sm:p-4">
        <CardTitle className="text-base sm:text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-3 sm:p-4 pt-0">
        <div className="flex justify-between items-center">
          <div className="text-xs sm:text-sm text-muted-foreground">
            {progress !== undefined ? (
              <span>{progress}% complete</span>
            ) : (
              <span>{students} students</span>
            )}
          </div>
          <Button size="sm" variant="outline" className="gap-1 hover:bg-elec-yellow/10 text-xs sm:text-sm">
            <Play className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            Start
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
