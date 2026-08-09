/**
 * EquipmentDetailView — editorial detail panel for a single equipment record.
 *
 * SafetyMasthead + card-recipe sections, with status as the single colour
 * dimension. Preserves all equipment behaviours: mark tested / calibrated,
 * QR label, recent pre-use checks, warranty, notes, edit, delete and PDF export.
 *
 * Status and warranty state are DERIVED from the record's dates
 * (`deriveEquipmentStatus`), not read off the `status` column, which no code
 * path has ever written anything but `'good'` to.
 */

import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import { useSafetyPDFExport } from '@/hooks/useSafetyPDFExport';
import { usePreUseChecks, type PreUseCheck } from '@/hooks/usePreUseChecks';
import {
  deriveEquipmentStatus,
  deriveWarrantyState,
  equipmentDueDate,
  type SafetyEquipment,
  type WarrantyState,
} from '@/hooks/useSafetyEquipment';
import {
  Eyebrow,
  PrimaryButton,
  SecondaryButton,
  DestructiveButton,
  toneText,
  type Tone,
} from '@/components/college/primitives';
import { SafetyMasthead } from '../common/SafetyModuleShell';
import { EquipmentSection } from './EquipmentSection';
import { EquipmentQRCode } from './EquipmentQRCode';
import { equipmentCategories } from './EquipmentCategoryPicker';
import {
  EQUIPMENT_STATUS_LABEL,
  EQUIPMENT_STATUS_TONE,
  PILL_BASE,
  STATUS_PILL_CLASS,
  formatTestFrequency,
} from './equipmentStatus';

const WARRANTY_PILL: Record<Exclude<WarrantyState, 'none'>, { tone: Tone; label: string }> = {
  valid: { tone: 'emerald', label: 'Warranty valid' },
  expiring: { tone: 'amber', label: 'Warranty expiring' },
  expired: { tone: 'red', label: 'Warranty expired' },
};

function fmtDate(dateString: string | null | undefined): string {
  if (!dateString) return 'Not set';
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function DetailRow({ label, value, tone }: { label: string; value: string; tone?: Tone }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-[12px] text-white">{label}</span>
      {/* Was `TONE_PILL[tone].split(' ')[1]` — the text colour recovered by
          splitting a class string on spaces and taking whatever landed second.
          `toneText` is the token that class string was assembled from. */}
      <span className={cn('text-[12.5px] font-medium', tone ? toneText[tone] : 'text-white')}>
        {value}
      </span>
    </div>
  );
}

interface EquipmentDetailViewProps {
  equipment: SafetyEquipment;
  onBack: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onMarkInspected: () => void;
  onMarkCalibrated?: () => void;
  onSaveQrCode?: (id: string, qrValue: string) => void;
}

