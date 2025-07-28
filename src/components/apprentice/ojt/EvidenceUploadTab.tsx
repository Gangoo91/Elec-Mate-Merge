
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MobileInputWrapper } from "@/components/ui/mobile-input-wrapper";
import { MobileSelectWrapper } from "@/components/ui/mobile-select-wrapper";
import { Textarea } from "@/components/ui/textarea";
import { Upload, FileText, Image, Video, Calendar, Clock, User, Tag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";

const EvidenceUploadTab = () => {
  const { toast } = useToast();
  
  const [evidenceFile, setEvidenceFile] = useState({
    title: "",
    description: "",
    type: "",
    file: null as File | null
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setEvidenceFile(prev => ({ ...prev, file: e.target.files![0] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!evidenceFile.title || !evidenceFile.type) {
      toast({
        title: "Missing Information",
        description: "Please fill in title and evidence type.",
        variant: "destructive"
      });
      return;
    }
    
    // For now, just show a toast - this would upload to storage in full implementation
    toast({
      title: "Evidence Uploaded",
      description: "Your evidence has been uploaded successfully."
    });
    
    setEvidenceFile({
      title: "",
      description: "",
      type: "",
      file: null
    });
  };

  const evidenceTypeOptions = [
    { value: "photo", label: "Photo" },
    { value: "video", label: "Video" },
    { value: "document", label: "Document" },
    { value: "certificate", label: "Certificate" },
    { value: "assessment", label: "Assessment" }
  ];

  return (
    <div className="min-h-screen bg-elec-dark px-4 py-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className="bg-elec-card border-elec-gray/50 hover:border-elec-yellow/30 transition-colors">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <FileText className="h-8 w-8 text-elec-yellow" />
              <div>
                <div className="text-2xl font-bold text-elec-light">12</div>
                <p className="text-xs text-elec-light/70">Total Evidence</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-elec-card border-elec-gray/50 hover:border-elec-yellow/30 transition-colors">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Image className="h-8 w-8 text-elec-yellow" />
              <div>
                <div className="text-2xl font-bold text-elec-light">8</div>
                <p className="text-xs text-elec-light/70">Photos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-elec-card border-elec-gray/50 hover:border-elec-yellow/30 transition-colors">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Video className="h-8 w-8 text-elec-yellow" />
              <div>
                <div className="text-2xl font-bold text-elec-light">3</div>
                <p className="text-xs text-elec-light/70">Videos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-elec-card border-elec-gray/50 hover:border-elec-yellow/30 transition-colors">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-8 w-8 text-elec-yellow" />
              <div>
                <div className="text-2xl font-bold text-elec-light">0h</div>
                <p className="text-xs text-elec-light/70">Total Hours</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upload Form */}
      <Card className="bg-elec-card border-elec-gray/50 mb-8">
        <CardHeader className="border-b border-elec-gray/30">
          <CardTitle className="flex items-center gap-3 text-elec-light">
            <div className="p-2 bg-elec-yellow/20 rounded-lg">
              <Upload className="h-5 w-5 text-elec-yellow" />
            </div>
            Upload Evidence
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <MobileInputWrapper
              label="Evidence Title"
              placeholder="e.g. Socket Installation Photo"
              value={evidenceFile.title}
              onChange={(value) => setEvidenceFile(prev => ({ ...prev, title: value }))}
              icon={<FileText className="h-5 w-5" />}
            />
            
            <MobileSelectWrapper
              label="Evidence Type"
              placeholder="Select evidence type"
              value={evidenceFile.type}
              onValueChange={(value) => setEvidenceFile(prev => ({ ...prev, type: value }))}
              options={evidenceTypeOptions}
            />
            
            {/* File Upload */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold text-elec-light flex items-center gap-2">
                <span className="w-1 h-4 bg-elec-yellow rounded-full"></span>
                Upload File
              </Label>
              <div className="relative group">
                <input
                  type="file"
                  accept="image/*,video/*,.pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer"
                />
                <div className="h-14 bg-elec-card border-2 border-elec-gray/50 rounded-xl text-elec-light hover:border-elec-yellow/40 transition-all duration-200 group-hover:shadow-lg group-hover:shadow-elec-yellow/10 flex items-center px-4">
                  <Upload className="h-5 w-5 text-elec-yellow/70 mr-3" />
                  <span className="text-sm text-elec-light/60">
                    {evidenceFile.file ? evidenceFile.file.name : "Choose file - No file chosen"}
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold text-elec-light flex items-center gap-2">
                <span className="w-1 h-4 bg-elec-yellow rounded-full"></span>
                Description (optional)
              </Label>
              <Textarea
                placeholder="Provide details about what was learned or achieved"
                value={evidenceFile.description}
                onChange={(e) => setEvidenceFile(prev => ({ ...prev, description: e.target.value }))}
                className="min-h-[100px] bg-elec-card border-2 border-elec-gray/50 rounded-xl text-elec-light hover:border-elec-yellow/40 focus:border-elec-yellow transition-all duration-200 placeholder:text-elec-light/60 resize-none"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full h-14 bg-gradient-to-r from-elec-yellow to-elec-yellow/80 hover:from-elec-yellow/90 hover:to-elec-yellow/70 text-elec-dark font-semibold rounded-xl transition-all duration-200"
            >
              <Upload className="h-5 w-5 mr-2" />
              Upload Evidence
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Guidelines */}
      <Card className="bg-elec-card border-elec-gray/50">
        <CardHeader className="border-b border-elec-gray/30">
          <CardTitle className="text-elec-light">Evidence Guidelines</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="border border-elec-gray/30 rounded-xl p-4 bg-elec-dark/30">
              <h4 className="font-semibold mb-3 text-elec-light flex items-center gap-2">
                <Image className="h-4 w-4 text-elec-yellow" />
                Photo Evidence
              </h4>
              <ul className="text-sm text-elec-light/70 space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-elec-yellow rounded-full"></span>
                  Clear, well-lit images
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-elec-yellow rounded-full"></span>
                  Show work in progress and completion
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-elec-yellow rounded-full"></span>
                  Include safety measures
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-elec-yellow rounded-full"></span>
                  Maximum 10MB per file
                </li>
              </ul>
            </div>

            <div className="border border-elec-gray/30 rounded-xl p-4 bg-elec-dark/30">
              <h4 className="font-semibold mb-3 text-elec-light flex items-center gap-2">
                <Video className="h-4 w-4 text-elec-yellow" />
                Video Evidence
              </h4>
              <ul className="text-sm text-elec-light/70 space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-elec-yellow rounded-full"></span>
                  Maximum 2 minutes duration
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-elec-yellow rounded-full"></span>
                  Show techniques and procedures
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-elec-yellow rounded-full"></span>
                  Include clear narration if possible
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-elec-yellow rounded-full"></span>
                  MP4 format preferred
                </li>
              </ul>
            </div>

            <div className="border border-elec-gray/30 rounded-xl p-4 bg-elec-dark/30">
              <h4 className="font-semibold mb-3 text-elec-light flex items-center gap-2">
                <FileText className="h-4 w-4 text-elec-yellow" />
                Documents
              </h4>
              <ul className="text-sm text-elec-light/70 space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-elec-yellow rounded-full"></span>
                  Test certificates
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-elec-yellow rounded-full"></span>
                  Risk assessments
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-elec-yellow rounded-full"></span>
                  Method statements
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-elec-yellow rounded-full"></span>
                  Training certificates
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EvidenceUploadTab;
