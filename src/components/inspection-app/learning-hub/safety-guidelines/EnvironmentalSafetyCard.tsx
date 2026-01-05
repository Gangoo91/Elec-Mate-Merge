import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Cloud, Droplets, Thermometer, Wind, Mountain, AlertTriangle } from 'lucide-react';

const EnvironmentalSafetyCard = () => {
  const environmentalHazards = [
    {
      condition: 'Wet Conditions',
      icon: Droplets,
      color: 'text-blue-400',
      risks: ['Increased shock risk', 'Equipment damage', 'Slip hazards', 'Reduced insulation'],
      controls: [
        'Use IP65+ rated equipment',
        'Provide weatherproof enclosures',
        'Install additional earth bonding',
        'Use RCBO protection',
        'Implement safe access routes'
      ]
    },
    {
      condition: 'Confined Spaces',
      icon: Mountain,
      color: 'text-purple-400',
      risks: ['Oxygen deficiency', 'Toxic gases', 'Fire/explosion risk', 'Difficult rescue access'],
      controls: [
        'Atmospheric monitoring required',
        'Forced ventilation systems',
        'Entry permit procedures',
        'Emergency rescue plan',
        'Continuous communication'
      ]
    },
    {
      condition: 'Height Work',
      icon: Wind,
      color: 'text-green-400',
      risks: ['Fall injuries', 'Dropped objects', 'Weather exposure', 'Equipment damage'],
      controls: [
        'Fall arrest systems',
        'Tool lanyards and nets',
        'Weather monitoring',
        'Secure equipment transport',
        'Exclusion zones below'
      ]
    },
    {
      condition: 'Hazardous Areas',
      icon: Cloud,
      color: 'text-orange-400',
      risks: ['Explosion risk', 'Fire ignition', 'Toxic exposure', 'Special equipment needs'],
      controls: [
        'Intrinsically safe equipment',
        'Hot work permits',
        'Gas monitoring',
        'ATEX certified equipment',
        'Emergency evacuation'
      ]
    }
  ];

  const weatherConditions = [
    {
      condition: 'Temperature Extremes',
      icon: Thermometer,
      high: { temp: '>35°C', risks: ['Heat stress', 'Equipment overheating', 'Dehydration'] },
      low: { temp: '<0°C', risks: ['Hypothermia', 'Ice formation', 'Equipment brittleness'] },
      controls: ['Regular breaks', 'Appropriate clothing', 'Equipment derating', 'Health monitoring']
    }
  ];

  return (
    <Card className="bg-gradient-to-br from-green-500/10 to-blue-500/10 border-2 border-green-500/20">
      <CardHeader>
        <CardTitle className="text-green-400 flex items-center gap-2">
          <Cloud className="h-6 w-6" />
          Environmental Safety Considerations - BS 7671 Compliance
        </CardTitle>
        <CardDescription className="text-white">
          Safety protocols for working in challenging environmental conditions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Environmental Hazards */}
        <div className="space-y-4">
          <h4 className="font-medium text-foreground">Environmental Hazard Assessment</h4>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {environmentalHazards.map((hazard, index) => {
              const IconComponent = hazard.icon;
              return (
                <div key={index} className="bg-card rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <IconComponent className={`h-5 w-5 ${hazard.color}`} />
                    <h5 className={`font-medium ${hazard.color}`}>{hazard.condition}</h5>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-red-400 mb-2">Key Risks:</p>
                      <div className="space-y-1">
                        {hazard.risks.map((risk, riskIndex) => (
                          <div key={riskIndex} className="flex items-center gap-2 text-xs text-white">
                            <AlertTriangle className="h-3 w-3 text-red-400" />
                            {risk}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-green-400 mb-2">Control Measures:</p>
                      <div className="space-y-1">
                        {hazard.controls.map((control, controlIndex) => (
                          <div key={controlIndex} className="flex items-center gap-2 text-xs text-white">
                            <div className="w-1 h-1 bg-green-400 rounded-full"></div>
                            {control}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Weather Conditions */}
        <div className="bg-card rounded-lg p-4">
          <h4 className="font-medium text-foreground mb-4">Temperature and Weather Considerations</h4>
          {weatherConditions.map((weather, index) => {
            const IconComponent = weather.icon;
            return (
              <div key={index} className="space-y-4">
                <div className="flex items-center gap-3 mb-3">
                  <IconComponent className="h-5 w-5 text-orange-400" />
                  <h5 className="font-medium text-orange-400">{weather.condition}</h5>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-red-500/10 border border-red-500/20 rounded p-3">
                    <p className="font-medium text-red-400 mb-2">High Temperature ({weather.high.temp})</p>
                    <div className="space-y-1">
                      {weather.high.risks.map((risk, riskIndex) => (
                        <p key={riskIndex} className="text-xs text-white">• {risk}</p>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded p-3">
                    <p className="font-medium text-blue-400 mb-2">Low Temperature ({weather.low.temp})</p>
                    <div className="space-y-1">
                      {weather.low.risks.map((risk, riskIndex) => (
                        <p key={riskIndex} className="text-xs text-white">• {risk}</p>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-500/10 border border-green-500/20 rounded p-3">
                  <p className="font-medium text-green-400 mb-2">General Controls:</p>
                  <div className="flex flex-wrap gap-2">
                    {weather.controls.map((control, controlIndex) => (
                      <span key={controlIndex} className="text-xs bg-muted text-white px-2 py-1 rounded">
                        {control}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Special Location Requirements */}
        <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
          <h4 className="font-medium text-purple-400 mb-3">BS 7671 Part 7 - Special Locations</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium text-foreground mb-2">Indoor Special Locations:</p>
              <ul className="space-y-1 text-xs text-white">
                <li>• Section 701 - Locations containing a bath or shower</li>
                <li>• Section 702 - Swimming pools and fountains</li>
                <li>• Section 703 - Rooms and cabins containing sauna heaters</li>
                <li>• Section 704 - Construction and demolition sites</li>
                <li>• Section 705 - Agricultural and horticultural premises</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-foreground mb-2">Outdoor Special Locations:</p>
              <ul className="space-y-1 text-xs text-white">
                <li>• Section 706 - Conducting locations with restricted movement</li>
                <li>• Section 708 - Electrical installations in caravan parks</li>
                <li>• Section 709 - Marinas and similar locations</li>
                <li>• Section 717 - Mobile or transportable units</li>
                <li>• Section 721 - Electrical installations in caravans</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Environmental Monitoring */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
          <h4 className="font-medium text-blue-400 mb-3">Environmental Monitoring Requirements</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <Droplets className="h-6 w-6 text-foreground" />
              </div>
              <p className="font-medium text-foreground mb-1">Humidity</p>
              <p className="text-xs text-white">Monitor for condensation risk</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <Thermometer className="h-6 w-6 text-foreground" />
              </div>
              <p className="font-medium text-foreground mb-1">Temperature</p>
              <p className="text-xs text-white">Equipment derating required</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <Wind className="h-6 w-6 text-foreground" />
              </div>
              <p className="font-medium text-foreground mb-1">Air Quality</p>
              <p className="text-xs text-white">Toxic/explosive gases</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnvironmentalSafetyCard;