
import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Download, Eye, FileText, Loader2 } from "lucide-react";
import { useUnifiedCPD } from "@/hooks/cpd/useUnifiedCPD";
import { format } from "date-fns";

const CPDHistory = () => {
  const { entries, loading, deleteEntry, updateEntry } = useUnifiedCPD();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [yearFilter, setYearFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const categoryNames: Record<string, string> = {
    "technical-skills": "Technical Skills",
    "regulations-standards": "Regulations & Standards",
    "safety-health": "Safety & Health",
    "business-commercial": "Business & Commercial",
    "professional-ethics": "Professional Ethics",
    "environmental-sustainability": "Environmental Sustainability",
    "digital-technology": "Digital Technology",
    "customer-service": "Customer Service"
  };

  const activityTypeNames: Record<string, string> = {
    "formal-training": "Formal Training",
    "work-based-learning": "Work-based Learning",
    "self-directed-study": "Self-directed Study",
    "professional-activities": "Professional Activities",
    "conferences-seminars": "Conferences & Seminars",
    "mentoring": "Mentoring",
    "assessment-preparation": "Assessment Preparation"
  };

  const categories = Object.entries(categoryNames);
  
  const years = useMemo(() => {
    const entryYears = entries.map(entry => 
      new Date(entry.date_completed).getFullYear().toString()
    );
    return [...new Set(entryYears)].sort().reverse();
  }, [entries]);

  const filteredEntries = useMemo(() => {
    return entries.filter(entry => {
      const matchesSearch = entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (entry.description?.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = categoryFilter === "all" || entry.category === categoryFilter;
      const matchesYear = yearFilter === "all" || entry.date_completed.startsWith(yearFilter);
      const matchesStatus = statusFilter === "all" || 
        (statusFilter === "verified" && entry.is_verified) ||
        (statusFilter === "pending" && !entry.is_verified);
      
      return matchesSearch && matchesCategory && matchesYear && matchesStatus;
    });
  }, [entries, searchTerm, categoryFilter, yearFilter, statusFilter]);

  const getStatusColor = (isVerified: boolean) => {
    return isVerified 
      ? "bg-green-500/10 text-green-400 border-green-500/30"
      : "bg-amber-500/10 text-amber-400 border-amber-500/30";
  };

  const totalHours = filteredEntries.reduce((sum, entry) => sum + parseFloat(entry.hours.toString()), 0);

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-elec-yellow" />
            Filter CPD Records
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search activities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-elec-dark border-elec-yellow/20 text-white"
              />
            </div>
            
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="bg-elec-dark border-elec-yellow/20 text-white">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(([id, name]) => (
                  <SelectItem key={id} value={id}>{name}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={yearFilter} onValueChange={setYearFilter}>
              <SelectTrigger className="bg-elec-dark border-elec-yellow/20 text-white">
                <SelectValue placeholder="All Years" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                {years.map(year => (
                  <SelectItem key={year} value={year}>{year}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="bg-elec-dark border-elec-yellow/20 text-white">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>

            <Button 
              variant="outline" 
              className="border-elec-yellow/30 hover:bg-elec-yellow/10"
              disabled={filteredEntries.length === 0}
            >
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm text-muted-foreground">Showing {filteredEntries.length} entries</span>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Total Hours: </span>
              <span className="font-semibold text-elec-yellow">{totalHours}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CPD Entries List */}
      {loading ? (
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardContent className="p-8 text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-elec-yellow" />
            <p className="text-muted-foreground">Loading CPD entries...</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredEntries.map((entry) => (
            <Card key={entry.id} className="border-elec-yellow/20 bg-elec-gray hover:bg-elec-gray/80 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-start gap-3">
                      <div className="space-y-1 flex-1">
                        <h3 className="font-semibold text-white">{entry.title}</h3>
                        {entry.description && (
                          <p className="text-sm text-muted-foreground">{entry.description}</p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="outline" className={getStatusColor(entry.is_verified)}>
                          {entry.is_verified ? 'Verified' : 'Pending'}
                        </Badge>
                        {entry.evidence_files && entry.evidence_files.length > 0 && (
                          <Badge variant="outline" className="border-blue-500/30 text-blue-400">
                            <FileText className="h-3 w-3 mr-1" />
                            Evidence
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <span>{format(new Date(entry.date_completed), 'dd MMM yyyy')}</span>
                      <span>•</span>
                      <span>{entry.hours} hours</span>
                      <span>•</span>
                      <span>{categoryNames[entry.category] || entry.category}</span>
                      <span>•</span>
                      <span>{activityTypeNames[entry.activity_type] || entry.activity_type}</span>
                    </div>
                    
                    {entry.learning_outcomes && entry.learning_outcomes.length > 0 && (
                      <div className="text-sm">
                        <span className="text-muted-foreground">Learning outcomes:</span>
                        <p className="text-white mt-1">{entry.learning_outcomes.join(', ')}</p>
                      </div>
                    )}
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-elec-yellow/30 hover:bg-elec-yellow/10 ml-4"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {filteredEntries.length === 0 && (
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">No CPD entries found matching your criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CPDHistory;
