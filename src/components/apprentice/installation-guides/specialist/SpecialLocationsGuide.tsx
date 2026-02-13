
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  ShowerHead,
  Waves,
  Thermometer,
  HardHat,
  Tractor,
  Box,
  Car,
  Anchor,
  Heart,
  PartyPopper,
  Sun,
  Caravan,
  Zap,
  Gauge,
  Tent,
  AlertTriangle,
  CheckCircle,
  Shield,
  Info,
  ExternalLink,
  Droplets,
  Flame,
  Users,
  MapPin
} from "lucide-react";
import { Link } from "react-router-dom";

const SpecialLocationsGuide = () => {
  // Section 701 - Bathrooms (Quick Reference)
  const bathroomQuickRef = {
    section: "Section 701",
    title: "Bathrooms & Shower Rooms",
    color: "cyan",
    icon: ShowerHead,
    description: "Locations containing a bath or shower - detailed guide available in Domestic Installations",
    linkTo: "/apprentice/on-job-tools/electrical-installation-guides/domestic",
    zones: [
      { zone: "Zone 0", description: "Inside the bath or shower basin", ipRating: "IPX7", voltage: "SELV 12V AC / 30V DC only" },
      { zone: "Zone 1", description: "Above Zone 0 to 2.25m from floor", ipRating: "IPX4 (IPX5 if jets)", voltage: "SELV permitted, equipment rated for zone" },
      { zone: "Zone 2", description: "0.6m beyond Zone 1", ipRating: "IPX4", voltage: "Specified equipment only" },
      { zone: "Outside Zones", description: "3m from Zone 1 edge", ipRating: "General requirements", voltage: "30mA RCD protection" }
    ],
    keyRequirements: [
      "30mA RCD protection for ALL circuits in bathroom",
      "Supplementary equipotential bonding may be required",
      "Socket outlets only permitted if SELV or 3m+ from Zone 1",
      "Shaver sockets must comply with BS EN 61558-2-5"
    ]
  };

  // Section 702 - Swimming Pools
  const swimmingPoolsRef = {
    section: "Section 702",
    title: "Swimming Pools & Paddling Pools",
    color: "blue",
    icon: Waves,
    description: "Basins of swimming pools, paddling pools and surrounding areas",
    linkTo: "/apprentice/on-job-tools/electrical-installation-guides/specialist/swimming-pools",
    zones: [
      { zone: "Zone 0", description: "Interior of pool basin", ipRating: "IPX8", voltage: "SELV 12V AC only" },
      { zone: "Zone 1", description: "2m from Zone 0 edge, 2.5m above", ipRating: "IPX5", voltage: "SELV or protective measures" },
      { zone: "Zone 2", description: "1.5m beyond Zone 1", ipRating: "IPX4", voltage: "Specific equipment only" }
    ],
    keyRequirements: [
      "All metallic parts must be bonded (supplementary bonding)",
      "No socket outlets in Zones 0, 1 or 2",
      "Switching devices only SELV in Zones 0 and 1",
      "Underwater lighting must be SELV at 12V AC max",
      "Electrical equipment for pool use only"
    ]
  };

  // Section 703 - Saunas
  const saunasData = {
    section: "Section 703",
    title: "Saunas & Hot Rooms",
    color: "orange",
    icon: Flame,
    description: "Rooms with temperatures significantly higher than normal ambient",
    temperatureZones: [
      {
        zone: "Zone A (Floor level)",
        temperature: "Up to 40C",
        cables: "Standard cables acceptable",
        equipment: "No restrictions on insulation rating"
      },
      {
        zone: "Zone B (Above Zone A to ceiling)",
        temperature: "40C to 125C",
        cables: "Heat resistant cables required (170C rated)",
        equipment: "Controls and sauna heater only"
      },
      {
        zone: "Zone C (Above heater)",
        temperature: "Up to 140C",
        cables: "Only heater connection cables",
        equipment: "Heater and guard rails only"
      }
    ],
    cableTypes: [
      { type: "Standard T&E", maxTemp: "70C", suitability: "Zone A only, outside sauna" },
      { type: "Silicone insulated", maxTemp: "180C", suitability: "Zones B and C, heater connections" },
      { type: "Mineral insulated (MICC)", maxTemp: "250C", suitability: "All zones, highest protection" },
      { type: "Heat resistant flex", maxTemp: "170C", suitability: "Heater connections only" }
    ],
    keyRequirements: [
      "IP24 minimum for all equipment in sauna",
      "No socket outlets inside sauna room",
      "Lighting must be suitable for temperature zone",
      "Emergency stop outside sauna room",
      "RCD protection 30mA for all circuits",
      "Metal conduit not permitted due to burn risk"
    ]
  };

  // Section 704 - Construction Sites
  const constructionSitesData = {
    section: "Section 704",
    title: "Construction & Demolition Sites",
    color: "yellow",
    icon: HardHat,
    description: "Temporary electrical installations during construction work",
    voltageRequirements: [
      {
        voltage: "110V CTE (Centre Tapped Earth)",
        use: "Portable hand tools and lighting",
        maxVoltage: "55V to earth",
        protection: "Reduced risk of electric shock"
      },
      {
        voltage: "230V Single Phase",
        use: "Fixed equipment, site offices",
        protection: "30mA RCD protection mandatory",
        notes: "Only where 110V not practical"
      },
      {
        voltage: "400V Three Phase",
        use: "Large machinery, cranes, hoists",
        protection: "30mA RCD + overcurrent protection",
        notes: "Restricted access required"
      }
    ],
    transformerRequirements: [
      { type: "110V Site Transformer", rating: "1kVA - 10kVA", outlets: "16A BS 4343 yellow", earthing: "Centre tapped secondary" },
      { type: "Portable Tool Transformer", rating: "1.5kVA - 3.3kVA", outlets: "16A BS 4343 yellow", earthing: "Centre tapped earth" }
    ],
    earthingSystems: [
      { system: "TT System", description: "Most common on construction sites", earthing: "Local earth electrode required" },
      { system: "TN-S (if available)", description: "Permanent supply connected", earthing: "Use supply earth" }
    ],
    keyRequirements: [
      "All equipment minimum IP44 (splashproof)",
      "Portable equipment must be PAT tested regularly",
      "Distribution boards weatherproof and locked",
      "Cable routes protected from vehicle damage",
      "Temporary installations inspected every 3 months",
      "Emergency lighting in tunnels and enclosed spaces"
    ]
  };

  // Section 705 - Agricultural
  const agriculturalData = {
    section: "Section 705",
    title: "Agricultural & Horticultural Premises",
    color: "green",
    icon: Tractor,
    description: "Farms, barns, livestock housing, and horticultural buildings",
    livestockProtection: [
      {
        aspect: "Touch Voltage Limits",
        requirement: "25V AC / 60V DC maximum",
        reason: "Animals more sensitive than humans to electric shock"
      },
      {
        aspect: "Protective Bonding",
        requirement: "All accessible metalwork bonded",
        reason: "Metal stalls, water troughs, feeders create shock paths"
      },
      {
        aspect: "Reduced Disconnection Time",
        requirement: "0.2 seconds maximum for 32A circuits",
        reason: "Faster protection for livestock areas"
      }
    ],
    ipRatings: [
      { location: "Livestock areas", ipRating: "IP44 minimum", reason: "Dust, moisture, animal contact" },
      { location: "Feed storage areas", ipRating: "IP54 or higher", reason: "Combustible dust hazard" },
      { location: "Milking parlours", ipRating: "IPX5", reason: "Regular high-pressure washing" },
      { location: "Grain stores", ipRating: "IP6X", reason: "Explosive dust atmospheres" }
    ],
    bonding: [
      "All metal stalls and feeding barriers",
      "Metal water troughs and drinking bowls",
      "Milking equipment and metal pipework",
      "Metal grids, gratings, and walkways",
      "Earth electrode resistance max 200 ohms"
    ],
    keyRequirements: [
      "SELV or PELV recommended for livestock areas",
      "Cables protected from rodent damage (SWA or conduit)",
      "No socket outlets in flammable dust areas",
      "Fire-resistant switchgear in hay/straw storage",
      "External isolator for fire brigade access",
      "Regular inspection - minimum 3 yearly"
    ]
  };

  // Section 706 - Restrictive Conductive Locations
  const restrictiveLocationsData = {
    section: "Section 706",
    title: "Restrictive Conductive Locations",
    color: "purple",
    icon: Box,
    description: "Locations where movement is restricted by surrounding conductive surfaces",
    definition: "A location whose dimensions restrict movement so that parts of the body are likely to be in continuous contact with extraneous-conductive-parts (e.g., inside boilers, tanks, ducts, metal vessels)",
    examples: [
      "Inside metallic tanks and vessels",
      "Metal boilers and pressure vessels",
      "Inside metallic pipes and ducts",
      "Ship holds and metal containers",
      "Inside metal silos"
    ],
    requirements: [
      {
        measure: "SELV Only",
        details: "Maximum 25V AC or 60V DC",
        implementation: "Isolating transformer outside location"
      },
      {
        measure: "Protective Separation",
        details: "Portable Class II equipment only",
        implementation: "Supply via isolating transformer"
      }
    ],
    keyRequirements: [
      "SELV is the ONLY permitted protective measure",
      "SELV source (transformer) must be OUTSIDE the location",
      "No socket outlets inside restrictive location",
      "Class II equipment with protective separation as alternative",
      "All portable equipment double insulated",
      "Continuous supervision may be required"
    ]
  };

  // Section 708 - Caravan Parks
  const caravanParksData = {
    section: "Section 708",
    title: "Caravan & Camping Parks",
    color: "teal",
    icon: Caravan,
    description: "Electrical installations in caravan and camping parks providing pitches with electrical connections",
    supplyPillars: [
      { aspect: "Height", requirement: "Socket 0.5m to 1.5m from ground" },
      { aspect: "Rating", requirement: "Minimum 16A per socket outlet" },
      { aspect: "Protection", requirement: "Individual 30mA RCD per socket" },
      { aspect: "Socket Type", requirement: "BS EN 60309-2 (blue industrial)" },
      { aspect: "IP Rating", requirement: "IPX4 minimum, IPX6 for tent sites" }
    ],
    earthingRequirements: [
      { system: "TT Earthing", details: "Most common - local earth electrode", resistance: "Max 200 ohms Ra" },
      { system: "Earth Electrode", details: "At each supply pillar or group", resistance: "Must satisfy 30mA x Ra less than 50V" },
      { system: "PME Warning", details: "PME earthing requires special measures", notes: "See Regulation 708.411.4" }
    ],
    hookUpRequirements: [
      "16A minimum supply per pitch",
      "Blue BS EN 60309-2 connectors",
      "Maximum 20m connection lead length",
      "Lead must be H07RN-F or equivalent",
      "RCD protection at supply point",
      "Clearly marked pitch numbers"
    ],
    keyRequirements: [
      "Each socket protected by individual 30mA RCD",
      "Underground cables buried minimum 0.6m",
      "Overhead cables minimum 3.5m above ground (6m vehicle routes)",
      "PME earthing may not be suitable - verify with DNO",
      "Emergency switching accessible to site management",
      "Annual periodic inspection recommended"
    ]
  };

  // Section 709 - Marinas
  const marinasData = {
    section: "Section 709",
    title: "Marinas & Boat Moorings",
    color: "sky",
    icon: Anchor,
    description: "Shore electrical supply to recreational boats and floating structures",
    floatingStructures: [
      { structure: "Fixed Pontoons", requirements: "Standard shore supply installation", cables: "Flexible for movement" },
      { structure: "Floating Pontoons", requirements: "Allow for vertical movement", cables: "Extra slack for tide" },
      { structure: "Boat Berths", requirements: "Individual metered supply", cables: "Floating cable support" }
    ],
    ipRatings: [
      { location: "Distribution on pontoons", rating: "IP56 minimum" },
      { location: "Socket outlets", rating: "IP56 when not in use, IP44 in use" },
      { location: "Lighting on pontoons", rating: "IP55 minimum" },
      { location: "Underwater equipment", rating: "IPX8" }
    ],
    earthElectrodes: [
      { type: "Shore-based electrode", location: "On land, main earthing", resistance: "As per TT requirements" },
      { type: "Pontoon earthing", location: "Each floating section", resistance: "Bonded to main earth" },
      { type: "No water electrode", location: "Never use water as earth", notes: "Electric shock hazard to swimmers" }
    ],
    keyRequirements: [
      "TT system ONLY - PME not permitted",
      "No use of water as earth electrode",
      "30mA RCD for each socket outlet",
      "Galvanic isolator may be required",
      "Cables must accommodate tide movement",
      "Minimum 16A supply per berth",
      "Salt water corrosion protection essential"
    ]
  };

  // Section 710 - Medical Locations
  const medicalLocationsData = {
    section: "Section 710",
    title: "Medical Locations",
    color: "red",
    icon: Heart,
    description: "Hospitals, clinics, and locations where patients undergo medical treatment",
    groupClassifications: [
      {
        group: "Group 0",
        description: "No applied parts, treatment not dependent on supply",
        examples: "Waiting rooms, corridors, admin offices",
        requirements: "Standard domestic requirements apply"
      },
      {
        group: "Group 1",
        description: "Applied parts to external body",
        examples: "Examination rooms, wards, treatment rooms",
        requirements: "Enhanced protection, supplementary bonding"
      },
      {
        group: "Group 2",
        description: "Applied parts to heart or life support",
        examples: "Operating theatres, ICU, cardiac catheterisation",
        requirements: "IT system, insulation monitoring, enhanced bonding"
      }
    ],
    itSystemRequirements: [
      { aspect: "Insulation Monitoring", requirement: "Alarm at 50k ohms", purpose: "First fault detection" },
      { aspect: "Power Supply", requirement: "IT via isolating transformer", purpose: "Continuity during first fault" },
      { aspect: "Transformer Rating", requirement: "Max 10kVA per transformer", purpose: "Limit fault current" },
      { aspect: "Response Time", requirement: "Switchover less than 0.5s", purpose: "Life support continuity" }
    ],
    bondingRequirements: [
      "Maximum 0.2 ohm resistance in supplementary bonding",
      "All accessible conductive parts within 2.5m of patient",
      "Medical IT earthing bar in each theatre",
      "Touch voltage limit 25V in Group 2 locations",
      "Annual testing of bonding continuity"
    ],
    keyRequirements: [
      "IT system mandatory in Group 2 locations",
      "Insulation monitoring device (IMD) essential",
      "Supplementary bonding in Groups 1 and 2",
      "Emergency power within 0.5 seconds (Group 2)",
      "Fire alarm integration with electrical systems",
      "Specialist design and installation required"
    ]
  };

  // Section 711 - Exhibitions/Shows
  const exhibitionsData = {
    section: "Section 711",
    title: "Exhibitions, Shows & Stands",
    color: "pink",
    icon: PartyPopper,
    description: "Temporary electrical installations for exhibitions, shows, and display stands",
    temporaryWiring: [
      { aspect: "Cable Type", requirement: "Flexible cables H05VV-F or H07RN-F" },
      { aspect: "Protection", requirement: "Mechanical protection in public areas" },
      { aspect: "Joints", requirement: "Minimize joints, all accessible" },
      { aspect: "Routing", requirement: "Clear of walkways, covered if crossing" }
    ],
    safetyRequirements: [
      {
        area: "Public Access Areas",
        requirements: [
          "All cables mechanically protected",
          "No socket outlets at public reach",
          "30mA RCD protection throughout",
          "Fire extinguisher provision"
        ]
      },
      {
        area: "Stand Electrics",
        requirements: [
          "Maximum 32A per exhibitor connection",
          "Individual isolation per stand",
          "Emergency switching accessible",
          "Labelling of all circuits"
        ]
      }
    ],
    keyRequirements: [
      "30mA RCD protection for all final circuits",
      "Inspection before public access permitted",
      "Emergency lighting in enclosed areas",
      "Competent person supervision throughout",
      "Pre-event inspection and testing",
      "Daily visual inspections during event"
    ]
  };

  // Section 712 - Solar PV
  const solarPVRef = {
    section: "Section 712",
    title: "Solar Photovoltaic Systems",
    color: "amber",
    icon: Sun,
    description: "Photovoltaic power supply systems - detailed guide available separately",
    linkTo: "/apprentice/on-job-tools/electrical-installation-guides/specialist/solar-pv",
    keyPoints: [
      "DC isolation at array and inverter",
      "Arc fault detection for DC circuits",
      "Fire service labelling requirements",
      "MCS certification for incentive schemes",
      "G98/G99 DNO notification required",
      "Surge protection recommended"
    ]
  };

  // Section 717 - Mobile Units
  const mobileUnitsData = {
    section: "Section 717",
    title: "Mobile & Transportable Units",
    color: "indigo",
    icon: Car,
    description: "Caravans, motorhomes, and transportable accommodation",
    categories: [
      { type: "Touring Caravans", section: "Section 721", description: "Caravans for temporary use" },
      { type: "Motorhomes", section: "Section 717", description: "Motor vehicles with living accommodation" },
      { type: "Transportable Units", section: "Section 717", description: "Buildings designed to be moved" }
    ],
    supplyRequirements: [
      { aspect: "Inlet", requirement: "BS EN 60309-2 connector, IP44 minimum" },
      { aspect: "Cable", requirement: "25m maximum length, H07RN-F" },
      { aspect: "Protection", requirement: "30mA RCD at supply point" },
      { aspect: "Isolation", requirement: "Main isolator accessible from outside" }
    ],
    keyRequirements: [
      "All 230V circuits 30mA RCD protected",
      "Separation from vehicle/chassis ground",
      "PME earthing protective measures",
      "Annual inspection recommended",
      "Compatibility with European supplies"
    ]
  };

  // Section 721 - Caravans
  const caravansData = {
    section: "Section 721",
    title: "Caravans & Motor Caravans",
    color: "emerald",
    icon: Caravan,
    description: "Internal electrical installations in leisure caravans",
    internalWiring: [
      { component: "Consumer Unit", requirement: "RCD + MCB protection, accessible" },
      { component: "Cables", requirement: "Flexible, secured against vibration" },
      { component: "Socket Outlets", requirement: "Shuttered, double pole switched" },
      { component: "Lighting", requirement: "LED recommended for battery use" }
    ],
    keyRequirements: [
      "Double-pole isolation for all circuits",
      "Inlets positioned to prevent water ingress",
      "30mA RCD protection for mains circuits",
      "12V and 230V systems clearly separated",
      "Bonding of all exposed metalwork",
      "Annual inspection recommended"
    ]
  };

  // Section 722 - EV Charging
  const evChargingRef = {
    section: "Section 722",
    title: "Electric Vehicle Charging",
    color: "lime",
    icon: Zap,
    description: "Electric vehicle charging installations - detailed guide available",
    linkTo: "/apprentice/on-job-tools/electrical-installation-guides/specialist/ev-charging",
    keyPoints: [
      "Type A or B RCD (DC leakage protection)",
      "O-PEN device for TN-C-S supplies",
      "Dedicated circuit per charging point",
      "Earth electrode verification",
      "Smart charging capability",
      "Load management for multiple units"
    ]
  };

  // Section 729 - Operating & Maintenance Gangways
  const gangwaysData = {
    section: "Section 729",
    title: "Operating & Maintenance Gangways",
    color: "slate",
    icon: Users,
    description: "Access areas for operating or maintaining switchgear and controlgear",
    clearanceRequirements: [
      { aspect: "Gangway Width", minimum: "700mm clear", notes: "Between facing equipment" },
      { aspect: "Height Clearance", minimum: "2000mm", notes: "Full length of gangway" },
      { aspect: "Door Width", minimum: "600mm clear", notes: "Access to gangway" },
      { aspect: "Escape Routes", minimum: "Two exits", notes: "For gangways over 20m" }
    ],
    keyRequirements: [
      "Adequate lighting - minimum 200 lux",
      "Emergency lighting provision",
      "Non-slip flooring material",
      "Barriers at open sides",
      "Arc flash protection consideration",
      "Clear of obstructions and stored materials"
    ]
  };

  // Section 740 - Temporary Structures
  const fairgroundsData = {
    section: "Section 740",
    title: "Temporary Structures & Fairgrounds",
    color: "fuchsia",
    icon: Tent,
    description: "Amusement devices, marquees, and temporary outdoor structures",
    amusementDevices: [
      { type: "Rides requiring power", protection: "30mA RCD, emergency stop", notes: "Annual inspection" },
      { type: "Lighting installations", protection: "30mA RCD, mechanical protection", notes: "IP44 minimum" },
      { type: "Food stalls", protection: "30mA RCD per outlet", notes: "Portable appliance testing" }
    ],
    temporaryStructures: [
      { structure: "Marquees", requirements: "Temporary distribution, RCD protection", earthing: "TT with local electrode" },
      { structure: "Stage structures", requirements: "Performance lighting and PA", earthing: "Enhanced bonding" },
      { structure: "Festival installations", requirements: "Multiple distribution points", earthing: "Coordination with generators" }
    ],
    keyRequirements: [
      "30mA RCD for all final circuits",
      "Daily visual inspection during operation",
      "Emergency stop accessible to operators",
      "Cables protected from public access",
      "Generator earthing arrangements verified",
      "Inspection before public access"
    ]
  };

  const getColorClasses = (color: string) => {
    const colors: Record<string, { border: string; bg: string; text: string; badge: string }> = {
      cyan: { border: "border-cyan-500/30", bg: "bg-cyan-500/10", text: "text-cyan-300", badge: "border-cyan-400 text-cyan-300" },
      blue: { border: "border-blue-500/30", bg: "bg-blue-500/10", text: "text-blue-300", badge: "border-blue-400 text-blue-300" },
      orange: { border: "border-orange-500/30", bg: "bg-orange-500/10", text: "text-orange-300", badge: "border-orange-400 text-orange-300" },
      yellow: { border: "border-yellow-500/30", bg: "bg-yellow-500/10", text: "text-yellow-300", badge: "border-yellow-400 text-yellow-300" },
      green: { border: "border-green-500/30", bg: "bg-green-500/10", text: "text-green-300", badge: "border-green-400 text-green-300" },
      purple: { border: "border-purple-500/30", bg: "bg-purple-500/10", text: "text-purple-300", badge: "border-purple-400 text-purple-300" },
      teal: { border: "border-teal-500/30", bg: "bg-teal-500/10", text: "text-teal-300", badge: "border-teal-400 text-teal-300" },
      sky: { border: "border-sky-500/30", bg: "bg-sky-500/10", text: "text-sky-300", badge: "border-sky-400 text-sky-300" },
      red: { border: "border-red-500/30", bg: "bg-red-500/10", text: "text-red-300", badge: "border-red-400 text-red-300" },
      pink: { border: "border-pink-500/30", bg: "bg-pink-500/10", text: "text-pink-300", badge: "border-pink-400 text-pink-300" },
      amber: { border: "border-amber-500/30", bg: "bg-amber-500/10", text: "text-amber-300", badge: "border-amber-400 text-amber-300" },
      indigo: { border: "border-indigo-500/30", bg: "bg-indigo-500/10", text: "text-indigo-300", badge: "border-indigo-400 text-indigo-300" },
      emerald: { border: "border-emerald-500/30", bg: "bg-emerald-500/10", text: "text-emerald-300", badge: "border-emerald-400 text-emerald-300" },
      lime: { border: "border-lime-500/30", bg: "bg-lime-500/10", text: "text-lime-300", badge: "border-lime-400 text-lime-300" },
      slate: { border: "border-slate-500/30", bg: "bg-slate-500/10", text: "text-white", badge: "border-slate-400 text-white" },
      fuchsia: { border: "border-fuchsia-500/30", bg: "bg-fuchsia-500/10", text: "text-fuchsia-300", badge: "border-fuchsia-400 text-fuchsia-300" }
    };
    return colors[color] || colors.blue;
  };

  const renderSectionHeader = (section: string, title: string, color: string, Icon: React.ElementType, description: string) => {
    const colors = getColorClasses(color);
    return (
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Icon className={`h-6 w-6 ${colors.text}`} />
          <div>
            <Badge variant="outline" className={`${colors.badge} text-xs mb-1`}>{section}</Badge>
            <CardTitle className={colors.text}>{title}</CardTitle>
          </div>
        </div>
        <p className="text-white text-sm">{description}</p>
      </CardHeader>
    );
  };

  return (
    <div className="space-y-6">
      {/* Introduction */}
      <Card className="border-elec-yellow/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <MapPin className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">BS 7671 Part 7: Special Locations</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-elec-yellow/50 bg-elec-yellow/10">
            <Info className="h-4 w-4 text-elec-yellow" />
            <AlertDescription className="text-elec-yellow/90">
              Part 7 of BS 7671 contains requirements for special installations and locations. These supplement
              or modify the general requirements of Parts 1-6 and take precedence where there is any conflict.
            </AlertDescription>
          </Alert>

          <div className="bg-white/10 p-4 rounded-lg border border-elec-yellow/20">
            <h4 className="font-medium text-white mb-3">Why Special Locations Require Additional Requirements</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="flex items-start gap-2">
                <Droplets className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-white">Increased risk of electric shock (wet locations, pools)</span>
              </div>
              <div className="flex items-start gap-2">
                <Flame className="h-4 w-4 text-orange-400 mt-0.5 flex-shrink-0" />
                <span className="text-white">High temperature environments (saunas, hot rooms)</span>
              </div>
              <div className="flex items-start gap-2">
                <Users className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                <span className="text-white">Vulnerable persons (medical, agricultural)</span>
              </div>
              <div className="flex items-start gap-2">
                <HardHat className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span className="text-white">Temporary installations (construction, exhibitions)</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 701 - Bathrooms (Quick Reference with Link) */}
      <Card className={`${getColorClasses(bathroomQuickRef.color).border} bg-white/5`}>
        {renderSectionHeader(bathroomQuickRef.section, bathroomQuickRef.title, bathroomQuickRef.color, bathroomQuickRef.icon, bathroomQuickRef.description)}
        <CardContent className="space-y-4">
          <div className={`${getColorClasses(bathroomQuickRef.color).bg} p-4 rounded-lg border ${getColorClasses(bathroomQuickRef.color).border}`}>
            <h4 className="font-medium text-white mb-3">Zone Summary</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-cyan-500/30">
                    <th className="text-left py-2 text-cyan-200">Zone</th>
                    <th className="text-left py-2 text-cyan-200">Description</th>
                    <th className="text-left py-2 text-cyan-200">IP Rating</th>
                    <th className="text-left py-2 text-cyan-200">Voltage</th>
                  </tr>
                </thead>
                <tbody>
                  {bathroomQuickRef.zones.map((zone, idx) => (
                    <tr key={idx} className="border-b border-cyan-500/20">
                      <td className="py-2 text-white font-medium">{zone.zone}</td>
                      <td className="py-2 text-white">{zone.description}</td>
                      <td className="py-2 text-cyan-300">{zone.ipRating}</td>
                      <td className="py-2 text-white">{zone.voltage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-cyan-600/20 rounded-lg border border-cyan-500/30">
            <span className="text-cyan-200 text-sm">For complete bathroom installation guidance:</span>
            <Link
              to={bathroomQuickRef.linkTo}
              className="flex items-center gap-2 text-cyan-300 hover:text-cyan-100 transition-colors"
            >
              <span className="text-sm font-medium">View Domestic Guide</span>
              <ExternalLink className="h-4 w-4" />
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Section 702 - Swimming Pools (Quick Reference with Link) */}
      <Card className={`${getColorClasses(swimmingPoolsRef.color).border} bg-white/5`}>
        {renderSectionHeader(swimmingPoolsRef.section, swimmingPoolsRef.title, swimmingPoolsRef.color, swimmingPoolsRef.icon, swimmingPoolsRef.description)}
        <CardContent className="space-y-4">
          <div className={`${getColorClasses(swimmingPoolsRef.color).bg} p-4 rounded-lg border ${getColorClasses(swimmingPoolsRef.color).border}`}>
            <h4 className="font-medium text-white mb-3">Zone Summary</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-blue-500/30">
                    <th className="text-left py-2 text-blue-200">Zone</th>
                    <th className="text-left py-2 text-blue-200">Description</th>
                    <th className="text-left py-2 text-blue-200">IP Rating</th>
                    <th className="text-left py-2 text-blue-200">Voltage</th>
                  </tr>
                </thead>
                <tbody>
                  {swimmingPoolsRef.zones.map((zone, idx) => (
                    <tr key={idx} className="border-b border-blue-500/20">
                      <td className="py-2 text-white font-medium">{zone.zone}</td>
                      <td className="py-2 text-white">{zone.description}</td>
                      <td className="py-2 text-blue-300">{zone.ipRating}</td>
                      <td className="py-2 text-white">{zone.voltage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-2">
            {swimmingPoolsRef.keyRequirements.map((req, idx) => (
              <div key={idx} className="flex items-start gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-white">{req}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Section 703 - Saunas (Full Detail) */}
      <Card className={`${getColorClasses(saunasData.color).border} bg-white/5`}>
        {renderSectionHeader(saunasData.section, saunasData.title, saunasData.color, saunasData.icon, saunasData.description)}
        <CardContent className="space-y-4">
          <div className={`${getColorClasses(saunasData.color).bg} p-4 rounded-lg border ${getColorClasses(saunasData.color).border}`}>
            <h4 className="font-medium text-white mb-3">Temperature Zones</h4>
            <div className="space-y-3">
              {saunasData.temperatureZones.map((zone, idx) => (
                <div key={idx} className="bg-orange-600/20 p-3 rounded border border-orange-500/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-orange-200">{zone.zone}</span>
                    <Badge variant="outline" className="border-orange-400 text-orange-300 text-xs">{zone.temperature}</Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <div><span className="text-white">Cables:</span> <span className="text-white">{zone.cables}</span></div>
                    <div><span className="text-white">Equipment:</span> <span className="text-white">{zone.equipment}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`${getColorClasses(saunasData.color).bg} p-4 rounded-lg border ${getColorClasses(saunasData.color).border}`}>
            <h4 className="font-medium text-white mb-3">Cable Selection for Saunas</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-orange-500/30">
                    <th className="text-left py-2 text-orange-200">Cable Type</th>
                    <th className="text-left py-2 text-orange-200">Max Temp</th>
                    <th className="text-left py-2 text-orange-200">Suitability</th>
                  </tr>
                </thead>
                <tbody>
                  {saunasData.cableTypes.map((cable, idx) => (
                    <tr key={idx} className="border-b border-orange-500/20">
                      <td className="py-2 text-white">{cable.type}</td>
                      <td className="py-2 text-orange-300">{cable.maxTemp}</td>
                      <td className="py-2 text-white">{cable.suitability}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <Alert className="border-orange-500/50 bg-orange-500/10">
            <AlertTriangle className="h-4 w-4 text-orange-400" />
            <AlertDescription className="text-orange-200 text-sm">
              Metal conduit is NOT permitted in saunas due to the risk of burns from hot metalwork.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Section 704 - Construction Sites (Full Detail) */}
      <Card className={`${getColorClasses(constructionSitesData.color).border} bg-white/5`}>
        {renderSectionHeader(constructionSitesData.section, constructionSitesData.title, constructionSitesData.color, constructionSitesData.icon, constructionSitesData.description)}
        <CardContent className="space-y-4">
          <div className={`${getColorClasses(constructionSitesData.color).bg} p-4 rounded-lg border ${getColorClasses(constructionSitesData.color).border}`}>
            <h4 className="font-medium text-white mb-3">Voltage Requirements</h4>
            <div className="space-y-3">
              {constructionSitesData.voltageRequirements.map((volt, idx) => (
                <div key={idx} className="bg-yellow-600/20 p-3 rounded border border-yellow-500/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="border-yellow-400 text-yellow-300">{volt.voltage}</Badge>
                    <span className="text-yellow-100 font-medium">{volt.use}</span>
                  </div>
                  <div className="text-sm text-white">
                    <span className="text-white">Protection: </span>{volt.protection}
                    {volt.maxVoltage && <span className="ml-2">| <span className="text-white">Max to earth: </span>{volt.maxVoltage}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`${getColorClasses(constructionSitesData.color).bg} p-4 rounded-lg border ${getColorClasses(constructionSitesData.color).border}`}>
              <h4 className="font-medium text-white mb-3">Site Transformers</h4>
              <div className="space-y-2">
                {constructionSitesData.transformerRequirements.map((trans, idx) => (
                  <div key={idx} className="text-sm">
                    <span className="text-yellow-200 font-medium">{trans.type}</span>
                    <div className="text-white mt-1">
                      Rating: {trans.rating} | Outlets: {trans.outlets}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`${getColorClasses(constructionSitesData.color).bg} p-4 rounded-lg border ${getColorClasses(constructionSitesData.color).border}`}>
              <h4 className="font-medium text-white mb-3">Earthing Systems</h4>
              <div className="space-y-2">
                {constructionSitesData.earthingSystems.map((earth, idx) => (
                  <div key={idx} className="text-sm">
                    <span className="text-yellow-200 font-medium">{earth.system}</span>
                    <div className="text-white">{earth.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium text-white">Key Requirements</h4>
            {constructionSitesData.keyRequirements.map((req, idx) => (
              <div key={idx} className="flex items-start gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span className="text-white">{req}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Section 705 - Agricultural (Full Detail) */}
      <Card className={`${getColorClasses(agriculturalData.color).border} bg-white/5`}>
        {renderSectionHeader(agriculturalData.section, agriculturalData.title, agriculturalData.color, agriculturalData.icon, agriculturalData.description)}
        <CardContent className="space-y-4">
          <Alert className="border-green-500/50 bg-green-500/10">
            <AlertTriangle className="h-4 w-4 text-green-400" />
            <AlertDescription className="text-green-200 text-sm">
              <strong>Livestock are more vulnerable to electric shock than humans.</strong> Touch voltage must
              not exceed 25V AC or 60V DC in areas accessible to livestock.
            </AlertDescription>
          </Alert>

          <div className={`${getColorClasses(agriculturalData.color).bg} p-4 rounded-lg border ${getColorClasses(agriculturalData.color).border}`}>
            <h4 className="font-medium text-white mb-3">Livestock Protection Requirements</h4>
            <div className="space-y-3">
              {agriculturalData.livestockProtection.map((item, idx) => (
                <div key={idx} className="bg-green-600/20 p-3 rounded border border-green-500/30">
                  <span className="text-green-200 font-medium">{item.aspect}</span>
                  <div className="text-sm mt-1">
                    <span className="text-green-100">{item.requirement}</span>
                    <div className="text-white mt-1">{item.reason}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`${getColorClasses(agriculturalData.color).bg} p-4 rounded-lg border ${getColorClasses(agriculturalData.color).border}`}>
            <h4 className="font-medium text-white mb-3">IP Ratings by Location</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-green-500/30">
                    <th className="text-left py-2 text-green-200">Location</th>
                    <th className="text-left py-2 text-green-200">IP Rating</th>
                    <th className="text-left py-2 text-green-200">Reason</th>
                  </tr>
                </thead>
                <tbody>
                  {agriculturalData.ipRatings.map((ip, idx) => (
                    <tr key={idx} className="border-b border-green-500/20">
                      <td className="py-2 text-white">{ip.location}</td>
                      <td className="py-2 text-green-300">{ip.ipRating}</td>
                      <td className="py-2 text-white">{ip.reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className={`${getColorClasses(agriculturalData.color).bg} p-4 rounded-lg border ${getColorClasses(agriculturalData.color).border}`}>
            <h4 className="font-medium text-white mb-3">Supplementary Bonding Requirements</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {agriculturalData.bonding.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 text-sm">
                  <Shield className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 706 - Restrictive Conductive Locations */}
      <Card className={`${getColorClasses(restrictiveLocationsData.color).border} bg-white/5`}>
        {renderSectionHeader(restrictiveLocationsData.section, restrictiveLocationsData.title, restrictiveLocationsData.color, restrictiveLocationsData.icon, restrictiveLocationsData.description)}
        <CardContent className="space-y-4">
          <Alert className="border-red-500/50 bg-red-500/10">
            <AlertTriangle className="h-4 w-4 text-red-400" />
            <AlertDescription className="text-red-200 text-sm">
              <strong>CRITICAL:</strong> SELV is the ONLY permitted protective measure in restrictive conductive
              locations. Standard fault protection is not adequate due to continuous body contact with
              conductive surfaces.
            </AlertDescription>
          </Alert>

          <div className={`${getColorClasses(restrictiveLocationsData.color).bg} p-4 rounded-lg border ${getColorClasses(restrictiveLocationsData.color).border}`}>
            <h4 className="font-medium text-white mb-3">Definition</h4>
            <p className="text-purple-200 text-sm">{restrictiveLocationsData.definition}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`${getColorClasses(restrictiveLocationsData.color).bg} p-4 rounded-lg border ${getColorClasses(restrictiveLocationsData.color).border}`}>
              <h4 className="font-medium text-white mb-3">Examples</h4>
              <ul className="space-y-2">
                {restrictiveLocationsData.examples.map((example, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <Box className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                    <span className="text-white">{example}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={`${getColorClasses(restrictiveLocationsData.color).bg} p-4 rounded-lg border ${getColorClasses(restrictiveLocationsData.color).border}`}>
              <h4 className="font-medium text-white mb-3">Permitted Measures</h4>
              {restrictiveLocationsData.requirements.map((req, idx) => (
                <div key={idx} className="mb-3">
                  <span className="text-purple-200 font-medium">{req.measure}</span>
                  <p className="text-sm text-white">{req.details}</p>
                  <p className="text-xs text-white">{req.implementation}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 708 - Caravan Parks */}
      <Card className={`${getColorClasses(caravanParksData.color).border} bg-white/5`}>
        {renderSectionHeader(caravanParksData.section, caravanParksData.title, caravanParksData.color, caravanParksData.icon, caravanParksData.description)}
        <CardContent className="space-y-4">
          <div className={`${getColorClasses(caravanParksData.color).bg} p-4 rounded-lg border ${getColorClasses(caravanParksData.color).border}`}>
            <h4 className="font-medium text-white mb-3">Supply Pillar Requirements</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-teal-500/30">
                    <th className="text-left py-2 text-teal-200">Aspect</th>
                    <th className="text-left py-2 text-teal-200">Requirement</th>
                  </tr>
                </thead>
                <tbody>
                  {caravanParksData.supplyPillars.map((item, idx) => (
                    <tr key={idx} className="border-b border-teal-500/20">
                      <td className="py-2 text-white">{item.aspect}</td>
                      <td className="py-2 text-teal-300">{item.requirement}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className={`${getColorClasses(caravanParksData.color).bg} p-4 rounded-lg border ${getColorClasses(caravanParksData.color).border}`}>
            <h4 className="font-medium text-white mb-3">Earthing Requirements</h4>
            <div className="space-y-2">
              {caravanParksData.earthingRequirements.map((earth, idx) => (
                <div key={idx} className="bg-teal-600/20 p-3 rounded border border-teal-500/30">
                  <span className="text-teal-200 font-medium">{earth.system}</span>
                  <div className="text-sm text-white">{earth.details}</div>
                  <div className="text-xs text-white">{earth.resistance || earth.notes}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium text-white">Hook-Up Requirements</h4>
            {caravanParksData.hookUpRequirements.map((req, idx) => (
              <div key={idx} className="flex items-start gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-teal-400 mt-0.5 flex-shrink-0" />
                <span className="text-white">{req}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Section 709 - Marinas */}
      <Card className={`${getColorClasses(marinasData.color).border} bg-white/5`}>
        {renderSectionHeader(marinasData.section, marinasData.title, marinasData.color, marinasData.icon, marinasData.description)}
        <CardContent className="space-y-4">
          <Alert className="border-sky-500/50 bg-sky-500/10">
            <AlertTriangle className="h-4 w-4 text-sky-400" />
            <AlertDescription className="text-sky-200 text-sm">
              <strong>WARNING:</strong> PME (TN-C-S) earthing is NOT permitted at marinas. Water must NEVER
              be used as an earth electrode due to electric shock risk to swimmers.
            </AlertDescription>
          </Alert>

          <div className={`${getColorClasses(marinasData.color).bg} p-4 rounded-lg border ${getColorClasses(marinasData.color).border}`}>
            <h4 className="font-medium text-white mb-3">IP Ratings for Marina Installations</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-sky-500/30">
                    <th className="text-left py-2 text-sky-200">Location</th>
                    <th className="text-left py-2 text-sky-200">IP Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {marinasData.ipRatings.map((ip, idx) => (
                    <tr key={idx} className="border-b border-sky-500/20">
                      <td className="py-2 text-white">{ip.location}</td>
                      <td className="py-2 text-sky-300">{ip.rating}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-2">
            {marinasData.keyRequirements.map((req, idx) => (
              <div key={idx} className="flex items-start gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-sky-400 mt-0.5 flex-shrink-0" />
                <span className="text-white">{req}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Section 710 - Medical Locations */}
      <Card className={`${getColorClasses(medicalLocationsData.color).border} bg-white/5`}>
        {renderSectionHeader(medicalLocationsData.section, medicalLocationsData.title, medicalLocationsData.color, medicalLocationsData.icon, medicalLocationsData.description)}
        <CardContent className="space-y-4">
          <div className={`${getColorClasses(medicalLocationsData.color).bg} p-4 rounded-lg border ${getColorClasses(medicalLocationsData.color).border}`}>
            <h4 className="font-medium text-white mb-3">Group Classifications</h4>
            <div className="space-y-3">
              {medicalLocationsData.groupClassifications.map((group, idx) => (
                <div key={idx} className="bg-red-600/20 p-3 rounded border border-red-500/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="border-red-400 text-red-300">{group.group}</Badge>
                    <span className="text-red-100 font-medium">{group.description}</span>
                  </div>
                  <div className="text-sm">
                    <div className="text-white"><span className="text-white">Examples:</span> {group.examples}</div>
                    <div className="text-white"><span className="text-white">Requirements:</span> {group.requirements}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`${getColorClasses(medicalLocationsData.color).bg} p-4 rounded-lg border ${getColorClasses(medicalLocationsData.color).border}`}>
            <h4 className="font-medium text-white mb-3">IT System Requirements (Group 2)</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-red-500/30">
                    <th className="text-left py-2 text-red-200">Aspect</th>
                    <th className="text-left py-2 text-red-200">Requirement</th>
                    <th className="text-left py-2 text-red-200">Purpose</th>
                  </tr>
                </thead>
                <tbody>
                  {medicalLocationsData.itSystemRequirements.map((req, idx) => (
                    <tr key={idx} className="border-b border-red-500/20">
                      <td className="py-2 text-white">{req.aspect}</td>
                      <td className="py-2 text-red-300">{req.requirement}</td>
                      <td className="py-2 text-white">{req.purpose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <Alert className="border-red-500/50 bg-red-500/10">
            <Heart className="h-4 w-4 text-red-400" />
            <AlertDescription className="text-red-200 text-sm">
              Medical electrical installations are life-critical. Specialist design and installation by
              competent persons with healthcare experience is essential.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Section 711 - Exhibitions */}
      <Card className={`${getColorClasses(exhibitionsData.color).border} bg-white/5`}>
        {renderSectionHeader(exhibitionsData.section, exhibitionsData.title, exhibitionsData.color, exhibitionsData.icon, exhibitionsData.description)}
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`${getColorClasses(exhibitionsData.color).bg} p-4 rounded-lg border ${getColorClasses(exhibitionsData.color).border}`}>
              <h4 className="font-medium text-white mb-3">Temporary Wiring</h4>
              <div className="space-y-2">
                {exhibitionsData.temporaryWiring.map((item, idx) => (
                  <div key={idx} className="text-sm">
                    <span className="text-pink-200">{item.aspect}:</span>
                    <span className="text-white ml-2">{item.requirement}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={`${getColorClasses(exhibitionsData.color).bg} p-4 rounded-lg border ${getColorClasses(exhibitionsData.color).border}`}>
              <h4 className="font-medium text-white mb-3">Key Requirements</h4>
              <div className="space-y-2">
                {exhibitionsData.keyRequirements.map((req, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-pink-400 mt-0.5 flex-shrink-0" />
                    <span className="text-white">{req}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 712 - Solar PV (Link) */}
      <Card className={`${getColorClasses(solarPVRef.color).border} bg-white/5`}>
        {renderSectionHeader(solarPVRef.section, solarPVRef.title, solarPVRef.color, solarPVRef.icon, solarPVRef.description)}
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {solarPVRef.keyPoints.map((point, idx) => (
              <div key={idx} className="flex items-start gap-2 text-sm">
                <Sun className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                <span className="text-white">{point}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between p-3 bg-amber-600/20 rounded-lg border border-amber-500/30">
            <span className="text-amber-200 text-sm">For complete Solar PV installation guidance:</span>
            <Link
              to={solarPVRef.linkTo}
              className="flex items-center gap-2 text-amber-300 hover:text-amber-100 transition-colors"
            >
              <span className="text-sm font-medium">View Solar PV Guide</span>
              <ExternalLink className="h-4 w-4" />
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Section 717 & 721 - Mobile Units & Caravans */}
      <Card className={`${getColorClasses(mobileUnitsData.color).border} bg-white/5`}>
        {renderSectionHeader(mobileUnitsData.section, mobileUnitsData.title, mobileUnitsData.color, mobileUnitsData.icon, mobileUnitsData.description)}
        <CardContent className="space-y-4">
          <div className={`${getColorClasses(mobileUnitsData.color).bg} p-4 rounded-lg border ${getColorClasses(mobileUnitsData.color).border}`}>
            <h4 className="font-medium text-white mb-3">Supply Connection Requirements</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-indigo-500/30">
                    <th className="text-left py-2 text-indigo-200">Aspect</th>
                    <th className="text-left py-2 text-indigo-200">Requirement</th>
                  </tr>
                </thead>
                <tbody>
                  {mobileUnitsData.supplyRequirements.map((item, idx) => (
                    <tr key={idx} className="border-b border-indigo-500/20">
                      <td className="py-2 text-white">{item.aspect}</td>
                      <td className="py-2 text-indigo-300">{item.requirement}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-2">
            {mobileUnitsData.keyRequirements.map((req, idx) => (
              <div key={idx} className="flex items-start gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                <span className="text-white">{req}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Section 722 - EV Charging (Link) */}
      <Card className={`${getColorClasses(evChargingRef.color).border} bg-white/5`}>
        {renderSectionHeader(evChargingRef.section, evChargingRef.title, evChargingRef.color, evChargingRef.icon, evChargingRef.description)}
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {evChargingRef.keyPoints.map((point, idx) => (
              <div key={idx} className="flex items-start gap-2 text-sm">
                <Zap className="h-4 w-4 text-lime-400 mt-0.5 flex-shrink-0" />
                <span className="text-white">{point}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between p-3 bg-lime-600/20 rounded-lg border border-lime-500/30">
            <span className="text-lime-200 text-sm">For complete EV Charging installation guidance:</span>
            <Link
              to={evChargingRef.linkTo}
              className="flex items-center gap-2 text-lime-300 hover:text-lime-100 transition-colors"
            >
              <span className="text-sm font-medium">View EV Charging Guide</span>
              <ExternalLink className="h-4 w-4" />
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Section 729 - Gangways */}
      <Card className={`${getColorClasses(gangwaysData.color).border} bg-white/5`}>
        {renderSectionHeader(gangwaysData.section, gangwaysData.title, gangwaysData.color, gangwaysData.icon, gangwaysData.description)}
        <CardContent className="space-y-4">
          <div className={`${getColorClasses(gangwaysData.color).bg} p-4 rounded-lg border ${getColorClasses(gangwaysData.color).border}`}>
            <h4 className="font-medium text-white mb-3">Clearance Requirements</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-500/30">
                    <th className="text-left py-2 text-slate-200">Aspect</th>
                    <th className="text-left py-2 text-slate-200">Minimum</th>
                    <th className="text-left py-2 text-slate-200">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {gangwaysData.clearanceRequirements.map((item, idx) => (
                    <tr key={idx} className="border-b border-slate-500/20">
                      <td className="py-2 text-white">{item.aspect}</td>
                      <td className="py-2 text-white">{item.minimum}</td>
                      <td className="py-2 text-white">{item.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-2">
            {gangwaysData.keyRequirements.map((req, idx) => (
              <div key={idx} className="flex items-start gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-slate-400 mt-0.5 flex-shrink-0" />
                <span className="text-white">{req}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Section 740 - Fairgrounds */}
      <Card className={`${getColorClasses(fairgroundsData.color).border} bg-white/5`}>
        {renderSectionHeader(fairgroundsData.section, fairgroundsData.title, fairgroundsData.color, fairgroundsData.icon, fairgroundsData.description)}
        <CardContent className="space-y-4">
          <div className={`${getColorClasses(fairgroundsData.color).bg} p-4 rounded-lg border ${getColorClasses(fairgroundsData.color).border}`}>
            <h4 className="font-medium text-white mb-3">Amusement Device Requirements</h4>
            <div className="space-y-2">
              {fairgroundsData.amusementDevices.map((device, idx) => (
                <div key={idx} className="bg-fuchsia-600/20 p-3 rounded border border-fuchsia-500/30">
                  <span className="text-fuchsia-200 font-medium">{device.type}</span>
                  <div className="text-sm text-white">{device.protection}</div>
                  <div className="text-xs text-white">{device.notes}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            {fairgroundsData.keyRequirements.map((req, idx) => (
              <div key={idx} className="flex items-start gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-fuchsia-400 mt-0.5 flex-shrink-0" />
                <span className="text-white">{req}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Critical Safety Summary */}
      <Card className="border-red-500/50 bg-red-500/10">
        <CardHeader>
          <CardTitle className="text-red-300 flex items-center gap-2">
            <Shield className="h-6 w-6" />
            Special Locations Critical Safety Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-3">
              <div className="bg-red-500/10 p-3 rounded-lg border border-red-500/30">
                <h4 className="font-medium text-red-200 mb-2">Always Remember</h4>
                <ul className="space-y-1 text-white">
                  <li>Part 7 requirements SUPPLEMENT Parts 1-6</li>
                  <li>Where there is conflict, Part 7 takes precedence</li>
                  <li>Specialist knowledge required for many locations</li>
                  <li>Consult IET Guidance Note 7 for detailed guidance</li>
                </ul>
              </div>
            </div>
            <div className="space-y-3">
              <div className="bg-orange-500/10 p-3 rounded-lg border border-orange-500/30">
                <h4 className="font-medium text-orange-200 mb-2">Before Starting Work</h4>
                <ul className="space-y-1 text-white">
                  <li>Identify ALL applicable special location sections</li>
                  <li>Review specific IP rating requirements</li>
                  <li>Confirm earthing arrangements are suitable</li>
                  <li>Plan inspection and testing requirements</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SpecialLocationsGuide;
