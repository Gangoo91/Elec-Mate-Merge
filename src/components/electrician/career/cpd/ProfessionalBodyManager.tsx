/**
 * ProfessionalBodyManager — editorial body memberships manager.
 *
 * Type-led: hero with Add CTA, gradient-surface membership cards with
 * tabular-num details, renewal status accent, CPD requirement strip,
 * destructive remove dialog. Drops shadcn Card chrome and the green/red
 * Active/Inactive badges for editorial accents.
 */

import React, { useState, useEffect } from 'react';
import { openExternalUrl } from '@/utils/open-external-url';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog';
import {
  Award,
  Plus,
  Trash2,
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  ArrowRight,
} from 'lucide-react';
import {
  professionalBodyService,
  UserProfessionalMembership,
} from '@/services/professionalBodyService';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import ProfessionalBodySelector from './ProfessionalBodySelector';
import { useHaptic } from '@/hooks/useHaptic';
import { Eyebrow } from '@/components/college/primitives';
import { cn } from '@/lib/utils';

interface ProfessionalBodyManagerProps {
  onClose?: () => void;
}

const ProfessionalBodyManager: React.FC<ProfessionalBodyManagerProps> = () => {
  const [memberships, setMemberships] = useState<UserProfessionalMembership[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [membershipToDelete, setMembershipToDelete] =
    useState<UserProfessionalMembership | null>(null);
  const [deleting, setDeleting] = useState(false);
  const { toast } = useToast();
  const haptic = useHaptic();

  useEffect(() => {
    loadMemberships();
  }, []);

  const loadMemberships = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;
      const userMemberships = await professionalBodyService.getUserMemberships(user.id);
      setMemberships(userMemberships);
    } catch (error) {
      console.error('Error loading memberships:', error);
      toast({
        title: 'Error loading memberships',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddMembership = (newMemberships: UserProfessionalMembership[]) => {
    setMemberships(newMemberships);
    setShowAddDialog(false);
    toast({
      title: 'Body added',
      description: 'Tracking your new professional body membership.',
    });
  };

  const handleDeleteMembership = async () => {
    if (!membershipToDelete) return;
    haptic.heavy();
    setDeleting(true);
    try {
      await professionalBodyService.removeUserMembership(membershipToDelete.id);
      setMemberships((prev) => prev.filter((m) => m.id !== membershipToDelete.id));
      setShowDeleteDialog(false);
      setMembershipToDelete(null);
      toast({
        title: 'Membership removed',
        description: 'No longer tracking this body.',
      });
    } catch (error) {
      console.error('Error removing membership:', error);
      toast({
        title: 'Error removing membership',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setDeleting(false);
    }
  };

  const formatDate = (s: string) =>
    new Date(s).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

  const renewalDays = (renewalDate: string) =>
    Math.ceil((new Date(renewalDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));

  const renewalStatus = (renewalDate: string) => {
    const days = renewalDays(renewalDate);
    if (days < 0) return { tone: 'text-red-300', label: 'Overdue', icon: AlertTriangle };
    if (days <= 30) return { tone: 'text-amber-300', label: 'Due soon', icon: AlertTriangle };
    return { tone: 'text-emerald-300', label: 'Current', icon: CheckCircle };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-elec-yellow" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="flex items-end justify-between gap-3 flex-wrap">
        <div className="space-y-2">
          <Eyebrow>MEMBERSHIPS</Eyebrow>
          <h2 className="text-[24px] sm:text-[28px] font-semibold tracking-tight leading-tight">
            <span className="text-elec-yellow">Manage</span>{' '}
            <span className="text-white">your bodies.</span>
          </h2>
          <p className="text-[12.5px] leading-relaxed text-white/85 max-w-xl">
            Bodies you're registered with — renewal dates, CPD requirements, scheme links.
          </p>
        </div>

        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <button
              type="button"
              className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-black bg-elec-yellow hover:bg-elec-yellow/90 active:bg-elec-yellow/85 rounded-full px-4 py-2.5 min-h-[40px] touch-manipulation transition-colors"
            >
              <Plus className="h-4 w-4" />
              Add membership
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] border-white/[0.10]">
            <DialogHeader>
              <DialogTitle className="text-white">Add professional body membership</DialogTitle>
              <DialogDescription className="text-white/85">
                Pick the bodies you're registered with — pre-fills CPD requirements automatically.
              </DialogDescription>
            </DialogHeader>
            <ProfessionalBodySelector onComplete={handleAddMembership} />
          </DialogContent>
        </Dialog>
      </section>

      {/* List */}
      {memberships.length === 0 ? (
        <div className="rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] border border-white/[0.10] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] p-8 sm:p-10 text-center">
          <div className="w-12 h-12 mx-auto rounded-xl bg-elec-yellow/[0.08] border border-elec-yellow/30 inline-flex items-center justify-center">
            <Award className="h-5 w-5 text-elec-yellow" aria-hidden />
          </div>
          <h3 className="mt-4 text-[20px] font-semibold tracking-tight text-white">
            No memberships yet.
          </h3>
          <p className="mt-2 text-[13px] leading-relaxed text-white/85 max-w-md mx-auto">
            Add your IET / NICEIC / ECA / NAPIT membership to enable CPD tracking and renewal
            alerts.
          </p>
          <button
            type="button"
            onClick={() => setShowAddDialog(true)}
            className="mt-5 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-black bg-elec-yellow hover:bg-elec-yellow/90 active:bg-elec-yellow/85 rounded-full px-4 py-2.5 min-h-[40px] touch-manipulation transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add first membership
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div className="grid gap-3">
          {memberships.map((membership) => {
            const status = membership.renewal_date
              ? renewalStatus(membership.renewal_date)
              : null;
            const StatusIcon = status?.icon;
            const renewalDue =
              membership.renewal_date &&
              renewalDays(membership.renewal_date) >= 0 &&
              renewalDays(membership.renewal_date) <= 30;

            return (
              <div
                key={membership.id}
                className="rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] border border-white/[0.10] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] p-5 sm:p-6"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-elec-yellow/[0.08] border border-elec-yellow/30 shrink-0">
                      <Award className="h-5 w-5 text-elec-yellow" aria-hidden />
                    </div>
                    <div className="min-w-0">
                      <Eyebrow>{membership.professional_body?.code}</Eyebrow>
                      <h3 className="mt-1 text-[16px] font-semibold tracking-tight text-white truncate">
                        {membership.professional_body?.name}
                      </h3>
                      <p className="mt-0.5 text-[12px] leading-relaxed text-white/85 line-clamp-2">
                        {membership.professional_body?.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={cn(
                        'text-[10px] font-semibold uppercase tracking-[0.14em] border rounded-md px-1.5 py-0.5',
                        membership.is_active
                          ? 'text-emerald-300 border-emerald-500/40 bg-emerald-500/[0.08]'
                          : 'text-red-300 border-red-500/40 bg-red-500/[0.08]'
                      )}
                    >
                      {membership.is_active ? 'Active' : 'Inactive'}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setMembershipToDelete(membership);
                        setShowDeleteDialog(true);
                      }}
                      aria-label="Remove"
                      className="text-white/65 hover:text-red-300 inline-flex items-center justify-center h-8 w-8 rounded-md border border-white/15 hover:border-red-500/40 transition-colors touch-manipulation"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {/* Details */}
                <dl className="mt-4 pt-4 border-t border-white/[0.06] grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-3 text-[11px]">
                  <Detail
                    label="Membership #"
                    value={
                      membership.membership_number ? (
                        <span className="tabular-nums">{membership.membership_number}</span>
                      ) : (
                        '—'
                      )
                    }
                  />
                  <Detail
                    label="Registered"
                    value={
                      membership.registration_date ? (
                        <span className="tabular-nums">
                          {formatDate(membership.registration_date)}
                        </span>
                      ) : (
                        '—'
                      )
                    }
                  />
                  <Detail
                    label="Next renewal"
                    value={
                      <span
                        className={cn(
                          'inline-flex items-center gap-1 tabular-nums',
                          status?.tone || 'text-white'
                        )}
                      >
                        {StatusIcon && <StatusIcon className="h-3 w-3 self-center" aria-hidden />}
                        {membership.renewal_date ? formatDate(membership.renewal_date) : 'Not set'}
                      </span>
                    }
                  />
                </dl>

                {/* CPD requirement */}
                <div className="mt-4 flex items-baseline justify-between gap-3 rounded-xl border border-white/[0.10] bg-white/[0.02] p-3">
                  <div>
                    <Eyebrow>CPD REQUIREMENT</Eyebrow>
                    <p className="mt-1 text-[13px] tabular-nums text-white">
                      <span className="text-elec-yellow font-semibold">
                        {membership.professional_body?.annual_cpd_hours}h
                      </span>{' '}
                      <span className="text-white/85">annually</span>
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      openExternalUrl(membership.professional_body?.website_url || '')
                    }
                    className="inline-flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-white/85 border border-white/15 hover:border-elec-yellow/40 hover:text-elec-yellow rounded-full px-3 py-1.5 min-h-[32px] touch-manipulation transition-colors"
                  >
                    Guidelines
                    <ExternalLink className="h-3 w-3" />
                  </button>
                </div>

                {/* Renewal warning */}
                {renewalDue && membership.renewal_date && (
                  <div className="mt-3 rounded-xl border border-amber-500/30 bg-amber-500/[0.05] p-3">
                    <div className="flex items-baseline gap-2.5">
                      <AlertTriangle
                        className="h-3.5 w-3.5 text-amber-300 self-center"
                        aria-hidden
                      />
                      <p className="text-[12.5px] text-amber-200 tabular-nums">
                        Renewal due soon —{' '}
                        <span className="font-semibold">
                          {formatDate(membership.renewal_date)}
                        </span>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <ConfirmationDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        title="Remove membership"
        description={`Stop tracking your ${membershipToDelete?.professional_body?.name} membership? CPD against this body won't be counted afterwards.`}
        confirmText="Remove"
        cancelText="Cancel"
        onConfirm={handleDeleteMembership}
        variant="destructive"
        loading={deleting}
      />
    </div>
  );
};

const Detail = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="min-w-0">
    <dt className="text-[9.5px] uppercase tracking-[0.14em] font-semibold text-white/65">
      {label}
    </dt>
    <dd className="mt-0.5 text-[13px] text-white truncate">{value}</dd>
  </div>
);

export default ProfessionalBodyManager;
