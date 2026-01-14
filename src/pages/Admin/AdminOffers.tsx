import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Plus,
  Copy,
  Gift,
  Users,
  Calendar,
  Check,
  Link2,
  Trash2,
  ChevronRight,
  User,
  Mail,
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

export default function AdminOffers() {
  const { profile } = useAuth();
  const queryClient = useQueryClient();
  const [createOpen, setCreateOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);

  // Form state
  const [newOffer, setNewOffer] = useState({
    name: "",
    price: "3.99",
    plan_id: "electrician",
    max_redemptions: "",
    expires_days: "30",
  });

  const isSuperAdmin = profile?.admin_role === "super_admin";

  // Fetch offers
  const { data: offers, isLoading } = useQuery({
    queryKey: ["admin-offers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("promo_offers")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        // Table might not exist yet, return empty array
        console.log("Offers table not found, will create on first offer");
        return [];
      }
      return data as Offer[];
    },
  });

  // Fetch redemptions for selected offer
  const { data: redemptions } = useQuery({
    queryKey: ["offer-redemptions", selectedOffer?.id],
    queryFn: async () => {
      if (!selectedOffer?.id) return [];
      const { data, error } = await supabase
        .from("offer_redemptions")
        .select(`
          id,
          redeemed_at,
          amount_paid,
          profiles:user_id (id, full_name)
        `)
        .eq("offer_id", selectedOffer.id)
        .order("redeemed_at", { ascending: false });

      if (error) {
        console.log("Error fetching redemptions:", error);
        return [];
      }
      return data as Redemption[];
    },
    enabled: !!selectedOffer?.id,
  });

  // Create offer mutation
  const createOfferMutation = useMutation({
    mutationFn: async () => {
      // Generate unique code
      const code = `${newOffer.name.toUpperCase().replace(/\s+/g, "").slice(0, 8)}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

      const expiresAt = newOffer.expires_days
        ? new Date(Date.now() + parseInt(newOffer.expires_days) * 24 * 60 * 60 * 1000).toISOString()
        : null;

      const { data, error } = await supabase.from("promo_offers").insert({
        name: newOffer.name,
        code,
        price: parseFloat(newOffer.price),
        plan_id: newOffer.plan_id,
        max_redemptions: newOffer.max_redemptions ? parseInt(newOffer.max_redemptions) : null,
        expires_at: expiresAt,
        is_active: true,
        redemptions: 0,
      }).select().single();

      if (error) throw error;
      return data;
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

  // Toggle offer active status
  const toggleOfferMutation = useMutation({
    mutationFn: async ({ id, isActive }: { id: string; isActive: boolean }) => {
      const { error } = await supabase
        .from("promo_offers")
        .update({ is_active: isActive })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-offers"] });
    },
  });

  // Delete offer mutation
  const deleteOfferMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("promo_offers").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-offers"] });
      toast({
        title: "Offer deleted",
        description: "The promo offer has been removed.",
      });
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
        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600">
              <Plus className="h-4 w-4" />
              Create Offer
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Promo Offer</DialogTitle>
              <DialogDescription>
                Create a special pricing offer with a unique signup link.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="name">Offer Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Founder Offer"
                  value={newOffer.name}
                  onChange={(e) => setNewOffer({ ...newOffer, name: e.target.value })}
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
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="plan">Plan</Label>
                  <Select
                    value={newOffer.plan_id}
                    onValueChange={(v) => setNewOffer({ ...newOffer, plan_id: v })}
                  >
                    <SelectTrigger>
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
                  />
                </div>
              </div>

              <Button
                className="w-full"
                onClick={() => createOfferMutation.mutate()}
                disabled={!newOffer.name || createOfferMutation.isPending}
              >
                {createOfferMutation.isPending ? "Creating..." : "Create Offer"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
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
          <CardContent className="pt-6 text-center py-12">
            <Gift className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold mb-2">No offers yet</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Create your first promo offer to get started.
            </p>
            <Button onClick={() => setCreateOpen(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Create Offer
            </Button>
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
                        onClick={() => deleteOfferMutation.mutate(offer.id)}
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
    </div>
  );
}
