import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Wrench, Loader2, FileDown } from "lucide-react";
import { useSimpleAgent } from '@/hooks/useSimpleAgent';
import { transformMaintenanceOutputToPDF } from '@/utils/maintenance-transformer';
import type { MaintenanceAgentOutput } from '@/utils/maintenance-transformer';
import ReactMarkdown from 'react-markdown';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

const MaintenanceInterface = () => {
  const [equipmentType, setEquipmentType] = useState('');
  const [installationAge, setInstallationAge] = useState('');
  const [maintenanceType, setMaintenanceType] = useState<'preventive' | 'reactive' | 'periodic_inspection'>('preventive');
  const [location, setLocation] = useState('');
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<MaintenanceAgentOutput | null>(null);
  
  const { callAgent, isLoading, progress } = useSimpleAgent();

  const examplePrompts = [
    "Annual EICR procedure for 10-year-old domestic consumer unit",
    "Diagnose fault: shower tripping RCD intermittently",
    "EV charger preventive maintenance schedule",
    "Periodic inspection checklist for commercial distribution board"
  ];

  const handleSubmit = async () => {
    if (!query.trim()) return;

    const response = await callAgent('maintenance', {
      query,
      equipmentType,
      installationAge,
      maintenanceType,
      location
    });

    if (response?.success && response.result) {
      setResult(response.result as MaintenanceAgentOutput);
    }
  };

  const handleDownloadPDF = () => {
    if (!result) return;
    
    const pdfData = transformMaintenanceOutputToPDF(result, {
      equipmentType,
      location,
      installationAge
    });
    
    // TODO: Integrate with professional PDF generator
    console.log('PDF Data ready:', pdfData);
    alert('PDF generation will be implemented in Phase 8');
  };

  return (
    <div className="space-y-6">
      {/* Input Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wrench className="h-5 w-5 text-cyan-400" />
            Maintenance Request
          </CardTitle>
          <CardDescription>
            Describe the maintenance work required and get comprehensive instructions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="equipmentType">Equipment Type</Label>
              <Select value={equipmentType} onValueChange={setEquipmentType}>
                <SelectTrigger id="equipmentType">
                  <SelectValue placeholder="Select equipment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="consumer_unit">Consumer Unit</SelectItem>
                  <SelectItem value="shower">Electric Shower</SelectItem>
                  <SelectItem value="ev_charger">EV Charger</SelectItem>
                  <SelectItem value="distribution_board">Distribution Board</SelectItem>
                  <SelectItem value="socket_circuit">Socket Circuit</SelectItem>
                  <SelectItem value="lighting_circuit">Lighting Circuit</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="maintenanceType">Maintenance Type</Label>
              <Select value={maintenanceType} onValueChange={(v) => setMaintenanceType(v as any)}>
                <SelectTrigger id="maintenanceType">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="preventive">Preventive Maintenance</SelectItem>
                  <SelectItem value="reactive">Reactive (Fault Diagnosis)</SelectItem>
                  <SelectItem value="periodic_inspection">Periodic Inspection (EICR)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="installationAge">Installation Age</Label>
              <Input
                id="installationAge"
                placeholder="e.g., 10 years"
                value={installationAge}
                onChange={(e) => setInstallationAge(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="e.g., Domestic kitchen"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="query">Maintenance Query</Label>
            <Textarea
              id="query"
              placeholder="Describe the maintenance work required..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              rows={4}
              className="resize-none"
            />
          </div>

          {/* Example Prompts */}
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Example prompts:</Label>
            <div className="flex flex-wrap gap-2">
              {examplePrompts.map((prompt, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  size="sm"
                  onClick={() => setQuery(prompt)}
                  className="text-xs h-auto py-1 px-2"
                >
                  {prompt}
                </Button>
              ))}
            </div>
          </div>

          <Button 
            onClick={handleSubmit} 
            disabled={isLoading || !query.trim()}
            className="w-full"
            size="lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {progress?.message || 'Processing...'}
              </>
            ) : (
              <>
                <Wrench className="mr-2 h-4 w-4" />
                Generate Maintenance Instructions
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Results Display */}
      {result && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Maintenance Instructions</CardTitle>
                <CardDescription>
                  {result.equipmentSummary.equipmentType} - {result.equipmentSummary.maintenanceType}
                </CardDescription>
              </div>
              <Button onClick={handleDownloadPDF} variant="outline" className="gap-2">
                <FileDown className="h-4 w-4" />
                Download PDF
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Overview */}
            <div>
              <h3 className="font-semibold text-lg mb-2">Overview</h3>
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <ReactMarkdown>{result.response}</ReactMarkdown>
              </div>
            </div>

            {/* Collapsible Sections */}
            <Collapsible>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-muted rounded-lg hover:bg-muted/80">
                <h3 className="font-semibold">Pre-Work Requirements</h3>
                <ChevronDown className="h-4 w-4" />
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 p-4 border rounded-lg">
                <ul className="space-y-2">
                  {result.preWorkRequirements.map((req, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span className="font-semibold min-w-24">{req.category}:</span>
                      <span>{req.requirement} {req.mandatory && <span className="text-red-400">(Mandatory)</span>}</span>
                    </li>
                  ))}
                </ul>
              </CollapsibleContent>
            </Collapsible>

            <Collapsible>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-muted rounded-lg hover:bg-muted/80">
                <h3 className="font-semibold">Visual Inspection</h3>
                <ChevronDown className="h-4 w-4" />
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 p-4 border rounded-lg space-y-3">
                {result.visualInspection.map((step) => (
                  <div key={step.stepNumber} className="border-l-2 border-cyan-400 pl-4">
                    <div className="font-semibold">Step {step.stepNumber}: {step.checkpoint}</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      ✓ {step.acceptanceCriteria}
                    </div>
                  </div>
                ))}
              </CollapsibleContent>
            </Collapsible>

            <Collapsible>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-muted rounded-lg hover:bg-muted/80">
                <h3 className="font-semibold">Testing Procedures</h3>
                <ChevronDown className="h-4 w-4" />
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 p-4 border rounded-lg space-y-4">
                {result.testingProcedures.map((test, idx) => (
                  <div key={idx} className="border-l-2 border-blue-400 pl-4">
                    <div className="font-semibold">{test.testName} ({test.testType})</div>
                    <div className="text-sm space-y-1 mt-2">
                      {test.procedure.map((step, sIdx) => (
                        <div key={sIdx}>• {step}</div>
                      ))}
                    </div>
                    <div className="mt-2 text-sm font-medium text-green-400">
                      Expected: {test.expectedResult.value} - {test.expectedResult.passFailCriteria}
                    </div>
                  </div>
                ))}
              </CollapsibleContent>
            </Collapsible>

            {result.commonFaults && result.commonFaults.length > 0 && (
              <Collapsible>
                <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-muted rounded-lg hover:bg-muted/80">
                  <h3 className="font-semibold">Common Faults</h3>
                  <ChevronDown className="h-4 w-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-2 p-4 border rounded-lg space-y-4">
                  {result.commonFaults.map((fault, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="font-semibold text-orange-400">⚠ {fault.symptom}</div>
                      <div className="text-sm">
                        <div className="font-medium">Likely causes:</div>
                        <ul className="list-disc pl-5">
                          {fault.likelyCauses.map((cause, cIdx) => (
                            <li key={cIdx}>{cause}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="text-sm">
                        <div className="font-medium">Remedial action:</div>
                        <div>{fault.remedialAction}</div>
                      </div>
                    </div>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MaintenanceInterface;
