import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { snagLists, closeoutReports, jobs, employees } from "@/data/employerMockData";
import { 
  ClipboardCheck, 
  Search, 
  Plus,
  Camera,
  CheckCircle2,
  AlertCircle,
  FileText,
  Download,
  User,
  Calendar,
  Briefcase
} from "lucide-react";

const snagStatusColors = {
  "Open": "bg-warning/20 text-warning",
  "Resolved": "bg-success/20 text-success",
  "In Progress": "bg-info/20 text-info",
  "Complete": "bg-success/20 text-success",
};

export const QualitySection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewSnag, setShowNewSnag] = useState(false);
  const [activeTab, setActiveTab] = useState("snags");

  const filteredSnags = snagLists.filter(snag =>
    snag.jobTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCloseouts = closeoutReports.filter(report =>
    report.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.client.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    totalSnags: snagLists.reduce((sum, s) => sum + s.items.length, 0),
    openSnags: snagLists.reduce((sum, s) => sum + s.items.filter(i => i.status === "Open").length, 0),
    resolvedSnags: snagLists.reduce((sum, s) => sum + s.items.filter(i => i.status === "Resolved").length, 0),
    closeouts: closeoutReports.length,
  };

  const handleCreateSnag = () => {
    toast({
      title: "Snag List Created",
      description: "New snag list has been created for the selected job.",
    });
    setShowNewSnag(false);
  };

  const handleResolveSnag = (snagListId: string, itemId: string) => {
    toast({
      title: "Snag Resolved",
      description: "The snag item has been marked as resolved.",
    });
  };

  const handleGenerateCloseout = (jobId: string) => {
    toast({
      title: "Closeout Report Generated",
      description: "The closeout report PDF has been generated.",
    });
  };

  const handleDownloadCloseout = (reportId: string) => {
    toast({
      title: "Download Started",
      description: "Closeout report is being downloaded...",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <ClipboardCheck className="h-6 w-6 text-elec-yellow" />
            Quality Assurance
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Snag lists, defect tracking, and closeout reports
          </p>
        </div>
        
        <Dialog open={showNewSnag} onOpenChange={setShowNewSnag}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Snag List
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Snag List</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Select Job</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a job..." />
                  </SelectTrigger>
                  <SelectContent>
                    {jobs.map(job => (
                      <SelectItem key={job.id} value={job.id}>{job.title} - {job.client}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>First Snag Item</Label>
                <Textarea placeholder="Describe the defect or issue..." />
              </div>
              <div className="space-y-2">
                <Label>Photo (optional)</Label>
                <Button variant="outline" className="w-full gap-2">
                  <Camera className="h-4 w-4" />
                  Add Photo
                </Button>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setShowNewSnag(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateSnag}>
                  Create Snag List
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-elec-gray border-border">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-foreground">{stats.totalSnags}</p>
            <p className="text-sm text-muted-foreground">Total Snags</p>
          </CardContent>
        </Card>
        <Card className="bg-elec-gray border-border">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-warning">{stats.openSnags}</p>
            <p className="text-sm text-muted-foreground">Open</p>
          </CardContent>
        </Card>
        <Card className="bg-elec-gray border-border">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-success">{stats.resolvedSnags}</p>
            <p className="text-sm text-muted-foreground">Resolved</p>
          </CardContent>
        </Card>
        <Card className="bg-elec-gray border-border">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-elec-yellow">{stats.closeouts}</p>
            <p className="text-sm text-muted-foreground">Closeouts</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by job..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="snags" className="gap-2">
            <AlertCircle className="h-4 w-4" />
            Snag Lists
          </TabsTrigger>
          <TabsTrigger value="closeouts" className="gap-2">
            <FileText className="h-4 w-4" />
            Closeout Reports
          </TabsTrigger>
        </TabsList>

        <TabsContent value="snags" className="mt-4 space-y-4">
          {filteredSnags.map((snagList) => (
            <Card key={snagList.id} className="bg-elec-gray border-border">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-muted-foreground" />
                      {snagList.jobTitle}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      Created by {snagList.createdBy} on {new Date(snagList.createdDate).toLocaleDateString('en-GB')}
                    </p>
                  </div>
                  <Badge className={snagStatusColors[snagList.status as keyof typeof snagStatusColors]}>
                    {snagList.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {snagList.items.map((item) => (
                  <div key={item.id} className="flex items-start justify-between p-3 bg-surface rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className={`p-1.5 rounded ${
                        item.status === "Resolved" ? "bg-success/20" : "bg-warning/20"
                      }`}>
                        {item.status === "Resolved" ? (
                          <CheckCircle2 className="h-4 w-4 text-success" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-warning" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm text-foreground">{item.description}</p>
                        {item.resolvedBy && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Resolved by {item.resolvedBy} on {new Date(item.resolvedDate!).toLocaleDateString('en-GB')}
                          </p>
                        )}
                      </div>
                    </div>
                    {item.status === "Open" && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleResolveSnag(snagList.id, item.id)}
                      >
                        Resolve
                      </Button>
                    )}
                  </div>
                ))}
                
                <div className="flex gap-2 pt-2">
                  <Button size="sm" variant="outline" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Snag
                  </Button>
                  {snagList.status === "Complete" && (
                    <Button size="sm" onClick={() => handleGenerateCloseout(snagList.jobId)} className="gap-2">
                      <FileText className="h-4 w-4" />
                      Generate Closeout
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="closeouts" className="mt-4 space-y-4">
          {filteredCloseouts.map((report) => {
            const linkedEmployees = employees.filter(e => report.elecIdLinked.includes(e.id));
            
            return (
              <Card key={report.id} className="bg-elec-gray border-border">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-3">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">{report.jobTitle}</h3>
                        <p className="text-sm text-muted-foreground">{report.client}</p>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Completed: {new Date(report.completedDate).toLocaleDateString('en-GB')}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          Signed off by {report.signedOffBy}
                        </span>
                      </div>

                      {/* Documents included */}
                      <div className="flex flex-wrap gap-1">
                        {report.documents.map((doc) => (
                          <Badge key={doc} variant="outline" className="text-xs">
                            <FileText className="h-3 w-3 mr-1" />
                            {doc}
                          </Badge>
                        ))}
                      </div>

                      {/* Linked Elec-IDs */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">Linked Elec-IDs:</span>
                        {linkedEmployees.map((emp) => (
                          <Badge key={emp.id} variant="secondary" className="text-xs">
                            {emp.name}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      {report.signedOff && (
                        <Badge className="bg-success/20 text-success">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Signed Off
                        </Badge>
                      )}
                      <Button onClick={() => handleDownloadCloseout(report.id)} className="gap-2">
                        <Download className="h-4 w-4" />
                        Download PDF
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>
      </Tabs>
    </div>
  );
};
