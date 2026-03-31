import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCustomerReports } from '@/hooks/inspection/useCustomerReports';
import { Customer } from '@/hooks/inspection/useCustomers';
import { Badge } from '@/components/ui/badge';
import {
  FileText,
  Calendar,
  Loader2,
  ChevronRight,
  Shield,
  Zap,
  Receipt,
  ClipboardCheck,
  MapPin,
  StickyNote,
} from 'lucide-react';
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
      'minor-works': 'Minor Works',
      'fire-alarm': 'Fire Alarm',
      'ev-charging': 'EV Charging',
      'emergency-lighting': 'Emergency Lighting',
      'solar-pv': 'Solar PV',
      pat: 'PAT',
    };
    return labels[type] || type.toUpperCase();
  };

  const getReportColor = (type: string) => {
    const colors: Record<string, string> = {
      eicr: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
      eic: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      'minor-works': 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      'fire-alarm': 'text-red-400 bg-red-500/10 border-red-500/20',
      'ev-charging': 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
      'solar-pv': 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
    };
    return colors[type] || 'text-white bg-white/10 border-white/20';
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
          <div className="space-y-2">
            {reports.map((report) => {
              const colorClass = getReportColor(report.report_type);
              return (
                <div
                  key={report.id}
                  onClick={() => handleViewCertificate(report.id, report.report_type)}
                  className="group card-surface-interactive cursor-pointer active:scale-[0.98] transition-all duration-200 touch-manipulation"
                >
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-400 opacity-0 group-hover:opacity-60 transition-opacity duration-200" />
                  <div className="relative z-10 flex items-center gap-3.5 p-3.5">
                    <div className={`p-2 rounded-xl border ${colorClass}`}>
                      <FileText className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] font-semibold text-white group-hover:text-elec-yellow transition-colors">
                        {getReportLabel(report.report_type)}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[12px] text-white flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-white/50" />
                          {formatDate(report.created_at)}
                        </span>
                        {report.address && (
                          <span className="text-[12px] text-white flex items-center gap-1 truncate">
                            <MapPin className="h-3 w-3 text-white/50" />
                            <span className="truncate">{report.address}</span>
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Badge className={`text-[10px] border ${colorClass}`}>
                        {report.status || 'Draft'}
                      </Badge>
                      <div className="w-6 h-6 rounded-full bg-white/[0.05] border border-white/[0.06] flex items-center justify-center group-hover:bg-elec-yellow group-hover:border-elec-yellow transition-all">
                        <ChevronRight className="w-3 h-3 text-white group-hover:text-black transition-all" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="card-surface p-6 text-center">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 w-fit mx-auto mb-3">
              <FileText className="h-5 w-5 text-emerald-400" />
            </div>
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
