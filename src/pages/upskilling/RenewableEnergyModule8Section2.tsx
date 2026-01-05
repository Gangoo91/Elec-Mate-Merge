import { ArrowLeft, ArrowRight, Building, CheckCircle, AlertCircle, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';

const RenewableEnergyModule8Section2 = () => {
  const quizQuestions = [
    {
      id: 1,
      question: "What does Part P of the Building Regulations cover?",
      options: [
        "Structural loading and roof integrity",
        "Electrical safety in dwellings",
        "Energy performance and insulation",
        "Fire safety and escape routes"
      ],
      correct: 1,
      explanation: "Part P covers electrical safety in dwellings, including requirements for electrical installations and the need for certification by competent persons."
    },
    {
      id: 2,
      question: "When is a structural assessment required for PV installations?",
      options: [
        "Only for commercial installations",
        "When installing more than 20 panels",
        "When additional loads exceed structural capacity or for older buildings",
        "Never required for retrofit installations"
      ],
      correct: 2,
      explanation: "A structural assessment is required when additional loads exceed the roof's structural capacity, for older buildings, or when specified by local planning conditions."
    },
    {
      id: 3,
      question: "What is wind uplift in relation to PV installations?",
      options: [
        "The force pushing panels down in high winds",
        "The suction force that can lift panels off the roof",
        "The sideways force on panel mounting systems",
        "The rotational force on individual panels"
      ],
      correct: 1,
      explanation: "Wind uplift is the suction force created by wind passing over panels that can lift them off the roof if not properly secured with adequate fixings."
    },
    {
      id: 4,
      question: "Who signs off electrical compliance for PV installations?",
      options: [
        "The property owner",
        "Building control inspector",
        "Competent person certified installer",
        "Local authority planning office"
      ],
      correct: 2,
      explanation: "A competent person certified installer signs off electrical compliance by issuing the appropriate certificates (EIC or MEIWC) under Part P."
    },
    {
      id: 5,
      question: "Is PV installation considered notifiable work under Building Regulations?",
      options: [
        "Always notifiable to building control",
        "Only notifiable if over 4kW capacity",
        "Generally not notifiable if installed by competent person",
        "Only notifiable for commercial installations"
      ],
      correct: 2,
      explanation: "PV installations are generally not notifiable to building control if installed by a competent person registered with an approved scheme, who can self-certify the work."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="px-8 pt-8 pb-12">
        <Link to="../renewable-energy-module-8">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 8
          </Button>
        </Link>
        
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <Building className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-4xl font-bold text-white">
                  Building Regulations (Part L, Part P, Structural)
                </h1>
                <p className="text-xl text-gray-400">
                  Ensuring safety and structural integrity in solar installations
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 8
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                Section 2
              </Badge>
            </div>
          </div>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Introduction</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <p>
                Solar installations must comply with key UK Building Regulations to ensure safety, 
                structural integrity, and energy performance. Understanding these requirements prevents 
                costly mistakes and ensures legal compliance.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Learning Objectives</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                <span>Identify applicable building regulations for solar installations</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                <span>Understand how solar impacts structural loading and building performance</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                <span>Know responsibilities for Part P notifications and compliance</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Part L: Energy Performance and Conservation</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="bg-green-600/10 border border-green-600/20 rounded-md p-4">
                <h4 className="text-green-400 font-semibold mb-2">Part L Overview:</h4>
                <p className="text-sm">
                  Part L addresses conservation of fuel and power, focusing on building energy efficiency, 
                  thermal performance, and renewable energy integration.
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-blue-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="font-semibold text-yellow-400 mb-3">Part L1A: New Dwellings</h4>
                  <div className="space-y-3 text-sm">
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <h5 className="text-white font-medium mb-2">Requirements:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• Target Fabric Energy Efficiency (TFEE)</li>
                        <li>• Primary Energy Rate (PER) calculations</li>
                        <li>• Dwelling Emission Rate (DER) compliance</li>
                        <li>• SAP assessments and Energy Performance Certificates</li>
                        <li>• Overheating risk assessment</li>
                      </ul>
                    </div>
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <h5 className="text-white font-medium mb-2">PV Integration:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• Renewable energy contribution to compliance</li>
                        <li>• SAP calculations include PV generation</li>
                        <li>• Building integrated vs. retrofit considerations</li>
                        <li>• Impact on air permeability testing</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="font-semibold text-purple-400 mb-3">Part L1B: Existing Dwellings</h4>
                  <div className="space-y-3 text-sm">
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <h5 className="text-white font-medium mb-2">Retrofit Requirements:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• No worsening of thermal performance</li>
                        <li>• Consideration of consequential improvements</li>
                        <li>• Historic building exemptions</li>
                        <li>• Listed building consent requirements</li>
                        <li>• Conservation area constraints</li>
                      </ul>
                    </div>
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <h5 className="text-white font-medium mb-2">PV Specific Considerations:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• Roof penetrations and thermal bridging</li>
                        <li>• Ventilation gap requirements</li>
                        <li>• Impact on existing insulation</li>
                        <li>• Cable entry sealing requirements</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-400/30">
                <h4 className="font-semibold text-yellow-400 mb-3">Thermal Bridge Assessment:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="text-white font-medium">Common Thermal Bridges:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Mounting rail connections to roof structure</li>
                      <li>• Cable entry points through roof membrane</li>
                      <li>• Penetrations for structural fixings</li>
                      <li>• Junction between PV array and building fabric</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Mitigation Strategies:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Thermal break materials at fixing points</li>
                      <li>• Sealed cable glands and grommets</li>
                      <li>• Continuous insulation beneath mounting points</li>
                      <li>• Professional thermal modelling if required</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Part P: Electrical Safety in Dwellings</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="bg-red-600/10 border border-red-600/20 rounded-md p-4">
                <h4 className="text-red-400 font-semibold mb-2">Part P Scope and Requirements:</h4>
                <p className="text-sm">
                  Part P ensures electrical installations in dwellings are safe and installed by 
                  competent persons, with appropriate testing, certification, and notification procedures.
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
                  <h4 className="font-semibold text-orange-400 mb-3">Competent Person Requirements:</h4>
                  <div className="space-y-3 text-sm">
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <h5 className="text-white font-medium mb-2">Approved Schemes:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• NICEIC (National Inspection Council)</li>
                        <li>• NAPIT (National Association of Professional Inspectors)</li>
                        <li>• Stroma Certification</li>
                        <li>• BSI (British Standards Institution)</li>
                        <li>• ELECSA (Electrical Contractors Association)</li>
                      </ul>
                    </div>
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <h5 className="text-white font-medium mb-2">Self-Certification Benefits:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• No building control notification required</li>
                        <li>• Direct certification to customer</li>
                        <li>• Reduced installation timescales</li>
                        <li>• Lower overall project costs</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="font-semibold text-yellow-400 mb-3">Certification Requirements:</h4>
                  <div className="space-y-3 text-sm">
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <h5 className="text-white font-medium mb-2">New Installation:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• Electrical Installation Certificate (EIC)</li>
                        <li>• Schedule of Inspections and Tests</li>
                        <li>• Circuit schedule and protective device details</li>
                        <li>• Test results including IR, continuity, and RCD</li>
                      </ul>
                    </div>
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <h5 className="text-white font-medium mb-2">Addition to Existing:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• Minor Electrical Installation Works Certificate</li>
                        <li>• Or full EIC if significant modification</li>
                        <li>• Assessment of existing installation adequacy</li>
                        <li>• Earth fault loop impedance verification</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                <h4 className="font-semibold text-purple-400 mb-3">Notifiable vs Non-Notifiable Work:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="text-white font-medium mb-2">Generally Non-Notifiable (Competent Person):</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• PV installations by registered competent persons</li>
                      <li>• Addition of circuits from existing consumer unit</li>
                      <li>• Work outside special locations</li>
                      <li>• Replacement of accessories like isolators</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium mb-2">Potentially Notifiable:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• New consumer unit installation</li>
                      <li>• Work in special locations (bathrooms, etc.)</li>
                      <li>• Installation by non-registered persons</li>
                      <li>• Major alterations to existing circuits</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Structural Loading and Assessment</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>Understanding structural impacts ensures safe installation and prevents building damage:</p>
              
              <div className="space-y-6">
                <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
                  <h4 className="font-semibold text-red-400 mb-3">Wind Loading Considerations:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h5 className="text-white font-medium mb-2">Wind Forces on PV Arrays:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• <strong>Uplift forces:</strong> Suction on leeward side can exceed 1.5kN/m²</li>
                        <li>• <strong>Lateral forces:</strong> Horizontal loads on mounting structure</li>
                        <li>• <strong>Dynamic effects:</strong> Vibration and fatigue loading</li>
                        <li>• <strong>Combined loading:</strong> Multiple force directions simultaneously</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-2">Design Wind Speeds:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• <strong>Basic wind speed:</strong> Regional variation 21-26 m/s</li>
                        <li>• <strong>Terrain category:</strong> Open country vs urban areas</li>
                        <li>• <strong>Building height:</strong> Increased exposure with height</li>
                        <li>• <strong>Local topography:</strong> Hills and coastal exposure</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
                  <h4 className="font-semibold text-orange-400 mb-3">Dead and Live Load Assessment:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <h5 className="text-white font-medium">Typical Dead Loads:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• PV modules: 15-25 kg/m²</li>
                        <li>• Mounting system: 5-15 kg/m²</li>
                        <li>• Cables and conduits: 2-5 kg/m²</li>
                        <li>• Total additional: 25-45 kg/m²</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium">Snow Loading:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• UK snow load: 0.4-1.5 kN/m²</li>
                        <li>• Altitude factor: Increases with height</li>
                        <li>• Drift patterns: Behind parapets/arrays</li>
                        <li>• Sliding snow: Additional point loads</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-White font-medium">Access Loading:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• Maintenance access: 1.5 kN/m²</li>
                        <li>• Walkway areas: 3.0 kN/m²</li>
                        <li>• Point loads: Personnel and equipment</li>
                        <li>• Dynamic factors: Movement and impact</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="font-semibold text-yellow-400 mb-3">When Structural Assessment is Required:</h4>
                  <div className="space-y-3 text-sm">
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <h5 className="text-white font-medium mb-2">Mandatory Assessment Triggers:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• Buildings constructed before 1960 (limited design standards)</li>
                        <li>• Previous structural modifications or damage</li>
                        <li>• Arrays exceeding 50m² on domestic properties</li>
                        <li>• Unusual building geometry or construction</li>
                        <li>• Local authority planning requirements</li>
                        <li>• Insurance company stipulations</li>
                      </ul>
                    </div>
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <h5 className="text-white font-medium mb-2">Assessment Process:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• Chartered structural engineer appointment</li>
                        <li>• Building survey and structural inspection</li>
                        <li>• Load calculation and stress analysis</li>
                        <li>• Remedial work specification if required</li>
                        <li>• Certification of structural adequacy</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Building Control Coordination</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="bg-yellow-400/10 border border-blue-600/20 rounded-md p-4">
                <h4 className="text-yellow-400 font-semibold mb-2">Building Control Interface:</h4>
                <p className="text-sm">
                  Effective coordination with building control ensures compliance and avoids delays 
                  or retrospective corrective work.
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="font-semibold text-green-400 mb-3">Pre-Installation Liaison:</h4>
                  <div className="space-y-3 text-sm">
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <h5 className="text-white font-medium mb-2">Early Consultation:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• Discuss scope and approach with building control</li>
                        <li>• Clarify notification requirements</li>
                        <li>• Agree inspection hold points</li>
                        <li>• Confirm documentation requirements</li>
                      </ul>
                    </div>
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <h5 className="text-white font-medium mb-2">Documentation Submission:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• Design drawings and specifications</li>
                        <li>• Structural calculations (if required)</li>
                        <li>• Product technical data sheets</li>
                        <li>• Installation methodology statement</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="font-semibold text-purple-400 mb-3">Inspection and Completion:</h4>
                  <div className="space-y-3 text-sm">
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <h5 className="text-white font-medium mb-2">Inspection Points:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• Foundation/fixing point preparation</li>
                        <li>• Structural work before covering</li>
                        <li>• First fix electrical installation</li>
                        <li>• Completion inspection</li>
                      </ul>
                    </div>
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <h5 className="text-white font-medium mb-2">Completion Documentation:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• Building Regulations Completion Certificate</li>
                        <li>• Final inspection report</li>
                        <li>• Electrical installation certificates</li>
                        <li>• Structural engineer's certificate (if applicable)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Real World Scenario</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <div className="bg-red-600/10 border border-red-600/20 rounded-md p-4">
                <p className="text-sm">
                  <strong>Case Study:</strong> PV panels installed without structural sign-off caused tile 
                  damage in high winds—the inadequate fixings failed under 70mph winds, damaging £15,000 
                  worth of roof tiles and costing the installer their warranty coverage and reputation.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Summary</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <p>
                Complying with Building Regulations avoids structural failures, fire risk, and potential 
                legal claims. Understanding Part L, Part P, and structural requirements ensures safe, 
                compliant installations that protect both installers and customers.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-yellow-400" />
                Knowledge Check
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SingleQuestionQuiz questions={quizQuestions} title="Building Regulations Quiz" />
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Link to="../renewable-energy-module-8-section-1">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../renewable-energy-module-8">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-600">
                Complete Module
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RenewableEnergyModule8Section2;