
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, FileText, Camera, Award } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const EvidenceUploadTab = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
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

  // Add evidence mutation
  const addEvidenceMutation = useMutation({
    mutationFn: async (item: typeof evidenceItem) => {
      if (!user?.id) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('evidence_uploads')
        .insert({
          user_id: user.id,
          file_url: '', // Would be populated with actual file upload
          file_name: `evidence_${Date.now()}`,
          ...item
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
      toast({
        title: "Evidence Uploaded",
        description: "Your evidence has been uploaded successfully."
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

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Evidence</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{evidenceUploads.length}</div>
            <p className="text-xs text-muted-foreground">
              Uploaded items
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verified</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {evidenceUploads.filter(item => item.verification_status === 'verified').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Verified evidence
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Upload className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {evidenceUploads.filter(item => item.verification_status === 'pending').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Awaiting review
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
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="e.g. Electrical Installation Certificate"
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
                    <SelectItem value="certificate">Certificate</SelectItem>
                    <SelectItem value="photo">Photo Evidence</SelectItem>
                    <SelectItem value="document">Document</SelectItem>
                    <SelectItem value="witness_statement">Witness Statement</SelectItem>
                    <SelectItem value="work_product">Work Product</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="learning_outcome">Learning Outcome</Label>
                <Input
                  id="learning_outcome"
                  placeholder="e.g. LO1: Install electrical wiring systems"
                  value={evidenceItem.learning_outcome}
                  onChange={(e) => setEvidenceItem(prev => ({ ...prev, learning_outcome: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="unit_reference">Unit Reference</Label>
                <Input
                  id="unit_reference"
                  placeholder="e.g. Unit 201"
                  value={evidenceItem.unit_reference}
                  onChange={(e) => setEvidenceItem(prev => ({ ...prev, unit_reference: e.target.value }))}
                />
              </div>

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
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the evidence and how it demonstrates competency..."
                  value={evidenceItem.description}
                  onChange={(e) => setEvidenceItem(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                />
              </div>
              
              <Button type="submit" className="w-full" disabled={addEvidenceMutation.isPending}>
                {addEvidenceMutation.isPending ? "Uploading..." : "Upload Evidence"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Recent Evidence
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {evidenceUploads.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">
                  No evidence uploaded yet
                </p>
              ) : (
                evidenceUploads.slice(0, 10).map((item) => (
                  <div key={item.id} className="border rounded-lg p-3">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{item.title}</h4>
                      <span className={`text-sm px-2 py-1 rounded ${
                        item.verification_status === 'verified' ? 'bg-green-500/20 text-green-400' :
                        item.verification_status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {item.verification_status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">
                      {item.evidence_type} • {new Date(item.date_achieved).toLocaleDateString()}
                    </p>
                    {item.learning_outcome && (
                      <p className="text-sm text-muted-foreground">{item.learning_outcome}</p>
                    )}
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EvidenceUploadTab;
