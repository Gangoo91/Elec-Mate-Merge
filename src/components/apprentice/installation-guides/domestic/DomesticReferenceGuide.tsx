
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  FileText, 
  Calculator, 
  AlertTriangle, 
  Clock, 
  MapPin,
  Shield,
  Wrench,
  Building
} from "lucide-react";

const DomesticReferenceGuide = () => {
  const advancedScenarios = [
    {
      scenario: "Listed Building Rewire",
      challenges: ["Historic fabric preservation", "Hidden cable routes", "Conservation approval"],
      solutions: ["Surface-mounted trunking in appropriate areas", "Minimal intervention routes", "Period-appropriate accessories"],
      regulations: ["Listed Building Consent", "Conservation Area guidelines", "BS 7671 compliance"]
    },
    {
      scenario: "Solar PV Integration",
      challenges: ["DC isolation requirements", "Grid connection", "Generation metering"],
      solutions: ["DC isolator positioning", "G98/G99 compliance", "Export limitation devices"],
      regulations: ["G98/G99 Grid Codes", "MCS installation standards", "DNO notifications"]
    },
    {
      scenario: "Electric Vehicle Charging",
      challenges: ["High current demand", "Load management", "Installation location"],
      solutions: ["Dedicated circuit design", "Smart charging systems", "Earthing arrangements"],
      regulations: ["IET Code of Practice", "Building Regulations Part S", "BS EN 61851"]
    }
  ];

  const practicalTechniques = [
    {
      technique: "Cable Route Planning",
      description: "Efficient planning minimises cable length and installation time",
      tips: [
        "Use shortest practical routes avoiding obstacles",
        "Group circuits logically to reduce containment",
        "Plan for future access and modifications",
        "Consider thermal effects of grouped cables"
      ]
    },
    {
      technique: "Consumer Unit Positioning",
      description: "Strategic placement improves safety and accessibility",
      tips: [
        "Height: 1.2m to 1.4m from floor level",
        "Clear access space of 600mm minimum",
        "Away from heat sources and moisture",
        "Consider emergency access requirements"
      ]
    },
    {
      technique: "Cable Management",
      description: "Professional installation techniques for longevity",
      tips: [
        "Proper support intervals per cable type",
        "Avoid sharp bends and mechanical stress",
        "Use appropriate containment systems",
        "Label circuits clearly at both ends"
      ]
    }
  ];

  const commonProblems = [
    {
      problem: "High Earth Fault Loop Impedance",
      causes: ["Poor earth connections", "Long cable runs", "High supply impedance"],
      solutions: ["Improve earth bonding", "Upgrade cable sizes", "Install RCD protection"],
      prevention: "Regular testing and maintenance of earth systems"
    },
    {
      problem: "RCD Nuisance Tripping",
      causes: ["High background leakage", "Moisture ingress", "Damaged appliances"],
      solutions: ["Split RCD protection", "Identify leakage sources", "Use RCBO protection"],
      prevention: "Regular insulation resistance testing"
    },
    {
      problem: "Voltage Drop Issues",
      causes: ["Undersized cables", "Long circuit runs", "High load currents"],
      solutions: ["Increase cable size", "Reduce circuit length", "Split loads"],
      prevention: "Proper design calculations during planning"
    }
  ];

  const costEstimation = [
    {
      category: "Full House Rewire (3-bed)",
      breakdown: [
        { item: "Materials (cables, accessories)", cost: "£800-£1,200" },
        { item: "Consumer unit upgrade", cost: "£400-£800" },
        { item: "Labour (5-7 days)", cost: "£2,000-£3,500" },
        { item: "Testing & certification", cost: "£200-£400" },
        { item: "Building control notification", cost: "£150-£300" }
      ],
      total: "£3,550-£6,200",
      factors: ["Property size", "Accessibility", "Special requirements", "Regional variations"]
    },
    {
      category: "Kitchen Rewire",
      breakdown: [
        { item: "Circuit cables & accessories", cost: "£300-£500" },
        { item: "Additional RCD protection", cost: "£100-£200" },
        { item: "Labour (2-3 days)", cost: "£800-£1,500" },
        { item: "Testing & certification", cost: "£150-£250" }
      ],
      total: "£1,350-£2,450",
      factors: ["Number of circuits", "Appliance requirements", "Access complexity"]
    }
  ];

  const regionalConsiderations = [
    {
      region: "Scotland",
      specifics: ["Building Standards compliance", "Different notification procedures"],
      contacts: ["Local Building Standards department", "SELECT registered electricians"]
    },
    {
      region: "Northern Ireland",
      specifics: ["Building Regulations (NI)", "Different competent person schemes"],
      contacts: ["Building Control NI", "NICEIC/NAPIT schemes"]
    },
    {
      region: "Wales",
      specifics: ["Welsh Building Regulations", "Bilingual documentation"],
      contacts: ["Local Authority Building Control", "Welsh Government guidance"]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Advanced Installation Scenarios */}
      <Card className="border-purple-500/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Building className="h-6 w-6 text-purple-400" />
            <CardTitle className="text-purple-300">Advanced Installation Scenarios</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {advancedScenarios.map((scenario, index) => (
            <div key={index} className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
              <h4 className="font-medium text-white mb-3">{scenario.scenario}</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <h5 className="font-medium text-red-300 mb-2">Challenges</h5>
                  <ul className="space-y-1">
                    {scenario.challenges.map((challenge, idx) => (
                      <li key={idx} className="text-muted-foreground text-xs">• {challenge}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-green-300 mb-2">Solutions</h5>
                  <ul className="space-y-1">
                    {scenario.solutions.map((solution, idx) => (
                      <li key={idx} className="text-muted-foreground text-xs">• {solution}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-blue-300 mb-2">Regulations</h5>
                  <ul className="space-y-1">
                    {scenario.regulations.map((regulation, idx) => (
                      <li key={idx} className="text-muted-foreground text-xs">• {regulation}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Practical Installation Techniques */}
      <Card className="border-blue-500/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Wrench className="h-6 w-6 text-blue-400" />
            <CardTitle className="text-blue-300">Practical Installation Techniques</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {practicalTechniques.map((technique, index) => (
            <div key={index} className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
              <h4 className="font-medium text-white mb-2">{technique.technique}</h4>
              <p className="text-sm text-muted-foreground mb-3">{technique.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {technique.tips.map((tip, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-blue-200">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 flex-shrink-0"></span>
                    {tip}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Common Problems & Solutions */}
      <Card className="border-orange-500/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-orange-400" />
            <CardTitle className="text-orange-300">Common Problems & Solutions</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {commonProblems.map((problem, index) => (
            <div key={index} className="bg-orange-500/10 p-4 rounded-lg border border-orange-500/20">
              <h4 className="font-medium text-white mb-3">{problem.problem}</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-3">
                <div>
                  <h5 className="font-medium text-red-300 mb-2">Common Causes</h5>
                  <ul className="space-y-1">
                    {problem.causes.map((cause, idx) => (
                      <li key={idx} className="text-muted-foreground text-xs">• {cause}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-green-300 mb-2">Solutions</h5>
                  <ul className="space-y-1">
                    {problem.solutions.map((solution, idx) => (
                      <li key={idx} className="text-muted-foreground text-xs">• {solution}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-blue-300 mb-2">Prevention</h5>
                  <p className="text-muted-foreground text-xs">{problem.prevention}</p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Cost Estimation & Project Management */}
      <Card className="border-green-500/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Calculator className="h-6 w-6 text-green-400" />
            <CardTitle className="text-green-300">Cost Estimation & Project Management</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {costEstimation.map((estimate, index) => (
            <div key={index} className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-white">{estimate.category}</h4>
                <Badge variant="outline" className="border-green-400 text-green-300">
                  Total: {estimate.total}
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-green-200 mb-2">Cost Breakdown</h5>
                  <div className="space-y-1">
                    {estimate.breakdown.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-xs">
                        <span className="text-muted-foreground">{item.item}</span>
                        <span className="text-green-300">{item.cost}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h5 className="font-medium text-green-200 mb-2">Cost Factors</h5>
                  <ul className="space-y-1">
                    {estimate.factors.map((factor, idx) => (
                      <li key={idx} className="text-muted-foreground text-xs">• {factor}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Regional Considerations */}
      <Card className="border-yellow-500/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <MapPin className="h-6 w-6 text-yellow-400" />
            <CardTitle className="text-yellow-300">UK Regional Considerations</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {regionalConsiderations.map((region, index) => (
            <div key={index} className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/20">
              <h4 className="font-medium text-white mb-3">{region.region}</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h5 className="font-medium text-yellow-200 mb-2">Regional Specifics</h5>
                  <ul className="space-y-1">
                    {region.specifics.map((specific, idx) => (
                      <li key={idx} className="text-muted-foreground text-xs">• {specific}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-yellow-200 mb-2">Key Contacts</h5>
                  <ul className="space-y-1">
                    {region.contacts.map((contact, idx) => (
                      <li key={idx} className="text-muted-foreground text-xs">• {contact}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Safety Deep Dive */}
      <Card className="border-red-500/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-red-400" />
            <CardTitle className="text-red-300">Safety Deep Dive</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-red-500/50 bg-red-500/10">
            <AlertTriangle className="h-4 w-4 text-red-400" />
            <AlertDescription className="text-red-200">
              <strong>Critical Safety Points:</strong> These safety considerations can prevent serious injury or death. Never compromise on safety procedures.
            </AlertDescription>
          </Alert>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/20">
              <h4 className="font-medium text-red-200 mb-3">Before Starting Work</h4>
              <ul className="space-y-2 text-sm">
                <li className="text-muted-foreground">• Identify and isolate all relevant circuits</li>
                <li className="text-muted-foreground">• Use appropriate test equipment to prove dead</li>
                <li className="text-muted-foreground">• Lock off isolation points and retain keys</li>
                <li className="text-muted-foreground">• Post warning notices at isolation points</li>
                <li className="text-muted-foreground">• Wear appropriate PPE throughout</li>
              </ul>
            </div>
            
            <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/20">
              <h4 className="font-medium text-red-200 mb-3">During Installation</h4>
              <ul className="space-y-2 text-sm">
                <li className="text-muted-foreground">• Maintain safe isolation throughout work</li>
                <li className="text-muted-foreground">• Use proper lifting techniques for heavy items</li>
                <li className="text-muted-foreground">• Ensure adequate lighting and ventilation</li>
                <li className="text-muted-foreground">• Keep work areas clean and hazard-free</li>
                <li className="text-muted-foreground">• Never work alone on high-risk activities</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Project Timeline */}
      <Card className="border-indigo-500/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Clock className="h-6 w-6 text-indigo-400" />
            <CardTitle className="text-indigo-300">Typical Project Timeline</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-indigo-500/10 p-4 rounded-lg border border-indigo-500/20">
              <h4 className="font-medium text-white mb-3">Full House Rewire (3-bedroom)</h4>
              <div className="grid grid-cols-1 md:grid-cols-7 gap-2 text-sm">
                <div className="text-center">
                  <div className="font-medium text-indigo-200">Day 1</div>
                  <div className="text-xs text-muted-foreground">Site setup & first fix start</div>
                </div>
                <div className="text-center">
                  <div className="font-medium text-indigo-200">Day 2-3</div>
                  <div className="text-xs text-muted-foreground">First fix installation</div>
                </div>
                <div className="text-center">
                  <div className="font-medium text-indigo-200">Day 4</div>
                  <div className="text-xs text-muted-foreground">Consumer unit installation</div>
                </div>
                <div className="text-center">
                  <div className="font-medium text-indigo-200">Day 5</div>
                  <div className="text-xs text-muted-foreground">Second fix installation</div>
                </div>
                <div className="text-center">
                  <div className="font-medium text-indigo-200">Day 6</div>
                  <div className="text-xs text-muted-foreground">Testing & commissioning</div>
                </div>
                <div className="text-center">
                  <div className="font-medium text-indigo-200">Day 7</div>
                  <div className="text-xs text-muted-foreground">Certification & handover</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DomesticReferenceGuide;
