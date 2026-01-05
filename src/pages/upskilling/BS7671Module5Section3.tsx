import { ArrowLeft, ArrowRight, Shield, CheckCircle, AlertTriangle, Target, Lightbulb, Box } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import BS7671EmbeddedQuiz from '@/components/upskilling/BS7671EmbeddedQuiz';

const BS7671Module5Section3 = () => {

  const quizQuestions = [
    {
      id: 1,
      question: "What's a primary function of cable trunking in installations?",
      options: [
        "To increase cable current capacity",
        "To provide mechanical protection, organisation, and aesthetic appearance for cables",
        "To reduce installation costs only",
        "To improve cable insulation properties"
      ],
      correct: 1,
      explanation: "Cable trunking serves multiple functions: mechanical protection against damage, organised cable management, aesthetic appearance, and ease of maintenance access."
    },
    {
      id: 2,
      question: "Which material is most suitable for high-impact environments?",
      options: [
        "PVC trunking",
        "Aluminium conduit",
        "Steel trunking or conduit",
        "Plastic cable trays"
      ],
      correct: 2,
      explanation: "Steel trunking or conduit provides the highest impact resistance and mechanical protection, making it ideal for industrial environments with heavy machinery or high-impact risks."
    },
    {
      id: 3,
      question: "Why must metal containment systems be earthed?",
      options: [
        "To improve cable performance",
        "To prevent electric shock if containment becomes live due to cable fault",
        "To reduce electromagnetic interference only",
        "To comply with aesthetic requirements"
      ],
      correct: 1,
      explanation: "Metal containment must be earthed to prevent electric shock hazards if the containment becomes live due to cable insulation failure or fault conditions."
    },
    {
      id: 4,
      question: "When is fire-rated containment necessary?",
      options: [
        "In all electrical installations",
        "Only in domestic properties",
        "For safety circuits, escape routes, and fire-fighting systems where circuit integrity must be maintained during fire",
        "Only in outdoor installations"
      ],
      correct: 2,
      explanation: "Fire-rated containment is required for safety-critical circuits including fire alarms, emergency lighting, smoke control systems, and escape route lighting to maintain operation during fire conditions."
    },
    {
      id: 5,
      question: "How often should cable containment be supported?",
      options: [
        "Every 5 metres regardless of type",
        "According to manufacturer specifications and BS 7671 requirements, typically every 1-2 metres depending on containment type and load",
        "Only at corners and bends",
        "Support is not required for containment systems"
      ],
      correct: 1,
      explanation: "Support intervals depend on containment type, size, cable load, and manufacturer specifications, typically ranging from 1-2 metres to prevent sagging and maintain mechanical integrity."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        <Link to="../bs7671-module-5">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 5
          </Button>
        </Link>
        
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <Shield className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-white">
                  Containment Systems and Mechanical Protection
                </h1>
                <p className="text-white">
                  Physical protection and organisation for electrical cables
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 5.3
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-white">
                25 minutes
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
                Cables need to be physically protected against damage during installation and throughout their service life. Containment systems ensure both protection and compliance with aesthetic and safety requirements.
              </p>
              <p className="text-base leading-relaxed">
                This section covers the selection, installation, and maintenance of various containment systems to ensure long-term reliability and compliance with BS 7671 requirements.
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
            <CardContent className="text-gray-300 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Understand the role of containment systems in protecting cables</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Identify types of containment: trunking, conduit, tray, basket, ducting</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Learn how to select appropriate containment for specific environments</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Understand BS 7671 requirements on mechanical protection</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Purpose of Containment */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Box className="h-6 w-6 text-yellow-400" />
                Purpose of Containment Systems
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <div className="bg-yellow-400/10 p-4 rounded-lg border border-blue-600/30">
                <h4 className="text-white font-semibold mb-3">Multi-Purpose Protection</h4>
                <p className="text-sm">
                  Containment systems serve multiple critical functions: organisation, safety, mechanical protection, and aesthetics, while facilitating maintenance and future modifications.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-white font-semibold text-lg mb-3">Primary Functions</h4>
                  <div className="space-y-3">
                    <div className="bg-red-600/20 p-3 rounded border border-red-600/40">
                      <p className="text-red-400 font-semibold text-sm mb-2">Mechanical Protection:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Protection from impact, crushing, and abrasion</li>
                        <li>• Prevention of cable damage during installation</li>
                        <li>• Protection from environmental hazards</li>
                        <li>• Segregation of different circuit types</li>
                      </ul>
                    </div>
                    <div className="bg-green-600/20 p-3 rounded border border-green-600/40">
                      <p className="text-green-400 font-semibold text-sm mb-2">Organisation & Management:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Systematic cable routing and identification</li>
                        <li>• Easier maintenance and troubleshooting</li>
                        <li>• Simplified future cable additions</li>
                        <li>• Improved system documentation</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-white font-semibold text-lg mb-3">Secondary Benefits</h4>
                  <div className="space-y-3">
                    <div className="bg-yellow-400/20 p-3 rounded border border-blue-600/40">
                      <p className="text-yellow-400 font-semibold text-sm mb-2">Safety & Compliance:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Reduced risk of accidental contact</li>
                        <li>• Fire barrier and compartmentalisation</li>
                        <li>• Compliance with building regulations</li>
                        <li>• Enhanced electromagnetic compatibility</li>
                      </ul>
                    </div>
                    <div className="bg-purple-600/20 p-3 rounded border border-purple-600/40">
                      <p className="text-purple-400 font-semibold text-sm mb-2">Aesthetic & Practical:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Neat, professional appearance</li>
                        <li>• Reduced visual clutter</li>
                        <li>• Easier cleaning and maintenance</li>
                        <li>• Improved building aesthetics</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-600/10 p-4 rounded-lg border border-yellow-600/30">
                <h4 className="text-yellow-400 font-semibold mb-3">Selection Criteria</h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Environmental Factors:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Temperature range</li>
                      <li>• Moisture and humidity levels</li>
                      <li>• Chemical exposure</li>
                      <li>• UV radiation exposure</li>
                      <li>• Vibration and movement</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Mechanical Requirements:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Impact resistance needed</li>
                      <li>• Load bearing capacity</li>
                      <li>• Flexibility requirements</li>
                      <li>• Expansion/contraction</li>
                      <li>• Support structure availability</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Installation Considerations:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Accessibility for installation</li>
                      <li>• Future modification needs</li>
                      <li>• Maintenance access requirements</li>
                      <li>• Integration with building systems</li>
                      <li>• Cost and time constraints</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Regulatory Compliance:</p>
                    <ul className="text-xs space-y-1">
                      <li>• BS 7671 requirements</li>
                      <li>• Building regulation compliance</li>
                      <li>• Fire safety regulations</li>
                      <li>• Health and safety standards</li>
                      <li>• Environmental regulations</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Types of Containment */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="h-6 w-6 text-green-500" />
                Types of Containment Systems
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <div className="bg-green-600/10 p-4 rounded-lg border border-green-600/30">
                <h4 className="text-white font-semibold mb-3">Comprehensive Containment Solutions</h4>
                <p className="text-sm">
                  Different containment types are suited to specific applications, environments, and installation requirements. Selection depends on protection level, accessibility, and environmental conditions.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-white font-semibold text-lg mb-3">Enclosed Systems</h4>
                  <div className="space-y-3">
                    <div className="bg-yellow-400/20 p-3 rounded border border-blue-600/40">
                      <p className="text-yellow-400 font-semibold text-sm mb-2">PVC/Metal Trunking:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Rectangular enclosed channels</li>
                        <li>• Easy cable access via removable lids</li>
                        <li>• Available in various sizes and materials</li>
                        <li>• Good for surface mounting and neat appearance</li>
                        <li>• Suitable for office and commercial environments</li>
                      </ul>
                    </div>
                    <div className="bg-green-600/20 p-3 rounded border border-green-600/40">
                      <p className="text-green-400 font-semibold text-sm mb-2">Conduits (Plastic/Steel):</p>
                      <ul className="text-xs space-y-1">
                        <li>• Circular tube systems for single or multiple cables</li>
                        <li>• Flexible or rigid construction</li>
                        <li>• Excellent mechanical protection</li>
                        <li>• Steel conduit provides EMC screening</li>
                        <li>• Suitable for harsh industrial environments</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-white font-semibold text-lg mb-3">Open Systems</h4>
                  <div className="space-y-3">
                    <div className="bg-orange-600/20 p-3 rounded border border-orange-600/40">
                      <p className="text-orange-400 font-semibold text-sm mb-2">Cable Trays/Ladders:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Open mesh or ladder-type support systems</li>
                        <li>• Excellent ventilation and heat dissipation</li>
                        <li>• High load capacity for multiple cables</li>
                        <li>• Easy cable installation and maintenance</li>
                        <li>• Suitable for data centres and plant rooms</li>
                      </ul>
                    </div>
                    <div className="bg-purple-600/20 p-3 rounded border border-purple-600/40">
                      <p className="text-purple-400 font-semibold text-sm mb-2">Basket Systems:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Wire mesh construction with solid base</li>
                        <li>• Combines protection with ventilation</li>
                        <li>• Suitable for power and data cables</li>
                        <li>• Good for ceiling installations</li>
                        <li>• Often used in commercial buildings</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-3">Specialised Containment</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Floor/Underfloor Ducting:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Integrated into building structure</li>
                      <li>• Provides power and data distribution</li>
                      <li>• Accessible through removable covers</li>
                      <li>• Segregated compartments for different services</li>
                      <li>• Common in offices and commercial spaces</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Fire-Rated Systems:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Maintain circuit integrity during fire</li>
                      <li>• Special insulation and construction materials</li>
                      <li>• Required for safety-critical circuits</li>
                      <li>• Higher cost but essential for life safety</li>
                      <li>• Used for fire alarms and emergency systems</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Hazardous Area Systems:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Explosion-proof construction</li>
                      <li>• Special sealing and materials</li>
                      <li>• Certified for specific hazardous zones</li>
                      <li>• Used in petrochemical and gas environments</li>
                      <li>• Requires specialist installation techniques</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-red-600/10 p-4 rounded-lg border border-red-600/30">
                <h4 className="text-red-400 font-semibold mb-3">Material Selection Considerations</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">PVC Systems:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Lightweight and cost-effective</li>
                      <li>• Good chemical resistance</li>
                      <li>• Easy to cut and install</li>
                      <li>• Limited temperature range</li>
                      <li>• Not suitable for high-impact areas</li>
                      <li>• May require fire-retardant grades</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Metal Systems:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Superior mechanical protection</li>
                      <li>• Higher load capacity</li>
                      <li>• Better fire resistance</li>
                      <li>• Requires earthing connections</li>
                      <li>• May require corrosion protection</li>
                      <li>• Higher cost but longer lifespan</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mechanical Protection Requirements */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-red-500" />
                Mechanical Protection Requirements
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <div className="bg-red-600/10 p-4 rounded-lg border border-red-600/30">
                <h4 className="text-white font-semibold mb-3">BS 7671 Protection Standards</h4>
                <p className="text-sm">
                  Mechanical protection prevents crush, impact, and abrasion damage to cables throughout their operational life. Requirements vary based on installation location and environmental conditions.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-red-400 font-semibold text-lg mb-3">Impact Protection</h4>
                  <div className="space-y-3">
                    <div className="bg-red-600/20 p-3 rounded border border-red-600/40">
                      <p className="text-white font-semibold text-sm mb-2">High-Risk Areas:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Industrial and workshop environments</li>
                        <li>• Vehicle parking and loading areas</li>
                        <li>• Sports and recreational facilities</li>
                        <li>• Public access areas below 2.5m height</li>
                      </ul>
                    </div>
                    <div className="bg-orange-600/20 p-3 rounded border border-orange-600/40">
                      <p className="text-white font-semibold text-sm mb-2">Protection Methods:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Steel containment systems</li>
                        <li>• Impact-resistant plastic systems</li>
                        <li>• Physical barriers and guards</li>
                        <li>• Burial or concealment methods</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-orange-400 font-semibold text-lg mb-3">Crush Protection</h4>
                  <div className="space-y-3">
                    <div className="bg-orange-600/20 p-3 rounded border border-orange-600/40">
                      <p className="text-white font-semibold text-sm mb-2">Load-Bearing Applications:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Under-floor installations</li>
                        <li>• Roadway and vehicle crossing areas</li>
                        <li>• Heavy machinery locations</li>
                        <li>• Storage area installations</li>
                      </ul>
                    </div>
                    <div className="bg-yellow-600/20 p-3 rounded border border-yellow-600/40">
                      <p className="text-white font-semibold text-sm mb-2">Protective Solutions:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Heavy-duty steel conduit systems</li>
                        <li>• Concrete or steel protection slabs</li>
                        <li>• Reinforced ducting systems</li>
                        <li>• Load distribution plates</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold text-lg mb-3">Abrasion Protection</h4>
                  <div className="space-y-3">
                    <div className="bg-yellow-600/20 p-3 rounded border border-yellow-600/40">
                      <p className="text-white font-semibold text-sm mb-2">Wear Factors:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Cable movement and vibration</li>
                        <li>• Contact with rough surfaces</li>
                        <li>• Thermal expansion cycling</li>
                        <li>• Wind-induced movement</li>
                      </ul>
                    </div>
                    <div className="bg-green-600/20 p-3 rounded border border-green-600/40">
                      <p className="text-white font-semibold text-sm mb-2">Prevention Methods:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Smooth-walled containment systems</li>
                        <li>• Appropriate cable supports</li>
                        <li>• Flexible connections at equipment</li>
                        <li>• Regular inspection and maintenance</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-400/10 p-4 rounded-lg border border-blue-600/30">
                <h4 className="text-yellow-400 font-semibold mb-3">Installation Height Requirements</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Low-Level Installations (Below 2.5m):</p>
                    <ul className="text-xs space-y-1">
                      <li>• Enhanced mechanical protection required</li>
                      <li>• Impact-resistant materials mandatory</li>
                      <li>• Consider vandalism and accidental damage</li>
                      <li>• May require additional barriers or guards</li>
                      <li>• Special consideration for cable entry points</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">High-Level Installations (Above 2.5m):</p>
                    <ul className="text-xs space-y-1">
                      <li>• Reduced mechanical protection requirements</li>
                      <li>• Focus on secure mounting and support</li>
                      <li>• Consider maintenance access safety</li>
                      <li>• Protection from falling objects</li>
                      <li>• Adequate support for cable weight</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Fixing Methods and Support */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Box className="h-6 w-6 text-purple-500" />
                Fixing Methods and Support Systems
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <div className="bg-purple-600/10 p-4 rounded-lg border border-purple-600/30">
                <h4 className="text-white font-semibold mb-3">Secure Installation Requirements</h4>
                <p className="text-sm">
                  Proper fixing methods ensure containment systems remain secure throughout their operational life, with appropriate support intervals and earthing of metallic systems for safety compliance.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-white font-semibold text-lg mb-3">Support Intervals</h4>
                  <div className="space-y-3">
                    <div className="bg-yellow-400/20 p-3 rounded border border-blue-600/40">
                      <p className="text-yellow-400 font-semibold text-sm mb-2">Horizontal Runs:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Light trunking: every 1.0-1.5m</li>
                        <li>• Heavy trunking: every 0.75-1.0m</li>
                        <li>• Cable trays: every 1.5-2.0m</li>
                        <li>• Conduit: every 1.0-1.5m depending on size</li>
                      </ul>
                    </div>
                    <div className="bg-green-600/20 p-3 rounded border border-green-600/40">
                      <p className="text-green-400 font-semibold text-sm mb-2">Vertical Runs:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Increased support frequency required</li>
                        <li>• Every 1.0-1.5m for most systems</li>
                        <li>• Consider cumulative cable weight</li>
                        <li>• Special clamps for heavy installations</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-white font-semibold text-lg mb-3">Fixing Methods</h4>
                  <div className="space-y-3">
                    <div className="bg-orange-600/20 p-3 rounded border border-orange-600/40">
                      <p className="text-orange-400 font-semibold text-sm mb-2">Mechanical Fixings:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Expansion bolts for masonry</li>
                        <li>• Self-tapping screws for steel</li>
                        <li>• Chemical anchors for concrete</li>
                        <li>• Clamps and brackets for structural steel</li>
                      </ul>
                    </div>
                    <div className="bg-red-600/20 p-3 rounded border border-red-600/40">
                      <p className="text-red-400 font-semibold text-sm mb-2">Support Considerations:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Load capacity of fixing points</li>
                        <li>• Vibration and movement accommodation</li>
                        <li>• Thermal expansion allowance</li>
                        <li>• Corrosion protection requirements</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-red-600/10 p-4 rounded-lg border border-red-600/30">
                <h4 className="text-red-400 font-semibold mb-3">Earthing of Metallic Systems</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Legal Requirements:</p>
                    <ul className="text-xs space-y-1">
                      <li>• All metallic containment must be earthed</li>
                      <li>• Continuous earth path required</li>
                      <li>• Earth continuity across joints</li>
                      <li>• Connection to main earthing terminal</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Connection Methods:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Earth continuity conductors</li>
                      <li>• Bonding straps across joints</li>
                      <li>• Mechanical connection reliability</li>
                      <li>• Corrosion protection at connections</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Testing Requirements:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Earth continuity testing</li>
                      <li>• Low resistance measurements</li>
                      <li>• Regular inspection schedule</li>
                      <li>• Documentation of test results</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Environmental Factors */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-orange-500" />
                Environmental Factors and Fire-Rated Systems
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <div className="bg-orange-600/10 p-4 rounded-lg border border-orange-600/30">
                <h4 className="text-white font-semibold mb-3">Environmental Challenge Management</h4>
                <p className="text-sm">
                  Containment systems must withstand environmental challenges including moisture, chemicals, UV radiation, and vibration, while fire-rated systems ensure circuit integrity during emergencies.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-white font-semibold text-lg mb-3">Environmental Challenges</h4>
                  <div className="space-y-3">
                    <div className="bg-yellow-400/20 p-3 rounded border border-blue-600/40">
                      <p className="text-yellow-400 font-semibold text-sm mb-2">Moisture & Chemical Exposure:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Corrosion-resistant materials required</li>
                        <li>• Sealed systems for wet environments</li>
                        <li>• Drainage provisions for water accumulation</li>
                        <li>• Chemical compatibility assessment</li>
                      </ul>
                    </div>
                    <div className="bg-green-600/20 p-3 rounded border border-green-600/40">
                      <p className="text-green-400 font-semibold text-sm mb-2">UV & Temperature Effects:</p>
                      <ul className="text-xs space-y-1">
                        <li>• UV-stabilised materials for outdoor use</li>
                        <li>• Thermal expansion accommodation</li>
                        <li>• Temperature rating verification</li>
                        <li>• Solar heat gain considerations</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-white font-semibold text-lg mb-3">Fire-Rated Containment</h4>
                  <div className="space-y-3">
                    <div className="bg-red-600/20 p-3 rounded border border-red-600/40">
                      <p className="text-red-400 font-semibold text-sm mb-2">When Required:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Fire alarm and detection systems</li>
                        <li>• Emergency lighting circuits</li>
                        <li>• Smoke control and ventilation</li>
                        <li>• Critical safety systems</li>
                      </ul>
                    </div>
                    <div className="bg-orange-600/20 p-3 rounded border border-orange-600/40">
                      <p className="text-orange-400 font-semibold text-sm mb-2">System Characteristics:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Maintains circuit integrity during fire</li>
                        <li>• Special insulation materials used</li>
                        <li>• Higher cost but essential for safety</li>
                        <li>• Requires certified installation methods</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-3">Environmental Selection Guide</h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Indoor Dry:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Standard PVC trunking</li>
                      <li>• Steel systems where robustness needed</li>
                      <li>• Cable trays for plant rooms</li>
                      <li>• Economy and functionality focus</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Indoor Wet/Damp:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Sealed PVC or LSZH systems</li>
                      <li>• Stainless steel for aggressive environments</li>
                      <li>• IP65 rated enclosures</li>
                      <li>• Drainage and ventilation provisions</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Outdoor Applications:</p>
                    <ul className="text-xs space-y-1">
                      <li>• UV-stabilised materials</li>
                      <li>• Weather-resistant coatings</li>
                      <li>• Galvanised or stainless steel</li>
                      <li>• Temperature cycling considerations</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Industrial/Harsh:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Heavy-duty steel systems</li>
                      <li>• Chemical-resistant materials</li>
                      <li>• Explosion-proof where required</li>
                      <li>• Enhanced mechanical protection</li>
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
            <CardContent className="text-gray-300 space-y-4">
              <div className="bg-orange-600/10 p-4 rounded-lg border border-orange-600/30">
                <h4 className="text-white font-semibold mb-3">Factory Production Area Cable Installation</h4>
                <p className="text-sm mb-3">
                  During a factory refit, metal trunking is used to run power cables across a busy production area. It's selected for its robust protection and ease of maintenance, with cables securely clipped inside and correct earth bonding to meet regulations.
                </p>
                <div className="bg-card p-3 rounded">
                  <p className="text-xs text-gray-400 mb-2">
                    <strong>Environment:</strong> High-impact industrial area with overhead cranes, vehicle traffic, and potential chemical exposure from production processes.
                  </p>
                  <p className="text-xs text-gray-400 mb-2">
                    <strong>Solution:</strong> Heavy-duty galvanised steel trunking with 3mm wall thickness, mounted 3m high on structural columns with supports every 1m.
                  </p>
                  <p className="text-xs text-gray-400 mb-2">
                    <strong>Installation:</strong> Cables clipped at 300mm intervals, trunking earthed via 4mm² earth continuity conductor, joints bonded with copper straps.
                  </p>
                  <p className="text-xs text-gray-400">
                    <strong>Outcome:</strong> Robust protection against mechanical damage, easy access for maintenance, full regulatory compliance, and accommodation for future cable additions.
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
            <CardContent className="text-gray-300 space-y-4">
              <p className="text-base leading-relaxed">
                Containment systems serve both a protective and practical purpose. Their correct selection and installation are essential to system durability, safety, and compliance with BS 7671 requirements.
              </p>
              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-3">Key Points</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Containment provides mechanical protection, organisation, safety, and aesthetic benefits</li>
                  <li>• Selection depends on environment, protection level, accessibility, and regulatory requirements</li>
                  <li>• Types include trunking, conduit, trays, baskets, and specialised fire-rated systems</li>
                  <li>• Metal systems require earthing for safety and must maintain earth continuity</li>
                  <li>• Support intervals vary by system type and load, typically 1-2 metres for most applications</li>
                  <li>• Environmental factors including moisture, UV, chemicals, and temperature affect material selection</li>
                  <li>• Fire-rated containment essential for safety-critical circuits to maintain operation during fire</li>
                  <li>• Proper installation ensures long-term reliability and compliance with BS 7671</li>
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
                Test your understanding of containment systems and protection.
              </p>
              
              <BS7671EmbeddedQuiz 
                questions={quizQuestions}
                title="Containment Systems Quiz"
                description="Test your knowledge of containment systems and mechanical protection"
              />
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Link to="../bs7671-module-5-section-2">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../bs7671-module-5-section-4">
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

export default BS7671Module5Section3;