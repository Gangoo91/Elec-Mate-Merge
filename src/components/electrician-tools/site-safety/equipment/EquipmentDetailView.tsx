/**
 * EquipmentDetailView — editorial detail panel for a single equipment record.
 *
 * Rebuilt to the Site Safety gold-standard editorial pattern: SafetyMasthead +
 * FormCard sections + monochrome surfaces, with status as the single colour
 * dimension. Preserves all equipment behaviours: mark tested / calibrated,
 * QR label, recent pre-use checks, warranty, notes, edit, delete and PDF export.
 */

import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import { useSafetyPDFExport } from '@/hooks/useSafetyPDFExport';
import { usePreUseChecks, type PreUseCheck } from '@/hooks/usePreUseChecks';
import type { SafetyEquipment } from '@/hooks/useSafetyEquipment';
import {
  Eyebrow,
  Field,
  FormCard,
  PrimaryButton,
  SecondaryButton,
  DestructiveButton,
  type Tone,
} from '@/components/college/primitives';
import { SafetyMasthead } from '../common/SafetyModuleShell';
import { EquipmentQRCode } from './EquipmentQRCode';
import { equipmentCategories } from './EquipmentCategoryPicker';

type EquipmentStatus = SafetyEquipment['status'];
type WarrantyStatus = 'valid' | 'expiring' | 'expired' | 'none';

// ── Single colour dimension = status ──
function statusTone(status: EquipmentStatus): Tone {
  return status === 'good'
    ? 'green'
    : status === 'needs_attention'
      ? 'amber'
      : status === 'overdue'
        ? 'red'
        : 'blue';
}

const TONE_PILL: Record<Tone, string> = {
  green: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25',
  amber: 'bg-amber-500/10 text-amber-400 border-amber-500/25',
  red: 'bg-red-500/10 text-red-400 border-red-500/25',
  blue: 'bg-blue-500/10 text-blue-400 border-blue-500/25',
  orange: 'bg-orange-500/10 text-orange-400 border-orange-500/25',
  emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25',
  yellow: 'bg-elec-yellow/10 text-elec-yellow border-elec-yellow/25',
  purple: 'bg-purple-500/10 text-purple-400 border-purple-500/25',
  cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/25',
  indigo: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/25',
};

const STATUS_LABEL: Record<EquipmentStatus, string> = {
  good: 'Good',
  needs_attention: 'Attention',
  overdue: 'Overdue',
  out_of_service: 'Out of service',
};

function getWarrantyStatus(warrantyExpiry: string | null | undefined): WarrantyStatus {
  if (!warrantyExpiry) return 'none';
  const now = new Date();
  const expiry = new Date(warrantyExpiry);
  if (expiry < now) return 'expired';
  const thirtyDays = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
  if (expiry <= thirtyDays) return 'expiring';
  return 'valid';
}

const WARRANTY_PILL: Record<Exclude<WarrantyStatus, 'none'>, { tone: Tone; label: string }> = {
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

function fmtFrequency(days: number): string {
  if (days <= 30) return `${days} days`;
  if (days <= 90) return `${Math.round(days / 30)} months`;
  if (days === 365) return '12 months';
  return `${Math.round(days / 30)} months`;
}

function StatusPill({ status }: { status: EquipmentStatus }) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-[0.12em] border whitespace-nowrap',
        TONE_PILL[statusTone(status)]
      )}
    >
      {STATUS_LABEL[status]}
    </span>
  );
}

