
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, CheckCircle, Shield } from "lucide-react";

const LegalRequirements = () => {
  return (
    <Card className="border border-elec-yellow/30 bg-elec-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-bold text-elec-yellow">Legal Requirements for Working at Height</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm md:text-base">
          The Work at Height Regulations 2005 establish specific legal requirements that all electrical 
          contractors must follow when working at height. These regulations are designed to prevent falls 
          and minimise injuries in construction and maintenance activities.
        </p>
        
        <div className="bg-elec-dark/50 border-l-4 border-elec-yellow p-4 rounded-r">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="h-5 w-5 text-elec-yellow" />
            <h4 className="font-semibold text-elec-yellow">Hierarchy of Control Measures</h4>
          </div>
          <p className="text-sm">
            The regulations establish a mandatory hierarchy of control measures that must be followed:
          </p>
          <ol className="list-decimal pl-5 space-y-1 text-sm mt-2">
            <li>Avoid work at height where possible</li>
            <li>Use existing safe place of work (e.g., permanent platforms)</li>
            <li>Provide equipment to prevent falls</li>
            <li>Mitigate distance and consequences of falls</li>
            <li>Provide training and instruction</li>
          </ol>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <Card className="bg-elec-dark/50 border border-elec-yellow/20">
            <CardHeader className="pb-2">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <CardTitle className="text-lg font-semibold text-elec-yellow">Employer Responsibilities</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Ensure all work at height is properly planned and organised</li>
                <li>Conduct and document thorough risk assessments</li>
                <li>Provide appropriate equipment and ensure it's maintained</li>
                <li>Ensure workers are competent and properly trained</li>
                <li>Establish emergency and rescue procedures</li>
                <li>Consider weather conditions and potential hazards</li>
                <li>Ensure fragile surfaces are identified and addressed</li>
                <li>Provide supervision proportionate to the risk</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="bg-elec-dark/50 border border-elec-yellow/20">
            <CardHeader className="pb-2">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <CardTitle className="text-lg font-semibold text-elec-yellow">Employee Responsibilities</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Use equipment in accordance with training</li>
                <li>Report any safety hazards or defects</li>
                <li>Participate in equipment inspections</li>
                <li>Follow established safe working procedures</li>
                <li>Stop work if conditions become unsafe</li>
                <li>Use provided PPE correctly</li>
                <li>Avoid improper use or modification of equipment</li>
                <li>Maintain good housekeeping at height</li>
              </ul>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-4">
          <Card className="bg-elec-dark/50 border border-elec-yellow/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold text-elec-yellow">Risk Assessment Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-3 text-sm">
                A suitable and sufficient risk assessment must be completed before any work at height in electrical installations:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-elec-dark/70 p-3 rounded-lg border border-elec-yellow/10">
                  <h5 className="font-medium text-elec-yellow mb-2 flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Environmental Considerations
                  </h5>
                  <p className="text-sm">Weather conditions, lighting, ventilation, and surface conditions must be assessed</p>
                </div>
                <div className="bg-elec-dark/70 p-3 rounded-lg border border-elec-yellow/10">
                  <h5 className="font-medium text-elec-yellow mb-2 flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Electrical Hazards
                  </h5>
                  <p className="text-sm">Overhead lines, exposed conductors, and energised equipment must be identified</p>
                </div>
                <div className="bg-elec-dark/70 p-3 rounded-lg border border-elec-yellow/10">
                  <h5 className="font-medium text-elec-yellow mb-2 flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Duration and Complexity
                  </h5>
                  <p className="text-sm">Task duration, frequency of access, and tools required need assessment</p>
                </div>
                <div className="bg-elec-dark/70 p-3 rounded-lg border border-elec-yellow/10">
                  <h5 className="font-medium text-elec-yellow mb-2 flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Emergency Procedures
                  </h5>
                  <p className="text-sm">Rescue plans must be documented and communicated to all workers</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default LegalRequirements;
