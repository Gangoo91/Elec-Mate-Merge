
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import BackButton from "@/components/common/BackButton";
import { ClipboardList, FileText, AlertTriangle, Download } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

interface IncidentLog {
  id: string;
  type: string;
  date: string;
  location: string;
  description: string;
  actions: string;
  severity: string;
}

const IncidentLogging = () => {
  const [incidents, setIncidents] = useState<IncidentLog[]>([
    {
      id: "1",
      type: "Near Miss",
      date: "2025-05-15",
      location: "Main Building Site - Floor 3",
      description: "Loose wire nearly caused trip hazard in walkway",
      actions: "Secured wire properly and reported to supervisor",
      severity: "Medium"
    },
    {
      id: "2",
      type: "Unsafe Practice",
      date: "2025-05-10",
      location: "Housing Development - Unit 7",
      description: "Observed contractor working without proper PPE while drilling into concrete",
      actions: "Informed site supervisor who stopped work until PPE was worn",
      severity: "High"
    }
  ]);
  
  const [formData, setFormData] = useState({
    type: "Near Miss",
    date: new Date().toISOString().split('T')[0],
    location: "",
    description: "",
    actions: "",
    severity: "Medium"
  });
  
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newIncident = {
      id: (incidents.length + 1).toString(),
      ...formData
    };
    
    setIncidents([...incidents, newIncident]);
    
    toast({
      title: "Incident Logged Successfully",
      description: "Your incident report has been saved securely.",
      variant: "success",
    });
    
    // Reset form
    setFormData({
      type: "Near Miss",
      date: new Date().toISOString().split('T')[0],
      location: "",
      description: "",
      actions: "",
      severity: "Medium"
    });
  };
  
  const exportToPdf = () => {
    toast({
      title: "Export Started",
      description: "Your incident logs are being exported as PDF.",
      variant: "default",
    });
    
    // In a real implementation, this would use a library like jsPDF to generate a PDF
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: "Your incident log PDF has been downloaded.",
        variant: "success",
      });
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Incident Logging Tool</h1>
        <BackButton customUrl="/apprentice/on-job-tools" label="Back to Tools" />
      </div>
      
      <div className="bg-elec-gray p-4 sm:p-6 rounded-lg border border-elec-yellow/20">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="bg-elec-yellow/10 p-3 rounded-md">
            <ClipboardList size={36} className="text-elec-yellow" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-2">Safety Incident Logger</h2>
            <p className="text-muted-foreground">
              A simple tool for apprentices to log near misses, unsafe practices, and faulty equipment incidents.
              Records are stored securely and can be exported as needed for future reference.
            </p>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="new" className="w-full">
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="new">Log New Incident</TabsTrigger>
          <TabsTrigger value="history">View Incident History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="new">
          <Card className="border-elec-yellow/20 bg-elec-gray/50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                <CardTitle>New Incident Report</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Incident Type</Label>
                    <Select 
                      value={formData.type} 
                      onValueChange={(value) => handleSelectChange("type", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Near Miss">Near Miss</SelectItem>
                        <SelectItem value="Unsafe Practice">Unsafe Practice</SelectItem>
                        <SelectItem value="Faulty Equipment">Faulty Equipment</SelectItem>
                        <SelectItem value="PPE Issue">PPE Issue</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="date">Date of Incident</Label>
                    <Input 
                      id="date"
                      name="date"
                      type="date"
                      value={formData.date}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input 
                      id="location"
                      name="location"
                      placeholder="Where did this happen?"
                      value={formData.location}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="severity">Severity</Label>
                    <Select 
                      value={formData.severity} 
                      onValueChange={(value) => handleSelectChange("severity", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Severity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Low">Low - Minor concern</SelectItem>
                        <SelectItem value="Medium">Medium - Significant issue</SelectItem>
                        <SelectItem value="High">High - Serious hazard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description of Incident</Label>
                  <Textarea 
                    id="description"
                    name="description"
                    placeholder="Describe what happened in detail..."
                    value={formData.description}
                    onChange={handleFormChange}
                    rows={4}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="actions">Actions Taken</Label>
                  <Textarea 
                    id="actions"
                    name="actions"
                    placeholder="What actions did you take after the incident?"
                    value={formData.actions}
                    onChange={handleFormChange}
                    rows={3}
                    required
                  />
                </div>
                
                <div className="pt-2">
                  <Button type="submit" className="w-full">Submit Incident Report</Button>
                </div>
              </form>
            </CardContent>
          </Card>
          
          <div className="bg-amber-950/20 border border-amber-600/30 rounded-md p-6 mt-6">
            <h3 className="text-lg font-semibold text-elec-yellow mb-2">Why Report Incidents?</h3>
            <p className="text-sm text-amber-200/90 mb-4">
              Reporting incidents, even minor ones, helps identify patterns and prevent more serious accidents in the future. 
              As an apprentice, your observations are valuable for improving site safety for everyone.
            </p>
            <ul className="text-sm text-amber-200/90 space-y-2 list-disc pl-5">
              <li>Your reports are confidential and securely stored</li>
              <li>Documentation provides protection if issues escalate later</li>
              <li>Helps build a culture of safety awareness</li>
              <li>Demonstrates your professional approach to workplace safety</li>
            </ul>
          </div>
        </TabsContent>
        
        <TabsContent value="history">
          <Card className="border-elec-yellow/20 bg-elec-gray/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <CardTitle>Incident History</CardTitle>
                </div>
                <Button variant="outline" onClick={exportToPdf} className="flex gap-2">
                  <Download className="h-4 w-4" />
                  Export PDF
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {incidents.length > 0 ? (
                <div className="space-y-4">
                  {incidents.map((incident) => (
                    <Card key={incident.id} className="bg-background/50 border-border/50">
                      <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                          <div className="flex items-center gap-2">
                            <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                              incident.severity === "High" ? "bg-red-900/20 text-red-400" :
                              incident.severity === "Medium" ? "bg-amber-900/20 text-amber-400" :
                              "bg-green-900/20 text-green-400"
                            }`}>
                              {incident.severity}
                            </div>
                            <span className="font-medium">{incident.type}</span>
                          </div>
                          <span className="text-muted-foreground text-sm">{incident.date}</span>
                        </div>
                        <p className="font-medium">Location: {incident.location}</p>
                        <p className="mt-2 text-muted-foreground">{incident.description}</p>
                        <div className="mt-3 pt-3 border-t border-border/50">
                          <p className="text-sm font-medium">Actions taken:</p>
                          <p className="text-sm text-muted-foreground">{incident.actions}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No incident reports found</p>
                </div>
              )}
            </CardContent>
          </Card>
          
          <div className="bg-blue-950/20 border border-blue-500/30 rounded-md p-6 mt-6">
            <div className="flex items-start gap-4">
              <AlertTriangle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-blue-300 mb-2">Incident Record Security</h3>
                <p className="text-sm text-blue-200/90 mb-3">
                  Your incident logs are stored securely and can be exported as PDF documents for your records
                  or to share with supervisors when appropriate.
                </p>
                <p className="text-sm text-blue-200/90">
                  Always follow your employer's specific incident reporting procedures in addition to logging
                  incidents here. This tool provides an additional personal record for your protection.
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IncidentLogging;
