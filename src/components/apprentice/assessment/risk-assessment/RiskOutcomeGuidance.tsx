interface RiskOutcomeGuidanceProps {
  riskLevel: string;
  riskScore: number;
}

const RiskOutcomeGuidance = ({ riskLevel, riskScore }: RiskOutcomeGuidanceProps) => {
  const getRiskGuidance = () => {
    switch (riskLevel) {
      case 'Very High':
        return {
          action: 'Stop work immediately',
          timeframe: 'Immediate action required',
          authority: 'Senior management approval required',
          monitoring: 'Continuous monitoring required',
          documentation: 'Detailed risk assessment and SWMS mandatory',
          isDanger: true,
          recommendations: [
            'Work must not proceed until risk is reduced',
            'Implement multiple high-level controls immediately',
            'Senior management sign-off required',
            'Emergency procedures must be in place',
            'Qualified safety officer must be present',
          ],
        };
      case 'High':
        return {
          action: 'Caution - Enhanced controls required',
          timeframe: 'Action required before work starts',
          authority: 'Supervisor approval required',
          monitoring: 'Regular monitoring required',
          documentation: 'Comprehensive risk assessment required',
          isDanger: true,
          recommendations: [
            'Implement high-level control measures',
            'Supervisor briefing mandatory',
            'Regular safety checks during work',
            'Emergency response plan activated',
            'Competent persons only',
          ],
        };
      case 'Medium':
        return {
          action: 'Proceed with controls',
          timeframe: 'Controls must be in place',
          authority: 'Team leader approval',
          monitoring: 'Periodic monitoring',
          documentation: 'Standard risk assessment',
          isDanger: false,
          recommendations: [
            'Implement appropriate control measures',
            'Toolbox talk before starting',
            'Regular safety observations',
            'Standard operating procedures followed',
            'Trained workers only',
          ],
        };
      case 'Low':
        return {
          action: 'Proceed with standard controls',
          timeframe: 'Standard precautions',
          authority: 'Self-managed with oversight',
          monitoring: 'Routine monitoring',
          documentation: 'Basic risk documentation',
          isDanger: false,
          recommendations: [
            'Follow standard safety procedures',
            'Basic PPE requirements',
            'Standard supervision',
            'Normal work practices',
            'Regular safety awareness',
          ],
        };
      case 'Very Low':
        return {
          action: 'Proceed with minimal controls',
          timeframe: 'Basic precautions sufficient',
          authority: 'Self-managed',
          monitoring: 'As needed',
          documentation: 'Brief documentation',
          isDanger: false,
          recommendations: [
            'Standard workplace safety',
            'Basic awareness required',
            'Minimal supervision needed',
            'Standard PPE as required',
            'Normal monitoring',
          ],
        };
      default:
        return null;
    }
  };

  const guidance = getRiskGuidance();
  if (!guidance) return null;

  const matrixRows = [
    { level: 'Very High', score: '15-25', action: 'Stop Work', authority: 'Senior Mgmt', monitor: 'Continuous' },
    { level: 'High', score: '10-14', action: 'Enhanced', authority: 'Supervisor', monitor: 'Regular' },
    { level: 'Medium', score: '6-9', action: 'Standard', authority: 'Team Lead', monitor: 'Periodic' },
    { level: 'Low', score: '3-5', action: 'Basic', authority: 'Self-managed', monitor: 'Routine' },
    { level: 'Very Low', score: '1-2', action: 'Minimal', authority: 'Self-managed', monitor: 'As needed' },
  ];

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Risk management guidance
        </span>
        <h3 className="text-[16px] sm:text-[18px] font-medium text-white">{guidance.action}</h3>
      </div>

      <div
        className={`rounded-xl border p-4 sm:p-5 space-y-3 ${
          guidance.isDanger ? 'border-red-500/30 bg-red-500/[0.04]' : 'border-white/[0.06] bg-white/[0.02]'
        }`}
      >
        <div className="flex items-baseline justify-between">
          <span
            className={`text-[10px] font-medium uppercase tracking-[0.18em] ${guidance.isDanger ? 'text-red-300' : 'text-white/55'}`}
          >
            {riskLevel}
          </span>
          <span className="text-[12px] text-white/85 font-mono">Score: {riskScore}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {[
            { label: 'Timeframe', value: guidance.timeframe },
            { label: 'Authority', value: guidance.authority },
            { label: 'Monitoring', value: guidance.monitoring },
            { label: 'Documentation', value: guidance.documentation },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-1"
            >
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                {item.label}
              </span>
              <p className="text-[13px] text-white/85 leading-relaxed">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Required actions
        </span>
        <ul className="space-y-1.5">
          {guidance.recommendations.map((recommendation, index) => (
            <li
              key={index}
              className="flex items-start gap-2 text-[14px] text-white/85 leading-relaxed"
            >
              <span className="w-1 h-1 rounded-full bg-elec-yellow mt-2 flex-shrink-0" />
              <span>{recommendation}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Risk matrix reference
        </span>
        <div className="overflow-x-auto -mx-2 px-2">
          <table className="w-full text-[12px] min-w-[500px]">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="text-left py-2 px-2 text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                  Level
                </th>
                <th className="text-left py-2 px-2 text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                  Score
                </th>
                <th className="text-left py-2 px-2 text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                  Action
                </th>
                <th className="text-left py-2 px-2 text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                  Authority
                </th>
                <th className="text-left py-2 px-2 text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                  Monitor
                </th>
              </tr>
            </thead>
            <tbody>
              {matrixRows.map((row) => {
                const isCurrent = riskLevel === row.level;
                return (
                  <tr
                    key={row.level}
                    className={`border-b border-white/[0.04] ${isCurrent ? 'bg-elec-yellow/[0.04]' : ''}`}
                  >
                    <td className="py-2 px-2 text-white">{row.level}</td>
                    <td className="py-2 px-2 text-white/85 font-mono">{row.score}</td>
                    <td className="py-2 px-2 text-white/85">{row.action}</td>
                    <td className="py-2 px-2 text-white/85">{row.authority}</td>
                    <td className="py-2 px-2 text-white/85">{row.monitor}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RiskOutcomeGuidance;
