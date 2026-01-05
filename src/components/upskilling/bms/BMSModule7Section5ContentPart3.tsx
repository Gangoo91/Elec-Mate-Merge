import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, AlertCircle, CheckCircle, Clock, Wrench } from 'lucide-react';

export const BMSModule7Section5ContentPart3 = () => {
  const troubleshootingGuide = [
    {
      problem: "Analogue input reading 0V or 4mA constantly",
      causes: ["Sensor disconnected", "Wiring fault", "Power supply failure", "Wrong input type selected"],
      solutions: ["Check sensor power supply", "Test continuity with multimeter", "Verify input configuration", "Replace faulty sensor"]
    },
    {
      problem: "Digital output not responding to commands",
      causes: ["Blown fuse", "Faulty relay", "Wiring error", "Overloaded output"],
      solutions: ["Check fuse continuity", "Test relay coil resistance", "Verify load current <rated capacity", "Check field device power"]
    },
    {
      problem: "Communication timeout errors",
      causes: ["Bus termination missing", "Wrong baud rate", "Cable fault", "Address conflicts"],
      solutions: ["Install 120Ω terminators at bus ends", "Check communication settings", "Test cable with TDR", "Verify unique addresses"]
    },
    {
      problem: "Control loop oscillating",
      causes: ["Incorrect PID parameters", "Valve sticking", "Sensor noise", "Too high gain"],
      solutions: ["Reduce proportional gain", "Check actuator operation", "Add input filtering", "Increase integral time"]
    }
  ];

  const documentationChecklist = [
    "Commissioning test sheets - all signed off",
    "O&M manuals updated with as-built information", 
    "IO lists verified against actual installation",
    "Control sequences documented with setpoints",
    "Alarm and trip point settings recorded",
    "Network topology diagrams updated",
    "Calibration certificates for test equipment",
    "Training records for building operators"
  ];

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Wrench className="h-5 w-5 text-elec-yellow" />
          Commissioning Best Practices & Troubleshooting
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <p>
          Successful commissioning requires systematic approach, proper documentation, and effective 
          troubleshooting skills. These practices ensure smooth handover and long-term system reliability.
        </p>

        <div className="bg-gradient-to-r from-amber-600/20 to-red-600/20 border border-amber-500/30 rounded-lg p-4">
          <h4 className="text-foreground font-bold mb-3">⚠️ Common Commissioning Mistakes to Avoid</h4>
          <div className="grid grid-cols-1 gap-2 text-sm">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
              <span>Testing sequences without verifying basic I/O first</span>
            </div>
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
              <span>Not documenting changes made during commissioning</span>
            </div>
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
              <span>Skipping safety interlock testing to save time</span>
            </div>
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
              <span>Inadequate time for control loop tuning and optimisation</span>
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600">
            <div className="flex items-start gap-3 mb-3">
              <AlertCircle className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
              <h4 className="text-foreground font-semibold">Systematic Troubleshooting Guide</h4>
            </div>
            <p className="text-sm text-foreground mb-4">
              When commissioning issues arise, follow this structured approach:
            </p>
            
            <div className="space-y-4">
              {troubleshootingGuide.map((item, index) => (
                <div key={index} className="border border-gray-600 rounded-lg p-3">
                  <h5 className="text-foreground font-medium mb-2 text-sm">Problem: {item.problem}</h5>
                  
                  <div className="grid md:grid-cols-2 gap-3 text-xs">
                    <div>
                      <h6 className="text-red-300 font-medium mb-1">Possible Causes:</h6>
                      <ul className="space-y-1">
                        {item.causes.map((cause, causeIndex) => (
                          <li key={causeIndex} className="flex items-start gap-1">
                            <span className="text-red-400 mt-1">•</span>
                            <span className="text-foreground">{cause}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h6 className="text-green-300 font-medium mb-1">Solutions:</h6>
                      <ul className="space-y-1">
                        {item.solutions.map((solution, solutionIndex) => (
                          <li key={solutionIndex} className="flex items-start gap-1">
                            <span className="text-green-400 mt-1">•</span>
                            <span className="text-foreground">{solution}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600">
            <div className="flex items-start gap-3 mb-3">
              <Clock className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <h4 className="text-foreground font-semibold">Commissioning Timeline Best Practices</h4>
            </div>
            
            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-4 gap-2 p-2 bg-blue-900/20 rounded">
                <div className="font-medium text-blue-300">Week 1</div>
                <div className="col-span-3 text-foreground">Pre-functional checks, power verification, I/O testing</div>
              </div>
              
              <div className="grid grid-cols-4 gap-2 p-2 bg-green-900/20 rounded">
                <div className="font-medium text-green-300">Week 2</div>
                <div className="col-span-3 text-foreground">Individual equipment commissioning, basic sequences</div>
              </div>
              
              <div className="grid grid-cols-4 gap-2 p-2 bg-purple-900/20 rounded">
                <div className="font-medium text-purple-300">Week 3</div>
                <div className="col-span-3 text-foreground">System integration, complex sequences, optimisation</div>
              </div>
              
              <div className="grid grid-cols-4 gap-2 p-2 bg-amber-900/20 rounded">
                <div className="font-medium text-amber-300">Week 4</div>
                <div className="col-span-3 text-foreground">Final testing, documentation, operator training</div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded">
              <p className="text-xs text-foreground">
                <strong>Note:</strong> Allow 25% contingency time for unforeseen issues and rework. Complex systems may require longer timescales.
              </p>
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600">
            <div className="flex items-start gap-3 mb-3">
              <FileText className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <h4 className="text-foreground font-semibold">Essential Documentation Checklist</h4>
            </div>
            <p className="text-sm text-foreground mb-3">
              Comprehensive documentation is crucial for handover and future maintenance:
            </p>
            
            <div className="grid grid-cols-1 gap-2">
              {documentationChecklist.map((item, index) => (
                <div key={index} className="flex items-start gap-2 p-2 bg-green-900/10 border border-green-500/20 rounded">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-foreground text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border border-cyan-500/30 rounded-lg p-4">
            <h4 className="text-foreground font-bold mb-3">💡 Pro Tips for Efficient Commissioning</h4>
            <div className="grid md:grid-cols-2 gap-3 text-sm">
              <div className="space-y-2">
                <div><strong>Preparation:</strong> Review all drawings before starting on site</div>
                <div><strong>Communication:</strong> Daily coordination meetings with all trades</div>
                <div><strong>Testing:</strong> Work through IO lists systematically</div>
              </div>
              <div className="space-y-2">
                <div><strong>Documentation:</strong> Record all changes immediately</div>
                <div><strong>Safety:</strong> Never bypass safety interlocks during testing</div>
                <div><strong>Training:</strong> Include operators in final commissioning stages</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-foreground font-semibold mb-2">Advanced Learning Check</h4>
              <p className="text-sm text-foreground">
                👉 You discover an AHU supply fan starts but the return fan doesn't. The control system shows both outputs are active. What systematic steps would you take to diagnose this problem?
              </p>
              <p className="text-xs text-gray-300 mt-2">
                Consider: Power supply, wiring continuity, motor protection, starter contacts, and control voltage levels.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};