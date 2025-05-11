
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface TheoryUnitCardProps {
  sectionNumber: string;
  title: string;
  description: string;
  icon: LucideIcon;
  courseSlug?: string;
  unitCode?: string;
  onResourceClick?: (type: string) => void;
}

const TheoryUnitCard = ({
  sectionNumber,
  title,
  description,
  icon: Icon,
  courseSlug,
  unitCode,
  onResourceClick
}: TheoryUnitCardProps) => {
  return (
    <Link 
      to={`/apprentice/study/eal/${courseSlug}/unit/${unitCode}/section/${sectionNumber}`}
      onClick={() => onResourceClick && onResourceClick("section")}
    >
      <Card className="border-elec-yellow/20 bg-elec-gray p-6 hover:bg-elec-gray/90 transition-all duration-300 h-full">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-elec-yellow/10 flex items-center justify-center">
              <Icon className="h-6 w-6 text-elec-yellow" />
            </div>
            <CardTitle className="text-lg">{sectionNumber}. {title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-elec-light/80">
            {description}
          </CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
};

export default TheoryUnitCard;
