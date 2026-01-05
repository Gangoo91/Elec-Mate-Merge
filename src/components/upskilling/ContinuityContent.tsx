
import { BookOpen, Shield, AlertTriangle, CheckCircle, Clock, Cable } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const ContinuityContent = () => {
  const conductorsToTest = [
    {
      type: "Circuit Protective Conductors (CPCs)",
      description: "Earth conductors in each circuit from distribution board to final accessory"
    },
    {
      type: "Main Bonding Conductors", 
      description: "Connections between main earthing terminal and extraneous conductive parts"
    },
    {
      type: "Supplementary Bonding Conductors",
      description: "Additional bonding in special locations (e.g., bathrooms)"
    },
    {
      type: "Ring Final Circuit Conductors",
      description: "Line, neutral, and CPC conductors in ring final circuits"
    }
  ];

  const testingSequence = [
    { step: 1, action: "Safe isolation", status: "Complete before testing" },
    { step: 2, action: "Visual inspection", status: "Complete before testing" },
    { step: 3, action: "Continuity testing", status: "Current step" },
    { step: 4, action: "Insulation resistance", status: "After continuity passes" },
    { step: 5, action: "Polarity testing", status: "After continuity passes" }
  ];

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <BookOpen className="h-5 w-5 text-elec-yellow" />
          Core Content
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* What Is Continuity Testing */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">What Is Continuity Testing?</h3>
          <div className="bg-[#323232] rounded-lg p-4 space-y-3">
            <p className="text-foreground leading-relaxed text-sm sm:text-base">
              Continuity testing confirms that conductors—particularly protective ones—are electrically 
              continuous from end to end. It ensures there is a complete, low-resistance path for fault 
              current to return to the supply and trigger disconnection.
            </p>
            <div className="flex items-start gap-3 bg-blue-600/10 border border-blue-600/20 rounded p-3 sm:p-4">
              <Cable className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <p className="text-foreground text-sm sm:text-base">
                <strong>Key Point:</strong> Without continuity, protective devices cannot detect faults 
                and may not operate when needed, creating serious safety risks.
              </p>
            </div>
          </div>
        </div>

        {/* Why It Matters */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Why It Matters</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4 sm:p-5">
              <AlertTriangle className="h-6 w-6 text-red-400 mb-3" />
              <h4 className="text-red-200 font-medium mb-2 text-sm sm:text-base">Broken Protection</h4>
              <p className="text-foreground text-xs sm:text-sm leading-relaxed">
                If CPCs or bonding conductors are broken, protective devices may not operate during a fault
              </p>
            </div>
            <div className="bg-orange-600/10 border border-orange-600/20 rounded-lg p-4 sm:p-5">
              <Shield className="h-6 w-6 text-orange-400 mb-3" />
              <h4 className="text-orange-200 font-medium mb-2 text-sm sm:text-base">Live Metalwork</h4>
              <p className="text-foreground text-xs sm:text-sm leading-relaxed">
                A break in continuity could leave exposed conductive parts remaining live during fault conditions
              </p>
            </div>
            <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4 sm:p-5 sm:col-span-2 lg:col-span-1">
              <CheckCircle className="h-6 w-6 text-green-400 mb-3" />
              <h4 className="text-green-200 font-medium mb-2 text-sm sm:text-base">ADS Validation</h4>
              <p className="text-foreground text-xs sm:text-sm leading-relaxed">
                It validates that protective measures (like ADS – automatic disconnection of supply) are effective
              </p>
            </div>
          </div>
        </div>

        {/* When Is Testing Required */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">When Is Continuity Testing Required?</h3>
          <div className="bg-[#323232] rounded-lg p-4 sm:p-6">
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start gap-3 text-foreground">
                <span className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-sm sm:text-base"><strong>Initial verification</strong> of new circuits</span>
              </li>
              <li className="flex items-start gap-3 text-foreground">
                <span className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-sm sm:text-base"><strong>After alterations or additions</strong> (especially if protective conductors have been disturbed)</span>
              </li>
              <li className="flex items-start gap-3 text-foreground">
                <span className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-sm sm:text-base"><strong>Not typically repeated during EICRs</strong> unless issues are suspected or circuits have been modified</span>
              </li>
            </ul>
          </div>
        </div>

        {/* What Conductors Must Be Tested */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">What Conductors Must Be Tested?</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {conductorsToTest.map((conductor, index) => (
              <div key={index} className="bg-[#323232] rounded-lg p-4 sm:p-5 border-l-4 border-elec-yellow/50">
                <h4 className="text-foreground font-medium mb-2 text-sm sm:text-base">{conductor.type}</h4>
                <p className="text-foreground text-xs sm:text-sm leading-relaxed">{conductor.description}</p>
              </div>
            ))}
          </div>
          <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4 sm:p-5">
            <p className="text-foreground text-sm sm:text-base leading-relaxed">
              <strong>Important:</strong> Each must show a continuous, low-resistance connection between 
              all relevant points (e.g., DB to accessory, accessory to accessory).
            </p>
          </div>
        </div>

        {/* Testing Sequence */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Where It Fits in the Test Sequence</h3>
          <div className="bg-[#323232] rounded-lg p-4">
            <div className="space-y-3">
              {testingSequence.map((item, index) => (
                <div key={index} className={`flex items-center gap-4 p-3 rounded ${
                  item.status === 'Current step' ? 'bg-elec-yellow/20 border border-elec-yellow/30' : 
                  item.status === 'Complete before testing' ? 'bg-green-600/10 border border-green-600/20' : 
                  'bg-gray-600/10 border border-gray-600/20'
                }`}>
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    item.status === 'Current step' ? 'bg-elec-yellow text-black' :
                    item.status === 'Complete before testing' ? 'bg-green-600 text-foreground' :
                    'bg-gray-600 text-foreground'
                  }`}>
                    {item.step}
                  </span>
                  <div className="flex-1">
                    <span className="text-foreground font-medium">{item.action}</span>
                    <p className={`text-xs ${
                      item.status === 'Current step' ? 'text-yellow-200' :
                      item.status === 'Complete before testing' ? 'text-green-200' :
                      'text-foreground'
                    }`}>
                      {item.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4 sm:p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
              <p className="text-foreground text-sm sm:text-base leading-relaxed">
                <strong>Critical:</strong> If continuity fails, no further testing should be done until 
                the issue is resolved. The installation is not safe to energise.
              </p>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};
