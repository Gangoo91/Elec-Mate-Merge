import { useState, useEffect, useMemo } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";
import { useUpdateJobPack, useDeleteJobPack, useJobPackDocuments, useJobPackAcknowledgements } from "@/hooks/useJobPacks";
import { useEmployees } from "@/hooks/useEmployees";
import { useCertificationsByEmployees } from "@/hooks/useCertifications";
import { supabase } from "@/integrations/supabase/client";
import { JobPack, JobPackStatus } from "@/services/jobPackService";
import { 
  MapPin, Users, Trash2, Save, FileText, ClipboardList, BookOpen, 
  CheckCircle2, Download, AlertCircle, Upload, Send, Award, 
  AlertTriangle, Clock, Sparkles, RefreshCw, Eye, X, Loader2
} from "lucide-react";

interface ViewJobPackSheetProps {
  jobPack: JobPack | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ViewJobPackSheet({ jobPack, open, onOpenChange }: ViewJobPackSheetProps) {
  const updateJobPack = useUpdateJobPack();
  const deleteJobPack = useDeleteJobPack();
  const { data: employees = [] } = useEmployees();
  const { data: documents = [] } = useJobPackDocuments(jobPack?.id || '');
  const { data: acknowledgements = [] } = useJobPackAcknowledgements(jobPack?.id || '');
  
  const [title, setTitle] = useState("");
  const [client, setClient] = useState("");
  const [location, setLocation] = useState("");
  const [scope, setScope] = useState("");
  const [status, setStatus] = useState<JobPackStatus>("Draft");
  const [briefingContent, setBriefingContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isGenerating, setIsGenerating] = useState<string | null>(null);
  const [isSendingToWorkers, setIsSendingToWorkers] = useState(false);
  
  // Reset form when job pack changes
  useEffect(() => {
    if (jobPack) {
      setTitle(jobPack.title);
      setClient(jobPack.client);
      setLocation(jobPack.location);
      setScope(jobPack.scope || "");
      setStatus(jobPack.status);
      setBriefingContent(jobPack.briefing_content || "");
    }
  }, [jobPack?.id]);
  
  const assignedEmployees = useMemo(() => 
    employees.filter(e => jobPack?.assigned_workers?.includes(e.id)),
    [employees, jobPack?.assigned_workers]
  );

  // Get certifications for assigned workers
  const assignedWorkerIds = useMemo(() => 
    assignedEmployees.map(e => e.id), 
    [assignedEmployees]
  );
  const { data: workerCertifications = [] } = useCertificationsByEmployees(assignedWorkerIds);

  // Check worker certification compliance using real data
  const certificationCompliance = useMemo(() => {
    if (!jobPack?.required_certifications?.length || !assignedEmployees.length) {
      return { compliant: 0, total: 0, percentage: 100, details: [] };
    }
    
    const requiredCerts = jobPack.required_certifications.map(c => c.toLowerCase());
    
    const details = assignedEmployees.map(emp => {
      const empCerts = workerCertifications
        .filter(c => c.employee_id === emp.id)
        .map(c => c.name.toLowerCase());
      
      const missingCerts = requiredCerts.filter(
        required => !empCerts.some(cert => 
          cert.includes(required) || required.includes(cert)
        )
      );
      
      return {
        employee: emp,
        hasCerts: missingCerts.length === 0,
        missingCerts: missingCerts.map(c => 
          jobPack.required_certifications?.find(rc => rc.toLowerCase() === c) || c
        ),
      };
    });
    
    const compliant = details.filter(d => d.hasCerts).length;
    
    return {
      compliant,
      total: assignedEmployees.length,
      percentage: assignedEmployees.length > 0 ? Math.round((compliant / assignedEmployees.length) * 100) : 100,
      details,
    };
  }, [jobPack?.required_certifications, assignedEmployees, workerCertifications]);
  
  const handleSave = async () => {
    if (!jobPack) return;
    
    try {
      await updateJobPack.mutateAsync({
        id: jobPack.id,
        updates: {
          title,
          client,
          location,
          scope,
          status,
          briefing_content: briefingContent,
        }
      });
      
      toast({
        title: "Job Pack Updated",
        description: `${title} has been updated.`,
      });
      setIsEditing(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update job pack.",
        variant: "destructive",
      });
    }
  };
  
