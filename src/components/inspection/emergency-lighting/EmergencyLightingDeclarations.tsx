import React, { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
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
  User,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  Clock,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import SignatureInput from '@/components/signature/SignatureInput';
import { useInspectorProfiles } from '@/hooks/useInspectorProfiles';
import { useToast } from '@/hooks/use-toast';
import LoadTesterButton from './LoadTesterButton';
import { OverdueBadge } from './ValidationBadge';
import { useEmergencyLightingSmartForm } from '@/hooks/inspection/useEmergencyLightingSmartForm';

interface EmergencyLightingDeclarationsProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
}

const EmergencyLightingDeclarations: React.FC<EmergencyLightingDeclarationsProps> = ({
  formData,
  onUpdate,
}) => {
  const isMobile = useIsMobile();
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    tester: true,
    service: true,
    result: true,
  });

  const { getDefaultProfile } = useInspectorProfiles();
  const { toast } = useToast();
  const { calculateTestDates, formatDate } = useEmergencyLightingSmartForm();

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Handle loading tester details from the button
  const handleLoadTesterDetails = (details: {
    testerName: string;
    testerCompany: string;
    testerQualifications: string;
    testerSignature: string;
    testerDate: string;
  }) => {
    onUpdate('testerName', details.testerName);
    onUpdate('testerCompany', details.testerCompany);
    onUpdate('testerQualifications', details.testerQualifications);
    onUpdate('testerDate', details.testerDate);
    if (details.testerSignature) {
      onUpdate('testerSignature', details.testerSignature);
    }
  };

  const loadProfileToTester = () => {
    const profile = getDefaultProfile();
    if (!profile) return;

    const today = new Date().toISOString().split('T')[0];
    const qualifications = Array.isArray(profile.qualifications)
      ? profile.qualifications.join(', ')
      : '';

    onUpdate('testerName', profile.name);
    onUpdate('testerCompany', profile.companyName);
    onUpdate('testerQualifications', qualifications);
    onUpdate('testerDate', today);
    if (profile.signatureData) {
      onUpdate('testerSignature', profile.signatureData);
    }

    toast({
      title: 'Profile Loaded',
      description: 'Your saved profile has been applied.',
    });
  };

  const isComplete = formData.testerName && formData.testerSignature;

  // Calculate test dates using the smart form hook
  const testDates = useMemo(() => {
    return calculateTestDates(
      formData.monthlyFunctionalTest?.date || formData.testDate,
      formData.annualDurationTest?.date || formData.testDate
    );
  }, [formData.testDate, formData.monthlyFunctionalTest?.date, formData.annualDurationTest?.date, calculateTestDates]);

  // Calculate next test dates
  const calculateNextMonthly = () => {
    const testDate = formData.testDate || new Date().toISOString().split('T')[0];
    const date = new Date(testDate);
    date.setMonth(date.getMonth() + 1);
    return date.toISOString().split('T')[0];
  };

  const calculateNextAnnual = () => {
    const testDate = formData.testDate || new Date().toISOString().split('T')[0];
    const date = new Date(testDate);
    date.setFullYear(date.getFullYear() + 1);
    return date.toISOString().split('T')[0];
  };

  return (
    <div className={cn(isMobile ? "space-y-0" : "space-y-6")}>
      {/* Tester Declaration */}
      <div className={cn(isMobile ? "" : "eicr-section-card")}>
        <Collapsible open={openSections.tester} onOpenChange={() => toggleSection('tester')}>
          <CollapsibleTrigger className="w-full">
            {isMobile ? (
              <div className="flex items-center gap-3 py-4 px-4 bg-card/30 border-y border-border/20">
                <div className="h-10 w-10 rounded-xl bg-purple-500/20 flex items-center justify-center shrink-0">
                  <User className="h-5 w-5 text-purple-400" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <h3 className="font-semibold text-foreground">Tester Declaration</h3>
                  <span className="text-xs text-muted-foreground">Name, quals & signature</span>
                </div>
                <ChevronDown className={cn(
                  "h-5 w-5 text-muted-foreground transition-transform shrink-0",
                  openSections.tester && "rotate-180"
                )} />
              </div>
            ) : (
              <div className="flex items-center justify-between py-4 px-4 cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-500/15 flex items-center justify-center">
                    <User className="h-4 w-4 text-purple-400" />
                  </div>
                  <span className="text-white font-semibold">Tester Declaration</span>
                </div>
                <ChevronDown className={cn("h-5 w-5 text-white/40 transition-transform", openSections.tester && "rotate-180")} />
              </div>
            )}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className={cn(
              "space-y-4",
              isMobile ? "px-4 py-4" : "px-4 pb-4"
            )}>
              {/* Load Tester Details Button */}
              <LoadTesterButton
                onLoad={handleLoadTesterDetails}
                className="h-11 border-white/30"
              />

              <Alert className="border-amber-500/30 bg-amber-500/10">
                <Shield className="h-4 w-4 text-amber-500" />
                <AlertDescription className="text-amber-200 text-sm">
                  <strong>Declaration:</strong> I certify that the emergency lighting system has been
                  inspected and tested in accordance with BS 5266, and the results are as recorded in this certificate.
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="testerName">Tester Name *</Label>
                  <Input
                    id="testerName"
                    placeholder="Full name"
                    value={formData.testerName || ''}
                    onChange={(e) => onUpdate('testerName', e.target.value)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="testerCompany">Company</Label>
                  <Input
                    id="testerCompany"
                    placeholder="Company name"
                    value={formData.testerCompany || ''}
                    onChange={(e) => onUpdate('testerCompany', e.target.value)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="testerQualifications">Qualifications</Label>
                  <Input
                    id="testerQualifications"
                    placeholder="e.g., C&G 2391, NICEIC Approved"
                    value={formData.testerQualifications || ''}
                    onChange={(e) => onUpdate('testerQualifications', e.target.value)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="testerDate">Date</Label>
                  <Input
                    id="testerDate"
                    type="date"
                    value={formData.testerDate || new Date().toISOString().split('T')[0]}
                    onChange={(e) => onUpdate('testerDate', e.target.value)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
              </div>

              <SignatureInput
                label="Tester Signature *"
                value={formData.testerSignature}
                onChange={(sig) => onUpdate('testerSignature', sig)}
                placeholder="Draw or type signature"
                required
              />
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Service Schedule */}
      <div className={cn(isMobile ? "" : "eicr-section-card")}>
        <Collapsible open={openSections.service} onOpenChange={() => toggleSection('service')}>
          <CollapsibleTrigger className="w-full">
            {isMobile ? (
              <div className="flex items-center gap-3 py-4 px-4 bg-card/30 border-b border-border/20">
                <div className="h-10 w-10 rounded-xl bg-blue-500/20 flex items-center justify-center shrink-0">
                  <Calendar className="h-5 w-5 text-blue-400" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <h3 className="font-semibold text-foreground">Service Schedule</h3>
                  <span className="text-xs text-muted-foreground">Next test dates</span>
                </div>
                <ChevronDown className={cn(
                  "h-5 w-5 text-muted-foreground transition-transform shrink-0",
                  openSections.service && "rotate-180"
                )} />
              </div>
            ) : (
              <div className="flex items-center justify-between py-4 px-4 cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/15 flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-blue-400" />
                  </div>
                  <span className="text-white font-semibold">Service Schedule</span>
                </div>
                <ChevronDown className={cn("h-5 w-5 text-white/40 transition-transform", openSections.service && "rotate-180")} />
              </div>
            )}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className={cn(
              "space-y-4",
              isMobile ? "px-4 py-4" : "px-4 pb-4"
            )}>
              <div className="bg-muted/30 rounded-lg p-4 space-y-2 text-sm">
                <p><strong>BS 5266 Test Schedule:</strong></p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Daily - visual inspection (where practical)</li>
                  <li>Monthly - brief functional test (flick test)</li>
                  <li>Annually - full rated duration test</li>
                  <li>3-yearly - full inspection and test by competent person</li>
                </ul>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="nextMonthlyTestDue">Next Monthly Test Due</Label>
                    {testDates.monthlyOverdue && (
                      <OverdueBadge daysOverdue={Math.abs(testDates.daysUntilMonthly)} testType="monthly" />
                    )}
                  </div>
                  <Input
                    id="nextMonthlyTestDue"
                    type="date"
                    value={formData.nextMonthlyTestDue || calculateNextMonthly()}
                    onChange={(e) => onUpdate('nextMonthlyTestDue', e.target.value)}
                    className={cn(
                      "h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow",
                      testDates.monthlyOverdue && "border-red-500/50"
                    )}
                  />
                  {!testDates.monthlyOverdue && testDates.daysUntilMonthly > 0 && (
                    <p className="text-xs text-muted-foreground">
                      {testDates.daysUntilMonthly} days until due
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="nextAnnualTestDue">Next Annual Test Due</Label>
                    {testDates.annualOverdue && (
                      <OverdueBadge daysOverdue={Math.abs(testDates.daysUntilAnnual)} testType="annual" />
                    )}
                  </div>
                  <Input
                    id="nextAnnualTestDue"
                    type="date"
                    value={formData.nextAnnualTestDue || calculateNextAnnual()}
                    onChange={(e) => onUpdate('nextAnnualTestDue', e.target.value)}
                    className={cn(
                      "h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow",
                      testDates.annualOverdue && "border-red-500/50"
                    )}
                  />
                  {!testDates.annualOverdue && testDates.daysUntilAnnual > 0 && (
                    <p className="text-xs text-muted-foreground">
                      {testDates.daysUntilAnnual} days until due
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="recommendations">Recommendations</Label>
                <Textarea
                  id="recommendations"
                  placeholder="Any recommendations for the client..."
                  value={formData.recommendations || ''}
                  onChange={(e) => onUpdate('recommendations', e.target.value)}
                  className="text-base touch-manipulation min-h-[80px] border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Overall Result */}
      <div className={cn(isMobile ? "" : "eicr-section-card")}>
        <Collapsible open={openSections.result} onOpenChange={() => toggleSection('result')}>
          <CollapsibleTrigger className="w-full">
            {isMobile ? (
              <div className="flex items-center gap-3 py-4 px-4 bg-card/30 border-b border-border/20">
                <div className="h-10 w-10 rounded-xl bg-green-500/20 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="h-5 w-5 text-green-400" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <h3 className="font-semibold text-foreground">Overall Result</h3>
                  <span className="text-xs text-muted-foreground">Satisfactory/Unsatisfactory</span>
                </div>
                <ChevronDown className={cn(
                  "h-5 w-5 text-muted-foreground transition-transform shrink-0",
                  openSections.result && "rotate-180"
                )} />
              </div>
            ) : (
              <div className="flex items-center justify-between py-4 px-4 cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-green-500/15 flex items-center justify-center">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                  </div>
                  <span className="text-white font-semibold">Overall Result</span>
                </div>
                <ChevronDown className={cn("h-5 w-5 text-white/40 transition-transform", openSections.result && "rotate-180")} />
              </div>
            )}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className={cn(
              "space-y-4",
              isMobile ? "px-4 py-4" : "px-4 pb-4"
            )}>
              <div className="space-y-2">
                <Label>Overall Result</Label>
                <Select
                  value={formData.overallResult || ''}
                  onValueChange={(v) => onUpdate('overallResult', v)}
                >
                  <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-white/30 focus:border-elec-yellow focus:ring-elec-yellow">
                    <SelectValue placeholder="Select result" />
                  </SelectTrigger>
                  <SelectContent className="z-[100] bg-background border-border text-foreground">
                    <SelectItem value="satisfactory">
                      <span className="flex items-center gap-2 text-green-500">
                        <CheckCircle2 className="h-4 w-4" /> Satisfactory
                      </span>
                    </SelectItem>
                    <SelectItem value="unsatisfactory">
                      <span className="flex items-center gap-2 text-red-500">
                        <AlertTriangle className="h-4 w-4" /> Unsatisfactory
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="additionalNotes">Additional Notes</Label>
                <Textarea
                  id="additionalNotes"
                  placeholder="Any additional notes or comments..."
                  value={formData.additionalNotes || ''}
                  onChange={(e) => onUpdate('additionalNotes', e.target.value)}
                  className="text-base touch-manipulation min-h-[100px] border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Final Status */}
      <div className={cn(isMobile ? "px-4 py-4" : "")}>
        {isComplete ? (
          <Alert className="border-green-500/30 bg-green-500/10">
            <CheckCircle2 className="h-4 w-4 text-green-400" />
            <AlertDescription className="text-green-200 text-xs sm:text-sm">
              <strong>Certificate ready for generation.</strong> All required fields have been completed.
            </AlertDescription>
          </Alert>
        ) : (
          <Alert className="border-amber-500/30 bg-amber-500/10">
            <AlertTriangle className="h-4 w-4 text-amber-400" />
            <AlertDescription className="text-amber-200 text-xs sm:text-sm">
              <strong>Incomplete declaration.</strong> Tester name and signature are required
              before the certificate can be generated.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
};

export default EmergencyLightingDeclarations;