function DetailRow({ label, value, tone }: { label: string; value: string; tone?: Tone }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-[12px] text-white/55">{label}</span>
      <span className={cn('text-[12.5px] font-medium', tone ? TONE_PILL[tone].split(' ')[1] : 'text-white')}>
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

  const warrantyStatus = getWarrantyStatus(equipment.warranty_expiry);
  const category = equipmentCategories.find((c) => c.id === equipment.category);
  const exporting = isExporting && exportingId === equipment.id;

  return (
    <div className="bg-elec-dark min-h-screen pb-28">
      <SafetyMasthead onBack={onBack} backLabel="Equipment" moduleName={equipment.name} />

      <div className="mx-auto max-w-3xl px-4 py-4 space-y-4">
        {/* Identity */}
        <FormCard eyebrow="Equipment">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h2 className="text-[18px] font-semibold text-white leading-tight">{equipment.name}</h2>
              <p className="mt-1 text-[12.5px] text-white/60">
                {category?.label || equipment.category}
                {equipment.serial_number ? ` · S/N ${equipment.serial_number}` : ''}
              </p>
            </div>
            <div className="flex flex-col items-end gap-1.5 shrink-0">
              <StatusPill status={equipment.status} />
              {warrantyStatus !== 'none' && (
                <span
                  className={cn(
                    'inline-flex items-center px-2 py-0.5 rounded-full text-[9.5px] font-medium uppercase tracking-[0.1em] border whitespace-nowrap',
                    TONE_PILL[WARRANTY_PILL[warrantyStatus].tone]
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
        </FormCard>

        {/* Testing schedule */}
        <FormCard eyebrow="Testing schedule">
          <div className="space-y-2">
            <DetailRow label="Last tested" value={fmtDate(equipment.last_inspection)} />
            <DetailRow
              label="Next test due"
              value={fmtDate(equipment.next_inspection)}
              tone={equipment.status === 'overdue' ? 'red' : undefined}
            />
            <DetailRow label="Test frequency" value={fmtFrequency(equipment.inspection_interval_days)} />
          </div>
          {equipment.requires_calibration && (
            <div className="space-y-2 pt-2 mt-1 border-t border-white/[0.06]">
              <DetailRow label="Last calibration" value={fmtDate(equipment.last_calibration)} />
              <DetailRow label="Calibration due" value={fmtDate(equipment.calibration_due)} />
            </div>
          )}
        </FormCard>

        {/* Warranty */}
        {warrantyStatus !== 'none' && (
          <FormCard eyebrow="Warranty">
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
          </FormCard>
        )}

        {/* Notes */}
        {equipment.condition_notes && (
          <FormCard eyebrow="Notes">
            <p className="text-[13px] text-white/85 leading-relaxed whitespace-pre-wrap">
              {equipment.condition_notes}
            </p>
          </FormCard>
        )}

        {/* QR label */}
        <FormCard eyebrow="QR label">
          <EquipmentQRCode
            equipmentId={equipment.id}
            equipmentName={equipment.name}
            serialNumber={equipment.serial_number}
            currentQrValue={equipment.qr_code}
            onSaveQrCode={onSaveQrCode}
          />
        </FormCard>

        {/* Recent pre-use checks */}
        {recentChecks.length > 0 && (
          <FormCard eyebrow="Recent pre-use checks">
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
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-[hsl(0_0%_9%)] border border-white/[0.06]"
                  >
                    <span className="flex-1 min-w-0 text-[12.5px] text-white capitalize truncate">
                      {check.equipment_type.replace(/_/g, ' ')}
                    </span>
                    <span className="text-[11px] text-white/45 tabular-nums">
                      {fmtDate(check.check_date || check.created_at)}
                    </span>
                    <span
                      className={cn(
                        'inline-flex items-center px-2 py-0.5 rounded-full text-[9.5px] font-medium uppercase tracking-[0.1em] border whitespace-nowrap',
                        TONE_PILL[tone]
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
          </FormCard>
        )}

        {/* Record actions */}
        <FormCard eyebrow="Record">
          <Field label="Export & manage">
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
          </Field>
          <DestructiveButton fullWidth onClick={onDelete}>
            Delete equipment
          </DestructiveButton>
        </FormCard>
      </div>

      {/* Sticky log-test actions */}
      <div
        className="fixed bottom-0 inset-x-0 bg-elec-dark/95 backdrop-blur-sm border-t border-white/[0.06] px-4 py-3"
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
