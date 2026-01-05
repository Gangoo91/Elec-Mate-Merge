import { MobileInput } from "@/components/ui/mobile-input";
import { MobileButton } from "@/components/ui/mobile-button";
import { MobileSelect, MobileSelectContent, MobileSelectItem, MobileSelectTrigger, MobileSelectValue } from "@/components/ui/mobile-select";
import { Calculator, RotateCcw } from "lucide-react";
import { fuseTypes, fuseRatings, curveTypes, mcbRatings, disconnectionTimes, rcdRatings } from "./ZsValuesData";

interface ZsCalculatorFormProps {
  mcbRating: string;
  setMcbRating: (value: string) => void;
  rcboRating: string;
  setRcboRating: (value: string) => void;
  fusRating: string;
  setFusRating: (value: string) => void;
  fuseType: string;
  setFuseType: (value: string) => void;
  protectionType: string;
  setProtectionType: (value: string) => void;
  mcbCurve: string;
  setMcbCurve: (value: string) => void;
  rcboCurve: string;
  setRcboCurve: (value: string) => void;
  ze: string;
  setZe: (value: string) => void;
  r1r2: string;
  setR1R2: (value: string) => void;
  onCalculate: () => void;
  onReset: () => void;
  disconnectionTime?: string;
  setDisconnectionTime?: (value: string) => void;
  rcdRating?: string;
  setRcdRating?: (value: string) => void;
}

