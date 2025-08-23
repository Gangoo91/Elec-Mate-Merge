import { Card, CardHeader, CardTitle } from "@/components/ui/card";

interface SimpleCareerCardProps {
  title: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const SimpleCareerCard = ({ title, icon, onClick }: SimpleCareerCardProps) => {
  return (
    <Card 
      className="border-elec-yellow/20 bg-elec-gray h-full hover:bg-elec-gray/90 transition-colors duration-200 cursor-pointer hover-scale"
      onClick={onClick}
    >
      <CardHeader className="flex flex-col items-center justify-center text-center py-4 sm:py-6 md:py-8">
        <div className="mb-2 sm:mb-3">
          {icon}
        </div>
        <CardTitle className="text-sm sm:text-base md:text-lg leading-tight px-2">{title}</CardTitle>
      </CardHeader>
    </Card>
  );
};

export default SimpleCareerCard;