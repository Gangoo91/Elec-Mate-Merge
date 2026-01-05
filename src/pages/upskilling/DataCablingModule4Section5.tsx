import { ArrowLeft, ArrowRight, Server, Cable, Workflow, AlertTriangle, CheckCircle, Thermometer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Link } from 'react-router-dom';
import { Quiz } from '@/components/upskilling/Quiz';

const DataCablingModule4Section5 = () => {
  const quizQuestions = [
    {
      id: 1,
      question: "What is the standard rack unit (U) height measurement?",
      options: [
        "40mm",
        "44.45mm", 
        "50mm",
        "48mm"
      ],
      correctAnswer: 1,
      explanation: "A standard rack unit (U) is 44.45mm (1.75 inches) in height, as defined by EIA-310 standard."
    },
    {
      id: 2,
      question: "What is the recommended minimum aisle width in front of equipment racks?",
      options: [
        "600mm",
        "800mm",
        "1000mm", 
        "1200mm"
      ],
      correctAnswer: 2,
      explanation: "Minimum 1000mm (1m) aisle width is recommended for safe access, maintenance, and equipment removal."
    },
    {
      id: 3,
      question: "How many patch cords should be managed per 1U cable management panel?",
      options: [
        "12",
        "18",
        "24", 
        "48"
      ],
      correctAnswer: 2,
      explanation: "A 1U cable management panel typically manages 24 patch cords effectively, providing adequate bend radius and organisation."
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
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
              Module 4 • Section 5
            </Badge>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              Rack and Patch Panel Organisation
            </h1>
            <p className="text-base sm:text-lg text-gray-400 max-w-3xl mx-auto">
              Equipment room organisation and professional cable management
            </p>
          </div>

          <Alert className="border-yellow-400/30 bg-yellow-400/10">
            <Server className="h-4 w-4 text-yellow-400" />
            <AlertDescription className="text-foreground">
              <strong className="text-yellow-400">Professional Standard:</strong> Proper rack organisation is essential for system reliability, maintenance efficiency, and professional appearance.
            </AlertDescription>
          </Alert>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center">
                <Server className="mr-2 h-5 w-5" />
                Equipment Rack Standards and Specifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">EIA-310 Standard Requirements</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  The EIA-310 standard defines the physical dimensions and mounting requirements for 19-inch equipment racks used in telecommunications and data centres.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-400 mb-3">Physical Dimensions</h4>
                    <ul className="text-sm text-gray-300 space-y-2">
                      <li><strong>Width:</strong> 482.6mm (19 inches) external</li>
                      <li><strong>Mounting Width:</strong> 450mm between rack rails</li>
                      <li><strong>Unit Height:</strong> 44.45mm (1.75 inches) per U</li>
                      <li><strong>Mounting Holes:</strong> 6.35mm diameter</li>
                      <li><strong>Hole Spacing:</strong> 15.875mm on centre</li>
                      <li><strong>Standard Heights:</strong> 42U, 45U, 47U common</li>
                    </ul>
                  </div>
                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-400 mb-3">Load Considerations</h4>
                    <ul className="text-sm text-gray-300 space-y-2">
                      <li><strong>Static Load:</strong> Typical 680kg per rack</li>
                      <li><strong>Dynamic Load:</strong> Equipment sliding/removal</li>
                      <li><strong>Distribution:</strong> Even weight distribution required</li>
                      <li><strong>Floor Loading:</strong> Consider building structure</li>
                      <li><strong>Seismic:</strong> Earthquake bracing where required</li>
                      <li><strong>Safety Factor:</strong> 2:1 minimum for static loads</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg">
                <h4 className="font-medium text-yellow-400 mb-3">Rack Types and Applications</h4>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-white font-medium mb-2">Open Frame Racks</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Maximum ventilation and access</li>
                      <li>• Lower cost and weight</li>
                      <li>• Suitable for controlled environments</li>
                      <li>• Easy cable management visibility</li>
                      <li>• Limited security and dust protection</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-2">Enclosed Cabinets</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Enhanced security and protection</li>
                      <li>• Controlled airflow management</li>
                      <li>• Professional appearance</li>
                      <li>• Dust and contamination protection</li>
                      <li>• Higher cost and complexity</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-2">Wall-Mount Brackets</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Space-saving for small installations</li>
                      <li>• Suitable for branch/remote locations</li>
                      <li>• Limited capacity and expandability</li>
                      <li>• Cost-effective for small systems</li>
                      <li>• Requires adequate wall structure</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center">
                <Workflow className="mr-2 h-5 w-5" />
                Equipment Layout and Planning
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Vertical Equipment Arrangement</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Strategic placement of equipment within racks optimises cooling, access, and cable management whilst maintaining proper weight distribution.
                </p>
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="font-medium text-yellow-400 mb-3">Recommended Layout (Top to Bottom)</h4>
                  <div className="space-y-3">
                    <div className="border border-gray-600 p-3 rounded">
                      <div className="flex justify-between items-center">
                        <span className="text-white font-medium">Top (U42-U37):</span>
                        <span className="text-yellow-400">Passive Equipment</span>
                      </div>
                      <p className="text-sm text-gray-300 mt-1">Patch panels, cross-connects, cable management</p>
                    </div>
                    <div className="border border-gray-600 p-3 rounded">
                      <div className="flex justify-between items-center">
                        <span className="text-white font-medium">Upper Middle (U36-U25):</span>
                        <span className="text-yellow-400">Network Equipment</span>
                      </div>
                      <p className="text-sm text-gray-300 mt-1">Switches, routers, lightweight active equipment</p>
                    </div>
                    <div className="border border-gray-600 p-3 rounded">
                      <div className="flex justify-between items-center">
                        <span className="text-white font-medium">Lower Middle (U24-U13):</span>
                        <span className="text-yellow-400">Heavy Equipment</span>
                      </div>
                      <p className="text-sm text-gray-300 mt-1">Servers, storage systems, UPS units</p>
                    </div>
                    <div className="border border-gray-600 p-3 rounded">
                      <div className="flex justify-between items-center">
                        <span className="text-white font-medium">Bottom (U12-U1):</span>
                        <span className="text-yellow-400">Infrastructure</span>
                      </div>
                      <p className="text-sm text-gray-300 mt-1">Cable management, power distribution, KVM</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="font-medium text-yellow-400 mb-3">Cooling Considerations</h4>
                  <ul className="text-sm text-gray-300 space-y-2">
                    <li><strong>Hot Aisle/Cold Aisle:</strong> Consistent orientation</li>
                    <li><strong>Heat Producers:</strong> Position for optimal airflow</li>
                    <li><strong>Blanking Panels:</strong> Block unused spaces</li>
                    <li><strong>Cable Density:</strong> Avoid blocking ventilation</li>
                    <li><strong>Temperature Monitoring:</strong> Multiple sensors</li>
                    <li><strong>Exhaust Clearance:</strong> Minimum 1m rear access</li>
                  </ul>
                </div>
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="font-medium text-yellow-400 mb-3">Access and Maintenance</h4>
                  <ul className="text-sm text-gray-300 space-y-2">
                    <li><strong>Front Access:</strong> User-facing controls and displays</li>
                    <li><strong>Rear Access:</strong> Power and data connections</li>
                    <li><strong>Service Loops:</strong> Equipment removal capability</li>
                    <li><strong>Tool Access:</strong> Adequate working space</li>
                    <li><strong>Emergency Access:</strong> Critical system isolation</li>
                    <li><strong>Documentation:</strong> Rack elevation drawings</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center">
                <Cable className="mr-2 h-5 w-5" />
                Patch Panel Selection and Installation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Patch Panel Types and Specifications</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Patch panels provide organised termination points for structured cabling and enable flexible cross-connection capabilities.
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-400 mb-2">Copper Patch Panels</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• 24 or 48 port configurations</li>
                      <li>• Cat5e, Cat6, Cat6a compatibility</li>
                      <li>• 110 or Krone termination blocks</li>
                      <li>• Front and rear cable management</li>
                      <li>• Colour-coded port identification</li>
                      <li>• Angled and straight options</li>
                    </ul>
                  </div>
                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-400 mb-2">Fibre Patch Panels</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• LC, SC, ST connector options</li>
                      <li>• 12, 24, 48 port densities</li>
                      <li>• Splice tray integration</li>
                      <li>• Bend radius management</li>
                      <li>• Single and multimode options</li>
                      <li>• Dust shutter protection</li>
                    </ul>
                  </div>
                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-400 mb-2">Modular Panels</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Mix of copper and fibre ports</li>
                      <li>• Keystone jack compatibility</li>
                      <li>• Field-customisable configurations</li>
                      <li>• Easy port type changes</li>
                      <li>• Various connector standards</li>
                      <li>• Future upgrade capability</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg">
                <h4 className="font-medium text-yellow-400 mb-3">Installation Best Practices</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-white font-medium mb-2">Mechanical Installation</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Secure mounting to rack rails using appropriate screws</li>
                      <li>• Verify rack hole alignment before final tightening</li>
                      <li>• Install cable management above and below panels</li>
                      <li>• Maintain consistent gap spacing between panels</li>
                      <li>• Use rack nuts and cage nuts for adjustability</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-2">Cable Termination</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Follow manufacturer's termination procedures</li>
                      <li>• Maintain cable pair twist to termination point</li>
                      <li>• Use appropriate punch-down tools and pressure</li>
                      <li>• Verify pin-out assignments before termination</li>
                      <li>• Test each termination for continuity and performance</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-yellow-400">Cable Management Systems</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Horizontal and Vertical Cable Management</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Professional cable management ensures proper bend radius, prevents cable stress, and maintains organised appearance for efficient troubleshooting.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-400 mb-3">Horizontal Management</h4>
                    <ul className="text-sm text-gray-300 space-y-2">
                      <li><strong>1U Management Panels:</strong> 24 patch cord capacity</li>
                      <li><strong>2U Management Panels:</strong> 48 patch cord capacity</li>
                      <li><strong>D-Ring Management:</strong> Flexible routing options</li>
                      <li><strong>Finger Ducts:</strong> Organised cable channels</li>
                      <li><strong>Brush Panels:</strong> Clean cable entry/exit</li>
                      <li><strong>Spacing:</strong> Every second or third rack unit</li>
                    </ul>
                  </div>
                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-400 mb-3">Vertical Management</h4>
                    <ul className="text-sm text-gray-300 space-y-2">
                      <li><strong>Vertical Cable Managers:</strong> Full rack height</li>
                      <li><strong>Side Mount Options:</strong> Left and right placement</li>
                      <li><strong>Finger Ducts:</strong> Multiple cable entry points</li>
                      <li><strong>Cable Rings:</strong> Secure attachment points</li>
                      <li><strong>Velcro Straps:</strong> Adjustable cable bundling</li>
                      <li><strong>Capacity:</strong> 100+ cables per manager</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg">
                <h4 className="font-medium text-yellow-400 mb-3">Cable Routing Guidelines</h4>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-white font-medium mb-2">Bend Radius Management</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Maintain 4× cable diameter minimum</li>
                      <li>• Use curved cable guides at direction changes</li>
                      <li>• Avoid sharp edges and tight corners</li>
                      <li>• Plan cable routes before installation</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-2">Service Loop Management</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Provide adequate length for equipment removal</li>
                      <li>• Coil loops neatly using velcro straps</li>
                      <li>• Position loops for easy access</li>
                      <li>• Label both ends of service loops</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-2">Separation Requirements</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Separate power and data cables</li>
                      <li>• Use different cable managers where possible</li>
                      <li>• Cross at 90 degrees when necessary</li>
                      <li>• Maintain 150mm minimum separation</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center">
                <Thermometer className="mr-2 h-5 w-5" />
                Environmental and Safety Considerations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Temperature and Humidity Control</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Proper environmental control ensures equipment reliability and extends component lifespan whilst maintaining optimal performance.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-400 mb-3">Operating Conditions</h4>
                    <ul className="text-sm text-gray-300 space-y-2">
                      <li><strong>Temperature:</strong> 18-24°C (64-75°F) optimal</li>
                      <li><strong>Humidity:</strong> 45-55% relative humidity</li>
                      <li><strong>Temperature Change:</strong> Max 5°C per hour</li>
                      <li><strong>Humidity Change:</strong> Max 10% per hour</li>
                      <li><strong>Airflow:</strong> 0.2-0.5 m/s velocity</li>
                      <li><strong>Filtration:</strong> ASHRAE 52.2 MERV 8 minimum</li>
                    </ul>
                  </div>
                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-400 mb-3">Monitoring and Alerts</h4>
                    <ul className="text-sm text-gray-300 space-y-2">
                      <li><strong>Temperature Sensors:</strong> Multiple rack positions</li>
                      <li><strong>Humidity Sensors:</strong> Room and rack level</li>
                      <li><strong>Airflow Monitoring:</strong> Inlet and exhaust</li>
                      <li><strong>Alert Thresholds:</strong> Warning and critical levels</li>
                      <li><strong>Data Logging:</strong> Historical trend analysis</li>
                      <li><strong>Remote Monitoring:</strong> 24/7 alerting capability</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg">
                <h4 className="font-medium text-yellow-400 mb-3">Safety and Security Requirements</h4>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-white font-medium mb-2">Fire Safety</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• FM200 or equivalent suppression systems</li>
                      <li>• Early smoke detection (VESDA)</li>
                      <li>• Emergency power-off (EPO) systems</li>
                      <li>• Fire-rated cable penetrations</li>
                      <li>• Regular inspection and testing</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-2">Physical Security</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Locked cabinet doors and panels</li>
                      <li>• Access control and card readers</li>
                      <li>• CCTV monitoring coverage</li>
                      <li>• Visitor escort requirements</li>
                      <li>• Equipment asset tracking</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-2">Electrical Safety</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Proper earthing and bonding</li>
                      <li>• RCD protection on all circuits</li>
                      <li>• Emergency lighting provision</li>
                      <li>• Safe isolation procedures</li>
                      <li>• Regular PAT testing schedule</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-yellow-400">Professional Installation Standards</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-white mb-3 flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-400" />
                    Professional Standards
                  </h4>
                  <ul className="text-sm text-gray-300 space-y-2 bg-card p-4 rounded-lg">
                    <li>• Consistent cable routing and management</li>
                    <li>• Proper bend radius maintenance throughout</li>
                    <li>• Appropriate cable support and strain relief</li>
                    <li>• Clear and comprehensive labelling system</li>
                    <li>• Neat and organised patch cord dressing</li>
                    <li>• Professional appearance and workmanship</li>
                    <li>• Complete documentation and as-built drawings</li>
                    <li>• Compliance with all relevant standards</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-white mb-3 flex items-center">
                    <AlertTriangle className="mr-2 h-4 w-4 text-red-400" />
                    Common Mistakes to Avoid
                  </h4>
                  <ul className="text-sm text-gray-300 space-y-2 bg-card p-4 rounded-lg">
                    <li>• Inadequate cable management and support</li>
                    <li>• Excessive bend radius violations</li>
                    <li>• Poor patch cord routing and organisation</li>
                    <li>• Inconsistent or missing labelling</li>
                    <li>• Mixing power and data cables</li>
                    <li>• Inadequate documentation</li>
                    <li>• Poor planning and preparation</li>
                    <li>• Ignoring manufacturer specifications</li>
                  </ul>
                </div>
              </div>
              
              <Alert className="border-green-500/20 bg-card">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <AlertDescription className="text-gray-300">
                  <strong className="text-green-400">Professional Excellence:</strong> High-quality rack organisation reflects professional competence and ensures reliable, maintainable network infrastructure that meets industry standards.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-yellow-400">Advanced Rack Technologies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Intelligent Rack Systems</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Modern rack systems incorporate intelligent monitoring, automated management, and predictive analytics to optimise performance and reliability.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-400 mb-3">Smart Monitoring Systems</h4>
                    <ul className="text-sm text-gray-300 space-y-2">
                      <li><strong>Environmental Sensors:</strong> Temperature, humidity, airflow monitoring</li>
                      <li><strong>Power Monitoring:</strong> Real-time consumption and efficiency</li>
                      <li><strong>Asset Tracking:</strong> RFID/barcode equipment identification</li>
                      <li><strong>Security Monitoring:</strong> Access logging and intrusion detection</li>
                      <li><strong>Health Monitoring:</strong> Predictive failure analysis</li>
                      <li><strong>Capacity Management:</strong> Space and power utilisation tracking</li>
                    </ul>
                  </div>
                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-400 mb-3">Automated Management Features</h4>
                    <ul className="text-sm text-gray-300 space-y-2">
                      <li><strong>Robotic Cable Management:</strong> Automated patch cord routing</li>
                      <li><strong>Dynamic Airflow Control:</strong> Adaptive cooling optimisation</li>
                      <li><strong>Auto-Discovery:</strong> Automatic equipment recognition</li>
                      <li><strong>Change Detection:</strong> Real-time configuration monitoring</li>
                      <li><strong>Predictive Alerts:</strong> Proactive maintenance scheduling</li>
                      <li><strong>Remote Management:</strong> Cloud-based monitoring and control</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg">
                <h4 className="font-medium text-yellow-400 mb-3">Edge Computing Integration</h4>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-white font-medium mb-2">Micro Data Centres</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Compact 42U integrated solutions</li>
                      <li>• Built-in cooling and power systems</li>
                      <li>• Sound attenuation for office deployment</li>
                      <li>• Remote monitoring and management</li>
                      <li>• Rapid deployment capabilities</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-2">Modular Expansion</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Scalable rack configurations</li>
                      <li>• Hot-swappable components</li>
                      <li>• Standardised interfaces</li>
                      <li>• Future technology accommodation</li>
                      <li>• Investment protection strategies</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-2">5G and IoT Ready</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Low-latency equipment placement</li>
                      <li>• High-frequency cable management</li>
                      <li>• Massive connectivity support</li>
                      <li>• Edge AI processing capabilities</li>
                      <li>• Network slicing infrastructure</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-yellow-400">Power and Cooling Integration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Advanced Power Distribution</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Modern rack power systems provide precise monitoring, redundancy, and efficiency optimisation to support high-density equipment deployments.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-400 mb-3">Intelligent PDU Systems</h4>
                    <ul className="text-sm text-gray-300 space-y-2">
                      <li><strong>Outlet-Level Monitoring:</strong> Individual socket power measurement</li>
                      <li><strong>Remote Switching:</strong> Network-controlled outlet management</li>
                      <li><strong>Current Monitoring:</strong> Real-time load balancing</li>
                      <li><strong>Environmental Integration:</strong> Temperature-based load shedding</li>
                      <li><strong>Billing Integration:</strong> Tenant-specific power allocation</li>
                      <li><strong>Predictive Analytics:</strong> Capacity planning support</li>
                    </ul>
                  </div>
                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-400 mb-3">Redundancy and Reliability</h4>
                    <ul className="text-sm text-gray-300 space-y-2">
                      <li><strong>Dual Power Feeds:</strong> A and B feed redundancy</li>
                      <li><strong>Automatic Transfer:</strong> Seamless failover capability</li>
                      <li><strong>UPS Integration:</strong> Coordinated backup power</li>
                      <li><strong>Load Balancing:</strong> Optimised power distribution</li>
                      <li><strong>Maintenance Bypass:</strong> Hot-swappable components</li>
                      <li><strong>Fault Isolation:</strong> Minimal impact on operations</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg">
                <h4 className="font-medium text-yellow-400 mb-3">Precision Cooling Systems</h4>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-white font-medium mb-2">In-Row Cooling</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Close-coupled cooling delivery</li>
                      <li>• Variable speed fan control</li>
                      <li>• Hot spot elimination</li>
                      <li>• Energy efficiency optimisation</li>
                      <li>• Predictive maintenance alerts</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-2">Liquid Cooling Options</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Rear door heat exchangers</li>
                      <li>• Direct-to-chip cooling</li>
                      <li>• Immersion cooling systems</li>
                      <li>• Hybrid air/liquid solutions</li>
                      <li>• Heat recovery capabilities</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-2">Containment Systems</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Hot aisle containment (HAC)</li>
                      <li>• Cold aisle containment (CAC)</li>
                      <li>• Chimney cabinet solutions</li>
                      <li>• Blanking panel management</li>
                      <li>• Pressure control systems</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-yellow-400">Structured Cabling in Modern Data Centres</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">High-Density Connectivity Solutions</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Modern data centres require ultra-high-density connectivity with minimal space consumption and maximum performance capability.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-400 mb-3">Ultra-High Density Panels</h4>
                    <ul className="text-sm text-gray-300 space-y-2">
                      <li><strong>144-Port Fibre Panels:</strong> Maximum density in 1U space</li>
                      <li><strong>MPO/MTP Connectivity:</strong> 12 and 24 fibre solutions</li>
                      <li><strong>Angled Connections:</strong> Optimised bend radius management</li>
                      <li><strong>Modular Cassettes:</strong> Flexible configuration options</li>
                      <li><strong>Polarity Management:</strong> Automated polarity control</li>
                      <li><strong>Future Compatibility:</strong> 400G and beyond support</li>
                    </ul>
                  </div>
                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-400 mb-3">Structured Fibre Management</h4>
                    <ul className="text-sm text-gray-300 space-y-2">
                      <li><strong>Zone Distribution:</strong> Three-zone cabling architecture</li>
                      <li><strong>Trunk Cables:</strong> High-count backbone connectivity</li>
                      <li><strong>Breakout Management:</strong> Controlled fan-out solutions</li>
                      <li><strong>Splice Enclosures:</strong> Protected splicing environments</li>
                      <li><strong>Testing Access:</strong> Built-in test point provision</li>
                      <li><strong>Documentation Integration:</strong> Automated record keeping</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg">
                <h4 className="font-medium text-yellow-400 mb-3">Cable Management Innovation</h4>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-white font-medium mb-2">Automated Patching</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Robotic patch cord installation</li>
                      <li>• Software-defined connectivity</li>
                      <li>• Remote configuration changes</li>
                      <li>• Automated testing verification</li>
                      <li>• Change tracking and logging</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-2">Intelligent Infrastructure</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Electronic work orders</li>
                      <li>• LED guidance systems</li>
                      <li>• Augmented reality overlays</li>
                      <li>• Voice-guided instructions</li>
                      <li>• Digital twin integration</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-2">Maintenance Optimisation</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Predictive failure analysis</li>
                      <li>• Automated inventory management</li>
                      <li>• Scheduled replacement programs</li>
                      <li>• Performance trending analysis</li>
                      <li>• Cost optimisation algorithms</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-yellow-400">Compliance and Certification Requirements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">International Standards Compliance</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Professional rack installations must comply with multiple international standards covering safety, performance, and environmental requirements.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-600">
                        <th className="text-left p-3 text-yellow-400">Standard</th>
                        <th className="text-left p-3 text-yellow-400">Scope</th>
                        <th className="text-left p-3 text-yellow-400">Key Requirements</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-300">
                      <tr className="border-b border-gray-700">
                        <td className="p-3">EIA-310-E</td>
                        <td className="p-3">Rack mechanical specifications</td>
                        <td className="p-3">Dimensions, mounting, load ratings</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="p-3">IEC 60297</td>
                        <td className="p-3">Electronic equipment racks</td>
                        <td className="p-3">Mechanical requirements, dimensions</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="p-3">ASHRAE TC 9.9</td>
                        <td className="p-3">Data centre thermal guidelines</td>
                        <td className="p-3">Temperature, humidity, airflow</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="p-3">IEC 61587</td>
                        <td className="p-3">Electronic equipment practices</td>
                        <td className="p-3">Installation, operation, maintenance</td>
                      </tr>
                      <tr>
                        <td className="p-3">BS EN 50600</td>
                        <td className="p-3">Data centre facilities</td>
                        <td className="p-3">Infrastructure design and management</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg">
                <h4 className="font-medium text-yellow-400 mb-3">Professional Certification Requirements</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-white font-medium mb-2">Industry Certifications</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• BICSI Registered Communications Distribution Designer (RCDD)</li>
                      <li>• Data Centre Certified Associate (DCCA)</li>
                      <li>• CompTIA Server+ and Network+ certifications</li>
                      <li>• Manufacturer-specific training programs</li>
                      <li>• Ongoing professional development requirements</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-2">Quality Assurance</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Third-party installation verification</li>
                      <li>• Performance testing and certification</li>
                      <li>• Warranty compliance documentation</li>
                      <li>• Insurance and liability coverage</li>
                      <li>• Customer acceptance procedures</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-yellow-400">Future Trends and Emerging Technologies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Next-Generation Infrastructure</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Emerging technologies and changing requirements drive innovation in rack design, management systems, and operational practices.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-400 mb-3">Sustainable Design Trends</h4>
                    <ul className="text-sm text-gray-300 space-y-2">
                      <li><strong>Circular Economy:</strong> Recyclable and reusable components</li>
                      <li><strong>Energy Efficiency:</strong> Ultra-low power consumption systems</li>
                      <li><strong>Carbon Neutral:</strong> Net-zero operational carbon footprint</li>
                      <li><strong>Renewable Integration:</strong> Solar and wind power systems</li>
                      <li><strong>Waste Heat Recovery:</strong> Building heating integration</li>
                      <li><strong>Biodegradable Materials:</strong> Environmentally friendly options</li>
                    </ul>
                  </div>
                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-400 mb-3">AI and Machine Learning</h4>
                    <ul className="text-sm text-gray-300 space-y-2">
                      <li><strong>Predictive Maintenance:</strong> AI-driven failure prediction</li>
                      <li><strong>Optimisation Algorithms:</strong> Dynamic resource allocation</li>
                      <li><strong>Autonomous Operations:</strong> Self-healing infrastructure</li>
                      <li><strong>Pattern Recognition:</strong> Anomaly detection systems</li>
                      <li><strong>Natural Language:</strong> Voice-controlled management</li>
                      <li><strong>Digital Assistants:</strong> AI-powered troubleshooting</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg">
                <h4 className="font-medium text-yellow-400 mb-3">Technology Roadmap Considerations</h4>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-white font-medium mb-2">Connectivity Evolution</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• 800G and 1.6T Ethernet standards</li>
                      <li>• Co-packaged optics integration</li>
                      <li>• Silicon photonics advancement</li>
                      <li>• Quantum communication preparation</li>
                      <li>• Photonic switching systems</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-2">Infrastructure Flexibility</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Modular and composable designs</li>
                      <li>• Software-defined infrastructure</li>
                      <li>• Container-based deployments</li>
                      <li>• Hybrid cloud integration</li>
                      <li>• Edge computing distribution</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-2">Security Enhancement</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Hardware security modules</li>
                      <li>• Biometric access control</li>
                      <li>• Blockchain verification</li>
                      <li>• Zero-trust architectures</li>
                      <li>• Quantum-safe encryption</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Quiz 
            title="Section 5 Knowledge Check"
            description="Test your understanding of rack and patch panel organisation"
            questions={quizQuestions}
          />

          <div className="flex justify-between items-center pt-8 border-t border-gray-700">
            <Link to="../data-cabling-module-4-section-4">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../data-cabling-module-5">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-400/10">
                Next Module
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataCablingModule4Section5;