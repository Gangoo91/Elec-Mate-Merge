import { ArrowLeft, ArrowRight, Shield, CheckCircle, AlertTriangle, Target, Lightbulb, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import BS7671EmbeddedQuiz from '@/components/upskilling/BS7671EmbeddedQuiz';

const BS7671Module5Section5 = () => {

  const quizQuestions = [
    {
      id: 1,
      question: "What does the second digit in an IP rating refer to?",
      options: [
        "Protection against solid objects",
        "Protection against liquids",
        "Temperature resistance",
        "Mechanical strength"
      ],
      correct: 1,
      explanation: "The second digit in an IP rating specifically refers to protection against liquids, ranging from IPX0 (no protection) to IPX9 (protection against high-pressure jets)."
    },
    {
      id: 2,
      question: "What's the minimum IP rating for most bathroom fixtures?",
      options: [
        "IP20",
        "IP33",
        "IP44",
        "IP65"
      ],
      correct: 2,
      explanation: "IP44 is the minimum rating for most bathroom fixtures, providing protection against solid objects >1mm and splashing water from any direction."
    },
    {
      id: 3,
      question: "What is LSZH cable designed to do during a fire?",
      options: [
        "Prevent fire spread completely",
        "Maintain circuit integrity for longer",
        "Emit low smoke and zero halogen gases",
        "Provide better electrical insulation"
      ],
      correct: 2,
      explanation: "LSZH (Low Smoke Zero Halogen) cables are designed to emit minimal smoke and no halogen gases during a fire, reducing toxic fume hazards for occupants."
    },
    {
      id: 4,
      question: "When are fire-resistant cables typically required?",
      options: [
        "In all domestic installations",
        "Only in industrial settings",
        "For fire alarms and emergency lighting circuits",
        "For high-voltage applications only"
      ],
      correct: 2,
      explanation: "Fire-resistant cables are typically required for critical safety circuits such as fire alarms, emergency lighting, and smoke extraction systems that must continue operating during a fire."
    },
    {
      id: 5,
      question: "What could happen if an IP20 enclosure is installed outdoors?",
      options: [
        "Improved ventilation",
        "Water ingress causing damage and safety hazards",
        "Better heat dissipation",
        "Enhanced accessibility"
      ],
      correct: 1,
      explanation: "IP20 enclosures offer minimal protection and would allow water ingress outdoors, leading to equipment damage, corrosion, electrical faults, and potential safety hazards."
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div>
        <Link to="../bs7671-module-5">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 5
          </Button>
        </Link>
        
        <div className="space-y-4 sm:space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <Shield className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-white">
                  Environmental Protection (IP Ratings, Fire Resistance)
                </h1>
                <p className="text-white">
                  Protecting electrical equipment against environmental conditions
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 5.5
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
                Electrical equipment must be protected against environmental conditions such as dust, water, mechanical impact, and fire exposure. This section covers the importance of selecting the correct Ingress Protection (IP) rating and understanding fire resistance requirements in line with BS 7671.
              </p>
              <p className="text-base leading-relaxed">
                Proper environmental protection ensures equipment longevity, maintains safety standards, and prevents costly failures due to environmental exposure.
              </p>
            </CardContent>
          </Card>

          {/* Learning Goals */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="h-6 w-6 text-yellow-400" />
                Learning Goals
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Understand how IP ratings define protection against solids and liquids</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Identify the required protection levels for different environments</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Recognise when fire-resistant equipment is needed</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Apply BS 7671 guidance for environmental durability</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* IP Ratings Content */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="h-6 w-6 text-yellow-400" />
                Ingress Protection (IP) Ratings
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="bg-yellow-400/10 p-4 rounded-lg border border-blue-600/30">
                <h4 className="text-white font-semibold mb-3">IP Rating System</h4>
                <p className="text-sm">
                  Defined by two digits: first for solid objects, second for liquids. Each digit represents increasing levels of protection from 0 (no protection) to the highest rating for each category.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold text-lg mb-3">First Digit - Solid Objects</h4>
                  <div className="space-y-3">
                    <div className="bg-yellow-400/20 p-3 rounded border border-blue-600/40">
                      <p className="text-white font-semibold text-sm mb-2">Protection Levels:</p>
                      <ul className="text-xs space-y-1">
                        <li>• IP0X: No protection</li>
                        <li>• IP1X: &gt;50mm objects (back of hand)</li>
                        <li>• IP2X: &gt;12.5mm objects (fingers)</li>
                        <li>• IP3X: &gt;2.5mm objects (tools, wires)</li>
                        <li>• IP4X: &gt;1mm objects (small wires)</li>
                        <li>• IP5X: Dust protected (limited ingress)</li>
                        <li>• IP6X: Dust tight (no ingress)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-green-400 font-semibold text-lg mb-3">Second Digit - Liquids</h4>
                  <div className="space-y-3">
                    <div className="bg-green-600/20 p-3 rounded border border-green-600/40">
                      <p className="text-white font-semibold text-sm mb-2">Protection Levels:</p>
                      <ul className="text-xs space-y-1">
                        <li>• IPX0: No protection</li>
                        <li>• IPX1: Dripping water (vertical)</li>
                        <li>• IPX2: Dripping water (15° tilt)</li>
                        <li>• IPX3: Spraying water (60° from vertical)</li>
                        <li>• IPX4: Splashing water (all directions)</li>
                        <li>• IPX5: Water jets (6.3mm nozzle)</li>
                        <li>• IPX6: Powerful water jets (12.5mm nozzle)</li>
                        <li>• IPX7: Temporary immersion (1m depth)</li>
                        <li>• IPX8: Continuous immersion</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-3">Common IP Rating Examples</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Indoor Applications:</p>
                    <ul className="text-xs space-y-1">
                      <li>• IP20: Standard electrical equipment</li>
                      <li>• IP44: Bathroom fixtures (outside zones)</li>
                      <li>• IP54: Kitchen equipment</li>
                      <li>• IP65: Dusty environments</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Outdoor Applications:</p>
                    <ul className="text-xs space-y-1">
                      <li>• IP55: External lighting</li>
                      <li>• IP65: Weatherproof enclosures</li>
                      <li>• IP66: Wash-down areas</li>
                      <li>• IP67: Temporary immersion</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Application Environments */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="h-6 w-6 text-purple-500" />
                Application Environments
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="bg-purple-600/10 p-4 rounded-lg border border-purple-600/30">
                <h4 className="text-white font-semibold mb-3">Environment-Specific Requirements</h4>
                <p className="text-sm">
                  Different environments require specific IP ratings based on the presence of dust, moisture, chemicals, and other environmental factors that could affect electrical equipment performance and safety.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold text-lg mb-3">Bathrooms</h4>
                  <div className="space-y-3">
                    <div className="bg-yellow-400/20 p-3 rounded border border-blue-600/40">
                      <p className="text-white font-semibold text-sm mb-2">Zone Requirements:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Zone 0: IPX7 (immersion)</li>
                        <li>• Zone 1: IPX4 minimum</li>
                        <li>• Zone 2: IPX4 minimum</li>
                        <li>• Outside zones: IP44 minimum</li>
                      </ul>
                    </div>
                    <div className="bg-green-600/20 p-3 rounded border border-green-600/40">
                      <p className="text-white font-semibold text-sm mb-2">Typical Applications:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Shower lights: IP65</li>
                        <li>• Bathroom heaters: IP44</li>
                        <li>• Extractor fans: IP44</li>
                        <li>• Mirror lighting: IP44</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-orange-400 font-semibold text-lg mb-3">External Installations</h4>
                  <div className="space-y-3">
                    <div className="bg-orange-600/20 p-3 rounded border border-orange-600/40">
                      <p className="text-white font-semibold text-sm mb-2">Standard Requirements:</p>
                      <ul className="text-xs space-y-1">
                        <li>• General outdoor: IP65 minimum</li>
                        <li>• Exposed locations: IP66</li>
                        <li>• Ground level: IP67 consideration</li>
                        <li>• Coastal areas: Higher rating needed</li>
                      </ul>
                    </div>
                    <div className="bg-red-600/20 p-3 rounded border border-red-600/40">
                      <p className="text-white font-semibold text-sm mb-2">Environmental Factors:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Rain and wind exposure</li>
                        <li>• Temperature cycling</li>
                        <li>• UV radiation effects</li>
                        <li>• Salt spray (marine)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-red-400 font-semibold text-lg mb-3">Industrial Environments</h4>
                  <div className="space-y-3">
                    <div className="bg-red-600/20 p-3 rounded border border-red-600/40">
                      <p className="text-white font-semibold text-sm mb-2">High-Risk Areas:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Food processing: IP66/IP67</li>
                        <li>• Chemical plants: IP66 + corrosion</li>
                        <li>• Car washes: IP66 minimum</li>
                        <li>• Dust environments: IP6X</li>
                      </ul>
                    </div>
                    <div className="bg-yellow-600/20 p-3 rounded border border-yellow-600/40">
                      <p className="text-white font-semibold text-sm mb-2">Additional Considerations:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Chemical compatibility</li>
                        <li>• Temperature extremes</li>
                        <li>• Vibration resistance</li>
                        <li>• Easy maintenance access</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Fire Resistance */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-red-500" />
                Fire Resistance & Reaction to Fire
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="bg-red-600/10 p-4 rounded-lg border border-red-600/30">
                <h4 className="text-white font-semibold mb-3">Fire Safety Requirements</h4>
                <p className="text-sm">
                  Fire resistance and reaction to fire properties are critical for maintaining safety during fire incidents, ensuring escape routes remain viable and emergency systems continue operating.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-red-400 font-semibold text-lg mb-3">LSZH Materials</h4>
                  <div className="space-y-3">
                    <div className="bg-red-600/20 p-3 rounded border border-red-600/40">
                      <p className="text-white font-semibold text-sm mb-2">Properties:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Low Smoke emission during fire</li>
                        <li>• Zero Halogen gas production</li>
                        <li>• Reduced toxic fume hazards</li>
                        <li>• Better visibility during evacuation</li>
                        <li>• Environmentally safer disposal</li>
                      </ul>
                    </div>
                    <div className="bg-orange-600/20 p-3 rounded border border-orange-600/40">
                      <p className="text-white font-semibold text-sm mb-2">Applications:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Escape routes and stairwells</li>
                        <li>• Public buildings</li>
                        <li>• Underground installations</li>
                        <li>• High-occupancy buildings</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-orange-400 font-semibold text-lg mb-3">Fire Barriers & Containment</h4>
                  <div className="space-y-3">
                    <div className="bg-orange-600/20 p-3 rounded border border-orange-600/40">
                      <p className="text-white font-semibold text-sm mb-2">Fire Barriers:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Compartmentation maintenance</li>
                        <li>• Cable transit sealing</li>
                        <li>• Fire-rated enclosures</li>
                        <li>• Structural penetration sealing</li>
                      </ul>
                    </div>
                    <div className="bg-yellow-600/20 p-3 rounded border border-yellow-600/40">
                      <p className="text-white font-semibold text-sm mb-2">Critical Circuits:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Fire alarm systems</li>
                        <li>• Emergency lighting</li>
                        <li>• Smoke extraction systems</li>
                        <li>• Emergency voice communication</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-400/10 p-4 rounded-lg border border-blue-600/30">
                <h4 className="text-yellow-400 font-semibold mb-3">Circuit Integrity Requirements</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Standard Duration:</p>
                    <ul className="text-xs space-y-1">
                      <li>• 30 minutes: Small premises</li>
                      <li>• 60 minutes: Medium buildings</li>
                      <li>• 120 minutes: High-rise/complex</li>
                      <li>• 180 minutes: Special applications</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Cable Types:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Fire-resistant (FP)</li>
                      <li>• Enhanced fire-resistant (FRHF)</li>
                      <li>• Mineral insulated (MI)</li>
                      <li>• Fire survival cables</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Installation Methods:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Protected routes</li>
                      <li>• Fire-rated supports</li>
                      <li>• Segregation from other services</li>
                      <li>• Regular inspection points</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Thermal and Mechanical Endurance */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="h-6 w-6 text-green-500" />
                Thermal and Mechanical Endurance
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="bg-green-600/10 p-4 rounded-lg border border-green-600/30">
                <h4 className="text-white font-semibold mb-3">Durability Requirements</h4>
                <p className="text-sm">
                  Equipment must be chosen for both operational and fault conditions it may face. Factors include UV exposure, vibration, heat, chemicals, and mechanical stress throughout the equipment's design life.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-green-400 font-semibold text-lg mb-3">Environmental Factors</h4>
                  <div className="space-y-3">
                    <div className="bg-green-600/20 p-3 rounded border border-green-600/40">
                      <p className="text-white font-semibold text-sm mb-2">Temperature Effects:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Thermal cycling stress</li>
                        <li>• Material expansion/contraction</li>
                        <li>• Insulation degradation</li>
                        <li>• Contact resistance changes</li>
                      </ul>
                    </div>
                    <div className="bg-yellow-400/20 p-3 rounded border border-blue-600/40">
                      <p className="text-white font-semibold text-sm mb-2">UV and Weather:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Plastic degradation</li>
                        <li>• Colour fading</li>
                        <li>• Surface chalking</li>
                        <li>• Seal deterioration</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-orange-400 font-semibold text-lg mb-3">Mechanical Stresses</h4>
                  <div className="space-y-3">
                    <div className="bg-orange-600/20 p-3 rounded border border-orange-600/40">
                      <p className="text-white font-semibold text-sm mb-2">Vibration Sources:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Machinery operation</li>
                        <li>• Traffic and transport</li>
                        <li>• Building movement</li>
                        <li>• Equipment switching</li>
                      </ul>
                    </div>
                    <div className="bg-red-600/20 p-3 rounded border border-red-600/40">
                      <p className="text-white font-semibold text-sm mb-2">Impact Resistance:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Accidental damage</li>
                        <li>• Maintenance activities</li>
                        <li>• Vandalism protection</li>
                        <li>• Emergency situations</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-purple-600/10 p-4 rounded-lg border border-purple-600/30">
                <h4 className="text-purple-400 font-semibold mb-3">Selection Criteria</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Material Selection:</p>
                    <ul className="text-xs space-y-1">
                      <li>• UV-stable polymers for outdoor use</li>
                      <li>• Corrosion-resistant metals</li>
                      <li>• Chemical-compatible materials</li>
                      <li>• Temperature-rated components</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Design Considerations:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Adequate ventilation provision</li>
                      <li>• Flexible connections for movement</li>
                      <li>• Drainage for moisture control</li>
                      <li>• Accessible maintenance points</li>
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
                <h4 className="text-white font-semibold mb-3">Underground Car Park Lighting Control</h4>
                <p className="text-sm mb-3">
                  A lighting control panel is installed in an underground car park. Due to humidity, frequent vehicle wash-downs, and poor ventilation, the equipment must meet IP66 and corrosion resistance. Failing to meet these ratings leads to water ingress, tripping, and costly callouts.
                </p>
                <div className="bg-card p-3 rounded">
                  <p className="text-xs text-white mb-2">
                    <strong>Environment Analysis:</strong> High humidity (&gt;80%), regular pressure washing, salt exposure from road treatments, poor air circulation, and temperature variations.
                  </p>
                  <p className="text-xs text-white mb-2">
                    <strong>Solution:</strong> IP66-rated stainless steel enclosure with LSZH internal wiring, corrosion-resistant cable entries, and improved ventilation design.
                  </p>
                  <p className="text-xs text-white mb-2">
                    <strong>Implementation:</strong> Elevated mounting above wash height, internal heater to prevent condensation, and regular maintenance schedule.
                  </p>
                  <p className="text-xs text-white">
                    <strong>Outcome:</strong> Eliminated water ingress problems, reduced maintenance callouts by 90%, and improved system reliability and safety.
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
                Environmental protection is not just about durability — it's about safety, compliance, and functionality. BS 7671 provides clear guidance on choosing components that can withstand their surroundings.
              </p>
              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-3">Key Points</h4>
                <ul className="space-y-2 text-sm">
                  <li>• IP ratings define protection levels against solids (first digit) and liquids (second digit)</li>
                  <li>• Different environments require specific minimum IP ratings based on exposure risks</li>
                  <li>• LSZH materials reduce toxic fume hazards during fire incidents</li>
                  <li>• Fire-resistant cables maintain circuit integrity for safety-critical systems</li>
                  <li>• Thermal and mechanical factors must be considered for equipment longevity</li>
                  <li>• Proper environmental protection prevents failures and ensures safety compliance</li>
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
              <p className="text-white">
                Test your understanding of environmental protection and IP ratings.
              </p>
              
              <BS7671EmbeddedQuiz 
                questions={quizQuestions}
                title="Environmental Protection Quiz"
                description="Test your knowledge of IP ratings, fire resistance, and environmental protection"
              />
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Link to="../bs7671-module-5-section-4">
              <Button variant="outline" className="border-gray-600 text-white hover:bg-card">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../bs7671-module-5-section-6">
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

export default BS7671Module5Section5;