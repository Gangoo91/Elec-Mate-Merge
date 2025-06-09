
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, FileText, CheckCircle, Clock } from "lucide-react";
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
    witness_name: "",
    date_achieved: new Date().toISOString().split('T')[0]
  });

  // Fetch evidence uploads
  const { data: evidenceItems = [] } = useQuery({
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
          file_url: `placeholder-file-${Date.now()}`, // In real app, would upload file first
          file_name: `${item.title}.pdf`,
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
        witness_name: "",
        date_achieved: new Date().toISOString().split('T')[0]
      });
      toast({
        title: "Evidence Added",
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Evidence</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{evidenceItems.length}</div>
            <p className="text-xs text-muted-foreground">
              Uploaded items
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verified</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {evidenceItems.filter(item => item.verification_status === 'verified').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Approved evidence
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {evidenceItems.filter(item => item.verification_status === 'pending').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Awaiting review
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <Upload className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {evidenceItems.filter(item => {
                const itemDate = new Date(item.created_at);
                const monthAgo = new Date();
                monthAgo.setMonth(monthAgo.getMonth() - 1);
                return itemDate >= monthAgo;
              }).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Recent uploads
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
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g. Installation Certificate"
                    value={evidenceItem.title}
                    onChange={(e) => setEvidenceItem(prev => ({ ...prev, title: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="date">Date Achieved</Label>
                  <Input
                    id="date"
                    type="date"
                    value={evidenceItem.date_achieved}
                    onChange={(e) => setEvidenceItem(prev => ({ ...prev, date_achieved: e.target.value }))}
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="evidence_type">Evidence Type</Label>
                <Select value={evidenceItem.evidence_type} onValueChange={(value) => setEvidenceItem(prev => ({ ...prev, evidence_type: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select evidence type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="certificate">Certificate</SelectItem>
                    <SelectItem value="photo">Photograph</SelectItem>
                    <SelectItem value="document">Document</SelectItem>
                    <SelectItem value="report">Report</SelectItem>
                    <SelectItem value="witness_statement">Witness Statement</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="unit_reference">Unit Reference</Label>
                  <Input
                    id="unit_reference"
                    placeholder="e.g. Unit 301"
                    value={evidenceItem.unit_reference}
                    onChange={(e) => setEvidenceItem(prev => ({ ...prev, unit_reference: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="witness_name">Witness Name</Label>
                  <Input
                    id="witness_name"
                    placeholder="e.g. Supervisor name"
                    value={evidenceItem.witness_name}
                    onChange={(e) => setEvidenceItem(prev => ({ ...prev, witness_name: e.target.value }))}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="learning_outcome">Learning Outcome</Label>
                <Textarea
                  id="learning_outcome"
                  placeholder="Describe what learning outcome this evidence demonstrates..."
                  value={evidenceItem.learning_outcome}
                  onChange={(e) => setEvidenceItem(prev => ({ ...prev, learning_outcome: e.target.value }))}
                  rows={2}
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Additional details about this evidence..."
                  value={evidenceItem.description}
                  onChange={(e) => setEvidenceItem(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                />
              </div>
              
              <Button type="submit" className="w-full" disabled={addEvidenceMutation.isPending}>
                {addEvidenceMutation.isPending ? "Adding..." : "Add Evidence"}
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
              {evidenceItems.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">
                  No evidence uploaded yet
                </p>
              ) : (
                evidenceItems.slice(0, 10).map((item) => (
                  <div key={item.id} className="border rounded-lg p-3">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{item.title}</h4>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(item.verification_status)}
                        <span className="text-sm text-muted-foreground capitalize">
                          {item.verification_status}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">
                      {item.evidence_type} • {new Date(item.date_achieved).toLocaleDateString()}
                    </p>
                    {item.learning_outcome && (
                      <p className="text-sm text-muted-foreground line-clamp-2">{item.learning_outcome}</p>
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
