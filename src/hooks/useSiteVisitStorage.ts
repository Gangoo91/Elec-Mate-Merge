import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { transformScopeToQuoteItems } from '@/utils/scopeToQuoteTransformer';
import type {
  SiteVisit,
  SiteVisitRoom,
  SiteVisitItem,
  SiteVisitPhoto,
  SiteVisitPrompt,
  ScopeBaseline,
  PreStartChecklist,
  SiteVisitStatus,
} from '@/types/siteVisit';
import { generatePreStartChecklist } from '@/utils/preStartChecklistGenerator';

export interface EnrichedSiteVisit extends SiteVisit {
  customerName?: string;
  quoteAcceptanceStatus?: string;
  quoteTags?: string[];
  quoteInvoiceRaised?: boolean;
}

interface UseSiteVisitStorageReturn {
  isLoading: boolean;
  isSaving: boolean;
  saveSiteVisit: (visit: SiteVisit) => Promise<string | null>;
  loadSiteVisit: (id: string) => Promise<SiteVisit | null>;
  listSiteVisits: () => Promise<EnrichedSiteVisit[]>;
  deleteSiteVisit: (id: string) => Promise<boolean>;
  updateStatus: (id: string, status: SiteVisitStatus) => Promise<boolean>;
  lockScopeBaseline: (visit: SiteVisit) => Promise<ScopeBaseline | null>;
  generatePreStartChecklistForVisit: (visit: SiteVisit) => Promise<PreStartChecklist | null>;
  sendToQuoteWizard: (visit: SiteVisit) => string;
  ensureCustomer: (visit: SiteVisit) => Promise<string | null>;
  uploadSiteVisitPhotos: (visit: SiteVisit) => Promise<SiteVisitPhoto[]>;
  createPhotoProject: (visit: SiteVisit) => Promise<string | null>;
  bridgePhotosToSafetyPhotos: (visit: SiteVisit) => Promise<void>;
  getQuoteStatus: (quoteId: string) => Promise<{ acceptanceStatus: string; tags: string[] } | null>;
  searchPreviousVisits: (
    addressQuery: string
  ) => Promise<Array<{ id: string; propertyAddress: string; status: string; updatedAt: string }>>;
}

