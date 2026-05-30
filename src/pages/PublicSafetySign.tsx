/**
 * PublicSafetySign — ONE public, unauthenticated signing page for every Site
 * Safety document type. Resolves a token to its display snapshot via a
 * SECURITY DEFINER RPC, captures a name + signature, writes back to the token
 * row. Replaces the need for per-module public pages.
 */

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { createClient } from '@supabase/supabase-js';
import { cn } from '@/lib/utils';
import { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from '@/integrations/supabase/client';

const anonClient = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

interface SignSummary {
  title: string;
  subtitle?: string;
  lines?: { label: string; value: string }[];
  sections?: { heading: string; items: string[] }[];
  statement?: string;
}
interface TokenData {
  document_type: string;
  role: string;
  summary: SignSummary;
  already_signed: boolean;
  signed_name: string | null;
  expired: boolean;
}

const ROLE_LABEL: Record<string, string> = {
  signatory: 'Sign-off',
  receiver: 'Permit receiver',
  verifier: 'Verifier',
  reviewer: 'Reviewer',
  supervisor: 'Supervisor approval',
  attendee: 'Attendee',
};

const PublicSafetySign = () => {
  const { token } = useParams<{ token: string }>();
  const [data, setData] = useState<TokenData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [signerName, setSignerName] = useState('');
  const [signatureData, setSignatureData] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDrawing = useRef(false);

  useEffect(() => {
    if (token) loadToken();
  }, [token]);

  useEffect(() => {
    if (!loading && data && !data.already_signed && !showSuccess) {
      const t = setTimeout(initCanvas, 50);
      return () => clearTimeout(t);
    }
  }, [loading, data, showSuccess]);

  const loadToken = async () => {
    try {
      setLoading(true);
      const { data: res, error: rpcError } = await anonClient.rpc('get_safety_sign_token', { token_param: token });
      if (rpcError) throw rpcError;
      if (!res) {
        setError('This signing link is invalid or has expired.');
        return;
      }
      const t = res as TokenData;
      setData(t);
      if (t.signed_name) setSignerName(t.signed_name);
    } catch {
      setError('Could not load this document. The link may be invalid.');
    } finally {
      setLoading(false);
    }
  };

  const initCanvas = () => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    ctx.scale(dpr, dpr);
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  };

  const getCoords = (e: React.MouseEvent | React.TouchEvent) => {
    const container = containerRef.current;
    if (!container) return { x: 0, y: 0 };
    const rect = container.getBoundingClientRect();
    if ('touches' in e) return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };
  const startDraw = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    isDrawing.current = true;
    const { x, y } = getCoords(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };
  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (!isDrawing.current) return;
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    const { x, y } = getCoords(e);
    ctx.lineTo(x, y);
    ctx.stroke();
    if (!hasDrawn) setHasDrawn(true);
  };
  const stopDraw = () => {
    if (isDrawing.current && canvasRef.current) setSignatureData(canvasRef.current.toDataURL());
    isDrawing.current = false;
  };
  const clearSignature = () => {
    setHasDrawn(false);
    setSignatureData('');
    initCanvas();
  };

  const handleSign = async () => {
    if (!signerName.trim() || !signatureData || !token) return;
    setSubmitting(true);
    try {
      const { data: res, error: rpcError } = await anonClient.rpc('sign_safety_doc_token', {
        token_param: token,
        signer_name: signerName.trim(),
        signature_data: signatureData,
      });
      if (rpcError) throw rpcError;
      if (res && !res.success) throw new Error(res.error);
      setShowSuccess(true);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Failed to submit signature. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-elec-dark flex items-center justify-center">
        <div className="h-6 w-6 rounded-full border-2 border-elec-yellow border-t-transparent animate-spin" />
      </div>
    );
  }
  if (error || !data) {
    return (
      <div className="min-h-screen bg-elec-dark flex items-center justify-center p-4">
        <div className="max-w-sm w-full text-center">
          <h1 className="text-xl font-semibold text-white mb-2">Link not valid</h1>
          <p className="text-white/60 text-sm">{error || 'This signing link is invalid or has expired.'}</p>
        </div>
      </div>
    );
  }
  if (showSuccess || data.already_signed) {
    return (
      <div className="min-h-screen bg-elec-dark flex items-center justify-center p-4">
        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-w-sm w-full text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto mb-5 text-emerald-400 text-2xl">✓</div>
          <h1 className="text-2xl font-semibold text-white mb-2">Signed</h1>
          <p className="text-white/65 text-sm">
            {showSuccess ? `Thank you, ${signerName}. ` : ''}Your sign-off for “{data.summary.title}” has been recorded. You can close this page.
          </p>
        </motion.div>
      </div>
    );
  }

  const s = data.summary;
  return (
    <div className="min-h-screen bg-elec-dark">
      <div className="max-w-lg mx-auto px-5 pb-12">
        <div className="pt-9 pb-5">
          <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/80">
            {ROLE_LABEL[data.role] ?? 'Sign-off'}
          </div>
          <h1 className="mt-2 text-[24px] font-semibold text-white leading-tight">{s.title}</h1>
          {s.subtitle && <p className="mt-1 text-[13px] text-white/60">{s.subtitle}</p>}
        </div>

        {s.lines && s.lines.length > 0 && (
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 divide-y divide-white/[0.06]">
            {s.lines.map((l, i) => (
              <div key={i} className="flex items-center justify-between gap-4 px-4 py-3">
                <span className="text-[11.5px] uppercase tracking-[0.1em] text-white/45">{l.label}</span>
                <span className="text-[13px] text-white/90 text-right">{l.value}</span>
              </div>
            ))}
          </div>
        )}

        {s.sections?.map((sec, i) => (
          <div key={i} className="mt-5">
            <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55 mb-2">{sec.heading}</div>
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 divide-y divide-white/[0.06]">
              {sec.items.map((it, j) => (
                <div key={j} className="px-4 py-3 text-[12.5px] text-white/85 leading-relaxed">{it}</div>
              ))}
            </div>
          </div>
        ))}

        {data.expired && (
          <div className="mt-5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[12px]">
            This signing link has expired, but you can still record your sign-off.
          </div>
        )}

        <div className="mt-7">
          <h2 className="text-[15px] font-semibold text-white">Confirm &amp; sign</h2>
          <p className="mt-1.5 text-[12px] text-white/60 leading-relaxed">
            {s.statement || 'By signing you confirm you have read and understood this document and accept its contents.'}
          </p>

          <div className="mt-4 space-y-1.5">
            <label className="text-[11.5px] text-white/80 block">Your full name</label>
            <input
              value={signerName}
              onChange={(e) => setSignerName(e.target.value)}
              placeholder="Enter your full name"
              className="h-12 w-full px-4 bg-[hsl(0_0%_9%)] border border-white/[0.1] rounded-xl text-white text-[14px] placeholder:text-white/40 focus:outline-none focus:border-elec-yellow/60 touch-manipulation"
            />
          </div>

          <div className="mt-4 space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-[11.5px] text-white/80">Your signature</label>
              {hasDrawn && (
                <button type="button" onClick={clearSignature} className="text-[11.5px] text-white/55 hover:text-white touch-manipulation">Clear</button>
              )}
            </div>
            <div ref={containerRef} className="relative w-full bg-[hsl(0_0%_9%)] rounded-xl overflow-hidden border border-white/[0.12]" style={{ height: '160px' }}>
              <canvas
                ref={canvasRef}
                className="absolute inset-0 cursor-crosshair touch-none"
                onMouseDown={startDraw}
                onMouseMove={draw}
                onMouseUp={stopDraw}
                onMouseLeave={stopDraw}
                onTouchStart={startDraw}
                onTouchMove={draw}
                onTouchEnd={stopDraw}
              />
              {!hasDrawn && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-white/35 text-[13px]">Sign here</span>
                </div>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={handleSign}
            disabled={submitting || !signerName.trim() || !hasDrawn}
            className={cn(
              'mt-5 w-full py-4 rounded-full text-[15px] font-semibold transition-all touch-manipulation',
              submitting || !signerName.trim() || !hasDrawn ? 'bg-white/10 text-white/50 cursor-not-allowed' : 'bg-elec-yellow text-black active:scale-[0.98]'
            )}
          >
            {submitting ? 'Submitting…' : 'Confirm & sign'}
          </button>
        </div>

        <p className="mt-8 text-center text-[11px] text-white/40">Powered by Elec-Mate · Secure document sign-off</p>
      </div>
    </div>
  );
};

export default PublicSafetySign;
