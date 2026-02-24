/**
 * PATTestingDeclarations — Tab 3: Summary & Declaration
 *
 * PATTestSummary at top, tester declaration, retest schedule,
 * signature sign-off.
 */

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  ChevronDown,
  Shield,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  BarChart3,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import SignatureInput from '@/components/signature/SignatureInput';
import { useIsMobile } from '@/hooks/use-mobile';
import PATTestSummary from './PATTestSummary';

interface PATTestingDeclarationsProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formData: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onUpdate: (field: string, value: any) => void;
}

const PATTestingDeclarations: React.FC<PATTestingDeclarationsProps> = ({ formData, onUpdate }) => {
  const isMobile = useIsMobile();
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    summary: true,
    declaration: true,
    retest: true,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const isComplete = formData.testerName && formData.testerSignature;

  // Calculate next test date based on suggested interval
  const calculateNextTestDate = () => {
    const testDate = formData.testDate || new Date().toISOString().split('T')[0];
    const intervalMonths = parseInt(formData.suggestedRetestInterval) || 12;
    const date = new Date(testDate);
    date.setMonth(date.getMonth() + intervalMonths);
    return date.toISOString().split('T')[0];
  };

  // Auto-update summary totals from appliances
  const appliances = formData.appliances || [];
  const totalTested = appliances.filter(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (a: any) => a.overallResult === 'pass' || a.overallResult === 'fail'
  ).length;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const totalPassed = appliances.filter((a: any) => a.overallResult === 'pass').length;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const totalFailed = appliances.filter((a: any) => a.overallResult === 'fail').length;

  // Sync totals to formData if they changed
  React.useEffect(() => {
    if (
      formData.totalAppliancesTested !== totalTested ||
      formData.totalPassed !== totalPassed ||
      formData.totalFailed !== totalFailed
    ) {
      onUpdate('totalAppliancesTested', totalTested);
      onUpdate('totalPassed', totalPassed);
      onUpdate('totalFailed', totalFailed);
    }
  }, [totalTested, totalPassed, totalFailed]);

  return (
    <div className="space-y-6">
      {/* Test Summary */}
      <Collapsible open={openSections.summary} onOpenChange={() => toggleSection('summary')}>
        <div className={cn(isMobile ? '' : 'eicr-section-card')}>
          <CollapsibleTrigger asChild>
            <div
              className={cn(
                'cursor-pointer transition-colors p-4 touch-manipulation',
                isMobile ? 'bg-card/30 border-y border-border/20' : 'hover:bg-muted/50'
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                    <BarChart3 className="h-5 w-5 text-green-500" />
                  </div>
                  <span className="font-semibold text-lg text-white">Test Summary</span>
                </div>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 text-white transition-transform',
                    openSections.summary && 'rotate-180'
                  )}
                />
              </div>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="p-4">
              <PATTestSummary appliances={appliances} />
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>

      {/* Tester Declaration & Signature */}
      <Collapsible
        open={openSections.declaration}
        onOpenChange={() => toggleSection('declaration')}
      >
        <div className={cn(isMobile ? '' : 'eicr-section-card')}>
          <CollapsibleTrigger asChild>
            <div
              className={cn(
                'cursor-pointer transition-colors p-4 touch-manipulation',
                isMobile ? 'bg-card/30 border-y border-border/20' : 'hover:bg-muted/50'
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                    <Shield className="h-5 w-5 text-purple-500" />
                  </div>
                  <span className="font-semibold text-lg text-white">Tester Declaration</span>
                </div>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 text-white transition-transform',
                    openSections.declaration && 'rotate-180'
                  )}
                />
              </div>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="p-4 space-y-4">
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-3">
                <div className="flex gap-2">
                  <Shield className="h-4 w-4 text-blue-400 mt-0.5 shrink-0" />
                  <p className="text-white text-sm">
                    <strong>Declaration:</strong> I certify that the appliances listed in this
                    report have been inspected and tested in accordance with the IET Code of
                    Practice for In-Service Inspection and Testing of Electrical Equipment, and the
                    results are as recorded.
                  </p>
                </div>
              </div>

              {/* Tester info (read-only if set from Tab 1 profile) */}
              {formData.testerName && (
                <div className="bg-white/[0.06] border border-white/[0.08] rounded-2xl p-3 space-y-1">
                  <p className="text-white text-sm font-medium">{formData.testerName}</p>
                  {formData.testerCompany && (
                    <p className="text-white text-xs">{formData.testerCompany}</p>
                  )}
                  {formData.testerQualifications && (
                    <p className="text-white text-xs">{formData.testerQualifications}</p>
                  )}
                  <p className="text-white text-xs">
                    Date: {formData.testerDate || new Date().toISOString().split('T')[0]}
                  </p>
                </div>
              )}

              {/* Manual entry if no profile was selected */}
              {!formData.testerName && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-white text-sm" htmlFor="testerName">
                      Tester Name *
                    </Label>
                    <Input
                      id="testerName"
                      placeholder="Full name"
                      value={formData.testerName || ''}
                      onChange={(e) => onUpdate('testerName', e.target.value)}
                      className="h-11 text-base touch-manipulation"
                    />
                  </div>
                  <div>
                    <Label className="text-white text-sm" htmlFor="testerDate">
                      Date
                    </Label>
                    <Input
                      id="testerDate"
                      type="date"
                      value={formData.testerDate || new Date().toISOString().split('T')[0]}
                      onChange={(e) => onUpdate('testerDate', e.target.value)}
                      className="h-11 text-base touch-manipulation"
                    />
                  </div>
                </div>
              )}

              <SignatureInput
                label="Tester Signature *"
                value={formData.testerSignature}
                onChange={(sig) => onUpdate('testerSignature', sig)}
                placeholder="Draw or type signature"
                required
              />
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>

      {/* Retest Schedule */}
      <Collapsible open={openSections.retest} onOpenChange={() => toggleSection('retest')}>
        <div className={cn(isMobile ? '' : 'eicr-section-card')}>
          <CollapsibleTrigger asChild>
            <div
              className={cn(
                'cursor-pointer transition-colors p-4 touch-manipulation',
                isMobile ? 'border-b border-border/20' : 'hover:bg-muted/50'
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-blue-500" />
                  </div>
                  <span className="font-semibold text-lg text-white">Retest Schedule</span>
                </div>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 text-white transition-transform',
                    openSections.retest && 'rotate-180'
                  )}
                />
              </div>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="p-4 space-y-4">
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-3">
                <p className="text-white text-sm">
                  <strong>IET CoP Guidance:</strong> Suggested retest intervals depend on equipment
                  type and environment. Construction sites may need 3-monthly tests; office IT
                  equipment may be 48 months.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-white text-sm" htmlFor="suggestedRetestInterval">
                    Suggested Retest Interval
                  </Label>
                  <Select
                    value={formData.suggestedRetestInterval || '12'}
                    onValueChange={(v) => {
                      onUpdate('suggestedRetestInterval', v);
                      const testDate = formData.testDate || new Date().toISOString().split('T')[0];
                      const date = new Date(testDate);
                      date.setMonth(date.getMonth() + parseInt(v));
                      onUpdate('nextTestDue', date.toISOString().split('T')[0]);
                    }}
                  >
                    <SelectTrigger className="h-11 touch-manipulation">
                      <SelectValue placeholder="Select interval" />
                    </SelectTrigger>
                    <SelectContent className="z-[100]">
                      <SelectItem value="3">3 Months (Construction)</SelectItem>
                      <SelectItem value="6">6 Months (Industrial)</SelectItem>
                      <SelectItem value="12">12 Months (General)</SelectItem>
                      <SelectItem value="24">24 Months (Office)</SelectItem>
                      <SelectItem value="48">48 Months (IT Equipment)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-white text-sm" htmlFor="nextTestDue">
                    Next Test Due
                  </Label>
                  <Input
                    id="nextTestDue"
                    type="date"
                    value={formData.nextTestDue || calculateNextTestDate()}
                    onChange={(e) => onUpdate('nextTestDue', e.target.value)}
                    className="h-11 text-base touch-manipulation"
                  />
                </div>
              </div>

              <div>
                <Label className="text-white text-sm" htmlFor="recommendations">
                  Recommendations
                </Label>
                <Textarea
                  id="recommendations"
                  placeholder="Any recommendations for the client..."
                  value={formData.recommendations || ''}
                  onChange={(e) => onUpdate('recommendations', e.target.value)}
                  className="text-base touch-manipulation min-h-[80px]"
                />
              </div>

              <div>
                <Label className="text-white text-sm" htmlFor="additionalNotes">
                  Additional Notes
                </Label>
                <Textarea
                  id="additionalNotes"
                  placeholder="Any additional notes or comments..."
                  value={formData.additionalNotes || ''}
                  onChange={(e) => onUpdate('additionalNotes', e.target.value)}
                  className="text-base touch-manipulation min-h-[100px]"
                />
              </div>
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>

      {/* Final Status */}
      {isComplete ? (
        <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-4 flex items-center gap-3 mx-4 sm:mx-0">
          <CheckCircle2 className="h-5 w-5 text-green-400 shrink-0" />
          <p className="text-white text-sm">
            <strong>Certificate ready for generation.</strong> All required fields have been
            completed.
          </p>
        </div>
      ) : (
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 flex items-center gap-3 mx-4 sm:mx-0">
          <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0" />
          <p className="text-white text-sm">
            <strong>Incomplete declaration.</strong> Tester name and signature are required before
            the certificate can be generated.
          </p>
        </div>
      )}
    </div>
  );
};

export default PATTestingDeclarations;
