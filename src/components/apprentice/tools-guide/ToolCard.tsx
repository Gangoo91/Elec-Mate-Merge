
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ToolCardProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  items: string[];
}

const ToolCard = ({ title, icon, description, items }: ToolCardProps) => {
  return (
    <Card className="border-elec-yellow/20 bg-elec-gray/30 h-full">
      <CardHeader className="pb-3 sm:pb-4">
        <CardTitle className="text-base sm:text-lg flex items-center gap-2 sm:gap-3 text-elec-yellow">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 sm:space-y-4">
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
        <ul className="space-y-1.5 sm:space-y-2">
          {items.map((item, index) => (
            <li key={index} className="text-xs sm:text-sm text-muted-foreground flex items-start gap-2">
              <span className="text-elec-yellow mt-1 text-xs">•</span>
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default ToolCard;
