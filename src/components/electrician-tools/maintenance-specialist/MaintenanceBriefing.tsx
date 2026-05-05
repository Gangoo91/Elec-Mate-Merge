import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Eyebrow } from '@/components/college/primitives';
import { cn } from '@/lib/utils';
import { IOSInput } from '@/components/ui/ios-input';
import ClientSelector from '@/components/ClientSelector';
import { Customer } from '@/hooks/inspection/useCustomers';
import { AttachmentZone } from '@/components/electrician-tools/cost-engineer/AttachmentZone';
import { useCostAttachments } from '@/hooks/useCostAttachments';
import {
  MaintenanceMethodInputs,
  MaintenanceInstallationType,
  MaintenanceFrequency,
  MaintenanceCriticality,
  MAINTENANCE_INSTALLATION_OPTIONS,
  MAINTENANCE_FREQUENCY_OPTIONS,
  MAINTENANCE_CRITICALITY_OPTIONS,
} from '@/types/maintenance-method-inputs';

interface MaintenanceBriefingProps {
  inputs: MaintenanceMethodInputs;
  onPatch: (patch: Partial<MaintenanceMethodInputs>) => void;
  onGenerate: () => Promise<void>;
  isProcessing: boolean;
}

const MIN_DESCRIPTION = 50;