export function useSiteVisitStorage(): UseSiteVisitStorageReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const saveSiteVisit = useCallback(
    async (visit: SiteVisit): Promise<string | null> => {
      setIsSaving(true);
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) throw new Error('Not authenticated');

        // Upsert site_visit
        const { data: visitRow, error: visitError } = await supabase
          .from('site_visits')
          .upsert({
            id: visit.id,
            user_id: user.id,
            customer_id: visit.customerId || null,
            property_address: visit.propertyAddress || null,
            property_postcode: visit.propertyPostcode || null,
            property_type: visit.propertyType || null,
            access_notes: visit.accessNotes || null,
            status: visit.status,
            quote_id: visit.quoteId || null,
            photo_project_id: visit.photoProjectId || null,
          })
          .select('id')
          .single();

        if (visitError) throw visitError;
        const visitId = visitRow.id;

        // Delete existing children and re-insert (simpler than diffing)
        await supabase.from('site_visit_rooms').delete().eq('site_visit_id', visitId);
        await supabase.from('site_visit_photos').delete().eq('site_visit_id', visitId);
        await supabase.from('site_visit_prompts').delete().eq('site_visit_id', visitId);

        // Insert rooms + items
        for (const room of visit.rooms) {
          const { data: roomRow, error: roomError } = await supabase
            .from('site_visit_rooms')
            .insert({
              id: room.id,
              site_visit_id: visitId,
              room_name: room.roomName,
              room_type: room.roomType,
              sort_order: room.sortOrder,
              notes: room.notes || null,
            })
            .select('id')
            .single();

          if (roomError) throw roomError;

          if (room.items.length > 0) {
            const itemRows = room.items.map((item) => ({
              id: item.id,
              room_id: roomRow.id,
              item_type: item.itemType,
              item_description: item.itemDescription,
              quantity: item.quantity,
              unit: item.unit,
              notes: item.notes || null,
              sort_order: item.sortOrder,
            }));
            const { error: itemsError } = await supabase.from('site_visit_items').insert(itemRows);
            if (itemsError) throw itemsError;
          }
        }

        // Insert photos (only those with persistent URLs — blob URLs are skipped)
        const persistedPhotos = visit.photos.filter((p) => !p.photoUrl.startsWith('blob:'));
        if (persistedPhotos.length > 0) {
          const photoRows = persistedPhotos.map((p) => ({
            id: p.id,
            site_visit_id: visitId,
            room_id: p.roomId || null,
            item_id: p.itemId || null,
            safety_photo_id: p.safetyPhotoId || null,
            photo_url: p.photoUrl,
            storage_path: p.storagePath || null,
            description: p.description || null,
            photo_phase: p.photoPhase,
          }));
          const { error: photosError } = await supabase.from('site_visit_photos').insert(photoRows);
          if (photosError) throw photosError;
        }

        // Insert prompts
        if (visit.prompts.length > 0) {
          const promptRows = visit.prompts.map((p) => ({
            id: p.id,
            site_visit_id: visitId,
            room_id: p.roomId || null,
            prompt_key: p.promptKey,
            prompt_question: p.promptQuestion,
            response: p.response || null,
          }));
          const { error: promptsError } = await supabase
            .from('site_visit_prompts')
            .insert(promptRows);
          if (promptsError) throw promptsError;
        }

        toast({
          title: 'Site visit saved',
          description: 'All data saved successfully.',
        });

        return visitId;
      } catch (error: unknown) {
        console.error('[SiteVisitStorage] Save failed:', error);
        toast({
          title: 'Save failed',
          description: error instanceof Error ? error.message : 'Could not save site visit.',
          variant: 'destructive',
        });
        return null;
      } finally {
        setIsSaving(false);
      }
    },
    [toast]
  );

  const loadSiteVisit = useCallback(
    async (id: string): Promise<SiteVisit | null> => {
      setIsLoading(true);
      try {
        const { data: row, error } = await supabase
          .from('site_visits')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        if (!row) return null;

        // Load rooms with items
        const { data: roomRows } = await supabase
          .from('site_visit_rooms')
          .select('*')
          .eq('site_visit_id', id)
          .order('sort_order');

        const rooms: SiteVisitRoom[] = [];
        for (const r of roomRows || []) {
          const { data: itemRows } = await supabase
            .from('site_visit_items')
            .select('*')
            .eq('room_id', r.id)
            .order('sort_order');

          rooms.push({
            id: r.id,
            siteVisitId: r.site_visit_id,
            roomName: r.room_name,
            roomType: r.room_type,
            sortOrder: r.sort_order,
            notes: r.notes,
            items: (itemRows || []).map((i: Record<string, unknown>) => ({
              id: i.id,
              roomId: i.room_id,
              itemType: i.item_type,
              itemDescription: i.item_description,
              quantity: i.quantity,
              unit: i.unit,
              notes: i.notes,
              sortOrder: i.sort_order,
            })),
          });
        }

        // Load photos
        const { data: photoRows } = await supabase
          .from('site_visit_photos')
          .select('*')
          .eq('site_visit_id', id);

        const photos: SiteVisitPhoto[] = (photoRows || []).map((p: Record<string, unknown>) => ({
          id: p.id,
          siteVisitId: p.site_visit_id,
          roomId: p.room_id,
          itemId: p.item_id,
          safetyPhotoId: p.safety_photo_id,
          photoUrl: p.photo_url,
          storagePath: p.storage_path,
          description: p.description,
          photoPhase: p.photo_phase,
        }));

        // Load prompts
        const { data: promptRows } = await supabase
          .from('site_visit_prompts')
          .select('*')
          .eq('site_visit_id', id);

        const prompts: SiteVisitPrompt[] = (promptRows || []).map((p: Record<string, unknown>) => ({
          id: p.id,
          siteVisitId: p.site_visit_id,
          roomId: p.room_id,
          promptKey: p.prompt_key,
          promptQuestion: p.prompt_question,
          response: p.response,
        }));

        return {
          id: row.id,
          userId: row.user_id,
          customerId: row.customer_id,
          propertyAddress: row.property_address,
          propertyPostcode: row.property_postcode,
          propertyType: row.property_type,
          accessNotes: row.access_notes,
          status: row.status,
          quoteId: row.quote_id,
          photoProjectId: row.photo_project_id,
          createdAt: row.created_at,
          updatedAt: row.updated_at,
          rooms,
          photos,
          prompts,
        };
      } catch (error: unknown) {
        console.error('[SiteVisitStorage] Load failed:', error);
        toast({
          title: 'Load failed',
          description: error instanceof Error ? error.message : 'Could not load site visit.',
          variant: 'destructive',
        });
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [toast]
  );

  const listSiteVisits = useCallback(async (): Promise<EnrichedSiteVisit[]> => {
    setIsLoading(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return [];

      const { data: rows, error } = await supabase
        .from('site_visits')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });

      if (error) throw error;
      if (!rows || rows.length === 0) return [];

      // Batch-fetch linked customer names
      const customerIds = [
        ...new Set(rows.map((r: Record<string, unknown>) => r.customer_id).filter(Boolean)),
      ];
      const customerMap: Record<string, string> = {};
      if (customerIds.length > 0) {
        const { data: customers } = await supabase
          .from('customers')
          .select('id, name')
          .in('id', customerIds);
        for (const c of customers || []) {
          customerMap[c.id] = c.name;
        }
      }

      // Batch-fetch linked quote statuses
      const quoteIds = [
        ...new Set(rows.map((r: Record<string, unknown>) => r.quote_id).filter(Boolean)),
      ];
      const quoteMap: Record<
        string,
        { acceptance_status: string; tags: string[]; invoice_raised: boolean }
      > = {};
      if (quoteIds.length > 0) {
        const { data: quotes } = await supabase
          .from('quotes')
          .select('id, acceptance_status, tags, invoice_raised')
          .in('id', quoteIds);
        for (const q of quotes || []) {
          quoteMap[q.id] = {
            acceptance_status: q.acceptance_status || '',
            tags: q.tags || [],
            invoice_raised: q.invoice_raised || false,
          };
        }
      }

      return rows.map((row: Record<string, unknown>) => ({
        id: row.id,
        userId: row.user_id,
        customerId: row.customer_id,
        propertyAddress: row.property_address,
        propertyPostcode: row.property_postcode,
        propertyType: row.property_type,
        accessNotes: row.access_notes,
        status: row.status,
        quoteId: row.quote_id,
        photoProjectId: row.photo_project_id,
        invoiceId: row.invoice_id,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
        rooms: [],
        photos: [],
        prompts: [],
        customerName: row.customer_id ? customerMap[row.customer_id] : undefined,
        quoteAcceptanceStatus: row.quote_id ? quoteMap[row.quote_id]?.acceptance_status : undefined,
        quoteTags: row.quote_id ? quoteMap[row.quote_id]?.tags : undefined,
        quoteInvoiceRaised: row.quote_id ? quoteMap[row.quote_id]?.invoice_raised : false,
      }));
    } catch (error: unknown) {
      console.error('[SiteVisitStorage] List failed:', error);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteSiteVisit = useCallback(
    async (id: string): Promise<boolean> => {
      try {
        const { error } = await supabase.from('site_visits').delete().eq('id', id);
        if (error) throw error;
        toast({ title: 'Site visit deleted' });
        return true;
      } catch (error: unknown) {
        toast({
          title: 'Delete failed',
          description: error instanceof Error ? error.message : 'Unknown error',
          variant: 'destructive',
        });
        return false;
      }
    },
    [toast]
  );

  const updateStatus = useCallback(
    async (id: string, status: SiteVisitStatus): Promise<boolean> => {
      try {
        const { error } = await supabase.from('site_visits').update({ status }).eq('id', id);
        if (error) throw error;
        return true;
      } catch (error: unknown) {
        console.error('[SiteVisitStorage] Status update failed:', error);
        return false;
      }
    },
    []
  );

  // Fix 3c: Ensure customer exists in CRM (create if inline, return existing if selected)
  const ensureCustomer = useCallback(async (visit: SiteVisit): Promise<string | null> => {
    try {
      // If customer already linked, nothing to do
      if (visit.customerId) return visit.customerId;

      // If no name, skip
      if (!visit.customerName?.trim()) return null;

      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return null;

      const { data, error } = await supabase
        .from('customers')
        .insert({
          user_id: user.id,
          name: visit.customerName.trim(),
          email: visit.customerEmail || null,
          phone: visit.customerPhone || null,
          address: visit.propertyAddress || null,
        })
        .select('id')
        .single();

      if (error) throw error;
      return data.id;
    } catch (error: unknown) {
      console.error('[SiteVisitStorage] Customer creation failed:', error);
      return null;
    }
  }, []);

  // Fix 3a: Create photo project for the site visit
  const createPhotoProject = useCallback(async (visit: SiteVisit): Promise<string | null> => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return null;

      const { data, error } = await supabase
        .from('photo_projects')
        .insert({
          user_id: user.id,
          customer_id: visit.customerId || null,
          name: `Site Visit — ${visit.propertyAddress || 'Unknown'}`,
          description: `Photos from site visit at ${visit.propertyAddress || 'unknown address'}`,
          address: visit.propertyAddress || null,
          status: 'active',
        })
        .select('id')
        .single();

      if (error) throw error;
      return data.id;
    } catch (error: unknown) {
      console.error('[SiteVisitStorage] Photo project creation failed:', error);
      return null;
    }
  }, []);

  // Fix 3b/4: Upload blob photos to Supabase storage and return updated photo records
  const uploadSiteVisitPhotos = useCallback(async (visit: SiteVisit): Promise<SiteVisitPhoto[]> => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return visit.photos;

    const updatedPhotos: SiteVisitPhoto[] = [];

    for (const photo of visit.photos) {
      // Skip already-uploaded photos
      if (!photo.photoUrl.startsWith('blob:')) {
        updatedPhotos.push(photo);
        continue;
      }

      try {
        // Fetch the blob
        const response = await fetch(photo.photoUrl);
        const blob = await response.blob();

        // Compress via canvas (max 1920px, 80% JPEG)
        const compressed = await compressImage(blob);

        const ext = 'jpg';
        const storagePath = `${user.id}/site-visit/${visit.id}/${crypto.randomUUID()}.${ext}`;

        const { error: uploadError } = await supabase.storage
          .from('safety-photos')
          .upload(storagePath, compressed, {
            contentType: 'image/jpeg',
            upsert: false,
          });

        if (uploadError) {
          console.error('[SiteVisitStorage] Photo upload failed:', uploadError);
          updatedPhotos.push(photo);
          continue;
        }

        const { data: urlData } = supabase.storage.from('safety-photos').getPublicUrl(storagePath);

        updatedPhotos.push({
          ...photo,
          photoUrl: urlData.publicUrl,
          storagePath,
        });

        // Revoke the blob URL to free memory
        URL.revokeObjectURL(photo.photoUrl);
      } catch (err) {
        console.error('[SiteVisitStorage] Photo processing failed:', err);
        updatedPhotos.push(photo);
      }
    }

    return updatedPhotos;
  }, []);

  const lockScopeBaseline = useCallback(
    async (visit: SiteVisit): Promise<ScopeBaseline | null> => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) throw new Error('Not authenticated');

        const baselineData = {
          rooms: visit.rooms.map((r) => ({
            roomName: r.roomName,
            roomType: r.roomType,
            items: r.items.map((i) => ({
              itemType: i.itemType,
              itemDescription: i.itemDescription,
              quantity: i.quantity,
              unit: i.unit,
            })),
          })),
          prompts: visit.prompts.map((p) => ({
            promptKey: p.promptKey,
            promptQuestion: p.promptQuestion,
            response: p.response,
          })),
          propertyAddress: visit.propertyAddress,
          propertyType: visit.propertyType,
          capturedAt: new Date().toISOString(),
        };

        const { data, error } = await supabase
          .from('scope_baselines')
          .insert({
            site_visit_id: visit.id,
            quote_id: visit.quoteId || null,
            baseline_data: baselineData,
            locked_by: user.id,
          })
          .select()
          .single();

        if (error) throw error;

        return {
          id: data.id,
          siteVisitId: data.site_visit_id,
          quoteId: data.quote_id,
          baselineData: data.baseline_data,
          lockedAt: data.locked_at,
          lockedBy: data.locked_by,
        };
      } catch (error: unknown) {
        console.error('[SiteVisitStorage] Baseline lock failed:', error);
        toast({
          title: 'Baseline lock failed',
          description: error instanceof Error ? error.message : 'Unknown error',
          variant: 'destructive',
        });
        return null;
      }
    },
    [toast]
  );

  const generatePreStartChecklistForVisit = useCallback(
    async (visit: SiteVisit): Promise<PreStartChecklist | null> => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) throw new Error('Not authenticated');

        const items = generatePreStartChecklist(visit);

        const { data, error } = await supabase
          .from('pre_start_checklists')
          .insert({
            site_visit_id: visit.id,
            user_id: user.id,
            items,
            status: 'pending',
          })
          .select()
          .single();

        if (error) throw error;

        return {
          id: data.id,
          siteVisitId: data.site_visit_id,
          userId: data.user_id,
          items: data.items,
          status: data.status,
        };
      } catch (error: unknown) {
        console.error('[SiteVisitStorage] Checklist generation failed:', error);
        return null;
      }
    },
    []
  );

  // Bridge site visit photos into the safety_photos table for Photo Documentation
  const bridgePhotosToSafetyPhotos = useCallback(async (visit: SiteVisit): Promise<void> => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const persistedPhotos = visit.photos.filter((p) => !p.photoUrl.startsWith('blob:'));
      if (persistedPhotos.length === 0) return;

      for (const photo of persistedPhotos) {
        const category = photo.photoPhase === 'before' ? 'before_work' : 'after_work';

        const { data: safetyPhoto, error: insertError } = await supabase
          .from('safety_photos')
          .insert({
            user_id: user.id,
            project_id: visit.photoProjectId || null,
            file_url: photo.photoUrl,
            photo_type: photo.photoPhase,
            category,
            description: photo.description || `Site visit photo — ${visit.propertyAddress || ''}`,
            location: visit.propertyAddress || null,
          })
          .select('id')
          .single();

        if (insertError) {
          console.error('[SiteVisitStorage] Bridge photo insert failed:', insertError);
          continue;
        }

        // Update the site_visit_photos FK to link back
        if (safetyPhoto) {
          await supabase
            .from('site_visit_photos')
            .update({ safety_photo_id: safetyPhoto.id })
            .eq('id', photo.id);
        }
      }
    } catch (error: unknown) {
      console.error('[SiteVisitStorage] Photo bridge failed:', error);
    }
  }, []);

  // Get quote status for post-job eligibility check
  const getQuoteStatus = useCallback(
    async (quoteId: string): Promise<{ acceptanceStatus: string; tags: string[] } | null> => {
      try {
        const { data, error } = await supabase
          .from('quotes')
          .select('acceptance_status, tags')
          .eq('id', quoteId)
          .single();

        if (error) throw error;
        return {
          acceptanceStatus: data.acceptance_status || '',
          tags: data.tags || [],
        };
      } catch (error: unknown) {
        console.error('[SiteVisitStorage] Quote status fetch failed:', error);
        return null;
      }
    },
    []
  );

  // Fix 2: Include materials from scopeToQuoteTransformer
  const sendToQuoteWizard = useCallback((visit: SiteVisit): string => {
    const sessionId = `site-visit-${visit.id}-${Date.now()}`;

    // Build scope description from rooms
    const roomSummary = visit.rooms
      .map((r) => {
        const itemList = r.items.map((i) => `${i.itemDescription} x${i.quantity}`).join(', ');
        return `${r.roomName}: ${itemList || 'no items'}`;
      })
      .join('\n');

    // Transform scope into quote materials
    const quoteItems = transformScopeToQuoteItems(visit);

    const siteVisitData = {
      siteVisitData: {
        client: {
          name: visit.customerName || '',
          email: visit.customerEmail || '',
          phone: visit.customerPhone || '',
          address: visit.propertyAddress || '',
          postcode: visit.propertyPostcode || '',
        },
        jobDetails: {
          title: `Electrical works — ${visit.propertyAddress || 'Site visit'}`,
          description: `Scope of works:\n${roomSummary}`,
          location: visit.propertyAddress || '',
        },
        materials: quoteItems,
        siteVisitId: visit.id,
      },
    };

    sessionStorage.setItem(sessionId, JSON.stringify(siteVisitData));
    return sessionId;
  }, []);

  const searchPreviousVisits = useCallback(
    async (
      addressQuery: string
    ): Promise<
      Array<{ id: string; propertyAddress: string; status: string; updatedAt: string }>
    > => {
      try {
        if (!addressQuery || addressQuery.trim().length < 3) return [];

        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) return [];

        const { data, error } = await supabase
          .from('site_visits')
          .select('id, property_address, status, updated_at')
          .eq('user_id', user.id)
          .ilike('property_address', `%${addressQuery.trim()}%`)
          .order('updated_at', { ascending: false })
          .limit(5);

        if (error) throw error;
        return (data || []).map((r: Record<string, unknown>) => ({
          id: r.id as string,
          propertyAddress: r.property_address as string,
          status: r.status as string,
          updatedAt: r.updated_at as string,
        }));
      } catch (error: unknown) {
        console.error('[SiteVisitStorage] Previous visit search failed:', error);
        return [];
      }
    },
    []
  );

  return {
    isLoading,
    isSaving,
    saveSiteVisit,
    loadSiteVisit,
    listSiteVisits,
    deleteSiteVisit,
    updateStatus,
    lockScopeBaseline,
    generatePreStartChecklistForVisit,
    sendToQuoteWizard,
    ensureCustomer,
    uploadSiteVisitPhotos,
    createPhotoProject,
    bridgePhotosToSafetyPhotos,
    getQuoteStatus,
    searchPreviousVisits,
  };
}

/** Compress an image blob to max 1920px JPEG at 80% quality */
async function compressImage(blob: Blob): Promise<Blob> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const MAX = 1920;
      let { width, height } = img;
      if (width > MAX || height > MAX) {
        const ratio = Math.min(MAX / width, MAX / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob((result) => resolve(result || blob), 'image/jpeg', 0.8);
      URL.revokeObjectURL(img.src);
    };
    img.onerror = () => resolve(blob);
    img.src = URL.createObjectURL(blob);
  });
}
