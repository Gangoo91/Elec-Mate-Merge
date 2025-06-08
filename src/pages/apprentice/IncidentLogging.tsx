
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, AlertTriangle, Search, Filter, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import IncidentForm from "@/components/apprentice/incident-logging/IncidentForm";
import IncidentList from "@/components/apprentice/incident-logging/IncidentList";
import IncidentStats from "@/components/apprentice/incident-logging/IncidentStats";
import IncidentGuidelines from "@/components/apprentice/incident-logging/IncidentGuidelines";

const IncidentLogging = () => {
  const [currentView, setCurrentView] = useState<'overview' | 'form' | 'view'>('overview');
  const [selectedIncidentId, setSelectedIncidentId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const handleCreateIncident = () => {
    setSelectedIncidentId(null);
    setCurrentView('form');
  };

  const handleEditIncident = (incidentId: string) => {
    setSelectedIncidentId(incidentId);
    setCurrentView('form');
  };

  const handleViewIncident = (incidentId: string) => {
    setSelectedIncidentId(incidentId);
    setCurrentView('view');
  };

  const handleBackToOverview = () => {
    setCurrentView('overview');
    setSelectedIncidentId(null);
  };

  if (currentView === 'form') {
    return (
      <div className="space-y-8 animate-fade-in">
        <IncidentForm 
          incidentId={selectedIncidentId}
          onBack={handleBackToOverview}
          onSave={handleBackToOverview}
        />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Incident Logging</h1>
          <p className="text-muted-foreground">Report and track workplace incidents, near misses, and safety concerns</p>
        </div>
        <div className="flex gap-2">
          <Link to="/apprentice/on-job-tools" className="flex-shrink-0">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Tools
            </Button>
          </Link>
          <Button onClick={handleCreateIncident} className="bg-elec-yellow/10 hover:bg-elec-yellow hover:text-black">
            <Plus className="mr-2 h-4 w-4" />
            New Incident
          </Button>
        </div>
      </div>

      <Tabs defaultValue="incidents" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="incidents" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            My Incidents
          </TabsTrigger>
          <TabsTrigger value="stats" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Statistics
          </TabsTrigger>
          <TabsTrigger value="guidelines" className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            Guidelines
          </TabsTrigger>
        </TabsList>

        <TabsContent value="incidents" className="space-y-6">
          {/* Enhanced Overview Header */}
          <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray via-elec-dark/50 to-elec-gray">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-elec-yellow/20 border border-elec-yellow/30">
                  <AlertTriangle className="h-8 w-8 text-elec-yellow" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-elec-yellow">Incident Management Centre</CardTitle>
                  <p className="text-muted-foreground">Comprehensive incident reporting and tracking system</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                Report workplace incidents, near misses, and safety concerns in compliance with UK health and safety regulations. 
                All reports are confidential and help improve workplace safety for everyone.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 rounded-lg bg-elec-dark/50 border border-elec-yellow/10">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-orange-400" />
                    <span className="text-sm font-medium">Report Incidents</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Document workplace incidents and near misses promptly
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-elec-dark/50 border border-elec-yellow/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Search className="h-5 w-5 text-blue-400" />
                    <span className="text-sm font-medium">Track Progress</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Monitor investigation status and follow-up actions
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-elec-dark/50 border border-elec-yellow/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-5 w-5 text-green-400" />
                    <span className="text-sm font-medium">Prevent Future</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Learn from incidents to improve workplace safety
                  </p>
                </div>
              </div>

              <div className="p-4 bg-elec-yellow/5 border border-elec-yellow/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-elec-yellow" />
                  <span className="text-sm font-medium text-elec-yellow">Important Reminder</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Report all incidents immediately to your supervisor. For serious injuries or dangerous occurrences, 
                  contact emergency services first, then complete this form as soon as it's safe to do so.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Filters */}
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filter Incidents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Search</label>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search incidents..."
                      className="pl-8 bg-elec-dark border-elec-yellow/20"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-elec-dark border-elec-yellow/20">
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="submitted">Submitted</SelectItem>
                      <SelectItem value="under_review">Under Review</SelectItem>
                      <SelectItem value="investigating">Investigating</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Type</label>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-elec-dark border-elec-yellow/20">
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="near_miss">Near Miss</SelectItem>
                      <SelectItem value="unsafe_practice">Unsafe Practice</SelectItem>
                      <SelectItem value="faulty_equipment">Faulty Equipment</SelectItem>
                      <SelectItem value="injury">Injury</SelectItem>
                      <SelectItem value="property_damage">Property Damage</SelectItem>
                      <SelectItem value="environmental">Environmental</SelectItem>
                      <SelectItem value="security">Security</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Incidents List */}
          <IncidentList 
            searchQuery={searchQuery}
            statusFilter={statusFilter}
            typeFilter={typeFilter}
            onEdit={handleEditIncident}
            onView={handleViewIncident}
          />
        </TabsContent>

        <TabsContent value="stats">
          <IncidentStats />
        </TabsContent>

        <TabsContent value="guidelines">
          <IncidentGuidelines />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IncidentLogging;
