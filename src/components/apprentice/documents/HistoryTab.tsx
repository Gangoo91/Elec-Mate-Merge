
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Archive, Download, Eye, Share, Clock, Filter } from "lucide-react";

interface HistoryEntry {
  id: number;
  documentName: string;
  action: "download" | "preview" | "share";
  timestamp: string;
  documentType: string;
  fileSize?: string;
}

const HistoryTab = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [actionFilter, setActionFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState("all");

  const historyEntries: HistoryEntry[] = [
    {
      id: 1,
      documentName: "Electrical Installation Certificate",
      action: "download",
      timestamp: "2024-01-15T10:30:00Z",
      documentType: "PDF Form",
      fileSize: "2.1 MB"
    },
    {
      id: 2,
      documentName: "Risk Assessment Template",
      action: "preview",
      timestamp: "2024-01-15T09:15:00Z",
      documentType: "Word Document"
    },
    {
      id: 3,
      documentName: "Site Inspection Checklist",
      action: "download",
      timestamp: "2024-01-14T16:45:00Z",
      documentType: "PDF Form",
      fileSize: "1.8 MB"
    },
    {
      id: 4,
      documentName: "Test Results Sheet",
      action: "share",
      timestamp: "2024-01-14T14:20:00Z",
      documentType: "Excel Sheet"
    },
    {
      id: 5,
      documentName: "Minor Works Certificate",
      action: "download",
      timestamp: "2024-01-13T11:30:00Z",
      documentType: "PDF Form",
      fileSize: "1.9 MB"
    }
  ];

  const filteredEntries = historyEntries.filter(entry => {
    const matchesSearch = entry.documentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         entry.documentType.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAction = actionFilter === "all" || entry.action === actionFilter;
    const matchesTime = timeFilter === "all" || 
      (timeFilter === "today" && new Date(entry.timestamp).toDateString() === new Date().toDateString()) ||
      (timeFilter === "week" && new Date(entry.timestamp) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) ||
      (timeFilter === "month" && new Date(entry.timestamp) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000));
    
    return matchesSearch && matchesAction && matchesTime;
  });

  const getActionIcon = (action: string) => {
    switch (action) {
      case "download": return <Download className="h-4 w-4" />;
      case "preview": return <Eye className="h-4 w-4" />;
      case "share": return <Share className="h-4 w-4" />;
      default: return <Archive className="h-4 w-4" />;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case "download": return "bg-green-500/20 text-green-400 border-green-500/40";
      case "preview": return "bg-blue-500/20 text-blue-400 border-blue-500/40";
      case "share": return "bg-purple-500/20 text-purple-400 border-purple-500/40";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/40";
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-GB") + " at " + date.toLocaleTimeString("en-GB", { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="space-y-6">
      {/* Activity Summary */}
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Archive className="h-5 w-5" />
            Activity Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-3 border border-elec-yellow/20 rounded-lg">
              <div className="text-2xl font-bold text-elec-yellow">
                {historyEntries.filter(e => e.action === "download").length}
              </div>
              <div className="text-sm text-muted-foreground">Downloads</div>
            </div>
            <div className="text-center p-3 border border-blue-500/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-400">
                {historyEntries.filter(e => e.action === "preview").length}
              </div>
              <div className="text-sm text-muted-foreground">Previews</div>
            </div>
            <div className="text-center p-3 border border-purple-500/20 rounded-lg">
              <div className="text-2xl font-bold text-purple-400">
                {historyEntries.filter(e => e.action === "share").length}
              </div>
              <div className="text-sm text-muted-foreground">Shares</div>
            </div>
            <div className="text-center p-3 border border-green-500/20 rounded-lg">
              <div className="text-2xl font-bold text-green-400">{historyEntries.length}</div>
              <div className="text-sm text-muted-foreground">Total Actions</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card className="border-blue-500/30 bg-blue-500/10">
        <CardHeader>
          <CardTitle className="text-blue-400 flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filter History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">Search</label>
              <Input
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">Action Type</label>
              <Select value={actionFilter} onValueChange={setActionFilter}>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Actions</SelectItem>
                  <SelectItem value="download">Downloads</SelectItem>
                  <SelectItem value="preview">Previews</SelectItem>
                  <SelectItem value="share">Shares</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">Time Period</label>
              <Select value={timeFilter} onValueChange={setTimeFilter}>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* History Entries */}
      {filteredEntries.length > 0 ? (
        <div className="space-y-3">
          {filteredEntries.map((entry) => (
            <Card key={entry.id} className="border-elec-yellow/20 bg-elec-gray">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-md ${getActionColor(entry.action)}`}>
                      {getActionIcon(entry.action)}
                    </div>
                    <div>
                      <h4 className="font-medium text-white">{entry.documentName}</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{entry.documentType}</span>
                        {entry.fileSize && (
                          <>
                            <span>•</span>
                            <span>{entry.fileSize}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={getActionColor(entry.action)}>
                      {entry.action.charAt(0).toUpperCase() + entry.action.slice(1)}
                    </Badge>
                    <div className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formatTimestamp(entry.timestamp)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="rounded-full bg-elec-yellow/10 p-4 mb-4">
            <Archive className="h-8 w-8 text-elec-yellow" />
          </div>
          <h3 className="text-xl font-medium mb-2">No history found</h3>
          <p className="text-muted-foreground mb-4">
            No activity matches your current filter criteria
          </p>
          <Button 
            variant="outline" 
            onClick={() => { 
              setSearchQuery(""); 
              setActionFilter("all"); 
              setTimeFilter("all"); 
            }}
          >
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default HistoryTab;
