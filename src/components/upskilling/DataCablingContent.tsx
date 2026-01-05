import { Building, Cable, Shield, CheckCircle, Network, Zap, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const DataCablingContent = () => {
  const subsystems = [
    {
      title: "Horizontal Cabling",
      description: "Extends from telecommunications rooms to work area outlets",
      details: "Typically 90m maximum length, includes cables, outlets, connectors, and cross-connects"
    },
    {
      title: "Backbone Cabling", 
      description: "Provides interconnection between telecommunications rooms",
      details: "Connects equipment rooms, entrance facilities, and telecommunications rooms"
    },
    {
      title: "Work Area",
      description: "Components that connect end-user equipment to outlets",
      details: "Includes patch cords, adapters, and extension cables up to 5m"
    },
    {
      title: "Telecommunications Room",
      description: "Houses telecommunications equipment and cross-connect hardware",
      details: "Serves as connection point between horizontal and backbone cabling"
    },
    {
      title: "Equipment Room",
      description: "Centralised space for telecommunications equipment",
      details: "Houses PBXs, servers, switches, and other complex equipment"
    },
    {
      title: "Entrance Facilities",
      description: "Point where outside plant cabling connects to inside plant",
      details: "Includes protection devices, connecting hardware, and transition points"
    }
  ];

  const cableTypes = [
    {
      type: "Cat5e",
      bandwidth: "100 MHz",
      applications: "Gigabit Ethernet, basic data applications",
      maxDistance: "100m"
    },
    {
      type: "Cat6",
      bandwidth: "250 MHz", 
      applications: "Gigabit Ethernet, enhanced performance",
      maxDistance: "100m (55m for 10GBASE-T)"
    },
    {
      type: "Cat6A",
      bandwidth: "500 MHz",
      applications: "10 Gigabit Ethernet, high-performance applications",
      maxDistance: "100m"
    },
    {
      type: "Single-Mode Fiber",
      bandwidth: "Unlimited",
      applications: "Long distance, high bandwidth applications",
      maxDistance: "40+ km"
    },
    {
      type: "Multi-Mode Fiber",
      bandwidth: "High",
      applications: "Campus backbone, high-speed LAN applications", 
      maxDistance: "300m-2km"
    }
  ];

  const benefits = [
    {
      icon: CheckCircle,
      title: "Flexibility",
      description: "Easy to reconfigure and adapt to changing requirements"
    },
    {
      icon: Zap,
      title: "Performance",
      description: "Optimised signal transmission and reduced interference"
    },
    {
      icon: Shield,
      title: "Reliability", 
      description: "Standardised components ensure consistent performance"
    },
    {
      icon: Network,
      title: "Future-Proof",
      description: "Designed to support emerging technologies and applications"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Structured Cabling Subsystems */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Building className="h-5 w-5 text-elec-yellow" />
            Six Subsystems of Structured Cabling
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {subsystems.map((subsystem, index) => (
              <div key={index} className="bg-[#323232] rounded-lg p-4 border border-gray-700">
                <h4 className="font-semibold text-elec-yellow mb-2">{subsystem.title}</h4>
                <p className="text-gray-300 text-sm mb-2">{subsystem.description}</p>
                <p className="text-gray-400 text-xs">{subsystem.details}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Cable Types */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Cable className="h-5 w-5 text-elec-yellow" />
            Common Cable Types and Specifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="text-left py-3 px-2 text-elec-yellow font-semibold">Cable Type</th>
                  <th className="text-left py-3 px-2 text-elec-yellow font-semibold">Bandwidth</th>
                  <th className="text-left py-3 px-2 text-elec-yellow font-semibold">Applications</th>
                  <th className="text-left py-3 px-2 text-elec-yellow font-semibold">Max Distance</th>
                </tr>
              </thead>
              <tbody>
                {cableTypes.map((cable, index) => (
                  <tr key={index} className="border-b border-gray-700">
                    <td className="py-3 px-2 text-foreground font-medium">{cable.type}</td>
                    <td className="py-3 px-2 text-gray-300">{cable.bandwidth}</td>
                    <td className="py-3 px-2 text-gray-300">{cable.applications}</td>
                    <td className="py-3 px-2 text-gray-300">{cable.maxDistance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Benefits */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground">Key Benefits of Structured Cabling</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-[#323232] rounded-lg border border-gray-700">
                <benefit.icon className="h-6 w-6 text-elec-yellow mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">{benefit.title}</h4>
                  <p className="text-gray-300 text-sm">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Planning and Design Considerations */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Building className="h-5 w-5 text-elec-yellow" />
            Planning and Design Considerations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-elec-yellow mb-3">Design Phase</h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Assess current and future bandwidth requirements</li>
                <li>• Determine cable routing and pathway requirements</li>
                <li>• Plan telecommunications room locations and sizes</li>
                <li>• Consider environmental factors (temperature, humidity)</li>
                <li>• Evaluate electromagnetic interference sources</li>
                <li>• Plan for cable management and organisation</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-elec-yellow mb-3">Implementation Phase</h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Follow proper cable installation techniques</li>
                <li>• Maintain minimum bend radius requirements</li>
                <li>• Ensure proper cable support and strain relief</li>
                <li>• Implement comprehensive labelling system</li>
                <li>• Document all cable runs and connections</li>
                <li>• Perform certification testing on all links</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Testing and Certification */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <CheckCircle className="h-5 w-5 text-elec-yellow" />
            Testing and Certification Requirements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-blue-600/20 border border-blue-600/30 rounded-lg p-4">
              <h4 className="font-semibold text-blue-300 mb-2">Why Testing Matters</h4>
              <p className="text-blue-100 text-sm leading-relaxed">
                Proper testing ensures the cabling system meets performance specifications and 
                can support intended applications. It also provides documentation for warranty 
                coverage and future troubleshooting.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-[#323232] rounded-lg p-4 border border-gray-700">
                <h5 className="font-semibold text-elec-yellow mb-2">Basic Testing</h5>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Continuity testing</li>
                  <li>• Wire map verification</li>
                  <li>• Length measurement</li>
                  <li>• Basic connectivity</li>
                </ul>
              </div>
              
              <div className="bg-[#323232] rounded-lg p-4 border border-gray-700">
                <h5 className="font-semibold text-elec-yellow mb-2">Qualification Testing</h5>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Bandwidth verification</li>
                  <li>• Signal quality assessment</li>
                  <li>• Basic performance metrics</li>
                  <li>• Pass/fail determination</li>
                </ul>
              </div>
              
              <div className="bg-[#323232] rounded-lg p-4 border border-gray-700">
                <h5 className="font-semibold text-elec-yellow mb-2">Certification Testing</h5>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Full parameter testing</li>
                  <li>• Standards compliance</li>
                  <li>• Detailed reporting</li>
                  <li>• Warranty validation</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Common Installation Challenges */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <AlertTriangle className="h-5 w-5 text-elec-yellow" />
            Common Installation Challenges and Solutions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                challenge: "Cable Pulling Tension",
                problem: "Excessive pulling force can damage cable jacket and internal conductors",
                solution: "Use proper pulling techniques, lubrication, and multiple pull points for long runs"
              },
              {
                challenge: "Bend Radius Violations", 
                problem: "Sharp bends can cause signal degradation and permanent cable damage",
                solution: "Maintain minimum 4x cable diameter bend radius, use proper cable management"
              },
              {
                challenge: "Electromagnetic Interference",
                problem: "Nearby electrical equipment can cause signal interference and crosstalk",
                solution: "Maintain proper separation distances, use shielded cable when necessary"
              },
              {
                challenge: "Pathway Congestion",
                problem: "Overcrowded cable trays and conduits can cause installation difficulties",
                solution: "Plan adequate pathway fill ratios, typically 40% maximum for cables"
              },
              {
                challenge: "Environmental Factors",
                problem: "Temperature, humidity, and contamination can affect cable performance",
                solution: "Select appropriate cable ratings and environmental protections"
              }
            ].map((item, index) => (
              <div key={index} className="bg-red-600/20 border border-red-600/30 rounded-lg p-4">
                <h5 className="font-semibold text-red-300 mb-2">{item.challenge}</h5>
                <p className="text-red-100 text-sm mb-2"><strong>Problem:</strong> {item.problem}</p>
                <p className="text-red-100 text-sm"><strong>Solution:</strong> {item.solution}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Future Technologies and Considerations */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Zap className="h-5 w-5 text-elec-yellow" />
            Future Technologies and Migration Planning
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-purple-600/20 border border-purple-600/30 rounded-lg p-4">
            <h4 className="font-semibold text-purple-300 mb-2">Emerging Technologies</h4>
            <div className="grid md:grid-cols-2 gap-4 text-purple-100 text-sm">
              <div>
                <h5 className="font-medium mb-2">Higher Speed Ethernet</h5>
                <ul className="space-y-1">
                  <li>• 25/40 Gigabit Ethernet requirements</li>
                  <li>• 100 Gigabit backbone connections</li>
                  <li>• Advanced cable categories (Cat8)</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium mb-2">Power over Ethernet Plus</h5>
                <ul className="space-y-1">
                  <li>• PoE++ (up to 100W) applications</li>
                  <li>• Smart building integration</li>
                  <li>• IoT device connectivity</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-[#323232] rounded-lg p-4 border border-gray-700">
              <h5 className="font-semibold text-elec-yellow mb-2">Migration Strategies</h5>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Plan for 15-20 year cable lifespan</li>
                <li>• Consider Cat6A minimum for new installations</li>
                <li>• Include fiber backbone for future expansion</li>
                <li>• Design modular systems for easy upgrades</li>
              </ul>
            </div>
            
            <div className="bg-[#323232] rounded-lg p-4 border border-gray-700">
              <h5 className="font-semibold text-elec-yellow mb-2">Cost Considerations</h5>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Higher category cables cost 10-20% more initially</li>
                <li>• Future rewiring costs 5-10x initial installation</li>
                <li>• Consider total cost of ownership</li>
                <li>• Factor in business disruption costs</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Standards */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Shield className="h-5 w-5 text-elec-yellow" />
            Industry Standards
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-600/20 border border-green-600/30 rounded-lg p-4">
              <h4 className="font-semibold text-green-300 mb-2">TIA/EIA Standards</h4>
              <ul className="text-green-100 text-sm space-y-1">
                <li>• TIA-568: Commercial Building Cabling Standard</li>
                <li>• TIA-569: Pathways and Spaces</li>
                <li>• TIA-606: Administration Standard</li>
                <li>• TIA-607: Grounding and Bonding</li>
              </ul>
            </div>
            
            <div className="bg-purple-600/20 border border-purple-600/30 rounded-lg p-4">
              <h4 className="font-semibold text-purple-300 mb-2">ISO/IEC Standards</h4>
              <ul className="text-purple-100 text-sm space-y-1">
                <li>• ISO/IEC 11801: Generic Cabling for Customer Premises</li>
                <li>• ISO/IEC 14763: Implementation and Operation</li>
                <li>• ISO/IEC 61935: Testing Standards</li>
                <li>• ISO/IEC 24764: Data Centres</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};