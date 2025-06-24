
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wrench, Play, Target, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

const PracticalExercisesSection = () => {
  return (
    <Card className="border-elec-yellow/20 bg-elec-gray h-full">
      <CardHeader>
        <CardTitle className="text-elec-yellow flex items-center gap-2">
          <Wrench className="h-5 w-5" />
          Practical Exercises
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">
          Hands-on practice scenarios and exercises to build confidence in real-world testing situations.
        </p>
        
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 border border-gray-600 rounded-lg bg-elec-dark/50">
            <Play className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-blue-300">Virtual Simulations</h4>
              <p className="text-sm text-muted-foreground">Interactive testing scenarios with MFT simulators</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-3 border border-gray-600 rounded-lg bg-elec-dark/50">
            <Target className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-green-300">Skill Challenges</h4>
              <p className="text-sm text-muted-foreground">Progressive exercises to master each test procedure</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-3 border border-gray-600 rounded-lg bg-elec-dark/50">
            <Wrench className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-purple-300">Case Studies</h4>
              <p className="text-sm text-muted-foreground">Real installation examples and testing approaches</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-3 border border-gray-600 rounded-lg bg-elec-dark/50">
            <Award className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-amber-300">Competency Tests</h4>
              <p className="text-sm text-muted-foreground">Assessment scenarios to validate skills</p>
            </div>
          </div>
        </div>

        <div className="mt-4 p-4 border border-blue-500/30 rounded-lg bg-blue-500/10">
          <h4 className="font-medium text-blue-300 mb-2">Exercise Categories</h4>
          <ul className="text-sm text-blue-200 space-y-1">
            <li>• Domestic installation testing exercises</li>
            <li>• Commercial and industrial scenarios</li>
            <li>• Fault finding and troubleshooting</li>
            <li>• EICR inspection practice sessions</li>
            <li>• Emergency lighting and fire alarm testing</li>
          </ul>
        </div>

        <Button className="w-full mt-4 bg-elec-yellow text-black hover:bg-elec-yellow/90">
          Start Practical Exercises
        </Button>
      </CardContent>
    </Card>
  );
};

export default PracticalExercisesSection;
