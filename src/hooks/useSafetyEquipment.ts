import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export interface SafetyEquipment {
  id: string;
  user_id: string;
  name: string;
  category: string;
  serial_number: string | null;
  purchase_date: string | null;
  purchase_price: number | null;
  warranty_expiry: string | null;
  warranty_provider: string | null;
  warranty_claim_contact: string | null;
  location: string;
  assigned_to: string | null;
  last_inspection: string | null;
  next_inspection: string | null;
  inspection_interval_days: number;
  requires_calibration: boolean;
  last_calibration: string | null;
  calibration_due: string | null;
  calibration_interval_days: number | null;
  status: 'good' | 'needs_attention' | 'out_of_service' | 'overdue';
  condition_notes: string | null;
  photos: string[];
  qr_code: string | null;
  created_at: string;
  updated_at: string;
}

/**
 * Insert payload.
 *
 * Every column that is nullable or carries a database default is OPTIONAL here.
 * It used to be a bare `Omit<SafetyEquipment, 'id' | 'created_at' | 'updated_at'>`,
 * which made `purchase_date`, `purchase_price`, `assigned_to`, `last_calibration`,
 * `calibration_due`, `calibration_interval_days` and `qr_code` *required* keys —
 * none of which the add form has ever collected. That mismatch was invisible only
 * because the one caller passed an untyped `Record<string, unknown>`.
 */
export type SafetyEquipmentInsert = Pick<
  SafetyEquipment,
  'user_id' | 'name' | 'category' | 'location'
> &
  Partial<Omit<SafetyEquipment, 'id' | 'created_at' | 'updated_at' | 'user_id'>>;

export type SafetyEquipmentUpdate = Partial<
  Omit<SafetyEquipment, 'id' | 'user_id' | 'created_at' | 'updated_at'>
>;

/* ────────────────────────────────────────────────────────────────
   Dates
   ────────────────────────────────────────────────────────────────

   `last_inspection`, `next_inspection`, `calibration_due` and `warranty_expiry`
   are Postgres `date` columns. PostgREST returns them as bare `YYYY-MM-DD`.

   ⚠️ `new Date('2026-08-09')` is parsed as UTC MIDNIGHT (ECMAScript treats the
   date-only form as UTC), while `new Date()` is the local instant. In BST that
   means any time after 01:00 on the day a test is due, `new Date(due) < new Date()`
   is true — the register called equipment OVERDUE on the morning it was due, and
   simultaneously excluded it from "due soon" because that branch required
   `d >= now`. Same trap in reverse for `new Date().toISOString().split('T')[0]`,
   which between midnight and 01:00 BST records a test as having happened
   YESTERDAY.

   Everything below therefore works on `YYYY-MM-DD` strings in the LOCAL calendar.
   ISO dates sort and compare lexicographically, so `<`/`<=` on the strings is an
   exact calendar-day comparison with no timezone to get wrong.
   ──────────────────────────────────────────────────────────────── */

