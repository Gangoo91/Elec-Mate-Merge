import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  usePublicElecIdByToken,
  usePublicElecIdByNumber,
  PublicDocument,
} from '@/hooks/usePublicElecId';
import {
  Loader2,
  Shield,
  ShieldCheck,
  ShieldAlert,
  Award,
  Briefcase,
  GraduationCap,
  Wrench,
  Calendar,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  Zap,
  Building2,
  Phone,
  Mail,
  ExternalLink,
  BadgeCheck,
  Copy,
  FileText,
  X,
  Star,
  Verified,
  Share2,
  Download,
  ChevronRight,
  Smartphone,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { copyToClipboard } from '@/utils/clipboard';
import { getQualificationLabel, getJobTitleLabel } from '@/data/uk-electrician-constants';

// ─── Helpers ────────────────────────────────────────────────────────────────

const getECSCardStyle = (cardType: string | null) => {
  if (!cardType) return { bg: '#6B7280', label: 'Not Set', textColor: 'white', accent: '#9CA3AF' };
  const n = cardType.toLowerCase().trim();
  if (n.includes('gold')) return { bg: 'linear-gradient(135deg,#D4AF37,#B8941E)', label: 'Gold Card', textColor: '#1a1a2e', accent: '#D4AF37' };
  if (n.includes('blue')) return { bg: 'linear-gradient(135deg,#2563EB,#1D4ED8)', label: 'Blue Card', textColor: 'white', accent: '#2563EB' };
  if (n.includes('black')) return { bg: 'linear-gradient(135deg,#374151,#1F2937)', label: 'Black Card', textColor: 'white', accent: '#6B7280' };
  if (n.includes('green')) return { bg: 'linear-gradient(135deg,#16A34A,#15803D)', label: 'Green Card', textColor: 'white', accent: '#16A34A' };
  if (n.includes('yellow')) return { bg: 'linear-gradient(135deg,#EAB308,#CA8A04)', label: 'Yellow Card', textColor: '#1a1a2e', accent: '#EAB308' };
  if (n.includes('red')) return { bg: 'linear-gradient(135deg,#DC2626,#B91C1C)', label: 'Red Card', textColor: 'white', accent: '#DC2626' };
  if (n.includes('white')) return { bg: 'linear-gradient(135deg,#F9FAFB,#E5E7EB)', label: 'White Card', textColor: '#1a1a2e', accent: '#9CA3AF' };
  return { bg: '#6B7280', label: cardType, textColor: 'white', accent: '#9CA3AF' };
};

const formatDate = (date: string | null) => {
  if (!date) return 'N/A';
  return new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
};

const formatDateShort = (date: string | null) => {
  if (!date) return 'N/A';
  return new Date(date).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });
};

const isExpired = (date: string | null) => date ? new Date(date) < new Date() : false;

const getSkillLevelColor = (level: string) => {
  switch (level?.toLowerCase()) {
    case 'expert': return 'bg-purple-500/15 text-purple-300 border-purple-500/25 ring-purple-500/10';
    case 'advanced': return 'bg-blue-500/15 text-blue-300 border-blue-500/25 ring-blue-500/10';
    case 'intermediate': return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/25 ring-emerald-500/10';
    case 'beginner': return 'bg-amber-500/15 text-amber-300 border-amber-500/25 ring-amber-500/10';
    default: return 'bg-slate-500/15 text-slate-300 border-slate-500/25 ring-slate-500/10';
  }
};

const getDisplayName = (name: string | undefined | null): string => {
  if (!name) return 'Unknown';
  if (name.includes('@')) return name.split('@')[0];
  return name.split(' ').map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
};

const getRoleDisplay = (role: string | undefined | null): string => {
  if (!role) return 'Electrical Professional';
  const label = getJobTitleLabel(role);
  if (label !== role) return label;
  return role.split('_').map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
};

// ─── Sub-components ─────────────────────────────────────────────────────────

