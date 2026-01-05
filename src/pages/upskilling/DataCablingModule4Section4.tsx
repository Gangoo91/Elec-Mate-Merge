import { ArrowLeft, ArrowRight, Tag, Palette, FileText, AlertTriangle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Link } from 'react-router-dom';
import { Quiz } from '@/components/upskilling/Quiz';

const DataCablingModule4Section4 = () => {
  const quizQuestions = [
    {
      id: 1,
      question: "According to TIA-606-C, what colour should be used for workstation outlets?",
      options: [
        "Blue",
        "White", 
        "Green",
        "Red"
      ],
      correctAnswer: 1,
      explanation: "TIA-606-C specifies white labels for workstation outlets to provide clear identification and contrast."
    },
    {
      id: 2,
      question: "What information must be included on cable identification labels?",
      options: [
        "Cable type only",
        "Termination points only",
        "Cable type and termination points", 
        "Installation date only"
      ],
      correctAnswer: 2,
      explanation: "Cable labels must include both cable type and termination point information for proper identification and troubleshooting."
    },
    {
      id: 3,
      question: "Which standard defines the colour coding for telecommunications cabling in the UK?",
      options: [
        "BS EN 50173",
        "TIA-568-C", 
        "ISO/IEC 11801",
        "All of the above"
      ],
      correctAnswer: 3,
      explanation: "All three standards define colour coding requirements, with ISO/IEC 11801 being the international standard adopted in the UK."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="px-4 sm:px-6 lg:px-8 pt-8 pb-12 max-w-6xl mx-auto">
        <Link to="../data-cabling-module-4">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 4
          </Button>
        </Link>
        
        <div className="space-y-8">
          <div className="text-center">
            <Badge variant="secondary" className="bg-yellow-400 text-black mb-4">
              Module 4 • Section 4
            </Badge>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              ID Labelling Standards and Colour Codes
            </h1>
            <p className="text-base sm:text-lg text-gray-400 max-w-3xl mx-auto">
              Cable identification and marking systems for professional installations
            </p>
          </div>

          <Alert className="border-yellow-400/30 bg-yellow-400/10">
            <Tag className="h-4 w-4 text-yellow-400" />
            <AlertDescription className="text-foreground">
              <strong className="text-yellow-400">Documentation Essential:</strong> Proper labelling and documentation are critical for system maintenance, troubleshooting, and compliance with standards.
            </AlertDescription>
          </Alert>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                International Labelling Standards
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Key Standards Overview</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Multiple international standards define labelling requirements for structured cabling systems. 
                  These ensure consistency, maintainability, and professional appearance across installations.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-400 mb-3">TIA-606-C (North American)</h4>
                    <ul className="text-sm text-gray-300 space-y-2">
                      <li><strong>Scope:</strong> Comprehensive labelling and documentation</li>
                      <li><strong>Hierarchy:</strong> Campus, building, floor, room, equipment</li>
                      <li><strong>Colour Coding:</strong> Specific colours for different elements</li>
                      <li><strong>Label Content:</strong> Mandatory and optional information</li>
                      <li><strong>Documentation:</strong> As-built drawings and databases</li>
                      <li><strong>Updates:</strong> Change management procedures</li>
                    </ul>
                  </div>
                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-400 mb-3">ISO/IEC 14763-1 (International)</h4>
                    <ul className="text-sm text-gray-300 space-y-2">
                      <li><strong>Global Standard:</strong> Adopted in UK and Europe</li>
                      <li><strong>Integration:</strong> Works with ISO/IEC 11801 series</li>
                      <li><strong>Flexibility:</strong> Allows adaptation to local requirements</li>
                      <li><strong>Administration:</strong> Detailed record-keeping requirements</li>
                      <li><strong>Identification:</strong> Unique identifier systems</li>
                      <li><strong>Testing Records:</strong> Performance documentation linkage</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg">
                <h4 className="font-medium text-yellow-400 mb-3">UK Implementation Guidelines</h4>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-white font-medium mb-2">BS EN 50173 Compliance</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Follows ISO/IEC 14763-1 framework</li>
                      <li>• Mandatory for CE marking compliance</li>
                      <li>• Integration with building standards</li>
                      <li>• Health and safety documentation links</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-2">Building Information Modelling</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• BIM Level 2 compliance requirements</li>
                      <li>• Digital twin integration capabilities</li>
                      <li>• Asset management system links</li>
                      <li>• Lifecycle information management</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-2">Quality Assurance</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Third-party verification requirements</li>
                      <li>• Manufacturer warranty compliance</li>
                      <li>• Insurance and liability considerations</li>
                      <li>• Professional certification alignment</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center">
                <Palette className="mr-2 h-5 w-5" />
                Colour Coding Systems
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">TIA-606-C Colour Standards</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Standardised colour schemes provide immediate visual identification of cabling infrastructure elements and their functions.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-400 mb-3">Infrastructure Elements</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Demarcation Point:</span>
                        <div className="flex items-center">
                          <div className="w-4 h-4 bg-orange-500 rounded mr-2"></div>
                          <span className="text-white">Orange</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Network Connections:</span>
                        <div className="flex items-center">
                          <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
                          <span className="text-white">Green</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Common Equipment:</span>
                        <div className="flex items-center">
                          <div className="w-4 h-4 bg-purple-500 rounded mr-2"></div>
                          <span className="text-white">Purple</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">First Level Backbone:</span>
                        <div className="flex items-center">
                          <div className="w-4 h-4 bg-white rounded mr-2 border"></div>
                          <span className="text-white">White</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Second Level Backbone:</span>
                        <div className="flex items-center">
                          <div className="w-4 h-4 bg-gray-500 rounded mr-2"></div>
                          <span className="text-white">Gray</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-400 mb-3">Workstation and Equipment</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Workstation Outlets:</span>
                        <div className="flex items-center">
                          <div className="w-4 h-4 bg-yellow-400 rounded mr-2"></div>
                          <span className="text-white">Blue</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Auxiliary Circuits:</span>
                        <div className="flex items-center">
                          <div className="w-4 h-4 bg-yellow-400 rounded mr-2"></div>
                          <span className="text-white">Yellow</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Key Telephone:</span>
                        <div className="flex items-center">
                          <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
                          <span className="text-white">Red</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Miscellaneous:</span>
                        <div className="flex items-center">
                          <div className="w-4 h-4 bg-pink-500 rounded mr-2"></div>
                          <span className="text-white">Pink</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Maintenance:</span>
                        <div className="flex items-center">
                          <div className="w-4 h-4 bg-cyan-500 rounded mr-2"></div>
                          <span className="text-white">Aqua</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg">
                <h4 className="font-medium text-yellow-400 mb-3">Cable Jacket Colour Coding</h4>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-white font-medium mb-2">Category 5e/6 UTP</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Horizontal: Blue or Gray</li>
                      <li>• Backbone: Orange or White</li>
                      <li>• Equipment: Green</li>
                      <li>• Cross-connect: Yellow or Red</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-2">Fibre Optic Cables</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Multimode 62.5/125: Orange</li>
                      <li>• Multimode 50/125: Aqua</li>
                      <li>• Single Mode: Yellow</li>
                      <li>• Bend-insensitive: Lime Green</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-2">Special Applications</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Plenum rated: Often white/gray</li>
                      <li>• Outdoor rated: Black or UV stable</li>
                      <li>• Armoured: Black with identification</li>
                      <li>• LSZH: Various with green stripe</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-yellow-400">Label Design and Placement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Label Requirements and Specifications</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Labels must be durable, legible, and positioned for easy identification whilst maintaining professional appearance.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-400 mb-3">Physical Requirements</h4>
                    <ul className="text-sm text-gray-300 space-y-2">
                      <li><strong>Material:</strong> Polyester or vinyl for durability</li>
                      <li><strong>Adhesive:</strong> Permanent, environmental resistant</li>
                      <li><strong>Print Quality:</strong> Fade-resistant, smudge-proof</li>
                      <li><strong>Size:</strong> Minimum 19mm height for readability</li>
                      <li><strong>Contrast:</strong> High contrast for visibility</li>
                      <li><strong>Temperature Range:</strong> -40°C to +150°C operation</li>
                    </ul>
                  </div>
                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-400 mb-3">Content Requirements</h4>
                    <ul className="text-sm text-gray-300 space-y-2">
                      <li><strong>Unique Identifier:</strong> Alphanumeric designation</li>
                      <li><strong>Termination Points:</strong> Both ends of cable run</li>
                      <li><strong>Cable Type:</strong> Category and construction</li>
                      <li><strong>Length:</strong> Actual measured length</li>
                      <li><strong>Installation Date:</strong> Month and year minimum</li>
                      <li><strong>Installer ID:</strong> Company or technician code</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg">
                <h4 className="font-medium text-yellow-400 mb-3">Placement Guidelines</h4>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-white font-medium mb-2">Cable Labels</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Within 300mm of each termination</li>
                      <li>• Every 3m along horizontal runs</li>
                      <li>• At all access points and pull boxes</li>
                      <li>• Both sides of wall penetrations</li>
                      <li>• Readable from working position</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-2">Outlet Labels</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• On faceplate or adjacent surface</li>
                      <li>• Consistent position throughout building</li>
                      <li>• Match corresponding cable identifier</li>
                      <li>• Include port number for multi-port outlets</li>
                      <li>• Consider furniture and equipment access</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-2">Patch Panel Labels</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Above and below each port</li>
                      <li>• Panel identification clearly visible</li>
                      <li>• Port numbering consistent with scheme</li>
                      <li>• Cross-connect field identification</li>
                      <li>• Equipment rack position indicators</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-yellow-400">Identification Systems and Hierarchies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Structured Naming Conventions</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Hierarchical identification systems provide logical, scalable naming that supports efficient management and troubleshooting.
                </p>
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="font-medium text-yellow-400 mb-3">Standard Hierarchy Levels</h4>
                  <div className="space-y-4">
                    <div className="border border-gray-600 p-3 rounded">
                      <p className="text-white font-medium mb-2">Campus Level: <span className="text-yellow-400">C01</span></p>
                      <p className="text-sm text-gray-300">Site or campus identifier for multi-building organisations</p>
                    </div>
                    <div className="border border-gray-600 p-3 rounded">
                      <p className="text-white font-medium mb-2">Building Level: <span className="text-yellow-400">C01-B03</span></p>
                      <p className="text-sm text-gray-300">Individual building within campus or standalone building</p>
                    </div>
                    <div className="border border-gray-600 p-3 rounded">
                      <p className="text-white font-medium mb-2">Floor Level: <span className="text-yellow-400">C01-B03-F02</span></p>
                      <p className="text-sm text-gray-300">Floor or level within building structure</p>
                    </div>
                    <div className="border border-gray-600 p-3 rounded">
                      <p className="text-white font-medium mb-2">Room Level: <span className="text-yellow-400">C01-B03-F02-R205</span></p>
                      <p className="text-sm text-gray-300">Individual room, area, or zone designation</p>
                    </div>
                    <div className="border border-gray-600 p-3 rounded">
                      <p className="text-white font-medium mb-2">Outlet Level: <span className="text-yellow-400">C01-B03-F02-R205-01</span></p>
                      <p className="text-sm text-gray-300">Individual outlet or connection point</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="font-medium text-yellow-400 mb-3">Equipment Room Identification</h4>
                  <ul className="text-sm text-gray-300 space-y-2">
                    <li><strong>Rack Position:</strong> Row-Rack-Unit (A-01-U42)</li>
                    <li><strong>Panel Designation:</strong> Type-Position (PP-A01-01)</li>
                    <li><strong>Port Numbering:</strong> Sequential left-to-right</li>
                    <li><strong>Cable Management:</strong> Horizontal and vertical</li>
                    <li><strong>Power Circuits:</strong> Separate identification</li>
                    <li><strong>Cooling Systems:</strong> Environmental equipment ID</li>
                  </ul>
                </div>
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="font-medium text-yellow-400 mb-3">Database Integration</h4>
                  <ul className="text-sm text-gray-300 space-y-2">
                    <li><strong>Asset Management:</strong> Link to corporate systems</li>
                    <li><strong>Change Control:</strong> Modification tracking</li>
                    <li><strong>Test Results:</strong> Performance data correlation</li>
                    <li><strong>Work Orders:</strong> Maintenance scheduling</li>
                    <li><strong>Warranty Tracking:</strong> Component lifecycle</li>
                    <li><strong>Compliance Reporting:</strong> Audit trail maintenance</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-yellow-400">Documentation and Record Keeping</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Mandatory Documentation Requirements</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-400 mb-3">As-Built Drawings</h4>
                    <ul className="text-sm text-gray-300 space-y-2">
                      <li><strong>Floor Plans:</strong> Outlet and device locations</li>
                      <li><strong>Riser Diagrams:</strong> Backbone cable routing</li>
                      <li><strong>Equipment Layouts:</strong> Rack and panel arrangements</li>
                      <li><strong>Cable Schedules:</strong> Complete cable inventory</li>
                      <li><strong>Test Results:</strong> Performance verification</li>
                      <li><strong>Label Schedules:</strong> Complete identification lists</li>
                    </ul>
                  </div>
                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-400 mb-3">Electronic Records</h4>
                    <ul className="text-sm text-gray-300 space-y-2">
                      <li><strong>CAD Files:</strong> Native and PDF formats</li>
                      <li><strong>Database Records:</strong> Searchable information</li>
                      <li><strong>Digital Photos:</strong> Installation documentation</li>
                      <li><strong>Test Reports:</strong> Certified performance data</li>
                      <li><strong>Material Lists:</strong> Component specifications</li>
                      <li><strong>Change Logs:</strong> Modification history</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg">
                <h4 className="font-medium text-yellow-400 mb-3">Quality Control and Verification</h4>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-white font-medium mb-2">Installation Verification</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Visual inspection of all labels</li>
                      <li>• Verification of naming convention compliance</li>
                      <li>• Check colour coding consistency</li>
                      <li>• Confirm documentation accuracy</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-2">Maintenance Updates</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Regular review and audit schedule</li>
                      <li>• Change control procedures</li>
                      <li>• Label replacement program</li>
                      <li>• Documentation version control</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-2">Compliance Monitoring</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Standards compliance checking</li>
                      <li>• Third-party verification</li>
                      <li>• Warranty requirement compliance</li>
                      <li>• Insurance and liability coverage</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-yellow-400">Advanced Labelling Technologies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Modern Identification Systems</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Advanced labelling technologies enhance traditional methods with improved durability, automation capabilities, and integration with digital management systems.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-400 mb-3">RFID and NFC Technologies</h4>
                    <ul className="text-sm text-gray-300 space-y-2">
                      <li><strong>Passive RFID Tags:</strong> Long-range identification without power</li>
                      <li><strong>NFC Labels:</strong> Smartphone-readable for easy access</li>
                      <li><strong>Data Storage:</strong> Cable specifications and test results</li>
                      <li><strong>Asset Tracking:</strong> Real-time location and status</li>
                      <li><strong>Maintenance History:</strong> Complete service records</li>
                      <li><strong>Integration:</strong> Links to CMDB and asset management</li>
                    </ul>
                  </div>
                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-400 mb-3">QR Code and Barcode Systems</h4>
                    <ul className="text-sm text-gray-300 space-y-2">
                      <li><strong>High Density Storage:</strong> Extensive information in small space</li>
                      <li><strong>Mobile Accessibility:</strong> Standard smartphone scanning</li>
                      <li><strong>Dynamic Content:</strong> Links to online documentation</li>
                      <li><strong>Error Correction:</strong> Readable even when partially damaged</li>
                      <li><strong>Cost Effective:</strong> Low-cost printing and application</li>
                      <li><strong>Universal Compatibility:</strong> Works with standard equipment</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg">
                <h4 className="font-medium text-yellow-400 mb-3">Digital Twin Integration</h4>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-white font-medium mb-2">BIM Level 2 Compliance</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• 3D model integration with labels</li>
                      <li>• COBie data exchange standards</li>
                      <li>• Asset information requirements</li>
                      <li>• Common data environment links</li>
                      <li>• Lifecycle information management</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-2">IoT Sensor Integration</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Environmental monitoring links</li>
                      <li>• Performance data correlation</li>
                      <li>• Predictive maintenance triggers</li>
                      <li>• Real-time status updates</li>
                      <li>• Automated fault detection</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-2">AI and Analytics</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Pattern recognition for fault prediction</li>
                      <li>• Optimisation recommendations</li>
                      <li>• Automated compliance checking</li>
                      <li>• Trend analysis and reporting</li>
                      <li>• Decision support systems</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-yellow-400">Industry-Specific Labelling Requirements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Sector-Specific Standards and Regulations</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Different industries have specific labelling requirements driven by regulatory compliance, safety considerations, and operational needs.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-400 mb-3">Healthcare and Medical Facilities</h4>
                    <ul className="text-sm text-gray-300 space-y-2">
                      <li><strong>HTM Guidance:</strong> Health Technical Memoranda compliance</li>
                      <li><strong>Infection Control:</strong> Easy-clean label materials</li>
                      <li><strong>Emergency Systems:</strong> Red labels for critical circuits</li>
                      <li><strong>Medical Gas Systems:</strong> Separate identification scheme</li>
                      <li><strong>Patient Areas:</strong> Discrete labelling requirements</li>
                      <li><strong>Isolation Procedures:</strong> Clear emergency isolation points</li>
                    </ul>
                  </div>
                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-400 mb-3">Educational Institutions</h4>
                    <ul className="text-sm text-gray-300 space-y-2">
                      <li><strong>BB90/BB98 Compliance:</strong> Building Bulletin requirements</li>
                      <li><strong>Safeguarding:</strong> Secure area identification</li>
                      <li><strong>Accessibility:</strong> Large print and tactile options</li>
                      <li><strong>Vandal Resistance:</strong> Tamper-proof label materials</li>
                      <li><strong>Multi-Use Spaces:</strong> Flexible room configurations</li>
                      <li><strong>Emergency Procedures:</strong> Clear evacuation route marking</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg">
                <h4 className="font-medium text-yellow-400 mb-3">Manufacturing and Industrial Applications</h4>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-white font-medium mb-2">Hazardous Area Requirements</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• ATEX/IECEx certified materials</li>
                      <li>• Explosion-proof enclosure labels</li>
                      <li>• Intrinsically safe circuit identification</li>
                      <li>• Zone classification marking</li>
                      <li>• Gas group and temperature class</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-2">Chemical Resistance</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Solvent-resistant adhesives</li>
                      <li>• Chemical-proof printing inks</li>
                      <li>• Protective lamination options</li>
                      <li>• Temperature cycling resistance</li>
                      <li>• UV and ozone stability</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-2">Maintenance Access</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• High-visibility colour schemes</li>
                      <li>• Multilingual label options</li>
                      <li>• Safety warning integration</li>
                      <li>• Lockout/tagout compatibility</li>
                      <li>• Emergency shutdown identification</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-yellow-400">Quality Assurance and Testing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Label Performance Testing Standards</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Professional labelling systems must undergo rigorous testing to ensure durability, legibility, and performance under specified environmental conditions.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-400 mb-3">Environmental Testing</h4>
                    <ul className="text-sm text-gray-300 space-y-2">
                      <li><strong>Temperature Cycling:</strong> -40°C to +150°C operation</li>
                      <li><strong>Humidity Testing:</strong> 95% RH at 40°C for 1000 hours</li>
                      <li><strong>UV Exposure:</strong> QUV-A 340nm equivalent to 2 years</li>
                      <li><strong>Salt Spray:</strong> 5% NaCl solution for 240 hours</li>
                      <li><strong>Chemical Resistance:</strong> Common solvents and cleaners</li>
                      <li><strong>Thermal Shock:</strong> Rapid temperature changes</li>
                    </ul>
                  </div>
                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-400 mb-3">Mechanical Testing</h4>
                    <ul className="text-sm text-gray-300 space-y-2">
                      <li><strong>Adhesion Testing:</strong> 180° peel test at specified rates</li>
                      <li><strong>Abrasion Resistance:</strong> Taber abraser methodology</li>
                      <li><strong>Scratch Resistance:</strong> Pencil hardness testing</li>
                      <li><strong>Impact Resistance:</strong> Gardner impact testing</li>
                      <li><strong>Tensile Strength:</strong> Material elongation and break</li>
                      <li><strong>Tear Resistance:</strong> Propagation and initiation</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg">
                <h4 className="font-medium text-yellow-400 mb-3">Installation Quality Control</h4>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-white font-medium mb-2">Pre-Installation Checks</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Verify surface cleanliness and preparation</li>
                      <li>• Check environmental conditions suitability</li>
                      <li>• Confirm label material specification</li>
                      <li>• Validate printing quality and legibility</li>
                      <li>• Test sample adhesion on actual substrate</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-2">Installation Monitoring</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Maintain consistent application pressure</li>
                      <li>• Ensure proper bubble-free application</li>
                      <li>• Verify correct positioning and alignment</li>
                      <li>• Check for adequate edge sealing</li>
                      <li>• Document installation conditions</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-2">Post-Installation Verification</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Visual inspection for defects or bubbles</li>
                      <li>• Adhesion testing on sample labels</li>
                      <li>• Barcode/QR code scanning verification</li>
                      <li>• Database entry and cross-reference</li>
                      <li>• Customer sign-off and documentation</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-yellow-400">Case Studies and Implementation Examples</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Real-World Implementation Examples</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Practical examples demonstrate successful labelling system implementations across different facility types and their specific challenges.
                </p>
                <div className="space-y-4">
                  <div className="bg-card p-4 rounded-lg border-l-4 border-yellow-400">
                    <h4 className="font-medium text-yellow-400 mb-2">Case Study 1: Large Hospital Complex</h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-white font-medium mb-1">Challenge:</p>
                        <p className="text-gray-300 mb-2">5000+ outlets across 12 buildings, mixed legacy and new systems, infection control requirements</p>
                        <p className="text-white font-medium mb-1">Solution:</p>
                        <ul className="text-gray-300 space-y-1">
                          <li>• Phased implementation over 18 months</li>
                          <li>• RFID tags with antimicrobial coating</li>
                          <li>• Colour-coded by department function</li>
                          <li>• Mobile app for real-time updates</li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-white font-medium mb-1">Results:</p>
                        <ul className="text-gray-300 space-y-1">
                          <li>• 75% reduction in fault location time</li>
                          <li>• 90% improvement in documentation accuracy</li>
                          <li>• Successful infection control audit</li>
                          <li>• ROI achieved within 24 months</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="bg-card p-4 rounded-lg border-l-4 border-green-500">
                    <h4 className="font-medium text-yellow-400 mb-2">Case Study 2: Data Centre Facility</h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-white font-medium mb-1">Challenge:</p>
                        <p className="text-gray-300 mb-2">24/7 operations, high cable density, rapid changes, multiple tenants</p>
                        <p className="text-white font-medium mb-1">Solution:</p>
                        <ul className="text-gray-300 space-y-1">
                          <li>• Automated label printing system</li>
                          <li>• QR codes linked to DCIM system</li>
                          <li>• Hot-swap labelling procedures</li>
                          <li>• Tenant-specific colour coding</li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-white font-medium mb-1">Results:</p>
                        <ul className="text-gray-300 space-y-1">
                          <li>• Zero downtime during implementation</li>
                          <li>• 50% faster cable installations</li>
                          <li>• Improved tenant satisfaction scores</li>
                          <li>• Enhanced security and access control</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="bg-card p-4 rounded-lg border-l-4 border-purple-500">
                    <h4 className="font-medium text-yellow-400 mb-2">Case Study 3: Manufacturing Plant</h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-white font-medium mb-1">Challenge:</p>
                        <p className="text-gray-300 mb-2">Harsh environment, chemical exposure, multilingual workforce, safety compliance</p>
                        <p className="text-white font-medium mb-1">Solution:</p>
                        <ul className="text-gray-300 space-y-1">
                          <li>• Chemical-resistant polyester labels</li>
                          <li>• Pictographic symbols for clarity</li>
                          <li>• Integration with safety systems</li>
                          <li>• Maintenance scheduling integration</li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-white font-medium mb-1">Results:</p>
                        <ul className="text-gray-300 space-y-1">
                          <li>• Improved safety compliance rating</li>
                          <li>• Reduced maintenance response time</li>
                          <li>• Better multilingual communication</li>
                          <li>• Lower label replacement costs</li>
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
              <CardTitle className="text-yellow-400">Common Labelling Problems and Solutions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-white mb-3 flex items-center">
                    <AlertTriangle className="mr-2 h-4 w-4 text-red-400" />
                    Common Problems
                  </h4>
                  <ul className="text-sm text-gray-300 space-y-2 bg-card p-4 rounded-lg">
                    <li>• Inconsistent naming conventions</li>
                    <li>• Poor quality label materials</li>
                    <li>• Incorrect colour coding</li>
                    <li>• Missing or incomplete information</li>
                    <li>• Labels placed in inaccessible locations</li>
                    <li>• Outdated documentation</li>
                    <li>• No change control procedures</li>
                    <li>• Illegible or faded labels</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-white mb-3 flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-400" />
                    Best Practice Solutions
                  </h4>
                  <ul className="text-sm text-gray-300 space-y-2 bg-card p-4 rounded-lg">
                    <li>• Develop and enforce labelling standards</li>
                    <li>• Use high-quality, durable materials</li>
                    <li>• Implement quality control inspections</li>
                    <li>• Provide comprehensive installer training</li>
                    <li>• Establish documentation procedures</li>
                    <li>• Regular maintenance and updates</li>
                    <li>• Use professional labelling systems</li>
                    <li>• Maintain spare label inventory</li>
                  </ul>
                </div>
              </div>
              
              <Alert className="border-amber-500/20 bg-card">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                <AlertDescription className="text-gray-300">
                  <strong className="text-amber-500">Professional Tip:</strong> Invest in a professional label printer and use consistent, high-quality materials. 
                  Poor labelling can significantly impact system maintainability and professional appearance.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <Quiz 
            title="Section 4 Knowledge Check"
            description="Test your understanding of ID labelling standards and colour codes"
            questions={quizQuestions}
          />

          <div className="flex justify-between items-center pt-8 border-t border-gray-700">
            <Link to="../data-cabling-module-4-section-3">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../data-cabling-module-4-section-5">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-400/10">
                Next Section
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataCablingModule4Section4;