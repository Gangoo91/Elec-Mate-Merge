/**
 * ELE-1984 Fleet walk-round: the shared data layer for the driver's daily
 * check (Worker Tools → My van) and the office's view of it (Employer Hub →
 * Fleet).
 *
 *   get_my_vans()            the vehicles assigned to the signed-in driver
 *   submit_vehicle_check()   one write path for drivers AND the office; the
 *                            server checks access, requires a photo on every
 *                            problem, takes the van off the road if asked and
 *                            rings the office bell when a driver finds one
 *   resolve_vehicle_defect() office closes a problem (and can put the van
 *                            back on the road)
 *
 * Photos go to the private `vehicle-check-photos` bucket as
 * `<vehicle_id>/<uuid>.<ext>` and are only ever read through signed URLs.
 */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { compressImageForUpload } from '@/utils/imageUploadUtils';

export const VEHICLE_PHOTO_BUCKET = 'vehicle-check-photos';

/* ── The walk-round ─────────────────────────────────────────────────── */

export type WalkItemKey =
  | 'tyres_ok'
  | 'lights_ok'
  | 'mirrors_ok'
  | 'bodywork_ok'
  | 'windscreen_ok'
  | 'wipers_ok'
  | 'registration_visible'
  | 'oil_level_ok'
  | 'coolant_ok'
  | 'washer_fluid_ok'
  | 'horn_ok'
  | 'seatbelt_ok'
  | 'dashboard_warnings'
  | 'first_aid_kit'
  | 'fire_extinguisher';

export interface WalkItem {
  key: WalkItemKey;
  /** Short name, matches the server's label (used in the office bell). */
  label: string;
  /** What "fine" looks like, in a driver's words. */
  hint: string;
}

export interface WalkStage {
  id: 'outside' | 'bonnet' | 'cab';
  title: string;
  lead: string;
  items: WalkItem[];
}

export const WALK_STAGES: WalkStage[] = [
  {
    id: 'outside',
    title: 'Walk round the outside',
    lead: 'Start at the driver’s door and go all the way round.',
    items: [
      { key: 'tyres_ok', label: 'Tyres', hint: 'Look inflated, tread showing, no cuts or bulges' },
      { key: 'lights_ok', label: 'Lights', hint: 'Headlights, indicators, brake lights all work' },
      { key: 'mirrors_ok', label: 'Mirrors', hint: 'All there, not cracked, set right' },
      { key: 'bodywork_ok', label: 'Bodywork', hint: 'No new damage, doors and racking secure' },
      { key: 'windscreen_ok', label: 'Windscreen', hint: 'No cracks in your view, clean' },
      { key: 'wipers_ok', label: 'Wipers', hint: 'Blades not split, they clear the screen' },
      { key: 'registration_visible', label: 'Number plates', hint: 'Both plates there, clean and readable' },
    ],
  },
  {
    id: 'bonnet',
    title: 'Under the bonnet',
    lead: 'Only what you can see. Don’t open anything hot.',
    items: [
      { key: 'oil_level_ok', label: 'Oil', hint: 'Between the marks on the dipstick' },
      { key: 'coolant_ok', label: 'Coolant', hint: 'Between min and max' },
      { key: 'washer_fluid_ok', label: 'Washer fluid', hint: 'Topped up' },
    ],
  },
  {
    id: 'cab',
    title: 'In the cab',
    lead: 'Start the engine for the warning lights.',
    items: [
      { key: 'dashboard_warnings', label: 'Warning lights', hint: 'No warning lights stay on' },
      { key: 'horn_ok', label: 'Horn', hint: 'Works' },
      { key: 'seatbelt_ok', label: 'Seatbelts', hint: 'Lock when tugged, not frayed' },
      { key: 'first_aid_kit', label: 'First aid kit', hint: 'In the van and stocked' },
      { key: 'fire_extinguisher', label: 'Fire extinguisher', hint: 'In the van, in date, needle in the green' },
    ],
  },
];

export const WALK_ITEMS: WalkItem[] = WALK_STAGES.flatMap((s) => s.items);

export const walkLabel = (key: string): string =>
  WALK_ITEMS.find((i) => i.key === key)?.label ?? 'Other problem';

/* ── Types ───────────────────────────────────────────────────────────── */

export interface DefectItem {
  key: WalkItemKey | 'other';
  label: string;
  note: string | null;
  photos: string[];
}

export interface MyVan {
  id: string;
  registration: string;
  make: string | null;
  model: string | null;
  colour: string | null;
  vehicle_type: string | null;
  mileage: number | null;
  status: string | null;
  off_road_reason: string | null;
  off_road_at: string | null;
  firm_name: string | null;
  mot_expiry: string | null;
  tax_expiry: string | null;
  insurance_expiry: string | null;
  next_service: string | null;
  today: { id: string; time: string; status: string; defects: number } | null;
  open_defects: Array<{
    check_id: string;
    date: string;
    time: string;
    items: DefectItem[];
    off_road: boolean;
  }>;
  recent: Array<{
    id: string;
    kind: 'daily' | 'defect';
    date: string;
    time: string;
    status: string;
    defects: number;
    resolved: boolean;
    by: string;
  }>;
}

