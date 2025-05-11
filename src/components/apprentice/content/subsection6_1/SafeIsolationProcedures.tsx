
import React from "react";
import { LockKeyhole, Check, AlertTriangle, Lightbulb, Zap } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const SafeIsolationProcedures = () => {
  return (
    <Card className="bg-elec-gray border border-elec-yellow/20 h-full">
      <CardHeader className="bg-gradient-to-r from-elec-yellow/10 to-transparent border-b border-elec-yellow/20 pb-3">
        <div className="flex items-center gap-2">
          <LockKeyhole className="h-5 w-5 text-elec-yellow" />
          <h4 className="text-xl font-semibold text-elec-yellow">Safe Isolation Procedures</h4>
        </div>
      </CardHeader>
      
      <CardContent className="pt-4 space-y-6">
        <p className="text-sm">
          Safe isolation is a critical procedure that ensures electrical circuits are disconnected from their power source 
          before work begins, protecting electricians from electric shock, burns, and other injuries.
        </p>
        
        <div className="space-y-4">
          {/* Essential Steps */}
          <h5 className="font-medium text-elec-yellow">The Essential 7-Step Procedure:</h5>
          <div className="grid grid-cols-1 gap-3">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className="p-3 bg-elec-dark/70 border border-elec-yellow/20 rounded-lg flex gap-3 hover:border-elec-yellow/40 transition-colors"
              >
                <div className="bg-elec-yellow/10 h-8 w-8 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-elec-yellow font-medium">{index + 1}</span>
                </div>
                <div className="space-y-1">
                  <h6 className="font-semibold text-white">{step.title}</h6>
                  <p className="text-sm text-gray-300">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Required Equipment */}
          <div className="mt-6">
            <h5 className="font-medium text-elec-yellow mb-3 flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              Required Equipment
            </h5>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-400" />
                <span>Approved voltage indicators (GS38 compliant)</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-400" />
                <span>Proving units for testing voltage indicators</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-400" />
                <span>Locking off devices and padlocks</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-400" />
                <span>Warning notices and tags</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-400" />
                <span>Insulated tools and PPE</span>
              </li>
            </ul>
          </div>
          
          {/* Warning Box */}
          <div className="p-3 bg-red-900/20 border border-red-500/30 rounded-lg mt-4">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
              <div>
                <h6 className="font-medium text-red-400">Critical Safety Warning</h6>
                <p className="text-sm text-gray-300 mt-1">
                  Never rely on isolation switches alone. Always follow the complete safe isolation procedure and verify 
                  the absence of voltage before beginning work.
                </p>
              </div>
            </div>
          </div>
          
          {/* Regulations */}
          <div className="p-3 bg-elec-dark/50 rounded-lg border border-elec-yellow/20 mt-2">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-elec-yellow" />
              <span className="text-sm text-elec-yellow font-medium">Electricity at Work Regulations 1989</span>
            </div>
            <p className="text-xs text-gray-300 mt-1">
              Regulation 13 specifically requires that adequate precautions are taken to prevent electrical equipment that has 
              been made dead from becoming live while work is carried out.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Data for the steps
const steps = [
  {
    title: "Identify",
    description: "Correctly identify the circuit or equipment to be worked on."
  },
  {
    title: "Isolate",
    description: "Switch off and secure the correct isolation device."
  },
  {
    title: "Prove the tester",
    description: "Test your voltage indicator on a known live source."
  },
  {
    title: "Test dead",
    description: "Verify the circuit or equipment is not energized."
  },
  {
    title: "Reprove the tester",
    description: "Test your voltage indicator again on a known live source."
  },
  {
    title: "Lock off and tag",
    description: "Apply locks and warning notices to prevent reconnection."
  },
  {
    title: "Issue permit-to-work",
    description: "For complex systems, issue formal authorization documents."
  }
];

export default SafeIsolationProcedures;
