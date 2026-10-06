import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
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
  ChevronDown,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, supabase } from '@/integrations/supabase/client';

// Separate client for public signing — uses anon key, no auth session.
// Used only when nobody is signed in; a signed-in team member signs through the
// app's own client so the server can check they are who they say (ELE-1949).
const anonClient = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false, storageKey: 'briefing-sign-anon' },
});

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
  attendees: { name: string; role?: string }[];
  attendee_signatures: { name: string; signed_at?: string }[];
  photos: { url: string }[] | null;
  status: string | null;
  expired: boolean;
  expires_at: string;
  /** The sender's company (company_profiles), so the signer knows who is asking. */
  company_name?: string | null;
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
  electrical: 'bg-white/[0.06] text-yellow-300',
  fire: 'bg-red-500/15 text-red-300',
  heights: 'bg-purple-500/15 text-purple-300',
  'falling-objects': 'bg-white/[0.06] text-amber-300',
  'confined-space': 'bg-blue-500/15 text-blue-300',
  'manual-handling': 'bg-emerald-500/15 text-emerald-300',
  'hazardous-substances': 'bg-pink-500/15 text-pink-300',
  noise: 'bg-orange-500/15 text-orange-300',
  'wet-slippery': 'bg-cyan-500/15 text-cyan-300',
  vehicles: 'bg-gray-500/15 text-gray-300',
  machinery: 'bg-slate-500/15 text-slate-300',
  asbestos: 'bg-rose-500/15 text-rose-300',
};

// Underlined fields, as everywhere else in the app (no boxes, no focus ring).
const signInputCn =
  'w-full h-12 pl-8 pr-1 rounded-none border-0 border-b border-white/[0.15] bg-transparent ' +
  'text-base text-white placeholder:text-white/40 caret-elec-yellow [color-scheme:dark] ' +
  'focus:outline-none focus:ring-0 focus:border-elec-yellow touch-manipulation';

