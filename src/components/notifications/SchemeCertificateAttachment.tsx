import { useRef, useState } from 'react';
import { Check, FileText, Loader2, Paperclip, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { openOrDownloadPdf } from '@/utils/pdf-download';

/**
 * The certificate the SCHEME hands back (ELE-1616).
 *
 * Alex: *"after uploading a cert to the NAPIT portal, NAPIT gives back a
 * downloadable PDF — I'd like to attach that returned PDF on the same
 * submission screen so when the client asks for it again in a few years it's
 * all in one place."*
 *
 * Today that PDF lands in a Downloads folder and is effectively gone. This
 * keeps it against the notification, which is keyed to the report — so the
 * Elec-Mate certificate and the scheme's own certificate stay together.
 *
 * ── Why it sits under "Submitted" ─────────────────────────────────────────
 * That is the exact moment it exists. He has just come back from the portal
 * with the file; asking him to find another screen is how it never gets done.
 *
 * 🔴 No `capture` attribute on the input. The file is nearly always a PDF
 * downloaded on the same device — forcing the camera would make the common case
 * impossible (the trap from ELE-1110).
 */

const BUCKET = 'scheme-certificates';
const MAX_BYTES = 15 * 1024 * 1024;

interface Props {
  notificationId: string;
  reportId: string;
  schemeLabel: string;
  url: string | null;
  name: string | null;
  reference: string | null;
  uploadedAt: string | null;
  onUpdate: (id: string, updates: Record<string, unknown>) => void;
}

export default function SchemeCertificateAttachment({
  notificationId,
  reportId,
  schemeLabel,
  url,
  name,
  reference,
  uploadedAt,
  onUpdate,
}: Props) {
  const { toast } = useToast();
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [refDraft, setRefDraft] = useState(reference ?? '');
  const [confirmRemove, setConfirmRemove] = useState(false);

  const handlePick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;

    if (file.size > MAX_BYTES) {
      toast({
        title: 'That file is too large',
        description: 'Scheme certificates are normally well under 15MB.',
        variant: 'destructive',
      });
      return;
    }

    setBusy(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not signed in');

      /*
       * `<user>/<report>/<stamp>-<filename>`. The leading segment is what the
       * RLS policy keys on; the stamp keeps a re-upload from overwriting the
       * copy already issued to a client, and the real filename is kept so the
       * storage path stays readable years later.
       */
      const safe = file.name.replace(/[^\w.-]+/g, '_').slice(-80);
      const path = `${user.id}/${reportId}/${Date.now()}-${safe}`;

      const { error } = await supabase.storage
        .from(BUCKET)
        .upload(path, file, { contentType: file.type || 'application/pdf', upsert: false });
      if (error) throw error;

      const {
        data: { publicUrl },
      } = supabase.storage.from(BUCKET).getPublicUrl(path);

      onUpdate(notificationId, {
        scheme_certificate_url: publicUrl,
        scheme_certificate_name: file.name,
        scheme_certificate_uploaded_at: new Date().toISOString(),
      });
      toast({ title: 'Certificate attached', description: `${file.name} is stored with this job.` });
    } catch (err) {
      console.error('[SchemeCertificateAttachment] upload failed:', err);
      toast({
        title: "Couldn't attach it",
        description: err instanceof Error ? err.message : 'Try again.',
        variant: 'destructive',
      });
    } finally {
      setBusy(false);
    }
  };

  /*
   * The row is cleared, the stored file is left alone. Deleting the object
   * would destroy a document the client may already hold a link to, and
   * "remove" here means "this is not the right file", not "erase it".
   */
  const handleRemove = () => {
    onUpdate(notificationId, {
      scheme_certificate_url: null,
      scheme_certificate_name: null,
      scheme_certificate_uploaded_at: null,
    });
    setConfirmRemove(false);
    toast({ title: 'Removed', description: 'The attachment has been cleared.' });
  };

  const saveRef = () => {
    const next = refDraft.trim();
    if (next === (reference ?? '')) return;
    onUpdate(notificationId, { scheme_certificate_ref: next || null });
  };

  const inputCn =
    'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent ' +
    'px-1 text-base font-medium text-white placeholder:text-white/25 caret-elec-yellow ' +
    'transition-colors hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 ' +
    'focus:ring-0 focus:outline-none touch-manipulation';

  return (
    <div className="rounded-xl border border-white/[0.1] bg-white/[0.03] px-3.5 py-3">
      {url ? (
        <>
          <div className="flex items-start gap-3">
            <FileText className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
            <div className="min-w-0 flex-1">
              <p className="flex items-center gap-1.5 text-[12.5px] font-semibold leading-tight text-white">
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                {schemeLabel} certificate attached
              </p>
              <p className="mt-0.5 truncate text-[12px] leading-tight text-white">{name}</p>
              {uploadedAt && (
                <p className="mt-0.5 text-[11.5px] leading-tight text-white">
                  Added {new Date(uploadedAt).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </p>
              )}
            </div>
          </div>

          {/*
           * The scheme's own reference. It is the number a client or the scheme
           * quotes back, and without it here he would have to open the PDF to
           * find it every time.
           */}
          <div className="mt-3">
            <label
              htmlFor={`scheme-ref-${notificationId}`}
              className="mb-1 block text-[11.5px] font-medium text-white"
            >
              {schemeLabel} reference (optional)
            </label>
            <input
              id={`scheme-ref-${notificationId}`}
              value={refDraft}
              onChange={(e) => setRefDraft(e.target.value)}
              onBlur={saveRef}
              /* Blur alone is fragile on a phone — the keyboard's Done key is
                 the natural way to finish, and losing the reference because the
                 card re-rendered first would be silent. */
              onKeyDown={(e) => {
                if (e.key === 'Enter') e.currentTarget.blur();
              }}
              placeholder="e.g. the number on the certificate"
              className={inputCn}
            />
          </div>

          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={() => openOrDownloadPdf(url, name || 'scheme-certificate.pdf')}
              className="inline-flex h-11 flex-1 items-center justify-center rounded-xl border border-white/[0.12] bg-white/[0.04] px-3 text-[13px] font-semibold text-white transition-colors hover:bg-white/[0.08] touch-manipulation active:scale-[0.98]"
            >
              View
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={() => fileRef.current?.click()}
              className="inline-flex h-11 flex-1 items-center justify-center rounded-xl border border-white/[0.12] bg-white/[0.04] px-3 text-[13px] font-medium text-white transition-colors hover:bg-white/[0.08] touch-manipulation active:scale-[0.98] disabled:opacity-50"
            >
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Replace'}
            </button>
            <button
              type="button"
              onClick={() => (confirmRemove ? handleRemove() : setConfirmRemove(true))}
              onBlur={() => setConfirmRemove(false)}
              aria-label={confirmRemove ? 'Confirm remove attachment' : 'Remove attachment'}
              className={cn(
                'inline-flex h-11 shrink-0 items-center justify-center rounded-xl border transition-colors touch-manipulation active:scale-[0.97]',
                confirmRemove
                  ? 'border-red-500/40 bg-red-500/15 px-3 text-[12.5px] font-bold text-red-300'
                  : 'w-11 border-white/[0.12] bg-white/[0.04] text-white hover:bg-white/[0.08]'
              )}
            >
              {confirmRemove ? 'Remove?' : <Trash2 className="h-4 w-4" />}
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="text-[12.5px] font-semibold leading-tight text-white">
            Got the certificate back from {schemeLabel}?
          </p>
          <p className="mt-0.5 text-[11.5px] leading-snug text-white">
            Attach it here and it stays with this job — so when the client asks in three
            years, both certificates are in one place.
          </p>
          <button
            type="button"
            disabled={busy}
            onClick={() => fileRef.current?.click()}
            className="mt-2.5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.04] text-[13px] font-semibold text-white transition-colors hover:bg-white/[0.08] touch-manipulation active:scale-[0.98] disabled:opacity-50"
          >
            {busy ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Attaching
              </>
            ) : (
              <>
                <Paperclip className="h-4 w-4" />
                Attach {schemeLabel} certificate
              </>
            )}
          </button>
        </>
      )}

      {/* 🔴 No `capture` — this is nearly always a PDF already on the device. */}
      <input
        ref={fileRef}
        type="file"
        accept="application/pdf,image/*"
        onChange={handlePick}
        className="hidden"
      />
    </div>
  );
}
