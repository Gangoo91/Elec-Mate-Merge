import { Wrench, CheckCircle, AlertTriangle, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const EICPractical = () => {
  const completionSteps = [
    { step: 1, action: "Complete installation details section with accurate supply information" },
    { step: 2, action: "Document design criteria and maximum demand calculations" },
    { step: 3, action: "Record all circuit details in schedule including cable types and protection" },
    { step: 4, action: "Perform all required tests according to BS 7671 Part 6" },
    { step: 5, action: "Complete test results schedule with actual measured values" },
    { step: 6, action: "Obtain all required signatures and submit for Building Regulations" }
  ];

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Wrench className="h-5 w-5 text-elec-yellow" />
          Practical Guidance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">EIC Completion Process</h3>
          <div className="bg-[#323232] rounded-lg p-4">
            <div className="space-y-3">
              {completionSteps.map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-3 rounded bg-gray-600/10 border border-gray-600/20">
                  <span className="w-8 h-8 bg-elec-yellow text-black rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {item.step}
                  </span>
                  <span className="text-foreground">{item.action}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Common EIC Mistakes</h3>
          <div className="space-y-3">
            <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-red-200 font-medium mb-2">Incomplete Testing</h4>
                  <p className="text-foreground text-sm">
                    Ensure all required tests are performed and results recorded accurately.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-yellow-600/10 border border-yellow-600/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-yellow-200 font-medium mb-2">Missing Design Information</h4>
                  <p className="text-foreground text-sm">
                    Document all design criteria including cable calculations and protective device selection.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};

export default EICPractical;