import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { Notification, NotificationStatus } from '@/hooks/useNotifications';
import { StatusBadge } from './StatusBadge';
import { FileText, Building2, Calendar, Clock } from 'lucide-react';
import { format } from 'date-fns';

interface NotificationDetailModalProps {
  notification: Notification | null;
  open: boolean;
  onClose: () => void;
  onUpdate: (id: string, updates: any) => void;
  onViewCertificate: (reportId: string, reportType: string) => void;
}

export const NotificationDetailModal = ({
  notification,
  open,
  onClose,
  onUpdate,
  onViewCertificate,
}: NotificationDetailModalProps) => {
  const [workType, setWorkType] = useState(notification?.work_type || '');
  const [buildingControlAuthority, setBuildingControlAuthority] = useState(notification?.building_control_authority || '');
  const [submissionDeadline, setSubmissionDeadline] = useState(notification?.submission_deadline || '');
  const [status, setStatus] = useState<NotificationStatus>(notification?.notification_status || 'pending');

  const handleSave = () => {
    if (!notification) return;

    onUpdate(notification.id, {
      work_type: workType,
      building_control_authority: buildingControlAuthority,
      submission_deadline: submissionDeadline,
      notification_status: status,
    });
    onClose();
  };

  if (!notification) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Notification Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Certificate Info */}
          <div className="bg-muted/50 p-4 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Certificate Information</h3>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onViewCertificate(notification.report_id, notification.reports?.report_type || '')}
              >
                View Certificate
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-muted-foreground">Certificate Number:</span>
                <p className="font-medium">{notification.reports?.certificate_number || notification.report_id}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Type:</span>
                <p className="font-medium">{notification.reports?.report_type?.toUpperCase()}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Client:</span>
                <p className="font-medium">{notification.reports?.client_name || 'N/A'}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Status:</span>
                <StatusBadge status={notification.notification_status} />
              </div>
            </div>
            {notification.reports?.installation_address && (
              <div className="text-sm">
                <span className="text-muted-foreground">Address:</span>
                <p className="font-medium">{notification.reports.installation_address}</p>
              </div>
            )}
          </div>

          {/* Editable Fields */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="work-type">Work Type</Label>
              <Textarea
                id="work-type"
                value={workType}
                onChange={(e) => setWorkType(e.target.value)}
                placeholder="Description of notifiable work..."
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="building-control">Building Control Authority</Label>
              <Input
                id="building-control"
                value={buildingControlAuthority}
                onChange={(e) => setBuildingControlAuthority(e.target.value)}
                placeholder="Local Authority name..."
              />
            </div>

            <div>
              <Label htmlFor="deadline">Submission Deadline</Label>
              <Input
                id="deadline"
                type="date"
                value={submissionDeadline}
                onChange={(e) => setSubmissionDeadline(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="status">Notification Status</Label>
              <MobileSelectPicker
                value={status}
                onValueChange={(value) => setStatus(value as NotificationStatus)}
                options={[
                  { value: 'pending', label: 'Pending' },
                  { value: 'in-progress', label: 'In Progress' },
                  { value: 'submitted', label: 'Submitted' },
                  { value: 'cancelled', label: 'Cancelled' },
                ]}
                placeholder="Select status"
                title="Notification Status"
              />
            </div>
          </div>

          {/* Submission Tracking */}
          <div className="bg-muted/50 p-4 rounded-lg space-y-2">
            <h3 className="font-semibold">Submission Tracking</h3>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">NICEIC:</span>
                <p className="font-medium">{notification.niceic_submitted ? '✓ Submitted' : '✗ Not submitted'}</p>
              </div>
              <div>
                <span className="text-muted-foreground">NAPIT:</span>
                <p className="font-medium">{notification.napit_submitted ? '✓ Submitted' : '✗ Not submitted'}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Local Authority:</span>
                <p className="font-medium">{notification.local_authority_submitted ? '✓ Submitted' : '✗ Not submitted'}</p>
              </div>
            </div>
            {notification.submitted_at && (
              <div className="text-sm">
                <span className="text-muted-foreground">Submitted on:</span>
                <p className="font-medium">{format(new Date(notification.submitted_at), 'PPP')}</p>
              </div>
            )}
          </div>

          {/* Metadata */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>Created: {format(new Date(notification.created_at), 'PPP')}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
