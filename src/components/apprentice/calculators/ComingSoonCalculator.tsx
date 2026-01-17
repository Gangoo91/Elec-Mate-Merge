import { Card, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";

interface ComingSoonCalculatorProps {
  title: string;
  description?: string;
}

const ComingSoonCalculator = ({ title, description }: ComingSoonCalculatorProps) => {
  return (
    <Card className="border-elec-yellow/20 bg-white/5 min-h-[400px] flex items-center justify-center">
      <CardContent className="text-center p-6 w-full">
        <Clock className="h-12 w-12 text-elec-yellow mx-auto mb-4" />
        <h3 className="text-xl font-medium mb-2 text-white">{title}</h3>
        <p className="text-white/70 mb-4">
          {description || "This calculator is coming soon. Check back later!"}
        </p>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20">
          <span className="text-sm text-elec-yellow">Under Development</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ComingSoonCalculator;
