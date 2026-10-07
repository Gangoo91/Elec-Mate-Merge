import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CheckCircle2, Download, Loader2, ShieldCheck, XCircle, Clock, AlertTriangle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import { SignableDocumentView } from '@/components/signature/SignableDocumentView';
import {
  SignatureCapture,
  type SignatureCaptureHandle,
  type SignatureMethod,
} from '@/components/signature/SignatureCapture';
import { ukDate, type SigningPayload } from '@/lib/signatures/types';
import { buildSignedCopyPdf, downloadBlob, signedCopyFilename } from '@/lib/signatures/signedCopyPdf';

/**
 * /sign/:token — the client reads the actual document and signs it on their
 * phone (ELE-1993).
 *
 * Everything comes from one token-keyed function, get_signing_document, which
 * returns only this request's frozen document. The signature PNG goes to the
 * private signature-captures bucket (only into this request's folder), then
 * sign_signing_document records name, time, IP, device, the statement and
 * the fingerprint of the version signed. Links are single-use, expire, and
 * can be cancelled by the company.
 *
 * Written for a client on a phone: a white page, large type, a big pad and
 * the Sign button in a bar under the thumb.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const rpc = (supabase.rpc.bind(supabase) as unknown) as (fn: string, args: Record<string, unknown>) => Promise<{ data: any; error: { message?: string } | null }>;

const SIGN_ERRORS: Record<string, string> = {
  signed: 'This document has already been signed.',
  declined: 'This request was declined.',
  revoked: 'This link has been cancelled by the company.',
  expired: 'This link has expired.',
  changed: 'The document has changed since this link was sent. Ask the company for a new link.',
  statement_required: 'Tick the box to confirm you agree.',
  name_required: 'Enter your full name.',
  signature_required: 'Add your signature, then try again.',
  no_document: 'There is no document on this request.',
  not_found: 'This link is not valid.',
};

export default function PublicSignatureView() {
  const { token } = useParams<{ token: string }>();
  const [payload, setPayload] = useState<SigningPayload | null>(null);
  const [loadError, setLoadError] = useState<'not_found' | 'revoked' | 'network' | null>(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);
  const [method, setMethod] = useState<SignatureMethod>('drawn');
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [declineOpen, setDeclineOpen] = useState(false);
  const [declineReason, setDeclineReason] = useState('');
  const [justSigned, setJustSigned] = useState<{ dataUrl: string | null } | null>(null);
  const [downloading, setDownloading] = useState(false);
  const capture = useRef<SignatureCaptureHandle>(null);
  const signRef = useRef<HTMLDivElement>(null);

  const load = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const { data, error } = await rpc('get_signing_document', { p_token: token });
      if (error) {
        setLoadError('network');
      } else if (!data || data.error) {
        setLoadError(data?.error === 'revoked' ? 'revoked' : 'not_found');
      } else {
        setPayload(data as SigningPayload);
        setLoadError(null);
        setName((n) => n || (data as SigningPayload).signer_name || '');
      }
    } catch {
      setLoadError('network');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (payload?.document_title) document.title = `Sign: ${payload.document_title}`;
  }, [payload?.document_title]);

  const ready = name.trim().length >= 2 && hasSignature && agreed;

  const handleSign = async () => {
    setFormError(null);
    if (!payload || !token) return;
    if (name.trim().length < 2) return setFormError(SIGN_ERRORS.name_required);
    if (!hasSignature) return setFormError(SIGN_ERRORS.signature_required);
    if (!agreed) return setFormError(SIGN_ERRORS.statement_required);
    setSubmitting(true);
    try {
      const dataUrl = capture.current?.toDataUrl() ?? null;
      if (payload.legacy) {
        // A request made before documents were attached: the old function.
        const { data, error } = await rpc('sign_signature_request', {
          p_token: token,
          p_signature_url: dataUrl,
          p_signer_name: name.trim(),
        });
        if (error || data?.error) throw new Error(SIGN_ERRORS.signature_required);
      } else {
        const blob = await capture.current?.toBlob();
        if (!blob || !payload.upload_key) throw new Error(SIGN_ERRORS.signature_required);
        const path = `${payload.upload_key}/${crypto.randomUUID()}.png`;
        const { error: upErr } = await supabase.storage
          .from('signature-captures')
          .upload(path, blob, { contentType: 'image/png', upsert: false });
        if (upErr) throw new Error('Your signature did not upload. Check your signal and try again.');
        const { data, error } = await rpc('sign_signing_document', {
          p_token: token,
          p_signer_name: name.trim(),
          p_signature_path: path,
          p_method: capture.current?.method ?? method,
          p_statement_accepted: agreed,
        });
        if (error) throw new Error('Something went wrong. Try again.');
        if (data?.error) throw new Error(SIGN_ERRORS[data.error] ?? 'Something went wrong. Try again.');
      }
      setJustSigned({ dataUrl });
      await load();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (e) {
      setFormError(e instanceof Error ? e.message : 'Something went wrong. Try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDecline = async () => {
    if (!token || !payload) return;
    setSubmitting(true);
    try {
      const fn = payload.legacy ? 'decline_signature_request' : 'decline_signing_document';
      const args = payload.legacy
        ? { p_token: token, p_notes: declineReason.trim() || null }
        : { p_token: token, p_reason: declineReason.trim() || null };
      const { data, error } = await rpc(fn, args);
      if (error || data?.error) throw new Error('Could not record that. Try again.');
      setDeclineOpen(false);
      await load();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (e) {
      setFormError(e instanceof Error ? e.message : 'Could not record that.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDownload = async () => {
    if (!payload) return;
    setDownloading(true);
    try {
      const blob = await buildSignedCopyPdf({
        requestId: payload.id,
        documentTitle: payload.document_title,
        documentType: payload.document_type,
        document: payload.document,
        companyName: payload.company?.name || 'The company',
        signerName: payload.signed_name || name,
        signedAt: payload.signed_at,
        statement: payload.statement,
        method: payload.signature_method,
        documentHash: payload.signed_document_hash,
        signatureDataUrl: justSigned?.dataUrl ?? null,
        // A paper signature: the scan stays with the company, so the page says so.
        paper:
          payload.signature_method === 'paper'
            ? { signedOn: payload.signed_at, recordedBy: null, recordedAt: null, declaration: null, scanSha256: null, scan: null }
            : null,
      });
      downloadBlob(blob, signedCopyFilename(payload.document_title));
    } finally {
      setDownloading(false);
    }
  };

  // ---------------------------------------------------------------- states
  if (loading && !payload) {
    return (
      <Shell>
        <div className="flex min-h-[60vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-slate-500" aria-label="Loading" />
        </div>
      </Shell>
    );
  }

  if (loadError || !payload) {
    return (
      <Shell>
        <Notice
          icon={<AlertTriangle className="h-7 w-7 text-amber-600" />}
          title={
            loadError === 'revoked'
              ? 'This link has been cancelled'
              : loadError === 'network'
                ? 'We could not load this page'
                : 'This link is not valid'
          }
          body={
            loadError === 'revoked'
              ? 'The company cancelled this signing link, usually because they sent you a newer one. Check your email or messages for the latest link.'
              : loadError === 'network'
                ? 'Check your signal and try again.'
                : 'Check you opened the whole link from the email or message. If it still does not work, ask the company to send it again.'
          }
          action={
            loadError === 'network' ? (
              <button
                type="button"
                onClick={load}
                className="mt-5 h-12 w-full rounded-xl bg-slate-900 text-[16px] font-semibold text-white touch-manipulation"
              >
                Try again
              </button>
            ) : null
          }
        />
      </Shell>
    );
  }

  const company = payload.company?.name || 'The company';
  const signed = payload.status === 'Signed';
  const declined = payload.status === 'Declined';
  const expired = payload.block_reason === 'expired';
  const changed = payload.block_reason === 'changed';
  const canSign = payload.can_sign;

  return (
    <Shell company={payload.company}>
      {/* Status */}
      {signed ? (
        <section className="rounded-2xl bg-emerald-50 ring-1 ring-emerald-200 p-5">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-7 w-7 shrink-0 text-emerald-600" />
            <div className="min-w-0">
              <h1 className="text-[20px] font-semibold text-slate-900">
                {justSigned ? 'Thank you, it is signed' : 'Signed'}
              </h1>
              <p className="mt-1 text-[15px] leading-relaxed text-slate-700">
                {payload.signature_method === 'paper'
                  ? `Signed on paper by ${payload.signed_name} on ${ukDate(payload.signed_at)}. ${company} has recorded it with a scan of the paper.`
                  : `Signed by ${payload.signed_name} on ${ukDate(payload.signed_at, true)}. ${company} has been told.`}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleDownload}
            disabled={downloading}
            className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-slate-900 text-[16px] font-semibold text-white touch-manipulation disabled:opacity-60"
          >
            {downloading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Download className="h-5 w-5" />}
            Download your signed copy
          </button>
          {!justSigned ? (
            <p className="mt-2 text-[13px] text-slate-600">
              Your signature image stays on file with {company}; this copy shows the signing record.
            </p>
          ) : null}
        </section>
      ) : declined ? (
        <Notice
          icon={<XCircle className="h-7 w-7 text-slate-500" />}
          title="You declined this"
          body={`${company} has been told. If you change your mind, ask them to send it again.`}
        />
      ) : expired ? (
        <Notice
          icon={<Clock className="h-7 w-7 text-slate-500" />}
          title="This link has expired"
          body={`Ask ${company} to send you a new link. You can still read the document below.`}
        />
      ) : changed ? (
        <Notice
          icon={<AlertTriangle className="h-7 w-7 text-amber-600" />}
          title="This document has been updated"
          body={`${company} changed the document after sending this link, so it cannot be signed. Ask them for a new link.`}
        />
      ) : (
        <section>
          <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-slate-500">
            Please read and sign
          </p>
          <h1 className="mt-1 text-[24px] font-semibold leading-tight text-slate-900">
            {payload.document_title}
          </h1>
          <p className="mt-2 text-[16px] leading-relaxed text-slate-700">
            {company} has asked you to sign this. Read it through, then sign at the bottom.
            {payload.expires_at ? ` The link works until ${ukDate(payload.expires_at)}.` : ''}
          </p>
          {payload.message ? (
            <blockquote className="mt-4 rounded-xl bg-white p-4 text-[15px] leading-relaxed text-slate-800 ring-1 ring-slate-200 whitespace-pre-line">
              <span className="block text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-500 mb-1">
                Note from {company}
              </span>
              {payload.message}
            </blockquote>
          ) : null}
        </section>
      )}

      {/* The document */}
      {payload.document ? (
        <SignableDocumentView document={payload.document} tone="paper" />
      ) : (
        <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
          <p className="text-[16px] font-semibold text-slate-900">{payload.document_title}</p>
          <p className="mt-1 text-[15px] text-slate-600">
            {company} sent this request without a document attached. Contact them if you need to
            see it before signing.
          </p>
        </div>
      )}

      {/* Sign */}
      {canSign ? (
        <section ref={signRef} id="sign" className="rounded-2xl bg-white p-5 ring-1 ring-slate-200 space-y-5">
          <h2 className="text-[20px] font-semibold text-slate-900">Sign</h2>

          <div>
            <label htmlFor="signer-name" className="block text-[15px] font-medium text-slate-800">
              Your full name
            </label>
            <input
              id="signer-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              maxLength={120}
              className="mt-1.5 h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-[17px] text-slate-900 outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 touch-manipulation"
            />
          </div>

          <div>
            <p className="mb-1.5 text-[15px] font-medium text-slate-800">Your signature</p>
            <SignatureCapture
              ref={capture}
              typedName={name}
              onChange={(has, m) => {
                setHasSignature(has);
                setMethod(m);
              }}
              disabled={submitting}
            />
          </div>

          <label className="flex cursor-pointer items-start gap-3 rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200 touch-manipulation">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 h-6 w-6 shrink-0 accent-slate-900"
            />
            <span className="text-[15px] leading-relaxed text-slate-800">{payload.statement}</span>
          </label>

          {formError ? (
            <p role="alert" className="rounded-xl bg-red-50 p-3 text-[15px] text-red-800 ring-1 ring-red-200">
              {formError}
            </p>
          ) : null}

          <p className="flex items-start gap-2 text-[13px] leading-relaxed text-slate-600">
            <ShieldCheck className="h-4 w-4 shrink-0 mt-0.5" />
            We record your name, the time, your IP address and device, and a fingerprint of the
            document you signed, so both you and {company} have the same record.
          </p>

          {!declineOpen ? (
            <button
              type="button"
              onClick={() => setDeclineOpen(true)}
              className="h-11 w-full rounded-xl text-[15px] font-medium text-slate-700 underline underline-offset-4 touch-manipulation"
            >
              I do not want to sign this
            </button>
          ) : (
            <div className="space-y-3 rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200">
              <label htmlFor="decline-reason" className="block text-[15px] font-medium text-slate-800">
                Tell {company} why (optional)
              </label>
              <textarea
                id="decline-reason"
                value={declineReason}
                onChange={(e) => setDeclineReason(e.target.value)}
                rows={3}
                maxLength={1000}
                className="w-full rounded-xl border border-slate-300 bg-white p-3 text-[16px] text-slate-900 outline-none focus:border-slate-900"
              />
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setDeclineOpen(false)}
                  className="h-12 rounded-xl bg-white text-[15px] font-semibold text-slate-900 ring-1 ring-slate-300 touch-manipulation"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleDecline}
                  disabled={submitting}
                  className="h-12 rounded-xl bg-red-700 text-[15px] font-semibold text-white touch-manipulation disabled:opacity-60"
                >
                  Decline
                </button>
              </div>
            </div>
          )}
        </section>
      ) : null}

      {canSign ? <div className="h-24" aria-hidden /> : null}

      {/* Sign bar under the thumb */}
      {canSign ? (
        <div
          className="fixed inset-x-0 bottom-0 z-20 border-t border-slate-200 bg-white/95 backdrop-blur px-4 pt-3"
          style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
        >
          <div className="mx-auto flex max-w-2xl items-center gap-3">
            <p className="hidden sm:block flex-1 text-[14px] text-slate-600">
              {ready
                ? 'Ready to sign.'
                : !hasSignature
                  ? 'Add your signature.'
                  : !agreed
                    ? 'Tick the box to agree.'
                    : 'Enter your full name.'}
            </p>
            <button
              type="button"
              onClick={() => {
                if (!ready) {
                  signRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  if (hasSignature || agreed) handleSign();
                  return;
                }
                handleSign();
              }}
              disabled={submitting}
              className={cn(
                'h-14 flex-1 sm:flex-none sm:min-w-[240px] rounded-2xl text-[17px] font-semibold touch-manipulation transition-colors',
                ready ? 'bg-emerald-700 text-white' : 'bg-slate-900 text-white',
                submitting && 'opacity-70'
              )}
            >
              {submitting ? (
                <Loader2 className="mx-auto h-6 w-6 animate-spin" />
              ) : ready ? (
                'Sign'
              ) : (
                'Go to signature'
              )}
            </button>
          </div>
        </div>
      ) : null}
    </Shell>
  );
}

function Shell({
  children,
  company,
}: {
  children: React.ReactNode;
  company?: SigningPayload['company'];
}) {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900" style={{ colorScheme: 'light' }}>
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-2xl items-center gap-3 px-4 py-3">
          {company?.logo_url ? (
            <img
              src={company.logo_url}
              alt=""
              className="h-10 w-auto max-w-[120px] object-contain"
            />
          ) : null}
          <div className="min-w-0">
            <p className="truncate text-[16px] font-semibold text-slate-900">
              {company?.name || 'Secure signing'}
            </p>
            {company?.phone || company?.email ? (
              <p className="truncate text-[13px] text-slate-600">
                {[company.phone, company.email].filter(Boolean).join(' · ')}
              </p>
            ) : null}
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-2xl space-y-5 px-4 py-5">{children}</main>
      <footer className="mx-auto max-w-2xl px-4 pb-8 text-center text-[12px] text-slate-500">
        Secure signing by Elec-Mate
      </footer>
    </div>
  );
}

function Notice({
  icon,
  title,
  body,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  action?: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
      <div className="flex items-start gap-3">
        <div className="shrink-0">{icon}</div>
        <div className="min-w-0">
          <h1 className="text-[20px] font-semibold text-slate-900">{title}</h1>
          <p className="mt-1 text-[15px] leading-relaxed text-slate-700">{body}</p>
        </div>
      </div>
      {action}
    </section>
  );
}