function ImageViewer({ imageUrl, title, onClose }: { imageUrl: string; title: string; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] bg-black/97 flex items-center justify-center p-4 backdrop-blur-sm" onClick={onClose}>
      <button onClick={onClose} className="absolute top-5 right-5 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all touch-manipulation z-10 border border-white/10">
        <X className="h-5 w-5 text-white" />
      </button>
      <div className="max-w-3xl max-h-[90vh] w-full" onClick={(e) => e.stopPropagation()}>
        <p className="text-white/70 text-sm mb-4 text-center font-medium tracking-wide">{title}</p>
        <img src={imageUrl} alt={title} className="w-full h-auto max-h-[80vh] object-contain rounded-2xl shadow-2xl border border-white/10" />
      </div>
    </div>
  );
}

// ECS card styled to look like a real physical card
function ECSCardVisual({ cardType, cardNumber, expiryDate }: { cardType: string; cardNumber?: string | null; expiryDate?: string | null }) {
  const style = getECSCardStyle(cardType);
  const expired = isExpired(expiryDate ?? null);
  return (
    <div className="relative w-full aspect-[1.586/1] max-w-[280px] rounded-2xl overflow-hidden shadow-2xl select-none" style={{ background: style.bg }}>
      {/* Card shine effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-tl from-black/30 via-transparent to-transparent" />
      {/* Chip */}
      <div className="absolute top-4 left-4 w-8 h-6 rounded-[4px] bg-gradient-to-br from-yellow-300/80 to-yellow-600/80 border border-yellow-200/30 shadow-inner" />
      {/* ECS Logo area */}
      <div className="absolute top-4 right-4">
        <span className="text-[11px] font-black tracking-[0.2em] opacity-90" style={{ color: style.textColor }}>ECS</span>
      </div>
      {/* Card label */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p className="text-[13px] font-bold tracking-wide" style={{ color: style.textColor, opacity: 0.9 }}>{style.label}</p>
        {cardNumber && (
          <p className="text-[10px] font-mono mt-0.5 opacity-60" style={{ color: style.textColor }}>{cardNumber}</p>
        )}
        {expiryDate && (
          <p className={cn('text-[10px] font-medium mt-0.5', expired ? 'opacity-100' : 'opacity-60')} style={{ color: expired ? '#ef4444' : style.textColor }}>
            {expired ? 'EXPIRED' : `EXPIRES ${formatDateShort(expiryDate)}`}
          </p>
        )}
      </div>
    </div>
  );
}

// Section card wrapper
function SectionCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('rounded-2xl bg-white/[0.02] border border-white/[0.07] overflow-hidden', className)}>
      {children}
    </div>
  );
}

// Section header
function SectionHeader({ icon: Icon, iconBg, iconColor, title, count }: {
  icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
  iconColor: string;
  title: string;
  count?: number;
}) {
  return (
    <div className="px-5 py-4 border-b border-white/[0.06] flex items-center gap-3">
      <div className={cn('p-2 rounded-xl', iconBg)}>
        <Icon className={cn('h-4.5 w-4.5', iconColor)} />
      </div>
      <h2 className="font-bold text-white text-base">{title}</h2>
      {count !== undefined && (
        <span className={cn('ml-auto text-xs font-semibold px-2 py-0.5 rounded-full', iconBg, iconColor)}>
          {count}
        </span>
      )}
    </div>
  );
}

