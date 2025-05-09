
import { Card, CardContent } from "@/components/ui/card";

const StressSignsCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardContent className="p-4">
          <h3 className="text-lg font-medium mb-3">Physical Signs of Stress</h3>
          <ul className="space-y-1 text-sm">
            <li>• Headaches and muscle tension</li>
            <li>• Disrupted sleep patterns</li>
            <li>• Changes in appetite</li>
            <li>• Fatigue and low energy</li>
            <li>• Rapid heartbeat and breathing</li>
          </ul>
        </CardContent>
      </Card>
      
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardContent className="p-4">
          <h3 className="text-lg font-medium mb-3">Mental Signs of Stress</h3>
          <ul className="space-y-1 text-sm">
            <li>• Difficulty concentrating on tasks</li>
            <li>• Increased worry or anxiety</li>
            <li>• Feeling overwhelmed</li>
            <li>• Irritability with colleagues</li>
            <li>• Loss of motivation</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default StressSignsCards;
