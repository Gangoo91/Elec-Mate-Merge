
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator } from "lucide-react";
import { fuseTypes, fuseRatings } from "./ZsValuesData";

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
  onCalculate: () => void;
  onReset: () => void;
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
  onCalculate,
  onReset
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
          </SelectContent>
        </Select>
      </div>

      {protectionType === "mcb" && (
        <div>
          <Label htmlFor="mcb-rating">MCB Rating (A)</Label>
          <Select value={mcbRating} onValueChange={setMcbRating}>
            <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
              <SelectValue placeholder="Select MCB rating" />
            </SelectTrigger>
            <SelectContent className="bg-elec-dark border-elec-yellow/20">
              <SelectItem value="6">6A</SelectItem>
              <SelectItem value="10">10A</SelectItem>
              <SelectItem value="16">16A</SelectItem>
              <SelectItem value="20">20A</SelectItem>
              <SelectItem value="25">25A</SelectItem>
              <SelectItem value="32">32A</SelectItem>
              <SelectItem value="40">40A</SelectItem>
              <SelectItem value="50">50A</SelectItem>
              <SelectItem value="63">63A</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {protectionType === "rcbo" && (
        <div>
          <Label htmlFor="rcbo-rating">RCBO Rating (A)</Label>
          <Select value={rcboRating} onValueChange={setRcboRating}>
            <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
              <SelectValue placeholder="Select RCBO rating" />
            </SelectTrigger>
            <SelectContent className="bg-elec-dark border-elec-yellow/20">
              <SelectItem value="6">6A</SelectItem>
              <SelectItem value="10">10A</SelectItem>
              <SelectItem value="16">16A</SelectItem>
              <SelectItem value="20">20A</SelectItem>
              <SelectItem value="25">25A</SelectItem>
              <SelectItem value="32">32A</SelectItem>
              <SelectItem value="40">40A</SelectItem>
              <SelectItem value="50">50A</SelectItem>
              <SelectItem value="63">63A</SelectItem>
            </SelectContent>
          </Select>
        </div>
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

      <div className="flex gap-2">
        <Button 
          onClick={onCalculate} 
          className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
          disabled={!protectionType || 
            (protectionType === "mcb" && !mcbRating) ||
            (protectionType === "rcbo" && !rcboRating) ||
            (protectionType === "fuse" && (!fuseType || !fusRating))
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
