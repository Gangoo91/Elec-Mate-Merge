/**
 * ReviewStep - Final Certificate Review for EIC
 *
 * Summary view with validation status and completion action
 */

import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
  CheckCircle,
  AlertCircle,
  XCircle,
  User,
  MapPin,
  Zap,
  ClipboardCheck,
  PenTool,
  FileCheck,
  ChevronRight,
  Download,
  Mail,
  Printer,
  AlertTriangle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useHaptic } from '@/hooks/useHaptic';

interface ReviewStepProps {
  data: any;
  onChange: (updates: any) => void;
  onGoToStep: (step: number) => void;
  onComplete: () => void;
  isMobile?: boolean;
}

// Section summary item
interface SectionSummary {
  id: string;
  title: string;
  icon: React.ElementType;
  stepIndex: number;
  status: 'complete' | 'partial' | 'empty';
  items: { label: string; value: string; status?: 'ok' | 'warning' | 'error' }[];
}

export const ReviewStep: React.FC<ReviewStepProps> = ({
  data,
  onChange,
  onGoToStep,
  onComplete,
  isMobile,
}) => {
  const haptic = useHaptic();

  // Calculate section summaries
  const sections = useMemo((): SectionSummary[] => {
    // Client section
    const clientStatus = data.clientName && data.installationAddress
      ? 'complete'
      : data.clientName || data.installationAddress
        ? 'partial'
        : 'empty';

    // Installation section
    const installationStatus = data.phases && data.earthingArrangement
      ? 'complete'
      : data.phases || data.earthingArrangement
        ? 'partial'
        : 'empty';

    // Circuits section
    const circuitCount = data.circuits?.length || 0;
    const testedCircuits = data.circuits?.filter((c: any) =>
      c.r1r2 && c.zs && c.insulationResistance
    ).length || 0;
    const circuitsStatus = circuitCount > 0 && testedCircuits === circuitCount
      ? 'complete'
      : circuitCount > 0
        ? 'partial'
        : 'empty';

    // Inspections section
    const inspectionItems = Object.values(data.inspectionItems || {});
    const completedInspections = inspectionItems.filter((i: any) => i.result).length;
    const totalInspections = 35; // Approximate total
    const inspectionsStatus = completedInspections >= totalInspections * 0.9
      ? 'complete'
      : completedInspections > 0
        ? 'partial'
        : 'empty';

    // Declarations section
    const declarationsComplete = data.designerSignature && data.constructorSignature && data.inspectorSignature;
    const declarationsPartial = data.designerSignature || data.constructorSignature || data.inspectorSignature;
    const declarationsStatus = declarationsComplete ? 'complete' : declarationsPartial ? 'partial' : 'empty';

    return [
      {
        id: 'client',
        title: 'Client & Property',
        icon: User,
        stepIndex: 0,
        status: clientStatus,
        items: [
          { label: 'Client', value: data.clientName || 'Not entered', status: data.clientName ? 'ok' : 'error' },
          { label: 'Address', value: data.installationAddress ? 'Entered' : 'Not entered', status: data.installationAddress ? 'ok' : 'error' },
          { label: 'Postcode', value: data.installationPostcode || 'Not entered', status: data.installationPostcode ? 'ok' : 'warning' },
        ],
      },
      {
        id: 'installation',
        title: 'Installation Details',
        icon: Zap,
        stepIndex: 1,
        status: installationStatus,
        items: [
          { label: 'Phases', value: data.phases === 'single' ? 'Single Phase' : data.phases === 'three' ? 'Three Phase' : 'Not selected', status: data.phases ? 'ok' : 'error' },
          { label: 'Earthing', value: data.earthingArrangement || 'Not selected', status: data.earthingArrangement ? 'ok' : 'error' },
          { label: 'Ze', value: data.externalLoopImpedance ? `${data.externalLoopImpedance}Ω` : 'Not entered', status: data.externalLoopImpedance ? 'ok' : 'warning' },
        ],
      },
      {
        id: 'circuits',
        title: 'Circuits & Testing',
        icon: ClipboardCheck,
        stepIndex: 3,
        status: circuitsStatus,
        items: [
          { label: 'Total Circuits', value: circuitCount.toString(), status: circuitCount > 0 ? 'ok' : 'error' },
          { label: 'Tested', value: `${testedCircuits}/${circuitCount}`, status: testedCircuits === circuitCount && circuitCount > 0 ? 'ok' : 'warning' },
        ],
      },
      {
        id: 'inspections',
        title: 'Inspections',
        icon: FileCheck,
        stepIndex: 4,
        status: inspectionsStatus,
        items: [
          { label: 'Completed', value: `${completedInspections}/${totalInspections}`, status: completedInspections >= totalInspections * 0.9 ? 'ok' : 'warning' },
        ],
      },
      {
        id: 'declarations',
        title: 'Declarations',
        icon: PenTool,
        stepIndex: 5,
        status: declarationsStatus,
        items: [
          { label: 'Designer', value: data.designerName || 'Not signed', status: data.designerSignature ? 'ok' : 'error' },
          { label: 'Constructor', value: data.constructorName || 'Not signed', status: data.constructorSignature ? 'ok' : 'error' },
          { label: 'Inspector', value: data.inspectorName || 'Not signed', status: data.inspectorSignature ? 'ok' : 'error' },
        ],
      },
    ];
  }, [data]);

  // Overall completion
  const completeCount = sections.filter((s) => s.status === 'complete').length;
  const isReadyToComplete = completeCount === sections.length;
  const completionPercentage = Math.round((completeCount / sections.length) * 100);

  // Handle section click
  const handleSectionClick = (stepIndex: number) => {
    haptic.light();
    onGoToStep(stepIndex);
  };

  // Handle complete
  const handleComplete = () => {
    haptic.success();
    onComplete();
  };

  const statusIcon = {
    complete: <CheckCircle className="h-5 w-5 text-green-500" />,
    partial: <AlertCircle className="h-5 w-5 text-amber-500" />,
    empty: <XCircle className="h-5 w-5 text-red-500" />,
  };

  const itemStatusIcon = {
    ok: <CheckCircle className="h-3.5 w-3.5 text-green-500" />,
    warning: <AlertCircle className="h-3.5 w-3.5 text-amber-500" />,
    error: <XCircle className="h-3.5 w-3.5 text-red-500" />,
  };

  return (
    <div className="space-y-6">
      {/* Completion Progress */}
      <Card className={cn(
        'border-2 transition-all',
        isReadyToComplete ? 'border-green-500/50 bg-green-500/5' : 'border-border'
      )}>
        <CardContent className="py-6">
          <div className="text-center space-y-3">
            {isReadyToComplete ? (
              <CheckCircle className="h-12 w-12 mx-auto text-green-500" />
            ) : (
              <AlertTriangle className="h-12 w-12 mx-auto text-amber-500" />
            )}
            <div>
              <h3 className="text-xl font-bold">
                {isReadyToComplete ? 'Ready to Complete!' : 'Certificate Incomplete'}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {isReadyToComplete
                  ? 'All required sections have been completed'
                  : `${completeCount} of ${sections.length} sections complete`}
              </p>
            </div>
            <Progress value={completionPercentage} className="h-2 max-w-xs mx-auto" />
            <p className="text-sm font-medium">{completionPercentage}% Complete</p>
          </div>
        </CardContent>
      </Card>

      {/* Section Summaries */}
      <div className="space-y-3">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <Card
              key={section.id}
              className={cn(
                'cursor-pointer transition-all active:scale-[0.99] touch-manipulation',
                section.status === 'complete' && 'border-green-500/30',
                section.status === 'partial' && 'border-amber-500/30',
                section.status === 'empty' && 'border-red-500/30'
              )}
              onClick={() => handleSectionClick(section.stepIndex)}
            >
              <CardContent className="py-4">
                <div className="flex items-start gap-3">
                  <div className={cn(
                    'p-2 rounded-lg shrink-0',
                    section.status === 'complete' && 'bg-green-500/10',
                    section.status === 'partial' && 'bg-amber-500/10',
                    section.status === 'empty' && 'bg-red-500/10'
                  )}>
                    <Icon className={cn(
                      'h-5 w-5',
                      section.status === 'complete' && 'text-green-500',
                      section.status === 'partial' && 'text-amber-500',
                      section.status === 'empty' && 'text-red-500'
                    )} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">{section.title}</h4>
                      {statusIcon[section.status]}
                    </div>
                    <div className="mt-2 space-y-1">
                      {section.items.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">{item.label}</span>
                          <div className="flex items-center gap-1.5">
                            <span className="truncate max-w-[150px]">{item.value}</span>
                            {item.status && itemStatusIcon[item.status]}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Certificate Number */}
      <Card className="border-border/50">
        <CardContent className="py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Certificate Number</p>
              <p className="text-xs text-muted-foreground">Auto-generated on completion</p>
            </div>
            <Badge variant="outline" className="font-mono">
              {data.certificateNumber || 'EIC-XXXX-XXXX'}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          onClick={handleComplete}
          disabled={!isReadyToComplete}
          className={cn(
            'w-full h-14 text-lg gap-2',
            isReadyToComplete
              ? 'bg-green-500 hover:bg-green-600 text-white'
              : 'bg-muted text-muted-foreground'
          )}
        >
          <FileCheck className="h-5 w-5" />
          {isReadyToComplete ? 'Complete Certificate' : 'Complete All Sections First'}
        </Button>

        {isReadyToComplete && (
          <div className="grid grid-cols-3 gap-2">
            <Button variant="outline" className="h-12 flex-col gap-1" disabled>
              <Download className="h-4 w-4" />
              <span className="text-xs">PDF</span>
            </Button>
            <Button variant="outline" className="h-12 flex-col gap-1" disabled>
              <Mail className="h-4 w-4" />
              <span className="text-xs">Email</span>
            </Button>
            <Button variant="outline" className="h-12 flex-col gap-1" disabled>
              <Printer className="h-4 w-4" />
              <span className="text-xs">Print</span>
            </Button>
          </div>
        )}
      </div>

      {/* BS7671 Notice */}
      <div className="text-center text-xs text-muted-foreground">
        <p>Electrical Installation Certificate (EIC)</p>
        <p>Complies with BS 7671:2018+A2:2022</p>
      </div>
    </div>
  );
};

export default ReviewStep;
