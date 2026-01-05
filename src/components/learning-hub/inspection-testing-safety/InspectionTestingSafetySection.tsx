import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Shield, Zap, CheckCircle } from 'lucide-react';
import SafeIsolationLearning from './SafeIsolationLearning';
import TestingSafetyModule from './TestingSafetyModule';
import TestingEnvironmentSafety from './TestingEnvironmentSafety';
import TestingEquipmentSafety from './TestingEquipmentSafety';

interface InspectionTestingSafetySectionProps {
  onBack: () => void;
}

const InspectionTestingSafetySection = ({ onBack }: InspectionTestingSafetySectionProps) => {
  const [activeModule, setActiveModule] = useState<string | null>(null);

  if (activeModule === 'safe-isolation') {
    return <SafeIsolationLearning onBack={() => setActiveModule(null)} />;
  }

  if (activeModule === 'testing-environment') {
    return <TestingEnvironmentSafety onBack={() => setActiveModule(null)} />;
  }

  if (activeModule === 'testing-equipment') {
    return <TestingEquipmentSafety onBack={() => setActiveModule(null)} />;
  }

  const safetyModules = [
    {
      id: 'safe-isolation',
      title: 'Safe Isolation for Testing',
      description: 'Learn the principles and application of safe isolation procedures specifically for inspection and testing work',
      priority: 'Critical',
      duration: '25 min',
      topics: ['BS 7671 Requirements', 'Isolation Verification', 'Test Environment Preparation', 'Re-energisation'],
      color: 'border-red-500/20 bg-red-500/5',
      icon: Zap,
      interactive: true
    },
    {
      id: 'testing-equipment',
      title: 'Testing Equipment Safety',
      description: 'Safe selection, inspection, and use of electrical testing instruments and equipment',
      priority: 'Essential',
      duration: '20 min',
      topics: ['GS38 Compliance', 'Equipment Inspection', 'Test Lead Safety', 'Measurement Safety'],
      color: 'border-orange-500/20 bg-orange-500/5',
      icon: CheckCircle,
      interactive: true
    },
    {
      id: 'testing-environment',
      title: 'Testing Environment Safety',
      description: 'Creating and maintaining safe working conditions during electrical testing activities',
      priority: 'Required',
      duration: '18 min',
      topics: ['Wet Conditions', 'Confined Spaces', 'Live Testing', 'Access Safety'],
      color: 'border-blue-500/20 bg-blue-500/5',
      icon: Shield,
      interactive: true
    },
    {
      id: 'testing-procedures',
      title: 'Safe Testing Procedures',
      description: 'Step-by-step safety protocols for different types of electrical testing',
      priority: 'Essential',
      duration: '22 min',
      topics: ['Continuity Testing', 'Insulation Testing', 'RCD Testing', 'Live Testing'],
      color: 'border-green-500/20 bg-green-500/5',
      icon: CheckCircle
    },
    {
      id: 'personal-safety',
      title: 'Personal Safety During Testing',
      description: 'Individual safety measures and protective equipment for testing activities',
      priority: 'Critical',
      duration: '16 min',
      topics: ['PPE Selection', 'Safe Working Position', 'Emergency Response', 'Health Monitoring'],
      color: 'border-purple-500/20 bg-purple-500/5',
      icon: Shield
    },
    {
      id: 'documentation-safety',
      title: 'Safety Documentation',
      description: 'Recording safety measures and compliance for inspection and testing work',
      priority: 'Required',
      duration: '14 min',
      topics: ['Risk Assessments', 'Safety Checklists', 'Incident Reporting', 'Compliance Records'],
      color: 'border-yellow-500/20 bg-yellow-500/5',
      icon: CheckCircle
    }
  ];

  const handleModuleClick = (moduleId: string) => {
    if (['safe-isolation', 'testing-environment', 'testing-equipment'].includes(moduleId)) {
      setActiveModule(moduleId);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Button 
          variant="outline" 
          onClick={onBack}
          className="border-elec-yellow text-elec-yellow hover:bg-elec-yellow hover:text-black"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Apprentice Hub
        </Button>
      </div>

      <div className="text-center space-y-4 mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Shield className="h-8 w-8 text-elec-yellow" />
          <h1 className="text-3xl font-bold text-foreground">Inspection & Testing Safety</h1>
        </div>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          Learn essential safety principles and procedures specifically for electrical inspection and testing work. 
          Master safe isolation, equipment safety, and environmental considerations for BS 7671 compliance.
        </p>
      </div>

      {/* Safety Modules Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
        {safetyModules.map((module) => (
          <TestingSafetyModule
            key={module.id}
            module={module}
            onModuleClick={handleModuleClick}
          />
        ))}
      </div>

      {/* Key Safety Reminders */}
      <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <Shield className="h-5 w-5 text-red-400" />
          Critical Safety Reminders for Testing
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
          <div className="space-y-2">
            <p className="font-medium text-red-400">Before Testing:</p>
            <ul className="space-y-1 text-sm">
              <li>• Always verify safe isolation</li>
              <li>• Check all test equipment (GS38)</li>
              <li>• Assess environmental conditions</li>
              <li>• Ensure proper PPE is worn</li>
            </ul>
          </div>
          <div className="space-y-2">
            <p className="font-medium text-orange-400">During Testing:</p>
            <ul className="space-y-1 text-sm">
              <li>• Maintain safe working position</li>
              <li>• Use approved test methods only</li>
              <li>• Monitor for changing conditions</li>
              <li>• Document all safety measures</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InspectionTestingSafetySection;