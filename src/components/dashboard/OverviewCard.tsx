
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
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 md:pb-2">
        <CardTitle className={`${isMobile ? "text-xs" : "text-sm"} font-medium truncate`}>{title}</CardTitle>
        <div className="h-7 w-7 rounded-md bg-elec-yellow/10 flex items-center justify-center text-elec-yellow">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className={`${isMobile ? "text-xl" : "text-2xl"} font-bold truncate`}>{value}</div>
        <p className="text-xs text-muted-foreground mt-1 truncate">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

export default OverviewCard;
