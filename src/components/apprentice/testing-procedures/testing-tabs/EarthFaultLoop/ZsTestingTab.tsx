
import { Card, CardContent } from "@/components/ui/card";

const ZsTestingTab = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold">Earth Fault Loop Impedance (Zs) Testing</h2>
          <p className="text-sm text-muted-foreground mt-1 mb-4">
            Measures the impedance of the earth fault loop path to ensure protective devices will operate in fault conditions.
          </p>
          
          <ul className="list-disc pl-6 space-y-3 text-sm">
            <li>Connect test equipment correctly between line and earth at the furthest socket outlet</li>
            <li>Perform a "no-trip" test if RCDs/RCBOs are installed</li>
            <li>Compare measured Zs value with maximum Zs value in BS7671 Table 41.3</li>
            <li>Ensure value doesn't exceed maximum for the specific protective device</li>
            <li>Consider temperature factors when comparing to tabulated maximum values</li>
          </ul>
          
          <div className="mt-6 bg-gray-800/30 p-4 rounded-md">
            <img src="/placeholder.svg" alt="Zs Testing Setup" className="mx-auto max-h-64" />
            <p className="text-xs text-center mt-2 text-muted-foreground">
              Earth fault loop impedance test connection diagram
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ZsTestingTab;
