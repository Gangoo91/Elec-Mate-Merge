import { useEffect, useRef, useState } from 'react';
import { FormSheet } from '@/components/forms/FormSheet';
import {
  buttonPrimaryCn,
  buttonSecondaryCn,
  chipBase,
  chipOff,
  fieldFullCn,
  grid2Cn,
  inputCn,
  labelCn,
  textareaCn,
} from '@/components/forms/fieldStyles';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import {
  KIND_HINT,
  KIND_LABEL,
  KIND_SIGNERS,
  fileEvidence,
  type EvidenceKind,
  type EvidenceRow,
} from '@/hooks/useEvidencePack';

/** A picked choice is white, not yellow: one solid yellow action per screen (10 Oct 2026). */
const PICKED = 'border-white bg-white font-semibold text-black';

/* ==========================================================================
   FileEvidenceSheet — file one document against an evidence-pack item.

   The document's kind is set by the item it is filed against; "Other" lets
   the college file anything else with its own title. Who signed it is
   recorded with the date (para 312: signatures must be non-refutable and
   every version kept). Filing again creates a new version; the old one is
   kept and marked replaced.
   ========================================================================== */

const ROLE_LABEL: Record<string, string> = {
  apprentice: 'Apprentice',
  employer: 'Employer',
  provider: 'College',
};
const today = () => new Date().toLocaleDateString('en-CA', { timeZone: 'Europe/London' });

export interface FileEvidenceTarget {
  kind: EvidenceKind;
  title: string;
  requirementId?: string | null;
  needsSignatureFrom?: string[];
  employerLevel?: boolean;
  current?: EvidenceRow | null;
}

