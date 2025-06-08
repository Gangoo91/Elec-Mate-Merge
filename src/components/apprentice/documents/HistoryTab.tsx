
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Archive, Download, Calendar, FileText, Filter, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface HistoryItem {
  id: number;
  documentName: string;
  action: "download" | "preview" | "share";
  timestamp: string;
  fileType: string;
  project?: string;
}

const HistoryTab = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const { toast } = useToast();

  const [history, setHistory] = useState<HistoryItem[]>([
    {
      id: 1,
      documentName: "Electrical Installation Certificate",
      action: "download",
      timestamp: "2024-01-15 14:30",
      fileType: "PDF",
      project: "Office Renovation"
    },
    {
      id: 2,
      documentName: "Risk Assessment Template", 
      action: "preview",
      timestamp: "2024-01-15 11:45",
      fileType: "Word",
      project: "Warehouse Install"
    },
    {
      id: 3,
      documentName: "Minor Works Certificate",
      action: "download",
      timestamp: "2024-01-14 16:20",
      fileType: "PDF",
      project: "Domestic Socket Install"
    },
    {
      id: 4,
      documentName: "Site Inspection Form",
      action: "share",
      timestamp: "2024-01-14 09:15",
      fileType: "PDF"
    },
    {
      id: 5,
      documentName: "Method Statement Template",
      action: "download",
      timestamp: "2024-01-13 13:22",
      fileType: "Word",
      project: "Industrial Upgrade"
    }
  ]);

  const filteredHistory = history.filter(item => {
    const matchesSearch = item.documentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (item.project && item.project.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFilter = filterType === "all" || item.action === filterType;
    return matchesSearch && matchesFilter;
  });

  const getActionColor = (action: string) => {
    switch (action) {
      case "download": return "bg-green-500/20 text-green-400 border-green-500/40";
      case "preview": return "bg-blue-500/20 text-blue-400 border-blue-500/40";
      case "share": return "bg-purple-500/20 text-purple-400 border-purple-500/40";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/40";
    }
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case "download": return <Download className="h-3 w-3" />;
      case "preview": return <FileText className="h-3 w-3" />;
      case "share": return <Archive className="h-3 w-3" />;
      default: return <FileText className="h-3 w-3" />;
    }
  };

  const handleClearHistory = () => {
    setHistory([]);
    toast({
      title: "History Cleared",
      description: "All history items have been removed.",
      variant: "default",
    });
  };

  const handleRemoveItem = (id: number) => {
    setHistory(prev => prev.filter(item => item.id !== id));
    toast({
      title: "Item Removed",
      description: "History item has been removed.",
      variant: "default",
    });
  };

  const activityStats = {
    totalActions: history.length,
    downloads: history.filter(h => h.action === "download").length,
    previews: history.filter(h => h.action === "preview").length,
    shares: history.filter(h => h.action === "share").length
  };

  return (
    <div className="space-y-6">
      {/* Activity Overview */}
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Archive className="h-5 w-5" />
            Activity Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 border border-elec-yellow/20 rounded-lg">
              <div className="text-2xl font-bold text-elec-yellow">{activityStats.totalActions}</div>
              <div className="text-sm text-muted-foreground">Total Actions</div>
            </div>
            <div className="text-center p-3 border border-green-500/20 rounded-lg">
              <div className="text-2xl font-bold text-green-400">{activityStats.downloads}</div>
              <div className="text-sm text-muted-foreground">Downloads</div>
            </div>
            <div className="text-center p-3 border border-blue-500/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-400">{activityStats.previews}</div>
              <div className="text-sm text-muted-foreground">Previews</div>
            </div>
            <div className="text-center p-3 border border-purple-500/20 rounded-lg">
              <div className="text-2xl font-bold text-purple-400">{activityStats.shares}</div>
              <div className="text-sm text-muted-foreground">Shares</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Search history..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-elec-dark border-elec-yellow/20"
        />
        <div className="flex gap-2">
          <Button
            variant={filterType === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterType("all")}
          >
            All
          </Button>
          <Button
            variant={filterType === "download" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterType("download")}
          >
            Downloads
          </Button>
          <Button
            variant={filterType === "preview" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterType("preview")}
          >
            Previews
          </Button>
          <Button
            variant={filterType === "share" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterType("share")}
          >
            Shares
          </Button>
        </div>
        <Button variant="outline" size="sm" onClick={handleClearHistory}>
          <Trash2 className="h-3 w-3 mr-1" />
          Clear History
        </Button>
      </div>

      {/* History Items */}
      {filteredHistory.length > 0 ? (
        <div className="space-y-3">
          {filteredHistory.map((item) => (
            <Card key={item.id} className="border-elec-yellow/20 bg-elec-gray">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="p-2 rounded-md bg-elec-yellow/10">
                      <FileText className="h-4 w-4 text-elec-yellow" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-white">{item.documentName}</h4>
                        <Badge className={`text-xs ${getActionColor(item.action)}`}>
                          {getActionIcon(item.action)}
                          <span className="ml-1 capitalize">{item.action}</span>
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{item.timestamp}</span>
                        <span>•</span>
                        <span>{item.fileType}</span>
                        {item.project && (
                          <>
                            <span>•</span>
                            <span className="text-elec-yellow">{item.project}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
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
            Your document activity will appear here
          </p>
          <Button variant="outline" onClick={() => { setSearchQuery(""); setFilterType("all"); }}>
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default HistoryTab;
