
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Users } from "lucide-react";

export interface CourseUnitProps {
  title: string;
  description: string;
  credits: number;
  level: string;
  code: string;
  year?: number;
}

const CourseUnit = ({ title, description, credits, level, code, year }: CourseUnitProps) => {
  return (
    <Card className="border-elec-yellow/20 bg-elec-gray hover:bg-elec-gray/90 transition-colors">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{title}</CardTitle>
          <span className="text-xs bg-elec-dark/80 px-2 py-1 rounded">{code}</span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <div className="flex flex-wrap items-center justify-between text-sm gap-2">
          <div className="flex items-center gap-1">
            <FileText className="h-4 w-4 text-elec-yellow" />
            <span>{credits} credits</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4 text-elec-yellow" />
            <span>Level {level}</span>
          </div>
          {year && (
            <div className="w-full text-xs mt-1 text-muted-foreground">
              Year {year}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseUnit;
