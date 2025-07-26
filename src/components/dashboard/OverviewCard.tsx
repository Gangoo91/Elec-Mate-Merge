
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
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 md:pb-2 p-3 md:p-6">
        <CardTitle className={`${isMobile ? "text-xs" : "text-sm"} font-medium truncate pr-2`}>{title}</CardTitle>
        <div className={`${isMobile ? "h-6 w-6" : "h-7 w-7"} rounded-md bg-elec-yellow/10 flex items-center justify-center text-elec-yellow flex-shrink-0`}>
          {icon}
        </div>
      </CardHeader>
      <CardContent className="pt-0 p-3 md:p-6 md:pt-0">
        <div className={`${isMobile ? "text-lg" : "text-2xl"} font-bold truncate`}>{value}</div>
        <p className="text-xs text-muted-foreground mt-1 truncate">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

export default OverviewCard;
