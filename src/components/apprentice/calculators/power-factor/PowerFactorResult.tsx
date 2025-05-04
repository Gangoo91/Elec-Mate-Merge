
import { ArrowRight } from "lucide-react";

interface PowerFactorResultProps {
  powerFactor: string | null;
}

const PowerFactorResult = ({ powerFactor }: PowerFactorResultProps) => {
  return (
    <div>
      {powerFactor !== null ? (
        <div className="text-center">
          <span className="text-elec-yellow text-xl mb-2 block">Power Factor</span>
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="text-3xl font-bold text-elec-yellow">{powerFactor}</div>
            <ArrowRight className="text-elec-yellow h-5 w-5" />
            <div className="text-2xl font-bold text-elec-yellow">{(parseFloat(powerFactor) * 100).toFixed(1)}%</div>
          </div>
          
          <div className="mt-4 text-sm text-muted-foreground">
            {parseFloat(powerFactor) > 0.95 ? (
              <span className="text-green-500">Good power factor (&gt; 0.95)</span>
            ) : parseFloat(powerFactor) > 0.85 ? (
              <span className="text-yellow-500">Acceptable power factor (&gt; 0.85)</span>
            ) : (
              <span className="text-red-500">Poor power factor (&lt; 0.85), correction recommended</span>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default PowerFactorResult;
