/**
 * ElectricianAccreditationDetailView — editorial detail view.
 *
 * Drops the pill-tab UI in favour of a single scrollable editorial layout
 * matching the College Hub cadence: numbered eyebrows (01 OVERVIEW, 02
 * BENEFITS, 03 REQUIREMENTS, 04 GET STARTED). Type-led, gradient hero card,
 * tabular-nums stat strip, hairline dividers between sections.
 */

import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, ArrowRight } from 'lucide-react';
import { openExternalUrl } from '@/utils/open-external-url';
import { Eyebrow } from '@/components/college/primitives';
import { cn } from '@/lib/utils';
import { AccreditationOption } from '../../../apprentice/career/accreditation/enhancedAccreditationData';
import { getInitials, getLogoUrl } from './accreditationBranding';

interface ElectricianAccreditationDetailViewProps {
  accreditation: AccreditationOption;
  onBack: () => void;
}

const ElectricianAccreditationDetailView = ({
  accreditation,
  onBack,
}: ElectricianAccreditationDetailViewProps) => {
  const logoUrl = getLogoUrl(accreditation.accreditationBody, accreditation.website);
  const popularityTone =
    accreditation.popularity >= 90
      ? 'text-emerald-300'
      : accreditation.popularity >= 75
        ? 'text-elec-yellow'
        : 'text-amber-300';

  const documents = [
    'Qualification certificates',
    'Work portfolio + references',
    'CPD records (last 12 months)',
    'Public liability insurance',
    'Business registration / UTR',
    'Character references',
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22 }}
      className="space-y-8 sm:space-y-10 pb-24 sm:pb-6"
    >
      {/* Back */}
      <div>
        <button
          type="button"
          onClick={onBack}
          className="text-white/85 hover:text-white inline-flex items-center gap-1.5 text-[12px] uppercase tracking-[0.14em] font-semibold border border-white/15 hover:border-white/30 rounded-full px-3 py-1 min-h-[32px] touch-manipulation"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Schemes
        </button>
      </div>

      {/* Hero */}
      <section className="rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] border border-white/[0.10] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center bg-elec-yellow/[0.08] border border-elec-yellow/30 shrink-0 overflow-hidden">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt={`${accreditation.accreditationBody} logo`}
                className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = `<span class="text-[13px] font-semibold text-elec-yellow">${getInitials(
                      accreditation.accreditationBody
                    )}</span>`;
                  }
                }}
              />
            ) : (
              <span className="text-[13px] font-semibold text-elec-yellow">
                {getInitials(accreditation.accreditationBody)}
              </span>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <Eyebrow>{accreditation.category}</Eyebrow>
            <h1 className="mt-1.5 text-[24px] sm:text-[32px] font-semibold tracking-tight leading-tight text-white">
              {accreditation.title}
            </h1>
            <p className="mt-1 text-[12.5px] sm:text-[13px] text-elec-yellow truncate">
              {accreditation.provider}
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/85 border border-white/15 rounded-md px-1.5 py-0.5">
                {accreditation.level}
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/85 border border-white/15 rounded-md px-1.5 py-0.5">
                {accreditation.difficulty}
              </span>
              {accreditation.onlineAvailable && (
                <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-blue-300 border border-blue-500/40 bg-blue-500/[0.08] rounded-md px-1.5 py-0.5">
                  Online available
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Stat strip */}
        <dl className="mt-5 pt-4 border-t border-white/[0.06] grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-3 text-[11px]">
          <Stat label="Duration" value={accreditation.duration} />
          <Stat label="Cost" value={accreditation.cost} accent />
          <Stat
            label="Locations"
            value={
              accreditation.locations.length > 1
                ? `UK-wide · ${accreditation.locations.length}`
                : (accreditation.locations[0] ?? '—')
            }
          />
          <Stat
            label="Take-up"
            value={
              <span className={cn('tabular-nums font-semibold', popularityTone)}>
                {accreditation.popularity}%
              </span>
            }
          />
        </dl>
      </section>

      {/* 01 — Overview + career impact */}
      <section className="space-y-3">
        <Eyebrow>01 · OVERVIEW</Eyebrow>
        <p className="text-[14px] sm:text-[15px] leading-relaxed text-white max-w-3xl">
          {accreditation.description}
        </p>
        <div className="mt-2 rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] border border-white/[0.10] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] p-5">
          <Eyebrow>CAREER IMPACT</Eyebrow>
          <p className="mt-2 text-[13px] leading-relaxed text-white">
            {accreditation.careerImpact}
          </p>
        </div>
      </section>

      {/* 02 — Benefits */}
      {accreditation.benefits.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-baseline justify-between gap-3 flex-wrap">
            <Eyebrow>02 · BENEFITS</Eyebrow>
            <span className="text-[11px] tabular-nums text-white/65">
              {accreditation.benefits.length} listed
            </span>
          </div>
          <div className="rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] border border-white/[0.10] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] p-5 sm:p-6">
            <ol className="divide-y divide-white/[0.06]">
              {accreditation.benefits.map((benefit, idx) => (
                <li key={idx} className="py-3 first:pt-0 last:pb-0">
                  <div className="flex items-baseline gap-3">
                    <span className="text-[10.5px] tabular-nums font-semibold text-elec-yellow shrink-0 w-5">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <p className="text-[13px] leading-relaxed text-white">{benefit}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* 03 — Requirements */}
      <section className="space-y-4">
        <Eyebrow>03 · REQUIREMENTS</Eyebrow>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Essential */}
          <div className="rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] border border-white/[0.10] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] p-5 sm:p-6">
            <Eyebrow>ESSENTIAL</Eyebrow>
            <ol className="mt-4 divide-y divide-white/[0.06]">
              {accreditation.requirements.map((req, idx) => (
                <li key={idx} className="py-3 first:pt-0 last:pb-0">
                  <div className="flex items-baseline gap-3">
                    <span className="text-[10.5px] tabular-nums font-semibold text-elec-yellow shrink-0 w-5">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <p className="text-[13px] leading-relaxed text-white">{req}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Documentation + experience */}
          <div className="space-y-4 sm:space-y-6">
            <div className="rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] border border-white/[0.10] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] p-5 sm:p-6">
              <Eyebrow>DOCUMENTATION</Eyebrow>
              <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                {documents.map((doc, idx) => (
                  <li
                    key={idx}
                    className="flex items-baseline gap-2.5 text-[12.5px] text-white"
                  >
                    <span className="w-1 h-1 rounded-full bg-elec-yellow shrink-0" aria-hidden />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] border border-white/[0.10] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] p-5 sm:p-6">
              <Eyebrow>BASELINE</Eyebrow>
              <dl className="mt-4 grid grid-cols-3 gap-3 text-[11px]">
                <BaselineCell value="2-4yr" label="Experience" />
                <BaselineCell value="BS 7671" label="Compliance" />
                <BaselineCell value="£2m+" label="PL insurance" />
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* 04 — Get started */}
      <section className="space-y-4">
        <Eyebrow>04 · GET STARTED</Eyebrow>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <div className="rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] border border-white/[0.10] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] p-5 sm:p-6">
            <Eyebrow>APPLICATION STEPS</Eyebrow>
            <ol className="mt-4 divide-y divide-white/[0.06]">
              {accreditation.nextSteps.map((step, idx) => (
                <li key={idx} className="py-3 first:pt-0 last:pb-0">
                  <div className="flex items-baseline gap-3">
                    <span className="text-[10.5px] tabular-nums font-semibold text-elec-yellow shrink-0 w-5">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <p className="text-[13px] leading-relaxed text-white">{step}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] border border-white/[0.10] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] p-5 sm:p-6">
            <Eyebrow>TIMELINE</Eyebrow>
            <ol className="mt-4 divide-y divide-white/[0.06]">
              <TimelineRow stage="Preparation" detail="2-4 weeks gathering documents" idx={1} />
              <TimelineRow stage="Assessment" detail="1-6 weeks for review + on-site visit" idx={2} />
              <TimelineRow stage="Approval" detail="1-2 weeks final decision" idx={3} />
              {accreditation.renewalPeriod && (
                <TimelineRow
                  stage="Renewal"
                  detail={`Re-assessed every ${accreditation.renewalPeriod}`}
                  idx={4}
                />
              )}
            </ol>

            <div className="mt-5 pt-4 border-t border-white/[0.06]">
              <Eyebrow>INVESTMENT</Eyebrow>
              <div className="mt-3 grid grid-cols-2 gap-4">
                <div>
                  <div className="text-[20px] font-semibold tabular-nums text-elec-yellow">
                    {accreditation.cost}
                  </div>
                  <div className="text-[10.5px] uppercase tracking-[0.14em] text-white/65 mt-0.5">
                    Initial cost
                  </div>
                </div>
                <div>
                  <div className="text-[20px] font-semibold tabular-nums text-emerald-300">
                    +15-25%
                  </div>
                  <div className="text-[10.5px] uppercase tracking-[0.14em] text-white/65 mt-0.5">
                    Day-rate premium
                  </div>
                </div>
              </div>
              <p className="mt-3 text-[11.5px] leading-relaxed text-white/85">
                Typical recoup within 2-3 contracts on premium pricing alone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Desktop CTA */}
      {accreditation.website && (
        <div className="hidden sm:block">
          <button
            type="button"
            onClick={() => openExternalUrl(accreditation.website)}
            className="text-[13px] font-semibold uppercase tracking-[0.14em] text-black bg-elec-yellow hover:bg-elec-yellow/90 active:bg-elec-yellow/85 rounded-full px-5 py-3 min-h-[44px] inline-flex items-center gap-2 touch-manipulation transition-colors"
          >
            Apply on provider website
            <ExternalLink className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Mobile fixed CTA */}
      {accreditation.website && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-elec-dark/95 backdrop-blur-lg border-t border-white/10 sm:hidden z-40">
          <button
            type="button"
            onClick={() => openExternalUrl(accreditation.website)}
            className="w-full text-[13px] font-semibold uppercase tracking-[0.14em] text-black bg-elec-yellow hover:bg-elec-yellow/90 active:bg-elec-yellow/85 rounded-full px-4 py-3 min-h-[44px] inline-flex items-center justify-center gap-2 touch-manipulation transition-colors"
          >
            Apply on provider website
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </motion.div>
  );
};

const Stat = ({
  label,
  value,
  accent,
}: {
  label: string;
  value: React.ReactNode;
  accent?: boolean;
}) => (
  <div className="min-w-0">
    <dt className="text-[9.5px] uppercase tracking-[0.14em] font-semibold text-white/65">
      {label}
    </dt>
    <dd
      className={cn(
        'mt-0.5 text-[14px] sm:text-[15px] tabular-nums truncate',
        accent ? 'text-elec-yellow font-semibold' : 'text-white font-semibold'
      )}
    >
      {value}
    </dd>
  </div>
);

const BaselineCell = ({ value, label }: { value: string; label: string }) => (
  <div className="text-center rounded-lg border border-white/[0.10] bg-white/[0.02] p-2.5">
    <div className="text-[14px] font-semibold tabular-nums text-elec-yellow">{value}</div>
    <div className="mt-0.5 text-[9.5px] uppercase tracking-[0.14em] text-white/65">
      {label}
    </div>
  </div>
);

const TimelineRow = ({
  stage,
  detail,
  idx,
}: {
  stage: string;
  detail: string;
  idx: number;
}) => (
  <li className="py-3 first:pt-0 last:pb-0">
    <div className="flex items-baseline gap-3">
      <span className="text-[10.5px] tabular-nums font-semibold text-elec-yellow shrink-0 w-5">
        {String(idx).padStart(2, '0')}
      </span>
      <div className="min-w-0">
        <h4 className="text-[13.5px] font-semibold text-white">{stage}</h4>
        <p className="mt-0.5 text-[12px] leading-relaxed text-white/85">{detail}</p>
      </div>
    </div>
  </li>
);

export default ElectricianAccreditationDetailView;
