
import { Users, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const TestProceduresScenario = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Users className="h-5 w-5 text-elec-yellow" />
          On-the-Job Scenario
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-[#323232] rounded-lg p-4 border-l-4 border-orange-500">
          <h3 className="text-orange-200 font-medium mb-3">Real-World Challenge</h3>
          <p className="text-foreground leading-relaxed mb-4">
            You test a radial circuit and get a CPC reading of 1.7 ohms. The run is only 8 metres.
          </p>
          
          <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-red-200 font-medium mb-2">Analysis</h4>
                <p className="text-foreground text-sm leading-relaxed">
                  <strong>Answer:</strong> That's too high for that length. Investigate further—possible 
                  loose connection or damaged CPC.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
          <h4 className="text-blue-200 font-medium mb-3">Why This Reading Is Concerning</h4>
          <ul className="space-y-2 text-foreground text-sm">
            <li>• For 8 metres, typical CPC resistance should be well under 1 ohm</li>
            <li>• 1.7 ohms suggests a poor connection or damaged conductor</li>
            <li>• This could compromise earth fault protection</li>
            <li>• May indicate installation workmanship issues</li>
          </ul>
        </div>

        <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
          <h4 className="text-green-200 font-medium mb-3">Investigation Steps</h4>
          <ol className="space-y-2 text-foreground text-sm">
            <li>1. Check all terminal connections for tightness</li>
            <li>2. Inspect CPC for visible damage or incorrect routing</li>
            <li>3. Verify correct cable size has been used</li>
            <li>4. Test at intermediate points to isolate the fault</li>
            <li>5. Do not proceed until reading is acceptable</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
};
