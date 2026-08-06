import { useCallback, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import type { SavedRoom } from './useFloorPlanRooms';

interface FloorPlanRow {
  id: string;
  name: string;
  property_address: string | null;
  client_name: string | null;
  status: string;
  rooms: SavedRoom[];
  notes: string | null;
  total_items: number;
  pdf_url: string | null;
  project_id: string | null;
  report_id: string | null;
  created_at: string;
  updated_at: string;
}

/**
 * Soft ceiling for the serialised `rooms` JSONB payload. Room images are
 * base64 PNGs, so a large multi-room plan can otherwise push a single row into
 * the tens of megabytes. Base64 is ASCII, so string length ≈ bytes here.
 */
const MAX_ROOMS_PAYLOAD_BYTES = 4_000_000;

/**
 * Keep every room's high-res `fullImage` where the payload allows it, dropping
 * them oldest-first (falling back to the thumbnail) only once the ceiling is
 * hit. Rooms are otherwise returned untouched.
 *
 * Each room is serialised exactly once and the running total adjusted
 * arithmetically — re-serialising the whole array per iteration would be
 * quadratic on the largest payloads, which is precisely when it runs.
 */
function capRoomPayload(rooms: SavedRoom[]): SavedRoom[] {
  let total = rooms.reduce((sum, room) => sum + JSON.stringify(room).length, 0);
  if (total <= MAX_ROOMS_PAYLOAD_BYTES) return rooms;

  const next = [...rooms];
  let dropped = 0;
  // Oldest first — the room being worked on now is the one most likely to be
  // exported next, so it keeps its full-resolution image longest.
  for (let i = 0; i < next.length && total > MAX_ROOMS_PAYLOAD_BYTES; i++) {
    const image = next[i].fullImage;
    if (!image) continue;
    const { fullImage: _omitted, ...rest } = next[i];
    next[i] = rest as SavedRoom;
    total -= image.length;
    dropped++;
  }

  if (total > MAX_ROOMS_PAYLOAD_BYTES) {
    console.warn(
      `[floor-plan] rooms payload still ~${total} bytes with every full image dropped — ` +
        'thumbnails alone exceed the ceiling. The save may be rejected.'
    );
  } else {
    console.warn(
      `[floor-plan] rooms payload over ceiling — dropped full images from ${dropped} room(s)`
    );
  }
  return next;
}

/**
 * Cloud sync for floor plans — saves to Supabase `floor_plans` table.
 * Uses local-first approach: localStorage is primary, Supabase is backup/sync.
 */
export function useFloorPlanCloud() {
  const { user } = useAuth();
  const syncTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Save/update a floor plan to Supabase
  const saveToCloud = useCallback(async (plan: {
    id?: string;
    name: string;
    rooms: SavedRoom[];
    propertyAddress?: string;
    clientName?: string;
    totalItems?: number;
    /** When set, the row is created/updated with this project_id so the
     *  plan immediately appears linked in ProjectDetailPage without a
     *  second link call. Pass `null` to explicitly detach. */
    projectId?: string | null;
    /** When set, attaches the plan to a specific certificate/report (EICR/EIC
     *  etc.) via floor_plans.report_id. Pass `null` to explicitly detach. */
    reportId?: string | null;
  }) => {
    if (!user?.id) return null;

    const totalItems = plan.totalItems ?? plan.rooms.reduce(
      (sum, r) => sum + (r.symbolIds?.length || 0), 0
    );

    // `fullImage` is the high-res render the PDF is built from. It used to be
    // stripped here, with a comment claiming it was "regenerated from
    // canvasState when needed" — nothing ever regenerated it. The result was
    // that any plan which round-tripped through the cloud (every deep-linked
    // project plan) exported its PDF from the 120x90 THUMBNAIL blown up to A4.
    //
    // So we keep it, and cap instead: if the payload would be unreasonably
    // large for a JSONB column, drop full images oldest-first and keep the
    // most recent rooms sharp rather than degrading all of them.
    const roomsForDb = capRoomPayload(plan.rooms);

    const baseRow = {
      user_id: user.id,
      name: plan.name,
      property_address: plan.propertyAddress || null,
      client_name: plan.clientName || null,
      rooms: roomsForDb,
      total_items: totalItems,
      updated_at: new Date().toISOString(),
    };
    // Only include link columns when explicitly provided so an unrelated save
    // never clears an existing project/report link.
    const row = {
      ...baseRow,
      ...(plan.projectId !== undefined ? { project_id: plan.projectId } : {}),
      ...(plan.reportId !== undefined ? { report_id: plan.reportId } : {}),
    };

    if (plan.id) {
      // Update existing
      const { data, error } = await (supabase
        .from('floor_plans' as any)
        .update(row)
        .eq('id', plan.id)
        .select()
        .single() as any);

      if (error) {
        console.error('Floor plan cloud save error:', error);
        return null;
      }
      return data as FloorPlanRow;
    } else {
      // Insert new
      const { data, error } = await (supabase
        .from('floor_plans' as any)
        .insert({ ...row, status: 'draft' })
        .select()
        .single() as any);

      if (error) {
        console.error('Floor plan cloud save error:', error);
        return null;
      }
      return data as FloorPlanRow;
    }
  }, [user?.id]);

  // Load all floor plans from Supabase
  const loadFromCloud = useCallback(async (): Promise<FloorPlanRow[]> => {
    if (!user?.id) return [];

    const { data, error } = await (supabase
      .from('floor_plans' as any)
      .select('*')
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false }) as any);

    if (error) {
      console.error('Floor plan cloud load error:', error);
      return [];
    }
    return (data || []) as FloorPlanRow[];
  }, [user?.id]);

  // Delete a floor plan from Supabase
  const deleteFromCloud = useCallback(async (id: string) => {
    if (!user?.id) return;
    await (supabase.from('floor_plans' as any).delete().eq('id', id) as any);
  }, [user?.id]);

  // Debounced sync — call this after local saves
  const syncDebounced = useCallback((plan: {
    id?: string;
    name: string;
    rooms: SavedRoom[];
    propertyAddress?: string;
    clientName?: string;
  }) => {
    if (syncTimeoutRef.current) clearTimeout(syncTimeoutRef.current);
    syncTimeoutRef.current = setTimeout(() => {
      saveToCloud(plan);
    }, 5000); // 5-second debounce
  }, [saveToCloud]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (syncTimeoutRef.current) clearTimeout(syncTimeoutRef.current);
    };
  }, []);

  return {
    saveToCloud,
    loadFromCloud,
    deleteFromCloud,
    syncDebounced,
  };
}
