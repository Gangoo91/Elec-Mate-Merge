import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { 
  Smartphone, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  ChevronRight,
  RotateCcw,
  Zap
} from 'lucide-react';
import MobileTestTypeCard from './MobileTestTypeCard';
import MobileTestTypeSection from './MobileTestTypeSection';
import CompactCircuitAutoFillSection from './CompactCircuitAutoFillSection';

interface MobileEnhancedTestScheduleProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
}

const MobileEnhancedTestSchedule = ({ formData, onUpdate }: MobileEnhancedTestScheduleProps) => {
  const [currentTestType, setCurrentTestType] = useState<string>('');
  const [completedTests, setCompletedTests] = useState<Set<string>>(new Set());
  const [showAutoFill, setShowAutoFill] = useState(false);

  const circuits = formData.testResults || [];
  const totalTests = circuits.length * 6; // 6 test types per circuit
  const completedTestsCount = completedTests.size;
  const progress = totalTests > 0 ? (completedTestsCount / totalTests) * 100 : 0;

  const testTypes = [
    { 
      id: 'continuity', 
      name: 'Continuity Tests', 
      icon: '⚡', 
      unit: 'Ω',
      color: 'bg-blue-500',
      description: 'R1+R2 and Ring final circuit tests',
      requiredForAll: true
    },
    { 
      id: 'insulation', 
      name: 'Insulation Resistance', 
      icon: '✅', 
      unit: 'MΩ',
      color: 'bg-green-500',
      description: 'Line/Neutral to Earth resistance',
      requiredForAll: true
    },
    { 
      id: 'polarity', 
      name: 'Polarity', 
      icon: '⚠️', 
      unit: '',
      color: 'bg-yellow-500',
      description: 'Correct polarity verification',
      requiredForAll: true
    },
    { 
      id: 'zs', 
      name: 'Earth Fault Loop', 
      icon: '🔄', 
      unit: 'Ω',
      color: 'bg-purple-500',
      description: 'Zs earth fault loop impedance',
      requiredForAll: true
    },
    { 
      id: 'rcd', 
      name: 'RCD Tests', 
      icon: '⏱️', 
      unit: 'ms',
      color: 'bg-orange-500',
      description: 'RCD operation time and current',
      requiredForCircuits: ['rcd', 'socket', 'bathroom', 'outdoor']
    },
    { 
      id: 'functional', 
      name: 'Functional Tests', 
      icon: '✅', 
      unit: '',
      color: 'bg-teal-500',
      description: 'Switch and control operation',
      requiredForAll: true
    }
  ];

  const handleStartTestType = (testTypeId: string) => {
    setCurrentTestType(testTypeId);
  };

  const handleTestComplete = (testTypeId: string, circuitId: string) => {
    const testKey = `${testTypeId}-${circuitId}`;
    setCompletedTests(prev => new Set([...prev, testKey]));
    
    const testType = testTypes.find(t => t.id === testTypeId);
    toast.success(`✅ ${testType?.name} completed for circuit`, {
      description: `Test recorded successfully`,
      duration: 2000,
    });
  };

  const handleBackToOverview = () => {
    setCurrentTestType('');
  };

  const getProgressColor = () => {
    if (progress < 25) return 'bg-red-500';
    if (progress < 50) return 'bg-yellow-500';
    if (progress < 75) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getProgressIcon = () => {
    if (progress < 25) return <AlertCircle className="h-4 w-4 text-red-500" />;
    if (progress < 75) return <Clock className="h-4 w-4 text-blue-500" />;
    return <CheckCircle className="h-4 w-4 text-green-500" />;
  };

  const getStatusText = () => {
    if (progress === 0) return 'Not Started';
    if (progress < 25) return 'Getting Started';
    if (progress < 50) return 'In Progress';
    if (progress < 75) return 'Nearly There';
    if (progress < 100) return 'Almost Complete';
    return 'All Tests Complete';
  };

  // Show current test type section if selected
  if (currentTestType) {
    return (
      <MobileTestTypeSection
        testType={currentTestType}
        formData={formData}
        onUpdate={onUpdate}
        onTestComplete={handleTestComplete}
        onBack={handleBackToOverview}
        circuits={circuits}
        completedTests={completedTests}
      />
    );
  }

  return (
    <div className="space-y-4 p-4">
      {/* Enhanced Header */}
      <Card className="border-elec-yellow/20 bg-gradient-to-br from-background to-muted/50">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-elec-yellow">
            <Smartphone className="h-6 w-6" />
            Mobile Test Schedule
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Progress Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getProgressIcon()}
                <span className="font-medium">{getStatusText()}</span>
              </div>
              <Badge variant="outline" className="text-elec-yellow border-elec-yellow/30">
                {Math.round(progress)}% Complete
              </Badge>
            </div>
            
            <Progress 
              value={progress} 
              className="h-3 bg-muted"
            />
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="space-y-1">
                <div className="text-2xl font-bold text-elec-yellow">{circuits.length}</div>
                <div className="text-xs text-muted-foreground">Circuits</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-green-500">{completedTestsCount}</div>
                <div className="text-xs text-muted-foreground">Completed</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-orange-500">{totalTests - completedTestsCount}</div>
                <div className="text-xs text-muted-foreground">Remaining</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Circuit Auto-Fill Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium">Smart Circuit Setup</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAutoFill(!showAutoFill)}
              className="h-8"
            >
              {showAutoFill ? 'Hide' : 'Show'} Auto-Fill
            </Button>
          </div>
        </CardHeader>
        {showAutoFill && (
          <CardContent>
            <CompactCircuitAutoFillSection
              testResults={circuits}
              onUpdate={(id, updates) => {
                const updatedResults = circuits.map((result: any) =>
                  result.id === id ? { ...result, ...updates } : result
                );
                onUpdate('testResults', updatedResults);
              }}
            />
          </CardContent>
        )}
      </Card>

      {/* Empty State */}
      {circuits.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Circuits Found</h3>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Add circuits to your schedule of test results to begin mobile testing
            </p>
            <Button variant="outline">
              Add Test Circuits
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Test Type Cards */}
      {circuits.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Zap className="h-5 w-5 text-elec-yellow" />
            Available Tests
          </h3>
          
          <div className="grid gap-3">
            {testTypes.map((testType) => (
              <MobileTestTypeCard
                key={testType.id}
                testType={testType}
                circuits={circuits}
                completedTests={completedTests}
                onStartTest={() => handleStartTestType(testType.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Quick Stats Footer */}
      {circuits.length > 0 && (
        <Card className="bg-muted/30">
          <CardContent className="pt-6">
            <div className="text-center text-sm text-muted-foreground">
              <div className="flex items-center justify-center gap-4">
                <span>📱 Mobile Optimised</span>
                <span>⚡ Fast Testing</span>
                <span>✅ Auto-Save</span>
              </div>
              <p className="mt-2 text-xs">
                Rotate device to landscape for enhanced testing experience
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MobileEnhancedTestSchedule;