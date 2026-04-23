import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useCollege } from "@/contexts/CollegeContext";
import { Pill, type Tone } from "@/components/college/primitives";

interface SuggestedTag {
  criterionCode: string;
  criterionText: string;
  confidence: number; // 0-100
  reason: string;
  unit?: string;
}

interface SmartEvidenceTaggerProps {
  evidenceTitle?: string;
  evidenceDescription?: string;
  evidenceType?: "document" | "image" | "video" | "link" | "observation";
  fileName?: string;
  onTagsSelected?: (tags: string[]) => void;
  compact?: boolean;
}

// Assessment criteria keywords mapping for intelligent tagging
const criteriaKeywords: Record<string, { keywords: string[]; unit: string; text: string }> = {
  // Panel Building
  "PB1": { keywords: ["panel", "enclosure", "mounting", "din rail", "backplate", "cable entry"], unit: "Panel Building", text: "Select and install enclosures and mounting systems" },
  "PB2": { keywords: ["busbar", "distribution", "supply", "termination", "phase", "neutral"], unit: "Panel Building", text: "Install busbars and distribution systems" },
  "PB3": { keywords: ["circuit protection", "mcb", "rcbo", "fuse", "breaker", "discrimination"], unit: "Panel Building", text: "Install circuit protection devices" },
  "PB4": { keywords: ["wiring", "cable", "loom", "route", "ferrule", "termination"], unit: "Panel Building", text: "Wire and terminate panel components" },
  "PB5": { keywords: ["label", "identify", "mark", "documentation", "schedule"], unit: "Panel Building", text: "Label and document panel installations" },

  // Wiring Systems
  "WS1": { keywords: ["containment", "trunking", "tray", "conduit", "basket", "ladder rack"], unit: "Wiring Systems", text: "Install cable containment systems" },
  "WS2": { keywords: ["draw", "install cable", "cable pulling", "run cable", "route"], unit: "Wiring Systems", text: "Install cables in containment systems" },
  "WS3": { keywords: ["swa", "armoured", "gland", "earth continuity", "armour"], unit: "Wiring Systems", text: "Install and terminate SWA cables" },
  "WS4": { keywords: ["accessory", "socket", "switch", "fcu", "junction box", "ceiling rose"], unit: "Wiring Systems", text: "Install wiring accessories" },
  "WS5": { keywords: ["final circuit", "ring", "radial", "lighting circuit", "power circuit"], unit: "Wiring Systems", text: "Install final circuits" },

  // Fault Finding
  "FF1": { keywords: ["fault", "diagnose", "troubleshoot", "symptom", "identify fault"], unit: "Fault Finding", text: "Identify symptoms and causes of faults" },
  "FF2": { keywords: ["safe isolation", "isolate", "lock off", "prove dead", "secure isolation"], unit: "Fault Finding", text: "Apply safe isolation procedures" },
  "FF3": { keywords: ["test", "measurement", "meter", "insulation", "continuity", "loop"], unit: "Fault Finding", text: "Use test instruments for fault finding" },
  "FF4": { keywords: ["repair", "rectify", "replace", "fix fault", "correct"], unit: "Fault Finding", text: "Repair and rectify electrical faults" },
  "FF5": { keywords: ["record", "document", "report", "fault log", "handover"], unit: "Fault Finding", text: "Document faults and repairs" },

  // Testing
  "TS1": { keywords: ["visual inspection", "visual check", "inspect", "observe"], unit: "Testing", text: "Conduct visual inspections" },
  "TS2": { keywords: ["continuity", "r1+r2", "cpc", "protective conductor"], unit: "Testing", text: "Test continuity of protective conductors" },
  "TS3": { keywords: ["insulation resistance", "ir test", "megger", "500v"], unit: "Testing", text: "Test insulation resistance" },
  "TS4": { keywords: ["polarity", "phase rotation", "correct polarity"], unit: "Testing", text: "Verify polarity" },
  "TS5": { keywords: ["earth fault loop", "zs", "ze", "loop impedance"], unit: "Testing", text: "Measure earth fault loop impedance" },
  "TS6": { keywords: ["rcd", "trip time", "ramp test", "30ma"], unit: "Testing", text: "Test RCD operation" },
  "TS7": { keywords: ["certificate", "eicr", "electrical installation certificate", "minor works", "18th edition"], unit: "Testing", text: "Complete electrical certificates" },

  // Safe Working
  "SW1": { keywords: ["risk assessment", "hazard", "control measure", "risk"], unit: "Safe Working", text: "Conduct risk assessments" },
  "SW2": { keywords: ["ppe", "safety equipment", "protective equipment", "gloves", "goggles"], unit: "Safe Working", text: "Select and use appropriate PPE" },
  "SW3": { keywords: ["permit", "work permit", "hot work", "confined space"], unit: "Safe Working", text: "Work within permit systems" },
  "SW4": { keywords: ["working at height", "ladder", "scaffold", "access equipment"], unit: "Safe Working", text: "Apply working at height procedures" },

  // EPA Knowledge
  "K1": { keywords: ["electrical principles", "theory", "ohms law", "current", "voltage"], unit: "EPA Knowledge", text: "Apply electrical principles" },
  "K2": { keywords: ["regulation", "bs 7671", "guidance note", "wiring regulations"], unit: "EPA Knowledge", text: "Apply wiring regulations" },
  "K3": { keywords: ["design", "calculation", "cable sizing", "adiabatic"], unit: "EPA Knowledge", text: "Apply installation design principles" },
  "K4": { keywords: ["environmental", "sustainability", "energy efficiency", "renewable"], unit: "EPA Knowledge", text: "Apply environmental awareness" },
  "K5": { keywords: ["health safety", "legislation", "act", "coshh", "eawr"], unit: "EPA Knowledge", text: "Apply health and safety legislation" },

  // EPA Behaviours
  "B1": { keywords: ["communicate", "customer", "client", "explain", "discuss"], unit: "EPA Behaviours", text: "Communicate effectively with stakeholders" },
  "B2": { keywords: ["professional", "punctual", "reliable", "attitude", "conduct"], unit: "EPA Behaviours", text: "Demonstrate professional conduct" },
  "B3": { keywords: ["team", "collaborate", "work with", "support", "assist"], unit: "EPA Behaviours", text: "Work effectively in a team" },
  "B4": { keywords: ["problem solving", "initiative", "solution", "resolve", "adapt"], unit: "EPA Behaviours", text: "Apply problem-solving skills" },
  "B5": { keywords: ["quality", "attention to detail", "workmanship", "standard"], unit: "EPA Behaviours", text: "Demonstrate commitment to quality" },
};

