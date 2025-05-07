
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { ReactNode } from "react";

interface BalanceInfoCardProps {
  title: string;
  description: string;
  tips: string[];
  icon: ReactNode;
}

const BalanceInfoCard = ({ title, description, tips, icon }: BalanceInfoCardProps) => {
  return (
    <Card className="border-green-500/20 bg-elec-gray">
      <CardContent className="p-4 space-y-3">
        <h3 className="text-lg font-medium flex items-center gap-2">
          {icon}
          {title}
        </h3>
        <p className="text-sm text-muted-foreground">
          {description}
        </p>
        <ul className="text-sm space-y-2">
          {tips.map((tip, index) => (
            <li key={index} className="flex items-start">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default BalanceInfoCard;