// Expiry badge
function ExpiryBadge({ date }: { date: string }) {
  const expired = isExpired(date);
  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium',
      expired
        ? 'bg-red-500/10 text-red-400 border border-red-500/20'
        : 'bg-slate-700/50 text-slate-400 border border-slate-600/40'
    )}>
      <Clock className="h-3 w-3" />
      {expired ? 'Expired' : 'Expires'} {formatDate(date)}
    </span>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function PublicElecIdView() {
  const { token, elecIdNumber } = useParams<{ token?: string; elecIdNumber?: string }>();
  const [copiedId, setCopiedId] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [viewingDocument, setViewingDocument] = useState<{ url: string; title: string } | null>(null);

  const isTokenLookup = !!token;
  const isNumberLookup = !!elecIdNumber;

  const { data: tokenData, isLoading: tokenLoading, error: tokenError } = usePublicElecIdByToken(isTokenLookup ? token : undefined);
  const { data: numberData, isLoading: numberLoading, error: numberError } = usePublicElecIdByNumber(isNumberLookup ? elecIdNumber : undefined);

  const isLoading = tokenLoading || numberLoading;
  const error = tokenError || numberError;
  const data = tokenData || numberData;

  // Update document title
  useEffect(() => {
    if (data?.profile) {
      const name = getDisplayName(data.profile.employee?.name);
      document.title = `${name} – Elec-ID | Verified Electrician`;
    }
    return () => { document.title = 'Elec-Mate'; };
  }, [data]);

  const copyElecId = () => {
    if (data?.profile?.elec_id_number) {
      copyToClipboard(data.profile.elec_id_number);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  const copyLink = () => {
    copyToClipboard(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const findDocument = (itemName: string, type: 'qualification' | 'training'): PublicDocument | null => {
    if (!data?.documents) return null;
    return data.documents.find(
      (doc) => doc.document_type === type &&
        (doc.document_name?.toLowerCase().includes(itemName.toLowerCase()) ||
          itemName.toLowerCase().includes(doc.document_name?.toLowerCase() || ''))
    ) || null;
  };

  const findEcsDocument = (): PublicDocument | null => {
    if (!data?.documents) return null;
    return data.documents.find((doc) => doc.document_type === 'ecs_card') || null;
  };

  // ── Loading ──
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a14] flex items-center justify-center p-4">
        <div className="text-center">
          <div className="relative inline-flex mb-6">
            <div className="absolute inset-0 bg-yellow-500/20 blur-3xl rounded-full animate-pulse" />
            <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center shadow-2xl shadow-yellow-500/20">
              <Loader2 className="h-9 w-9 animate-spin text-white" />
            </div>
          </div>
          <p className="text-white font-semibold text-lg">Verifying credentials…</p>
          <p className="text-slate-500 text-sm mt-1">Powered by Elec-ID</p>
        </div>
      </div>
    );
  }

  // ── Not Found ──
  if (error || !data) {
    return (
      <div className="min-h-screen bg-[#0a0a14] flex items-center justify-center p-4">
        <div className="text-center max-w-sm w-full">
          <div className="inline-flex p-5 rounded-2xl bg-red-500/10 border border-red-500/20 mb-6">
            <ShieldAlert className="h-14 w-14 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-3">Profile Not Found</h1>
          <p className="text-slate-400 leading-relaxed mb-6">
            {isTokenLookup
              ? 'This share link is invalid, expired, or has been deactivated.'
              : 'This Elec-ID number could not be verified. Please check and try again.'}
          </p>
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.07] text-sm text-slate-400">
            If you believe this is an error, contact the credential holder directly.
          </div>
          <a
            href="https://elec-mate.com"
            className="inline-flex items-center gap-2 mt-6 text-sm text-yellow-400 hover:text-yellow-300 transition-colors"
          >
            <Zap className="h-4 w-4" />
            Learn about Elec-ID
          </a>
        </div>
      </div>
    );
  }

  const { profile, sections, expiresAt, documents } = data;
  const ecsStyle = getECSCardStyle(profile.ecs_card_type);
  const employee = profile.employee;
  const ecsDocument = findEcsDocument();
  const displayName = getDisplayName(employee?.name);
  const displayRole = getRoleDisplay(employee?.role);
  const initials = displayName.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
  const hasCredentials = (profile.qualifications?.length ?? 0) > 0 || (profile.skills?.length ?? 0) > 0 || (profile.work_history?.length ?? 0) > 0 || (profile.training?.length ?? 0) > 0;

  // ── Main render ──
  return (
    <div className="min-h-screen bg-[#0a0a14]">
      {viewingDocument && (
        <ImageViewer imageUrl={viewingDocument.url} title={viewingDocument.title} onClose={() => setViewingDocument(null)} />
      )}

      {/* ── HEADER ── */}
      <header className="sticky top-0 z-50 bg-[#0a0a14]/95 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center shadow-lg shadow-yellow-500/20 flex-shrink-0">
              <Zap className="h-4.5 w-4.5 text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-white text-base leading-none">Elec-ID</span>
              <span className="text-[10px] text-slate-500 block tracking-widest uppercase">Verified Credentials</span>
            </div>
            <span className="sm:hidden font-bold text-white text-base">Elec-ID</span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Share */}
            <button
              onClick={copyLink}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.05] border border-white/[0.08] text-slate-300 hover:text-white hover:bg-white/[0.08] transition-all text-sm font-medium touch-manipulation"
            >
              {copiedLink ? <CheckCircle2 className="h-4 w-4 text-emerald-400" /> : <Share2 className="h-4 w-4" />}
              <span className="hidden sm:inline">{copiedLink ? 'Copied!' : 'Share'}</span>
            </button>
            {/* Status badge */}
            <div className={cn(
              'flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border',
              profile.is_verified
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
            )}>
              {profile.is_verified ? <Verified className="h-3.5 w-3.5" /> : <Shield className="h-3.5 w-3.5" />}
              {profile.is_verified ? 'Verified' : 'Registered'}
            </div>
          </div>
        </div>
      </header>

      {/* ── CONTENT ── */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 pb-20">
        <div className="lg:grid lg:grid-cols-[360px_1fr] lg:gap-7 lg:items-start">

          {/* ════════════════════════════════════════
              SIDEBAR (sticky on desktop, top on mobile)
              ════════════════════════════════════════ */}
          <aside className="space-y-4 mb-5 lg:mb-0 lg:sticky lg:top-[69px]">

            {/* ── Profile Hero Card ── */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#16162a] via-[#1a1a30] to-[#111122] border border-white/[0.08] shadow-xl">
              {/* Top accent */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-yellow-500/60 to-transparent" />
              {/* BG glow */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-yellow-500/8 rounded-full blur-3xl pointer-events-none" />

              <div className="relative p-5 sm:p-6">
                {/* Photo + Name row */}
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    {employee?.photo_url ? (
                      <img
                        src={employee.photo_url}
                        alt={displayName}
                        className="w-24 h-24 rounded-2xl object-cover border-2 border-white/15 shadow-xl"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-600 border-2 border-white/15 flex items-center justify-center shadow-xl">
                        <span className="text-3xl font-black text-white drop-shadow-lg tracking-tighter">{initials || '?'}</span>
                      </div>
                    )}
                    {profile.is_verified && (
                      <div className="absolute -bottom-1.5 -right-1.5 w-7 h-7 rounded-full bg-emerald-500 border-2 border-[#16162a] flex items-center justify-center shadow-lg shadow-emerald-500/30">
                        <CheckCircle2 className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Name / Role */}
                  <div className="flex-1 min-w-0 pt-1">
                    <h1 className="text-xl font-bold text-white leading-tight break-words">{displayName}</h1>
                    <p className="text-yellow-400 font-semibold text-sm mt-1 leading-snug">{displayRole}</p>
                  </div>
                </div>

                {/* ID badge */}
                <button
                  onClick={copyElecId}
                  className="mt-4 w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.07] hover:border-white/[0.14] transition-all touch-manipulation group"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-500 font-semibold tracking-widest uppercase">Elec-ID</span>
                    <code className="text-sm font-mono text-yellow-400 font-bold tracking-widest">{profile.elec_id_number}</code>
                  </div>
                  {copiedId
                    ? <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                    : <Copy className="h-4 w-4 text-slate-500 group-hover:text-slate-300 transition-colors flex-shrink-0" />
                  }
                </button>

                {/* Verification banner */}
                {profile.is_verified && (
                  <div className="mt-3 flex items-center gap-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                    <BadgeCheck className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-emerald-400">Verified Professional</p>
                      <p className="text-[11px] text-emerald-400/60 mt-0.5">Verified {formatDate(profile.verified_at)}</p>
                    </div>
                  </div>
                )}

                {/* Contact */}
                {sections.includes('basics') && (employee?.email || employee?.phone) && (
                  <div className="mt-4 flex gap-2">
                    {employee?.email && (
                      <a
                        href={`mailto:${employee.email}`}
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium hover:bg-blue-500/20 transition-all touch-manipulation min-h-[44px]"
                      >
                        <Mail className="h-4 w-4" />
                        Email
                      </a>
                    )}
                    {employee?.phone && (
                      <a
                        href={`tel:${employee.phone}`}
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium hover:bg-emerald-500/20 transition-all touch-manipulation min-h-[44px]"
                      >
                        <Phone className="h-4 w-4" />
                        Call
                      </a>
                    )}
                  </div>
                )}

                {/* Bio */}
                {sections.includes('basics') && profile.bio && (
                  <p className="mt-4 text-sm text-slate-400 leading-relaxed border-t border-white/[0.06] pt-4">
                    {profile.bio}
                  </p>
                )}

                {/* Specialisations */}
                {sections.includes('basics') && profile.specialisations && profile.specialisations.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {profile.specialisations.map((spec, idx) => (
                      <span key={idx} className="inline-flex px-2.5 py-1 rounded-lg bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 text-xs font-medium">
                        {spec}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* ── ECS Card ── */}
            {sections.includes('basics') && profile.ecs_card_type && (
              <SectionCard>
                <SectionHeader icon={ShieldCheck} iconBg="bg-sky-500/15" iconColor="text-sky-400" title="ECS Card" />
                <div className="p-5 flex flex-col items-center gap-4">
                  <ECSCardVisual
                    cardType={profile.ecs_card_type}
                    cardNumber={profile.ecs_card_number}
                    expiryDate={profile.ecs_expiry_date}
                  />
                  {ecsDocument?.file_url && (
                    <button
                      onClick={() => setViewingDocument({ url: ecsDocument.file_url!, title: 'ECS Card' })}
                      className="flex items-center gap-2 text-sm text-sky-400 hover:text-sky-300 transition-colors touch-manipulation py-1"
                    >
                      <FileText className="h-4 w-4" />
                      View card document
                    </button>
                  )}
                </div>
              </SectionCard>
            )}

            {/* ── Limited access notice (desktop only) ── */}
            {isTokenLookup && sections.length < 5 && (
              <div className="p-4 rounded-2xl bg-slate-800/30 border border-slate-700/30 flex gap-3">
                <AlertCircle className="h-4 w-4 text-slate-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-slate-400 leading-relaxed">Limited view — the credential holder has chosen to share select sections only.</p>
                  {expiresAt && <p className="text-xs text-slate-500 mt-1">Link expires {formatDate(expiresAt)}</p>}
                </div>
              </div>
            )}
          </aside>

          {/* ════════════════════════════════════════
              MAIN CREDENTIALS CONTENT
              ════════════════════════════════════════ */}
          <div className="space-y-4">

            {/* ── No credentials placeholder ── */}
            {!hasCredentials && (
              <SectionCard>
                <div className="p-10 text-center">
                  <div className="inline-flex p-4 rounded-2xl bg-slate-800/50 mb-4">
                    <Award className="h-8 w-8 text-slate-500" />
                  </div>
                  <p className="text-slate-400 font-medium">No credentials shared yet</p>
                  <p className="text-slate-600 text-sm mt-1">This profile hasn't added any qualifications or experience.</p>
                </div>
              </SectionCard>
            )}

            {/* ── Qualifications ── */}
            {sections.includes('qualifications') && profile.qualifications && profile.qualifications.length > 0 && (
              <SectionCard>
                <SectionHeader icon={GraduationCap} iconBg="bg-purple-500/15" iconColor="text-purple-400" title="Qualifications" count={profile.qualifications.length} />
                <div className="divide-y divide-white/[0.04]">
                  {profile.qualifications.map((qual) => {
                    const qualDoc = findDocument(qual.qualification_name, 'qualification');
                    return (
                      <div key={qual.id} className="p-5">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start gap-2">
                              <h3 className="font-semibold text-white text-sm leading-snug">
                                {getQualificationLabel(qual.qualification_name)}
                              </h3>
                              {qual.is_verified && (
                                <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                              )}
                            </div>
                            {qual.awarding_body && (
                              <p className="text-xs text-slate-400 mt-1">{qual.awarding_body}</p>
                            )}
                            <div className="flex flex-wrap items-center gap-3 mt-2">
                              {qual.date_achieved && (
                                <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
                                  <Calendar className="h-3 w-3" />
                                  {formatDate(qual.date_achieved)}
                                </span>
                              )}
                              {qual.certificate_number && (
                                <code className="text-[11px] font-mono text-slate-500 bg-slate-800/60 px-2 py-0.5 rounded">
                                  #{qual.certificate_number}
                                </code>
                              )}
                            </div>
                            {qual.expiry_date && (
                              <div className="mt-2.5">
                                <ExpiryBadge date={qual.expiry_date} />
                              </div>
                            )}
                          </div>
                          {qualDoc?.file_url && (
                            <button
                              onClick={() => setViewingDocument({ url: qualDoc.file_url!, title: getQualificationLabel(qual.qualification_name) })}
                              className="flex items-center gap-1.5 text-xs text-purple-400 hover:text-purple-300 transition-colors touch-manipulation py-1 flex-shrink-0"
                            >
                              <FileText className="h-3.5 w-3.5" />
                              View
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </SectionCard>
            )}

            {/* ── Skills ── */}
            {sections.includes('skills') && profile.skills && profile.skills.length > 0 && (
              <SectionCard>
                <SectionHeader icon={Wrench} iconBg="bg-blue-500/15" iconColor="text-blue-400" title="Skills & Competencies" count={profile.skills.length} />
                <div className="p-5">
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill) => (
                      <div
                        key={skill.id}
                        className={cn('px-3 py-2 rounded-xl border ring-1 ring-inset', getSkillLevelColor(skill.skill_level))}
                      >
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold text-xs">{skill.skill_name}</span>
                          {skill.is_verified && <CheckCircle2 className="h-3 w-3 text-emerald-400 flex-shrink-0" />}
                        </div>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="text-[10px] opacity-70 capitalize">{skill.skill_level}</span>
                          {skill.years_experience > 0 && (
                            <span className="text-[10px] opacity-50">· {skill.years_experience}yr</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </SectionCard>
            )}

            {/* ── Experience ── */}
            {sections.includes('experience') && profile.work_history && profile.work_history.length > 0 && (
              <SectionCard>
                <SectionHeader icon={Briefcase} iconBg="bg-amber-500/15" iconColor="text-amber-400" title="Work Experience" count={profile.work_history.length} />
                <div className="divide-y divide-white/[0.04]">
                  {profile.work_history.map((job, index) => (
                    <div key={job.id} className="p-5">
                      <div className="flex items-start gap-3.5">
                        {/* Timeline dot */}
                        <div className="flex flex-col items-center flex-shrink-0 mt-1">
                          <div className={cn('w-2.5 h-2.5 rounded-full flex-shrink-0', job.is_current ? 'bg-emerald-400 shadow-sm shadow-emerald-400/50' : 'bg-slate-600')} />
                          {index < (profile.work_history?.length ?? 0) - 1 && (
                            <div className="w-px flex-1 bg-slate-700/50 mt-1.5 min-h-[24px]" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <h3 className="font-semibold text-white text-sm">{job.job_title}</h3>
                              <div className="flex items-center gap-1.5 mt-0.5">
                                <Building2 className="h-3 w-3 text-slate-500" />
                                <p className="text-xs text-slate-400">{job.employer_name}</p>
                              </div>
                            </div>
                            {job.is_current && (
                              <span className="flex-shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
                                Current
                              </span>
                            )}
                          </div>
                          <div className="flex flex-wrap items-center gap-3 mt-2 text-[11px] text-slate-500">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {formatDateShort(job.start_date)} – {job.is_current ? 'Present' : formatDateShort(job.end_date)}
                            </span>
                            {job.location && (
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {job.location}
                              </span>
                            )}
                          </div>
                          {job.description && (
                            <p className="mt-2.5 text-xs text-slate-400 leading-relaxed">{job.description}</p>
                          )}
                          {job.projects && job.projects.length > 0 && (
                            <div className="mt-2.5 flex flex-wrap gap-1.5">
                              {job.projects.slice(0, 4).map((project, idx) => (
                                <span key={idx} className="text-[11px] px-2 py-0.5 rounded-md bg-slate-800/60 text-slate-400 border border-slate-700/40">
                                  {project}
                                </span>
                              ))}
                              {job.projects.length > 4 && (
                                <span className="text-[11px] px-2 py-0.5 rounded-md bg-slate-800/60 text-slate-400 border border-slate-700/40">
                                  +{job.projects.length - 4} more
                                </span>
                              )}
                            </div>
                          )}
                          {(job.is_verified || job.verified_by_employer) && (
                            <div className="mt-2.5 flex items-center gap-1 text-[11px] text-emerald-400">
                              <CheckCircle2 className="h-3 w-3" />
                              {job.verified_by_employer ? 'Verified by employer' : 'Verified'}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </SectionCard>
            )}

            {/* ── Training & Certifications ── */}
            {sections.includes('training') && profile.training && profile.training.length > 0 && (
              <SectionCard>
                <SectionHeader icon={Award} iconBg="bg-emerald-500/15" iconColor="text-emerald-400" title="Training & Certifications" count={profile.training.length} />
                <div className="divide-y divide-white/[0.04]">
                  {profile.training.map((training) => {
                    const trainingDoc = findDocument(training.training_name, 'training');
                    const statusActive = training.status === 'active' || training.status === 'completed';
                    return (
                      <div key={training.id} className="p-5">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-white text-sm">{training.training_name}</h3>
                            {training.provider && (
                              <p className="text-xs text-slate-400 mt-0.5">{training.provider}</p>
                            )}
                            <div className="flex flex-wrap items-center gap-3 mt-2">
                              {training.completed_date && (
                                <span className="inline-flex items-center gap-1.5 text-[11px] text-slate-500">
                                  <Calendar className="h-3 w-3" />
                                  {formatDate(training.completed_date)}
                                </span>
                              )}
                              {training.certificate_id && (
                                <code className="text-[10px] font-mono text-slate-500 bg-slate-800/60 px-2 py-0.5 rounded">
                                  #{training.certificate_id}
                                </code>
                              )}
                            </div>
                            {training.expiry_date && (
                              <div className="mt-2.5">
                                <ExpiryBadge date={training.expiry_date} />
                              </div>
                            )}
                          </div>
                          <div className="flex items-start gap-2 flex-shrink-0">
                            <span className={cn(
                              'text-[10px] font-semibold px-2 py-0.5 rounded-full border capitalize',
                              statusActive
                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                : 'bg-slate-700/40 text-slate-400 border-slate-600/30'
                            )}>
                              {training.status}
                            </span>
                            {trainingDoc?.file_url && (
                              <button
                                onClick={() => setViewingDocument({ url: trainingDoc.file_url!, title: training.training_name })}
                                className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors touch-manipulation py-1 flex items-center gap-1"
                              >
                                <FileText className="h-3.5 w-3.5" />
                                View
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </SectionCard>
            )}

            {/* ── Limited access notice (mobile only) ── */}
            {isTokenLookup && sections.length < 5 && (
              <div className="lg:hidden p-4 rounded-2xl bg-slate-800/30 border border-slate-700/30 flex gap-3">
                <AlertCircle className="h-4 w-4 text-slate-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-slate-400 leading-relaxed">Limited view — the credential holder has chosen to share select sections only.</p>
                  {expiresAt && <p className="text-xs text-slate-500 mt-1">Link expires {formatDate(expiresAt)}</p>}
                </div>
              </div>
            )}

            {/* ── App CTA ── */}
            <div className="relative overflow-hidden rounded-2xl border border-yellow-500/20 bg-gradient-to-br from-yellow-500/10 via-amber-500/5 to-transparent p-6">
              <div className="absolute top-0 right-0 w-48 h-48 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center">
                    <Zap className="h-3.5 w-3.5 text-white" />
                  </div>
                  <span className="font-bold text-white text-sm">Are you an electrician?</span>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  Build your own verified Elec-ID profile — share your credentials with employers and homeowners in seconds. 7-day free trial, no card required.
                </p>
                <a
                  href="https://elec-mate.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-[#0a0a14] text-sm font-bold transition-all touch-manipulation"
                >
                  <Smartphone className="h-4 w-4" />
                  Start free trial
                  <ChevronRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/[0.05] bg-[#0a0a14]/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center">
              <Zap className="h-3 w-3 text-white" />
            </div>
            <span className="text-xs text-slate-500 font-medium">Powered by Elec-ID</span>
          </div>
          <a
            href="https://elec-mate.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-slate-500 hover:text-white flex items-center gap-1.5 transition-colors touch-manipulation py-2"
          >
            elec-mate.com
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </footer>
    </div>
  );
}
