import { useMemo, useState } from 'react';
import { RefreshCw, AlertTriangle } from 'lucide-react';
import {
  useComplianceDocuments,
  useComplianceStats,
  type ComplianceDocument,
} from '@/hooks/useComplianceDocuments';
import {
  PageFrame,
  PageHero,
  StatStrip,
  FilterBar,
  ListCard,
  ListCardHeader,
  ListBody,
  ListRow,
  Pill,
  EmptyState,
  LoadingBlocks,
  IconButton,
  type Tone,
} from '@/components/employer/editorial';

type FilterValue = 'all' | 'insurance' | 'pat' | 'calibration' | 'audits';

const FILTER_TABS: { value: FilterValue; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'insurance', label: 'Insurance' },
  { value: 'pat', label: 'PAT' },
  { value: 'calibration', label: 'Calibration' },
  { value: 'audits', label: 'Audits' },
];

function classifyDocument(doc: ComplianceDocument): FilterValue {
  const haystack = `${doc.title ?? ''} ${doc.category ?? ''} ${doc.document_type ?? ''}`.toLowerCase();
  if (haystack.includes('insurance')) return 'insurance';
  if (haystack.includes('pat') || haystack.includes('portable appliance')) return 'pat';
  if (haystack.includes('calibration') || haystack.includes('calibrate')) return 'calibration';
  if (haystack.includes('audit')) return 'audits';
  return 'all';
}

function daysUntil(dateStr?: string | null): number | null {
  if (!dateStr) return null;
  const target = new Date(dateStr);
  if (Number.isNaN(target.getTime())) return null;
  const now = new Date();
  const diffMs = target.getTime() - now.getTime();
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}

function statusForDoc(doc: ComplianceDocument): {
  label: string;
  tone: Tone;
  bucket: 'on-track' | 'due-soon' | 'overdue';
} {
  const days = daysUntil(doc.expiry_date);
  if (days === null) {
    return { label: doc.status || 'Active', tone: 'cyan', bucket: 'on-track' };
  }
  if (days < 0) return { label: `Overdue ${Math.abs(days)}d`, tone: 'red', bucket: 'overdue' };
  if (days <= 30) return { label: `Due in ${days}d`, tone: 'amber', bucket: 'due-soon' };
  return { label: `Renews ${days}d`, tone: 'emerald', bucket: 'on-track' };
}

