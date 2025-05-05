
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { FileText, Upload, Calendar, Trash2, Eye } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for evidence
const mockEvidence = [
  {
    id: "ev1",
    title: "Site Visit - Commercial Installation",
    type: "Site Visit",
    date: "2024-04-02",
    description: "Accompanied senior electrician on a commercial site to observe three-phase distribution board installation.",
    files: ["site-visit-1.jpg", "site-visit-2.jpg"]
  },
  {
    id: "ev2",
    title: "College Workshop - Motor Controls",
    type: "Workshop",
    date: "2024-03-15",
    description: "Practical session on motor starter circuits and controls at college.",
    files: ["motor-controls-workshop.pdf"]
  }
];

const trainingTypes = [
  "Workshop",
  "Site Visit",
  "Online Course",
  "College Session",
  "Manufacturer Training",
  "Practical Exercise",
  "Seminar/Webinar",
  "Industry Event",
  "Shadowing",
  "Research Project",
  "Other"
];

const TrainingEvidence = () => {
  const { toast } = useToast();
  const [evidenceItems, setEvidenceItems] = useState(mockEvidence);
  const [isUploading, setIsUploading] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  const handleUploadEvidence = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    
    // Simulate upload delay
    setTimeout(() => {
      setIsUploading(false);
      toast({
        title: "Evidence uploaded",
        description: "Your training evidence has been successfully added to your records.",
      });
    }, 1500);
  };

  const handleDeleteEvidence = (id: string) => {
    setEvidenceItems(evidenceItems.filter(item => item.id !== id));
    toast({
      title: "Evidence deleted",
      description: "The evidence has been removed from your records.",
    });
  };

  const filteredEvidence = activeTab === "all" 
    ? evidenceItems 
    : evidenceItems.filter(item => item.type.toLowerCase() === activeTab);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-lg font-semibold">Training Evidence</h3>
          <p className="text-sm text-muted-foreground">
            Upload and manage evidence of your off-the-job training activities
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Upload className="h-4 w-4" />
              Add New Evidence
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add Training Evidence</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleUploadEvidence} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="evidence-title">Title</Label>
                <Input 
                  id="evidence-title" 
                  placeholder="Brief title of your training activity" 
                  required 
                  className="bg-elec-dark"
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="training-type">Training Type</Label>
                  <Select>
                    <SelectTrigger id="training-type" className="bg-elec-dark">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {trainingTypes.map(type => (
                        <SelectItem key={type} value={type.toLowerCase()}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="training-date">Date</Label>
                  <Input 
                    id="training-date" 
                    type="date" 
                    required 
                    className="bg-elec-dark"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="training-description">Description</Label>
                <Textarea 
                  id="training-description" 
                  placeholder="Describe what you learned and how it relates to your apprenticeship" 
                  required 
                  className="min-h-[100px] bg-elec-dark"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="evidence-files">Upload Files</Label>
                <Input 
                  id="evidence-files" 
                  type="file" 
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" 
                  required 
                  multiple
                  className="bg-elec-dark"
                />
                <p className="text-xs text-muted-foreground">
                  Upload photos, PDFs or documents that provide evidence of your training.
                  Max size: 10MB per file
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="hours-spent">Hours Spent</Label>
                <Input 
                  id="hours-spent" 
                  type="number" 
                  min="0.5" 
                  step="0.5"
                  placeholder="E.g., 3.5"  
                  required 
                  className="bg-elec-dark"
                />
                <p className="text-xs text-muted-foreground">
                  This will be added to your off-the-job training hours total
                </p>
              </div>
              
              <Button type="submit" className="w-full" disabled={isUploading}>
                {isUploading ? 'Uploading...' : 'Add to Training Record'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-elec-dark mb-4">
          <TabsTrigger value="all">All Evidence</TabsTrigger>
          <TabsTrigger value="workshop">Workshops</TabsTrigger>
          <TabsTrigger value="site visit">Site Visits</TabsTrigger>
          <TabsTrigger value="college session">College</TabsTrigger>
          <TabsTrigger value="online course">Online</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          {renderEvidenceItems(filteredEvidence, handleDeleteEvidence)}
        </TabsContent>
        <TabsContent value="workshop">
          {renderEvidenceItems(filteredEvidence, handleDeleteEvidence)}
        </TabsContent>
        <TabsContent value="site visit">
          {renderEvidenceItems(filteredEvidence, handleDeleteEvidence)}
        </TabsContent>
        <TabsContent value="college session">
          {renderEvidenceItems(filteredEvidence, handleDeleteEvidence)}
        </TabsContent>
        <TabsContent value="online course">
          {renderEvidenceItems(filteredEvidence, handleDeleteEvidence)}
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Helper function to render evidence items
const renderEvidenceItems = (items: any[], onDelete: (id: string) => void) => {
  if (items.length === 0) {
    return (
      <Card className="border-dashed border-2 border-elec-yellow/20 bg-elec-dark">
        <CardContent className="flex flex-col items-center justify-center py-10">
          <FileText className="h-12 w-12 text-elec-yellow/40 mb-4" />
          <h3 className="text-xl font-medium mb-2">No evidence found</h3>
          <p className="text-muted-foreground text-center max-w-md mb-4">
            Add evidence of your training activities to build a comprehensive record of your learning.
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Add Your First Evidence</Button>
            </DialogTrigger>
            <DialogContent>
              {/* Form content would go here (same as above) */}
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <Card key={item.id} className="border-elec-yellow/20 bg-elec-dark">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-elec-yellow" />
                  <h4 className="font-medium">{item.title}</h4>
                </div>
                <div className="flex items-center mt-1">
                  <span className="bg-elec-yellow/10 text-elec-yellow text-xs px-2 py-0.5 rounded-full">
                    {item.type}
                  </span>
                  <span className="text-xs text-muted-foreground ml-3 flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {item.date}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="h-8 w-8 p-0 text-red-400 hover:text-red-300"
                  onClick={() => onDelete(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <p className="mt-3 text-sm">
              {item.description}
            </p>
            
            <div className="mt-3">
              <p className="text-xs text-muted-foreground mb-1">Attached files:</p>
              <div className="flex flex-wrap gap-2">
                {item.files.map((file: string) => (
                  <div key={file} className="bg-elec-dark border border-elec-yellow/20 rounded px-2 py-1 text-xs flex items-center">
                    <FileText className="h-3 w-3 mr-1.5" />
                    {file}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TrainingEvidence;
