import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  usePublicElecIdByToken,
  usePublicElecIdByNumber,
  PublicDocument,
} from '@/hooks/usePublicElecId';
import { cn } from '@/lib/utils';
import { copyToClipboard } from '@/utils/clipboard';
import { getQualificationLabel, getJobTitleLabel } from '@/data/uk-electrician-constants';

// ─── Helpers ────────────────────────────────────────────────────────────────

const getECSCardStyle = (cardType: string | null) => {
  if (!cardType) return { bg: '#6B7280', label: 'Not set', textColor: 'white', accent: '#9CA3AF' };
  const n = cardType.toLowerCase().trim();
  if (n.includes('gold'))
    return {
      bg: 'linear-gradient(135deg,#D4AF37,#B8941E)',
      label: 'Gold card',
      textColor: '#1a1a2e',
      accent: '#D4AF37',
    };
  if (n.includes('blue'))
    return {
      bg: 'linear-gradient(135deg,#2563EB,#1D4ED8)',
      label: 'Blue card',
      textColor: 'white',
      accent: '#2563EB',
    };
  if (n.includes('black'))
    return {
      bg: 'linear-gradient(135deg,#374151,#1F2937)',
      label: 'Black card',
      textColor: 'white',
      accent: '#6B7280',
    };
  if (n.includes('green'))
    return {
      bg: 'linear-gradient(135deg,#16A34A,#15803D)',
      label: 'Green card',
      textColor: 'white',
      accent: '#16A34A',
    };
  if (n.includes('yellow'))
    return {
      bg: 'linear-gradient(135deg,#EAB308,#CA8A04)',
      label: 'Yellow card',
      textColor: '#1a1a2e',
      accent: '#EAB308',
    };
  if (n.includes('red'))
    return {
      bg: 'linear-gradient(135deg,#DC2626,#B91C1C)',
      label: 'Red card',
      textColor: 'white',
      accent: '#DC2626',
    };
  if (n.includes('white'))
    return {
      bg: 'linear-gradient(135deg,#F9FAFB,#E5E7EB)',
      label: 'White card',
      textColor: '#1a1a2e',
      accent: '#9CA3AF',
    };
  return { bg: '#6B7280', label: cardType, textColor: 'white', accent: '#9CA3AF' };
};

const formatDate = (date: string | null) => {
  if (!date) return 'N/A';
  return new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

const formatDateShort = (date: string | null) => {
  if (!date) return 'N/A';
  return new Date(date).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });
};

const isExpired = (date: string | null) => (date ? new Date(date) < new Date() : false);

const getSkillLevelTone = (level: string) => {
  switch (level?.toLowerCase()) {
    case 'expert':
      return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
    case 'advanced':
      return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    case 'intermediate':
      return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    case 'beginner':
      return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
    default:
      return 'bg-white/[0.04] text-white border-white/[0.06]';
  }
};

const getDisplayName = (name: string | undefined | null): string => {
  if (!name) return 'Unknown';
  if (name.includes('@')) return name.split('@')[0];
  return name
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
};

const getRoleDisplay = (role: string | undefined | null): string => {
  if (!role) return 'Electrical professional';
  const label = getJobTitleLabel(role);
  if (label !== role) return label;
  return role
    .split('_')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
};

// ─── Sub-components ─────────────────────────────────────────────────────────

function ImageViewer({
  imageUrl,
  title,
  onClose,
}: {
  imageUrl: string;
  title: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/97 flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-5 right-5 h-11 w-11 rounded-full bg-white/[0.08] hover:bg-white/[0.15] transition-all touch-manipulation z-10 border border-white/[0.06] flex items-center justify-center text-white text-xl leading-none"
        aria-label="Close viewer"
      >
        ×
      </button>
      <div className="max-w-3xl max-h-[90vh] w-full" onClick={(e) => e.stopPropagation()}>
        <p className="text-white text-sm mb-4 text-center font-medium tracking-wide">{title}</p>
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-auto max-h-[80vh] object-contain rounded-2xl shadow-2xl border border-white/[0.08]"
        />
      </div>
    </div>
  );
}

