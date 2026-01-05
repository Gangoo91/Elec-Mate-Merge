import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, CheckCircle2, XCircle, MinusCircle } from 'lucide-react';

const RiskAssessmentCard = () => {
  const riskMatrix = [
    { likelihood: 'Very Likely', severity: 'High', risk: 'Very High', color: 'bg-red-500', action: 'Stop work immediately' },
    { likelihood: 'Likely', severity: 'High', risk: 'High', color: 'bg-orange-500', action: 'Additional controls required' },
    { likelihood: 'Possible', severity: 'Medium', risk: 'Medium', color: 'bg-yellow-500', action: 'Monitor and review' },
    { likelihood: 'Unlikely', severity: 'Low', risk: 'Low', color: 'bg-green-500', action: 'Acceptable with controls' }
  ];

  const assessmentSteps = [
    {
      step: '1',
      title: 'Identify Hazards',
      description: 'Look for electrical hazards in the work environment',
      examples: ['Live conductors', 'Damaged equipment', 'Water/moisture', 'Overhead lines'],
      icon: AlertTriangle,
      color: 'text-red-400'
    },
    {
      step: '2',
      title: 'Assess Risk Level',
      description: 'Evaluate likelihood and severity of potential harm',
      examples: ['Probability of occurrence', 'Potential consequences', 'Number of people affected', 'Duration of exposure'],
      icon: MinusCircle,
      color: 'text-orange-400'
    },
    {
      step: '3',
      title: 'Implement Controls',
      description: 'Apply hierarchy of controls to eliminate or reduce risk',
      examples: ['Isolation/switching off', 'Barriers and guards', 'PPE selection', 'Safe work procedures'],
      icon: CheckCircle2,
      color: 'text-green-400'
    },
    {
      step: '4',
      title: 'Monitor & Review',
      description: 'Continuously monitor effectiveness of control measures',
      examples: ['Regular inspections', 'Incident reporting', 'Control effectiveness', 'Procedure updates'],
      icon: XCircle,
      color: 'text-blue-400'
    }
  ];

  return (
    <Card className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border-2 border-red-500/20">
      <CardHeader>
        <CardTitle className="text-red-400 flex items-center gap-2">
          <AlertTriangle className="h-6 w-6" />
          Risk Assessment Methodology - BS 7671 Compliance
        </CardTitle>
        <CardDescription className="text-white">
          Systematic approach to electrical risk assessment and control measures
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Risk Assessment Steps */}
        <div className="space-y-4">
          <h4 className="font-medium text-foreground">Four-Step Risk Assessment Process</h4>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {assessmentSteps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={index} className="bg-card rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full bg-muted flex items-center justify-center font-bold ${step.color}`}>
                      {step.step}
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center gap-2 mb-2">
                        <IconComponent className={`h-4 w-4 ${step.color}`} />
                        <h5 className="font-medium text-foreground">{step.title}</h5>
                      </div>
                      <p className="text-sm text-white mb-3">{step.description}</p>
                      <div className="space-y-1">
                        {step.examples.map((example, exampleIndex) => (
                          <div key={exampleIndex} className="flex items-center gap-2 text-xs text-white/80">
                            <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                            {example}
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

        {/* Risk Matrix */}
        <div className="bg-card rounded-lg p-4">
          <h4 className="font-medium text-foreground mb-4">Risk Assessment Matrix</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-white/80 p-2">Likelihood</th>
                  <th className="text-left text-white/80 p-2">Severity</th>
                  <th className="text-left text-white/80 p-2">Risk Level</th>
                  <th className="text-left text-white/80 p-2">Required Action</th>
                </tr>
              </thead>
              <tbody>
                {riskMatrix.map((row, index) => (
                  <tr key={index} className="border-b border-border">
                    <td className="p-2 text-white">{row.likelihood}</td>
                    <td className="p-2 text-white">{row.severity}</td>
                    <td className="p-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium text-foreground ${row.color}`}>
                        {row.risk}
                      </span>
                    </td>
                    <td className="p-2 text-white text-xs">{row.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Control Hierarchy */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
          <h4 className="font-medium text-blue-400 mb-3">Hierarchy of Risk Controls</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-3 p-2 bg-card rounded">
              <span className="w-6 h-6 bg-red-500 text-foreground rounded-full flex items-center justify-center text-xs font-bold">1</span>
              <div>
                <span className="text-foreground font-medium">Elimination:</span>
                <span className="text-white ml-2">Remove the hazard completely</span>
              </div>
            </div>
            <div className="flex items-center gap-3 p-2 bg-card rounded">
              <span className="w-6 h-6 bg-orange-500 text-foreground rounded-full flex items-center justify-center text-xs font-bold">2</span>
              <div>
                <span className="text-foreground font-medium">Substitution:</span>
                <span className="text-white ml-2">Replace with safer alternative</span>
              </div>
            </div>
            <div className="flex items-center gap-3 p-2 bg-card rounded">
              <span className="w-6 h-6 bg-yellow-500 text-foreground rounded-full flex items-center justify-center text-xs font-bold">3</span>
              <div>
                <span className="text-foreground font-medium">Engineering Controls:</span>
                <span className="text-white ml-2">Physical safeguards and barriers</span>
              </div>
            </div>
            <div className="flex items-center gap-3 p-2 bg-card rounded">
              <span className="w-6 h-6 bg-blue-500 text-foreground rounded-full flex items-center justify-center text-xs font-bold">4</span>
              <div>
                <span className="text-foreground font-medium">Administrative:</span>
                <span className="text-white ml-2">Procedures, training, signage</span>
              </div>
            </div>
            <div className="flex items-center gap-3 p-2 bg-card rounded">
              <span className="w-6 h-6 bg-green-500 text-foreground rounded-full flex items-center justify-center text-xs font-bold">5</span>
              <div>
                <span className="text-foreground font-medium">PPE:</span>
                <span className="text-white ml-2">Personal protective equipment (last resort)</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskAssessmentCard;