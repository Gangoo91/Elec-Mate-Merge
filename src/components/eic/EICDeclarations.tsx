import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { ChevronDown } from 'lucide-react';
import SignatureInput from '@/components/signature/SignatureInput';
import { useCompanyProfile } from '@/hooks/useCompanyProfile';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useHaptic } from '@/hooks/useHaptic';
import { INSPECTOR_QUALIFICATIONS } from '@/constants/inspectorQualifications';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

interface EICDeclarationsProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
}

const FormField = ({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) => (
  <div>
    <Label className="text-white text-xs mb-1.5 block">{label}{required && ' *'}</Label>
    {children}
  </div>
);

const POSITION_PRESETS = [
  'Qualified Supervisor',
  'Approved Electrician',
  'Installation Electrician',
  'Electrical Engineer',
  'Site Manager',
];

// ELE-850 — full qual list (LCL/PAA/VTCT/NOCN + neutral Level 3 I&T options)
// shared with InspectorSheet + EICR Inspector Details
const QUALIFICATIONS = INSPECTOR_QUALIFICATIONS;

const INTERVAL_PRESETS = [
  { label: '1 yr', months: 12 },
  { label: '3 yr', months: 36 },
  { label: '5 yr', months: 60 },
  { label: '10 yr', months: 120 },
];

const inputClass = 'h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08]';

const EICDeclarations: React.FC<EICDeclarationsProps> = ({ formData, onUpdate }) => {
  const haptic = useHaptic();
  const { companyProfile } = useCompanyProfile();
  const { toast } = useToast();
  const [isInitialMount, setIsInitialMount] = useState(true);
  const [departuresOpen, setDeparturesOpen] = useState(false);

  // Check if all required fields are completed
  const isDesignerComplete = formData.designerName && formData.designerSignature;
  const isConstructorComplete = formData.constructorName && formData.constructorSignature;
  const isInspectorComplete = formData.inspectorName && formData.inspectorSignature;

  // Auto-fill from business settings on initial mount. When all three signatories
  // populate with the same person (90% of domestic jobs) pre-tick the "Same as"
  // toggles so Constructor + Inspector blocks visually collapse — user sees one
  // filled block instead of three.
  useEffect(() => {
    if (isInitialMount && companyProfile) {
      const areAllFieldsEmpty =
        !formData.designerName && !formData.constructorName && !formData.inspectorName;

      if (areAllFieldsEmpty) {
        loadProfileToSection('designer');
        loadProfileToSection('constructor');
        loadProfileToSection('inspector');
        if (companyProfile.inspector_name) {
          onUpdate('sameAsDesigner', true);
          onUpdate('sameAsConstructor', true);
        }
      }
      setIsInitialMount(false);
    }
  }, [isInitialMount, companyProfile]);

  // When sameAsDesigner is active, keep constructor in sync with designer changes
  useEffect(() => {
    if (formData.sameAsDesigner) {
      onUpdate('constructorName', formData.designerName || '');
      onUpdate('constructorSignature', formData.designerSignature || '');
      onUpdate('constructorQualifications', formData.designerQualifications || '');
      onUpdate('constructorDate', formData.designerDate || '');
    }
  }, [formData.sameAsDesigner, formData.designerName, formData.designerSignature, formData.designerDate]);

  // Load business settings data into a specific declaration section
  const loadProfileToSection = (section: 'designer' | 'constructor' | 'inspector') => {
    if (!companyProfile) return;

    const today = new Date().toISOString().split('T')[0];
    const qualifications = Array.isArray(companyProfile.inspector_qualifications)
      ? companyProfile.inspector_qualifications.join(', ')
      : companyProfile.inspector_qualifications || '';

    // Inspector name only — never fall back to company_name, that polluted the Name field
    // when business settings had only company filled.
    onUpdate(`${section}Name`, companyProfile.inspector_name || '');
    onUpdate(`${section}Qualifications`, qualifications);
    onUpdate(`${section}Company`, companyProfile.company_name || '');
    onUpdate(`${section}Address`, companyProfile.company_address || '');
    onUpdate(`${section}Postcode`, companyProfile.company_postcode || '');
    onUpdate(`${section}Phone`, companyProfile.company_phone || '');
    onUpdate(`${section}Date`, today);
    if (companyProfile.signature_data) {
      onUpdate(`${section}Signature`, companyProfile.signature_data);
    }
  };

  // Toggle a qualification for a given section
  const toggleQualification = (section: string, qual: string) => {
    haptic.light();
    const field = `${section}Qualifications`;
    const current = (formData[field] || '').split(', ').filter(Boolean);
    const updated = current.includes(qual)
      ? current.filter((q: string) => q !== qual)
      : [...current, qual];
    onUpdate(field, updated.join(', '));
  };

  // Manual fill button handler with haptic feedback
  const handleFillFromProfile = (section: 'designer' | 'constructor' | 'inspector') => {
    if (!companyProfile) {
      toast({
        title: 'No Business Settings Found',
        description: 'Please complete your Business Settings first.',
        variant: 'destructive',
      });
      return;
    }
    haptic.light();
    loadProfileToSection(section);
    toast({
      title: 'Business Settings Applied',
      description: 'Your business details have been filled in.',
    });
  };

  return (
    <div className="space-y-4">
      {/* Legal notice — single line */}
      <p className="text-[10px] text-white">
        BS 7671 declarations — all sections must be signed by competent persons
      </p>

      {/* Load from Business Settings toggle */}
      {companyProfile && (
        <button
          type="button"
          onClick={() => {
            haptic.light();
            loadProfileToSection('designer');
            loadProfileToSection('constructor');
            loadProfileToSection('inspector');
            // Pre-tick Same as toggles when one person fills all three signatories.
            if (companyProfile.inspector_name) {
              onUpdate('sameAsDesigner', true);
              onUpdate('sameAsConstructor', true);
            }
            // Surface missing profile fields so user knows to top up Business Settings.
            const missing: string[] = [];
            if (!companyProfile.inspector_name) missing.push('Inspector name');
            if (!companyProfile.company_name) missing.push('Company name');
            if (!companyProfile.company_address) missing.push('Address');
            if (!companyProfile.company_phone) missing.push('Phone');
            if (missing.length > 0) {
              toast({
                title: 'Some details still need entering',
                description: `Visit Business Settings to add: ${missing.join(', ')}.`,
                variant: 'destructive',
              });
            } else {
              toast({
                title: 'Business Settings Loaded',
                description: 'Applied to all three signatory blocks.',
              });
            }
          }}
          className="w-full h-10 rounded-lg font-semibold text-xs bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow touch-manipulation active:scale-[0.98]"
        >
          Load from Business Settings
        </button>
      )}

      {/* ── FOR DESIGN ── */}
      <div className="space-y-3">
        <div className="border-b border-white/[0.06] pb-1 mb-2">
          <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-elec-yellow/40 to-elec-yellow/10 mb-2" />
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-medium text-white uppercase tracking-wider">For Design</h3>
            <span className={cn('text-[10px]', isDesignerComplete ? 'text-green-400' : 'text-white')}>
              {isDesignerComplete ? '✓' : 'Required'}
            </span>
          </div>
        </div>

        {/* BS 7671 Declaration Text */}
        <p className="text-[10px] text-white leading-relaxed">
          I/We hereby CERTIFY that the design work for which I/we have been responsible is to the best of my/our knowledge and belief in accordance with BS 7671:2018, except for the departures, if any, detailed below.
        </p>

        <div className="grid grid-cols-2 gap-2 items-end">
          <FormField label="Name" required>
            <Input
              placeholder="Full name"
              value={formData.designerName || ''}
              onChange={(e) => onUpdate('designerName', e.target.value)}
              className={cn(inputClass, !formData.designerName && 'border-red-500/30')}
            />
          </FormField>
          <FormField label="Company">
            <Input
              placeholder="Company name"
              value={formData.designerCompany || ''}
              onChange={(e) => onUpdate('designerCompany', e.target.value)}
              className={inputClass}
            />
          </FormField>
        </div>

        <FormField label="Qualifications">
          <Collapsible>
            <CollapsibleTrigger
              className={cn(
                'group w-full h-11 px-3 rounded-md bg-white/[0.06] border border-white/[0.08]',
                'flex items-center justify-between text-xs text-white touch-manipulation active:scale-[0.98]'
              )}
            >
              <span>
                {(formData.designerQualifications || '').split(', ').filter(Boolean).length > 0
                  ? `${(formData.designerQualifications || '').split(', ').filter(Boolean).length} selected`
                  : 'Tap to select qualifications'}
              </span>
              <ChevronDown className="h-4 w-4 text-white/60 transition-transform group-data-[state=open]:rotate-180" />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="grid grid-cols-4 gap-1 mt-2">
                {QUALIFICATIONS.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => toggleQualification('designer', q)}
                    className={cn(
                      'h-8 rounded-md font-medium transition-all touch-manipulation text-[9px] active:scale-[0.98]',
                      (formData.designerQualifications || '').includes(q)
                        ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
                        : 'bg-white/[0.05] border border-white/[0.08] text-white'
                    )}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </FormField>

        <FormField label="Date">
          <Input
            type="date"
            value={formData.designerDate || new Date().toISOString().split('T')[0]}
            onChange={(e) => onUpdate('designerDate', e.target.value)}
            className={cn(inputClass, 'text-xs')}
            style={{ fontSize: '12px' }}
          />
        </FormField>

        <SignatureInput
          value={formData.designerSignature}
          onChange={(signature) => onUpdate('designerSignature', signature)}
          placeholder="Designer signature"
          required={true}
        />

        {/* Designer No 2 (Optional) */}
        <div className="border-t border-white/[0.06] pt-3 space-y-2">
          <div className="h-[2px] w-12 rounded-full bg-gradient-to-r from-elec-yellow/30 to-transparent" />
          <h4 className="text-[10px] font-medium text-white uppercase tracking-wider">Designer No 2 (if applicable)</h4>
          <div className="grid grid-cols-2 gap-2 items-end">
            <FormField label="Name">
              <Input
                placeholder="Name"
                value={formData.designer2Name || ''}
                onChange={(e) => onUpdate('designer2Name', e.target.value)}
                className={inputClass}
              />
            </FormField>
            <FormField label="Company">
              <Input
                placeholder="Company"
                value={formData.designer2Company || ''}
                onChange={(e) => onUpdate('designer2Company', e.target.value)}
                className={inputClass}
              />
            </FormField>
          </div>
          <div className="grid grid-cols-2 gap-2 items-end">
            <FormField label="Address">
              <Input
                placeholder="Address + Postcode"
                value={formData.designer2Address || ''}
                onChange={(e) => onUpdate('designer2Address', e.target.value)}
                className={inputClass}
              />
            </FormField>
            <FormField label="Tel">
              <Input
                type="tel"
                placeholder="Phone"
                value={formData.designer2Phone || ''}
                onChange={(e) => onUpdate('designer2Phone', e.target.value)}
                className={inputClass}
              />
            </FormField>
          </div>
          <div className="grid grid-cols-2 gap-2 items-end">
            <FormField label="Date">
              <Input
                type="date"
                value={formData.designer2Date || ''}
                onChange={(e) => onUpdate('designer2Date', e.target.value)}
                className={inputClass}
              />
            </FormField>
            <FormField label="BS 7671:2018 amended to (date)">
              <Input
                type="date"
                value={formData.designer2Bs7671Date || ''}
                onChange={(e) => onUpdate('designer2Bs7671Date', e.target.value)}
                className={inputClass}
              />
            </FormField>
          </div>
          {formData.designer2Name && (
            <SignatureInput
              value={formData.designer2Signature}
              onChange={(signature) => onUpdate('designer2Signature', signature)}
              placeholder="Second designer signature"
              required={false}
            />
          )}
        </div>
      </div>

      {/* ── FOR CONSTRUCTION ── */}
      <div className="space-y-3">
        <div className="border-b border-white/[0.06] pb-1 mb-2">
          <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-elec-yellow/40 to-elec-yellow/10 mb-2" />
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-medium text-white uppercase tracking-wider">For Construction</h3>
            <span className={cn('text-[10px]', isConstructorComplete ? 'text-green-400' : 'text-white')}>
              {isConstructorComplete ? '✓' : 'Required'}
            </span>
          </div>
        </div>

        <p className="text-[10px] text-white leading-relaxed">
          I hereby CERTIFY that the construction work for which I have been responsible is to the best of my knowledge and belief in accordance with BS 7671:2018, except for the departures, if any, detailed below.
        </p>

        {/* Same as Designer toggle */}
        <button
          type="button"
          onClick={() => {
            haptic.light();
            const newVal = !formData.sameAsDesigner;
            onUpdate('sameAsDesigner', newVal);
            if (newVal) {
              onUpdate('constructorName', formData.designerName);
              onUpdate('constructorQualifications', formData.designerQualifications);
              onUpdate('constructorCompany', formData.designerCompany);
              onUpdate('constructorAddress', formData.designerAddress);
              onUpdate('constructorPostcode', formData.designerPostcode);
              onUpdate('constructorPhone', formData.designerPhone);
              onUpdate('constructorDate', formData.designerDate);
              onUpdate('constructorSignature', formData.designerSignature);
              onUpdate('constructorBs7671Date', formData.designerBs7671Date);
              onUpdate('constructorDepartures', formData.designerDepartures);
            }
          }}
          className={cn(
            'w-full h-10 rounded-lg font-semibold text-xs touch-manipulation active:scale-[0.98] transition-colors',
            formData.sameAsDesigner
              ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
              : 'bg-white/[0.05] border border-white/[0.08] text-white'
          )}
        >
          Same as Designer {formData.sameAsDesigner ? '\u2713' : ''}
        </button>

        <div className={cn(formData.sameAsDesigner && 'opacity-40 pointer-events-none')}>
          <div className="grid grid-cols-2 gap-2 items-end">
            <FormField label="Name" required>
              <Input
                placeholder="Full name"
                value={formData.constructorName || ''}
                onChange={(e) => onUpdate('constructorName', e.target.value)}
                disabled={formData.sameAsDesigner}
                className={cn(inputClass, !formData.constructorName && 'border-red-500/30')}
              />
            </FormField>
            <FormField label="Company">
              <Input
                placeholder="Company name"
                value={formData.constructorCompany || ''}
                onChange={(e) => onUpdate('constructorCompany', e.target.value)}
                disabled={formData.sameAsDesigner}
                className={inputClass}
              />
            </FormField>
          </div>

          <div className="mt-3">
            <FormField label="Qualifications">
              <Collapsible>
                <CollapsibleTrigger
                  disabled={formData.sameAsDesigner}
                  className={cn(
                    'group w-full h-11 px-3 rounded-md bg-white/[0.06] border border-white/[0.08]',
                    'flex items-center justify-between text-xs text-white touch-manipulation active:scale-[0.98]',
                    formData.sameAsDesigner && 'opacity-40 pointer-events-none'
                  )}
                >
                  <span>
                    {(formData.constructorQualifications || '').split(', ').filter(Boolean).length > 0
                      ? `${(formData.constructorQualifications || '').split(', ').filter(Boolean).length} selected`
                      : 'Tap to select qualifications'}
                  </span>
                  <ChevronDown className="h-4 w-4 text-white/60 transition-transform group-data-[state=open]:rotate-180" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="grid grid-cols-4 gap-1 mt-2">
                    {QUALIFICATIONS.map((q) => (
                      <button
                        key={q}
                        type="button"
                        disabled={formData.sameAsDesigner}
                        onClick={() => toggleQualification('constructor', q)}
                        className={cn(
                          'h-8 rounded-md font-medium transition-all touch-manipulation text-[9px] active:scale-[0.98]',
                          (formData.constructorQualifications || '').includes(q)
                            ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
                            : 'bg-white/[0.05] border border-white/[0.08] text-white',
                          formData.sameAsDesigner && 'opacity-40 pointer-events-none'
                        )}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </FormField>
          </div>

          <FormField label="Date">
            <Input
              type="date"
              value={formData.constructorDate || new Date().toISOString().split('T')[0]}
              onChange={(e) => onUpdate('constructorDate', e.target.value)}
              disabled={formData.sameAsDesigner}
              className={cn(inputClass, 'text-xs')}
              style={{ fontSize: '12px' }}
            />
          </FormField>

          <div className="mt-3">
            <SignatureInput
              value={formData.constructorSignature}
              onChange={(signature) => onUpdate('constructorSignature', signature)}
              placeholder="Draw or type constructor signature"
              required={true}
            />
          </div>
        </div>
      </div>

      {/* ── FOR INSPECTION AND TESTING ── */}
      <div className="space-y-3">
        <div className="border-b border-white/[0.06] pb-1 mb-2">
          <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-elec-yellow/40 to-elec-yellow/10 mb-2" />
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-medium text-white uppercase tracking-wider">For Inspection & Testing</h3>
            <span className={cn('text-[10px]', isInspectorComplete ? 'text-green-400' : 'text-white')}>
              {isInspectorComplete ? '✓' : 'Required'}
            </span>
          </div>
        </div>

        <p className="text-[10px] text-white leading-relaxed">
          I hereby CERTIFY that the inspection & testing work for which I have been responsible is to the best of my knowledge and belief in accordance with BS 7671:2018, except for the departures, if any, detailed below.
        </p>

        {/* Same as Constructor toggle */}
        <button
          type="button"
          onClick={() => {
            haptic.light();
            const newVal = !formData.sameAsConstructor;
            onUpdate('sameAsConstructor', newVal);
            if (newVal) {
              onUpdate('inspectorName', formData.constructorName);
              onUpdate('inspectorQualifications', formData.constructorQualifications);
              onUpdate('inspectorCompany', formData.constructorCompany);
              onUpdate('inspectorAddress', formData.constructorAddress);
              onUpdate('inspectorPostcode', formData.constructorPostcode);
              onUpdate('inspectorPhone', formData.constructorPhone);
              onUpdate('inspectorDate', formData.constructorDate);
              onUpdate('inspectorSignature', formData.constructorSignature);
              onUpdate('inspectorBs7671Date', formData.constructorBs7671Date);
              onUpdate('inspectorDepartures', formData.constructorDepartures);
            }
          }}
          className={cn(
            'w-full h-10 rounded-lg font-semibold text-xs touch-manipulation active:scale-[0.98] transition-colors',
            formData.sameAsConstructor
              ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
              : 'bg-white/[0.05] border border-white/[0.08] text-white'
          )}
        >
          Same as Constructor {formData.sameAsConstructor ? '\u2713' : ''}
        </button>

        <div className={cn(formData.sameAsConstructor && 'opacity-40 pointer-events-none')}>
          <div className="grid grid-cols-2 gap-2 items-end">
            <FormField label="Name" required>
              <Input
                placeholder="Full name"
                value={formData.inspectorName || ''}
                onChange={(e) => onUpdate('inspectorName', e.target.value)}
                disabled={formData.sameAsConstructor}
                className={cn(inputClass, !formData.inspectorName && 'border-red-500/30')}
              />
            </FormField>
            <FormField label="Company">
              <Input
                placeholder="Company name"
                value={formData.inspectorCompany || ''}
                onChange={(e) => onUpdate('inspectorCompany', e.target.value)}
                disabled={formData.sameAsConstructor}
                className={inputClass}
              />
            </FormField>
          </div>

          <div className="mt-3">
            <FormField label="Qualifications">
              <Collapsible>
                <CollapsibleTrigger
                  disabled={formData.sameAsConstructor}
                  className={cn(
                    'group w-full h-11 px-3 rounded-md bg-white/[0.06] border border-white/[0.08]',
                    'flex items-center justify-between text-xs text-white touch-manipulation active:scale-[0.98]',
                    formData.sameAsConstructor && 'opacity-40 pointer-events-none'
                  )}
                >
                  <span>
                    {(formData.inspectorQualifications || '').split(', ').filter(Boolean).length > 0
                      ? `${(formData.inspectorQualifications || '').split(', ').filter(Boolean).length} selected`
                      : 'Tap to select qualifications'}
                  </span>
                  <ChevronDown className="h-4 w-4 text-white/60 transition-transform group-data-[state=open]:rotate-180" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="grid grid-cols-4 gap-1 mt-2">
                    {QUALIFICATIONS.map((q) => (
                      <button
                        key={q}
                        type="button"
                        disabled={formData.sameAsConstructor}
                        onClick={() => toggleQualification('inspector', q)}
                        className={cn(
                          'h-8 rounded-md font-medium transition-all touch-manipulation text-[9px] active:scale-[0.98]',
                          (formData.inspectorQualifications || '').includes(q)
                            ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
                            : 'bg-white/[0.05] border border-white/[0.08] text-white',
                          formData.sameAsConstructor && 'opacity-40 pointer-events-none'
                        )}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </FormField>
          </div>

          <FormField label="Date">
            <Input
              type="date"
              value={formData.inspectorDate || new Date().toISOString().split('T')[0]}
              onChange={(e) => onUpdate('inspectorDate', e.target.value)}
              disabled={formData.sameAsConstructor}
              className={cn(inputClass, 'text-xs')}
              style={{ fontSize: '12px' }}
            />
          </FormField>

          <div className="mt-3">
            <SignatureInput
              value={formData.inspectorSignature}
              onChange={(signature) => onUpdate('inspectorSignature', signature)}
              placeholder="Draw or type inspector signature"
              required={true}
            />
          </div>
        </div>
      </div>

      {/* ── DEPARTURES ── */}
      <div className="space-y-3">
        <div className="border-b border-white/[0.06] pb-1">
          <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-elec-yellow/40 to-elec-yellow/10 mb-2" />
          <h3 className="text-xs font-medium text-white uppercase tracking-wider">Departures from BS 7671</h3>
        </div>
        <FormField label="Departures (Regs 120.3, 133.1.2, 133.1.3, 133.5)">
          <div className="flex gap-2">
            <Input
              value={formData.designerDepartures || ''}
              onChange={(e) => onUpdate('designerDepartures', e.target.value)}
              placeholder="Enter departures or tap None"
              className={cn(inputClass, 'flex-1')}
            />
            <button
              type="button"
              onClick={() => {
                haptic.light();
                onUpdate('designerDepartures', 'None');
              }}
              className={cn(
                'h-11 px-4 rounded-lg text-xs font-semibold touch-manipulation active:scale-[0.98] shrink-0',
                formData.designerDepartures === 'None'
                  ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
                  : 'bg-white/[0.05] border border-white/[0.08] text-white'
              )}
            >
              None
            </button>
          </div>
        </FormField>
        <FormField label="Permitted Exceptions (Reg 411.3.3)">
          <div className="flex gap-2">
            <Input
              value={formData.permittedExceptions || ''}
              onChange={(e) => onUpdate('permittedExceptions', e.target.value)}
              placeholder="Enter exceptions or tap None"
              className={cn(inputClass, 'flex-1')}
            />
            <button
              type="button"
              onClick={() => {
                haptic.light();
                onUpdate('permittedExceptions', 'None');
              }}
              className={cn(
                'h-11 px-4 rounded-lg text-xs font-semibold touch-manipulation active:scale-[0.98] shrink-0',
                formData.permittedExceptions === 'None'
                  ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
                  : 'bg-white/[0.05] border border-white/[0.08] text-white'
              )}
            >
              None
            </button>
          </div>
        </FormField>
        <button
          type="button"
          onClick={() => { haptic.light(); onUpdate('riskAssessmentAttached', !formData.riskAssessmentAttached); }}
          className={cn(
            'w-full h-10 rounded-lg font-semibold text-xs touch-manipulation active:scale-[0.98]',
            formData.riskAssessmentAttached
              ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
              : 'bg-white/[0.05] border border-white/[0.08] text-white'
          )}
        >
          Risk Assessment Attached {formData.riskAssessmentAttached ? '✓' : ''}
        </button>
      </div>

      {/* ── NEXT INSPECTION ── */}
      <div className="space-y-3">
        <div className="border-b border-white/[0.06] pb-1">
          <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-elec-yellow/40 to-elec-yellow/10 mb-2" />
          <h3 className="text-xs font-medium text-white uppercase tracking-wider">Next Inspection</h3>
        </div>
        <div className="grid grid-cols-4 gap-1">
          {INTERVAL_PRESETS.map((preset) => (
            <button
              key={preset.months}
              type="button"
              onClick={() => {
                haptic.light();
                onUpdate('nextInspectionInterval', String(preset.months));
                const now = new Date();
                now.setMonth(now.getMonth() + preset.months);
                onUpdate('nextInspectionDate', now.toISOString().split('T')[0]);
              }}
              className={cn(
                'h-10 rounded-lg text-xs font-semibold touch-manipulation active:scale-[0.98]',
                String(formData.nextInspectionInterval) === String(preset.months)
                  ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
                  : 'bg-white/[0.05] border border-white/[0.08] text-white'
              )}
            >
              {preset.label}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2 items-end">
          <FormField label="Interval (months)">
            <Input
              type="text"
              inputMode="numeric"
              value={formData.nextInspectionInterval || ''}
              onChange={(e) => onUpdate('nextInspectionInterval', e.target.value)}
              placeholder="e.g., 60"
              className={inputClass}
            />
          </FormField>
          <FormField label="Next Date">
            <Input
              type="date"
              value={formData.nextInspectionDate || ''}
              onChange={(e) => onUpdate('nextInspectionDate', e.target.value)}
              className={cn(inputClass, 'text-xs')}
              style={{ fontSize: '12px' }}
            />
          </FormField>
        </div>
      </div>
    </div>
  );
};

export default EICDeclarations;
