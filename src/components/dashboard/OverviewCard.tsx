
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

interface OverviewCardProps {
  title: string;
  value: string;
  description: string;
  icon: ReactNode;
  isMobile?: boolean;
}

const OverviewCard = ({ title, value, description, icon, isMobile }: OverviewCardProps) => {
  return (
    <Card className="border-elec-yellow/10 md:border-elec-yellow/20 bg-elec-gray hover:bg-elec-gray/90 transition-colors h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1.5 sm:pb-2 md:pb-3 p-2 sm:p-2.5 md:p-3.5">
        <CardTitle className="text-xs md:text-sm font-medium text-left flex-1 pr-2">{title}</CardTitle>
        <div className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 rounded-md bg-elec-yellow/10 flex items-center justify-center text-elec-yellow flex-shrink-0">
          {icon}
        </div>
      </CardHeader>
      <CardContent className="pt-0 p-2 sm:p-2.5 md:p-3.5 text-left">
        <div className="text-sm sm:text-base md:text-lg font-bold mb-1">{value}</div>
        <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

export default OverviewCard;
