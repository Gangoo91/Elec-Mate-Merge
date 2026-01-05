import { ArrowLeft, ArrowRight, Shield, CheckCircle, AlertTriangle, Target, Lightbulb, ChevronRight, ChevronLeft, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import BS7671EmbeddedQuiz from '@/components/upskilling/BS7671EmbeddedQuiz';

const BS7671Module4Section1 = () => {
  const quizQuestions = [
    {
      id: 1,
      question: "What is the primary purpose of ADS in electrical systems?",
      options: [
        "To provide surge protection",
        "To automatically disconnect the supply during earth faults within safe time limits",
        "To monitor power consumption",
        "To improve power factor"
      ],
      correct: 1,
      explanation: "ADS (Automatic Disconnection of Supply) is designed to automatically disconnect the electrical supply when an earth fault occurs, within time limits that prevent dangerous voltages persisting."
    },
    {
      id: 2,
      question: "Which system provides electric shock protection by isolation and no earth reference?",
      options: [
        "PELV",
        "FELV", 
        "SELV",
        "ADS"
      ],
      correct: 2,
      explanation: "SELV (Safety Extra-Low Voltage) provides protection through isolation from earth and other circuits, with no intentional earth connections."
    },
    {
      id: 3,
      question: "Where is PELV typically more practical than SELV?",
      options: [
        "In bathrooms only",
        "Where functional earthing is required for equipment operation",
        "In outdoor installations",
        "For motor circuits only"
      ],
      correct: 1,
      explanation: "PELV is used where some connection to earth is necessary for the proper functioning of equipment, but you still want the safety benefits of extra-low voltage."
    },
    {
      id: 4,
      question: "Why isn't FELV recognised as a protective measure?",
      options: [
        "It's too expensive",
        "It lacks proper isolation from higher voltage circuits",
        "It's only for DC circuits",
        "It requires special cables"
      ],
      correct: 1,
      explanation: "FELV (Functional Extra-Low Voltage) lacks the safety isolation required for protection against electric shock, as it may not be properly separated from higher voltage circuits."
    },
    {
      id: 5,
      question: "What kind of protection does double insulation provide?",
      options: [
        "Only basic protection",
        "Only fault protection",
        "Both basic and fault protection without requiring earthing",
        "Surge protection only"
      ],
      correct: 2,
      explanation: "Double or reinforced insulation provides both basic and fault protection through two independent layers of insulation, eliminating the need for protective earthing."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        <Link to="../bs7671-module-4">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 4
          </Button>
        </Link>
        
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <Shield className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-white">
                  Electric Shock Protection Methods
                </h1>
                <p className="text-lg sm:text-xl text-white">
                  SELV, PELV, ADS, and other protection strategies
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 4.1
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-white">
                20 minutes
              </Badge>
            </div>
          </div>

          {/* Introduction */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="h-6 w-6 text-yellow-400" />
                Introduction
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p className="text-base leading-relaxed">
                Electric shock protection is fundamental to electrical safety, with BS 7671 providing multiple protection methods to suit different installation environments and risk levels. From the basic ADS systems used in most installations to specialised SELV systems for high-risk areas, understanding these protection strategies is crucial for designing safe, compliant electrical installations.
              </p>
              <p className="text-base leading-relaxed">
                Modern installations increasingly require sophisticated protection approaches, particularly in special locations like bathrooms, swimming pools, and medical facilities. Amendment 2 has introduced additional considerations for smart buildings and renewable energy installations, making comprehensive understanding of protection methods more important than ever.
              </p>
              <p className="text-base leading-relaxed">
                This section provides detailed coverage of all recognised protection methods, their applications, installation requirements, and the regulatory framework governing their use in different environments.
              </p>
            </CardContent>
          </Card>

          {/* Learning Goals */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="h-6 w-6 text-yellow-400" />
                Learning Outcomes
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p className="mb-4">By the end of this section, you will be able to:</p>
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm"><strong>Evaluate</strong> different electric shock protection methods for various installation environments</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm"><strong>Design</strong> ADS systems with appropriate earthing arrangements and protective device coordination</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm"><strong>Apply</strong> SELV and PELV systems in special locations with correct voltage limits and isolation requirements</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm"><strong>Assess</strong> protection method effectiveness through proper testing and verification procedures</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm"><strong>Recommend</strong> appropriate protection strategies based on installation type, environment, and regulatory requirements</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm"><strong>Implement</strong> Amendment 2 requirements for enhanced protection in modern installations</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Content - Basic vs Fault Protection */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="h-6 w-6 text-yellow-400" />
                Basic vs Fault Protection
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="bg-yellow-400/10 p-4 rounded-lg border border-blue-600/30">
                <h4 className="text-white font-semibold mb-3">Understanding Protection Types</h4>
                <p className="text-sm mb-3">
                  BS 7671 distinguishes between two fundamental types of protection against electric shock, each addressing different scenarios and risks.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-white font-semibold text-lg mb-3">Basic Protection</h4>
                  <p className="text-sm mb-3 text-yellow-400">Prevents contact with live parts during normal operation</p>
                  <ul className="text-sm space-y-2">
                    <li>• <strong>Insulation:</strong> Primary method using cable insulation and equipment casings</li>
                    <li>• <strong>Barriers/Enclosures:</strong> Physical prevention of access to live parts</li>
                    <li>• <strong>Positioning:</strong> Placing live parts out of reach</li>
                    <li>• <strong>SELV/PELV:</strong> Using extra-low voltage systems</li>
                  </ul>
                  <div className="mt-3 p-2 bg-green-600/20 rounded border border-green-600/40">
                    <p className="text-xs text-green-400">
                      <strong>Key Point:</strong> Basic protection is the first line of defence during normal conditions
                    </p>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-white font-semibold text-lg mb-3">Fault Protection</h4>
                  <p className="text-sm mb-3 text-yellow-400">Deals with dangerous voltages arising from faults</p>
                  <ul className="text-sm space-y-2">
                    <li>• <strong>ADS:</strong> Automatic disconnection when faults occur</li>
                    <li>• <strong>Double Insulation:</strong> Second layer of protection if first fails</li>
                    <li>• <strong>Equipotential Bonding:</strong> Reducing potential differences</li>
                    <li>• <strong>Electrical Separation:</strong> Isolating circuits from earth</li>
                  </ul>
                  <div className="mt-3 p-2 bg-orange-600/20 rounded border border-orange-600/40">
                    <p className="text-xs text-orange-400">
                      <strong>Key Point:</strong> Fault protection activates when basic protection fails
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ADS Content */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="h-6 w-6 text-yellow-400" />
                Automatic Disconnection of Supply (ADS)
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="bg-yellow-600/10 p-4 rounded-lg border border-yellow-600/30">
                <h4 className="text-white font-semibold mb-3">The Most Common Protection Method</h4>
                <p className="text-sm">
                  ADS is the primary fault protection method used in most installations, relying on the coordinated operation of earthing systems and protective devices to ensure rapid disconnection during earth faults.
                </p>
              </div>

              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-4">ADS System Components</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="text-white font-semibold text-sm mb-3">Essential Elements:</h5>
                    <ul className="text-xs space-y-2">
                      <li>• <strong>Protective earthing:</strong> Connection of exposed parts to earth</li>
                      <li>• <strong>Protective equipotential bonding:</strong> Connecting metalwork</li>
                      <li>• <strong>Protective conductors:</strong> Earth fault return path</li>
                      <li>• <strong>Overcurrent devices:</strong> MCBs, fuses, or RCDs</li>
                      <li>• <strong>Earth fault loop impedance:</strong> Low enough for disconnection</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-semibold text-sm mb-3">Disconnection Times:</h5>
                    <ul className="text-xs space-y-2">
                      <li>• <strong>Socket outlets:</strong> 0.4 seconds maximum</li>
                      <li>• <strong>Fixed equipment:</strong> 5 seconds maximum</li>
                      <li>• <strong>Distribution circuits:</strong> 5 seconds maximum</li>
                      <li>• <strong>Special locations:</strong> May require faster times</li>
                      <li>• <strong>TT systems:</strong> Often require RCD protection</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="bg-green-600/10 p-3 rounded border border-green-600/30">
                  <h5 className="text-green-400 font-semibold text-sm mb-2">TN Systems</h5>
                  <p className="text-xs">Low earth fault loop impedance allows overcurrent devices to provide ADS protection effectively.</p>
                </div>
                <div className="bg-yellow-400/10 p-3 rounded border border-blue-600/30">
                  <h5 className="text-yellow-400 font-semibold text-sm mb-2">TT Systems</h5>
                  <p className="text-xs">High earth resistance requires RCD protection to achieve safe disconnection times.</p>
                </div>
                <div className="bg-purple-600/10 p-3 rounded border border-purple-600/30">
                  <h5 className="text-purple-400 font-semibold text-sm mb-2">IT Systems</h5>
                  <p className="text-xs">First fault monitored, second fault requires automatic disconnection within time limits.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* SELV/PELV Content */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="h-6 w-6 text-green-500" />
                Extra-Low Voltage Systems (SELV & PELV)
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-white font-semibold text-lg mb-3">SELV (Safety Extra-Low Voltage)</h4>
                  <p className="text-sm mb-3 text-green-400">Maximum 50V AC / 120V DC with complete isolation</p>
                  <ul className="text-sm space-y-2">
                    <li>• <strong>No earth connection:</strong> Circuit isolated from earth</li>
                    <li>• <strong>Safety isolation:</strong> From higher voltage circuits</li>
                    <li>• <strong>Applications:</strong> Bathrooms, pools, children's areas</li>
                    <li>• <strong>Transformers:</strong> Must be safety isolating type</li>
                    <li>• <strong>Wiring:</strong> Segregated from other circuits</li>
                  </ul>
                  
                  <div className="mt-4 p-3 bg-green-600/20 rounded border border-green-600/40">
                    <h5 className="text-green-400 font-semibold text-sm mb-2">Installation Requirements:</h5>
                    <ul className="text-xs space-y-1">
                      <li>• Separate cable routes or screening</li>
                      <li>• Different connector types</li>
                      <li>• Clear marking and identification</li>
                      <li>• Testing of isolation integrity</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-white font-semibold text-lg mb-3">PELV (Protected Extra-Low Voltage)</h4>
                  <p className="text-sm mb-3 text-yellow-400">Similar to SELV but with earth connections permitted</p>
                  <ul className="text-sm space-y-2">
                    <li>• <strong>Earth permitted:</strong> Where functionally required</li>
                    <li>• <strong>Safety isolation:</strong> From higher voltage circuits</li>
                    <li>• <strong>Applications:</strong> Control systems, instrumentation</li>
                    <li>• <strong>Equipment earthing:</strong> For EMC or functional purposes</li>
                    <li>• <strong>Same voltage limits:</strong> 50V AC / 120V DC maximum</li>
                  </ul>

                  <div className="mt-4 p-3 bg-yellow-400/20 rounded border border-blue-600/40">
                    <h5 className="text-yellow-400 font-semibold text-sm mb-2">Key Differences from SELV:</h5>
                    <ul className="text-xs space-y-1">
                      <li>• Earthing connections allowed</li>
                      <li>• May use standard outlets in some cases</li>
                      <li>• Often used for functional earthing needs</li>
                      <li>• Still requires safety isolation</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-red-600/10 p-4 rounded-lg border border-red-600/30">
                <h4 className="text-white font-semibold mb-3">FELV - Not a Protective Measure</h4>
                <p className="text-sm mb-3">
                  <strong>Functional Extra-Low Voltage (FELV)</strong> operates at extra-low voltage but lacks the safety isolation required for shock protection.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-red-400 font-semibold text-sm mb-2">Why FELV Isn't Protective:</p>
                    <ul className="text-xs space-y-1">
                      <li>• No guarantee of isolation from higher voltages</li>
                      <li>• May be derived from autotransformers</li>
                      <li>• Could have direct connection to mains</li>
                      <li>• Lacks safety barriers of SELV/PELV</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-orange-400 font-semibold text-sm mb-2">FELV Requirements:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Requires both basic and fault protection</li>
                      <li>• Treated as low voltage installation</li>
                      <li>• Must comply with standard wiring rules</li>
                      <li>• Cannot rely on voltage limitation alone</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Double Insulation */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="h-6 w-6 text-purple-500" />
                Double or Reinforced Insulation
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="bg-purple-600/10 p-4 rounded-lg border border-purple-600/30">
                <h4 className="text-white font-semibold mb-3">Class II Equipment Protection</h4>
                <p className="text-sm">
                  Double or reinforced insulation provides both basic and fault protection without requiring protective earthing, making it ideal for portable equipment and specific installations.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-white font-semibold text-lg mb-3">Double Insulation</h4>
                  <ul className="text-sm space-y-2">
                    <li>• <strong>Basic insulation:</strong> Primary protection during normal operation</li>
                    <li>• <strong>Supplementary insulation:</strong> Independent second layer</li>
                    <li>• <strong>No single point failure:</strong> Two independent barriers</li>
                    <li>• <strong>No earth required:</strong> Equipment doesn't need earthing</li>
                  </ul>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-white font-semibold text-lg mb-3">Reinforced Insulation</h4>
                  <ul className="text-sm space-y-2">
                    <li>• <strong>Single barrier:</strong> Equivalent to double insulation</li>
                    <li>• <strong>Enhanced specification:</strong> Higher voltage withstand</li>
                    <li>• <strong>Manufacturing efficiency:</strong> Single enhanced layer</li>
                    <li>• <strong>Same protection level:</strong> As double insulation</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-3">Installation Considerations</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Equipment Selection:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Look for Class II symbol ⧈</li>
                      <li>• No earth terminal on equipment</li>
                      <li>• Suitable for earthing-sensitive locations</li>
                      <li>• Common in power tools, lighting</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Wiring Requirements:</p>
                    <ul className="text-xs space-y-1">
                      <li>• No protective conductor needed</li>
                      <li>• Insulated enclosures required</li>
                      <li>• No earth connections to equipment</li>
                      <li>• Maintain insulation integrity</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Testing & Maintenance:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Insulation resistance testing</li>
                      <li>• Visual inspection of insulation</li>
                      <li>• No earth continuity test</li>
                      <li>• Check for damage/modification</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Real World Scenario */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-orange-500" />
                Real World Scenario
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="bg-orange-600/10 p-4 rounded-lg border border-orange-600/30">
                <h4 className="text-white font-semibold mb-3">Children's Play Centre Lighting Design</h4>
                <p className="text-sm mb-3">
                  A new soft play centre requires low-level lighting in areas accessible to young children. The risk assessment identifies potential contact with lighting equipment during play activities.
                </p>
                <div className="bg-card p-3 rounded">
                  <p className="text-xs text-white mb-2">
                    <strong>Design Solution:</strong> The electrical designer specifies a 12V SELV lighting system using safety isolating transformers located in a separate equipment room, outside the play area.
                  </p>
                  <p className="text-xs text-white">
                    <strong>Key Benefits:</strong> Even if a child contacts the lighting circuit, the 12V SELV supply cannot cause electric shock. The isolation transformer ensures complete separation from the 230V mains supply.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-green-500" />
                Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p className="text-base leading-relaxed">
                Electric shock protection is fundamental to electrical safety. Understanding when and how to apply different protection methods ensures installations meet safety requirements and protect users effectively.
              </p>
              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-3">Key Points</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Basic protection prevents contact during normal operation</li>
                  <li>• Fault protection activates when basic protection fails</li>
                  <li>• ADS is the most common method, requiring proper earthing and disconnection</li>
                  <li>• SELV provides safety through isolation and voltage limitation</li>
                  <li>• PELV allows earthing where functionally required</li>
                  <li>• Double insulation eliminates the need for protective earthing</li>
                  <li>• Protection method selection depends on location, risk, and application</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <BS7671EmbeddedQuiz 
            questions={quizQuestions}
            title="Knowledge Check Quiz"
            description="Test your understanding of electric shock protection methods and their applications."
          />

          {/* Navigation */}
          <div className="flex justify-between">
            <Link to="../bs7671-module-4">
              <Button variant="outline" className="border-gray-600 text-white hover:bg-card">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Module 4
              </Button>
            </Link>
            <Link to="../bs7671-module-4-section-2">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-600">
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

export default BS7671Module4Section1;