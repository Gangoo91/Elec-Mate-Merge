
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
    <Card className="border-elec-yellow/20 bg-elec-gray hover:bg-elec-gray/90 transition-colors h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 md:pb-3 p-3 md:p-4">
        <CardTitle className="text-xs md:text-sm font-medium text-left flex-1 pr-2">{title}</CardTitle>
        <div className="h-6 w-6 md:h-7 md:w-7 rounded-md bg-elec-yellow/10 flex items-center justify-center text-elec-yellow flex-shrink-0">
          {icon}
        </div>
      </CardHeader>
      <CardContent className="pt-0 p-3 md:p-4 text-left">
        <div className="text-lg md:text-2xl font-bold mb-1">{value}</div>
        <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

export default OverviewCard;
