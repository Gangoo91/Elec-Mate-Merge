import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useActingFirmId } from '@/hooks/useFirmPriceBook';
import { compressImageForUpload } from '@/utils/imageUploadUtils';

/* ==========================================================================
   Kit and van stock (ELE-1829 / ELE-2008).

   Company tools are issued to ONE holder: a person (assigned_to_employee_id)
   or a van (assigned_vehicle_id, held by its driver). Every movement is a row
   in employer_tool_events. Van stock lives in employer_van_stock (no money);
   what a sparky uses on a job is a "used" move priced at buy price on the
   server and counted in the job's material cost.

   Office:  issue_company_tool, mark_company_tool_repaired, get_van_stock,
            get_van_stock_moves, save/delete_van_stock_item, count_van_stock,
            get_kit_attention
   Worker:  get_my_kit, confirm/transfer/return/report_company_tool,
            get_kit_transfer_people, get_my_van_stock, log_van_materials_used,
            undo_van_material_use, count_van_stock
   All RPCs postdate the last types.ts regeneration, hence the casts.
   ========================================================================== */

const rpc = async <T>(fn: string, args: Record<string, unknown> = {}): Promise<T> => {
  const { data, error } = await supabase.rpc(fn as never, args as never);
  if (error) throw error;
  return data as unknown as T;
};

/** Our own RPC messages are written for people; anything else gets the fallback. */
export const kitError = (e: unknown, fallback: string) => {
  const msg = (e as { message?: string })?.message ?? '';
  if (
    /not on your name|not on the team|not on the fleet|not both|Mark it back in use|Say what is wrong|Pick someone|already on their name|not your van|Pick the job|not on that job|at least one item|Check the quantity|already on this van|Enter how many|Ask the office|cannot be negative|Pick an item|Unknown supplier|photo must be/i.test(
      msg
    )
  ) {
    return msg;
  }
  return fallback;
};

/* ── Types ─────────────────────────────────────────────────────────────── */

export type ToolEventKind = 'issued' | 'confirmed' | 'returned' | 'transferred' | 'fault' | 'lost' | 'repaired';

export interface ToolEvent {
  id: string;
  kind: ToolEventKind;
  note: string | null;
  from_label: string | null;
  to_label: string | null;
  actor_name: string | null;
  by_office: boolean;
  photo_path?: string | null;
  has_photo?: boolean;
  created_at: string;
}

export interface MyKitTool {
  id: string;
  name: string;
  category: string | null;
  serial_number: string | null;
  tool_number: string | null;
  barcode: string | null;
  status: string;
  pat_date: string | null;
  pat_due: string | null;
  last_calibration: string | null;
  next_calibration: string | null;
  issue_state: 'pending' | 'confirmed' | null;
  issued_at: string | null;
  confirmed_at: string | null;
  on_van: boolean;
  vehicle_id: string | null;
  vehicle_registration: string | null;
  events: ToolEvent[];
}

export interface MyKit {
  tools: MyKitTool[];
  vans: { id: string; registration: string | null; make: string | null; model: string | null }[];
}

export interface VanStockLine {
  id: string;
  vehicle_id: string;
  registration: string | null;
  price_book_item_id: string | null;
  name: string;
  unit: string;
  qty: number;
  min_qty: number;
  par_qty: number | null;
  low: boolean;
  on_order: number;
  supplier_id: string | null;
  supplier_name: string | null;
  barcode: string | null;
  last_counted_at: string | null;
  updated_at: string;
  /** Buy price: owner/admin only, null for office managers. */
  unit_cost: number | null;
  money_visible: boolean;
}

export interface VanStockMove {
  id: string;
  vehicle_id: string | null;
  registration: string | null;
  kind: 'added' | 'count' | 'used' | 'received';
  name: string;
  unit: string | null;
  qty: number;
  qty_after: number | null;
  job_id: string | null;
  job_title: string | null;
  po_id: string | null;
  note: string | null;
  actor_name: string | null;
  reversed: boolean;
  created_at: string;
  line_cost: number | null;
}

export interface MyVanItem {
  id: string;
  name: string;
  unit: string;
  qty: number;
  min_qty: number;
  low: boolean;
  barcode: string | null;
  on_order: boolean;
}

