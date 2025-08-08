import InfoBox from "@/components/common/InfoBox";
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
    <InfoBox title={title} icon={icon}>
      <p className="text-sm text-muted-foreground mb-2">{description}</p>
      <ul className="text-sm space-y-2">
        {tips.map((tip, index) => (
          <li key={index} className="flex items-start">
            <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
            <span>{tip}</span>
          </li>
        ))}
      </ul>
    </InfoBox>
  );
};

export default BalanceInfoCard;
