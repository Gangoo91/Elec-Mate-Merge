import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Zap, TestTube2, Timer, Database, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAIDesigner } from '@/hooks/useAIDesigner';
import { DesignInputs } from '@/types/installation-design';
import { Alert, AlertDescription } from '@/components/ui/alert';

export const OptimizationTestPanel = () => {
  const [testResults, setTestResults] = useState<any>(null);
  const [isRunning, setIsRunning] = useState(false);
  const { generateDesign } = useAIDesigner();

  // Test data: Mixed batch of 8 circuits (sockets, lighting, shower, cooker)
  const testInputs: DesignInputs = {
    projectName: "Optimization Test - Mixed 8 Circuits",
    location: "Test Property",
    propertyType: "domestic" as const,
    voltage: 230,
    phases: "single" as const,
    ze: 0.35,
    earthingSystem: "TN-S" as const,
    circuits: [
      {
        id: "1",
        name: "Kitchen Sockets",
        loadType: "socket" as const,
        loadPower: 7360, // 32A x 230V
        cableLength: 18,
        phases: "single" as const,
        specialLocation: "kitchen" as const
      },
      {
        id: "2",
        name: "Living Room Sockets",
        loadType: "socket" as const,
        loadPower: 7360, // 32A x 230V
        cableLength: 22,
        phases: "single" as const,
        specialLocation: "none" as const
      },
      {
        id: "3",
        name: "Ground Floor Lighting",
        loadType: "lighting" as const,
        loadPower: 1380, // 6A x 230V
        cableLength: 25,
        phases: "single" as const,
        specialLocation: "none" as const
      },
      {
        id: "4",
        name: "First Floor Lighting",
        loadType: "lighting" as const,
        loadPower: 1380, // 6A x 230V
        cableLength: 30,
        phases: "single" as const,
        specialLocation: "none" as const
      },
      {
        id: "5",
        name: "9.5kW Electric Shower",
        loadType: "shower" as const,
        loadPower: 9500,
        cableLength: 12,
        phases: "single" as const,
        specialLocation: "bathroom" as const
      },
      {
        id: "6",
        name: "7.2kW Cooker",
        loadType: "cooker" as const,
        loadPower: 7200,
        cableLength: 15,
        phases: "single" as const,
        specialLocation: "kitchen" as const
      },
      {
        id: "7",
        name: "Utility Room Sockets",
        loadType: "socket" as const,
        loadPower: 4600, // 20A x 230V
        cableLength: 20,
        phases: "single" as const,
        specialLocation: "none" as const
      },
      {
        id: "8",
        name: "Garage Lighting",
        loadType: "lighting" as const,
        loadPower: 1380, // 6A x 230V
        cableLength: 35,
        phases: "single" as const,
        specialLocation: "outdoor" as const
      }
    ],
    additionalPrompt: "OPTIMIZATION TEST: Verify 7-phase speedup with calculation formulas, templates, and cache"
  };

  const runOptimizationTest = async () => {
    setIsRunning(true);
    setTestResults(null);

    const startTime = performance.now();
    console.log('🧪 Starting Optimization Test:', {
      circuits: testInputs.circuits.length,
      types: [...new Set(testInputs.circuits.map(c => c.loadType))]
    });

    const success = await generateDesign(testInputs);
    const endTime = performance.now();
    const duration = ((endTime - startTime) / 1000).toFixed(2);

    setTestResults({
      success,
      duration,
      circuitCount: testInputs.circuits.length,
      circuitTypes: [...new Set(testInputs.circuits.map(c => c.loadType))],
      timestamp: new Date().toISOString()
    });

    setIsRunning(false);
  };

  return (
    <Card className="border-2 border-primary/20 bg-card/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <TestTube2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">7-Phase Optimization Test</CardTitle>
              <CardDescription className="text-sm">
                Verify 4-5x speedup with mixed batch of 8 circuits
              </CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="gap-1">
            <Zap className="h-3 w-3" />
            Test Mode
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Test Configuration */}
        <div className="grid grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
          <div>
            <p className="text-xs text-muted-foreground uppercase font-semibold mb-2">Circuits</p>
            <div className="flex flex-wrap gap-1.5">
              <Badge variant="secondary" className="text-xs">2× Sockets</Badge>
              <Badge variant="secondary" className="text-xs">3× Lighting</Badge>
              <Badge variant="secondary" className="text-xs">1× Shower</Badge>
              <Badge variant="secondary" className="text-xs">1× Cooker</Badge>
              <Badge variant="secondary" className="text-xs">1× Utility</Badge>
            </div>
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase font-semibold mb-2">Expected Optimizations</p>
            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-2">
                <Database className="h-3 w-3 text-green-500" />
                <span>Phase 1: Pre-computed calculations</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-3 w-3 text-blue-500" />
                <span>Phase 2: Circuit-specific RAG</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3 w-3 text-purple-500" />
                <span>Phase 3-4: Templates & Cache</span>
              </div>
            </div>
          </div>
        </div>

        {/* Test Button */}
        <Button 
          onClick={runOptimizationTest} 
          disabled={isRunning}
          className="w-full"
          size="lg"
        >
          {isRunning ? (
            <>
              <Timer className="h-4 w-4 mr-2 animate-spin" />
              Running Test...
            </>
          ) : (
            <>
              <TestTube2 className="h-4 w-4 mr-2" />
              Run Optimization Test
            </>
          )}
        </Button>

        {/* Test Results */}
        {testResults && (
          <Alert className={testResults.success ? "border-green-500/50 bg-green-500/5" : "border-red-500/50 bg-red-500/5"}>
            <AlertDescription>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Test Result:</span>
                  {testResults.success ? (
                    <Badge className="bg-green-500">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Success
                    </Badge>
                  ) : (
                    <Badge variant="destructive">Failed</Badge>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-muted-foreground text-xs">Processing Time</p>
                    <p className="font-mono text-lg font-bold">{testResults.duration}s</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Circuits Designed</p>
                    <p className="font-mono text-lg font-bold">{testResults.circuitCount}</p>
                  </div>
                </div>

                <div className="text-xs text-muted-foreground">
                  <p>Timestamp: {new Date(testResults.timestamp).toLocaleString()}</p>
                  <p className="mt-1">
                    Check the browser console and edge function logs for detailed optimization metrics 
                    (cache hits, template usage, RAG token reduction, etc.)
                  </p>
                </div>

                <div className="pt-3 border-t border-border">
                  <p className="text-xs font-semibold mb-2">Expected Metrics in Logs:</p>
                  <ul className="text-xs space-y-1 text-muted-foreground">
                    <li>• Phase 1: Calculation formulas retrieved (voltage drop, Zs, CPC sizing)</li>
                    <li>• Phase 2: Circuit-specific RAG filtering (reduced regulation count)</li>
                    <li>• Phase 3: Template hit rate (70-85% for standard circuits)</li>
                    <li>• Phase 4: Cache usage (similar circuits reused)</li>
                    <li>• Phase 5: Intelligent batching (groups similar circuits)</li>
                    <li>• Phase 6: AI validation (compliance checks)</li>
                    <li>• Phase 7: TOON optimization (prompt token reduction)</li>
                  </ul>
                </div>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Instructions */}
        <div className="p-3 bg-muted/30 rounded-lg text-xs text-muted-foreground space-y-2">
          <p className="font-semibold text-foreground">What to Check:</p>
          <ol className="list-decimal list-inside space-y-1">
            <li>Open browser DevTools console before running test</li>
            <li>Click "Run Optimization Test" button</li>
            <li>Watch for optimization logs showing phase activations</li>
            <li>Check Supabase edge function logs for detailed metrics</li>
            <li>Compare processing time to baseline (should be 4-5x faster)</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
};
