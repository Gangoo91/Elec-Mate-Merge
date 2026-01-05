
import { ArrowLeft, ArrowRight, CheckSquare, FileText, AlertTriangle, Shield, Eye, ClipboardList, Zap, Settings, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import Module2Section7Quiz from '@/components/upskilling/Module2Section7Quiz';

const Module2Section7 = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-8">
        <Link to="../module-2">
          <Button
            variant="ghost"
            className="bg-card text-white hover:bg-card/80 hover:text-yellow-400 transition-all duration-200 mb-6 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 2
          </Button>
        </Link>
        
        <div className="space-y-3">
          <Badge 
            variant="secondary" 
            className="bg-yellow-600/40 text-yellow-400 hover:bg-yellow-600/50 font-semibold text-sm px-4 py-2 border-0"
          >
            Section 7
          </Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Pre-Test Preparation Checklist
          </h1>
          <p className="text-lg sm:text-xl text-white max-w-3xl">
            Systematic preparation procedures and comprehensive checklists before commencing electrical testing
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Quick Intro */}
          <Card className="bg-card border-yellow-400/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckSquare className="h-5 w-5 text-yellow-400" />
                Quick Introduction
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white">
              <p className="mb-4">
                Before you start testing, proper preparation ensures accuracy, efficiency, and safety. 
                This section gives you a repeatable pre-test checklist to follow every time.
              </p>
              <p>
                Proper preparation can prevent up to 80% of common testing errors and significantly reduces 
                the risk of accidents or equipment damage. Every professional electrician should develop 
                and follow a consistent pre-test routine.
              </p>
            </CardContent>
          </Card>

          {/* Learning Outcomes */}
          <Card className="bg-card border-yellow-400/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <FileText className="h-5 w-5 text-yellow-400" />
                Learning Outcomes
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-3">
              <p className="mb-4">By the end of this section, you'll be able to:</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Apply a consistent checklist before testing any installation
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Ensure all tools, documentation, and site conditions are ready
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Reduce the chance of errors, missed steps, or unsafe outcomes
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Identify potential hazards before they become problems
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Establish proper communication protocols with site personnel
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Why Pre-Test Preparation Matters */}
          <Card className="bg-card border-yellow-400/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-yellow-400" />
                Why Pre-Test Preparation Matters
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p>
                Testing without proper preparation is like driving without checking your mirrors - 
                you might get there, but you're taking unnecessary risks. Here's why systematic 
                preparation is crucial:
              </p>
              
              <h4 className="text-white font-semibold mt-6 mb-3">Common Consequences of Poor Preparation:</h4>
              <div className="space-y-3">
                <div>
                  <h5 className="text-yellow-400 font-medium">Incorrect Test Results</h5>
                  <p className="text-sm text-white">
                    Using damaged test leads or uncalibrated instruments can give false readings, 
                    leading to dangerous installations being passed as safe.
                  </p>
                </div>
                <div>
                  <h5 className="text-yellow-400 font-medium">Equipment Damage</h5>
                  <p className="text-sm text-white">
                    Testing circuits with connected sensitive equipment can result in expensive 
                    damage to computers, medical equipment, or control systems.
                  </p>
                </div>
                <div>
                  <h5 className="text-yellow-400 font-medium">Personal Injury</h5>
                  <p className="text-sm text-white">
                    Working on live circuits due to inadequate isolation procedures remains 
                    one of the leading causes of electrical accidents.
                  </p>
                </div>
                <div>
                  <h5 className="text-yellow-400 font-medium">Legal Consequences</h5>
                  <p className="text-sm text-white">
                    Certificates issued based on inadequate testing can result in professional 
                    liability claims and regulatory action.
                  </p>
                </div>
              </div>

              <h4 className="text-white font-semibold mt-6 mb-3">Benefits of Proper Preparation:</h4>
              <ul className="space-y-1 text-sm">
                <li>• Reduces testing time by up to 30% through efficient workflow</li>
                <li>• Minimises return visits due to incomplete or incorrect testing</li>
                <li>• Builds client confidence through professional approach</li>
                <li>• Protects your professional reputation and insurance coverage</li>
                <li>• Ensures compliance with BS 7671 and GS 38 requirements</li>
              </ul>
            </CardContent>
          </Card>

          {/* Detailed Pre-Test Checklist */}
          <Card className="bg-card border-yellow-400/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <ClipboardList className="h-5 w-5 text-yellow-400" />
                Comprehensive Pre-Test Checklist
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <Shield className="h-4 w-4 text-yellow-400" />
                    1. Site Assessment and Safety Verification
                  </h4>
                  <div className="ml-6 space-y-2 text-sm">
                    <p><strong>Environmental Conditions:</strong></p>
                    <ul className="ml-4 space-y-1">
                      <li>• Check ambient temperature (instruments may have operating limits)</li>
                      <li>• Verify adequate lighting at all test locations</li>
                      <li>• Ensure dry conditions - postpone testing if damp/wet</li>
                      <li>• Assess ventilation, especially in confined spaces</li>
                    </ul>
                    
                    <p className="mt-3"><strong>Access and Workspace:</strong></p>
                    <ul className="ml-4 space-y-1">
                      <li>• Clear access routes to distribution boards and test points</li>
                      <li>• Adequate workspace around equipment for safe operation</li>
                      <li>• Stable surfaces for placing test instruments</li>
                      <li>• Emergency exit routes identified and unobstructed</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-yellow-400" />
                    2. Documentation Review and Risk Assessment
                  </h4>
                  <div className="ml-6 space-y-2 text-sm">
                    <p><strong>Essential Documentation:</strong></p>
                    <ul className="ml-4 space-y-1">
                      <li>• Current RAMS (Risk Assessment & Method Statement)</li>
                      <li>• Previous EICR or installation certificates</li>
                      <li>• Circuit schedules and distribution board charts</li>
                      <li>• As-built drawings (if available)</li>
                      <li>• Permit to work or access authorisation</li>
                    </ul>
                    
                    <p className="mt-3"><strong>Risk Assessment Review:</strong></p>
                    <ul className="ml-4 space-y-1">
                      <li>• Confirm all identified hazards are still relevant</li>
                      <li>• Check if any new hazards have emerged since assessment</li>
                      <li>• Verify control measures are in place and effective</li>
                      <li>• Ensure all team members understand the risks</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <Settings className="h-4 w-4 text-yellow-400" />
                    3. Test Equipment Verification
                  </h4>
                  <div className="ml-6 space-y-2 text-sm">
                    <p><strong>Instrument Checks:</strong></p>
                    <ul className="ml-4 space-y-1">
                      <li>• Visual inspection for physical damage (cases, leads, probes)</li>
                      <li>• Verify calibration certificates are within validity period</li>
                      <li>• Check battery levels and replace if necessary</li>
                      <li>• Ensure correct instruments for the type of installation</li>
                      <li>• Test instrument self-checks and auto-calibration functions</li>
                    </ul>
                    
                    <p className="mt-3"><strong>Test Lead Inspection (GS 38 Compliance):</strong></p>
                    <ul className="ml-4 space-y-1">
                      <li>• Insulation intact with no cuts, nicks, or exposed conductors</li>
                      <li>• Probe tips not bent, damaged, or excessively worn</li>
                      <li>• Finger guards present and secure</li>
                      <li>• Lead-to-instrument connections tight and secure</li>
                      <li>• Continuity check between probe and instrument terminal</li>
                    </ul>

                    <p className="mt-3"><strong>Voltage Indicator Testing:</strong></p>
                    <ul className="ml-4 space-y-1">
                      <li>• Prove on known live source before use</li>
                      <li>• Check all voltage ranges function correctly</li>
                      <li>• Verify audible and visual indicators work</li>
                      <li>• Test auto-off function (if fitted)</li>
                      <li>• Prove again on known live source after testing</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <Zap className="h-4 w-4 text-yellow-400" />
                    4. Isolation and Lock-Off Procedures
                  </h4>
                  <div className="ml-6 space-y-2 text-sm">
                    <p><strong>Isolation Planning:</strong></p>
                    <ul className="ml-4 space-y-1">
                      <li>• Identify all sources of supply to the installation</li>
                      <li>• Plan isolation sequence to minimise disruption</li>
                      <li>• Coordinate with building occupants and operations</li>
                      <li>• Prepare appropriate lock-off devices and tags</li>
                    </ul>
                    
                    <p className="mt-3"><strong>Communication Protocol:</strong></p>
                    <ul className="ml-4 space-y-1">
                      <li>• Notify all affected parties of planned outages</li>
                      <li>• Post clear warning signs: "Danger - Do Not Switch On"</li>
                      <li>• Establish communication method for emergency re-energisation</li>
                      <li>• Document who has keys/access to locked-off switches</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-semibold mb-3">5. Personal Preparation and PPE</h4>
                  <div className="ml-6 space-y-2 text-sm">
                    <p><strong>Personal Protective Equipment:</strong></p>
                    <ul className="ml-4 space-y-1">
                      <li>• Safety glasses or face protection</li>
                      <li>• Insulated gloves (if working near live parts)</li>
                      <li>• Safety footwear with electrical protection</li>
                      <li>• High-visibility clothing (if required by site rules)</li>
                      <li>• Hard hat (construction sites or industrial environments)</li>
                    </ul>
                    
                    <p className="mt-3"><strong>Personal Readiness:</strong></p>
                    <ul className="ml-4 space-y-1">
                      <li>• Well-rested and alert - avoid testing when fatigued</li>
                      <li>• Remove jewellery that could create electrical hazards</li>
                      <li>• Ensure competency for the specific type of testing</li>
                      <li>• Have emergency contact numbers readily available</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Common Preparation Mistakes */}
          <Card className="bg-card border-yellow-400/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
                Common Preparation Mistakes to Avoid
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="space-y-4">
                <div>
                  <h5 className="text-white font-medium">Rushing the preparation phase</h5>
                  <p className="text-sm text-white">
                    Taking shortcuts during preparation often leads to longer overall job times 
                    due to problems discovered later. Always allow adequate time for thorough preparation.
                  </p>
                </div>

                <div>
                  <h5 className="text-white font-medium">Assuming previous information is current</h5>
                  <p className="text-sm text-white">
                    Installations change over time. Always verify circuit information and 
                    don't rely solely on old documentation or your memory from previous visits.
                  </p>
                </div>

                <div>
                  <h5 className="text-white font-medium">Inadequate communication with site personnel</h5>
                  <p className="text-sm text-white">
                    Failing to properly inform building occupants can result in circuits being 
                    switched back on during testing, creating dangerous situations.
                  </p>
                </div>

                <div>
                  <h5 className="text-white font-medium">Using instruments beyond calibration dates</h5>
                  <p className="text-sm text-white">
                    Out-of-calibration instruments can give false readings, potentially passing 
                    dangerous installations or failing safe ones unnecessarily.
                  </p>
                </div>

                <div>
                  <h5 className="text-white font-medium">Neglecting to disconnect sensitive equipment</h5>
                  <p className="text-sm text-white">
                    High-voltage testing can damage electronic equipment. Always check what's 
                    connected before applying test voltages.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Professional Best Practices */}
          <Card className="bg-card border-yellow-400/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Eye className="h-5 w-5 text-yellow-400" />
                Professional Best Practices
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="space-y-4">
                <div>
                  <h5 className="text-white font-medium">Develop a Standard Operating Procedure</h5>
                  <p className="text-sm text-white">
                    Create a written checklist specific to your work environment and stick to it. 
                    This ensures consistency across different jobs and team members. Review and 
                    update your procedure regularly based on experience and changing regulations.
                  </p>
                </div>

                <div>
                  <h5 className="text-white font-medium">Use Technology to Your Advantage</h5>
                  <p className="text-sm text-white">
                    Consider using smartphone apps or digital checklists to ensure you don't 
                    miss steps. Many modern test instruments can store calibration dates and 
                    remind you when recalibration is due.
                  </p>
                </div>

                <div>
                  <h5 className="text-white font-medium">Build Relationships with Site Personnel</h5>
                  <p className="text-sm text-white">
                    Good working relationships with facilities managers, security staff, and 
                    building occupants make your job easier and safer. They can provide valuable 
                    local knowledge about the installation.
                  </p>
                </div>

                <div>
                  <h5 className="text-white font-medium">Plan for Contingencies</h5>
                  <p className="text-sm text-white">
                    Always have backup plans. What if your primary test instrument fails? 
                    What if a circuit can't be isolated as planned? Thinking ahead prevents 
                    delays and maintains professional standards.
                  </p>
                </div>

                <div>
                  <h5 className="text-white font-medium">Document Everything</h5>
                  <p className="text-sm text-white">
                    Keep records of your preparation activities, especially any deviations from 
                    standard procedures. This protects you professionally and helps improve 
                    future preparation procedures.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Interactive Quiz */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckSquare className="h-5 w-5 text-yellow-400" />
                Test Your Knowledge
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Module2Section7Quiz />
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between items-center pt-8">
            <Link to="module-2/section-6">
              <Button
                variant="outline"
                className="border-gray-600 text-white hover:bg-gradient-to-r hover:from-gray-700/30 hover:to-gray-800/30 hover:text-white"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous: Environmental & Site-Specific Hazards
              </Button>
            </Link>
            
            <Link to="../module-2">
              <Button
                className="bg-gradient-to-r from-elec-yellow to-yellow-500 text-black hover:from-yellow-400 hover:to-yellow-600 font-semibold"
              >
                Module 2 Overview
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Module2Section7;
