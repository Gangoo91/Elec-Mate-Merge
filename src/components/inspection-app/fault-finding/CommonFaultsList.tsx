
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Lightbulb, Zap, Shield } from 'lucide-react';

interface CommonFault {
  symptom: string;
  category: string;
  possibleCauses: string[];
  diagnosticSteps: string[];
  safetyNotes: string;
  urgency: string;
}

const CommonFaultsList = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const commonFaults: CommonFault[] = [
    {
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
      urgency: 'high'
    },
    {
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
      urgency: 'high'
    },
    {
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
      urgency: 'medium'
    },
    {
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
      urgency: 'critical'
    },
    {
      symptom: 'Socket outlet not working',
      category: 'no_supply',
      possibleCauses: [
        'Tripped MCB or RCD',
        'Loose connection',
        'Blown fuse in plug',
        'Faulty socket outlet'
      ],
      diagnosticSteps: [
        'Check consumer unit for trips',
        'Test with known good appliance',
        'Check voltage at socket',
        'Inspect socket connections'
      ],
      safetyNotes: 'Ensure safe isolation before opening accessories',
      urgency: 'low'
    },
    {
      symptom: 'Burning smell from electrical equipment',
      category: 'fire_risk',
      possibleCauses: [
        'Overheating connections',
        'Overloaded cable',
        'Arcing fault',
        'Component failure'
      ],
      diagnosticSteps: [
        'IMMEDIATELY isolate power',
        'Locate source of smell',
        'Check for signs of burning/overheating',
        'Thermal imaging if available'
      ],
      safetyNotes: 'FIRE RISK - Immediate action required',
      urgency: 'critical'
    },
    {
      symptom: 'RCBO trips but not main RCD',
      category: 'selective_protection',
      possibleCauses: [
        'Fault on individual circuit',
        'RCBO more sensitive than main RCD',
        'Neutral-earth fault on specific circuit',
        'Appliance with earth leakage on that circuit'
      ],
      diagnosticSteps: [
        'Isolate all loads on affected circuit',
        'Test RCBO operation independently',
        'Test circuit insulation resistance',
        'Reconnect loads individually to identify source'
      ],
      safetyNotes: 'RCBO providing additional protection - investigate cause',
      urgency: 'medium'
    },
    {
      symptom: 'Intermittent power loss',
      category: 'connection_issues',
      possibleCauses: [
        'Loose connections at consumer unit',
        'Damaged cable joints',
        'Thermal expansion/contraction effects',
        'Poor quality connections deteriorating'
      ],
      diagnosticSteps: [
        'Monitor during different load conditions',
        'Check all connections for tightness',
        'Thermal imaging of connections',
        'Load testing at various times'
      ],
      safetyNotes: 'Loose connections can cause fires - investigate urgently',
      urgency: 'high'
    },
    {
      symptom: 'New appliance causes RCD to trip',
      category: 'appliance_compatibility',
      possibleCauses: [
        'Appliance has inherent earth leakage',
        'Damaged appliance cable',
        'Incompatible RCD type (AC vs A-type)',
        'Appliance draws switching transients'
      ],
      diagnosticSteps: [
        'Test appliance on different circuit',
        'PAT test the appliance',
        'Check RCD type compatibility',
        'Measure appliance earth leakage current'
      ],
      safetyNotes: 'Do not use appliance until fault is identified',
      urgency: 'medium'
    },
    {
      symptom: 'Electric meter keeps tripping',
      category: 'supply_issues',
      possibleCauses: [
        'Total load exceeding supply capacity',
        'Fault in meter or supply equipment',
        'Poor power factor causing higher currents',
        'Unbalanced three-phase loads'
      ],
      diagnosticSteps: [
        'Monitor total load current',
        'Check supply equipment condition',
        'Measure power factor',
        'Balance three-phase loads if applicable'
      ],
      safetyNotes: 'Supply issues require DNO involvement - contact supplier',
      urgency: 'high'
    }
  ];

  const filteredFaults = commonFaults.filter(fault =>
    fault.symptom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fault.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fault.possibleCauses.some(cause => 
      cause.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical': return 'border-l-red-500';
      case 'high': return 'border-l-orange-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-500';
    }
  };

  const getUrgencyBadge = (urgency: string) => {
    const colors = {
      critical: 'bg-red-500',
      high: 'bg-orange-500',
      medium: 'bg-yellow-500',
      low: 'bg-green-500'
    };
    return colors[urgency as keyof typeof colors] || 'bg-gray-500';
  };

  return (
    <>
      {/* Search */}
      <div className="max-w-md mx-auto mb-6 sm:mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search symptoms or faults..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-muted border-border text-foreground placeholder-gray-400 min-h-[44px]"
          />
        </div>
      </div>

      {/* Faults Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
        {filteredFaults.map((fault, index) => (
          <Card key={index} className={`border-l-4 ${getUrgencyColor(fault.urgency)} hover:bg-card hover:border-border transition-all touch-manipulation`}>
            <CardHeader className="p-4 sm:p-5 md:p-6">
              <div className="flex items-start justify-between gap-3 mb-2">
                <CardTitle className="text-foreground text-base sm:text-lg md:text-xl flex-1 min-w-0">{fault.symptom}</CardTitle>
                <Badge className={`${getUrgencyBadge(fault.urgency)} text-foreground font-bold capitalize text-xs shrink-0`}>
                  {fault.urgency}
                </Badge>
              </div>
              <CardDescription className="text-elec-yellow font-semibold capitalize text-xs sm:text-sm">
                {fault.category.replace('_', ' ')}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-5 md:p-6 pt-0 space-y-3 sm:space-y-4">
              <div className="p-3 sm:p-4 bg-red-500/10 rounded-lg border border-red-500/30">
                <div className="flex items-center gap-2 text-red-400 mb-2">
                  <Shield className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
                  <span className="font-semibold text-sm sm:text-base">Safety Notes</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">{fault.safetyNotes}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-orange-400 flex items-center gap-2 text-sm sm:text-base">
                    <Zap className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
                    Possible Causes
                  </h4>
                  <ul className="space-y-2">
                    {fault.possibleCauses.map((cause, idx) => (
                      <li key={idx} className="text-xs sm:text-sm text-gray-300 flex items-start gap-2 leading-relaxed">
                        <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 shrink-0" />
                        <span className="flex-1">{cause}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-blue-400 flex items-center gap-2 text-sm sm:text-base">
                    <Lightbulb className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
                    Diagnostic Steps
                  </h4>
                  <ol className="space-y-2">
                    {fault.diagnosticSteps.map((step, idx) => (
                      <li key={idx} className="text-xs sm:text-sm text-gray-300 flex items-start gap-2 leading-relaxed">
                        <span className="text-blue-400 font-semibold min-w-[20px] shrink-0">{idx + 1}.</span>
                        <span className="flex-1">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default CommonFaultsList;
