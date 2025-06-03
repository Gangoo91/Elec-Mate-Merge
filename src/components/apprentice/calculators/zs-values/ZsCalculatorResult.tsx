
import { fuseTypes, curveTypes } from "./ZsValuesData";

interface ZsCalculatorResultProps {
  result: number | null;
  protectionType: string;
  mcbRating: string;
  rcboRating: string;
  fusRating: string;
  fuseType: string;
  mcbCurve: string;
  rcboCurve: string;
}

const ZsCalculatorResult = ({
  result,
  protectionType,
  mcbRating,
  rcboRating,
  fusRating,
  fuseType,
  mcbCurve,
  rcboCurve
}: ZsCalculatorResultProps) => {
  const getDeviceDescription = () => {
    if (protectionType === "mcb" && mcbRating && mcbCurve) {
      const curveDescription = curveTypes[mcbCurve as keyof typeof curveTypes];
      return `MCB ${mcbRating}A ${curveDescription}`;
    }
    if (protectionType === "rcbo" && rcboRating && rcboCurve) {
      const curveDescription = curveTypes[rcboCurve as keyof typeof curveTypes];
      return `RCBO ${rcboRating}A ${curveDescription}`;
    }
    if (protectionType === "fuse" && fuseType && fusRating) {
      return `${fuseTypes[fuseType as keyof typeof fuseTypes]} ${fusRating}A`;
    }
    return "";
  };

  const getNoteText = () => {
    if (protectionType === "mcb" && mcbCurve) {
      const curveDescription = curveTypes[mcbCurve as keyof typeof curveTypes];
      return `${curveDescription} MCBs`;
    }
    if (protectionType === "rcbo" && rcboCurve) {
      const curveDescription = curveTypes[rcboCurve as keyof typeof curveTypes];
      return `${curveDescription} RCBOs`;
    }
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
    return "cartridge fuses";
  };

  const getCurveExplanation = () => {
    if (protectionType === "mcb" && mcbCurve) {
      switch (mcbCurve) {
        case "type-a":
          return "Type A: Most sensitive, trips at 2-3 times rated current. Used for semiconductor protection.";
        case "type-b":
          return "Type B: Standard domestic use, trips at 3-5 times rated current. Most common in UK homes.";
        case "type-c":
          return "Type C: Industrial use, trips at 5-10 times rated current. Used for motor circuits.";
        case "type-d":
          return "Type D: High inrush loads, trips at 10-20 times rated current. Used for transformers and welding equipment.";
        default:
          return "";
      }
    }
    if (protectionType === "rcbo" && rcboCurve) {
      switch (rcboCurve) {
        case "type-a":
          return "Type A: Most sensitive, trips at 2-3 times rated current with RCD protection.";
        case "type-b":
          return "Type B: Standard domestic use, trips at 3-5 times rated current with RCD protection.";
        case "type-c":
          return "Type C: Industrial use, trips at 5-10 times rated current with RCD protection.";
        case "type-d":
          return "Type D: High inrush loads, trips at 10-20 times rated current with RCD protection.";
        default:
          return "";
      }
    }
    return "";
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
          
          {getCurveExplanation() && (
            <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3 mt-3">
              <p className="text-xs text-blue-300">
                <strong>Curve Info:</strong> {getCurveExplanation()}
              </p>
            </div>
          )}
          
          <div className="bg-amber-500/10 border border-amber-500/30 rounded p-3 mt-4">
            <p className="text-xs text-amber-300">
              <strong>Note:</strong> These values are for {getNoteText()} at 230V. 
              Actual measured Zs must be less than this maximum value for safe operation.
            </p>
          </div>
        </div>
      ) : (
        <p className="text-muted-foreground">
          Select protection device type{protectionType === "fuse" ? ", fuse type," : protectionType === "mcb" || protectionType === "rcbo" ? ", curve type," : ""} and rating to calculate maximum Zs value
        </p>
      )}
    </div>
  );
};

export default ZsCalculatorResult;
