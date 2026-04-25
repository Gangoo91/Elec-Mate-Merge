import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCustomerReports } from '@/hooks/inspection/useCustomerReports';
import { Customer } from '@/hooks/inspection/useCustomers';
import {
  Loader2,
  ChevronRight,
  StickyNote,
  Unlink,
} from 'lucide-react';
import { unlinkCustomerFromReport } from '@/utils/customerHelper';
import { toast } from 'sonner';
import { CustomerQuotesCard } from './CustomerQuotesCard';
import { CustomerInvoicesCard } from './CustomerInvoicesCard';
import { CustomerPaymentStatsCard } from './CustomerPaymentStatsCard';
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
      'fire-alarm': 'FA G1',
      'fire-alarm-commissioning': 'FA G2',
      'fire-alarm-inspection': 'FA G7',
      'fire-alarm-modification': 'FA G4',
      'ev-charging': 'EV',
      'emergency-lighting': 'EM LTG',
      'solar-pv': 'SOLAR PV',
      'pat-testing': 'PAT',
      bess: 'BESS',
      'smoke-co-alarm': 'SMOKE/CO',
    };
    return labels[type] || type.toUpperCase().replace(/-/g, ' ').slice(0, 8);
  };

  const getTypeBadgeStyle = (type: string) => {
    if (type.startsWith('fire-alarm')) return 'bg-red-500/15 text-red-400';
    if (type === 'eicr') return 'bg-blue-500/15 text-blue-400';
    if (type === 'eic') return 'bg-emerald-500/15 text-emerald-400';
    if (type === 'minor-works') return 'bg-orange-500/15 text-orange-400';
    if (type === 'ev-charging') return 'bg-cyan-500/15 text-cyan-400';
    if (type === 'emergency-lighting') return 'bg-violet-500/15 text-violet-400';
    if (type === 'pat-testing') return 'bg-amber-500/15 text-amber-400';
    if (type === 'solar-pv') return 'bg-yellow-500/15 text-yellow-400';
    return 'bg-elec-yellow/15 text-elec-yellow';
  };

  const getTypeAccent = (type: string) => {
    if (type.startsWith('fire-alarm')) return 'from-red-500 via-rose-400 to-pink-400';
    if (type === 'eicr') return 'from-blue-500 via-blue-400 to-cyan-400';
    if (type === 'eic') return 'from-emerald-500 via-emerald-400 to-green-400';
    if (type === 'minor-works') return 'from-orange-500 via-amber-400 to-yellow-400';
    if (type === 'ev-charging') return 'from-cyan-500 via-cyan-400 to-blue-400';
    if (type === 'emergency-lighting') return 'from-violet-500 via-purple-400 to-indigo-400';
    if (type === 'pat-testing') return 'from-amber-500 via-amber-400 to-yellow-400';
    if (type === 'solar-pv') return 'from-yellow-500 via-yellow-400 to-orange-400';
    return 'from-elec-yellow via-amber-400 to-orange-400';
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed': return { label: 'Done', style: 'bg-green-500/15 text-green-400' };
      case 'in-progress': return { label: 'In Progress', style: 'bg-blue-500/15 text-blue-400' };
      default: return { label: status || 'Draft', style: 'bg-white/10 text-white/50' };
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
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20">
              <StickyNote className="h-3.5 w-3.5 text-elec-yellow" />
            </div>
            <h3 className="text-sm font-semibold text-white">Notes</h3>
          </div>
          <p className="text-sm text-white whitespace-pre-wrap leading-relaxed">{customer.notes}</p>
        </div>
      )}

      {/* Payment Reliability */}
      <CustomerPaymentStatsCard customerId={customer.id} />

      {/* Certificates */}
      <div className="space-y-2">
        <h3 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">Certificates</h3>
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
                  className="group relative overflow-hidden card-surface-interactive cursor-pointer active:scale-[0.98] transition-all duration-200 touch-manipulation rounded-2xl"
                >
                  <div className={`absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r opacity-40 group-hover:opacity-100 transition-opacity duration-200 ${getTypeAccent(report.report_type)}`} />
                  <div className="relative z-10 p-4">
                    {/* Badges row */}
                    <div className="flex items-center gap-1.5 mb-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${getTypeBadgeStyle(report.report_type)}`}>
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
                      {report.address || 'No address'}
                    </h3>

                    {/* Bottom row */}
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-[11px] font-medium text-elec-yellow">View</span>
                      <div className="flex items-center gap-1">
                        {/* Unlink button */}
                        <button
                          onClick={(e) => handleUnlink(report.id, e)}
                          className="w-7 h-7 rounded-full flex items-center justify-center text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-colors touch-manipulation"
                          title="Unlink from customer"
                        >
                          <Unlink className="h-3.5 w-3.5" />
                        </button>
                        <div className="w-6 h-6 rounded-full bg-white/[0.05] border border-elec-yellow/20 flex items-center justify-center group-hover:bg-elec-yellow group-hover:border-elec-yellow transition-all duration-200">
                          <ChevronRight className="w-3.5 h-3.5 text-white group-hover:text-black group-hover:translate-x-0.5 transition-all" />
                        </div>
                      </div>
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
        <h3 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">Tasks</h3>
        <CustomerTasksCard customerId={customer.id} customerName={customer.name} />
      </div>

      {/* Quotes & Invoices */}
      <div className="space-y-2">
        <h3 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">Financials</h3>
        <CustomerQuotesCard customerId={customer.id} customerName={customer.name} />
        <CustomerInvoicesCard customerId={customer.id} customerName={customer.name} />
      </div>

      {/* Site Work */}
      <div className="space-y-2">
        <h3 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">On Site</h3>
        <CustomerSiteVisitsCard customerId={customer.id} />
        <CustomerRAMSCard customerId={customer.id} />
      </div>

      {/* AI Consultations */}
      <div className="space-y-2">
        <h3 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">AI Consultations</h3>
        <CustomerDesignConsultationCard customerId={customer.id} />
      </div>
    </div>
  );
};
