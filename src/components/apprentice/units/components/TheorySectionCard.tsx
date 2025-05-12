
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

interface TheorySectionCardProps {
  sectionNumber: string | number;
  title: string;
  description: string;
  courseSlug: string;
  unitCode: string;
  onClick: () => void;
}

const TheorySectionCard = ({ 
  sectionNumber, 
  title, 
  description, 
  courseSlug, 
  unitCode,
  onClick 
}: TheorySectionCardProps) => {
  const unitCodeFormatted = unitCode.toLowerCase().replace('/', '-');
  
  return (
    <Link
      to={`/apprentice/study/eal/${courseSlug}/unit/${unitCodeFormatted}/section/${sectionNumber}`}
      onClick={onClick}
      className="block transition-transform hover:scale-102 duration-200 h-full"
    >
      <Card className="border-elec-yellow/30 bg-gradient-to-b from-elec-gray to-elec-gray/80 hover:from-elec-gray/90 hover:to-elec-gray/70 transition-all duration-300 cursor-pointer shadow-lg shadow-black/20 h-full">
        <CardContent className="p-6 h-full">
          <div className="flex flex-col space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-elec-yellow flex items-center justify-center">
                <span className="text-elec-dark font-bold text-lg">{sectionNumber}</span>
              </div>
              <h3 className="text-lg font-medium">{title}</h3>
            </div>
            <p className="text-sm text-muted-foreground pl-[52px]">
              {description}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default TheorySectionCard;
