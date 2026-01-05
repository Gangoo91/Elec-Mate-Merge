import { Book, CheckCircle, Zap, Settings, AlertTriangle, Shield, Info, Target, Wrench, Cable } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const RCDInstallationContent = () => {
  const learningObjectives = [
    "Understand BS 7671 requirements for RCD protection",
    "Identify circuits requiring mandatory RCD protection",
    "Select appropriate RCD types for different applications",
    "Apply correct installation procedures and wiring methods",
    "Implement proper earthing and bonding arrangements",
    "Ensure compliance with discrimination requirements"
  ];

  const installationSteps = [
    { step: 1, action: "Verify circuit requirements and load calculations" },
    { step: 2, action: "Select appropriate RCD type and rating" },
    { step: 3, action: "Install RCD in correct position within distribution board" },
    { step: 4, action: "Connect line and neutral conductors correctly" },
    { step: 5, action: "Verify earth continuity and bonding arrangements" },
    { step: 6, action: "Test installation and document compliance" }
  ];

  const mandatoryProtection = [
    "Socket outlets up to 20A in domestic installations",
    "Mobile equipment used outdoors",
    "Circuits in bathrooms and shower rooms",
    "Circuits in locations with increased shock risk",
    "Swimming pool and fountain installations",
    "Caravan and camping site supply equipment"
  ];

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Book className="h-5 w-5 text-elec-yellow" />
          Core Content
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* What are RCD Installation Requirements */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">RCD Installation Requirements</h3>
          <div className="bg-[#323232] rounded-lg p-4 space-y-3">
            <p className="text-foreground text-sm sm:text-base leading-relaxed">
              RCD installation must comply with BS 7671 requirements to ensure proper protection against electric shock and fire. 
              Correct installation is essential for reliable operation and regulatory compliance.
            </p>
            <div className="flex items-start gap-3 bg-green-600/10 border border-green-600/20 rounded p-3">
              <Shield className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <p className="text-foreground text-sm sm:text-base">
                <strong>Remember:</strong> RCD protection is mandatory for many circuit types and must be 
                installed by competent persons following current regulations.
              </p>
            </div>
          </div>
        </div>

        {/* Regulatory Requirements */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">BS 7671 Requirements</h3>
          <div className="bg-[#323232] rounded-lg p-4 space-y-3">
            <div className="bg-blue-600/10 border border-blue-600/20 rounded p-3">
              <h4 className="text-blue-200 font-medium mb-2">Section 411.3.3</h4>
              <p className="text-foreground text-sm sm:text-base">
                Additional protection by means of an RCD having characteristics specified in 
                Section 415.1 shall be provided for socket-outlets with a rated current not exceeding 20A.
              </p>
            </div>
            <div className="bg-yellow-600/10 border border-yellow-600/20 rounded p-3">
              <h4 className="text-yellow-200 font-medium mb-2">Section 701.411.3.3</h4>
              <p className="text-foreground text-sm sm:text-base">
                In locations containing a bath or shower, additional protection shall be provided 
                for all low voltage circuits by RCDs having a rated residual operating current not exceeding 30mA.
              </p>
            </div>
            <div className="bg-red-600/10 border border-red-600/20 rounded p-3">
              <h4 className="text-red-200 font-medium mb-2">Section 415.1.1</h4>
              <p className="text-foreground text-sm sm:text-base">
                For additional protection against electric shock, RCDs shall have a rated residual 
                operating current not exceeding 30mA and an operating time not exceeding 40ms at 5IΔn.
              </p>
            </div>
          </div>
        </div>

        {/* Mandatory RCD Protection */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Mandatory RCD Protection</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mandatoryProtection.map((requirement, index) => (
              <div key={index} className="bg-[#323232] rounded-lg p-4 border-l-4 border-elec-yellow/50">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <p className="text-foreground text-sm sm:text-base">{requirement}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Objectives */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Learning Objectives</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {learningObjectives.map((objective, index) => (
              <div key={index} className="bg-[#323232] rounded-lg p-4 border-l-4 border-blue-600/50">
                <div className="flex items-start gap-3">
                  <Target className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <p className="text-foreground text-sm sm:text-base">{objective}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RCD Types and Applications */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">RCD Types and Applications</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
              <Zap className="h-6 w-6 text-green-400 mb-3" />
              <h4 className="text-green-200 font-medium mb-2">Type AC</h4>
              <ul className="text-foreground text-sm sm:text-base space-y-1">
                <li>• Standard domestic installations</li>
                <li>• Resistive and inductive loads</li>
                <li>• Most socket outlet circuits</li>
                <li>• General lighting circuits</li>
              </ul>
            </div>
            <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
              <Zap className="h-6 w-6 text-blue-400 mb-3" />
              <h4 className="text-blue-200 font-medium mb-2">Type A</h4>
              <ul className="text-foreground text-sm sm:text-base space-y-1">
                <li>• Electronic equipment circuits</li>
                <li>• Variable speed drives</li>
                <li>• Washing machines and dishwashers</li>
                <li>• Computer and IT equipment</li>
              </ul>
            </div>
            <div className="bg-orange-600/10 border border-orange-600/20 rounded-lg p-4">
              <Zap className="h-6 w-6 text-orange-400 mb-3" />
              <h4 className="text-orange-200 font-medium mb-2">Type B</h4>
              <ul className="text-foreground text-sm sm:text-base space-y-1">
                <li>• EV charging installations</li>
                <li>• Three-phase variable drives</li>
                <li>• Medical equipment</li>
                <li>• Industrial applications</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Installation Process */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Installation Process</h3>
          <div className="bg-[#323232] rounded-lg p-4">
            <div className="space-y-3">
              {installationSteps.map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-3 rounded bg-gray-600/10 border border-gray-600/20">
                  <span className="w-8 h-8 bg-elec-yellow text-black rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {item.step}
                  </span>
                  <span className="text-foreground">{item.action}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 bg-blue-600/10 border border-blue-600/20 rounded p-3">
              <p className="text-foreground text-sm sm:text-base">
                <strong>Purpose:</strong> To ensure RCD installation meets regulatory requirements and provides effective protection.
              </p>
            </div>
          </div>
        </div>

        {/* Connection Methods */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Connection Methods</h3>
          <div className="bg-[#323232] rounded-lg p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-600/10 border border-green-600/20 rounded p-4">
                <h4 className="text-green-200 font-medium mb-2">RCBO Installation</h4>
                <ul className="text-foreground text-sm sm:text-base space-y-1">
                  <li>• Individual circuit protection</li>
                  <li>• Combined overcurrent and RCD protection</li>
                  <li>• No discrimination issues</li>
                  <li>• Easier fault identification</li>
                </ul>
              </div>
              <div className="bg-blue-600/10 border border-blue-600/20 rounded p-4">
                <h4 className="text-blue-200 font-medium mb-2">RCD Main Switch</h4>
                <ul className="text-foreground text-sm sm:text-base space-y-1">
                  <li>• Protection for entire installation</li>
                  <li>• Single point of disconnection</li>
                  <li>• Requires careful load balancing</li>
                  <li>• Consider discrimination requirements</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Installation Considerations */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Important Installation Considerations</h3>
          <div className="space-y-3">
            <div className="bg-orange-600/10 border border-orange-600/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Cable className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-orange-200 font-medium mb-2">Neutral Conductor Management</h4>
                  <p className="text-foreground text-sm sm:text-base">
                    Ensure proper neutral integrity - shared neutrals can cause unwanted tripping and compromise protection.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-red-200 font-medium mb-2">Load Balancing</h4>
                  <p className="text-foreground text-sm sm:text-base">
                    Maintain balanced loads on three-phase RCDs to prevent nuisance tripping from natural imbalance.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-blue-200 font-medium mb-2">Environmental Factors</h4>
                  <p className="text-foreground text-sm sm:text-base">
                    Consider ambient temperature, humidity, and electromagnetic interference when selecting installation location.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-yellow-600/10 border border-yellow-600/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Settings className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-yellow-200 font-medium mb-2">Future Expansion</h4>
                  <p className="text-foreground text-sm sm:text-base">
                    Plan for future circuit additions and ensure adequate RCD capacity and discrimination timing.
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

export default RCDInstallationContent;