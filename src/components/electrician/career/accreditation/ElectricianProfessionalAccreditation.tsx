 
/**
 * ElectricianProfessionalAccreditation — editorial rebuild.
 *
 * Lists UK accreditation routes (IET, ECA, NICEIC, NAPIT, Stroma) with the
 * info that actually matters: prerequisites, fees, what membership unlocks.
 * Editorial language matches the College Hub and the rest of the career hub.
 */

import { useState } from 'react';
import AccreditationCard from './AccreditationCard';
import ElectricianAccreditationDetailView from './ElectricianAccreditationDetailView';
import {
  enhancedAccreditationOptions,
  AccreditationOption,
} from '../../../apprentice/career/accreditation/enhancedAccreditationData';
import { Eyebrow } from '@/components/college/primitives';

const ElectricianProfessionalAccreditation = () => {
  const [selectedAccreditation, setSelectedAccreditation] = useState<AccreditationOption | null>(
    null
  );

  if (selectedAccreditation) {
    return (
      <ElectricianAccreditationDetailView
        accreditation={selectedAccreditation}
        onBack={() => setSelectedAccreditation(null)}
      />
    );
  }

  // Why-accredit + getting-started — the practical reasons + steps. Trimmed
  // from the previous icon-heavy bullets to a tight editorial list.
  const reasons = [
    {
      title: 'Professional recognition',
      detail:
        'IET, NICEIC, ECA — recognised by employers, clients and councils. The badge on the van earns trust quickly.',
    },
    {
      title: 'Earnings premium',
      detail:
        'Hays 2025 reports an average +15-20% on day rates for accredited specialists vs. unaccredited equivalents.',
    },
    {
      title: 'Regulatory cover',
      detail:
        'Most schemes give Part-P notification rights and BS 7671 self-certification — saves the council fee on every domestic job.',
    },
    {
      title: 'CPD network',
      detail:
        'Annual conferences, region meet-ups, technical updates on amendments (latest: A4:2026). Stays current automatically.',
    },
  ];
  const steps = [
    {
      title: 'Check your experience',
      detail: 'Most schemes need 2-5 years of post-AM2 installation experience.',
    },
    {
      title: 'Confirm prerequisites',
      detail: 'C&G L3 + AM2 + 18th Edition (2382-22) + 2391/2 for testing schemes.',
    },
    {
      title: 'Plan the spend',
      detail: 'Application £80-300, assessment £200-500, annual fees £150-400 typical.',
    },
    {
      title: 'Apply early',
      detail: 'Allow 3-6 months. Assessor visit + paperwork takes time on top of your day-job.',
    },
  ];

  return (
    <div className="space-y-10 sm:space-y-12">
      {/* Hero */}
      <section className="space-y-3">
        <Eyebrow>03 · ACCREDITATION</Eyebrow>
        <h2 className="text-[34px] sm:text-[44px] lg:text-[54px] font-semibold tracking-tight leading-[1.05]">
          <span className="text-elec-yellow">Get</span>{' '}
          <span className="text-white">recognised.</span>
        </h2>
        <p className="text-[14px] sm:text-[15px] leading-relaxed text-white max-w-3xl">
          {enhancedAccreditationOptions.length} UK schemes — IET, ECA, NICEIC, NAPIT, Stroma — with
          the fees, prerequisites, assessment process and what each one actually unlocks. Pick what
          fits the work you do and the people you want to work for.
        </p>
      </section>

      {/* Why + steps — two columns on desktop */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] border border-white/[0.10] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] p-5 sm:p-6">
          <Eyebrow>WHY GET ACCREDITED</Eyebrow>
          <ul className="mt-4 divide-y divide-white/[0.06]">
            {reasons.map((r, i) => (
              <li key={r.title} className="py-3 first:pt-0 last:pb-0">
                <div className="flex items-baseline gap-3">
                  <span className="text-[10.5px] tabular-nums font-semibold text-elec-yellow shrink-0 w-5">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="min-w-0">
                    <h4 className="text-[14px] font-semibold text-white">{r.title}</h4>
                    <p className="mt-0.5 text-[12.5px] leading-relaxed text-white">{r.detail}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] border border-white/[0.10] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] p-5 sm:p-6">
          <Eyebrow>HOW TO START</Eyebrow>
          <ol className="mt-4 divide-y divide-white/[0.06]">
            {steps.map((s, i) => (
              <li key={s.title} className="py-3 first:pt-0 last:pb-0">
                <div className="flex items-baseline gap-3">
                  <span className="text-[10.5px] tabular-nums font-semibold text-elec-yellow shrink-0 w-5">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="min-w-0">
                    <h4 className="text-[14px] font-semibold text-white">{s.title}</h4>
                    <p className="mt-0.5 text-[12.5px] leading-relaxed text-white">{s.detail}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Accreditation grid */}
      <section className="space-y-4">
        <div className="flex items-baseline justify-between gap-3 flex-wrap">
          <Eyebrow>04 · SCHEMES</Eyebrow>
          <span className="text-[11px] tabular-nums text-white/65">
            {enhancedAccreditationOptions.length} options
          </span>
        </div>
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
          {enhancedAccreditationOptions.map((accreditation) => (
            <AccreditationCard
              key={accreditation.id}
              accreditation={accreditation}
              onViewDetails={setSelectedAccreditation}
            />
          ))}
        </div>
      </section>

      {/* Resources — flat editorial list */}
      <section className="space-y-4">
        <Eyebrow>05 · DIRECT LINKS</Eyebrow>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <div className="rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] border border-white/[0.10] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
            <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-elec-yellow">
              Professional bodies
            </span>
            <ul className="mt-4 divide-y divide-white/[0.06]">
              <ResourceLine
                title="IET — Institution of Engineering and Technology"
                detail="Chartered engineering institution. MIET, FIET grades. Industry-leading CPD library."
                url="https://www.theiet.org"
              />
              <ResourceLine
                title="ECA — Electrical Contractors' Association"
                detail="Trade body for installers and contractors. Best-practice guides, contracts library."
                url="https://www.eca.co.uk"
              />
              <ResourceLine
                title="NICEIC"
                detail="Leading voluntary regulatory body. Approved Contractor + Domestic Installer schemes."
                url="https://www.niceic.com"
              />
            </ul>
          </div>
          <div className="rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] border border-white/[0.10] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
            <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-elec-yellow">
              Scheme providers
            </span>
            <ul className="mt-4 divide-y divide-white/[0.06]">
              <ResourceLine
                title="NAPIT — National Association of Professional Inspectors and Testers"
                detail="Part-P registered competent person scheme. Strong on test + inspection."
                url="https://www.napit.org.uk"
              />
              <ResourceLine
                title="Stroma Certification"
                detail="MCS-accredited body for renewables (PV, heat-pump). Also Part-P + EPC."
                url="https://www.stroma.com"
              />
              <ResourceLine
                title="Apprenticeship training providers"
                detail="Find an approved training centre near you via gov.uk."
                url="https://www.findapprenticeship.service.gov.uk/apprenticeship-training-providers"
              />
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

const ResourceLine = ({ title, detail, url }: { title: string; detail: string; url: string }) => (
  <li className="py-3 first:pt-0 last:pb-0">
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block group rounded-md -mx-1 px-1 hover:bg-white/[0.03] active:bg-white/[0.05] transition-colors touch-manipulation"
    >
      <div className="flex items-baseline justify-between gap-3">
        <h4 className="text-[14px] font-semibold text-white truncate">{title}</h4>
        <span className="text-[10.5px] uppercase tracking-[0.14em] text-white/65 group-hover:text-elec-yellow transition-colors shrink-0">
          Open ↗
        </span>
      </div>
      <p className="mt-0.5 text-[12px] leading-relaxed text-white">{detail}</p>
    </a>
  </li>
);

export default ElectricianProfessionalAccreditation;
