
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, FileText, Image, Video } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Evidence</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              Files uploaded
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Photos</CardTitle>
            <Image className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              Images uploaded
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Videos</CardTitle>
            <Video className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              Videos uploaded
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Upload Evidence
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Evidence Title</Label>
                <Input
                  id="title"
                  placeholder="e.g. Socket Installation Photo"
                  value={evidenceFile.title}
                  onChange={(e) => setEvidenceFile(prev => ({ ...prev, title: e.target.value }))}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="type">Evidence Type</Label>
                <Select value={evidenceFile.type} onValueChange={(value) => setEvidenceFile(prev => ({ ...prev, type: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select evidence type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="photo">Photo</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="document">Document</SelectItem>
                    <SelectItem value="certificate">Certificate</SelectItem>
                    <SelectItem value="assessment">Assessment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="file">Upload File</Label>
                <Input
                  id="file"
                  type="file"
                  accept="image/*,video/*,.pdf,.doc,.docx"
                  onChange={handleFileChange}
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description (optional)</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what this evidence shows..."
                  value={evidenceFile.description}
                  onChange={(e) => setEvidenceFile(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                />
              </div>
              
              <Button type="submit" className="w-full">
                Upload Evidence
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Evidence Guidelines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">Photo Evidence</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Clear, well-lit images</li>
                  <li>• Show work in progress and completion</li>
                  <li>• Include safety measures</li>
                  <li>• Maximum 10MB per file</li>
                </ul>
              </div>

              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">Video Evidence</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Maximum 2 minutes duration</li>
                  <li>• Show techniques and procedures</li>
                  <li>• Include clear narration if possible</li>
                  <li>• MP4 format preferred</li>
                </ul>
              </div>

              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">Documents</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Test certificates</li>
                  <li>• Risk assessments</li>
                  <li>• Method statements</li>
                  <li>• Training certificates</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EvidenceUploadTab;
