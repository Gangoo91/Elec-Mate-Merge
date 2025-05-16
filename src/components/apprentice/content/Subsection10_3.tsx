
import React from "react";
import { SubsectionProps } from "./subsection1_1/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, FileText, Clock, AlertTriangle, PackageCheck } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Subsection10_3 = ({ subsectionId, isCompleted, markAsComplete }: SubsectionProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <FileText className="h-6 w-6 text-elec-yellow" />
          Testing and Commissioning Documentation
        </h2>
        <p className="text-muted-foreground">
          Understanding the essential documentation requirements for testing and commissioning electrical installations in the UK.
        </p>
      </div>

      {/* Section 1: Documentation Overview */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardContent className="pt-6">
          <h3 className="text-xl font-semibold mb-4">Documentation Requirements Overview</h3>
          <div className="space-y-4">
            <p>
              Proper documentation is a critical aspect of electrical testing and commissioning in the UK. 
              It provides evidence of compliance with regulations, serves as a record of safety testing, 
              and forms part of the handover package to clients.
            </p>
            
            <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-md p-4">
              <h4 className="text-lg font-medium text-elec-yellow mb-2">Key Documentation Categories:</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Certification Documents</strong>: Formal records confirming the installation meets regulatory requirements
                </li>
                <li>
                  <strong>Test Results</strong>: Detailed records of all tests performed and their outcomes
                </li>
                <li>
                  <strong>Design Documentation</strong>: Plans, specifications, and calculations related to the installation
                </li>
                <li>
                  <strong>Operation & Maintenance Information</strong>: Instructions for safe operation and maintenance
                </li>
              </ul>
            </div>
            
            <div className="flex items-center gap-3 mt-3 bg-blue-500/10 p-3 rounded-md border border-blue-500/20">
              <AlertTriangle className="h-5 w-5 text-blue-400 flex-shrink-0" />
              <p className="text-sm">
                Under UK regulations, failing to provide proper electrical certification can result in legal consequences, 
                invalidated insurance, and potential prosecution under the Electricity at Work Regulations 1989.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 2: Certification Documents */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardContent className="pt-6">
          <h3 className="text-xl font-semibold mb-4">Electrical Certification Documents</h3>
          <div className="space-y-4">
            <p>
              These are the formal documents that certify an electrical installation meets the requirements of BS 7671 
              (IET Wiring Regulations) and is safe for use.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-md p-4">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="h-5 w-5 text-elec-yellow" />
                  <h4 className="font-medium">Electrical Installation Certificate (EIC)</h4>
                </div>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>
                    Required for all new electrical installations
                  </li>
                  <li>
                    Must be issued by a competent person responsible for the design, construction, inspection and testing
                  </li>
                  <li>
                    Includes details of the installation, departures from BS 7671, and particulars of the installation
                  </li>
                  <li>
                    Must be accompanied by schedule(s) of inspections and test results
                  </li>
                </ul>
              </div>
              
              <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-md p-4">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="h-5 w-5 text-elec-yellow" />
                  <h4 className="font-medium">Minor Electrical Installation Works Certificate (MEIWC)</h4>
                </div>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>
                    Used for alterations or additions to an existing installation that do not include a new circuit
                  </li>
                  <li>
                    Simpler format than the EIC, but still confirms safety and compliance
                  </li>
                  <li>
                    Contains limited test results specific to the work carried out
                  </li>
                  <li>
                    Must be completed by a competent person
                  </li>
                </ul>
              </div>
              
              <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-md p-4">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="h-5 w-5 text-elec-yellow" />
                  <h4 className="font-medium">Electrical Installation Condition Report (EICR)</h4>
                </div>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>
                    Periodic inspection report that evaluates the condition of an existing installation
                  </li>
                  <li>
                    Identifies damage, deterioration, defects, and non-compliance with current regulations
                  </li>
                  <li>
                    Classifies observed deficiencies as C1 (danger present), C2 (potentially dangerous), or C3 (improvement recommended)
                  </li>
                  <li>
                    Now legally required for rental properties in England with periodic inspection at least every 5 years
                  </li>
                </ul>
              </div>
              
              <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-md p-4">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="h-5 w-5 text-elec-yellow" />
                  <h4 className="font-medium">Building Regulations Compliance Certificate</h4>
                </div>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>
                    Required for notifiable work under Part P of the Building Regulations
                  </li>
                  <li>
                    Issued by a registered competent person scheme member (e.g., NICEIC, ELECSA, NAPIT)
                  </li>
                  <li>
                    Confirms work meets Building Regulations requirements
                  </li>
                  <li>
                    Must be provided to the client within 30 days of completion
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 3: Test Results Documentation */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardContent className="pt-6">
          <h3 className="text-xl font-semibold mb-4">Test Results Documentation</h3>
          <div className="space-y-4">
            <p>
              Test results provide detailed evidence of the various electrical tests performed on an installation
              and confirm that the installation meets the safety parameters defined in BS 7671.
            </p>
            
            <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-md p-4">
              <h4 className="text-lg font-medium text-elec-yellow mb-2">Schedule of Test Results should include:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Circuit details and descriptions</li>
                <li>Continuity test results (R1+R2, R2, etc.)</li>
                <li>Insulation resistance values</li>
                <li>Polarity check confirmations</li>
                <li>Earth fault loop impedance values</li>
                <li>RCD operation times</li>
                <li>Prospective fault current values</li>
                <li>Circuit breaker/fuse details</li>
              </ul>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="bg-elec-dark/70 p-4 rounded-md">
                <h5 className="font-medium mb-2 text-elec-yellow">Best Practices for Test Results:</h5>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  <li>Include all required data fields with no omissions</li>
                  <li>Use consistent units of measurement</li>
                  <li>Ensure legibility of handwritten results</li>
                  <li>Provide clear circuit identification</li>
                  <li>Include date and tester information</li>
                </ul>
              </div>
              
              <div className="bg-elec-dark/70 p-4 rounded-md">
                <h5 className="font-medium mb-2 text-elec-yellow">Modern Documentation Methods:</h5>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  <li>Digital test instruments with data logging</li>
                  <li>Mobile apps for test result recording</li>
                  <li>Electronic certification software</li>
                  <li>Cloud storage for secure documentation backup</li>
                  <li>QR codes for client access to documentation</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Separator className="bg-elec-yellow/30" />
      
      {/* Section 4: Handover Documentation */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardContent className="pt-6">
          <h3 className="text-xl font-semibold mb-4">Handover Documentation</h3>
          <div className="space-y-4">
            <p>
              The handover documentation package provides essential information to the client or end user for the 
              safe operation, maintenance, and future modification of the electrical installation.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border border-green-500/20 bg-elec-dark/50">
                <CardContent className="pt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="h-5 w-5 text-green-400" />
                    <h4 className="font-medium text-green-400">Design Documentation</h4>
                  </div>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>As-built drawings</li>
                    <li>Schematic diagrams</li>
                    <li>Distribution board schedules</li>
                    <li>Design calculations</li>
                    <li>Cable sizing information</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="border border-green-500/20 bg-elec-dark/50">
                <CardContent className="pt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-5 w-5 text-green-400" />
                    <h4 className="font-medium text-green-400">Operation & Maintenance</h4>
                  </div>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>User operation manuals</li>
                    <li>Maintenance schedules</li>
                    <li>Equipment data sheets</li>
                    <li>Spare parts information</li>
                    <li>Troubleshooting guides</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="border border-green-500/20 bg-elec-dark/50">
                <CardContent className="pt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <PackageCheck className="h-5 w-5 text-green-400" />
                    <h4 className="font-medium text-green-400">Warranties & Commissioning</h4>
                  </div>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Equipment warranties</li>
                    <li>Workmanship guarantees</li>
                    <li>Commissioning records</li>
                    <li>Product registration details</li>
                    <li>Insurance backed guarantees</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            <div className="flex items-center gap-3 mt-4 bg-orange-500/10 p-3 rounded-md border border-orange-500/20">
              <AlertTriangle className="h-5 w-5 text-orange-500 flex-shrink-0" />
              <p className="text-sm">
                Health and Safety File: For projects falling under the Construction (Design and Management) Regulations 2015, 
                the electrical documentation forms part of the Health and Safety File that must be provided to the client.
              </p>
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

export default Subsection10_3;
