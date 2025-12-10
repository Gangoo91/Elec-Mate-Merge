import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Calculator } from "lucide-react";
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
      <div>
        <Label htmlFor="protection-type">Protection Device Type</Label>
        <Select value={protectionType} onValueChange={setProtectionType}>
          <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
            <SelectValue placeholder="Select device type" />
          </SelectTrigger>
          <SelectContent className="bg-elec-dark border-elec-yellow/20">
            <SelectItem value="mcb">MCB (Miniature Circuit Breaker)</SelectItem>
            <SelectItem value="rcbo">RCBO (RCD + MCB)</SelectItem>
            <SelectItem value="fuse">Fuse</SelectItem>
            <SelectItem value="rcd">RCD Only (Table 41.5)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Disconnection Time Selector - for MCB, RCBO, and Fuse */}
      {(protectionType === "mcb" || protectionType === "rcbo" || protectionType === "fuse") && setDisconnectionTime && (
        <div>
          <Label htmlFor="disconnection-time">Disconnection Time</Label>
          <Select value={disconnectionTime} onValueChange={setDisconnectionTime}>
            <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
              <SelectValue placeholder="Select disconnection time" />
            </SelectTrigger>
            <SelectContent className="bg-elec-dark border-elec-yellow/20">
              {Object.entries(disconnectionTimes).map(([key, label]) => (
                <SelectItem key={key} value={key}>{label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {protectionType === "mcb" && (
        <>
          <div>
            <Label htmlFor="mcb-curve">MCB Curve Type (BS EN 60898)</Label>
            <Select value={mcbCurve} onValueChange={setMcbCurve}>
              <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                <SelectValue placeholder="Select curve type" />
              </SelectTrigger>
              <SelectContent className="bg-elec-dark border-elec-yellow/20">
                {Object.entries(curveTypes).map(([key, label]) => (
                  <SelectItem key={key} value={key}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="mcb-rating">MCB Rating (A)</Label>
            <Select value={mcbRating} onValueChange={setMcbRating}>
              <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                <SelectValue placeholder="Select MCB rating" />
              </SelectTrigger>
              <SelectContent className="bg-elec-dark border-elec-yellow/20">
                {mcbRatings.map((rating) => (
                  <SelectItem key={rating} value={rating.toString()}>{rating}A</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </>
      )}

      {protectionType === "rcbo" && (
        <>
          <div>
            <Label htmlFor="rcbo-curve">RCBO Curve Type (BS EN 61009-1)</Label>
            <Select value={rcboCurve} onValueChange={setRcboCurve}>
              <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                <SelectValue placeholder="Select curve type" />
              </SelectTrigger>
              <SelectContent className="bg-elec-dark border-elec-yellow/20">
                {Object.entries(curveTypes).map(([key, label]) => (
                  <SelectItem key={key} value={key}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="rcbo-rating">RCBO Rating (A)</Label>
            <Select value={rcboRating} onValueChange={setRcboRating}>
              <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                <SelectValue placeholder="Select RCBO rating" />
              </SelectTrigger>
              <SelectContent className="bg-elec-dark border-elec-yellow/20">
                {mcbRatings.map((rating) => (
                  <SelectItem key={rating} value={rating.toString()}>{rating}A</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </>
      )}

      {protectionType === "fuse" && (
        <>
          <div>
            <Label htmlFor="fuse-type">Fuse Type</Label>
            <Select value={fuseType} onValueChange={(value) => {
              setFuseType(value);
              setFusRating(""); // Reset rating when type changes
            }}>
              <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                <SelectValue placeholder="Select fuse type" />
              </SelectTrigger>
              <SelectContent className="bg-elec-dark border-elec-yellow/20 max-h-48">
                {Object.entries(fuseTypes).map(([key, label]) => (
                  <SelectItem key={key} value={key}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {fuseType && (
            <div>
              <Label htmlFor="fuse-rating">Fuse Rating (A)</Label>
              <Select value={fusRating} onValueChange={setFusRating}>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue placeholder="Select fuse rating" />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  {fuseRatings[fuseType as keyof typeof fuseRatings]?.map((rating) => (
                    <SelectItem key={rating} value={rating.toString()}>
                      {rating}A
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </>
      )}

      {protectionType === "rcd" && setRcdRating && (
        <div>
          <Label htmlFor="rcd-rating">RCD Rated Residual Current (mA)</Label>
          <Select value={rcdRating} onValueChange={setRcdRating}>
            <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
              <SelectValue placeholder="Select RCD rating" />
            </SelectTrigger>
            <SelectContent className="bg-elec-dark border-elec-yellow/20">
              {rcdRatings.map((rating) => (
                <SelectItem key={rating} value={rating.toString()}>{rating}mA</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="ze">External Earth Loop Impedance Ze (Ω)</Label>
          <Input
            id="ze"
            type="number"
            inputMode="decimal"
            placeholder="e.g., 0.35"
            className="bg-elec-dark border-elec-yellow/20"
            value={ze}
            onChange={(e) => setZe(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="r1r2">R1 + R2 (Ω)</Label>
          <Input
            id="r1r2"
            type="number"
            inputMode="decimal"
            placeholder="e.g., 0.23"
            className="bg-elec-dark border-elec-yellow/20"
            value={r1r2}
            onChange={(e) => setR1R2(e.target.value)}
          />
        </div>
      </div>

      <div className="flex gap-2">
        <Button 
          onClick={onCalculate} 
          className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
          disabled={!protectionType || 
            (protectionType === "mcb" && (!mcbRating || !mcbCurve)) ||
            (protectionType === "rcbo" && (!rcboRating || !rcboCurve)) ||
            (protectionType === "fuse" && (!fuseType || !fusRating)) ||
            (protectionType === "rcd" && !rcdRating)
          }
        >
          <Calculator className="mr-2 h-4 w-4" />
          Calculate Zs
        </Button>
        <Button variant="outline" onClick={onReset}>
          Reset
        </Button>
      </div>
    </div>
  );
};

export default ZsCalculatorForm;
