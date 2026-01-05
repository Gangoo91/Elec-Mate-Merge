import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Sparkles,
  Tag,
  FileText,
  CheckCircle2,
  PlusCircle,
  X,
  Upload,
  Image,
  FileVideo,
  Link2,
  Eye,
  ChevronRight,
  Loader2,
  AlertCircle,
  Lightbulb,
} from "lucide-react";
import { useCollege } from "@/contexts/CollegeContext";

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

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 70) return "text-success";
    if (confidence >= 50) return "text-elec-yellow";
    return "text-amber-500";
  };

  const getConfidenceBadgeColor = (confidence: number) => {
    if (confidence >= 70) return "bg-success/20 text-success border-success/30";
    if (confidence >= 50) return "bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30";
    return "bg-amber-500/20 text-amber-500 border-amber-500/30";
  };

  const getEvidenceIcon = () => {
    switch (evidenceType) {
      case "image": return Image;
      case "video": return FileVideo;
      case "link": return Link2;
      case "observation": return Eye;
      default: return FileText;
    }
  };

  const EvidenceIcon = getEvidenceIcon();

  if (compact) {
    return (
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-elec-yellow" />
            Smart Evidence Tagger
            <Badge className="bg-elec-yellow/20 text-elec-yellow text-[10px]">AI</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm text-muted-foreground mb-3">
            Automatically map evidence to assessment criteria using AI analysis
          </p>
          <div className="flex items-center justify-between p-2 rounded-lg bg-background border border-border">
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4 text-elec-yellow" />
              <span className="text-sm">Auto-tag uploaded evidence</span>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-elec-yellow" />
          Smart Evidence Tagger
          <Badge className="bg-elec-yellow/20 text-elec-yellow">AI-Powered</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
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
          <div className="flex items-center gap-2 p-2 rounded-lg bg-background border border-border">
            <EvidenceIcon className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground capitalize">{evidenceType}</span>
            {fileName && (
              <>
                <span className="text-muted-foreground">•</span>
                <span className="text-sm truncate">{fileName}</span>
              </>
            )}
          </div>
        </div>

        {/* Analyze Button */}
        <Button
          onClick={analyzeEvidence}
          disabled={isAnalyzing || (!title && !description)}
          className="w-full gap-2 bg-elec-yellow hover:bg-elec-yellow/90 text-black"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Analyzing with AI...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              Analyze & Suggest Tags
            </>
          )}
        </Button>

        {/* Suggestions */}
        {hasAnalyzed && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-elec-yellow" />
              <h3 className="text-sm font-semibold">AI Suggestions</h3>
            </div>

            {suggestedTags.length > 0 ? (
              <div className="space-y-2">
                {suggestedTags.map((tag) => (
                  <div
                    key={tag.criterionCode}
                    className={`p-3 rounded-lg border transition-all cursor-pointer ${
                      selectedTags.includes(tag.criterionCode)
                        ? "border-elec-yellow bg-elec-yellow/10"
                        : "border-border bg-background hover:border-elec-yellow/50"
                    }`}
                    onClick={() => toggleTag(tag.criterionCode)}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2">
                        {selectedTags.includes(tag.criterionCode) ? (
                          <CheckCircle2 className="h-5 w-5 text-elec-yellow mt-0.5 shrink-0" />
                        ) : (
                          <PlusCircle className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                        )}
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge variant="outline" className="font-mono text-xs">
                              {tag.criterionCode}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {tag.unit}
                            </Badge>
                          </div>
                          <p className="text-sm mt-1">{tag.criterionText}</p>
                          <p className="text-xs text-muted-foreground mt-1">{tag.reason}</p>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <Badge className={getConfidenceBadgeColor(tag.confidence)}>
                          {tag.confidence}%
                        </Badge>
                        <p className="text-[10px] text-muted-foreground mt-1">confidence</p>
                      </div>
                    </div>
                    <Progress value={tag.confidence} className="h-1 mt-2" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-muted-foreground">
                <AlertCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No matching criteria found</p>
                <p className="text-xs mt-1">Try adding more detail to the description</p>
              </div>
            )}

            {/* Selected Summary */}
            {selectedTags.length > 0 && (
              <div className="border-t border-border pt-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Selected Tags</span>
                  <span className="text-xs text-muted-foreground">{selectedTags.length} selected</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedTags.map((code) => (
                    <Badge
                      key={code}
                      className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30 cursor-pointer"
                      onClick={() => toggleTag(code)}
                    >
                      {code}
                      <X className="h-3 w-3 ml-1" />
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tips */}
        {!hasAnalyzed && (
          <div className="p-3 rounded-lg bg-info/10 border border-info/20">
            <div className="flex items-start gap-2">
              <Lightbulb className="h-4 w-4 text-info mt-0.5 shrink-0" />
              <div className="text-xs text-info">
                <p className="font-medium mb-1">Tips for better results:</p>
                <ul className="space-y-0.5 list-disc list-inside">
                  <li>Include specific technical terms</li>
                  <li>Mention the type of work performed</li>
                  <li>Reference any testing or inspections</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