function ECSCardVisual({
  cardType,
  cardNumber,
  expiryDate,
}: {
  cardType: string;
  cardNumber?: string | null;
  expiryDate?: string | null;
}) {
  const style = getECSCardStyle(cardType);
  const expired = isExpired(expiryDate ?? null);
  return (
    <div
      className="relative w-full aspect-[1.586/1] max-w-[280px] rounded-2xl overflow-hidden shadow-2xl select-none"
      style={{ background: style.bg }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-tl from-black/30 via-transparent to-transparent" />
      <div className="absolute top-4 left-4 w-8 h-6 rounded-[4px] bg-gradient-to-br from-yellow-300/80 to-yellow-600/80 border border-yellow-200/30 shadow-inner" />
      <div className="absolute top-4 right-4">
        <span
          className="text-[11px] font-black tracking-[0.2em]"
          style={{ color: style.textColor }}
        >
          ECS
        </span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p className="text-[13px] font-bold tracking-wide" style={{ color: style.textColor }}>
          {style.label}
        </p>
        {cardNumber && (
          <p className="text-[10px] font-mono mt-0.5" style={{ color: style.textColor }}>
            {cardNumber}
          </p>
        )}
        {expiryDate && (
          <p
            className="text-[10px] font-medium mt-0.5"
            style={{ color: expired ? '#ef4444' : style.textColor }}
          >
            {expired ? 'EXPIRED' : `Expires ${formatDateShort(expiryDate)}`}
          </p>
        )}
      </div>
    </div>
  );
}

function SectionCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.06] overflow-hidden',
        className
      )}
    >
      {children}
    </div>
  );
}

function SectionHead({ eyebrow, title, count }: { eyebrow: string; title: string; count?: number }) {
  return (
    <div className="px-5 py-4 border-b border-white/[0.06] flex items-center justify-between">
      <div>
        <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
          {eyebrow}
        </div>
        <h2 className="mt-0.5 text-white font-semibold text-base">{title}</h2>
      </div>
      {count !== undefined && (
        <span className="text-[11px] font-medium text-white/65 tabular-nums">{count}</span>
      )}
    </div>
  );
}

