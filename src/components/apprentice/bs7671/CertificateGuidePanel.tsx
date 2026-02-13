import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Badge } from '@/components/ui/badge';
import {
  ChevronDown,
  FileCheck,
  ClipboardCheck,
  FileEdit,
  ListChecks,
  TestTube2,
  AlertTriangle,
  Info,
  Scale,
} from 'lucide-react';
import {
  certificateTypes,
  eicrObservationCodes,
  legalRequirements,
  type CertificateType,
} from './data/certificateGuideData';

const iconMap: Record<string, React.ElementType> = {
  FileCheck,
  ClipboardCheck,
  FileEdit,
  ListChecks,
  TestTube2,
};

const colorMap: Record<string, { bg: string; border: string; text: string }> = {
  cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-400' },
  blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400' },
  green: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-400' },
  amber: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400' },
  purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-400' },
};

const observationColorMap: Record<string, { bg: string; border: string; text: string }> = {
  red: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400' },
  orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-400' },
  yellow: { bg: 'bg-elec-yellow/10', border: 'border-elec-yellow/30', text: 'text-elec-yellow' },
  blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400' },
};

const renderCertCard = (cert: CertificateType) => {
  const Icon = iconMap[cert.icon] || FileCheck;
  const colors = colorMap[cert.color] || colorMap.cyan;

  return (
    <Collapsible key={cert.id}>
      <CollapsibleTrigger className={`w-full flex items-center justify-between p-4 rounded-xl ${colors.bg} border ${colors.border} touch-manipulation h-auto min-h-[44px]`}>
        <div className="flex items-center gap-3 min-w-0">
          <div className={`p-1.5 rounded-lg ${colors.bg} flex-shrink-0`}>
            <Icon className={`h-4 w-4 ${colors.text}`} />
          </div>
          <div className="text-left min-w-0">
            <div className="text-sm font-semibold text-white truncate">{cert.title}</div>
            <Badge className={`mt-0.5 text-[10px] px-1.5 py-0 ${colors.bg} ${colors.text} border ${colors.border}`}>
              {cert.abbreviation}
            </Badge>
          </div>
        </div>
        <ChevronDown className={`h-4 w-4 ${colors.text} flex-shrink-0 transition-transform [[data-state=open]>&]:rotate-180`} />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="px-4 pb-4 pt-3 mt-1 space-y-4 text-sm rounded-b-xl bg-white/[0.02]">
          {/* When Required */}
          <div>
            <h4 className={`text-xs font-semibold ${colors.text} uppercase tracking-wide mb-1`}>When Required</h4>
            <p className="text-white">{cert.whenRequired}</p>
          </div>

          {/* Key Requirements */}
          <div>
            <h4 className={`text-xs font-semibold ${colors.text} uppercase tracking-wide mb-2`}>Key Requirements</h4>
            <div className="space-y-1.5">
              {cert.keyRequirements.map((req, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${colors.text.replace('text-', 'bg-')}`} />
                  <span className="text-white">{req}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sections to Complete */}
          <div>
            <h4 className={`text-xs font-semibold ${colors.text} uppercase tracking-wide mb-2`}>Sections to Complete</h4>
            <div className="space-y-1.5">
              {cert.sectionsToComplete.map((section, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="bg-white/20 text-white px-1.5 py-0 rounded text-[10px] font-bold min-w-[20px] text-center flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="text-white">{section}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Common Mistakes */}
          <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
            <h4 className="text-xs font-semibold text-orange-400 uppercase tracking-wide mb-2 flex items-center gap-1.5">
              <AlertTriangle className="h-3.5 w-3.5" />
              Common Mistakes
            </h4>
            <div className="space-y-1.5">
              {cert.commonMistakes.map((mistake, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="w-1 h-1 bg-orange-400 rounded-full mt-1.5 flex-shrink-0" />
                  <span className="text-white">{mistake}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Where to Get Templates */}
          <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <h4 className="text-xs font-semibold text-blue-400 uppercase tracking-wide mb-2 flex items-center gap-1.5">
              <Info className="h-3.5 w-3.5" />
              Official Template Sources
            </h4>
            <div className="space-y-1">
              {cert.templateSources.map((source, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs">
                  <span className="w-1 h-1 bg-blue-400 rounded-full mt-1.5 flex-shrink-0" />
                  <span className="text-white">{source}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Regulation Reference */}
          <div className="text-xs text-cyan-400 font-mono px-2 py-1 rounded bg-cyan-500/10 inline-block">
            {cert.regulationReference}
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

const CertificateGuidePanel = () => {
  return (
    <div className="space-y-6 text-left">
      {/* Certificate Types */}
      <div className="space-y-3">
        {certificateTypes.map(renderCertCard)}
      </div>

      {/* EICR Observation Codes */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          EICR Observation Codes
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {eicrObservationCodes.map(code => {
            const colors = observationColorMap[code.color] || observationColorMap.blue;
            return (
              <div key={code.code} className={`p-3 rounded-xl ${colors.bg} border ${colors.border}`}>
                <div className="flex items-center gap-2 mb-2">
                  <Badge className={`text-xs font-bold ${colors.bg} ${colors.text} border ${colors.border}`}>
                    {code.code}
                  </Badge>
                  <span className={`text-sm font-semibold ${colors.text}`}>{code.label}</span>
                </div>
                <p className="text-xs text-white mb-2">{code.description}</p>
                <p className="text-xs text-white font-medium">{code.action}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legal Requirements */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          <Scale className="h-4 w-4 text-cyan-400" />
          Legal Requirements
        </h3>
        {legalRequirements.map((section, idx) => (
          <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/10">
            <h4 className="text-sm font-semibold text-white mb-2">{section.title}</h4>
            <div className="space-y-1.5">
              {section.points.map((point, pidx) => (
                <div key={pidx} className="flex items-start gap-2 text-xs">
                  <span className="w-1 h-1 bg-white rounded-full mt-1.5 flex-shrink-0" />
                  <span className="text-white">{point}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CertificateGuidePanel;
