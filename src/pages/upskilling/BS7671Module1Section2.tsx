import { ArrowLeft, ArrowRight, MapPin, AlertTriangle, CheckCircle, BookOpen, Building, Ship, Car, Zap, FileText, Lightbulb, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Link } from 'react-router-dom';
import BS7671EmbeddedQuiz from '@/components/upskilling/BS7671EmbeddedQuiz';

const BS7671Module1Section2 = () => {
  const quizQuestions = [
    {
      id: 1,
      question: "Which of the following is covered under BS 7671?",
      options: [
        "Passenger aircraft",
        "Domestic properties",
        "Trains",
        "Lift control panels"
      ],
      correct: 1,
      explanation: "Domestic properties are fully covered by BS 7671. Aircraft, trains, and lift systems have their own specific standards."
    },
    {
      id: 2,
      question: "Which type of installation is NOT within the scope of BS 7671?",
      options: [
        "Commercial offices",
        "Marina pontoons",
        "Lift systems",
        "Agricultural buildings"
      ],
      correct: 2,
      explanation: "Lift systems are governed by specific lift regulations (BS EN 81 series), not BS 7671."
    },
    {
      id: 3,
      question: "What should be used when BS 7671 doesn't apply?",
      options: [
        "Ignore the regulations",
        "Use manufacturer's instructions",
        "Refer to appropriate alternative standards",
        "Follow local authority advice only"
      ],
      correct: 2,
      explanation: "When BS 7671 doesn't apply, you must refer to the appropriate alternative standards specific to that application."
    },
    {
      id: 4,
      question: "Does BS 7671 apply to mines and quarries?",
      options: [
        "Yes, always",
        "Only for lighting",
        "No",
        "Only with special permission"
      ],
      correct: 2,
      explanation: "Mines and quarries have specific legislation and standards (Mining Regulations) that override BS 7671."
    },
    {
      id: 5,
      question: "Which standard might work alongside BS 7671 for machinery installations?",
      options: [
        "BS EN 60204",
        "BS 7671 Part 7",
        "IET CoP",
        "EAWR"
      ],
      correct: 0,
      explanation: "BS EN 60204 is the specific standard for electrical equipment of machines and works alongside BS 7671."
    }
  ];


  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div>
        <Link to="../bs7671-module-1">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 1
          </Button>
        </Link>
        
        <div className="space-y-4 sm:space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <MapPin className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-white">
                  Scope and Application of the Regulations
                </h1>
                <p className="text-lg sm:text-xl text-white">
                  Understanding where BS 7671 applies and its limitations
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 1.2
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
                <BookOpen className="h-6 w-6 text-yellow-400" />
                Introduction
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p className="text-base leading-relaxed">
                BS 7671 doesn't apply to everything — and knowing what's in and what's out of scope is critical to staying compliant. This section defines the boundaries of its application and helps you understand when to look elsewhere for guidance.
              </p>
              <Alert className="bg-orange-600/10 border-orange-600/30">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-white">
                  <strong>Critical Point:</strong> Applying BS 7671 to installations outside its scope can lead to inappropriate design decisions and potential safety risks.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Learning Outcomes */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-yellow-400" />
                Learning Outcomes
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p>By the end of this section, you should be able to:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Identify where BS 7671 applies and where it doesn't
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Understand the limitations of its scope
                  </li>
                </ul>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Recognise types of installations and environments it covers
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Explain exceptions and identify appropriate alternative standards
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Where BS 7671 Applies */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Building className="h-6 w-6 text-yellow-400" />
                Where BS 7671 Applies
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <p className="text-base leading-relaxed">
                BS 7671 covers electrical installations operating at voltages up to and including 1000V AC (1500V DC) in most conventional building and infrastructure environments.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-white font-semibold text-lg mb-4">Domestic Installations</h4>
                  <div className="bg-green-600/10 p-4 rounded-lg border border-green-600/30">
                    <ul className="space-y-2 text-sm">
                      <li>• Houses, flats, and apartments</li>
                      <li>• Garages and outbuildings</li>
                      <li>• Gardens and outdoor areas</li>
                      <li>• Home workshops and studios</li>
                      <li>• Shared services in blocks of flats</li>
                      <li>• Holiday homes and second properties</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-semibold text-lg mb-4">Commercial & Industrial</h4>
                  <div className="bg-yellow-400/10 p-4 rounded-lg border border-blue-600/30">
                    <ul className="space-y-2 text-sm">
                      <li>• Offices, shops, and retail spaces</li>
                      <li>• Factories and manufacturing facilities</li>
                      <li>• Warehouses and distribution centres</li>
                      <li>• Schools, colleges, and universities</li>
                      <li>• Hospitals and healthcare facilities</li>
                      <li>• Hotels and hospitality venues</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-semibold text-lg mb-4">Specialised Buildings</h4>
                  <div className="bg-purple-600/10 p-4 rounded-lg border border-purple-600/30">
                    <ul className="space-y-2 text-sm">
                      <li>• Churches and places of worship</li>
                      <li>• Sports facilities and gymnasiums</li>
                      <li>• Theatres and entertainment venues</li>
                      <li>• Museums and galleries</li>
                      <li>• Community centres and halls</li>
                      <li>• Car parks and parking structures</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-semibold text-lg mb-4">Special Locations (Part 7)</h4>
                  <div className="bg-orange-600/10 p-4 rounded-lg border border-orange-600/30">
                    <ul className="space-y-2 text-sm">
                      <li>• Swimming pools and fountains</li>
                      <li>• Agricultural and horticultural premises</li>
                      <li>• Caravan and motor caravan sites</li>
                      <li>• Marinas and similar locations</li>
                      <li>• Construction sites</li>
                      <li>• Medical locations</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-3">Temporary Installations</h4>
                <p className="text-sm mb-2">
                  BS 7671 applies to temporary electrical installations including:
                </p>
                <ul className="text-sm space-y-1">
                  <li>• Construction site installations</li>
                  <li>• Fairgrounds and markets</li>
                  <li>• Temporary event installations</li>
                  <li>• Emergency power systems</li>
                  <li>• Temporary buildings and structures</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Outside Scope */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <ExternalLink className="h-6 w-6 text-red-500" />
                What's Outside BS 7671 Scope
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <Alert className="bg-red-600/10 border-red-600/30">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-white">
                  <strong>Important:</strong> Using BS 7671 for installations outside its scope can lead to inappropriate design and potential safety issues.
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-white font-semibold text-lg mb-4">Distribution Networks</h4>
                  <div className="bg-red-600/10 p-4 rounded-lg border border-red-600/30">
                    <ul className="space-y-2 text-sm">
                      <li>• National Grid transmission systems</li>
                      <li>• Distribution network operator (DNO) equipment</li>
                      <li>• High voltage transmission lines</li>
                      <li>• Substations under utility control</li>
                      <li>• Street lighting columns (DNO owned)</li>
                    </ul>
                    <p className="text-xs mt-2 italic">
                      <strong>Alternative Standards:</strong> Electricity Supply Regulations, Engineering Recommendations
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-semibold text-lg mb-4">Transport Applications</h4>
                  <div className="bg-red-600/10 p-4 rounded-lg border border-red-600/30">
                    <ul className="space-y-2 text-sm">
                      <li>• Aircraft electrical systems</li>
                      <li>• Ships and boats (hull wiring)</li>
                      <li>• Road vehicles and HGVs</li>
                      <li>• Railway traction systems</li>
                      <li>• Mobile cranes and plant</li>
                    </ul>
                    <p className="text-xs mt-2 italic">
                      <strong>Alternative Standards:</strong> BS EN 60204, Marine standards, Vehicle regulations
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-semibold text-lg mb-4">Specialist Systems</h4>
                  <div className="bg-red-600/10 p-4 rounded-lg border border-red-600/30">
                    <ul className="space-y-2 text-sm">
                      <li>• Lift installations and control systems</li>
                      <li>• Mine and quarry electrical systems</li>
                      <li>• Explosive atmosphere installations</li>
                      <li>• High frequency equipment</li>
                      <li>• Radio and telecommunications equipment</li>
                    </ul>
                    <p className="text-xs mt-2 italic">
                      <strong>Alternative Standards:</strong> BS EN 81 (lifts), Mining Regulations, ATEX Directive
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-semibold text-lg mb-4">Appliances & Equipment</h4>
                  <div className="bg-red-600/10 p-4 rounded-lg border border-red-600/30">
                    <ul className="space-y-2 text-sm">
                      <li>• Internal wiring of appliances</li>
                      <li>• Manufactured equipment internals</li>
                      <li>• Electronic equipment circuits</li>
                      <li>• Automotive electrical systems</li>
                      <li>• Audio/visual equipment internals</li>
                    </ul>
                    <p className="text-xs mt-2 italic">
                      <strong>Alternative Standards:</strong> Product-specific safety standards
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-3">Voltage Limitations</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-white font-semibold text-sm">BS 7671 Applies To:</p>
                    <ul className="text-sm space-y-1">
                      <li>• AC installations: up to 1000V</li>
                      <li>• DC installations: up to 1500V</li>
                      <li>• Most building electrical systems</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">Higher Voltages Require:</p>
                    <ul className="text-sm space-y-1">
                      <li>• High voltage regulations</li>
                      <li>• Specialist HV standards</li>
                      <li>• Additional competency requirements</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Overlap with Other Standards */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="h-6 w-6 text-yellow-400" />
                Overlap with Other Standards
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <p className="text-base leading-relaxed">
                In specialist areas, BS 7671 may defer to or work alongside other standards. Understanding these relationships is crucial for complex installations.
              </p>

              <div className="space-y-4">
                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <div className="flex items-start gap-3">
                    <FileText className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h5 className="text-white font-semibold">BS 7430 - Code of Practice for Protective Earthing</h5>
                      <p className="text-sm mt-1">
                        Provides detailed guidance on earthing systems, earth electrode design, and soil resistivity measurements.
                      </p>
                       <p className="text-xs text-white mt-2">
                         <strong>When used:</strong> Complex earthing systems, TT installations, earth electrode design
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <div className="flex items-start gap-3">
                    <Car className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h5 className="text-white font-semibold">BS EN 60204 - Safety of Machinery - Electrical Equipment</h5>
                      <p className="text-sm mt-1">
                        Covers electrical equipment of machines including control circuits, motor control, and safety systems.
                      </p>
                       <p className="text-xs text-white mt-2">
                         <strong>When used:</strong> Industrial machinery, production lines, automated equipment
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <div className="flex items-start gap-3">
                    <Ship className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h5 className="text-white font-semibold">IEC 60364 Series - International Standards</h5>
                      <p className="text-sm mt-1">
                        International standards on which BS 7671 is based. Used for international projects and installations.
                      </p>
                       <p className="text-xs text-white mt-2">
                         <strong>When used:</strong> International projects, export installations, harmonisation
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h5 className="text-white font-semibold">ATEX Directive - Explosive Atmospheres</h5>
                      <p className="text-sm mt-1">
                        Governs electrical equipment in potentially explosive atmospheres including gas and dust environments.
                      </p>
                       <p className="text-xs text-white mt-2">
                         <strong>When used:</strong> Chemical plants, grain stores, paint shops, fuel storage
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-yellow-400/10 p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">Working Together</h4>
                  <ul className="text-sm space-y-1">
                    <li>• BS 7671 provides the base requirements</li>
                    <li>• Specialist standards add specific requirements</li>
                    <li>• Most restrictive requirement takes precedence</li>
                    <li>• Both may need to be satisfied</li>
                  </ul>
                </div>
                
                <div className="bg-green-600/10 p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">Professional Approach</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Identify all applicable standards</li>
                    <li>• Understand hierarchy and precedence</li>
                    <li>• Document standards used in design</li>
                    <li>• Seek specialist advice when needed</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Real World Scenario */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-orange-500" />
                Real World Scenarios
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="space-y-4">
                <div className="bg-orange-600/10 p-4 rounded-lg border border-orange-600/30">
                  <h4 className="text-white font-semibold mb-3">Scenario 1: The Food Truck Mistake</h4>
                  <div className="space-y-3">
                    <p className="text-sm">
                      <strong>Situation:</strong> An electrician is asked to wire a new food truck. Without checking scope, they apply BS 7671 methods including standard socket outlet arrangements and consumer unit installation.
                    </p>
                    
                    <p className="text-sm">
                      <strong>Problem:</strong> During a safety inspection by the local authority, the installation fails. Mobile installations like vehicles are not covered under BS 7671 and require different standards and approaches.
                    </p>
                    
                    <p className="text-sm">
                      <strong>Correct Approach:</strong> Should have used automotive electrical standards, considered vehicle-specific requirements like vibration resistance, and used appropriate vehicle-rated components.
                    </p>
                    
                    <p className="text-sm">
                      <strong>Outcome:</strong> Complete rewire required using correct standards, delayed opening, and loss of customer confidence.
                    </p>
                  </div>
                </div>

                <div className="bg-red-600/10 p-4 rounded-lg border border-red-600/30">
                  <h4 className="text-white font-semibold mb-3">Scenario 2: Marina Electrical Connection</h4>
                  <div className="space-y-3">
                    <p className="text-sm">
                      <strong>Situation:</strong> A contractor is asked to install electrical connections for boats at a new marina. They install standard 16A socket outlets using normal domestic wiring methods.
                    </p>
                    
                    <p className="text-sm">
                      <strong>Issue:</strong> While marinas are covered by BS 7671 (Section 709), boat electrical systems themselves are not. The connection point between shore supply and boat requires careful consideration of both standards.
                    </p>
                    
                    <p className="text-sm">
                      <strong>Lesson:</strong> Understanding scope boundaries prevents inappropriate application of standards and ensures proper safety considerations.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Decision Framework */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-green-500" />
                Decision Framework: Does BS 7671 Apply?
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-3">Step-by-Step Assessment</h4>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li><strong>Check voltage range:</strong> Is it within 1000V AC / 1500V DC?</li>
                  <li><strong>Identify installation type:</strong> Building, vehicle, appliance, or network?</li>
                  <li><strong>Consider location:</strong> Fixed building installation or mobile application?</li>
                  <li><strong>Review ownership:</strong> Who owns and controls the installation?</li>
                  <li><strong>Check for special regulations:</strong> Are there sector-specific requirements?</li>
                  <li><strong>Identify applicable standards:</strong> What other standards might apply?</li>
                </ol>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-600/10 p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">BS 7671 Applies When:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Fixed building installations</li>
                    <li>• Within voltage limits</li>
                    <li>• No specific sector standards</li>
                    <li>• Standard occupancy types</li>
                  </ul>
                </div>
                
                <div className="bg-red-600/10 p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">Look Elsewhere When:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Mobile/vehicle applications</li>
                    <li>• Specialist environments</li>
                    <li>• Sector-specific regulations exist</li>
                    <li>• Equipment internal wiring</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-green-500" />
                Section Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p className="text-base leading-relaxed">
                BS 7671 applies to most everyday installation work but not everything. Always check if your environment is covered — and refer to the right standards where it's not. Understanding scope boundaries is essential for competent electrical work.
              </p>
              
              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-3">Key Takeaways</h4>
                <ul className="space-y-2 text-sm">
                  <li>• BS 7671 covers most fixed building electrical installations up to 1000V AC</li>
                  <li>• Transport applications (vehicles, aircraft, ships) have their own standards</li>
                  <li>• Specialist environments may require additional or alternative standards</li>
                  <li>• When in doubt, research applicable standards before starting work</li>
                  <li>• Professional competence includes knowing when BS 7671 doesn't apply</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-yellow-400" />
                Knowledge Check Quiz
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <BS7671EmbeddedQuiz 
                questions={quizQuestions}
                description="Test your understanding of BS 7671 scope and application with these questions."
              />
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row gap-3 sm:justify-between">
            <Link to="../bs7671-module-1-section-1" className="w-full sm:w-auto">
              <Button variant="outline" className="border-gray-600 text-white hover:bg-card w-full sm:w-auto">
                <ArrowLeft className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Previous Section</span>
                <span className="sm:hidden">Previous</span>
              </Button>
            </Link>
            <Link to="../bs7671-module-1-section-3" className="w-full sm:w-auto">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-600 w-full sm:w-auto">
                <span className="hidden sm:inline">Next Section: Structure of BS 7671</span>
                <span className="sm:hidden">Next: Structure</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BS7671Module1Section2;