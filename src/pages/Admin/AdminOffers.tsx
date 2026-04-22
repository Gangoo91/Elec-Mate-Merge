import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
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
import PullToRefresh from '@/components/admin/PullToRefresh';
import { useHaptic } from '@/hooks/useHaptic';
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
  IconButton,
  LoadingBlocks,
  EmptyState,
  Divider,
  type Tone,
} from '@/components/admin/editorial';
import {
  Plus,
  Copy,
  Check,
  Trash2,
  Loader2,
  RefreshCw,
  Send,
} from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import { toast } from '@/hooks/use-toast';
import { copyToClipboard } from '@/utils/clipboard';

interface Offer {
  id: string;
  name: string;
  code: string;
  price: number;
  plan_id: string;
  max_redemptions: number | null;
  redemptions: number;
  expires_at: string | null;
  is_active: boolean;
  created_at: string;
}

interface Redemption {
  id: string;
  redeemed_at: string;
  amount_paid: number | null;
  profiles: {
    id: string;
    full_name: string | null;
    email?: string;
  } | null;
}

interface SentEmail {
  id: string;
  email: string;
  sent_at: string;
  status: string;
}

type FilterTab = 'active' | 'scheduled' | 'expired' | 'all';

export default function AdminOffers() {
  const { profile } = useAuth();
  const queryClient = useQueryClient();
  const [createOpen, setCreateOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [deleteOfferId, setDeleteOfferId] = useState<string | null>(null);
  const [sendOffer, setSendOffer] = useState<Offer | null>(null);
  const [sendEmail, setSendEmail] = useState('');
  const [activeTab, setActiveTab] = useState<FilterTab>('active');
  const [search, setSearch] = useState('');

  const [newOffer, setNewOffer] = useState({
    name: '',
    price: '3.99',
    plan_id: 'electrician',
    max_redemptions: '',
    expires_days: '30',
  });

  const haptic = useHaptic();
  const isSuperAdmin = profile?.admin_role === 'super_admin';

  const { data: offers, isLoading, refetch } = useQuery({
    queryKey: ['admin-offers'],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('admin-manage-offers', {
        body: { action: 'list' },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return (data?.offers || []) as Offer[];
    },
    staleTime: 2 * 60 * 1000,
  });

  const { data: redemptions } = useQuery({
    queryKey: ['offer-redemptions', selectedOffer?.id],
    queryFn: async () => {
      if (!selectedOffer?.id) return [];
      const { data, error } = await supabase.functions.invoke('admin-manage-offers', {
        body: { action: 'get_redemptions', offer: { id: selectedOffer.id } },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return (data?.redemptions || []) as Redemption[];
    },
    enabled: !!selectedOffer?.id,
    staleTime: 2 * 60 * 1000,
  });

  const createOfferMutation = useMutation({
    mutationFn: async () => {
      const expiresAt = newOffer.expires_days
        ? new Date(Date.now() + parseInt(newOffer.expires_days) * 24 * 60 * 60 * 1000).toISOString()
        : null;

      const { data, error } = await supabase.functions.invoke('admin-manage-offers', {
        body: {
          action: 'create',
          offer: {
            name: newOffer.name,
            price: parseFloat(newOffer.price),
            plan_id: newOffer.plan_id,
            max_redemptions: newOffer.max_redemptions ? parseInt(newOffer.max_redemptions) : null,
            expires_at: expiresAt,
          },
        },
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return data.offer;
    },
    onSuccess: () => {
      haptic.success();
      queryClient.invalidateQueries({ queryKey: ['admin-offers'] });
      setCreateOpen(false);
      setNewOffer({
        name: '',
        price: '3.99',
        plan_id: 'electrician',
        max_redemptions: '',
        expires_days: '30',
      });
      toast({
        title: 'Offer created',
        description: 'Your promo offer has been created successfully.',
      });
    },
    onError: (error) => {
      haptic.error();
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const toggleOfferMutation = useMutation({
    mutationFn: async ({ id, isActive }: { id: string; isActive: boolean }) => {
      const { data, error } = await supabase.functions.invoke('admin-manage-offers', {
        body: { action: 'update', offer: { id, is_active: isActive } },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
    },
    onSuccess: () => {
      haptic.success();
      queryClient.invalidateQueries({ queryKey: ['admin-offers'] });
    },
    onError: (error) => {
      haptic.error();
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
  });

  const deleteOfferMutation = useMutation({
    mutationFn: async (id: string) => {
      const { data, error } = await supabase.functions.invoke('admin-manage-offers', {
        body: { action: 'delete', offer: { id } },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
    },
    onSuccess: () => {
      haptic.success();
      queryClient.invalidateQueries({ queryKey: ['admin-offers'] });
      setDeleteOfferId(null);
      toast({
        title: 'Offer deleted',
        description: 'The promo offer has been removed.',
      });
    },
    onError: (error) => {
      haptic.error();
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
  });

  const { data: sentEmails } = useQuery({
    queryKey: ['offer-sent-emails', sendOffer?.id],
    queryFn: async () => {
      if (!sendOffer?.id) return [];
      const { data, error } = await supabase.functions.invoke('send-promo-offer', {
        body: { action: 'get_sent', offerId: sendOffer.id },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return (data?.emails || []) as SentEmail[];
    },
    enabled: !!sendOffer?.id,
    staleTime: 30 * 1000,
  });

  const sendEmailMutation = useMutation({
    mutationFn: async ({ offerId, emails }: { offerId: string; emails: string[] }) => {
      if (emails.length === 1) {
        const { data, error } = await supabase.functions.invoke('send-promo-offer', {
          body: { action: 'send_single', offerId, email: emails[0] },
        });
        if (error) throw error;
        if (data?.error) throw new Error(data.error);
        return data;
      } else {
        const { data, error } = await supabase.functions.invoke('send-promo-offer', {
          body: { action: 'send_bulk', offerId, emails },
        });
        if (error) throw error;
        if (data?.error) throw new Error(data.error);
        return data;
      }
    },
    onSuccess: (data) => {
      haptic.success();
      queryClient.invalidateQueries({ queryKey: ['offer-sent-emails', sendOffer?.id] });
      setSendEmail('');
      const message =
        data.sent !== undefined
          ? `Sent to ${data.sent} recipient${data.sent !== 1 ? 's' : ''}${data.failed ? ` (${data.failed} failed)` : ''}`
          : `Email sent successfully`;
      toast({
        title: 'Offer sent',
        description: message,
      });
    },
    onError: (error) => {
      haptic.error();
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
  });

  const handleCopyToClipboard = (code: string) => {
    const url = `${window.location.origin}/auth/signup?offer=${code}`;
    copyToClipboard(url);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
    toast({
      title: 'Link copied',
      description: 'Offer link copied to clipboard.',
    });
  };

  const handleSendOffer = () => {
    if (!sendOffer?.id || !sendEmail.trim()) return;

    const emails = sendEmail
      .split(/[,;\n]/)
      .map((e) => e.trim().toLowerCase())
      .filter((e) => e && e.includes('@'));

    if (emails.length === 0) {
      toast({
        title: 'Invalid email',
        description: 'Please enter a valid email address.',
        variant: 'destructive',
      });
      return;
    }

    sendEmailMutation.mutate({ offerId: sendOffer.id, emails });
  };

  const now = Date.now();
  const sevenDays = 7 * 24 * 60 * 60 * 1000;

  const getOfferStatus = (offer: Offer): FilterTab => {
    if (!offer.is_active) return 'scheduled';
    if (offer.expires_at && new Date(offer.expires_at).getTime() < now) return 'expired';
    return 'active';
  };

  const getStatusTone = (offer: Offer): Tone => {
    const status = getOfferStatus(offer);
    if (status === 'expired') return 'red';
    if (status === 'scheduled') return 'amber';
    if (offer.expires_at && new Date(offer.expires_at).getTime() - now < sevenDays) return 'orange';
    return 'emerald';
  };

  const getStatusLabel = (offer: Offer): string => {
    const status = getOfferStatus(offer);
    if (status === 'expired') return 'Expired';
    if (status === 'scheduled') return 'Inactive';
    if (offer.expires_at && new Date(offer.expires_at).getTime() - now < sevenDays) return 'Expiring';
    return 'Active';
  };

  const stats = useMemo(() => {
    const list = offers ?? [];
    const active = list.filter((o) => getOfferStatus(o) === 'active').length;
    const expiringSoon = list.filter(
      (o) =>
        o.is_active &&
        o.expires_at &&
        new Date(o.expires_at).getTime() > now &&
        new Date(o.expires_at).getTime() - now < sevenDays,
    ).length;
    const totalRedemptions = list.reduce((sum, o) => sum + (o.redemptions || 0), 0);
    const discountGiven = list.reduce(
      (sum, o) => sum + (o.redemptions || 0) * (o.price || 0),
      0,
    );
    return { active, expiringSoon, totalRedemptions, discountGiven };
  }, [offers, now, sevenDays]);

  const counts = useMemo(() => {
    const list = offers ?? [];
    return {
      active: list.filter((o) => getOfferStatus(o) === 'active').length,
      scheduled: list.filter((o) => getOfferStatus(o) === 'scheduled').length,
      expired: list.filter((o) => getOfferStatus(o) === 'expired').length,
      all: list.length,
    };
  }, [offers]);

  const filteredOffers = useMemo(() => {
    const list = offers ?? [];
    const q = search.trim().toLowerCase();
    return list.filter((o) => {
      if (activeTab !== 'all' && getOfferStatus(o) !== activeTab) return false;
      if (!q) return true;
      return (
        o.name.toLowerCase().includes(q) ||
        o.code.toLowerCase().includes(q) ||
        o.plan_id.toLowerCase().includes(q)
      );
    });
  }, [offers, activeTab, search]);

  return (
    <PullToRefresh
      onRefresh={async () => {
        await queryClient.invalidateQueries({ queryKey: ['admin-offers'] });
      }}
    >
      <PageFrame>
        <PageHero
          eyebrow="Billing"
          title="Offers"
          description="Promo codes and limited-time discounts."
          tone="yellow"
          actions={
            <>
              <button
                onClick={() => setCreateOpen(true)}
                className="h-10 px-4 rounded-full bg-elec-yellow text-black text-[13px] font-semibold touch-manipulation"
              >
                New Offer
              </button>
              <IconButton onClick={() => refetch()} aria-label="Refresh">
                <RefreshCw className="h-4 w-4" />
              </IconButton>
            </>
          }
        />

        <StatStrip
          columns={4}
          stats={[
            { label: 'Active Offers', value: stats.active, tone: 'emerald' },
            { label: 'Expiring Soon', value: stats.expiringSoon, tone: 'orange' },
            { label: 'Redemptions', value: stats.totalRedemptions, accent: true },
            {
              label: 'Discount Given',
              value: `£${stats.discountGiven.toFixed(2)}`,
            },
          ]}
        />

        <FilterBar
          tabs={[
            { value: 'active', label: 'Active', count: counts.active },
            { value: 'scheduled', label: 'Scheduled', count: counts.scheduled },
            { value: 'expired', label: 'Expired', count: counts.expired },
            { value: 'all', label: 'All', count: counts.all },
          ]}
          activeTab={activeTab}
          onTabChange={(v) => setActiveTab(v as FilterTab)}
          search={search}
          onSearchChange={setSearch}
          searchPlaceholder="Search offers, codes or plans…"
        />

        {isLoading ? (
          <LoadingBlocks />
        ) : filteredOffers.length === 0 ? (
          <EmptyState
            title={
              (offers?.length ?? 0) === 0
                ? 'No offers yet'
                : 'No offers match this filter'
            }
            description={
              (offers?.length ?? 0) === 0
                ? 'Create your first promo offer to get started.'
                : 'Try a different filter or search term.'
            }
            action={(offers?.length ?? 0) === 0 ? 'Create offer' : undefined}
            onAction={(offers?.length ?? 0) === 0 ? () => setCreateOpen(true) : undefined}
          />
        ) : (
          <ListCard>
            <ListCardHeader
              tone="yellow"
              title="Offers"
              meta={<Pill tone="yellow">{filteredOffers.length}</Pill>}
            />
            <ListBody>
              {filteredOffers.map((offer) => {
                const tone = getStatusTone(offer);
                const label = getStatusLabel(offer);
                const expiresText = offer.expires_at
                  ? `expires ${format(new Date(offer.expires_at), 'dd MMM yyyy')}`
                  : 'no expiry';
                const subtitle = `${offer.code} · £${offer.price}/mo · ${offer.plan_id} · ${expiresText}`;
                const maxText = offer.max_redemptions ?? '∞';
                return (
                  <ListRow
                    key={offer.id}
                    title={offer.name}
                    subtitle={subtitle}
                    trailing={
                      <>
                        <Pill tone={tone}>{label}</Pill>
                        <span className="text-[11px] text-white tabular-nums">
                          {offer.redemptions}/{maxText}
                        </span>
                      </>
                    }
                    onClick={() => setSelectedOffer(offer)}
                  />
                );
              })}
            </ListBody>
          </ListCard>
        )}
      </PageFrame>

      <Sheet open={!!selectedOffer} onOpenChange={() => setSelectedOffer(null)}>
        <SheetContent side="bottom" className="h-[80vh] rounded-t-2xl p-0 bg-[hsl(0_0%_10%)] border-white/[0.06]">
          <div className="flex flex-col h-full">
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 rounded-full bg-white/20" />
            </div>

            <SheetHeader className="px-5 pb-4 border-b border-white/[0.06]">
              <SheetTitle className="text-left text-white text-xl font-semibold tracking-tight">
                {selectedOffer?.name}
              </SheetTitle>
              <p className="text-[13px] text-white text-left">
                {selectedOffer?.redemptions || 0} redemptions · £{selectedOffer?.price}/mo ·{' '}
                <span className="font-mono">{selectedOffer?.code}</span>
              </p>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              {selectedOffer && (
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-10 touch-manipulation bg-transparent border-white/[0.12] text-white hover:bg-white/[0.06] hover:text-white"
                    onClick={() => handleCopyToClipboard(selectedOffer.code)}
                  >
                    {copiedCode === selectedOffer.code ? (
                      <Check className="h-4 w-4 mr-1.5" />
                    ) : (
                      <Copy className="h-4 w-4 mr-1.5" />
                    )}
                    Copy link
                  </Button>
                  {selectedOffer.is_active && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-10 touch-manipulation bg-transparent border-white/[0.12] text-white hover:bg-white/[0.06] hover:text-white"
                      onClick={() => setSendOffer(selectedOffer)}
                    >
                      <Send className="h-4 w-4 mr-1.5" />
                      Send
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-10 touch-manipulation bg-transparent border-white/[0.12] text-white hover:bg-white/[0.06] hover:text-white"
                    onClick={() =>
                      toggleOfferMutation.mutate({
                        id: selectedOffer.id,
                        isActive: !selectedOffer.is_active,
                      })
                    }
                  >
                    {selectedOffer.is_active ? 'Deactivate' : 'Activate'}
                  </Button>
                  {isSuperAdmin && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-10 touch-manipulation bg-transparent border-white/[0.12] text-white hover:bg-white/[0.06] hover:text-white"
                      onClick={() => setDeleteOfferId(selectedOffer.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1.5" />
                      Delete
                    </Button>
                  )}
                </div>
              )}

              <Divider label="Redemptions" />

              {!redemptions ? (
                <LoadingBlocks />
              ) : redemptions.length === 0 ? (
                <EmptyState
                  title="No redemptions yet"
                  description="When someone signs up with this code, they'll appear here."
                />
              ) : (
                <ListCard>
                  <ListBody>
                    {redemptions.map((redemption) => (
                      <ListRow
                        key={redemption.id}
                        title={redemption.profiles?.full_name || 'Unknown user'}
                        subtitle={formatDistanceToNow(new Date(redemption.redeemed_at), {
                          addSuffix: true,
                        })}
                        trailing={
                          redemption.amount_paid ? (
                            <Pill tone="emerald">£{redemption.amount_paid}</Pill>
                          ) : undefined
                        }
                      />
                    ))}
                  </ListBody>
                </ListCard>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <Sheet open={createOpen} onOpenChange={setCreateOpen}>
        <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl p-0 bg-[hsl(0_0%_10%)] border-white/[0.06]">
          <div className="flex flex-col h-full">
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 rounded-full bg-white/20" />
            </div>

            <SheetHeader className="px-5 pb-4 border-b border-white/[0.06]">
              <SheetTitle className="text-left text-white text-xl font-semibold tracking-tight">
                Create promo offer
              </SheetTitle>
              <p className="text-[13px] text-white text-left">
                Create a special pricing offer with a unique signup link.
              </p>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white text-[12px] font-medium">
                  Offer name
                </Label>
                <Input
                  id="name"
                  placeholder="e.g., Founder Offer"
                  value={newOffer.name}
                  onChange={(e) => setNewOffer({ ...newOffer, name: e.target.value })}
                  className="h-11 text-base touch-manipulation bg-[hsl(0_0%_12%)] border-white/[0.08] text-white placeholder:text-white focus:border-elec-yellow focus:ring-elec-yellow"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price" className="text-white text-[12px] font-medium">
                    Price (GBP)
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    placeholder="3.99"
                    value={newOffer.price}
                    onChange={(e) => setNewOffer({ ...newOffer, price: e.target.value })}
                    className="h-11 text-base touch-manipulation bg-[hsl(0_0%_12%)] border-white/[0.08] text-white placeholder:text-white focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="plan" className="text-white text-[12px] font-medium">
                    Plan
                  </Label>
                  <Select
                    value={newOffer.plan_id}
                    onValueChange={(v) => setNewOffer({ ...newOffer, plan_id: v })}
                  >
                    <SelectTrigger className="h-11 touch-manipulation bg-[hsl(0_0%_12%)] border-white/[0.08] text-white focus:border-elec-yellow focus:ring-elec-yellow">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[hsl(0_0%_12%)] border-white/[0.08] text-white">
                      <SelectItem value="apprentice">Apprentice</SelectItem>
                      <SelectItem value="electrician">Electrician</SelectItem>
                      <SelectItem value="employer">Employer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="max" className="text-white text-[12px] font-medium">
                    Max redemptions
                  </Label>
                  <Input
                    id="max"
                    type="number"
                    placeholder="Unlimited"
                    value={newOffer.max_redemptions}
                    onChange={(e) =>
                      setNewOffer({ ...newOffer, max_redemptions: e.target.value })
                    }
                    className="h-11 text-base touch-manipulation bg-[hsl(0_0%_12%)] border-white/[0.08] text-white placeholder:text-white focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expires" className="text-white text-[12px] font-medium">
                    Expires in (days)
                  </Label>
                  <Input
                    id="expires"
                    type="number"
                    placeholder="30"
                    value={newOffer.expires_days}
                    onChange={(e) => setNewOffer({ ...newOffer, expires_days: e.target.value })}
                    className="h-11 text-base touch-manipulation bg-[hsl(0_0%_12%)] border-white/[0.08] text-white placeholder:text-white focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
              </div>
            </div>

            <SheetFooter className="p-5 border-t border-white/[0.06]">
              <Button
                className="w-full h-12 touch-manipulation bg-elec-yellow text-black hover:bg-elec-yellow/90 font-semibold"
                onClick={() => createOfferMutation.mutate()}
                disabled={!newOffer.name || createOfferMutation.isPending}
              >
                {createOfferMutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-2" />
                    Create offer
                  </>
                )}
              </Button>
            </SheetFooter>
          </div>
        </SheetContent>
      </Sheet>

      <AlertDialog open={!!deleteOfferId} onOpenChange={() => setDeleteOfferId(null)}>
        <AlertDialogContent className="bg-[hsl(0_0%_12%)] border-white/[0.08] text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Delete offer?</AlertDialogTitle>
            <AlertDialogDescription className="text-white">
              This will permanently delete this promo offer. Users who have already redeemed it
              will keep their subscription, but no new redemptions will be possible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className="h-11 touch-manipulation bg-transparent border-white/[0.12] text-white hover:bg-white/[0.06] hover:text-white"
              disabled={deleteOfferMutation.isPending}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="h-11 touch-manipulation bg-red-500 hover:bg-red-600 text-white"
              onClick={() => deleteOfferId && deleteOfferMutation.mutate(deleteOfferId)}
              disabled={deleteOfferMutation.isPending}
            >
              {deleteOfferMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                'Delete offer'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Sheet
        open={!!sendOffer}
        onOpenChange={() => {
          setSendOffer(null);
          setSendEmail('');
        }}
      >
        <SheetContent side="bottom" className="h-[80vh] rounded-t-2xl p-0 bg-[hsl(0_0%_10%)] border-white/[0.06]">
          <div className="flex flex-col h-full">
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 rounded-full bg-white/20" />
            </div>

            <SheetHeader className="px-5 pb-4 border-b border-white/[0.06]">
              <SheetTitle className="text-left text-white text-xl font-semibold tracking-tight">
                Send {sendOffer?.name}
              </SheetTitle>
              <p className="text-[13px] text-white text-left">
                Send this offer to users via email. They'll receive a link to sign up with the
                discount.
              </p>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              <div className="space-y-2">
                <Label htmlFor="send-email" className="text-white text-[12px] font-medium">
                  Email address(es)
                </Label>
                <Textarea
                  id="send-email"
                  placeholder="Enter email addresses (one per line or comma-separated)"
                  value={sendEmail}
                  onChange={(e) => setSendEmail(e.target.value)}
                  className="min-h-[120px] touch-manipulation text-base bg-[hsl(0_0%_12%)] border-white/[0.08] text-white placeholder:text-white focus:border-elec-yellow focus:ring-elec-yellow"
                />
                <p className="text-[11px] text-white">
                  Separate multiple emails with commas, semicolons, or new lines.
                </p>
              </div>

              <Button
                className="w-full h-12 touch-manipulation bg-elec-yellow text-black hover:bg-elec-yellow/90 font-semibold"
                onClick={handleSendOffer}
                disabled={!sendEmail.trim() || sendEmailMutation.isPending}
              >
                {sendEmailMutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Send offer
                  </>
                )}
              </Button>

              <Divider label={`Previously Sent · ${sentEmails?.length || 0}`} />

              {sentEmails?.length === 0 ? (
                <EmptyState
                  title="No emails sent yet"
                  description="Recipients of this offer will appear here once you send it."
                />
              ) : (
                <ListCard>
                  <ListBody>
                    {sentEmails?.map((sent) => (
                      <ListRow
                        key={sent.id}
                        title={sent.email}
                        subtitle={formatDistanceToNow(new Date(sent.sent_at), {
                          addSuffix: true,
                        })}
                        trailing={<Pill tone="emerald">{sent.status}</Pill>}
                      />
                    ))}
                  </ListBody>
                </ListCard>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </PullToRefresh>
  );
}
