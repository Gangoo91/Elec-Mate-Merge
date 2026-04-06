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
  created_at: string;
  updated_at: string;
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
  }) => {
    if (!user?.id) return null;

    const totalItems = plan.totalItems ?? plan.rooms.reduce(
      (sum, r) => sum + (r.symbolIds?.length || 0), 0
    );

    // Strip fullImage from rooms before saving (too large for JSONB)
    // Keep thumbnails only — fullImage regenerated from canvasState when needed
    const roomsForDb = plan.rooms.map(({ fullImage, ...rest }) => rest);

    const row = {
      user_id: user.id,
      name: plan.name,
      property_address: plan.propertyAddress || null,
      client_name: plan.clientName || null,
      rooms: roomsForDb,
      total_items: totalItems,
      updated_at: new Date().toISOString(),
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
