import { Share2 } from 'lucide-react';
import { Avatar, Pill, type Tone } from './editorial';
import { panel, Initials, StatusPill } from '@/components/employer/pageParts/PageParts';
import { cn } from '@/lib/utils';
import { jobTitleText } from '@/data/uk-electrician-constants';
import type { ElecIdProfile } from '@/components/employer/employerViewTypes';
import {
  VerificationBadge,
  ElecMateApprovalBadge,
} from '@/components/credentials/VerificationBadge';

interface ElecIDCardProps {
  profile: ElecIdProfile;
  onShare?: () => void;
  compact?: boolean;
}

const statusToneMap: Record<string, Tone> = {
  Active: 'emerald',
  Valid: 'emerald',
  Warning: 'amber',
  Expiring: 'amber',
  Expired: 'red',
};

/**
 * The bio as people read it. A stored value such as "apprentice_2nd" is a
 * role code, not a sentence: show it as its label ("Apprentice, 2nd year"),
 * and drop it when it only repeats the role line above it.
 */
const bioText = (bio: string | null | undefined, role: string): string | null => {
  const v = bio?.trim();
  if (!v) return null;
  if (!/^[a-z0-9]+(?:[_-][a-z0-9]+)*$/i.test(v) || !/[_-]|^[a-z0-9]+$/.test(v)) return v;
  const label = jobTitleText(v);
  return label && label.toLowerCase() !== role.trim().toLowerCase() ? label : null;
};

const initialsOf = (name: string) =>
  name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

export const ElecIDCard = ({ profile, onShare, compact = false }: ElecIDCardProps) => {
  const tone: Tone = statusToneMap[profile.ecsStatus] ?? 'emerald';
  const initials = initialsOf(profile.name);

  if (compact) {
    return (
      <div
        className={cn(
          'bg-white/[0.04] border border-white/[0.06] rounded-2xl overflow-hidden touch-manipulation'
        )}
      >
        <div className="flex items-center gap-3.5 px-4 sm:px-5 py-3.5 sm:py-4">
          <Avatar initials={initials} />
          <div className="flex-1 min-w-0">
            <div className="text-[14px] font-medium text-white truncate">{profile.name}</div>
            <div className="mt-0.5 text-[11.5px] text-white truncate">{profile.role}</div>
            <div className="mt-2 flex items-center gap-2 flex-wrap">
              <Pill tone={tone}>{profile.ecsCardType}</Pill>
              {profile.ecsCardNumber && (
                <VerificationBadge short prefix="ECS" level={profile.ecsVerification} />
              )}
              {profile.verified && <ElecMateApprovalBadge />}
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-px bg-white/[0.06] border border-white/[0.06] rounded-xl overflow-hidden shrink-0">
            <div className="bg-[hsl(0_0%_12%)] px-3 py-2 text-center min-w-[60px]">
              <div className="text-[16px] font-semibold tabular-nums leading-none text-white">
                {profile.certifications.length}
              </div>
              <div className="mt-1 text-[11px] text-white">Certs</div>
            </div>
            <div className="bg-[hsl(0_0%_12%)] px-3 py-2 text-center min-w-[60px]">
              <div className="text-[16px] font-semibold tabular-nums leading-none text-white">
                {profile.training.length}
              </div>
              <div className="mt-1 text-[11px] text-white">Training</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const stats = [
    { label: 'Years', value: profile.yearsExperience || 0 },
    { label: 'Qualifications', value: profile.certifications.length },
    { label: 'Training', value: profile.training.length },
    { label: 'Previous roles', value: profile.workHistory?.length || 0 },
  ];
  const firstName = profile.name.split(' ')[0];
  const bio = bioText(profile.bio, profile.role);
  return (
    <div className={cn(panel, 'overflow-hidden')}>
      <div className="flex items-start gap-3 px-4 py-4 sm:px-5">
        <Initials name={profile.name} />
        <div className="min-w-0 flex-1">
          <h2 className="text-[20px] font-semibold leading-tight tracking-tight text-white">
            {profile.name}
          </h2>
          <p className="mt-0.5 text-[13px] text-white">
            {profile.role} · Elec-ID <span className="font-mono">{profile.elecIdNumber}</span>
          </p>
          {bio && (
            <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-white">{bio}</p>
          )}
        </div>
        {/* is_verified = an Elec-Mate admin reviewed the profile. It is NOT a
            card or qualification check, so it never says "Verified" (ELE-1950) */}
        {profile.verified && (
          <div className="hidden shrink-0 sm:block">
            <ElecMateApprovalBadge />
          </div>
        )}
      </div>

      <div className="grid grid-cols-4 border-t border-white/[0.07]">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={cn('min-w-0 px-3 py-3 sm:px-5', i > 0 && 'border-l border-white/[0.07]')}
          >
            <div className="text-[17px] font-semibold tabular-nums leading-none text-white">
              {stat.value}
            </div>
            <div className="mt-1 truncate text-[12px] text-white">{stat.label}</div>
          </div>
        ))}
      </div>

      {profile.skills && profile.skills.length > 0 && (
        <div className="border-t border-white/[0.07] px-4 py-3 sm:px-5">
          <p className="text-[13px] font-semibold text-white">Skills</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {profile.skills.slice(0, 8).map((skill, idx) => (
              <StatusPill key={idx}>
                {skill.name}
                {skill.level ? ` · ${skill.level}` : ''}
              </StatusPill>
            ))}
            {profile.skills.length > 8 && (
              <StatusPill>+{profile.skills.length - 8} more</StatusPill>
            )}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3 border-t border-white/[0.07] px-4 py-3 sm:flex-row sm:items-center sm:px-5">
        <p className="min-w-0 flex-1 text-[13px] leading-snug text-white">
          {onShare
            ? `This Elec-ID belongs to ${firstName} and moves with them from firm to firm.`
            : `This Elec-ID belongs to ${firstName}. Only they can create a share link.`}
        </p>
        {onShare && (
          <button
            type="button"
            onClick={onShare}
            className="flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl border border-white/[0.14] bg-white/[0.06] px-4 text-[14px] font-semibold text-white touch-manipulation hover:bg-white/[0.1]"
          >
            <Share2 className="h-4 w-4" />
            Share profile
          </button>
        )}
      </div>
    </div>
  );
};