export interface DefectDraft {
  key: WalkItemKey | 'other';
  note: string;
  photos: string[];
}

export interface SubmitCheckInput {
  vehicleId: string;
  kind: 'daily' | 'defect';
  mileage?: number | null;
  /** true = fine, for every item (warning lights: true = none on). */
  results?: Partial<Record<WalkItemKey, boolean>>;
  defects: DefectDraft[];
  offRoad: boolean;
  notes?: string | null;
}

/* ── Errors ──────────────────────────────────────────────────────────── */

export function walkroundError(err: unknown): string {
  const msg = err instanceof Error ? err.message : String((err as { message?: string })?.message ?? err);
  if (msg.includes('vehicle_check:photo_required')) {
    const key = msg.split('photo_required:')[1]?.trim();
    return `Add a photo of the ${key ? walkLabel(key).toLowerCase() : 'problem'} so the office can see it.`;
  }
  if (msg.includes('vehicle_check:unanswered')) return 'Answer every item before you send it.';
  if (msg.includes('vehicle_check:not_allowed'))
    return 'This vehicle is not assigned to you any more. Ask the office.';
  if (msg.includes('vehicle_check:not_found')) return 'This vehicle has been removed by the office.';
  if (msg.includes('vehicle_check:bad_mileage')) return 'That mileage does not look right.';
  if (msg.includes('vehicle_check:other_needs_note')) return 'Say what the problem is.';
  if (msg.includes('vehicle_check:bad_photo')) return 'A photo did not upload. Take it again.';
  if (msg.includes('vehicle_check:no_problem')) return 'Add the problem first.';
  if (msg.includes('vehicle_check:too_many_photos')) return 'Six photos per problem is the most.';
  if (/Failed to fetch|NetworkError|network/i.test(msg))
    return 'No signal. Your answers are still here, try again in a moment.';
  return 'That did not send. Try again.';
}

/* ── Driver: my vans ─────────────────────────────────────────────────── */

export function useMyVans(enabled = true) {
  return useQuery({
    queryKey: ['my-vans'],
    enabled,
    staleTime: 30_000,
    queryFn: async (): Promise<MyVan[]> => {
      const { data, error } = await supabase.rpc('get_my_vans' as never);
      if (error) throw error;
      return ((data as unknown as MyVan[]) ?? []).map((v) => ({
        ...v,
        open_defects: v.open_defects ?? [],
        recent: v.recent ?? [],
      }));
    },
  });
}

/* ── Photos ──────────────────────────────────────────────────────────── */

const extFor = (type: string) =>
  type === 'image/png'
    ? 'png'
    : type === 'image/webp'
      ? 'webp'
      : type === 'image/heic'
        ? 'heic'
        : type === 'image/heif'
          ? 'heif'
          : 'jpg';

export async function uploadVehiclePhoto(vehicleId: string, file: File): Promise<string> {
  let upload = file;
  try {
    upload = await compressImageForUpload(file, 900);
  } catch {
    // Keep the original: a big photo beats no photo.
  }
  const type = upload.type && upload.type.startsWith('image/') ? upload.type : 'image/jpeg';
  const path = `${vehicleId}/${crypto.randomUUID()}.${extFor(type)}`;
  const { error } = await supabase.storage
    .from(VEHICLE_PHOTO_BUCKET)
    .upload(path, upload, { contentType: type, upsert: false });
  if (error) throw error;
  return path;
}

/** Remove a photo the driver took then deleted before sending. Best effort. */
export async function removeVehiclePhoto(path: string): Promise<void> {
  await supabase.storage.from(VEHICLE_PHOTO_BUCKET).remove([path]);
}

/** Signed URLs (1 hour) for a set of stored photo paths. */
export function useVehiclePhotoUrls(paths: string[]) {
  const key = [...paths].sort().join('|');
  return useQuery({
    queryKey: ['vehicle-photo-urls', key],
    enabled: paths.length > 0,
    staleTime: 50 * 60_000,
    queryFn: async (): Promise<Record<string, string>> => {
      const { data, error } = await supabase.storage
        .from(VEHICLE_PHOTO_BUCKET)
        .createSignedUrls(paths, 3600);
      if (error) throw error;
      const out: Record<string, string> = {};
      (data ?? []).forEach((d) => {
        if (d.path && d.signedUrl) out[d.path] = d.signedUrl;
      });
      return out;
    },
  });
}

/* ── Submit ──────────────────────────────────────────────────────────── */