export function EquipmentDetailView({
  equipment,
  onBack,
  onEdit,
  onDelete,
  onMarkInspected,
  onMarkCalibrated,
  onSaveQrCode,
}: EquipmentDetailViewProps) {
  const { exportPDF, isExporting, exportingId } = useSafetyPDFExport();

  const { data: allChecks = [] } = usePreUseChecks();
  const recentChecks = useMemo(
    () => (allChecks as PreUseCheck[]).filter((c) => c.equipment_id === equipment.id).slice(0, 3),
    [allChecks, equipment.id]
  );

  // Both derived from the dates, not read off the `status` column — see the
  // note in useSafetyEquipment. This view previously showed a green "GOOD" pill
  // on kit months out of test, and its `status === 'overdue'` red highlight on
  // the next-test row could never fire because nothing writes that value.
  const status = deriveEquipmentStatus(equipment);
  const warrantyStatus = deriveWarrantyState(equipment);
  const dueDate = equipmentDueDate(equipment);
  const category = equipmentCategories.find((c) => c.id === equipment.category);
  const exporting = isExporting && exportingId === equipment.id;

  return (
    <div className="min-h-screen bg-[hsl(0_0%_7%)] pb-28">
      <SafetyMasthead onBack={onBack} backLabel="Equipment" moduleName={equipment.name} />

      <div className="mx-auto max-w-3xl px-4 py-4 space-y-4">
        {/* Identity */}
        <EquipmentSection eyebrow="Equipment">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h2 className="text-[18px] font-semibold text-white leading-tight">
                {equipment.name}
              </h2>
              <p className="mt-1 text-[12.5px] text-white">
                {category?.label || equipment.category}
                {equipment.serial_number ? ` · S/N ${equipment.serial_number}` : ''}
              </p>
            </div>
            <div className="flex flex-col items-end gap-1.5 shrink-0">
              <span className={cn(PILL_BASE, STATUS_PILL_CLASS[EQUIPMENT_STATUS_TONE[status]])}>
                {EQUIPMENT_STATUS_LABEL[status]}
              </span>
              {warrantyStatus !== 'none' && (
                <span
                  className={cn(
                    PILL_BASE,
                    'text-[9.5px] tracking-[0.1em]',
                    STATUS_PILL_CLASS[WARRANTY_PILL[warrantyStatus].tone]
                  )}
                >
                  {WARRANTY_PILL[warrantyStatus].label}
                </span>
              )}
            </div>
          </div>
          <div className="space-y-2 pt-1">
            <DetailRow label="Location" value={equipment.location || 'Not set'} />
            <DetailRow label="Serial number" value={equipment.serial_number || 'Not set'} />
          </div>
        </EquipmentSection>

        {/* Testing schedule */}
        <EquipmentSection eyebrow="Testing schedule">
          <div className="space-y-2">
            <DetailRow label="Last tested" value={fmtDate(equipment.last_inspection)} />
            <DetailRow
              label="Next test due"
              value={fmtDate(equipment.next_inspection)}
              tone={
                status === 'overdue' && dueDate === equipment.next_inspection
                  ? 'red'
                  : status === 'due_soon' && dueDate === equipment.next_inspection
                    ? 'amber'
                    : undefined
              }
            />
            <DetailRow
              label="Test frequency"
              value={formatTestFrequency(equipment.inspection_interval_days)}
            />
          </div>
          {/* Shown whenever a calibration date exists, not only when the
              `requires_calibration` flag is on — a due date that has been set is
              a commitment, and the overdue calculation counts it either way.
              Gating purely on the flag hid a live calibration date from the one
              screen that could act on it. */}
          {(equipment.requires_calibration || equipment.calibration_due) && (
            <div className="space-y-2 pt-2 mt-1 border-t border-white/[0.06]">
              <DetailRow label="Last calibration" value={fmtDate(equipment.last_calibration)} />
              <DetailRow
                label="Calibration due"
                value={fmtDate(equipment.calibration_due)}
                tone={
                  status === 'overdue' && dueDate === equipment.calibration_due
                    ? 'red'
                    : status === 'due_soon' && dueDate === equipment.calibration_due
                      ? 'amber'
                      : undefined
                }
              />
            </div>
          )}
        </EquipmentSection>

        {/* Warranty */}
        {warrantyStatus !== 'none' && (
          <EquipmentSection eyebrow="Warranty">
            <div className="space-y-2">
              <DetailRow
                label="Expires"
                value={fmtDate(equipment.warranty_expiry)}
                tone={WARRANTY_PILL[warrantyStatus].tone}
              />
              {equipment.warranty_provider && (
                <DetailRow label="Provider" value={equipment.warranty_provider} />
              )}
              {equipment.warranty_claim_contact && (
                <DetailRow label="Claim contact" value={equipment.warranty_claim_contact} />
              )}
            </div>
          </EquipmentSection>
        )}

        {/* Notes */}
        {equipment.condition_notes && (
          <EquipmentSection eyebrow="Notes">
            <p className="text-[13px] text-white leading-relaxed whitespace-pre-wrap">
              {equipment.condition_notes}
            </p>
          </EquipmentSection>
        )}

        {/* QR label */}
        <EquipmentSection eyebrow="QR label">
          <EquipmentQRCode
            equipmentId={equipment.id}
            equipmentName={equipment.name}
            serialNumber={equipment.serial_number}
            currentQrValue={equipment.qr_code}
            onSaveQrCode={onSaveQrCode}
          />
        </EquipmentSection>

        {/* Recent pre-use checks */}
        {recentChecks.length > 0 && (
          <EquipmentSection eyebrow="Recent pre-use checks">
            <div className="space-y-2">
              {recentChecks.map((check) => {
                const tone: Tone =
                  check.overall_result === 'pass'
                    ? 'emerald'
                    : check.overall_result === 'fail'
                      ? 'red'
                      : 'blue';
                return (
                  <div
                    key={check.id}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06]"
                  >
                    <span className="flex-1 min-w-0 text-[12.5px] text-white capitalize truncate">
                      {check.equipment_type.replace(/_/g, ' ')}
                    </span>
                    <span className="text-[11px] text-white tabular-nums">
                      {fmtDate(check.check_date || check.created_at)}
                    </span>
                    <span
                      className={cn(
                        PILL_BASE,
                        'text-[9.5px] tracking-[0.1em]',
                        STATUS_PILL_CLASS[tone]
                      )}
                    >
                      {check.overall_result === 'pass'
                        ? 'Pass'
                        : check.overall_result === 'fail'
                          ? 'Fail'
                          : 'N/A'}
                    </span>
                  </div>
                );
              })}
            </div>
          </EquipmentSection>
        )}

        {/* Record actions.
            Three equal-weight full-width buttons stacked under a form label
            ("Export & manage" — a label attached to nothing) read as a list of
            equally likely choices, with Delete carrying the same visual weight
            as Edit. Edit and Export are the everyday pair and sit together;
            Delete is separated by a rule and kept quiet. */}
        <EquipmentSection eyebrow="Record">
          <div className="grid grid-cols-2 gap-2">
            <SecondaryButton fullWidth onClick={onEdit}>
              Edit details
            </SecondaryButton>
            <SecondaryButton
              fullWidth
              disabled={exporting}
              onClick={() => exportPDF('equipment', equipment.id)}
            >
              {exporting ? 'Exporting…' : 'Export PDF'}
            </SecondaryButton>
          </div>
          <div className="border-t border-white/[0.08] pt-3">
            <DestructiveButton fullWidth onClick={onDelete}>
              Delete equipment
            </DestructiveButton>
          </div>
        </EquipmentSection>
      </div>

      {/* Sticky log-test actions */}
      <div
        className="fixed bottom-0 inset-x-0 bg-[hsl(0_0%_7%)]/95 backdrop-blur-sm border-t border-white/[0.06] px-4 py-3"
        style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
      >
        <div className="mx-auto max-w-3xl flex gap-2">
          <PrimaryButton fullWidth size="lg" onClick={onMarkInspected}>
            Log test today
          </PrimaryButton>
          {onMarkCalibrated && (
            <SecondaryButton size="lg" onClick={onMarkCalibrated}>
              Log calibration
            </SecondaryButton>
          )}
        </div>
      </div>
    </div>
  );
}

export default EquipmentDetailView;
