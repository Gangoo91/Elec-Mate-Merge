
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, CheckCircle2, AlertTriangle, Calculator, Copy } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface TestingStep {
  id: number;
  title: string;
  description: string;
  regulation: string;
  completed: boolean;
  critical: boolean;
  practicalGuidance: string[];
  safetyNotes: string[];
  commonMistakes: string[];
  testMethod?: 'R1+R2' | 'R2' | 'main-bonding' | 'supplementary-bonding';
}

interface ContinuityTestRecordingCardProps {
  testingSteps: TestingStep[];
}

interface TestRecord {
  circuit: string;
  method: string;
  reading: string;
  notes: string;
}

const ContinuityTestRecordingCard = ({ testingSteps }: ContinuityTestRecordingCardProps) => {
  const { toast } = useToast();
  const [testRecords, setTestRecords] = useState<TestRecord[]>([
    { circuit: 'Ring Circuit - Kitchen', method: 'R1+R2', reading: '0.45', notes: 'Both legs tested separately' },
    { circuit: 'Radial Circuit - Bedroom 1', method: 'R1+R2', reading: '0.32', notes: 'Single 2.5mm² cable run' },
    { circuit: 'Main Gas Bonding', method: 'Main Bonding', reading: '0.02', notes: '10mm² bonding conductor' },
    { circuit: 'Main Water Bonding', method: 'Main Bonding', reading: '0.03', notes: '10mm² bonding conductor' }
  ]);

  const completedSteps = testingSteps.filter(step => step.completed).length;
  const totalSteps = testingSteps.length;
  const criticalStepsCompleted = testingSteps.filter(step => step.critical && step.completed).length;
  const totalCriticalSteps = testingSteps.filter(step => step.critical).length;

  const handleAddRecord = () => {
    const newRecord: TestRecord = {
      circuit: '',
      method: 'R1+R2',
      reading: '',
      notes: ''
    };
    setTestRecords(prev => [...prev, newRecord]);
  };

  const handleUpdateRecord = (index: number, field: keyof TestRecord, value: string) => {
    setTestRecords(prev => 
      prev.map((record, i) => 
        i === index ? { ...record, [field]: value } : record
      )
    );
  };

  const handleRemoveRecord = (index: number) => {
    setTestRecords(prev => prev.filter((_, i) => i !== index));
  };

  const exportResults = () => {
    toast({
      title: "Results Exported",
      description: "Test results have been exported successfully.",
    });
  };

  const copyToClipboard = () => {
    const resultsText = testRecords.map(record => 
      `${record.circuit}: ${record.reading}Ω (${record.method}) - ${record.notes}`
    ).join('\n');
    
    navigator.clipboard.writeText(resultsText);
    toast({
      title: "Copied to Clipboard",
      description: "Test results copied to clipboard.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Recording Overview */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Test Results Recording
          </CardTitle>
          <CardDescription className="text-white">
            Document and validate continuity test measurements
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Progress Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20 rounded-lg p-4">
              <div className="text-xl sm:text-2xl font-bold text-blue-400">{completedSteps}/{totalSteps}</div>
              <div className="text-sm text-white">Total Steps</div>
            </div>
            <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/20 rounded-lg p-4">
              <div className="text-xl sm:text-2xl font-bold text-green-400">{criticalStepsCompleted}/{totalCriticalSteps}</div>
              <div className="text-sm text-white">Critical Steps</div>
            </div>
            <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/20 rounded-lg p-4">
              <div className="text-xl sm:text-2xl font-bold text-purple-400">{testRecords.length}</div>
              <div className="text-sm text-white">Test Records</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 flex-wrap">
            <Button onClick={handleAddRecord} variant="outline" className="border-elec-yellow text-elec-yellow">
              Add Test Record
            </Button>
            <Button onClick={copyToClipboard} variant="outline" className="border-blue-500 text-blue-400">
              <Copy className="h-4 w-4 mr-2" />
              Copy Results
            </Button>
            <Button onClick={exportResults} variant="outline" className="border-green-500 text-green-400">
              <Download className="h-4 w-4 mr-2" />
              Export Results
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Test Records Table */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Test Measurements
          </CardTitle>
          <CardDescription className="text-white">
            Record and validate continuity test readings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {testRecords.map((record, index) => (
              <div key={index} className="bg-muted border border-border rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Circuit/Component</label>
                    <input
                      type="text"
                      value={record.circuit}
                      onChange={(e) => handleUpdateRecord(index, 'circuit', e.target.value)}
                      placeholder="e.g., Ring Circuit - Kitchen"
                      className="w-full p-2 bg-card border border-border rounded text-foreground text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Test Method</label>
                    <select
                      value={record.method}
                      onChange={(e) => handleUpdateRecord(index, 'method', e.target.value)}
                      className="w-full p-2 bg-card border border-border rounded text-foreground text-sm"
                    >
                      <option value="R1+R2">R1+R2</option>
                      <option value="Main Bonding">Main Bonding</option>
                      <option value="Supplementary Bonding">Supplementary Bonding</option>
                      <option value="Ring Circuit">Ring Circuit</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Reading (Ω)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={record.reading}
                      onChange={(e) => handleUpdateRecord(index, 'reading', e.target.value)}
                      placeholder="0.00"
                      className="w-full p-2 bg-card border border-border rounded text-foreground text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Notes</label>
                    <input
                      type="text"
                      value={record.notes}
                      onChange={(e) => handleUpdateRecord(index, 'notes', e.target.value)}
                      placeholder="Additional observations"
                      className="w-full p-2 bg-card border border-border rounded text-foreground text-sm"
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center mt-3">
                  <div className="flex items-center gap-2">
                    {parseFloat(record.reading) > 0 && parseFloat(record.reading) <= 1.67 ? (
                      <>
                        <CheckCircle2 className="h-4 w-4 text-green-400" />
                        <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
                          Within Limits
                        </Badge>
                      </>
                    ) : parseFloat(record.reading) > 1.67 ? (
                      <>
                        <AlertTriangle className="h-4 w-4 text-red-400" />
                        <Badge variant="destructive" className="bg-red-500/20 text-red-400 border-red-500/30">
                          Exceeds Limits
                        </Badge>
                      </>
                    ) : null}
                  </div>
                  <Button
                    onClick={() => handleRemoveRecord(index)}
                    variant="ghost"
                    size="sm"
                    className="text-red-400 hover:text-red-300"
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Validation Guidelines */}
      <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-2 border-orange-500/20">
        <CardHeader>
          <CardTitle className="text-orange-400 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Result Validation Guidelines
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-foreground">Typical Acceptable Values</h4>
              <div className="space-y-2 text-sm text-white">
                <div>• R1+R2 for ring circuits: ≤ 1.67Ω</div>
                <div>• Main protective bonding: ≤ 0.05Ω</div>
                <div>• Supplementary bonding: ≤ 0.05Ω</div>
                <div>• Radial circuits: Varies with length and cable size</div>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-foreground">Investigation Required If</h4>
              <div className="space-y-2 text-sm text-white">
                <div>• Readings significantly higher than expected</div>
                <div>• Ring circuit legs show large differences</div>
                <div>• Bonding conductors exceed maximum values</div>
                <div>• Results inconsistent with cable specifications</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContinuityTestRecordingCard;
