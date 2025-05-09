
import { Card, CardContent } from "@/components/ui/card";

const ApprenticeStressors = () => {
  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardContent className="p-4">
        <h3 className="text-lg font-medium mb-3">Common Apprentice Stressors</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-elec-yellow"></div>
            <p className="text-sm">Learning complex technical skills whilst on the job</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-elec-yellow"></div>
            <p className="text-sm">Balancing study requirements with workplace demands</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-elec-yellow"></div>
            <p className="text-sm">Adapting to workplace expectations and culture</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-elec-yellow"></div>
            <p className="text-sm">Pressure from evaluations and assessments</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-elec-yellow"></div>
            <p className="text-sm">Financial concerns whilst earning an apprentice wage</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApprenticeStressors;