export function FileEvidenceSheet({
  open,
  onOpenChange,
  target,
  collegeId,
  studentId,
  employerId,
  learnerName,
  onFiled,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  target: FileEvidenceTarget | null;
  collegeId: string;
  studentId: string;
  employerId: string | null;
  learnerName: string;
  onFiled: () => void;
}) {
  const { toast } = useToast();
  const fileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [docDate, setDocDate] = useState(today());
  const [validTo, setValidTo] = useState('');
  const [seen, setSeen] = useState('');
  const [notes, setNotes] = useState('');
  const [signers, setSigners] = useState<Record<string, { on: boolean; name: string }>>({});
  const [saving, setSaving] = useState(false);

  const kind = target?.kind ?? 'other';
  const roles = target?.needsSignatureFrom?.length
    ? target.needsSignatureFrom
    : (KIND_SIGNERS[kind] ?? []);
  const allRoles = Array.from(new Set([...roles, 'apprentice', 'employer', 'provider']));

  useEffect(() => {
    if (!open) return;
    setFile(null);
    setTitle(kind === 'other' ? '' : (target?.title ?? ''));
    setDocDate(today());
    setValidTo('');
    setSeen('');
    setNotes('');
    setSigners(
      Object.fromEntries(
        allRoles.map((r) => [
          r,
          { on: roles.includes(r as never), name: r === 'apprentice' ? learnerName : '' },
        ])
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, target]);

  const missingSigner = roles.find(
    (r) => !signers[r]?.on || (signers[r]?.name ?? '').trim().length < 2
  );
  const valid =
    !!target &&
    (kind !== 'other' || title.trim().length >= 3) &&
    (kind !== 'id_residency' || seen.trim().length >= 3) &&
    (!!file || notes.trim().length >= 5);

  const save = async () => {
    if (!target || !valid || saving) return;
    setSaving(true);
    try {
      await fileEvidence({
        collegeId,
        studentId: target.employerLevel ? null : studentId,
        employerId: target.employerLevel ? employerId : null,
        kind,
        requirementId: target.requirementId ?? null,
        title: title.trim() || target.title,
        file,
        documentDate: docDate || null,
        validTo: validTo || null,
        evidenceTypeSeen: seen.trim() || null,
        notes: notes.trim() || null,
        signatures: Object.entries(signers)
          .filter(([, v]) => v.on && v.name.trim().length >= 2)
          .map(([role, v]) => ({ role, name: v.name.trim(), signed_on: docDate || null })),
        supersedesId: target.current?.id ?? null,
      });
      toast({
        title: target.current ? 'New version filed' : 'Filed',
        description: target.current
          ? 'The earlier version is kept and marked replaced.'
          : undefined,
      });
      onFiled();
      onOpenChange(false);
    } catch (e) {
      toast({ title: 'Not filed', description: (e as Error).message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <FormSheet
      width="wide"
      bodyClassName="grid items-start gap-x-10 gap-y-5 lg:grid-cols-2"
      open={open}
      onOpenChange={onOpenChange}
      eyebrow={target?.current ? `New version · ${learnerName}` : `File evidence · ${learnerName}`}
      title={kind === 'other' ? 'Another document' : (target?.title ?? '')}
      description={
        target?.employerLevel
          ? 'Filed against the employer, so it covers every apprentice they employ.'
          : (KIND_HINT[kind] ?? undefined)
      }
      footer={
        <div className="grid grid-cols-2 gap-2.5">
          <button type="button" onClick={() => onOpenChange(false)} className={buttonSecondaryCn}>
            Cancel
          </button>
          <button
            type="button"
            onClick={save}
            disabled={!valid || saving}
            className={buttonPrimaryCn}
          >
            {saving ? 'Filing…' : target?.current ? 'File new version' : 'File'}
          </button>
        </div>
      }
    >
      {kind === 'other' && (
        <div>
          <label className={labelCn} htmlFor="fe-title">
            What is it
          </label>
          <input
            id="fe-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={inputCn}
            placeholder="e.g. PPE issue record"
          />
        </div>
      )}

      <div>
        <p className={labelCn}>Document</p>
        <input
          ref={fileRef}
          type="file"
          accept="application/pdf,image/*,.doc,.docx"
          className="hidden"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="flex min-h-[56px] w-full items-center justify-between gap-3 rounded-xl border border-white/[0.15] px-4 py-3 text-left touch-manipulation hover:bg-white/[0.05]"
        >
          <span className="min-w-0 truncate text-[14px] text-white">
            {file ? file.name : 'Choose a PDF, photo or Word document'}
          </span>
          <span className="shrink-0 text-[13px] font-semibold text-elec-yellow">
            {file ? 'Change' : 'Choose'}
          </span>
        </button>
        <p className="mt-2 text-[12px] leading-relaxed text-white">
          Kept privately for your college. No file? Say where the original is kept in the notes.
        </p>
      </div>

      <div className={grid2Cn}>
        <div>
          <label className={labelCn} htmlFor="fe-date">
            Dated
          </label>
          <input
            id="fe-date"
            type="date"
            max={today()}
            value={docDate}
            onChange={(e) => setDocDate(e.target.value)}
            className={inputCn}
          />
        </div>
        <div>
          <label className={labelCn} htmlFor="fe-to">
            Valid until (if it ends)
          </label>
          <input
            id="fe-to"
            type="date"
            value={validTo}
            onChange={(e) => setValidTo(e.target.value)}
            className={inputCn}
          />
        </div>
        {kind === 'id_residency' && (
          <div className={fieldFullCn}>
            <label className={labelCn} htmlFor="fe-seen">
              Documents seen
            </label>
            <input
              id="fe-seen"
              value={seen}
              onChange={(e) => setSeen(e.target.value)}
              placeholder="e.g. UK passport"
              className={inputCn}
            />
          </div>
        )}
      </div>

      <div className="border-t border-white/[0.1] pt-4">
        <h3 className="text-sm font-semibold text-white">Signed by</h3>
        <div className="mt-3 space-y-3">
          {allRoles.map((r) => {
            const v = signers[r] ?? { on: false, name: '' };
            const needed = roles.includes(r as never);
            return (
              <div key={r} className="flex items-end gap-2.5">
                <button
                  type="button"
                  aria-pressed={v.on}
                  onClick={() => setSigners((s) => ({ ...s, [r]: { ...v, on: !v.on } }))}
                  className={cn(
                    chipBase,
                    'w-32 shrink-0 px-3 text-[13px]',
                    v.on ? PICKED : chipOff
                  )}
                >
                  {ROLE_LABEL[r]}
                  {needed ? ' *' : ''}
                </button>
                {v.on && (
                  <input
                    aria-label={`${ROLE_LABEL[r]} name`}
                    value={v.name}
                    onChange={(e) =>
                      setSigners((s) => ({ ...s, [r]: { ...v, name: e.target.value } }))
                    }
                    placeholder="Name as signed"
                    className={inputCn}
                  />
                )}
              </div>
            );
          })}
        </div>
        {roles.length > 0 && missingSigner && (
          <p className="mt-3 text-[12.5px] leading-relaxed text-orange-300">
            This needs signing by {roles.map((r) => ROLE_LABEL[r].toLowerCase()).join(', ')}. You
            can file it now; the pack shows it as needing action until it is.
          </p>
        )}
      </div>

      <div>
        <label className={labelCn} htmlFor="fe-notes">
          Notes
        </label>
        <textarea
          id="fe-notes"
          rows={2}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className={textareaCn}
        />
      </div>

      {target?.current && (
        <p className="text-[12.5px] leading-relaxed text-white">
          Replaces version {target.current.version}, filed{' '}
          {new Date(target.current.created_at).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })}
          . Both are kept.
        </p>
      )}
      {KIND_LABEL[kind] && kind !== 'other' && kind !== 'custom' && (
        <p className="text-[12px] text-white">Filed as: {KIND_LABEL[kind]}</p>
      )}
    </FormSheet>
  );
}
