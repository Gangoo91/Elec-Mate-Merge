
import React from "react";
import { AlertTriangle, Shield, CheckCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const MEWPSafety = () => {
  return (
    <div className="border border-elec-yellow/30 rounded-lg p-4 md:p-6 space-y-4">
      <h3 className="text-xl font-bold text-elec-yellow">MEWP Safety for Electrical Work</h3>
      
      <div className="space-y-4 md:space-y-6">
        <div className="bg-elec-dark/50 border-l-4 border-red-500 p-3 md:p-4 rounded-md">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <h4 className="font-semibold text-elec-yellow">Training Requirements</h4>
          </div>
          <p className="text-sm">
            All MEWP operators must have completed formal IPAF (International Powered Access Federation) 
            or equivalent certified training specifically for the category of equipment being used.
            Training is typically valid for 5 years and must be renewed thereafter.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-elec-dark/50 border border-elec-yellow/20">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-elec-yellow" />
                <CardTitle className="text-base text-elec-yellow">Pre-Use Inspections</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-4 space-y-1 text-sm">
                <li>Check all hydraulic systems for leaks</li>
                <li>Verify emergency lowering functions operate correctly</li>
                <li>Test all controls for proper operation</li>
                <li>Check tyres/outriggers for damage or instability</li>
                <li>Verify safety devices function correctly</li>
                <li>Check battery charge level on electric MEWPs</li>
                <li>Confirm warning systems and alarms operate</li>
                <li>Inspect platform for damage or modifications</li>
                <li>Check electrical insulation when working near live systems</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="bg-elec-dark/50 border border-elec-yellow/20">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-elec-yellow" />
                <CardTitle className="text-base text-elec-yellow">Electrical-Specific Safety Considerations</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-4 space-y-1 text-sm">
                <li><span className="font-medium">Overhead power lines</span> - Maintain safe clearance distances (minimum 10m initial assessment)</li>
                <li><span className="font-medium">Electrical insulation</span> - Check if MEWP has necessary insulation rating for work near live parts</li>
                <li><span className="font-medium">Tool tethering</span> - Use tool lanyards to prevent dropping onto electrical equipment</li>
                <li><span className="font-medium">Weather conditions</span> - Wind can affect stability; lightning risk for elevated work</li>
                <li><span className="font-medium">Fall protection</span> - Harness and lanyard required on boom-type MEWPs</li>
                <li><span className="font-medium">Emergency rescue plan</span> - Procedures for platform power failure while elevated</li>
                <li><span className="font-medium">Exclusion zones</span> - Establish below MEWP to prevent injuries from falling objects</li>
              </ul>
            </CardContent>
          </Card>
        </div>
        
        <Card className="bg-elec-dark/50 border border-elec-yellow/20">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-elec-yellow" />
              <CardTitle className="text-base text-elec-yellow">Legal and Inspection Requirements</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-4 space-y-3 text-sm">
              <li>
                <span className="font-medium">LOLER Regulations</span>
                <p className="mt-1 text-xs md:text-sm">Lifting Operations and Lifting Equipment Regulations 1998 require thorough examination by a competent person every 6 months</p>
              </li>
              <li>
                <span className="font-medium">PUWER Regulations</span>
                <p className="mt-1 text-xs md:text-sm">Provision and Use of Work Equipment Regulations 1998 require equipment to be suitable, maintained, and only used by trained persons</p>
              </li>
              <li>
                <span className="font-medium">Manufacturer Inspections</span>
                <p className="mt-1 text-xs md:text-sm">Follow manufacturer's guidance on maintenance intervals, usually every 3-6 months</p>
              </li>
              <li>
                <span className="font-medium">Documented Checks</span>
                <p className="mt-1 text-xs md:text-sm">Daily pre-use inspections must be documented and retained</p>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className="bg-elec-dark/50 border border-elec-yellow/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-elec-yellow">Emergency Rescue Planning</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-3 text-sm">
              A rescue plan must be in place before work begins. The plan should address:
            </p>
            <ul className="list-disc pl-4 space-y-1 text-sm">
              <li>Method of lowering platform in case of power failure</li>
              <li>Communication systems between ground and platform</li>
              <li>Access to ground controls for emergency lowering</li>
              <li>First aid procedures for potential electrical injuries</li>
              <li>Contact information for emergency services</li>
              <li>Roles and responsibilities during emergency situations</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MEWPSafety;
