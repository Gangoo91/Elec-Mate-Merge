
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Download, Eye, FileText, Clock, User } from "lucide-react";

const HistoryTab = () => {
  const documentHistory = [
    {
      id: "eic-001",
      name: "Electrical Installation Certificate - Kitchen Extension",
      type: "EIC",
      downloadDate: "2024-01-15",
      downloadTime: "14:30",
      user: "Current User",
      status: "Downloaded",
      fileSize: "245 KB",
      project: "Residential - Smith Property"
    },
    {
      id: "eicr-002", 
      name: "EICR - Office Building Annual Inspection",
      type: "EICR",
      downloadDate: "2024-01-14",
      downloadTime: "09:15",
      user: "Current User",
      status: "Downloaded",
      fileSize: "387 KB",
      project: "Commercial - City Office Complex"
    },
    {
      id: "meiwc-003",
      name: "Minor Works Certificate - Additional Socket",
      type: "MEIWC",
      downloadDate: "2024-01-12",
      downloadTime: "16:45",
      user: "Current User",
      status: "Downloaded",
      fileSize: "156 KB",
      project: "Residential - Jones House"
    },
    {
      id: "schedule-004",
      name: "Schedule of Test Results - Factory Installation",
      type: "Schedule",
      downloadDate: "2024-01-10",
      downloadTime: "11:20",
      user: "Current User",
      status: "Downloaded",
      fileSize: "298 KB",
      project: "Industrial - Manufacturing Plant"
    },
    {
      id: "eic-005",
      name: "EIC Template - New Build Property",
      type: "Template",
      downloadDate: "2024-01-08",
      downloadTime: "13:10",
      user: "Current User",
      status: "Downloaded",
      fileSize: "189 KB",
      project: "Template Library"
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'EIC': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'EICR': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'MEIWC': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'Schedule': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'Template': return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
      default: return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    }
  };

  const stats = {
    totalDownloads: documentHistory.length,
    thisWeek: documentHistory.filter(doc => {
      const downloadDate = new Date(doc.downloadDate);
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      return downloadDate >= oneWeekAgo;
    }).length,
    certificates: documentHistory.filter(doc => ['EIC', 'EICR', 'MEIWC'].includes(doc.type)).length,
    schedules: documentHistory.filter(doc => doc.type === 'Schedule').length
  };

  return (
    <div className="space-y-6">
      {/* Statistics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-blue-500/30 bg-blue-500/10">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-400">{stats.totalDownloads}</div>
            <div className="text-sm text-muted-foreground">Total Downloads</div>
          </CardContent>
        </Card>
        <Card className="border-green-500/30 bg-green-500/10">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-400">{stats.thisWeek}</div>
            <div className="text-sm text-muted-foreground">This Week</div>
          </CardContent>
        </Card>
        <Card className="border-yellow-500/30 bg-yellow-500/10">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-400">{stats.certificates}</div>
            <div className="text-sm text-muted-foreground">Certificates</div>
          </CardContent>
        </Card>
        <Card className="border-purple-500/30 bg-purple-500/10">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-400">{stats.schedules}</div>
            <div className="text-sm text-muted-foreground">Schedules</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Download History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {documentHistory.map((item) => (
              <div key={item.id} className="border border-elec-yellow/20 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <FileText className="h-5 w-5 text-elec-yellow flex-shrink-0" />
                      <h4 className="font-medium text-white">{item.name}</h4>
                      <Badge variant="outline" className={getTypeColor(item.type)}>
                        {item.type}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3 w-3" />
                          {item.downloadDate} at {item.downloadTime}
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="h-3 w-3" />
                          {item.user}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div>Project: {item.project}</div>
                        <div>Size: {item.fileSize}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 ml-4">
                    <Button size="sm" variant="outline">
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="h-3 w-3 mr-1" />
                      Re-download
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Storage Information */}
      <Card className="border-amber-500/30 bg-amber-500/10">
        <CardHeader>
          <CardTitle className="text-amber-400">Storage & Retention</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-amber-300">Retention Policy</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Download history kept for 2 years</li>
                <li>• Certificates accessible for re-download</li>
                <li>• Templates always available</li>
                <li>• Project files linked to job records</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-amber-300">Best Practices</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Keep local copies of important certificates</li>
                <li>• Use cloud storage for backup</li>
                <li>• Name files consistently for easy searching</li>
                <li>• Regular cleanup of downloaded files</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HistoryTab;
