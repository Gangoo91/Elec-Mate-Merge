import { Card, CardHeader, CardTitle } from "@/components/ui/card";

interface SimpleCareerCardProps {
  title: string;
  icon: React.ReactNode;
  onClick: () => void;
  showComingSoon?: boolean;
}

const SimpleCareerCard = ({ title, icon, onClick, showComingSoon }: SimpleCareerCardProps) => {
  return (
    <Card 
      className="relative border-elec-yellow/20 bg-elec-gray h-full hover:bg-elec-gray/90 transition-colors duration-200 cursor-pointer hover-scale overflow-hidden"
      onClick={onClick}
    >
      {showComingSoon && (
        <div className="absolute top-0 right-0 overflow-hidden w-32 h-32 pointer-events-none z-10">
          <div className="absolute top-6 right-[-32px] w-40 bg-gradient-to-br from-amber-500 to-yellow-600 text-black text-xs font-bold py-1 text-center transform rotate-45 shadow-lg">
            Coming Soon
          </div>
        </div>
      )}
      <CardHeader className="flex flex-col items-center justify-center text-center py-6 md:py-8">
        <div className="mb-3">
          {icon}
        </div>
        <CardTitle className="text-base sm:text-lg leading-tight">{title}</CardTitle>
      </CardHeader>
    </Card>
  );
};

export default SimpleCareerCard;