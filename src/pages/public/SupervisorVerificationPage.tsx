/**
 * SupervisorVerificationPage
 *
 * Public page for supervisors to verify apprentice evidence.
 * No login required — uses anon Supabase client + SECURITY DEFINER RPCs.
 * Pattern copied from PublicBriefingSign.tsx.
 */

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { createClient } from '@supabase/supabase-js';
import {
  ShieldCheck,
  User,
  Building2,
  Mail,
  Calendar,
  MapPin,
  Wrench,
  GraduationCap,
  Pen,
  RotateCcw,
  CheckCircle,
  Loader2,
  AlertTriangle,
  Clock,
  Image as ImageIcon,
  Hash,
  MessageSquare,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY,
} from '@/integrations/supabase/client';

// Separate client for public verification — uses anon key, no auth session
const anonClient = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

interface VerificationData {
  id: string;
  apprentice_name: string;
  verification_type?: 'portfolio' | 'diary' | 'time_entry';
  evidence_snapshot: {
    site_name?: string;
    date?: string;
    tasks?: string[];
    skills?: string[];
    learned?: string;
    title?: string;
    photos?: string[];
    description?: string;
    // Time entry fields
    activity?: string;
    duration_minutes?: number;
    notes?: string;
  };
  evidence_hash: string;
  verified_at: string | null;
  supervisor_name: string | null;
  supervisor_company: string | null;
  feedback_text: string | null;
  verification_hash: string | null;
  view_count: number;
  expires_at: string;
}

