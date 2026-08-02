import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import SignatureInput from '@/components/signature/SignatureInput';
import { useEICForm } from './EICFormProvider';
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formData: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onUpdate: (field: string, value: any) => void;
}

const cardCn =
  '-mx-4 rounded-none border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:p-5 space-y-4';

const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base md:text-base font-medium text-white placeholder:font-normal placeholder:text-white/25 caret-elec-yellow transition-colors duration-150 hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none focus:shadow-none !leading-[2.75rem] [color-scheme:dark] touch-manipulation';

const labelCn = 'text-[12px] font-medium text-white mb-1 block';

const chipOn = 'bg-elec-yellow border border-elec-yellow text-black font-semibold';
const chipOff = 'bg-white/[0.06] border border-white/[0.12] text-white font-medium';

// fieldName renders a [data-field] anchor so the validation panel's row taps
// can scroll + flash the exact field (scrollToField), matching MWDetailsTab.
const FormField = ({
  label,
  required,
  fieldName,
  children,
}: {
  label: string;
  required?: boolean;
  fieldName?: string;
  children: React.ReactNode;
}) => (
  <div data-field={fieldName}>
    <Label className={labelCn}>{label}{required && ' *'}</Label>
    {children}
  </div>
);

// ELE-850 — full qual list (LCL/PAA/VTCT/NOCN + neutral Level 3 I&T options)
// shared with InspectorSheet + EICR Inspector Details
const QUALIFICATIONS = INSPECTOR_QUALIFICATIONS;

const INTERVAL_PRESETS = [
  { label: '1 yr', months: 12 },
  { label: '3 yr', months: 36 },
  { label: '5 yr', months: 60 },
  { label: '10 yr', months: 120 },
];

