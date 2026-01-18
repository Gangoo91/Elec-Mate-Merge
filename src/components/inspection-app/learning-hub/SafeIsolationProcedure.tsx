import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Shield, AlertTriangle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import IsolationStepsWithTesting from './IsolationStepsWithTesting';
import CompletionPhase from './CompletionPhase';
import GS38InfoCard from './GS38InfoCard';
import EquipmentChecklistCard from './EquipmentChecklistCard';
import Enhanced3PhaseTestingCard from './Enhanced3PhaseTestingCard';
import PracticalIsolationStepCard from './PracticalIsolationStepCard';

interface SafeIsolationProcedureProps {
  onBack: () => void;
}

interface IsolationStep {
  id: number;
  title: string;
  description: string;
  regulation: string;
  completed: boolean;
  critical: boolean;
  practicalGuidance: string[];
  safetyNotes: string[];
  testingRequired?: boolean;
  testingInstructions?: string;
}

interface TestReading {
  phase: string;
  liveToNeutral: string;
  liveToEarth: string;
  neutralToEarth: string;
  valid: boolean;
  notes: string;
}

type Phase = 'isolation' | 'completion';

const SafeIsolationProcedure = ({ onBack }: SafeIsolationProcedureProps) => {
  const { toast } = useToast();
  
  const [currentPhase, setCurrentPhase] = useState<Phase>('isolation');
  
  const [isolationSteps, setIsolationSteps] = useState<IsolationStep[]>([
    { 
      id: 1, 
      title: 'Switch Off', 
      description: 'Switch off at the origin of the installation', 
      regulation: 'BS 7671 Regulation 537.2.1.1', 
      completed: false, 
      critical: true,
      practicalGuidance: [
        'Locate the main switch or circuit breaker for the circuit',
        'Inform all personnel in the area before switching off',
        'Switch off in the correct sequence (loads first, then supply)',
        'Verify the switch is in the OFF position visually',
        'For 3-phase systems, ensure all phases are switched off'
      ],
      safetyNotes: [
        'Never assume isolation is complete after switching off',
        'Check for multiple supplies to the installation',
        'Be aware of alternative supply routes (UPS, generators)'
      ]
    },
    {
      id: 2,
      title: 'Isolate',
      description: 'Isolate using appropriate isolation device',
      regulation: 'BS 7671 Regulation 537.2.1.2',
      completed: false,
      critical: true,
      practicalGuidance: [
        'Use a proper isolating device (isolator switch, circuit breaker)',
        'Ensure the device has a visible break or position indicator',
        'Check the isolator is rated for the circuit current and voltage',
        'Operate the isolator fully to the OFF position',
        'For 3-phase systems, verify all poles are isolated'
      ],
      safetyNotes: [
        'Isolation switches must break all live conductors',
        'Ensure the isolator is suitable for isolation, not just switching',
        'Single-pole isolation is not acceptable for 3-phase systems'
      ]
    },
    {
      id: 3,
      title: 'Secure Isolation',
      description: 'Secure isolation to prevent re-energising',
      regulation: 'BS 7671 Regulation 537.2.1.3',
      completed: false,
      critical: true,
      practicalGuidance: [
        'Apply a safety lock to the isolating device using your unique padlock',
        'Use individual locks for each person working on the circuit',
        'Attach warning labels indicating work in progress with your details',
        'Ensure only you can remove your own lock',
        'Record isolation details in the permit to work system if applicable'
      ],
      safetyNotes: [
        'Each person working must apply their own lock',
        'Remove locks only when your work is complete and area is safe',
        'Never remove another person\'s lock without their permission'
      ]
    },
    {
      id: 4,
      title: 'Test Isolation Device',
      description: 'Test that the isolation device is working correctly',
      regulation: 'BS 7671 Regulation 537.2.1.4',
      completed: false,
      critical: true,
      practicalGuidance: [
        'Use an approved voltage indicator compliant with GS38',
        'Test the device on a known live source first (proving)',
        'Check across each pole of the isolation device',
        'Verify no voltage is present across any contacts',
        'For 3-phase systems, test all three phases plus neutral'
      ],
      safetyNotes: [
        'Always prove your tester before and after use',
        'Use only GS38 compliant test probes with finger guards',
        'Maintain safe working distances during testing'
      ]
    },
    {
      id: 5,
      title: 'Test Installation Dead',
      description: 'Test that the installation is dead using approved tester',
      regulation: 'BS 7671 Regulation 537.2.1.5',
      completed: false,
      critical: true,
      testingRequired: true,
      testingInstructions: 'Test between all live conductors and between live conductors and earth at the point of work',
      practicalGuidance: [
        'ALWAYS establish earth connection first - place one test probe on earth/protective conductor',
        'With earth probe secured, test each live conductor to earth (L1-E, L2-E, L3-E)',
        'Test between neutral and earth if present (N-E)',
        'Then test between all combinations of live conductors (L1-L2, L2-L3, L3-L1)',
        'Test at the actual point where work will be carried out',
        'Use the lowest voltage range on your approved tester',
        'Record all test readings for documentation'
      ],
      safetyNotes: [
        'Earth-first testing provides the safest reference point',
        'Test at the actual point where work will be carried out, not just at the isolator',
        'Be aware of induced voltages in long cable runs',
        'Any reading above 50V indicates potential danger',
        'Consider capacitive coupling effects in cables'
      ]
    },
    {
      id: 6,
      title: 'Test Tester',
      description: 'Re-test the voltage tester on a known supply',
      regulation: 'BS 7671 Regulation 537.2.1.6',
      completed: false,
      critical: true,
      practicalGuidance: [
        'Test your voltage indicator on the same known live source used initially',
        'Use the same range and function as used for dead testing',
        'Confirm the tester responds correctly and indicates voltage presence',
        'Document the test results if required by company procedures',
        'If tester fails to respond, repeat dead testing with alternative tester'
      ],
      safetyNotes: [
        'This critical step proves your tester did not fail during dead testing',
        'Use a proving unit if no convenient live source is available',
        'Never skip this step - it validates the entire testing process'
      ]
    }
  ]);

  const [testReadings, setTestReadings] = useState<TestReading[]>([
    { phase: 'L1', liveToNeutral: '', liveToEarth: '', neutralToEarth: '', valid: false, notes: '' },
    { phase: 'L2', liveToNeutral: '', liveToEarth: '', neutralToEarth: '', valid: false, notes: '' },
    { phase: 'L3', liveToNeutral: '', liveToEarth: '', neutralToEarth: '', valid: false, notes: '' }
  ]);

  const [certificateGenerated, setCertificateGenerated] = useState(false);

  const handleStepToggle = (stepId: number) => {
    setIsolationSteps(prev => 
      prev.map(step => 
        step.id === stepId 
          ? { ...step, completed: !step.completed }
          : step
      )
    );
  };

  const validateTestReading = (value: string): boolean => {
    const numValue = parseFloat(value);
    return !isNaN(numValue) && numValue >= 0 && numValue <= 1000;
  };

  const handleTestReadingChange = (phaseIndex: number, field: keyof Omit<TestReading, 'phase' | 'valid'>, value: string) => {
    setTestReadings(prev => 
      prev.map((reading, index) => {
        if (index === phaseIndex) {
          const updatedReading = { ...reading, [field]: value };
          if (field !== 'notes') {
            updatedReading.valid = validateTestReading(updatedReading.liveToNeutral) &&
                                 validateTestReading(updatedReading.liveToEarth) &&
                                 validateTestReading(updatedReading.neutralToEarth);
          }
          return updatedReading;
        }
        return reading;
      })
    );
  };

  const generateCertificate = () => {
    setCertificateGenerated(true);
    toast({
      title: "Certificate Generated",
      description: "Safe isolation certificate has been generated successfully.",
    });
  };

  // Calculate derived values
  const completedSteps = isolationSteps.filter(step => step.completed).length;
  const totalSteps = isolationSteps.length;
  const allTestsValid = testReadings.every(reading => reading.valid);
  const criticalStepsCompleted = isolationSteps.filter(step => step.critical && step.completed).length;
  const totalCriticalSteps = isolationSteps.filter(step => step.critical).length;
  const canComplete = completedSteps === totalSteps && allTestsValid;
  const progressPercentage = (completedSteps / totalSteps) * 100;
  const showTesting = isolationSteps.some(step => step.testingRequired && step.completed);

  const renderCurrentPhase = () => {
    switch (currentPhase) {
      case 'isolation':
        return (
          <IsolationStepsWithTesting
            isolationSteps={isolationSteps}
            testReadings={testReadings}
            onStepToggle={handleStepToggle}
            onTestReadingChange={handleTestReadingChange}
            onProceed={() => setCurrentPhase('completion')}
          />
        );
      case 'completion':
        return (
          <CompletionPhase
            customerDetails={{ name: 'N/A', phone: '', email: '', address: '', workDescription: '' }}
            completedSteps={completedSteps}
            totalSteps={totalSteps}
            criticalStepsCompleted={criticalStepsCompleted}
            totalCriticalSteps={totalCriticalSteps}
            allTestsValid={allTestsValid}
            canComplete={canComplete}
            certificateGenerated={certificateGenerated}
            onGenerateCertificate={generateCertificate}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-2 sm:gap-4 mb-4 sm:mb-6 md:mb-8 px-3 sm:px-4">
        <Button
          variant="outline"
          onClick={onBack}
          className="border-elec-yellow text-elec-yellow hover:bg-elec-yellow hover:text-black min-h-[44px] text-sm touch-manipulation active:scale-[0.98]"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Back to Testing Procedures</span>
          <span className="sm:hidden">Back</span>
        </Button>
      </div>

      <div className="text-center space-y-3 sm:space-y-4 mb-6 sm:mb-8 md:mb-12 px-3 sm:px-4">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <Shield className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-elec-yellow" />
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground text-center">Enhanced Safe Isolation Procedure</h1>
        </div>
        <p className="text-sm sm:text-base md:text-lg text-white max-w-3xl mx-auto">
          Comprehensive BS 7671 compliant safe isolation with GS38 equipment guidance and enhanced 3-phase testing capabilities.
        </p>
      </div>

      {/* GS38 Information Section */}
      <div className="mb-8">
        <GS38InfoCard />
      </div>

      {/* Equipment Checklist Section */}
      <div className="mb-8">
        <EquipmentChecklistCard />
      </div>

      {/* Enhanced Isolation Steps */}
      {currentPhase === 'isolation' && (
        <div className="space-y-6">
          <Card className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border-2 border-red-500/20">
            <CardHeader>
              <CardTitle className="text-elec-yellow flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Enhanced Safe Isolation Steps
              </CardTitle>
              <CardDescription className="text-white">
                Follow each step with comprehensive practical guidance and safety information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-foreground">Progress: {completedSteps}/{totalSteps} steps</span>
                  <span className="text-elec-yellow">{Math.round(progressPercentage)}%</span>
                </div>
                <Progress value={progressPercentage} className="w-full" />
              </div>
              
              <div className="space-y-4">
                {isolationSteps.map((step) => (
                  <PracticalIsolationStepCard
                    key={step.id}
                    step={step}
                    onToggle={handleStepToggle}
                  />
                ))}
              </div>

              {/* Enhanced 3-Phase Testing */}
              {showTesting && (
                <div className="mt-8">
                  <Enhanced3PhaseTestingCard
                    testReadings={testReadings}
                    onTestReadingChange={handleTestReadingChange}
                  />
                </div>
              )}

              <div className="mt-6 p-4 bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <span className="font-medium text-orange-400">Procedure Status</span>
                </div>
                <p className="text-white text-sm">
                  Critical steps: {criticalStepsCompleted}/{totalCriticalSteps} completed
                  {showTesting && ` • Testing: ${allTestsValid ? 'Valid' : 'Incomplete'}`}
                </p>
              </div>

              <Button
                onClick={() => setCurrentPhase('completion')}
                className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90 mt-4 min-h-[44px] text-sm sm:text-base touch-manipulation active:scale-[0.98]"
                disabled={!canComplete}
              >
                Generate Enhanced Isolation Certificate
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Completion Phase */}
      {currentPhase === 'completion' && (
        <CompletionPhase
          customerDetails={{ name: 'N/A', phone: '', email: '', address: '', workDescription: '' }}
          completedSteps={completedSteps}
          totalSteps={totalSteps}
          criticalStepsCompleted={criticalStepsCompleted}
          totalCriticalSteps={totalCriticalSteps}
          allTestsValid={allTestsValid}
          canComplete={canComplete}
          certificateGenerated={certificateGenerated}
          onGenerateCertificate={generateCertificate}
        />
      )}
    </div>
  );
};

export default SafeIsolationProcedure;
