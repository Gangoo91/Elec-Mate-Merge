
import { AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const EmergencyBanner = () => {
  return (
    <Card className="border-red-500/40 bg-red-500/5 shadow-md">
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <AlertTriangle className="h-10 w-10 text-red-500 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold text-red-500">In an emergency</h3>
            <p className="text-sm">
              If you or someone else is in immediate danger, call <span className="font-bold text-red-500">999</span> or go to your nearest A&E department.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmergencyBanner;
