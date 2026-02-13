/**
 * useSendVerification
 *
 * Creates a supervisor verification request for a portfolio item or
 * time entry, then triggers native share (Capacitor) or falls back
 * to clipboard copy + toast.
 *
 * Reuses the existing `supervisor_verifications` table and
 * `SupervisorVerificationPage` — no migration needed.
 */

import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

type VerificationType = 'portfolio' | 'time_entry';

// Generate a random 16-char hex token
function generateToken(): string {
  const arr = new Uint8Array(8);
  crypto.getRandomValues(arr);
  return Array.from(arr)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

// SHA-256 hash via Web Crypto API
async function hashSnapshot(snapshot: Record<string, unknown>): Promise<string> {
  const data = JSON.stringify(snapshot);
  const encoder = new TextEncoder();
  const buffer = await crypto.subtle.digest('SHA-256', encoder.encode(data));
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

async function triggerShare(url: string, title: string): Promise<void> {
  // Try Capacitor Share API first
  try {
    const { Share } = await import('@capacitor/share');
    await Share.share({
      title,
      text: `Please verify my training evidence: ${title}`,
      url,
      dialogTitle: 'Share Verification Link',
    });
    return;
  } catch {
    // Capacitor not available — fall through to clipboard
  }

  // Fallback: navigator.share (mobile browsers)
  if (navigator.share) {
    try {
      await navigator.share({ title, url });
      return;
    } catch {
      // User cancelled or not supported — fall through
    }
  }

  // Final fallback: clipboard copy
  try {
    await navigator.clipboard.writeText(url);
    toast.success('Verification link copied to clipboard');
  } catch {
    toast.error('Could not copy link — please copy manually');
  }
}

export function useSendVerification() {
  const { user, profile } = useAuth();
  const [isSending, setIsSending] = useState(false);

  const sendVerification = useCallback(
    async (
      contextId: string,
      type: VerificationType,
      snapshot: Record<string, unknown>
    ) => {
      if (!user) {
        toast.error('You must be logged in');
        return;
      }

      setIsSending(true);

      try {
        const token = generateToken();
        const evidenceHash = await hashSnapshot(snapshot);
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);

        const apprenticeName =
          profile?.full_name || user.email?.split('@')[0] || 'Apprentice';

        const row: Record<string, unknown> = {
          verification_token: token,
          requested_by: user.id,
          apprentice_name: apprenticeName,
          verification_type: type,
          evidence_snapshot: snapshot,
          evidence_hash: evidenceHash,
          expires_at: expiresAt.toISOString(),
        };

        if (type === 'time_entry') {
          row.time_entry_id = contextId;
        } else {
          row.portfolio_item_id = contextId;
        }

        const { error } = await supabase
          .from('supervisor_verifications')
          .insert(row);

        if (error) throw error;

        const url = `${window.location.origin}/verify-evidence/${token}`;
        await triggerShare(url, `Verify: ${(snapshot.activity as string) || 'Training Evidence'}`);

        toast.success('Verification request sent');
      } catch (err) {
        console.error('[useSendVerification] Error:', err);
        toast.error('Failed to create verification link');
      } finally {
        setIsSending(false);
      }
    },
    [user, profile]
  );

  return { sendVerification, isSending };
}