const RISK_STYLES: Record<string, { bg: string; text: string; border: string }> = {
  low: { bg: 'bg-emerald-500/15', text: 'text-emerald-400', border: 'border-emerald-500/30' },
  medium: { bg: 'bg-white/[0.06]', text: 'text-amber-400', border: 'border-amber-500/30' },
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
  const [showWalkInForm, setShowWalkInForm] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [needsSignIn, setNeedsSignIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Canvas refs
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const signFormRef = useRef<HTMLDivElement>(null);
  const isDrawing = useRef(false);

  useEffect(() => {
    if (token) loadBriefing();
  }, [token]);

  useEffect(() => {
    if (!loading && briefing && !showSuccess) {
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
    } catch (err: unknown) {
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

  // Tap-to-sign: pre-fill name and scroll to form
  const handleTapToSign = (name: string) => {
    setSignerName(name);
    setShowWalkInForm(false);
    setTimeout(() => {
      signFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  // --- Submit ---
  const handleSign = async () => {
    if (!signerName.trim() || !signatureData || !token) return;

    setSubmitting(true);
    try {
      // No IP lookup. This used to ask a third-party service (api.ipify.org)
      // for the signer's IP without telling them; an IP the browser reports
      // about itself proves nothing, and the signature record never prints it.
      const clientIp = '';
      setSubmitError(null);
      setNeedsSignIn(false);
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const client = session ? supabase : anonClient;
      const { data, error: rpcError } = await client.rpc('sign_briefing_by_token', {
        token_param: token,
        signer_name: signerName.trim(),
        signature_data: signatureData,
        signer_company: signerCompany.trim() || null,
        client_ip: clientIp,
        client_user_agent: navigator.userAgent.substring(0, 200),
      });

      if (rpcError) throw rpcError;
      const result = data as { success?: boolean; error?: string; code?: string } | null;
      if (result && !result.success) {
        if (result.code === 'sign_in_required') setNeedsSignIn(true);
        throw new Error(result.error);
      }

      setShowSuccess(true);
    } catch (err: unknown) {
      console.error('Signing error:', err);
      setSubmitError(err instanceof Error ? err.message : 'Signature not saved. Please try again.');
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
          <p className="text-white text-sm">Loading briefing...</p>
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
          <h1 className="text-xl font-bold text-white mb-2">Link not valid</h1>
          <p className="text-white text-sm">
            {error || 'This signing link is invalid or has expired.'}
          </p>
        </div>
      </div>
    );
  }

  // --- Expired or cancelled: nothing to sign, and say what to do ---
  if (!showSuccess && (briefing.expired || briefing.status === 'cancelled')) {
    const cancelled = briefing.status === 'cancelled';
    return (
      <div className="min-h-screen bg-[#0a0e17] flex items-center justify-center p-4">
        <div className="max-w-sm w-full text-center">
          <h1 className="text-xl font-bold text-white mb-2">
            {cancelled ? 'This briefing was cancelled' : 'This link has expired'}
          </h1>
          <p className="text-white text-sm leading-relaxed">
            {cancelled
              ? `"${briefing.briefing_name}" is no longer running, so it cannot be signed.`
              : `Signing links last 7 days. Ask ${briefing.company_name || briefing.created_by_name || 'the person who sent it'} for a new link to sign "${briefing.briefing_name}".`}
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
          <h1 className="text-2xl font-bold text-white mb-2">Signed</h1>
          <p className="text-white text-sm mb-6">
            Thank you, {signerName}. Your signature for &quot;{briefing.briefing_name}&quot; has
            been recorded
            {briefing.company_name ? ` and sent to ${briefing.company_name}` : ''}.
          </p>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-sm text-white">
            You can close this page now.
          </div>
        </motion.div>
      </div>
    );
  }

  // --- Main signing page ---
  const riskStyle = RISK_STYLES[briefing.risk_level || 'medium'] || RISK_STYLES.medium;
  const signatures = briefing.attendee_signatures || [];
  const expectedAttendees = briefing.attendees || [];
  const signedNames = new Set(signatures.map((s: { name: string }) => s.name?.toLowerCase?.()));
  const signedCount = signatures.length;
  const totalExpected = expectedAttendees.length;
  const progressPct = totalExpected > 0 ? Math.round((signedCount / totalExpected) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#0a0e17]">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="border-b border-white/[0.08] px-5 pt-8 pb-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center">
              <FileText className="h-4 w-4 text-yellow-400" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-yellow-400">
              {briefing.briefing_type === 'toolbox-talk'
                ? 'Toolbox talk'
                : `${briefing.briefing_type ? briefing.briefing_type.replace(/-/g, ' ') : 'Team'} briefing`}
            </span>
          </div>
          {briefing.company_name && (
            <p className="mb-1 text-sm font-semibold text-white">From {briefing.company_name}</p>
          )}
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
              {briefing.risk_level.charAt(0).toUpperCase() + briefing.risk_level.slice(1)} risk
            </span>
          )}
        </div>

        {/* Briefing Details */}
        <div className="px-5 space-y-4 pb-4">
          {/* Info rows */}
          <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4 space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <div className="w-7 h-7 rounded-lg bg-white/[0.06] flex items-center justify-center shrink-0">
                <MapPin className="h-3.5 w-3.5 text-white" />
              </div>
              <span className="text-white truncate min-w-0">{briefing.location}</span>
            </div>
            <div className="flex items-center gap-3 text-sm flex-wrap">
              <div className="flex items-center gap-3 shrink-0">
                <div className="w-7 h-7 rounded-lg bg-white/[0.06] flex items-center justify-center shrink-0">
                  <Calendar className="h-3.5 w-3.5 text-white" />
                </div>
                <span className="text-white whitespace-nowrap">
                  {new Date(briefing.briefing_date + 'T00:00:00').toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              </div>
              <span className="text-white hidden sm:inline">|</span>
              <div className="flex items-center gap-3 shrink-0">
                <div className="w-7 h-7 rounded-lg bg-white/[0.06] flex items-center justify-center shrink-0">
                  <Clock className="h-3.5 w-3.5 text-white" />
                </div>
                <span className="text-white whitespace-nowrap">
                  {briefing.briefing_time?.slice(0, 5)}
                </span>
              </div>
            </div>
            {briefing.created_by_name && (
              <div className="flex items-center gap-3 text-sm">
                <div className="w-7 h-7 rounded-lg bg-white/[0.06] flex items-center justify-center shrink-0">
                  <User className="h-3.5 w-3.5 text-white" />
                </div>
                <span className="text-white truncate min-w-0">
                  Presented by {briefing.created_by_name}
                </span>
              </div>
            )}
          </div>

          {/* What the briefing actually says. The signer is attesting they have
              read it, so it has to be on the page — before this block the link
              showed a title, a date and a signature box and nothing else. */}
          {(briefing.briefing_description || briefing.work_scope) && (
            <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4 space-y-3">
              <div className="flex items-center gap-2">
                <FileText className="h-3.5 w-3.5 text-white" />
                <span className="text-xs font-semibold text-white uppercase tracking-wider">
                  Briefing
                </span>
              </div>
              {briefing.work_scope && (
                <p className="text-sm text-white leading-relaxed whitespace-pre-wrap">
                  {briefing.work_scope}
                </p>
              )}
              {briefing.briefing_description && (
                <p className="text-sm text-white leading-relaxed whitespace-pre-wrap">
                  {briefing.briefing_description}
                </p>
              )}
            </div>
          )}
          {briefing.key_points && briefing.key_points.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-semibold text-white uppercase tracking-wider">
                Key points
              </span>
              <ul className="space-y-1.5">
                {briefing.key_points.map((k, i) => (
                  <li key={i} className="flex gap-2 text-sm text-white leading-relaxed">
                    <span className="text-yellow-400 shrink-0">•</span>
                    <span>{k}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {briefing.safety_points && briefing.safety_points.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-semibold text-white uppercase tracking-wider">
                Safety points
              </span>
              <ul className="space-y-1.5">
                {briefing.safety_points.map((k, i) => (
                  <li key={i} className="flex gap-2 text-sm text-white leading-relaxed">
                    <ShieldAlert className="h-3.5 w-3.5 text-amber-300 shrink-0 mt-0.5" />
                    <span>{k}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Hazards */}
          {briefing.identified_hazards && briefing.identified_hazards.length > 0 && (
            <div className="space-y-2.5">
              <div className="flex items-center gap-2">
                <ShieldAlert className="h-3.5 w-3.5 text-white" />
                <span className="text-xs font-semibold text-white uppercase tracking-wider">
                  Hazards
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

          {/* Safety warning */}
          {briefing.safety_warning && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-300">
              <span className="font-semibold">Safety warning: </span>
              {briefing.safety_warning}
            </div>
          )}

          {/* Attendee Sign-Off Register */}
          {expectedAttendees.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-3.5 w-3.5 text-white" />
                  <span className="text-xs font-semibold text-white uppercase tracking-wider">
                    Attendees
                  </span>
                </div>
                <span className="text-xs text-white">
                  {signedCount} of {totalExpected} signed
                </span>
              </div>

              {/* Progress bar */}
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPct}%` }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className={cn(
                    'h-full rounded-full',
                    signedCount === totalExpected ? 'bg-emerald-400' : 'bg-amber-400'
                  )}
                />
              </div>

              {/* Attendee list */}
              <div className="space-y-1.5">
                {expectedAttendees.map((attendee: { name: string; role?: string }, idx: number) => {
                  const name = attendee.name || '';
                  const isSigned = signedNames.has(name.toLowerCase());
                  const sig = isSigned
                    ? signatures.find(
                        (s: { name: string }) => s.name?.toLowerCase() === name.toLowerCase()
                      )
                    : null;

                  return (
                    <div
                      key={idx}
                      className={cn(
                        'flex items-center justify-between gap-2 p-3 rounded-xl border transition-all',
                        isSigned
                          ? 'bg-emerald-500/5 border-emerald-500/15'
                          : 'bg-white/[0.03] border-white/10'
                      )}
                    >
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <span className="text-xs text-white w-5 text-right shrink-0">
                          {idx + 1}.
                        </span>
                        {isSigned ? (
                          <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                        ) : (
                          <div className="h-4 w-4 rounded-full border-2 border-white/20 shrink-0" />
                        )}
                        <div className="min-w-0">
                          <span
                            className={cn(
                              'text-sm truncate block',
                              isSigned ? 'text-white' : 'text-white'
                            )}
                          >
                            {name}
                          </span>
                          {attendee.role && (
                            <span className="text-xs text-white">{attendee.role}</span>
                          )}
                        </div>
                      </div>
                      {isSigned ? (
                        <span className="text-xs text-white shrink-0 whitespace-nowrap">
                          {sig?.signed_at
                            ? new Date(sig.signed_at).toLocaleTimeString('en-GB', {
                                hour: '2-digit',
                                minute: '2-digit',
                              })
                            : 'Signed'}
                        </span>
                      ) : (
                        <button
                          onClick={() => handleTapToSign(name)}
                          className="min-h-11 px-4 rounded-lg bg-elec-yellow text-black text-sm font-semibold touch-manipulation active:scale-95 transition-transform"
                        >
                          Sign
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Walk-in / not on list */}
          {expectedAttendees.length > 0 && (
            <button
              onClick={() => {
                setShowWalkInForm(!showWalkInForm);
                if (!showWalkInForm) {
                  setSignerName('');
                  setTimeout(() => {
                    signFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }, 100);
                }
              }}
              className="w-full flex items-center justify-center gap-2 py-3 text-sm text-white hover:text-white transition-colors touch-manipulation min-h-[44px]"
            >
              <span>Not on the list? Sign as a guest</span>
              <ChevronDown
                className={cn('h-4 w-4 transition-transform', showWalkInForm && 'rotate-180')}
              />
            </button>
          )}
        </div>

        {/* Divider */}
        <div className="mx-5 h-px bg-white/10 my-2" />

        {/* Sign Off Form — always visible if no expected attendees, or when walk-in toggled, or when name pre-filled from tap */}
        <AnimatePresence>
          {(expectedAttendees.length === 0 || showWalkInForm || signerName) && (
            <motion.div
              ref={signFormRef}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="px-5 py-5 space-y-5 pb-10">
                <div className="flex items-center gap-2">
                  <Pen className="h-4 w-4 text-yellow-400" />
                  <h2 className="text-sm font-bold text-white">Sign this briefing</h2>
                </div>

                <p className="text-xs text-white -mt-2">
                  By signing below you confirm you have read and understood this briefing and its
                  safety requirements.
                </p>

                {/* Name input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-white">Your full name</label>
                  <div className="relative">
                    <User className="absolute left-1 top-1/2 -translate-y-1/2 h-4 w-4 text-white" />
                    <input
                      type="text"
                      value={signerName}
                      onChange={(e) => setSignerName(e.target.value)}
                      placeholder="Enter your full name"
                      className={signInputCn}
                    />
                  </div>
                </div>

                {/* Company input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-white">Company (optional)</label>
                  <div className="relative">
                    <Building2 className="absolute left-1 top-1/2 -translate-y-1/2 h-4 w-4 text-white" />
                    <input
                      type="text"
                      value={signerCompany}
                      onChange={(e) => setSignerCompany(e.target.value)}
                      placeholder="Your company name"
                      className={signInputCn}
                    />
                  </div>
                </div>

                {/* Signature pad */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-medium text-white">Your signature</label>
                    {hasDrawn && (
                      <button
                        type="button"
                        onClick={clearSignature}
                        className="flex items-center gap-1.5 text-sm text-white hover:text-white touch-manipulation min-h-[44px] px-2"
                      >
                        <RotateCcw className="h-3.5 w-3.5" />
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

                {submitError && (
                  <div className="rounded-xl border border-orange-500/30 bg-orange-500/10 p-4 space-y-3">
                    <p className="text-sm text-white">{submitError}</p>
                    {needsSignIn && (
                      <button
                        type="button"
                        onClick={() =>
                          navigate('/auth/signin', {
                            state: {
                              from: { pathname: location.pathname, search: location.search },
                            },
                          })
                        }
                        className="w-full h-12 rounded-xl bg-white text-black font-semibold touch-manipulation"
                      >
                        Sign in to sign
                      </button>
                    )}
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="button"
                  onClick={handleSign}
                  disabled={submitting || !signerName.trim() || !hasDrawn}
                  className={cn(
                    'w-full h-14 rounded-xl flex items-center justify-center gap-2',
                    'text-base font-semibold transition-all touch-manipulation',
                    submitting || !signerName.trim() || !hasDrawn
                      ? 'bg-white/10 text-white cursor-not-allowed'
                      : 'bg-emerald-500 text-white hover:bg-emerald-600 active:scale-[0.98] shadow-lg shadow-emerald-500/20'
                  )}
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Signing…
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-5 w-5" />
                      Sign briefing
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <div className="px-5 pb-8 text-center">
          <p className="text-xs text-white">
            Sign-off recorded with Elec-Mate. Your name, company and signature go to the person who
            sent this link.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PublicBriefingSign;
