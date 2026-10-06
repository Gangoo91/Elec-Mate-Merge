/**
 * VerifyCredentialSheet — the office records HOW a team member's qualification
 * or ECS card was checked (ELE-1950): self-declared, document seen, or
 * verified at source, plus a short note of the method. The database stamps
 * who and when, and refuses anyone verifying their own credentials.
 */
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Sheet, SheetContent, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import {
  SheetShell,
  Field,
  OptionTile,
  PrimaryButton,
  SecondaryButton,
  DestructiveButton,
} from '@/components/employer/editorial';
import {
  VERIFICATION_LEVELS,
  verificationExplainer,
  verificationLabel,
  type VerificationLevel,
} from '@/services/credentialsService';

const METHOD_SUGGESTIONS: Record<Exclude<VerificationLevel, 'self_declared'>, string[]> = {
  document_seen: ['Original certificate seen', 'Photo of certificate seen', 'Card seen in person'],
  verified_at_source: [
    'Checked on the JIB/ECS card checker',
    'Checked with the awarding body',
    'Checked on the CSCS Smart Check app',
  ],
};

export interface VerifyCredentialSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** What is being checked, e.g. "18th Edition (BS 7671)" or "ECS Gold Card". */
  itemName: string;
  personName: string;
  /** Extra facts the checker should compare (number, expiry). */
  details?: { label: string; value: string }[];
  currentLevel: VerificationLevel;
  /** "Document seen by Acme Electrical, 3 Oct 2026 — Certificate seen" */
  currentSentence: string;
  onSave: (level: VerificationLevel, method: string | null) => Promise<void>;
  /** Shown only for items the firm itself recorded. */
  onRemove?: () => Promise<void>;
}

export function VerifyCredentialSheet({
  open,
  onOpenChange,
  itemName,
  personName,
  details = [],
  currentLevel,
  currentSentence,
  onSave,
  onRemove,
}: VerifyCredentialSheetProps) {
  const [level, setLevel] = useState<VerificationLevel>(currentLevel);
  const [method, setMethod] = useState('');
  const [saving, setSaving] = useState<'save' | 'remove' | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setLevel(currentLevel);
      setMethod('');
      setError(null);
    }
  }, [open, currentLevel]);

  const needsMethod = level !== 'self_declared';
  const unchanged = level === currentLevel && !method.trim();
  const canSave = !unchanged && (!needsMethod || method.trim().length > 0);

  const save = async () => {
    setSaving('save');
    setError(null);
    try {
      await onSave(level, needsMethod ? method.trim() : null);
      onOpenChange(false);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not save');
    } finally {
      setSaving(null);
    }
  };

  const remove = async () => {
    if (!onRemove) return;
    setSaving('remove');
    setError(null);
    try {
      await onRemove();
      onOpenChange(false);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not remove');
    } finally {
      setSaving(null);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden border-0">
        <SheetTitle className="sr-only">Check {itemName}</SheetTitle>
        <SheetDescription className="sr-only">
          Record how {personName}&apos;s {itemName} was checked.
        </SheetDescription>
        <SheetShell
          eyebrow={personName}
          title={itemName}
          description={currentSentence}
          footer={
            <>
              <SecondaryButton fullWidth onClick={() => onOpenChange(false)}>
                Cancel
              </SecondaryButton>
              <PrimaryButton fullWidth onClick={save} disabled={!canSave || saving !== null}>
                {saving === 'save' ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Save'}
              </PrimaryButton>
            </>
          }
        >
          {details.length > 0 && (
            <dl className="grid grid-cols-2 gap-x-4 gap-y-2">
              {details.map((d) => (
                <div key={d.label} className="min-w-0">
                  <dt className="text-[11px] text-white">{d.label}</dt>
                  <dd className="text-[14px] font-medium text-white break-words">{d.value}</dd>
                </div>
              ))}
            </dl>
          )}

          <div className="space-y-2">
            <div className="text-[13px] font-semibold text-white">How has it been checked?</div>
            <div className="grid grid-cols-1 gap-2">
              {VERIFICATION_LEVELS.map((l) => (
                <OptionTile
                  key={l}
                  selected={level === l}
                  onClick={() => setLevel(l)}
                  label={verificationLabel(l)}
                  sublabel={verificationExplainer[l]}
                  className={`justify-start text-left px-4 py-3 ${level === l ? '' : 'text-white'}`}
                />
              ))}
            </div>
          </div>

          {needsMethod && (
            <Field
              label="How you checked it"
              required
              hint="Saved with your name and today's date. Anyone viewing this credential sees it."
            >
              <input
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                placeholder="e.g. Checked on the JIB/ECS card checker"
                maxLength={200}
                className="input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base text-white caret-elec-yellow placeholder:text-white focus:border-elec-yellow focus:ring-0 focus:outline-none touch-manipulation"
              />
              <div className="flex flex-wrap gap-2 pt-1">
                {METHOD_SUGGESTIONS[level as Exclude<VerificationLevel, 'self_declared'>].map(
                  (s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setMethod(s)}
                      className="h-11 px-3 rounded-full border border-white/[0.12] bg-white/[0.04] text-[12px] text-white touch-manipulation"
                    >
                      {s}
                    </button>
                  )
                )}
              </div>
            </Field>
          )}

          {level === 'self_declared' && currentLevel !== 'self_declared' && (
            <p className="text-[12.5px] text-white">
              This clears the existing check. The item stays on {personName}&apos;s Elec-ID as
              self-declared.
            </p>
          )}

          {error && <p className="text-[13px] text-red-400">{error}</p>}

          {onRemove && (
            <div className="pt-2">
              <DestructiveButton fullWidth onClick={remove} disabled={saving !== null}>
                {saving === 'remove' ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  'Remove this item'
                )}
              </DestructiveButton>
            </div>
          )}
        </SheetShell>
      </SheetContent>
    </Sheet>
  );
}
