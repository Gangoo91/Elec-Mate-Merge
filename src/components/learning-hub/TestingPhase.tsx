import React from 'react';
import { CheckCircle2, AlertTriangle } from 'lucide-react';
import TestReadingCard from './TestReadingCard';

interface TestReading {
  phase: string;
  liveToNeutral: string;
  liveToEarth: string;
  neutralToEarth: string;
  valid: boolean;
  notes?: string;
}

interface TestingPhaseProps {
  testReadings: TestReading[];
  onTestReadingChange: (phaseIndex: number, field: keyof Omit<TestReading, 'phase' | 'valid'>, value: string) => void;
  onProceed?: () => void;
}

const TestingPhase = ({ testReadings, onTestReadingChange }: TestingPhaseProps) => {
  const allTestsValid = testReadings.every(reading => reading.valid);

  return (
    <div className="space-y-4">
      {testReadings.map((reading, index) => (
        <TestReadingCard
          key={reading.phase}
          reading={reading}
          onReadingChange={(field, value) => onTestReadingChange(index, field, value)}
        />
      ))}

      <div className={`p-4 rounded-lg border-2 ${allTestsValid ? 'border-green-500/30 bg-green-500/10' : 'border-orange-500/30 bg-orange-500/10'}`}>
        <div className="flex items-center gap-2 mb-2">
          {allTestsValid ? (
            <CheckCircle2 className="h-5 w-5 text-green-400" />
          ) : (
            <AlertTriangle className="h-5 w-5 text-orange-400" />
          )}
          <span className={`font-medium ${allTestsValid ? 'text-green-400' : 'text-orange-400'}`}>
            Testing Validation Status
          </span>
        </div>
        <p className="text-white text-sm">
          {allTestsValid 
            ? 'All test readings are valid. Installation is confirmed dead and safe for work.'
            : 'Complete all test readings with valid values (0-1000V) to confirm safe isolation.'
          }
        </p>
      </div>
    </div>
  );
};

export default TestingPhase;
