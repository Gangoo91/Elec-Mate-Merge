
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, FileText, AlertTriangle, Users, Calendar, MapPin, Clock, Eye, Download, Share2 } from "lucide-react";
import { useState } from "react";

const CaseStudiesTab = () => {
  const [selectedCase, setSelectedCase] = useState<string | null>(null);
  const [filterSeverity, setFilterSeverity] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");

  const caseStudies = [
    {
      id: "case-001",
      title: "Fatal Arc Flash Incident - Industrial Facility",
      date: "March 2023",
      location: "Manufacturing Plant, Birmingham",
      severity: "Fatal",
      category: "Arc Flash",
      industry: "Manufacturing",
      description: "Investigation into a fatal arc flash incident during maintenance work on a 11kV switchgear. The victim was an experienced electrician performing routine maintenance when an arc flash occurred.",
      detailedDescription: "A 45-year-old qualified electrician was performing routine maintenance on an 11kV switchgear panel when an arc flash incident occurred. The electrician was wearing standard PPE but not arc-rated clothing. The incident resulted in severe burns and ultimately proved fatal.",
      keyLearnings: [
        "Inadequate PPE selection for arc flash risk level",
        "Lack of comprehensive arc flash risk assessment",
        "Insufficient training on arc flash hazards",
        "No energised electrical work permit system in place"
      ],
      preventiveMeasures: [
        "Comprehensive arc flash studies and labelling",
        "Implementation of appropriate PPE programs",
        "Enhanced training protocols for arc flash awareness",
        "Development of energised work permit systems"
      ],
      regulations: ["Electricity at Work Regulations 1989", "CDM Regulations 2015", "PUWER 1998"],
      timeline: [
        "09:30 - Work commenced on switchgear maintenance",
        "10:15 - Arc flash incident occurred",
        "10:16 - Emergency services called",
        "10:45 - Victim transported to hospital",
        "Investigation commenced same day"
      ],
      rootCauses: [
        "Inadequate risk assessment",
        "Inappropriate PPE selection",
        "Lack of arc flash awareness training",
        "Absence of safety management systems"
      ],
      lessonsLearned: "This incident highlights the critical importance of comprehensive arc flash risk assessments and appropriate PPE selection. All electrical work must be properly planned with appropriate safety measures.",
      impact: "High",
      investigationDuration: "6 months",
      fineAmount: "£300,000",
      views: 1247,
      difficulty: "Advanced"
    },
    {
      id: "case-002",
      title: "Electric Shock from Faulty RCD Protection",
      date: "January 2023",
      location: "Residential Property, Manchester",
      severity: "Serious",
      category: "Electric Shock",
      industry: "Domestic",
      description: "An apprentice electrician received an electric shock due to faulty RCD protection on a domestic installation during routine testing work.",
      detailedDescription: "A second-year apprentice was conducting routine electrical testing in a domestic property when they received an electric shock from a socket outlet. Investigation revealed that the RCD protection had failed but this wasn't detected during previous testing.",
      keyLearnings: [
        "Importance of regular RCD testing procedures",
        "Limitations of visual inspection methods",
        "Critical need for emergency response procedures",
        "Proper use of voltage indicators and proving units"
      ],
      preventiveMeasures: [
        "Implementation of monthly RCD testing schedules",
        "Use of portable RCD devices for additional protection",
        "Enhanced first aid training for electrical incidents",
        "Improved testing and verification procedures"
      ],
      regulations: ["BS 7671:2018", "Electricity at Work Regulations 1989", "Health and Safety at Work Act 1974"],
      timeline: [
        "14:00 - Testing work commenced",
        "14:30 - Electric shock incident",
        "14:31 - Emergency procedures activated",
        "14:45 - Paramedics arrived on site",
        "15:30 - Investigation began"
      ],
      rootCauses: [
        "Faulty RCD device",
        "Inadequate testing procedures",
        "Lack of additional protection measures",
        "Insufficient supervision of apprentice"
      ],
      lessonsLearned: "Regular testing of protective devices is essential. This case demonstrates why additional protection measures and proper supervision are crucial when working with electricity.",
      impact: "Medium",
      investigationDuration: "3 months",
      fineAmount: "£50,000",
      views: 892,
      difficulty: "Intermediate"
    },
    {
      id: "case-003",
      title: "Lockout/Tagout Failure - Commercial Building",
      date: "November 2022",
      location: "Office Complex, London",
      severity: "Near Miss",
      category: "Isolation Procedures",
      industry: "Commercial",
      description: "A near-miss incident caused by improper lockout/tagout procedures during maintenance work on a commercial electrical system.",
      detailedDescription: "During planned maintenance work on a commercial building's electrical system, a contractor nearly worked on live equipment due to inadequate isolation procedures. The incident was prevented when another worker noticed the error.",
      keyLearnings: [
        "Critical importance of communication between teams",
        "Need for proper isolation verification procedures",
        "Dangers of rushed work practices under pressure",
        "Importance of double-checking isolation"
      ],
      preventiveMeasures: [
        "Enhanced lockout/tagout procedures and training",
        "Implementation of double verification systems",
        "Improved communication protocols between shifts",
        "Regular safety briefings and toolbox talks"
      ],
      regulations: ["BS EN 50110", "Electricity at Work Regulations 1989", "CDM Regulations 2015"],
      timeline: [
        "08:00 - Day shift isolation procedure",
        "16:00 - Shift change",
        "16:30 - Night shift commenced work",
        "17:00 - Near miss discovered",
        "17:15 - Work stopped and investigation began"
      ],
      rootCauses: [
        "Poor communication between shifts",
        "Inadequate isolation verification",
        "Time pressure affecting safety procedures",
        "Insufficient lockout/tagout training"
      ],
      lessonsLearned: "Effective communication and proper isolation procedures are fundamental to electrical safety. This near-miss shows how easily accidents can occur without proper systems.",
      impact: "Low",
      investigationDuration: "1 month",
      fineAmount: "No fine",
      views: 654,
      difficulty: "Beginner"
    },
    {
      id: "case-004",
      title: "Overhead Line Contact - Construction Site",
      date: "September 2022",
      location: "Construction Site, Leeds",
      severity: "Fatal",
      category: "Overhead Lines",
      industry: "Construction",
      description: "Fatal incident involving contact with overhead power lines during crane operations on a construction site.",
      detailedDescription: "A crane operator was moving materials when the crane's jib contacted 11kV overhead power lines. The operator was electrocuted and died at the scene. Investigation revealed inadequate site planning and lack of exclusion zones.",
      keyLearnings: [
        "Critical importance of comprehensive site planning",
        "Need for proper exclusion zones around overhead lines",
        "Importance of coordination with Distribution Network Operators",
        "Essential nature of height restriction measures"
      ],
      preventiveMeasures: [
        "Comprehensive site surveys including overhead line mapping",
        "Implementation of proper exclusion zones and barriers",
        "Enhanced coordination with DNO for line identification",
        "Use of height restriction devices on mobile plant"
      ],
      regulations: ["HSG47 Avoiding Danger from Overhead Power Lines", "CDM Regulations 2015", "Electricity at Work Regulations 1989"],
      timeline: [
        "07:30 - Crane operations commenced",
        "09:45 - Contact with overhead lines",
        "09:46 - Emergency services alerted",
        "10:30 - Site evacuated and secured",
        "Investigation commenced immediately"
      ],
      rootCauses: [
        "Inadequate site planning and risk assessment",
        "Lack of overhead line identification",
        "Absence of exclusion zones",
        "Poor coordination with electricity supplier"
      ],
      lessonsLearned: "Overhead lines present significant risks that must be properly managed through planning, identification, and control measures. This tragic case emphasises the need for comprehensive site safety planning.",
      impact: "High",
      investigationDuration: "8 months",
      fineAmount: "£500,000",
      views: 1856,
      difficulty: "Advanced"
    },
    {
      id: "case-005",
      title: "Consumer Unit Fire - Domestic Rewire",
      date: "July 2023",
      location: "Terraced House, Bristol",
      severity: "Serious",
      category: "Fire",
      industry: "Domestic",
      description: "A house fire originated from a newly installed consumer unit due to poor workmanship and inadequate cable terminations.",
      detailedDescription: "Three weeks after a full domestic rewire, a fire broke out in the utility cupboard where the new consumer unit had been installed. Investigation revealed loose terminations, undersized cables on high-load circuits, and missing fire barriers. The family escaped but the property suffered £80,000 in damage.",
      keyLearnings: [
        "Importance of proper torque settings on terminal connections",
        "Correct cable sizing calculations for actual load",
        "Fire stopping and barrier requirements in domestic installations",
        "Value of post-installation inspection and testing"
      ],
      preventiveMeasures: [
        "Use of torque screwdrivers for all terminations",
        "Independent inspection of completed work",
        "Thermal imaging checks on new installations",
        "Proper documentation and certification procedures"
      ],
      regulations: ["BS 7671:2018 Section 526", "Building Regulations Part P", "Electricity at Work Regulations 1989"],
      timeline: [
        "Week 1 - Rewire work commenced",
        "Week 2 - Consumer unit installed",
        "Week 3 - EIC issued and work signed off",
        "Week 6 - Fire discovered at 02:30",
        "Investigation revealed workmanship failures"
      ],
      rootCauses: [
        "Loose terminal connections causing arcing",
        "Undersized 4mm² cable on 9.5kW shower circuit",
        "Missing fire barriers around cable penetrations",
        "Inadequate supervision of work quality"
      ],
      lessonsLearned: "This case demonstrates that poor workmanship can have devastating consequences even weeks after installation. Proper torque settings, cable sizing, and independent verification are essential safeguards.",
      impact: "High",
      investigationDuration: "4 months",
      fineAmount: "£125,000",
      views: 2341,
      difficulty: "Intermediate"
    },
    {
      id: "case-006",
      title: "Buried Cable Strike - Garden Landscaping",
      date: "August 2023",
      location: "Residential Garden, Southampton",
      severity: "Serious",
      category: "Underground Cables",
      industry: "Domestic",
      description: "A landscaper struck a buried electrical cable while digging a trench for garden lighting, causing serious burns and electrical injuries.",
      detailedDescription: "A self-employed landscaper was installing garden lighting when his spade cut through a buried armoured cable supplying an outbuilding. The cable was not at the required depth and no cable location survey had been conducted. The worker suffered significant burns to hands and arms.",
      keyLearnings: [
        "Essential requirement for cable avoidance tools (CAT scanners)",
        "Understanding of safe digging practices near services",
        "Importance of as-built drawings and service records",
        "Recognition that 'garden' work can involve serious hazards"
      ],
      preventiveMeasures: [
        "Always use CAT and Genny before excavation",
        "Request service drawings before any digging",
        "Hand dig within 500mm of suspected services",
        "Ensure cables are installed at correct depth (500mm minimum)"
      ],
      regulations: ["HSG47 Avoiding Danger from Underground Services", "Electricity at Work Regulations 1989", "CDM Regulations 2015"],
      timeline: [
        "09:00 - Landscaping work commenced",
        "11:30 - Cable struck during trenching",
        "11:31 - Emergency services called",
        "12:15 - DNO attended to isolate supply",
        "Worker hospitalised for 5 days"
      ],
      rootCauses: [
        "No cable avoidance survey conducted",
        "Original installation at insufficient depth",
        "No records of cable route available",
        "Assumption that garden work is low risk"
      ],
      lessonsLearned: "Underground services can be anywhere. This incident reinforces that cable location equipment must be used before ANY excavation work, regardless of how minor it may seem.",
      impact: "Medium",
      investigationDuration: "2 months",
      fineAmount: "£45,000",
      views: 1567,
      difficulty: "Beginner"
    },
    {
      id: "case-007",
      title: "Apprentice Ladder Fall - Socket Installation",
      date: "October 2023",
      location: "New Build Estate, Milton Keynes",
      severity: "Serious",
      category: "Working at Height",
      industry: "Construction",
      description: "A first-year apprentice fell from a stepladder while installing a high-level socket, sustaining a broken wrist and concussion.",
      detailedDescription: "An 18-year-old apprentice was left unsupervised to install a socket for a wall-mounted TV at 2.4m height. Using a worn stepladder on an uneven floor, they overreached and fell. The supervising electrician was working in another room at the time of the incident.",
      keyLearnings: [
        "Apprentices require direct supervision for working at height",
        "Proper equipment selection and inspection before use",
        "Three points of contact rule when on ladders",
        "Importance of level, stable footing for access equipment"
      ],
      preventiveMeasures: [
        "Direct supervision for apprentices on elevated work",
        "Pre-use inspection of all access equipment",
        "Use of podium steps for extended work at height",
        "Level base or use of leg levellers on uneven surfaces"
      ],
      regulations: ["Work at Height Regulations 2005", "Management of Health and Safety at Work Regulations 1999", "Apprenticeship Standards"],
      timeline: [
        "08:30 - Work commenced on site",
        "10:00 - Supervisor moved to different area",
        "10:45 - Fall occurred",
        "10:46 - First aider attended",
        "11:15 - Ambulance arrived"
      ],
      rootCauses: [
        "Inadequate supervision of apprentice",
        "Defective stepladder not removed from service",
        "No assessment of floor conditions",
        "Overreaching instead of repositioning ladder"
      ],
      lessonsLearned: "Apprentices need appropriate supervision levels based on their competence. This case shows how quickly accidents can happen when supervision lapses, even for seemingly simple tasks.",
      impact: "Medium",
      investigationDuration: "6 weeks",
      fineAmount: "£35,000",
      views: 1823,
      difficulty: "Beginner"
    },
    {
      id: "case-008",
      title: "Three-Phase Imbalance - Industrial Motor Failure",
      date: "May 2023",
      location: "Food Processing Plant, Grimsby",
      severity: "Near Miss",
      category: "Industrial Systems",
      industry: "Industrial",
      description: "A three-phase motor overheated due to phase imbalance, nearly causing a fire in a food processing area.",
      detailedDescription: "During routine maintenance, one phase connection to a large conveyor motor was not properly tightened. Over several weeks, the loose connection caused increasing resistance and phase imbalance. The motor overheated to near-ignition point before thermal protection finally tripped.",
      keyLearnings: [
        "Importance of torque verification on three-phase connections",
        "Understanding phase imbalance and its effects",
        "Regular thermographic surveys on industrial equipment",
        "Value of motor protection devices and their correct settings"
      ],
      preventiveMeasures: [
        "Documented torque checks on all connections",
        "Annual thermographic surveys on distribution equipment",
        "Phase imbalance monitoring systems",
        "Regular motor current measurements to detect issues"
      ],
      regulations: ["BS 7671:2018 Section 433", "PUWER 1998", "DSEAR 2002"],
      timeline: [
        "March - Maintenance work completed",
        "April - Slight increase in motor running temperature noted",
        "May Week 1 - Unusual humming reported by operators",
        "May Week 2 - Thermal protection tripped",
        "Investigation revealed loose connection"
      ],
      rootCauses: [
        "Terminal not torqued to specification",
        "No post-maintenance verification procedure",
        "Operator reports not escalated promptly",
        "Inadequate thermal monitoring"
      ],
      lessonsLearned: "Phase imbalance is a gradual killer of motors and can create serious fire risks. Proper connection torques and regular thermal monitoring are essential preventive measures in industrial settings.",
      impact: "Low",
      investigationDuration: "3 weeks",
      fineAmount: "No fine",
      views: 987,
      difficulty: "Advanced"
    },
    {
      id: "case-009",
      title: "Temporary Installation Electrocution - Festival Site",
      date: "June 2023",
      location: "Music Festival, Hertfordshire",
      severity: "Fatal",
      category: "Temporary Installations",
      industry: "Events",
      description: "A festival worker was electrocuted by a temporary power installation that had not been properly protected against ground conditions.",
      detailedDescription: "During setup for a music festival, a 23-year-old worker touched a generator distribution board that had become live due to water ingress. Heavy rain had flooded the area but work continued. The installation lacked adequate IP rating and earth fault protection for the conditions.",
      keyLearnings: [
        "Temporary installations require same standards as permanent",
        "Weather conditions must be considered in risk assessments",
        "IP ratings must match environmental conditions",
        "Additional RCD protection essential for outdoor events"
      ],
      preventiveMeasures: [
        "Use of IP65 or higher rated equipment outdoors",
        "30mA RCD protection on all circuits",
        "Regular inspection during changing weather",
        "Elevated equipment positions in flood-prone areas"
      ],
      regulations: ["BS 7909 Temporary Electrical Systems", "BS 7671:2018 Section 740", "Electricity at Work Regulations 1989"],
      timeline: [
        "06:00 - Heavy rain commenced",
        "08:00 - Work continued despite flooding",
        "09:30 - Fatality occurred",
        "09:32 - Power isolated and emergency services called",
        "Site closed for investigation"
      ],
      rootCauses: [
        "Inadequate IP rating for outdoor conditions",
        "No RCD protection on distribution circuit",
        "Work continued despite dangerous conditions",
        "Pressure to meet setup deadline"
      ],
      lessonsLearned: "Temporary does not mean temporary standards. This tragedy shows that outdoor and temporary installations face unique hazards that require specific protective measures and the courage to stop work when conditions deteriorate.",
      impact: "High",
      investigationDuration: "10 months",
      fineAmount: "£750,000",
      views: 3421,
      difficulty: "Advanced"
    },
    {
      id: "case-010",
      title: "Data Centre UPS Explosion - Battery Room",
      date: "February 2023",
      location: "Data Centre, Slough",
      severity: "Serious",
      category: "Battery Systems",
      industry: "Commercial",
      description: "A battery explosion in a data centre UPS room caused injuries to two technicians and significant equipment damage.",
      detailedDescription: "During routine UPS maintenance, a lead-acid battery exploded due to hydrogen gas accumulation and an ignition source from sparking during connection work. Two technicians suffered burns and hearing damage. Investigation revealed inadequate ventilation and missing gas detection systems.",
      keyLearnings: [
        "Battery rooms require specific ventilation calculations",
        "Hydrogen gas detection systems are essential",
        "Non-sparking tools required for battery work",
        "Emergency eyewash and shower facilities required"
      ],
      preventiveMeasures: [
        "Ventilation to prevent hydrogen accumulation (BS EN 50272-2)",
        "Hydrogen detection with automatic alarm and ventilation boost",
        "Use of insulated, non-sparking tools",
        "PPE including face shields and chemical-resistant gloves"
      ],
      regulations: ["BS EN 50272-2 Battery Installations", "DSEAR 2002", "Electricity at Work Regulations 1989"],
      timeline: [
        "09:00 - Maintenance work began",
        "09:45 - Battery terminal connection commenced",
        "09:47 - Explosion occurred",
        "09:48 - Fire alarm activated, evacuation began",
        "Both workers treated for injuries"
      ],
      rootCauses: [
        "Ventilation system not operational during work",
        "No hydrogen gas detection fitted",
        "Standard tools used instead of non-sparking",
        "PPE not appropriate for battery work"
      ],
      lessonsLearned: "Battery systems present explosion risks that are often underestimated. This case emphasises the importance of treating battery rooms as hazardous areas requiring specific safety measures and procedures.",
      impact: "Medium",
      investigationDuration: "5 months",
      fineAmount: "£280,000",
      views: 1654,
      difficulty: "Advanced"
    },
    {
      id: "case-011",
      title: "School Rewire Near Miss - Live Working",
      date: "April 2023",
      location: "Primary School, Newcastle",
      severity: "Near Miss",
      category: "Live Working",
      industry: "Commercial",
      description: "An electrician nearly contacted live parts while working on what was believed to be an isolated circuit in a school during term time.",
      detailedDescription: "During a partial rewire of a primary school, an electrician began work on a circuit he believed was isolated. Unknown to him, the circuit had been incorrectly labelled and was fed from a different distribution board. A colleague noticed the voltage indicator hadn't been used and stopped the work.",
      keyLearnings: [
        "Always prove dead at point of work, not just at isolation point",
        "Distribution board labelling must be verified, not trusted",
        "Working in occupied buildings adds complexity",
        "Colleague intervention can save lives"
      ],
      preventiveMeasures: [
        "Prove dead at every point of work without exception",
        "Verify circuit identification through testing, not labels",
        "Enhanced isolation procedures in occupied buildings",
        "Two-person verification for complex isolations"
      ],
      regulations: ["Electricity at Work Regulations 1989 Reg 13", "BS 7671:2018 Section 537", "GS38 HSE Guidance"],
      timeline: [
        "08:00 - Isolation attempted at DB-3",
        "08:15 - Work commenced without proving dead",
        "08:20 - Colleague noticed omission",
        "08:21 - Work stopped immediately",
        "Circuit found to be live from DB-1"
      ],
      rootCauses: [
        "Failed to prove dead at point of work",
        "Reliance on distribution board labelling",
        "Complacency from working on 'simple' installation",
        "Time pressure from working around school timetable"
      ],
      lessonsLearned: "Proving dead is non-negotiable. This near miss shows how even experienced electricians can make assumptions that could prove fatal. The intervention of a colleague prevented a potential tragedy.",
      impact: "Low",
      investigationDuration: "2 weeks",
      fineAmount: "No fine",
      views: 2156,
      difficulty: "Beginner"
    },
    {
      id: "case-012",
      title: "Solar PV DC Shock - Roof Installation",
      date: "September 2023",
      location: "Farm Building, Devon",
      severity: "Serious",
      category: "Renewable Energy",
      industry: "Agricultural",
      description: "A solar installer received a serious DC electric shock while working on a rooftop PV array in sunny conditions.",
      detailedDescription: "An installer was connecting DC cables from a solar array when they received a shock from exposed conductors. Despite the AC isolator being off, the DC side remained energised by sunlight. The installer had not used appropriate DC-rated PPE or followed solar-specific safe working procedures.",
      keyLearnings: [
        "Solar panels generate DC voltage whenever light hits them",
        "AC isolation does not make DC side safe",
        "DC shocks can be more dangerous than AC at similar voltages",
        "Solar-specific PPE and procedures are essential"
      ],
      preventiveMeasures: [
        "Cover arrays with opaque sheeting before DC work",
        "Use DC-rated insulated tools and gloves",
        "Work at dawn/dusk when output is minimal",
        "Understand that PV DC cannot be truly isolated in daylight"
      ],
      regulations: ["BS 7671:2018 Section 712", "BS EN 62446 PV Systems", "Electricity at Work Regulations 1989"],
      timeline: [
        "10:00 - AC isolator switched off",
        "10:15 - DC connection work commenced",
        "10:18 - Electric shock received",
        "10:20 - First aid administered",
        "Hospital treatment for cardiac monitoring"
      ],
      rootCauses: [
        "Misunderstanding of PV system characteristics",
        "AC isolation assumed to make system safe",
        "No opaque covering used on array",
        "Standard PPE used instead of DC-rated equipment"
      ],
      lessonsLearned: "Solar PV systems present unique hazards because DC is generated whenever light is present. This case highlights that renewable energy technologies require specific competencies and procedures beyond traditional electrical work.",
      impact: "Medium",
      investigationDuration: "3 months",
      fineAmount: "£65,000",
      views: 1987,
      difficulty: "Intermediate"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Fatal": return "bg-red-500/20 text-red-400 border-red-500/30";
      case "Serious": return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "Near Miss": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Intermediate": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "Advanced": return "bg-red-500/20 text-red-400 border-red-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const filteredCaseStudies = caseStudies.filter(study => {
    const severityMatch = filterSeverity === "all" || study.severity === filterSeverity;
    const categoryMatch = filterCategory === "all" || study.category === filterCategory;
    return severityMatch && categoryMatch;
  });

  const handleViewCase = (caseId: string) => {
    setSelectedCase(caseId);
    // Here you would typically navigate to detailed case view
    console.log(`Viewing case: ${caseId}`);
  };

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Interactive Case Studies Library</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Learn from real incidents and near-misses in the electrical industry. Each case study includes detailed 
            analysis, interactive elements, downloadable reports, and practical learning outcomes.
          </p>
          
          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-4">
            <div className="flex gap-2">
              <Button
                variant={filterSeverity === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterSeverity("all")}
              >
                All Severity
              </Button>
              <Button
                variant={filterSeverity === "Fatal" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterSeverity("Fatal")}
              >
                Fatal
              </Button>
              <Button
                variant={filterSeverity === "Serious" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterSeverity("Serious")}
              >
                Serious
              </Button>
              <Button
                variant={filterSeverity === "Near Miss" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterSeverity("Near Miss")}
              >
                Near Miss
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {filteredCaseStudies.map((study, index) => (
          <Card key={study.id} className="border-elec-yellow/20 bg-elec-gray hover:bg-elec-gray/80 transition-colors">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-white text-lg mb-3">{study.title}</CardTitle>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge className={getSeverityColor(study.severity)}>
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      {study.severity}
                    </Badge>
                    <Badge variant="outline" className="text-muted-foreground">
                      {study.category}
                    </Badge>
                    <Badge className={getDifficultyColor(study.difficulty)}>
                      {study.difficulty}
                    </Badge>
                    <Badge variant="outline" className="text-blue-400">
                      <Calendar className="h-3 w-3 mr-1" />
                      {study.date}
                    </Badge>
                    <Badge variant="outline" className="text-green-400">
                      {study.industry}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {study.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {study.investigationDuration} investigation
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {study.views} views
                    </span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4 text-sm">
                {study.detailedDescription}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="text-sm font-medium text-white mb-2 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-red-400" />
                    Root Causes:
                  </h4>
                  <ul className="space-y-1">
                    {study.rootCauses.slice(0, 3).map((cause, causeIndex) => (
                      <li key={causeIndex} className="text-xs text-muted-foreground flex items-center gap-2">
                        <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                        {cause}
                      </li>
                    ))}
                    {study.rootCauses.length > 3 && (
                      <li className="text-xs text-elec-yellow">+{study.rootCauses.length - 3} more causes</li>
                    )}
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-white mb-2 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-green-400" />
                    Prevention Measures:
                  </h4>
                  <ul className="space-y-1">
                    {study.preventiveMeasures.slice(0, 3).map((measure, measureIndex) => (
                      <li key={measureIndex} className="text-xs text-muted-foreground flex items-center gap-2">
                        <span className="w-1 h-1 bg-green-400 rounded-full"></span>
                        {measure}
                      </li>
                    ))}
                    {study.preventiveMeasures.length > 3 && (
                      <li className="text-xs text-elec-yellow">+{study.preventiveMeasures.length - 3} more measures</li>
                    )}
                  </ul>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-white mb-2">Key Learning Outcome:</h4>
                <p className="text-xs text-muted-foreground italic bg-elec-dark/40 p-3 rounded">
                  "{study.lessonsLearned}"
                </p>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {study.regulations.slice(0, 2).map((regulation, regIndex) => (
                    <Badge key={regIndex} variant="outline" className="text-blue-400 text-xs">
                      {regulation}
                    </Badge>
                  ))}
                  {study.regulations.length > 2 && (
                    <Badge variant="outline" className="text-muted-foreground text-xs">
                      +{study.regulations.length - 2} more
                    </Badge>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-3 w-3 mr-1" />
                    Report
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-3 w-3" />
                  </Button>
                  <Button size="sm" onClick={() => handleViewCase(study.id)}>
                    <Eye className="mr-2 h-3 w-3" />
                    View Full Analysis
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-orange-500/50 bg-orange-500/10">
        <CardHeader>
          <CardTitle className="text-orange-300 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Case Studies Analytics & Impact
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            These case studies are based on real incidents reported to the HSE and other safety organisations. 
            They represent valuable learning opportunities that have shaped current safety practices and regulations.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400 mb-1">{caseStudies.length}</div>
              <div className="text-sm text-muted-foreground">Case Studies</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400 mb-1">{caseStudies.filter(c => c.severity === 'Fatal').length}</div>
              <div className="text-sm text-muted-foreground">Fatal Incidents</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400 mb-1">100%</div>
              <div className="text-sm text-muted-foreground">Preventable</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400 mb-1">{caseStudies.reduce((acc, c) => acc + c.views, 0)}</div>
              <div className="text-sm text-muted-foreground">Total Views</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400 mb-1">{caseStudies.filter(c => c.difficulty === 'Advanced').length}</div>
              <div className="text-sm text-muted-foreground">Advanced Cases</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CaseStudiesTab;
