
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useIsMobile } from "@/hooks/use-mobile";

interface AchievementCardProps {
  icon: React.ReactNode;
  name: string;
  description: string;
  progress: number;
}

export const AchievementCard = ({ icon, name, description, progress }: AchievementCardProps) => {
  const isMobile = useIsMobile();

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardContent className={`${isMobile ? 'pt-3 px-3 pb-3' : 'pt-6'} flex flex-col items-center text-center`}>
        <div className={`${isMobile ? 'h-10 w-10' : 'h-16 w-16'} rounded-full bg-elec-dark flex items-center justify-center mb-2`}>
          <div className="text-elec-yellow/50">
            {icon}
          </div>
        </div>
        <h3 className={`font-medium ${isMobile ? 'text-xs' : ''} mb-1`}>{name}</h3>
        <p className={`${isMobile ? 'text-[10px] leading-tight' : 'text-xs'} text-muted-foreground`}>{description}</p>
        <div className="w-full mt-2">
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-right mt-1">{Math.round(progress)}%</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AchievementCard;
