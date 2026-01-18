import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useExpiryReminders, ExpiryReminder } from '@/hooks/inspection/useExpiryReminders';
import {
  getDaysUntilExpiry,
  formatExpiryStatus,
  getExpiryUrgency,
  getExpiryColorClasses,
} from '@/utils/expiryHelper';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  User,
  Phone,
  Mail,
  CheckCircle2,
  CalendarCheck,
  Loader2,
  AlertTriangle,
  FileText,
  PoundSterling,
} from 'lucide-react';

type TimeFilter = 'all' | 'overdue' | '30days' | '60days' | '90days';

export default function CertificateExpiryPage() {
  const navigate = useNavigate();
  const {
    reminders,
    isLoading,
    markAsContacted,
    markAsBooked,
    deleteReminder,
  } = useExpiryReminders();

  const [timeFilter, setTimeFilter] = useState<TimeFilter>('all');
  const [selectedReminder, setSelectedReminder] = useState<ExpiryReminder | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Filter reminders based on time filter
  const filteredReminders = useMemo(() => {
    if (!reminders) return [];

    return reminders.filter((reminder) => {
      const days = getDaysUntilExpiry(reminder.expiry_date);

      switch (timeFilter) {
        case 'overdue':
          return days < 0;
        case '30days':
          return days >= 0 && days <= 30;
        case '60days':
          return days >= 0 && days <= 60;
        case '90days':
          return days >= 0 && days <= 90;
        default:
          return true;
      }
    });
  }, [reminders, timeFilter]);

  // Stats
  const stats = useMemo(() => {
    if (!reminders) return { overdue: 0, urgent: 0, warning: 0, total: 0, revenue: 0 };

    const overdue = reminders.filter((r) => getDaysUntilExpiry(r.expiry_date) < 0).length;
    const urgent = reminders.filter((r) => {
      const days = getDaysUntilExpiry(r.expiry_date);
      return days >= 0 && days <= 30;
    }).length;
    const warning = reminders.filter((r) => {
      const days = getDaysUntilExpiry(r.expiry_date);
      return days > 30 && days <= 60;
    }).length;

    // Estimate revenue opportunity (approx. 250 per EICR)
    const revenue = (overdue + urgent) * 250;

    return { overdue, urgent, warning, total: reminders.length, revenue };
  }, [reminders]);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const handleMarkContacted = async (id: string) => {
    await markAsContacted(id);
    setSelectedReminder(null);
  };

  const handleMarkBooked = async (id: string) => {
    await markAsBooked({ id });
    setSelectedReminder(null);
  };

  const handleDelete = async () => {
    if (deleteConfirmId) {
      await deleteReminder(deleteConfirmId);
      setDeleteConfirmId(null);
      if (selectedReminder?.id === deleteConfirmId) {
        setSelectedReminder(null);
      }
    }
  };

  return (
    <div className="bg-background">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="flex items-center gap-3 px-4 h-14">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="h-11 w-11 touch-manipulation -ml-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2 flex-1">
            <Calendar className="h-6 w-6 text-elec-yellow" />
            <h1 className="text-xl font-bold">Expiring Certificates</h1>
          </div>
        </div>
      </header>

      <main className="p-4 pb-24 space-y-4 max-w-4xl mx-auto">

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="border-red-500/20 bg-red-500/5">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-red-500">{stats.overdue}</p>
            <p className="text-xs text-muted-foreground">Overdue</p>
          </CardContent>
        </Card>
        <Card className="border-orange-500/20 bg-orange-500/5">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-orange-500">{stats.urgent}</p>
            <p className="text-xs text-muted-foreground">Within 30 days</p>
          </CardContent>
        </Card>
        <Card className="border-yellow-500/20 bg-yellow-500/5">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-yellow-500">{stats.warning}</p>
            <p className="text-xs text-muted-foreground">30-60 days</p>
          </CardContent>
        </Card>
        <Card className="border-green-500/20 bg-green-500/5">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-500">
              <PoundSterling className="h-5 w-5 inline -mt-1" />
              {stats.revenue.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground">Revenue opportunity</p>
          </CardContent>
        </Card>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-3">
        <Select value={timeFilter} onValueChange={(v) => setTimeFilter(v as TimeFilter)}>
          <SelectTrigger className="w-[180px] h-11 touch-manipulation">
            <SelectValue placeholder="Filter by time" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All certificates</SelectItem>
            <SelectItem value="overdue">Overdue</SelectItem>
            <SelectItem value="30days">Next 30 days</SelectItem>
            <SelectItem value="60days">Next 60 days</SelectItem>
            <SelectItem value="90days">Next 90 days</SelectItem>
          </SelectContent>
        </Select>
        <Badge variant="outline">{filteredReminders.length} certificates</Badge>
      </div>

      {/* Reminders List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-elec-yellow" />
        </div>
      ) : filteredReminders.length === 0 ? (
        <div className="text-center py-12 space-y-4">
          <Calendar className="h-12 w-12 mx-auto text-muted-foreground" />
          <div>
            <p className="text-lg font-medium">
              {reminders?.length === 0 ? 'No expiring certificates' : 'No certificates match filter'}
            </p>
            <p className="text-sm text-muted-foreground">
              {reminders?.length === 0
                ? 'Complete some inspections and they will appear here'
                : 'Try selecting a different time range'}
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredReminders.map((reminder) => {
            const urgency = getExpiryUrgency(reminder.expiry_date);
            const colors = getExpiryColorClasses(urgency);
            const days = getDaysUntilExpiry(reminder.expiry_date);

            return (
              <Card
                key={reminder.id}
                className={`cursor-pointer hover:scale-[1.01] active:scale-[0.99] transition-all touch-manipulation ${colors.border}`}
                onClick={() => setSelectedReminder(reminder)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        <p className="font-medium truncate">
                          {reminder.client_name || 'Unknown Client'}
                        </p>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {reminder.installation_address || 'No address'}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        <p className="text-sm text-muted-foreground">
                          {reminder.certificate_number}
                        </p>
                      </div>
                    </div>

                    <div className="text-right space-y-1">
                      <Badge className={colors.badge}>
                        {days < 0 ? `${Math.abs(days)}d overdue` : `${days}d left`}
                      </Badge>
                      <p className="text-xs text-muted-foreground">
                        Expires {formatDate(reminder.expiry_date)}
                      </p>
                      {reminder.reminder_status !== 'pending' && (
                        <Badge variant="outline" className="text-xs">
                          {reminder.reminder_status}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Reminder Detail Sheet */}
      <Sheet open={!!selectedReminder} onOpenChange={(open) => !open && setSelectedReminder(null)}>
        <SheetContent side="bottom" className="h-[75vh] rounded-t-2xl overflow-hidden">
          {selectedReminder && (
            <div className="flex flex-col h-full">
              <SheetHeader className="border-b pb-4">
                <SheetTitle className="text-left">
                  {selectedReminder.client_name || 'Unknown Client'}
                </SheetTitle>
                <div className="flex items-center gap-2">
                  {(() => {
                    const urgency = getExpiryUrgency(selectedReminder.expiry_date);
                    const colors = getExpiryColorClasses(urgency);
                    return (
                      <Badge className={colors.badge}>
                        {formatExpiryStatus(selectedReminder.expiry_date)}
                      </Badge>
                    );
                  })()}
                  <Badge variant="outline">{selectedReminder.reminder_status}</Badge>
                </div>
              </SheetHeader>

              <div className="flex-1 overflow-y-auto py-4 space-y-6">
                {/* Details */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-card">
                    <MapPin className="h-5 w-5 text-elec-yellow mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Address</p>
                      <p className="font-medium">
                        {selectedReminder.installation_address || 'No address'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-card">
                    <FileText className="h-5 w-5 text-elec-yellow" />
                    <div>
                      <p className="text-sm text-muted-foreground">Certificate</p>
                      <p className="font-medium">{selectedReminder.certificate_number}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-card">
                      <Calendar className="h-5 w-5 text-elec-yellow" />
                      <div>
                        <p className="text-sm text-muted-foreground">Inspected</p>
                        <p className="font-medium">{formatDate(selectedReminder.inspection_date)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-card">
                      <AlertTriangle className="h-5 w-5 text-elec-yellow" />
                      <div>
                        <p className="text-sm text-muted-foreground">Expires</p>
                        <p className="font-medium">{formatDate(selectedReminder.expiry_date)}</p>
                      </div>
                    </div>
                  </div>

                  {selectedReminder.contacted_at && (
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-card">
                      <Phone className="h-5 w-5 text-green-500" />
                      <div>
                        <p className="text-sm text-muted-foreground">Contacted</p>
                        <p className="font-medium">{formatDate(selectedReminder.contacted_at)}</p>
                      </div>
                    </div>
                  )}

                  {selectedReminder.booked_for_date && (
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-card">
                      <CalendarCheck className="h-5 w-5 text-green-500" />
                      <div>
                        <p className="text-sm text-muted-foreground">Booked for</p>
                        <p className="font-medium">{formatDate(selectedReminder.booked_for_date)}</p>
                      </div>
                    </div>
                  )}

                  {selectedReminder.notes && (
                    <div className="p-3 rounded-lg bg-card">
                      <p className="text-sm text-muted-foreground mb-1">Notes</p>
                      <p className="text-sm">{selectedReminder.notes}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="border-t pt-4 space-y-3">
                <div className="flex gap-3">
                  {selectedReminder.reminder_status === 'pending' && (
                    <Button
                      variant="outline"
                      className="flex-1 h-11 gap-2 touch-manipulation"
                      onClick={() => handleMarkContacted(selectedReminder.id)}
                    >
                      <Phone className="h-4 w-4" />
                      Mark Contacted
                    </Button>
                  )}
                  {(selectedReminder.reminder_status === 'pending' ||
                    selectedReminder.reminder_status === 'contacted') && (
                    <Button
                      variant="accent"
                      className="flex-1 h-11 gap-2 touch-manipulation"
                      onClick={() => handleMarkBooked(selectedReminder.id)}
                    >
                      <CalendarCheck className="h-4 w-4" />
                      Mark Booked
                    </Button>
                  )}
                  {selectedReminder.reminder_status === 'booked' && (
                    <Button
                      variant="accent"
                      className="flex-1 h-11 gap-2 touch-manipulation"
                      onClick={() => handleMarkBooked(selectedReminder.id)}
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      Complete
                    </Button>
                  )}
                </div>
                <Button
                  variant="ghost"
                  className="w-full h-11 text-red-500 hover:text-red-600 hover:bg-red-500/10 touch-manipulation"
                  onClick={() => setDeleteConfirmId(selectedReminder.id)}
                >
                  Remove from list
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      </main>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteConfirmId} onOpenChange={() => setDeleteConfirmId(null)}>
        <AlertDialogContent className="max-w-[90vw] sm:max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Reminder?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove this certificate from the expiry tracking list.
              The original certificate will not be affected.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="touch-manipulation">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700 touch-manipulation">
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
