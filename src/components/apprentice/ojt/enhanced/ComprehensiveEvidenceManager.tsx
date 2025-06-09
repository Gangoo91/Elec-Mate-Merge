
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Upload, 
  FileText, 
  Image, 
  Video, 
  File,
  Camera,
  Link,
  Tag,
  Calendar,
  User,
  CheckCircle,
  Clock,
  Eye,
  Download,
  Share
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const ComprehensiveEvidenceManager = () => {
  const { toast } = useToast();
  
  const [evidenceForm, setEvidenceForm] = useState({
    title: "",
    description: "",
    type: "",
    category: "",
    unit: "",
    learningOutcome: "",
    tags: "",
    file: null as File | null
  });

  // Mock evidence items
  const evidenceItems = [
    {
      id: 1,
      title: "Socket Installation Photos",
      type: "Photo",
      category: "Practical Work",
      uploadDate: "2024-01-15",
      status: "Verified",
      unit: "Unit 301",
      tags: ["installation", "safety", "testing"],
      fileSize: "2.4 MB"
    },
    {
      id: 2,
      title: "Cable Calculation Worksheet",
      type: "Document",
      category: "Theory",
      uploadDate: "2024-01-12",
      status: "Under Review",
      unit: "Unit 202",
      tags: ["calculations", "theory", "design"],
      fileSize: "156 KB"
    },
    {
      id: 3,
      title: "Testing Procedure Video",
      type: "Video",
      category: "Practical Work",
      uploadDate: "2024-01-10",
      status: "Approved",
      unit: "Unit 303",
      tags: ["testing", "procedure", "safety"],
      fileSize: "24.8 MB"
    }
  ];

  const evidenceStats = {
    totalItems: 23,
    photos: 15,
    documents: 6,
    videos: 2,
    verified: 18,
    pending: 5
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setEvidenceForm(prev => ({ ...prev, file: e.target.files![0] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!evidenceForm.title || !evidenceForm.type || !evidenceForm.category) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Evidence Uploaded",
      description: "Your evidence has been uploaded and submitted for verification."
    });

    // Reset form
    setEvidenceForm({
      title: "",
      description: "",
      type: "",
      category: "",
      unit: "",
      learningOutcome: "",
      tags: "",
      file: null
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Verified":
        return <Badge className="bg-green-500">Verified</Badge>;
      case "Approved":
        return <Badge className="bg-blue-500">Approved</Badge>;
      case "Under Review":
        return <Badge className="bg-orange-500">Under Review</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "photo":
        return <Image className="h-4 w-4" />;
      case "video":
        return <Video className="h-4 w-4" />;
      case "document":
        return <FileText className="h-4 w-4" />;
      default:
        return <File className="h-4 w-4" />;
    }
  };

  const UploadForm = () => (
    <Card>
      <CardHeader>
        <CardTitle>Upload Evidence</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Evidence Title *</Label>
              <Input
                id="title"
                placeholder="e.g. Socket Installation Photos"
                value={evidenceForm.title}
                onChange={(e) => setEvidenceForm(prev => ({ ...prev, title: e.target.value }))}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="type">Evidence Type *</Label>
              <Select value={evidenceForm.type} onValueChange={(value) => setEvidenceForm(prev => ({ ...prev, type: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="photo">Photo</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="document">Document</SelectItem>
                  <SelectItem value="certificate">Certificate</SelectItem>
                  <SelectItem value="assessment">Assessment</SelectItem>
                  <SelectItem value="worksheet">Worksheet</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category">Category *</Label>
              <Select value={evidenceForm.category} onValueChange={(value) => setEvidenceForm(prev => ({ ...prev, category: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="practical-work">Practical Work</SelectItem>
                  <SelectItem value="theory">Theory & Calculations</SelectItem>
                  <SelectItem value="health-safety">Health & Safety</SelectItem>
                  <SelectItem value="assessment">Assessment</SelectItem>
                  <SelectItem value="project">Project Work</SelectItem>
                  <SelectItem value="research">Research</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="unit">Unit Reference</Label>
              <Select value={evidenceForm.unit} onValueChange={(value) => setEvidenceForm(prev => ({ ...prev, unit: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="unit-301">Unit 301</SelectItem>
                  <SelectItem value="unit-302">Unit 302</SelectItem>
                  <SelectItem value="unit-303">Unit 303</SelectItem>
                  <SelectItem value="unit-304">Unit 304</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe what this evidence shows..."
              value={evidenceForm.description}
              onChange={(e) => setEvidenceForm(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="learningOutcome">Learning Outcome</Label>
            <Textarea
              id="learningOutcome"
              placeholder="What learning outcome does this evidence demonstrate?"
              value={evidenceForm.learningOutcome}
              onChange={(e) => setEvidenceForm(prev => ({ ...prev, learningOutcome: e.target.value }))}
              rows={2}
            />
          </div>

          <div>
            <Label htmlFor="tags">Tags (comma separated)</Label>
            <Input
              id="tags"
              placeholder="installation, safety, testing"
              value={evidenceForm.tags}
              onChange={(e) => setEvidenceForm(prev => ({ ...prev, tags: e.target.value }))}
            />
          </div>

          <div>
            <Label htmlFor="file">Upload File</Label>
            <Input
              id="file"
              type="file"
              accept="image/*,video/*,.pdf,.doc,.docx,.xls,.xlsx"
              onChange={handleFileChange}
              className="cursor-pointer"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Supported formats: Images, Videos, PDF, Word, Excel (Max 50MB)
            </p>
          </div>

          <div className="flex gap-2">
            <Button type="submit" className="flex-1">
              <Upload className="h-4 w-4 mr-2" />
              Upload Evidence
            </Button>
            <Button type="button" variant="outline">
              <Camera className="h-4 w-4 mr-2" />
              Take Photo
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );

  const EvidenceStats = () => (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
      <Card>
        <CardContent className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{evidenceStats.totalItems}</div>
            <p className="text-sm text-muted-foreground">Total Items</p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{evidenceStats.photos}</div>
            <p className="text-sm text-muted-foreground">Photos</p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{evidenceStats.documents}</div>
            <p className="text-sm text-muted-foreground">Documents</p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{evidenceStats.videos}</div>
            <p className="text-sm text-muted-foreground">Videos</p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-500">{evidenceStats.verified}</div>
            <p className="text-sm text-muted-foreground">Verified</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Comprehensive Evidence Manager</h2>
          <p className="text-muted-foreground">Upload, organize, and manage all your training evidence</p>
        </div>
      </div>

      <EvidenceStats />

      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="upload" className="flex-1">Upload Evidence</TabsTrigger>
          <TabsTrigger value="manage" className="flex-1">Manage Evidence</TabsTrigger>
          <TabsTrigger value="organize" className="flex-1">Organize & Tag</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-6">
          <UploadForm />
          
          <Card>
            <CardHeader>
              <CardTitle>Evidence Guidelines</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Image className="h-4 w-4" />
                    Photo Evidence
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• High quality, well-lit images</li>
                    <li>• Show work progression</li>
                    <li>• Include safety measures</li>
                    <li>• Clear labelling where needed</li>
                  </ul>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Video className="h-4 w-4" />
                    Video Evidence
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Max 5 minutes duration</li>
                    <li>• Include clear narration</li>
                    <li>• Show complete procedures</li>
                    <li>• Good audio quality</li>
                  </ul>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Documents
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Clear, readable text</li>
                    <li>• Professional formatting</li>
                    <li>• Include calculations/workings</li>
                    <li>• Proper file naming</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="manage" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Evidence Library</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {evidenceItems.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        {getTypeIcon(item.type)}
                        <div>
                          <h3 className="font-semibold">{item.title}</h3>
                          <p className="text-sm text-muted-foreground">{item.category} • {item.fileSize}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(item.status)}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {item.uploadDate}
                      </div>
                      <div className="flex items-center gap-1">
                        <FileText className="h-3 w-3" />
                        {item.unit}
                      </div>
                      <div className="flex items-center gap-1">
                        <Tag className="h-3 w-3" />
                        {item.tags.join(", ")}
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                      <Button size="sm" variant="outline">
                        <Share className="h-4 w-4 mr-1" />
                        Share
                      </Button>
                      <Button size="sm" variant="outline">
                        <Link className="h-4 w-4 mr-1" />
                        Link to Portfolio
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="organize" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Organization Tools</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Categories</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 border rounded">
                      <span>Practical Work</span>
                      <Badge variant="secondary">15 items</Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 border rounded">
                      <span>Theory & Calculations</span>
                      <Badge variant="secondary">6 items</Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 border rounded">
                      <span>Health & Safety</span>
                      <Badge variant="secondary">2 items</Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Popular Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">installation</Badge>
                    <Badge variant="outline">safety</Badge>
                    <Badge variant="outline">testing</Badge>
                    <Badge variant="outline">calculations</Badge>
                    <Badge variant="outline">theory</Badge>
                    <Badge variant="outline">procedure</Badge>
                    <Badge variant="outline">design</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ComprehensiveEvidenceManager;
