import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import AdminEmptyState from "@/components/admin/AdminEmptyState";
import {
  Plus,
  Copy,
  Gift,
  Users,
  Calendar,
  Check,
  Trash2,
  ChevronRight,
  User,
  Loader2,
  AlertTriangle,
  Mail,
  Send,
} from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

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

export default function AdminOffers() {
  const { profile } = useAuth();
  const queryClient = useQueryClient();
  const [createOpen, setCreateOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [deleteOfferId, setDeleteOfferId] = useState<string | null>(null);
  const [sendOffer, setSendOffer] = useState<Offer | null>(null);
  const [sendEmail, setSendEmail] = useState("");

  // Form state
  const [newOffer, setNewOffer] = useState({
    name: "",
    price: "3.99",
    plan_id: "electrician",
    max_redemptions: "",
    expires_days: "30",
  });

  const isSuperAdmin = profile?.admin_role === "super_admin";

  // Fetch offers via edge function to bypass RLS
  const { data: offers, isLoading } = useQuery({
    queryKey: ["admin-offers"],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke("admin-manage-offers", {
        body: { action: "list" },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return (data?.offers || []) as Offer[];
    },
    staleTime: 2 * 60 * 1000, // Cache for 2 minutes
  });

  // Fetch redemptions for selected offer via edge function
  const { data: redemptions } = useQuery({
    queryKey: ["offer-redemptions", selectedOffer?.id],
    queryFn: async () => {
      if (!selectedOffer?.id) return [];
      const { data, error } = await supabase.functions.invoke("admin-manage-offers", {
        body: { action: "get_redemptions", offer: { id: selectedOffer.id } },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return (data?.redemptions || []) as Redemption[];
    },
    enabled: !!selectedOffer?.id,
    staleTime: 2 * 60 * 1000, // Cache for 2 minutes
  });

  // Create offer mutation via edge function
  const createOfferMutation = useMutation({
    mutationFn: async () => {
      const expiresAt = newOffer.expires_days
        ? new Date(Date.now() + parseInt(newOffer.expires_days) * 24 * 60 * 60 * 1000).toISOString()
        : null;

      const { data, error } = await supabase.functions.invoke("admin-manage-offers", {
        body: {
          action: "create",
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
      queryClient.invalidateQueries({ queryKey: ["admin-offers"] });
      setCreateOpen(false);
      setNewOffer({
        name: "",
        price: "3.99",
        plan_id: "electrician",
        max_redemptions: "",
        expires_days: "30",
      });
      toast({
        title: "Offer created",
        description: "Your promo offer has been created successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Toggle offer active status via edge function
  const toggleOfferMutation = useMutation({
    mutationFn: async ({ id, isActive }: { id: string; isActive: boolean }) => {
      const { data, error } = await supabase.functions.invoke("admin-manage-offers", {
        body: { action: "update", offer: { id, is_active: isActive } },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-offers"] });
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  // Delete offer mutation via edge function
  const deleteOfferMutation = useMutation({
    mutationFn: async (id: string) => {
      const { data, error } = await supabase.functions.invoke("admin-manage-offers", {
        body: { action: "delete", offer: { id } },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-offers"] });
      setDeleteOfferId(null);
      toast({
        title: "Offer deleted",
        description: "The promo offer has been removed.",
      });
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  // Fetch sent emails for selected offer
  const { data: sentEmails } = useQuery({
    queryKey: ["offer-sent-emails", sendOffer?.id],
    queryFn: async () => {
      if (!sendOffer?.id) return [];
      const { data, error } = await supabase.functions.invoke("send-promo-offer", {
        body: { action: "get_sent", offerId: sendOffer.id },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return (data?.emails || []) as SentEmail[];
    },
    enabled: !!sendOffer?.id,
    staleTime: 30 * 1000, // 30 seconds
  });

  // Send promo email mutation
  const sendEmailMutation = useMutation({
    mutationFn: async ({ offerId, emails }: { offerId: string; emails: string[] }) => {
      if (emails.length === 1) {
        const { data, error } = await supabase.functions.invoke("send-promo-offer", {
          body: { action: "send_single", offerId, email: emails[0] },
        });
        if (error) throw error;
        if (data?.error) throw new Error(data.error);
        return data;
      } else {
        const { data, error } = await supabase.functions.invoke("send-promo-offer", {
          body: { action: "send_bulk", offerId, emails },
        });
        if (error) throw error;
        if (data?.error) throw new Error(data.error);
        return data;
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["offer-sent-emails", sendOffer?.id] });
      setSendEmail("");
      const message = data.sent !== undefined
        ? `Sent to ${data.sent} recipient${data.sent !== 1 ? "s" : ""}${data.failed ? ` (${data.failed} failed)` : ""}`
        : `Email sent successfully`;
      toast({
        title: "Offer sent",
        description: message,
      });
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const copyToClipboard = (code: string) => {
    const url = `${window.location.origin}/auth/signup?offer=${code}`;
    navigator.clipboard.writeText(url);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
    toast({
      title: "Link copied",
      description: "Offer link copied to clipboard.",
    });
  };

  const handleSendOffer = () => {
    if (!sendOffer?.id || !sendEmail.trim()) return;

    // Parse emails (comma, semicolon, or newline separated)
    const emails = sendEmail
      .split(/[,;\n]/)
      .map((e) => e.trim().toLowerCase())
      .filter((e) => e && e.includes("@"));

    if (emails.length === 0) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    sendEmailMutation.mutate({ offerId: sendOffer.id, emails });
  };

  const getPlanColor = (planId: string) => {
    switch (planId) {
      case "apprentice":
        return "bg-purple-500/20 text-purple-400";
      case "electrician":
        return "bg-blue-500/20 text-blue-400";
      case "employer":
        return "bg-green-500/20 text-green-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Create Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Promo Offers</h2>
          <p className="text-sm text-muted-foreground">
            Create and manage promotional pricing links
          </p>
        </div>
        <Button
          className="gap-2 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 h-11 touch-manipulation"
          onClick={() => setCreateOpen(true)}
        >
          <Plus className="h-4 w-4" />
          Create Offer
        </Button>
      </div>

      {/* Offers List */}
      {isLoading ? (
        <div className="grid gap-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="pt-6">
                <div className="h-20 bg-muted rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : offers?.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <AdminEmptyState
              icon={Gift}
              title="No offers yet"
              description="Create your first promo offer to get started."
              action={{
                label: "Create Offer",
                onClick: () => setCreateOpen(true),
              }}
            />
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {offers?.map((offer) => (
            <Card
              key={offer.id}
              className={!offer.is_active ? "opacity-60" : ""}
            >
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{offer.name}</h3>
                      <Badge className={getPlanColor(offer.plan_id)}>
                        {offer.plan_id}
                      </Badge>
                      {!offer.is_active && (
                        <Badge variant="outline" className="text-muted-foreground">
                          Inactive
                        </Badge>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span className="font-mono text-foreground">£{offer.price}/mo</span>
                      <button
                        onClick={() => setSelectedOffer(offer)}
                        className="flex items-center gap-1 touch-manipulation active:opacity-70 transition-opacity"
                      >
                        <Users className="h-4 w-4" />
                        <span className="underline underline-offset-2">
                          {offer.redemptions}
                          {offer.max_redemptions && `/${offer.max_redemptions}`} used
                        </span>
                        <ChevronRight className="h-3 w-3" />
                      </button>
                      {offer.expires_at && (
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Expires {format(new Date(offer.expires_at), "dd MMM yyyy")}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <code className="text-xs bg-muted px-2 py-1 rounded font-mono">
                        {offer.code}
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 gap-1"
                        onClick={() => copyToClipboard(offer.code)}
                      >
                        {copiedCode === offer.code ? (
                          <Check className="h-3 w-3 text-green-500" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                        Copy Link
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {offer.is_active && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSendOffer(offer)}
                      >
                        <Mail className="h-4 w-4 mr-1.5" />
                        Send
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        toggleOfferMutation.mutate({
                          id: offer.id,
                          isActive: !offer.is_active,
                        })
                      }
                    >
                      {offer.is_active ? "Deactivate" : "Activate"}
                    </Button>
                    {isSuperAdmin && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-400 hover:text-red-500 hover:bg-red-500/10"
                        onClick={() => setDeleteOfferId(offer.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Redemptions Sheet */}
      <Sheet open={!!selectedOffer} onOpenChange={() => setSelectedOffer(null)}>
        <SheetContent side="bottom" className="h-[70vh] rounded-t-2xl p-0">
          <div className="flex flex-col h-full">
            {/* Drag Handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
            </div>

            <SheetHeader className="px-4 pb-4 border-b border-border">
              <SheetTitle className="text-left flex items-center gap-2">
                <Gift className="h-5 w-5 text-purple-400" />
                {selectedOffer?.name} Redemptions
              </SheetTitle>
              <p className="text-sm text-muted-foreground text-left">
                {selectedOffer?.redemptions || 0} total redemptions · £{selectedOffer?.price}/mo
              </p>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto p-4">
              {redemptions?.length === 0 ? (
                <div className="text-center py-8">
                  <Users className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">No redemptions yet</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {redemptions?.map((redemption) => (
                    <div
                      key={redemption.id}
                      className="flex items-center gap-3 p-3 rounded-xl bg-muted/50"
                    >
                      <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center shrink-0">
                        <User className="h-5 w-5 text-purple-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">
                          {redemption.profiles?.full_name || "Unknown User"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(redemption.redeemed_at), { addSuffix: true })}
                        </p>
                      </div>
                      {redemption.amount_paid && (
                        <Badge className="bg-green-500/20 text-green-400">
                          £{redemption.amount_paid}
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Create Offer Sheet */}
      <Sheet open={createOpen} onOpenChange={setCreateOpen}>
        <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl p-0">
          <div className="flex flex-col h-full">
            {/* Drag Handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
            </div>

            <SheetHeader className="px-4 pb-4 border-b border-border">
              <SheetTitle className="text-left flex items-center gap-2">
                <Gift className="h-5 w-5 text-orange-400" />
                Create Promo Offer
              </SheetTitle>
              <p className="text-sm text-muted-foreground text-left">
                Create a special pricing offer with a unique signup link.
              </p>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Offer Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Founder Offer"
                  value={newOffer.name}
                  onChange={(e) => setNewOffer({ ...newOffer, name: e.target.value })}
                  className="h-11 touch-manipulation"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price (GBP)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    placeholder="3.99"
                    value={newOffer.price}
                    onChange={(e) => setNewOffer({ ...newOffer, price: e.target.value })}
                    className="h-11 touch-manipulation"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="plan">Plan</Label>
                  <Select
                    value={newOffer.plan_id}
                    onValueChange={(v) => setNewOffer({ ...newOffer, plan_id: v })}
                  >
                    <SelectTrigger className="h-11 touch-manipulation">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apprentice">Apprentice</SelectItem>
                      <SelectItem value="electrician">Electrician</SelectItem>
                      <SelectItem value="employer">Employer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="max">Max Redemptions</Label>
                  <Input
                    id="max"
                    type="number"
                    placeholder="Unlimited"
                    value={newOffer.max_redemptions}
                    onChange={(e) => setNewOffer({ ...newOffer, max_redemptions: e.target.value })}
                    className="h-11 touch-manipulation"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expires">Expires In (days)</Label>
                  <Input
                    id="expires"
                    type="number"
                    placeholder="30"
                    value={newOffer.expires_days}
                    onChange={(e) => setNewOffer({ ...newOffer, expires_days: e.target.value })}
                    className="h-11 touch-manipulation"
                  />
                </div>
              </div>
            </div>

            <SheetFooter className="p-4 border-t border-border">
              <Button
                className="w-full h-12 touch-manipulation bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
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
                    Create Offer
                  </>
                )}
              </Button>
            </SheetFooter>
          </div>
        </SheetContent>
      </Sheet>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteOfferId} onOpenChange={() => setDeleteOfferId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Delete Offer?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this promo offer. Users who have already redeemed it will keep their subscription, but no new redemptions will be possible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="h-11 touch-manipulation" disabled={deleteOfferMutation.isPending}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="h-11 touch-manipulation bg-red-500 hover:bg-red-600"
              onClick={() => deleteOfferId && deleteOfferMutation.mutate(deleteOfferId)}
              disabled={deleteOfferMutation.isPending}
            >
              {deleteOfferMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete Offer"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Send Offer Sheet */}
      <Sheet open={!!sendOffer} onOpenChange={() => { setSendOffer(null); setSendEmail(""); }}>
        <SheetContent side="bottom" className="h-[70vh] rounded-t-2xl p-0">
          <div className="flex flex-col h-full">
            {/* Drag Handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
            </div>

            <SheetHeader className="px-4 pb-4 border-b border-border">
              <SheetTitle className="text-left flex items-center gap-2">
                <Mail className="h-5 w-5 text-orange-400" />
                Send {sendOffer?.name}
              </SheetTitle>
              <p className="text-sm text-muted-foreground text-left">
                Send this offer to users via email. They'll receive a link to sign up with the discount.
              </p>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Email Input */}
              <div className="space-y-2">
                <Label htmlFor="send-email">Email Address(es)</Label>
                <Textarea
                  id="send-email"
                  placeholder="Enter email addresses (one per line or comma-separated)"
                  value={sendEmail}
                  onChange={(e) => setSendEmail(e.target.value)}
                  className="min-h-[100px] touch-manipulation text-base"
                />
                <p className="text-xs text-muted-foreground">
                  Separate multiple emails with commas, semicolons, or new lines
                </p>
              </div>

              {/* Send Button */}
              <Button
                className="w-full h-12 touch-manipulation bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600"
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
                    Send Offer
                  </>
                )}
              </Button>

              {/* Previously Sent Section */}
              <div className="pt-4 border-t border-border">
                <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  Previously Sent ({sentEmails?.length || 0})
                </h4>
                {sentEmails?.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No emails sent for this offer yet
                  </p>
                ) : (
                  <div className="space-y-2 max-h-[200px] overflow-y-auto">
                    {sentEmails?.map((sent) => (
                      <div
                        key={sent.id}
                        className="flex items-center justify-between p-3 rounded-xl bg-muted/50"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center shrink-0">
                            <Mail className="h-4 w-4 text-orange-400" />
                          </div>
                          <div>
                            <p className="text-sm font-medium truncate max-w-[180px]">
                              {sent.email}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {formatDistanceToNow(new Date(sent.sent_at), { addSuffix: true })}
                            </p>
                          </div>
                        </div>
                        <Badge className="bg-green-500/20 text-green-400 text-xs">
                          {sent.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
