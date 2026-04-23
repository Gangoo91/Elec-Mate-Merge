import { useState, useMemo } from 'react';
import { copyToClipboard } from '@/utils/clipboard';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  PageFrame,
  PageHero,
  StatStrip,
  FilterBar,
  ListCard,
  ListCardHeader,
  ListBody,
  ListRow,
  Avatar,
  Pill,
  EmptyState,
  LoadingBlocks,
  IconButton,
  Divider,
  PrimaryButton,
  SecondaryButton,
  DestructiveButton,
  FormCard,
  Field,
  inputClass,
  selectTriggerClass,
  selectContentClass,
  type Tone,
} from '@/components/employer/editorial';
import {
  useSignatureRequests,
  useSignatureStats,
  useCreateSignatureRequest,
  useResendSignatureRequest,
  useMarkAsSigned,
  useDeleteSignatureRequest,
  type SignatureRequest,
  type DocumentType,
  type SignatureStatus,
} from '@/hooks/useSignatureRequests';
import { useJobs } from '@/hooks/useJobs';
import {
  RefreshCw,
  Loader2,
  Mail,
  CheckCircle,
  Trash2,
  Link as LinkIcon,
  Download,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const documentTypes: DocumentType[] = [
  'Quote',
  'Contract',
  'Certificate',
  'RAMS',
  'Timesheet',
  'Completion',
  'Variation',
  'Invoice',
];

type FilterTab = 'awaiting' | 'signed' | 'declined' | 'expired';

const statusToTone: Record<SignatureStatus, Tone> = {
  Pending: 'amber',
  Sent: 'blue',
  Viewed: 'purple',
  Signed: 'emerald',
  Declined: 'red',
  Expired: 'orange',
};

function getInitials(name: string): string {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function formatRelative(iso: string): string {
  const d = new Date(iso);
  const diff = Date.now() - d.getTime();
  const day = 1000 * 60 * 60 * 24;
  if (diff < day) return 'today';
  if (diff < day * 2) return 'yesterday';
  if (diff < day * 7) return `${Math.floor(diff / day)}d ago`;
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

export function SignaturesSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<FilterTab>('awaiting');
  const [showNewRequest, setShowNewRequest] = useState(false);
  const [detailRequest, setDetailRequest] = useState<SignatureRequest | null>(null);

  const [documentTitle, setDocumentTitle] = useState('');
  const [documentType, setDocumentType] = useState<DocumentType>('Certificate');
  const [signerName, setSignerName] = useState('');
  const [signerEmail, setSignerEmail] = useState('');
  const [signerPhone, setSignerPhone] = useState('');
  const [selectedJobId, setSelectedJobId] = useState('');
  const [message, setMessage] = useState('');

  const { data: signatures, isLoading, error, refetch, isFetching } = useSignatureRequests();
  const { data: stats } = useSignatureStats();
  const { data: jobs } = useJobs();
  const createRequest = useCreateSignatureRequest();
  const resendRequest = useResendSignatureRequest();
  const markAsSigned = useMarkAsSigned();
  const deleteRequest = useDeleteSignatureRequest();
  const { toast } = useToast();

  const counts = useMemo(() => {
    const list = signatures ?? [];
    return {
      awaiting: list.filter((s) => ['Pending', 'Sent', 'Viewed'].includes(s.status)).length,
      signed: list.filter((s) => s.status === 'Signed').length,
      declined: list.filter((s) => s.status === 'Declined').length,
      expired: list.filter((s) => s.status === 'Expired').length,
    };
  }, [signatures]);

  const signed30d = useMemo(() => {
    if (!signatures) return 0;
    const cutoff = Date.now() - 1000 * 60 * 60 * 24 * 30;
    return signatures.filter(
      (s) => s.status === 'Signed' && s.signed_at && new Date(s.signed_at).getTime() >= cutoff
    ).length;
  }, [signatures]);

  const filteredSignatures = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return (signatures ?? []).filter((sig) => {
      const matchesSearch =
        !q ||
        sig.document_title.toLowerCase().includes(q) ||
        sig.signer_name.toLowerCase().includes(q) ||
        sig.document_type?.toLowerCase().includes(q);
      if (!matchesSearch) return false;
      if (activeTab === 'awaiting')
        return ['Pending', 'Sent', 'Viewed'].includes(sig.status);
      if (activeTab === 'signed') return sig.status === 'Signed';
      if (activeTab === 'declined') return sig.status === 'Declined';
      if (activeTab === 'expired') return sig.status === 'Expired';
      return true;
    });
  }, [signatures, searchQuery, activeTab]);

  const handleCopyLink = async (accessToken: string) => {
    const signingUrl = `${window.location.origin}/sign/${accessToken}`;
    try {
      await copyToClipboard(signingUrl);
      toast({ title: 'Link copied', description: 'Signing link copied to clipboard' });
    } catch {
      toast({
        title: 'Copy failed',
        description: 'Could not copy link',
        variant: 'destructive',
      });
    }
  };

  const handleCreateRequest = async () => {
    if (!documentTitle || !signerName) return;
    await createRequest.mutateAsync({
      document_title: documentTitle,
      document_type: documentType,
      signer_name: signerName,
      signer_email: signerEmail || undefined,
      signer_phone: signerPhone || undefined,
      job_id: selectedJobId || undefined,
      message: message || undefined,
      status: 'Pending',
    });
    setDocumentTitle('');
    setDocumentType('Certificate');
    setSignerName('');
    setSignerEmail('');
    setSignerPhone('');
    setSelectedJobId('');
    setMessage('');
    setShowNewRequest(false);
  };

  const handleResend = async (id: string) => {
    await resendRequest.mutateAsync(id);
  };

  const handleMarkSigned = async (id: string) => {
    await markAsSigned.mutateAsync({ id });
  };

  const handleDelete = async (id: string) => {
    await deleteRequest.mutateAsync(id);
    setDetailRequest(null);
  };

  if (error) {
    return (
      <PageFrame>
        <PageHero
          eyebrow="Money"
          title="Signatures"
          description="Digital sign-offs for quotes, invoices and variations."
          tone="indigo"
        />
        <EmptyState
          title="Failed to load signature requests"
          description="Please try refreshing the list."
          action="Retry"
          onAction={() => refetch()}
        />
      </PageFrame>
    );
  }

  const headerActions = (
    <>
      <PrimaryButton onClick={() => setShowNewRequest(true)}>Request signature</PrimaryButton>
      <IconButton
        onClick={() => refetch()}
        aria-label="Refresh"
        disabled={isFetching}
      >
        <RefreshCw className={`h-4 w-4 ${isFetching ? 'animate-spin' : ''}`} />
      </IconButton>
    </>
  );

  return (
    <>
      <PageFrame>
        <PageHero
          eyebrow="Money"
          title="Signatures"
          description="Digital sign-offs for quotes, invoices and variations."
          tone="indigo"
          actions={headerActions}
        />

        <StatStrip
          columns={4}
          stats={[
            { label: 'Awaiting', value: isLoading ? '—' : counts.awaiting, tone: 'orange' },
            { label: 'Signed 30d', value: isLoading ? '—' : signed30d, tone: 'emerald' },
            { label: 'Declined', value: isLoading ? '—' : counts.declined, tone: 'red' },
            { label: 'Signed value £', value: isLoading ? '—' : '—', accent: true },
          ]}
        />

        <FilterBar
          tabs={[
            { value: 'awaiting', label: 'Awaiting', count: counts.awaiting },
            { value: 'signed', label: 'Signed', count: counts.signed },
            { value: 'declined', label: 'Declined', count: counts.declined },
            { value: 'expired', label: 'Expired', count: counts.expired },
          ]}
          activeTab={activeTab}
          onTabChange={(v) => setActiveTab(v as FilterTab)}
          search={searchQuery}
          onSearchChange={setSearchQuery}
          searchPlaceholder="Search document or signer…"
        />

        {isLoading ? (
          <LoadingBlocks />
        ) : filteredSignatures.length === 0 ? (
          <EmptyState
            title={searchQuery ? 'No signatures match your search' : 'No signature requests yet'}
            description={
              searchQuery
                ? 'Try adjusting your search or filter.'
                : 'Send a quote, invoice or variation for digital sign-off.'
            }
            action={!searchQuery ? 'Request signature' : undefined}
            onAction={!searchQuery ? () => setShowNewRequest(true) : undefined}
          />
        ) : (
          <ListCard>
            <ListCardHeader
              tone="indigo"
              title="Signature Requests"
              meta={<Pill tone="indigo">{filteredSignatures.length}</Pill>}
            />
            <ListBody>
              {filteredSignatures.map((sig) => {
                const tone = statusToTone[sig.status] ?? 'amber';
                const docType = sig.document_type ?? 'Document';
                const subtitle = `${sig.document_title} · sent ${formatRelative(sig.created_at)}`;
                return (
                  <ListRow
                    key={sig.id}
                    lead={<Avatar initials={getInitials(sig.signer_name)} />}
                    title={`${docType} — ${sig.signer_name}`}
                    subtitle={subtitle}
                    trailing={<Pill tone={tone}>{sig.status}</Pill>}
                    onClick={() => setDetailRequest(sig)}
                  />
                );
              })}
            </ListBody>
          </ListCard>
        )}
      </PageFrame>

      {/* New request sheet */}
      <Sheet open={showNewRequest} onOpenChange={setShowNewRequest}>
        <SheetContent
          side="bottom"
          className="h-[85vh] p-0 rounded-t-2xl bg-[hsl(0_0%_10%)] border-white/[0.06] flex flex-col"
        >
          <SheetHeader className="px-5 py-4 border-b border-white/[0.06]">
            <SheetTitle className="text-white text-[15px] font-semibold">
              Request signature
            </SheetTitle>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-5 space-y-5">
            <div className="space-y-2">
              <Label className="text-[12px] uppercase tracking-[0.14em] text-white">
                Document title *
              </Label>
              <Input
                placeholder="e.g. Electrical Installation Certificate"
                value={documentTitle}
                onChange={(e) => setDocumentTitle(e.target.value)}
className={inputClass}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-[12px] uppercase tracking-[0.14em] text-white">
                Document type
              </Label>
              <Select
                value={documentType}
                onValueChange={(v) => setDocumentType(v as DocumentType)}
              >
                <SelectTrigger className={selectTriggerClass}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className={selectContentClass}>
                  {documentTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-[12px] uppercase tracking-[0.14em] text-white">
                Linked job
              </Label>
              <Select value={selectedJobId} onValueChange={setSelectedJobId}>
                <SelectTrigger className={selectTriggerClass}>
                  <SelectValue placeholder="Select job (optional)" />
                </SelectTrigger>
                <SelectContent className={selectContentClass}>
                  {jobs?.map((job) => (
                    <SelectItem key={job.id} value={job.id}>
                      {job.title} — {job.client}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Divider label="Signer" />

            <div className="space-y-2">
              <Label className="text-[12px] uppercase tracking-[0.14em] text-white">
                Name *
              </Label>
              <Input
                placeholder="Customer or client name"
                value={signerName}
                onChange={(e) => setSignerName(e.target.value)}
className={inputClass}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-[12px] uppercase tracking-[0.14em] text-white">
                Email
              </Label>
              <Input
                type="email"
                placeholder="customer@example.com"
                value={signerEmail}
                onChange={(e) => setSignerEmail(e.target.value)}
className={inputClass}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-[12px] uppercase tracking-[0.14em] text-white">
                Phone
              </Label>
              <Input
                type="tel"
                placeholder="07xxx xxxxxx"
                value={signerPhone}
                onChange={(e) => setSignerPhone(e.target.value)}
className={inputClass}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-[12px] uppercase tracking-[0.14em] text-white">
                Message (optional)
              </Label>
              <Input
                placeholder="Personal message to include"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
className={inputClass}
              />
            </div>
          </div>

          <div className="px-5 py-4 border-t border-white/[0.06] flex gap-3">
            <SecondaryButton onClick={() => setShowNewRequest(false)} fullWidth>
              Cancel
            </SecondaryButton>
            <PrimaryButton
              onClick={handleCreateRequest}
              disabled={!documentTitle || !signerName || createRequest.isPending}
              fullWidth
            >
              {createRequest.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                'Send request'
              )}
            </PrimaryButton>
          </div>
        </SheetContent>
      </Sheet>

      {/* Detail sheet */}
      <Sheet
        open={!!detailRequest}
        onOpenChange={(open) => !open && setDetailRequest(null)}
      >
        <SheetContent
          side="bottom"
          className="h-[85vh] p-0 rounded-t-2xl bg-[hsl(0_0%_10%)] border-white/[0.06] flex flex-col"
        >
          {detailRequest && (
            <>
              <SheetHeader className="px-5 py-4 border-b border-white/[0.06]">
                <div className="flex items-center justify-between gap-3">
                  <SheetTitle className="text-white text-[15px] font-semibold truncate">
                    {detailRequest.document_title}
                  </SheetTitle>
                  <Pill tone={statusToTone[detailRequest.status] ?? 'amber'}>
                    {detailRequest.status}
                  </Pill>
                </div>
              </SheetHeader>

              <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-5 space-y-5">
                <ListCard>
                  <ListCardHeader tone="indigo" title="Signer" />
                  <ListBody>
                    <ListRow
                      lead={<Avatar initials={getInitials(detailRequest.signer_name)} />}
                      title={detailRequest.signer_name}
                      subtitle={detailRequest.signer_email || 'No email on file'}
                    />
                    {detailRequest.signer_phone && (
                      <ListRow
                        title="Phone"
                        subtitle={detailRequest.signer_phone}
                      />
                    )}
                    {detailRequest.job && (
                      <ListRow
                        title="Linked job"
                        subtitle={detailRequest.job.title}
                      />
                    )}
                    {detailRequest.linked_invoice && (
                      <ListRow
                        title="Linked invoice"
                        subtitle={detailRequest.linked_invoice}
                      />
                    )}
                  </ListBody>
                </ListCard>

                <StatStrip
                  columns={3}
                  stats={[
                    {
                      label: 'Type',
                      value: detailRequest.document_type ?? '—',
                    },
                    {
                      label: 'Created',
                      value: new Date(detailRequest.created_at).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                      }),
                    },
                    {
                      label: 'Signed',
                      value: detailRequest.signed_at
                        ? new Date(detailRequest.signed_at).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'short',
                          })
                        : '—',
                      tone: detailRequest.signed_at ? 'emerald' : undefined,
                    },
                  ]}
                />

                {detailRequest.status === 'Signed' && detailRequest.signature_url && (
                  <ListCard>
                    <ListCardHeader tone="emerald" title="Captured signature" />
                    <div className="p-5">
                      <div className="bg-white rounded-lg overflow-hidden">
                        <img
                          src={detailRequest.signature_url}
                          alt="Customer signature"
                          className="w-full h-32 object-contain"
                        />
                      </div>
                      {detailRequest.signed_at && (
                        <p className="mt-3 text-[12px] text-white">
                          Signed{' '}
                          {new Date(detailRequest.signed_at).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      )}
                    </div>
                  </ListCard>
                )}

                {detailRequest.message && (
                  <ListCard>
                    <ListCardHeader tone="amber" title="Message" />
                    <div className="p-5 text-[13px] text-white leading-relaxed">
                      {detailRequest.message}
                    </div>
                  </ListCard>
                )}
              </div>

              <div className="px-5 py-4 border-t border-white/[0.06] flex flex-wrap gap-2">
                {!['Signed', 'Declined', 'Expired'].includes(detailRequest.status) && (
                  <>
                    {detailRequest.access_token && (
                      <SecondaryButton onClick={() => handleCopyLink(detailRequest.access_token!)}>
                        <LinkIcon className="h-4 w-4 mr-2" />
                        Copy link
                      </SecondaryButton>
                    )}
                    <SecondaryButton
                      onClick={() => handleResend(detailRequest.id)}
                      disabled={resendRequest.isPending || !detailRequest.signer_email}
                    >
                      {resendRequest.isPending ? (
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      ) : (
                        <Mail className="h-4 w-4 mr-2" />
                      )}
                      Resend reminder
                    </SecondaryButton>
                    <PrimaryButton
                      onClick={() => handleMarkSigned(detailRequest.id)}
                      disabled={markAsSigned.isPending}
                    >
                      {markAsSigned.isPending ? (
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      ) : (
                        <CheckCircle className="h-4 w-4 mr-2" />
                      )}
                      Mark signed
                    </PrimaryButton>
                  </>
                )}
                {detailRequest.status === 'Signed' && (
                  <PrimaryButton>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </PrimaryButton>
                )}
                <DestructiveButton
                  onClick={() => handleDelete(detailRequest.id)}
                  disabled={deleteRequest.isPending}
                  className="ml-auto"
                >
                  {deleteRequest.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                </DestructiveButton>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
