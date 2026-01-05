// Testing Documentation Component
// Displays EIC schedules and testing guidance

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FileDown, Upload, CheckCircle2, AlertTriangle } from 'lucide-react';
import { EICScheduleOfTests, EICCircuitData } from '@/types/eic-integration';
import { generateTestingGuidance, TestingGuidanceStep } from '@/lib/eic/testingGuidance';
import { downloadEICPDF } from '@/lib/eic/pdfGenerator';
import { toast } from 'sonner';

interface TestingDocumentationProps {
  eicSchedule: EICScheduleOfTests | null;
  onGenerateEIC?: () => void;
}

export const TestingDocumentation = ({
  eicSchedule,
  onGenerateEIC
}: TestingDocumentationProps) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadPDF = async () => {
    if (!eicSchedule) return;
    
    setIsDownloading(true);
    toast.info('Generating EIC PDF...', {
      description: 'Creating schedule of test results'
    });

    try {
      await downloadEICPDF(eicSchedule);
      toast.success('EIC Downloaded!', {
        description: 'Electrical Installation Certificate ready for testing'
      });
    } catch (error) {
      console.error('PDF generation error:', error);
      toast.error('Download Failed', {
        description: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setIsDownloading(false);
    }
  };

  if (!eicSchedule && onGenerateEIC) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Generate Testing Documentation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">
              Create an Electrical Installation Certificate (EIC) Schedule of Test Results
              with pre-calculated expected values for all circuits.
            </p>
            <Button onClick={onGenerateEIC} size="lg">
              Generate EIC Schedule
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!eicSchedule) return null;

  return (
    <div className="space-y-6">
      {/* EIC Schedule Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Electrical Installation Certificate - Schedule of Tests</CardTitle>
            <div className="flex gap-2">
              <Button onClick={handleDownloadPDF} disabled={isDownloading}>
                <FileDown className="mr-2 h-4 w-4" />
                {isDownloading ? 'Generating...' : 'Download PDF'}
              </Button>
              <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Export to App
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Installation Details */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
              <div>
                <p className="text-sm font-medium text-foreground/70">Installation Address</p>
                <p className="font-medium text-foreground">{eicSchedule.installationAddress}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground/70">Designer</p>
                <p className="font-medium text-foreground">{eicSchedule.designerName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground/70">Design Date</p>
                <p className="font-medium text-foreground">
                  {new Date(eicSchedule.designDate).toLocaleDateString('en-GB')}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground/70">Installation ID</p>
                <p className="font-medium text-foreground">{eicSchedule.installationId}</p>
              </div>
            </div>

            {/* Test Results Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-primary text-primary-foreground">
                    <th className="border border-border p-2 text-xs">Cct</th>
                    <th className="border border-border p-2 text-xs">Description</th>
                    <th className="border border-border p-2 text-xs">Type</th>
                    <th className="border border-border p-2 text-xs">Live/CPC</th>
                    <th className="border border-border p-2 text-xs">MCB</th>
                    <th className="border border-border p-2 text-xs">R1+R2</th>
                    <th className="border border-border p-2 text-xs">Insulation</th>
                    <th className="border border-border p-2 text-xs">Zs</th>
                    <th className="border border-border p-2 text-xs">Max Zs</th>
                    <th className="border border-border p-2 text-xs">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {eicSchedule.circuits.map((circuit) => (
                    <tr key={circuit.circuitNumber} className="hover:bg-muted/50">
                      <td className="border border-border p-2 text-center font-medium">
                        {circuit.circuitNumber}
                      </td>
                      <td className="border border-border p-2">{circuit.circuitDescription}</td>
                      <td className="border border-border p-2 text-center">
                        {circuit.phaseType === 'single' ? '1φ' : '3φ'}
                      </td>
                      <td className="border border-border p-2 text-center">
                        {circuit.liveSize}mm² / {circuit.cpcSize}mm²
                      </td>
                      <td className="border border-border p-2 text-center font-mono">
                        {circuit.protectiveDeviceCurve}{circuit.protectiveDeviceRating}
                      </td>
                      <td className="border border-border p-2 text-center font-mono text-sm">
                        {circuit.r1r2}
                      </td>
                      <td className="border border-border p-2 text-center text-sm">
                        {circuit.insulationResistance}
                      </td>
                      <td className="border border-border p-2 text-center font-mono">
                        {circuit.zs}Ω
                      </td>
                      <td className="border border-border p-2 text-center font-mono">
                        {circuit.maxZs}Ω
                      </td>
                      <td className="border border-border p-2 text-center">
                        {parseFloat(circuit.zs || '0') <= parseFloat(circuit.maxZs || '999') ? (
                          <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" />
                        ) : (
                          <AlertTriangle className="h-5 w-5 text-amber-500 mx-auto" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Standards Reference */}
            <div className="text-sm text-foreground/70 p-3 bg-muted rounded">
              <p className="font-medium mb-1 text-foreground">Testing Standards:</p>
              <p>✓ BS 7671:2018+A3:2024 - Part 6: Inspection and Testing</p>
              <p>✓ All expected values pre-calculated for on-site verification</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Testing Guidance */}
      <Card>
        <CardHeader>
          <CardTitle>Testing Guidance - Step-by-Step Procedures</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {eicSchedule.circuits.map((circuit) => {
              const guidance = generateTestingGuidance(circuit);
              return (
                <AccordionItem key={circuit.circuitNumber} value={circuit.circuitNumber}>
                  <AccordionTrigger>
                    <div className="flex items-center gap-3">
                      <span className="font-bold">Circuit {circuit.circuitNumber}:</span>
                      <span>{circuit.circuitDescription}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-6 pt-4">
                      {guidance.map((step, index) => (
                        <TestGuidanceStep key={index} step={step} stepNumber={index + 1} />
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

// Testing Guidance Step Component
interface TestGuidanceStepProps {
  step: TestingGuidanceStep;
  stepNumber: number;
}

const TestGuidanceStep = ({ step, stepNumber }: TestGuidanceStepProps) => {
  return (
    <div className="border-l-4 border-primary pl-4 space-y-3">
      <div>
        <h4 className="font-bold text-lg flex items-center gap-2">
          <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">
            {stepNumber}
          </span>
          {step.test}
        </h4>
        <p className="text-sm text-foreground/70 mt-1">{step.regulation}</p>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">Procedure:</p>
        <div className="bg-muted p-3 rounded whitespace-pre-line text-sm">
          {step.procedure}
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">Acceptance Criteria:</p>
        <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 p-3 rounded text-sm">
          {step.acceptanceCriteria}
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">Equipment Required:</p>
        <ul className="list-disc list-inside text-sm space-y-1">
          {step.equipment.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>

      {step.safetyNotes.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-red-600 dark:text-red-400">Safety Notes:</p>
          <ul className="space-y-1">
            {step.safetyNotes.map((note, i) => (
              <li key={i} className="text-sm text-red-600 dark:text-red-400">
                {note}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
