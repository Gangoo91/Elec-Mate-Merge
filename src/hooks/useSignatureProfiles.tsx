import { useState, useEffect } from 'react';
import { offlineStorage } from '@/utils/offlineStorage';
import { supabase } from '@/integrations/supabase/client';

export interface SignatureProfile {
  id: string;
  name: string;
  signatureData: string;
  createdAt: string;
  isDefault: boolean;
}

// Row shape of public.user_signatures (not yet in the generated Supabase types —
// cast the client locally to avoid regenerating the whole types file).
interface SignatureRow {
  id: string;
  user_id: string;
  name: string | null;
  signature_data: string;
  is_default: boolean;
  created_at: string;
}

const rowToProfile = (r: SignatureRow): SignatureProfile => ({
  id: r.id,
  name: r.name ?? '',
  signatureData: r.signature_data,
  createdAt: r.created_at,
  isDefault: !!r.is_default,
});

const profileToRow = (p: SignatureProfile, userId: string) => ({
  id: p.id,
  user_id: userId,
  name: p.name,
  signature_data: p.signatureData,
  is_default: p.isDefault,
  created_at: p.createdAt,
});

export const useSignatureProfiles = () => {
  const [signatures, setSignatures] = useState<SignatureProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSignatures();
  }, []);

  // The database is the source of truth — durable, survives mobile-WebView storage
  // eviction, and syncs across devices. IndexedDB (offlineStorage) is only an offline
  // cache / fallback. Previously this hook touched IndexedDB ONLY, so users lost their
  // saved signatures every time the app was closed and the WebView store was reclaimed.
  const loadSignatures = async () => {
    let profiles: SignatureProfile[] | null = null;

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data, error } = await (supabase as any)
          .from('user_signatures')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: true });

        if (!error && Array.isArray(data)) {
          if (data.length > 0) {
            profiles = (data as SignatureRow[]).map(rowToProfile);
            // Mirror the server into the offline cache.
            try {
              for (const p of profiles) await offlineStorage.saveSignatureProfile(p);
            } catch {
              /* cache refresh is best-effort */
            }
          } else {
            // Server has none yet — migrate anything still in the local cache up to
            // the server (one-time) so existing users don't lose what's in IndexedDB.
            const cached = await offlineStorage
              .getSignatureProfiles()
              .catch(() => [] as SignatureProfile[]);
            if (cached.length > 0) {
              profiles = cached;
              try {
                await (supabase as any)
                  .from('user_signatures')
                  .upsert(cached.map((p) => profileToRow(p, user.id)), { onConflict: 'id' });
              } catch (e) {
                console.error('Failed to migrate cached signatures to server:', e);
              }
            } else {
              profiles = [];
            }
          }
        }
      }
    } catch (error) {
      console.error('Failed to load signatures from server:', error);
    }

    // Offline / signed-out / server error → fall back to the local cache.
    if (!profiles) {
      try {
        profiles = await offlineStorage.getSignatureProfiles();
      } catch (error) {
        console.error('Failed to load signature profiles:', error);
        profiles = [];
      }
    }

    // ELE-1128 / ELE-1134 — the signature library was a separate, usually-empty
    // store, so the Signature Manager showed "No signatures saved" even when the
    // user already had a signature set in their Inspector Profile (Settings →
    // Inspector Profile). One source of truth: if the library is empty, surface
    // the inspector-profile signature(s) so the same signature flows everywhere.
    if (profiles && profiles.length === 0) {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user) {
          const { data: inspRows } = await (supabase as any)
            .from('inspector_profiles')
            .select('id, name, signature_data, is_default, created_at')
            .eq('user_id', user.id) // scope to THIS user — never surface others' signatures
            .order('is_default', { ascending: false });
          if (Array.isArray(inspRows)) {
            profiles = (inspRows as SignatureRow[])
              .filter((r) => r.signature_data)
              .map((r) => ({
                id: `inspector-${r.id}`,
                name: r.name || 'My signature',
                signatureData: r.signature_data,
                createdAt: r.created_at || new Date().toISOString(),
                isDefault: !!r.is_default,
              }));
          }
        }
      } catch (error) {
        console.error('Failed to seed signature from inspector profile:', error);
      }
    }

    setSignatures(profiles);
    setIsLoading(false);
  };

  // Write-through: update React state, the offline cache, and the server together.
  const persist = async (list: SignatureProfile[], removedId?: string) => {
    setSignatures(list);

    try {
      for (const profile of list) await offlineStorage.saveSignatureProfile(profile);
      if (removedId) await offlineStorage.deleteSignatureProfile(removedId);
    } catch (error) {
      console.error('Failed to cache signature profiles:', error);
    }

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      if (removedId) {
        await (supabase as any)
          .from('user_signatures')
          .delete()
          .eq('id', removedId)
          .eq('user_id', user.id);
      }
      if (list.length > 0) {
        await (supabase as any)
          .from('user_signatures')
          .upsert(list.map((p) => profileToRow(p, user.id)), { onConflict: 'id' });
      }
    } catch (error) {
      console.error('Failed to sync signatures to server:', error);
    }
  };

  const addSignature = (signature: Omit<SignatureProfile, 'id' | 'createdAt'>) => {
    const newSignature: SignatureProfile = {
      ...signature,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };

    const updatedSignatures = [...signatures, newSignature];

    // If this is set as default, remove default from others
    if (newSignature.isDefault) {
      updatedSignatures.forEach((s) => {
        if (s.id !== newSignature.id) s.isDefault = false;
      });
    }

    persist(updatedSignatures);
    return newSignature;
  };

  const updateSignature = (id: string, updates: Partial<SignatureProfile>) => {
    const updatedSignatures = signatures.map((signature) =>
      signature.id === id ? { ...signature, ...updates } : signature
    );

    // Handle default setting
    if (updates.isDefault) {
      updatedSignatures.forEach((s) => {
        if (s.id !== id) s.isDefault = false;
      });
    }

    persist(updatedSignatures);
  };

  const deleteSignature = (id: string) => {
    const updatedSignatures = signatures.filter((signature) => signature.id !== id);
    persist(updatedSignatures, id);
  };

  const getDefaultSignature = (): SignatureProfile | null => {
    return signatures.find((signature) => signature.isDefault) || null;
  };

  const setDefaultSignature = (id: string) => {
    const updatedSignatures = signatures.map((signature) => ({
      ...signature,
      isDefault: signature.id === id,
    }));
    persist(updatedSignatures);
  };

  return {
    signatures,
    isLoading,
    addSignature,
    updateSignature,
    deleteSignature,
    getDefaultSignature,
    setDefaultSignature,
  };
};
