
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface ComingSoonCalculatorProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

const ComingSoonCalculator = ({ title, icon: Icon, description }: ComingSoonCalculatorProps) => {
  return (
    <Card className="border-elec-yellow/20 bg-elec-gray min-h-[400px] flex items-center justify-center">
      <CardContent className="text-center p-6 w-full">
        <Icon className="h-12 w-12 text-elec-yellow mx-auto mb-4" />
        <h3 className="text-xl font-medium mb-2">{title} Calculator</h3>
        <p className="text-muted-foreground mb-4">Coming soon! {description}</p>
      </CardContent>
    </Card>
  );
};

export default ComingSoonCalculator;
