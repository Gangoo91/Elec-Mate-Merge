import { useState } from 'react';
import { copyToClipboard } from '@/utils/clipboard';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  FileText,
  Users,
  Calendar,
  Clock,
  MapPin,
  User,
  AlertTriangle,
  CheckCircle2,
  Download,
  Edit3,
  PenTool,
  Image,
  Copy,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useBriefingWithAttendees, type Briefing } from '@/hooks/useBriefings';
import { generateBriefingQRData } from '@/hooks/useBriefingSignatures';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { SheetShell, PrimaryButton, SecondaryButton } from './editorial';

interface BriefingViewerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  briefingId: string;
  onEdit?: (briefing: Briefing) => void;
  onSignOff?: (briefing: Briefing) => void;
  onExportPdf?: (briefing: Briefing) => void;
}

export function BriefingViewer({
  open,
  onOpenChange,
  briefingId,
  onEdit,
  onSignOff,
  onExportPdf,
}: BriefingViewerProps) {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('content');

  const { data: briefing, isLoading } = useBriefingWithAttendees(briefingId);

  // Copy QR link to clipboard
  const handleCopyLink = async () => {
    if (!briefing) return;
    const link = generateBriefingQRData(briefing.id);
    await copyToClipboard(link);
    toast({
      title: 'Link copied',
      description: 'Sign-off link copied to clipboard.',
    });
  };

  if (isLoading) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="bottom" className="h-[90vh] rounded-t-2xl p-0 overflow-hidden">
          <div className="p-4 space-y-4 bg-[hsl(0_0%_8%)] h-full">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-40 w-full" />
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  if (!briefing) {
    return null;
  }

  // Calculate stats
  const signed = briefing.attendees?.filter((a) => a.acknowledged).length || 0;
  const total = briefing.attendees?.length || 0;
  const completionRate = total > 0 ? Math.round((signed / total) * 100) : 0;

  // Get risk level styling
  const riskColour =
    briefing.risk_level === 'high'
      ? 'text-red-400 border-red-500/50 bg-red-500/10'
      : briefing.risk_level === 'medium'
        ? 'text-amber-400 border-amber-500/50 bg-amber-500/10'
        : 'text-green-400 border-green-500/50 bg-green-500/10';

  // Get status styling
  const statusColour =
    briefing.status === 'Completed'
      ? 'bg-green-500/10 text-green-400 border-green-500/30'
      : briefing.status === 'Scheduled'
        ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
        : 'bg-white/[0.06] text-white border-white/[0.1]';

  const headerBadges = (
    <div className="flex items-center gap-2 flex-wrap">
      <Badge variant="outline" className={cn('text-xs', statusColour)}>
        {briefing.status}
      </Badge>
      <Badge variant="outline" className="text-xs text-white border-white/[0.1]">
        {briefing.briefing_type || 'Briefing'}
      </Badge>
      {briefing.risk_level && (
        <Badge variant="outline" className={cn('text-xs', riskColour)}>
          {briefing.risk_level === 'high' && <AlertTriangle className="h-3 w-3 mr-1" />}
          {briefing.risk_level.charAt(0).toUpperCase() + briefing.risk_level.slice(1)} Risk
        </Badge>
      )}
    </div>
  );

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[90vh] rounded-t-2xl p-0 overflow-hidden">
        <SheetShell
          eyebrow="Briefing"
          title={briefing.title}
          description={headerBadges}
          footer={
            <>
              <SecondaryButton onClick={handleCopyLink} fullWidth>
                <Copy className="h-4 w-4 mr-2" />
                Copy Link
              </SecondaryButton>
              {onSignOff && briefing.status === 'Scheduled' && (
                <PrimaryButton onClick={() => onSignOff(briefing)} fullWidth>
                  <PenTool className="h-4 w-4 mr-2" />
                  Sign-Off
                </PrimaryButton>
              )}
              {onExportPdf && (
                <PrimaryButton onClick={() => onExportPdf(briefing)} fullWidth>
                  <Download className="h-4 w-4 mr-2" />
                  Export PDF
                </PrimaryButton>
              )}
            </>
          }
        >
          {/* Info Bar */}
          <div className="p-4 rounded-xl bg-[hsl(0_0%_10%)] border border-white/[0.06]">
            <div className="flex flex-wrap gap-4 text-sm">
              {briefing.date && (
                <span className="flex items-center gap-1.5 text-white min-w-0">
                  <Calendar className="h-4 w-4 shrink-0" />
                  <span className="truncate">{format(new Date(briefing.date), 'dd MMM yyyy')}</span>
                </span>
              )}
              {briefing.time && (
                <span className="flex items-center gap-1.5 text-white min-w-0">
                  <Clock className="h-4 w-4 shrink-0" />
                  <span className="truncate">{briefing.time}</span>
                </span>
              )}
              {briefing.location && (
                <span className="flex items-center gap-1.5 text-white min-w-0">
                  <MapPin className="h-4 w-4 shrink-0" />
                  <span className="truncate">{briefing.location}</span>
                </span>
              )}
              {briefing.presenter && (
                <span className="flex items-center gap-1.5 text-white min-w-0">
                  <User className="h-4 w-4 shrink-0" />
                  <span className="truncate">{briefing.presenter}</span>
                </span>
              )}
              {briefing.duration_minutes && (
                <span className="flex items-center gap-1.5 text-white min-w-0">
                  <Clock className="h-4 w-4 shrink-0" />
                  <span className="truncate">{briefing.duration_minutes} min</span>
                </span>
              )}
            </div>
          </div>

          {/* Tabs */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="flex-1 flex flex-col overflow-hidden"
          >
            <TabsList className="grid grid-cols-3 bg-[hsl(0_0%_12%)] border border-white/[0.06]">
              <TabsTrigger value="content" className="text-xs h-11 touch-manipulation text-white">
                <FileText className="h-3.5 w-3.5 mr-1.5" />
                Content
              </TabsTrigger>
              <TabsTrigger value="attendees" className="text-xs h-11 touch-manipulation text-white">
                <Users className="h-3.5 w-3.5 mr-1.5" />
                Attendees ({total})
              </TabsTrigger>
              <TabsTrigger value="photos" className="text-xs h-11 touch-manipulation text-white">
                <Image className="h-3.5 w-3.5 mr-1.5" />
                Photos
              </TabsTrigger>
            </TabsList>

            {/* Content Tab */}
            <TabsContent value="content" className="flex-1 overflow-hidden mt-0">
              <ScrollArea className="h-full">
                <div className="p-4">
                  {briefing.content ? (
                    <div
                      className="prose prose-sm prose-invert max-w-none [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:mt-4 [&_h2]:mb-2 [&_h3]:text-base [&_h3]:font-medium [&_h3]:mt-3 [&_h3]:mb-2 [&_p]:mb-2 [&_ul]:mb-3 [&_li]:mb-1 [&_table]:w-full [&_td]:py-1 [&_td]:px-2 [&_th]:py-1 [&_th]:px-2 [&_th]:text-left [&_th]:font-medium [&_tr]:border-b [&_tr]:border-white/[0.06]"
                      dangerouslySetInnerHTML={{ __html: briefing.content }}
                    />
                  ) : (
                    <div className="text-center py-8">
                      <FileText className="h-12 w-12 text-white mx-auto mb-4" />
                      <p className="text-sm text-white">No content added yet</p>
                      {onEdit && (
                        <SecondaryButton className="mt-4" onClick={() => onEdit(briefing)}>
                          <Edit3 className="h-4 w-4 mr-2" />
                          Add Content
                        </SecondaryButton>
                      )}
                    </div>
                  )}

                  {/* Presenter Signature */}
                  {briefing.presenter_signature_url && (
                    <div className="mt-6 p-4 rounded-xl bg-[hsl(0_0%_10%)] border border-white/[0.06]">
                      <p className="text-sm font-medium text-white mb-2">
                        Presenter Signature
                      </p>
                      <img
                        src={briefing.presenter_signature_url}
                        alt="Presenter signature"
                        className="h-16 object-contain"
                      />
                      <p className="text-xs text-white mt-2">
                        {briefing.presenter || 'Presenter'}
                      </p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>

            {/* Attendees Tab */}
            <TabsContent value="attendees" className="flex-1 overflow-hidden mt-0">
              <ScrollArea className="h-full">
                <div className="p-4 space-y-4">
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 rounded-xl bg-[hsl(0_0%_10%)] border border-white/[0.06] text-center">
                      <p className="text-xl font-bold text-white">{total}</p>
                      <p className="text-xs text-white">Total</p>
                    </div>
                    <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-center">
                      <p className="text-xl font-bold text-green-400">{signed}</p>
                      <p className="text-xs text-white">Signed</p>
                    </div>
                    <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-center">
                      <p className="text-xl font-bold text-amber-400">{total - signed}</p>
                      <p className="text-xs text-white">Pending</p>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-white">Completion</span>
                      <span className="font-medium text-white">{completionRate}%</span>
                    </div>
                    <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500 rounded-full transition-all"
                        style={{ width: `${completionRate}%` }}
                      />
                    </div>
                  </div>

                  {/* Attendee List */}
                  <div className="space-y-2">
                    {briefing.attendees?.map((attendee) => (
                      <div
                        key={attendee.id}
                        className={cn(
                          'p-3 rounded-xl border',
                          attendee.acknowledged
                            ? 'bg-green-500/5 border-green-500/20'
                            : 'bg-[hsl(0_0%_10%)] border-white/[0.06]'
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className={cn(
                                'p-2 rounded-lg',
                                attendee.acknowledged ? 'bg-green-500/10' : 'bg-white/[0.06]'
                              )}
                            >
                              {attendee.acknowledged ? (
                                <CheckCircle2 className="h-4 w-4 text-green-400" />
                              ) : (
                                <Clock className="h-4 w-4 text-white" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-sm text-white">
                                {attendee.employee?.name || attendee.guest_name || 'Unknown'}
                              </p>
                              <p className="text-xs text-white">
                                {attendee.guest_company && `${attendee.guest_company} • `}
                                {attendee.acknowledged && attendee.acknowledged_at
                                  ? `Signed ${format(new Date(attendee.acknowledged_at), 'HH:mm')} via ${attendee.signed_via || 'manual'}`
                                  : 'Pending'}
                              </p>
                            </div>
                          </div>
                          {attendee.signature_url && (
                            <img
                              src={attendee.signature_url}
                              alt="Signature"
                              className="h-10 w-16 object-contain opacity-70"
                            />
                          )}
                        </div>
                      </div>
                    ))}

                    {(!briefing.attendees || briefing.attendees.length === 0) && (
                      <div className="text-center py-8">
                        <Users className="h-12 w-12 text-white mx-auto mb-4" />
                        <p className="text-sm text-white">No attendees added yet</p>
                      </div>
                    )}
                  </div>
                </div>
              </ScrollArea>
            </TabsContent>

            {/* Photos Tab */}
            <TabsContent value="photos" className="flex-1 overflow-hidden mt-0">
              <ScrollArea className="h-full">
                <div className="p-4">
                  {briefing.photo_evidence && briefing.photo_evidence.length > 0 ? (
                    <div className="grid grid-cols-2 gap-3">
                      {briefing.photo_evidence.map((photo, index) => (
                        <div
                          key={index}
                          className="aspect-square rounded-xl overflow-hidden border border-white/[0.06]"
                        >
                          <img
                            src={photo}
                            alt={`Photo evidence ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Image className="h-12 w-12 text-white mx-auto mb-4" />
                      <p className="text-sm text-white">No photos added yet</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </SheetShell>
      </SheetContent>
    </Sheet>
  );
}
