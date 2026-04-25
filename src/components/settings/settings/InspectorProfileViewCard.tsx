import { InspectorProfile } from '@/hooks/useInspectorProfiles';
import { Eyebrow } from '@/components/college/primitives';

interface InspectorProfileViewCardProps {
  profile: InspectorProfile;
  onEdit: () => void;
}

export function InspectorProfileViewCard({ profile, onEdit }: InspectorProfileViewCardProps) {
  const hasCompanyDetails =
    profile.companyName || profile.companyAddress || profile.companyPhone || profile.companyEmail;
  const hasRegistration = profile.registrationScheme && profile.registrationScheme !== 'none';
  const hasInsurance = profile.insuranceProvider && profile.insuranceProvider !== 'none';

  return (
    <section className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl overflow-hidden">
      <div className="px-5 sm:px-6 lg:px-8 py-6 sm:py-7 lg:py-8 space-y-6 sm:space-y-8">
        {/* Header: photo + name + edit */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6 pb-6 border-b border-white/[0.06]">
          <div className="relative w-20 h-20 md:w-24 md:h-24 bg-[#0a0a0a] border border-white/[0.08] rounded-2xl overflow-hidden shrink-0">
            {profile.photoUrl ? (
              <img
                src={profile.photoUrl}
                alt={profile.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-[11px] uppercase tracking-[0.18em] text-white">Photo</span>
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0 text-center md:text-left">
            <Eyebrow>Inspector</Eyebrow>
            <h2 className="mt-1.5 text-xl sm:text-2xl font-semibold text-white tracking-tight">
              {profile.name}
            </h2>
            {profile.companyName && (
              <p className="mt-1 text-[13px] text-white">{profile.companyName}</p>
            )}
          </div>

          <button
            type="button"
            onClick={onEdit}
            className="h-11 px-5 rounded-xl bg-elec-yellow text-black text-[13px] font-semibold hover:bg-elec-yellow/90 transition-colors touch-manipulation shrink-0"
          >
            Edit profile
          </button>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.06] border border-white/[0.06] rounded-2xl overflow-hidden">
          <StatCell
            label="Qualifications"
            value={String(profile.qualifications.length).padStart(2, '0')}
          />
          <StatCell
            label="Registration"
            value={hasRegistration ? 'Registered' : '—'}
            tone={hasRegistration ? 'emerald' : undefined}
          />
          <StatCell
            label="Insurance"
            value={hasInsurance ? 'Insured' : '—'}
            tone={hasInsurance ? 'blue' : undefined}
          />
          <StatCell
            label="Signature"
            value={profile.signatureData ? 'Saved' : '—'}
            tone={profile.signatureData ? 'purple' : undefined}
          />
        </div>

        {/* Details */}
        {(hasCompanyDetails || hasRegistration || hasInsurance) && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
            {hasCompanyDetails && (
              <div>
                <Eyebrow>Company</Eyebrow>
                <div className="mt-3 flex items-start gap-3">
                  {profile.companyLogo && (
                    <div className="w-12 h-12 bg-[#0a0a0a] border border-white/[0.08] rounded-xl overflow-hidden shrink-0">
                      <img
                        src={profile.companyLogo}
                        alt={`${profile.companyName} logo`}
                        className="w-full h-full object-contain p-1"
                      />
                    </div>
                  )}
                  <div className="space-y-0.5 flex-1 min-w-0">
                    {profile.companyName && (
                      <p className="text-[13px] text-white truncate">{profile.companyName}</p>
                    )}
                    {profile.companyPhone && (
                      <p className="text-[12px] text-white/65 truncate">{profile.companyPhone}</p>
                    )}
                    {profile.companyEmail && (
                      <p className="text-[12px] text-white/65 truncate">{profile.companyEmail}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {hasRegistration && (
              <div>
                <Eyebrow>Registration</Eyebrow>
                <p className="mt-3 text-[14px] font-semibold text-white uppercase">
                  {profile.registrationScheme}
                </p>
                {profile.registrationNumber && (
                  <p className="mt-0.5 text-[12px] text-white/65">#{profile.registrationNumber}</p>
                )}
                <div className="mt-2">
                  <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-emerald-400">
                    Active
                  </span>
                </div>
              </div>
            )}

            {hasInsurance && (
              <div>
                <Eyebrow>Insurance</Eyebrow>
                <p className="mt-3 text-[14px] font-semibold text-white uppercase">
                  {profile.insuranceProvider}
                </p>
                {profile.insuranceCoverage && (
                  <p className="mt-0.5 text-[12px] text-white/65">{profile.insuranceCoverage}</p>
                )}
                <div className="mt-2">
                  <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-blue-400">
                    Covered
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Signature preview */}
        {profile.signatureData && (
          <div className="pt-6 border-t border-white/[0.06]">
            <Eyebrow>Digital signature</Eyebrow>
            <div className="mt-3 bg-white rounded-2xl p-4 inline-block max-w-xs">
              <img
                src={profile.signatureData}
                alt="Signature"
                className="max-h-16 w-auto"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function StatCell({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: 'emerald' | 'blue' | 'purple';
}) {
  const valueClass =
    tone === 'emerald'
      ? 'text-emerald-400'
      : tone === 'blue'
        ? 'text-blue-400'
        : tone === 'purple'
          ? 'text-purple-400'
          : 'text-white';
  return (
    <div className="flex flex-col items-start bg-[hsl(0_0%_12%)] px-4 py-5 sm:px-5 sm:py-6">
      <Eyebrow>{label}</Eyebrow>
      <span className={`mt-2 text-lg sm:text-xl font-semibold tracking-tight leading-none ${valueClass}`}>
        {value}
      </span>
    </div>
  );
}
