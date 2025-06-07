
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Download, Eye } from "lucide-react";

const CPDHistory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [yearFilter, setYearFilter] = useState("all");

  // Mock data - in real implementation this would come from the database
  const cpdEntries = [
    {
      id: 1,
      date: "2024-01-15",
      activity: "BS 7671 18th Edition Update Seminar",
      category: "Regulations & Standards",
      type: "Formal Learning",
      hours: 4,
      provider: "IET",
      status: "Verified"
    },
    {
      id: 2,
      date: "2024-01-10",
      activity: "Cable Sizing and Selection Workshop",
      category: "Technical Skills",
      type: "Work-based Learning",
      hours: 3,
      provider: "Company Training",
      status: "Pending"
    },
    {
      id: 3,
      date: "2024-01-05",
      activity: "Health & Safety Refresher Course",
      category: "Health & Safety",
      type: "Formal Learning",
      hours: 2,
      provider: "IOSH",
      status: "Verified"
    },
    {
      id: 4,
      date: "2023-12-20",
      activity: "Customer Service Excellence",
      category: "Customer Service",
      type: "Self-directed Learning",
      hours: 1.5,
      provider: "Online Course",
      status: "Verified"
    },
    {
      id: 5,
      date: "2023-12-15",
      activity: "Environmental Awareness Training",
      category: "Environmental Awareness",
      type: "Professional Activity",
      hours: 2,
      provider: "Environmental Agency",
      status: "Verified"
    }
  ];

  const categories = [
    "Technical Skills",
    "Regulations & Standards",
    "Health & Safety",
    "Management & Leadership",
    "Customer Service",
    "Environmental Awareness",
    "Quality Systems"
  ];

  const years = ["2024", "2023", "2022", "2021"];

  const filteredEntries = cpdEntries.filter(entry => {
    const matchesSearch = entry.activity.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.provider.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || entry.category === categoryFilter;
    const matchesYear = yearFilter === "all" || entry.date.startsWith(yearFilter);
    
    return matchesSearch && matchesCategory && matchesYear;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Verified": return "bg-green-500/10 text-green-400 border-green-500/30";
      case "Pending": return "bg-amber-500/10 text-amber-400 border-amber-500/30";
      default: return "bg-elec-yellow/10 text-elec-yellow border-elec-yellow/30";
    }
  };

  const totalHours = filteredEntries.reduce((sum, entry) => sum + entry.hours, 0);

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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
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

            <Button 
              variant="outline" 
              className="border-elec-yellow/30 hover:bg-elec-yellow/10"
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
      <div className="space-y-4">
        {filteredEntries.map((entry) => (
          <Card key={entry.id} className="border-elec-yellow/20 bg-elec-gray hover:bg-elec-gray/80 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2 flex-1">
                  <div className="flex items-start gap-3">
                    <div className="space-y-1 flex-1">
                      <h3 className="font-semibold text-white">{entry.activity}</h3>
                      <p className="text-sm text-muted-foreground">{entry.provider}</p>
                    </div>
                    <Badge variant="outline" className={getStatusColor(entry.status)}>
                      {entry.status}
                    </Badge>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span>{entry.date}</span>
                    <span>•</span>
                    <span>{entry.hours} hours</span>
                    <span>•</span>
                    <span>{entry.category}</span>
                    <span>•</span>
                    <span>{entry.type}</span>
                  </div>
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
