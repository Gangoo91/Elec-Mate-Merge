/**
 * Maintenance Knowledge Enrichment Test Interface
 * Tests equipment category extraction and GPT enrichment fixes
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TestResult {
  phase: string;
  status: 'success' | 'error' | 'warning';
  message: string;
  data?: any;
  timestamp: string;
}

export function MaintenanceEnrichmentTester() {
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<TestResult[]>([]);
  const { toast } = useToast();

  const addResult = (phase: string, status: TestResult['status'], message: string, data?: any) => {
    setResults(prev => [...prev, {
      phase,
      status,
      message,
      data,
      timestamp: new Date().toISOString()
    }]);
  };

  const runTests = async () => {
    setIsRunning(true);
    setResults([]);
    
    try {
      // Phase 1: Parse sample maintenance knowledge
      addResult('Phase 1', 'warning', 'Starting maintenance knowledge parsing...');
      
      const sampleDocument = `
# Consumer Unit Maintenance and Testing

## Equipment Specifications
- Equipment Type: Consumer Unit
- Voltage Rating: 230V AC
- Current Rating: Up to 100A
- Protection: MCBs and RCDs

## Testing Procedures
1. Visual inspection of all connections
2. Tightness test on all terminals (2.5 Nm torque)
3. RCD testing at rated current
4. Insulation resistance testing between live conductors
5. Earth fault loop impedance testing

## Required Tools
- Insulation resistance tester (500V DC)
- RCD tester
- Torque screwdriver (adjustable)
- Multimeter
- Earth fault loop impedance tester

## Materials and Components
- Cable ties
- Ferrules for stranded conductors
- Terminal blocks
- Labelling tape
- Circuit directory labels

## Safety Requirements
- Isolate supply before testing
- Verify isolation with voltage indicator
- PPE: Insulated gloves, safety glasses
- Ensure proper earthing before re-energizing

## BS 7671 References
- Regulation 643.11: RCD testing
- Regulation 612.3.2: Insulation resistance
- Regulation 612.6: Earth fault loop impedance
`;

      const parseResponse = await supabase.functions.invoke('parse-maintenance-knowledge', {
        body: { fileContent: sampleDocument }
      });

      if (parseResponse.error) {
        addResult('Phase 1', 'error', `Parse failed: ${parseResponse.error.message}`);
        throw parseResponse.error;
      }

      addResult('Phase 1', 'success', `Parsed ${parseResponse.data?.chunks || 0} chunks`, parseResponse.data);

      // Phase 2: Trigger enrichment
      addResult('Phase 2', 'warning', 'Starting practical work enrichment...');
      
      const enrichResponse = await supabase.functions.invoke('enrich-practical-work', {
        body: { limit: 50 }
      });

      if (enrichResponse.error) {
        addResult('Phase 2', 'error', `Enrichment failed: ${enrichResponse.error.message}`);
        throw enrichResponse.error;
      }

      addResult('Phase 2', 'success', `Enriched ${enrichResponse.data?.processed || 0} records`, enrichResponse.data);

      // Phase 3: Validation queries
      addResult('Phase 3', 'warning', 'Running validation queries...');

      // Check equipment categories
      const { data: categoryData, error: categoryError } = await supabase
        .from('practical_work_intelligence')
        .select('equipment_category')
        .not('equipment_category', 'is', null)
        .order('created_at', { ascending: false })
        .limit(50);

      if (categoryError) {
        addResult('Phase 3', 'error', `Category query failed: ${categoryError.message}`);
      } else {
        const categories = categoryData?.map(r => r.equipment_category) || [];
        const uniqueCategories = [...new Set(categories)];
        const hasGarbage = categories.some(cat => 
          cat?.includes('ombined') || cat?.includes('Mobile') || cat?.includes('Degrees')
        );
        
        addResult('Phase 3', hasGarbage ? 'error' : 'success', 
          `Equipment categories: ${uniqueCategories.join(', ')}`,
          { categories: uniqueCategories, hasGarbage }
        );
      }

      // Check facet arrays
      const { data: facetData, error: facetError } = await supabase
        .from('practical_work_intelligence')
        .select('equipment_category, tools_required, materials_needed, test_procedures, safety_requirements')
        .order('created_at', { ascending: false })
        .limit(10);

      if (facetError) {
        addResult('Phase 3', 'error', `Facet query failed: ${facetError.message}`);
      } else {
        const avgTools = facetData?.reduce((sum, r) => sum + (r.tools_required?.length || 0), 0) / (facetData?.length || 1);
        const avgMaterials = facetData?.reduce((sum, r) => sum + (r.materials_needed?.length || 0), 0) / (facetData?.length || 1);
        const avgTests = facetData?.reduce((sum, r) => sum + (r.test_procedures?.length || 0), 0) / (facetData?.length || 1);
        const hasSafety = facetData?.every(r => r.safety_requirements && Object.keys(r.safety_requirements).length > 0);

        addResult('Phase 3', (avgTools > 3 && avgMaterials > 3 && avgTests > 2) ? 'success' : 'warning',
          `Facet arrays: Tools=${avgTools.toFixed(1)}, Materials=${avgMaterials.toFixed(1)}, Tests=${avgTests.toFixed(1)}, Safety=${hasSafety}`,
          { avgTools, avgMaterials, avgTests, hasSafety, sampleData: facetData }
        );
      }

      toast({
        title: "Test Complete",
        description: "Maintenance enrichment test completed successfully"
      });

    } catch (error) {
      console.error('Test failed:', error);
      toast({
        title: "Test Failed",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive"
      });
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Maintenance Knowledge Enrichment Test</CardTitle>
        <CardDescription>
          Verify equipment category extraction and GPT enrichment fixes
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          onClick={runTests} 
          disabled={isRunning}
          className="w-full"
        >
          {isRunning ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Running Tests...
            </>
          ) : (
            'Run Enrichment Test'
          )}
        </Button>

        {results.length > 0 && (
          <ScrollArea className="h-[500px] w-full rounded-md border p-4">
            <div className="space-y-3">
              {results.map((result, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  {result.status === 'success' && <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />}
                  {result.status === 'error' && <XCircle className="h-5 w-5 text-destructive mt-0.5 shrink-0" />}
                  {result.status === 'warning' && <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 shrink-0" />}
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="font-semibold text-sm">{result.phase}</span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(result.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-sm text-foreground/90">{result.message}</p>
                    
                    {result.data && (
                      <details className="mt-2">
                        <summary className="text-xs text-muted-foreground cursor-pointer hover:text-foreground">
                          View Data
                        </summary>
                        <pre className="mt-2 text-xs bg-background p-2 rounded overflow-x-auto">
                          {JSON.stringify(result.data, null, 2)}
                        </pre>
                      </details>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
