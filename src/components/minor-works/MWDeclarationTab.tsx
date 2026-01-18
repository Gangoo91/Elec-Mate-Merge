import React, { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import SectionHeader from '@/components/ui/section-header';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, CheckSquare, PenTool } from 'lucide-react';
import { cn } from '@/lib/utils';
import SignatureInput from '@/components/signature/SignatureInput';

interface MWDeclarationTabProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
}

const MWDeclarationTab: React.FC<MWDeclarationTabProps> = ({ formData, onUpdate }) => {
  const [openSections, setOpenSections] = useState({
    electrician: true,
    compliance: true,
    signature: true
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const getCompletionPercentage = (section: string) => {
    switch (section) {
      case 'electrician': {
        const fields = ['electricianName', 'position'];
        const filled = fields.filter(f => formData[f]).length;
        return Math.round((filled / fields.length) * 100);
      }
      case 'compliance': {
        const fields = ['bs7671Compliance', 'testResultsAccurate', 'workSafety'];
        const filled = fields.filter(f => formData[f]).length;
        return Math.round((filled / fields.length) * 100);
      }
      case 'signature': {
        const fields = ['signatureDate', 'signature'];
        const filled = fields.filter(f => formData[f]).length;
        return Math.round((filled / fields.length) * 100);
      }
      default:
        return 0;
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Electrician Details */}
      <div className="eicr-section-card">
        <Collapsible open={openSections.electrician} onOpenChange={() => toggleSection('electrician')}>
          <CollapsibleTrigger className="w-full">
            <SectionHeader
              title="Electrician Details"
              icon={User}
              isOpen={openSections.electrician}
              color="amber-500"
              completionPercentage={getCompletionPercentage('electrician')}
            />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="p-4 sm:p-5 md:p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm">Electrician Name *</Label>
                  <Input
                    value={formData.electricianName || ''}
                    onChange={(e) => onUpdate('electricianName', e.target.value)}
                    placeholder="Full name"
                    className={cn("h-11 text-base touch-manipulation border-white/30 focus:border-amber-500 focus:ring-amber-500", !formData.electricianName && "border-red-500/50")}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">For and on behalf of (Company)</Label>
                  <Input
                    value={formData.forAndOnBehalfOf || ''}
                    onChange={(e) => onUpdate('forAndOnBehalfOf', e.target.value)}
                    placeholder="Company or trading name"
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-amber-500 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm">Position *</Label>
                <Input
                  value={formData.position || ''}
                  onChange={(e) => onUpdate('position', e.target.value)}
                  placeholder="e.g., Qualified Electrician"
                  className={cn("h-11 text-base touch-manipulation border-white/30 focus:border-amber-500 focus:ring-amber-500", !formData.position && "border-red-500/50")}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm">Qualification Level</Label>
                  <Select value={formData.qualificationLevel || ''} onValueChange={(v) => onUpdate('qualificationLevel', v)}>
                    <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-white/30 focus:border-amber-500 focus:ring-amber-500">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground">
                      <SelectItem value="nvq3">NVQ Level 3</SelectItem>
                      <SelectItem value="city-guilds">City & Guilds 2382</SelectItem>
                      <SelectItem value="eal">EAL Level 3</SelectItem>
                      <SelectItem value="am2">AM2</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Scheme Provider</Label>
                  <Select value={formData.schemeProvider || ''} onValueChange={(v) => onUpdate('schemeProvider', v)}>
                    <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-white/30 focus:border-amber-500 focus:ring-amber-500">
                      <SelectValue placeholder="Select provider" />
                    </SelectTrigger>
                    <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground">
                      <SelectItem value="niceic">NICEIC</SelectItem>
                      <SelectItem value="napit">NAPIT</SelectItem>
                      <SelectItem value="elecsa">ELECSA</SelectItem>
                      <SelectItem value="stroma">Stroma</SelectItem>
                      <SelectItem value="bpec">BPEC</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm">Registration Number</Label>
                <Input
                  value={formData.registrationNumber || ''}
                  onChange={(e) => onUpdate('registrationNumber', e.target.value)}
                  placeholder="Scheme registration number"
                  className="h-11 text-base touch-manipulation border-white/30 focus:border-amber-500 focus:ring-amber-500"
                />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Compliance Declarations */}
      <div className="eicr-section-card">
        <Collapsible open={openSections.compliance} onOpenChange={() => toggleSection('compliance')}>
          <CollapsibleTrigger className="w-full">
            <SectionHeader
              title="Compliance Declarations"
              icon={CheckSquare}
              isOpen={openSections.compliance}
              color="green-500"
              completionPercentage={getCompletionPercentage('compliance')}
            />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="p-4 sm:p-5 md:p-6 space-y-4">
              {/* Compliance Checkboxes */}
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-green-500/5 border border-green-500/20">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="bs7671Compliance"
                      checked={formData.bs7671Compliance || false}
                      onCheckedChange={(c) => onUpdate('bs7671Compliance', c)}
                      className="mt-0.5 border-white/40 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                    />
                    <Label htmlFor="bs7671Compliance" className="text-sm cursor-pointer leading-relaxed">
                      I certify that the work described above complies with BS 7671 (IET Wiring Regulations),
                      subject to any departures detailed and agreed with the person ordering the work. *
                    </Label>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/20">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="testResultsAccurate"
                      checked={formData.testResultsAccurate || false}
                      onCheckedChange={(c) => onUpdate('testResultsAccurate', c)}
                      className="mt-0.5 border-white/40 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                    />
                    <Label htmlFor="testResultsAccurate" className="text-sm cursor-pointer leading-relaxed">
                      I confirm that the test results and inspection are an accurate record of the
                      electrical installation work carried out. *
                    </Label>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="workSafety"
                      checked={formData.workSafety || false}
                      onCheckedChange={(c) => onUpdate('workSafety', c)}
                      className="mt-0.5 border-white/40 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
                    />
                    <Label htmlFor="workSafety" className="text-sm cursor-pointer leading-relaxed">
                      I confirm that the work does not impair the safety of the existing installation. *
                    </Label>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/20">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="partPNotification"
                      checked={formData.partPNotification || false}
                      onCheckedChange={(c) => onUpdate('partPNotification', c)}
                      className="mt-0.5 border-white/40 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                    />
                    <Label htmlFor="partPNotification" className="text-sm cursor-pointer leading-relaxed">
                      Part P Building Regulations notification has been made (where applicable).
                    </Label>
                  </div>
                </div>
              </div>

              {/* Additional Notes */}
              <div className="space-y-2 pt-2">
                <Label className="text-sm">Additional Notes / Comments</Label>
                <Textarea
                  value={formData.additionalNotes || ''}
                  onChange={(e) => onUpdate('additionalNotes', e.target.value)}
                  placeholder="Any additional notes, comments or recommendations..."
                  rows={3}
                  className="text-base touch-manipulation min-h-[100px] border-white/30 focus:border-green-500 focus:ring-green-500"
                />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Signature */}
      <div className="eicr-section-card">
        <Collapsible open={openSections.signature} onOpenChange={() => toggleSection('signature')}>
          <CollapsibleTrigger className="w-full">
            <SectionHeader
              title="Signature"
              icon={PenTool}
              isOpen={openSections.signature}
              color="purple-500"
              completionPercentage={getCompletionPercentage('signature')}
            />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="p-4 sm:p-5 md:p-6 space-y-4">
              <div className="space-y-2">
                <Label className="text-sm">Signature Date *</Label>
                <Input
                  type="date"
                  value={formData.signatureDate || ''}
                  onChange={(e) => onUpdate('signatureDate', e.target.value)}
                  className={cn("h-11 text-base touch-manipulation border-white/30 focus:border-purple-500 focus:ring-purple-500", !formData.signatureDate && "border-red-500/50")}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm">Signature *</Label>
                <SignatureInput
                  value={formData.signature || ''}
                  onChange={(v) => onUpdate('signature', v)}
                  placeholder="Sign here"
                  className={cn(!formData.signature && "border-red-500/50")}
                />
              </div>

              {/* Summary info */}
              {formData.electricianName && formData.signatureDate && (
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-sm text-white/60">
                    Certificate signed by <span className="text-white font-medium">{formData.electricianName}</span>
                    {formData.position && <span> ({formData.position})</span>}
                    {' '}on <span className="text-white font-medium">{new Date(formData.signatureDate).toLocaleDateString('en-GB')}</span>
                  </div>
                </div>
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
};

export default MWDeclarationTab;
