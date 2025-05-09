
import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  icon: LucideIcon;
  iconColor?: string;
}

const StatCard = ({ title, value, change, icon: Icon, iconColor = "text-elec-yellow" }: StatCardProps) => {
  return (
    <Card className="p-4">
      <div className="flex items-center gap-2">
        <Icon className={`h-4 w-4 ${iconColor}`} />
        <h3 className="text-sm font-medium">{title}</h3>
      </div>
      <p className="text-2xl font-bold">{value}</p>
      {change && <p className="text-xs text-gray-400 mt-1">{change}</p>}
    </Card>
  );
};

export default StatCard;
