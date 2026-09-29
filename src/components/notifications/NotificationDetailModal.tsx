import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { Notification } from '@/hooks/useNotifications';
import { StatusBadge } from './StatusBadge';
import { REPORT_TYPE_LABELS } from '@/utils/notificationHelper';

interface NotificationDetailModalProps {
  notification: Notification | null;
  open: boolean;
  onClose: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onUpdate: (id: string, updates: any) => void;
  onViewCertificate: (reportId: string, reportType: string) => void;
}

const labelCn = 'mb-1 block text-[12px] font-medium text-white';
const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base font-medium text-white placeholder:text-white/25 caret-elec-yellow transition-colors hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none [color-scheme:dark] touch-manipulation';
const textareaCn =
  'input-underline min-h-[72px] w-full resize-none rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 py-2 text-base font-medium text-white placeholder:text-white/25 caret-elec-yellow transition-colors hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none touch-manipulation';

/**
 * Edit the three things the tracker holds that the certificate doesn't:
 * the one-line description, the deadline (if the completion date on the
 * certificate was wrong) and the council. Everything else is read from the
 * certificate and shown, not edited here.
 */
export const NotificationDetailModal = ({
  notification,
  open,
  onClose,
  onUpdate,
  onViewCertificate,
}: NotificationDetailModalProps) => {
  const [workType, setWorkType] = useState('');
  const [authority, setAuthority] = useState('');
  const [deadline, setDeadline] = useState('');

  useEffect(() => {
    if (!open || !notification) return;
    setWorkType(notification.work_type || '');
    setAuthority(notification.building_control_authority || '');
    setDeadline(notification.submission_deadline || '');
  }, [open, notification]);

  if (!notification) return null;
  const r = notification.reports;

  const save = () => {
    onUpdate(notification.id, {
      work_type: workType.trim() || notification.work_type,
      building_control_authority: authority.trim() || null,
      submission_deadline: deadline || notification.submission_deadline,
    });
    onClose();
  };

  const facts: Array<[string, string | null | undefined]> = [
    ['Certificate', r?.certificate_number],
    ['Type', r ? REPORT_TYPE_LABELS[r.report_type] || r.report_type : null],
    ['Client', r?.client_name],
    ['Address', r?.installation_address],
    ['Added', format(new Date(notification.created_at), 'd MMM yyyy')],
    [
      'Submitted',
      notification.submitted_at ? format(new Date(notification.submitted_at), 'd MMM yyyy') : null,
    ],
    ['Reference', notification.scheme_certificate_ref],
  ];

  return (
    <Sheet open={open} onOpenChange={(o) => !o && onClose()}>
      <SheetContent side="bottom" className="h-[85vh] overflow-hidden rounded-t-2xl p-0">
        <div className="flex h-full flex-col bg-background">
          <SheetHeader className="flex-shrink-0 border-b border-white/[0.08] px-5 pb-4 pt-5">
            <div className="flex items-center justify-between gap-3 pr-8">
              <SheetTitle className="text-left text-base font-semibold text-white">
                Notification details
              </SheetTitle>
              <StatusBadge status={notification.notification_status} />
            </div>
          </SheetHeader>

          <div className="flex-1 space-y-6 overflow-y-auto px-5 py-5">
            <div className="space-y-2">
              {facts
                .filter(([, v]) => v)
                .map(([k, v]) => (
                  <div key={k} className="flex items-baseline justify-between gap-4 text-[13px]">
                    <span className="shrink-0 text-white">{k}</span>
                    <span className="text-right font-medium text-white">{v}</span>
                  </div>
                ))}
              {r && (
                <button
                  type="button"
                  onClick={() => onViewCertificate(notification.report_id, r.report_type)}
                  className="mt-1 h-11 text-[13px] font-semibold text-elec-yellow touch-manipulation"
                >
                  Open the certificate
                </button>
              )}
            </div>

            <div className="space-y-4 border-t border-white/[0.1] pt-5">
              <div>
                <Label htmlFor="pp-work" className={labelCn}>
                  Work
                </Label>
                <Textarea
                  id="pp-work"
                  value={workType}
                  onChange={(e) => setWorkType(e.target.value)}
                  placeholder="One line on what was done"
                  className={textareaCn}
                />
              </div>
              <div>
                <Label htmlFor="pp-deadline" className={labelCn}>
                  Notify by
                </Label>
                <Input
                  id="pp-deadline"
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className={inputCn}
                />
                <p className="mt-1.5 text-[12px] leading-snug text-white">
                  30 days after the work was completed. Change it only if the completion date on the
                  certificate is wrong.
                </p>
              </div>
              <div>
                <Label htmlFor="pp-authority" className={labelCn}>
                  Building Control (if going direct)
                </Label>
                <Input
                  id="pp-authority"
                  value={authority}
                  onChange={(e) => setAuthority(e.target.value)}
                  placeholder="Council name"
                  className={inputCn}
                />
              </div>
            </div>
          </div>

          <div className="flex-shrink-0 space-y-2 border-t border-white/[0.08] px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4">
            <button
              type="button"
              onClick={save}
              className="flex h-11 w-full items-center justify-center rounded-xl bg-elec-yellow text-[14px] font-semibold text-black transition-transform hover:bg-elec-yellow/90 active:scale-[0.99] touch-manipulation"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex h-11 w-full items-center justify-center rounded-xl border border-white/[0.12] bg-white/[0.04] text-[13px] font-medium text-white touch-manipulation active:scale-[0.99]"
            >
              Cancel
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
