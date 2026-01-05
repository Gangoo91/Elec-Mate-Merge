
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, CheckCircle, Zap, Mic } from 'lucide-react';
import MobileNumberPad from './MobileNumberPad';
import MobileQuickActions from './MobileQuickActions';
import { useToast } from '@/hooks/use-toast';
import { Input } from './ui/input';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';
import { formatForSpeech } from '@/utils/voiceLibrary';

interface MobileTestTypeSectionProps {
  testType: any;
  circuits: any[];
  formData: any;
  onUpdate: (field: string, value: any) => void;
  onBack: () => void;
  onTestComplete: (testTypeId: string, circuitId: string) => void;
  completedTests: Set<string>;
}

const MobileTestTypeSection = ({ 
  testType, 
  circuits, 
  formData, 
  onUpdate, 
  onBack, 
  onTestComplete,
  completedTests 
}: MobileTestTypeSectionProps) => {
  const { toast } = useToast();
  const { speak } = useTextToSpeech();
  const [currentCircuitIndex, setCurrentCircuitIndex] = useState(0);
  const [testValue, setTestValue] = useState('');
  const [showNumberPad, setShowNumberPad] = useState(false);
  const [autoAdvance, setAutoAdvance] = useState(true);

  const currentCircuit = circuits[currentCircuitIndex];
  const isTestComplete = completedTests.has(`${testType.id}-${currentCircuit?.id}`);
  const completedCount = circuits.filter(circuit => 
    completedTests.has(`${testType.id}-${circuit.id}`)
  ).length;

  const handleSaveTest = () => {
    if (!testValue.trim()) {
      toast({
        title: "Enter test value",
        description: "Please enter a test reading before saving",
        variant: "destructive"
      });
      speak("Please enter a test value", { priority: 'high', interrupt: true });
      return;
    }

    // Save the test result
    const testResults = formData.testResults || {};
    if (!testResults[currentCircuit.id]) {
      testResults[currentCircuit.id] = {};
    }
    testResults[currentCircuit.id][testType.id] = testValue;
    
    onUpdate('testResults', testResults);
    onTestComplete(testType.id, currentCircuit.id);

    // Voice confirmation
    const spokenValue = formatForSpeech(testValue);
    speak(`${testType.name}: ${spokenValue}. Reading recorded for circuit ${currentCircuit.circuitNumber}`, { 
      priority: 'normal' 
    });

    // Auto-advance to next circuit if enabled
    if (autoAdvance && currentCircuitIndex < circuits.length - 1) {
      setCurrentCircuitIndex(prev => prev + 1);
      setTestValue('');
      setTimeout(() => {
        speak(`Moving to circuit ${circuits[currentCircuitIndex + 1].circuitNumber}`, { priority: 'low' });
      }, 1500);
    } else {
      setTestValue('');
      if (currentCircuitIndex === circuits.length - 1) {
        speak("All circuits complete", { priority: 'normal' });
      }
    }

    toast({
      title: "Test saved",
      description: `${testType.name} result saved for Circuit ${currentCircuit.circuitNumber}`,
    });
  };

  const handleApplyToAll = () => {
    if (!testValue.trim()) {
      toast({
        title: "Enter test value",
        description: "Please enter a value to apply to all circuits",
        variant: "destructive"
      });
      speak("Please enter a test value", { priority: 'high', interrupt: true });
      return;
    }

    const testResults = formData.testResults || {};
    circuits.forEach(circuit => {
      if (!testResults[circuit.id]) {
        testResults[circuit.id] = {};
      }
      testResults[circuit.id][testType.id] = testValue;
      onTestComplete(testType.id, circuit.id);
    });
    
    onUpdate('testResults', testResults);
    
    const spokenValue = formatForSpeech(testValue);
    speak(`${testType.name}: ${spokenValue}. Applied to all ${circuits.length} circuits`, { 
      priority: 'normal',
      interrupt: true
    });
    
    toast({
      title: "Applied to all circuits",
      description: `${testType.name} value applied to all ${circuits.length} circuits`,
    });
  };

  const navigateCircuit = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentCircuitIndex > 0) {
      setCurrentCircuitIndex(prev => prev - 1);
    } else if (direction === 'next' && currentCircuitIndex < circuits.length - 1) {
      setCurrentCircuitIndex(prev => prev + 1);
    }
    
    // Load existing test value if available
    const existingValue = formData.testResults?.[circuits[currentCircuitIndex]?.id]?.[testType.id];
    setTestValue(existingValue || '');
  };

  const getTypicalValues = () => {
    switch (testType.id) {
      case 'continuity':
        return ['0.05', '0.10', '0.15', '0.20'];
      case 'insulation':
        return ['>500', '>200', '50', '100'];
      case 'zs':
        return ['0.35', '0.80', '1.44', '2.30'];
      case 'rcd':
        return ['15', '20', '25', '30'];
      case 'polarity':
        return ['Correct', 'Incorrect'];
      default:
        return [];
    }
  };

  return (
    <div className="space-y-4 pb-20 relative">
      
      {/* Header */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={onBack} size="sm">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex-1">
              <CardTitle className="text-base flex items-center gap-2">
                <span className="text-lg">{testType.icon}</span>
                {testType.name}
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-1">
                Circuit {currentCircuitIndex + 1} of {circuits.length}
              </p>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Progress</span>
              <span>{completedCount}/{circuits.length}</span>
            </div>
            <Progress value={(completedCount / circuits.length) * 100} className="h-2" />
          </div>
        </CardHeader>
      </Card>

      {/* Current Circuit Info */}
      <Card>
        <CardContent className="pt-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1">
              <h3 className="font-semibold">Circuit {currentCircuit?.circuitNumber}</h3>
              <p className="text-sm text-muted-foreground">{currentCircuit?.circuitDescription}</p>
              <div className="flex gap-2 mt-2">
                <Badge variant="outline" className="text-xs">
                  {currentCircuit?.cableSize}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {currentCircuit?.protectiveDeviceRating}
                </Badge>
              </div>
            </div>
            {isTestComplete && (
              <CheckCircle className="h-6 w-6 text-green-500" />
            )}
          </div>

          {/* Test Input */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">
                Test Reading ({testType.unit})
              </label>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowNumberPad(!showNumberPad)}
                >
                  <Zap className="h-4 w-4 mr-1" />
                  Keypad
                </Button>
              </div>
            </div>
            
            <Input
              value={testValue}
              onChange={(e) => setTestValue(e.target.value)}
              placeholder={`Enter ${testType.unit} reading`}
              className="text-lg text-center h-12"
              inputMode="decimal"
            />

            {/* Quick Values */}
            <MobileQuickActions
              typicalValues={getTypicalValues()}
              onValueSelect={setTestValue}
              onApplyToAll={handleApplyToAll}
              testType={testType}
            />
          </div>
        </CardContent>
      </Card>

      {/* Number Pad */}
      {showNumberPad && (
        <MobileNumberPad
          value={testValue}
          onChange={setTestValue}
          onClose={() => setShowNumberPad(false)}
          unit={testType.unit}
        />
      )}

      {/* Navigation & Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4 space-y-3">
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => navigateCircuit('prev')}
            disabled={currentCircuitIndex === 0}
            className="flex-1"
          >
            Previous
          </Button>
          <Button
            onClick={handleSaveTest}
            className="flex-1 bg-elec-yellow hover:bg-elec-yellow/90 text-black"
          >
            {isTestComplete ? 'Update' : 'Save & Next'}
          </Button>
          <Button
            variant="outline"
            onClick={() => navigateCircuit('next')}
            disabled={currentCircuitIndex === circuits.length - 1}
            className="flex-1"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileTestTypeSection;