export function useSubmitVehicleCheck() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: SubmitCheckInput) => {
      const { data, error } = await supabase.rpc('submit_vehicle_check' as never, {
        p_vehicle: input.vehicleId,
        p_mileage: input.mileage ?? null,
        p_results: input.kind === 'daily' ? input.results ?? {} : {},
        p_defects: input.defects.map((d) => ({
          key: d.key,
          note: d.note.trim() || null,
          photos: d.photos,
        })),
        p_off_road: input.offRoad,
        p_notes: input.notes?.trim() || null,
        p_kind: input.kind,
      } as never);
      if (error) throw error;
      return data as unknown as { id: string; status: string; defects: number; off_road: boolean };
    },
    onSuccess: (_d, input) => {
      qc.invalidateQueries({ queryKey: ['my-vans'] });
      qc.invalidateQueries({ queryKey: ['vehicleChecks', input.vehicleId] });
      qc.invalidateQueries({ queryKey: ['latestCheck', input.vehicleId] });
      qc.invalidateQueries({ queryKey: ['hasCheckedToday', input.vehicleId] });
      qc.invalidateQueries({ queryKey: ['fleet-today'] });
      qc.invalidateQueries({ queryKey: ['vehicles'] });
      qc.invalidateQueries({ queryKey: ['fleet'] });
      qc.invalidateQueries({ queryKey: ['employer-home'] });
    },
  });
}

/* ── Office: today across the fleet ──────────────────────────────────── */

export interface FleetCheckRow {
  id: string;
  vehicle_id: string;
  check_kind: 'daily' | 'defect';
  check_date: string;
  check_time: string | null;
  status: string;
  mileage: number | null;
  defects_found: boolean;
  defect_items: DefectItem[];
  defect_details: string | null;
  off_road: boolean;
  resolved_at: string | null;
  resolution_note: string | null;
  notes: string | null;
  created_at: string;
  driver: { id: string; name: string } | null;
}

const CHECK_COLS =
  'id, vehicle_id, check_kind, check_date, check_time, status, mileage, defects_found, defect_items, defect_details, off_road, resolved_at, resolution_note, notes, created_at, driver:employer_employees(id, name)';

export const londonToday = () => format(new Date(), 'yyyy-MM-dd');

/** Today's daily checks and every open problem, for the vehicles passed in. */
export function useFleetToday(vehicleIds: string[]) {
  const key = [...vehicleIds].sort().join(',');
  return useQuery({
    queryKey: ['fleet-today', key],
    enabled: vehicleIds.length > 0,
    staleTime: 30_000,
    queryFn: async () => {
      const today = londonToday();
      const { data, error } = await supabase
        .from('vehicle_checks')
        .select(CHECK_COLS)
        .in('vehicle_id', vehicleIds)
        .or(`check_date.eq.${today},and(defects_found.eq.true,resolved_at.is.null)`)
        .order('created_at', { ascending: false })
        .limit(500);
      if (error) throw error;
      const rows = (data ?? []) as unknown as FleetCheckRow[];
      const checkedToday = new Map<string, FleetCheckRow>();
      rows
        .filter((r) => r.check_kind === 'daily' && r.check_date === today)
        .forEach((r) => {
          if (!checkedToday.has(r.vehicle_id)) checkedToday.set(r.vehicle_id, r);
        });
      const openDefects = rows.filter((r) => r.defects_found && !r.resolved_at);
      return { checkedToday, openDefects };
    },
  });
}

/** Every check for one vehicle, newest first (office history). */
export function useVehicleCheckHistory(vehicleId: string | undefined) {
  return useQuery({
    queryKey: ['vehicleChecks', vehicleId],
    enabled: !!vehicleId,
    queryFn: async (): Promise<FleetCheckRow[]> => {
      const { data, error } = await supabase
        .from('vehicle_checks')
        .select(CHECK_COLS)
        .eq('vehicle_id', vehicleId!)
        .order('created_at', { ascending: false })
        .limit(60);
      if (error) throw error;
      return (data ?? []) as unknown as FleetCheckRow[];
    },
  });
}

export function useResolveVehicleDefect() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: { checkId: string; note?: string; backOnRoad?: boolean }) => {
      const { error } = await supabase.rpc('resolve_vehicle_defect' as never, {
        p_check: input.checkId,
        p_note: input.note?.trim() || null,
        p_back_on_road: !!input.backOnRoad,
      } as never);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['fleet-today'] });
      qc.invalidateQueries({ queryKey: ['vehicleChecks'] });
      qc.invalidateQueries({ queryKey: ['vehicles'] });
      qc.invalidateQueries({ queryKey: ['fleet'] });
      qc.invalidateQueries({ queryKey: ['employer-home'] });
      qc.invalidateQueries({ queryKey: ['my-vans'] });
    },
  });
}
