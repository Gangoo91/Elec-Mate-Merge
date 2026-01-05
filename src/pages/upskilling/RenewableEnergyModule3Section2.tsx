import { ArrowLeft, RotateCw, ArrowUpDown, Building, MapPin, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';

const RenewableEnergyModule3Section2 = () => {
  const quizQuestions = [
    {
      id: 1,
      question: "Which type of wind turbine requires wind direction alignment for optimal operation?",
      options: [
        "Vertical Axis Wind Turbines (VAWTs)",
        "Horizontal Axis Wind Turbines (HAWTs)",
        "Both types require alignment",
        "Neither type requires alignment"
      ],
      correct: 1,
      explanation: "Horizontal Axis Wind Turbines (HAWTs) must be oriented into the wind for optimal energy capture, using yaw systems to track wind direction. VAWTs can accept wind from any direction."
    },
    {
      id: 2,
      question: "Which turbine type is generally more suited for urban rooftop installations?",
      options: [
        "Horizontal Axis Wind Turbines (HAWTs)",
        "Vertical Axis Wind Turbines (VAWTs)",
        "Both are equally suitable",
        "Neither should be used on rooftops"
      ],
      correct: 1,
      explanation: "VAWTs are better suited for rooftop installations due to their omni-directional operation, lower noise levels, simpler tower structure, and ability to handle turbulent urban wind conditions."
    },
    {
      id: 3,
      question: "What is a key advantage of Vertical Axis Wind Turbines (VAWTs)?",
      options: [
        "Higher efficiency than HAWTs",
        "Lower cost per MW installed",
        "Omni-directional wind acceptance",
        "Better performance at high wind speeds"
      ],
      correct: 2,
      explanation: "VAWTs can accept wind from any direction without requiring yaw mechanisms, making them ideal for locations with variable or turbulent wind patterns, such as urban environments."
    },
    {
      id: 4,
      question: "Why are Horizontal Axis Wind Turbines (HAWTs) generally more efficient?",
      options: [
        "They have simpler construction",
        "They operate at lower wind speeds",
        "Better aerodynamic design and wind capture optimisation",
        "They require less maintenance"
      ],
      correct: 2,
      explanation: "HAWTs achieve higher efficiency through optimised aerodynamic blade design, better wind capture when properly oriented, and more mature technology development over decades of research and deployment."
    },
    {
      id: 5,
      question: "Name one significant drawback each for HAWTs and VAWTs:",
      options: [
        "HAWTs: High cost; VAWTs: Low efficiency",
        "HAWTs: Require wind direction tracking; VAWTs: Generally lower efficiency and power density",
        "HAWTs: Complex installation; VAWTs: High maintenance",
        "HAWTs: Poor grid integration; VAWTs: Weather sensitivity"
      ],
      correct: 1,
      explanation: "HAWTs require complex yaw systems for wind tracking and have height restrictions for maintenance access. VAWTs typically have lower power coefficients and power density compared to HAWTs."
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div className="px-4 md:px-8 pt-8 pb-12">
        <Link to="../renewable-energy-module-3">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 3
          </Button>
        </Link>
        
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Horizontal vs Vertical Axis Turbines
            </h1>
            <p className="text-xl text-gray-400 mb-6">
              Comparing turbine configurations: design principles, efficiency trade-offs, and optimal applications
            </p>
            <div className="flex flex-wrap gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Section 2
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                Turbine Technologies
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
                  Differentiate between Horizontal and Vertical Axis Wind Turbines (HAWTs and VAWTs)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Understand design principles, orientation requirements, and efficiency trade-offs
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Identify optimal application scenarios and deployment strategies for each type
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
                Wind turbines come in two primary architectural configurations, each with distinct advantages and limitations. Understanding the fundamental differences between horizontal and vertical axis designs is crucial for selecting appropriate technology for specific applications, from utility-scale installations to distributed urban generation.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <RotateCw className="h-6 w-6 text-yellow-400" />
                Horizontal Axis Wind Turbines (HAWTs)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                HAWTs represent the dominant wind turbine technology, with the rotor shaft oriented horizontally and parallel to the ground. These turbines must face into the wind for optimal energy capture.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-blue-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="text-yellow-400 font-semibold mb-3">Design Characteristics:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Rotor orientation:</strong> Horizontal shaft, perpendicular to tower</li>
                    <li>• <strong>Blade configuration:</strong> Typically 2-3 blades in upwind or downwind designs</li>
                    <li>• <strong>Yaw system:</strong> Active wind direction tracking mechanism</li>
                    <li>• <strong>Nacelle housing:</strong> Contains gearbox, generator, and control systems</li>
                    <li>• <strong>Tower height:</strong> Elevated to access stronger, less turbulent winds</li>
                  </ul>
                </div>
                <div className="bg-blue-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="text-yellow-400 font-semibold mb-3">Performance Advantages:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>High efficiency:</strong> Up to 45-50% of theoretical maximum (Betz limit)</li>
                    <li>• <strong>Optimal wind capture:</strong> Perpendicular blade orientation to wind flow</li>
                    <li>• <strong>Mature technology:</strong> Decades of development and optimisation</li>
                    <li>• <strong>Large scale capability:</strong> Proven for multi-MW installations</li>
                    <li>• <strong>Cost effectiveness:</strong> Lowest levelised cost of energy (LCOE)</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-yellow-400 font-semibold mb-3">Modern HAWT Innovations:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="text-white font-medium">Advanced Blade Technology:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Smart blade systems with adaptive surfaces</li>
                      <li>• Individual pitch control for optimised loading</li>
                      <li>• Advanced materials: carbon fibre composites</li>
                      <li>• Swept and curved blade designs</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Control Systems:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• LiDAR-assisted control for wind prediction</li>
                      <li>• Wake steering for array optimisation</li>
                      <li>• Condition-based monitoring systems</li>
                      <li>• Grid-forming capabilities for weak grid support</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <ArrowUpDown className="h-6 w-6 text-green-400" />
                Vertical Axis Wind Turbines (VAWTs)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                VAWTs feature a vertically oriented rotor shaft, allowing them to capture wind from any direction without requiring yaw mechanisms. This configuration offers unique advantages for specific applications.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-green-400 font-semibold mb-3">Darrieus Design:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Curved blades:</strong> Troposkien or helical configuration</li>
                    <li>• <strong>Lift-based operation:</strong> Aerodynamic lift forces drive rotation</li>
                    <li>• <strong>Higher efficiency:</strong> Better performance among VAWT designs</li>
                    <li>• <strong>Self-starting issues:</strong> May require motor assistance</li>
                    <li>• <strong>Fatigue loading:</strong> Cyclic stress patterns on blades</li>
                  </ul>
                </div>
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-green-400 font-semibold mb-3">Savonius Design:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>S-shaped rotor:</strong> Drag-based operation principle</li>
                    <li>• <strong>Self-starting:</strong> Reliable startup at low wind speeds</li>
                    <li>• <strong>Simple construction:</strong> Fewer moving parts, lower cost</li>
                    <li>• <strong>Lower efficiency:</strong> Typically 20-30% power coefficient</li>
                    <li>• <strong>Small scale focus:</strong> Suitable for distributed applications</li>
                  </ul>
                </div>
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-green-400 font-semibold mb-3">Helical Designs:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Twisted blades:</strong> Helical twist reduces vibration</li>
                    <li>• <strong>Smooth torque:</strong> More consistent power output</li>
                    <li>• <strong>Reduced noise:</strong> Lower acoustic emissions</li>
                    <li>• <strong>Manufacturing complexity:</strong> More challenging to produce</li>
                    <li>• <strong>Aesthetic appeal:</strong> Architectural integration potential</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Building className="h-6 w-6 text-purple-400" />
                Installation and Maintenance Comparisons
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Installation requirements, maintenance accessibility, and operational considerations differ significantly between HAWT and VAWT configurations.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="text-purple-400 font-semibold mb-3">HAWT Installation:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Foundation requirements:</strong> Deep foundations for tall towers</li>
                    <li>• <strong>Crane access:</strong> Large mobile cranes required for assembly</li>
                    <li>• <strong>Transport logistics:</strong> Road width limits for blade transport</li>
                    <li>• <strong>Height restrictions:</strong> Aviation clearance requirements</li>
                    <li>• <strong>Site preparation:</strong> Substantial civil works needed</li>
                  </ul>
                </div>
                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="text-purple-400 font-semibold mb-3">VAWT Installation:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Simpler foundations:</strong> Lower tower height reduces loads</li>
                    <li>• <strong>Smaller cranes:</strong> Ground-level assembly possible</li>
                    <li>• <strong>Compact transport:</strong> Smaller component dimensions</li>
                    <li>• <strong>Urban integration:</strong> Better suited for built environments</li>
                    <li>• <strong>Modular design:</strong> Easier expansion and modification</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-purple-400 font-semibold mb-3">Maintenance Considerations:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="text-white font-medium">HAWT Maintenance:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Nacelle access requires crane or climbing systems</li>
                      <li>• Blade inspection via rope access or drones</li>
                      <li>• Gearbox and generator replacement complex</li>
                      <li>• Predictive maintenance systems essential</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">VAWT Maintenance:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Ground-level access to generator and controls</li>
                      <li>• Simpler blade inspection and maintenance</li>
                      <li>• Direct-drive systems reduce complexity</li>
                      <li>• Lower safety risks during maintenance</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <MapPin className="h-6 w-6 text-orange-400" />
                Environmental Impact and Noise Considerations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Environmental factors including noise, vibration, visual impact, and wildlife interactions vary significantly between turbine configurations.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
                  <h4 className="text-orange-400 font-semibold mb-3">Noise and Vibration:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>HAWT noise sources:</strong> Blade tip vortices, gearbox, transformer</li>
                    <li>• <strong>VAWT advantages:</strong> Lower tip speeds reduce aerodynamic noise</li>
                    <li>• <strong>Infrasound:</strong> HAWTs may generate low-frequency noise</li>
                    <li>• <strong>Mechanical noise:</strong> Gearbox noise more significant in HAWTs</li>
                    <li>• <strong>Urban acceptance:</strong> VAWTs better suited for proximity to residents</li>
                  </ul>
                </div>
                <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
                  <h4 className="text-orange-400 font-semibold mb-3">Visual and Wildlife Impact:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Visual intrusion:</strong> HAWTs more prominent due to height</li>
                    <li>• <strong>Shadow flicker:</strong> HAWT blades create periodic shadows</li>
                    <li>• <strong>Bird and bat impact:</strong> HAWTs present collision risks</li>
                    <li>• <strong>VAWT wildlife impact:</strong> Lower height reduces bird strike risk</li>
                    <li>• <strong>Landscape integration:</strong> VAWTs offer better architectural compatibility</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-blue-900/20 border-yellow-400/30">
            <CardHeader>
              <CardTitle className="text-yellow-400">Comprehensive Technology Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-yellow-400/30">
                      <th className="text-left text-yellow-400 p-3 font-semibold">Characteristic</th>
                      <th className="text-left text-yellow-400 p-3 font-semibold">HAWT</th>
                      <th className="text-left text-yellow-400 p-3 font-semibold">VAWT</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-b border-gray-700">
                      <td className="p-3 font-medium">Efficiency Range</td>
                      <td className="p-3">35-50% of Betz limit</td>
                      <td className="p-3">20-40% of Betz limit</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="p-3 font-medium">Wind Direction Dependency</td>
                      <td className="p-3">Must track wind direction</td>
                      <td className="p-3">Omni-directional operation</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="p-3 font-medium">Installation Complexity</td>
                      <td className="p-3">High (large cranes, transport)</td>
                      <td className="p-3">Moderate (smaller equipment)</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="p-3 font-medium">Maintenance Access</td>
                      <td className="p-3">Difficult (height, weather)</td>
                      <td className="p-3">Easier (ground-level access)</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="p-3 font-medium">Noise Levels</td>
                      <td className="p-3">Moderate to high</td>
                      <td className="p-3">Generally lower</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="p-3 font-medium">Visual Impact</td>
                      <td className="p-3">High (tall, prominent)</td>
                      <td className="p-3">Lower (compact, architectural)</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="p-3 font-medium">Cost per MW</td>
                      <td className="p-3">£1.2-1.8M (onshore)</td>
                      <td className="p-3">£2.0-3.5M (typically higher)</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="p-3 font-medium">Typical Applications</td>
                      <td className="p-3">Utility-scale, wind farms</td>
                      <td className="p-3">Urban, distributed, niche</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="p-3 font-medium">Technology Maturity</td>
                      <td className="p-3">Mature, proven at scale</td>
                      <td className="p-3">Developing, niche applications</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Grid Integration</td>
                      <td className="p-3">Excellent, standardised</td>
                      <td className="p-3">Good, simpler for small scale</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Market Applications and Future Trends</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <h4 className="text-white font-semibold mb-3">HAWT Market Dominance:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Utility-scale leadership:</strong> &gt;95% of global wind capacity</li>
                    <li>• <strong>Offshore expansion:</strong> 15MW+ turbines entering service</li>
                    <li>• <strong>Floating platforms:</strong> Accessing deeper water resources</li>
                    <li>• <strong>Hybrid systems:</strong> Integration with solar and storage</li>
                    <li>• <strong>Advanced materials:</strong> Longer, lighter blades with smart features</li>
                  </ul>
                </div>
                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <h4 className="text-white font-semibold mb-3">VAWT Niche Markets:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Urban environments:</strong> Building-integrated applications</li>
                    <li>• <strong>Distributed generation:</strong> Community and residential scale</li>
                    <li>• <strong>Harsh environments:</strong> Areas with extreme weather or limited access</li>
                    <li>• <strong>Offshore innovation:</strong> Floating VAWT platforms under development</li>
                    <li>• <strong>Hybrid designs:</strong> Combining HAWT and VAWT principles</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-green-900/20 border-green-500/30">
            <CardHeader>
              <CardTitle className="text-green-400">Case Study: Urban VAWT Deployment - Portland Wind Power Project</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed mb-4">
                A pioneering urban wind project in Portland, Oregon, demonstrates practical VAWT deployment in built environments with valuable lessons for UK urban applications.
              </p>
              <div className="bg-card p-4 rounded-lg mb-4">
                <h4 className="text-green-400 font-semibold mb-3">Project Overview:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="text-white font-medium">Technical Specifications:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• 2 × Pacwind 35kW helical VAWTs</li>
                      <li>• 30m tower height (vs 80m+ for equivalent HAWT)</li>
                      <li>• Urban canyon installation</li>
                      <li>• Grid-tied with net metering</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Performance Results:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• 22% capacity factor in urban environment</li>
                      <li>• 45 dB(A) noise level at 100m</li>
                      <li>• High public acceptance and visual appeal</li>
                      <li>• Minimal wildlife interaction</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-green-400 font-semibold mb-2">Key Insights for UK Applications:</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• <strong>Urban wind resource:</strong> VAWTs more tolerant of turbulent flow patterns</li>
                  <li>• <strong>Planning approval:</strong> Reduced visual impact aided approval process</li>
                  <li>• <strong>Grid integration:</strong> Simplified connection for distributed scale</li>
                  <li>• <strong>Maintenance access:</strong> Ground-level servicing reduced operational costs</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed mb-4">
                HAWTs dominate the large-scale wind energy market due to their superior efficiency and cost-effectiveness, particularly for utility-scale applications. VAWTs offer unique advantages for specific applications, including urban environments, distributed generation, and scenarios requiring omni-directional operation or reduced visual impact.
              </p>
              <p className="text-yellow-400 font-medium">
                Technology selection should be based on specific site requirements, including wind resource characteristics, environmental constraints, and project scale rather than general efficiency comparisons alone.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-yellow-400" />
                Test Your Knowledge
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SingleQuestionQuiz 
                questions={quizQuestions}
                title="Horizontal vs Vertical Axis Turbines Quiz"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RenewableEnergyModule3Section2;