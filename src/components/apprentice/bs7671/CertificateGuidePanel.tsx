import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, FileSignature } from 'lucide-react';
import {
  certificateTypes,
  eicrObservationCodes,
  legalRequirements,
  type CertificateType,
} from './data/certificateGuideData';

const observationToneMap: Record<
  string,
  { border: string; text: string; tag: string }
> = {
  red: {
    border: 'border-red-500/30',
    text: 'text-red-300',
    tag: 'bg-red-500/[0.08] text-red-200 border-red-500/30',
  },
  orange: {
    border: 'border-orange-500/30',
    text: 'text-orange-300',
    tag: 'bg-orange-500/[0.08] text-orange-200 border-orange-500/30',
  },
  yellow: {
    border: 'border-elec-yellow/30',
    text: 'text-elec-yellow',
    tag: 'bg-elec-yellow/[0.08] text-elec-yellow border-elec-yellow/30',
  },
  blue: {
    border: 'border-white/[0.08]',
    text: 'text-white/85',
    tag: 'bg-white/[0.04] text-white/85 border-white/[0.08]',
  },
};

// Mini schematic of a cert page — visual hint that this is a paper form,
// not just bullet text. Inline SVG, monochrome, very subtle.
const CertSchematic = () => (
  <svg viewBox="0 0 120 64" className="h-12 w-[90px] flex-shrink-0" aria-hidden="true">
    <rect x="2" y="2" width="116" height="60" rx="3" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.12)" />
    <line x1="10" y1="14" x2="80" y2="14" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
    <line x1="10" y1="22" x2="60" y2="22" stroke="rgba(255,255,255,0.2)" />
    <line x1="10" y1="28" x2="100" y2="28" stroke="rgba(255,255,255,0.2)" />
    <line x1="10" y1="34" x2="90" y2="34" stroke="rgba(255,255,255,0.2)" />
    <line x1="10" y1="40" x2="70" y2="40" stroke="rgba(255,255,255,0.2)" />
    {/* Signature lines */}
    <line x1="10" y1="52" x2="40" y2="52" stroke="#facc15" strokeWidth="1.2" />
    <line x1="50" y1="52" x2="80" y2="52" stroke="#facc15" strokeWidth="1.2" />
    <line x1="90" y1="52" x2="112" y2="52" stroke="#facc15" strokeWidth="1.2" />
  </svg>
);

const renderCertCard = (cert: CertificateType) => (
  <Collapsible key={cert.id}>
    <CollapsibleTrigger className="w-full flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] touch-manipulation h-auto min-h-[44px] transition-colors">
      <CertSchematic />
      <div className="flex-1 min-w-0 text-left space-y-1">
        <div className="flex items-baseline gap-2">
          <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-elec-yellow/85">
            {cert.abbreviation}
          </span>
          <span className="text-[10px] uppercase tracking-[0.18em] text-white/35">·</span>
          <span className="text-[10px] uppercase tracking-[0.18em] text-white/55">
            Certificate
          </span>
        </div>
        <span className="block text-[15px] font-medium text-white truncate">{cert.title}</span>
      </div>
      <ChevronDown className="h-4 w-4 text-white/55 flex-shrink-0 transition-transform [[data-state=open]>&]:rotate-180" />
    </CollapsibleTrigger>
    <CollapsibleContent>
      <div className="px-4 pb-4 pt-3 mt-1 space-y-5 text-[14px] rounded-b-xl bg-white/[0.02] border-l-2 border-elec-yellow/20 ml-1">
        <div className="space-y-1.5">
          <h4 className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            When required
          </h4>
          <p className="text-white/85 leading-relaxed">{cert.whenRequired}</p>
        </div>

        <div className="space-y-2">
          <h4 className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Key requirements
          </h4>
          <ul className="space-y-1.5">
            {cert.keyRequirements.map((req, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="w-3.5 h-3.5 rounded-full bg-elec-yellow/10 border border-elec-yellow/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="w-1 h-1 rounded-full bg-elec-yellow" />
                </span>
                <span className="text-white/85 leading-relaxed">{req}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-2">
          <h4 className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Sections to complete
          </h4>
          <ol className="space-y-1.5">
            {cert.sectionsToComplete.map((section, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 rounded-lg border border-white/[0.04] bg-white/[0.02] px-3 py-2"
              >
                <span className="text-[11px] font-mono text-elec-yellow/85 min-w-[18px] mt-0.5">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <span className="text-white/85 leading-relaxed">{section}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="rounded-lg border border-orange-500/25 bg-orange-500/[0.04] p-3 space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
            <h4 className="text-[10px] font-medium uppercase tracking-[0.18em] text-orange-300/85">
              Common mistakes
            </h4>
          </div>
          <ul className="space-y-1.5">
            {cert.commonMistakes.map((mistake, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-orange-400/70 mt-2 flex-shrink-0" />
                <span className="text-[13px] text-white/85 leading-relaxed">{mistake}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-2">
          <h4 className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Official template sources
          </h4>
          <ul className="space-y-1">
            {cert.templateSources.map((source, idx) => (
              <li key={idx} className="flex items-start gap-2 text-[13px]">
                <FileSignature className="h-3.5 w-3.5 text-white/40 mt-0.5 flex-shrink-0" />
                <span className="text-white/85">{source}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-2 pt-1">
          <span className="h-px flex-1 bg-white/[0.06]" />
          <p className="text-[11px] text-white/55 font-mono">{cert.regulationReference}</p>
          <span className="h-px flex-1 bg-white/[0.06]" />
        </div>
      </div>
    </CollapsibleContent>
  </Collapsible>
);

const CertificateGuidePanel = () => {
  return (
    <div className="space-y-8 text-left">
      <div className="space-y-2">{certificateTypes.map(renderCertCard)}</div>

      <div className="space-y-3">
        <h3 className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          EICR observation codes
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {eicrObservationCodes.map((code) => {
            const tone = observationToneMap[code.color] || observationToneMap.blue;
            return (
              <div
                key={code.code}
                className={`p-3 rounded-xl bg-white/[0.02] border ${tone.border} space-y-2`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[11px] font-mono font-semibold px-2 py-0.5 rounded-md border ${tone.tag}`}
                  >
                    {code.code}
                  </span>
                  <span className={`text-[13px] font-medium ${tone.text}`}>{code.label}</span>
                </div>
                <p className="text-[12px] text-white/70 leading-relaxed">{code.description}</p>
                <p className="text-[12px] text-white/85 leading-relaxed">{code.action}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Legal requirements
        </h3>
        {legalRequirements.map((section, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2 relative overflow-hidden"
          >
            <span className="absolute left-0 top-0 bottom-0 w-px bg-elec-yellow/30" />
            <h4 className="text-[14px] font-medium text-white">{section.title}</h4>
            <ul className="space-y-1.5">
              {section.points.map((point, pidx) => (
                <li key={pidx} className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-elec-yellow/70 mt-2 flex-shrink-0" />
                  <span className="text-[13px] text-white/85 leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CertificateGuidePanel;