function toISODate(d: Date): string {
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${month}-${day}`;
}

/** Today in the device's local calendar, as `YYYY-MM-DD`. */
export function todayISODate(): string {
  return toISODate(new Date());
}

/** `YYYY-MM-DD` + n days, via the local calendar so DST never shifts the result. */
export function addDaysISODate(iso: string, days: number): string {
  const [y, m, d] = iso.split('-').map(Number);
  return toISODate(new Date(y, m - 1, d + days));
}

/**
 * The one place the next-test date is worked out from a last-test date.
 *
 * The wizard PREVIEWS this value and the tracker WRITES it. They used to compute
 * it separately — `new Date(x); setDate(getDate() + n)` in both files — with
 * nothing keeping the two copies in step.
 */
export function nextInspectionFrom(
  lastInspection: string | undefined | null,
  intervalDays: number | undefined | null
): string | null {
  if (!lastInspection || !intervalDays) return null;
  return addDaysISODate(lastInspection, intervalDays);
}

/** Equipment counts as "due soon" inside this window. */
export const DUE_SOON_DAYS = 7;
/** Warranty counts as "expiring" inside this window. */
export const WARRANTY_HORIZON_DAYS = 30;

/* ────────────────────────────────────────────────────────────────
   Status
   ────────────────────────────────────────────────────────────────

   The `status` COLUMN is not trustworthy. Nothing in the codebase has ever
   written anything other than `'good'` to it — the insert hard-codes
   `status: 'good'`, `markInspected` writes `'good'`, and there is no UI that
   sets `'needs_attention'`, `'overdue'` or `'out_of_service'`. Live data agrees:
   every row is `'good'`.

   So the register used to contradict itself. The status pill and the "Good" tab
   read the column (always green, always everything), while the "Overdue" tab and
   the overdue stat read the dates. A tool three months out of test appeared under
   BOTH tabs, wearing a green GOOD pill in the overdue list.

   Status is now DERIVED from the dates for display, with one exception: an
   explicit `'out_of_service'` in the column is a human decision and outranks any
   date, so it is still honoured if it is ever written.
   ──────────────────────────────────────────────────────────────── */

export type EquipmentDerivedStatus =
  'overdue' | 'due_soon' | 'unscheduled' | 'good' | 'out_of_service';

type DatedEquipment = Pick<
  SafetyEquipment,
  'status' | 'next_inspection' | 'calibration_due' | 'warranty_expiry'
>;

/**
 * The earliest date this item is next due on — inspection or calibration,
 * whichever falls first.
 *
 * The old logic was `if (next_inspection) …; if (calibration_due) …`, so an item
 * with any inspection date at all never had its calibration date looked at. A
 * meter six months out of calibration but in date for inspection was reported as
 * fine. Calibration is included whenever a due date is present, regardless of the
 * `requires_calibration` flag — a due date that exists is a commitment, and a
 * safety register should not lose one because a checkbox was toggled off.
 */
export function equipmentDueDate(e: DatedEquipment): string | null {
  const dates = [e.next_inspection, e.calibration_due].filter(
    (d): d is string => typeof d === 'string' && d.length > 0
  );
  if (dates.length === 0) return null;
  return dates.sort()[0];
}

export function deriveEquipmentStatus(
  e: DatedEquipment,
  today: string = todayISODate()
): EquipmentDerivedStatus {
  if (e.status === 'out_of_service') return 'out_of_service';
  const due = equipmentDueDate(e);
  // No date at all is not "good" — it is kit that has never been booked in for a
  // test. PUWER/LOLER wants a schedule, so this surfaces under Attention rather
  // than hiding in the green count.
  if (!due) return 'unscheduled';
  if (due < today) return 'overdue';
  if (due <= addDaysISODate(today, DUE_SOON_DAYS)) return 'due_soon';
  return 'good';
}

export type WarrantyState = 'none' | 'expired' | 'expiring' | 'valid';

export function deriveWarrantyState(
  e: Pick<SafetyEquipment, 'warranty_expiry'>,
  today: string = todayISODate()
): WarrantyState {
  if (!e.warranty_expiry) return 'none';
  if (e.warranty_expiry < today) return 'expired';
  if (e.warranty_expiry <= addDaysISODate(today, WARRANTY_HORIZON_DAYS)) return 'expiring';
  return 'valid';
}

export function useSafetyEquipment() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const {
    data: equipment = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['safety-equipment', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];

      const { data, error } = await supabase
        .from('safety_equipment')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as SafetyEquipment[];
    },
    enabled: !!user?.id,
  });

  const addEquipment = useMutation({
    mutationFn: async (newEquipment: Omit<SafetyEquipmentInsert, 'user_id'>) => {
      if (!user?.id) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('safety_equipment')
        .insert({
          ...newEquipment,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data as SafetyEquipment;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['safety-equipment', user?.id] });
      toast.success('Equipment added successfully');
    },
    onError: (error) => {
      toast.error('Failed to add equipment: ' + error.message);
    },
  });

  const updateEquipment = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: SafetyEquipmentUpdate }) => {
      if (!user?.id) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('safety_equipment')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      return data as SafetyEquipment;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['safety-equipment', user?.id] });
      toast.success('Equipment updated successfully');
    },
    onError: (error) => {
      toast.error('Failed to update equipment: ' + error.message);
    },
  });

  const deleteEquipment = useMutation({
    mutationFn: async (id: string) => {
      if (!user?.id) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('safety_equipment')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['safety-equipment', user?.id] });
      toast.success('Equipment deleted');
    },
    onError: (error) => {
      toast.error('Failed to delete equipment: ' + error.message);
    },
  });

  const markInspected = useMutation({
    mutationFn: async (id: string) => {
      if (!user?.id) throw new Error('Not authenticated');

      const item = equipment.find((e) => e.id === id);
      if (!item) throw new Error('Equipment not found');

      // Local calendar, not `toISOString()` — see the note above the date helpers.
      const today = todayISODate();
      const intervalDays = item.inspection_interval_days || 90;

      const { data, error } = await supabase
        .from('safety_equipment')
        .update({
          last_inspection: today,
          next_inspection: addDaysISODate(today, intervalDays),
          status: 'good',
        })
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      return data as SafetyEquipment;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['safety-equipment', user?.id] });
      toast.success('Inspection recorded');
    },
    onError: (error) => {
      toast.error('Failed to record inspection: ' + error.message);
    },
  });

  const markCalibrated = useMutation({
    mutationFn: async (id: string) => {
      if (!user?.id) throw new Error('Not authenticated');

      const item = equipment.find((e) => e.id === id);
      if (!item) throw new Error('Equipment not found');

      const today = todayISODate();
      const intervalDays = item.calibration_interval_days || 365;

      const { data, error } = await supabase
        .from('safety_equipment')
        .update({
          last_calibration: today,
          calibration_due: addDaysISODate(today, intervalDays),
        })
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      return data as SafetyEquipment;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['safety-equipment', user?.id] });
      toast.success('Calibration recorded');
    },
    onError: (error) => {
      toast.error('Failed to record calibration: ' + error.message);
    },
  });

  // Calculate stats (memoised to avoid re-computing on every render)
  const { stats, overdueItems, dueSoonItems } = useMemo(() => {
    const today = todayISODate();

    const byStatus = equipment.map((e) => ({ e, s: deriveEquipmentStatus(e, today) }));
    const of = (s: EquipmentDerivedStatus) => byStatus.filter((x) => x.s === s).map((x) => x.e);

    const overdue = of('overdue');
    const dueSoon = of('due_soon');
    const unscheduled = of('unscheduled');

    const warranty = equipment.map((e) => deriveWarrantyState(e, today));
    const warrantyExpired = warranty.filter((w) => w === 'expired').length;
    const warrantyExpiring = warranty.filter((w) => w === 'expiring').length;

    return {
      stats: {
        total: equipment.length,
        good: of('good').length,
        // `needsAttention` was `status === 'needs_attention'`, a value nothing
        // has ever written — so it was hard 0, and `useSafetyDashboardStats`
        // publishes it to the Site Safety hub as the "Equipment due" KPI. That
        // tile could never leave zero. It now means what its name says:
        // due inside the window, plus kit with no test date booked at all.
        needsAttention: dueSoon.length + unscheduled.length,
        overdue: overdue.length,
        outOfService: of('out_of_service').length,
        dueSoon: dueSoon.length,
        unscheduled: unscheduled.length,
        warrantyExpiring,
        warrantyExpired,
        warrantyAlert: warrantyExpired + warrantyExpiring,
      },
      overdueItems: overdue,
      dueSoonItems: dueSoon,
    };
  }, [equipment]);

  // Lookup helpers for barcode/QR scanning
  const findBySerialNumber = useCallback(
    (serial: string): SafetyEquipment | undefined => {
      const normalised = serial.trim().toLowerCase();
      return equipment.find(
        (e) => e.serial_number && e.serial_number.trim().toLowerCase() === normalised
      );
    },
    [equipment]
  );

  const findByQrCode = useCallback(
    (scannedValue: string): SafetyEquipment | undefined => {
      // First check against stored qr_code values in DB
      const dbMatch = equipment.find((e) => e.qr_code && e.qr_code === scannedValue);
      if (dbMatch) return dbMatch;

      // Parse the https://elecmate.app/e/<id> URL and match by equipment ID
      const urlPrefix = 'https://elecmate.app/e/';
      if (scannedValue.startsWith(urlPrefix)) {
        const id = scannedValue.slice(urlPrefix.length);
        return equipment.find((e) => e.id === id);
      }

      // Backwards compat: parse old elecmate://equipment/<id> URI scheme
      const legacyPrefix = 'elecmate://equipment/';
      if (scannedValue.startsWith(legacyPrefix)) {
        const id = scannedValue.slice(legacyPrefix.length);
        return equipment.find((e) => e.id === id);
      }

      return undefined;
    },
    [equipment]
  );

  const saveQrCode = useMutation({
    mutationFn: async ({ id, qrValue }: { id: string; qrValue: string }) => {
      if (!user?.id) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('safety_equipment')
        .update({ qr_code: qrValue })
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      return data as SafetyEquipment;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['safety-equipment', user?.id] });
    },
    onError: (error) => {
      console.error('Failed to save QR code:', error.message);
    },
  });

  return {
    equipment,
    isLoading,
    error,
    stats,
    overdueItems,
    dueSoonItems,
    refetch,
    addEquipment,
    updateEquipment,
    deleteEquipment,
    markInspected,
    markCalibrated,
    findBySerialNumber,
    findByQrCode,
    saveQrCode,
  };
}
