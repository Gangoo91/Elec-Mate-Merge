import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

const IncidentGuidelines = () => {
  return (
    <div className="space-y-6">
      <Alert className="rounded-xl border-red-500/30 bg-red-500/[0.04]">
        <AlertTriangle className="h-4 w-4 text-red-400" />
        <AlertDescription className="text-[14px] text-white/85 leading-relaxed">
          <strong className="text-white">Emergency first:</strong> If anyone is injured or
          there&apos;s immediate danger, call 999 first. Complete this form only after ensuring
          everyone&apos;s safety.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            When to report incidents
          </span>

          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="text-[14px] font-semibold text-white">Immediately report</h4>
              <ul className="space-y-1.5">
                {[
                  'Any injuries requiring first aid or medical treatment',
                  'Dangerous occurrences or near misses',
                  'Equipment failures that could cause harm',
                  'Environmental incidents (spills, emissions)',
                ].map((item, idx) => (
                  <li
                    key={idx}
                    className="text-[14px] text-white/85 leading-relaxed flex items-start gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-elec-yellow mt-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="text-[14px] font-semibold text-white">Report within 24 hours</h4>
              <ul className="space-y-1.5">
                {[
                  'Minor equipment malfunctions',
                  'Unsafe working conditions',
                  'Property damage incidents',
                  'Security breaches or concerns',
                ].map((item, idx) => (
                  <li
                    key={idx}
                    className="text-[14px] text-white/85 leading-relaxed flex items-start gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Legal requirements (UK)
          </span>

          <div className="space-y-3">
            <div className="space-y-1">
              <h4 className="text-[14px] font-semibold text-white">
                Health and Safety at Work Act 1974
              </h4>
              <p className="text-[14px] text-white/85 leading-relaxed">
                Employees have a duty to report incidents that could affect health and safety.
              </p>
            </div>

            <div className="space-y-1">
              <h4 className="text-[14px] font-semibold text-white">RIDDOR regulations</h4>
              <p className="text-[14px] text-white/85 leading-relaxed">
                Certain incidents must be reported to the HSE within specific timeframes:
              </p>
              <ul className="space-y-1 pt-1">
                {[
                  'Deaths and major injuries: immediately',
                  'Over-7-day injuries: within 15 days',
                  'Dangerous occurrences: immediately',
                ].map((item, idx) => (
                  <li
                    key={idx}
                    className="text-[14px] text-white/85 leading-relaxed flex items-start gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-1">
              <h4 className="text-[14px] font-semibold text-white">Data protection</h4>
              <p className="text-[14px] text-white/85 leading-relaxed">
                Personal information in incident reports is protected under UK GDPR.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            How to report effectively
          </span>

          <div className="space-y-3">
            {[
              {
                title: 'Be factual and objective',
                items: [
                  'Stick to facts, avoid opinions or blame',
                  'Use clear, simple language',
                  'Include specific times, locations, and conditions',
                ],
              },
              {
                title: 'Include all relevant details',
                items: [
                  'Weather conditions (for outdoor incidents)',
                  'Equipment involved (model numbers, condition)',
                  'People involved (witnesses, supervisors)',
                  'Actions taken immediately after the incident',
                ],
              },
              {
                title: 'Supporting evidence',
                items: [
                  'Take photos if safe to do so',
                  'Preserve physical evidence where possible',
                  'Get witness statements',
                  'Keep any relevant documentation',
                ],
              },
            ].map((section, idx) => (
              <div key={idx} className="space-y-1">
                <h4 className="text-[14px] font-semibold text-white">{section.title}</h4>
                <ul className="space-y-1">
                  {section.items.map((item, i) => (
                    <li
                      key={i}
                      className="text-[14px] text-white/85 leading-relaxed flex items-start gap-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Emergency contacts
          </span>

          <div className="space-y-3">
            <div className="rounded-xl border border-red-500/30 bg-red-500/[0.04] p-4 space-y-1">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-red-300">
                Emergency services
              </span>
              <p className="text-2xl font-mono text-white">999</p>
              <p className="text-[13px] text-white/85">
                For immediate medical assistance or fire/police response
              </p>
            </div>

            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-1">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                HSE incident contact centre
              </span>
              <p className="text-[18px] font-mono text-white">0345 300 9923</p>
              <p className="text-[13px] text-white/85">For reporting RIDDOR incidents</p>
            </div>

            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-1">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                Site safety officer
              </span>
              <p className="text-[14px] text-white/85 leading-relaxed">
                Contact your site safety officer or supervisor for non-emergency incidents
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Common electrical industry incidents
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            {
              title: 'Electrical shock/burns',
              description:
                'Contact with live electrical parts, arc flash incidents, electrical burns',
              isSafety: true,
            },
            {
              title: 'Falls from height',
              description: 'Falls from ladders, scaffolding, or elevated work platforms',
              isSafety: true,
            },
            {
              title: 'Equipment failures',
              description: 'Tool malfunctions, PPE failures, testing equipment issues',
            },
            {
              title: 'Manual handling',
              description: 'Back injuries, muscle strains from lifting heavy equipment or materials',
            },
            {
              title: 'Environmental',
              description:
                'Chemical spills, improper waste disposal, environmental contamination',
            },
            {
              title: 'Near misses',
              description: "Incidents that could have resulted in injury but didn't",
            },
          ].map((item, idx) => {
            const containerClass = item.isSafety
              ? 'rounded-xl border border-red-500/30 bg-red-500/[0.04] p-4 space-y-1.5'
              : 'rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-1.5';

            return (
              <div key={idx} className={containerClass}>
                <h4 className="text-[14px] font-semibold text-white">{item.title}</h4>
                <p className="text-[13px] text-white/85 leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Additional resources
        </span>
        <div className="space-y-3">
          {[
            {
              title: 'HSE website',
              description:
                'Visit hse.gov.uk for comprehensive guidance on workplace health and safety reporting',
            },
            {
              title: 'Training requirements',
              description:
                "Regular safety training helps identify and prevent incidents. Ensure you're up to date with current requirements.",
            },
            {
              title: 'Anonymous reporting',
              description:
                'If you have concerns about reporting openly, speak to your safety representative about anonymous reporting options.',
            },
          ].map((item, idx) => (
            <div key={idx} className="space-y-1">
              <h4 className="text-[14px] font-semibold text-white">{item.title}</h4>
              <p className="text-[14px] text-white/85 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IncidentGuidelines;
