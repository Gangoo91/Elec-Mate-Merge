import { ArrowLeft, Waves, Anchor, Zap, Globe, Mountain, Lightbulb, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';

const RenewableEnergyModule3Section5 = () => {
  const quizQuestions = [
    {
      id: 1,
      question: "What are the main foundation types used for offshore wind turbines?",
      options: [
        "Only concrete foundations",
        "Monopile, jacket, gravity-base, and floating foundations",
        "Only floating platforms",
        "Only steel pile foundations"
      ],
      correct: 1,
      explanation: "Offshore wind uses various foundation types: monopiles for shallow water, jackets for medium depth, gravity-base for hard seabeds, and floating platforms for deep water applications."
    },
    {
      id: 2,
      question: "What water depth typically defines the transition from fixed-bottom to floating offshore wind?",
      options: [
        "30-40 metres",
        "50-60 metres",
        "70-80 metres",
        "100+ metres"
      ],
      correct: 2,
      explanation: "Floating offshore wind becomes economically competitive at water depths of 60-70+ metres, where fixed-bottom foundations become prohibitively expensive due to structural requirements."
    },
    {
      id: 3,
      question: "What are the key advantages of offshore wind compared to onshore?",
      options: [
        "Lower costs and easier installation",
        "Higher and more consistent wind speeds, larger turbines possible",
        "No environmental considerations",
        "Simpler grid connection"
      ],
      correct: 1,
      explanation: "Offshore wind benefits from higher, more consistent wind speeds due to lower surface roughness, and allows for much larger turbines without transport and noise constraints."
    },
    {
      id: 4,
      question: "What are the main types of floating platform designs for offshore wind?",
      options: [
        "Only spar platforms",
        "Spar, semi-submersible, and tension leg platforms (TLP)",
        "Only tension leg platforms",
        "Only semi-submersible platforms"
      ],
      correct: 1,
      explanation: "The three main floating platform concepts are spar (ballast-stabilised), semi-submersible (buoyancy-stabilised), and tension leg platforms (mooring-stabilised), each suited to different conditions."
    },
    {
      id: 5,
      question: "Why is grid integration more challenging for offshore wind farms?",
      options: [
        "Offshore wind produces less power",
        "Longer transmission distances and need for offshore substations and submarine cables",
        "Offshore turbines are less reliable",
        "Grid integration is actually easier offshore"
      ],
      correct: 1,
      explanation: "Offshore wind requires expensive offshore substations, long submarine cables with high transmission losses, and complex grid integration due to distance from shore and load centres."
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in overflow-x-hidden bg-[#1a1a1a]">
      <div className="px-4 md:px-8 pt-8 pb-12">
        <Link to="/study-centre/upskilling/renewable-energy-module-3">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md touch-manipulation active:scale-[0.98]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 3
          </Button>
        </Link>
        
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Offshore Wind Technology
            </h1>
            <p className="text-xl text-gray-400 mb-6">
              Advanced offshore wind systems, floating platforms, and marine installation technologies
            </p>
            <div className="flex flex-wrap gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Section 5
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                Offshore Technology
              </Badge>
            </div>
          </div>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-yellow-400" />
                Learning Objectives
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <ul className="text-gray-300 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Understand offshore wind foundation types and marine installation challenges
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Learn about floating wind technology and platform designs
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Explore UK offshore wind development and grid connection requirements
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Introduction</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed">
                Offshore wind represents the next frontier of wind energy development, offering access to stronger, more consistent wind resources and the potential for much larger installations. With the UK leading global offshore wind deployment, understanding marine technologies, floating platforms, and offshore installation challenges is crucial for future energy professionals. This technology promises to unlock vast renewable energy potential in deeper waters previously inaccessible to wind development.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Waves className="h-6 w-6 text-yellow-400" />
                Offshore Wind Advantages and Challenges
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Offshore wind environments offer unique advantages while presenting distinct technical and economic challenges compared to onshore development.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-blue-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="text-yellow-400 font-semibold mb-3">Offshore Advantages:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Higher wind speeds:</strong> 20-40% higher than equivalent onshore sites</li>
                    <li>• <strong>Lower turbulence:</strong> Smooth sea surface reduces fatigue loads</li>
                    <li>• <strong>Consistent winds:</strong> More stable diurnal and seasonal patterns</li>
                    <li>• <strong>Larger turbines:</strong> No transport constraints allow 15MW+ turbines</li>
                    <li>• <strong>Reduced visual impact:</strong> Located beyond visual horizon from shore</li>
                  </ul>
                </div>
                <div className="bg-blue-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="text-yellow-400 font-semibold mb-3">Offshore Challenges:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Higher costs:</strong> 2-3x onshore costs due to marine environment</li>
                    <li>• <strong>Harsh conditions:</strong> Salt corrosion, wave loading, extreme weather</li>
                    <li>• <strong>Installation complexity:</strong> Specialised vessels and weather windows</li>
                    <li>• <strong>Grid connection:</strong> Expensive submarine cables and offshore substations</li>
                    <li>• <strong>Maintenance access:</strong> Weather-dependent boat/helicopter access</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-yellow-400 font-semibold mb-3">Offshore Wind Resource Characteristics:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="text-white font-medium">Wind Characteristics:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Lower wind shear due to smooth surface (α = 0.08-0.12)</li>
                      <li>• Higher capacity factors: 45-55% typical offshore</li>
                      <li>• Reduced turbulence intensity: 6-10% typical</li>
                      <li>• Seasonal patterns: Winter maxima, summer minima</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Marine Conditions:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Wave heights: Significant wave height 1-4m typical</li>
                      <li>• Tidal currents: 0.5-2.5 m/s in UK waters</li>
                      <li>• Storm conditions: 50-year design criteria</li>
                      <li>• Seabed conditions: Sand, clay, rock foundations</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Anchor className="h-6 w-6 text-green-400" />
                Fixed-Bottom Foundation Systems
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Fixed-bottom foundations dominate current offshore wind deployment, with different designs optimised for specific water depths and seabed conditions.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-green-400 font-semibold mb-3">Monopile Foundations:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Water depth:</strong> 20-60m optimal range</li>
                    <li>• <strong>Design:</strong> Large diameter steel pile (6-10m) driven into seabed</li>
                    <li>• <strong>Advantages:</strong> Simple design, proven technology, cost-effective</li>
                    <li>• <strong>Installation:</strong> Impact or vibratory piling from jack-up vessels</li>
                    <li>• <strong>Market share:</strong> 80%+ of current offshore wind foundations</li>
                  </ul>
                </div>
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-green-400 font-semibold mb-3">Jacket Foundations:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Water depth:</strong> 40-80m typical range</li>
                    <li>• <strong>Design:</strong> Steel lattice structure with multiple piles</li>
                    <li>• <strong>Advantages:</strong> Suitable for harder seabeds, reduced scour</li>
                    <li>• <strong>Complexity:</strong> More complex fabrication and installation</li>
                    <li>• <strong>Applications:</strong> Deeper water and challenging soil conditions</li>
                  </ul>
                </div>
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-green-400 font-semibold mb-3">Gravity-Base Foundations:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Design:</strong> Large concrete or steel structure relying on weight</li>
                    <li>• <strong>Seabed requirements:</strong> Hard, flat seabed with good bearing capacity</li>
                    <li>• <strong>Installation:</strong> No piling required, positioned by crane vessels</li>
                    <li>• <strong>Environmental:</strong> Reduced noise during installation</li>
                    <li>• <strong>Limitations:</strong> Suitable sites limited by seabed conditions</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-green-400 font-semibold mb-2">Foundation Design Considerations:</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• <strong>Load analysis:</strong> Combined wind, wave, and current forces</li>
                  <li>• <strong>Fatigue design:</strong> 25-year design life under cyclic loading</li>
                  <li>• <strong>Soil conditions:</strong> Geotechnical investigation for pile design</li>
                  <li>• <strong>Scour protection:</strong> Seabed erosion prevention around foundations</li>
                  <li>• <strong>Installation tolerances:</strong> Precise positioning for turbine alignment</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Globe className="h-6 w-6 text-purple-400" />
                Floating Offshore Wind Technology
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Floating wind technology opens vast deep-water resources, with various platform designs providing stable foundations for large turbines in waters 60m+ deep.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="text-purple-400 font-semibold mb-3">Spar Platforms:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Design principle:</strong> Ballast-stabilised deep-draft cylinder</li>
                    <li>• <strong>Stability:</strong> Low centre of gravity provides inherent stability</li>
                    <li>• <strong>Draft:</strong> 100-150m deep draft for stability</li>
                    <li>• <strong>Advantages:</strong> Simple, proven technology from oil/gas industry</li>
                    <li>• <strong>Limitations:</strong> Requires deep water ports for assembly</li>
                  </ul>
                </div>
                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="text-purple-400 font-semibold mb-3">Semi-Submersible:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Design principle:</strong> Buoyancy-stabilised multi-column platform</li>
                    <li>• <strong>Stability:</strong> Large waterplane area provides restoring forces</li>
                    <li>• <strong>Draft:</strong> 15-30m moderate draft</li>
                    <li>• <strong>Assembly:</strong> Can be assembled in shallower ports</li>
                    <li>• <strong>Motion characteristics:</strong> Higher motion response than spar</li>
                  </ul>
                </div>
                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="text-purple-400 font-semibold mb-3">Tension Leg Platform (TLP):</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Design principle:</strong> Mooring-stabilised with vertical tendons</li>
                    <li>• <strong>Stability:</strong> Pre-tensioned moorings provide restoring forces</li>
                    <li>• <strong>Motion:</strong> Very low heave, pitch, and roll motions</li>
                    <li>• <strong>Complexity:</strong> More complex mooring and installation</li>
                    <li>• <strong>Benefits:</strong> Excellent motion performance for turbine operation</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-purple-400 font-semibold mb-3">Floating Wind Market Development:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="text-white font-medium">Current Status:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Demonstration projects: 5-30MW installations</li>
                      <li>• Commercial projects: First large-scale arrays in development</li>
                      <li>• Cost reduction: Target 50% reduction by 2030</li>
                      <li>• Technology maturation: Moving from prototype to commercial</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">UK Development:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• ScotWind leasing round includes floating areas</li>
                      <li>• Celtic Sea identified for floating development</li>
                      <li>• Innovation support through Offshore Wind Growth Partnership</li>
                      <li>• Target: 1GW floating capacity by 2030</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Mountain className="h-6 w-6 text-orange-400" />
                Marine Installation and Logistics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Offshore wind installation requires specialised vessels, careful weather planning, and complex logistics coordination to safely install large turbines in marine environments.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
                  <h4 className="text-orange-400 font-semibold mb-3">Installation Vessels:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Jack-up vessels:</strong> Self-elevating platforms for foundation and turbine installation</li>
                    <li>• <strong>Heavy lift vessels:</strong> Large crane capacity (1000+ tonnes) for components</li>
                    <li>• <strong>Cable laying vessels:</strong> Specialised for submarine cable installation</li>
                    <li>• <strong>Service operation vessels:</strong> Crew transfer and maintenance support</li>
                    <li>• <strong>Floating installation:</strong> Dynamic positioning vessels for floating turbines</li>
                  </ul>
                </div>
                <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
                  <h4 className="text-orange-400 font-semibold mb-3">Installation Sequence:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Foundation installation:</strong> Pile driving or gravity-base placement</li>
                    <li>• <strong>Transition piece:</strong> Interface between foundation and turbine</li>
                    <li>• <strong>Turbine assembly:</strong> Tower, nacelle, and rotor installation</li>
                    <li>• <strong>Cable installation:</strong> Array and export cable laying</li>
                    <li>• <strong>Commissioning:</strong> Testing and grid connection</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-orange-400 font-semibold mb-3">Weather and Environmental Constraints:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="text-white font-medium">Weather Windows:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Wind speed limits: &lt;12 m/s for crane operations</li>
                      <li>• Wave height limits: &lt;1.5m significant wave height</li>
                      <li>• Seasonal patterns: Summer installation campaigns</li>
                      <li>• Weather forecasting: 7-14 day planning horizons</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Environmental Considerations:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Marine mammal protection: Noise restrictions</li>
                      <li>• Bird migration: Seasonal installation restrictions</li>
                      <li>• Fishing industry: Coordination with fishing activities</li>
                      <li>• Marine Protected Areas: Special installation procedures</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="h-6 w-6 text-cyan-400" />
                Grid Integration and Offshore Substations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Offshore wind requires sophisticated electrical infrastructure including offshore substations and submarine cables to transmit power to shore efficiently and reliably.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-cyan-900/20 p-4 rounded-lg border border-cyan-500/30">
                  <h4 className="text-cyan-400 font-semibold mb-3">Offshore Substations:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>AC collection:</strong> 33kV turbine outputs collected at substation</li>
                    <li>• <strong>Voltage transformation:</strong> Step-up to 132kV or 275kV for transmission</li>
                    <li>• <strong>HVDC conversion:</strong> AC-DC conversion for long-distance transmission</li>
                    <li>• <strong>Platform design:</strong> Topside modules on jacket or gravity foundations</li>
                    <li>• <strong>Redundancy:</strong> Backup systems for critical electrical equipment</li>
                  </ul>
                </div>
                <div className="bg-cyan-900/20 p-4 rounded-lg border border-cyan-500/30">
                  <h4 className="text-cyan-400 font-semibold mb-3">Submarine Cables:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Array cables:</strong> Inter-turbine connections within wind farm</li>
                    <li>• <strong>Export cables:</strong> High-voltage transmission to shore</li>
                    <li>• <strong>HVAC vs HVDC:</strong> HVDC for distances &gt;80km or large capacity</li>
                    <li>• <strong>Cable protection:</strong> Burial or rock placement for damage prevention</li>
                    <li>• <strong>Maintenance:</strong> Repair vessels and spare cable capacity</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-cyan-400 font-semibold mb-2">UK Offshore Grid Development:</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• <strong>Crown Estate leasing:</strong> Coordinated development in defined zones</li>
                  <li>• <strong>Offshore Transmission Owner (OFTO):</strong> Regulated transmission asset ownership</li>
                  <li>• <strong>Integrated offshore networks:</strong> Shared transmission infrastructure</li>
                  <li>• <strong>European interconnection:</strong> Multi-purpose interconnectors with wind farms</li>
                  <li>• <strong>Grid reinforcement:</strong> Onshore network upgrades for offshore capacity</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Mountain className="h-6 w-6 text-cyan-400" />
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <h4 className="text-cyan-400 font-semibold mb-2">At what water depth does floating wind become more cost-effective than fixed foundations?</h4>
                  <p className="text-gray-300 text-sm">
                    Floating wind typically becomes competitive at 60-70m+ water depths, where fixed foundations become prohibitively expensive. However, this varies by site conditions - in hard rock seabeds or challenging soil conditions, floating may be viable at shallower depths (50m+).
                  </p>
                </div>

                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <h4 className="text-cyan-400 font-semibold mb-2">How do maintenance operations differ for offshore wind farms?</h4>
                  <p className="text-gray-300 text-sm">
                     Offshore maintenance requires weather windows with wave heights less than 1.5m for boat access or less than 2.5m for helicopter operations. Crew transfer vessels (CTVs) are used for routine maintenance, while heavy-lift vessels are needed for major repairs. This weather dependency significantly increases operational costs and planning complexity.
                  </p>
                </div>

                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <h4 className="text-cyan-400 font-semibold mb-2">What are the main environmental considerations for offshore wind development?</h4>
                  <p className="text-gray-300 text-sm">
                    Key environmental impacts include construction noise affecting marine mammals, seabed disturbance during installation, electromagnetic fields from cables affecting fish migration, and potential collision risks for seabirds. However, offshore wind farms can also create artificial reef effects that benefit marine ecosystems.
                  </p>
                </div>

                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <h4 className="text-cyan-400 font-semibold mb-2">How do wind speeds offshore compare to onshore locations?</h4>
                  <p className="text-gray-300 text-sm">
                    Offshore wind speeds are typically 20-40% higher than equivalent onshore sites due to lower surface roughness and reduced topographical interference. This, combined with lower turbulence (6-10% vs 15-20% onshore), results in capacity factors of 45-55% offshore compared to 25-35% onshore.
                  </p>
                </div>

                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <h4 className="text-cyan-400 font-semibold mb-2">What are the challenges of grid integration for offshore wind?</h4>
                  <p className="text-gray-300 text-sm">
                    Offshore wind requires expensive submarine cables (£1-3M/km) and offshore substations (£100-300M). Long transmission distances cause voltage drops and reactive power requirements. Large offshore wind farms can also cause grid stability issues requiring sophisticated power electronics and grid management systems.
                  </p>
                </div>

                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <h4 className="text-cyan-400 font-semibold mb-2">What role does the UK play in global offshore wind development?</h4>
                  <p className="text-gray-300 text-sm">
                    The UK leads global offshore wind deployment with 40%+ of total installed capacity. UK waters have optimal wind resources, shallow North Sea areas suitable for current technology, and a strong supply chain. The government targets 40GW offshore wind by 2030, including 1GW of floating wind, maintaining global leadership in this sector.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <SingleQuestionQuiz 
            questions={quizQuestions}
            title="Offshore Wind Technology Quiz"
          />

          <div className="flex justify-between mt-8">
            <Link to="/study-centre/upskilling/renewable-energy-module-3-section-4">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card touch-manipulation active:scale-[0.98]">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="/study-centre/upskilling/renewable-energy-module-3">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-600 touch-manipulation active:scale-[0.98]">
                Complete Module 3
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RenewableEnergyModule3Section5;