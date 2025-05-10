
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  ArrowLeft, 
  Settings, 
  ClipboardCheck, 
  Lightbulb, 
  Ruler, 
  Shield, 
  AlertTriangle,
  FileText,
  CheckSquare,
  Building,
  HardHat
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const OnJobAssessment = () => {
  const [selectedTab, setSelectedTab] = useState<string>("checklists");
  const [expandedChecklist, setExpandedChecklist] = useState<string | null>(null);
  const [expandedGuide, setExpandedGuide] = useState<string | null>(null);

  const toggleChecklist = (id: string) => {
    setExpandedChecklist(expandedChecklist === id ? null : id);
  };

  const toggleGuide = (id: string) => {
    setExpandedGuide(expandedGuide === id ? null : id);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Site Assessment Tools</h1>
        <Link to="/apprentice/on-job-tools" className="flex-shrink-0">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to On-the-Job Tools
          </Button>
        </Link>
      </div>

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start">
          <Card className="w-full sm:w-64 border-elec-yellow/20 bg-elec-gray">
            <CardHeader className="pb-3">
              <CardTitle>Select Category</CardTitle>
              <CardDescription>Choose an assessment tool category</CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={selectedTab} onValueChange={setSelectedTab}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-elec-gray border border-elec-yellow/20">
                  <SelectItem value="checklists" className="focus:bg-elec-dark focus:text-elec-yellow">
                    <div className="flex items-center gap-2">
                      <ClipboardCheck className="h-4 w-4" />
                      <span>Site Checklists</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="guides" className="focus:bg-elec-dark focus:text-elec-yellow">
                    <div className="flex items-center gap-2">
                      <Lightbulb className="h-4 w-4" />
                      <span>Assessment Guides</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="protocols" className="focus:bg-elec-dark focus:text-elec-yellow">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      <span>Safety Protocols</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <div className="w-full flex-1 space-y-6">
            {selectedTab === "checklists" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold">Site Checklists</h2>
                <p className="text-muted-foreground">
                  Comprehensive checklists to ensure all aspects of electrical work sites are properly assessed and managed.
                  These checklists align with UK electrical regulations and best practices.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InteractiveChecklistCard 
                    id="initial-site"
                    title="Initial Site Survey" 
                    description="Assessment checklist for new job sites"
                    icon={Ruler}
                    isExpanded={expandedChecklist === "initial-site"}
                    onToggle={() => toggleChecklist("initial-site")}
                    items={[
                      { text: "Site access and parking arrangements", details: "Verify adequate access for vehicles and equipment. Check parking restrictions and loading/unloading facilities." },
                      { text: "Working space requirements", details: "Ensure sufficient space for safe working. Identify potential hazards such as low ceilings or restricted areas." },
                      { text: "Existing electrical installations", details: "Document condition and compliance status of existing installations. Note any visible defects or non-compliant work." },
                      { text: "Client requirements verification", details: "Confirm exact scope of work with client. Document any special requirements or constraints." },
                      { text: "Potential hazards identification", details: "Identify asbestos, structural issues, or other safety concerns. Consider environmental factors such as flooding risk." },
                      { text: "Material storage possibilities", details: "Locate secure areas for tools and materials. Ensure weather protection and security measures." }
                    ]}
                  />
                  
                  <InteractiveChecklistCard 
                    id="domestic"
                    title="Domestic Installation" 
                    description="Checklist for residential electrical work"
                    icon={Building}
                    isExpanded={expandedChecklist === "domestic"}
                    onToggle={() => toggleChecklist("domestic")}
                    items={[
                      { text: "Consumer unit location assessment", details: "Verify compliance with BS 7671 regarding location (not in bathroom/shower rooms, accessible, etc)." },
                      { text: "Circuit requirements determination", details: "Assess number and type of circuits required based on property size and client needs." },
                      { text: "Earthing arrangements verification", details: "Check existing earthing system and determine if upgrades are necessary to meet current regulations." },
                      { text: "RCD protection requirements", details: "Identify circuits requiring RCD protection according to BS 7671 requirements." },
                      { text: "Cable routes planning", details: "Determine optimal cable routes considering structure, aesthetics, and accessibility for maintenance." },
                      { text: "Lighting and power requirements", details: "Document client requirements for lighting layouts, switch positions, and socket locations." },
                      { text: "Property age consideration", details: "Note construction era to anticipate challenges (lathe and plaster walls, absence of cavities, etc)." },
                      { text: "Renewable energy integration", details: "Assess potential for integrating solar PV, EV chargers, or battery storage systems if requested." }
                    ]}
                  />
                  
                  <InteractiveChecklistCard 
                    id="commercial"
                    title="Commercial Premises" 
                    description="Checklist for commercial electrical assessments"
                    icon={Settings}
                    isExpanded={expandedChecklist === "commercial"}
                    onToggle={() => toggleChecklist("commercial")}
                    items={[
                      { text: "Distribution board locations", details: "Identify optimal locations considering accessibility, safety, and future expansion needs." },
                      { text: "Power supply capacity assessment", details: "Determine if existing supply capacity is adequate for intended use or if upgrades are required." },
                      { text: "Emergency lighting requirements", details: "Assess emergency lighting needs according to BS 5266 requirements for escape routes." },
                      { text: "Data and communication needs", details: "Document requirements for network infrastructure, Wi-Fi coverage, and telecom services." },
                      { text: "Fire alarm interfacing", details: "Identify integration requirements with fire detection and alarm systems to BS 5839." },
                      { text: "Maintenance access requirements", details: "Ensure adequate access for future maintenance of all electrical equipment." },
                      { text: "Business continuity provisions", details: "Assess need for backup power systems or UPS for critical equipment." },
                      { text: "Energy efficiency opportunities", details: "Identify potential for LED lighting, smart controls, and power management systems." }
                    ]}
                  />
                  
                  <InteractiveChecklistCard 
                    id="risk"
                    title="Risk Assessment" 
                    description="Identify and evaluate potential hazards"
                    icon={AlertTriangle}
                    isExpanded={expandedChecklist === "risk"}
                    onToggle={() => toggleChecklist("risk")}
                    items={[
                      { text: "Working at height assessment", details: "Document height-related tasks and appropriate safety measures according to Work at Height Regulations 2005." },
                      { text: "Live working evaluation", details: "Determine if any live working is unavoidable and document necessary precautions to comply with Electricity at Work Regulations." },
                      { text: "Isolation procedures", details: "Document safe isolation procedure specific to site and installation." },
                      { text: "Manual handling requirements", details: "Identify manual handling tasks and control measures in line with Manual Handling Operations Regulations." },
                      { text: "PPE requirements", details: "Specify appropriate PPE for identified hazards in compliance with Personal Protective Equipment at Work Regulations." },
                      { text: "Emergency procedures", details: "Document site-specific emergency response procedures including first aid and evacuation." },
                      { text: "COSHH assessment", details: "Identify any hazardous substances and control measures required under Control of Substances Hazardous to Health Regulations." },
                      { text: "Site-specific hazards", details: "Identify unique hazards such as asbestos, confined spaces, or existing services." }
                    ]}
                  />
                  
                  <InteractiveChecklistCard 
                    id="inspection"
                    title="Inspection & Testing" 
                    description="Checklist for electrical verification"
                    icon={CheckSquare}
                    isExpanded={expandedChecklist === "inspection"}
                    onToggle={() => toggleChecklist("inspection")}
                    items={[
                      { text: "Visual inspection preparation", details: "Prepare documentation and inspection forms aligned with BS 7671 requirements." },
                      { text: "Test equipment verification", details: "Confirm all test equipment is calibrated and appropriate for the installation being tested." },
                      { text: "Circuit identification", details: "Verify and document all circuits to ensure accurate testing and labelling." },
                      { text: "Testing sequence planning", details: "Plan logical sequence of tests to comply with BS 7671 inspection and testing requirements." },
                      { text: "Certification documentation", details: "Prepare appropriate certification documents (EICR, EIC, minor works) per BS 7671." },
                      { text: "Client handover planning", details: "Schedule client demonstration of installation and explanation of certification." }
                    ]}
                  />
                  
                  <InteractiveChecklistCard 
                    id="industrial"
                    title="Industrial Installation" 
                    description="Checklist for industrial electrical assessments"
                    icon={HardHat}
                    isExpanded={expandedChecklist === "industrial"}
                    onToggle={() => toggleChecklist("industrial")}
                    items={[
                      { text: "Power distribution requirements", details: "Assess voltage levels, phase requirements and distribution needs for machinery." },
                      { text: "Motor control centres", details: "Document requirements for motor control gear, starters, and protection devices." },
                      { text: "Cable management systems", details: "Plan cable containment routes considering environment, accessibility and future capacity." },
                      { text: "Hazardous area classification", details: "Identify zones requiring ATEX-rated equipment according to BS EN 60079." },
                      { text: "Power quality assessment", details: "Evaluate harmonic distortion risks and mitigation measures for sensitive equipment." },
                      { text: "Machinery safety integration", details: "Document safety integration requirements according to BS EN 60204 (Safety of Machinery)." }
                    ]}
                  />
                </div>
              </div>
            )}

            {selectedTab === "guides" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold">Assessment Guides</h2>
                <p className="text-muted-foreground">
                  Comprehensive guides to help you assess various aspects of electrical installations
                  according to UK regulations and industry best practices.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InteractiveGuideCard
                    id="lighting"
                    title="Lighting Assessment Guide"
                    description="Step-by-step guide for assessing lighting requirements in various spaces"
                    icon={Lightbulb}
                    isExpanded={expandedGuide === "lighting"}
                    onToggle={() => toggleGuide("lighting")}
                    content={
                      <>
                        <h3 className="font-medium text-lg mb-3">Introduction to Lighting Assessment</h3>
                        <p className="mb-4">
                          This guide will help you determine appropriate lighting levels for various spaces according to
                          CIBSE Lighting Guide recommendations and BS EN 12464-1 standards for workplace lighting.
                        </p>
                        
                        <h4 className="font-medium mt-4 mb-2">Step 1: Space Classification</h4>
                        <p className="mb-3">
                          Determine the primary use of the space using these categories:
                        </p>
                        <ul className="list-disc pl-5 space-y-1 text-muted-foreground mb-4">
                          <li>Office/Administrative: 300-500 lux</li>
                          <li>Educational: 300-500 lux</li>
                          <li>Industrial workspaces: 300-750 lux</li>
                          <li>Precision work areas: 750-1000 lux</li>
                          <li>Corridors and circulation: 100-150 lux</li>
                          <li>Retail spaces: 300-750 lux</li>
                          <li>Healthcare: 300-1000 lux (task dependent)</li>
                        </ul>
                        
                        <h4 className="font-medium mt-4 mb-2">Step 2: Task Evaluation</h4>
                        <p className="mb-3">
                          Consider specific visual tasks performed in the space:
                        </p>
                        <ul className="list-disc pl-5 space-y-1 text-muted-foreground mb-4">
                          <li>Reading and writing: minimum 300 lux</li>
                          <li>Computer work: 300-500 lux with anti-glare considerations</li>
                          <li>Detailed manufacturing: 500-750 lux</li>
                          <li>Colour matching: 1000 lux with high CRI lighting</li>
                          <li>Inspection tasks: 750-1000 lux</li>
                        </ul>
                        
                        <h4 className="font-medium mt-4 mb-2">Step 3: Occupant Factors</h4>
                        <p className="mb-3">
                          Consider occupant needs and characteristics:
                        </p>
                        <ul className="list-disc pl-5 space-y-1 text-muted-foreground mb-4">
                          <li>Age demographics (older occupants may need 50% more light)</li>
                          <li>Duration of occupation</li>
                          <li>Time of day usage</li>
                        </ul>
                        
                        <h4 className="font-medium mt-4 mb-2">Step 4: Calculating Requirements</h4>
                        <p className="mb-3">
                          Use the lumen method to calculate required illuminance:
                        </p>
                        <div className="bg-elec-dark/40 p-3 rounded-md mb-4">
                          <p className="font-mono">Number of fixtures = (Area × Required lux) ÷ (LLF × Lumens per fixture × CU)</p>
                          <p className="text-sm mt-2">
                            Where: LLF = Light Loss Factor (typically 0.7-0.8)<br />
                            CU = Coefficient of Utilization (typically 0.4-0.6)
                          </p>
                        </div>
                        
                        <h4 className="font-medium mt-4 mb-2">Step 5: Fixture Selection Considerations</h4>
                        <ul className="list-disc pl-5 space-y-1 text-muted-foreground mb-4">
                          <li>Efficacy (lumens/watt)</li>
                          <li>Colour Rendering Index (CRI) requirements</li>
                          <li>Colour temperature suitability</li>
                          <li>Energy efficiency rating</li>
                          <li>Control compatibility (dimming, occupancy sensing)</li>
                          <li>Environmental rating (IP/IK as required)</li>
                        </ul>
                        
                        <h4 className="font-medium mt-4 mb-2">Documentation</h4>
                        <p>
                          Record your lighting assessment including calculations, fixture specifications, and control strategies to
                          demonstrate compliance with building regulations Part L and workplace requirements.
                        </p>
                      </>
                    }
                  />

                  <InteractiveGuideCard
                    id="power"
                    title="Power Requirements Guide"
                    description="Guidelines for assessing and calculating power requirements for installations"
                    icon={Settings}
                    isExpanded={expandedGuide === "power"}
                    onToggle={() => toggleGuide("power")}
                    content={
                      <>
                        <h3 className="font-medium text-lg mb-3">Power Requirements Assessment</h3>
                        <p className="mb-4">
                          This guide outlines the process for determining electrical load requirements for installations
                          according to BS 7671 (18th Edition IET Wiring Regulations).
                        </p>
                        
                        <h4 className="font-medium mt-4 mb-2">Step 1: Load Assessment</h4>
                        <p className="mb-3">
                          Create a comprehensive inventory of all electrical equipment:
                        </p>
                        <ul className="list-disc pl-5 space-y-1 text-muted-foreground mb-4">
                          <li>Fixed loads (heating, ventilation, water heating)</li>
                          <li>Lighting loads (calculate total connected load)</li>
                          <li>Socket outlet requirements (consider diversity factors)</li>
                          <li>Specialised equipment (kitchen, workshop, charging points)</li>
                        </ul>
                        
                        <h4 className="font-medium mt-4 mb-2">Step 2: Diversity Calculation</h4>
                        <p className="mb-3">
                          Apply appropriate diversity factors according to Appendix 1 of BS 7671:
                        </p>
                        <ul className="list-disc pl-5 space-y-1 text-muted-foreground mb-4">
                          <li>Lighting: 90-100% of connected load</li>
                          <li>Heating and cooling: 100% of largest item plus 80% of remaining items</li>
                          <li>Socket outlets: 100% of first 10 points, 40% of remainder up to 30 points, 20% of remainder above 30 points</li>
                          <li>Electric cooker: 10kW up to 30A, 10kW + 0.5kW per kW above 30A</li>
                        </ul>
                        
                        <h4 className="font-medium mt-4 mb-2">Step 3: Maximum Demand Calculation</h4>
                        <div className="bg-elec-dark/40 p-3 rounded-md mb-4">
                          <p className="font-mono">Max Demand (kVA) = Total Load (kW) ÷ Power Factor</p>
                          <p className="text-sm mt-2">
                            Typical power factor values:<br />
                            Resistive loads: 1.0<br />
                            Lighting: 0.9-0.95<br />
                            Motors: 0.7-0.9<br />
                            Overall installation: usually 0.85-0.95
                          </p>
                        </div>
                        
                        <h4 className="font-medium mt-4 mb-2">Step 4: Circuit Design Considerations</h4>
                        <ul className="list-disc pl-5 space-y-1 text-muted-foreground mb-4">
                          <li>Maximum demand current per phase (divide by 230V for single phase, 400V and √3 for three phase)</li>
                          <li>Circuit rating and cable sizing according to BS 7671 Appendix 4</li>
                          <li>Voltage drop limitations (3% for lighting, 5% for power)</li>
                          <li>Discrimination between protective devices</li>
                        </ul>
                        
                        <h4 className="font-medium mt-4 mb-2">Step 5: Load Balance</h4>
                        <p className="mb-3">
                          For three-phase installations, ensure load is balanced across phases:
                        </p>
                        <ul className="list-disc pl-5 space-y-1 text-muted-foreground mb-4">
                          <li>Calculate load per phase</li>
                          <li>Maximum imbalance should not exceed 16A between phases</li>
                          <li>Document phase allocation for all circuits</li>
                        </ul>
                        
                        <h4 className="font-medium mt-4 mb-2">Future Expansion</h4>
                        <p className="mb-3">
                          Consider adding capacity for future needs:
                        </p>
                        <ul className="list-disc pl-5 space-y-1 text-muted-foreground mb-4">
                          <li>Domestic: 20-30% spare capacity</li>
                          <li>Commercial: 25-40% spare capacity</li>
                          <li>Industrial: 30-50% spare capacity</li>
                          <li>Document anticipated future loads (EV charging, renewables, etc.)</li>
                        </ul>
                      </>
                    }
                  />
                  
                  <InteractiveGuideCard
                    id="earthing"
                    title="Earthing Assessment Guide"
                    description="Guidance for evaluating earthing and bonding requirements"
                    icon={Shield}
                    isExpanded={expandedGuide === "earthing"}
                    onToggle={() => toggleGuide("earthing")}
                    content={
                      <>
                        <h3 className="font-medium text-lg mb-3">Earthing and Bonding Assessment</h3>
                        <p className="mb-4">
                          This guide helps evaluate earthing systems according to Chapter 54 of BS 7671 and Guidance Note 5.
                        </p>
                        
                        <h4 className="font-medium mt-4 mb-2">Step 1: Supply Earthing Arrangement</h4>
                        <p className="mb-3">
                          Identify the type of earthing system:
                        </p>
                        <ul className="list-disc pl-5 space-y-1 text-muted-foreground mb-4">
                          <li>TN-S: Separate neutral and protective conductors throughout system</li>
                          <li>TN-C-S (PME): Combined neutral and protective conductor in part of system</li>
                          <li>TT: Earth is provided by local electrode</li>
                          <li>IT: No direct connection between live parts and earth</li>
                        </ul>
                        
                        <h4 className="font-medium mt-4 mb-2">Step 2: Main Earthing Terminal Assessment</h4>
                        <p className="mb-3">
                          Verify the integrity and adequacy of the main earthing terminal:
                        </p>
                        <ul className="list-disc pl-5 space-y-1 text-muted-foreground mb-4">
                          <li>Location accessible for inspection and testing</li>
                          <li>Robust connection to earthing conductor</li>
                          <li>Sufficient capacity for main protective bonding conductors</li>
                          <li>Labelled as "Safety Electrical Earth - Do Not Remove"</li>
                        </ul>
                        
                        <h4 className="font-medium mt-4 mb-2">Step 3: Protective Bonding Requirements</h4>
                        <p className="mb-3">
                          Assess main protective bonding connections to extraneous conductive parts:
                        </p>
                        <ul className="list-disc pl-5 space-y-1 text-muted-foreground mb-4">
                          <li>Water service pipes</li>
                          <li>Gas installation pipes</li>
                          <li>Oil supply pipes</li>
                          <li>Structural steelwork</li>
                          <li>Central heating and air conditioning systems</li>
                          <li>Lightning protection systems</li>
                        </ul>
                        
                        <h4 className="font-medium mt-4 mb-2">Step 4: Sizing Considerations</h4>
                        <div className="bg-elec-dark/40 p-3 rounded-md mb-4">
                          <p className="font-mono">Minimum sizing requirements:</p>
                          <p className="text-sm mt-2">
                            Main earthing conductor: Sized according to Table 54.8<br />
                            Main bonding conductors: Minimum half the size of main earthing conductor, not less than 6mm²<br />
                            Supplementary bonding: Minimum 4mm² if mechanically protected, 6mm² if not protected
                          </p>
                        </div>
                        
                        <h4 className="font-medium mt-4 mb-2">Step 5: Special Locations</h4>
                        <p className="mb-3">
                          Consider additional requirements for special locations:
                        </p>
                        <ul className="list-disc pl-5 space-y-1 text-muted-foreground mb-4">
                          <li>Bathrooms and shower rooms (supplementary bonding)</li>
                          <li>Swimming pools and saunas</li>
                          <li>Medical locations</li>
                          <li>Agricultural premises</li>
                          <li>Construction sites</li>
                        </ul>
                        
                        <h4 className="font-medium mt-4 mb-2">Documentation Requirements</h4>
                        <p>
                          Document the earthing arrangement with diagrams showing all connections, 
                          earthing conductor sizes, and test results including earth loop impedance values.
                        </p>
                      </>
                    }
                  />
                  
                  <InteractiveGuideCard
                    id="rcd"
                    title="RCD Protection Assessment"
                    description="Guide for determining appropriate RCD protection requirements"
                    icon={FileText}
                    isExpanded={expandedGuide === "rcd"}
                    onToggle={() => toggleGuide("rcd")}
                    content={
                      <>
                        <h3 className="font-medium text-lg mb-3">RCD Protection Requirements</h3>
                        <p className="mb-4">
                          This guide helps assess Residual Current Device (RCD) protection requirements 
                          according to BS 7671 regulations.
                        </p>
                        
                        <h4 className="font-medium mt-4 mb-2">Step 1: Mandatory RCD Protection</h4>
                        <p className="mb-3">
                          Identify circuits requiring mandatory RCD protection (30mA):
                        </p>
                        <ul className="list-disc pl-5 space-y-1 text-muted-foreground mb-4">
                          <li>All socket outlets rated at not more than 32A (411.3.3)</li>
                          <li>Mobile equipment rated at not more than 32A for use outdoors (411.3.3)</li>
                          <li>All circuits in bathrooms regardless of rating (701.411.3.3)</li>
                          <li>Socket outlets in swimming pool zones (702.410.3.4)</li>
                          <li>Cables concealed in walls at depth less than 50mm (522.6.202)</li>
                          <li>Luminaire installations in domestic premises (411.3.4)</li>
                          <li>EV charging points (722.531.2)</li>
                        </ul>
                        
                        <h4 className="font-medium mt-4 mb-2">Step 2: RCD Type Selection</h4>
                        <p className="mb-3">
                          Select appropriate RCD type based on load characteristics:
                        </p>
                        <ul className="list-disc pl-5 space-y-1 text-muted-foreground mb-4">
                          <li>Type AC: Standard AC sinusoidal waveform</li>
                          <li>Type A: AC and pulsating DC faults (required for equipment with electronic components)</li>
                          <li>Type B: AC, pulsating DC and smooth DC fault currents (required for EV chargers, PV systems)</li>
                          <li>Type F: Mixed frequencies up to 1kHz (variable speed drives)</li>
                          <li>Type S: Time-delayed for discrimination</li>
                        </ul>
                        
                        <h4 className="font-medium mt-4 mb-2">Step 3: Sensitivity Selection</h4>
                        <p className="mb-3">
                          Choose appropriate RCD sensitivity:
                        </p>
                        <ul className="list-disc pl-5 space-y-1 text-muted-foreground mb-4">
                          <li>30mA: Personnel protection (socket outlets, bathroom circuits)</li>
                          <li>100mA: Fire protection (cable faults)</li>
                          <li>300mA: Fire protection (distribution boards)</li>
                        </ul>
                        
                        <h4 className="font-medium mt-4 mb-2">Step 4: Discrimination Requirements</h4>
                        <p className="mb-3">
                          Ensure discrimination between RCDs:
                        </p>
                        <ul className="list-disc pl-5 space-y-1 text-muted-foreground mb-4">
                          <li>Selective RCDs (Type S) upstream of general RCDs</li>
                          <li>Ratio between upstream and downstream RCD sensitivity should be at least 3:1</li>
                          <li>Time delay between upstream and downstream operation</li>
                        </ul>
                        
                        <h4 className="font-medium mt-4 mb-2">Step 5: Special Considerations</h4>
                        <p className="mb-3">
                          Account for special situations:
                        </p>
                        <ul className="list-disc pl-5 space-y-1 text-muted-foreground mb-4">
                          <li>Surge protection coordination with RCDs</li>
                          <li>Minimising nuisance tripping (separate circuits for refrigerators, freezers)</li>
                          <li>Essential equipment requiring continuous operation</li>
                          <li>TT systems requiring 30mA protection for all circuits</li>
                        </ul>
                        
                        <div className="bg-elec-yellow/10 p-3 rounded-md mt-4">
                          <h4 className="font-medium mb-2">Important Notes:</h4>
                          <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                            <li>Test all RCDs after installation using appropriate test instruments</li>
                            <li>Document all RCD types, ratings and locations in installation documentation</li>
                            <li>Include RCD test instructions in handover documentation to client</li>
                          </ul>
                        </div>
                      </>
                    }
                  />
                </div>
              </div>
            )}
            
            {selectedTab === "protocols" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold">Safety Protocols</h2>
                <p className="text-muted-foreground mb-6">
                  Comprehensive safety protocols aligned with UK regulations and HSE guidance to ensure safe working
                  practices on electrical installations.
                </p>
                
                <Card className="border-elec-yellow/20 bg-elec-gray">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-md bg-elec-yellow/10">
                        <Shield className="h-6 w-6 text-elec-yellow" />
                      </div>
                      <CardTitle>Essential Safety Protocols</CardTitle>
                    </div>
                    <CardDescription className="mt-2">
                      Important safety protocols for on-site electrical work in accordance with UK regulations
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <Collapsible className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">Isolation Procedures (Electricity at Work Regulations 1989)</h3>
                        <CollapsibleTrigger className="rounded-md border border-input h-8 w-8 p-0 flex items-center justify-center">
                          <Settings className="h-4 w-4" />
                        </CollapsibleTrigger>
                      </div>
                      <CollapsibleContent className="space-y-4">
                        <p className="text-muted-foreground">
                          All isolation procedures must follow the HSE guidance document HSG85 (Electricity at Work: Safe Working Practices)
                          and comply with the Electricity at Work Regulations 1989.
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                          <li>
                            <strong>Identify isolation point</strong> - Locate the correct point of isolation for the 
                            circuit or equipment to be worked on.
                          </li>
                          <li>
                            <strong>Obtain permission</strong> - Get authorisation from the responsible person before isolating any system.
                          </li>
                          <li>
                            <strong>Isolate the supply</strong> - Switch off and isolate the electrical supply at the identified point.
                          </li>
                          <li>
                            <strong>Secure the isolation</strong> - Apply lock-off devices and warning tags according to LOTO procedures.
                            Each person working on the system should apply their personal lock.
                          </li>
                          <li>
                            <strong>Verify the isolation</strong> - Prove the circuit is dead using an approved voltage indicator that has been 
                            checked on a known live source before and after use (proving unit).
                          </li>
                          <li>
                            <strong>Re-verify before work</strong> - Check isolation is maintained before beginning work and after any breaks.
                          </li>
                          <li>
                            <strong>Maintain records</strong> - Document the isolation procedure including time, circuit, person responsible, 
                            and verification test results.
                          </li>
                        </ul>
                        <div className="bg-elec-yellow/10 p-3 rounded-md">
                          <h4 className="font-medium mb-1">Required Documentation:</h4>
                          <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                            <li>Isolation permit form</li>
                            <li>Lock-off register</li>
                            <li>Circuit identification record</li>
                          </ul>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                    
                    <Collapsible className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">Working Near Live Parts (When Unavoidable)</h3>
                        <CollapsibleTrigger className="rounded-md border border-input h-8 w-8 p-0 flex items-center justify-center">
                          <AlertTriangle className="h-4 w-4" />
                        </CollapsibleTrigger>
                      </div>
                      <CollapsibleContent className="space-y-4">
                        <p className="text-muted-foreground">
                          Working near live parts should be avoided whenever possible. If absolutely necessary,
                          comply with Regulation 14 of the Electricity at Work Regulations 1989.
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                          <li>
                            <strong>Risk assessment</strong> - Complete a detailed risk assessment to determine if live work is justified.
                            Permitted justifications are limited to:
                            <ul className="list-disc pl-5 mt-1 space-y-1">
                              <li>Diagnostic testing that requires the circuit to be energised</li>
                              <li>Work where isolation creates greater hazards</li>
                              <li>Work where isolation is impracticable due to continuous operation requirements</li>
                            </ul>
                          </li>
                          <li>
                            <strong>Method statement</strong> - Develop a detailed safe work method statement specific to the task.
                          </li>
                          <li>
                            <strong>Competency verification</strong> - Ensure all workers are properly trained and competent for live working.
                          </li>
                          <li>
                            <strong>Use appropriate tools</strong> - Only use insulated tools certified to BS EN 60900.
                          </li>
                          <li>
                            <strong>Wear appropriate PPE</strong> - Use PPE appropriate to the task including insulating gloves, face shield, and appropriate clothing.
                          </li>
                          <li>
                            <strong>Maintain supervision</strong> - A second person must be present to assist in case of emergency.
                          </li>
                          <li>
                            <strong>Implement barriers</strong> - Install appropriate barriers and warning signs to prevent unauthorised access.
                          </li>
                        </ul>
                        <div className="bg-elec-yellow/10 p-3 rounded-md">
                          <h4 className="font-medium mb-1">Required Documentation:</h4>
                          <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                            <li>Live work permit</li>
                            <li>Live work risk assessment</li>
                            <li>Method statement</li>
                            <li>Competency records</li>
                          </ul>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                    
                    <Collapsible className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">Emergency Procedures</h3>
                        <CollapsibleTrigger className="rounded-md border border-input h-8 w-8 p-0 flex items-center justify-center">
                          <AlertTriangle className="h-4 w-4" />
                        </CollapsibleTrigger>
                      </div>
                      <CollapsibleContent className="space-y-4">
                        <p className="text-muted-foreground">
                          Emergency procedures must be established and communicated to all workers
                          in compliance with the Health and Safety (First Aid) Regulations 1981.
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                          <li>
                            <strong>First aid for electric shock</strong>
                            <ul className="list-disc pl-5 mt-1 space-y-1">
                              <li>Do not touch the casualty if they are still in contact with the electrical source</li>
                              <li>Switch off power if possible and safe to do so</li>
                              <li>If power cannot be switched off, use insulating material to separate casualty from source</li>
                              <li>Call emergency services immediately (999)</li>
                              <li>Check breathing and circulation - administer CPR if required</li>
                              <li>Treat for shock until emergency services arrive</li>
                            </ul>
                          </li>
                          <li>
                            <strong>Fire emergency</strong>
                            <ul className="list-disc pl-5 mt-1 space-y-1">
                              <li>Raise the alarm according to site procedures</li>
                              <li>Only tackle electrical fires with appropriate fire extinguishers (CO2 or dry powder)</li>
                              <li>Never use water on electrical fires</li>
                              <li>Evacuate the area according to site emergency procedures</li>
                              <li>Call fire brigade (999)</li>
                            </ul>
                          </li>
                          <li>
                            <strong>Incident reporting</strong> - Report all incidents according to RIDDOR requirements:
                            <ul className="list-disc pl-5 mt-1 space-y-1">
                              <li>Fatal and major injuries must be reported immediately</li>
                              <li>Incidents resulting in over 7-day incapacitation must be reported within 15 days</li>
                              <li>Near misses must be recorded internally</li>
                            </ul>
                          </li>
                        </ul>
                        <div className="bg-elec-yellow/10 p-3 rounded-md">
                          <h4 className="font-medium mb-1">Required Information:</h4>
                          <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                            <li>Location of first aid kit and first aiders</li>
                            <li>Location of fire extinguishers</li>
                            <li>Emergency contact numbers</li>
                            <li>Assembly points</li>
                            <li>RIDDOR reporting procedure</li>
                          </ul>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                    
                    <Collapsible className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">Working at Height</h3>
                        <CollapsibleTrigger className="rounded-md border border-input h-8 w-8 p-0 flex items-center justify-center">
                          <Ruler className="h-4 w-4" />
                        </CollapsibleTrigger>
                      </div>
                      <CollapsibleContent className="space-y-4">
                        <p className="text-muted-foreground">
                          All work at height must comply with the Work at Height Regulations 2005 and HSE guidance.
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                          <li>
                            <strong>Risk assessment</strong> - Complete a specific risk assessment for all work at height.
                          </li>
                          <li>
                            <strong>Hierarchy of controls</strong>
                            <ul className="list-disc pl-5 mt-1 space-y-1">
                              <li>Avoid working at height where possible</li>
                              <li>Use work equipment to prevent falls (e.g. tower scaffold with guardrails)</li>
                              <li>Mitigate distance and consequences of falls (e.g. fall arrest systems)</li>
                              <li>Provide additional training and instruction</li>
                            </ul>
                          </li>
                          <li>
                            <strong>Equipment selection</strong> - Choose appropriate equipment:
                            <ul className="list-disc pl-5 mt-1 space-y-1">
                              <li>Ladders only for short duration, light work (maximum 30 minutes)</li>
                              <li>Podium steps or tower scaffold for longer duration work</li>
                              <li>Mobile elevated working platforms (MEWPs) for extensive overhead work</li>
                              <li>All equipment must be inspected before use and have valid inspection certificates</li>
                            </ul>
                          </li>
                          <li>
                            <strong>Competence</strong> - Ensure all workers are trained for the specific access equipment being used.
                          </li>
                        </ul>
                        <div className="bg-elec-yellow/10 p-3 rounded-md">
                          <h4 className="font-medium mb-1">Required Documentation:</h4>
                          <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                            <li>Work at height risk assessment</li>
                            <li>Equipment inspection records</li>
                            <li>Training certificates (e.g. PASMA, IPAF)</li>
                            <li>Rescue plan for work at height</li>
                          </ul>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                    
                    <Collapsible className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">Testing and Inspection</h3>
                        <CollapsibleTrigger className="rounded-md border border-input h-8 w-8 p-0 flex items-center justify-center">
                          <ClipboardCheck className="h-4 w-4" />
                        </CollapsibleTrigger>
                      </div>
                      <CollapsibleContent className="space-y-4">
                        <p className="text-muted-foreground">
                          All electrical testing must comply with BS 7671 and Guidance Note 3.
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                          <li>
                            <strong>Safe testing procedure</strong>
                            <ul className="list-disc pl-5 mt-1 space-y-1">
                              <li>Conduct risk assessment before testing begins</li>
                              <li>Only qualified persons to undertake testing (qualified supervisor under BS 7671)</li>
                              <li>Ensure test equipment is appropriate and calibrated</li>
                              <li>Inform all affected parties before testing commences</li>
                              <li>Secure the test area to prevent unauthorised access</li>
                            </ul>
                          </li>
                          <li>
                            <strong>Dead testing sequence</strong> - Follow the correct sequence:
                            <ul className="list-disc pl-5 mt-1 space-y-1">
                              <li>Continuity of protective conductors</li>
                              <li>Continuity of ring final circuit conductors</li>
                              <li>Insulation resistance</li>
                              <li>Site applied insulation</li>
                              <li>Protection by separation of circuits</li>
                              <li>Protection by barriers or enclosures</li>
                              <li>Polarity</li>
                              <li>Earth electrode resistance</li>
                            </ul>
                          </li>
                          <li>
                            <strong>Live testing</strong> - Conduct with caution:
                            <ul className="list-disc pl-5 mt-1 space-y-1">
                              <li>Earth fault loop impedance tests</li>
                              <li>RCD operation tests</li>
                              <li>Phase sequence tests</li>
                              <li>Functional testing</li>
                            </ul>
                          </li>
                          <li>
                            <strong>Certification</strong> - Complete appropriate certification:
                            <ul className="list-disc pl-5 mt-1 space-y-1">
                              <li>Electrical Installation Certificate (EIC) for new installations</li>
                              <li>Electrical Installation Condition Report (EICR) for existing installations</li>
                              <li>Minor Electrical Installation Works Certificate for additions</li>
                            </ul>
                          </li>
                        </ul>
                        <div className="bg-elec-yellow/10 p-3 rounded-md">
                          <h4 className="font-medium mb-1">Recommended Testing Equipment:</h4>
                          <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                            <li>Multifunction tester compliant with BS EN 61557</li>
                            <li>Proving unit for voltage indicator</li>
                            <li>Approved voltage indicator</li>
                            <li>Earth loop impedance tester</li>
                            <li>RCD tester</li>
                          </ul>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                    
                    <Button className="w-full">Download Full Safety Protocol Handbook</Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface ChecklistItem {
  text: string;
  details: string;
}

interface InteractiveChecklistCardProps {
  id: string;
  title: string;
  description: string;
  icon: any;
  items: ChecklistItem[];
  isExpanded: boolean;
  onToggle: () => void;
}

const InteractiveChecklistCard = ({ 
  id, 
  title, 
  description, 
  icon: Icon, 
  items, 
  isExpanded, 
  onToggle 
}: InteractiveChecklistCardProps) => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleItem = (index: number) => {
    setCheckedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const progress = items.length > 0 ? (checkedCount / items.length) * 100 : 0;

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-md bg-elec-yellow/10">
            <Icon className="h-6 w-6 text-elec-yellow" />
          </div>
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription className="mt-1">{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          {!isExpanded && (
            <>
              <ul className="space-y-2">
                {items.slice(0, 3).map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-elec-yellow"></span>
                    <span className="text-muted-foreground">{item.text}</span>
                  </li>
                ))}
                {items.length > 3 && (
                  <li className="text-sm text-muted-foreground italic">
                    +{items.length - 3} more items...
                  </li>
                )}
              </ul>
              <div className="mt-4 mb-2">
                <div className="flex items-center justify-between mb-1 text-xs">
                  <span>Completion</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-1.5 bg-elec-dark/60 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-elec-yellow" 
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            </>
          )}
          
          {isExpanded && (
            <div className="space-y-4">
              <ul className="space-y-3">
                {items.map((item, index) => (
                  <li key={index} className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        id={`${id}-item-${index}`} 
                        checked={!!checkedItems[index]}
                        onChange={() => toggleItem(index)}
                        className="rounded border-gray-400 text-elec-yellow focus:ring-elec-yellow"
                      />
                      <label 
                        htmlFor={`${id}-item-${index}`}
                        className={`text-sm font-medium ${checkedItems[index] ? 'line-through opacity-70' : ''}`}
                      >
                        {item.text}
                      </label>
                    </div>
                    <p className="text-xs text-muted-foreground pl-6 mt-1">
                      {item.details}
                    </p>
                  </li>
                ))}
              </ul>
              
              <div className="mt-4 mb-2">
                <div className="flex items-center justify-between mb-1 text-xs">
                  <span>Completion</span>
                  <span>{checkedCount} of {items.length} ({Math.round(progress)}%)</span>
                </div>
                <div className="h-2 bg-elec-dark/60 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-elec-yellow transition-all duration-300" 
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <Button 
          onClick={onToggle} 
          variant={isExpanded ? "default" : "outline"} 
          className="w-full"
        >
          {isExpanded ? "Collapse Checklist" : "View Full Checklist"}
        </Button>
      </CardContent>
    </Card>
  );
};

interface InteractiveGuideCardProps {
  id: string;
  title: string;
  description: string;
  icon: any;
  content: React.ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
}

const InteractiveGuideCard = ({ 
  id, 
  title, 
  description, 
  icon: Icon, 
  content,
  isExpanded, 
  onToggle 
}: InteractiveGuideCardProps) => {
  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-md bg-elec-yellow/10">
            <Icon className="h-6 w-6 text-elec-yellow" />
          </div>
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription className="mt-1">{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {!isExpanded ? (
          <p className="text-muted-foreground mb-4">
            Access detailed guidance for conducting proper assessments according to UK electrical regulations
            and industry best practices.
          </p>
        ) : (
          <div className="mb-6">
            {content}
          </div>
        )}
        
        <Button 
          size="sm" 
          onClick={onToggle}
          variant={isExpanded ? "default" : "outline"}
          className="w-full"
        >
          {isExpanded ? "Collapse Guide" : "View Guide"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default OnJobAssessment;
