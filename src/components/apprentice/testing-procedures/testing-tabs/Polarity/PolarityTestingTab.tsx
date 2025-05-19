
import { Card, CardContent } from "@/components/ui/card";

const PolarityTestingTab = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold">Polarity Testing</h2>
          <p className="text-sm text-muted-foreground mt-1 mb-4">
            Verifies that all connections are correctly wired and switches/fuses are in the line conductor.
          </p>
          
          <ul className="list-disc pl-6 space-y-3 text-sm">
            <li>Verify that single pole devices (switches, fuses) are connected in the line conductor only</li>
            <li>Check that bayonet/Edison screw lampholders have line conductor connected to the center contact</li>
            <li>Confirm that all socket outlets have line/neutral/earth connected to the correct terminals</li>
            <li>Use a continuity tester to check correct polarity throughout the installation</li>
            <li>Pay special attention to two-way and intermediate switching arrangements</li>
          </ul>
          
          <div className="mt-6 bg-gray-800/30 p-4 rounded-md">
            <img src="/placeholder.svg" alt="Polarity Testing Method" className="mx-auto max-h-64" />
            <p className="text-xs text-center mt-2 text-muted-foreground">
              Socket outlet and switch polarity testing diagram
            </p>
          </div>
        </CardContent>
      </Card>
      
      <div className="bg-green-950/20 border border-green-500/30 rounded-md p-4">
        <h3 className="text-green-200 font-medium mb-2">Safety Reminder</h3>
        <p className="text-sm text-green-100/80">
          Incorrect polarity is a serious safety issue that can result in electric shock hazards and incorrectly isolated circuits. 
          Always double-check polarity tests and immediately rectify any issues found.
        </p>
      </div>
    </div>
  );
};

export default PolarityTestingTab;
