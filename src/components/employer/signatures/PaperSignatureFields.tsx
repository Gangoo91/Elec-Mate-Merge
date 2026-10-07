import { useEffect, useMemo, useRef, useState } from 'react';
import { format } from 'date-fns';
import { Camera, Check, FileText, Paperclip, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Field, inputClass } from '@/components/employer/editorial';
import { cn } from '@/lib/utils';
import { PAPER_DECLARATION, PAPER_MAX_BYTES, paperFileType } from '@/hooks/useSignatureRequests';

/**
 * The paper half of a signature (ELE-1993 follow-up): who signed, the date on
 * the paper, a photo or PDF of it, and the office's declaration. Used by the
 * "Record a paper signature" sheet (on a request) and the paper mode of
 * Request signature (straight from a document). Nothing here is ever shown
 * as a digital signature.
 */

export interface PaperFormState {
  name: string;
  signedOn: string;
  file: File | null;
  declared: boolean;
}

const todayIso = () => format(new Date(), 'yyyy-MM-dd');

export function usePaperForm(open: boolean, defaultName?: string | null) {
  const [state, setState] = useState<PaperFormState>({
    name: defaultName ?? '',
    signedOn: todayIso(),
    file: null,
    declared: false,
  });
  useEffect(() => {
    if (open)
      setState({ name: defaultName ?? '', signedOn: todayIso(), file: null, declared: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const set = (patch: Partial<PaperFormState>) => setState((s) => ({ ...s, ...patch }));
  const dateOk = !!state.signedOn && state.signedOn <= todayIso();
  const ready = state.name.trim().length >= 2 && dateOk && !!state.file && state.declared;
  return { state, set, ready, dateOk };
}

const fmtSize = (n: number) =>
  n >= 1024 * 1024
    ? `${(n / 1024 / 1024).toFixed(1)} MB`
    : `${Math.max(1, Math.round(n / 1024))} KB`;

export function PaperSignatureFields({
  form,
  nameLabel = 'Who signed',
  compact,
}: {
  form: ReturnType<typeof usePaperForm>;
  nameLabel?: string;
  /** Hide the name field when the caller shows it elsewhere. */
  compact?: boolean;
}) {
  const { state, set, dateOk } = form;
  const cameraRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const previewUrl = useMemo(
    () =>
      state.file && state.file.type.startsWith('image/') ? URL.createObjectURL(state.file) : null,
    [state.file]
  );
  useEffect(() => () => (previewUrl ? URL.revokeObjectURL(previewUrl) : undefined), [previewUrl]);

  const take = (f?: File | null) => {
    if (!f) return;
    if (!paperFileType(f)) {
      setFileError('Use a photo (JPG, PNG, HEIC) or a PDF.');
      return;
    }
    if (f.size > PAPER_MAX_BYTES) {
      setFileError('That file is over 15 MB. Take a photo instead.');
      return;
    }
    setFileError(null);
    set({ file: f });
  };

  const isPdf = !!state.file && paperFileType(state.file)?.ext === 'pdf';

  return (
    <div className="space-y-5" data-help="signatures.paper-fields">
      {!compact ? (
        <Field label={nameLabel} required>
          <Input
            value={state.name}
            onChange={(e) => set({ name: e.target.value.slice(0, 120) })}
            placeholder="Their full name, as on the paper"
            className={inputClass}
            autoComplete="off"
          />
        </Field>
      ) : null}

      <Field
        label="Date they signed"
        required
        hint={
          state.signedOn && !dateOk
            ? 'The date cannot be in the future.'
            : 'The date written on the paper.'
        }
      >
        <Input
          type="date"
          value={state.signedOn}
          max={todayIso()}
          onChange={(e) => set({ signedOn: e.target.value })}
          className={inputClass}
        />
      </Field>

      <div className="space-y-2.5" data-help="signatures.paper-upload">
        <p className="text-[12px] font-medium text-white">
          The signed paper <span className="text-elec-yellow">*</span>
        </p>
        <input
          ref={cameraRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="sr-only"
          onChange={(e) => {
            take(e.target.files?.[0]);
            e.target.value = '';
          }}
        />
        <input
          ref={fileRef}
          type="file"
          accept="image/*,application/pdf"
          className="sr-only"
          onChange={(e) => {
            take(e.target.files?.[0]);
            e.target.value = '';
          }}
        />
        {state.file ? (
          <div className="overflow-hidden rounded-2xl border border-white/[0.14] bg-white/[0.04]">
            {previewUrl ? (
              <div className="flex max-h-72 items-center justify-center bg-white">
                <img
                  src={previewUrl}
                  alt="The signed paper"
                  className="max-h-72 w-full object-contain"
                />
              </div>
            ) : (
              <div className="flex items-center gap-3 px-4 py-4">
                <FileText className="h-8 w-8 shrink-0 text-white" />
                <span className="text-[13.5px] text-white">
                  {isPdf ? 'PDF scan' : 'Scan'} ready to attach
                </span>
              </div>
            )}
            <div className="flex items-center gap-3 border-t border-white/[0.1] px-3 py-2">
              <span className="min-w-0 flex-1 truncate text-[13px] text-white">
                {state.file.name || 'Photo'} · {fmtSize(state.file.size)}
              </span>
              <button
                type="button"
                onClick={() => set({ file: null })}
                className="inline-flex h-11 items-center gap-1.5 rounded-full px-3 text-[13px] font-semibold text-white touch-manipulation hover:bg-white/[0.06]"
              >
                <X className="h-4 w-4" /> Remove
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => cameraRef.current?.click()}
              className="flex h-20 flex-col items-center justify-center gap-1.5 rounded-2xl border border-dashed border-white/[0.25] bg-white/[0.03] text-[13.5px] font-semibold text-white touch-manipulation hover:bg-white/[0.06]"
            >
              <Camera className="h-5 w-5" />
              Take a photo
            </button>
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="flex h-20 flex-col items-center justify-center gap-1.5 rounded-2xl border border-dashed border-white/[0.25] bg-white/[0.03] text-[13.5px] font-semibold text-white touch-manipulation hover:bg-white/[0.06]"
            >
              <Paperclip className="h-5 w-5" />
              Choose a file
            </button>
          </div>
        )}
        {fileError ? <p className="text-[12.5px] text-red-300">{fileError}</p> : null}
        <p className="text-[12.5px] leading-relaxed text-white">
          Photograph the whole page, with the signature, name and date readable. PDF or photo, up to
          15 MB. The file is kept privately and only your office can open it.
        </p>
      </div>

      <button
        type="button"
        role="checkbox"
        aria-checked={state.declared}
        data-help="signatures.paper-declare"
        onClick={() => set({ declared: !state.declared })}
        className={cn(
          'flex min-h-[56px] w-full items-start gap-3 rounded-2xl border px-4 py-3 text-left touch-manipulation transition-colors',
          state.declared
            ? 'border-elec-yellow bg-white/[0.06]'
            : 'border-white/[0.14] bg-white/[0.03]'
        )}
      >
        <span
          className={cn(
            'mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border',
            state.declared ? 'border-elec-yellow bg-elec-yellow text-black' : 'border-white/[0.4]'
          )}
        >
          {state.declared ? <Check className="h-4 w-4" /> : null}
        </span>
        <span className="text-[14px] font-medium leading-snug text-white">{PAPER_DECLARATION}</span>
      </button>
    </div>
  );
}
