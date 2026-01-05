import { useState } from "react";
import { Shield, AlertTriangle, FileText, Users, Plus, Search, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/employer/DataTable";
import { StatusBadge } from "@/components/employer/StatusBadge";
import { safetyIncidents, rams, hrDocuments } from "@/data/employerMockData";

export function SafetyHRSection() {
  const [searchQuery, setSearchQuery] = useState("");

  const incidentColumns = [
    { key: "type", label: "Type" },
    { key: "description", label: "Description" },
    { key: "location", label: "Location" },
    { 
      key: "date", 
      label: "Date",
      render: (item: typeof safetyIncidents[0]) => (
        <span>{new Date(item.date).toLocaleDateString("en-GB")}</span>
      )
    },
    { key: "reportedBy", label: "Reported By" },
    { 
      key: "status", 
      label: "Status",
      render: (item: typeof safetyIncidents[0]) => (
        <StatusBadge status={item.status === "Resolved" ? "completed" : "pending"} />
      )
    },
  ];

  const ramsColumns = [
    { key: "project", label: "Project" },
    { key: "version", label: "Version" },
    { 
      key: "lastUpdated", 
      label: "Last Updated",
      render: (item: typeof rams[0]) => (
        <span>{new Date(item.lastUpdated).toLocaleDateString("en-GB")}</span>
      )
    },
    { 
      key: "reviewDate", 
      label: "Review Date",
      render: (item: typeof rams[0]) => (
        <span>{new Date(item.reviewDate).toLocaleDateString("en-GB")}</span>
      )
    },
    { 
      key: "status", 
      label: "Status",
      render: (item: typeof rams[0]) => (
        <StatusBadge status={item.status === "Approved" ? "approved" : "pending"} />
      )
    },
  ];

  const hrColumns = [
    { key: "name", label: "Document" },
    { key: "category", label: "Category" },
    { 
      key: "lastUpdated", 
      label: "Last Updated",
      render: (item: typeof hrDocuments[0]) => (
        <span>{new Date(item.lastUpdated).toLocaleDateString("en-GB")}</span>
      )
    },
    { key: "size", label: "Size" },
    { 
      key: "actions", 
      label: "",
      render: () => (
        <Button variant="ghost" size="sm">
          <Download className="h-4 w-4" />
        </Button>
      )
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Report Incident
          </Button>
          <Button size="sm">
            <FileText className="h-4 w-4 mr-2" />
            New RAMS
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="card-hover">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-success/10">
                <Shield className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-success">98%</p>
                <p className="text-sm text-muted-foreground">Safety Score</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="card-hover">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-warning/10">
                <AlertTriangle className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-warning">{safetyIncidents.length}</p>
                <p className="text-sm text-muted-foreground">Incidents (30d)</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="card-hover">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-elec-yellow/10">
                <FileText className="h-5 w-5 text-elec-yellow" />
              </div>
              <div>
                <p className="text-2xl font-bold text-elec-yellow">{rams.length}</p>
                <p className="text-sm text-muted-foreground">Active RAMS</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="card-hover">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-elec-yellow/10">
                <Users className="h-5 w-5 text-elec-yellow" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{hrDocuments.length}</p>
                <p className="text-sm text-muted-foreground">HR Documents</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="incidents" className="space-y-4">
        <TabsList>
          <TabsTrigger value="incidents">Incident Reports</TabsTrigger>
          <TabsTrigger value="rams">RAMS</TabsTrigger>
          <TabsTrigger value="hr">HR Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="incidents">
          <DataTable
            title="Recent Incidents"
            data={safetyIncidents}
            columns={incidentColumns}
          />
        </TabsContent>

        <TabsContent value="rams">
          <DataTable
            title="Risk Assessment Method Statements"
            data={rams}
            columns={ramsColumns}
          />
        </TabsContent>

        <TabsContent value="hr">
          <DataTable
            title="HR Documents & Policies"
            data={hrDocuments}
            columns={hrColumns}
          />
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <Card className="card-hover">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              <span className="text-sm">Report Incident</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
              <FileText className="h-5 w-5 text-elec-yellow" />
              <span className="text-sm">Create RAMS</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
              <Shield className="h-5 w-5 text-success" />
              <span className="text-sm">Safety Briefing</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
              <Users className="h-5 w-5 text-elec-yellow" />
              <span className="text-sm">Add Policy</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}