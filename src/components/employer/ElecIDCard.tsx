import { Share2 } from 'lucide-react';
import { Avatar, Pill, type Tone } from './editorial';
import { cn } from '@/lib/utils';
import type { ElecIdProfile } from '@/data/employerMockData';

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
          'bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl overflow-hidden touch-manipulation'
        )}
      >
        <div className="flex items-center gap-3.5 px-4 sm:px-5 py-3.5 sm:py-4">
          <Avatar initials={initials} />
          <div className="flex-1 min-w-0">
            <div className="text-[14px] font-medium text-white truncate">{profile.name}</div>
            <div className="mt-0.5 text-[11.5px] text-white truncate">{profile.role}</div>
            <div className="mt-2 flex items-center gap-2 flex-wrap">
              <Pill tone={tone}>{profile.ecsCardType}</Pill>
              {profile.verified && <Pill tone="emerald">JIB Verified</Pill>}
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-px bg-white/[0.06] border border-white/[0.06] rounded-xl overflow-hidden shrink-0">
            <div className="bg-[hsl(0_0%_12%)] px-3 py-2 text-center min-w-[60px]">
              <div className="text-[16px] font-semibold tabular-nums leading-none text-elec-yellow">
                {profile.certifications.length}
              </div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.14em] text-white">Certs</div>
            </div>
            <div className="bg-[hsl(0_0%_12%)] px-3 py-2 text-center min-w-[60px]">
              <div className="text-[16px] font-semibold tabular-nums leading-none text-elec-yellow">
                {profile.training.length}
              </div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.14em] text-white">Training</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const stats = [
    { label: 'Years', value: profile.yearsExperience || 0 },
    { label: 'Certifications', value: profile.certifications.length },
    { label: 'Training', value: profile.training.length },
    { label: 'Previous Roles', value: profile.workHistory?.length || 0 },
  ];

  return (
    <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl overflow-hidden">
      <div className="px-5 sm:px-6 pt-5 sm:pt-6 pb-5">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
              Elec-ID
            </div>
            <div className="mt-1 font-mono text-[13px] font-semibold text-white">
              {profile.elecIdNumber}
            </div>
          </div>
          {profile.verified && <Pill tone="emerald">JIB Verified</Pill>}
        </div>

        <div className="mt-5 flex items-start gap-4">
          <Avatar initials={initials} />
          <div className="flex-1 min-w-0">
            <h2 className="text-[22px] sm:text-[26px] font-semibold text-white tracking-[-0.01em] leading-tight">
              {profile.name}
            </h2>
            <p className="mt-1 text-[13px] text-white truncate">{profile.role}</p>
            {profile.bio && (
              <p className="mt-2 text-[12px] text-white line-clamp-2 leading-relaxed">
                {profile.bio}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-white/[0.06] px-5 sm:px-6 py-4 flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          <Pill tone={tone}>{profile.ecsCardType}</Pill>
          <span className="text-[11px] text-white tabular-nums">
            Expires{' '}
            {new Date(profile.ecsExpiry).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </span>
        </div>
        <span className="font-mono text-[11px] text-white tabular-nums">
          {profile.ecsCardNumber}
        </span>
      </div>

      <div className="border-t border-white/[0.06]">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/[0.06]">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-[hsl(0_0%_12%)] px-4 py-5 flex flex-col items-start"
            >
              <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
                {stat.label}
              </div>
              <div className="mt-2 text-[28px] sm:text-[32px] font-semibold tabular-nums leading-none text-elec-yellow">
                {stat.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {profile.skills && profile.skills.length > 0 && (
        <div className="border-t border-white/[0.06] px-5 sm:px-6 py-5">
          <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
            Specialisms & Skills
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {profile.skills.slice(0, 8).map((skill, idx) => (
              <Pill key={idx} tone="yellow">
                {skill.name}
                {skill.level && (
                  <span className="ml-1.5 text-[10px] uppercase tracking-[0.12em]">
                    · {skill.level}
                  </span>
                )}
              </Pill>
            ))}
            {profile.skills.length > 8 && (
              <Pill tone="amber">+{profile.skills.length - 8} more</Pill>
            )}
          </div>
        </div>
      )}

      <div className="border-t border-white/[0.06] px-5 sm:px-6 py-4">
        <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
          Portable Worker Credential
        </div>
        <p className="mt-1.5 text-[12.5px] text-white leading-relaxed">
          This Elec-ID belongs to {profile.name.split(' ')[0]} and follows them throughout their
          career.
        </p>
      </div>

      <div className="border-t border-white/[0.06] p-4 sm:p-5">
        <button
          type="button"
          onClick={onShare}
          className="w-full h-11 rounded-xl bg-elec-yellow text-black font-semibold text-[13px] flex items-center justify-center gap-2 touch-manipulation hover:bg-elec-yellow/90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/60"
        >
          <Share2 className="h-4 w-4" />
          Share Profile
        </button>
      </div>
    </div>
  );
};