function formatDate(dateStr?: string | null): string {
  if (!dateStr) return 'no expiry';
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

function formatDateTime(dateStr?: string | null): string {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function ComplianceSection() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterValue>('all');
  const [selected, setSelected] = useState<ComplianceDocument | null>(null);

  const { data: documents, isLoading, error, refetch } = useComplianceDocuments();
  const { data: stats } = useComplianceStats();

  const enriched = useMemo(() => {
    return (documents ?? []).map((doc) => ({
      doc,
      kind: classifyDocument(doc),
      status: statusForDoc(doc),
    }));
  }, [documents]);

  const counters = useMemo(() => {
    let onTrack = 0;
    let dueSoon = 0;
    let overdue = 0;
    let audits = 0;
    for (const item of enriched) {
      if (item.status.bucket === 'on-track') onTrack += 1;
      if (item.status.bucket === 'due-soon') dueSoon += 1;
      if (item.status.bucket === 'overdue') overdue += 1;
      if (item.kind === 'audits') audits += 1;
    }
    if (stats?.total !== undefined && enriched.length === 0) {
      onTrack = stats.compliant ?? onTrack;
      dueSoon = stats.expiring ?? dueSoon;
      overdue = stats.expired ?? overdue;
    }
    return { onTrack, dueSoon, overdue, audits };
  }, [enriched, stats]);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return enriched
      .filter((item) => {
        if (filter !== 'all' && item.kind !== filter) return false;
        if (!term) return true;
        const haystack = `${item.doc.title ?? ''} ${item.doc.category ?? ''} ${item.doc.document_type ?? ''}`.toLowerCase();
        return haystack.includes(term);
      })
      .sort((a, b) => {
        const ad = a.doc.expiry_date ? new Date(a.doc.expiry_date).getTime() : Number.POSITIVE_INFINITY;
        const bd = b.doc.expiry_date ? new Date(b.doc.expiry_date).getTime() : Number.POSITIVE_INFINITY;
        return ad - bd;
      });
  }, [enriched, filter, search]);

  const renewalReminders = useMemo(() => {
    return enriched
      .filter((item) => item.status.bucket !== 'on-track')
      .sort((a, b) => {
        const ad = a.doc.expiry_date ? new Date(a.doc.expiry_date).getTime() : Number.POSITIVE_INFINITY;
        const bd = b.doc.expiry_date ? new Date(b.doc.expiry_date).getTime() : Number.POSITIVE_INFINITY;
        return ad - bd;
      })
      .slice(0, 6);
  }, [enriched]);

  const auditTrail = useMemo(() => {
    return [...(documents ?? [])]
      .sort((a, b) => {
        const at = new Date(a.updated_at ?? a.created_at ?? 0).getTime();
        const bt = new Date(b.updated_at ?? b.created_at ?? 0).getTime();
        return bt - at;
      })
      .slice(0, 8);
  }, [documents]);

  if (error) {
    return (
      <PageFrame>
        <PageHero
          eyebrow="HR & Safety"
          title="Compliance"
          description="Insurance renewals, PAT schedule, calibration and audit trail."
          tone="cyan"
          actions={
            <IconButton onClick={() => refetch()} aria-label="Retry">
              <RefreshCw className="h-4 w-4" />
            </IconButton>
          }
        />
        <EmptyState
          title="Failed to load compliance data"
          description="We could not retrieve compliance documents. Please retry."
          action="Retry"
          onAction={() => refetch()}
        />
      </PageFrame>
    );
  }

  return (
    <PageFrame>
      <PageHero
        eyebrow="HR & Safety"
        title="Compliance"
        description="Insurance renewals, PAT schedule, calibration and audit trail."
        tone="cyan"
        actions={
          <IconButton onClick={() => refetch()} aria-label="Refresh">
            <RefreshCw className="h-4 w-4" />
          </IconButton>
        }
      />

      <StatStrip
        columns={4}
        stats={[
          { label: 'On track', value: counters.onTrack, tone: 'emerald' },
          { label: 'Due 30d', value: counters.dueSoon, tone: 'amber' },
          { label: 'Overdue', value: counters.overdue, tone: 'red' },
          { label: 'Audits complete', value: counters.audits, accent: true },
        ]}
      />

      <FilterBar
        tabs={FILTER_TABS}
        activeTab={filter}
        onTabChange={(value) => setFilter(value as FilterValue)}
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search compliance…"
      />

      {isLoading ? (
        <LoadingBlocks />
      ) : (
        <>
          <ListCard>
            <ListCardHeader
              tone="cyan"
              title="Compliance Calendar"
              meta={<Pill tone="cyan">{filtered.length}</Pill>}
            />
            <ListBody>
              {filtered.length === 0 ? (
                <div className="px-4 py-8">
                  <EmptyState
                    title="No matching compliance items"
                    description="Adjust the filters or search to see scheduled renewals."
                  />
                </div>
              ) : (
                filtered.map((item) => (
                  <ListRow
                    key={item.doc.id}
                    title={item.doc.title}
                    subtitle={`${item.doc.document_type ?? item.doc.category ?? 'Document'} \u00B7 renews ${formatDate(item.doc.expiry_date)}`}
                    trailing={<Pill tone={item.status.tone}>{item.status.label}</Pill>}
                    onClick={() => setSelected(item.doc)}
                  />
                ))
              )}
            </ListBody>
          </ListCard>

          {renewalReminders.length > 0 && (
            <ListCard>
              <ListCardHeader
                tone="amber"
                title="Renewal Reminders"
                meta={<Pill tone="amber">{renewalReminders.length}</Pill>}
              />
              <ListBody>
                {renewalReminders.map((item) => (
                  <ListRow
                    key={`reminder-${item.doc.id}`}
                    title={item.doc.title}
                    subtitle={`${item.doc.category ?? item.doc.document_type ?? 'Document'} \u00B7 ${formatDate(item.doc.expiry_date)}`}
                    trailing={<Pill tone={item.status.tone}>{item.status.label}</Pill>}
                    onClick={() => setSelected(item.doc)}
                  />
                ))}
              </ListBody>
            </ListCard>
          )}

          <ListCard>
            <ListCardHeader
              tone="indigo"
              title="Audit Trail"
              meta={<Pill tone="indigo">{auditTrail.length}</Pill>}
            />
            <ListBody>
              {auditTrail.length === 0 ? (
                <div className="px-4 py-8">
                  <EmptyState
                    title="No recent activity"
                    description="Compliance updates and signatures will appear here."
                  />
                </div>
              ) : (
                auditTrail.map((doc) => {
                  const wasUpdated = doc.updated_at && doc.updated_at !== doc.created_at;
                  const action = wasUpdated ? 'Updated' : 'Created';
                  const when = formatDateTime(doc.updated_at ?? doc.created_at);
                  const tone: Tone = wasUpdated ? 'emerald' : 'cyan';
                  return (
                    <ListRow
                      key={`audit-${doc.id}-${doc.updated_at ?? doc.created_at}`}
                      title={`${action} \u00B7 ${doc.title}`}
                      subtitle={`${doc.category ?? doc.document_type ?? 'Document'} \u00B7 ${when}`}
                      trailing={<Pill tone={tone}>{action}</Pill>}
                      onClick={() => setSelected(doc)}
                    />
                  );
                })
              )}
            </ListBody>
          </ListCard>
        </>
      )}

      {selected && (
        <ListCard>
          <ListCardHeader
            tone="yellow"
            title={selected.title}
            meta={<Pill tone={statusForDoc(selected).tone}>{statusForDoc(selected).label}</Pill>}
            action="Close"
            onAction={() => setSelected(null)}
          />
          <ListBody>
            <ListRow
              title="Type"
              subtitle={selected.document_type ?? '—'}
              trailing={<span className="text-[12px] text-white">{selected.category ?? '—'}</span>}
            />
            <ListRow
              title="Renews"
              subtitle={formatDate(selected.expiry_date)}
              trailing={
                <Pill tone={statusForDoc(selected).tone}>{statusForDoc(selected).label}</Pill>
              }
            />
            {selected.signatures_required > 0 && (
              <ListRow
                title="Signatures"
                subtitle={`${selected.signatures_collected}/${selected.signatures_required} collected`}
                trailing={
                  <Pill
                    tone={
                      selected.signatures_collected >= selected.signatures_required
                        ? 'emerald'
                        : 'amber'
                    }
                  >
                    {selected.signatures_collected >= selected.signatures_required
                      ? 'Complete'
                      : 'Pending'}
                  </Pill>
                }
              />
            )}
            <ListRow
              title="Created"
              subtitle={formatDateTime(selected.created_at)}
              trailing={
                selected.updated_at && selected.updated_at !== selected.created_at ? (
                  <span className="text-[12px] text-white">
                    Updated {formatDateTime(selected.updated_at)}
                  </span>
                ) : null
              }
            />
          </ListBody>
        </ListCard>
      )}

      {!isLoading && !error && (documents?.length ?? 0) === 0 && (
        <EmptyState
          title="No compliance records yet"
          description="Insurance, PAT and calibration renewals will appear here once added."
        />
      )}

      {error && (
        <div className="hidden">
          <AlertTriangle aria-hidden />
        </div>
      )}
    </PageFrame>
  );
}
