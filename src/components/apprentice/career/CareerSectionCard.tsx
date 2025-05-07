
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface CareerSectionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const CareerSectionCard = ({ title, description, icon, onClick }: CareerSectionCardProps) => {
  return (
    <Card 
      className="border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/50 transition-all duration-200 cursor-pointer h-full flex flex-col"
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-xl text-elec-yellow">{title}</CardTitle>
        <CardDescription className="text-elec-light/70">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center py-6 mt-auto">
        <div className="transition-transform hover:scale-110">
          {icon}
        </div>
      </CardContent>
    </Card>
  );
};

export default CareerSectionCard;