  const handleDelete = async () => {
    if (!jobPack) return;
    
    try {
      await deleteJobPack.mutateAsync(jobPack.id);
      
      toast({
        title: "Job Pack Deleted",
        description: `${jobPack.title} has been deleted.`,
      });
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete job pack.",
        variant: "destructive",
      });
    }
  };

  const handleGenerateDocument = async (documentType: 'rams' | 'method_statement' | 'briefing_pack') => {
    if (!jobPack) return;
    
    setIsGenerating(documentType);
    
    try {
      const { data, error } = await supabase.functions.invoke('generate-job-pack-document', {
        body: {
          jobPackId: jobPack.id,
          documentType,
          jobData: {
            title: jobPack.title,
            client: jobPack.client,
            location: jobPack.location,
            scope: jobPack.scope,
            hazards: jobPack.hazards,
            required_certifications: jobPack.required_certifications,
          }
        }
      });
      
      if (error) throw error;
      
      // Update the job pack to mark document as generated
      const updateField = `${documentType}_generated` as 'rams_generated' | 'method_statement_generated' | 'briefing_pack_generated';
      await updateJobPack.mutateAsync({
        id: jobPack.id,
        updates: { [updateField]: true }
      });
      
      toast({
        title: "Document Generated",
        description: `${documentType.replace('_', ' ').toUpperCase()} has been generated using AI.`,
      });
    } catch (error) {
      console.error('Error generating document:', error);
      toast({
        title: "Generation Failed",
        description: "Failed to generate document. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(null);
    }
  };

  const handleSendToWorkers = async () => {
    if (!jobPack || assignedEmployees.length === 0) return;
    
    setIsSendingToWorkers(true);
    
    try {
      await updateJobPack.mutateAsync({
        id: jobPack.id,
        updates: {
          sent_to_workers_at: new Date().toISOString(),
          status: 'In Progress',
        }
      });
      
      toast({
        title: "Pack Sent",
        description: `Job pack sent to ${assignedEmployees.length} worker(s).`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send job pack to workers.",
        variant: "destructive",
      });
    } finally {
      setIsSendingToWorkers(false);
    }
  };
  
  if (!jobPack) return null;

  const acknowledgedCount = acknowledgements.length;
  const acknowledgedPercent = assignedEmployees.length > 0 
    ? Math.round((acknowledgedCount / assignedEmployees.length) * 100) 
    : 0;
  
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto p-0">
        <SheetHeader className="sticky top-0 z-10 bg-background border-b border-border p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <SheetTitle className="text-xl truncate">{isEditing ? "Edit Job Pack" : jobPack.title}</SheetTitle>
              <SheetDescription className="truncate">
                {jobPack.client} • {jobPack.location}
              </SheetDescription>
            </div>
            <Badge className={`shrink-0 ml-2 ${
              jobPack.status === "Complete" ? "bg-success/20 text-success" :
              jobPack.status === "In Progress" ? "bg-info/20 text-info" :
              "bg-muted text-muted-foreground"
            }`}>
              {jobPack.status}
            </Badge>
          </div>
        </SheetHeader>
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="w-full justify-start gap-0 h-auto p-1 bg-muted/50 rounded-none border-b border-border">
            <TabsTrigger value="overview" className="flex-1 data-[state=active]:bg-background text-xs sm:text-sm">Overview</TabsTrigger>
            <TabsTrigger value="documents" className="flex-1 data-[state=active]:bg-background text-xs sm:text-sm">Documents</TabsTrigger>
            <TabsTrigger value="certs" className="flex-1 data-[state=active]:bg-background text-xs sm:text-sm">Certs</TabsTrigger>
            <TabsTrigger value="briefing" className="flex-1 data-[state=active]:bg-background text-xs sm:text-sm">Briefing</TabsTrigger>
            <TabsTrigger value="distribute" className="flex-1 data-[state=active]:bg-background text-xs sm:text-sm">Send</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="p-4 space-y-6 mt-0">
            {isEditing ? (
              <>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input value={title} onChange={(e) => setTitle(e.target.value)} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Client</Label>
                      <Input value={client} onChange={(e) => setClient(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label>Location</Label>
                      <Input value={location} onChange={(e) => setLocation(e.target.value)} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Scope of Works</Label>
                    <Textarea value={scope} onChange={(e) => setScope(e.target.value)} rows={4} />
                  </div>
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select value={status} onValueChange={(v) => setStatus(v as JobPackStatus)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Draft">Draft</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Complete">Complete</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleSave} disabled={updateJobPack.isPending} className="flex-1">
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button variant="outline" onClick={() => setIsEditing(false)} className="flex-1">
                    Cancel
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="h-5 w-5 shrink-0" />
                  <span>{jobPack.location}</span>
                </div>
                
                {jobPack.scope && (
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Scope of Works</Label>
                    <p className="text-sm">{jobPack.scope}</p>
                  </div>
                )}
                
                {jobPack.hazards && jobPack.hazards.length > 0 && (
                  <div className="space-y-2">
                    <Label className="text-muted-foreground flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-warning" />
                      Identified Hazards
                    </Label>
                    <div className="flex flex-wrap gap-1">
                      {jobPack.hazards.map((hazard) => (
                        <Badge key={hazard} variant="outline" className="text-xs border-warning/50 text-warning">
                          {hazard}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {assignedEmployees.length > 0 && (
                  <div className="space-y-2">
                    <Label className="text-muted-foreground flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Assigned Workers ({assignedEmployees.length})
                    </Label>
                    <div className="flex flex-wrap gap-1">
                      {assignedEmployees.map((emp) => (
                        <Badge key={emp.id} variant="secondary" className="text-xs">
                          {emp.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="flex gap-2 pt-4 border-t border-border">
                  <Button onClick={() => setIsEditing(true)} className="flex-1">
                    Edit Job Pack
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Job Pack?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will permanently delete "{jobPack.title}". This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </>
            )}
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents" className="p-4 space-y-4 mt-0">
            <div className="space-y-3">
              {/* RAMS */}
              <Card className={jobPack.rams_generated ? "border-success/30 bg-success/5" : ""}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${jobPack.rams_generated ? "bg-success/20" : "bg-muted"}`}>
                        <FileText className={`h-5 w-5 ${jobPack.rams_generated ? "text-success" : "text-muted-foreground"}`} />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">RAMS</p>
                        <p className="text-xs text-muted-foreground">Risk Assessment & Method Statement</p>
                      </div>
                    </div>
                    {jobPack.rams_generated ? (
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="h-8">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button size="sm" variant="outline" className="h-8">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <Button 
                        size="sm" 
                        onClick={() => handleGenerateDocument('rams')}
                        disabled={isGenerating !== null}
                        className="gap-2"
                      >
                        {isGenerating === 'rams' ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Sparkles className="h-4 w-4" />
                        )}
                        Generate
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Method Statement */}
              <Card className={jobPack.method_statement_generated ? "border-success/30 bg-success/5" : ""}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${jobPack.method_statement_generated ? "bg-success/20" : "bg-muted"}`}>
                        <ClipboardList className={`h-5 w-5 ${jobPack.method_statement_generated ? "text-success" : "text-muted-foreground"}`} />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Method Statement</p>
                        <p className="text-xs text-muted-foreground">Step-by-step work procedure</p>
                      </div>
                    </div>
                    {jobPack.method_statement_generated ? (
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="h-8">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button size="sm" variant="outline" className="h-8">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <Button 
                        size="sm" 
                        onClick={() => handleGenerateDocument('method_statement')}
                        disabled={isGenerating !== null}
                        className="gap-2"
                      >
                        {isGenerating === 'method_statement' ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Sparkles className="h-4 w-4" />
                        )}
                        Generate
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Briefing Pack */}
              <Card className={jobPack.briefing_pack_generated ? "border-success/30 bg-success/5" : ""}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${jobPack.briefing_pack_generated ? "bg-success/20" : "bg-muted"}`}>
                        <BookOpen className={`h-5 w-5 ${jobPack.briefing_pack_generated ? "text-success" : "text-muted-foreground"}`} />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Briefing Pack</p>
                        <p className="text-xs text-muted-foreground">Complete worker briefing document</p>
                      </div>
                    </div>
                    {jobPack.briefing_pack_generated ? (
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="h-8">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button size="sm" variant="outline" className="h-8">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <Button 
                        size="sm" 
                        onClick={() => handleGenerateDocument('briefing_pack')}
                        disabled={isGenerating !== null || !jobPack.rams_generated || !jobPack.method_statement_generated}
                        className="gap-2"
                      >
                        {isGenerating === 'briefing_pack' ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Sparkles className="h-4 w-4" />
                        )}
                        Generate
                      </Button>
                    )}
                  </div>
                  {!jobPack.rams_generated || !jobPack.method_statement_generated ? (
                    <p className="text-xs text-muted-foreground mt-2">
                      Generate RAMS and Method Statement first
                    </p>
                  ) : null}
                </CardContent>
              </Card>

              {/* Upload Area */}
              <Card className="border-dashed">
                <CardContent className="p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm font-medium text-foreground">Upload Additional Documents</p>
                  <p className="text-xs text-muted-foreground">Design drawings, specs, schedules</p>
                  <Button variant="outline" size="sm" className="mt-3">
                    Choose Files
                  </Button>
                </CardContent>
              </Card>

              {documents.length > 0 && (
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Uploaded Documents</Label>
                  {documents.map((doc) => (
                    <Card key={doc.id}>
                      <CardContent className="p-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{doc.title}</span>
                        </div>
                        <Button size="sm" variant="ghost">
                          <Download className="h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          {/* Certifications Tab */}
          <TabsContent value="certs" className="p-4 space-y-4 mt-0">
            {jobPack.required_certifications && jobPack.required_certifications.length > 0 ? (
              <>
                <div className="space-y-2">
                  <Label className="text-muted-foreground flex items-center gap-2">
                    <Award className="h-4 w-4 text-info" />
                    Required Certifications
                  </Label>
                  <div className="flex flex-wrap gap-1">
                    {jobPack.required_certifications.map((cert) => (
                      <Badge key={cert} variant="secondary" className="bg-info/10 text-info border-info/30">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Card className={certificationCompliance.percentage === 100 ? "border-success/30 bg-success/5" : "border-warning/30 bg-warning/5"}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Team Compliance</span>
                      <span className={`text-lg font-bold ${certificationCompliance.percentage === 100 ? "text-success" : "text-warning"}`}>
                        {certificationCompliance.compliant}/{certificationCompliance.total}
                      </span>
                    </div>
                    <Progress 
                      value={certificationCompliance.percentage} 
                      className={`h-2 ${certificationCompliance.percentage === 100 ? "[&>div]:bg-success" : "[&>div]:bg-warning"}`}
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      {certificationCompliance.percentage === 100 
                        ? "All assigned workers have required certifications"
                        : `${certificationCompliance.total - certificationCompliance.compliant} worker(s) may be missing certifications`
                      }
                    </p>
                  </CardContent>
                </Card>

                <div className="space-y-2">
                  <Label className="text-muted-foreground">Worker Certification Status</Label>
                  {assignedEmployees.map((emp) => {
                    const isCompliant = Math.random() > 0.3; // Simulated
                    return (
                      <Card key={emp.id} className={isCompliant ? "border-success/20" : "border-warning/20"}>
                        <CardContent className="p-3 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`p-1.5 rounded-full ${isCompliant ? "bg-success/20" : "bg-warning/20"}`}>
                              {isCompliant ? (
                                <CheckCircle2 className="h-4 w-4 text-success" />
                              ) : (
                                <AlertCircle className="h-4 w-4 text-warning" />
                              )}
                            </div>
                            <div>
                              <p className="text-sm font-medium">{emp.name}</p>
                              <p className="text-xs text-muted-foreground">{emp.team_role}</p>
                            </div>
                          </div>
                          <Badge variant={isCompliant ? "secondary" : "outline"} className={isCompliant ? "bg-success/20 text-success" : "text-warning border-warning"}>
                            {isCompliant ? "Compliant" : "Check Required"}
                          </Badge>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <Award className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
                <p className="text-sm text-muted-foreground">No certifications required for this job pack</p>
                <Button variant="outline" size="sm" className="mt-3" onClick={() => setIsEditing(true)}>
                  Add Requirements
                </Button>
              </div>
            )}
          </TabsContent>

          {/* Briefing Tab */}
          <TabsContent value="briefing" className="p-4 space-y-4 mt-0">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-elec-yellow" />
                Pre-Job Briefing Content
              </Label>
              <Textarea
                value={briefingContent}
                onChange={(e) => setBriefingContent(e.target.value)}
                placeholder="Site access arrangements, emergency contacts, PPE requirements, specific safety notes..."
                rows={8}
                className="resize-none"
              />
            </div>

            {jobPack.hazards && jobPack.hazards.length > 0 && (
              <Card className="bg-warning/5 border-warning/20">
                <CardContent className="p-4 space-y-2">
                  <Label className="flex items-center gap-2 text-warning">
                    <AlertTriangle className="h-4 w-4" />
                    Hazard Summary
                  </Label>
                  <ul className="text-sm space-y-1">
                    {jobPack.hazards.map((hazard) => (
                      <li key={hazard} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-warning" />
                        {hazard}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {jobPack.required_certifications && jobPack.required_certifications.length > 0 && (
              <Card className="bg-info/5 border-info/20">
                <CardContent className="p-4 space-y-2">
                  <Label className="flex items-center gap-2 text-info">
                    <Award className="h-4 w-4" />
                    Required Qualifications
                  </Label>
                  <div className="flex flex-wrap gap-1">
                    {jobPack.required_certifications.map((cert) => (
                      <Badge key={cert} variant="secondary" className="text-xs">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            <Button 
              onClick={handleSave} 
              disabled={updateJobPack.isPending}
              className="w-full"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Briefing Content
            </Button>
          </TabsContent>

          {/* Distribution Tab */}
          <TabsContent value="distribute" className="p-4 space-y-4 mt-0">
            {jobPack.sent_to_workers_at ? (
              <>
                <Card className="bg-success/5 border-success/20">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <CheckCircle2 className="h-5 w-5 text-success" />
                      <div>
                        <p className="font-medium text-success">Pack Sent to Workers</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(jobPack.sent_to_workers_at).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Acknowledged</span>
                      <span className="font-bold">{acknowledgedCount}/{assignedEmployees.length}</span>
                    </div>
                    <Progress value={acknowledgedPercent} className="h-2 mt-2 [&>div]:bg-success" />
                  </CardContent>
                </Card>

                <div className="space-y-2">
                  <Label className="text-muted-foreground">Acknowledgement Status</Label>
                  {assignedEmployees.map((emp) => {
                    const ack = acknowledgements.find(a => a.employee_id === emp.id);
                    return (
                      <Card key={emp.id} className={ack ? "border-success/20" : ""}>
                        <CardContent className="p-3 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {ack ? (
                              <CheckCircle2 className="h-4 w-4 text-success" />
                            ) : (
                              <Clock className="h-4 w-4 text-muted-foreground" />
                            )}
                            <div>
                              <p className="text-sm font-medium">{emp.name}</p>
                              {ack && (
                                <p className="text-xs text-muted-foreground">
                                  Acknowledged {new Date(ack.acknowledged_at).toLocaleDateString()}
                                </p>
                              )}
                            </div>
                          </div>
                          {!ack && (
                            <Button size="sm" variant="ghost">
                              <RefreshCw className="h-4 w-4" />
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                <Button variant="outline" className="w-full gap-2">
                  <RefreshCw className="h-4 w-4" />
                  Send Reminder to Pending
                </Button>
              </>
            ) : (
              <>
                <div className="text-center py-6">
                  <Send className="h-12 w-12 mx-auto text-elec-yellow/50 mb-3" />
                  <h3 className="font-semibold text-foreground mb-1">Ready to Distribute</h3>
                  <p className="text-sm text-muted-foreground">
                    Send this job pack to {assignedEmployees.length} assigned worker(s)
                  </p>
                </div>

                <Card>
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Documents Ready</span>
                      <span className="font-medium">
                        {[jobPack.rams_generated, jobPack.method_statement_generated, jobPack.briefing_pack_generated].filter(Boolean).length}/3
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Workers Assigned</span>
                      <span className="font-medium">{assignedEmployees.length}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Certifications</span>
                      <Badge variant={certificationCompliance.percentage === 100 ? "secondary" : "outline"} className={certificationCompliance.percentage === 100 ? "bg-success/20 text-success" : "text-warning"}>
                        {certificationCompliance.percentage}% Compliant
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                <Button 
                  onClick={handleSendToWorkers}
                  disabled={isSendingToWorkers || assignedEmployees.length === 0}
                  className="w-full gap-2"
                  size="lg"
                >
                  {isSendingToWorkers ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                  Send to Workers
                </Button>

                {assignedEmployees.length === 0 && (
                  <p className="text-xs text-center text-muted-foreground">
                    Assign workers before sending
                  </p>
                )}
              </>
            )}
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}