const SupervisorVerificationPage = () => {
  const { token } = useParams<{ token: string }>();
  const [verification, setVerification] = useState<VerificationData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [supervisorName, setSupervisorName] = useState('');
  const [supervisorCompany, setSupervisorCompany] = useState('');
  const [supervisorEmail, setSupervisorEmail] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [signatureData, setSignatureData] = useState('');
  const [hasDrawn, setHasDrawn] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [resultHash, setResultHash] = useState('');

  // Geolocation (non-blocking)
  const [geo, setGeo] = useState<{
    lat: number;
    lng: number;
    acc: number;
  } | null>(null);

  // Canvas refs
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDrawing = useRef(false);

  // Load verification data
  useEffect(() => {
    if (token) loadVerification();
  }, [token]);

  // Request geolocation (non-blocking)
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) =>
          setGeo({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            acc: pos.coords.accuracy,
          }),
        () => {
          /* ignore denial */
        }
      );
    }
  }, []);

  // Init canvas when data loads
  useEffect(() => {
    if (!loading && verification && !verification.verified_at && !showSuccess) {
      const timer = setTimeout(() => initCanvas(), 50);
      return () => clearTimeout(timer);
    }
  }, [loading, verification, showSuccess]);

  useEffect(() => {
    const handleResize = () => initCanvas();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const loadVerification = async () => {
    try {
      setLoading(true);
      const { data, error: rpcError } = await anonClient.rpc(
        'get_verification_by_token',
        { p_token: token }
      );

      if (rpcError) throw rpcError;
      if (!data || data.error === 'not_found') {
        setError('This verification link is invalid or has been revoked.');
        return;
      }
      if (data.error === 'expired') {
        setError('This verification link has expired.');
        return;
      }

      setVerification(data as VerificationData);
    } catch (err: unknown) {
      console.error('Error loading verification:', err);
      setError('Could not load verification. The link may be invalid.');
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
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
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
  const handleSubmit = async () => {
    if (!supervisorName.trim() || !confirmed || !signatureData || !token)
      return;

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

      const { data, error: rpcError } = await anonClient.rpc(
        'submit_supervisor_verification',
        {
          p_token: token,
          p_supervisor_name: supervisorName.trim(),
          p_supervisor_company: supervisorCompany.trim() || null,
          p_supervisor_email: supervisorEmail.trim() || null,
          p_confirmed: confirmed,
          p_feedback: feedback.trim() || null,
          p_voice_url: null,
          p_signature: signatureData,
          p_geo_lat: geo?.lat ?? null,
          p_geo_lng: geo?.lng ?? null,
          p_geo_acc: geo?.acc ?? null,
          p_ip: clientIp,
          p_ua: navigator.userAgent.substring(0, 200),
        }
      );

      if (rpcError) throw rpcError;
      if (data && !data.success) throw new Error(data.error);

      setResultHash(data?.verification_hash || '');
      setShowSuccess(true);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Failed to submit verification';
      console.error('Verification error:', err);
      alert(message);
    } finally {
      setSubmitting(false);
    }
  };

  const snapshot = verification?.evidence_snapshot;

  // --- Loading ---
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0e17] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-emerald-400" />
          <p className="text-white/60 text-sm">Loading verification...</p>
        </div>
      </div>
    );
  }

  // --- Error ---
  if (error || !verification) {
    return (
      <div className="min-h-screen bg-[#0a0e17] flex items-center justify-center p-4">
        <div className="max-w-sm w-full text-center">
          <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="h-8 w-8 text-red-400" />
          </div>
          <h1 className="text-xl font-bold text-white mb-2">
            Link Not Valid
          </h1>
          <p className="text-white/50 text-sm">
            {error || 'This verification link is invalid or has expired.'}
          </p>
        </div>
      </div>
    );
  }

  const isTimeEntry = verification.verification_type === 'time_entry';

  // Helper: format duration
  const formatDurationMinutes = (minutes?: number) => {
    if (!minutes) return '';
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    if (h === 0) return `${m} minutes`;
    if (m === 0) return `${h} hour${h > 1 ? 's' : ''}`;
    return `${h}h ${m}m`;
  };

  // --- Already verified (read-only) ---
  if (verification.verified_at) {
    return (
      <div className="min-h-screen bg-[#0a0e17]">
        <div className="max-w-lg mx-auto px-5 py-8 space-y-6">
          {/* Header */}
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400/80">
              {isTimeEntry ? 'Training Hours Verified' : 'Evidence Verified'}
            </span>
          </div>

          <h1 className="text-xl font-bold text-white leading-tight">
            {isTimeEntry
              ? snapshot?.activity || 'Training Session'
              : snapshot?.title || 'Portfolio Evidence'}
          </h1>

          {/* Verified status */}
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-5 w-5 text-emerald-400" />
              <span className="text-sm font-semibold text-emerald-400">
                Verified by {verification.supervisor_name}
              </span>
            </div>
            {verification.supervisor_company && (
              <p className="text-xs text-white/50 ml-7">
                {verification.supervisor_company}
              </p>
            )}
            <p className="text-xs text-white/40 ml-7 mt-1">
              {new Date(verification.verified_at).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
            {verification.feedback_text && (
              <div className="mt-3 ml-7 p-3 rounded-lg bg-white/5 text-sm text-white/70">
                "{verification.feedback_text}"
              </div>
            )}
          </div>

          {/* Verification hash */}
          {verification.verification_hash && (
            <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10">
              <div className="flex items-center gap-2 mb-1">
                <Hash className="h-3.5 w-3.5 text-white/40" />
                <span className="text-xs font-medium text-white/40">
                  Verification Hash
                </span>
              </div>
              <p className="text-[10px] text-white/30 font-mono break-all">
                {verification.verification_hash}
              </p>
            </div>
          )}

          {/* Evidence summary */}
          {isTimeEntry ? (
            <TimeEntrySummary snapshot={snapshot} apprenticeName={verification.apprentice_name} formatDuration={formatDurationMinutes} />
          ) : (
            <EvidenceSummary snapshot={snapshot} apprenticeName={verification.apprentice_name} />
          )}

          {/* Footer */}
          <div className="text-center pt-4">
            <p className="text-[10px] text-white/20">
              Powered by Elec-Mate | Tamper-Evident Verification
            </p>
          </div>
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
            <ShieldCheck className="h-10 w-10 text-emerald-400" />
          </motion.div>
          <h1 className="text-2xl font-bold text-white mb-2">
            {isTimeEntry ? 'Training Hours Verified' : 'Evidence Verified'}
          </h1>
          <p className="text-white/50 text-sm mb-6">
            Thank you, {supervisorName}. Your verification of{' '}
            {verification.apprentice_name}&apos;s {isTimeEntry ? 'training hours' : 'evidence'} has been recorded and is
            tamper-evident.
          </p>

          {resultHash && (
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-left mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Hash className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-xs font-medium text-emerald-400">
                  Verification Hash
                </span>
              </div>
              <p className="text-[10px] text-white/40 font-mono break-all">
                {resultHash}
              </p>
            </div>
          )}

          <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-sm text-white/40">
            You can close this page now.
          </div>
        </motion.div>
      </div>
    );
  }

  // --- Main verification form ---
  return (
    <div className="min-h-screen bg-[#0a0e17]">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-b from-emerald-500/10 to-transparent px-5 pt-8 pb-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400/80">
              {isTimeEntry ? 'Training Hours Verification' : 'Supervisor Verification'}
            </span>
          </div>
          <h1 className="text-xl font-bold text-white leading-tight mb-2">
            {isTimeEntry ? 'Training Hours Verification' : 'Witness Statement Request'}
          </h1>
          <p className="text-sm text-white/50">
            {verification.apprentice_name} has requested you verify the
            following {isTimeEntry ? 'training hours' : 'evidence from their apprenticeship portfolio'}.
          </p>
        </div>

        {/* Evidence summary */}
        <div className="px-5 pb-4">
          {isTimeEntry ? (
            <TimeEntrySummary snapshot={snapshot} apprenticeName={verification.apprentice_name} formatDuration={formatDurationMinutes} />
          ) : (
            <EvidenceSummary snapshot={snapshot} apprenticeName={verification.apprentice_name} />
          )}
        </div>

        {/* Divider */}
        <div className="mx-5 h-px bg-white/10 my-2" />

        {/* Verification Form */}
        <div className="px-5 py-5 space-y-5 pb-10">
          {/* Confirmation checkbox */}
          <label className="flex items-start gap-3 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 cursor-pointer touch-manipulation">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
              className="mt-0.5 h-5 w-5 rounded border-emerald-500/40 text-emerald-500 focus:ring-emerald-500/40 accent-emerald-500"
            />
            <span className="text-sm text-white/80 leading-relaxed">
              {isTimeEntry
                ? 'I confirm this training was carried out under my supervision and the hours recorded are an accurate representation of the time spent.'
                : 'I confirm this work was carried out under my supervision and the evidence presented is an accurate representation of the work performed.'}
            </span>
          </label>

          {/* Supervisor name */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-white/60">
              Your Full Name *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
              <input
                type="text"
                value={supervisorName}
                onChange={(e) => setSupervisorName(e.target.value)}
                placeholder="Enter your full name"
                className={cn(
                  'w-full h-12 pl-10 pr-4 rounded-xl text-sm',
                  'bg-white/[0.06] border border-white/10 text-white',
                  'placeholder:text-white/30',
                  'focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500/40',
                  'touch-manipulation'
                )}
              />
            </div>
          </div>

          {/* Company (optional) */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-white/60">
              Company (optional)
            </label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
              <input
                type="text"
                value={supervisorCompany}
                onChange={(e) => setSupervisorCompany(e.target.value)}
                placeholder="Your company name"
                className={cn(
                  'w-full h-12 pl-10 pr-4 rounded-xl text-sm',
                  'bg-white/[0.06] border border-white/10 text-white',
                  'placeholder:text-white/30',
                  'focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500/40',
                  'touch-manipulation'
                )}
              />
            </div>
          </div>

          {/* Email (optional) */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-white/60">
              Email (optional)
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
              <input
                type="email"
                value={supervisorEmail}
                onChange={(e) => setSupervisorEmail(e.target.value)}
                placeholder="Your email address"
                className={cn(
                  'w-full h-12 pl-10 pr-4 rounded-xl text-sm',
                  'bg-white/[0.06] border border-white/10 text-white',
                  'placeholder:text-white/30',
                  'focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500/40',
                  'touch-manipulation'
                )}
              />
            </div>
          </div>

          {/* Feedback (optional) */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-white/60">
              Feedback (optional)
            </label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-white/30" />
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Any comments on the apprentice's work..."
                rows={3}
                className={cn(
                  'w-full pl-10 pr-4 py-3 rounded-xl text-sm resize-none',
                  'bg-white/[0.06] border border-white/10 text-white',
                  'placeholder:text-white/30',
                  'focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500/40',
                  'touch-manipulation'
                )}
              />
            </div>
          </div>

          {/* Signature pad */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-white/60">
                Your Signature *
              </label>
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
                      <p className="text-xs font-medium">
                        Draw your signature here
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Submit button */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={
              submitting || !supervisorName.trim() || !confirmed || !hasDrawn
            }
            className={cn(
              'w-full h-14 rounded-xl flex items-center justify-center gap-2',
              'text-base font-semibold transition-all touch-manipulation',
              submitting || !supervisorName.trim() || !confirmed || !hasDrawn
                ? 'bg-white/10 text-white/30 cursor-not-allowed'
                : 'bg-emerald-500 text-white hover:bg-emerald-600 active:scale-[0.98] shadow-lg shadow-emerald-500/20'
            )}
          >
            {submitting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Verifying...
              </>
            ) : (
              <>
                <ShieldCheck className="h-5 w-5" />
                Verify & Sign
              </>
            )}
          </button>
        </div>

        {/* Footer */}
        <div className="px-5 pb-8 text-center">
          <p className="text-[10px] text-white/20">
            Powered by Elec-Mate | Tamper-Evident Verification
          </p>
        </div>
      </div>
    </div>
  );
};

// --- Evidence Summary Card ---
function EvidenceSummary({
  snapshot,
  apprenticeName,
}: {
  snapshot?: VerificationData['evidence_snapshot'];
  apprenticeName: string;
}) {
  if (!snapshot) return null;

  return (
    <div className="space-y-4">
      {/* Apprentice info */}
      <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4 space-y-3">
        <div className="flex items-center gap-3 text-sm">
          <div className="w-7 h-7 rounded-lg bg-white/[0.06] flex items-center justify-center shrink-0">
            <User className="h-3.5 w-3.5 text-white/50" />
          </div>
          <span className="text-white/70">{apprenticeName}</span>
        </div>

        {snapshot.site_name && (
          <div className="flex items-center gap-3 text-sm">
            <div className="w-7 h-7 rounded-lg bg-white/[0.06] flex items-center justify-center shrink-0">
              <MapPin className="h-3.5 w-3.5 text-white/50" />
            </div>
            <span className="text-white/70">{snapshot.site_name}</span>
          </div>
        )}

        {snapshot.date && (
          <div className="flex items-center gap-3 text-sm">
            <div className="w-7 h-7 rounded-lg bg-white/[0.06] flex items-center justify-center shrink-0">
              <Calendar className="h-3.5 w-3.5 text-white/50" />
            </div>
            <span className="text-white/70">
              {new Date(snapshot.date).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </span>
          </div>
        )}

        {snapshot.title && (
          <div className="pt-2 border-t border-white/5">
            <h3 className="text-sm font-semibold text-white">
              {snapshot.title}
            </h3>
            {snapshot.description && (
              <p className="text-xs text-white/50 mt-1 line-clamp-3">
                {snapshot.description}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Tasks */}
      {snapshot.tasks && snapshot.tasks.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Wrench className="h-3.5 w-3.5 text-white/40" />
            <span className="text-xs font-semibold text-white/40 uppercase tracking-wider">
              Tasks Performed
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {snapshot.tasks.map((task, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-500/15 text-blue-300"
              >
                {task}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {snapshot.skills && snapshot.skills.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-3.5 w-3.5 text-white/40" />
            <span className="text-xs font-semibold text-white/40 uppercase tracking-wider">
              Skills Demonstrated
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {snapshot.skills.map((skill, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-full text-xs font-medium bg-purple-500/15 text-purple-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Photos */}
      {snapshot.photos && snapshot.photos.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <ImageIcon className="h-3.5 w-3.5 text-white/40" />
            <span className="text-xs font-semibold text-white/40 uppercase tracking-wider">
              Evidence Photos ({snapshot.photos.length})
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {snapshot.photos.slice(0, 6).map((url, i) => (
              <div
                key={i}
                className="aspect-square rounded-lg overflow-hidden bg-white/5"
              >
                <img
                  src={url}
                  alt={`Evidence ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* What was learned */}
      {snapshot.learned && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-3.5 w-3.5 text-white/40" />
            <span className="text-xs font-semibold text-white/40 uppercase tracking-wider">
              What Was Learned
            </span>
          </div>
          <p className="text-sm text-white/60 leading-relaxed">
            {snapshot.learned}
          </p>
        </div>
      )}
    </div>
  );
}

// --- Time Entry Summary Card ---
function TimeEntrySummary({
  snapshot,
  apprenticeName,
  formatDuration,
}: {
  snapshot?: VerificationData['evidence_snapshot'];
  apprenticeName: string;
  formatDuration: (minutes?: number) => string;
}) {
  if (!snapshot) return null;

  return (
    <div className="space-y-4">
      <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4 space-y-3">
        <div className="flex items-center gap-3 text-sm">
          <div className="w-7 h-7 rounded-lg bg-white/[0.06] flex items-center justify-center shrink-0">
            <User className="h-3.5 w-3.5 text-white/50" />
          </div>
          <span className="text-white/70">{apprenticeName}</span>
        </div>

        {snapshot.activity && (
          <div className="flex items-center gap-3 text-sm">
            <div className="w-7 h-7 rounded-lg bg-white/[0.06] flex items-center justify-center shrink-0">
              <Wrench className="h-3.5 w-3.5 text-white/50" />
            </div>
            <span className="text-white/70">{snapshot.activity}</span>
          </div>
        )}

        {snapshot.duration_minutes && (
          <div className="flex items-center gap-3 text-sm">
            <div className="w-7 h-7 rounded-lg bg-white/[0.06] flex items-center justify-center shrink-0">
              <Clock className="h-3.5 w-3.5 text-white/50" />
            </div>
            <span className="text-white/70">
              {formatDuration(snapshot.duration_minutes)}
            </span>
          </div>
        )}

        {snapshot.date && (
          <div className="flex items-center gap-3 text-sm">
            <div className="w-7 h-7 rounded-lg bg-white/[0.06] flex items-center justify-center shrink-0">
              <Calendar className="h-3.5 w-3.5 text-white/50" />
            </div>
            <span className="text-white/70">
              {new Date(snapshot.date + 'T00:00:00').toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </span>
          </div>
        )}

        {snapshot.notes && (
          <div className="pt-2 border-t border-white/5">
            <p className="text-xs text-white/50 leading-relaxed">
              {snapshot.notes}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SupervisorVerificationPage;
