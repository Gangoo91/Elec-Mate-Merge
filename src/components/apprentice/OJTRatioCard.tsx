
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookOpen } from "lucide-react";

const OJTRatioCard = () => {
  // Mock data - would come from time tracking system
  const totalWorkTime = 1600; // 40 hours * 40 weeks = 1600 hours per year
  const requiredOJTTime = totalWorkTime * 0.2; // 20% of total time
  const currentOJTTime = 120; // Mock current OJT hours
  const percentageComplete = Math.min(100, Math.round((currentOJTTime / requiredOJTTime) * 100));

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>20% Off-The-Job Training</CardTitle>
            <CardDescription>EAL compliant training tracker</CardDescription>
          </div>
          <BookOpen className="h-5 w-5 text-elec-yellow" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between text-sm">
            <span>Progress toward required 20%</span>
            <span className="font-medium">{percentageComplete}%</span>
          </div>
          <Progress value={percentageComplete} className="h-2 bg-elec-dark" />
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="rounded-md bg-elec-dark p-2 text-center">
              <div className="text-2xl font-bold text-elec-yellow">{currentOJTTime}</div>
              <p className="text-xs text-muted-foreground">Hours logged</p>
            </div>
            <div className="rounded-md bg-elec-dark p-2 text-center">
              <div className="text-2xl font-bold">{Math.round(requiredOJTTime)}</div>
              <p className="text-xs text-muted-foreground">Hours required</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OJTRatioCard;
