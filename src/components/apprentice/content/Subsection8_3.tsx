
import React from 'react';
import { SubsectionProps } from './subsection1_1/types';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, CheckCircle, FileText, AlertTriangle } from "lucide-react";

const Subsection8_3 = ({ subsectionId, isCompleted, markAsComplete }: SubsectionProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Shield className="h-6 w-6 text-elec-yellow" />
          Electrical Installation Standards and Compliance
        </h2>
        <p className="text-muted-foreground">
          Understanding the key standards and compliance requirements for electrical installations in the UK.
        </p>
      </div>

      {/* Section 1: BS 7671 Requirements */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardContent className="pt-6">
          <h3 className="text-xl font-semibold mb-4">BS 7671: Requirements for Electrical Installations</h3>
          <div className="space-y-4">
            <p>
              BS 7671, also known as the IET Wiring Regulations, forms the national standard to which all
              UK domestic and industrial wiring must conform. Currently in its 18th Edition, these regulations
              are essential knowledge for all electrical professionals.
            </p>
            
            <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-md p-4">
              <h4 className="text-lg font-medium text-elec-yellow mb-2">Key Areas Covered by BS 7671:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Protection against electric shock</li>
                <li>Protection against thermal effects</li>
                <li>Protection against overcurrent</li>
                <li>Selection and erection of equipment</li>
                <li>Inspection and testing</li>
                <li>Special installations or locations</li>
              </ul>
            </div>
            
            <p>
              The regulations are not statutory, but compliance with them is often required to satisfy
              Health and Safety legislation such as the Electricity at Work Regulations 1989.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Section 2: Building Regulations */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardContent className="pt-6">
          <h3 className="text-xl font-semibold mb-4">Building Regulations and Part P</h3>
          <div className="space-y-4">
            <p>
              In England and Wales, Part P of the Building Regulations specifically relates to electrical
              safety in dwellings. It places legal requirements on those carrying out electrical installation work.
            </p>
            
            <div className="bg-elec-dark/50 border border-blue-400/30 rounded-md p-4">
              <h4 className="text-lg font-medium text-blue-400 mb-2">Requirements under Part P:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>All work must be designed and installed to protect people from fire and electric shocks</li>
                <li>Certain electrical work must be notified to local building control</li>
                <li>Work must be carried out by a competent person</li>
                <li>Certification must be provided for all completed work</li>
              </ul>
            </div>
            
            <div className="flex items-center gap-3 mt-3 bg-orange-500/10 p-3 rounded-md border border-orange-500/20">
              <AlertTriangle className="h-5 w-5 text-orange-500 flex-shrink-0" />
              <p className="text-sm">
                Failure to comply with Building Regulations is a criminal offence and can result in prosecution
                with fines of up to £5,000, plus £50 for each day the violation continues.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 3: Certification and Documentation */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardContent className="pt-6">
          <h3 className="text-xl font-semibold mb-4">Essential Certification and Documentation</h3>
          <div className="space-y-4">
            <p>
              Proper documentation is a crucial part of electrical installation work in the UK. As an apprentice,
              understanding these requirements is essential for your future practice.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-md p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-elec-yellow" />
                  <h4 className="font-medium">Electrical Installation Certificate (EIC)</h4>
                </div>
                <p className="text-sm">
                  Required for new installations, additions and alterations to existing installations.
                  Must be issued by the person responsible for the design, construction, inspection and testing.
                </p>
              </div>
              
              <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-md p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-elec-yellow" />
                  <h4 className="font-medium">Minor Electrical Installation Works Certificate</h4>
                </div>
                <p className="text-sm">
                  Used for additions or alterations that don't require an EIC, such as adding a new circuit
                  to an existing installation.
                </p>
              </div>
              
              <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-md p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-elec-yellow" />
                  <h4 className="font-medium">Electrical Installation Condition Report</h4>
                </div>
                <p className="text-sm">
                  Periodic reporting on the condition of existing electrical installations,
                  identifying damage, wear, and non-compliance with current regulations.
                </p>
              </div>
              
              <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-md p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-elec-yellow" />
                  <h4 className="font-medium">Schedule of Test Results</h4>
                </div>
                <p className="text-sm">
                  Detailed record of all testing carried out, with measured values and
                  pass/fail indications. Must be included with certification.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Completion Button */}
      {!isCompleted && (
        <div className="pt-4">
          <Button 
            onClick={markAsComplete}
            className="px-4 py-2 bg-elec-yellow text-elec-dark rounded hover:bg-yellow-400 transition-colors"
          >
            <CheckCircle className="h-5 w-5 mr-2" />
            Mark as Complete
          </Button>
        </div>
      )}
    </div>
  );
};

export default Subsection8_3;
