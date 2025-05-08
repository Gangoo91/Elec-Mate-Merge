
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

interface ToolCardProps {
  title: string;
  icon: ReactNode;
  description: string;
  items: string[];
}

const ToolCard = ({ title, icon, description, items }: ToolCardProps) => {
  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          {icon}
          <CardTitle>{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-elec-light/80 mb-4">
          {description}
        </CardDescription>
        <ul className="list-disc pl-6 space-y-1">
          {items.map((item, i) => (
            <li key={i} className="text-sm">{item}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default ToolCard;
