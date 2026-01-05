
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
  Building,
  Book,
  Award,
  CheckCircle,
  Info,
  ExternalLink,
  Users
} from "lucide-react";

const DomesticReferenceGuide = () => {
  const bs7671References = {
    title: "BS 7671 Key Regulations Reference",
    edition: "18th Edition Amendment 3 (2022)",
    sections: [
      {
        part: "Part 1: Scope, Object and Fundamental Principles",
        keyRegulations: [
          { reg: "110.1", topic: "Scope", description: "Applies to design, erection, and verification of electrical installations" },
          { reg: "131.1-131.8", topic: "Protection for safety", description: "General requirements for protective measures" },
          { reg: "132.1-132.16", topic: "Design", description: "Characteristics of available supply, requirements of the installation" }
        ]
      },
      {
        part: "Part 4: Protection for Safety",
        keyRegulations: [
          { reg: "411.3.3", topic: "RCD Protection", description: "Socket outlets up to 32A require 30mA RCD (except specified exclusions)" },
          { reg: "411.3.4", topic: "Additional RCD", description: "All circuits (domestic) require 30mA RCD protection (AMD3)" },
          { reg: "411.4.5", topic: "TN Disconnection", description: "Maximum disconnection time 0.4s for 32A circuits" },
          { reg: "411.6", topic: "RCD Selection", description: "Type AC, A, F or B depending on load characteristics" },
          { reg: "421.1.201", topic: "Consumer Units", description: "Must be non-combustible material (metal) in domestic premises" },
          { reg: "443.4", topic: "Surge Protection", description: "SPD requirements for protection against transient overvoltages" }
        ]
      },
      {
        part: "Part 5: Selection and Erection",
        keyRegulations: [
          { reg: "522.6.6", topic: "Cable Zones", description: "Cables in walls must be in prescribed zones or protected" },
          { reg: "522.8.1", topic: "Buried Cables", description: "Requirements for cables installed underground" },
          { reg: "526.3", topic: "Connections", description: "Every connection must be accessible for inspection and testing" },
          { reg: "543.1.1", topic: "CPC Cross-section", description: "Minimum protective conductor sizes" },
          { reg: "544.1", topic: "Earthing Arrangements", description: "Main earthing terminal requirements" }
        ]
      },
      {
        part: "Part 6: Inspection and Testing",
        keyRegulations: [
          { reg: "610.1", topic: "Initial Verification", description: "All installations must be inspected and tested before use" },
          { reg: "612.1", topic: "Inspection", description: "Detailed visual inspection requirements" },
          { reg: "612.2", topic: "Testing Sequence", description: "Prescribed sequence of tests" },
          { reg: "631.1", topic: "EICR", description: "Periodic inspection and testing requirements" }
        ]
      },
      {
        part: "Part 7: Special Installations/Locations",
        keyRegulations: [
          { reg: "701", topic: "Bathrooms", description: "Locations containing a bath or shower" },
          { reg: "702", topic: "Swimming Pools", description: "Swimming pools and paddling pools" },
          { reg: "711", topic: "Exhibitions", description: "Exhibitions, shows and stands" },
          { reg: "717", topic: "Mobile Units", description: "Mobile or transportable units" },
          { reg: "722", topic: "EV Charging", description: "Electric vehicle charging installations" }
        ]
      }
    ]
  };

  const ietGuidanceNotes = {
    title: "IET Guidance Notes",
    description: "Published by the IET to provide guidance on BS 7671 requirements",
    notes: [
      {
        number: "GN1",
        title: "Selection & Erection of Equipment",
        content: "Guidance on selecting and installing electrical equipment",
        topics: ["Circuit design", "Cable selection", "Protection coordination", "Installation methods"]
      },
      {
        number: "GN2",
        title: "Isolation & Switching",
        content: "Requirements for switching and isolation devices",
        topics: ["Isolation requirements", "Emergency switching", "Functional switching", "Device selection"]
      },
      {
        number: "GN3",
        title: "Inspection & Testing",
        content: "Detailed guidance on verification procedures",
        topics: ["Test sequences", "Test methods", "Expected results", "Certification"]
      },
      {
        number: "GN5",
        title: "Protection Against Electric Shock",
        content: "Earthing and protective conductors",
        topics: ["Basic protection", "Fault protection", "Additional protection", "Earth electrode systems"]
      },
      {
        number: "GN6",
        title: "Protection Against Overcurrent",
        content: "Overcurrent protection device selection",
        topics: ["Overload protection", "Fault protection", "Discrimination", "Cable sizing"]
      },
      {
        number: "GN7",
        title: "Special Locations",
        content: "Part 7 special installation requirements",
        topics: ["Bathroom zones", "Swimming pools", "Agricultural premises", "Caravan parks"]
      },
      {
        number: "GN8",
        title: "Earthing & Bonding",
        content: "Detailed earthing requirements",
        topics: ["Earthing systems", "Main bonding", "Supplementary bonding", "Earth electrode testing"]
      }
    ],
    additionalPublications: [
      { title: "On-Site Guide", description: "Pocket-sized quick reference for site work" },
      { title: "Electrician's Guide to the Building Regulations", description: "Part P compliance guidance" },
      { title: "Code of Practice for EV Charging", description: "Electric vehicle installation requirements" },
      { title: "Code of Practice for Grid-Connected Solar PV", description: "Solar installation guidance" }
    ]
  };

  const partPRequirementsSummary = {
    title: "Part P Building Regulations Summary",
    applicability: "Electrical installations in dwellings in England and Wales",
    keyPoints: [
      {
        aspect: "What Part P Requires",
        details: [
          "Electrical work must be designed, installed, inspected and tested safely",
          "Work must comply with BS 7671 (current edition)",
          "Notifiable work must be reported to Building Control",
          "Certification must be provided for all work"
        ]
      },
      {
        aspect: "Notifiable Work",
        details: [
          "Installation of a new circuit",
          "Consumer unit replacement or relocation",
          "Work in special locations (bathrooms, kitchens with new circuits)",
          "Outdoor electrical installations",
          "Installation of fixed equipment exceeding 3kW"
        ]
      },
      {
        aspect: "Non-Notifiable Work",
        details: [
          "Replacing accessories (sockets, switches, ceiling roses)",
          "Replacing damaged cable for a single circuit",
          "Re-fixing detached equipment",
          "Adding fused spur to existing circuit (not special location)",
          "Like-for-like consumer unit replacement (same position)"
        ]
      },
      {
        aspect: "Compliance Methods",
        details: [
          "Work by registered Competent Person (self-certification)",
          "Building Notice to Local Authority Building Control",
          "Full Plans application (for major works)",
          "Inspection by Approved Inspector"
        ]
      },
      {
        aspect: "Documentation Required",
        details: [
          "Electrical Installation Certificate (EIC) or MEIWC",
          "Building Regulations Compliance Certificate",
          "Copy to householder within 30 days",
          "Copy to Building Control (if using registered scheme)"
        ]
      }
    ],
    penalties: [
      "Local authority can require work to be altered or removed",
      "Up to £5,000 fine for non-compliance",
      "Problems when selling property without certificates",
      "Insurance implications for non-compliant work"
    ]
  };

  const competentPersonSchemes = {
    title: "Competent Person Schemes",
    description: "Government-authorised schemes allowing qualified electricians to self-certify Part P compliance",
    schemes: [
      {
        name: "NICEIC",
        fullName: "National Inspection Council for Electrical Installation Contracting",
        types: ["Approved Contractor", "Domestic Installer"],
        website: "niceic.com",
        features: ["Technical helpline", "Warranty schemes", "National recognition"]
      },
      {
        name: "NAPIT",
        fullName: "National Association of Professional Inspectors and Testers",
        types: ["Competent Person Scheme", "Domestic Installer"],
        website: "napit.org.uk",
        features: ["Multi-trade schemes", "Training support", "Technical guidance"]
      },
      {
        name: "ELECSA",
        fullName: "Electrical Self-Assessment",
        types: ["Full Scope", "Domestic Installer"],
        website: "elecsa.co.uk",
        features: ["Lower cost option", "Technical support", "Online certification"]
      },
      {
        name: "STROMA",
        fullName: "Stroma Certification",
        types: ["Electrical Competent Person"],
        website: "stroma.com",
        features: ["Combined schemes available", "Online system", "Building regulations support"]
      }
    ],
    registrationRequirements: [
      "Proof of competence (qualifications and experience)",
      "Public liability insurance (minimum £2m typically)",
      "Assessment of work quality",
      "Ongoing technical competence verification",
      "Annual fee payment"
    ],
    benefits: [
      "Self-certify Part P notifiable work",
      "No Building Control fees for notifiable work",
      "Professional recognition and marketing",
      "Technical support and updates",
      "Warranty scheme access"
    ]
  };

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

  const usefulReferences = [
    { resource: "BS 7671:2018+A2:2022", description: "Requirements for Electrical Installations (18th Edition AMD3)" },
    { resource: "IET Wiring Regulations", description: "Published version with commentary" },
    { resource: "IET On-Site Guide", description: "Pocket reference for BS 7671" },
    { resource: "GN3 Inspection & Testing", description: "Detailed testing procedures" },
    { resource: "Electrician's Guide to Building Regs", description: "Part P compliance guidance" },
    { resource: "HSE Guidance Note GS38", description: "Test equipment for electricians" },
    { resource: "IET Code of Practice for EV", description: "Electric vehicle charging installations" }
  ];

  return (
    <div className="space-y-6">
      {/* BS 7671 Key Regulations */}
      <Card className="border-blue-500/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Book className="h-6 w-6 text-blue-400" />
            <CardTitle className="text-blue-300">{bs7671References.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-blue-500/50 bg-blue-500/10">
            <Info className="h-4 w-4 text-blue-400" />
            <AlertDescription className="text-blue-200 text-sm">
              <strong>Current Edition:</strong> {bs7671References.edition}
            </AlertDescription>
          </Alert>

          {bs7671References.sections.map((section, index) => (
            <div key={index} className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
              <h4 className="font-medium text-white mb-3">{section.part}</h4>
              <div className="space-y-2">
                {section.keyRegulations.map((reg, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm">
                    <Badge variant="outline" className="border-blue-400 text-blue-300 text-xs flex-shrink-0 mt-0.5">
                      {reg.reg}
                    </Badge>
                    <div>
                      <span className="text-blue-200 font-medium">{reg.topic}: </span>
                      <span className="text-gray-300">{reg.description}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* IET Guidance Notes */}
      <Card className="border-teal-500/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-teal-400" />
            <CardTitle className="text-teal-300">{ietGuidanceNotes.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-teal-200">{ietGuidanceNotes.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ietGuidanceNotes.notes.map((note, index) => (
              <div key={index} className="bg-teal-500/10 p-3 rounded-lg border border-teal-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="border-teal-400 text-teal-300 text-xs">
                    {note.number}
                  </Badge>
                  <h5 className="font-medium text-white text-sm">{note.title}</h5>
                </div>
                <p className="text-xs text-teal-100 mb-2">{note.content}</p>
                <div className="flex flex-wrap gap-1">
                  {note.topics.map((topic, idx) => (
                    <span key={idx} className="text-xs bg-teal-600/20 text-teal-200 px-2 py-0.5 rounded">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-teal-500/10 p-4 rounded-lg border border-teal-500/20">
            <h4 className="font-medium text-white mb-3">Additional IET Publications</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {ietGuidanceNotes.additionalPublications.map((pub, idx) => (
                <div key={idx} className="text-sm">
                  <span className="text-teal-300 font-medium">{pub.title}: </span>
                  <span className="text-gray-300">{pub.description}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Part P Summary */}
      <Card className="border-rose-500/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Building className="h-6 w-6 text-rose-400" />
            <CardTitle className="text-rose-300">{partPRequirementsSummary.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-rose-500/50 bg-rose-500/10">
            <Info className="h-4 w-4 text-rose-400" />
            <AlertDescription className="text-rose-200 text-sm">
              <strong>Applicability:</strong> {partPRequirementsSummary.applicability}
            </AlertDescription>
          </Alert>

          {partPRequirementsSummary.keyPoints.map((point, index) => (
            <div key={index} className="bg-rose-500/10 p-4 rounded-lg border border-rose-500/20">
              <h4 className="font-medium text-white mb-3">{point.aspect}</h4>
              <ul className="space-y-1">
                {point.details.map((detail, idx) => (
                  <li key={idx} className="text-sm text-rose-100 flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/20">
            <h4 className="font-medium text-red-200 mb-3">Non-Compliance Penalties</h4>
            <ul className="space-y-1">
              {partPRequirementsSummary.penalties.map((penalty, idx) => (
                <li key={idx} className="text-sm text-red-100 flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  {penalty}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Competent Person Schemes */}
      <Card className="border-amber-500/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Award className="h-6 w-6 text-amber-400" />
            <CardTitle className="text-amber-300">{competentPersonSchemes.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-amber-200">{competentPersonSchemes.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {competentPersonSchemes.schemes.map((scheme, index) => (
              <div key={index} className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-white">{scheme.name}</h4>
                  <Badge variant="outline" className="border-amber-400 text-amber-300 text-xs">
                    {scheme.website}
                  </Badge>
                </div>
                <p className="text-xs text-amber-100 mb-2">{scheme.fullName}</p>
                <div className="mb-2">
                  <span className="text-xs text-gray-400">Scheme Types: </span>
                  <span className="text-xs text-gray-300">{scheme.types.join(", ")}</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {scheme.features.map((feature, idx) => (
                    <span key={idx} className="text-xs bg-amber-600/20 text-amber-200 px-2 py-0.5 rounded">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
              <h4 className="font-medium text-white mb-3">Registration Requirements</h4>
              <ul className="space-y-1">
                {competentPersonSchemes.registrationRequirements.map((req, idx) => (
                  <li key={idx} className="text-sm text-amber-100 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-2 flex-shrink-0"></span>
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
              <h4 className="font-medium text-white mb-3">Benefits of Registration</h4>
              <ul className="space-y-1">
                {competentPersonSchemes.benefits.map((benefit, idx) => (
                  <li key={idx} className="text-sm text-amber-100 flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

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
                      <li key={idx} className="text-gray-300 text-xs flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 flex-shrink-0"></span>
                        {challenge}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-green-300 mb-2">Solutions</h5>
                  <ul className="space-y-1">
                    {scenario.solutions.map((solution, idx) => (
                      <li key={idx} className="text-gray-300 text-xs flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-1.5 flex-shrink-0"></span>
                        {solution}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-blue-300 mb-2">Regulations</h5>
                  <ul className="space-y-1">
                    {scenario.regulations.map((regulation, idx) => (
                      <li key={idx} className="text-gray-300 text-xs flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 flex-shrink-0"></span>
                        {regulation}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Practical Installation Techniques */}
      <Card className="border-indigo-500/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Wrench className="h-6 w-6 text-indigo-400" />
            <CardTitle className="text-indigo-300">Practical Installation Techniques</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {practicalTechniques.map((technique, index) => (
            <div key={index} className="bg-indigo-500/10 p-4 rounded-lg border border-indigo-500/20">
              <h4 className="font-medium text-white mb-2">{technique.technique}</h4>
              <p className="text-sm text-gray-300 mb-3">{technique.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {technique.tips.map((tip, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-indigo-200">
                    <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-1.5 flex-shrink-0"></span>
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
                      <li key={idx} className="text-gray-300 text-xs flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 flex-shrink-0"></span>
                        {cause}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-green-300 mb-2">Solutions</h5>
                  <ul className="space-y-1">
                    {problem.solutions.map((solution, idx) => (
                      <li key={idx} className="text-gray-300 text-xs flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-1.5 flex-shrink-0"></span>
                        {solution}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-blue-300 mb-2">Prevention</h5>
                  <p className="text-gray-300 text-xs">{problem.prevention}</p>
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
                        <span className="text-gray-300">{item.item}</span>
                        <span className="text-green-300">{item.cost}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h5 className="font-medium text-green-200 mb-2">Cost Factors</h5>
                  <ul className="space-y-1">
                    {estimate.factors.map((factor, idx) => (
                      <li key={idx} className="text-gray-300 text-xs flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-1.5 flex-shrink-0"></span>
                        {factor}
                      </li>
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
                      <li key={idx} className="text-gray-300 text-xs flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-1.5 flex-shrink-0"></span>
                        {specific}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-yellow-200 mb-2">Key Contacts</h5>
                  <ul className="space-y-1">
                    {region.contacts.map((contact, idx) => (
                      <li key={idx} className="text-gray-300 text-xs flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-1.5 flex-shrink-0"></span>
                        {contact}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Useful References */}
      <Card className="border-cyan-500/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <ExternalLink className="h-6 w-6 text-cyan-400" />
            <CardTitle className="text-cyan-300">Essential Reference Documents</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="bg-cyan-500/10 p-4 rounded-lg border border-cyan-500/20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {usefulReferences.map((ref, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <Book className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-cyan-200 text-sm font-medium">{ref.resource}</span>
                    <p className="text-gray-400 text-xs">{ref.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
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
                <li className="text-gray-300 flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  Identify and isolate all relevant circuits
                </li>
                <li className="text-gray-300 flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  Use appropriate test equipment to prove dead
                </li>
                <li className="text-gray-300 flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  Lock off isolation points and retain keys
                </li>
                <li className="text-gray-300 flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  Post warning notices at isolation points
                </li>
                <li className="text-gray-300 flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  Wear appropriate PPE throughout
                </li>
              </ul>
            </div>

            <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/20">
              <h4 className="font-medium text-red-200 mb-3">During Installation</h4>
              <ul className="space-y-2 text-sm">
                <li className="text-gray-300 flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  Maintain safe isolation throughout work
                </li>
                <li className="text-gray-300 flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  Use proper lifting techniques for heavy items
                </li>
                <li className="text-gray-300 flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  Ensure adequate lighting and ventilation
                </li>
                <li className="text-gray-300 flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  Keep work areas clean and hazard-free
                </li>
                <li className="text-gray-300 flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  Never work alone on high-risk activities
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Project Timeline */}
      <Card className="border-violet-500/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Clock className="h-6 w-6 text-violet-400" />
            <CardTitle className="text-violet-300">Typical Project Timeline</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-violet-500/10 p-4 rounded-lg border border-violet-500/20">
              <h4 className="font-medium text-white mb-3">Full House Rewire (3-bedroom)</h4>
              <div className="grid grid-cols-2 md:grid-cols-7 gap-2 text-sm">
                <div className="text-center">
                  <div className="font-medium text-violet-200">Day 1</div>
                  <div className="text-xs text-gray-300">Site setup & first fix start</div>
                </div>
                <div className="text-center">
                  <div className="font-medium text-violet-200">Day 2-3</div>
                  <div className="text-xs text-gray-300">First fix installation</div>
                </div>
                <div className="text-center">
                  <div className="font-medium text-violet-200">Day 4</div>
                  <div className="text-xs text-gray-300">Consumer unit installation</div>
                </div>
                <div className="text-center">
                  <div className="font-medium text-violet-200">Day 5</div>
                  <div className="text-xs text-gray-300">Second fix installation</div>
                </div>
                <div className="text-center">
                  <div className="font-medium text-violet-200">Day 6</div>
                  <div className="text-xs text-gray-300">Testing & commissioning</div>
                </div>
                <div className="text-center">
                  <div className="font-medium text-violet-200">Day 7</div>
                  <div className="text-xs text-gray-300">Certification & handover</div>
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
