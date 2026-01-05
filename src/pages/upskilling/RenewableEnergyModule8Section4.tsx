import { ArrowLeft, ArrowRight, Shield, CheckCircle, AlertCircle, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';

const RenewableEnergyModule8Section4 = () => {
  const quizQuestions = [
    {
      id: 1,
      question: "What's one major risk of unlabelled DC cables during a fire emergency?",
      options: [
        "They may overheat more quickly",
        "Firefighters cannot identify live circuits and may receive electric shock",
        "They reduce system efficiency",
        "They void the system warranty"
      ],
      correct: 1,
      explanation: "Unlabelled DC cables prevent firefighters from identifying live circuits, creating serious shock and electrocution hazards during emergency response when water may be present."
    },
    {
      id: 2,
      question: "Where should DC isolators be located according to fire safety guidelines?",
      options: [
        "Only at the inverter location",
        "Accessible to firefighters, away from main escape routes, clearly labelled",
        "Hidden to prevent tampering",
        "Inside the roof space only"
      ],
      correct: 1,
      explanation: "DC isolators should be accessible to emergency responders, positioned away from main escape routes, and clearly labelled to enable safe system shutdown during emergencies."
    },
    {
      id: 3,
      question: "What does the IET Code of Practice for Solar PV recommend for fire safety?",
      options: [
        "Only basic electrical safety requirements",
        "Comprehensive guidance on DC isolation, labelling, and firefighter access",
        "Installation techniques only",
        "Equipment selection criteria"
      ],
      correct: 1,
      explanation: "The IET Code of Practice provides comprehensive guidance covering DC isolation requirements, proper labelling standards, firefighter access considerations, and emergency response procedures."
    },
    {
      id: 4,
      question: "What is BS 7671 in relation to solar PV installations?",
      options: [
        "A type of solar panel specification",
        "The UK electrical installation safety standard (18th Edition Wiring Regulations)",
        "A building regulations document",
        "An insurance requirement document"
      ],
      correct: 1,
      explanation: "BS 7671 is the UK standard for electrical installations (18th Edition Wiring Regulations), which includes specific requirements for solar PV systems, DC circuits, and safety measures."
    },
    {
      id: 5,
      question: "Who benefits most from proper labelling and isolation procedures?",
      options: [
        "Only the system owner",
        "Emergency responders, maintenance personnel, and property occupants",
        "Only the installation company",
        "Only insurance companies"
      ],
      correct: 1,
      explanation: "Proper labelling and isolation benefit emergency responders (safe firefighting), maintenance personnel (safe servicing), and property occupants (emergency awareness and protection)."
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
              <Flame className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-4xl font-bold text-white">
                  Fire Safety, AC/DC Isolation & Labelling Standards
                </h1>
                <p className="text-xl text-gray-400">
                  Protecting property and first responders through proper safety measures
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 8
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                Section 4
              </Badge>
            </div>
          </div>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Introduction</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <p>
                Proper isolation and labelling is essential for protecting property and first responders 
                in case of fire. Understanding fire safety concerns specific to PV systems ensures 
                compliance with safety standards and reduces liability risks.
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
                <span>Understand fire safety concerns specific to PV systems</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                <span>Apply correct labelling conventions for safety and compliance</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                <span>Follow proper isolation protocols for AC and DC circuits</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Fire Safety Risks in PV Systems</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="bg-red-600/10 border border-red-600/20 rounded-md p-4">
                <h4 className="text-red-400 font-semibold mb-2">Critical Fire Hazards:</h4>
                <p className="text-sm">
                  PV systems introduce unique fire risks due to DC arcing, high voltage cables, 
                  and the inability to fully de-energise during daylight hours.
                </p>
              </div>
              
              <div className="space-y-8">
                <div>
                  <h4 className="font-semibold text-red-400 mb-4">DC Arc Fault Risks:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                    <div>
                      <h5 className="text-white font-medium mb-3">Arc Characteristics:</h5>
                      <ul className="text-gray-300 space-y-1 ml-4">
                        <li>• <strong>Temperature:</strong> Can exceed 20,000°C at arc point</li>
                        <li>• <strong>Duration:</strong> No natural zero crossing - burns continuously</li>
                        <li>• <strong>Energy:</strong> Sustained by DC voltage even at low currents</li>
                        <li>• <strong>Ignition risk:</strong> Can ignite surrounding materials instantly</li>
                        <li>• <strong>Toxic gases:</strong> Copper and plastic vapours released</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-3">Common Arc Initiation Points:</h5>
                      <ul className="text-gray-300 space-y-1 ml-4">
                        <li>• Loose MC4 connector connections</li>
                        <li>• Damaged cable insulation from UV/weather</li>
                        <li>• Poor crimped connections in combiner boxes</li>
                        <li>• Water ingress into junction boxes</li>
                        <li>• Rodent damage to cable sheaths</li>
                        <li>• Mechanical stress at cable entry points</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-600 pt-8">
                  <h4 className="font-semibold text-orange-400 mb-4">High Voltage Cable Hazards:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                    <div>
                      <h5 className="text-white font-medium mb-3">Electrical Hazards:</h5>
                      <ul className="text-gray-300 space-y-1 ml-4">
                        <li>• <strong>Shock risk:</strong> Up to 1000V DC during daylight</li>
                        <li>• <strong>Water conductivity:</strong> Wet conditions increase hazard</li>
                        <li>• <strong>Current pathway:</strong> Through firefighter's body to earth</li>
                        <li>• <strong>PPE limitations:</strong> Standard gear may be inadequate</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-3">Operational Challenges:</h5>
                      <ul className="text-gray-300 space-y-1 ml-4">
                        <li>• <strong>Always live:</strong> Cannot isolate DC during daylight</li>
                        <li>• <strong>Hidden cables:</strong> Routes not obvious to responders</li>
                        <li>• <strong>Multiple sources:</strong> Various isolation points</li>
                        <li>• <strong>Time pressure:</strong> Emergency response constraints</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-600 pt-8">
                  <h4 className="font-semibold text-yellow-400 mb-4">Fire Suppression Complications:</h4>
                  <div className="space-y-6 text-sm">
                    <div>
                      <h5 className="text-white font-medium mb-3">Water vs. Electrical Safety:</h5>
                      <ul className="text-gray-300 space-y-1 ml-4">
                        <li>• Water becomes conductive when mixed with salts and debris</li>
                        <li>• Spray patterns can create electrical pathway to firefighters</li>
                        <li>• Foam effectiveness reduced on electrical fires</li>
                        <li>• Steam generation can spread contamination</li>
                        <li>• Equipment damage from water ingress</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-3">Tactical Considerations:</h5>
                      <ul className="text-gray-300 space-y-1 ml-4">
                        <li>• Minimum safe approach distances (3m for fog spray)</li>
                        <li>• Defensive vs. offensive firefighting strategies</li>
                        <li>• Coordinated isolation before suppression</li>
                        <li>• Specialist electrical firefighting equipment</li>
                        <li>• Post-fire safety assessment procedures</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">AC and DC Isolation Requirements</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>Proper isolation design enables safe emergency response and maintenance access:</p>
              
              <div className="space-y-6">
                <div className="bg-blue-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="font-semibold text-yellow-400 mb-3">DC Isolation Strategy:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h5 className="text-white font-medium mb-2">Isolator Placement Requirements:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• <strong>Accessible location:</strong> Ground level or easily reached</li>
                        <li>• <strong>Clear of escape routes:</strong> Not blocking emergency exits</li>
                        <li>• <strong>Weather protection:</strong> Suitable IP rating for location</li>
                        <li>• <strong>Secure mounting:</strong> Vandal-resistant installation</li>
                        <li>• <strong>Emergency access:</strong> No keys or tools required</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-2">Multi-Point Isolation:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• <strong>Array isolator:</strong> Near PV array (roof access)</li>
                        <li>• <strong>Inverter isolator:</strong> Adjacent to inverter</li>
                        <li>• <strong>String isolators:</strong> At combiner box (if fitted)</li>
                        <li>• <strong>Emergency isolator:</strong> External readily accessible</li>
                        <li>• <strong>Battery isolator:</strong> For storage systems</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="font-semibold text-green-400 mb-3">AC Isolation and Protection:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h5 className="text-white font-medium mb-2">AC Isolator Requirements:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• <strong>Inverter AC isolator:</strong> Within 2m of inverter</li>
                        <li>• <strong>Generation meter isolator:</strong> Before export meter</li>
                        <li>• <strong>Main switch isolation:</strong> At consumer unit</li>
                        <li>• <strong>Lockable isolators:</strong> Maintenance safety</li>
                        <li>• <strong>Emergency stop:</strong> Where required by risk assessment</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-2">Protection Coordination:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• <strong>RCD protection:</strong> 30mA for personnel protection</li>
                        <li>• <strong>Overcurrent protection:</strong> MCB or fuse coordination</li>
                        <li>• <strong>Surge protection:</strong> Type 1 and Type 2 SPDs</li>
                        <li>• <strong>Arc fault protection:</strong> AFCI where specified</li>
                        <li>• <strong>Earth fault monitoring:</strong> For TT systems</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="font-semibold text-purple-400 mb-3">Emergency Isolation Procedures:</h4>
                  <div className="space-y-3 text-sm">
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <h5 className="text-white font-medium mb-2">Fire Service Protocol:</h5>
                      <ol className="text-gray-300 space-y-1 list-decimal list-inside">
                        <li>Identify and operate main AC isolator at consumer unit</li>
                        <li>Locate and operate inverter AC isolator</li>
                        <li>Find and operate DC isolator(s) following labels</li>
                        <li>Confirm isolation using approved testing device</li>
                        <li>Establish minimum safe working distances</li>
                        <li>Proceed with suppression using appropriate techniques</li>
                      </ol>
                    </div>
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <h5 className="text-white font-medium mb-2">Maintenance Isolation:</h5>
                      <ol className="text-gray-300 space-y-1 list-decimal list-inside">
                        <li>Apply lockout/tagout (LOTO) procedures</li>
                        <li>Isolate all AC sources and lock off</li>
                        <li>Isolate all DC sources and lock off</li>
                        <li>Wait for capacitor discharge (5 minutes minimum)</li>
                        <li>Test for dead condition on all circuits</li>
                        <li>Apply short circuit earthing where appropriate</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Labelling Standards and Requirements</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="bg-yellow-600/10 border border-yellow-600/20 rounded-md p-4">
                <h4 className="text-yellow-400 font-semibold mb-2">Labelling Saves Lives:</h4>
                <p className="text-sm">
                  Comprehensive and standardised labelling enables quick identification of hazards 
                  and isolation points during emergencies, maintenance, and inspections.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
                  <h4 className="font-semibold text-red-400 mb-3">Danger and Warning Labels:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h5 className="text-white font-medium mb-2">Essential Danger Labels:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• <strong>"DANGER - DUAL SUPPLY"</strong> at inverter location</li>
                        <li>• <strong>"PHOTOVOLTAIC DC CABLES"</strong> along cable routes</li>
                        <li>• <strong>"DC ISOLATOR"</strong> at each DC switching point</li>
                        <li>• <strong>"ELECTRICAL HAZARD"</strong> on equipment enclosures</li>
                        <li>• <strong>Voltage level warnings</strong> (e.g., "600V DC")</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-2">Label Specifications:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• <strong>Material:</strong> UV-resistant laminated vinyl</li>
                        <li>• <strong>Colours:</strong> Yellow background, black text</li>
                        <li>• <strong>Size:</strong> Minimum 25mm x 75mm for warning labels</li>
                        <li>• <strong>Text:</strong> Minimum 4.5mm height, sans-serif font</li>
                        <li>• <strong>Symbols:</strong> Standard BS EN 60417 symbols</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="font-semibold text-yellow-400 mb-3">Circuit Identification and Isolation Labels:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h5 className="text-white font-medium mb-2">Circuit Identification:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• <strong>String numbers:</strong> "PV STRING 1", "PV STRING 2", etc.</li>
                        <li>• <strong>Polarity marking:</strong> "DC+" and "DC-" on conductors</li>
                        <li>• <strong>Voltage levels:</strong> Maximum Voc clearly marked</li>
                        <li>• <strong>Current ratings:</strong> Maximum Isc for each string</li>
                        <li>• <strong>Earth designation:</strong> Protective conductor marking</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-2">Isolator Identification:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• <strong>Function labels:</strong> "PV ARRAY ISOLATOR"</li>
                        <li>• <strong>Position indication:</strong> "ON" and "OFF" clearly marked</li>
                        <li>• <strong>Emergency access:</strong> "EMERGENCY PV SHUTDOWN"</li>
                        <li>• <strong>Multi-pole indication:</strong> All poles clearly identified</li>
                        <li>• <strong>Lockout capability:</strong> LOTO provision labelled</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="font-semibold text-green-400 mb-3">MCS and Compliance Labels:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <h5 className="text-white font-medium">Installation Information:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• MCS certificate number</li>
                        <li>• Installation date</li>
                        <li>• Installer company details</li>
                        <li>• System capacity and voltage</li>
                        <li>• Emergency contact information</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium">Equipment Data:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• Module manufacturer and model</li>
                        <li>• Inverter specifications</li>
                        <li>• String configuration details</li>
                        <li>• Protection device ratings</li>
                        <li>• Earth electrode resistance</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium">Maintenance Schedule:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• Next inspection due date</li>
                        <li>• Maintenance contact details</li>
                        <li>• Service history reference</li>
                        <li>• Warranty expiry dates</li>
                        <li>• Performance monitoring access</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Firefighter Access and Guidance</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="space-y-6">
                <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
                  <h4 className="font-semibold text-orange-400 mb-3">Firefighter Access Zones:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h5 className="text-white font-medium mb-2">Roof Access Requirements:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• <strong>Access paths:</strong> 800mm minimum width around arrays</li>
                        <li>• <strong>Ridge access:</strong> 800mm strip along ridge line</li>
                        <li>• <strong>Eaves access:</strong> 800mm from roof edge</li>
                        <li>• <strong>Ventilation clearance:</strong> Around roof penetrations</li>
                        <li>• <strong>Equipment access:</strong> Clear path to isolators</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-2">Ground Level Access:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• <strong>Inverter access:</strong> 1m clearance around equipment</li>
                        <li>• <strong>Meter access:</strong> Clear path to electrical supplies</li>
                        <li>• <strong>Isolator access:</strong> No obstructions or locked gates</li>
                        <li>• <strong>Vehicle access:</strong> Fire appliance positioning</li>
                        <li>• <strong>Ladder access:</strong> Safe route to roof level</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="font-semibold text-purple-400 mb-3">Emergency Response Guidance:</h4>
                  <div className="space-y-3 text-sm">
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <h5 className="text-white font-medium mb-2">Site Information Board:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• Location map showing PV array areas and cable routes</li>
                        <li>• Isolation procedure with step-by-step instructions</li>
                        <li>• Emergency contact numbers for installer and DNO</li>
                        <li>• System specifications including voltage and capacity</li>
                        <li>• Special hazards and precautions specific to the site</li>
                      </ul>
                    </div>
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <h5 className="text-white font-medium mb-2">Tactical Firefighting Guidance:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• Minimum approach distances for different suppression methods</li>
                        <li>• Preferred firefighting techniques (defensive vs. offensive)</li>
                        <li>• PPE requirements specific to electrical hazards</li>
                        <li>• Coordination requirements with electrical utility companies</li>
                        <li>• Post-incident safety assessment procedures</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">IET Code of Practice and BS 7671 Requirements</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-blue-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="font-semibold text-yellow-400 mb-3">IET Code of Practice for Solar PV:</h4>
                  <div className="space-y-3 text-sm">
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <h5 className="text-white font-medium mb-2">Key Recommendations:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• DC isolation within 2m of inverter input terminals</li>
                        <li>• Emergency isolation accessible to fire service</li>
                        <li>• Comprehensive labelling throughout the installation</li>
                        <li>• Arc fault circuit interruption where specified</li>
                        <li>• Regular maintenance and inspection schedules</li>
                      </ul>
                    </div>
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <h5 className="text-white font-medium mb-2">Fire Safety Specific Guidance:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• Firefighter access zone requirements</li>
                        <li>• Cable routing and support considerations</li>
                        <li>• Equipment spacing and ventilation</li>
                        <li>• Building integration fire performance</li>
                        <li>• Emergency response coordination</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="font-semibold text-green-400 mb-3">BS 7671 (18th Edition) Requirements:</h4>
                  <div className="space-y-3 text-sm">
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <h5 className="text-white font-medium mb-2">Section 712 - Solar PV Systems:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• DC circuit design and protection requirements</li>
                        <li>• Isolation and switching device specifications</li>
                        <li>• Earthing and protective conductor arrangements</li>
                        <li>• Cable selection and installation methods</li>
                        <li>• Testing and inspection procedures</li>
                      </ul>
                    </div>
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <h5 className="text-white font-medium mb-2">General Safety Requirements:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• Protection against electric shock</li>
                        <li>• Protection against thermal effects</li>
                        <li>• Protection against overcurrent</li>
                        <li>• Protection against voltage disturbances</li>
                        <li>• Safety services and emergency supplies</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Advanced Safety Systems and Technologies</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="space-y-6">
                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="font-semibold text-purple-400 mb-3">Arc Fault Circuit Interrupters (AFCI):</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h5 className="text-white font-medium mb-2">AFCI Functionality:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• <strong>Arc detection:</strong> Identifies series and parallel arc faults</li>
                        <li>• <strong>Response time:</strong> Interrupts circuits within 0.5 seconds</li>
                        <li>• <strong>False trip immunity:</strong> Distinguishes normal from fault arcs</li>
                        <li>• <strong>Self-monitoring:</strong> Continuous system health checks</li>
                        <li>• <strong>Reset capability:</strong> Manual or automatic after fault clearance</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-2">Installation Requirements:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• <strong>DC circuit protection:</strong> String-level or combiner box</li>
                        <li>• <strong>Compatibility:</strong> Must match inverter and system voltage</li>
                        <li>• <strong>Environmental rating:</strong> IP65 minimum for outdoor use</li>
                        <li>• <strong>Testing protocols:</strong> Monthly functional testing required</li>
                        <li>• <strong>Documentation:</strong> Test results in system records</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="font-semibold text-yellow-400 mb-3">Rapid Shutdown Systems (RSD):</h4>
                  <div className="space-y-3 text-sm">
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <h5 className="text-white font-medium mb-2">RSD Operation and Benefits:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• Automatic voltage reduction to under 30V within 30 seconds</li>
                        <li>• Triggered by AC grid loss or manual activation</li>
                        <li>• Module-level power electronics (MLPE) integration</li>
                        <li>• Enhanced firefighter safety during emergency response</li>
                        <li>• Reduced arc fault risk during grid disturbances</li>
                      </ul>
                    </div>
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <h5 className="text-white font-medium mb-2">Implementation Options:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• <strong>Power optimisers:</strong> Individual module control and monitoring</li>
                        <li>• <strong>Microinverters:</strong> AC output eliminates DC cabling risks</li>
                        <li>• <strong>String inverters:</strong> With rapid shutdown transmitters/receivers</li>
                        <li>• <strong>Smart junction boxes:</strong> Retrofit solutions for existing systems</li>
                        <li>• <strong>Gateway systems:</strong> Centralized control and communication</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="font-semibold text-green-400 mb-3">Monitoring and Detection Systems:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h5 className="text-white font-medium mb-2">Performance Monitoring:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• <strong>String-level monitoring:</strong> Individual string performance</li>
                        <li>• <strong>Module-level monitoring:</strong> Individual panel performance</li>
                        <li>• <strong>Environmental monitoring:</strong> Temperature and irradiance</li>
                        <li>• <strong>Fault detection:</strong> Automated anomaly identification</li>
                        <li>• <strong>Alert systems:</strong> Email/SMS notifications for issues</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-2">Safety Monitoring:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• <strong>Ground fault monitoring:</strong> Insulation resistance tracking</li>
                        <li>• <strong>Arc fault monitoring:</strong> Continuous spectrum analysis</li>
                        <li>• <strong>Temperature monitoring:</strong> Hotspot detection and tracking</li>
                        <li>• <strong>Isolation monitoring:</strong> Confirming proper disconnection</li>
                        <li>• <strong>Communication monitoring:</strong> System health status</li>
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
                  <strong>Case Study:</strong> A fire crew couldn't safely disconnect a roof system due to 
                  unlabelled DC isolators. They had to use defensive tactics only, allowing £200,000+ damage 
                  that could have been prevented with proper isolation and access.
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
                Correct labels and isolation save lives and reduce fire-related claims and liability. 
                Following IET and BS 7671 guidelines ensures emergency responders can work safely 
                and effectively during critical situations.
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
              <SingleQuestionQuiz questions={quizQuestions} title="Fire Safety Quiz" />
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Link to="../renewable-energy-module-8-section-3">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../renewable-energy-module-8-section-5">
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

export default RenewableEnergyModule8Section4;