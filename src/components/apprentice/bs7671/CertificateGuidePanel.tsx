import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';
import {
  certificateTypes,
  eicrObservationCodes,
  legalRequirements,
  type CertificateType,
} from './data/certificateGuideData';

const observationToneMap: Record<string, string> = {
  red: 'border-red-500/30',
  orange: 'border-orange-500/30',
  yellow: 'border-elec-yellow/30',
  blue: 'border-white/[0.06]',
};

const renderCertCard = (cert: CertificateType) => (
  <Collapsible key={cert.id}>
    <CollapsibleTrigger className="w-full flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] touch-manipulation h-auto min-h-[44px] transition-colors">
      <div className="flex items-baseline gap-3 min-w-0 text-left">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55 font-mono flex-shrink-0">
          {cert.abbreviation}
        </span>
        <span className="text-[14px] font-medium text-white truncate">{cert.title}</span>
      </div>
      <ChevronDown className="h-4 w-4 text-white/55 flex-shrink-0 transition-transform [[data-state=open]>&]:rotate-180" />
    </CollapsibleTrigger>
    <CollapsibleContent>
      <div className="px-4 pb-4 pt-3 mt-1 space-y-4 text-[14px] rounded-b-xl bg-white/[0.02]">
        <div className="space-y-1.5">
          <h4 className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            When required
          </h4>
          <p className="text-white/85 leading-relaxed">{cert.whenRequired}</p>
        </div>

        <div className="space-y-1.5">
          <h4 className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Key requirements
          </h4>
          <ul className="space-y-1.5">
            {cert.keyRequirements.map((req, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                <span className="text-white/85 leading-relaxed">{req}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-1.5">
          <h4 className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Sections to complete
          </h4>
          <ol className="space-y-1.5">
            {cert.sectionsToComplete.map((section, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="bg-white/5 text-white/85 px-1.5 py-0 rounded text-[11px] font-mono min-w-[22px] text-center flex-shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="text-white/85 leading-relaxed">{section}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="rounded-lg border border-white/[0.06] p-3 space-y-1.5">
          <h4 className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Common mistakes
          </h4>
          <ul className="space-y-1.5">
            {cert.commonMistakes.map((mistake, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                <span className="text-[13px] text-white/85 leading-relaxed">{mistake}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-1.5">
          <h4 className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Official template sources
          </h4>
          <ul className="space-y-1">
            {cert.templateSources.map((source, idx) => (
              <li key={idx} className="flex items-start gap-2 text-[13px]">
                <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                <span className="text-white/85">{source}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-[11px] text-white/55 font-mono">{cert.regulationReference}</p>
      </div>
    </CollapsibleContent>
  </Collapsible>
);

const CertificateGuidePanel = () => {
  return (
    <div className="space-y-6 text-left">
      <div className="space-y-2">{certificateTypes.map(renderCertCard)}</div>

      <div className="space-y-3">
        <h3 className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          EICR observation codes
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {eicrObservationCodes.map((code) => {
            const borderClass = observationToneMap[code.color] || 'border-white/[0.06]';
            return (
              <div
                key={code.code}
                className={`p-3 rounded-xl bg-white/[0.02] border ${borderClass} space-y-1.5`}
              >
                <div className="flex items-baseline gap-2">
                  <span className="text-[11px] font-mono text-white/55">{code.code}</span>
                  <span className="text-[13px] font-medium text-white">{code.label}</span>
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
            className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2"
          >
            <h4 className="text-[14px] font-medium text-white">{section.title}</h4>
            <ul className="space-y-1.5">
              {section.points.map((point, pidx) => (
                <li key={pidx} className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
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
