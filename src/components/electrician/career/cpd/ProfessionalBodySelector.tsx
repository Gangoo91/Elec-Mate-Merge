/**
 * ProfessionalBodySelector — editorial onboarding selector.
 *
 * Type-led: hero ("Pick your bodies."), gradient-surface body cards with
 * checkbox + collapsible membership input, sticky completion CTA. Drops
 * stock Card chrome and the ring-2 highlight for editorial accent.
 */

import React, { useState, useEffect } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle, Clock, BookOpen, ExternalLink, ArrowRight } from 'lucide-react';
import {
  professionalBodyService,
  ProfessionalBody,
  UserProfessionalMembership,
} from '@/services/professionalBodyService';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Eyebrow } from '@/components/college/primitives';
import { cn } from '@/lib/utils';

interface ProfessionalBodySelectorProps {
  onComplete: (memberships: UserProfessionalMembership[]) => void;
}

const ProfessionalBodySelector: React.FC<ProfessionalBodySelectorProps> = ({ onComplete }) => {
  const [professionalBodies, setProfessionalBodies] = useState<ProfessionalBody[]>([]);
  const [selectedBodies, setSelectedBodies] = useState<string[]>([]);
  const [membershipNumbers, setMembershipNumbers] = useState<Record<string, string>>({});
  const [renewalDates, setRenewalDates] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadProfessionalBodies();
  }, []);

  const loadProfessionalBodies = async () => {
    try {
      const bodies = await professionalBodyService.getAllProfessionalBodies();
      setProfessionalBodies(bodies);
    } catch (error) {
      console.error('Error loading professional bodies:', error);
      toast({
        title: 'Error loading professional bodies',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBodySelection = (bodyId: string, checked: boolean) => {
    if (checked) {
      setSelectedBodies((prev) => [...prev, bodyId]);
    } else {
      setSelectedBodies((prev) => prev.filter((id) => id !== bodyId));
      setMembershipNumbers((prev) => ({ ...prev, [bodyId]: '' }));
      setRenewalDates((prev) => ({ ...prev, [bodyId]: '' }));
    }
  };

  const handleComplete = async () => {
    if (selectedBodies.length === 0) {
      toast({
        title: 'No professional bodies selected',
        description: 'Please select at least one professional body.',
        variant: 'destructive',
      });
      return;
    }
    setSaving(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('No authenticated user');
      const memberships: UserProfessionalMembership[] = [];
      for (const bodyId of selectedBodies) {
        const renewalDate = renewalDates[bodyId] ? new Date(renewalDates[bodyId]) : null;
        const registrationDate = new Date();
        registrationDate.setFullYear(registrationDate.getFullYear() - 1);
        const membership = await professionalBodyService.addUserMembership({
          user_id: user.id,
          professional_body_id: bodyId,
          membership_number: membershipNumbers[bodyId] || undefined,
          registration_date: registrationDate.toISOString().split('T')[0],
          renewal_date: renewalDate ? renewalDate.toISOString().split('T')[0] : undefined,
          is_active: true,
        });
        memberships.push(membership);
      }
      toast({
        title: 'Memberships added',
        description: `Tracking ${memberships.length} body ${memberships.length === 1 ? 'membership' : 'memberships'}.`,
      });
      onComplete(memberships);
    } catch (error) {
      console.error('Error saving memberships:', error);
      toast({
        title: 'Error saving memberships',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-elec-yellow" />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-24 sm:pb-6">
      {/* Hero */}
      <section className="space-y-2">
        <Eyebrow>SET UP</Eyebrow>
        <h2 className="text-[26px] sm:text-[32px] font-semibold tracking-tight leading-tight">
          <span className="text-elec-yellow">Pick</span>{' '}
          <span className="text-white">your bodies.</span>
        </h2>
        <p className="text-[13px] leading-relaxed text-white/85 max-w-2xl">
          Track CPD against the schemes you actually belong to. Hours, categories and renewal
          dates pre-fill from each body's published requirements.
        </p>
      </section>

      <div className="grid gap-3 md:grid-cols-2">
        {professionalBodies.map((body) => {
          const selected = selectedBodies.includes(body.id);
          return (
            <div
              key={body.id}
              className={cn(
                'rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] border shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] p-5 transition-colors',
                selected ? 'border-elec-yellow/40' : 'border-white/[0.10]'
              )}
            >
              <div className="flex items-start gap-3">
                <Checkbox
                  id={body.id}
                  checked={selected}
                  onCheckedChange={(checked) => handleBodySelection(body.id, checked as boolean)}
                  className="mt-1 border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2 flex-wrap">
                    <h3 className="text-[15px] font-semibold tracking-tight text-white">
                      {body.name}
                    </h3>
                    {body.website_url && (
                      <a
                        href={body.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        aria-label={`Open ${body.name} website`}
                        className="text-white/65 hover:text-elec-yellow inline-flex items-center justify-center h-7 w-7 rounded-md border border-white/15 hover:border-elec-yellow/40 transition-colors touch-manipulation"
                      >
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                  <p className="mt-1 text-[12.5px] leading-relaxed text-white/85">
                    {body.description}
                  </p>
                </div>
              </div>

              <dl className="mt-4 pt-3 border-t border-white/[0.06] grid grid-cols-2 gap-x-4 gap-y-1.5 text-[11px]">
                <Fact
                  label="Annual CPD"
                  value={
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3 w-3 text-white/65 self-center" aria-hidden />
                      <span className="tabular-nums">{body.annual_cpd_hours}h</span>
                    </span>
                  }
                />
                <Fact
                  label="Cycle"
                  value={<span className="tabular-nums">{body.assessment_cycle}</span>}
                />
              </dl>

              {body.categories.length > 0 && (
                <div className="mt-3">
                  <div className="flex items-baseline gap-1.5">
                    <BookOpen className="h-3 w-3 text-white/65 self-center" aria-hidden />
                    <Eyebrow>{body.categories.length} CATEGORIES</Eyebrow>
                  </div>
                  <ul className="mt-1.5 flex flex-wrap gap-1">
                    {body.categories.slice(0, 3).map((cat) => (
                      <li
                        key={cat.id}
                        className="text-[10px] uppercase tracking-[0.12em] text-white/85 border border-white/15 rounded-md px-1.5 py-0.5"
                      >
                        {cat.name} ({cat.min_hours}h)
                      </li>
                    ))}
                    {body.categories.length > 3 && (
                      <li className="text-[10px] uppercase tracking-[0.12em] text-white/65 px-1.5 py-0.5">
                        +{body.categories.length - 3}
                      </li>
                    )}
                  </ul>
                </div>
              )}

              {selected && (
                <div className="mt-4 pt-3 border-t border-white/[0.06] space-y-3">
                  <div className="space-y-1.5">
                    <Label
                      htmlFor={`membership-${body.id}`}
                      className="text-[10.5px] uppercase tracking-[0.14em] font-semibold text-white/65"
                    >
                      Membership number (optional)
                    </Label>
                    <Input
                      id={`membership-${body.id}`}
                      placeholder="e.g. 1234567"
                      value={membershipNumbers[body.id] || ''}
                      onChange={(e) =>
                        setMembershipNumbers((p) => ({ ...p, [body.id]: e.target.value }))
                      }
                      className="h-10 bg-white/[0.04] border-white/[0.10] text-white placeholder:text-white/65 focus-visible:border-elec-yellow/50"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label
                      htmlFor={`renewal-${body.id}`}
                      className="text-[10.5px] uppercase tracking-[0.14em] font-semibold text-white/65"
                    >
                      Next renewal (optional)
                    </Label>
                    <Input
                      id={`renewal-${body.id}`}
                      type="date"
                      value={renewalDates[body.id] || ''}
                      onChange={(e) =>
                        setRenewalDates((p) => ({ ...p, [body.id]: e.target.value }))
                      }
                      className="h-10 bg-white/[0.04] border-white/[0.10] text-white tabular-nums focus-visible:border-elec-yellow/50"
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {selectedBodies.length > 0 && (
        <div className="fixed sm:static bottom-0 left-0 right-0 px-4 sm:px-0 py-4 sm:py-0 bg-[hsl(0_0%_8%)]/95 sm:bg-transparent backdrop-blur-xl sm:backdrop-blur-0 border-t border-white/[0.08] sm:border-0 z-30">
          <button
            type="button"
            onClick={handleComplete}
            disabled={saving}
            className="w-full sm:w-auto sm:mx-auto sm:flex sm:min-w-[260px] inline-flex items-center justify-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-black bg-elec-yellow hover:bg-elec-yellow/90 active:bg-elec-yellow/85 rounded-full px-5 py-3 min-h-[44px] touch-manipulation transition-colors disabled:opacity-50"
          >
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black" />
                Setting up…
              </>
            ) : (
              <>
                <CheckCircle className="h-4 w-4" />
                Complete setup · {selectedBodies.length} selected
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

const Fact = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="inline-flex items-baseline gap-1.5 min-w-0">
    <dt className="text-[9.5px] uppercase tracking-[0.14em] font-semibold text-white/65 shrink-0">
      {label}
    </dt>
    <dd className="text-white tabular-nums truncate">{value}</dd>
  </div>
);

export default ProfessionalBodySelector;