const EICDeclarations: React.FC<EICDeclarationsProps> = ({ formData, onUpdate }) => {
  const haptic = useHaptic();
  const { companyProfile } = useCompanyProfile();
  const { toast } = useToast();
  // Reopened certs must render their saved state — profile auto-fill is a
  // new-cert convenience only, and must never race async cloud hydration.
  const { isHydrating, isExistingReport } = useEICForm();
  const [isInitialMount, setIsInitialMount] = useState(true);

  // Check if all required fields are completed
  const isDesignerComplete = formData.designerName && formData.designerSignature;
  const isConstructorComplete = formData.constructorName && formData.constructorSignature;
  const isInspectorComplete = formData.inspectorName && formData.inspectorSignature;

  // Auto-fill from business settings on initial mount. When all three signatories
  // populate with the same person (90% of domestic jobs) pre-tick the "Same as"
  // toggles so Constructor + Inspector blocks visually collapse — user sees one
  // filled block instead of three.
  useEffect(() => {
    // Never auto-fill a reopened report (saved state may have intentionally
    // cleared signatory fields) or while cloud hydration is still in flight.
    if (isHydrating || isExistingReport) return;
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
  }, [isInitialMount, companyProfile, isHydrating, isExistingReport]);

  // When sameAsDesigner is active, keep constructor in sync with designer
  // changes — the full field set the toggle copies, with matching deps, so no
  // edit (quals, company, dates…) is left stale until another field changes.
  useEffect(() => {
    if (formData.sameAsDesigner) {
      onUpdate('constructorName', formData.designerName || '');
      onUpdate('constructorSignature', formData.designerSignature || '');
      onUpdate('constructorQualifications', formData.designerQualifications || '');
      onUpdate('constructorCompany', formData.designerCompany || '');
      onUpdate('constructorAddress', formData.designerAddress || '');
      onUpdate('constructorPostcode', formData.designerPostcode || '');
      onUpdate('constructorPhone', formData.designerPhone || '');
      onUpdate('constructorDate', formData.designerDate || '');
      onUpdate('constructorBs7671Date', formData.designerBs7671Date || '');
      onUpdate('constructorDepartures', formData.designerDepartures || '');
    }
  }, [
    formData.sameAsDesigner,
    formData.designerName,
    formData.designerSignature,
    formData.designerQualifications,
    formData.designerCompany,
    formData.designerAddress,
    formData.designerPostcode,
    formData.designerPhone,
    formData.designerDate,
    formData.designerBs7671Date,
    formData.designerDepartures,
  ]);

  // Mirror sync for sameAsConstructor — with both toggles on, a designer edit
  // cascades designer → constructor → inspector.
  useEffect(() => {
    if (formData.sameAsConstructor) {
      onUpdate('inspectorName', formData.constructorName || '');
      onUpdate('inspectorSignature', formData.constructorSignature || '');
      onUpdate('inspectorQualifications', formData.constructorQualifications || '');
      onUpdate('inspectorCompany', formData.constructorCompany || '');
      onUpdate('inspectorAddress', formData.constructorAddress || '');
      onUpdate('inspectorPostcode', formData.constructorPostcode || '');
      onUpdate('inspectorPhone', formData.constructorPhone || '');
      onUpdate('inspectorDate', formData.constructorDate || '');
      onUpdate('inspectorBs7671Date', formData.constructorBs7671Date || '');
      onUpdate('inspectorDepartures', formData.constructorDepartures || '');
    }
  }, [
    formData.sameAsConstructor,
    formData.constructorName,
    formData.constructorSignature,
    formData.constructorQualifications,
    formData.constructorCompany,
    formData.constructorAddress,
    formData.constructorPostcode,
    formData.constructorPhone,
    formData.constructorDate,
    formData.constructorBs7671Date,
    formData.constructorDepartures,
  ]);

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
    <div className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-4">
      {/* Legal notice + load from Business Settings */}
      <div className="space-y-3 lg:col-span-2">
        <p className="text-[11px] text-white">
          BS 7671 declarations — all sections must be signed by competent persons
        </p>

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
            className="w-full h-11 rounded-xl text-sm bg-elec-yellow border border-elec-yellow text-black font-semibold touch-manipulation active:scale-[0.98] transition-all"
          >
            Load from Business Settings
          </button>
        )}
      </div>

      {/* ── FOR DESIGN ── */}
      <div className={cn(cardCn, 'lg:col-span-2')}>
        <div className="mb-3 flex items-center justify-between gap-2">
          <h2 className="text-[15px] font-semibold tracking-tight text-white">For design</h2>
          <span className={cn('text-[11px] font-medium', isDesignerComplete ? 'text-green-400' : 'text-white')}>
            {isDesignerComplete ? 'Complete' : 'Required'}
          </span>
        </div>

        {/* BS 7671 Declaration Text */}
        <p className="text-[13px] text-white leading-relaxed">
          I/We hereby CERTIFY that the design work for which I/we have been responsible is to the best of my/our knowledge and belief in accordance with BS 7671:2018, except for the departures, if any, detailed below.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <FormField label="Name" required fieldName="designerName">
            <Input
              placeholder="Full name"
              value={formData.designerName || ''}
              onChange={(e) => onUpdate('designerName', e.target.value)}
              className={cn(inputCn, !formData.designerName && 'border-red-500/40')}
            />
          </FormField>
          <FormField label="Company">
            <Input
              placeholder="Company name"
              value={formData.designerCompany || ''}
              onChange={(e) => onUpdate('designerCompany', e.target.value)}
              className={inputCn}
            />
          </FormField>
        </div>

        <FormField label="Qualifications">
          <Collapsible>
            <CollapsibleTrigger
              className="w-full min-h-11 px-3.5 rounded-xl bg-white/[0.06] border border-white/[0.12] flex items-center justify-between text-sm text-white touch-manipulation active:scale-[0.98]"
            >
              <span>
                {(formData.designerQualifications || '').split(', ').filter(Boolean).length > 0
                  ? `${(formData.designerQualifications || '').split(', ').filter(Boolean).length} selected`
                  : 'Tap to select qualifications'}
              </span>
              <span className="text-[11px] font-medium text-elec-yellow">Select</span>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                {QUALIFICATIONS.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => toggleQualification('designer', q)}
                    className={cn(
                      'min-h-11 rounded-xl px-2 py-1.5 text-xs transition-all touch-manipulation active:scale-[0.98]',
                      (formData.designerQualifications || '').includes(q) ? chipOn : chipOff
                    )}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </FormField>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <FormField label="Date">
            <Input
              type="date"
              value={formData.designerDate || ''}
              onChange={(e) => onUpdate('designerDate', e.target.value)}
              className={inputCn}
            />
          </FormField>
          <FormField label="BS 7671:2018 amended to (date)">
            <Input
              type="date"
              value={formData.designerBs7671Date || ''}
              onChange={(e) => onUpdate('designerBs7671Date', e.target.value)}
              className={inputCn}
            />
          </FormField>
        </div>

        <div data-field="designerSignature">
          <SignatureInput
            value={formData.designerSignature}
            onChange={(signature) => onUpdate('designerSignature', signature)}
            placeholder="Designer signature"
            required={true}
          />
        </div>

        {/* Designer No 2 (Optional) */}
        <div className="border-t border-white/[0.1] pt-4 space-y-4">
          <h3 className="text-sm font-semibold text-white">Designer no 2 (if applicable)</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            <FormField label="Name">
              <Input
                placeholder="Name"
                value={formData.designer2Name || ''}
                onChange={(e) => onUpdate('designer2Name', e.target.value)}
                className={inputCn}
              />
            </FormField>
            <FormField label="Company">
              <Input
                placeholder="Company"
                value={formData.designer2Company || ''}
                onChange={(e) => onUpdate('designer2Company', e.target.value)}
                className={inputCn}
              />
            </FormField>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            <FormField label="Address">
              <Input
                placeholder="Address + Postcode"
                value={formData.designer2Address || ''}
                onChange={(e) => onUpdate('designer2Address', e.target.value)}
                className={inputCn}
              />
            </FormField>
            <FormField label="Tel">
              <Input
                type="tel"
                placeholder="Phone"
                value={formData.designer2Phone || ''}
                onChange={(e) => onUpdate('designer2Phone', e.target.value)}
                className={inputCn}
              />
            </FormField>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            <FormField label="Date">
              <Input
                type="date"
                value={formData.designer2Date || ''}
                onChange={(e) => onUpdate('designer2Date', e.target.value)}
                className={inputCn}
              />
            </FormField>
            <FormField label="BS 7671:2018 amended to (date)">
              <Input
                type="date"
                value={formData.designer2Bs7671Date || ''}
                onChange={(e) => onUpdate('designer2Bs7671Date', e.target.value)}
                className={inputCn}
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
      <div className={cn(cardCn, 'lg:col-span-2')}>
        <div className="mb-3 flex items-center justify-between gap-2">
          <h2 className="text-[15px] font-semibold tracking-tight text-white">For construction</h2>
          <span className={cn('text-[11px] font-medium', isConstructorComplete ? 'text-green-400' : 'text-white')}>
            {isConstructorComplete ? 'Complete' : 'Required'}
          </span>
        </div>

        <p className="text-[13px] text-white leading-relaxed">
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
            'w-full min-h-11 rounded-xl text-sm touch-manipulation active:scale-[0.98] transition-all',
            formData.sameAsDesigner ? chipOn : chipOff
          )}
        >
          Same as Designer {formData.sameAsDesigner ? '✓' : ''}
        </button>

        <div className={cn('space-y-4', formData.sameAsDesigner && 'opacity-40 pointer-events-none')}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            <FormField label="Name" required fieldName="constructorName">
              <Input
                placeholder="Full name"
                value={formData.constructorName || ''}
                onChange={(e) => onUpdate('constructorName', e.target.value)}
                disabled={formData.sameAsDesigner}
                className={cn(inputCn, !formData.constructorName && 'border-red-500/40')}
              />
            </FormField>
            <FormField label="Company">
              <Input
                placeholder="Company name"
                value={formData.constructorCompany || ''}
                onChange={(e) => onUpdate('constructorCompany', e.target.value)}
                disabled={formData.sameAsDesigner}
                className={inputCn}
              />
            </FormField>
          </div>

          <FormField label="Qualifications">
            <Collapsible>
              <CollapsibleTrigger
                disabled={formData.sameAsDesigner}
                className={cn(
                  'w-full min-h-11 px-3.5 rounded-xl bg-white/[0.06] border border-white/[0.12] flex items-center justify-between text-sm text-white touch-manipulation active:scale-[0.98]',
                  formData.sameAsDesigner && 'opacity-40 pointer-events-none'
                )}
              >
                <span>
                  {(formData.constructorQualifications || '').split(', ').filter(Boolean).length > 0
                    ? `${(formData.constructorQualifications || '').split(', ').filter(Boolean).length} selected`
                    : 'Tap to select qualifications'}
                </span>
                <span className="text-[11px] font-medium text-elec-yellow">Select</span>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                  {QUALIFICATIONS.map((q) => (
                    <button
                      key={q}
                      type="button"
                      disabled={formData.sameAsDesigner}
                      onClick={() => toggleQualification('constructor', q)}
                      className={cn(
                        'min-h-11 rounded-xl px-2 py-1.5 text-xs transition-all touch-manipulation active:scale-[0.98]',
                        (formData.constructorQualifications || '').includes(q) ? chipOn : chipOff,
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            <FormField label="Date">
              <Input
                type="date"
                value={formData.constructorDate || ''}
                onChange={(e) => onUpdate('constructorDate', e.target.value)}
                disabled={formData.sameAsDesigner}
                className={inputCn}
              />
            </FormField>
            <FormField label="BS 7671:2018 amended to (date)">
              <Input
                type="date"
                value={formData.constructorBs7671Date || ''}
                onChange={(e) => onUpdate('constructorBs7671Date', e.target.value)}
                disabled={formData.sameAsDesigner}
                className={inputCn}
              />
            </FormField>
          </div>

          <div data-field="constructorSignature">
            <SignatureInput
              value={formData.constructorSignature}
              onChange={(signature) => onUpdate('constructorSignature', signature)}
              placeholder="Constructor signature"
              required={true}
            />
          </div>
        </div>
      </div>

      {/* ── FOR INSPECTION AND TESTING ── */}
      <div className={cn(cardCn, 'lg:col-span-2')}>
        <div className="mb-3 flex items-center justify-between gap-2">
          <h2 className="text-[15px] font-semibold tracking-tight text-white">For inspection & testing</h2>
          <span className={cn('text-[11px] font-medium', isInspectorComplete ? 'text-green-400' : 'text-white')}>
            {isInspectorComplete ? 'Complete' : 'Required'}
          </span>
        </div>

        <p className="text-[13px] text-white leading-relaxed">
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
            'w-full min-h-11 rounded-xl text-sm touch-manipulation active:scale-[0.98] transition-all',
            formData.sameAsConstructor ? chipOn : chipOff
          )}
        >
          Same as Constructor {formData.sameAsConstructor ? '✓' : ''}
        </button>

        <div className={cn('space-y-4', formData.sameAsConstructor && 'opacity-40 pointer-events-none')}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            <FormField label="Name" required fieldName="inspectorName">
              <Input
                placeholder="Full name"
                value={formData.inspectorName || ''}
                onChange={(e) => onUpdate('inspectorName', e.target.value)}
                disabled={formData.sameAsConstructor}
                className={cn(inputCn, !formData.inspectorName && 'border-red-500/40')}
              />
            </FormField>
            <FormField label="Company">
              <Input
                placeholder="Company name"
                value={formData.inspectorCompany || ''}
                onChange={(e) => onUpdate('inspectorCompany', e.target.value)}
                disabled={formData.sameAsConstructor}
                className={inputCn}
              />
            </FormField>
          </div>

          <FormField label="Qualifications">
            <Collapsible>
              <CollapsibleTrigger
                disabled={formData.sameAsConstructor}
                className={cn(
                  'w-full min-h-11 px-3.5 rounded-xl bg-white/[0.06] border border-white/[0.12] flex items-center justify-between text-sm text-white touch-manipulation active:scale-[0.98]',
                  formData.sameAsConstructor && 'opacity-40 pointer-events-none'
                )}
              >
                <span>
                  {(formData.inspectorQualifications || '').split(', ').filter(Boolean).length > 0
                    ? `${(formData.inspectorQualifications || '').split(', ').filter(Boolean).length} selected`
                    : 'Tap to select qualifications'}
                </span>
                <span className="text-[11px] font-medium text-elec-yellow">Select</span>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                  {QUALIFICATIONS.map((q) => (
                    <button
                      key={q}
                      type="button"
                      disabled={formData.sameAsConstructor}
                      onClick={() => toggleQualification('inspector', q)}
                      className={cn(
                        'min-h-11 rounded-xl px-2 py-1.5 text-xs transition-all touch-manipulation active:scale-[0.98]',
                        (formData.inspectorQualifications || '').includes(q) ? chipOn : chipOff,
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            <FormField label="Date">
              <Input
                type="date"
                value={formData.inspectorDate || ''}
                onChange={(e) => onUpdate('inspectorDate', e.target.value)}
                disabled={formData.sameAsConstructor}
                className={inputCn}
              />
            </FormField>
            <FormField label="BS 7671:2018 amended to (date)">
              <Input
                type="date"
                value={formData.inspectorBs7671Date || ''}
                onChange={(e) => onUpdate('inspectorBs7671Date', e.target.value)}
                disabled={formData.sameAsConstructor}
                className={inputCn}
              />
            </FormField>
          </div>

          <div data-field="inspectorSignature">
            <SignatureInput
              value={formData.inspectorSignature}
              onChange={(signature) => onUpdate('inspectorSignature', signature)}
              placeholder="Inspector signature"
              required={true}
            />
          </div>
        </div>
      </div>

      {/* ── DEPARTURES ── */}
      <div className={cardCn}>
        <h2 className="mb-3 text-[15px] font-semibold tracking-tight text-white">Departures from BS 7671</h2>
        <FormField label="Departures (Regs 120.3, 133.1.2, 133.1.3, 133.5)">
          <div className="flex gap-2">
            <Input
              value={formData.designerDepartures || ''}
              onChange={(e) => onUpdate('designerDepartures', e.target.value)}
              placeholder="Enter departures or tap None"
              className={cn(inputCn, 'flex-1')}
            />
            <button
              type="button"
              onClick={() => {
                haptic.light();
                onUpdate('designerDepartures', 'None');
              }}
              className={cn(
                'h-11 px-4 rounded-xl text-sm touch-manipulation active:scale-[0.98] shrink-0 transition-all',
                formData.designerDepartures === 'None' ? chipOn : chipOff
              )}
            >
              None
            </button>
          </div>
        </FormField>
        <FormField label="Permitted exceptions (Reg 411.3.3)">
          <div className="flex gap-2">
            <Input
              value={formData.permittedExceptions || ''}
              onChange={(e) => onUpdate('permittedExceptions', e.target.value)}
              placeholder="Enter exceptions or tap None"
              className={cn(inputCn, 'flex-1')}
            />
            <button
              type="button"
              onClick={() => {
                haptic.light();
                onUpdate('permittedExceptions', 'None');
              }}
              className={cn(
                'h-11 px-4 rounded-xl text-sm touch-manipulation active:scale-[0.98] shrink-0 transition-all',
                formData.permittedExceptions === 'None' ? chipOn : chipOff
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
            'w-full min-h-11 rounded-xl text-sm touch-manipulation active:scale-[0.98] transition-all',
            formData.riskAssessmentAttached ? chipOn : chipOff
          )}
        >
          Risk assessment attached {formData.riskAssessmentAttached ? '✓' : ''}
        </button>
      </div>

      {/* ── NEXT INSPECTION ── */}
      <div className={cardCn}>
        <h2 className="mb-3 text-[15px] font-semibold tracking-tight text-white">Next inspection</h2>
        <div className="grid grid-cols-4 gap-2">
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
                'min-h-11 rounded-xl text-xs touch-manipulation active:scale-[0.98] transition-all',
                String(formData.nextInspectionInterval) === String(preset.months) ? chipOn : chipOff
              )}
            >
              {preset.label}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <FormField label="Interval (months)">
            <Input
              type="text"
              inputMode="numeric"
              value={formData.nextInspectionInterval || ''}
              onChange={(e) => onUpdate('nextInspectionInterval', e.target.value)}
              placeholder="e.g., 60"
              className={inputCn}
            />
          </FormField>
          <FormField label="Next date">
            <Input
              type="date"
              value={formData.nextInspectionDate || ''}
              onChange={(e) => onUpdate('nextInspectionDate', e.target.value)}
              className={inputCn}
            />
          </FormField>
        </div>
      </div>
    </div>
  );
};

export default EICDeclarations;
