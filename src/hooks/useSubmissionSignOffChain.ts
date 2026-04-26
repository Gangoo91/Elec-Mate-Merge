import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   useSubmissionSignOffChain — surfaces the full sign-off chain that already
   exists in the schema but isn't shown to tutors:
     • portfolio_submissions: signed_off_at / by, iqa_verified_at / by
     • portfolio_signatures: rich signature rows (employer, supervisor, tutor)
     • portfolio_items: is_supervisor_verified rollup
   ========================================================================== */

export type SignerRole = 'apprentice' | 'employer' | 'supervisor' | 'tutor' | 'iqa' | string;
export type SignatureType = 'drawn' | 'typed' | 'click_to_sign' | string;

export interface PortfolioSignature {
  id: string;
  signer_id: string | null;
  signer_role: SignerRole | null;
  signature_type: SignatureType | null;
  signature_text: string | null;
  signature_image: string | null;
  signed_at: string | null;
  signer_name: string | null;
}

export interface SignOffChain {
  loading: boolean;
  signatures: PortfolioSignature[];
  /** Submission-level sign-off */
  signedOff: { at: string | null; by_user_id: string | null; by_name: string | null };
  /** IQA verification at submission level */
  iqaVerified: { at: string | null; by_user_id: string | null; by_name: string | null };
  /** Number of underlying portfolio_items already supervisor-verified */
  itemsSupervisorVerified: number;
  itemsTotal: number;
  /** Quick rollups by signer role for the chain badge */
  hasEmployer: boolean;
  hasSupervisor: boolean;
  hasTutor: boolean;
  refresh: () => Promise<void>;
}

export function useSubmissionSignOffChain(submissionId: string | null): SignOffChain {
  const [state, setState] = useState<SignOffChain>(initial());

  const load = async () => {
    if (!submissionId) {
      setState(initial());
      return;
    }
    setState((s) => ({ ...s, loading: true }));

    const [{ data: sub }, { data: sigs }, { data: items }] = await Promise.all([
      supabase
        .from('portfolio_submissions')
        .select('signed_off_at, signed_off_by, iqa_verified_at, iqa_verified_by')
        .eq('id', submissionId)
        .maybeSingle(),
      supabase
        .from('portfolio_signatures')
        .select(
          'id, signer_id, signer_role, signature_type, signature_text, signature_image, signed_at, submission_id'
        )
        .eq('submission_id', submissionId)
        .order('signed_at', { ascending: true }),
      supabase
        .from('portfolio_items')
        .select('id, is_supervisor_verified')
        .eq('submission_id', submissionId),
    ]);

    const subRow = (sub ?? null) as
      | {
          signed_off_at: string | null;
          signed_off_by: string | null;
          iqa_verified_at: string | null;
          iqa_verified_by: string | null;
        }
      | null;
    const sigList = ((sigs ?? []) as Array<PortfolioSignature & { submission_id: string }>);
    const itemRows = ((items ?? []) as Array<{ id: string; is_supervisor_verified: boolean | null }>);

    // Resolve names for signer_id, signed_off_by, iqa_verified_by — best effort
    const userIds = new Set<string>();
    for (const s of sigList) if (s.signer_id) userIds.add(s.signer_id);
    if (subRow?.signed_off_by) userIds.add(subRow.signed_off_by);
    if (subRow?.iqa_verified_by) userIds.add(subRow.iqa_verified_by);

    let nameMap = new Map<string, string>();
    if (userIds.size > 0) {
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, full_name')
        .in('id', Array.from(userIds));
      for (const p of ((profiles ?? []) as Array<{ id: string; full_name: string | null }>)) {
        if (p.full_name) nameMap.set(p.id, p.full_name);
      }
    }

    const enrichedSigs: PortfolioSignature[] = sigList.map((s) => ({
      id: s.id,
      signer_id: s.signer_id,
      signer_role: s.signer_role,
      signature_type: s.signature_type,
      signature_text: s.signature_text,
      signature_image: s.signature_image,
      signed_at: s.signed_at,
      signer_name: s.signer_id ? nameMap.get(s.signer_id) ?? null : null,
    }));

    setState({
      loading: false,
      signatures: enrichedSigs,
      signedOff: {
        at: subRow?.signed_off_at ?? null,
        by_user_id: subRow?.signed_off_by ?? null,
        by_name: subRow?.signed_off_by ? nameMap.get(subRow.signed_off_by) ?? null : null,
      },
      iqaVerified: {
        at: subRow?.iqa_verified_at ?? null,
        by_user_id: subRow?.iqa_verified_by ?? null,
        by_name: subRow?.iqa_verified_by ? nameMap.get(subRow.iqa_verified_by) ?? null : null,
      },
      itemsSupervisorVerified: itemRows.filter((i) => i.is_supervisor_verified).length,
      itemsTotal: itemRows.length,
      hasEmployer: enrichedSigs.some((s) => (s.signer_role ?? '').toLowerCase() === 'employer'),
      hasSupervisor: enrichedSigs.some((s) => (s.signer_role ?? '').toLowerCase() === 'supervisor'),
      hasTutor: enrichedSigs.some((s) => (s.signer_role ?? '').toLowerCase() === 'tutor'),
      refresh: load,
    });
  };

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submissionId]);

  return state;
}

function initial(): SignOffChain {
  return {
    loading: false,
    signatures: [],
    signedOff: { at: null, by_user_id: null, by_name: null },
    iqaVerified: { at: null, by_user_id: null, by_name: null },
    itemsSupervisorVerified: 0,
    itemsTotal: 0,
    hasEmployer: false,
    hasSupervisor: false,
    hasTutor: false,
    refresh: async () => {},
  };
}
