import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCustomerReports } from '@/hooks/inspection/useCustomerReports';
import { Customer } from '@/hooks/inspection/useCustomers';
import { Loader2 } from 'lucide-react';
import { unlinkCustomerFromReport } from '@/utils/customerHelper';
import { toast } from 'sonner';
import { CustomerSiteVisitsCard } from './CustomerSiteVisitsCard';
import { CustomerRAMSCard } from './CustomerRAMSCard';
import { CustomerDesignConsultationCard } from './CustomerDesignConsultationCard';
import { CustomerTasksCard } from './CustomerTasksCard';

interface CustomerOverviewTabProps {
  customer: Customer;
  onAddNote: () => void;
  onStartCertificate: () => void;
  onRefresh: () => void;
}

export const CustomerOverviewTab = ({
  customer,
  onAddNote,
  onStartCertificate,
}: CustomerOverviewTabProps) => {
  const navigate = useNavigate();
  const { reports, isLoading: reportsLoading } = useCustomerReports(customer.id);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const handleViewCertificate = (reportId: string, reportType: string) => {
    const sectionMap: Record<string, string> = {
      eicr: 'eicr',
      eic: 'eic',
      'minor-works': 'minor-works',
    };
    const section = sectionMap[reportType] || reportType;
    navigate(`/electrician/inspection-testing?section=${section}&reportId=${reportId}`);
  };

  const getReportLabel = (type: string) => {
    const labels: Record<string, string> = {
      eicr: 'EICR',
      eic: 'EIC',
      'minor-works': 'MW',
      'fire-alarm-design': 'FA G1',
      'fire-alarm': 'FA G2',
      'fire-alarm-commissioning': 'FA G3',
      'fire-alarm-inspection': 'FA G6',
      'fire-alarm-modification': 'FA G7',
      'ev-charging': 'EV',
      'emergency-lighting': 'EM LTG',
      'solar-pv': 'SOLAR PV',
      'pat-testing': 'PAT',
      bess: 'BESS',
      'smoke-co-alarm': 'SMOKE/CO',
    };
    return labels[type] || type.toUpperCase().replace(/-/g, ' ').slice(0, 8);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed': return { label: 'Done', style: 'bg-green-500/15 text-green-400' };
      case 'in-progress': return { label: 'In progress', style: 'bg-white/[0.08] text-white/70' };
      default: return { label: status || 'Draft', style: 'bg-white/[0.08] text-white/50' };
    }
  };

  const handleUnlink = async (reportId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const result = await unlinkCustomerFromReport(reportId);
      if (result.success) {
        toast.success('Certificate unlinked from customer');
        // Trigger a refetch by navigating away and back, or just reload
        window.location.reload();
      } else {
        toast.error('Failed to unlink certificate');
      }
    } catch {
      toast.error('Failed to unlink certificate');
    }
  };

  return (
    <div className="space-y-4">
      {/* Notes */}
      {customer.notes && (
        <div className="card-surface p-4">
          <h3 className="mb-2 text-sm font-semibold tracking-tight text-white">Notes</h3>
          <p className="text-sm text-white whitespace-pre-wrap leading-relaxed">{customer.notes}</p>
        </div>
      )}

      {/* Certificates */}
      <div className="space-y-2">
        <h3 className="text-[15px] font-semibold tracking-tight text-white px-0.5">Certificates</h3>
        {reportsLoading ? (
          <div className="card-surface p-8 flex items-center justify-center">
            <Loader2 className="h-5 w-5 animate-spin text-elec-yellow" />
          </div>
        ) : reports && reports.length > 0 ? (
          <div className="space-y-3">
            {reports.map((report) => {
              const statusBadge = getStatusBadge(report.status);
              return (
                <div
                  key={report.id}
                  onClick={() => handleViewCertificate(report.id, report.report_type)}
                  className="group cursor-pointer rounded-2xl border border-white/[0.12] bg-gradient-to-b from-white/[0.07] to-white/[0.03] transition-all duration-200 hover:border-white/[0.22] active:scale-[0.99] touch-manipulation"
                >
                  <div className="p-4">
                    {/* Badges row */}
                    <div className="flex items-center gap-1.5 mb-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/[0.08] text-white/75">
                        {getReportLabel(report.report_type)}
                      </span>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${statusBadge.style}`}>
                        {statusBadge.label}
                      </span>
                      <span className="text-[11px] text-white ml-auto">
                        {formatDate(report.created_at)}
                      </span>
                    </div>

                    {/* Address */}
                    <h3 className="text-[15px] font-semibold text-white leading-tight group-hover:text-elec-yellow transition-colors truncate">
                      {report.installation_address || 'No address'}
                    </h3>

                    {/* Bottom row */}
                    <div className="flex items-center justify-between mt-3">
                      <button
                        onClick={(e) => handleUnlink(report.id, e)}
                        className="flex h-8 items-center text-[11.5px] font-medium text-white/40 transition-colors hover:text-red-400 touch-manipulation"
                        title="Unlink from customer"
                      >
                        Unlink
                      </button>
                      <span className="text-[12.5px] font-semibold text-elec-yellow">Open</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="card-surface-interactive p-6 text-center rounded-2xl">
            <p className="text-sm font-medium text-white">No certificates yet</p>
            <p className="text-[12px] text-white mt-1">Start a certificate from the actions above</p>
          </div>
        )}
      </div>

      {/* Tasks */}
      <div className="space-y-2">
        <h3 className="text-[15px] font-semibold tracking-tight text-white px-0.5">Tasks</h3>
        <CustomerTasksCard customerId={customer.id} customerName={customer.name} />
      </div>

      {/* Site Work */}
      <div className="space-y-2">
        <h3 className="text-[15px] font-semibold tracking-tight text-white px-0.5">On Site</h3>
        <CustomerSiteVisitsCard customerId={customer.id} />
        <CustomerRAMSCard customerId={customer.id} />
      </div>

      {/* AI Consultations */}
      <div className="space-y-2">
        <h3 className="text-[15px] font-semibold tracking-tight text-white px-0.5">AI Consultations</h3>
        <CustomerDesignConsultationCard customerId={customer.id} />
      </div>
    </div>
  );
};
