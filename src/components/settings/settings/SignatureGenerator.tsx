import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Type } from "lucide-react";

interface SignatureGeneratorProps {
  onSave: (signatureData: string) => void;
  initialValue?: string;
}

const SIGNATURE_FONTS = [
  { id: "style1", name: "Elegant Script", font: "'Brush Script MT', cursive" },
  { id: "style2", name: "Classic Signature", font: "'Lucida Handwriting', cursive" },
  { id: "style3", name: "Modern Flow", font: "'Segoe Script', cursive" },
  { id: "style4", name: "Professional", font: "'Dancing Script', cursive" },
];

export function SignatureGenerator({ onSave, initialValue }: SignatureGeneratorProps) {
  const [text, setText] = useState("");
  const [selectedFont, setSelectedFont] = useState("style1");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    generateSignature();
  }, [text, selectedFont]);

  const generateSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas || !text) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Get selected font
    const font = SIGNATURE_FONTS.find(f => f.id === selectedFont)?.font || SIGNATURE_FONTS[0].font;

    // Draw text
    ctx.fillStyle = "#000000";
    ctx.font = `48px ${font}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);
  };

  const handleSave = () => {
    const canvas = canvasRef.current;
    if (!canvas || !text) return;

    const signatureData = canvas.toDataURL("image/png");
    onSave(signatureData);
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="signatureName" className="text-foreground flex items-center gap-2">
          <Type className="h-4 w-4 text-elec-yellow" />
          Your Name
        </Label>
        <Input
          id="signatureName"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your full name"
          className="mt-1.5"
        />
      </div>

      <div className="space-y-4">
        <Label className="text-foreground font-semibold">Select Font Style</Label>
        <RadioGroup 
          value={selectedFont} 
          onValueChange={setSelectedFont}
          className="grid grid-cols-2 gap-3"
        >
          {SIGNATURE_FONTS.map((font) => (
            <div 
              key={font.id}
              className="relative"
            >
              <RadioGroupItem
                value={font.id}
                id={font.id}
                className="peer sr-only"
              />
              <label
                htmlFor={font.id}
                className="flex flex-col items-center justify-center rounded-lg border-2 border-elec-gray-light bg-elec-gray-dark p-4 min-h-[52px] hover:border-elec-yellow/50 peer-data-[state=checked]:border-elec-yellow cursor-pointer active:scale-[0.98] transition-all touch-manipulation"
              >
                <span className="text-xs text-gray-400 mb-1">{font.name}</span>
                <span 
                  style={{ fontFamily: font.font, fontSize: '22px' }}
                  className="text-foreground"
                >
                  {text || 'Sample'}
                </span>
              </label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label className="text-foreground font-semibold">Preview</Label>
        <div className="w-full overflow-hidden">
          <div className="bg-white rounded-lg p-4">
            <canvas
              ref={canvasRef}
              width={400}
              height={150}
              className="w-full max-w-full h-auto"
            />
          </div>
        </div>
      </div>

      <Button
        type="button"
        onClick={handleSave}
        disabled={!text}
        className="w-full min-h-[48px] bg-elec-yellow text-black hover:bg-elec-yellow/90"
      >
        Save Signature
      </Button>
    </div>
  );
}
