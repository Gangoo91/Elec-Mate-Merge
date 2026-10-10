/**
 * Demo mode (ELE-1856).
 *
 * On a demo account the app hides everything that isn't the product: the
 * app-update banner, the cookie bar, the push-notification prompt and the
 * first-week checklist. A demo on a real phone then shows only what a college
 * is there to see.
 *
 * A demo account is a fixture account (founder+collegedemo-…@elec-mate.com) or
 * anyone in a college flagged colleges.is_demo (the Northgate demo college,
 * including throwaway "try it on your phone" learners). The answer is cached
 * in localStorage so components that render outside sign-in (the cookie bar)
 * can read it synchronously.
 */
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

const KEY = 'em-demo-mode';
const DEMO_EMAIL = /^founder\+collegedemo-[a-z0-9-]+@elec-mate\.com$/i;

/** Synchronous read of the cached answer. False when storage is blocked. */
export function isDemoMode(): boolean {
  try {
    return window.localStorage.getItem(KEY) === '1';
  } catch {
    return false;
  }
}

function remember(demo: boolean) {
  try {
    if (demo) window.localStorage.setItem(KEY, '1');
    else window.localStorage.removeItem(KEY);
  } catch {
    /* storage blocked: demo mode simply stays off */
  }
}

/** True while the signed-in account is a demo account. */
export function useDemoMode(): boolean {
  const { user, profile } = useAuth();
  const [demo, setDemo] = useState<boolean>(isDemoMode);
  const collegeId = (profile as { college_id?: string | null } | null)?.college_id ?? null;

  const userId = user?.id ?? null;
  const email = user?.email ?? '';
  useEffect(() => {
    if (!userId) return; // signing in or signed out: keep the last answer
    let cancelled = false;
    (async () => {
      let next = DEMO_EMAIL.test(email);
      if (!next && collegeId) {
        const { data } = await supabase
          .from('colleges')
          .select('is_demo')
          .eq('id', collegeId)
          .maybeSingle();
        next = !!(data as { is_demo?: boolean } | null)?.is_demo;
      }
      if (cancelled) return;
      remember(next);
      setDemo(next);
    })();
    return () => {
      cancelled = true;
    };
  }, [userId, email, collegeId]);

  return demo;
}
