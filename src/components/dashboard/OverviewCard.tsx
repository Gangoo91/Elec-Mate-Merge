
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

interface OverviewCardProps {
  title: string;
  value: string;
  description: string;
  icon: ReactNode;
}

const OverviewCard = ({ title, value, description, icon }: OverviewCardProps) => {
  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="text-elec-yellow">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

export default OverviewCard;
