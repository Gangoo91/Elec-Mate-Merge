import { ArrowRight } from 'lucide-react';

interface PowerFactorResultProps {
  powerFactor: string | null;
}

const PowerFactorResult = ({ powerFactor }: PowerFactorResultProps) => {
  return (
    <div>
      {powerFactor !== null ? (
        <div className="text-center space-y-3">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55 block">
            Power factor
          </span>
          <div className="flex items-center justify-center gap-3">
            <div className="text-2xl font-mono text-white">{powerFactor}</div>
            <ArrowRight className="text-white/55 h-5 w-5" />
            <div className="text-2xl font-mono text-elec-yellow">
              {(parseFloat(powerFactor) * 100).toFixed(1)}%
            </div>
          </div>

          <div className="text-[12px] text-white/85">
            {parseFloat(powerFactor) > 0.95 ? (
              <span>Good power factor (&gt; 0.95)</span>
            ) : parseFloat(powerFactor) > 0.85 ? (
              <span>Acceptable power factor (&gt; 0.85)</span>
            ) : (
              <span>Poor power factor (&lt; 0.85), correction recommended</span>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default PowerFactorResult;
