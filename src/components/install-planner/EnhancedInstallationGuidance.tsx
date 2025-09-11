import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { 
  Wrench,
  AlertTriangle,
  CheckCircle2,
  Zap,
  Shield,
  Thermometer,
  Clock,
  FileText,
  Eye,
  HardHat,
  MapPin,
  Settings,
  Cable
} from "lucide-react";
import { InstallPlanData, CableRecommendation } from "./types";

interface EnhancedInstallationGuidanceProps {
  planData: InstallPlanData;
  recommendedCable: CableRecommendation;
}

const EnhancedInstallationGuidance: React.FC<EnhancedInstallationGuidanceProps> = ({ 
  planData, 
  recommendedCable 
}) => {
  const isSWA = planData.cableType?.toLowerCase().includes('swa');
  const isUnderground = planData.installationMethod?.includes('buried');
  const isRingCircuit = planData.loadType === "power" && planData.cableLength <= 106;
  const isHighCurrent = parseFloat(recommendedCable.size.replace('mm²', '')) >= 25;
  const isThreePhase = planData.phases === "three";

  const getInstallationMethodGuidance = () => {
    const method = planData.installationMethod;
    
    const methodGuidance = {
      'cable-tray': {
        title: 'Cable Tray Installation',
        icon: Cable,
        requirements: [
          'Support intervals every 2m for cable trays, 3m for cable ladders',
          'Minimum 50mm spacing between adjacent cables for heat dissipation',
          'Consider cable segregation: power/control/data on separate levels',
          'Fire stopping required at compartment boundaries',
          'Earthing continuity throughout tray system',
          'Access for maintenance and future cable installation'
        ],
        considerations: [
          'Perforated trays improve heat dissipation but may collect debris',
          'Ladder trays allow better airflow for high current applications',
          'Consider wind loading for external installations',
          'Drainage requirements for outdoor/damp locations'
        ],
        hazards: [
          'Sharp edges on cut metalwork - file smooth',
          'Heavy sections require mechanical lifting',
          'Live cable exposure during maintenance'
        ]
      },
      'clipped-direct': {
        title: 'Clipped Direct to Structure',
        icon: Settings,
        requirements: [
          'Cable clips every 200mm (horizontal), 400mm (vertical) for T&E',
          'Clips every 300mm (horizontal), 600mm (vertical) for SWA',
          'Maintain minimum bend radius: 6x cable diameter for SWA, 4x for T&E',
          'Protect against mechanical damage in vulnerable areas',
          'Thermal movement allowance for long runs',
          'Access points for testing and inspection'
        ],
        considerations: [
          'Use appropriate clip material to prevent galvanic corrosion',
          'Consider thermal expansion of cable and structure',
          'Avoid compression of cable under clips',
          'UV protection for external installations'
        ],
        hazards: [
          'Drilling into structure - check for services',
          'Working at height for elevated cable routes',
          'Cable damage from over-tightening clips'
        ]
      },
      'enclosed-conduit': {
        title: 'Conduit Installation',
        icon: Wrench,
        requirements: [
          'Maximum 3 bends of 90° per conduit run (or 270° total)',
          'Draw boxes every 10-15m on straight runs',
          'Conduit filling factor: max 45% for multiple cables',
          'Seal conduit ends to prevent ingress',
          'Earth continuity through metallic conduit system',
          'Adequate drainage for outdoor installations'
        ],
        considerations: [
          'Use appropriate lubricant for cable pulling',
          'Pre-install draw wire for future maintenance',
          'Consider thermal effects on conduit material',
          'Joint compound for threaded connections'
        ],
        hazards: [
          'Sharp edges on cut conduit - ream and file',
          'Cable damage during pulling operation',
          'Threading/cutting creates metal swarf'
        ]
      },
      'buried-direct': {
        title: 'Direct Buried Installation',
        icon: MapPin,
        requirements: [
          'Minimum burial depth: 450mm general areas, 750mm under roads',
          'Protective sand/aggregate bedding minimum 100mm above/below',
          'Warning tape 150mm above cable at minimum 450mm depth',
          'Marker posts at changes of direction and road crossings',
          'Mechanical protection in vulnerable areas',
          'Clear route marking and "as-laid" drawings'
        ],
        considerations: [
          'Avoid areas with tree roots or future excavation',
          'Consider soil thermal resistivity effects',
          'Drainage for areas prone to waterlogging',
          'Separation from other buried services'
        ],
        hazards: [
          'Existing buried services - CAT scan before digging',
          'Unstable excavation sides - consider shoring',
          'Manual handling of heavy armoured cables'
        ]
      },
      'trunking': {
        title: 'Cable Trunking Installation',
        icon: FileText,
        requirements: [
          'Support brackets every 1.5m for steel trunking, 1m for plastic',
          'Internal segregation for different circuit types required',
          'Fire barriers at compartment boundaries every 5m maximum',
          'Adequate ventilation to prevent overheating',
          'Earth continuity for metallic trunking systems',
          'Access via removable lids every 3m maximum'
        ],
        considerations: [
          'Cable bend radius at entry/exit points',
          'Thermal expansion joints for long runs',
          'Protection against condensation in damp areas',
          'Future cable capacity planning'
        ],
        hazards: [
          'Sharp edges on cut metalwork',
          'Weight of loaded trunking systems',
          'Live cable exposure during maintenance'
        ]
      }
    };

    return methodGuidance[method as keyof typeof methodGuidance] || methodGuidance['clipped-direct'];
  };

  const getCableSpecificGuidance = () => {
    if (isSWA) {
      return {
        title: 'SWA Cable Installation',
        icon: Shield,
        requirements: [
          'Use appropriate SWA glands for cable termination',
          'Earth wire armour at both ends - no parallel earth paths',
          'Maintain minimum bend radius: 6x overall cable diameter',
          'Support cable weight adequately - SWA is heavier than T&E',
          'Protect joints from moisture ingress',
          'Use pulling stockings for long cable pulls'
        ],
        specialConsiderations: [
          'Armour provides mechanical protection and earth continuity',
          'Can be installed direct buried without additional protection',
          'Magnetic effects on steel structures - consider spacing',
          'Corrosion resistance in aggressive environments'
        ],
        terminationNotes: [
          'Remove armour carefully to avoid damage to cores',
          'Use earth tags to connect armour to gland',
          'Apply jointing compound to threaded connections',
          'Verify gland IP rating matches environment requirements'
        ]
      };
    } else {
      return {
        title: 'T&E Cable Installation',
        icon: Zap,
        requirements: [
          'Protect against mechanical damage with conduit/trunking',
          'Support every 200mm horizontal, 400mm vertical',
          'Maintain minimum bend radius: 4x cable diameter',
          'Use appropriate cable clips to prevent damage',
          'Protect from UV exposure if used externally',
          'Ensure proper earth continuity'
        ],
        specialConsiderations: [
          'Flat profile suits shallow chases in masonry',
          'Cost-effective for domestic and light commercial',
          'Limited mechanical protection - needs containment',
          'Good flexibility for awkward routing'
        ],
        terminationNotes: [
          'Strip outer sheath carefully to avoid core damage',
          'Use appropriate cable entry methods',
          'Ensure earth continuity at all terminations',
          'Consider using cable markers for identification'
        ]
      };
    }
  };

  const getEnvironmentalConsiderations = () => {
    const temp = planData.ambientTemperature || 30;
    const considerations = [];

    if (temp > 30) {
      considerations.push({
        factor: 'High Temperature',
        icon: Thermometer,
        impact: 'Reduced current carrying capacity',
        actions: [
          'Apply temperature derating factors as calculated',
          'Consider improved ventilation or larger cable size',
          'Monitor temperature during peak loading',
          'Use temperature-resistant cable types if >60°C'
        ]
      });
    }

    if (isUnderground) {
      considerations.push({
        factor: 'Underground Installation',
        icon: MapPin,
        impact: 'Mechanical protection and moisture ingress risks',
        actions: [
          'Use SWA cable or ducted installation',
          'Ensure proper drainage to prevent waterlogging',
          'Install warning tape and marker posts',
          'Record accurate "as-laid" drawings'
        ]
      });
    }

    if (planData.installationMethod?.includes('external')) {
      considerations.push({
        factor: 'External Environment',
        icon: Eye,
        impact: 'UV degradation and thermal cycling',
        actions: [
          'Use UV-resistant cable or protect from sunlight',
          'Allow for thermal expansion and contraction',
          'Ensure adequate IP rating for enclosures',
          'Consider wildlife protection measures'
        ]
      });
    }

    return considerations;
  };

  const getTestingAndCommissioning = () => {
    return {
      preInstallation: [
        {
          check: 'Cable Condition Inspection',
          requirement: 'Visual inspection for damage during delivery/storage',
          action: 'Reject damaged drums, check for moisture ingress'
        },
        {
          check: 'Route Survey',
          requirement: 'Verify planned route is clear and accessible',
          action: 'CAT scan for buried services, structural survey for fixings'
        },
        {
          check: 'Environmental Conditions',
          requirement: 'Confirm actual conditions match design assumptions',
          action: 'Measure temperature, humidity, check ventilation'
        }
      ],
      duringInstallation: [
        {
          check: 'Cable Handling',
          requirement: 'Prevent damage during installation',
          action: 'Use correct lifting equipment, avoid over-bending'
        },
        {
          check: 'Containment Installation',
          requirement: 'Install supports and protection before cable pulling',
          action: 'Check spacing, alignment, and earth continuity'
        },
        {
          check: 'Termination Quality',
          requirement: 'Proper termination techniques and materials',
          action: 'Check torque settings, insulation levels, labelling'
        }
      ],
      postInstallation: [
        {
          check: 'Continuity Testing',
          requirement: isRingCircuit ? 'Ring circuit continuity both legs' : 'End-to-end continuity',
          action: 'Record readings, verify within acceptable limits'
        },
        {
          check: 'Insulation Resistance',
          requirement: '≥1MΩ at 500V DC between all conductors',
          action: 'Test line-neutral, line-earth, neutral-earth'
        },
        {
          check: 'Earth Fault Loop Impedance',
          requirement: `≤${(planData.voltage === 230 ? 1.44 : 0.83).toFixed(2)}Ω for ${recommendedCable.ratedCurrent}A MCB`,
          action: 'Measure at furthest point, verify disconnection time'
        }
      ]
    };
  };

  const methodGuidance = getInstallationMethodGuidance();
  const cableGuidance = getCableSpecificGuidance();
  const environmental = getEnvironmentalConsiderations();
  const testing = getTestingAndCommissioning();

  return (
    <div className="space-y-6">
      {/* Installation Method Guidance */}
      <Card className="border-elec-yellow/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 bg-elec-yellow/20 rounded-lg">
              <methodGuidance.icon className="h-5 w-5 text-elec-yellow" />
            </div>
            <div>
              <div className="text-lg">Installation Guidance</div>
              <div className="text-sm font-normal text-elec-light/60">{methodGuidance.title}</div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Core Requirements */}
          <div>
            <h4 className="font-semibold text-elec-light mb-3 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-elec-green" />
              Essential Requirements
            </h4>
            <div className="grid md:grid-cols-2 gap-3">
              {methodGuidance.requirements.map((req, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-elec-dark/30 rounded border border-elec-green/20">
                  <div className="w-2 h-2 bg-elec-green rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-elec-light/90">{req}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Design Considerations */}
          <div>
            <h4 className="font-semibold text-elec-light mb-3 flex items-center gap-2">
              <Settings className="h-4 w-4 text-elec-blue" />
              Design Considerations
            </h4>
            <div className="space-y-2">
              {methodGuidance.considerations.map((consideration, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-blue-500/10 rounded border border-blue-500/20">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-blue-100/90">{consideration}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Safety Hazards */}
          <div>
            <h4 className="font-semibold text-elec-light mb-3 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-400" />
              Safety Hazards & Precautions
            </h4>
            <div className="space-y-2">
              {methodGuidance.hazards.map((hazard, index) => (
                <Alert key={index} className="bg-amber-500/10 border-amber-500/30">
                  <HardHat className="h-4 w-4 text-amber-300" />
                  <AlertDescription className="text-amber-200 text-sm">
                    {hazard}
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cable-Specific Guidance */}
      <Card className="border-elec-blue/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 bg-elec-blue/20 rounded-lg">
              <cableGuidance.icon className="h-5 w-5 text-elec-blue" />
            </div>
            <div>
              <div className="text-lg">{cableGuidance.title}</div>
              <div className="text-sm font-normal text-elec-light/60">
                {recommendedCable.size} {planData.cableType} specific requirements
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Installation Requirements */}
            <div>
              <h4 className="font-semibold text-elec-blue mb-3">Installation Requirements</h4>
              <div className="space-y-2">
                {cableGuidance.requirements.map((req, index) => (
                  <div key={index} className="flex items-start gap-3 p-2 bg-elec-dark/30 rounded">
                    <CheckCircle2 className="h-4 w-4 text-elec-blue mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-elec-light/90">{req}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Special Considerations */}
            <div>
              <h4 className="font-semibold text-elec-blue mb-3">Special Considerations</h4>
              <div className="space-y-2">
                {cableGuidance.specialConsiderations.map((consideration, index) => (
                  <div key={index} className="flex items-start gap-3 p-2 bg-blue-500/10 rounded">
                    <Eye className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-blue-100/90">{consideration}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Termination Notes */}
          <div className="p-4 bg-elec-yellow/10 rounded border border-elec-yellow/30">
            <h4 className="font-semibold text-elec-yellow mb-3">Termination & Connection Notes</h4>
            <div className="grid md:grid-cols-2 gap-3">
              {cableGuidance.terminationNotes.map((note, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-elec-yellow/90">{note}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Environmental Considerations */}
      {environmental.length > 0 && (
        <Card className="border-amber-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 bg-amber-500/20 rounded-lg">
                <Thermometer className="h-5 w-5 text-amber-400" />
              </div>
              <div>
                <div className="text-lg">Environmental Factors</div>
                <div className="text-sm font-normal text-elec-light/60">Site-specific considerations</div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {environmental.map((env, index) => (
              <div key={index} className="p-4 bg-amber-500/10 rounded border border-amber-500/20">
                <div className="flex items-center gap-2 mb-3">
                  <env.icon className="h-4 w-4 text-amber-400" />
                  <h4 className="font-semibold text-amber-300">{env.factor}</h4>
                  <Badge variant="outline" className="border-amber-400/50 text-amber-300 text-xs">
                    {env.impact}
                  </Badge>
                </div>
                <div className="space-y-2">
                  {env.actions.map((action, actionIndex) => (
                    <div key={actionIndex} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm text-amber-200/90">{action}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Testing & Commissioning */}
      <Card className="border-elec-green/30">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-white">
            <div className="p-2 bg-elec-green/20 rounded-lg">
              <CheckCircle2 className="h-5 w-5 text-elec-green" />
            </div>
            <div>
              <div className="text-lg font-semibold">Testing & Commissioning</div>
              <div className="text-sm font-normal text-white/70">Step-by-step verification process</div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Pre-Installation */}
            <div>
              <h4 className="font-semibold text-elec-green mb-4 flex items-center gap-2 text-white">
                <Clock className="h-4 w-4" />
                Pre-Installation
              </h4>
              <div className="space-y-3">
                {testing.preInstallation.map((test, index) => (
                  <div key={index} className="p-3 bg-elec-dark/30 rounded border border-elec-green/20">
                    <div className="font-medium text-sm text-elec-green mb-1">{test.check}</div>
                    <div className="text-xs text-white/70 mb-2">{test.requirement}</div>
                    <div className="text-xs text-elec-green/80">{test.action}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* During Installation */}
            <div>
              <h4 className="font-semibold text-elec-yellow mb-4 flex items-center gap-2 text-white">
                <Wrench className="h-4 w-4" />
                During Installation
              </h4>
              <div className="space-y-3">
                {testing.duringInstallation.map((test, index) => (
                  <div key={index} className="p-3 bg-elec-dark/30 rounded border border-elec-yellow/20">
                    <div className="font-medium text-sm text-elec-yellow mb-1">{test.check}</div>
                    <div className="text-xs text-white/70 mb-2">{test.requirement}</div>
                    <div className="text-xs text-elec-yellow/80">{test.action}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Post-Installation */}
            <div>
              <h4 className="font-semibold text-elec-blue mb-4 flex items-center gap-2 text-white">
                <FileText className="h-4 w-4" />
                Post-Installation
              </h4>
              <div className="space-y-3">
                {testing.postInstallation.map((test, index) => (
                  <div key={index} className="p-3 bg-elec-dark/30 rounded border border-elec-blue/20">
                    <div className="font-medium text-sm text-elec-blue mb-1">{test.check}</div>
                    <div className="text-xs text-white/70 mb-2">{test.requirement}</div>
                    <div className="text-xs text-elec-blue/80">{test.action}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedInstallationGuidance;