
import { fuseTypes } from "./ZsValuesData";

interface ZsCalculatorResultProps {
  result: number | null;
  protectionType: string;
  mcbRating: string;
  rcboRating: string;
  fusRating: string;
  fuseType: string;
}

const ZsCalculatorResult = ({
  result,
  protectionType,
  mcbRating,
  rcboRating,
  fusRating,
  fuseType
}: ZsCalculatorResultProps) => {
  const getDeviceDescription = () => {
    if (protectionType === "mcb" && mcbRating) return `MCB ${mcbRating}A`;
    if (protectionType === "rcbo" && rcboRating) return `RCBO ${rcboRating}A`;
    if (protectionType === "fuse" && fuseType && fusRating) {
      return `${fuseTypes[fuseType as keyof typeof fuseTypes]} ${fusRating}A`;
    }
    return "";
  };

  const getNoteText = () => {
    if (protectionType === "fuse" && fuseType === "bs3036") {
      return "rewirable fuses";
    }
    if (protectionType === "fuse" && fuseType === "bs1362") {
      return "plug fuses in 13A sockets";
    }
    if (protectionType === "fuse" && (fuseType?.includes("iec") || fuseType?.includes("din") || fuseType?.includes("neozed") || fuseType?.includes("diazed"))) {
      return "European/industrial fuses";
    }
    if (protectionType === "fuse" && fuseType === "bs88-6") {
      return "motor circuit HRC fuses";
    }
    return "Type B MCBs and cartridge fuses";
  };

  return (
    <div className="bg-elec-dark/50 rounded-lg p-4">
      <h3 className="text-lg font-medium text-elec-yellow mb-4">Maximum Zs Value</h3>
      {result !== null ? (
        <div className="space-y-2">
          <div className="text-2xl font-bold text-white">{result}Ω</div>
          <p className="text-sm text-muted-foreground">
            Maximum earth fault loop impedance for {getDeviceDescription()}
          </p>
          <div className="bg-amber-500/10 border border-amber-500/30 rounded p-3 mt-4">
            <p className="text-xs text-amber-300">
              <strong>Note:</strong> These values are for {getNoteText()} at 230V. 
              Actual measured Zs must be less than this maximum value for safe operation.
            </p>
          </div>
        </div>
      ) : (
        <p className="text-muted-foreground">
          Select protection device type{protectionType === "fuse" ? ", fuse type," : ""} and rating to calculate maximum Zs value
        </p>
      )}
    </div>
  );
};

export default ZsCalculatorResult;
