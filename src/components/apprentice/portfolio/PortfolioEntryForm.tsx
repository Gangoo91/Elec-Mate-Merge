import { useState } from 'react';
import { Check, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { FormSheet } from '@/components/forms/FormSheet';
import { SelectField } from '@/components/forms/SelectField';
import {
  buttonPrimaryCn,
  buttonSecondaryCn,
  checkLineCn,
  checkboxCn,
  chipBase,
  chipOff,
  grid2Cn,
  inputCn,
  labelCn,
  textareaCn,
} from '@/components/forms/fieldStyles';
import { Checkbox } from '@/components/ui/checkbox';
import { PortfolioEntry, PortfolioCategory, PortfolioFile, EvidenceType } from '@/types/portfolio';
import { cn } from '@/lib/utils';
import { EvidenceUploader } from '@/components/apprentice/shared/EvidenceUploader';
import { EvidenceRequirementsGuide } from '@/components/apprentice/portfolio/EvidenceRequirementsGuide';
import { useMediaQuery } from '@/hooks/use-media-query';
import { SingleSelectWithAdd } from '@/components/ui/single-select-with-add';
import { useStudentQualification } from '@/hooks/useStudentQualification';
import { ACPickerSheet } from '@/components/apprentice/portfolio/ACPickerSheet';

export interface PortfolioEntryFormProps {
  categories: PortfolioCategory[];
  initialData?: PortfolioEntry;
  onSubmit: (data: Partial<PortfolioEntry>) => void;
  onCancel: () => void;
}

// Pre-defined options for dropdowns
const SKILLS_OPTIONS = [
  { value: 'circuit-analysis', label: 'Circuit Analysis' },
  { value: 'electrical-testing', label: 'Electrical Testing' },
  { value: 'wiring-installation', label: 'Wiring Installation' },
  { value: 'fault-finding', label: 'Fault Finding' },
  { value: 'health-safety', label: 'Health & Safety' },
  { value: 'conduit-installation', label: 'Conduit Installation' },
  { value: 'panel-wiring', label: 'Panel Wiring' },
  { value: 'motor-control', label: 'Motor Control' },
  { value: 'plc-programming', label: 'PLC Programming' },
  { value: 'cable-management', label: 'Cable Management' },
  { value: 'earthing-bonding', label: 'Earthing & Bonding' },
  { value: 'emergency-lighting', label: 'Emergency Lighting' },
  { value: 'fire-alarm-systems', label: 'Fire Alarm Systems' },
  { value: 'security-systems', label: 'Security Systems' },
  { value: 'data-cabling', label: 'Data Cabling' },
];

const TAGS_OPTIONS = [
  { value: 'practical', label: 'Practical Work' },
  { value: 'theory', label: 'Theory' },
  { value: 'workplace', label: 'Workplace Learning' },
  { value: 'college', label: 'College Project' },
  { value: 'assessment', label: 'Assessment' },
  { value: 'teamwork', label: 'Teamwork' },
  { value: 'problem-solving', label: 'Problem Solving' },
  { value: 'documentation', label: 'Documentation' },
  { value: 'presentation', label: 'Presentation' },
  { value: 'research', label: 'Research' },
  { value: 'innovation', label: 'Innovation' },
  { value: 'leadership', label: 'Leadership' },
];

const AWARDING_BODY_STANDARDS_OPTIONS = [
  { value: 'bs7671', label: 'BS 7671:2018+A4:2026 — Wiring Regulations' },
  { value: 'bs5839', label: 'BS 5839 — Fire detection and alarm systems' },
  { value: 'bs6651', label: 'BS EN 62305 — Protection against lightning' },
  { value: 'bs5266', label: 'BS 5266 — Emergency lighting' },
  { value: 'iet-guidance', label: 'IET Guidance Notes' },
  { value: 'city-guilds-2365', label: 'City & Guilds 2365' },
  { value: 'eal-electrical', label: 'EAL Electrical Installation' },
  { value: 'btec-electrical', label: 'BTEC Electrical Engineering' },
];

const EVIDENCE_TYPE_OPTIONS: { value: EvidenceType; label: string }[] = [
  { value: 'observation', label: 'Observation' },
  { value: 'work-product', label: 'Work product' },
  { value: 'witness-testimony', label: 'Witness testimony' },
  { value: 'professional-discussion', label: 'Professional discussion' },
  { value: 'photo', label: 'Photo' },
  { value: 'reflective-account', label: 'Reflective account' },
];

const AREA_CLS = cn(textareaCn, 'w-full resize-none');

// Wizard steps configuration
const WIZARD_STEPS = [
  { id: 'basics', title: 'Basics', shortTitle: 'Basics' },
  { id: 'skills', title: 'Skills & Outcomes', shortTitle: 'Skills' },
  { id: 'evidence', title: 'Evidence', shortTitle: 'Evidence' },
  { id: 'reflection', title: 'Reflection', shortTitle: 'Reflect' },
];

const PortfolioEntryForm = ({
  categories,
  initialData,
  onSubmit,
  onCancel,
}: PortfolioEntryFormProps) => {
  const isMobile = useMediaQuery('(max-width: 640px)');
  const { qualificationCode } = useStudentQualification();
  const [currentStep, setCurrentStep] = useState(0);
  const [showACPicker, setShowACPicker] = useState(false);
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    categoryId: initialData?.category.id || '',
    reflection: initialData?.reflection || '',
    skills: initialData?.skills || [],
    tags: initialData?.tags || [],
    assessmentCriteria: initialData?.assessmentCriteria || [],
    learningOutcomes: initialData?.learningOutcomes || [],
    supervisorFeedback: initialData?.supervisorFeedback || '',
    selfAssessment: initialData?.selfAssessment || 3,
    status: initialData?.status || ('draft' as const),
    timeSpent: initialData?.timeSpent || 0,
    awardingBodyStandards: initialData?.awardingBodyStandards || [],
    evidenceFiles: initialData?.evidenceFiles || ([] as PortfolioFile[]),
    // Assessor-ready metadata
    workDate: initialData?.metadata?.workDate || '',
    siteRef: initialData?.metadata?.siteRef || '',
    role: initialData?.metadata?.role || '',
    evidenceType: (initialData?.metadata?.evidenceType || '') as EvidenceType | '',
    witnessName: initialData?.metadata?.witness?.name || '',
    witnessRole: initialData?.metadata?.witness?.role || '',
    witnessDate: initialData?.metadata?.witness?.date || '',
    authenticityConfirmed: initialData?.metadata?.authenticityConfirmed || false,
  });

  const handleSubmit = () => {
    const selectedCategory = categories.find((cat) => cat.id === formData.categoryId);
    if (!selectedCategory) return;

    const {
      workDate,
      siteRef,
      role,
      evidenceType,
      witnessName,
      witnessRole,
      witnessDate,
      authenticityConfirmed,
      ...rest
    } = formData;

    const witness =
      witnessName.trim() || witnessRole.trim() || witnessDate
        ? {
            name: witnessName.trim() || undefined,
            role: witnessRole.trim() || undefined,
            date: witnessDate || undefined,
          }
        : undefined;

    const submitData: Partial<PortfolioEntry> = {
      ...rest,
      category: selectedCategory,
      dateCreated: initialData?.dateCreated || new Date().toISOString(),
      evidenceFiles: rest.evidenceFiles,
      metadata: {
        ...(initialData?.metadata || {}),
        workDate: workDate || undefined,
        siteRef: siteRef.trim() || undefined,
        role: role.trim() || undefined,
        evidenceType: (evidenceType || undefined) as EvidenceType | undefined,
        witness,
        authenticityConfirmed: authenticityConfirmed || undefined,
      },
      ...(formData.status === 'completed' &&
        !initialData?.dateCompleted && {
          dateCompleted: new Date().toISOString(),
        }),
    };

    onSubmit(submitData);
  };

  const handleFilesChange = (files: PortfolioFile[]) => {
    setFormData((prev) => ({ ...prev, evidenceFiles: files }));
  };

  const categoryOptions = categories.map((cat) => ({
    value: cat.id,
    label: cat.name,
  }));

  const statusOptions = [
    { value: 'draft', label: 'Draft' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
    { value: 'reviewed', label: 'Reviewed' },
  ];

  const selfAssessmentOptions = [
    { value: '1', label: '1 - Poor' },
    { value: '2', label: '2 - Below Average' },
    { value: '3', label: '3 - Average' },
    { value: '4', label: '4 - Good' },
    { value: '5', label: '5 - Excellent' },
  ];

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return formData.title.trim() && formData.categoryId && formData.description.trim();
      case 1:
        return true; // Skills are optional
      case 2:
        return true; // Evidence is optional
      case 3:
        return formData.reflection.trim();
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (currentStep < WIZARD_STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const set = <K extends keyof typeof formData>(key: K, value: (typeof formData)[K]) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  // Cert-style step tabs: the word carries the state, a 2px volt rule marks the
  // current step, done steps read in volt. No dots, no green.
  const stepTabs = (
    <nav className="flex" aria-label="Steps">
      {WIZARD_STEPS.map((step, idx) => {
        const active = idx === currentStep;
        const done = idx < currentStep;
        return (
          <button
            key={step.id}
            type="button"
            onClick={() => setCurrentStep(idx)}
            aria-current={active ? 'step' : undefined}
            className={cn(
              'flex h-11 flex-1 items-center justify-center text-[13px] font-semibold touch-manipulation lg:text-sm',
              done ? 'text-elec-yellow' : 'text-white'
            )}
          >
            <span
              className={cn(
                'border-b-2 px-1 pb-2.5 pt-3',
                active ? 'border-elec-yellow' : 'border-transparent'
              )}
            >
              {step.shortTitle}
            </span>
          </button>
        );
      })}
    </nav>
  );

  const basicsStep = (
    <>
      <div>
        <label className={labelCn} htmlFor="pe-title">
          Entry title
        </label>
        <Input
          id="pe-title"
          value={formData.title}
          onChange={(e) => set('title', e.target.value)}
          placeholder="e.g. Three-phase motor installation"
          className={inputCn}
          required
        />
      </div>

      <div>
        <label className={labelCn}>Category</label>
        <SelectField
          value={formData.categoryId}
          onValueChange={(value) => set('categoryId', value)}
          placeholder="Select category"
          title="Category"
          options={categoryOptions}
        />
        <p className="mt-1.5 text-[11.5px] leading-snug text-white">
          Choose the most relevant category for this work.
        </p>
      </div>

      <div>
        <label className={labelCn} htmlFor="pe-description">
          Description
        </label>
        <textarea
          id="pe-description"
          value={formData.description}
          onChange={(e) => set('description', e.target.value)}
          placeholder="What you did and what you learned"
          rows={4}
          className={AREA_CLS}
          required
        />
      </div>

      <div className={grid2Cn}>
        <div>
          <label className={labelCn}>Status</label>
          <SelectField
            value={formData.status}
            onValueChange={(value) => set('status', value as typeof formData.status)}
            placeholder="Select status"
            title="Status"
            options={statusOptions}
          />
        </div>
        <div>
          <label className={labelCn} htmlFor="pe-time">
            Time spent (minutes)
          </label>
          <Input
            id="pe-time"
            type="number"
            min="0"
            inputMode="numeric"
            value={formData.timeSpent}
            onChange={(e) => set('timeSpent', parseInt(e.target.value) || 0)}
            className={inputCn}
          />
        </div>
      </div>
    </>
  );

  const skillsStep = (
    <>
      <SingleSelectWithAdd
        label="Skills demonstrated"
        placeholder="Select a skill"
        value={formData.skills}
        onValueChange={(value) => set('skills', value)}
        options={SKILLS_OPTIONS}
        hint="Add electrical skills you used or developed"
      />

      <div>
        <label className={labelCn}>Assessment criteria</label>
        <button
          type="button"
          onClick={() => setShowACPicker(true)}
          className={cn(buttonSecondaryCn, 'flex w-full items-center justify-between px-4')}
        >
          <span className="text-[14px]">
            {formData.assessmentCriteria.length > 0
              ? `${formData.assessmentCriteria.length} criteria selected`
              : 'Select assessment criteria'}
          </span>
          <ChevronRight className="h-4 w-4 text-white" />
        </button>
        {formData.assessmentCriteria.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {formData.assessmentCriteria.slice(0, 6).map((ac) => (
              <span
                key={ac}
                className="inline-flex h-8 items-center rounded-lg border border-elec-yellow/50 px-2.5 font-mono text-[11px] text-elec-yellow"
              >
                {ac}
              </span>
            ))}
            {formData.assessmentCriteria.length > 6 && (
              <span className="inline-flex h-8 items-center rounded-lg border border-white/[0.14] px-2.5 text-[11px] text-white">
                +{formData.assessmentCriteria.length - 6} more
              </span>
            )}
          </div>
        )}
        <p className="mt-1.5 text-[11.5px] leading-snug text-white">
          Browse your qualification&rsquo;s units and pick the criteria this work demonstrates.
        </p>
      </div>

      <SingleSelectWithAdd
        label="Tags"
        placeholder="Select a tag"
        value={formData.tags}
        onValueChange={(value) => set('tags', value)}
        options={TAGS_OPTIONS}
        hint="Add tags to help categorise your work"
      />

      <SingleSelectWithAdd
        label="Standards & regulations"
        placeholder="Select a standard or regulation"
        value={formData.awardingBodyStandards}
        onValueChange={(value) => set('awardingBodyStandards', value)}
        options={AWARDING_BODY_STANDARDS_OPTIONS}
        hint="Add the standards this work was carried out to"
      />

      <ACPickerSheet
        open={showACPicker}
        onOpenChange={setShowACPicker}
        requirementCode={qualificationCode}
        selectedACs={formData.assessmentCriteria}
        onDone={(acs) => set('assessmentCriteria', acs)}
      />
    </>
  );

  const evidenceStep = (
    <>
      {/* PortfolioFile carries no File object, so the old `f.file` map was
          always an empty list — the guide never saw an upload. */}
      {formData.categoryId && (
        <EvidenceRequirementsGuide categoryId={formData.categoryId} compact={isMobile} />
      )}

      <div>
        <label className={labelCn}>Evidence files</label>
        <EvidenceUploader
          files={formData.evidenceFiles}
          onFilesChange={handleFilesChange}
          entryId={initialData?.id}
          maxFiles={10}
        />
        <p className="mt-1.5 text-[11.5px] leading-snug text-white">
          Photos, documents or videos of your work. Up to 10 files, 10MB each.
        </p>
      </div>
    </>
  );

  const reflectionStep = (
    <>
      <div>
        <label className={labelCn}>Self assessment</label>
        <SelectField
          value={formData.selfAssessment.toString()}
          onValueChange={(value) => set('selfAssessment', parseInt(value))}
          placeholder="Rate your performance"
          title="Self assessment"
          options={selfAssessmentOptions}
        />
      </div>

      <div>
        <label className={labelCn} htmlFor="pe-reflection">
          Reflection
        </label>
        <textarea
          id="pe-reflection"
          value={formData.reflection}
          onChange={(e) => set('reflection', e.target.value)}
          placeholder="What you learned, what was hard, and what you would do differently"
          rows={5}
          className={AREA_CLS}
          required
        />
      </div>

      <div>
        <label className={labelCn} htmlFor="pe-feedback">
          Supervisor feedback (optional)
        </label>
        <textarea
          id="pe-feedback"
          value={formData.supervisorFeedback}
          onChange={(e) => set('supervisorFeedback', e.target.value)}
          placeholder="Any feedback from your supervisor or assessor"
          rows={3}
          className={AREA_CLS}
        />
      </div>

      {/* Work details — assessor-ready metadata (all optional) */}
      <div className="space-y-4 border-t border-white/[0.1] pt-4">
        <h3 className="text-sm font-semibold text-white">Work details</h3>

        <div className={grid2Cn}>
          <div>
            <label className={labelCn} htmlFor="pe-workdate">
              Date of work
            </label>
            <Input
              id="pe-workdate"
              type="date"
              value={formData.workDate}
              onChange={(e) => set('workDate', e.target.value)}
              className={inputCn}
            />
          </div>
          <div>
            <label className={labelCn} htmlFor="pe-siteref">
              Site / job reference
            </label>
            <Input
              id="pe-siteref"
              type="text"
              value={formData.siteRef}
              onChange={(e) => set('siteRef', e.target.value)}
              placeholder="e.g. 14 Mill Lane rewire"
              className={inputCn}
            />
          </div>
        </div>

        <div>
          <label className={labelCn} htmlFor="pe-role">
            What you personally did
          </label>
          <textarea
            id="pe-role"
            value={formData.role}
            onChange={(e) => set('role', e.target.value)}
            placeholder="Your own role on this job — what you carried out, not the team’s"
            rows={2}
            className={AREA_CLS}
          />
        </div>

        <div>
          <label className={labelCn}>Type of evidence</label>
          <SelectField
            value={formData.evidenceType}
            onValueChange={(value) => set('evidenceType', value as EvidenceType)}
            placeholder="Select type"
            title="Type of evidence"
            options={EVIDENCE_TYPE_OPTIONS}
          />
        </div>

        <div className={grid2Cn}>
          <div>
            <label className={labelCn} htmlFor="pe-witness">
              Witness name
            </label>
            <Input
              id="pe-witness"
              type="text"
              value={formData.witnessName}
              onChange={(e) => set('witnessName', e.target.value)}
              placeholder="Name"
              className={inputCn}
            />
          </div>
          <div>
            <label className={labelCn} htmlFor="pe-witness-role">
              Witness role
            </label>
            <Input
              id="pe-witness-role"
              type="text"
              value={formData.witnessRole}
              onChange={(e) => set('witnessRole', e.target.value)}
              placeholder="e.g. supervisor"
              className={inputCn}
            />
          </div>
        </div>
        <div>
          <label className={labelCn} htmlFor="pe-witness-date">
            Date witnessed
          </label>
          <Input
            id="pe-witness-date"
            type="date"
            value={formData.witnessDate}
            onChange={(e) => set('witnessDate', e.target.value)}
            className={inputCn}
          />
        </div>

        <label className={checkLineCn}>
          <Checkbox
            checked={formData.authenticityConfirmed}
            onCheckedChange={(v) => set('authenticityConfirmed', v === true)}
            className={checkboxCn}
          />
          <span className="text-sm leading-relaxed text-white">
            I confirm this is my own work and an accurate record of what I did.
          </span>
        </label>
      </div>
    </>
  );

  const steps = [basicsStep, skillsStep, evidenceStep, reflectionStep];
  const last = currentStep === WIZARD_STEPS.length - 1;

  const footer = (
    <div className="grid grid-cols-2 gap-2.5">
      {currentStep > 0 ? (
        <button type="button" onClick={prevStep} className={buttonSecondaryCn}>
          Back
        </button>
      ) : (
        <button type="button" onClick={onCancel} className={buttonSecondaryCn}>
          Cancel
        </button>
      )}
      {last ? (
        <button
          type="button"
          onClick={() => handleSubmit()}
          disabled={!canProceed()}
          className={cn(buttonPrimaryCn, 'inline-flex items-center justify-center gap-2')}
        >
          <Check className="h-4 w-4" />
          {initialData ? 'Save changes' : 'Create entry'}
        </button>
      ) : (
        <button
          type="button"
          onClick={nextStep}
          disabled={!canProceed()}
          className={buttonPrimaryCn}
        >
          Continue to {WIZARD_STEPS[currentStep + 1].shortTitle}
        </button>
      )}
    </div>
  );

  return (
    <FormSheet
      open
      onOpenChange={(v) => {
        if (!v) onCancel();
      }}
      eyebrow="Portfolio"
      title={initialData ? 'Edit portfolio entry' : 'New portfolio entry'}
      headerTrailing={
        <span className="text-[12px] tabular-nums text-white">
          Step {currentStep + 1} of {WIZARD_STEPS.length}
        </span>
      }
      subheader={stepTabs}
      footer={footer}
    >
      <div key={currentStep} className="space-y-5 py-2 motion-safe:animate-mw-step-in">
        {steps[currentStep]}
      </div>
    </FormSheet>
  );
};

export default PortfolioEntryForm;
