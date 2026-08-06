import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

/**
 * ELE-1478 — the running log of things that are true about a SITE rather than a
 * job: where the meter is, the access code, which breaker is mislabelled.
 *
 * `customer_properties.notes` already existed but is a single overwritable box,
 * which is why only 3 of 17 properties had anything in it. This is append-many,
 * pinnable, and each entry can carry photos.
 */

/** A running log has no natural end; bound the first page. */
const SITE_NOTES_PAGE_SIZE = 200;
/** PostgREST puts `in` values in the query string — keep the URL well short. */
const ID_CHUNK = 100;

export const SITE_NOTE_CATEGORIES = [
  'general',
  'access',
  'meter',
  'hazard',
  'equipment',
  'parking',
] as const;

export type SiteNoteCategory = (typeof SITE_NOTE_CATEGORIES)[number];

/** Labels are sentence case to match the rest of the customer record. */
export const SITE_NOTE_CATEGORY_LABELS: Record<SiteNoteCategory, string> = {
  general: 'General',
  access: 'Access',
  meter: 'Meter & supply',
  hazard: 'Hazard',
  equipment: 'Equipment',
  parking: 'Parking',
};

export interface SiteNotePhoto {
  id: string;
  url: string;
  thumbnailUrl?: string | null;
  description?: string | null;
}

export interface SiteNote {
  id: string;
  customerId: string;
  propertyId: string | null;
  category: SiteNoteCategory;
  body: string;
  isPinned: boolean;
  createdAt: string;
  updatedAt: string;
  photos: SiteNotePhoto[];
}

export interface SiteNoteInput {
  body: string;
  category?: SiteNoteCategory;
  propertyId?: string | null;
  isPinned?: boolean;
}

interface SiteNoteRow {
  id: string;
  customer_id: string;
  property_id: string | null;
  category: string;
  body: string;
  is_pinned: boolean;
  created_at: string;
  updated_at: string;
}

interface PhotoRow {
  id: string;
  site_note_id: string | null;
  file_url: string;
  thumbnail_url: string | null;
  description: string | null;
}

