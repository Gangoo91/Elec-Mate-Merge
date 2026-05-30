import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { createClient } from '@supabase/supabase-js';
import { cn } from '@/lib/utils';
import { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from '@/integrations/supabase/client';

// Separate anon client for public signing — no auth session. Reads/writes go
// through SECURITY DEFINER RPCs that validate the token server-side.
const anonClient = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

interface PermitData {
  id: string;
  title: string;
  type: string;
  location: string;
  description: string | null;
  issuer_name: string;
  hazards: { id?: string; hazard?: string; description?: string; controls?: string }[] | null;
  precautions: string[] | null;
  ppe_required: string[] | null;
  emergency_procedures: string | null;
  start_time: string;
  end_time: string;
  status: string;
  version: number;
  acceptance_status: string;
  receiver_name: string | null;
  already_signed: boolean;
  expired: boolean;
}

const TYPE_LABELS: Record<string, string> = {
  'hot-work': 'Hot Work Permit',
  'confined-space': 'Confined Space Entry Permit',
  'electrical-isolation': 'Electrical Isolation Permit',
  'working-at-height': 'Working at Height Permit',
  excavation: 'Excavation Permit',
};

const fmtDateTime = (d: string | null) =>
  d ? new Date(d).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'N/A';

const PublicPermitSign = () => {
  const { token } = useParams<{ token: string }>();
  const [permit, setPermit] = useState<PermitData | null>(null);
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
    if (token) loadPermit();
  }, [token]);

  useEffect(() => {
    if (!loading && permit && !permit.already_signed && !showSuccess) {
      const t = setTimeout(initCanvas, 50);
      return () => clearTimeout(t);
    }
  }, [loading, permit, showSuccess]);

  const loadPermit = async () => {
    try {
      setLoading(true);
      const { data, error: rpcError } = await anonClient.rpc('get_permit_by_signing_token', { token_param: token });
      if (rpcError) throw rpcError;
      if (!data) {
        setError('This signing link is invalid or has expired.');
        return;
      }
      const p = data as PermitData;
      setPermit(p);
      if (p.receiver_name) setSignerName(p.receiver_name);
    } catch {
      setError('Could not load the permit. The link may be invalid.');
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
      const { data, error: rpcError } = await anonClient.rpc('sign_permit_by_token', {
        token_param: token,
        signer_name: signerName.trim(),
        signature_data: signatureData,
      });
      if (rpcError) throw rpcError;
      if (data && !data.success) throw new Error(data.error);
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

  if (error || !permit) {
    return (
      <div className="min-h-screen bg-elec-dark flex items-center justify-center p-4">
        <div className="max-w-sm w-full text-center">
          <h1 className="text-xl font-semibold text-white mb-2">Link not valid</h1>
          <p className="text-white/60 text-sm">{error || 'This signing link is invalid or has expired.'}</p>
        </div>
      </div>
    );
  }

  if (showSuccess || permit.already_signed) {
    return (
      <div className="min-h-screen bg-elec-dark flex items-center justify-center p-4">
        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-w-sm w-full text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto mb-5 text-emerald-400 text-2xl">✓</div>
          <h1 className="text-2xl font-semibold text-white mb-2">Permit accepted</h1>
          <p className="text-white/65 text-sm mb-6">
            {showSuccess ? `Thank you, ${signerName}. ` : ''}Your acceptance of “{permit.title}” has been recorded. You can close this page.
          </p>
        </motion.div>
      </div>
    );
  }

  const hazards = permit.hazards || [];
  const precautions = permit.precautions || [];
  const ppe = permit.ppe_required || [];

  return (
    <div className="min-h-screen bg-elec-dark">
      <div className="max-w-lg mx-auto px-5 pb-12">
        {/* Header */}
        <div className="pt-9 pb-5">
          <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/80">
            {TYPE_LABELS[permit.type] || 'Permit to Work'}
            {permit.version > 1 ? ` · Version ${permit.version}` : ''}
          </div>
          <h1 className="mt-2 text-[24px] font-semibold text-white leading-tight">{permit.title}</h1>
        </div>

        {/* Details */}
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-4 space-y-1.5 text-[13px]">
          <div className="text-white/90">{permit.location}</div>
          <div className="text-white/60">
            {fmtDateTime(permit.start_time)} — {fmtDateTime(permit.end_time)}
          </div>
          <div className="text-white/60">Issued by {permit.issuer_name}</div>
          {permit.description && <p className="text-white/80 pt-1 leading-relaxed">{permit.description}</p>}
        </div>

        {/* Hazards */}
        {hazards.length > 0 && (
          <div className="mt-5">
            <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55 mb-2">Hazards &amp; controls</div>
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 divide-y divide-white/[0.06]">
              {hazards.map((h, i) => (
                <div key={i} className="px-4 py-3">
                  <p className="text-[13px] text-white font-medium">{h.hazard || h.description || 'Hazard'}</p>
                  {h.controls && <p className="text-[12px] text-white/60 mt-0.5">{h.controls}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Precautions */}
        {precautions.length > 0 && (
          <div className="mt-5">
            <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55 mb-2">Precautions</div>
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 divide-y divide-white/[0.06]">
              {precautions.map((p, i) => (
                <div key={i} className="px-4 py-3 text-[12.5px] text-white/90 leading-relaxed">{p}</div>
              ))}
            </div>
          </div>
        )}

        {/* PPE */}
        {ppe.length > 0 && (
          <div className="mt-5">
            <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55 mb-2">Required PPE</div>
            <div className="flex flex-wrap gap-1.5">
              {ppe.map((item, i) => (
                <span key={i} className="inline-flex items-center px-2 py-1 rounded-lg text-[11.5px] text-white/75 bg-white/[0.05] border border-white/10">{item}</span>
              ))}
            </div>
          </div>
        )}

        {/* Emergency */}
        {permit.emergency_procedures && (
          <div className="mt-5 p-3 rounded-2xl bg-red-500/[0.08] border border-red-500/20">
            <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-red-300/90 mb-1">Emergency procedures</div>
            <p className="text-[12.5px] text-white/85 leading-relaxed">{permit.emergency_procedures}</p>
          </div>
        )}

        {permit.expired && (
          <div className="mt-5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[12px]">
            This signing link has expired, but you can still record your acceptance.
          </div>
        )}

        {/* Sign-off */}
        <div className="mt-7">
          <h2 className="text-[15px] font-semibold text-white">Accept this permit</h2>
          <p className="mt-1.5 text-[12px] text-white/60 leading-relaxed">
            By signing you confirm you have read and understood this permit, accept the control measures and
            precautions, and are competent to carry out the work.
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
                <button type="button" onClick={clearSignature} className="text-[11.5px] text-white/55 hover:text-white touch-manipulation">
                  Clear
                </button>
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
              'mt-5 w-full h-13 py-4 rounded-full text-[15px] font-semibold transition-all touch-manipulation',
              submitting || !signerName.trim() || !hasDrawn
                ? 'bg-white/10 text-white/50 cursor-not-allowed'
                : 'bg-elec-yellow text-black active:scale-[0.98]'
            )}
          >
            {submitting ? 'Submitting…' : 'Accept & sign permit'}
          </button>
        </div>

        <p className="mt-8 text-center text-[11px] text-white/40">Powered by Elec-Mate · Secure permit sign-off</p>
      </div>
    </div>
  );
};

export default PublicPermitSign;
