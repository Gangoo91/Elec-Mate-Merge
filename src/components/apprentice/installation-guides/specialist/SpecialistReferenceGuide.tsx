
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Book,
  Award,
  GraduationCap,
  Building,
  FileText,
  ExternalLink,
  CheckCircle,
  Info,
  Shield,
  Sun,
  Car,
  Zap,
  Users,
  ClipboardList,
  BookOpen,
  Globe,
  Phone,
  Mail,
  Lightbulb,
  Target,
  TrendingUp
} from "lucide-react";

const SpecialistReferenceGuide = () => {
  // BS 7671 Part 7 Quick Reference
  const bs7671Part7Sections = [
    { section: "701", title: "Locations Containing a Bath or Shower", applicability: "Bathrooms, shower rooms, en-suites", keyRegulation: "Zones 0-2, supplementary bonding, IP ratings" },
    { section: "702", title: "Swimming Pools and Paddling Pools", applicability: "Pools, hot tubs, fountains", keyRegulation: "SELV 12V max, enhanced bonding, zones" },
    { section: "703", title: "Rooms Containing Sauna Heaters", applicability: "Saunas, steam rooms", keyRegulation: "Temperature zones, heat-resistant cables" },
    { section: "704", title: "Construction and Demolition Sites", applicability: "Temporary site installations", keyRegulation: "110V CTE, RCD protection, IP44" },
    { section: "705", title: "Agricultural and Horticultural Premises", applicability: "Farms, livestock areas, greenhouses", keyRegulation: "25V touch voltage, enhanced bonding" },
    { section: "706", title: "Restrictive Conductive Locations", applicability: "Inside tanks, boilers, vessels", keyRegulation: "SELV only, max 25V AC" },
    { section: "708", title: "Caravan and Camping Parks", applicability: "Pitch supplies, touring sites", keyRegulation: "Individual RCD per socket, TT earthing" },
    { section: "709", title: "Marinas and Similar Locations", applicability: "Boat berths, pontoons", keyRegulation: "No PME, IP56+, TT only" },
    { section: "710", title: "Medical Locations", applicability: "Hospitals, surgeries, clinics", keyRegulation: "Group 0/1/2, IT systems in theatres" },
    { section: "711", title: "Exhibitions, Shows and Stands", applicability: "Trade shows, exhibitions", keyRegulation: "Temporary wiring, pre-event inspection" },
    { section: "712", title: "Solar Photovoltaic Systems", applicability: "Solar PV installations", keyRegulation: "DC isolation, arc fault protection" },
    { section: "717", title: "Mobile or Transportable Units", applicability: "Mobile homes, portacabins", keyRegulation: "PME measures, external isolation" },
    { section: "721", title: "Electrical Installations in Caravans", applicability: "Internal caravan wiring", keyRegulation: "Double-pole isolation, bonding" },
    { section: "722", title: "Electric Vehicle Charging", applicability: "EV charge points", keyRegulation: "Type A/B RCD, O-PEN device" },
    { section: "729", title: "Operating and Maintenance Gangways", applicability: "Switchroom access", keyRegulation: "Clearances, emergency lighting" },
    { section: "740", title: "Temporary Electrical Installations", applicability: "Fairgrounds, festivals", keyRegulation: "Daily inspection, emergency stops" },
    { section: "753", title: "Floor and Ceiling Heating Systems", applicability: "Electric UFH, heated ceilings", keyRegulation: "RCD protection, thermal limits" }
  ];

  // IET Guidance Note 7 Overview
  const gn7Contents = {
    title: "IET Guidance Note 7: Special Locations",
    edition: "6th Edition (2022)",
    description: "Essential companion to BS 7671 Part 7, providing detailed explanations, diagrams, and practical guidance for special locations",
    chapters: [
      { chapter: "1", title: "Introduction", content: "General principles and application of Part 7" },
      { chapter: "2", title: "Locations containing a bath or shower", content: "Detailed zone diagrams, equipment selection" },
      { chapter: "3", title: "Swimming pools", content: "Pool zone layouts, SELV requirements, equipment selection" },
      { chapter: "4", title: "Sauna heaters", content: "Temperature zones, cable selection tables" },
      { chapter: "5", title: "Construction sites", content: "110V systems, transformer specifications, TT earthing" },
      { chapter: "6", title: "Agricultural premises", content: "Livestock protection, bonding requirements" },
      { chapter: "7", title: "Restrictive conductive locations", content: "SELV implementation, equipment requirements" },
      { chapter: "8", title: "Caravan and camping parks", content: "Supply pillar design, earthing options" },
      { chapter: "9", title: "Marinas", content: "Shore supply design, corrosion protection" },
      { chapter: "10", title: "Medical locations", content: "Group classifications, IT system design" },
      { chapter: "11", title: "Exhibitions", content: "Temporary installation requirements" },
      { chapter: "12", title: "Solar PV", content: "DC system design, testing procedures" },
      { chapter: "13", title: "Mobile units", content: "Connection requirements, PME considerations" },
      { chapter: "14", title: "EV charging", content: "Installation design, earthing arrangements" },
      { chapter: "15", title: "Temporary installations", content: "Fairground and outdoor event requirements" }
    ]
  };

  // Certification Requirements by Installation Type
  const certificationRequirements = [
    {
      installationType: "Standard Special Location",
      certificates: [
        { type: "EIC", description: "Electrical Installation Certificate", required: true },
        { type: "Schedule of Inspections", description: "With Part 7 specific items noted", required: true },
        { type: "Schedule of Test Results", description: "Including additional special location tests", required: true }
      ],
      additionalNotes: "Schedule of inspections should identify which Part 7 section applies"
    },
    {
      installationType: "Solar PV Systems",
      certificates: [
        { type: "EIC", description: "BS 7671 Electrical Installation Certificate", required: true },
        { type: "MCS Certificate", description: "MCS Installation Certificate (for incentives)", required: false },
        { type: "G98 Notification", description: "DNO notification for grid connection", required: true },
        { type: "Commissioning Record", description: "Inverter and system commissioning data", required: true }
      ],
      additionalNotes: "MCS required for Smart Export Guarantee eligibility"
    },
    {
      installationType: "EV Charging Points",
      certificates: [
        { type: "EIC", description: "BS 7671 Electrical Installation Certificate", required: true },
        { type: "OZEV Documentation", description: "Government grant scheme paperwork", required: false },
        { type: "Commissioning Certificate", description: "Charger-specific commissioning", required: true },
        { type: "Smart Charging Compliance", description: "Device Regulations compliance", required: true }
      ],
      additionalNotes: "OZEV approved installer scheme membership may be required for grants"
    },
    {
      installationType: "Swimming Pool Installation",
      certificates: [
        { type: "EIC", description: "With Section 702 identified", required: true },
        { type: "Zone Diagram", description: "As-installed zone dimensions", required: true },
        { type: "Bonding Schedule", description: "All bonded items documented", required: true }
      ],
      additionalNotes: "Underwater equipment certificates should be retained"
    },
    {
      installationType: "Medical Location",
      certificates: [
        { type: "EIC", description: "With Section 710 and Group noted", required: true },
        { type: "IT System Verification", description: "IMD commissioning records", required: true },
        { type: "Emergency Power Test", description: "Switchover time verification", required: true },
        { type: "Bonding Schedule", description: "Patient environment bonding", required: true }
      ],
      additionalNotes: "HTM 06-01 compliance may also be required"
    }
  ];

  // Industry Bodies and Schemes
  const industrySchemes = [
    {
      name: "MCS",
      fullName: "Microgeneration Certification Scheme",
      purpose: "Certification for renewable energy installations",
      website: "mcscertified.com",
      applicableTo: ["Solar PV", "Heat pumps", "Small wind", "Biomass"],
      requirements: [
        "Company registration with MCS",
        "Individual installer certification",
        "Annual surveillance audits",
        "Compliance with MCS installation standards"
      ],
      benefits: [
        "Access to Smart Export Guarantee",
        "Consumer confidence through quality assurance",
        "Required for most renewable energy incentives"
      ]
    },
    {
      name: "OZEV",
      fullName: "Office for Zero Emission Vehicles",
      purpose: "Government body overseeing EV charging grants",
      website: "gov.uk/government/organisations/office-for-zero-emission-vehicles",
      applicableTo: ["EV charging installations"],
      requirements: [
        "OZEV approved installer status",
        "Compliance with installation requirements",
        "Grant application procedures",
        "Post-installation notification"
      ],
      benefits: [
        "Customer access to government grants",
        "Approved installer listing",
        "Enhanced credibility"
      ]
    },
    {
      name: "NICEIC",
      fullName: "National Inspection Council for Electrical Installation Contracting",
      purpose: "Electrical competent person scheme operator",
      website: "niceic.com",
      applicableTo: ["All electrical installations", "Part P self-certification"],
      requirements: [
        "Technical assessment",
        "Public liability insurance",
        "Ongoing technical competence",
        "Quality audits"
      ],
      benefits: [
        "Part P self-certification",
        "Find a Contractor listing",
        "Technical helpline access",
        "Insurance-backed warranties"
      ]
    },
    {
      name: "NAPIT",
      fullName: "National Association of Professional Inspectors and Testers",
      purpose: "Multi-discipline competent person scheme",
      website: "napit.org.uk",
      applicableTo: ["Electrical", "Renewables", "Building services"],
      requirements: [
        "Qualification verification",
        "Technical assessment",
        "Insurance requirements",
        "Ongoing CPD"
      ],
      benefits: [
        "Multi-trade registration",
        "Competent person scheme",
        "Training provider access"
      ]
    },
    {
      name: "ELECSA",
      fullName: "Electrical Self-Assessment",
      purpose: "Electrical competent person scheme",
      website: "elecsa.co.uk",
      applicableTo: ["Domestic and commercial electrical"],
      requirements: [
        "Electrician registration",
        "Technical assessment",
        "Insurance requirements"
      ],
      benefits: [
        "Part P self-certification",
        "Online portal",
        "Technical support"
      ]
    },
    {
      name: "ECA",
      fullName: "Electrical Contractors' Association",
      purpose: "Trade association for electrical contractors",
      website: "eca.co.uk",
      applicableTo: ["Electrical contractors"],
      requirements: [
        "Business membership",
        "Competence demonstration",
        "Financial stability"
      ],
      benefits: [
        "Industry representation",
        "Technical resources",
        "Contract and legal support"
      ]
    }
  ];

  // Further Training and Qualifications
  const qualificationsPathways = [
    {
      area: "Solar PV Installation",
      qualifications: [
        { name: "City & Guilds 2399-11", level: "Level 3", description: "Award in Solar PV Installation" },
        { name: "EAL Level 3 Award", level: "Level 3", description: "Installing Solar Photovoltaic Systems" },
        { name: "MCS Installer Certification", level: "Industry", description: "Required for MCS company registration" }
      ],
      prerequisites: ["Full electrical qualification (e.g., 2391, AM2)"],
      careerPath: "Electrician to Solar PV Specialist to MCS Assessor"
    },
    {
      area: "EV Charging Installation",
      qualifications: [
        { name: "City & Guilds 2919-01", level: "Level 3", description: "Electric Vehicle Charging Equipment Installation" },
        { name: "EAL Level 3 Award", level: "Level 3", description: "EV Charging Point Installation" },
        { name: "OZEV Approved Installer", level: "Industry", description: "Required for government grant work" }
      ],
      prerequisites: ["18th Edition certification", "Inspection and testing (2391)"],
      careerPath: "Electrician to EV Specialist to Fleet/Commercial EV Lead"
    },
    {
      area: "Inspection and Testing",
      qualifications: [
        { name: "City & Guilds 2391-52", level: "Level 3", description: "Initial and Periodic Inspection and Testing" },
        { name: "EAL Level 3 Award", level: "Level 3", description: "Electrical Inspection and Testing" },
        { name: "City & Guilds 2391-50", level: "Level 3", description: "Initial Verification only" }
      ],
      prerequisites: ["NVQ Level 3 Electrical or equivalent experience"],
      careerPath: "Electrician to Approved Inspector to Technical Auditor"
    },
    {
      area: "Design and Verification",
      qualifications: [
        { name: "City & Guilds 2396", level: "Level 4", description: "Design and Verification of Electrical Installations" },
        { name: "EAL Level 4 Award", level: "Level 4", description: "Electrical Installation Design" }
      ],
      prerequisites: ["2391 or equivalent", "Extensive practical experience"],
      careerPath: "Inspector to Electrical Designer to Project Manager"
    },
    {
      area: "Building Regulations",
      qualifications: [
        { name: "City & Guilds 2393", level: "Level 3", description: "Building Regulations for Electrical Installations" },
        { name: "Part P Training", level: "CPD", description: "Various provider courses available" }
      ],
      prerequisites: ["18th Edition"],
      careerPath: "Understanding of compliance requirements"
    },
    {
      area: "18th Edition BS 7671",
      qualifications: [
        { name: "City & Guilds 2382-22", level: "Level 3", description: "18th Edition Wiring Regulations" },
        { name: "EAL Level 3 Award", level: "Level 3", description: "Requirements for Electrical Installations" }
      ],
      prerequisites: ["None formal, but electrical background assumed"],
      careerPath: "Foundation for all electrical work qualifications"
    }
  ];

  // Useful Resources and Links
  const usefulResources = [
    {
      category: "Official Standards",
      resources: [
        { name: "BS 7671:2018+A2:2022", description: "Requirements for Electrical Installations (18th Edition)", source: "BSI" },
        { name: "IET Wiring Regulations", description: "Published version with commentary", source: "IET" },
        { name: "IET Guidance Note 7", description: "Special Locations guidance", source: "IET" },
        { name: "IET On-Site Guide", description: "Pocket reference for site work", source: "IET" }
      ]
    },
    {
      category: "Codes of Practice",
      resources: [
        { name: "IET Code of Practice for EV Charging", description: "Electric vehicle installation guidance", source: "IET" },
        { name: "IET Code of Practice for Grid-Connected Solar PV", description: "Solar installation guidance", source: "IET" },
        { name: "HTM 06-01", description: "Electrical services in healthcare premises", source: "NHS" },
        { name: "BS 5266", description: "Emergency lighting requirements", source: "BSI" }
      ]
    },
    {
      category: "HSE Guidance",
      resources: [
        { name: "GS38", description: "Electrical test equipment for use by electricians", source: "HSE" },
        { name: "HSR25", description: "Memorandum of guidance on Electricity at Work Regulations", source: "HSE" },
        { name: "INDG231", description: "Electrical safety and you", source: "HSE" },
        { name: "HSG85", description: "Electricity at work - Safe working practices", source: "HSE" }
      ]
    },
    {
      category: "Grid Connection",
      resources: [
        { name: "G98", description: "Requirements for micro-generation connection", source: "ENA" },
        { name: "G99", description: "Requirements for larger generator connection", source: "ENA" },
        { name: "G100", description: "Technical requirements for customer export limiting schemes", source: "ENA" },
        { name: "DNO Connections Guide", description: "Individual DNO application processes", source: "Various DNOs" }
      ]
    },
    {
      category: "Industry Organisations",
      resources: [
        { name: "IET", description: "Institution of Engineering and Technology", source: "theiet.org" },
        { name: "ECA", description: "Electrical Contractors' Association", source: "eca.co.uk" },
        { name: "SELECT", description: "Scotland's electrical trade body", source: "select.org.uk" },
        { name: "JIB", description: "Joint Industry Board for electrical industry", source: "jib.org.uk" }
      ]
    },
    {
      category: "Online Tools",
      resources: [
        { name: "IET Forums", description: "Technical discussion and Q&A", source: "theiet.org/forums" },
        { name: "Electrical Safety First", description: "Consumer safety information and resources", source: "electricalsafetyfirst.org.uk" },
        { name: "NICEIC Technical Helpline", description: "For registered contractors", source: "niceic.com" },
        { name: "Cable Calculator Tools", description: "Various manufacturer calculators", source: "Multiple" }
      ]
    }
  ];

  // Quick Reference IP Ratings
  const ipRatingsTable = [
    { rating: "IP20", firstDigit: "Touch by fingers", secondDigit: "No water protection", typical: "Indoor general" },
    { rating: "IP44", firstDigit: "Tools/wires 1mm+", secondDigit: "Splashing water", typical: "Construction sites" },
    { rating: "IP54", firstDigit: "Dust protected", secondDigit: "Splashing water", typical: "Industrial" },
    { rating: "IP55", firstDigit: "Dust protected", secondDigit: "Water jets", typical: "Outdoor general" },
    { rating: "IP56", firstDigit: "Dust protected", secondDigit: "Heavy seas/jets", typical: "Marinas" },
    { rating: "IP65", firstDigit: "Dust tight", secondDigit: "Water jets", typical: "Washdown areas" },
    { rating: "IP66", firstDigit: "Dust tight", secondDigit: "Powerful jets", typical: "Milking parlours" },
    { rating: "IP67", firstDigit: "Dust tight", secondDigit: "Temporary immersion", typical: "Pool surrounds" },
    { rating: "IP68", firstDigit: "Dust tight", secondDigit: "Continuous immersion", typical: "Underwater" },
    { rating: "IPX4", firstDigit: "Not specified", secondDigit: "Splashing water", typical: "Bathrooms Zone 2" },
    { rating: "IPX5", firstDigit: "Not specified", secondDigit: "Water jets", typical: "Bathrooms Zone 1 (jets)" },
    { rating: "IPX7", firstDigit: "Not specified", secondDigit: "Temp immersion", typical: "Bathrooms Zone 0" }
  ];

  // RCD Types Reference
  const rcdTypesTable = [
    { type: "Type AC", detects: "AC residual currents only", applications: "General circuits without electronics", notes: "Minimum for most circuits" },
    { type: "Type A", detects: "AC + pulsating DC", applications: "EV charging, electronics, inverters", notes: "Required for EV, PV inverters" },
    { type: "Type F", detects: "AC + pulsating DC + mixed frequency", applications: "VFDs, frequency inverters", notes: "For variable frequency equipment" },
    { type: "Type B", detects: "AC + pulsating DC + smooth DC", applications: "Three-phase EV charging, PV", notes: "Highest protection level" }
  ];

  return (
    <div className="space-y-6">
      {/* BS 7671 Part 7 Quick Reference */}
      <Card className="border-blue-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Book className="h-6 w-6 text-blue-400" />
            <CardTitle className="text-blue-300">BS 7671 Part 7 Quick Reference</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-blue-500/50 bg-blue-500/10">
            <Info className="h-4 w-4 text-blue-400" />
            <AlertDescription className="text-blue-200 text-sm">
              Part 7 supplements the general requirements of Parts 1-6. Where there is any conflict,
              Part 7 requirements take precedence for the specific installation type.
            </AlertDescription>
          </Alert>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-blue-500/30">
                  <th className="text-left py-2 text-blue-200">Section</th>
                  <th className="text-left py-2 text-blue-200">Title</th>
                  <th className="text-left py-2 text-blue-200">Applicability</th>
                  <th className="text-left py-2 text-blue-200">Key Requirement</th>
                </tr>
              </thead>
              <tbody>
                {bs7671Part7Sections.map((section, idx) => (
                  <tr key={idx} className="border-b border-blue-500/20 hover:bg-blue-500/5">
                    <td className="py-2">
                      <Badge variant="outline" className="border-blue-400 text-blue-300">
                        {section.section}
                      </Badge>
                    </td>
                    <td className="py-2 text-white font-medium">{section.title}</td>
                    <td className="py-2 text-white">{section.applicability}</td>
                    <td className="py-2 text-white text-xs">{section.keyRegulation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* IET Guidance Note 7 Overview */}
      <Card className="border-teal-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-teal-400" />
            <CardTitle className="text-teal-300">{gn7Contents.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-teal-500/10 p-4 rounded-lg border border-teal-500/20">
            <div className="flex items-center justify-between mb-3">
              <span className="text-teal-200 font-medium">{gn7Contents.edition}</span>
              <Badge variant="outline" className="border-teal-400 text-teal-300">Essential Reference</Badge>
            </div>
            <p className="text-sm text-white">{gn7Contents.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {gn7Contents.chapters.map((chapter, idx) => (
              <div key={idx} className="bg-teal-500/10 p-3 rounded border border-teal-500/20">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="border-teal-400 text-teal-300 text-xs">
                    Ch.{chapter.chapter}
                  </Badge>
                  <span className="text-white text-sm font-medium">{chapter.title}</span>
                </div>
                <p className="text-xs text-white">{chapter.content}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Certification Requirements */}
      <Card className="border-purple-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <ClipboardList className="h-6 w-6 text-purple-400" />
            <CardTitle className="text-purple-300">Certification Requirements by Installation Type</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {certificationRequirements.map((cert, idx) => (
            <div key={idx} className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
              <h4 className="font-medium text-purple-200 mb-3">{cert.installationType}</h4>

              <div className="space-y-2 mb-3">
                {cert.certificates.map((doc, docIdx) => (
                  <div key={docIdx} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-purple-400" />
                      <span className="text-white">{doc.type}</span>
                      <span className="text-white">- {doc.description}</span>
                    </div>
                    <Badge
                      variant="outline"
                      className={doc.required
                        ? "border-green-400 text-green-300"
                        : "border-white/50 text-white"}
                    >
                      {doc.required ? "Required" : "Optional"}
                    </Badge>
                  </div>
                ))}
              </div>

              <p className="text-xs text-white italic">{cert.additionalNotes}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Industry Bodies and Schemes */}
      <Card className="border-amber-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Building className="h-6 w-6 text-amber-400" />
            <CardTitle className="text-amber-300">Industry Bodies & Certification Schemes</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {industrySchemes.map((scheme, idx) => (
              <div key={idx} className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-amber-200">{scheme.name}</h4>
                  <Badge variant="outline" className="border-amber-400 text-amber-300 text-xs">
                    <Globe className="h-3 w-3 mr-1" />
                    {scheme.website}
                  </Badge>
                </div>
                <p className="text-sm text-white mb-2">{scheme.fullName}</p>
                <p className="text-xs text-white mb-3">{scheme.purpose}</p>

                <div className="flex flex-wrap gap-1 mb-3">
                  {scheme.applicableTo.map((app, appIdx) => (
                    <span key={appIdx} className="text-xs bg-amber-600/20 text-amber-200 px-2 py-0.5 rounded">
                      {app}
                    </span>
                  ))}
                </div>

                <div className="text-xs">
                  <div className="text-amber-300 mb-1">Key Benefits:</div>
                  <ul className="space-y-0.5 text-white">
                    {scheme.benefits.slice(0, 3).map((benefit, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-1">
                        <CheckCircle className="h-3 w-3 text-green-400 mt-0.5 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Further Training and Qualifications */}
      <Card className="border-green-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-green-400" />
            <CardTitle className="text-green-300">Further Training & Qualifications</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {qualificationsPathways.map((pathway, idx) => (
            <div key={idx} className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
              <div className="flex items-center gap-2 mb-3">
                {pathway.area === "Solar PV Installation" && <Sun className="h-5 w-5 text-amber-400" />}
                {pathway.area === "EV Charging Installation" && <Car className="h-5 w-5 text-lime-400" />}
                {pathway.area === "Inspection and Testing" && <Zap className="h-5 w-5 text-blue-400" />}
                {pathway.area === "Design and Verification" && <Target className="h-5 w-5 text-purple-400" />}
                {pathway.area === "Building Regulations" && <Building className="h-5 w-5 text-orange-400" />}
                {pathway.area === "18th Edition BS 7671" && <Book className="h-5 w-5 text-red-400" />}
                <h4 className="font-medium text-green-200">{pathway.area}</h4>
              </div>

              <div className="space-y-2 mb-3">
                {pathway.qualifications.map((qual, qIdx) => (
                  <div key={qIdx} className="flex items-center justify-between bg-green-600/10 p-2 rounded">
                    <div>
                      <span className="text-white text-sm font-medium">{qual.name}</span>
                      <p className="text-xs text-white">{qual.description}</p>
                    </div>
                    <Badge variant="outline" className="border-green-400 text-green-300 text-xs">
                      {qual.level}
                    </Badge>
                  </div>
                ))}
              </div>

              <div className="text-xs text-white">
                <span className="text-green-300">Prerequisites: </span>
                {pathway.prerequisites.join(", ")}
              </div>
              <div className="text-xs text-white mt-1 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                <span>{pathway.careerPath}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* IP Ratings Quick Reference */}
      <Card className="border-cyan-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-cyan-400" />
            <CardTitle className="text-cyan-300">IP Ratings Quick Reference</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-cyan-500/50 bg-cyan-500/10">
            <Info className="h-4 w-4 text-cyan-400" />
            <AlertDescription className="text-cyan-200 text-sm">
              IP = Ingress Protection. First digit (0-6) = solid object protection.
              Second digit (0-9) = water protection. X = not specified.
            </AlertDescription>
          </Alert>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-cyan-500/30">
                  <th className="text-left py-2 text-cyan-200">IP Rating</th>
                  <th className="text-left py-2 text-cyan-200">Solid Protection</th>
                  <th className="text-left py-2 text-cyan-200">Water Protection</th>
                  <th className="text-left py-2 text-cyan-200">Typical Use</th>
                </tr>
              </thead>
              <tbody>
                {ipRatingsTable.map((ip, idx) => (
                  <tr key={idx} className="border-b border-cyan-500/20">
                    <td className="py-2">
                      <Badge variant="outline" className="border-cyan-400 text-cyan-300">
                        {ip.rating}
                      </Badge>
                    </td>
                    <td className="py-2 text-white">{ip.firstDigit}</td>
                    <td className="py-2 text-white">{ip.secondDigit}</td>
                    <td className="py-2 text-white">{ip.typical}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* RCD Types Reference */}
      <Card className="border-rose-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-rose-400" />
            <CardTitle className="text-rose-300">RCD Types Quick Reference</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-rose-500/30">
                  <th className="text-left py-2 text-rose-200">RCD Type</th>
                  <th className="text-left py-2 text-rose-200">Detects</th>
                  <th className="text-left py-2 text-rose-200">Applications</th>
                  <th className="text-left py-2 text-rose-200">Notes</th>
                </tr>
              </thead>
              <tbody>
                {rcdTypesTable.map((rcd, idx) => (
                  <tr key={idx} className="border-b border-rose-500/20">
                    <td className="py-2">
                      <Badge variant="outline" className="border-rose-400 text-rose-300">
                        {rcd.type}
                      </Badge>
                    </td>
                    <td className="py-2 text-white">{rcd.detects}</td>
                    <td className="py-2 text-white">{rcd.applications}</td>
                    <td className="py-2 text-white text-xs">{rcd.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Useful Resources */}
      <Card className="border-indigo-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <ExternalLink className="h-6 w-6 text-indigo-400" />
            <CardTitle className="text-indigo-300">Useful Resources & Links</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {usefulResources.map((category, idx) => (
            <div key={idx} className="bg-indigo-500/10 p-4 rounded-lg border border-indigo-500/20">
              <h4 className="font-medium text-indigo-200 mb-3">{category.category}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {category.resources.map((resource, rIdx) => (
                  <div key={rIdx} className="flex items-start gap-2 text-sm">
                    <Lightbulb className="h-4 w-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-indigo-200 font-medium">{resource.name}</span>
                      <p className="text-xs text-white">{resource.description}</p>
                      <span className="text-xs text-white">Source: {resource.source}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Career Progression */}
      <Card className="border-elec-yellow/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Award className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Specialist Installer Career Progression</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-elec-yellow/10 p-4 rounded-lg border border-elec-yellow/20 text-center">
              <div className="text-2xl font-bold text-elec-yellow mb-2">1</div>
              <h4 className="font-medium text-white mb-2">Qualified Electrician</h4>
              <p className="text-xs text-white">NVQ L3 + AM2 + 18th Edition + 2391</p>
            </div>
            <div className="bg-elec-yellow/10 p-4 rounded-lg border border-elec-yellow/20 text-center">
              <div className="text-2xl font-bold text-elec-yellow mb-2">2</div>
              <h4 className="font-medium text-white mb-2">Specialist Training</h4>
              <p className="text-xs text-white">Solar PV / EV / Medical locations courses</p>
            </div>
            <div className="bg-elec-yellow/10 p-4 rounded-lg border border-elec-yellow/20 text-center">
              <div className="text-2xl font-bold text-elec-yellow mb-2">3</div>
              <h4 className="font-medium text-white mb-2">Scheme Registration</h4>
              <p className="text-xs text-white">MCS / OZEV / Competent Person scheme</p>
            </div>
            <div className="bg-elec-yellow/10 p-4 rounded-lg border border-elec-yellow/20 text-center">
              <div className="text-2xl font-bold text-elec-yellow mb-2">4</div>
              <h4 className="font-medium text-white mb-2">Specialist Installer</h4>
              <p className="text-xs text-white">Certified specialist with scheme membership</p>
            </div>
          </div>

          <Alert className="border-elec-yellow/50 bg-elec-yellow/10">
            <Lightbulb className="h-4 w-4 text-elec-yellow" />
            <AlertDescription className="text-elec-yellow/90 text-sm">
              Specialist areas like Solar PV and EV charging offer excellent career progression opportunities
              with growing market demand. Consider combining multiple specialisms for maximum flexibility.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card className="border-white/50/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Users className="h-6 w-6 text-white" />
            <CardTitle className="text-white">Key Industry Contacts</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white/5 p-4 rounded-lg border border-white/20">
              <h4 className="font-medium text-white mb-2">IET</h4>
              <p className="text-white flex items-center gap-2 mb-1">
                <Globe className="h-3 w-3" /> theiet.org
              </p>
              <p className="text-white flex items-center gap-2">
                <Phone className="h-3 w-3" /> 01438 313311
              </p>
            </div>
            <div className="bg-white/5 p-4 rounded-lg border border-white/20">
              <h4 className="font-medium text-white mb-2">NICEIC</h4>
              <p className="text-white flex items-center gap-2 mb-1">
                <Globe className="h-3 w-3" /> niceic.com
              </p>
              <p className="text-white flex items-center gap-2">
                <Phone className="h-3 w-3" /> 0333 015 6625
              </p>
            </div>
            <div className="bg-white/5 p-4 rounded-lg border border-white/20">
              <h4 className="font-medium text-white mb-2">MCS</h4>
              <p className="text-white flex items-center gap-2 mb-1">
                <Globe className="h-3 w-3" /> mcscertified.com
              </p>
              <p className="text-white flex items-center gap-2">
                <Mail className="h-3 w-3" /> info@mcscertified.com
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SpecialistReferenceGuide;
