import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, PenTool, Trash2 } from "lucide-react";
import { format } from "date-fns";

interface Signoff {
  id: string;
  stage: string;
  signed_at: string;
  client_name: string;
}

interface PortalSignoffProps {
  token: string;
  jobId: string;
  clientName: string;
  existingSignoffs: Signoff[];
  onSignoffComplete: () => void;
}

const STAGES = [
  "First Fix Complete",
  "Second Fix Complete", 
  "Testing Complete",
  "Final Inspection",
  "Project Handover"
];

export default function PortalSignoff({ token, jobId, clientName, existingSignoffs, onSignoffComplete }: PortalSignoffProps) {
  const [selectedStage, setSelectedStage] = useState("");
  const [notes, setNotes] = useState("");
  const [isDrawing, setIsDrawing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  const signedStages = existingSignoffs.map(s => s.stage);
  const availableStages = STAGES.filter(s => !signedStages.includes(s));

  const handleMouseDown = () => setIsDrawing(true);
  const handleMouseUp = () => setIsDrawing(false);
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "hsl(var(--foreground))";
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "hsl(var(--foreground))";
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const clearCanvas = () => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      ctx.beginPath();
    }
  };

  const handleSubmit = async () => {
    if (!selectedStage || !canvasRef.current) {
      toast({ title: "Please select a stage and sign", variant: "destructive" });
      return;
    }

    const signatureData = canvasRef.current.toDataURL();
    
    // Check if canvas has content
    const ctx = canvasRef.current.getContext("2d");
    const imageData = ctx?.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
    const hasSignature = imageData?.data.some((pixel, i) => i % 4 === 3 && pixel > 0);

    if (!hasSignature) {
      toast({ title: "Please add your signature", variant: "destructive" });
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase
        .from("client_signoffs")
        .insert({
          job_id: jobId,
          access_token: token,
          stage: selectedStage,
          signature_data: signatureData,
          client_name: clientName,
          notes: notes.trim() || null
        });

      if (error) throw error;

      toast({ title: "Stage signed off successfully" });
      setSelectedStage("");
      setNotes("");
      clearCanvas();
      onSignoffComplete();
    } catch (err) {
      console.error("Error submitting signoff:", err);
      toast({ title: "Failed to submit signoff", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <CheckCircle className="h-5 w-5" />
          Stage Signoffs
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Existing Signoffs */}
        {existingSignoffs.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Completed Signoffs</p>
            {existingSignoffs.map((signoff) => (
              <div key={signoff.id} className="flex items-center justify-between p-2 bg-muted rounded-lg">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">{signoff.stage}</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {format(new Date(signoff.signed_at), "d MMM yyyy")}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* New Signoff Form */}
        {availableStages.length > 0 ? (
          <div className="space-y-4 pt-2 border-t">
            <p className="text-sm font-medium">Sign Off a Stage</p>
            
            <div className="flex flex-wrap gap-2">
              {availableStages.map((stage) => (
                <Button
                  key={stage}
                  variant={selectedStage === stage ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedStage(stage)}
                >
                  {stage}
                </Button>
              ))}
            </div>

            {selectedStage && (
              <>
                <div>
                  <label className="text-sm font-medium mb-2 block">Notes (optional)</label>
                  <Textarea
                    placeholder="Any comments or notes..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="resize-none"
                    rows={2}
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <PenTool className="h-4 w-4" />
                      Your Signature
                    </label>
                    <Button variant="ghost" size="sm" onClick={clearCanvas}>
                      <Trash2 className="h-4 w-4 mr-1" />
                      Clear
                    </Button>
                  </div>
                  <canvas
                    ref={canvasRef}
                    width={300}
                    height={120}
                    className="border rounded-lg w-full bg-background cursor-crosshair touch-none"
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    onMouseMove={handleMouseMove}
                    onTouchStart={() => setIsDrawing(true)}
                    onTouchEnd={() => setIsDrawing(false)}
                    onTouchMove={handleTouchMove}
                  />
                </div>

                <Button onClick={handleSubmit} disabled={submitting} className="w-full">
                  {submitting ? "Submitting..." : `Sign Off: ${selectedStage}`}
                </Button>
              </>
            )}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground text-center py-2">
            All stages have been signed off.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