function ExpiryBadge({ date }: { date: string }) {
  const expired = isExpired(date);
  return (
    <span
      className={cn(
        'inline-flex items-center text-xs px-2.5 py-1 rounded-full font-medium border',
        expired
          ? 'bg-red-500/10 text-red-400 border-red-500/20'
          : 'bg-white/[0.04] text-white border-white/[0.06]'
      )}
    >
      {expired ? 'Expired' : 'Expires'} {formatDate(date)}
    </span>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function PublicElecIdView() {
  const { token, elecIdNumber } = useParams<{ token?: string; elecIdNumber?: string }>();
  const [copiedId, setCopiedId] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [viewingDocument, setViewingDocument] = useState<{
    url: string;
    title: string;
  } | null>(null);

  const isTokenLookup = !!token;
  const isNumberLookup = !!elecIdNumber;

  const {
    data: tokenData,
    isLoading: tokenLoading,
    error: tokenError,
  } = usePublicElecIdByToken(isTokenLookup ? token : undefined);
  const {
    data: numberData,
    isLoading: numberLoading,
    error: numberError,
  } = usePublicElecIdByNumber(isNumberLookup ? elecIdNumber : undefined);

  const isLoading = tokenLoading || numberLoading;
  const error = tokenError || numberError;
  const data = tokenData || numberData;

  useEffect(() => {
    if (data?.profile) {
      const name = getDisplayName(data.profile.employee?.name);
      document.title = `${name} – Elec-ID | Verified Electrician`;
    }
    return () => {
      document.title = 'Elec-Mate';
    };
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

  const findDocument = (
    itemName: string,
    type: 'qualification' | 'training'
  ): PublicDocument | null => {
    if (!data?.documents) return null;
    return (
      data.documents.find(
        (doc) =>
          doc.document_type === type &&
          (doc.document_name?.toLowerCase().includes(itemName.toLowerCase()) ||
            itemName.toLowerCase().includes(doc.document_name?.toLowerCase() || ''))
      ) || null
    );
  };

  const findEcsDocument = (): PublicDocument | null => {
    if (!data?.documents) return null;
    return data.documents.find((doc) => doc.document_type === 'ecs_card') || null;
  };

  // ── Loading ──
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
        <div className="text-center">
          <div className="h-12 w-12 mx-auto mb-6 rounded-full border-2 border-elec-yellow border-t-transparent animate-spin" />
          <p className="text-white font-semibold text-lg">Verifying credentials…</p>
          <p className="text-white/65 text-sm mt-1">Powered by Elec-ID</p>
        </div>
      </div>
    );
  }

  // ── Not Found ──
  if (error || !data) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
        <div className="text-center max-w-sm w-full">
          <div className="inline-flex px-5 py-3 rounded-2xl bg-red-500/10 border border-red-500/20 mb-6">
            <span className="text-red-400 font-semibold tracking-[0.18em] text-xs uppercase">
              Verification failed
            </span>
          </div>
          <h1 className="text-2xl font-semibold text-white mb-3">Profile not found</h1>
          <p className="text-white leading-relaxed mb-6">
            {isTokenLookup
              ? 'This share link is invalid, expired, or has been deactivated.'
              : 'This Elec-ID number could not be verified. Please check and try again.'}
          </p>
          <div className="p-4 rounded-xl bg-[hsl(0_0%_12%)] border border-white/[0.06] text-sm text-white">
            If you believe this is an error, contact the credential holder directly.
          </div>
          <a
            href="https://elec-mate.com"
            className="inline-flex items-center gap-2 mt-6 text-sm text-elec-yellow hover:underline"
          >
            Learn about Elec-ID →
          </a>
        </div>
      </div>
    );
  }

  const { profile, sections, expiresAt } = data;
  const employee = profile.employee;
  const ecsDocument = findEcsDocument();
  const displayName = getDisplayName(employee?.name);
  const displayRole = getRoleDisplay(employee?.role);
  const initials = displayName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
  const hasCredentials =
    (profile.qualifications?.length ?? 0) > 0 ||
    (profile.skills?.length ?? 0) > 0 ||
    (profile.work_history?.length ?? 0) > 0 ||
    (profile.training?.length ?? 0) > 0;

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {viewingDocument && (
        <ImageViewer
          imageUrl={viewingDocument.url}
          title={viewingDocument.title}
          onClose={() => setViewingDocument(null)}
        />
      )}

      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
              Elec-ID
            </div>
            <div className="text-white font-semibold text-base leading-tight">
              Verified credentials
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={copyLink}
              className="h-11 px-3 rounded-xl bg-white/[0.04] border border-white/[0.06] text-white hover:bg-white/[0.08] transition-all text-sm font-medium touch-manipulation"
            >
              {copiedLink ? 'Copied!' : 'Share'}
            </button>
            <span
              className={cn(
                'h-11 px-3 rounded-xl text-xs font-semibold border flex items-center',
                profile.is_verified
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
              )}
            >
              {profile.is_verified ? 'Verified' : 'Registered'}
            </span>
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <main className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 py-8 pb-20">
        <div className="lg:grid lg:grid-cols-[380px_1fr] lg:gap-7 lg:items-start">
          {/* ═══════ SIDEBAR ═══════ */}
          <aside className="space-y-5 mb-6 lg:mb-0 lg:sticky lg:top-[90px]">
            {/* Profile hero */}
            <div className="relative overflow-hidden rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.06]">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/80 via-amber-400/70 to-orange-400/70" />

              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="relative shrink-0">
                    {employee?.photo_url ? (
                      <img
                        src={employee.photo_url}
                        alt={displayName}
                        className="w-24 h-24 rounded-2xl object-cover border border-white/[0.08]"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-elec-yellow via-amber-400 to-orange-400 border border-white/[0.08] flex items-center justify-center">
                        <span className="text-3xl font-black text-black tracking-tighter">
                          {initials || '?'}
                        </span>
                      </div>
                    )}
                    {profile.is_verified && (
                      <div className="absolute -bottom-1.5 -right-1.5 h-7 px-2 rounded-full bg-emerald-500 border-2 border-[hsl(0_0%_12%)] flex items-center text-white text-[10px] font-semibold uppercase tracking-[0.1em]">
                        Verified
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0 pt-1">
                    <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
                      Verified professional
                    </div>
                    <h1 className="mt-1 text-xl font-semibold text-white leading-tight break-words">
                      {displayName}
                    </h1>
                    <p className="text-elec-yellow font-medium text-sm mt-1">{displayRole}</p>
                  </div>
                </div>

                <button
                  onClick={copyElecId}
                  className="mt-5 w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] transition-all touch-manipulation"
                >
                  <div>
                    <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
                      Elec-ID
                    </div>
                    <div className="mt-0.5 font-mono text-elec-yellow font-semibold text-lg tracking-wider">
                      {profile.elec_id_number}
                    </div>
                  </div>
                  <span className="text-xs font-medium text-elec-yellow">
                    {copiedId ? 'Copied!' : 'Copy'}
                  </span>
                </button>

                {profile.is_verified && (
                  <div className="mt-3 flex items-center gap-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                    <span
                      aria-hidden
                      className="inline-block h-2 w-2 rounded-full bg-emerald-400"
                    />
                    <div>
                      <p className="text-xs font-semibold text-emerald-400">
                        Verified professional
                      </p>
                      <p className="text-[11px] text-white/65 mt-0.5">
                        Verified {formatDate(profile.verified_at)}
                      </p>
                    </div>
                  </div>
                )}

                {sections.includes('basics') && (employee?.email || employee?.phone) && (
                  <div className="mt-4 flex gap-2">
                    {employee?.email && (
                      <a
                        href={`mailto:${employee.email}`}
                        className="flex-1 flex items-center justify-center h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium hover:bg-blue-500/20 transition-all touch-manipulation"
                      >
                        Email
                      </a>
                    )}
                    {employee?.phone && (
                      <a
                        href={`tel:${employee.phone}`}
                        className="flex-1 flex items-center justify-center h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium hover:bg-emerald-500/20 transition-all touch-manipulation"
                      >
                        Call
                      </a>
                    )}
                  </div>
                )}

                {sections.includes('basics') && profile.bio && (
                  <p className="mt-4 text-sm text-white leading-relaxed border-t border-white/[0.06] pt-4">
                    {profile.bio}
                  </p>
                )}

                {sections.includes('basics') &&
                  profile.specialisations &&
                  profile.specialisations.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {profile.specialisations.map((spec, idx) => (
                        <span
                          key={idx}
                          className="inline-flex px-2.5 py-1 rounded-lg bg-elec-yellow/10 text-elec-yellow border border-elec-yellow/20 text-xs font-medium"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  )}
              </div>
            </div>

            {/* ECS Card */}
            {sections.includes('basics') && profile.ecs_card_type && (
              <SectionCard>
                <SectionHead eyebrow="Industry credential" title="ECS Card" />
                <div className="p-5 flex flex-col items-center gap-4">
                  <ECSCardVisual
                    cardType={profile.ecs_card_type}
                    cardNumber={profile.ecs_card_number}
                    expiryDate={profile.ecs_expiry_date}
                  />
                  {ecsDocument?.file_url && (
                    <button
                      onClick={() =>
                        setViewingDocument({ url: ecsDocument.file_url!, title: 'ECS Card' })
                      }
                      className="h-11 px-4 rounded-lg bg-white/[0.04] border border-white/[0.06] text-white hover:bg-white/[0.08] text-sm font-medium touch-manipulation"
                    >
                      View card document →
                    </button>
                  )}
                </div>
              </SectionCard>
            )}

            {/* Limited access notice (desktop) */}
            {isTokenLookup && sections.length < 5 && (
              <div className="p-4 rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.06]">
                <p className="text-xs text-white/65 leading-relaxed">
                  Limited view — the credential holder has chosen to share select sections only.
                </p>
                {expiresAt && (
                  <p className="text-xs text-white mt-1">Link expires {formatDate(expiresAt)}</p>
                )}
              </div>
            )}
          </aside>

          {/* ═══════ MAIN ═══════ */}
          <div className="space-y-5">
            {!hasCredentials && (
              <SectionCard>
                <div className="p-10 text-center">
                  <p className="text-white font-medium">No credentials shared yet</p>
                  <p className="text-white/65 text-sm mt-1">
                    This profile hasn't added any qualifications or experience.
                  </p>
                </div>
              </SectionCard>
            )}

            {/* Qualifications */}
            {sections.includes('qualifications') &&
              profile.qualifications &&
              profile.qualifications.length > 0 && (
                <SectionCard>
                  <SectionHead
                    eyebrow="Credentials"
                    title="Qualifications"
                    count={profile.qualifications.length}
                  />
                  <div className="divide-y divide-white/[0.06]">
                    {profile.qualifications.map((qual) => {
                      const qualDoc = findDocument(qual.qualification_name, 'qualification');
                      return (
                        <div key={qual.id} className="p-5">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-white text-sm leading-snug">
                                  {getQualificationLabel(qual.qualification_name)}
                                </h3>
                                {qual.is_verified && (
                                  <span className="text-[10px] font-semibold text-emerald-400 uppercase tracking-[0.1em]">
                                    Verified
                                  </span>
                                )}
                              </div>
                              {qual.awarding_body && (
                                <p className="text-xs text-white/65 mt-1">{qual.awarding_body}</p>
                              )}
                              <div className="flex flex-wrap items-center gap-3 mt-2">
                                {qual.date_achieved && (
                                  <span className="text-xs text-white/65">
                                    {formatDate(qual.date_achieved)}
                                  </span>
                                )}
                                {qual.certificate_number && (
                                  <code className="text-[11px] font-mono text-white bg-white/[0.04] px-2 py-0.5 rounded">
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
                                onClick={() =>
                                  setViewingDocument({
                                    url: qualDoc.file_url!,
                                    title: getQualificationLabel(qual.qualification_name),
                                  })
                                }
                                className="h-11 px-3 text-xs text-elec-yellow hover:bg-white/[0.04] rounded-lg touch-manipulation shrink-0"
                              >
                                View →
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </SectionCard>
              )}

            {/* Skills */}
            {sections.includes('skills') && profile.skills && profile.skills.length > 0 && (
              <SectionCard>
                <SectionHead
                  eyebrow="Expertise"
                  title="Skills & competencies"
                  count={profile.skills.length}
                />
                <div className="p-5">
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill) => (
                      <div
                        key={skill.id}
                        className={cn(
                          'px-3 py-2 rounded-xl border',
                          getSkillLevelTone(skill.skill_level)
                        )}
                      >
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold text-xs">{skill.skill_name}</span>
                          {skill.is_verified && (
                            <span className="text-[10px] font-semibold text-emerald-400">
                              Verified
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="text-[10px] capitalize">{skill.skill_level}</span>
                          {skill.years_experience > 0 && (
                            <span className="text-[10px]">· {skill.years_experience}yr</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </SectionCard>
            )}

            {/* Experience */}
            {sections.includes('experience') &&
              profile.work_history &&
              profile.work_history.length > 0 && (
                <SectionCard>
                  <SectionHead
                    eyebrow="Career"
                    title="Work experience"
                    count={profile.work_history.length}
                  />
                  <div className="divide-y divide-white/[0.06]">
                    {profile.work_history.map((job, index) => (
                      <div key={job.id} className="p-5">
                        <div className="flex items-start gap-3.5">
                          <div className="flex flex-col items-center shrink-0 mt-1">
                            <span
                              aria-hidden
                              className={cn(
                                'w-2.5 h-2.5 rounded-full',
                                job.is_current ? 'bg-emerald-400' : 'bg-white/[0.15]'
                              )}
                            />
                            {index < (profile.work_history?.length ?? 0) - 1 && (
                              <div className="w-px flex-1 bg-white/[0.08] mt-1.5 min-h-[24px]" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <h3 className="font-semibold text-white text-sm">{job.job_title}</h3>
                                <p className="text-xs text-white/65 mt-0.5">{job.employer_name}</p>
                              </div>
                              {job.is_current && (
                                <span className="shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                  Current
                                </span>
                              )}
                            </div>
                            <div className="flex flex-wrap items-center gap-3 mt-2 text-[11px] text-white/65">
                              <span>
                                {formatDateShort(job.start_date)} –{' '}
                                {job.is_current ? 'Present' : formatDateShort(job.end_date)}
                              </span>
                              {job.location && <span>{job.location}</span>}
                            </div>
                            {job.description && (
                              <p className="mt-2.5 text-xs text-white leading-relaxed">
                                {job.description}
                              </p>
                            )}
                            {job.projects && job.projects.length > 0 && (
                              <div className="mt-2.5 flex flex-wrap gap-1.5">
                                {job.projects.slice(0, 4).map((project, idx) => (
                                  <span
                                    key={idx}
                                    className="text-[11px] px-2 py-0.5 rounded-md bg-white/[0.04] text-white border border-white/[0.06]"
                                  >
                                    {project}
                                  </span>
                                ))}
                                {job.projects.length > 4 && (
                                  <span className="text-[11px] px-2 py-0.5 rounded-md bg-white/[0.04] text-white border border-white/[0.06]">
                                    +{job.projects.length - 4} more
                                  </span>
                                )}
                              </div>
                            )}
                            {(job.is_verified || job.verified_by_employer) && (
                              <div className="mt-2.5 text-[11px] text-emerald-400">
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

            {/* Training */}
            {sections.includes('training') && profile.training && profile.training.length > 0 && (
              <SectionCard>
                <SectionHead
                  eyebrow="Training"
                  title="Training & certifications"
                  count={profile.training.length}
                />
                <div className="divide-y divide-white/[0.06]">
                  {profile.training.map((training) => {
                    const trainingDoc = findDocument(training.training_name, 'training');
                    const statusActive =
                      training.status === 'active' || training.status === 'completed';
                    return (
                      <div key={training.id} className="p-5">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-white text-sm">
                              {training.training_name}
                            </h3>
                            {training.provider && (
                              <p className="text-xs text-white/65 mt-0.5">{training.provider}</p>
                            )}
                            <div className="flex flex-wrap items-center gap-3 mt-2">
                              {training.completed_date && (
                                <span className="text-[11px] text-white/65">
                                  {formatDate(training.completed_date)}
                                </span>
                              )}
                              {training.certificate_id && (
                                <code className="text-[10px] font-mono text-white bg-white/[0.04] px-2 py-0.5 rounded">
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
                          <div className="flex items-start gap-2 shrink-0">
                            <span
                              className={cn(
                                'text-[10px] font-semibold px-2 py-0.5 rounded-full border capitalize',
                                statusActive
                                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                  : 'bg-white/[0.04] text-white border-white/[0.06]'
                              )}
                            >
                              {training.status}
                            </span>
                            {trainingDoc?.file_url && (
                              <button
                                onClick={() =>
                                  setViewingDocument({
                                    url: trainingDoc.file_url!,
                                    title: training.training_name,
                                  })
                                }
                                className="h-11 px-3 text-xs text-elec-yellow hover:bg-white/[0.04] rounded-lg touch-manipulation"
                              >
                                View →
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

            {/* Limited access notice (mobile) */}
            {isTokenLookup && sections.length < 5 && (
              <div className="lg:hidden p-4 rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.06]">
                <p className="text-xs text-white/65 leading-relaxed">
                  Limited view — the credential holder has chosen to share select sections only.
                </p>
                {expiresAt && (
                  <p className="text-xs text-white mt-1">Link expires {formatDate(expiresAt)}</p>
                )}
              </div>
            )}

            {/* App CTA */}
            <div className="relative overflow-hidden rounded-2xl border border-elec-yellow/20 bg-[hsl(0_0%_12%)] p-6">
              <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
                Are you an electrician?
              </div>
              <h3 className="mt-1 font-semibold text-white text-lg">Build your own Elec-ID</h3>
              <p className="text-white text-sm leading-relaxed mt-2 mb-4">
                Share your credentials with employers and homeowners in seconds. 7-day free trial,
                no card required.
              </p>
              <a
                href="https://elec-mate.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 h-11 px-4 rounded-xl bg-elec-yellow hover:bg-elec-yellow/90 text-black text-sm font-semibold transition-all touch-manipulation"
              >
                Start free trial →
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/[0.06] bg-[#0a0a0a]/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <span className="text-xs text-white font-medium">Powered by Elec-ID</span>
          <a
            href="https://elec-mate.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-white hover:text-elec-yellow transition-colors touch-manipulation py-2"
          >
            elec-mate.com →
          </a>
        </div>
      </footer>
    </div>
  );
}