const ZsCalculatorForm = ({
  mcbRating,
  setMcbRating,
  rcboRating,
  setRcboRating,
  fusRating,
  setFusRating,
  fuseType,
  setFuseType,
  protectionType,
  setProtectionType,
  mcbCurve,
  setMcbCurve,
  rcboCurve,
  setRcboCurve,
  ze,
  setZe,
  r1r2,
  setR1R2,
  onCalculate,
  onReset,
  disconnectionTime = "0.4",
  setDisconnectionTime,
  rcdRating = "30",
  setRcdRating
}: ZsCalculatorFormProps) => {
  return (
    <div className="space-y-4">
      <MobileSelect value={protectionType} onValueChange={setProtectionType}>
        <MobileSelectTrigger label="Protection Device Type">
          <MobileSelectValue placeholder="Select device type" />
        </MobileSelectTrigger>
        <MobileSelectContent className="bg-elec-dark border-elec-yellow/20">
          <MobileSelectItem value="mcb">MCB (Miniature Circuit Breaker)</MobileSelectItem>
          <MobileSelectItem value="rcbo">RCBO (RCD + MCB)</MobileSelectItem>
          <MobileSelectItem value="fuse">Fuse</MobileSelectItem>
          <MobileSelectItem value="rcd">RCD Only (Table 41.5)</MobileSelectItem>
        </MobileSelectContent>
      </MobileSelect>

      {/* Disconnection Time Selector - for MCB, RCBO, and Fuse */}
      {(protectionType === "mcb" || protectionType === "rcbo" || protectionType === "fuse") && setDisconnectionTime && (
        <MobileSelect value={disconnectionTime} onValueChange={setDisconnectionTime}>
          <MobileSelectTrigger label="Disconnection Time">
            <MobileSelectValue placeholder="Select disconnection time" />
          </MobileSelectTrigger>
          <MobileSelectContent className="bg-elec-dark border-elec-yellow/20">
            {Object.entries(disconnectionTimes).map(([key, label]) => (
              <MobileSelectItem key={key} value={key}>{label}</MobileSelectItem>
            ))}
          </MobileSelectContent>
        </MobileSelect>
      )}

      {protectionType === "mcb" && (
        <>
          <MobileSelect value={mcbCurve} onValueChange={setMcbCurve}>
            <MobileSelectTrigger label="MCB Curve Type (BS EN 60898)">
              <MobileSelectValue placeholder="Select curve type" />
            </MobileSelectTrigger>
            <MobileSelectContent className="bg-elec-dark border-elec-yellow/20">
              {Object.entries(curveTypes).map(([key, label]) => (
                <MobileSelectItem key={key} value={key}>{label}</MobileSelectItem>
              ))}
            </MobileSelectContent>
          </MobileSelect>

          <MobileSelect value={mcbRating} onValueChange={setMcbRating}>
            <MobileSelectTrigger label="MCB Rating (A)">
              <MobileSelectValue placeholder="Select MCB rating" />
            </MobileSelectTrigger>
            <MobileSelectContent className="bg-elec-dark border-elec-yellow/20">
              {mcbRatings.map((rating) => (
                <MobileSelectItem key={rating} value={rating.toString()}>{rating}A</MobileSelectItem>
              ))}
            </MobileSelectContent>
          </MobileSelect>
        </>
      )}

      {protectionType === "rcbo" && (
        <>
          <MobileSelect value={rcboCurve} onValueChange={setRcboCurve}>
            <MobileSelectTrigger label="RCBO Curve Type (BS EN 61009-1)">
              <MobileSelectValue placeholder="Select curve type" />
            </MobileSelectTrigger>
            <MobileSelectContent className="bg-elec-dark border-elec-yellow/20">
              {Object.entries(curveTypes).map(([key, label]) => (
                <MobileSelectItem key={key} value={key}>{label}</MobileSelectItem>
              ))}
            </MobileSelectContent>
          </MobileSelect>

          <MobileSelect value={rcboRating} onValueChange={setRcboRating}>
            <MobileSelectTrigger label="RCBO Rating (A)">
              <MobileSelectValue placeholder="Select RCBO rating" />
            </MobileSelectTrigger>
            <MobileSelectContent className="bg-elec-dark border-elec-yellow/20">
              {mcbRatings.map((rating) => (
                <MobileSelectItem key={rating} value={rating.toString()}>{rating}A</MobileSelectItem>
              ))}
            </MobileSelectContent>
          </MobileSelect>
        </>
      )}

      {protectionType === "fuse" && (
        <>
          <MobileSelect value={fuseType} onValueChange={(value) => {
            setFuseType(value);
            setFusRating(""); // Reset rating when type changes
          }}>
            <MobileSelectTrigger label="Fuse Type">
              <MobileSelectValue placeholder="Select fuse type" />
            </MobileSelectTrigger>
            <MobileSelectContent className="bg-elec-dark border-elec-yellow/20 max-h-48">
              {Object.entries(fuseTypes).map(([key, label]) => (
                <MobileSelectItem key={key} value={key}>{label}</MobileSelectItem>
              ))}
            </MobileSelectContent>
          </MobileSelect>

          {fuseType && (
            <MobileSelect value={fusRating} onValueChange={setFusRating}>
              <MobileSelectTrigger label="Fuse Rating (A)">
                <MobileSelectValue placeholder="Select fuse rating" />
              </MobileSelectTrigger>
              <MobileSelectContent className="bg-elec-dark border-elec-yellow/20">
                {fuseRatings[fuseType as keyof typeof fuseRatings]?.map((rating) => (
                  <MobileSelectItem key={rating} value={rating.toString()}>
                    {rating}A
                  </MobileSelectItem>
                ))}
              </MobileSelectContent>
            </MobileSelect>
          )}
        </>
      )}

      {protectionType === "rcd" && setRcdRating && (
        <MobileSelect value={rcdRating} onValueChange={setRcdRating}>
          <MobileSelectTrigger label="RCD Rated Residual Current (mA)">
            <MobileSelectValue placeholder="Select RCD rating" />
          </MobileSelectTrigger>
          <MobileSelectContent className="bg-elec-dark border-elec-yellow/20">
            {rcdRatings.map((rating) => (
              <MobileSelectItem key={rating} value={rating.toString()}>{rating}mA</MobileSelectItem>
            ))}
          </MobileSelectContent>
        </MobileSelect>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <MobileInput
          label="External Earth Loop Impedance Ze (Ω)"
          type="text"
          inputMode="decimal"
          placeholder="e.g., 0.35"
          value={ze}
          onChange={(e) => setZe(e.target.value)}
          unit="Ω"
        />
        <MobileInput
          label="R1 + R2 (Ω)"
          type="text"
          inputMode="decimal"
          placeholder="e.g., 0.23"
          value={r1r2}
          onChange={(e) => setR1R2(e.target.value)}
          unit="Ω"
        />
      </div>

      <div className="flex gap-2">
        <MobileButton
          onClick={onCalculate}
          variant="elec"
          className="flex-1 min-h-[48px]"
          disabled={!protectionType ||
            (protectionType === "mcb" && (!mcbRating || !mcbCurve)) ||
            (protectionType === "rcbo" && (!rcboRating || !rcboCurve)) ||
            (protectionType === "fuse" && (!fuseType || !fusRating)) ||
            (protectionType === "rcd" && !rcdRating)
          }
        >
          <Calculator className="mr-2 h-4 w-4" />
          Calculate Zs
        </MobileButton>
        <MobileButton variant="elec-outline" onClick={onReset} className="min-h-[48px]">
          <RotateCcw className="h-4 w-4" />
        </MobileButton>
      </div>
    </div>
  );
};

export default ZsCalculatorForm;
