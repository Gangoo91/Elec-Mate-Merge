
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Camera, Download, Upload, CheckCircle, AlertCircle, Eye } from "lucide-react";

const EvidenceCollectionCard = () => {
  const [selectedEvidenceType, setSelectedEvidenceType] = useState<string | null>(null);

  const evidenceTypes = [
    {
      type: "Digital Evidence",
      icon: <Upload className="h-5 w-5 text-blue-400" />,
      description: "Electronic documentation and digital files",
      examples: [
        "Screenshots of completed online modules",
        "PDF certificates and transcripts",
        "Video recordings of practical demonstrations",
        "Digital portfolios and project files",
        "Learning management system reports"
      ],
      bestPractices: [
        "Use cloud storage for backup",
        "Organise files in dated folders",
        "Keep original file formats",
        "Include metadata where possible"
      ],
      tools: ["Google Drive", "OneDrive", "Dropbox", "Portfolio platforms"]
    },
    {
      type: "Physical Evidence",
      icon: <Camera className="h-5 w-5 text-green-400" />,
      description: "Tangible documentation and physical artefacts",
      examples: [
        "Printed certificates and awards",
        "Handwritten study notes and workbooks",
        "Physical project models or prototypes",
        "Signed witness statements",
        "Training attendance registers"
      ],
      bestPractices: [
        "Photograph important documents",
        "Store in protective folders",
        "Make digital copies as backup",
        "Date and label everything clearly"
      ],
      tools: ["Scanner apps", "Digital cameras", "Filing systems", "Protective sleeves"]
    },
    {
      type: "Observational Evidence",
      icon: <Eye className="h-5 w-5 text-purple-400" />,
      description: "Evidence gathered through direct observation",
      examples: [
        "Supervisor observation forms",
        "Peer assessment records",
        "Video recordings of skill demonstrations",
        "Live assessment feedback",
        "Professional discussions transcripts"
      ],
      bestPractices: [
        "Plan observations in advance",
        "Brief observers on requirements",
        "Use standardised forms",
        "Get immediate feedback recorded"
      ],
      tools: ["Observation forms", "Recording devices", "Assessment apps", "Feedback platforms"]
    },
    {
      type: "Reflective Evidence",
      icon: <FileText className="h-5 w-5 text-orange-400" />,
      description: "Personal reflection and learning documentation",
      examples: [
        "Learning diaries and journals",
        "Reflective essays and reports",
        "Personal development plans",
        "Self-assessment records",
        "Progress review notes"
      ],
      bestPractices: [
        "Write reflections regularly",
        "Be honest about challenges",
        "Link to learning outcomes",
        "Include action plans"
      ],
      tools: ["Digital journals", "Reflection templates", "Mind mapping", "Voice memos"]
    }
  ];

  const qualityStandards = [
    {
      standard: "Authenticity",
      description: "Evidence must be your own work",
      checkpoints: ["Original creation", "Proper attribution", "Personal involvement", "Honest representation"]
    },
    {
      standard: "Sufficiency",
      description: "Adequate amount to demonstrate competence",
      checkpoints: ["Covers all learning outcomes", "Multiple examples", "Different contexts", "Progressive development"]
    },
    {
      standard: "Currency",
      description: "Recent and up-to-date evidence",
      checkpoints: ["Within validity period", "Reflects current standards", "Recent achievements", "Updated knowledge"]
    },
    {
      standard: "Validity",
      description: "Directly relates to required standards",
      checkpoints: ["Mapped to outcomes", "Relevant content", "Appropriate level", "Clear connection"]
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-pink-500/10">
        <CardHeader>
          <CardTitle className="text-purple-400">Evidence Collection & Quality</CardTitle>
          <p className="text-sm text-muted-foreground">
            Best practices for collecting and maintaining high-quality training evidence
          </p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="types" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="types">Evidence Types</TabsTrigger>
              <TabsTrigger value="quality">Quality Standards</TabsTrigger>
              <TabsTrigger value="organisation">Organisation</TabsTrigger>
            </TabsList>
            
            <TabsContent value="types" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {evidenceTypes.map((evidence, index) => (
                  <div 
                    key={index} 
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedEvidenceType === evidence.type
                        ? "border-purple-500/50 bg-purple-500/20"
                        : "border-purple-500/20 bg-elec-gray/50 hover:border-purple-500/30"
                    }`}
                    onClick={() => setSelectedEvidenceType(
                      selectedEvidenceType === evidence.type ? null : evidence.type
                    )}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      {evidence.icon}
                      <h4 className="font-medium text-white">{evidence.type}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{evidence.description}</p>
                    
                    {selectedEvidenceType === evidence.type && (
                      <div className="space-y-3 animate-fade-in">
                        <div>
                          <span className="text-xs font-medium text-purple-400">Examples:</span>
                          <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                            {evidence.examples.map((example, idx) => (
                              <li key={idx} className="flex items-start gap-1">
                                <span className="text-purple-400">•</span>
                                {example}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <span className="text-xs font-medium text-green-400">Best Practices:</span>
                          <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                            {evidence.bestPractices.map((practice, idx) => (
                              <li key={idx} className="flex items-start gap-1">
                                <CheckCircle className="h-3 w-3 text-green-400 mt-0.5 flex-shrink-0" />
                                {practice}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <span className="text-xs font-medium text-blue-400">Recommended Tools:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {evidence.tools.map((tool, idx) => (
                              <Badge key={idx} className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
                                {tool}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="quality" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {qualityStandards.map((standard, index) => (
                  <div key={index} className="p-4 bg-elec-gray/50 rounded-lg border border-purple-500/20">
                    <h4 className="font-medium text-white mb-2">{standard.standard}</h4>
                    <p className="text-sm text-muted-foreground mb-3">{standard.description}</p>
                    
                    <div>
                      <span className="text-xs font-medium text-purple-400">Key Checkpoints:</span>
                      <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                        {standard.checkpoints.map((checkpoint, idx) => (
                          <li key={idx} className="flex items-start gap-1">
                            <CheckCircle className="h-3 w-3 text-green-400 mt-0.5 flex-shrink-0" />
                            {checkpoint}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="organisation" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-white">Digital Organisation Structure</h4>
                  <div className="p-4 bg-elec-gray/50 rounded-lg border border-purple-500/20">
                    <div className="space-y-2 text-sm font-mono">
                      <div className="text-purple-400">📁 Off-the-Job Training Evidence/</div>
                      <div className="ml-4 text-blue-400">📁 2024-2025/</div>
                      <div className="ml-8 text-green-400">📁 Month-01-September/</div>
                      <div className="ml-12 text-muted-foreground">📄 College-Attendance-Record.pdf</div>
                      <div className="ml-12 text-muted-foreground">📄 Online-Module-Certificate.pdf</div>
                      <div className="ml-8 text-green-400">📁 Month-02-October/</div>
                      <div className="ml-12 text-muted-foreground">📄 Workshop-Photos.jpg</div>
                      <div className="ml-12 text-muted-foreground">📄 Reflection-Log.docx</div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium text-white">Evidence Checklist</h4>
                  <div className="space-y-2">
                    {[
                      "Date and time recorded",
                      "Learning outcome mapped",
                      "Duration documented",
                      "Supervisor/tutor signature",
                      "Personal reflection included",
                      "Files properly named",
                      "Backup copies created",
                      "Portfolio updated"
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span className="text-muted-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default EvidenceCollectionCard;
