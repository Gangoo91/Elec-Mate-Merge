/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Cert → log book funnel (ELE-1396/1397).
 *
 * After a fire alarm certificate generates, offer to start the building's
 * digital log book — pre-filled from the cert, so it's one tap plus nothing.
 * Skips quietly if a log book already exists for the premises.
 */
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

export interface LogBookPrefill {
  building_name: string;
  building_address: string;
  system_category: string;
  panel_make: string;
  panel_location: string;
}

function normalise(s: string): string {
  return (s || '').toLowerCase().replace(/[^a-z0-9]/g, '');
}

export async function maybePromptLogBook(
  formData: Record<string, any>,
  navigate: (to: string, opts?: { state?: unknown }) => void
): Promise<void> {
  try {
    const address = String(formData.premisesAddress || formData.clientAddress || '').trim();
    const name = String(formData.premisesName || formData.clientName || '').trim();
    if (!address && !name) return;

    const db = supabase as any;
    const { data: books } = await db
      .from('fire_alarm_log_books')
      .select('id, building_name, building_address')
      .is('archived_at', null);

    const site = normalise(address);
    const client = normalise(name);
    const exists = (books ?? []).some(
      (b: { building_name: string; building_address: string }) => {
        const bn = normalise(b.building_name);
        const ba = normalise(b.building_address);
        return (
          (bn && (site.includes(bn) || client.includes(bn))) ||
          (ba.length > 6 && (site.includes(ba) || ba.includes(site)))
        );
      }
    );
    if (exists) return;

    const prefill: LogBookPrefill = {
      building_name: name || address.split(',')[0],
      building_address: address,
      system_category: String(formData.systemCategory || ''),
      panel_make: [formData.panelMake, formData.panelModel].filter(Boolean).join(' '),
      panel_location: String(formData.panelLocation || ''),
    };

    toast('Keep this building’s log book in Elec-Mate?', {
      description: 'BS 5839-1:2025 allows a digital log — weekly tests, faults and the Annex H export, all from the cert you just issued.',
      duration: 12000,
      action: {
        label: 'Start log book',
        onClick: () =>
          navigate('/electrician/inspection-testing/fire-alarm-log-books', {
            state: { prefill },
          }),
      },
    });
  } catch {
    // Funnel prompt is best-effort — never let it disturb cert generation.
  }
}
