import { ArrowLeft, FileCheck, CheckCircle, AlertTriangle, Database, Archive, Search, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Link } from 'react-router-dom';

const DataCablingModule6Section4 = () => {
  const quiz = [
    {
      question: "What is the minimum retention period for cabling test records according to TIA-568?",
      options: [
        "1 year",
        "5 years",
        "10 years",
        "Life of the installation"
      ],
      correct: 3,
      explanation: "Test records should be retained for the life of the installation as they provide critical baseline performance data and support warranty claims."
    },
    {
      question: "Which document should include the cable numbering scheme used throughout the installation?",
      options: [
        "Test reports only",
        "As-built drawings only",
        "Administration documentation",
        "Warranty documentation"
      ],
      correct: 2,
      explanation: "The administration documentation must include the cable numbering scheme to ensure consistent identification and future modifications."
    },
    {
      question: "What information must be included on cable labels according to structured cabling standards?",
      options: [
        "Cable length only",
        "Destination and cable ID",
        "Installation date only",
        "Installer name only"
      ],
      correct: 1,
      explanation: "Cable labels must include both the destination information and unique cable identifier to ensure proper identification and traceability."
    },
    {
      question: "How often should cabling infrastructure documentation be updated?",
      options: [
        "Annually",
        "Every 5 years",
        "When changes are made",
        "Only during major renovations"
      ],
      correct: 2,
      explanation: "Documentation must be updated whenever changes are made to the cabling infrastructure to maintain accuracy and compliance."
    },
    {
      question: "What is the primary purpose of maintaining test records for installed cabling?",
      options: [
        "Legal compliance only",
        "Warranty support only",
        "Troubleshooting and performance baseline",
        "Insurance requirements only"
      ],
      correct: 2,
      explanation: "Test records provide essential baseline performance data for troubleshooting issues and verifying ongoing system performance."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="px-8 pt-8 pb-12">
        <Link to="../data-cabling-module-6">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 6
          </Button>
        </Link>

        <div className="space-y-6">
          <div className="flex items-center gap-4 mb-6">
            <FileCheck className="h-8 w-8 text-yellow-400" strokeWidth={2.5} />
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                Record-Keeping and Documentation Requirements
              </h1>
              <p className="text-base md:text-lg text-gray-400">
                Documentation standards and record maintenance
              </p>
            </div>
          </div>

          <div className="flex gap-4 mb-8">
            <Badge variant="secondary" className="bg-yellow-400 text-black">
              Section 4
            </Badge>
            <Badge variant="outline" className="border-gray-600 text-gray-300">
              15 minutes
            </Badge>
          </div>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <FileCheck className="h-5 w-5 text-yellow-400" />
                Importance of Comprehensive Documentation
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>
                Proper documentation is the backbone of any successful structured cabling system. 
                It ensures maintainability, supports troubleshooting, enables future modifications, 
                and provides legal protection. Without accurate records, even the best-designed 
                system becomes difficult to manage and modify.
              </p>
              <p>
                Standards-compliant documentation also protects warranty coverage, supports insurance 
                claims, and demonstrates due diligence in professional installations. It's not just 
                a requirement—it's a critical asset for long-term system success.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                Learning Objectives
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <ul className="space-y-2 list-disc list-inside">
                <li>Understand documentation requirements according to international standards</li>
                <li>Learn about different types of required documentation and their purposes</li>
                <li>Identify proper labelling and identification schemes</li>
                <li>Understand test record requirements and retention policies</li>
                <li>Learn about administration and change management documentation</li>
                <li>Apply documentation standards to real-world scenarios</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Database className="h-5 w-5 text-yellow-400" />
                Types of Required Documentation
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">As-Built Documentation</h4>
                <div className="space-y-4">
                  <div className="bg-card p-4 rounded-lg">
                    <h5 className="text-yellow-400 font-semibold mb-2">Drawings and Plans</h5>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="mb-2"><strong>Site Plans and Floor Plans:</strong></p>
                        <ul className="space-y-1">
                          <li>• Building locations and connectivity</li>
                          <li>• Telecommunications room locations</li>
                          <li>• Pathway routing and cable runs</li>
                          <li>• Work area outlet locations</li>
                          <li>• Scale drawings with dimensions</li>
                        </ul>
                      </div>
                      <div>
                        <p className="mb-2"><strong>Detail Drawings:</strong></p>
                        <ul className="space-y-1">
                          <li>• Cross-connect field layouts</li>
                          <li>• Rack elevation drawings</li>
                          <li>• Pathway construction details</li>
                          <li>• Equipment mounting specifications</li>
                          <li>• Grounding and bonding diagrams</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card p-4 rounded-lg">
                    <h5 className="text-yellow-400 font-semibold mb-2">Schematic Documentation</h5>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="mb-2"><strong>Logical Topology:</strong></p>
                        <ul className="space-y-1">
                          <li>• Network hierarchy diagrams</li>
                          <li>• Cross-connect relationships</li>
                          <li>• Port mapping and assignments</li>
                          <li>• VLAN and subnet allocations</li>
                          <li>• Service provider interfaces</li>
                        </ul>
                      </div>
                      <div>
                        <p className="mb-2"><strong>Physical Connectivity:</strong></p>
                        <ul className="space-y-1">
                          <li>• Cable routing diagrams</li>
                          <li>• Patch panel layouts</li>
                          <li>• Equipment interconnections</li>
                          <li>• Power distribution</li>
                          <li>• Environmental systems</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Cable and System Identification</h4>
                <div className="space-y-4">
                  <div className="bg-card p-4 rounded-lg">
                    <h5 className="text-yellow-400 font-semibold mb-2">Labelling Standards</h5>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm border-collapse">
                        <thead>
                          <tr className="border-b border-gray-600">
                            <th className="text-left p-2 text-yellow-400">Component</th>
                            <th className="text-left p-2 text-yellow-400">Required Information</th>
                            <th className="text-left p-2 text-yellow-400">Label Type</th>
                            <th className="text-left p-2 text-yellow-400">Location</th>
                          </tr>
                        </thead>
                        <tbody className="text-gray-300">
                          <tr className="border-b border-gray-700">
                            <td className="p-2">Horizontal Cables</td>
                            <td className="p-2">Destination TR, Cable ID</td>
                            <td className="p-2">Adhesive, clear print</td>
                            <td className="p-2">Both ends, 150mm from termination</td>
                          </tr>
                          <tr className="border-b border-gray-700">
                            <td className="p-2">Backbone Cables</td>
                            <td className="p-2">Source/Dest, Fibre count, Type</td>
                            <td className="p-2">Heat shrink or wrap-around</td>
                            <td className="p-2">Both ends, accessible locations</td>
                          </tr>
                          <tr className="border-b border-gray-700">
                            <td className="p-2">Outlets</td>
                            <td className="p-2">Unique ID, TR location</td>
                            <td className="p-2">Insert label or faceplate</td>
                            <td className="p-2">Visible on faceplate</td>
                          </tr>
                          <tr className="border-b border-gray-700">
                            <td className="p-2">Patch Panels</td>
                            <td className="p-2">Panel ID, Port numbers</td>
                            <td className="p-2">Permanent engraved/printed</td>
                            <td className="p-2">Front panel, clearly visible</td>
                          </tr>
                          <tr className="border-b border-gray-700">
                            <td className="p-2">Equipment Racks</td>
                            <td className="p-2">Rack ID, Room designation</td>
                            <td className="p-2">Large format, durable</td>
                            <td className="p-2">Front and rear, eye level</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="bg-card p-4 rounded-lg">
                    <h5 className="text-yellow-400 font-semibold mb-2">Identification Schemes</h5>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="mb-2"><strong>Hierarchical Numbering:</strong></p>
                        <ul className="space-y-1">
                          <li>• Building.Floor.Room.Outlet</li>
                          <li>• Example: B1.02.TR.001</li>
                          <li>• Consistent across all documentation</li>
                          <li>• Scalable for future expansion</li>
                          <li>• Logical grouping by location</li>
                        </ul>
                      </div>
                      <div>
                        <p className="mb-2"><strong>Color Coding Systems:</strong></p>
                        <ul className="space-y-1">
                          <li>• Service type identification</li>
                          <li>• Voice, data, video differentiation</li>
                          <li>• Consistent throughout installation</li>
                          <li>• Document color assignments</li>
                          <li>• Include legend in all drawings</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Archive className="h-5 w-5 text-purple-400" />
                Test Records and Performance Documentation
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Testing Documentation Requirements</h4>
                <div className="space-y-4">
                  <div className="bg-card p-4 rounded-lg">
                    <h5 className="text-yellow-400 font-semibold mb-2">Required Test Records</h5>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="mb-2"><strong>Copper Cabling Tests:</strong></p>
                        <ul className="space-y-1">
                          <li>• Wire map and continuity</li>
                          <li>• Length measurements</li>
                          <li>• Insertion loss</li>
                          <li>• Near-end crosstalk (NEXT)</li>
                          <li>• Power sum NEXT (PSNEXT)</li>
                          <li>• Equal level far-end crosstalk (ELFEXT)</li>
                          <li>• Power sum ELFEXT (PSELFEXT)</li>
                          <li>• Return loss</li>
                          <li>• Alien crosstalk (if applicable)</li>
                        </ul>
                      </div>
                      <div>
                        <p className="mb-2"><strong>Fibre Optic Tests:</strong></p>
                        <ul className="space-y-1">
                          <li>• Continuity and polarity</li>
                          <li>• Length measurements</li>
                          <li>• Insertion loss (end-to-end)</li>
                          <li>• Optical return loss (ORL)</li>
                          <li>• OTDR traces (backbone)</li>
                          <li>• Connector inspection reports</li>
                          <li>• Encircled flux testing (if required)</li>
                          <li>• Chromatic dispersion (long links)</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card p-4 rounded-lg">
                    <h5 className="text-yellow-400 font-semibold mb-2">Test Report Contents</h5>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="mb-2"><strong>Header Information:</strong></p>
                        <ul className="space-y-1">
                          <li>• Project name and location</li>
                          <li>• Test date and technician</li>
                          <li>• Equipment used (make/model/cal date)</li>
                          <li>• Standard tested against</li>
                          <li>• Environmental conditions</li>
                        </ul>
                      </div>
                      <div>
                        <p className="mb-2"><strong>Detailed Results:</strong></p>
                        <ul className="space-y-1">
                          <li>• Pass/fail status for each parameter</li>
                          <li>• Measured vs limit values</li>
                          <li>• Margin to failure</li>
                          <li>• Graphical test traces</li>
                          <li>• Exception reports for failures</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Test Equipment and Calibration Records</h4>
                <div className="space-y-4">
                  <div className="bg-card p-4 rounded-lg">
                    <h5 className="text-yellow-400 font-semibold mb-2">Equipment Documentation</h5>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm border-collapse">
                        <thead>
                          <tr className="border-b border-gray-600">
                            <th className="text-left p-2 text-yellow-400">Equipment Type</th>
                            <th className="text-left p-2 text-yellow-400">Calibration Frequency</th>
                            <th className="text-left p-2 text-yellow-400">Documentation Required</th>
                            <th className="text-left p-2 text-yellow-400">Traceability</th>
                          </tr>
                        </thead>
                        <tbody className="text-gray-300">
                          <tr className="border-b border-gray-700">
                            <td className="p-2">Cable analysers</td>
                            <td className="p-2">Annual</td>
                            <td className="p-2">Calibration certificate</td>
                            <td className="p-2">NIST/national standards</td>
                          </tr>
                          <tr className="border-b border-gray-700">
                            <td className="p-2">OTDR units</td>
                            <td className="p-2">Annual</td>
                            <td className="p-2">Calibration + reference standard</td>
                            <td className="p-2">Manufacturer verification</td>
                          </tr>
                          <tr className="border-b border-gray-700">
                            <td className="p-2">Power meters</td>
                            <td className="p-2">Annual</td>
                            <td className="p-2">Calibration certificate</td>
                            <td className="p-2">NIST traceable</td>
                          </tr>
                          <tr className="border-b border-gray-700">
                            <td className="p-2">Light sources</td>
                            <td className="p-2">Annual</td>
                            <td className="p-2">Stability verification</td>
                            <td className="p-2">Reference detector</td>
                          </tr>
                          <tr className="border-b border-gray-700">
                            <td className="p-2">Microscopes</td>
                            <td className="p-2">As needed</td>
                            <td className="p-2">Cleanliness verification</td>
                            <td className="p-2">Visual standards</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="bg-card p-4 rounded-lg">
                    <h5 className="text-yellow-400 font-semibold mb-2">Quality Assurance Records</h5>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="mb-2"><strong>Testing Procedures:</strong></p>
                        <ul className="space-y-1">
                          <li>• Documented test methodology</li>
                          <li>• Reference cord verification</li>
                          <li>• Auto-test vs manual verification</li>
                          <li>• Statistical sampling plans</li>
                          <li>• Re-test procedures for failures</li>
                        </ul>
                      </div>
                      <div>
                        <p className="mb-2"><strong>Technician Qualifications:</strong></p>
                        <ul className="space-y-1">
                          <li>• Certification records</li>
                          <li>• Training documentation</li>
                          <li>• Competency assessments</li>
                          <li>• Manufacturer training</li>
                          <li>• Continuing education records</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Search className="h-5 w-5 text-green-400" />
                Administration and Change Management
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Administration Documentation</h4>
                <div className="space-y-4">
                  <div className="bg-card p-4 rounded-lg">
                    <h5 className="text-yellow-400 font-semibold mb-2">System Administration Records</h5>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="mb-2"><strong>Configuration Management:</strong></p>
                        <ul className="space-y-1">
                          <li>• Cable assignment database</li>
                          <li>• Port utilisation tracking</li>
                          <li>• Service allocation records</li>
                          <li>• User assignment database</li>
                          <li>• Equipment inventory</li>
                        </ul>
                      </div>
                      <div>
                        <p className="mb-2"><strong>Performance Monitoring:</strong></p>
                        <ul className="space-y-1">
                          <li>• Periodic test results</li>
                          <li>• Performance trend analysis</li>
                          <li>• Fault occurrence logs</li>
                          <li>• Maintenance schedules</li>
                          <li>• Upgrade planning records</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card p-4 rounded-lg">
                    <h5 className="text-yellow-400 font-semibold mb-2">Work Order and Change Control</h5>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="mb-2"><strong>Change Procedures:</strong></p>
                        <ul className="space-y-1">
                          <li>• Work order request process</li>
                          <li>• Impact assessment requirements</li>
                          <li>• Approval authority levels</li>
                          <li>• Implementation procedures</li>
                          <li>• Testing and verification</li>
                        </ul>
                      </div>
                      <div>
                        <p className="mb-2"><strong>Documentation Updates:</strong></p>
                        <ul className="space-y-1">
                          <li>• Drawing revision control</li>
                          <li>• Database update procedures</li>
                          <li>• Distribution of changes</li>
                          <li>• Version control systems</li>
                          <li>• Archive management</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Digital Documentation Systems</h4>
                <div className="space-y-4">
                  <div className="bg-card p-4 rounded-lg">
                    <h5 className="text-yellow-400 font-semibold mb-2">Modern Documentation Tools</h5>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="mb-2"><strong>CAD and Design Systems:</strong></p>
                        <ul className="space-y-1">
                          <li>• AutoCAD/Revit integration</li>
                          <li>• Building Information Modeling (BIM)</li>
                          <li>• Asset management integration</li>
                          <li>• Real-time update capabilities</li>
                          <li>• Multi-user collaboration</li>
                        </ul>
                      </div>
                      <div>
                        <p className="mb-2"><strong>Database Management:</strong></p>
                        <ul className="space-y-1">
                          <li>• Structured query capabilities</li>
                          <li>• Report generation tools</li>
                          <li>• Mobile access platforms</li>
                          <li>• Integration with test equipment</li>
                          <li>• Backup and recovery systems</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card p-4 rounded-lg">
                    <h5 className="text-yellow-400 font-semibold mb-2">QR Codes and Digital Labelling</h5>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="mb-2"><strong>Implementation Benefits:</strong></p>
                        <ul className="space-y-1">
                          <li>• Instant access to cable information</li>
                          <li>• Real-time test result retrieval</li>
                          <li>• Simplified change documentation</li>
                          <li>• Reduced documentation errors</li>
                          <li>• Enhanced troubleshooting speed</li>
                        </ul>
                      </div>
                      <div>
                        <p className="mb-2"><strong>Best Practices:</strong></p>
                        <ul className="space-y-1">
                          <li>• Redundant identification methods</li>
                          <li>• Regular database synchronisation</li>
                          <li>• Offline backup access</li>
                          <li>• User training requirements</li>
                          <li>• Security and access control</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Alert className="bg-blue-900/20 border-yellow-400">
            <AlertTriangle className="h-4 w-4 text-yellow-400" />
            <AlertDescription className="text-blue-100">
              <strong>Legal Requirement:</strong> In many jurisdictions, maintaining accurate cabling 
              documentation is a legal requirement for commercial buildings. Failure to maintain proper 
              records can result in fines, insurance claim denials, and liability issues during building 
              transfers or safety incidents.
            </AlertDescription>
          </Alert>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Users className="h-5 w-5 text-orange-400" />
                Warranty and Legal Documentation
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Warranty Documentation Requirements</h4>
                <div className="space-y-4">
                  <div className="bg-card p-4 rounded-lg">
                    <h5 className="text-yellow-400 font-semibold mb-2">Manufacturer Warranties</h5>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="mb-2"><strong>Component Warranties:</strong></p>
                        <ul className="space-y-1">
                          <li>• Cable manufacturer warranties</li>
                          <li>• Connector and hardware warranties</li>
                          <li>• Installation labour warranties</li>
                          <li>• System performance warranties</li>
                          <li>• Extended warranty provisions</li>
                        </ul>
                      </div>
                      <div>
                        <p className="mb-2"><strong>Documentation Retention:</strong></p>
                        <ul className="space-y-1">
                          <li>• Purchase receipts and invoices</li>
                          <li>• Installation certificates</li>
                          <li>• Test result reports</li>
                          <li>• Change documentation</li>
                          <li>• Maintenance records</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card p-4 rounded-lg">
                    <h5 className="text-yellow-400 font-semibold mb-2">Compliance and Audit Trail</h5>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="mb-2"><strong>Regulatory Compliance:</strong></p>
                        <ul className="space-y-1">
                          <li>• Building code compliance records</li>
                          <li>• Fire safety certifications</li>
                          <li>• Environmental impact assessments</li>
                          <li>• Accessibility compliance</li>
                          <li>• Local authority approvals</li>
                        </ul>
                      </div>
                      <div>
                        <p className="mb-2"><strong>Professional Liability:</strong></p>
                        <ul className="space-y-1">
                          <li>• Design professional records</li>
                          <li>• Installation contractor records</li>
                          <li>• Testing and certification records</li>
                          <li>• Quality assurance procedures</li>
                          <li>• Insurance documentation</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Record Retention Policies</h4>
                <div className="bg-card p-4 rounded-lg">
                  <h5 className="text-yellow-400 font-semibold mb-2">Retention Schedule</h5>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="border-b border-gray-600">
                          <th className="text-left p-2 text-yellow-400">Document Type</th>
                          <th className="text-left p-2 text-yellow-400">Retention Period</th>
                          <th className="text-left p-2 text-yellow-400">Storage Method</th>
                          <th className="text-left p-2 text-yellow-400">Access Requirements</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-300">
                        <tr className="border-b border-gray-700">
                          <td className="p-2">Installation test records</td>
                          <td className="p-2">Life of installation</td>
                          <td className="p-2">Digital + physical backup</td>
                          <td className="p-2">Immediate access</td>
                        </tr>
                        <tr className="border-b border-gray-700">
                          <td className="p-2">As-built drawings</td>
                          <td className="p-2">Life of building</td>
                          <td className="p-2">CAD files + printed sets</td>
                          <td className="p-2">Version control</td>
                        </tr>
                        <tr className="border-b border-gray-700">
                          <td className="p-2">Change orders</td>
                          <td className="p-2">7-10 years minimum</td>
                          <td className="p-2">Document management system</td>
                          <td className="p-2">Audit trail required</td>
                        </tr>
                        <tr className="border-b border-gray-700">
                          <td className="p-2">Warranty documents</td>
                          <td className="p-2">Warranty period + 1 year</td>
                          <td className="p-2">Secure filing system</td>
                          <td className="p-2">Legal access</td>
                        </tr>
                        <tr className="border-b border-gray-700">
                          <td className="p-2">Calibration records</td>
                          <td className="p-2">3 calibration cycles</td>
                          <td className="p-2">Electronic records</td>
                          <td className="p-2">Quality audit access</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-400" />
                Real-World Scenario: Hospital Network Documentation Audit
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="bg-card p-4 rounded-lg">
                <h5 className="text-yellow-400 font-semibold mb-2">Scenario:</h5>
                <p className="text-sm mb-4">
                  A 400-bed hospital underwent a routine insurance audit and discovered significant 
                  documentation deficiencies in their 8-year-old network installation. The audit 
                  found missing test records, outdated drawings, and inadequate change documentation, 
                  potentially voiding their coverage.
                </p>

                <div className="space-y-4">
                  <div>
                    <h6 className="text-white font-semibold mb-2">Discovered Issues:</h6>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="mb-2"><strong>Missing Documentation:</strong></p>
                        <ul className="space-y-1">
                          <li>• 40% of test records missing or incomplete</li>
                          <li>• No change documentation for 3 years</li>
                          <li>• Unlabeled cables in telecommunications rooms</li>
                          <li>• Outdated as-built drawings</li>
                          <li>• No equipment calibration records</li>
                        </ul>
                      </div>
                      <div>
                        <p className="mb-2"><strong>Compliance Risks:</strong></p>
                        <ul className="space-y-1">
                          <li>• Insurance coverage potentially void</li>
                          <li>• Building code compliance questioned</li>
                          <li>• Patient safety system integrity unknown</li>
                          <li>• Maintenance liability issues</li>
                          <li>• Future expansion planning compromised</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h6 className="text-white font-semibold mb-2">Remediation Plan:</h6>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="mb-2"><strong>Immediate Actions:</strong></p>
                        <ul className="space-y-1">
                          <li>• Complete system re-testing (critical areas)</li>
                          <li>• Emergency re-labeling program</li>
                          <li>• Updated as-built drawing creation</li>
                          <li>• Documentation system implementation</li>
                          <li>• Staff training on procedures</li>
                        </ul>
                      </div>
                      <div>
                        <p className="mb-2"><strong>Long-term Solutions:</strong></p>
                        <ul className="space-y-1">
                          <li>• Digital documentation management system</li>
                          <li>• Regular audit schedule establishment</li>
                          <li>• Change control procedure implementation</li>
                          <li>• Vendor documentation requirements</li>
                          <li>• Annual documentation review process</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-green-900/20 rounded-lg">
                    <p className="text-green-200 text-sm">
                      <strong>Outcome:</strong> After 6 months and £150,000 in remediation costs, the 
                      hospital achieved full compliance and implemented a comprehensive documentation 
                      management system. The investment was justified by maintained insurance coverage 
                      and improved operational efficiency for future changes.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                Section Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <ul className="space-y-2 list-disc list-inside">
                <li>Comprehensive documentation is legally required and essential for system management</li>
                <li>As-built drawings, test records, and administration documents form the complete documentation set</li>
                <li>Proper labelling and identification schemes ensure long-term maintainability</li>
                <li>Test records must be retained for the life of the installation with proper calibration documentation</li>
                <li>Change management procedures keep documentation current and accurate</li>
                <li>Digital documentation systems improve efficiency but require proper backup and access controls</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-yellow-400" />
                Knowledge Check
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {quiz.map((q, index) => (
                <div key={index} className="bg-card p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-3">
                    Question {index + 1}: {q.question}
                  </h4>
                  <div className="space-y-2">
                    {q.options.map((option, optIndex) => (
                      <div
                        key={optIndex}
                        className={`p-2 rounded cursor-pointer transition-colors ${
                          optIndex === q.correct
                            ? 'bg-green-900/30 border border-green-500 text-green-200'
                            : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                        }`}
                      >
                        {String.fromCharCode(65 + optIndex)}. {option}
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 p-3 bg-blue-900/20 rounded border border-yellow-400">
                    <p className="text-blue-200 text-sm">
                      <strong>Answer:</strong> {String.fromCharCode(65 + q.correct)}. {q.explanation}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="flex justify-between pt-6">
            <Link to="../data-cabling-module-6-section-3">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous: Building and Campus Standards
              </Button>
            </Link>
            <Link to="../data-cabling-module-6">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-600">
                Back to Module 6 Overview
                <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataCablingModule6Section4;