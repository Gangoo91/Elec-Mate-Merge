
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

const SafetyRemindersCard = () => {
  const safetyReminders = [
    {
      title: 'Isolation & Proving Dead',
      description: 'Always isolate circuits and prove dead before testing. Use a proving unit to verify your voltage indicator.',
      severity: 'critical'
    },
    {
      title: 'Equipment Calibration',
      description: 'Ensure all test instruments are within calibration dates and operating correctly.',
      severity: 'essential'
    },
    {
      title: 'Personal Protective Equipment',
      description: 'Wear appropriate PPE for the working environment and voltage levels involved.',
      severity: 'essential'
    },
    {
      title: 'Test Sequence',
      description: 'Follow the correct sequence: dead tests before live tests, lower voltages before higher voltages.',
      severity: 'important'
    },
    {
      title: 'Documentation',
      description: 'Record all test results immediately and maintain proper test documentation.',
      severity: 'important'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'border-red-500/20 bg-red-500/10 text-red-300';
      case 'essential': return 'border-orange-500/20 bg-orange-500/10 text-orange-300';
      default: return 'border-blue-500/20 bg-blue-500/10 text-blue-300';
    }
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-elec-yellow flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Critical Safety Reminders
        </CardTitle>
        <CardDescription className="text-white">
          Essential safety points for all testing procedures
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {safetyReminders.map((safety, index) => (
            <div key={index} className={`p-3 border rounded-lg ${getSeverityColor(safety.severity)}`}>
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium mb-1">{safety.title}</h4>
                  <p className="text-sm opacity-90">{safety.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SafetyRemindersCard;
