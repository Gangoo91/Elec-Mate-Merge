
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, FileText, Plus, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const EvidenceUploadTab = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const [evidenceItem, setEvidenceItem] = useState({
    title: "",
    description: "",
    evidence_type: "",
    learning_outcome: "",
    unit_reference: "",
    date_achieved: new Date().toISOString().split('T')[0],
    witness_name: ""
  });

  // Fetch evidence uploads
  const { data: evidenceUploads = [] } = useQuery({
    queryKey: ['evidence-uploads', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from('evidence_uploads')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!user?.id
  });

  // Add evidence upload mutation
  const addEvidenceMutation = useMutation({
    mutationFn: async (item: typeof evidenceItem) => {
      if (!user?.id) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('evidence_uploads')
        .insert({
          user_id: user.id,
          title: item.title,
          description: item.description,
          evidence_type: item.evidence_type,
          file_url: "placeholder-url", // This would be replaced with actual file upload
          file_name: `${item.title}.pdf`,
          learning_outcome: item.learning_outcome,
          unit_reference: item.unit_reference,
          date_achieved: item.date_achieved,
          witness_name: item.witness_name,
          verification_status: 'pending'
        });
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['evidence-uploads'] });
      setEvidenceItem({
        title: "",
        description: "",
        evidence_type: "",
        learning_outcome: "",
        unit_reference: "",
        date_achieved: new Date().toISOString().split('T')[0],
        witness_name: ""
      });
      setDialogOpen(false);
      toast({
        title: "Evidence Added",
        description: "Your evidence has been uploaded successfully."
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to add evidence. Please try again.",
        variant: "destructive"
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!evidenceItem.title || !evidenceItem.evidence_type) {
      toast({
        title: "Missing Information",
        description: "Please fill in title and evidence type.",
        variant: "destructive"
      });
      return;
    }
    addEvidenceMutation.mutate(evidenceItem);
  };

  const evidenceTypes = [
    "Practical Work Evidence",
    "Written Assessment",
    "Project Documentation",
    "Witness Statement",
    "Photographic Evidence",
    "Video Evidence",
    "Certificate/Qualification",
    "Professional Discussion"
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'rejected':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'text-green-500';
      case 'pending':
        return 'text-yellow-500';
      case 'rejected':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Evidence Management</h3>
          <p className="text-muted-foreground">
            Upload and track evidence for your learning outcomes and assessments
          </p>
        </div>
        
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Upload Evidence
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Upload Evidence</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Evidence Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g. Lighting Circuit Installation"
                    value={evidenceItem.title}
                    onChange={(e) => setEvidenceItem(prev => ({ ...prev, title: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="evidence_type">Evidence Type</Label>
                  <Select value={evidenceItem.evidence_type} onValueChange={(value) => setEvidenceItem(prev => ({ ...prev, evidence_type: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select evidence type" />
                    </SelectTrigger>
                    <SelectContent>
                      {evidenceTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the evidence and how it demonstrates your competency..."
                  value={evidenceItem.description}
                  onChange={(e) => setEvidenceItem(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="learning_outcome">Learning Outcome</Label>
                  <Input
                    id="learning_outcome"
                    placeholder="e.g. LO3: Install electrical systems"
                    value={evidenceItem.learning_outcome}
                    onChange={(e) => setEvidenceItem(prev => ({ ...prev, learning_outcome: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="unit_reference">Unit Reference</Label>
                  <Input
                    id="unit_reference"
                    placeholder="e.g. Unit 301"
                    value={evidenceItem.unit_reference}
                    onChange={(e) => setEvidenceItem(prev => ({ ...prev, unit_reference: e.target.value }))}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date_achieved">Date Achieved</Label>
                  <Input
                    id="date_achieved"
                    type="date"
                    value={evidenceItem.date_achieved}
                    onChange={(e) => setEvidenceItem(prev => ({ ...prev, date_achieved: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="witness_name">Witness Name</Label>
                  <Input
                    id="witness_name"
                    placeholder="Supervisor or mentor name"
                    value={evidenceItem.witness_name}
                    onChange={(e) => setEvidenceItem(prev => ({ ...prev, witness_name: e.target.value }))}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="file">Upload File</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-400">
                    PDF, DOC, JPG, PNG up to 10MB
                  </p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button type="submit" disabled={addEvidenceMutation.isPending} className="flex-1">
                  {addEvidenceMutation.isPending ? "Uploading..." : "Upload Evidence"}
                </Button>
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {evidenceUploads.length === 0 ? (
          <Card className="col-span-full">
            <CardContent className="flex flex-col items-center justify-center py-8">
              <FileText className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No Evidence Uploaded Yet</h3>
              <p className="text-muted-foreground text-center mb-4">
                Start uploading evidence to demonstrate your competencies and track your progress
              </p>
              <Button onClick={() => setDialogOpen(true)} className="gap-2">
                <Upload className="h-4 w-4" />
                Upload Your First Evidence
              </Button>
            </CardContent>
          </Card>
        ) : (
          evidenceUploads.map((item) => (
            <Card key={item.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{item.evidence_type}</p>
                  </div>
                  <div className={`flex items-center gap-1 ${getStatusColor(item.verification_status)}`}>
                    {getStatusIcon(item.verification_status)}
                    <span className="text-xs font-medium capitalize">
                      {item.verification_status}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {item.description && (
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                )}
                
                {item.learning_outcome && (
                  <div>
                    <span className="text-sm font-medium">Learning Outcome: </span>
                    <span className="text-sm">{item.learning_outcome}</span>
                  </div>
                )}
                
                {item.unit_reference && (
                  <div>
                    <span className="text-sm font-medium">Unit: </span>
                    <span className="text-sm">{item.unit_reference}</span>
                  </div>
                )}
                
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Achieved: {new Date(item.date_achieved).toLocaleDateString()}</span>
                  {item.witness_name && <span>Witness: {item.witness_name}</span>}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default EvidenceUploadTab;
