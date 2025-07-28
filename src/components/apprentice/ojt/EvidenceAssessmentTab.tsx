import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Filter, Eye, Trash2, ExternalLink, FileText, Image, Film, Plus, Clock, Tag, User, CheckCircle } from "lucide-react";
import { useTrainingEvidenceDB, type TrainingEvidenceData } from "@/hooks/training-evidence/useTrainingEvidenceDB";
import { format } from "date-fns";

const EvidenceAssessmentTab = () => {
  const { evidenceItems, isLoading, isUploading, addEvidence, deleteEvidence } = useTrainingEvidenceDB();
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [selectedEvidence, setSelectedEvidence] = useState<TrainingEvidenceData | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    evidence_type: "",
    date_achieved: new Date().toISOString().split('T')[0],
    time_spent: 60,
    witness_name: "",
    tags: [] as string[],
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [customTag, setCustomTag] = useState("");

  const evidenceTypes = [
    "Workshop Activity",
    "Site Visit",
    "College Session", 
    "Online Course",
    "Practical Assessment",
    "Written Assessment",
    "Project Work",
    "Safety Training",
    "Technical Documentation",
    "Peer Review"
  ];

  const suggestedTags = [
    "Electrical Installation", "Motor Controls", "Health & Safety", "Testing & Inspection",
    "Distribution Systems", "Lighting Systems", "Practical Work", "Theory", "Project Work",
    "BS7671 18th Edition", "Site Experience", "Workshop Training"
  ];

  // Filter evidence based on type and search
  const filteredEvidence = evidenceItems.filter(item => {
    const matchesFilter = selectedFilter === "all" || 
      item.evidence_type.toLowerCase().includes(selectedFilter.toLowerCase()) ||
      item.category?.toLowerCase().includes(selectedFilter.toLowerCase());
    
    const matchesSearch = searchTerm === "" ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesFilter && matchesSearch;
  });

  // Get file icon based on file type
  const getFileIcon = (fileName?: string) => {
    if (!fileName) return <FileText className="h-5 w-5" />;
    const ext = fileName.split('.').pop()?.toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext || '')) return <Image className="h-5 w-5" />;
    if (['mp4', 'avi', 'mov', 'wmv'].includes(ext || '')) return <Film className="h-5 w-5" />;
    return <FileText className="h-5 w-5" />;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addEvidence(formData, selectedFile || undefined);
      setShowUploadDialog(false);
      setFormData({
        title: "",
        description: "",
        evidence_type: "",
        date_achieved: new Date().toISOString().split('T')[0],
        time_spent: 60,
        witness_name: "",
        tags: [],
      });
      setSelectedFile(null);
      setCustomTag("");
    } catch (error) {
      console.error('Failed to upload evidence:', error);
    }
  };

  const addCustomTag = () => {
    if (customTag.trim() && !formData.tags.includes(customTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, customTag.trim()]
      }));
      setCustomTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const toggleSuggestedTag = (tag: string) => {
    if (formData.tags.includes(tag)) {
      removeTag(tag);
    } else {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }));
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">Loading evidence...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-lg font-semibold">Evidence Assessment & Management</h3>
          <p className="text-sm text-muted-foreground">
            Upload, manage, and assess your training evidence with smart categorisation
          </p>
        </div>
        
        <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Upload className="h-4 w-4" />
              Upload Evidence
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Upload Training Evidence</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Evidence Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Describe what this evidence shows"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="evidence_type">Evidence Type *</Label>
                  <Select value={formData.evidence_type} onValueChange={(value) => setFormData(prev => ({ ...prev, evidence_type: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select evidence type" />
                    </SelectTrigger>
                    <SelectContent>
                      {evidenceTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Provide details about what was learned or achieved"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date_achieved">Date Achieved</Label>
                  <Input
                    id="date_achieved"
                    type="date"
                    value={formData.date_achieved}
                    onChange={(e) => setFormData(prev => ({ ...prev, date_achieved: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time_spent">Time Spent (minutes)</Label>
                  <Input
                    id="time_spent"
                    type="number"
                    value={formData.time_spent}
                    onChange={(e) => setFormData(prev => ({ ...prev, time_spent: parseInt(e.target.value) || 0 }))}
                    min="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="witness_name">Witness/Supervisor</Label>
                  <Input
                    id="witness_name"
                    value={formData.witness_name}
                    onChange={(e) => setFormData(prev => ({ ...prev, witness_name: e.target.value }))}
                    placeholder="Optional"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="file">Upload File</Label>
                <Input
                  id="file"
                  type="file"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                  accept="image/*,video/*,.pdf,.doc,.docx,.txt"
                />
                {selectedFile && (
                  <p className="text-sm text-muted-foreground">
                    Selected: {selectedFile.name} ({Math.round(selectedFile.size / 1024)}KB)
                  </p>
                )}
              </div>

              {/* Tags Section */}
              <div className="space-y-3">
                <Label>Tags (Smart categorisation will add relevant tags automatically)</Label>
                
                {/* Selected Tags */}
                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="gap-1">
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-1 text-xs hover:text-destructive"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Custom Tag Input */}
                <div className="flex gap-2">
                  <Input
                    value={customTag}
                    onChange={(e) => setCustomTag(e.target.value)}
                    placeholder="Add custom tag"
                    className="flex-1"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomTag())}
                  />
                  <Button type="button" variant="outline" size="sm" onClick={addCustomTag}>
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>

                {/* Suggested Tags */}
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground">Suggested tags:</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestedTags.map((tag) => (
                      <Badge
                        key={tag}
                        variant={formData.tags.includes(tag) ? "default" : "outline"}
                        className="cursor-pointer hover:bg-primary/20"
                        onClick={() => toggleSuggestedTag(tag)}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={() => setShowUploadDialog(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isUploading || !formData.title || !formData.evidence_type}>
                  {isUploading ? "Uploading..." : "Upload Evidence"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search evidence by title, description, or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-elec-dark"
          />
        </div>
        <Select value={selectedFilter} onValueChange={setSelectedFilter}>
          <SelectTrigger className="w-full sm:w-48 bg-elec-dark">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Evidence</SelectItem>
            <SelectItem value="workshop">Workshop</SelectItem>
            <SelectItem value="site">Site Visit</SelectItem>
            <SelectItem value="college">College</SelectItem>
            <SelectItem value="online">Online</SelectItem>
            <SelectItem value="assessment">Assessment</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-elec-dark border-elec-slate">
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{evidenceItems.length}</div>
            <p className="text-sm text-muted-foreground">Total Evidence</p>
          </CardContent>
        </Card>
        <Card className="bg-elec-dark border-elec-slate">
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              {evidenceItems.filter(item => item.portfolio_linked).length}
            </div>
            <p className="text-sm text-muted-foreground">Portfolio Linked</p>
          </CardContent>
        </Card>
        <Card className="bg-elec-dark border-elec-slate">
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              {Math.round(evidenceItems.reduce((sum, item) => sum + (item.time_spent || 0), 0) / 60)}h
            </div>
            <p className="text-sm text-muted-foreground">Total Hours</p>
          </CardContent>
        </Card>
        <Card className="bg-elec-dark border-elec-slate">
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              {new Set(evidenceItems.flatMap(item => item.tags || [])).size}
            </div>
            <p className="text-sm text-muted-foreground">Unique Skills</p>
          </CardContent>
        </Card>
      </div>

      {/* Evidence Grid */}
      {filteredEvidence.length === 0 ? (
        <Card className="bg-elec-dark border-elec-slate">
          <CardContent className="p-8 text-center">
            <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Evidence Found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || selectedFilter !== "all" 
                ? "Try adjusting your search or filter criteria"
                : "Start building your evidence portfolio by uploading your first piece of evidence"
              }
            </p>
            <Button onClick={() => setShowUploadDialog(true)}>
              <Upload className="h-4 w-4 mr-2" />
              Upload First Evidence
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvidence.map((evidence) => (
            <Card key={evidence.id} className="bg-elec-dark border-elec-slate hover:border-primary/50 transition-colors">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1 flex-1">
                    <CardTitle className="text-base line-clamp-2">{evidence.title}</CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {evidence.evidence_type}
                      </Badge>
                      {evidence.portfolio_linked && (
                        <Badge variant="default" className="text-xs bg-green-600">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Synced
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedEvidence(evidence)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteEvidence(evidence.id!)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {evidence.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {evidence.description}
                  </p>
                )}
                
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {Math.round((evidence.time_spent || 0) / 60)}h
                  </div>
                  <div>{format(new Date(evidence.date_achieved), 'dd/MM/yyyy')}</div>
                  {evidence.witness_name && (
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {evidence.witness_name}
                    </div>
                  )}
                </div>

                {evidence.file_url && (
                  <div className="flex items-center gap-2 p-2 bg-background/50 rounded">
                    {getFileIcon(evidence.file_name)}
                    <span className="text-xs truncate flex-1">{evidence.file_name}</span>
                    <Button variant="ghost" size="sm" asChild>
                      <a href={evidence.file_url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </Button>
                  </div>
                )}

                {evidence.tags && evidence.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {evidence.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {evidence.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{evidence.tags.length - 3} more
                      </Badge>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Evidence Detail Dialog */}
      <Dialog open={!!selectedEvidence} onOpenChange={() => setSelectedEvidence(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedEvidence && (
            <div className="space-y-6">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {selectedEvidence.title}
                  {selectedEvidence.portfolio_linked && (
                    <Badge variant="default" className="bg-green-600">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Portfolio Synced
                    </Badge>
                  )}
                </DialogTitle>
              </DialogHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Evidence Details</h4>
                    <div className="space-y-2 text-sm">
                      <div><span className="font-medium">Type:</span> {selectedEvidence.evidence_type}</div>
                      <div><span className="font-medium">Category:</span> {selectedEvidence.category}</div>
                      <div><span className="font-medium">Date:</span> {format(new Date(selectedEvidence.date_achieved), 'dd/MM/yyyy')}</div>
                      <div><span className="font-medium">Time Spent:</span> {Math.round((selectedEvidence.time_spent || 0) / 60)} hours</div>
                      {selectedEvidence.witness_name && (
                        <div><span className="font-medium">Witness:</span> {selectedEvidence.witness_name}</div>
                      )}
                    </div>
                  </div>

                  {selectedEvidence.description && (
                    <div>
                      <h4 className="font-semibold mb-2">Description</h4>
                      <p className="text-sm text-muted-foreground">{selectedEvidence.description}</p>
                    </div>
                  )}

                  {selectedEvidence.tags && selectedEvidence.tags.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2">Skills & Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedEvidence.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">{tag}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {selectedEvidence.file_url && (
                  <div>
                    <h4 className="font-semibold mb-2">Attached File</h4>
                    <div className="border rounded p-4 bg-background/50">
                      <div className="flex items-center gap-3 mb-3">
                        {getFileIcon(selectedEvidence.file_name)}
                        <div className="flex-1">
                          <p className="font-medium">{selectedEvidence.file_name}</p>
                          {selectedEvidence.file_size && (
                            <p className="text-xs text-muted-foreground">
                              {Math.round(selectedEvidence.file_size / 1024)}KB
                            </p>
                          )}
                        </div>
                      </div>
                      <Button variant="outline" className="w-full" asChild>
                        <a href={selectedEvidence.file_url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Open File
                        </a>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EvidenceAssessmentTab;