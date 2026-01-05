import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Phone, Heart, Shield, Zap, Users } from 'lucide-react';

const EmergencyProceduresCard = () => {
  const emergencyTypes = [
    {
      type: 'Electrical Shock',
      icon: Zap,
      color: 'text-red-400',
      priority: 'CRITICAL',
      steps: [
        'DO NOT touch the casualty if still in contact with electricity',
        'Switch off power at source or isolate supply',
        'If unable to isolate, use non-conductive material to separate casualty',
        'Check for consciousness and breathing',
        'Call 999 immediately',
        'Begin CPR if qualified and necessary'
      ]
    },
    {
      type: 'Electrical Fire',
      icon: AlertTriangle,
      color: 'text-orange-400',
      priority: 'URGENT',
      steps: [
        'Switch off electrical supply if safe to do so',
        'Use CO2 or dry powder extinguisher ONLY',
        'NEVER use water on electrical fires',
        'Evacuate area if fire cannot be controlled',
        'Call 999 Fire Service',
        'Ventilate area after extinguishing'
      ]
    },
    {
      type: 'Arc Flash Incident',
      icon: Shield,
      color: 'text-yellow-400',
      priority: 'CRITICAL',
      steps: [
        'Ensure area is safe before approaching casualty',
        'Call 999 immediately for severe burns',
        'Cool burns with cold water for 20 minutes',
        'Remove clothing/jewellery unless stuck to skin',
        'Cover burns with clean, non-fluffy material',
        'Monitor for shock and breathing difficulties'
      ]
    }
  ];

  const firstAidBasics = [
    { action: 'Check Response', instruction: 'Tap shoulders and shout "Are you alright?"' },
    { action: 'Open Airway', instruction: 'Tilt head back, lift chin' },
    { action: 'Check Breathing', instruction: 'Look, listen, feel for 10 seconds' },
    { action: 'Call for Help', instruction: 'Dial 999, request ambulance' },
    { action: 'Begin CPR', instruction: '30 chest compressions, 2 rescue breaths' },
    { action: 'Continue', instruction: 'Until help arrives or casualty recovers' }
  ];

  return (
    <Card className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border-2 border-red-500/20">
      <CardHeader>
        <CardTitle className="text-red-400 flex items-center gap-2">
          <AlertTriangle className="h-6 w-6" />
          Emergency Response Procedures - Electrical Incidents
        </CardTitle>
        <CardDescription className="text-white">
          Critical response protocols for electrical emergencies and first aid procedures
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Emergency Response Types */}
        <div className="space-y-4">
          <h4 className="font-medium text-foreground">Emergency Response by Incident Type</h4>
          {emergencyTypes.map((emergency, index) => {
            const IconComponent = emergency.icon;
            return (
              <div key={index} className="bg-card rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <IconComponent className={`h-5 w-5 ${emergency.color}`} />
                  <h5 className="font-medium text-foreground">{emergency.type}</h5>
                  <span className={`text-xs px-2 py-1 rounded font-bold ${emergency.color.replace('text-', 'bg-').replace('-400', '-400/20')} border ${emergency.color.replace('text-', 'border-').replace('-400', '-400/40')}`}>
                    {emergency.priority}
                  </span>
                </div>
                <div className="space-y-2">
                  {emergency.steps.map((step, stepIndex) => (
                    <div key={stepIndex} className="flex items-start gap-3 text-sm">
                      <span className={`w-5 h-5 rounded-full bg-muted flex items-center justify-center text-xs font-bold ${emergency.color} flex-shrink-0`}>
                        {stepIndex + 1}
                      </span>
                      <span className="text-white">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* First Aid Basics */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-4">
            <Heart className="h-5 w-5 text-blue-400" />
            <h4 className="font-medium text-blue-400">Basic First Aid (DR ABC)</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {firstAidBasics.map((aid, index) => (
              <div key={index} className="bg-card rounded p-3">
                <div className="text-center">
                  <div className="w-8 h-8 bg-blue-500 text-foreground rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-2">
                    {index + 1}
                  </div>
                  <h6 className="font-medium text-foreground text-sm mb-1">{aid.action}</h6>
                  <p className="text-xs text-white">{aid.instruction}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Contacts Quick Reference */}
        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <Phone className="h-5 w-5 text-green-400" />
            <h4 className="font-medium text-green-400">Emergency Contact Quick Reference</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-white">Emergency Services:</span>
                <span className="text-foreground font-bold">999</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white">NHS Direct:</span>
                <span className="text-foreground font-bold">111</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white">Electricity Emergency:</span>
                <span className="text-foreground font-bold">105</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-white">HSE Emergency:</span>
                <span className="text-foreground font-bold">0151 951 4000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white">Electrical Safety First:</span>
                <span className="text-foreground font-bold">0207 582 7746</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white">Gas Emergency:</span>
                <span className="text-foreground font-bold">0800 111 999</span>
              </div>
            </div>
          </div>
        </div>

        {/* Post-Incident Actions */}
        <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <Users className="h-5 w-5 text-purple-400" />
            <h4 className="font-medium text-purple-400">Post-Incident Requirements</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-white">
            <div>
              <p className="font-medium text-foreground mb-2">Immediate Actions:</p>
              <ul className="space-y-1 text-xs">
                <li>• Preserve incident scene</li>
                <li>• Document all details</li>
                <li>• Notify supervisor/safety officer</li>
                <li>• Complete incident report</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-foreground mb-2">Follow-up Requirements:</p>
              <ul className="space-y-1 text-xs">
                <li>• RIDDOR reporting if applicable</li>
                <li>• Investigation and root cause analysis</li>
                <li>• Review and update procedures</li>
                <li>• Additional training if required</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmergencyProceduresCard;