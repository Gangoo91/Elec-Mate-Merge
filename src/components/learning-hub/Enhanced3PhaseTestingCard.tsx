
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Zap, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

interface PhaseTestReading {
  phase: string;
  liveToNeutral: string;
  liveToEarth: string;
  neutralToEarth: string;
  lineToLine?: string;
  valid: boolean;
  notes: string;
}

interface Enhanced3PhaseTestingCardProps {
  testReadings: PhaseTestReading[];
  onTestReadingChange: (phaseIndex: number, field: keyof PhaseTestReading, value: string) => void;
}

const Enhanced3PhaseTestingCard = ({ 
  testReadings, 
  onTestReadingChange 
}: Enhanced3PhaseTestingCardProps) => {
  const [activePhase, setActivePhase] = useState(0);
  const [testingMode, setTestingMode] = useState<'single' | 'three'>('three');

  const testSequence = [
    { phase: 'L1', color: 'text-red-400', description: 'Line 1 to Neutral and Earth' },
    { phase: 'L2', color: 'text-yellow-400', description: 'Line 2 to Neutral and Earth' },
    { phase: 'L3', color: 'text-blue-400', description: 'Line 3 to Neutral and Earth' },
    { phase: 'L1-L2', color: 'text-purple-400', description: 'Line to Line Voltage' },
    { phase: 'L2-L3', color: 'text-green-400', description: 'Line to Line Voltage' },
    { phase: 'L3-L1', color: 'text-orange-400', description: 'Line to Line Voltage' }
  ];

  const validateReading = (value: string): boolean => {
    const numValue = parseFloat(value);
    return !isNaN(numValue) && numValue >= 0 && numValue <= 1000;
  };

  const allTestsValid = testReadings.every(reading => reading.valid);
  const completedTests = testReadings.filter(reading => 
    reading.liveToNeutral && reading.liveToEarth && reading.neutralToEarth
  ).length;
  const progressPercentage = (completedTests / testReadings.length) * 100;

  const interpretResults = () => {
    const hasVoltage = testReadings.some(reading => 
      parseFloat(reading.liveToNeutral) > 50 || 
      parseFloat(reading.liveToEarth) > 50
    );
    
    if (hasVoltage) {
      return {
        status: 'danger',
        message: 'VOLTAGE DETECTED - Circuit is LIVE. Do not proceed with work.',
        color: 'text-red-400 bg-red-500/10 border-red-500/20'
      };
    } else if (allTestsValid && completedTests === testReadings.length) {
      return {
        status: 'safe',
        message: 'All readings indicate circuit is DEAD and safe for work.',
        color: 'text-green-400 bg-green-500/10 border-green-500/20'
      };
    } else {
      return {
        status: 'incomplete',
        message: 'Complete all test readings to verify safe isolation.',
        color: 'text-orange-400 bg-orange-500/10 border-orange-500/20'
      };
    }
  };

  const results = interpretResults();

  return (
    <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-2 border-purple-500/20">
      <CardHeader>
        <CardTitle className="text-elec-yellow flex items-center gap-2">
          <Zap className="h-5 w-5" />
          Enhanced 3-Phase Dead Testing
        </CardTitle>
        <CardDescription className="text-white">
          Comprehensive voltage testing for 3-phase installations with detailed guidance
        </CardDescription>
        <div className="flex items-center gap-4 mt-4">
          <div className="text-sm">
            <span className="text-foreground">Progress: </span>
            <span className="text-elec-yellow font-medium">
              {completedTests}/{testReadings.length} phases tested
            </span>
          </div>
          <Progress value={progressPercentage} className="flex-1 max-w-32" />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Testing Mode Selector */}
        <div className="flex gap-2">
          <Button
            variant={testingMode === 'three' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTestingMode('three')}
            className={testingMode === 'three' ? 'bg-elec-yellow text-black' : ''}
          >
            3-Phase System
          </Button>
          <Button
            variant={testingMode === 'single' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTestingMode('single')}
            className={testingMode === 'single' ? 'bg-elec-yellow text-black' : ''}
          >
            Single Phase
          </Button>
        </div>

        {/* Test Sequence Guide */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
          <h4 className="font-medium text-blue-400 mb-3">Testing Sequence Guide</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            {testSequence.slice(0, testingMode === 'three' ? 6 : 1).map((step, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="font-mono text-xs bg-muted px-2 py-1 rounded">
                  {index + 1}
                </span>
                <span className={step.color}>{step.phase}</span>
                <ArrowRight className="h-3 w-3 text-white/60" />
                <span className="text-white">{step.description}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Phase Testing Cards */}
        <div className="space-y-4">
          {testReadings.slice(0, testingMode === 'three' ? 3 : 1).map((reading, index) => (
            <Card key={index} className={`border-2 ${reading.valid ? 'border-green-500/30 bg-green-500/5' : 'border-border bg-card'}`}>
              <CardHeader className="pb-3">
                <CardTitle className="text-foreground flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    Phase {reading.phase}
                    {reading.valid && <CheckCircle2 className="h-4 w-4 text-green-400" />}
                  </div>
                  <Badge variant="outline" className="text-xs">
                    Step {index + 1}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Live to Neutral (V)
                    </label>
                    <input
                      type="number"
                      value={reading.liveToNeutral}
                      onChange={(e) => onTestReadingChange(index, 'liveToNeutral', e.target.value)}
                      className="w-full p-3 bg-muted border border-border rounded-lg text-foreground"
                      placeholder="0.0"
                      min="0"
                      max="1000"
                      step="0.1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Live to Earth (V)
                    </label>
                    <input
                      type="number"
                      value={reading.liveToEarth}
                      onChange={(e) => onTestReadingChange(index, 'liveToEarth', e.target.value)}
                      className="w-full p-3 bg-muted border border-border rounded-lg text-foreground"
                      placeholder="0.0"
                      min="0"
                      max="1000"
                      step="0.1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Neutral to Earth (V)
                    </label>
                    <input
                      type="number"
                      value={reading.neutralToEarth}
                      onChange={(e) => onTestReadingChange(index, 'neutralToEarth', e.target.value)}
                      className="w-full p-3 bg-muted border border-border rounded-lg text-foreground"
                      placeholder="0.0"
                      min="0"
                      max="1000"
                      step="0.1"
                    />
                  </div>
                </div>
                
                {testingMode === 'three' && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Notes / Observations
                    </label>
                    <textarea
                      value={reading.notes}
                      onChange={(e) => onTestReadingChange(index, 'notes', e.target.value)}
                      className="w-full p-3 bg-muted border border-border rounded-lg text-foreground"
                      placeholder="Record any observations or anomalies..."
                      rows={2}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Results Interpretation */}
        <div className={`p-4 rounded-lg border-2 ${results.color}`}>
          <div className="flex items-center gap-2 mb-2">
            {results.status === 'danger' ? (
              <AlertTriangle className="h-5 w-5" />
            ) : results.status === 'safe' ? (
              <CheckCircle2 className="h-5 w-5" />
            ) : (
              <AlertTriangle className="h-5 w-5" />
            )}
            <span className="font-medium">Testing Status</span>
          </div>
          <p className="text-sm opacity-90">{results.message}</p>
        </div>

        {/* Safety Reminders */}
        <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-4 w-4 text-orange-400" />
            <span className="font-medium text-orange-400">Safety Reminders</span>
          </div>
          <ul className="space-y-1 text-sm text-white">
            <li>• Test at the point of work, not just at the isolation point</li>
            <li>• Use GS38 compliant test equipment throughout</li>
            <li>• Prove your tester before and after dead testing</li>
            <li>• Any voltage reading above 50V indicates circuit is live</li>
            <li>• If in doubt, treat the circuit as live</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default Enhanced3PhaseTestingCard;
