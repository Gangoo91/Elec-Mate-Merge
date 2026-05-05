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
  InstallationMethodInputs,
  InstallationType,
  INSTALLATION_TYPE_OPTIONS,
} from '@/types/installation-method-inputs';

interface InstallationBriefingProps {
  inputs: InstallationMethodInputs;
  onPatch: (patch: Partial<InstallationMethodInputs>) => void;
  onGenerate: () => Promise<void>;
  isProcessing: boolean;
}

const MIN_DESCRIPTION = 50;

export const InstallationBriefing = ({
  inputs,
  onPatch,
  onGenerate,
  isProcessing,
}: InstallationBriefingProps) => {
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
      {/* 01 — DESCRIPTION (hero) */}
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
          Brief the install.
        </h2>
        <p className="text-[13.5px] text-white/75 leading-relaxed max-w-2xl">
          Tell the engineer what you&rsquo;re fitting and where. Drop in drawings, photos and
          datasheets so the AI can read them too.
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
            placeholder="e.g., Install a 7.4 kW EV charger on the front of a 1930s semi. Cable run is approx 12 m through the loft and down a stud wall to a Type 2 socket beside the driveway. Existing TT earth, 100 A main switch, 22 kVA service. Owner wants OZEV grant and load-curtailment via the hub..."
            disabled={isProcessing}
            rows={7}
            className="w-full bg-transparent border-0 ring-0 focus:ring-0 focus:outline-none text-[15px] sm:text-[16px] text-white placeholder:text-white/35 resize-none touch-manipulation leading-relaxed"
            style={{ fontSize: '16px' }}
          />
          <div className="pt-3 mt-3 border-t border-white/[0.06] flex items-baseline justify-between text-[11px]">
            <span className="text-white/55">
              {hasAttachment
                ? 'Attachment counts as the brief — extra detail still helps'
                : `${MIN_DESCRIPTION} chars minimum, or upload a drawing below`}
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
          <Eyebrow>03 · DETAILS</Eyebrow>
          <h3 className="text-[20px] sm:text-[24px] font-semibold tracking-tight leading-tight text-white">
            A few more details.
          </h3>
          <p className="text-[12.5px] text-white/65 leading-snug max-w-2xl">
            Optional but useful. Skip what you don&rsquo;t know.
          </p>
        </div>

        {/* Installation type */}
        <div className="space-y-2">
          <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55">
            Installation type
          </span>
          <div className="grid grid-cols-3 gap-2">
            {INSTALLATION_TYPE_OPTIONS.map((opt) => {
              const isActive = inputs.installationType === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => onPatch({ installationType: opt.value as InstallationType })}
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

        {/* Project name + location */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <IOSInput
            label="Project name"
            value={inputs.projectName}
            onChange={(e) => onPatch({ projectName: e.target.value })}
            placeholder="e.g., 24 Maple Drive EV install"
            disabled={isProcessing}
          />
          <IOSInput
            label="Site address"
            value={inputs.location}
            onChange={(e) => onPatch({ location: e.target.value })}
            placeholder="e.g., Manchester, M1 1AA"
            disabled={isProcessing}
          />
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
              placeholder="e.g., John Smith"
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

        {/* Start date */}
        <div className="space-y-2">
          <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55">
            Expected start
          </span>
          <input
            type="date"
            value={inputs.expectedStartDate ?? ''}
            onChange={(e) => onPatch({ expectedStartDate: e.target.value })}
            disabled={isProcessing}
            className="w-full h-12 bg-[hsl(0_0%_10%)] border border-white/[0.10] rounded-xl px-4 text-[15px] text-white focus:border-elec-yellow/50 focus:outline-none touch-manipulation disabled:opacity-50"
            style={{ fontSize: '16px' }}
          />
        </div>

        {/* Notes */}
        <div className="space-y-2">
          <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55">
            Notes (optional)
          </span>
          <textarea
            value={inputs.additionalNotes ?? ''}
            onChange={(e) => onPatch({ additionalNotes: e.target.value })}
            placeholder="Access constraints, isolation arrangements, who&rsquo;s on site, anything else worth flagging..."
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