export function SmartEvidenceTagger({
  evidenceTitle = "",
  evidenceDescription = "",
  evidenceType = "document",
  fileName = "",
  onTagsSelected,
  compact = false,
}: SmartEvidenceTaggerProps) {
  const { courses } = useCollege();
  const [title, setTitle] = useState(evidenceTitle);
  const [description, setDescription] = useState(evidenceDescription);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [suggestedTags, setSuggestedTags] = useState<SuggestedTag[]>([]);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);

  // AI-powered tag suggestion algorithm
  const analyzeEvidence = () => {
    setIsAnalyzing(true);

    // Simulate AI processing delay
    setTimeout(() => {
      const textToAnalyze = `${title} ${description} ${fileName}`.toLowerCase();
      const suggestions: SuggestedTag[] = [];

      // Analyze against each criterion
      Object.entries(criteriaKeywords).forEach(([code, data]) => {
        let matchScore = 0;
        const matchedKeywords: string[] = [];

        data.keywords.forEach(keyword => {
          if (textToAnalyze.includes(keyword.toLowerCase())) {
            matchScore += 20;
            matchedKeywords.push(keyword);
          }
        });

        // Cap at 95% confidence
        matchScore = Math.min(matchScore, 95);

        if (matchScore >= 20) {
          suggestions.push({
            criterionCode: code,
            criterionText: data.text,
            confidence: matchScore,
            reason: `Matched keywords: ${matchedKeywords.join(", ")}`,
            unit: data.unit,
          });
        }
      });

      // Sort by confidence and take top 5
      suggestions.sort((a, b) => b.confidence - a.confidence);
      setSuggestedTags(suggestions.slice(0, 5));
      setHasAnalyzed(true);
      setIsAnalyzing(false);
    }, 1500);
  };

  const toggleTag = (code: string) => {
    const newTags = selectedTags.includes(code)
      ? selectedTags.filter(t => t !== code)
      : [...selectedTags, code];
    setSelectedTags(newTags);
    onTagsSelected?.(newTags);
  };

  const getConfidenceTone = (confidence: number): Tone => {
    if (confidence >= 70) return "green";
    if (confidence >= 50) return "yellow";
    return "amber";
  };

  const getConfidenceDotClass = (confidence: number): string => {
    if (confidence >= 70) return "bg-green-400";
    if (confidence >= 50) return "bg-elec-yellow";
    return "bg-amber-400";
  };

  const getEvidenceTypeLabel = () => {
    switch (evidenceType) {
      case "image": return "Image";
      case "video": return "Video";
      case "link": return "Link";
      case "observation": return "Observation";
      default: return "Document";
    }
  };

  if (compact) {
    return (
      <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">SMART TAGGING</div>
            <h3 className="mt-1.5 text-base sm:text-lg font-semibold text-white tracking-tight">Evidence tagger</h3>
          </div>
          <Pill tone="yellow">AI</Pill>
        </div>
        <p className="mt-3 text-[13px] text-white/55 leading-relaxed">
          Automatically map evidence to assessment criteria using AI analysis
        </p>
        <div className="mt-4 flex items-center justify-between pt-4 border-t border-white/[0.06]">
          <span className="text-sm text-white/70">Auto-tag uploaded evidence</span>
          <span className="text-[13px] font-medium text-elec-yellow/90">→</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl">
      <div className="p-5 sm:p-6 pb-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">SMART TAGGING</div>
          <h3 className="mt-1.5 text-xl sm:text-2xl font-semibold text-white tracking-tight">Smart evidence tagger</h3>
        </div>
        <Pill tone="yellow">AI-Powered</Pill>
      </div>

      <div className="px-5 sm:px-6 pb-5 sm:pb-6 space-y-4">
        {/* Evidence Input */}
        <div className="space-y-3">
          <div>
            <Label htmlFor="evidence-title">Evidence Title</Label>
            <Input
              id="evidence-title"
              placeholder="e.g., Consumer unit installation at site visit"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="evidence-desc">Description</Label>
            <Textarea
              id="evidence-desc"
              placeholder="Describe what this evidence demonstrates..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 min-h-[80px]"
            />
          </div>

          {/* Evidence Type Indicator */}
          <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-black/30 border border-white/[0.06]">
            <span className="h-1.5 w-1.5 rounded-full bg-white/40" aria-hidden />
            <span className="text-[11px] uppercase tracking-[0.18em] text-white/55">{getEvidenceTypeLabel()}</span>
            {fileName && (
              <>
                <span className="text-white/60">·</span>
                <span className="text-sm truncate text-white/70">{fileName}</span>
              </>
            )}
          </div>
        </div>

        {/* Analyze Button */}
        <Button
          onClick={analyzeEvidence}
          disabled={isAnalyzing || (!title && !description)}
          className="w-full h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black rounded-full px-6 font-medium gap-2"
        >
          {isAnalyzing ? (
            <>
              <span className="h-4 w-4 rounded-full border-2 border-elec-yellow/30 border-t-elec-yellow animate-spin" aria-hidden />
              Analysing with AI...
            </>
          ) : (
            <>
              Analyse &amp; Suggest Tags
              <span aria-hidden>→</span>
            </>
          )}
        </Button>

        {/* Suggestions */}
        {hasAnalyzed && (
          <div className="space-y-3 pt-2">
            <div className="border-b border-white/[0.06] pb-3">
              <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">AI SUGGESTIONS</div>
              <h4 className="mt-1 text-base font-semibold text-white tracking-tight">Suggested criteria</h4>
            </div>

            {suggestedTags.length > 0 ? (
              <div className="space-y-2">
                {suggestedTags.map((tag) => {
                  const isSelected = selectedTags.includes(tag.criterionCode);
                  return (
                    <div
                      key={tag.criterionCode}
                      className={`p-4 rounded-xl border transition-all cursor-pointer touch-manipulation ${
                        isSelected
                          ? "border-elec-yellow/60 bg-elec-yellow/[0.06]"
                          : "border-white/[0.06] bg-black/30 hover:border-elec-yellow/40"
                      }`}
                      onClick={() => toggleTag(tag.criterionCode)}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3 min-w-0">
                          <span
                            aria-hidden
                            className={`mt-1 inline-flex items-center justify-center h-5 w-5 rounded-full border shrink-0 text-[11px] font-medium ${
                              isSelected
                                ? "bg-elec-yellow text-black border-elec-yellow"
                                : "border-white/30 text-white/75"
                            }`}
                          >
                            {isSelected ? "✓" : "+"}
                          </span>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <Pill tone="yellow" className="font-mono">
                                {tag.criterionCode}
                              </Pill>
                              <Pill tone="blue">{tag.unit}</Pill>
                            </div>
                            <p className="text-sm mt-2 text-white">{tag.criterionText}</p>
                            <p className="text-[11.5px] text-white/75 mt-1">{tag.reason}</p>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <Pill tone={getConfidenceTone(tag.confidence)}>
                            {tag.confidence}%
                          </Pill>
                          <p className="text-[10px] text-white/55 mt-1 uppercase tracking-[0.18em]">confidence</p>
                        </div>
                      </div>
                      <Progress value={tag.confidence} className="h-1 mt-3" />
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 px-6 rounded-xl bg-black/30 border border-white/[0.06]">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/70 text-lg">
                  ⋯
                </div>
                <p className="text-sm text-white mt-3 font-medium">No matching criteria found</p>
                <p className="text-[12.5px] text-white/75 mt-1">Try adding more detail to the description</p>
              </div>
            )}

            {/* Selected Summary */}
            {selectedTags.length > 0 && (
              <div className="border-t border-white/[0.06] pt-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">SELECTED</div>
                  <span className="text-[11.5px] text-white/75 tabular-nums">{selectedTags.length} selected</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedTags.map((code) => (
                    <button
                      key={code}
                      onClick={() => toggleTag(code)}
                      className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full border bg-elec-yellow/10 text-elec-yellow border-elec-yellow/30 hover:bg-elec-yellow/20 transition-colors touch-manipulation tabular-nums"
                    >
                      {code}
                      <span aria-hidden>×</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tips */}
        {!hasAnalyzed && (
          <div className="p-4 rounded-xl bg-black/30 border border-white/[0.06]">
            <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">TIPS</div>
            <p className="mt-1.5 text-sm font-medium text-white">Tips for better results</p>
            <ul className="mt-3 space-y-1.5 text-[12.5px] text-white/60">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1 w-1 rounded-full bg-white/40 shrink-0" aria-hidden />
                Include specific technical terms
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1 w-1 rounded-full bg-white/40 shrink-0" aria-hidden />
                Mention the type of work performed
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1 w-1 rounded-full bg-white/40 shrink-0" aria-hidden />
                Reference any testing or inspections
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
