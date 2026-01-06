
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  TestTube,
  FileCheck,
  AlertTriangle,
  CheckCircle,
  Clock,
  Shield,
  Zap,
  Waves,
  ShowerHead,
  Heart,
  HardHat,
  Tractor,
  Caravan,
  Sun,
  Flame,
  Car,
  Info,
  XCircle,
  ListChecks,
  ClipboardCheck
} from "lucide-react";

const SpecialistTestingGuide = () => {
  // Additional Tests Required by Special Location
  const additionalTestsByLocation = [
    {
      location: "Bathrooms (701)",
      color: "cyan",
      icon: ShowerHead,
      standardTests: ["Continuity", "Insulation Resistance", "Polarity", "Zs", "RCD"],
      additionalTests: [
        {
          test: "Supplementary Bonding Continuity",
          requirement: "Max 0.05 ohms between bonded items",
          method: "Low resistance ohmmeter at each bonded connection",
          notes: "May not be required if main bonding adequate and Zs values comply"
        },
        {
          test: "IP Rating Verification",
          requirement: "Zone 0: IPX7, Zone 1: IPX4/X5, Zone 2: IPX4",
          method: "Visual inspection of equipment ratings",
          notes: "Check equipment labels match zone location"
        }
      ],
      criticalValues: [
        { parameter: "RCD Trip Time", value: "30mA in less than 300ms" },
        { parameter: "Zs (0.4s)", value: "As per BS 7671 Table 41.3" },
        { parameter: "Insulation Resistance", value: "Greater than 1M ohm minimum" }
      ]
    },
    {
      location: "Swimming Pools (702)",
      color: "blue",
      icon: Waves,
      standardTests: ["Continuity", "Insulation Resistance", "Polarity", "Zs", "RCD"],
      additionalTests: [
        {
          test: "SELV Verification",
          requirement: "Voltage max 12V AC in zones 0-1",
          method: "Voltage measurement at SELV outputs",
          notes: "Verify transformer isolation and earth separation"
        },
        {
          test: "Supplementary Bonding",
          requirement: "All metalwork within zones bonded",
          method: "Continuity testing max 0.05 ohms",
          notes: "Include pool ladders, diving boards, metallic fixtures"
        },
        {
          test: "Underwater Lighting",
          requirement: "SELV 12V AC max, IPX8 rating",
          method: "Visual inspection and voltage verification",
          notes: "Check watertight seals and transformers"
        }
      ],
      criticalValues: [
        { parameter: "SELV Voltage", value: "Max 12V AC" },
        { parameter: "Bonding Resistance", value: "Less than 0.05 ohms" },
        { parameter: "RCD Trip", value: "30mA in less than 40ms" }
      ]
    },
    {
      location: "Saunas (703)",
      color: "orange",
      icon: Flame,
      standardTests: ["Continuity", "Insulation Resistance", "Polarity", "Zs", "RCD"],
      additionalTests: [
        {
          test: "Temperature Zone Verification",
          requirement: "Equipment rated for installed zone",
          method: "Visual inspection of temperature ratings",
          notes: "Zone B: 125C, Zone C: 140C cable ratings"
        },
        {
          test: "Heater Connection Integrity",
          requirement: "Heat-resistant cables correctly installed",
          method: "Visual and insulation resistance testing",
          notes: "Check silicone or MICC cable ratings"
        },
        {
          test: "Emergency Stop Function",
          requirement: "Isolator accessible outside sauna",
          method: "Functional test of isolation",
          notes: "Must disconnect heater completely"
        }
      ],
      criticalValues: [
        { parameter: "Insulation Resistance", value: "Greater than 1M ohm at ambient temp" },
        { parameter: "Cable Temperature Rating", value: "Min 170C in Zone B" },
        { parameter: "IP Rating", value: "IP24 minimum all zones" }
      ]
    },
    {
      location: "Construction Sites (704)",
      color: "yellow",
      icon: HardHat,
      standardTests: ["Continuity", "Insulation Resistance", "Polarity", "Zs", "RCD"],
      additionalTests: [
        {
          test: "110V Transformer Testing",
          requirement: "Centre tapped earth verified",
          method: "Voltage measurement L-N-E",
          notes: "55V max to earth on each phase"
        },
        {
          test: "IP Rating Inspection",
          requirement: "IP44 minimum for all equipment",
          method: "Visual inspection of enclosure ratings",
          notes: "Higher ratings for exposed positions"
        },
        {
          test: "Earth Electrode Testing (TT)",
          requirement: "Ra such that 30mA x Ra less than 50V",
          method: "Earth electrode resistance measurement",
          notes: "Typically Ra less than 1667 ohms for 30mA RCD"
        },
        {
          test: "PAT Testing",
          requirement: "All portable equipment tested",
          method: "Combined insulation and earth continuity",
          notes: "Frequency depends on equipment class and use"
        }
      ],
      criticalValues: [
        { parameter: "110V to Earth", value: "Max 55V per phase" },
        { parameter: "RCD Trip (socket outlets)", value: "30mA in less than 40ms" },
        { parameter: "Earth Electrode", value: "Appropriate for RCD rating" }
      ]
    },
    {
      location: "Agricultural (705)",
      color: "green",
      icon: Tractor,
      standardTests: ["Continuity", "Insulation Resistance", "Polarity", "Zs", "RCD"],
      additionalTests: [
        {
          test: "Touch Voltage Verification",
          requirement: "Max 25V AC in livestock areas",
          method: "Prospective touch voltage measurement",
          notes: "Use Ut = Zs x Ia calculation"
        },
        {
          test: "Enhanced Supplementary Bonding",
          requirement: "All metal stalls, troughs, feeders bonded",
          method: "Continuity testing max 0.02 ohms",
          notes: "Lower resistance than standard supplementary bonding"
        },
        {
          test: "Disconnection Time",
          requirement: "0.2s max for 32A circuits in livestock areas",
          method: "Calculate from Zs values",
          notes: "Faster disconnection than standard installations"
        },
        {
          test: "Fire Risk Assessment",
          requirement: "Switchgear fire-resistant in flammable areas",
          method: "Visual inspection and documentation review",
          notes: "Check hay/straw storage area equipment"
        }
      ],
      criticalValues: [
        { parameter: "Touch Voltage (livestock)", value: "Max 25V AC" },
        { parameter: "Bonding Resistance", value: "Less than 0.02 ohms" },
        { parameter: "Disconnection Time", value: "0.2s for 32A circuits" }
      ]
    },
    {
      location: "Medical Locations (710)",
      color: "red",
      icon: Heart,
      standardTests: ["Continuity", "Insulation Resistance", "Polarity", "Zs", "RCD"],
      additionalTests: [
        {
          test: "IT System Insulation Monitoring",
          requirement: "IMD alarm at 50k ohms",
          method: "Simulate fault and verify alarm",
          notes: "Essential for Group 2 operating theatres"
        },
        {
          test: "Equipotential Bonding (Medical)",
          requirement: "Max 0.2 ohms in patient environment",
          method: "Low resistance ohmmeter",
          notes: "All conductive parts within 2.5m of patient"
        },
        {
          test: "Changeover System Testing",
          requirement: "Switchover less than 0.5s for Group 2",
          method: "Simulate mains failure, time switchover",
          notes: "Critical for life support equipment"
        },
        {
          test: "Touch Voltage Measurement",
          requirement: "Max 25V in Group 2 locations",
          method: "Direct measurement under fault conditions",
          notes: "Applies to patient contact areas"
        }
      ],
      criticalValues: [
        { parameter: "Bonding Resistance", value: "Max 0.2 ohms" },
        { parameter: "IMD Alarm Threshold", value: "50k ohms" },
        { parameter: "Power Switchover", value: "Less than 0.5 seconds" }
      ]
    },
    {
      location: "Caravan Parks (708)",
      color: "teal",
      icon: Caravan,
      standardTests: ["Continuity", "Insulation Resistance", "Polarity", "Zs", "RCD"],
      additionalTests: [
        {
          test: "Individual RCD Testing",
          requirement: "Each socket outlet 30mA RCD protected",
          method: "RCD test at each supply pillar outlet",
          notes: "Trip time less than 300ms at In"
        },
        {
          test: "Earth Electrode Resistance",
          requirement: "TT system Ra adequate",
          method: "Earth electrode resistance test",
          notes: "30mA x Ra must be less than 50V"
        },
        {
          test: "PME Earthing Verification",
          requirement: "Confirm PME suitability or implement protective measures",
          method: "Review supply type with DNO",
          notes: "Additional measures may be required for PME supplies"
        }
      ],
      criticalValues: [
        { parameter: "RCD per socket", value: "30mA individual protection" },
        { parameter: "Earth Electrode Ra", value: "Typically less than 200 ohms" },
        { parameter: "Socket Height", value: "0.5m to 1.5m from ground" }
      ]
    },
    {
      location: "Solar PV (712)",
      color: "amber",
      icon: Sun,
      standardTests: ["Continuity", "Insulation Resistance", "Polarity", "Zs", "RCD"],
      additionalTests: [
        {
          test: "DC Insulation Resistance",
          requirement: "Voc x 40 ohms/V (minimum)",
          method: "High voltage DC insulation tester",
          notes: "Test array in isolation from inverter"
        },
        {
          test: "Open Circuit Voltage (Voc)",
          requirement: "Within 5% of expected value",
          method: "DC voltmeter at array terminals",
          notes: "Test under clear sky conditions"
        },
        {
          test: "Short Circuit Current (Isc)",
          requirement: "Within 5% of expected value",
          method: "DC clamp meter or shunt",
          notes: "Brief test only - wear appropriate PPE"
        },
        {
          test: "DC Isolator Function",
          requirement: "Complete isolation achieved",
          method: "Functional test and voltage verification",
          notes: "Check both array and inverter isolators"
        },
        {
          test: "Polarity Verification",
          requirement: "Correct polarity throughout DC system",
          method: "Visual and measurement verification",
          notes: "Critical before inverter connection"
        }
      ],
      criticalValues: [
        { parameter: "DC Insulation", value: "Voc x 40 ohms minimum" },
        { parameter: "Voc Deviation", value: "Within +/- 5% of expected" },
        { parameter: "AC RCD", value: "30mA Type A minimum" }
      ]
    },
    {
      location: "EV Charging (722)",
      color: "lime",
      icon: Car,
      standardTests: ["Continuity", "Insulation Resistance", "Polarity", "Zs", "RCD"],
      additionalTests: [
        {
          test: "RCD Type Verification",
          requirement: "Type A or Type B RCD required",
          method: "Visual inspection and RCD test",
          notes: "Type A minimum for DC fault detection (6mA)"
        },
        {
          test: "O-PEN Device Testing",
          requirement: "Disconnect on loss of PEN (TN-C-S)",
          method: "Simulate open PEN and verify trip",
          notes: "Required where PME earth used"
        },
        {
          test: "Earth Electrode (if TT)",
          requirement: "Ra adequate for RCD operation",
          method: "Earth electrode resistance measurement",
          notes: "May be combined with PME for hybrid approach"
        },
        {
          test: "Pilot Signal Verification",
          requirement: "CP signal correct for charge mode",
          method: "Oscilloscope or dedicated EV tester",
          notes: "Verify communication with vehicle"
        },
        {
          test: "Load Management System",
          requirement: "Dynamic load limiting functional",
          method: "Functional test under varied loads",
          notes: "If multiple chargers installed"
        }
      ],
      criticalValues: [
        { parameter: "RCD Type", value: "Minimum Type A" },
        { parameter: "RCD Trip (DC)", value: "6mA DC residual detection" },
        { parameter: "Zs", value: "Appropriate for 32A protection" }
      ]
    }
  ];

  // Documentation Requirements
  const documentationRequirements = [
    {
      location: "All Special Locations",
      requiredDocs: [
        "Electrical Installation Certificate (EIC) with Part 7 annotations",
        "Schedule of Inspections noting special location specifics",
        "Schedule of Test Results with additional tests recorded",
        "Drawings showing zone boundaries where applicable",
        "Equipment location plans with IP ratings marked",
        "Risk assessment specific to location type"
      ]
    },
    {
      location: "Swimming Pools & Spas",
      requiredDocs: [
        "Zone diagram with dimensions",
        "SELV transformer specifications and location",
        "Bonding schedule for all metalwork",
        "Underwater equipment specifications",
        "Water treatment equipment electrical details"
      ]
    },
    {
      location: "Medical Locations",
      requiredDocs: [
        "Group classification for each area",
        "IT system design and IMD specifications",
        "Emergency power changeover test records",
        "Medical equipment electrical requirements",
        "Maintenance schedule for life-critical systems"
      ]
    },
    {
      location: "Solar PV Systems",
      requiredDocs: [
        "DC system schematic with string layout",
        "Inverter commissioning report",
        "G98/G99 DNO notification confirmation",
        "MCS installation certificate (if applicable)",
        "Fire service labelling compliance record",
        "Performance ratio calculations"
      ]
    },
    {
      location: "EV Charging",
      requiredDocs: [
        "OZEV grant documentation (if applicable)",
        "Load management system configuration",
        "Earth electrode test results (if TT)",
        "O-PEN device test results (if PME)",
        "Smart charging system commissioning"
      ]
    }
  ];

  // Periodic Inspection Frequencies
  const periodicFrequencies = [
    {
      location: "Swimming Pools",
      maxInterval: "1 year",
      notes: "More frequent inspection of underwater equipment",
      focus: ["Bonding integrity", "SELV systems", "IP ratings", "RCD function"]
    },
    {
      location: "Saunas",
      maxInterval: "1 year",
      notes: "Check heat damage to cables and equipment",
      focus: ["Cable condition", "Temperature ratings", "Emergency stop", "Insulation resistance"]
    },
    {
      location: "Construction Sites",
      maxInterval: "3 months",
      notes: "Regular inspection essential due to harsh conditions",
      focus: ["Transformer integrity", "RCD function", "Cable damage", "Enclosure IP ratings"]
    },
    {
      location: "Agricultural Premises",
      maxInterval: "3 years",
      notes: "Annual inspection in livestock areas recommended",
      focus: ["Bonding in livestock areas", "Rodent damage", "IP ratings", "Fire risk areas"]
    },
    {
      location: "Caravan Parks",
      maxInterval: "1 year",
      notes: "Before main season recommended",
      focus: ["Supply pillar condition", "RCD function", "Earth electrode", "Socket outlets"]
    },
    {
      location: "Marinas",
      maxInterval: "1 year",
      notes: "Check for salt corrosion and water ingress",
      focus: ["Corrosion", "Cable flexibility", "RCD operation", "Earth electrode"]
    },
    {
      location: "Medical Locations",
      maxInterval: "1 year",
      notes: "Group 2 areas may require more frequent testing",
      focus: ["IT system integrity", "IMD function", "Bonding", "Emergency power"]
    },
    {
      location: "Solar PV Systems",
      maxInterval: "5 years",
      notes: "Annual performance checks recommended",
      focus: ["DC insulation", "Connection integrity", "Isolator function", "Performance"]
    },
    {
      location: "EV Charging Points",
      maxInterval: "5 years",
      notes: "Manufacturer guidance may require annual checks",
      focus: ["RCD function", "Earth fault loop", "O-PEN device", "Connection integrity"]
    },
    {
      location: "Exhibitions (during event)",
      maxInterval: "Daily visual",
      notes: "Full test before public access",
      focus: ["Cable damage", "RCD function", "Emergency stops", "Enclosure security"]
    }
  ];

  // Common Test Failures
  const commonFailures = [
    {
      location: "Bathrooms",
      failures: [
        { issue: "High supplementary bonding resistance", cause: "Corroded connections, paint on joints", solution: "Clean and remake connections" },
        { issue: "Wrong IP rated equipment in zones", cause: "Incorrect specification", solution: "Replace with correctly rated equipment" },
        { issue: "RCD not protecting all circuits", cause: "Old installation without full protection", solution: "Upgrade consumer unit protection" }
      ]
    },
    {
      location: "Swimming Pools",
      failures: [
        { issue: "SELV voltage exceeds 12V", cause: "Transformer fault or wrong specification", solution: "Replace transformer, verify output" },
        { issue: "Missing supplementary bonding", cause: "Bonding not extended to new metalwork", solution: "Install additional bonding conductors" },
        { issue: "Failed underwater light insulation", cause: "Water ingress, seal failure", solution: "Replace light fitting, check seals" }
      ]
    },
    {
      location: "Construction Sites",
      failures: [
        { issue: "Damaged cables and connectors", cause: "Site traffic, poor cable routing", solution: "Replace and improve protection" },
        { issue: "Failed insulation resistance", cause: "Moisture ingress, physical damage", solution: "Identify and replace damaged sections" },
        { issue: "High earth electrode resistance", cause: "Dry conditions, electrode corrosion", solution: "Additional electrodes or treatment" }
      ]
    },
    {
      location: "Agricultural",
      failures: [
        { issue: "Rodent damage to cables", cause: "Inadequate protection", solution: "Install SWA or conduit protection" },
        { issue: "High touch voltage in livestock areas", cause: "Inadequate bonding", solution: "Improve supplementary bonding" },
        { issue: "Corroded equipment in dusty areas", cause: "Wrong IP rating", solution: "Replace with higher IP rated equipment" }
      ]
    },
    {
      location: "Solar PV",
      failures: [
        { issue: "Low DC insulation resistance", cause: "Moisture ingress, connector failure", solution: "Locate and repair/replace affected components" },
        { issue: "Low Voc reading", cause: "Shading, module degradation, string fault", solution: "Investigate string by string" },
        { issue: "Earth fault on DC side", cause: "Insulation breakdown, water ingress", solution: "Locate fault using string isolation" }
      ]
    },
    {
      location: "EV Charging",
      failures: [
        { issue: "RCD not Type A or B", cause: "Incorrect specification", solution: "Replace with Type A or B RCD" },
        { issue: "High Zs preventing fast disconnection", cause: "Long cable run, undersized cable", solution: "Increase cable size or add local RCD" },
        { issue: "O-PEN device not installed (PME)", cause: "Specification oversight", solution: "Install O-PEN device or earth electrode" }
      ]
    }
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { border: string; bg: string; text: string; badge: string }> = {
      cyan: { border: "border-cyan-500/30", bg: "bg-cyan-500/10", text: "text-cyan-300", badge: "border-cyan-400 text-cyan-300" },
      blue: { border: "border-blue-500/30", bg: "bg-blue-500/10", text: "text-blue-300", badge: "border-blue-400 text-blue-300" },
      orange: { border: "border-orange-500/30", bg: "bg-orange-500/10", text: "text-orange-300", badge: "border-orange-400 text-orange-300" },
      yellow: { border: "border-yellow-500/30", bg: "bg-yellow-500/10", text: "text-yellow-300", badge: "border-yellow-400 text-yellow-300" },
      green: { border: "border-green-500/30", bg: "bg-green-500/10", text: "text-green-300", badge: "border-green-400 text-green-300" },
      red: { border: "border-red-500/30", bg: "bg-red-500/10", text: "text-red-300", badge: "border-red-400 text-red-300" },
      teal: { border: "border-teal-500/30", bg: "bg-teal-500/10", text: "text-teal-300", badge: "border-teal-400 text-teal-300" },
      amber: { border: "border-amber-500/30", bg: "bg-amber-500/10", text: "text-amber-300", badge: "border-amber-400 text-amber-300" },
      lime: { border: "border-lime-500/30", bg: "bg-lime-500/10", text: "text-lime-300", badge: "border-lime-400 text-lime-300" }
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="space-y-6">
      {/* Introduction */}
      <Card className="border-elec-yellow/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <TestTube className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Special Location Testing Requirements</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-elec-yellow/50 bg-elec-yellow/10">
            <Info className="h-4 w-4 text-elec-yellow" />
            <AlertDescription className="text-elec-yellow/90">
              Special locations require additional tests beyond the standard BS 7671 sequence. These tests
              verify the enhanced protection measures specific to each location type.
            </AlertDescription>
          </Alert>

          <div className="bg-white/10 p-4 rounded-lg border border-elec-yellow/20">
            <h4 className="font-medium text-white mb-3">Standard Test Sequence (All Installations)</h4>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-sm">
              <div className="bg-elec-yellow/10 p-2 rounded text-center">
                <span className="text-elec-yellow font-medium">1. Continuity</span>
              </div>
              <div className="bg-elec-yellow/10 p-2 rounded text-center">
                <span className="text-elec-yellow font-medium">2. Insulation</span>
              </div>
              <div className="bg-elec-yellow/10 p-2 rounded text-center">
                <span className="text-elec-yellow font-medium">3. Polarity</span>
              </div>
              <div className="bg-elec-yellow/10 p-2 rounded text-center">
                <span className="text-elec-yellow font-medium">4. EFLI (Zs)</span>
              </div>
              <div className="bg-elec-yellow/10 p-2 rounded text-center">
                <span className="text-elec-yellow font-medium">5. RCD</span>
              </div>
            </div>
            <p className="text-sm text-white mt-3">
              Plus functional testing, prospective fault current measurement, and verification of voltage drop
              where required.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Additional Tests by Location */}
      {additionalTestsByLocation.map((location, locIndex) => {
        const colors = getColorClasses(location.color);
        const Icon = location.icon;

        return (
          <Card key={locIndex} className={`${colors.border} bg-white/5`}>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Icon className={`h-6 w-6 ${colors.text}`} />
                <CardTitle className={colors.text}>{location.location}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Standard Tests */}
              <div className={`${colors.bg} p-3 rounded-lg border ${colors.border}`}>
                <h4 className="font-medium text-white text-sm mb-2">Standard Tests Apply:</h4>
                <div className="flex flex-wrap gap-2">
                  {location.standardTests.map((test, idx) => (
                    <Badge key={idx} variant="outline" className={`${colors.badge} text-xs`}>
                      <CheckCircle className="h-3 w-3 mr-1" />
                      {test}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Additional Tests */}
              <div className={`${colors.bg} p-4 rounded-lg border ${colors.border}`}>
                <h4 className="font-medium text-white mb-3">Additional Tests Required</h4>
                <div className="space-y-3">
                  {location.additionalTests.map((test, idx) => (
                    <div key={idx} className={`${colors.bg} p-3 rounded border ${colors.border}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className={`h-4 w-4 ${colors.text}`} />
                        <span className={`font-medium ${colors.text}`}>{test.test}</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                        <div>
                          <span className="text-white">Requirement:</span>
                          <p className="text-white/80">{test.requirement}</p>
                        </div>
                        <div>
                          <span className="text-white">Method:</span>
                          <p className="text-white/80">{test.method}</p>
                        </div>
                        <div>
                          <span className="text-white">Notes:</span>
                          <p className="text-white/80">{test.notes}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Critical Values */}
              <div className={`${colors.bg} p-4 rounded-lg border ${colors.border}`}>
                <h4 className="font-medium text-white mb-3">Critical Test Values</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className={`border-b ${colors.border}`}>
                        <th className={`text-left py-2 ${colors.text}`}>Parameter</th>
                        <th className={`text-left py-2 ${colors.text}`}>Required Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {location.criticalValues.map((val, idx) => (
                        <tr key={idx} className={`border-b ${colors.border}`}>
                          <td className="py-2 text-white">{val.parameter}</td>
                          <td className={`py-2 ${colors.text}`}>{val.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}

      {/* Documentation Requirements */}
      <Card className="border-purple-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileCheck className="h-6 w-6 text-purple-400" />
            <CardTitle className="text-purple-300">Documentation Requirements</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {documentationRequirements.map((doc, idx) => (
            <div key={idx} className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
              <h4 className="font-medium text-purple-200 mb-3">{doc.location}</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {doc.requiredDocs.map((item, docIdx) => (
                  <li key={docIdx} className="flex items-start gap-2 text-sm">
                    <ClipboardCheck className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                    <span className="text-white/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Periodic Inspection Frequencies */}
      <Card className="border-blue-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Clock className="h-6 w-6 text-blue-400" />
            <CardTitle className="text-blue-300">Periodic Inspection Frequencies</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-blue-500/50 bg-blue-500/10">
            <Info className="h-4 w-4 text-blue-400" />
            <AlertDescription className="text-blue-200 text-sm">
              These are MAXIMUM recommended intervals from IET Guidance Note 3. More frequent inspection
              may be required based on use, environmental conditions, or previous findings.
            </AlertDescription>
          </Alert>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-blue-500/30">
                  <th className="text-left py-2 text-blue-200">Location Type</th>
                  <th className="text-left py-2 text-blue-200">Max Interval</th>
                  <th className="text-left py-2 text-blue-200">Notes</th>
                  <th className="text-left py-2 text-blue-200">Focus Areas</th>
                </tr>
              </thead>
              <tbody>
                {periodicFrequencies.map((freq, idx) => (
                  <tr key={idx} className="border-b border-blue-500/20">
                    <td className="py-3 text-white font-medium">{freq.location}</td>
                    <td className="py-3">
                      <Badge variant="outline" className="border-blue-400 text-blue-300">
                        {freq.maxInterval}
                      </Badge>
                    </td>
                    <td className="py-3 text-white/80">{freq.notes}</td>
                    <td className="py-3">
                      <div className="flex flex-wrap gap-1">
                        {freq.focus.map((f, fIdx) => (
                          <span key={fIdx} className="text-xs bg-blue-600/20 text-blue-200 px-2 py-0.5 rounded">
                            {f}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Common Test Failures */}
      <Card className="border-red-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <XCircle className="h-6 w-6 text-red-400" />
            <CardTitle className="text-red-300">Common Test Failures in Special Locations</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {commonFailures.map((loc, idx) => (
            <div key={idx} className="bg-red-500/10 p-4 rounded-lg border border-red-500/20">
              <h4 className="font-medium text-red-200 mb-3">{loc.location}</h4>
              <div className="space-y-3">
                {loc.failures.map((failure, fIdx) => (
                  <div key={fIdx} className="bg-red-600/10 p-3 rounded border border-red-500/30">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-4 w-4 text-red-400" />
                      <span className="font-medium text-red-200">{failure.issue}</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-white">Likely Cause:</span>
                        <p className="text-white/80">{failure.cause}</p>
                      </div>
                      <div>
                        <span className="text-white">Solution:</span>
                        <p className="text-green-300">{failure.solution}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Test Equipment Requirements */}
      <Card className="border-amber-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <ListChecks className="h-6 w-6 text-amber-400" />
            <CardTitle className="text-amber-300">Specialist Test Equipment</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
              <h4 className="font-medium text-white mb-3">Standard MFT Plus:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-amber-400 mt-0.5" />
                  <span className="text-white/80">Low resistance ohmmeter (less than 0.01 ohm resolution)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-amber-400 mt-0.5" />
                  <span className="text-white/80">Earth electrode tester</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-amber-400 mt-0.5" />
                  <span className="text-white/80">High current bonding tester</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-amber-400 mt-0.5" />
                  <span className="text-white/80">RCD tester with Type A/B capability</span>
                </li>
              </ul>
            </div>

            <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
              <h4 className="font-medium text-white mb-3">Specialist Equipment:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Sun className="h-4 w-4 text-amber-400 mt-0.5" />
                  <span className="text-white/80">DC insulation tester (1000V+) for PV</span>
                </li>
                <li className="flex items-start gap-2">
                  <Car className="h-4 w-4 text-amber-400 mt-0.5" />
                  <span className="text-white/80">EV charging point tester</span>
                </li>
                <li className="flex items-start gap-2">
                  <Heart className="h-4 w-4 text-amber-400 mt-0.5" />
                  <span className="text-white/80">IMD tester for medical IT systems</span>
                </li>
                <li className="flex items-start gap-2">
                  <Waves className="h-4 w-4 text-amber-400 mt-0.5" />
                  <span className="text-white/80">SELV transformer output tester</span>
                </li>
              </ul>
            </div>
          </div>

          <Alert className="border-amber-500/50 bg-amber-500/10">
            <Shield className="h-4 w-4 text-amber-400" />
            <AlertDescription className="text-amber-200 text-sm">
              All test equipment must comply with GS38 and be calibrated within manufacturer's
              recommended intervals. Calibration certificates should be available on request.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Critical Safety Notice */}
      <Card className="border-red-500/50 bg-gradient-to-r from-red-500/10 to-orange-500/10">
        <CardHeader>
          <CardTitle className="text-red-300 flex items-center gap-2">
            <Shield className="h-6 w-6" />
            Testing Safety Critical Points
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-3">
              <div className="bg-red-500/10 p-3 rounded-lg border border-red-500/30">
                <h4 className="font-medium text-red-200 mb-2">Solar PV Systems</h4>
                <ul className="space-y-1 text-white/80">
                  <li>DC systems are live whenever illuminated</li>
                  <li>Cannot be isolated by switching alone</li>
                  <li>Use appropriate DC-rated PPE</li>
                  <li>Cover arrays to reduce voltage if required</li>
                </ul>
              </div>

              <div className="bg-red-500/10 p-3 rounded-lg border border-red-500/30">
                <h4 className="font-medium text-red-200 mb-2">Swimming Pools</h4>
                <ul className="space-y-1 text-white/80">
                  <li>Water creates additional shock hazard</li>
                  <li>Test when pool is drained where possible</li>
                  <li>Never work on underwater equipment live</li>
                  <li>Verify SELV before working in zones</li>
                </ul>
              </div>
            </div>

            <div className="space-y-3">
              <div className="bg-orange-500/10 p-3 rounded-lg border border-orange-500/30">
                <h4 className="font-medium text-orange-200 mb-2">Medical Locations</h4>
                <ul className="space-y-1 text-white/80">
                  <li>Coordinate with clinical staff</li>
                  <li>Never interrupt life support supplies</li>
                  <li>IT system first fault - system stays live</li>
                  <li>Be aware of patient environment boundaries</li>
                </ul>
              </div>

              <div className="bg-orange-500/10 p-3 rounded-lg border border-orange-500/30">
                <h4 className="font-medium text-orange-200 mb-2">Construction Sites</h4>
                <ul className="space-y-1 text-white/80">
                  <li>Multiple supplies may be present</li>
                  <li>Generators may not have standard earthing</li>
                  <li>Coordinate with site management</li>
                  <li>Wear site-appropriate PPE</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SpecialistTestingGuide;