export interface MyVanUse {
  id: string;
  name: string;
  unit: string | null;
  qty: number;
  job_id: string | null;
  job_title: string | null;
  created_at: string;
  reversed: boolean;
  can_undo: boolean;
}

export interface MyVan {
  id: string;
  registration: string | null;
  make: string | null;
  model: string | null;
  items: MyVanItem[];
  recent: MyVanUse[];
}

export interface KitAttention {
  due: number;
  overdue: number;
  due_first: { tool_id: string; name: string; label: string; due: string; holder: string | null } | null;
  faults: number;
  fault_first: { tool_id: string; name: string; status: string; who: string | null } | null;
  low_stock: number;
  low_vans: number;
  low_first: { vehicle_id: string; registration: string | null; name: string } | null;
  unconfirmed: number;
}

const num = (v: unknown) => (v == null ? null : Number(v));

/* ── Photos (private kit-photos bucket, <uid>/...) ─────────────────────── */

export async function uploadKitPhoto(file: File): Promise<string> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('Not signed in');
  const small = await compressImageForUpload(file);
  const ext = (small.type.split('/')[1] || 'jpg').replace('jpeg', 'jpg');
  const path = `${user.id}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage
    .from('kit-photos')
    .upload(path, small, { contentType: small.type || 'image/jpeg', upsert: false });
  if (error) throw error;
  return path;
}

/* ── Office ────────────────────────────────────────────────────────────── */

export function useToolEvents(toolId: string | null | undefined) {
  return useQuery({
    queryKey: ['tool-events', toolId],
    enabled: !!toolId,
    queryFn: async (): Promise<ToolEvent[]> => {
      const { data, error } = await supabase
        .from('employer_tool_events' as never)
        .select('id, kind, note, from_label, to_label, actor_name, by_office, photo_path, created_at')
        .eq('tool_id', toolId as string)
        .order('created_at', { ascending: false })
        .limit(50);
      if (error) throw error;
      return (data ?? []) as unknown as ToolEvent[];
    },
  });
}

const invalidateKit = (qc: ReturnType<typeof useQueryClient>) => {
  qc.invalidateQueries({ queryKey: ['company-tools'] });
  qc.invalidateQueries({ queryKey: ['tool-events'] });
  qc.invalidateQueries({ queryKey: ['kit-attention'] });
  qc.invalidateQueries({ queryKey: ['my-kit'] });
};

export function useIssueTool() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: { toolId: string; employeeId?: string | null; vehicleId?: string | null; note?: string }) =>
      rpc<{ holder: string; needs_confirm: boolean }>('issue_company_tool', {
        p_tool: input.toolId,
        p_employee: input.employeeId ?? null,
        p_vehicle: input.vehicleId ?? null,
        p_note: input.note?.trim() || null,
      }),
    onSuccess: (r, input) => {
      invalidateKit(qc);
      if (!input.employeeId && !input.vehicleId) toast.success('Back in the office');
      else
        toast.success(
          r?.needs_confirm ? `Issued to ${r.holder}. They have been asked to confirm.` : `Issued to ${r?.holder ?? 'them'}`
        );
    },
    onError: (e) => toast.error(kitError(e, 'Could not issue that. Try again.')),
  });
}

export function useMarkToolRepaired() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: { toolId: string; note?: string }) =>
      rpc<void>('mark_company_tool_repaired', { p_tool: input.toolId, p_note: input.note?.trim() || null }),
    onSuccess: () => {
      invalidateKit(qc);
      toast.success('Marked back in use');
    },
    onError: (e) => toast.error(kitError(e, 'Could not update that. Try again.')),
  });
}

export function useKitAttention(firmId: string | null | undefined) {
  return useQuery({
    queryKey: ['kit-attention', firmId],
    enabled: !!firmId,
    staleTime: 60 * 1000,
    queryFn: () => rpc<KitAttention | null>('get_kit_attention', { p_firm: firmId }),
  });
}

export function useVanStock(vehicleId?: string | null, enabled = true) {
  const { data: firmId } = useActingFirmId();
  return useQuery({
    queryKey: ['van-stock', firmId, vehicleId ?? 'all'],
    enabled: !!firmId && enabled,
    queryFn: async (): Promise<VanStockLine[]> => {
      const rows = await rpc<Array<Record<string, unknown>>>('get_van_stock', {
        p_firm: firmId,
        p_vehicle: vehicleId ?? null,
      });
      return (rows ?? []).map((r) => ({
        ...(r as unknown as VanStockLine),
        qty: Number(r.qty ?? 0),
        min_qty: Number(r.min_qty ?? 0),
        par_qty: num(r.par_qty),
        on_order: Number(r.on_order ?? 0),
        unit_cost: num(r.unit_cost),
      }));
    },
  });
}

export function useVanStockMoves(vehicleId?: string | null) {
  const { data: firmId } = useActingFirmId();
  return useQuery({
    queryKey: ['van-stock-moves', firmId, vehicleId ?? 'all'],
    enabled: !!firmId,
    queryFn: async (): Promise<VanStockMove[]> => {
      const rows = await rpc<Array<Record<string, unknown>>>('get_van_stock_moves', {
        p_firm: firmId,
        p_vehicle: vehicleId ?? null,
        p_limit: 40,
      });
      return (rows ?? []).map((r) => ({
        ...(r as unknown as VanStockMove),
        qty: Number(r.qty ?? 0),
        qty_after: num(r.qty_after),
        line_cost: num(r.line_cost),
      }));
    },
  });
}

const invalidateStock = (qc: ReturnType<typeof useQueryClient>) => {
  qc.invalidateQueries({ queryKey: ['van-stock'] });
  qc.invalidateQueries({ queryKey: ['van-stock-moves'] });
  qc.invalidateQueries({ queryKey: ['kit-attention'] });
  qc.invalidateQueries({ queryKey: ['my-van-stock'] });
  qc.invalidateQueries({ queryKey: ['material_orders'] });
};

export interface SaveVanStockInput {
  vehicleId: string;
  id?: string | null;
  priceBookItemId?: string | null;
  name: string;
  unit: string;
  qty: number;
  minQty: number;
  parQty: number | null;
  supplierId: string | null;
  barcode: string | null;
}

export function useSaveVanStockItem() {
  const qc = useQueryClient();
  const { data: firmId } = useActingFirmId();
  return useMutation({
    mutationFn: (i: SaveVanStockInput) =>
      rpc<string>('save_van_stock_item', {
        p_firm: firmId,
        p_vehicle: i.vehicleId,
        p_id: i.id ?? null,
        p_price_book_item_id: i.priceBookItemId ?? null,
        p_name: i.name,
        p_unit: i.unit,
        p_qty: i.qty,
        p_min: i.minQty,
        p_par: i.parQty,
        p_supplier: i.supplierId,
        p_barcode: i.barcode,
      }),
    onSuccess: (_d, i) => {
      invalidateStock(qc);
      toast.success(i.id ? 'Saved' : `${i.name} added to the van`);
    },
    onError: (e) => toast.error(kitError(e, 'Could not save that. Try again.')),
  });
}

export function useDeleteVanStockItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => rpc<void>('delete_van_stock_item', { p_id: id }),
    onSuccess: () => {
      invalidateStock(qc);
      toast.success('Taken off the van');
    },
    onError: (e) => toast.error(kitError(e, 'Could not remove that. Try again.')),
  });
}

export function useCountVanStock() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (i: { stockId: string; qty: number; note?: string }) =>
      rpc<{ qty: number; low: boolean; reorder_raised: boolean }>('count_van_stock', {
        p_stock: i.stockId,
        p_qty: i.qty,
        p_note: i.note?.trim() || null,
      }),
    onSuccess: (r) => {
      invalidateStock(qc);
      toast.success(r?.reorder_raised ? 'Count saved. Running low, so the office has a draft order.' : 'Count saved');
    },
    onError: (e) => toast.error(kitError(e, 'Could not save the count. Try again.')),
  });
}

/* ── Worker ────────────────────────────────────────────────────────────── */

export function useMyKit() {
  return useQuery({
    queryKey: ['my-kit'],
    queryFn: () => rpc<MyKit>('get_my_kit'),
    staleTime: 30 * 1000,
  });
}

export function useConfirmTool() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (toolId: string) => rpc<void>('confirm_company_tool', { p_tool: toolId }),
    onSuccess: () => {
      invalidateKit(qc);
      toast.success('Confirmed. The office can see you have it.');
    },
    onError: (e) => toast.error(kitError(e, 'Could not confirm. Try again.')),
  });
}

export function useTransferPeople(toolId: string | null | undefined, enabled: boolean) {
  return useQuery({
    queryKey: ['kit-transfer-people', toolId],
    enabled: !!toolId && enabled,
    queryFn: () =>
      rpc<Array<{ employee_id: string; name: string; role: string | null; on_app: boolean }>>(
        'get_kit_transfer_people',
        { p_tool: toolId }
      ),
  });
}

export function useTransferTool() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (i: { toolId: string; toEmployeeId: string; note?: string }) =>
      rpc<void>('transfer_company_tool', {
        p_tool: i.toolId,
        p_to_employee: i.toEmployeeId,
        p_note: i.note?.trim() || null,
      }),
    onSuccess: () => {
      invalidateKit(qc);
      toast.success('Passed on. They have been asked to confirm, and the office knows.');
    },
    onError: (e) => toast.error(kitError(e, 'Could not pass it on. Try again.')),
  });
}

export function useReturnTool() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (i: { toolId: string; note?: string }) =>
      rpc<void>('return_company_tool', { p_tool: i.toolId, p_note: i.note?.trim() || null }),
    onSuccess: () => {
      invalidateKit(qc);
      toast.success('Handed back. The office has been told.');
    },
    onError: (e) => toast.error(kitError(e, 'Could not hand it back. Try again.')),
  });
}

export function useReportTool() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (i: { toolId: string; kind: 'fault' | 'lost'; note: string; photoPath?: string | null }) =>
      rpc<void>('report_company_tool', {
        p_tool: i.toolId,
        p_kind: i.kind,
        p_note: i.note.trim(),
        p_photo_path: i.photoPath ?? null,
      }),
    onSuccess: (_d, i) => {
      invalidateKit(qc);
      toast.success(i.kind === 'lost' ? 'Reported lost. The office has been told.' : 'Fault reported. The office has been told.');
    },
    onError: (e) => toast.error(kitError(e, 'Could not send the report. Try again.')),
  });
}

export function useMyVanStock() {
  return useQuery({
    queryKey: ['my-van-stock'],
    queryFn: async (): Promise<MyVan[]> => {
      const r = await rpc<{ vans: MyVan[] }>('get_my_van_stock');
      return (r?.vans ?? []).map((v) => ({
        ...v,
        items: (v.items ?? []).map((i) => ({ ...i, qty: Number(i.qty), min_qty: Number(i.min_qty) })),
        recent: (v.recent ?? []).map((u) => ({ ...u, qty: Number(u.qty) })),
      }));
    },
    staleTime: 30 * 1000,
  });
}

export function useLogMaterialsUsed() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (i: { vehicleId: string; jobId: string; lines: { stock_id: string; qty: number }[]; note?: string }) =>
      rpc<{ lines: { stock_id: string; name: string; qty_after: number; low: boolean }[]; reorder_raised: number }>(
        'log_van_materials_used',
        { p_vehicle: i.vehicleId, p_job: i.jobId, p_lines: i.lines, p_note: i.note?.trim() || null }
      ),
    onSuccess: (r) => {
      invalidateStock(qc);
      qc.invalidateQueries({ queryKey: ['job-van-materials'] });
      const low = (r?.lines ?? []).filter((l) => l.low).length;
      toast.success(
        low > 0
          ? `Logged. ${low} ${low === 1 ? 'item is' : 'items are'} running low and the office has been told.`
          : 'Logged against the job'
      );
    },
    onError: (e) => toast.error(kitError(e, 'Could not log that. Try again.')),
  });
}

export function useUndoMaterialUse() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (moveId: string) => rpc<void>('undo_van_material_use', { p_move: moveId }),
    onSuccess: () => {
      invalidateStock(qc);
      qc.invalidateQueries({ queryKey: ['job-van-materials'] });
      toast.success('Undone. The stock is back on the van.');
    },
    onError: (e) => toast.error(kitError(e, 'Could not undo that. Try again.')),
  });
}
