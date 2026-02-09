import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from '@supabase/supabase-js';
import {
  FileText,
  MapPin,
  Calendar,
  Clock,
  ShieldAlert,
  AlertTriangle,
  CheckCircle,
  Loader2,
  User,
  Building2,
  Users,
  Pen,
  RotateCcw,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from '@/integrations/supabase/client';

// Separate client for public signing — uses anon key, no auth session
const anonClient = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

interface BriefingData {
  id: string;
  briefing_name: string;
  briefing_type: string | null;
  briefing_description: string | null;
  briefing_date: string;
  briefing_time: string;
  location: string;
  risk_level: string | null;
  identified_hazards: string[] | null;
  work_scope: string | null;
  safety_warning: string | null;
  key_points: string[] | null;
  safety_points: string[] | null;
  conductor_name: string | null;
  created_by_name: string | null;
  attendees: any[];
  attendee_signatures: any[];
  photos: any[] | null;
  status: string | null;
  expired: boolean;
  expires_at: string;
}

const HAZARD_LABELS: Record<string, string> = {
  electrical: 'Electrical',
  fire: 'Fire',
  heights: 'Heights',
  'falling-objects': 'Falling Objects',
  'confined-space': 'Confined Space',
  'manual-handling': 'Manual Handling',
  'hazardous-substances': 'Hazardous Substances',
  noise: 'Noise',
  'wet-slippery': 'Wet/Slippery',
  vehicles: 'Vehicles',
  machinery: 'Machinery',
  asbestos: 'Asbestos',
};

const HAZARD_COLOURS: Record<string, string> = {
  electrical: 'bg-yellow-500/15 text-yellow-300',
  fire: 'bg-red-500/15 text-red-300',
  heights: 'bg-purple-500/15 text-purple-300',
  'falling-objects': 'bg-amber-500/15 text-amber-300',
  'confined-space': 'bg-blue-500/15 text-blue-300',
  'manual-handling': 'bg-emerald-500/15 text-emerald-300',
  'hazardous-substances': 'bg-pink-500/15 text-pink-300',
  noise: 'bg-orange-500/15 text-orange-300',
  'wet-slippery': 'bg-cyan-500/15 text-cyan-300',
  vehicles: 'bg-gray-500/15 text-gray-300',
  machinery: 'bg-slate-500/15 text-slate-300',
  asbestos: 'bg-rose-500/15 text-rose-300',
};

const RISK_STYLES: Record<string, { bg: string; text: string; border: string }> = {
  low: { bg: 'bg-emerald-500/15', text: 'text-emerald-400', border: 'border-emerald-500/30' },
  medium: { bg: 'bg-amber-500/15', text: 'text-amber-400', border: 'border-amber-500/30' },
  high: { bg: 'bg-red-500/15', text: 'text-red-400', border: 'border-red-500/30' },
};

const PublicBriefingSign = () => {
  const { token } = useParams<{ token: string }>();
  const [briefing, setBriefing] = useState<BriefingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [signerName, setSignerName] = useState('');
  const [signerCompany, setSignerCompany] = useState('');
  const [signatureData, setSignatureData] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);

  // Canvas refs
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDrawing = useRef(false);

  useEffect(() => {
    if (token) loadBriefing();
  }, [token]);

  useEffect(() => {
    if (!loading && briefing && !showSuccess) {
      // Small delay to ensure canvas is mounted in the DOM
      const timer = setTimeout(() => initCanvas(), 50);
      return () => clearTimeout(timer);
    }
  }, [loading, briefing, showSuccess]);

  useEffect(() => {
    const handleResize = () => initCanvas();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const loadBriefing = async () => {
    try {
      setLoading(true);
      const { data, error: rpcError } = await anonClient.rpc('get_briefing_by_signing_token', {
        token_param: token,
      });

      if (rpcError) throw rpcError;
      if (!data) {
        setError('This signing link is invalid or has expired.');
        return;
      }

      setBriefing(data as BriefingData);
    } catch (err: any) {
      console.error('Error loading briefing:', err);
      setError('Could not load the briefing. The link may be invalid.');
    } finally {
      setLoading(false);
    }
  };

  // --- Canvas signature ---
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

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Signature line hint
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(20, rect.height - 25);
    ctx.lineTo(rect.width - 20, rect.height - 25);
    ctx.stroke();

    ctx.strokeStyle = '#1f2937';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  };

  const getCoords = (e: React.MouseEvent | React.TouchEvent) => {
    const container = containerRef.current;
    if (!container) return { x: 0, y: 0 };
    const rect = container.getBoundingClientRect();
    if ('touches' in e) {
      return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
    }
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
    if (isDrawing.current && canvasRef.current) {
      setSignatureData(canvasRef.current.toDataURL());
    }
    isDrawing.current = false;
  };

  const clearSignature = () => {
    setHasDrawn(false);
    setSignatureData('');
    initCanvas();
  };

  // --- Submit ---
  const handleSign = async () => {
    if (!signerName.trim() || !signatureData || !token) return;

    setSubmitting(true);
    try {
      // Get IP address (best effort)
      let clientIp = '';
      try {
        const ipRes = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipRes.json();
        clientIp = ipData.ip || '';
      } catch {
        /* non-critical */
      }

      const { data, error: rpcError } = await anonClient.rpc('sign_briefing_by_token', {
        token_param: token,
        signer_name: signerName.trim(),
        signature_data: signatureData,
        signer_company: signerCompany.trim() || null,
        client_ip: clientIp,
        client_user_agent: navigator.userAgent.substring(0, 200),
      });

      if (rpcError) throw rpcError;
      if (data && !data.success) throw new Error(data.error);

      setShowSuccess(true);
    } catch (err: any) {
      console.error('Signing error:', err);
      alert(err.message || 'Failed to submit signature. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // --- Loading state ---
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0e17] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-yellow-400" />
          <p className="text-white/60 text-sm">Loading briefing...</p>
        </div>
      </div>
    );
  }

  // --- Error state ---
  if (error || !briefing) {
    return (
      <div className="min-h-screen bg-[#0a0e17] flex items-center justify-center p-4">
        <div className="max-w-sm w-full text-center">
          <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="h-8 w-8 text-red-400" />
          </div>
          <h1 className="text-xl font-bold text-white mb-2">Link Not Valid</h1>
          <p className="text-white/50 text-sm">
            {error || 'This signing link is invalid or has expired.'}
          </p>
        </div>
      </div>
    );
  }

  // --- Success state ---
  if (showSuccess) {
    return (
      <div className="min-h-screen bg-[#0a0e17] flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-sm w-full text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.1 }}
            className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="h-10 w-10 text-emerald-400" />
          </motion.div>
          <h1 className="text-2xl font-bold text-white mb-2">Signed Successfully</h1>
          <p className="text-white/50 text-sm mb-6">
            Thank you, {signerName}. Your signature for "{briefing.briefing_name}" has been
            recorded.
          </p>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-sm text-white/40">
            You can close this page now.
          </div>
        </motion.div>
      </div>
    );
  }

  // --- Main signing page ---
  const riskStyle = RISK_STYLES[briefing.risk_level || 'medium'] || RISK_STYLES.medium;
  const signatures = briefing.attendee_signatures || [];
  const attendeeNames = (briefing.attendees || []).map((a: any) => a.name);

  return (
    <div className="min-h-screen bg-[#0a0e17]">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-b from-yellow-500/10 to-transparent px-5 pt-8 pb-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-yellow-500/20 flex items-center justify-center">
              <FileText className="h-4 w-4 text-yellow-400" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-yellow-400/80">
              {briefing.briefing_type?.replace(/-/g, ' ') || 'Team'} Briefing
            </span>
          </div>
          <h1 className="text-xl font-bold text-white leading-tight mb-3">
            {briefing.briefing_name}
          </h1>

          {/* Risk badge */}
          {briefing.risk_level && (
            <span
              className={cn(
                'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border',
                riskStyle.bg,
                riskStyle.text,
                riskStyle.border
              )}
            >
              <AlertTriangle className="h-3 w-3" />
              {briefing.risk_level.charAt(0).toUpperCase() + briefing.risk_level.slice(1)} Risk
            </span>
          )}

          {/* Expired warning */}
          {briefing.expired && (
            <div className="mt-3 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs">
              This signing link has expired but you can still sign.
            </div>
          )}
        </div>

        {/* Briefing Details */}
        <div className="px-5 space-y-4 pb-4">
          {/* Info rows */}
          <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4 space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <div className="w-7 h-7 rounded-lg bg-white/[0.06] flex items-center justify-center shrink-0">
                <MapPin className="h-3.5 w-3.5 text-white/50" />
              </div>
              <span className="text-white/70">{briefing.location}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-7 h-7 rounded-lg bg-white/[0.06] flex items-center justify-center shrink-0">
                <Calendar className="h-3.5 w-3.5 text-white/50" />
              </div>
              <span className="text-white/70">{briefing.briefing_date}</span>
              <span className="text-white/20">|</span>
              <div className="w-7 h-7 rounded-lg bg-white/[0.06] flex items-center justify-center shrink-0">
                <Clock className="h-3.5 w-3.5 text-white/50" />
              </div>
              <span className="text-white/70">{briefing.briefing_time}</span>
            </div>
            {briefing.created_by_name && (
              <div className="flex items-center gap-3 text-sm">
                <div className="w-7 h-7 rounded-lg bg-white/[0.06] flex items-center justify-center shrink-0">
                  <User className="h-3.5 w-3.5 text-white/50" />
                </div>
                <span className="text-white/70">Presented by {briefing.created_by_name}</span>
              </div>
            )}
          </div>

          {/* Hazards */}
          {briefing.identified_hazards && briefing.identified_hazards.length > 0 && (
            <div className="space-y-2.5">
              <div className="flex items-center gap-2">
                <ShieldAlert className="h-3.5 w-3.5 text-white/40" />
                <span className="text-xs font-semibold text-white/40 uppercase tracking-wider">
                  Identified Hazards
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {briefing.identified_hazards.map((h) => (
                  <span
                    key={h}
                    className={cn(
                      'px-2.5 py-1 rounded-full text-xs font-medium',
                      HAZARD_COLOURS[h] || 'bg-gray-500/15 text-gray-300'
                    )}
                  >
                    {HAZARD_LABELS[h] || h.replace(/^custom-/, '').replace(/-/g, ' ')}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Key safety points */}
          {briefing.safety_warning && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-300">
              <span className="font-semibold">Safety Warning: </span>
              {briefing.safety_warning}
            </div>
          )}

          {/* Already signed */}
          {signatures.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Users className="h-3.5 w-3.5 text-white/40" />
                <span className="text-xs font-semibold text-white/40 uppercase tracking-wider">
                  Already Signed ({signatures.length})
                </span>
              </div>
              <div className="space-y-1.5">
                {signatures.map((sig: any, idx: number) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-emerald-500/5 border border-emerald-500/10"
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />
                      <span className="text-sm text-white/80">{sig.name}</span>
                      {sig.company && (
                        <span className="text-xs text-white/40">({sig.company})</span>
                      )}
                    </div>
                    <span className="text-xs text-white/30">
                      {sig.signed_at
                        ? new Date(sig.signed_at).toLocaleTimeString('en-GB', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })
                        : ''}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="mx-5 h-px bg-white/10 my-2" />

        {/* Sign Off Form */}
        <div className="px-5 py-5 space-y-5 pb-10">
          <div className="flex items-center gap-2">
            <Pen className="h-4 w-4 text-yellow-400" />
            <h2 className="text-sm font-bold text-white">Sign This Briefing</h2>
          </div>

          <p className="text-xs text-white/40 -mt-2">
            By signing below you confirm you have read and understood this briefing and its safety
            requirements.
          </p>

          {/* Name input */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-white/60">Your Full Name *</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
              <input
                type="text"
                value={signerName}
                onChange={(e) => setSignerName(e.target.value)}
                placeholder="Enter your full name"
                className={cn(
                  'w-full h-12 pl-10 pr-4 rounded-xl text-sm',
                  'bg-white/[0.06] border border-white/10 text-white',
                  'placeholder:text-white/30',
                  'focus:outline-none focus:ring-2 focus:ring-yellow-500/40 focus:border-yellow-500/40',
                  'touch-manipulation'
                )}
              />
            </div>
          </div>

          {/* Company input */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-white/60">Company (optional)</label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
              <input
                type="text"
                value={signerCompany}
                onChange={(e) => setSignerCompany(e.target.value)}
                placeholder="Your company name"
                className={cn(
                  'w-full h-12 pl-10 pr-4 rounded-xl text-sm',
                  'bg-white/[0.06] border border-white/10 text-white',
                  'placeholder:text-white/30',
                  'focus:outline-none focus:ring-2 focus:ring-yellow-500/40 focus:border-yellow-500/40',
                  'touch-manipulation'
                )}
              />
            </div>
          </div>

          {/* Signature pad */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-white/60">Your Signature *</label>
              {hasDrawn && (
                <button
                  type="button"
                  onClick={clearSignature}
                  className="flex items-center gap-1 text-xs text-white/40 hover:text-white/60 touch-manipulation"
                >
                  <RotateCcw className="h-3 w-3" />
                  Clear
                </button>
              )}
            </div>
            <div className="relative">
              <div
                ref={containerRef}
                className="relative w-full bg-white rounded-xl overflow-hidden border-2 border-dashed border-white/20"
                style={{ height: '160px' }}
              >
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
                    <div className="text-center text-gray-400">
                      <Pen className="h-5 w-5 mx-auto mb-1 opacity-50" />
                      <p className="text-xs font-medium">Draw your signature here</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Submit button */}
          <button
            type="button"
            onClick={handleSign}
            disabled={submitting || !signerName.trim() || !hasDrawn}
            className={cn(
              'w-full h-14 rounded-xl flex items-center justify-center gap-2',
              'text-base font-semibold transition-all touch-manipulation',
              submitting || !signerName.trim() || !hasDrawn
                ? 'bg-white/10 text-white/30 cursor-not-allowed'
                : 'bg-emerald-500 text-white hover:bg-emerald-600 active:scale-[0.98] shadow-lg shadow-emerald-500/20'
            )}
          >
            {submitting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <CheckCircle className="h-5 w-5" />
                Sign Briefing
              </>
            )}
          </button>
        </div>

        {/* Footer */}
        <div className="px-5 pb-8 text-center">
          <p className="text-[10px] text-white/20">
            Powered by Elec-Mate | Secure Digital Briefing Sign-Off
          </p>
        </div>
      </div>
    </div>
  );
};

export default PublicBriefingSign;
