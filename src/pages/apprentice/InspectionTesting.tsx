
import { useState } from "react";
import BackButton from "@/components/common/BackButton";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, ListChecks, Zap, BookOpen, ShieldCheck, FileClock, BarChart4 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const InspectionTesting = () => {
  const [activeTab, setActiveTab] = useState("fundamentals");

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in px-4">
      <div className="flex flex-col items-center justify-center mb-4">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">Inspection & Testing</h1>
        <p className="text-center text-muted-foreground text-sm sm:text-base mb-4 max-w-3xl">
          Comprehensive guide to electrical inspection and testing procedures, techniques, 
          and documentation required for verifying the safety and compliance of electrical installations.
        </p>
        <BackButton customUrl="/apprentice/study" label="Back to Study Centre" />
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-6">
          <TabsTrigger value="fundamentals" className="text-xs sm:text-sm">Fundamentals</TabsTrigger>
          <TabsTrigger value="initial" className="text-xs sm:text-sm">Initial Verification</TabsTrigger>
          <TabsTrigger value="periodic" className="text-xs sm:text-sm">Periodic Inspection</TabsTrigger>
          <TabsTrigger value="resources" className="text-xs sm:text-sm">Resources</TabsTrigger>
        </TabsList>

        {/* Fundamentals Tab */}
        <TabsContent value="fundamentals" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <Card className="border-elec-yellow/20 bg-gradient-to-b from-elec-gray to-elec-gray/80 hover:from-elec-gray/90 hover:to-elec-gray/70 transition-all duration-300 shadow-lg shadow-black/20">
              <CardContent className="flex flex-col items-center justify-center p-5 sm:p-6 h-full">
                <ShieldCheck className="h-10 w-10 text-elec-yellow mb-3 sm:mb-4" />
                <h2 className="text-base sm:text-xl font-bold mb-2 text-center">Safe isolation procedures</h2>
                <p className="text-center text-muted-foreground text-sm">
                  Essential procedures for safely isolating electrical systems before testing
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-elec-yellow/20 bg-gradient-to-b from-elec-gray to-elec-gray/80 hover:from-elec-gray/90 hover:to-elec-gray/70 transition-all duration-300 shadow-lg shadow-black/20">
              <CardContent className="flex flex-col items-center justify-center p-5 sm:p-6 h-full">
                <ListChecks className="h-10 w-10 text-elec-yellow mb-3 sm:mb-4" />
                <h2 className="text-base sm:text-xl font-bold mb-2 text-center">Inspection methodology</h2>
                <p className="text-center text-muted-foreground text-sm">
                  Structured approach to visual inspection and testing sequence
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-elec-yellow/20 bg-gradient-to-b from-elec-gray to-elec-gray/80 hover:from-elec-gray/90 hover:to-elec-gray/70 transition-all duration-300 shadow-lg shadow-black/20">
              <CardContent className="flex flex-col items-center justify-center p-5 sm:p-6 h-full">
                <Zap className="h-10 w-10 text-elec-yellow mb-3 sm:mb-4" />
                <h2 className="text-base sm:text-xl font-bold mb-2 text-center">Testing principles</h2>
                <p className="text-center text-muted-foreground text-sm">
                  Core principles of electrical testing and test equipment requirements
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-elec-yellow/20 bg-gradient-to-b from-elec-gray to-elec-gray/80 hover:from-elec-gray/90 hover:to-elec-gray/70 transition-all duration-300 shadow-lg shadow-black/20">
              <CardContent className="flex flex-col items-center justify-center p-5 sm:p-6 h-full">
                <BookOpen className="h-10 w-10 text-elec-yellow mb-3 sm:mb-4" />
                <h2 className="text-base sm:text-xl font-bold mb-2 text-center">Regulatory framework</h2>
                <p className="text-center text-muted-foreground text-sm">
                  Standards and regulations governing electrical inspection and testing
                </p>
              </CardContent>
            </Card>
            
            <Link to="/apprentice/study/testing-procedures" className="block w-full">
              <Card className="border-elec-yellow/20 bg-gradient-to-b from-elec-gray to-elec-gray/80 hover:from-elec-gray/90 hover:to-elec-gray/70 transition-all duration-300 shadow-lg shadow-black/20 h-full">
                <CardContent className="flex flex-col items-center justify-center p-5 sm:p-6 h-full">
                  <FileText className="h-10 w-10 text-elec-yellow mb-3 sm:mb-4" />
                  <h2 className="text-base sm:text-xl font-bold mb-2 text-center">Testing procedures</h2>
                  <p className="text-center text-muted-foreground text-sm">
                    Step-by-step procedures for all required electrical tests
                  </p>
                  <Button variant="outline" size="sm" className="mt-3 sm:mt-4">
                    View Detailed Procedures
                  </Button>
                </CardContent>
              </Card>
            </Link>

            <Card className="border-elec-yellow/20 bg-gradient-to-b from-elec-gray to-elec-gray/80 hover:from-elec-gray/90 hover:to-elec-gray/70 transition-all duration-300 shadow-lg shadow-black/20">
              <CardContent className="flex flex-col items-center justify-center p-5 sm:p-6 h-full">
                <BarChart4 className="h-10 w-10 text-elec-yellow mb-3 sm:mb-4" />
                <h2 className="text-base sm:text-xl font-bold mb-2 text-center">Test result analysis</h2>
                <p className="text-center text-muted-foreground text-sm">
                  Interpreting and evaluating test results against standards
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-elec-dark/50 rounded-lg p-4 sm:p-6 border border-elec-yellow/30">
            <h3 className="text-lg sm:text-xl font-semibold mb-3 text-elec-yellow">Key Testing Requirements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-3">
                <h4 className="font-medium">Essential Tests</h4>
                <ul className="list-disc ml-5 space-y-1 text-sm sm:text-base">
                  <li>Continuity of protective conductors and bonding</li>
                  <li>Continuity of ring final circuit conductors</li>
                  <li>Insulation resistance tests</li>
                  <li>Protection by SELV, PELV or electrical separation</li>
                  <li>Protection by barriers or enclosures</li>
                  <li>Polarity</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium">Additional Tests</h4>
                <ul className="list-disc ml-5 space-y-1 text-sm sm:text-base">
                  <li>Earth fault loop impedance</li>
                  <li>Prospective fault current</li>
                  <li>RCD operation</li>
                  <li>Phase sequence</li>
                  <li>Functional testing</li>
                  <li>Voltage drop (where required)</li>
                </ul>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Initial Verification Tab */}
        <TabsContent value="initial" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Card className="border-elec-yellow/20 bg-elec-dark/50">
              <CardContent className="p-5 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-3 text-elec-yellow flex items-center">
                  <ListChecks className="h-5 w-5 mr-2" />
                  Visual Inspection
                </h3>
                <p className="text-sm mb-3">
                  Visual inspection must be conducted before testing and includes checking:
                </p>
                <ul className="list-disc ml-5 space-y-1 text-sm">
                  <li>Connection and identification of conductors</li>
                  <li>Presence of protective devices</li>
                  <li>Presence of appropriate devices for isolation</li>
                  <li>Selection of equipment suitable for environmental conditions</li>
                  <li>Prevention of harmful effects</li>
                  <li>Appropriate routing of cables</li>
                  <li>Presence of diagrams, instructions and warning signs</li>
                  <li>Accessibility for operation and maintenance</li>
                  <li>Connection of single-pole devices in line conductors</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-elec-yellow/20 bg-elec-dark/50">
              <CardContent className="p-5 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-3 text-elec-yellow flex items-center">
                  <Zap className="h-5 w-5 mr-2" />
                  Testing Sequence
                </h3>
                <p className="text-sm mb-3">
                  Tests must be performed in this specific sequence:
                </p>
                <ol className="list-decimal ml-5 space-y-1 text-sm">
                  <li>Continuity of protective conductors</li>
                  <li>Continuity of ring final circuit conductors</li>
                  <li>Insulation resistance</li>
                  <li>Protection by SELV, PELV or electrical separation</li>
                  <li>Protection by barriers or enclosures</li>
                  <li>Polarity</li>
                  <li>Earth fault loop impedance</li>
                  <li>Prospective fault current</li>
                  <li>RCD operation</li>
                  <li>Phase sequence</li>
                  <li>Functional testing</li>
                </ol>
              </CardContent>
            </Card>

            <Card className="border-elec-yellow/20 bg-elec-dark/50 md:col-span-2">
              <CardContent className="p-5 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-3 text-elec-yellow flex items-center">
                  <FileClock className="h-5 w-5 mr-2" />
                  Documentation Requirements
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <h4 className="font-medium mb-2">Electrical Installation Certificate (EIC)</h4>
                    <p className="text-sm mb-2">
                      Required for new installations, additions or alterations. Must include:
                    </p>
                    <ul className="list-disc ml-5 space-y-1 text-sm">
                      <li>Details of the client, installation address, and description</li>
                      <li>Design, construction, inspection & testing declarations</li>
                      <li>Next inspection recommendation</li>
                      <li>Schedule of inspections</li>
                      <li>Schedule of test results</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Minor Electrical Installation Works Certificate</h4>
                    <p className="text-sm mb-3">
                      For minor works not involving a new circuit.
                    </p>
                    
                    <h4 className="font-medium mb-2">Documentation to be Provided</h4>
                    <ul className="list-disc ml-5 space-y-1 text-sm">
                      <li>Electrical installation certificates</li>
                      <li>Schedule of test results</li>
                      <li>Schedule of inspections</li>
                      <li>Distribution board schedules</li>
                      <li>As-built drawings and diagrams</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Periodic Inspection Tab */}
        <TabsContent value="periodic" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Card className="border-elec-yellow/20 bg-elec-dark/50">
              <CardContent className="p-5 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-3 text-elec-yellow flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  EICR Purpose and Requirements
                </h3>
                <p className="text-sm mb-3">
                  Electrical Installation Condition Reports (EICR) are required to:
                </p>
                <ul className="list-disc ml-5 space-y-1 text-sm">
                  <li>Determine if an installation is in a satisfactory condition for continued use</li>
                  <li>Identify damage, deterioration, defects and dangerous conditions</li>
                  <li>Assess compliance with current regulations</li>
                  <li>Provide a record of the installation at the time of inspection</li>
                  <li>Specify recommended remedial work priority</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-elec-yellow/20 bg-elec-dark/50">
              <CardContent className="p-5 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-3 text-elec-yellow flex items-center">
                  <BarChart4 className="h-5 w-5 mr-2" />
                  Classification Codes
                </h3>
                <p className="text-sm mb-3">
                  Defects must be classified according to severity:
                </p>
                <ul className="list-disc ml-5 space-y-1 text-sm">
                  <li><span className="font-medium">C1 - Danger present:</span> Risk of injury. Immediate action required</li>
                  <li><span className="font-medium">C2 - Potentially dangerous:</span> Urgent remedial action required</li>
                  <li><span className="font-medium">C3 - Improvement recommended:</span> Not compliant with regulations but not dangerous</li>
                  <li><span className="font-medium">FI - Further investigation required:</span> Additional examination needed</li>
                </ul>
                <div className="mt-3 bg-amber-950/30 p-3 rounded-md text-amber-200 text-sm">
                  <p className="font-medium">Important:</p>
                  <p>Any C1 or C2 observations mean the installation cannot be deemed satisfactory.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-elec-yellow/20 bg-elec-dark/50 md:col-span-2">
              <CardContent className="p-5 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-3 text-elec-yellow flex items-center">
                  <ListChecks className="h-5 w-5 mr-2" />
                  Extent and Limitations
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <h4 className="font-medium mb-2">Defining the Inspection Extent</h4>
                    <p className="text-sm mb-2">
                      The EICR must clearly state:
                    </p>
                    <ul className="list-disc ml-5 space-y-1 text-sm">
                      <li>Which parts of the installation were inspected</li>
                      <li>Any areas not covered by the inspection</li>
                      <li>The agreed extent of the inspection and testing</li>
                      <li>Any limitations agreed with the client</li>
                      <li>Reasons for any limitations encountered</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Sampling Techniques</h4>
                    <p className="text-sm mb-3">
                      Where sampling is employed:
                    </p>
                    <ul className="list-disc ml-5 space-y-1 text-sm">
                      <li>The sampling method must be recorded</li>
                      <li>Samples must be representative of the installation</li>
                      <li>Sufficient accessible points must be inspected</li>
                      <li>The report must include details of the sample size</li>
                      <li>The report must explain why sampling was necessary</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-4 bg-elec-dark/70 p-3 rounded-md text-sm">
                  <p className="font-medium text-elec-yellow">Professional Judgment:</p>
                  <p>The inspector must use professional judgment to determine the extent of inspection and testing appropriate for each installation, based on age, apparent condition, and documentation available.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Resources Tab */}
        <TabsContent value="resources" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Card className="border-elec-yellow/20 bg-elec-dark/50">
              <CardContent className="p-5 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-3 text-elec-yellow flex items-center">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Key Reference Documents
                </h3>
                <ul className="list-disc ml-5 space-y-2 text-sm">
                  <li><span className="font-medium">BS 7671:</span> Requirements for Electrical Installations (IET Wiring Regulations)</li>
                  <li><span className="font-medium">Guidance Note 3:</span> Inspection & Testing</li>
                  <li><span className="font-medium">On-Site Guide:</span> BS 7671 practical application guidance</li>
                  <li><span className="font-medium">IET Code of Practice:</span> for Electrical Safety Management</li>
                  <li><span className="font-medium">HSE Guidance:</span> Electricity at Work Regulations 1989</li>
                </ul>
                <div className="mt-3">
                  <Link to="/apprentice/study/mock-exams">
                    <Button variant="outline" size="sm" className="w-full">
                      Practice With Mock Exams
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="border-elec-yellow/20 bg-elec-dark/50">
              <CardContent className="p-5 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-3 text-elec-yellow flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Downloadable Resources
                </h3>
                <ul className="list-disc ml-5 space-y-2 text-sm">
                  <li><span className="font-medium">Test Sheet Templates:</span> Formatted sheets for recording test results</li>
                  <li><span className="font-medium">Visual Inspection Checklist:</span> Comprehensive list of items to inspect</li>
                  <li><span className="font-medium">Certificate Examples:</span> Completed EIC and EICR examples</li>
                  <li><span className="font-medium">Schedule Templates:</span> For distribution boards and circuits</li>
                  <li><span className="font-medium">Test Procedure Guides:</span> Step-by-step testing procedures</li>
                </ul>
                <div className="mt-3">
                  <Link to="/apprentice/study/testing-procedures">
                    <Button variant="outline" size="sm" className="w-full">
                      View Testing Procedures
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="border-elec-yellow/20 bg-elec-dark/50 md:col-span-2">
              <CardContent className="p-5 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-3 text-elec-yellow flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Test Equipment Requirements
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <h4 className="font-medium mb-2">Required Test Instruments</h4>
                    <ul className="list-disc ml-5 space-y-1 text-sm">
                      <li>Low resistance ohmmeter (continuity tester)</li>
                      <li>Insulation resistance tester</li>
                      <li>Earth fault loop impedance tester</li>
                      <li>RCD tester</li>
                      <li>Prospective fault current tester</li>
                      <li>Approved voltage indicator</li>
                      <li>Proving unit</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Equipment Standards</h4>
                    <p className="text-sm mb-2">
                      All test equipment must:
                    </p>
                    <ul className="list-disc ml-5 space-y-1 text-sm">
                      <li>Comply with relevant parts of BS EN 61557</li>
                      <li>Be calibrated and have a valid calibration certificate</li>
                      <li>Be fit for purpose and appropriate for the tests being performed</li>
                      <li>Be maintained in good condition and checked before use</li>
                      <li>Be used in accordance with manufacturer's instructions</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="bg-amber-950/20 border border-amber-600/30 rounded-md p-3 mt-6 flex items-start gap-3">
        <FileText className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
        <p className="text-xs sm:text-sm text-amber-200/90">
          <strong>Important:</strong> All inspection and testing must be carried out by competent persons with suitable knowledge and experience. 
          Always refer to the latest edition of BS 7671 and follow safe working practices.
        </p>
      </div>
    </div>
  );
};

export default InspectionTesting;
