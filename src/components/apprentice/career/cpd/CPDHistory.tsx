
import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Download, Eye, FileText, Loader2, Clock, CheckCircle } from "lucide-react";
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
    <div className="space-y-6 animate-fade-in">
      {/* Search and Filters */}
      <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-elec-yellow/20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-elec-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="relative">
          <CardTitle className="flex items-center gap-3 text-white">
            <div className="p-2 rounded-lg bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30">
              <Filter className="h-5 w-5 text-elec-yellow" />
            </div>
            Filter CPD Records
          </CardTitle>
        </CardHeader>
        <CardContent className="relative">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
              <Input
                placeholder="Search activities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-11 bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-elec-yellow/50"
              />
            </div>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="h-11 bg-white/5 border-white/20 text-white">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent className="bg-elec-gray border-white/20">
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(([id, name]) => (
                  <SelectItem key={id} value={id}>{name}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={yearFilter} onValueChange={setYearFilter}>
              <SelectTrigger className="h-11 bg-white/5 border-white/20 text-white">
                <SelectValue placeholder="All Years" />
              </SelectTrigger>
              <SelectContent className="bg-elec-gray border-white/20">
                <SelectItem value="all">All Years</SelectItem>
                {years.map(year => (
                  <SelectItem key={year} value={year}>{year}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="h-11 bg-white/5 border-white/20 text-white">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent className="bg-elec-gray border-white/20">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-4 pt-4 border-t border-white/10">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-elec-yellow" />
                <span className="text-sm text-white">{filteredEntries.length} entries</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span className="text-sm text-white">Total: <span className="font-semibold text-elec-yellow">{totalHours} hours</span></span>
              </div>
            </div>
            <Button
              variant="outline"
              className="h-10 border-white/20 hover:bg-white/10 touch-manipulation active:scale-95 transition-all"
              disabled={filteredEntries.length === 0}
            >
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* CPD Entries List */}
      {loading ? (
        <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-elec-yellow/20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-48 h-48 bg-elec-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <CardContent className="p-8 text-center relative">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-elec-yellow" />
            <p className="text-white">Loading CPD entries...</p>
          </CardContent>
        </Card>
      ) : filteredEntries.length === 0 ? (
        <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-elec-yellow/20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-48 h-48 bg-elec-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <CardContent className="p-8 text-center relative">
            <div className="p-4 rounded-full bg-gradient-to-br from-white/10 to-white/5 border border-white/20 w-fit mx-auto mb-4">
              <Search className="h-8 w-8 text-white/50" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">No entries found</h3>
            <p className="text-white/70">No CPD entries match your current filters. Try adjusting your search criteria.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {filteredEntries.map((entry) => (
            <Card key={entry.id} className="bg-gradient-to-br from-elec-gray to-elec-card border-white/10 hover:border-elec-yellow/30 transition-all overflow-hidden relative group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-elec-yellow/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardContent className="p-4 relative">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-3 flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-white text-base">{entry.title}</h3>
                        {entry.description && (
                          <p className="text-sm text-white/60 mt-1 line-clamp-2">{entry.description}</p>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className={getStatusColor(entry.is_verified)}>
                          {entry.is_verified ? 'Verified' : 'Pending'}
                        </Badge>
                        {entry.evidence_files && entry.evidence_files.length > 0 && (
                          <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/30">
                            <FileText className="h-3 w-3 mr-1" />
                            Evidence
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="px-2 py-1 rounded bg-white/5 text-white/80">
                        {format(new Date(entry.date_completed), 'dd MMM yyyy')}
                      </span>
                      <span className="px-2 py-1 rounded bg-elec-yellow/10 text-elec-yellow font-medium">
                        {entry.hours} hours
                      </span>
                      <span className="px-2 py-1 rounded bg-white/5 text-white/80">
                        {categoryNames[entry.category] || entry.category}
                      </span>
                      <span className="px-2 py-1 rounded bg-white/5 text-white/80">
                        {activityTypeNames[entry.activity_type] || entry.activity_type}
                      </span>
                    </div>

                    {entry.learning_outcomes && entry.learning_outcomes.length > 0 && (
                      <div className="p-2 rounded-lg bg-green-500/10 border border-green-500/20">
                        <span className="text-xs text-green-400 font-medium">Learning outcomes:</span>
                        <p className="text-xs text-white/80 mt-1">{entry.learning_outcomes.join(', ')}</p>
                      </div>
                    )}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="h-10 w-10 p-0 border-white/20 hover:bg-white/10 hover:border-elec-yellow/30 flex-shrink-0 touch-manipulation"
                  >
                    <Eye className="h-4 w-4 text-white/70" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CPDHistory;
