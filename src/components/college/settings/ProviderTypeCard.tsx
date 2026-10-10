import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { itemVariants } from '@/components/college/primitives';
import { COLLEGE_CARD } from '@/components/college/ui/CollegeUi';
import { useCollegeSetupStatus } from '@/lib/collegeSetup';
import {
  PROVIDER_TYPES,
  PROVIDER_WORDS,
  setProviderType,
  useInvalidateProviderType,
  useProviderType,
  type ProviderType,
} from '@/lib/collegeProviderType';

/**
 * ELE-1979 — what kind of provider this hub belongs to: FE college,
 * independent training provider or employer-provider. Changes the words the
 * hub uses ("college" or "centre") and a few set-up defaults; every feature
 * stays the same. Admins and heads of department change it; others read it.
 */
export function ProviderTypeCard() {
  const { data: status } = useCollegeSetupStatus(true);
  const collegeId = status?.college_id ?? null;
  const { type, words } = useProviderType(collegeId);
  const invalidate = useInvalidateProviderType();
  const [saving, setSaving] = useState<ProviderType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const canChange = !!status?.can_manage;

  const choose = async (t: ProviderType) => {
    if (!collegeId || t === type) return;
    setSaving(t);
    setError(null);
    try {
      await setProviderType(collegeId, t);
      await invalidate(collegeId);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setSaving(null);
    }
  };

  return (
    <motion.div
      variants={itemVariants}
      className={cn(COLLEGE_CARD, 'space-y-4')}
      data-testid="provider-type-card"
    >
      <div>
        <p className="text-[15px] font-semibold text-white">Type of provider</p>
        <p className="mt-1 text-[13px] leading-snug text-white">
          {words.label}. {words.setupNote}
        </p>
      </div>
      <div className="grid gap-2 sm:grid-cols-3" role="radiogroup" aria-label="Type of provider">
        {PROVIDER_TYPES.map((t) => {
          const on = t === type;
          return (
            <button
              key={t}
              type="button"
              role="radio"
              aria-checked={on}
              disabled={!canChange || saving !== null}
              onClick={() => void choose(t)}
              className={cn(
                'min-h-[64px] rounded-2xl border px-3.5 py-2.5 text-left transition-colors touch-manipulation disabled:cursor-default',
                on ? 'border-elec-yellow' : 'border-white/[0.12] hover:border-white/[0.3]'
              )}
            >
              <span className="block text-[13.5px] font-semibold text-white">
                {PROVIDER_WORDS[t].label}
                {saving === t ? '…' : ''}
              </span>
              <span className="mt-0.5 block text-[12px] leading-snug text-white">
                {PROVIDER_WORDS[t].description}
              </span>
            </button>
          );
        })}
      </div>
      {!canChange && (
        <p className="text-[12.5px] text-white">
          Only an admin or head of department can change this.
        </p>
      )}
      {error && <p className="text-[13px] text-orange-300">{error}</p>}
    </motion.div>
  );
}
