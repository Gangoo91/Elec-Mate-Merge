import React, { useState } from 'react';
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
  Info,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import SignatureInput from '@/components/signature/SignatureInput';
import { useInspectorProfiles } from '@/hooks/useInspectorProfiles';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

interface PATTestingDeclarationsProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
}

const PATTestingDeclarations: React.FC<PATTestingDeclarationsProps> = ({
  formData,
  onUpdate,
}) => {
  const isMobile = useIsMobile();
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    tester: true,
    retest: true,
    summary: true,
  });

  const { getDefaultProfile } = useInspectorProfiles();
  const { toast } = useToast();

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
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

  // Calculate next test date based on suggested interval
  const calculateNextTestDate = () => {
    const testDate = formData.testDate || new Date().toISOString().split('T')[0];
    const intervalMonths = parseInt(formData.suggestedRetestInterval) || 12;
    const date = new Date(testDate);
    date.setMonth(date.getMonth() + intervalMonths);
    return date.toISOString().split('T')[0];
  };

  return (
    <div className="space-y-6">
      {/* Tester Declaration */}
      <Collapsible open={openSections.tester} onOpenChange={() => toggleSection('tester')}>
        <div className={cn(isMobile ? "" : "eicr-section-card")}>
          <CollapsibleTrigger asChild>
            <div className={cn(
              "cursor-pointer transition-colors p-4",
              isMobile ? "bg-card/30 border-y border-border/20" : "hover:bg-muted/50"
            )}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                    <User className="h-5 w-5 text-purple-500" />
                  </div>
                  <span className="font-semibold text-lg">Tester Declaration</span>
                </div>
                <ChevronDown className={cn("h-5 w-5 transition-transform", openSections.tester && "rotate-180")} />
              </div>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="p-4 space-y-4">
              {/* Use Saved Profile Button */}
              {getDefaultProfile() && (
                <Button
                  variant="outline"
                  onClick={loadProfileToTester}
                  className="h-11 touch-manipulation"
                >
                  <User className="h-4 w-4 mr-2" />
                  Use Saved Profile
                </Button>
              )}

              <Alert className="border-blue-500/30 bg-blue-500/10">
                <Shield className="h-4 w-4 text-blue-500" />
                <AlertDescription className="text-blue-200 text-sm">
                  <strong>Declaration:</strong> I certify that the appliances listed in this report have been
                  inspected and tested in accordance with the IET Code of Practice for In-Service Inspection
                  and Testing of Electrical Equipment, and the results are as recorded.
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="testerName">Tester Name *</Label>
                  <Input
                    id="testerName"
                    placeholder="Full name"
                    value={formData.testerName || ''}
                    onChange={(e) => onUpdate('testerName', e.target.value)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
                <div>
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
                <div>
                  <Label htmlFor="testerQualifications">Qualifications</Label>
                  <Input
                    id="testerQualifications"
                    placeholder="e.g., C&G 2377, NAPIT"
                    value={formData.testerQualifications || ''}
                    onChange={(e) => onUpdate('testerQualifications', e.target.value)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
                <div>
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
        </div>
      </Collapsible>

      {/* Retest Schedule */}
      <Collapsible open={openSections.retest} onOpenChange={() => toggleSection('retest')}>
        <div className={cn(isMobile ? "" : "eicr-section-card")}>
          <CollapsibleTrigger asChild>
            <div className={cn(
              "cursor-pointer transition-colors p-4",
              isMobile ? "border-b border-border/20" : "hover:bg-muted/50"
            )}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-blue-500" />
                  </div>
                  <span className="font-semibold text-lg">Retest Schedule</span>
                </div>
                <ChevronDown className={cn("h-5 w-5 transition-transform", openSections.retest && "rotate-180")} />
              </div>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="p-4 space-y-4">
              <Alert className="border-amber-500/30 bg-amber-500/10">
                <Info className="h-4 w-4 text-amber-500" />
                <AlertDescription className="text-amber-200 text-sm">
                  <strong>IET CoP Guidance:</strong> Suggested retest intervals depend on equipment type and environment.
                  Construction sites may need 3-monthly tests; office IT equipment may be 48 months.
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="suggestedRetestInterval">Suggested Retest Interval</Label>
                  <Select
                    value={formData.suggestedRetestInterval || '12'}
                    onValueChange={(v) => {
                      onUpdate('suggestedRetestInterval', v);
                      // Auto-calculate next test date
                      const testDate = formData.testDate || new Date().toISOString().split('T')[0];
                      const date = new Date(testDate);
                      date.setMonth(date.getMonth() + parseInt(v));
                      onUpdate('nextTestDue', date.toISOString().split('T')[0]);
                    }}
                  >
                    <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-white/30">
                      <SelectValue placeholder="Select interval" />
                    </SelectTrigger>
                    <SelectContent className="z-[100] bg-background border-border">
                      <SelectItem value="3">3 Months (Construction)</SelectItem>
                      <SelectItem value="6">6 Months (Industrial)</SelectItem>
                      <SelectItem value="12">12 Months (General)</SelectItem>
                      <SelectItem value="24">24 Months (Office)</SelectItem>
                      <SelectItem value="48">48 Months (IT Equipment)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="nextTestDue">Next Test Due</Label>
                  <Input
                    id="nextTestDue"
                    type="date"
                    value={formData.nextTestDue || calculateNextTestDate()}
                    onChange={(e) => onUpdate('nextTestDue', e.target.value)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="recommendations">Recommendations</Label>
                <Textarea
                  id="recommendations"
                  placeholder="Any recommendations for the client..."
                  value={formData.recommendations || ''}
                  onChange={(e) => onUpdate('recommendations', e.target.value)}
                  className="text-base touch-manipulation min-h-[80px] border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                />
              </div>

              <div>
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
        </div>
      </Collapsible>

      {/* Summary */}
      <Collapsible open={openSections.summary} onOpenChange={() => toggleSection('summary')}>
        <div className={cn(isMobile ? "" : "eicr-section-card")}>
          <CollapsibleTrigger asChild>
            <div className={cn(
              "cursor-pointer transition-colors p-4",
              isMobile ? "border-b border-border/20" : "hover:bg-muted/50"
            )}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  </div>
                  <span className="font-semibold text-lg">Test Summary</span>
                </div>
                <ChevronDown className={cn("h-5 w-5 transition-transform", openSections.summary && "rotate-180")} />
              </div>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="p-4">
              <div className="grid grid-cols-3 gap-4 text-center mb-4">
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-2xl font-bold">{formData.totalAppliancesTested || 0}</p>
                  <p className="text-sm text-muted-foreground">Tested</p>
                </div>
                <div className="bg-green-500/10 rounded-lg p-4">
                  <p className="text-2xl font-bold text-green-500">{formData.totalPassed || 0}</p>
                  <p className="text-sm text-muted-foreground">Passed</p>
                </div>
                <div className="bg-red-500/10 rounded-lg p-4">
                  <p className="text-2xl font-bold text-red-500">{formData.totalFailed || 0}</p>
                  <p className="text-sm text-muted-foreground">Failed</p>
                </div>
              </div>

              {(formData.totalFailed || 0) > 0 && (
                <Alert className="border-red-500/30 bg-red-500/10 mb-4">
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                  <AlertDescription className="text-red-200 text-sm">
                    <strong>{formData.totalFailed} appliance(s) failed.</strong> These items must be taken out
                    of service until repaired and retested, or replaced.
                  </AlertDescription>
                </Alert>
              )}

              <div className={cn(
                "rounded-lg p-4 text-sm",
                isMobile ? "bg-card/20 border border-border/20" : "bg-muted/30"
              )}>
                <p className="font-medium mb-2">Report Summary</p>
                <ul className="space-y-1 text-muted-foreground">
                  <li>Test Date: {formData.testDate || 'Not set'}</li>
                  <li>Client: {formData.clientName || 'Not set'}</li>
                  <li>Site: {formData.siteName || formData.siteAddress || 'Not set'}</li>
                  <li>Next Test Due: {formData.nextTestDue || 'Not set'}</li>
                  <li>Tester: {formData.testerName || 'Not set'}</li>
                </ul>
              </div>
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>

      {/* Final Status */}
      {isComplete ? (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800 text-xs sm:text-sm">
            <strong>Certificate ready for generation.</strong> All required fields have been completed.
          </AlertDescription>
        </Alert>
      ) : (
        <Alert className="border-amber-200 bg-amber-50">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800 text-xs sm:text-sm">
            <strong>Incomplete declaration.</strong> Tester name and signature are required
            before the certificate can be generated.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default PATTestingDeclarations;
