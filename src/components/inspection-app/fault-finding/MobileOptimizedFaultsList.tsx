import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp, AlertTriangle, Zap, Shield, Clock } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface CommonFault {
  id: string;
  symptom: string;
  category: string;
  possibleCauses: string[];
  diagnosticSteps: string[];
  safetyNotes: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  estimatedTime: string;
  requiredTools: string[];
}


const MobileOptimizedFaultsList = () => {
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const isMobile = useIsMobile();

  const commonFaults: CommonFault[] = [
    {
      id: 'cb-trips',
      symptom: 'Circuit breaker trips immediately',
      category: 'overcurrent',
      possibleCauses: [
        'Short circuit in wiring',
        'Faulty appliance',
        'Overloaded circuit',
        'Damaged cable insulation'
      ],
      diagnosticSteps: [
        'Disconnect all loads and test circuit breaker alone',
        'Check for visual signs of damage',
        'Test insulation resistance',
        'Reconnect loads one by one to isolate fault'
      ],
      safetyNotes: 'Always isolate supply before investigation',
      urgency: 'high',
      estimatedTime: '15-30 minutes',
      requiredTools: ['Multimeter', 'Insulation tester', 'Visual inspection tools']
    },
    {
      id: 'rcd-trips',
      symptom: 'RCD trips randomly',
      category: 'earth_leakage',
      possibleCauses: [
        'Earth leakage in appliance',
        'Moisture ingress',
        'Damaged cable',
        'Nuisance tripping from accumulation of small leakages'
      ],
      diagnosticSteps: [
        'Check RCD operation with test button',
        'Test each circuit individually',
        'Use insulation resistance tester',
        'Check for moisture in accessories'
      ],
      safetyNotes: 'RCD protection may be compromised - investigate immediately',
      urgency: 'high',
      estimatedTime: '20-45 minutes',
      requiredTools: ['RCD tester', 'Insulation tester', 'Torch', 'Moisture meter']
    },
    {
      id: 'lights-flicker',
      symptom: 'Lights flickering',
      category: 'supply_issues',
      possibleCauses: [
        'Loose connections',
        'Voltage fluctuations',
        'Overloaded neutral',
        'Poor supply quality'
      ],
      diagnosticSteps: [
        'Check voltage at consumer unit',
        'Inspect all connections',
        'Monitor voltage over time',
        'Check neutral integrity'
      ],
      safetyNotes: 'May indicate serious wiring issues',
      urgency: 'medium',
      estimatedTime: '30-60 minutes',
      requiredTools: ['Multimeter', 'Voltage monitor', 'Screwdrivers', 'Torch']
    },
    {
      id: 'electric-shock',
      symptom: 'Electric shock from appliance',
      category: 'safety_critical',
      possibleCauses: [
        'Loss of earth continuity',
        'Live-to-earth fault in appliance',
        'Reversed polarity',
        'Faulty RCD protection'
      ],
      diagnosticSteps: [
        'IMMEDIATELY isolate appliance',
        'Test earth continuity',
        'Check polarity',
        'Test RCD operation',
        'PAT test the appliance'
      ],
      safetyNotes: 'DANGER - Do not use appliance until fault is found and corrected',
      urgency: 'critical',
      estimatedTime: '10-20 minutes',
      requiredTools: ['PAT tester', 'Multimeter', 'RCD tester']
    },
    {
      id: 'no-power-socket',
      symptom: 'No power to socket outlet',
      category: 'supply_issues',
      possibleCauses: [
        'Tripped MCB or RCD',
        'Loose connection in socket',
        'Blown fuse in plug',
        'Break in ring final circuit',
        'Faulty socket outlet'
      ],
      diagnosticSteps: [
        'Check consumer unit for tripped devices',
        'Test socket with known good appliance',
        'Check continuity of ring final circuit',
        'Inspect socket connections',
        'Test adjacent sockets'
      ],
      safetyNotes: 'Isolate circuit before opening socket outlets',
      urgency: 'medium',
      estimatedTime: '15-30 minutes',
      requiredTools: ['Socket tester', 'Multimeter', 'Screwdrivers', 'Continuity tester']
    },
    {
      id: 'burning-smell',
      symptom: 'Burning smell from electrical equipment',
      category: 'safety_critical',
      possibleCauses: [
        'Overheating connections',
        'Overloaded circuit',
        'Arcing contacts',
        'Insulation breakdown',
        'Faulty equipment'
      ],
      diagnosticSteps: [
        'IMMEDIATELY isolate affected circuit',
        'Locate source of smell',
        'Check for visible signs of overheating',
        'Test connections with thermal imaging if available',
        'Check circuit loading'
      ],
      safetyNotes: 'DANGER - Risk of fire. Isolate immediately and do not re-energise until fault found',
      urgency: 'critical',
      estimatedTime: '10-30 minutes',
      requiredTools: ['Thermal imaging camera', 'Multimeter', 'Clamp meter', 'Visual inspection tools']
    },
    {
      id: 'lights-not-working',
      symptom: 'Light circuits not working',
      category: 'lighting',
      possibleCauses: [
        'Tripped MCB',
        'Blown lamp/LED driver',
        'Faulty switch',
        'Loose connection in ceiling rose',
        'Break in lighting circuit'
      ],
      diagnosticSteps: [
        'Check MCB in consumer unit',
        'Test lamp/bulb in known good fitting',
        'Check switch operation and connections',
        'Inspect ceiling rose connections',
        'Test circuit continuity'
      ],
      safetyNotes: 'Turn off lighting circuit before inspection',
      urgency: 'low',
      estimatedTime: '10-25 minutes',
      requiredTools: ['Multimeter', 'Screwdrivers', 'Voltage indicator', 'Test lamp']
    },
    {
      id: 'partial-power-loss',
      symptom: 'Partial power loss to property',
      category: 'supply_issues',
      possibleCauses: [
        'Loss of one phase (3-phase supply)',
        'Neutral fault',
        'Supply cable fault',
        'Meter/cutout fault',
        'Multiple circuit faults'
      ],
      diagnosticSteps: [
        'Check voltage at meter tails',
        'Test all phases if 3-phase supply',
        'Check neutral connections',
        'Contact DNO if supply fault suspected',
        'Test individual circuits'
      ],
      safetyNotes: 'Do not work on supply side of meter - contact DNO',
      urgency: 'high',
      estimatedTime: '20-45 minutes',
      requiredTools: ['Multimeter', 'Phase sequence tester', 'Voltage indicator']
    },
    {
      id: 'earth-fault',
      symptom: 'High earth loop impedance readings',
      category: 'earthing',
      possibleCauses: [
        'Poor earth electrode connection',
        'Corroded earth conductor',
        'Loose main earth terminal',
        'Break in protective conductor',
        'Poor PME/TN-S connection'
      ],
      diagnosticSteps: [
        'Test earth electrode resistance',
        'Check main earth terminal connections',
        'Test continuity of earth conductors',
        'Inspect visible earth connections',
        'Contact DNO if supply earth fault'
      ],
      safetyNotes: 'Poor earthing compromises safety - priority repair required',
      urgency: 'high',
      estimatedTime: '25-45 minutes',
      requiredTools: ['Earth loop impedance tester', 'Earth electrode tester', 'Multimeter']
    },
    {
      id: 'appliance-not-working',
      symptom: 'Electrical appliance not working',
      category: 'appliance_fault',
      possibleCauses: [
        'Blown fuse in plug',
        'Faulty appliance',
        'No power to socket',
        'Thermal cutout operated',
        'Internal appliance fault'
      ],
      diagnosticSteps: [
        'Check fuse in plug',
        'Test socket with known good appliance',
        'Check appliance cable for damage',
        'PAT test the appliance',
        'Check for reset buttons on appliance'
      ],
      safetyNotes: 'Do not attempt internal appliance repairs unless qualified',
      urgency: 'low',
      estimatedTime: '10-20 minutes',
      requiredTools: ['PAT tester', 'Multimeter', 'Fuse tester', 'Socket tester']
    },
    {
      id: 'intermittent-fault',
      symptom: 'Intermittent electrical fault',
      category: 'complex',
      possibleCauses: [
        'Loose connections',
        'Temperature-related expansion',
        'Moisture ingress',
        'Vibration causing disconnection',
        'Ageing cable insulation'
      ],
      diagnosticSteps: [
        'Monitor fault pattern over time',
        'Check all accessible connections',
        'Use thermal imaging during operation',
        'Test insulation resistance when fault present',
        'Check environmental factors'
      ],
      safetyNotes: 'Intermittent faults can be dangerous - monitor closely',
      urgency: 'medium',
      estimatedTime: '45-90 minutes',
      requiredTools: ['Data logger', 'Thermal imaging camera', 'Insulation tester', 'Multimeter']
    },
    {
      id: 'electric-heating-fault',
      symptom: 'Electric heating not working',
      category: 'heating',
      possibleCauses: [
        'Faulty thermostat',
        'Blown heating element',
        'Tripped overheat protection',
        'Timer/programmer fault',
        'Supply fault to heating circuit'
      ],
      diagnosticSteps: [
        'Check programmer/timer settings',
        'Test thermostat operation',
        'Check heating element continuity',
        'Test supply voltage to heater',
        'Check overheat protection devices'
      ],
      safetyNotes: 'Ensure heating is isolated before testing elements',
      urgency: 'medium',
      estimatedTime: '20-40 minutes',
      requiredTools: ['Multimeter', 'Clamp meter', 'Screwdrivers', 'Insulation tester']
    }
  ];

  const filteredFaults = commonFaults;

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedCards(newExpanded);
  };

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case 'critical': return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case 'high': return <Zap className="h-4 w-4 text-[hsl(var(--elec-yellow))]" />;
      case 'medium': return <Shield className="h-4 w-4 text-[hsl(var(--elec-blue))]" />;
      default: return <Clock className="h-4 w-4 text-[hsl(var(--elec-gray))]" />;
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical': return 'bg-[hsl(var(--elec-gray))] border-destructive/30 text-destructive';
      case 'high': return 'bg-[hsl(var(--elec-gray))] border-[hsl(var(--elec-yellow))]/30 text-[hsl(var(--elec-yellow))]';
      case 'medium': return 'bg-[hsl(var(--elec-gray))] border-[hsl(var(--elec-blue))]/30 text-[hsl(var(--elec-blue))]';
      default: return 'bg-[hsl(var(--elec-gray))] border-[hsl(var(--elec-gray))]/50 text-foreground';
    }
  };


  return (
    <div className="space-y-6">

      {/* Fault Cards */}
      <div className="space-y-4">
        {filteredFaults.map((fault) => (
          <Collapsible key={fault.id}>
            <Card className="transition-all duration-200 bg-[hsl(var(--elec-gray))] border-[hsl(var(--elec-gray))]/30">
              <CollapsibleTrigger 
                className="w-full"
                onClick={() => toggleExpanded(fault.id)}
              >
                <CardHeader className="cursor-pointer hover:bg-black/10 active:bg-black/15 transition-all touch-manipulation">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getUrgencyIcon(fault.urgency)}
                      <CardTitle className={`text-left ${isMobile ? 'text-sm' : 'text-base'}`}>
                        {fault.symptom}
                      </CardTitle>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {fault.urgency.toUpperCase()}
                      </Badge>
                      {expandedCards.has(fault.id) ? 
                        <ChevronUp className="h-4 w-4" /> : 
                        <ChevronDown className="h-4 w-4" />
                      }
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {fault.estimatedTime}
                    </span>
                    <span>{fault.possibleCauses.length} possible causes</span>
                  </div>
                </CardHeader>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <CardContent className="space-y-4">
                  {/* Possible Causes */}
                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Possible Causes:</h4>
                    <ul className="space-y-1 text-sm">
                      {fault.possibleCauses.map((cause, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-muted-foreground">•</span>
                          <span>{cause}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Diagnostic Steps */}
                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Diagnostic Steps:</h4>
                    <ol className="space-y-2 text-sm">
                      {fault.diagnosticSteps.map((step, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Badge variant="outline" className="text-xs min-w-[24px] h-5 flex items-center justify-center">
                            {index + 1}
                          </Badge>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Required Tools */}
                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Required Tools:</h4>
                    <div className="flex flex-wrap gap-2">
                      {fault.requiredTools.map((tool, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Safety Notes */}
                  <div className="bg-red-50 border-l-4 border-destructive p-4 rounded-r-lg">
                    <h4 className="font-bold mb-2 text-sm text-destructive flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5" />
                      Safety Notes
                    </h4>
                    <p className="text-sm text-destructive font-medium leading-relaxed">{fault.safetyNotes}</p>
                  </div>

                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        ))}
      </div>

    </div>
  );
};

export default MobileOptimizedFaultsList;