import { BS7671StepData } from '@/data/bs7671-steps/enhancedStepData';

interface MFTConnectionDiagramProps {
  stepData: BS7671StepData;
  systemType?: string;
}

const MFTConnectionDiagram = ({ stepData, systemType }: MFTConnectionDiagramProps) => {
  const Pill = ({ children }: { children: React.ReactNode }) => (
    <span className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]">
      {children}
    </span>
  );

  const getMFTSetup = () => {
    if (!stepData.mftSettings) return null;

    const { testType, voltage, current } = stepData.mftSettings;

    return (
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          MFT configuration
        </span>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-0.5">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Test type
            </span>
            <p className="text-[14px] text-white/85 leading-relaxed">{testType}</p>
          </div>
          <div className="space-y-0.5">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Voltage
            </span>
            <p className="text-[14px] text-white/85 leading-relaxed">{voltage}</p>
          </div>
          <div className="space-y-0.5">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Current
            </span>
            <p className="text-[14px] text-white/85 leading-relaxed">{current}</p>
          </div>
          <div className="space-y-0.5">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Duration
            </span>
            <p className="text-[14px] text-white/85 leading-relaxed">
              {stepData.mftSettings.duration}
            </p>
          </div>
        </div>
      </div>
    );
  };

  const getConnectionDiagram = () => {
    if (!stepData.connections) return null;

    return (
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Connection instructions
        </span>
        <ol className="space-y-2">
          {stepData.connections.map((connection, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="text-[12px] font-mono text-white/55 flex-shrink-0 w-5 mt-0.5">
                {index + 1}.
              </span>
              <span className="text-[14px] text-white/85 leading-relaxed">{connection}</span>
            </li>
          ))}
        </ol>
      </div>
    );
  };

  const getLeadConfiguration = () => {
    if (!stepData.mftSettings?.leads) return null;

    return (
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Required test leads
        </span>
        <div className="flex flex-wrap gap-1.5">
          {stepData.mftSettings.leads.map((lead, index) => (
            <Pill key={index}>{lead}</Pill>
          ))}
        </div>
      </div>
    );
  };

  const getSystemSpecificNotes = () => {
    if (!systemType) return null;

    const items =
      systemType === 'three-phase'
        ? [
            'Test each phase separately (L1, L2, L3)',
            'Consider load balancing during testing',
            'Check phase rotation if applicable',
            'Verify neutral integrity across all phases',
          ]
        : [
            'Single line and neutral to test',
            'Ensure proper earth connection',
            'Check for any parallel neutral paths',
            'Verify RCD operation if present',
          ];

    return (
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          {systemType === 'three-phase' ? 'Three-phase' : 'Single-phase'} system notes
        </span>
        <ul className="space-y-1.5">
          {items.map((item, i) => (
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
    );
  };

  return (
    <div className="space-y-4">
      <p className="text-[14px] text-white/85 leading-relaxed">
        MFT setup and connections for {stepData.title.toLowerCase()}.
      </p>

      {getMFTSetup()}
      {getConnectionDiagram()}
      {getLeadConfiguration()}
      {getSystemSpecificNotes()}
    </div>
  );
};

export default MFTConnectionDiagram;
