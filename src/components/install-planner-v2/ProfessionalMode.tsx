import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InstallPlanDataV2 } from "./types";

interface ProfessionalModeProps {
  planData: InstallPlanDataV2;
  updatePlanData: (data: InstallPlanDataV2) => void;
  onReset: () => void;
}

export const ProfessionalMode = ({ onReset }: ProfessionalModeProps) => {
  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white">Professional Mode</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12">
          <p className="text-slate-400 mb-4">Professional mode coming soon...</p>
          <Button onClick={onReset}>Back to Start</Button>
        </div>
      </CardContent>
    </Card>
  );
};
