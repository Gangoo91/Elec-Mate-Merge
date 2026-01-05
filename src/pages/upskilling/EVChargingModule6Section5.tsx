import { ArrowLeft, ArrowRight, Users, BookOpen, Target, AlertTriangle, CheckCircle, HelpCircle, Lightbulb, FileText, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import EVChargingModule6Section5Quiz from '@/components/upskilling/quiz/EVChargingModule6Section5Quiz';

const EVChargingModule6Section5 = () => {
  useEffect(() => {
    document.title = 'Customer Walkthrough and Labelling - EV Charging Module 6 Section 5';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Learn customer walkthrough procedures and system labelling requirements for EV charging installations. Master handover protocols and BS 7671 compliance.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-8">
        <Link to="../ev-charging-module-6">
          <Button
            variant="ghost"
            className="bg-card text-white hover:bg-card/80 hover:text-yellow-400 transition-all duration-200 mb-6 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 6
          </Button>
        </Link>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Users className="h-8 w-8 text-yellow-400" />
            <Badge 
              variant="secondary" 
              className="bg-yellow-600/40 text-yellow-400 hover:bg-yellow-600/50 font-semibold text-sm px-3 py-1 border-0"
            >
              Module 6 - Section 5
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Customer Walkthrough and Labelling
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl">
            Professional handover procedures and comprehensive system labelling
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-4xl mx-auto space-y-8">

          {/* Introduction */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <div className="flex items-center gap-3">
                <BookOpen className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Introduction</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>
                The customer walkthrough and proper system labelling are critical final steps in any EV charging 
                installation. This process ensures that customers understand how to safely operate their charging 
                equipment, are aware of maintenance requirements, and can identify system components. Proper 
                labelling also ensures compliance with BS 7671 and provides essential safety information for 
                future maintenance and inspection activities.
              </p>
              
              <div className="bg-card/80 p-4 rounded-lg">
                <h4 className="font-semibold text-white mb-2">Professional Standards</h4>
                <ul className="text-sm space-y-1">
                  <li>• Comprehensive customer education and demonstration</li>
                  <li>• BS 7671 Section 514 labelling compliance</li>
                  <li>• Safety information and emergency procedures</li>
                  <li>• Maintenance schedules and documentation</li>
                  <li>• Warranty and support information provision</li>
                  <li>• Professional handover documentation</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Learning Outcomes */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Target className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Learning Outcomes</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-300">
              <div className="space-y-3">
                {[
                  "Plan and conduct effective customer walkthroughs",
                  "Demonstrate safe operation procedures to customers",
                  "Explain maintenance requirements and schedules",
                  "Understand BS 7671 labelling requirements",
                  "Apply correct labelling standards and materials",
                  "Create comprehensive system identification",
                  "Document customer training and handover",
                  "Provide ongoing support information and contacts"
                ].map((outcome, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>{outcome}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Content/Learning */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Users className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Customer Walkthrough Procedures</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              
              {/* Walkthrough Structure */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Structured Walkthrough Process</h3>
                <div className="space-y-4">
                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-3">Pre-Walkthrough Preparation</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-yellow-400 mb-2">Documentation Ready</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Installation certificate completed</li>
                          <li>• Test results recorded and verified</li>
                          <li>• User manual and warranty information</li>
                          <li>• Maintenance schedule prepared</li>
                          <li>• Emergency contact details</li>
                          <li>• Commissioning checklist completed</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-yellow-400 mb-2">System Verification</h5>
                        <ul className="text-sm space-y-1">
                          <li>• All testing completed successfully</li>
                          <li>• System fully operational</li>
                          <li>• Safety devices tested and functional</li>
                          <li>• Labelling completed and verified</li>
                          <li>• Site cleaned and tidied</li>
                          <li>• Tools and materials removed</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-3">40-Minute Walkthrough Structure</h4>
                    <div className="space-y-4">
                      <div className="border-l-4 border-yellow-400 pl-4">
                        <h6 className="font-semibold text-white mb-2">1. System Overview (10 minutes)</h6>
                        <ul className="space-y-1 text-sm">
                          <li>• Complete system layout explanation</li>
                          <li>• Key components and their functions</li>
                          <li>• Isolation points and emergency stops</li>
                          <li>• Safety features and protection devices</li>
                        </ul>
                      </div>
                      
                      <div className="border-l-4 border-yellow-400 pl-4">
                        <h6 className="font-semibold text-white mb-2">2. Operation Demonstration (15 minutes)</h6>
                        <ul className="space-y-1 text-sm">
                          <li>• Normal charging procedure</li>
                          <li>• Authentication methods (RFID, app, etc.)</li>
                          <li>• Status indicators and their meanings</li>
                          <li>• Scheduling and smart charging features</li>
                          <li>• Emergency stop and fault procedures</li>
                        </ul>
                      </div>
                      
                      <div className="border-l-4 border-yellow-400 pl-4">
                        <h6 className="font-semibold text-white mb-2">3. Maintenance and Care (10 minutes)</h6>
                        <ul className="space-y-1 text-sm">
                          <li>• Regular cleaning and inspection</li>
                          <li>• Monthly RCD testing procedure</li>
                          <li>• Annual professional inspection requirements</li>
                          <li>• Common faults and troubleshooting</li>
                          <li>• When to call for service</li>
                        </ul>
                      </div>
                      
                      <div className="border-l-4 border-yellow-400 pl-4">
                        <h6 className="font-semibold text-white mb-2">4. Documentation Handover (5 minutes)</h6>
                        <ul className="space-y-1 text-sm">
                          <li>• Installation certificate explanation</li>
                          <li>• Warranty terms and conditions</li>
                          <li>• Contact information for support</li>
                          <li>• Maintenance record keeping</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Labelling Requirements */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">BS 7671 Labelling Standards</h3>
                <div className="space-y-4">
                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-3">Mandatory Labelling Requirements</h4>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <h5 className="font-medium text-yellow-400 mb-2">Consumer Unit Labels</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Circuit identification</li>
                          <li>• Maximum demand</li>
                          <li>• RCD test schedule</li>
                          <li>• Emergency contact details</li>
                          <li>• Installation date</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-yellow-400 mb-2">Charging Point Labels</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Maximum charging current</li>
                          <li>• Voltage and phase information</li>
                          <li>• Emergency stop procedure</li>
                          <li>• Warning notices</li>
                          <li>• Manufacturer details</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-yellow-400 mb-2">Cable Labels</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Cable identification</li>
                          <li>• Route marking</li>
                          <li>• Voltage warnings</li>
                          <li>• Installation method</li>
                          <li>• Depth markers (buried cables)</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-3">Label Materials and Durability</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-yellow-400 mb-2">Indoor Applications</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Laminated paper or vinyl acceptable</li>
                          <li>• UV-resistant for areas with natural light</li>
                          <li>• Temperature range: -10°C to +70°C</li>
                          <li>• Minimum 10-year durability</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-yellow-400 mb-2">Outdoor Applications</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Marine-grade vinyl or aluminium</li>
                          <li>• UV-stable inks and materials</li>
                          <li>• Temperature range: -20°C to +80°C</li>
                          <li>• Weather-resistant adhesive</li>
                          <li>• Minimum 15-year durability</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Check */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Quick Check</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p className="font-medium text-white">Test your understanding with these quick questions:</p>
              
              <div className="space-y-4">
                <div className="bg-card/80 p-4 rounded-lg">
                  <p className="font-medium text-white mb-2">1. What is the minimum duration for a comprehensive customer walkthrough?</p>
                  <p className="text-sm text-gray-400">Answer: 40 minutes (10 min overview + 15 min demonstration + 10 min maintenance + 5 min documentation)</p>
                </div>
                
                <div className="bg-card/80 p-4 rounded-lg">
                  <p className="font-medium text-white mb-2">2. Which BS 7671 section covers labelling requirements?</p>
                  <p className="text-sm text-gray-400">Answer: Section 514 - Identification and Notices</p>
                </div>
                
                <div className="bg-card/80 p-4 rounded-lg">
                  <p className="font-medium text-white mb-2">3. What type of labels are required for outdoor EV charging applications?</p>
                  <p className="text-sm text-gray-400">Answer: Marine-grade vinyl or aluminium with UV-stable inks and weather-resistant adhesive</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Real World Examples */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Lightbulb className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Real World Examples</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              
              <div className="bg-card/80 p-4 rounded-lg">
                <h4 className="font-semibold text-white mb-3">Case Study 1: Residential Installation Handover</h4>
                <p className="text-sm mb-3">A homeowner requires walkthrough of their new 7kW wall-mounted charger installation.</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-yellow-400 mb-2">Walkthrough Highlights</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Demonstrate cable management and storage</li>
                      <li>• Explain smart charging app features</li>
                      <li>• Show location of emergency isolator</li>
                      <li>• Demonstrate monthly RCD test procedure</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-yellow-400 mb-2">Key Documentation</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Installation certificate with test results</li>
                      <li>• User manual and quick reference guide</li>
                      <li>• Warranty registration details</li>
                      <li>• Annual maintenance reminder schedule</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-card/80 p-4 rounded-lg">
                <h4 className="font-semibold text-white mb-3">Case Study 2: Commercial Car Park Installation</h4>
                <p className="text-sm mb-3">Multiple 22kW charging points installed for employee use require comprehensive labelling.</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-yellow-400 mb-2">Labelling Requirements</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Individual charging point identification</li>
                      <li>• Emergency contact information prominently displayed</li>
                      <li>• Operating instructions in multiple languages</li>
                      <li>• Cable route identification and warnings</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-yellow-400 mb-2">Staff Training</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Group training session for facilities management</li>
                      <li>• Emergency procedures documentation</li>
                      <li>• Maintenance scheduling and record keeping</li>
                      <li>• User support and troubleshooting guide</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-card/80 p-4 rounded-lg">
                <h4 className="font-semibold text-white mb-3">Case Study 3: Public Charging Hub</h4>
                <p className="text-sm mb-3">High-power DC charging hub requiring comprehensive public-facing information.</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-yellow-400 mb-2">Public Information</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Clear operating instructions with pictograms</li>
                      <li>• Emergency procedures and contact numbers</li>
                      <li>• Payment and authentication methods</li>
                      <li>• Charging speeds and connector types</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-yellow-400 mb-2">Safety Signage</h5>
                    <ul className="text-sm space-y-1">
                      <li>• High voltage warning signs</li>
                      <li>• No smoking and open flames warnings</li>
                      <li>• Emergency shutdown procedures</li>
                      <li>• Site-specific hazard identification</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FAQs */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <div className="flex items-center gap-3">
                <HelpCircle className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Frequently Asked Questions</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              
              <div className="space-y-4">
                <div className="bg-card/80 p-4 rounded-lg">
                  <p className="font-medium text-white mb-2">Q: How long should a customer walkthrough take?</p>
                  <p className="text-sm">A: A comprehensive walkthrough should take 40 minutes minimum: 10 minutes for system overview, 15 minutes for operation demonstration, 10 minutes for maintenance explanation, and 5 minutes for documentation handover.</p>
                </div>
                
                <div className="bg-card/80 p-4 rounded-lg">
                  <p className="font-medium text-white mb-2">Q: What happens if the customer isn't available for the walkthrough?</p>
                  <p className="text-sm">A: The installation cannot be considered complete until the walkthrough is conducted. Schedule a specific appointment and ensure the customer understands this is a mandatory requirement for warranty validation and safety compliance.</p>
                </div>
                
                <div className="bg-card/80 p-4 rounded-lg">
                  <p className="font-medium text-white mb-2">Q: Are there specific label materials required for outdoor installations?</p>
                  <p className="text-sm">A: Yes, outdoor labels must be marine-grade vinyl or aluminium with UV-stable inks, weather-resistant adhesive, and temperature tolerance from -20°C to +80°C with minimum 15-year durability.</p>
                </div>
                
                <div className="bg-card/80 p-4 rounded-lg">
                  <p className="font-medium text-white mb-2">Q: How often should RCD testing be demonstrated to customers?</p>
                  <p className="text-sm">A: Demonstrate the monthly RCD test procedure during walkthrough and provide written instructions. Emphasize this is a legal requirement under BS 7671 and essential for continued protection.</p>
                </div>
                
                <div className="bg-card/80 p-4 rounded-lg">
                  <p className="font-medium text-white mb-2">Q: What documentation must be provided to the customer?</p>
                  <p className="text-sm">A: Provide installation certificate, test results, user manual, warranty information, maintenance schedule, emergency contact details, and commissioning checklist within 28 days of completion.</p>
                </div>
                
                <div className="bg-card/80 p-4 rounded-lg">
                  <p className="font-medium text-white mb-2">Q: How should emergency procedures be communicated?</p>
                  <p className="text-sm">A: Emergency procedures must be clearly explained during walkthrough, provided in written form, and prominently displayed near the charging equipment. Include isolation points, emergency contacts, and evacuation procedures.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <div className="flex items-center gap-3">
                <FileText className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Section Summary</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="bg-card/80 p-4 rounded-lg">
                <h4 className="font-semibold text-white mb-3">Key Takeaways</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Customer walkthrough is mandatory and must be structured for effectiveness</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>BS 7671 Section 514 labelling requirements are legally mandatory</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Label materials must be appropriate for the installation environment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Documentation handover must be complete and timely</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Safety demonstration and emergency procedures are critical</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Professional handover builds customer confidence and reduces support calls</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4">
                <p className="text-blue-200 text-sm">
                  <strong>Remember:</strong> The customer walkthrough and proper labelling represent the final 
                  professional touch to any EV charging installation. They ensure safety, compliance, and customer 
                  satisfaction while protecting both installer and customer legally and practically.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <EVChargingModule6Section5Quiz />

          {/* Navigation */}
          <div className="flex justify-between">
            <Link to="../ev-charging-module-6-section-4">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous: RCD and Functional Testing
              </Button>
            </Link>
            <Link to="../ev-charging-module-6-section-6">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-400">
                Next: Certificate and Handover Pack
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EVChargingModule6Section5;