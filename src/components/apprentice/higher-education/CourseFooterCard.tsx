
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CourseFooterCardProps {
  title: string;
  description: string;
  buttonText: string;
}

const CourseFooterCard = ({ title, description, buttonText }: CourseFooterCardProps) => {
  return (
    <Card className="border-elec-yellow/20 bg-elec-gray/50 p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <Button>{buttonText}</Button>
      </div>
    </Card>
  );
};

export default CourseFooterCard;
