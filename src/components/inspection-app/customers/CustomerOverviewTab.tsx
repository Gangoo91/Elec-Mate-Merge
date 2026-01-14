import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCustomerReports } from '@/hooks/inspection/useCustomerReports';
import { Customer } from '@/hooks/inspection/useCustomers';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Phone,
  Mail,
  MapPin,
  FileText,
  Home,
  Plus,
  StickyNote,
  Calendar,
  Loader2,
  ExternalLink,
} from 'lucide-react';

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

  return (
    <div className="space-y-6">
      {/* Contact Details Card */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center justify-between">
            Contact Details
            <div className="flex gap-2">
              {customer.phone && (
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="h-9 touch-manipulation"
                >
                  <a href={`tel:${customer.phone}`}>
                    <Phone className="h-4 w-4 mr-1 text-green-400" />
                    Call
                  </a>
                </Button>
              )}
              {customer.email && (
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="h-9 touch-manipulation"
                >
                  <a href={`mailto:${customer.email}`}>
                    <Mail className="h-4 w-4 mr-1 text-blue-400" />
                    Email
                  </a>
                </Button>
              )}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {customer.email && (
            <div className="flex items-center gap-3 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <span className="break-all">{customer.email}</span>
            </div>
          )}
          {customer.phone && (
            <div className="flex items-center gap-3 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <span>{customer.phone}</span>
            </div>
          )}
          {customer.address && (
            <div className="flex items-start gap-3 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
              <span className="whitespace-pre-wrap">{customer.address}</span>
            </div>
          )}
          {!customer.email && !customer.phone && !customer.address && (
            <p className="text-sm text-muted-foreground">No contact details added</p>
          )}
        </CardContent>
      </Card>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="text-center">
          <CardContent className="pt-4 pb-3">
            <div className="flex items-center justify-center gap-2 text-2xl font-bold text-elec-yellow">
              <FileText className="h-5 w-5" />
              {customer.certificateCount || 0}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Certificates</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-4 pb-3">
            <div className="flex items-center justify-center gap-2 text-2xl font-bold text-purple-400">
              <Home className="h-5 w-5" />
              {customer.propertyCount || 0}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Properties</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-4 pb-3">
            <div className="text-sm font-medium text-foreground">
              {customer.lastActivityAt
                ? formatDate(customer.lastActivityAt)
                : 'Never'}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Last Activity</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-3">
        <Button
          variant="accent"
          onClick={onStartCertificate}
          className="flex-1 h-12 touch-manipulation"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Certificate
        </Button>
        <Button
          variant="outline"
          onClick={onAddNote}
          className="h-12 touch-manipulation"
        >
          <StickyNote className="h-4 w-4 mr-2" />
          Add Note
        </Button>
      </div>

      {/* Notes */}
      {customer.notes && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <StickyNote className="h-4 w-4 text-yellow-400" />
              Notes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm whitespace-pre-wrap">{customer.notes}</p>
          </CardContent>
        </Card>
      )}

      {/* Recent Certificates */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <FileText className="h-4 w-4 text-elec-yellow" />
            Recent Certificates
          </CardTitle>
        </CardHeader>
        <CardContent>
          {reportsLoading ? (
            <div className="flex justify-center py-4">
              <Loader2 className="h-5 w-5 animate-spin" />
            </div>
          ) : reports && reports.length > 0 ? (
            <div className="space-y-2">
              {reports.slice(0, 5).map((report: any) => (
                <div
                  key={report.id}
                  onClick={() => handleViewCertificate(report.id, report.report_type)}
                  className="flex items-center gap-3 p-3 rounded-lg bg-card/50 border border-border hover:border-elec-yellow/30 cursor-pointer transition-colors"
                >
                  <FileText className="h-5 w-5 text-elec-yellow flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">
                      {report.certificate_number ||
                        report.report_type?.toUpperCase()}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {report.installation_address || 'No address'}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <Badge
                      variant={
                        report.status === 'completed'
                          ? 'default'
                          : report.status === 'in-progress'
                          ? 'secondary'
                          : 'outline'
                      }
                      className="text-[10px]"
                    >
                      {report.status}
                    </Badge>
                    {report.inspection_date && (
                      <p className="text-[10px] text-muted-foreground mt-1 flex items-center justify-end gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(report.inspection_date)}
                      </p>
                    )}
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                </div>
              ))}
              {reports.length > 5 && (
                <p className="text-xs text-muted-foreground text-center pt-2">
                  + {reports.length - 5} more certificates
                </p>
              )}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">
              No certificates linked to this customer yet
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