export const useSiteNotes = (customerId: string) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const queryKey = ['site-notes', customerId];

  const {
    data: notes = [],
    isLoading,
    refetch,
  } = useQuery<SiteNote[]>({
    queryKey,
    enabled: !!customerId,
    queryFn: async () => {
      if (!customerId) return [];

      // `as never` throughout: types.ts predates this migration, so the
      // generated types have no site_notes table. Regenerating is a separate
      // job — see the pending types.ts regen.
      const { data, error } = await supabase
        .from('site_notes' as never)
        .select('*')
        .eq('customer_id', customerId)
        .order('is_pinned', { ascending: false })
        .order('created_at', { ascending: false })
        // A running log has no natural end. Bounded so a customer with years of
        // history cannot turn opening their record into a several-MB download.
        .limit(SITE_NOTES_PAGE_SIZE);

      if (error) throw error;

      const rows = (data || []) as unknown as SiteNoteRow[];
      if (rows.length === 0) return [];

      // Photos in one round trip per chunk rather than per note — a busy
      // landlord site can carry 30+ entries and n+1 here would be felt on 4G.
      // Chunked because PostgREST puts `in` values in the query STRING, and
      // 200 uuids is ~7.5KB of URL — over some proxy limits.
      const photoRows: PhotoRow[] = [];
      for (let i = 0; i < rows.length; i += ID_CHUNK) {
        const ids = rows.slice(i, i + ID_CHUNK).map((r) => r.id);
        // `as never` on the table too: types.ts has no site_note_id column, so
        // letting TS parse this select blows up with "type instantiation is
        // excessively deep". Same stale-types reason as site_notes above.
        const { data: photoData, error: photoError } = await supabase
          .from('safety_photos' as never)
          .select('id, site_note_id, file_url, thumbnail_url, description')
          .in('site_note_id', ids)
          .order('created_at', { ascending: true });

        // A photo-fetch failure must not blank the notes themselves — the text
        // is the thing the electrician came for.
        if (photoError) {
          console.warn('[useSiteNotes] photo fetch failed, showing notes without photos', photoError);
          continue;
        }
        photoRows.push(...((photoData || []) as unknown as PhotoRow[]));
      }

      const photosByNote = new Map<string, SiteNotePhoto[]>();
      for (const p of photoRows.filter((p) => p.site_note_id)) {
        const list = photosByNote.get(p.site_note_id!) || [];
        list.push({
          id: p.id,
          url: p.file_url,
          thumbnailUrl: p.thumbnail_url,
          description: p.description,
        });
        photosByNote.set(p.site_note_id!, list);
      }

      return rows.map((r) => ({
        id: r.id,
        customerId: r.customer_id,
        propertyId: r.property_id,
        category: (SITE_NOTE_CATEGORIES as readonly string[]).includes(r.category)
          ? (r.category as SiteNoteCategory)
          : 'general',
        body: r.body,
        isPinned: r.is_pinned,
        createdAt: r.created_at,
        updatedAt: r.updated_at,
        photos: photosByNote.get(r.id) || [],
      }));
    },
  });

  const addNote = useMutation({
    mutationFn: async (input: SiteNoteInput): Promise<string> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('You need to be signed in to add a note.');

      // user_id is set explicitly rather than defaulted in the database — a
      // defaulted owner column is how rows silently land on the wrong account.
      const { data, error } = await supabase
        .from('site_notes' as never)
        .insert({
          user_id: user.id,
          customer_id: customerId,
          property_id: input.propertyId ?? null,
          category: input.category ?? 'general',
          body: input.body.trim(),
          is_pinned: input.isPinned ?? false,
        } as never)
        .select('id')
        .single();

      if (error) throw error;
      return (data as unknown as { id: string }).id;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
    onError: (error: Error) =>
      toast({ title: 'Could not save note', description: error.message, variant: 'destructive' }),
  });

  const updateNote = useMutation({
    // Partial: the card's pin toggle sends `{ isPinned }` alone, with no body.
    // The patch below already writes only the keys present.
    mutationFn: async ({
      noteId,
      updates,
    }: {
      noteId: string;
      updates: Partial<SiteNoteInput>;
    }) => {
      const patch: Record<string, unknown> = {};
      if (updates.body !== undefined) patch.body = updates.body.trim();
      if (updates.category !== undefined) patch.category = updates.category;
      if (updates.propertyId !== undefined) patch.property_id = updates.propertyId;
      if (updates.isPinned !== undefined) patch.is_pinned = updates.isPinned;

      const { error } = await supabase
        .from('site_notes' as never)
        .update(patch as never)
        .eq('id', noteId);

      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
    onError: (error: Error) =>
      toast({ title: 'Could not update note', description: error.message, variant: 'destructive' }),
  });

  const deleteNote = useMutation({
    mutationFn: async (noteId: string) => {
      // Photos survive: safety_photos.site_note_id is ON DELETE SET NULL, so
      // the images fall back to the general library rather than being orphaned
      // in storage with no row pointing at them.
      const { error } = await supabase.from('site_notes' as never).delete().eq('id', noteId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      toast({ title: 'Note deleted' });
    },
    onError: (error: Error) =>
      toast({ title: 'Could not delete note', description: error.message, variant: 'destructive' }),
  });

  // Detach rather than delete: the image stays in the photo library, which is
  // what the delete-note copy promises and avoids leaving a storage object with
  // no row pointing at it.
  const detachPhoto = useMutation({
    mutationFn: async (photoId: string) => {
      const { error } = await supabase
        .from('safety_photos')
        .update({ site_note_id: null } as never)
        .eq('id', photoId);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
    onError: (error: Error) =>
      toast({ title: 'Could not remove photo', description: error.message, variant: 'destructive' }),
  });

  return {
    notes,
    // Never silently truncate: the tab says so when the cap is hit, rather than
    // showing 200 notes as though that were all of them.
    hasMore: notes.length >= SITE_NOTES_PAGE_SIZE,
    pageSize: SITE_NOTES_PAGE_SIZE,
    isLoading,
    refetch,
    addNote: addNote.mutateAsync,
    updateNote: updateNote.mutateAsync,
    deleteNote: deleteNote.mutate,
    detachPhoto: detachPhoto.mutateAsync,
    isSaving: addNote.isPending || updateNote.isPending,
  };
};

export interface CustomerPhotoProject {
  id: string;
  name: string;
  address: string | null;
  jobReference: string | null;
  propertyId: string | null;
  createdAt: string;
  photoCount: number;
  coverUrl: string | null;
  /** Carried in full so expanding a set costs no extra round trip. */
  photos: SiteNotePhoto[];
}

/**
 * ELE-1478 — photo_projects has carried customer_id all along (15 of 19 rows
 * populated), but nothing under components/customers/ ever read it, so a
 * customer's job photos were only reachable by going to the Photo Docs tool and
 * guessing which project belonged to them. This is that missing consumer.
 *
 * Scoped to one customer rather than reusing usePhotoProjects(), which loads
 * every project the user owns.
 */
export const useCustomerPhotoProjects = (customerId: string) => {
  const { data: projects = [], isLoading } = useQuery<CustomerPhotoProject[]>({
    queryKey: ['customer-photo-projects', customerId],
    enabled: !!customerId,
    queryFn: async () => {
      if (!customerId) return [];

      const { data, error } = await supabase
        .from('photo_projects')
        .select('id, name, address, job_reference, property_id, created_at')
        .eq('customer_id', customerId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const rows = (data || []) as unknown as {
        id: string;
        name: string;
        address: string | null;
        job_reference: string | null;
        property_id: string | null;
        created_at: string;
      }[];
      if (rows.length === 0) return [];

      const { data: photoData } = await supabase
        .from('safety_photos')
        .select('id, project_id, file_url, thumbnail_url, description, created_at')
        .in(
          'project_id',
          rows.map((r) => r.id)
        )
        .order('created_at', { ascending: false });

      const byProject = new Map<string, SiteNotePhoto[]>();
      for (const p of (photoData || []) as unknown as {
        id: string;
        project_id: string | null;
        file_url: string;
        thumbnail_url: string | null;
        description: string | null;
      }[]) {
        if (!p.project_id) continue;
        const list = byProject.get(p.project_id) || [];
        list.push({
          id: p.id,
          url: p.file_url,
          thumbnailUrl: p.thumbnail_url,
          description: p.description,
        });
        byProject.set(p.project_id, list);
      }

      return rows.map((r) => {
        const photos = byProject.get(r.id) || [];
        return {
          id: r.id,
          name: r.name,
          address: r.address,
          jobReference: r.job_reference,
          propertyId: r.property_id,
          createdAt: r.created_at,
          photoCount: photos.length,
          // Ordered newest-first by the query, so the first is the cover.
          coverUrl: photos[0]?.thumbnailUrl || photos[0]?.url || null,
          photos,
        };
      });
    },
  });

  return { projects, isLoading };
};
