/**
 * CredentialsPage
 *
 * Routed page (was CredentialsSheet bottom sheet) for workers to view their
 * Elec-ID and certifications. Chrome is provided by WorkerToolPage; the data
 * layer is carried over unchanged from the source sheet.
 */

import { useEffect, useMemo, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Award, AlertTriangle, CheckCircle2, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useMyCredentials } from '@/hooks/useWorkerSelfService';
import { useMyEmployeeRecord } from '@/hooks/useWorkerLocations';
import { supabase } from '@/integrations/supabase/client';
import { realtimeChannelName } from '@/lib/realtimeChannel';
import { WorkerToolPage } from '@/pages/electrician/worker-tools/WorkerToolPage';
import {
  Eyebrow,
  Pill,
  Dot,
  StatStrip,
  FilterBar,
  EmptyState,
  LoadingBlocks,
  PrimaryButton,
  SecondaryButton,
  type Tone,
} from '@/components/employer/editorial';

type ExpiryStatus = 'expired' | 'expiring' | 'warning' | 'valid';

interface ExpiryInfo {
  status: ExpiryStatus;
  label: string;
  tone: Tone;
  days: number;
}

type FilterValue = 'all' | 'attention' | 'valid';

export default function CredentialsPage() {
  const { data: credentials, isLoading } = useMyCredentials();
  const [filter, setFilter] = useState<FilterValue>('all');

  // The worker's own roster row id — the same id useMyCredentials reads
  // internally (and the second part of its query key).
  const employeeId = useMyEmployeeRecord().data?.id;
  const queryClient = useQueryClient();

  // Live: an employer adding or updating a certification against this worker's
  // roster row updates the page instantly — no manual reload.
  useEffect(() => {
    if (!employeeId) return;
    const channel = supabase
      .channel(realtimeChannelName('worker-credentials'))
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'employer_certifications',
          filter: `employee_id=eq.${employeeId}`,
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ['my-credentials', employeeId] });
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [employeeId, queryClient]);

  const getExpiryStatus = (expiryDate: string): ExpiryInfo => {
    const now = new Date();
    const expiry = new Date(expiryDate);
    const days = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    if (days < 0) {
      return { status: 'expired', label: 'Expired', tone: 'red', days };
    } else if (days <= 30) {
      return { status: 'expiring', label: `${days}d left`, tone: 'amber', days };
    } else if (days <= 90) {
      return { status: 'warning', label: `${days}d`, tone: 'amber', days };
    }
    return { status: 'valid', label: 'Valid', tone: 'emerald', days };
  };

  const certifications = useMemo(() => credentials?.certifications ?? [], [credentials]);

  // Summary counts for the stat strip (presentation only — derived from the
  // same data getExpiryStatus reads, no new data behaviour).
  const summary = useMemo(() => {
    let valid = 0;
    let dueSoon = 0;
    let expired = 0;
    for (const cert of certifications) {
      if (!cert.expiry_date) {
        valid += 1;
        continue;
      }
      const s = getExpiryStatus(cert.expiry_date).status;
      if (s === 'expired') expired += 1;
      else if (s === 'expiring' || s === 'warning') dueSoon += 1;
      else valid += 1;
    }
    return { total: certifications.length, valid, dueSoon, expired };
  }, [certifications]);

  // Sort: most-urgent first (expired → soonest expiry → no-expiry), so the
  // worker sees what needs action at the top. Derived from existing data only.
  const sortedCertifications = useMemo(() => {
    const rank = (status: ExpiryStatus | null) => {
      switch (status) {
        case 'expired':
          return 0;
        case 'expiring':
          return 1;
        case 'warning':
          return 2;
        case 'valid':
          return 3;
        default:
          return 4; // no expiry on file
      }
    };
    return [...certifications]
      .map((cert) => ({
        cert,
        expiry: cert.expiry_date ? getExpiryStatus(cert.expiry_date) : null,
      }))
      .sort((a, b) => {
        const r = rank(a.expiry?.status ?? null) - rank(b.expiry?.status ?? null);
        if (r !== 0) return r;
        return (a.expiry?.days ?? Infinity) - (b.expiry?.days ?? Infinity);
      });
  }, [certifications]);

  // In-page filter (tabs) — operates on the already-sorted list, existing data only.
  const visibleCertifications = useMemo(() => {
    if (filter === 'all') return sortedCertifications;
    if (filter === 'valid') {
      return sortedCertifications.filter(
        ({ expiry }) => !expiry || expiry.status === 'valid'
      );
    }
    // attention: expired + due soon
    return sortedCertifications.filter(
      ({ expiry }) =>
        expiry &&
        (expiry.status === 'expired' ||
          expiry.status === 'expiring' ||
          expiry.status === 'warning')
    );
  }, [sortedCertifications, filter]);

  const verified = credentials?.elecId?.verified ?? false;
  const cardNumber = credentials?.elecId?.cardNumber;
  const needsAttention = summary.expired + summary.dueSoon;

  const description = isLoading
    ? 'Loading your Elec-ID and tickets…'
    : needsAttention > 0
      ? `${needsAttention} ${needsAttention === 1 ? 'ticket needs' : 'tickets need'} attention`
      : 'Your Elec-ID and certifications';

  return (
    <WorkerToolPage
      eyebrow="Identity"
      title="Credentials"
      description={description}
      maxWidth="7xl"
      actions={
        <Link to="/elec-id" className="hidden sm:block">
          <SecondaryButton>
            <ExternalLink className="h-4 w-4 mr-2" aria-hidden />
            Full credentials
          </SecondaryButton>
        </Link>
      }
    >
      {isLoading ? (
        <LoadingBlocks />
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-[2fr_3fr]">
          {/* Left column (desktop) / first (mobile): Elec-ID identity + status */}
          <div className="space-y-6 sm:space-y-8 min-w-0">
          {/* Elec-ID identity card */}
          <section>
            <Eyebrow className="mb-2">Digital identity</Eyebrow>
            <div className="relative rounded-2xl bg-gradient-to-br from-elec-yellow/[0.12] to-white/[0.02] border border-elec-yellow/20 p-5 overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/80 via-amber-400/70 to-orange-400/70 opacity-80" />
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[15px] font-semibold text-white leading-tight">Elec-ID</p>
                  <p className="text-[12px] text-white/60 mt-0.5">Digital identity card</p>
                </div>
                <Pill tone={verified ? 'emerald' : 'amber'} className="shrink-0">
                  {verified ? (
                    <>
                      <CheckCircle2 className="h-3 w-3 mr-1" aria-hidden />
                      Verified
                    </>
                  ) : (
                    'Pending'
                  )}
                </Pill>
              </div>

              <div className="mt-4 pt-4 border-t border-white/[0.08]">
                <Eyebrow>Card number</Eyebrow>
                <p className="mt-1.5 text-[20px] font-semibold text-white font-mono tracking-wide tabular-nums">
                  {cardNumber ?? 'Not issued yet'}
                </p>
                {!cardNumber && (
                  <p className="mt-1 text-[11.5px] text-white/45 leading-snug">
                    Your employer issues your Elec-ID. Speak to them to get set up.
                  </p>
                )}
              </div>

              <Link to="/elec-id" className="mt-4 block">
                <PrimaryButton size="lg" fullWidth>
                  <ExternalLink className="h-5 w-5 mr-2" aria-hidden />
                  View full credentials
                </PrimaryButton>
              </Link>
            </div>
          </section>

          {/* Certifications summary — glanceable status at a glance */}
          {certifications.length > 0 && (
            <StatStrip
              columns={3}
              stats={[
                { label: 'Valid', value: summary.valid, tone: 'emerald' },
                {
                  label: 'Due soon',
                  value: summary.dueSoon,
                  tone: summary.dueSoon > 0 ? 'amber' : undefined,
                },
                {
                  label: 'Expired',
                  value: summary.expired,
                  tone: summary.expired > 0 ? 'red' : undefined,
                },
              ]}
            />
          )}
          </div>

          {/* Right column (desktop) / second (mobile): certifications list */}
          <div className="space-y-6 sm:space-y-8 min-w-0">
          {/* Certifications list */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <Eyebrow>Certifications</Eyebrow>
              {certifications.length > 0 && (
                <span className="text-[11px] text-white/40 tabular-nums">
                  {certifications.length} on file
                </span>
              )}
            </div>

            {certifications.length === 0 ? (
              <EmptyState
                title="No certifications on file"
                description="Your employer records your certifications against your profile. Speak to them to get your tickets added."
              />
            ) : (
              <>
                <FilterBar
                  tabs={[
                    { value: 'all', label: 'All', count: summary.total },
                    { value: 'attention', label: 'Needs attention', count: needsAttention },
                    { value: 'valid', label: 'Valid', count: summary.valid },
                  ]}
                  activeTab={filter}
                  onTabChange={(v) => setFilter(v as FilterValue)}
                />

                {visibleCertifications.length === 0 ? (
                  <EmptyState
                    title="Nothing here"
                    description={
                      filter === 'attention'
                        ? 'None of your certifications need attention right now.'
                        : 'No certifications match this filter.'
                    }
                  />
                ) : (
                  <div className="space-y-2.5">
                    {visibleCertifications.map(({ cert, expiry }) => (
                      <div
                        key={cert.id}
                        className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4 transition-colors hover:bg-white/[0.06]"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-3 min-w-0 flex-1">
                            <div className="h-9 w-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center shrink-0">
                              <Award className="h-4 w-4 text-white/70" aria-hidden />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-[14px] font-semibold text-white leading-snug">
                                {cert.name}
                              </p>
                              {cert.issuer && (
                                <p className="text-[12px] text-white/60 mt-0.5">{cert.issuer}</p>
                              )}
                              {cert.certificate_number && (
                                <p className="text-[11px] text-white/45 font-mono mt-1">
                                  #{cert.certificate_number}
                                </p>
                              )}
                            </div>
                          </div>
                          {expiry && (
                            <Pill tone={expiry.tone} className="shrink-0">
                              {expiry.status === 'expired' && (
                                <AlertTriangle className="h-3 w-3 mr-1" aria-hidden />
                              )}
                              {expiry.status === 'valid' && (
                                <CheckCircle2 className="h-3 w-3 mr-1" aria-hidden />
                              )}
                              {expiry.label}
                            </Pill>
                          )}
                        </div>
                        {cert.expiry_date && (
                          <div className="mt-3 pt-3 border-t border-white/[0.06] flex items-center justify-between">
                            <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wide text-white/40">
                              {expiry && expiry.status !== 'valid' && <Dot tone={expiry.tone} />}
                              {expiry && expiry.status === 'expired' ? 'Expired' : 'Expires'}
                            </span>
                            <span className="text-[12.5px] font-medium text-white tabular-nums">
                              {new Date(cert.expiry_date).toLocaleDateString('en-GB', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                              })}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </section>
          </div>
        </div>
      )}
    </WorkerToolPage>
  );
}
