import { Button } from '@/components/ui/button';
import { Calendar, Download, Eye, FileText, User } from 'lucide-react';

const HistoryTab = () => {
  const documentHistory = [
    {
      id: 'eic-001',
      name: 'Electrical Installation Certificate - Kitchen Extension',
      type: 'EIC',
      downloadDate: '2024-01-15',
      downloadTime: '14:30',
      user: 'Current User',
      status: 'Downloaded',
      fileSize: '245 KB',
      project: 'Residential - Smith Property',
    },
    {
      id: 'eicr-002',
      name: 'EICR - Office Building Annual Inspection',
      type: 'EICR',
      downloadDate: '2024-01-14',
      downloadTime: '09:15',
      user: 'Current User',
      status: 'Downloaded',
      fileSize: '387 KB',
      project: 'Commercial - City Office Complex',
    },
    {
      id: 'meiwc-003',
      name: 'Minor Works Certificate - Additional Socket',
      type: 'MEIWC',
      downloadDate: '2024-01-12',
      downloadTime: '16:45',
      user: 'Current User',
      status: 'Downloaded',
      fileSize: '156 KB',
      project: 'Residential - Jones House',
    },
    {
      id: 'schedule-004',
      name: 'Schedule of Test Results - Factory Installation',
      type: 'Schedule',
      downloadDate: '2024-01-10',
      downloadTime: '11:20',
      user: 'Current User',
      status: 'Downloaded',
      fileSize: '298 KB',
      project: 'Industrial - Manufacturing Plant',
    },
    {
      id: 'eic-005',
      name: 'EIC Template - New Build Property',
      type: 'Template',
      downloadDate: '2024-01-08',
      downloadTime: '13:10',
      user: 'Current User',
      status: 'Downloaded',
      fileSize: '189 KB',
      project: 'Template Library',
    },
  ];

  const stats = {
    totalDownloads: documentHistory.length,
    thisWeek: documentHistory.filter((doc) => {
      const downloadDate = new Date(doc.downloadDate);
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      return downloadDate >= oneWeekAgo;
    }).length,
    certificates: documentHistory.filter((doc) =>
      ['EIC', 'EICR', 'MEIWC'].includes(doc.type)
    ).length,
    schedules: documentHistory.filter((doc) => doc.type === 'Schedule').length,
  };

  const summaryCard = (label: string, value: number) => (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-center space-y-1">
      <div className="text-2xl font-mono text-white">{value}</div>
      <div className="text-[12px] text-white/55">{label}</div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {summaryCard('Total downloads', stats.totalDownloads)}
        {summaryCard('This week', stats.thisWeek)}
        {summaryCard('Certificates', stats.certificates)}
        {summaryCard('Schedules', stats.schedules)}
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Download history
        </span>
        <div className="space-y-3">
          {documentHistory.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-3"
            >
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <FileText className="h-4 w-4 text-white/55 flex-shrink-0" />
                    <h4 className="text-[14px] font-semibold text-white leading-snug">
                      {item.name}
                    </h4>
                    <span className="text-[10px] uppercase tracking-[0.18em] text-white/55">
                      {item.type}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[12px] text-white/55 font-mono">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {item.downloadDate} at {item.downloadTime}
                      </div>
                      <div className="flex items-center gap-1 normal-case font-sans">
                        <User className="h-3 w-3" />
                        {item.user}
                      </div>
                    </div>
                    <div className="space-y-0.5 normal-case font-sans">
                      <div>Project: {item.project}</div>
                      <div>Size: {item.fileSize}</div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 flex-shrink-0">
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-9 border-white/15 text-white hover:bg-white/[0.05] touch-manipulation"
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-9 border-white/15 text-white hover:bg-white/[0.05] touch-manipulation"
                  >
                    <Download className="h-3 w-3 mr-1" />
                    Re-download
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Storage & retention
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="text-[14px] font-semibold text-white">Retention policy</h4>
            <ul className="space-y-1.5">
              {[
                'Download history kept for 2 years',
                'Certificates accessible for re-download',
                'Templates always available',
                'Project files linked to job records',
              ].map((item, idx) => (
                <li
                  key={idx}
                  className="text-[14px] text-white/85 leading-relaxed flex items-start gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="text-[14px] font-semibold text-white">Best practices</h4>
            <ul className="space-y-1.5">
              {[
                'Keep local copies of important certificates',
                'Use cloud storage for backup',
                'Name files consistently for easy searching',
                'Regular cleanup of downloaded files',
              ].map((item, idx) => (
                <li
                  key={idx}
                  className="text-[14px] text-white/85 leading-relaxed flex items-start gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryTab;