export const MaintenanceBriefing = ({
  inputs,
  onPatch,
  onGenerate,
  isProcessing,
}: MaintenanceBriefingProps) => {
  const { attachments, uploading, uploadMany, remove } = useCostAttachments();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const isUploading = uploading.length > 0;
  const hasDescription = inputs.description.trim().length >= MIN_DESCRIPTION;
  const hasAttachment = attachments.length > 0;
  const canGenerate = (hasDescription || hasAttachment) && !isUploading;

  const handleGenerate = async () => {
    if (!canGenerate || isProcessing) return;
    onPatch({ attachments });
    await onGenerate();
  };

  return (
    <div className="space-y-7 sm:space-y-9 pb-32 sm:pb-12">
      {/* 01 — DESCRIPTION */}
      <section className="space-y-3">
        <div className="flex items-baseline justify-between gap-3">
          <Eyebrow>01 · BRIEFING</Eyebrow>
          <span
            className={cn(
              'text-[11px] tabular-nums',
              inputs.description.length >= MIN_DESCRIPTION ? 'text-emerald-400/70' : 'text-white/45'
            )}
          >
            {inputs.description.length} chars
          </span>
        </div>
        <h2 className="text-[24px] sm:text-[30px] font-semibold tracking-tight leading-[1.1] text-white">
          What needs maintaining.
        </h2>
        <p className="text-[13.5px] text-white/75 leading-relaxed max-w-2xl">
          Describe the asset, the scope of this visit, and anything specific the engineer needs to
          know. Drop in asset register sheets, nameplate photos and prior EICR PDFs.
        </p>

        <div
          className={cn(
            'relative -mx-4 sm:mx-0 bg-[hsl(0_0%_10%)] border-y sm:border sm:rounded-2xl py-4 px-4 sm:p-5 transition-colors',
            inputs.description.length >= MIN_DESCRIPTION
              ? 'border-elec-yellow/40'
              : 'border-white/[0.10] hover:border-white/15'
          )}
        >
          <textarea
            ref={textareaRef}
            value={inputs.description}
            onChange={(e) => onPatch({ description: e.target.value })}
            placeholder="e.g., Annual service of a Hager 18-way TP&N distribution board feeding the kitchen and back-of-house at a 1980s commercial unit. RCBO-protected throughout, last EICR Apr 2024 with C2 on damaged glanding to the chest freezer feed. Want full functional test, thermographic scan, RCBO timing, board legend update, and a refreshed condition report..."
            disabled={isProcessing}
            rows={7}
            className="w-full bg-transparent border-0 ring-0 focus:ring-0 focus:outline-none text-[15px] sm:text-[16px] text-white placeholder:text-white/35 resize-none touch-manipulation leading-relaxed"
            style={{ fontSize: '16px' }}
          />
          <div className="pt-3 mt-3 border-t border-white/[0.06] flex items-baseline justify-between text-[11px]">
            <span className="text-white/55">
              {hasAttachment
                ? 'Attachment counts as the brief — extra detail still helps'
                : `${MIN_DESCRIPTION} chars minimum, or upload an asset sheet below`}
            </span>
            {(hasDescription || hasAttachment) && (
              <span className="text-emerald-400/80 uppercase tracking-[0.18em] font-semibold text-[10px]">
                Ready
              </span>
            )}
          </div>
        </div>
      </section>

      {/* 02 — ATTACHMENTS */}
      <section>
        <AttachmentZone
          attachments={attachments}
          uploading={uploading}
          onAdd={uploadMany}
          onRemove={remove}
          disabled={isProcessing}
        />
      </section>

      {/* 03 — DETAILS */}
      <section className="space-y-5">
        <div className="space-y-2">
          <Eyebrow>03 · ASSET</Eyebrow>
          <h3 className="text-[20px] sm:text-[24px] font-semibold tracking-tight leading-tight text-white">
            Asset & site detail.
          </h3>
          <p className="text-[12.5px] text-white/65 leading-snug max-w-2xl">
            Optional but helpful — feeds the AI specific facets and the printed cover page.
          </p>
        </div>

        {/* Installation type */}
        <div className="space-y-2">
          <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55">
            Site type
          </span>
          <div className="grid grid-cols-3 gap-2">
            {MAINTENANCE_INSTALLATION_OPTIONS.map((opt) => {
              const isActive = inputs.installationType === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() =>
                    onPatch({ installationType: opt.value as MaintenanceInstallationType })
                  }
                  disabled={isProcessing}
                  className={cn(
                    'h-14 px-3 rounded-xl text-left border transition-colors touch-manipulation flex flex-col justify-center disabled:opacity-50',
                    isActive
                      ? 'bg-elec-yellow/10 border-elec-yellow/50'
                      : 'bg-[hsl(0_0%_10%)] border-white/[0.10] hover:border-white/20'
                  )}
                >
                  <span
                    className={cn(
                      'text-[13px] font-medium leading-tight',
                      isActive ? 'text-elec-yellow' : 'text-white/85'
                    )}
                  >
                    {opt.label}
                  </span>
                  <span className="text-[10.5px] text-white/45 leading-tight">{opt.blurb}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Project + equipment */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <IOSInput
            label="Project / asset name"
            value={inputs.projectName}
            onChange={(e) => onPatch({ projectName: e.target.value })}
            placeholder="e.g., Maple House MCC annual service"
            disabled={isProcessing}
          />
          <IOSInput
            label="Equipment type"
            value={inputs.equipmentType}
            onChange={(e) => onPatch({ equipmentType: e.target.value })}
            placeholder="e.g., 18-way TP&N consumer unit"
            disabled={isProcessing}
          />
          <IOSInput
            label="Make / model"
            value={inputs.equipmentMakeModel}
            onChange={(e) => onPatch({ equipmentMakeModel: e.target.value })}
            placeholder="e.g., Hager VML118MUR"
            disabled={isProcessing}
          />
          <IOSInput
            label="Site address"
            value={inputs.location}
            onChange={(e) => onPatch({ location: e.target.value })}
            placeholder="e.g., Manchester, M1 1AA"
            disabled={isProcessing}
          />
          <IOSInput
            label="Approx age"
            value={inputs.ageYears ?? ''}
            onChange={(e) => onPatch({ ageYears: e.target.value })}
            placeholder="e.g., 12 years"
            disabled={isProcessing}
          />
        </div>

        {/* Frequency */}
        <div className="space-y-2">
          <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55">
            Planned frequency
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {MAINTENANCE_FREQUENCY_OPTIONS.map((opt) => {
              const isActive = inputs.frequency === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => onPatch({ frequency: opt.value as MaintenanceFrequency })}
                  disabled={isProcessing}
                  className={cn(
                    'h-11 px-3 rounded-xl text-[12.5px] font-medium border transition-colors touch-manipulation disabled:opacity-50',
                    isActive
                      ? 'bg-elec-yellow/10 border-elec-yellow/50 text-elec-yellow'
                      : 'bg-[hsl(0_0%_10%)] border-white/[0.10] text-white/80 hover:border-white/20'
                  )}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Criticality */}
        <div className="space-y-2">
          <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55">
            Criticality
          </span>
          <div className="grid grid-cols-2 gap-2">
            {MAINTENANCE_CRITICALITY_OPTIONS.map((opt) => {
              const isActive = inputs.criticality === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => onPatch({ criticality: opt.value as MaintenanceCriticality })}
                  disabled={isProcessing}
                  className={cn(
                    'h-14 px-3 rounded-xl text-left border transition-colors touch-manipulation flex flex-col justify-center disabled:opacity-50',
                    isActive
                      ? 'bg-elec-yellow/10 border-elec-yellow/50'
                      : 'bg-[hsl(0_0%_10%)] border-white/[0.10] hover:border-white/20'
                  )}
                >
                  <span
                    className={cn(
                      'text-[13px] font-medium leading-tight',
                      isActive ? 'text-elec-yellow' : 'text-white/85'
                    )}
                  >
                    {opt.label}
                  </span>
                  <span className="text-[10.5px] text-white/45 leading-tight">{opt.blurb}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Client */}
        <div className="space-y-2">
          <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55">
            Client
          </span>
          <ClientSelector
            onSelectCustomer={(customer: Customer | null) => {
              if (customer) {
                onPatch({
                  clientName: customer.name,
                  clientContact: customer.phone ?? inputs.clientContact,
                  location: customer.address ?? inputs.location,
                  customerId: customer.id,
                });
              } else {
                onPatch({ customerId: undefined });
              }
            }}
            selectedCustomerId={inputs.customerId}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <IOSInput
              label="Client name"
              value={inputs.clientName}
              onChange={(e) => onPatch({ clientName: e.target.value })}
              placeholder="e.g., Acme Holdings Ltd"
              disabled={isProcessing}
            />
            <IOSInput
              label="Contact"
              value={inputs.clientContact ?? ''}
              onChange={(e) => onPatch({ clientContact: e.target.value })}
              placeholder="07700 900000"
              disabled={isProcessing}
            />
          </div>
        </div>

        {/* Notes */}
        <div className="space-y-2">
          <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55">
            Notes (optional)
          </span>
          <textarea
            value={inputs.additionalNotes ?? ''}
            onChange={(e) => onPatch({ additionalNotes: e.target.value })}
            placeholder="Access constraints, isolation arrangements, prior issues, anything else worth flagging..."
            rows={3}
            disabled={isProcessing}
            className="w-full bg-[hsl(0_0%_10%)] border border-white/[0.10] rounded-xl p-3 text-[13.5px] text-white placeholder:text-white/35 focus:border-elec-yellow/50 focus:outline-none resize-none touch-manipulation disabled:opacity-50"
            style={{ fontSize: '16px' }}
          />
        </div>
      </section>

      {/* Sticky generate */}
      <div className="pb-safe">
        <div className="sticky bottom-0 z-30 -mx-4 px-4 sm:mx-0 sm:px-0 py-3 sm:py-0 bg-elec-dark/95 backdrop-blur-sm border-t border-white/[0.06] sm:border-t-0 sm:bg-transparent">
          <motion.button
            type="button"
            onClick={handleGenerate}
            disabled={!canGenerate || isProcessing}
            whileTap={canGenerate && !isProcessing ? { scale: 0.98 } : undefined}
            className={cn(
              'w-full h-12 rounded-xl text-[14px] font-semibold inline-flex items-center justify-center gap-2 transition-colors touch-manipulation',
              canGenerate && !isProcessing
                ? 'bg-elec-yellow text-black hover:bg-elec-yellow/90'
                : 'bg-white/[0.05] text-white/40 cursor-not-allowed'
            )}
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-black/20 border-t-black" />
                <span>Generating</span>
              </>
            ) : isUploading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/20 border-t-white/60" />
                <span>Uploading attachments&hellip;</span>
              </>
            ) : (
              <>
                <span>Generate Method Statement</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
};
