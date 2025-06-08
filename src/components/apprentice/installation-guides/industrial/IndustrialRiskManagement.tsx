
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

const IndustrialRiskManagement = () => {
  return (
    <Card className="border-orange-500/30 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-6 w-6 text-orange-400" />
          <CardTitle className="text-orange-300">Industrial Risk Management</CardTitle>
        </div>
        <p className="text-muted-foreground">Critical safety planning for industrial environments</p>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="bg-orange-500/10 p-4 rounded-lg border border-orange-500/20">
          <h3 className="font-semibold text-orange-300 mb-3">Pre-Installation Risk Assessment</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="space-y-2">
              <h4 className="font-medium text-orange-200">Electrical Hazards</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• High voltage arc flash risk</li>
                <li>• Live working procedures</li>
                <li>• Isolation and proving dead</li>
                <li>• Emergency shutdown systems</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-orange-200">Environmental Hazards</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Explosive atmosphere zones</li>
                <li>• Chemical exposure risks</li>
                <li>• Confined space working</li>
                <li>• Hot work permit requirements</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IndustrialRiskManagement;
