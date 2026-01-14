import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  HeadphonesIcon,
  Plus,
  MessageCircle,
  Clock,
  CheckCircle,
  ChevronRight,
  Send,
  Loader2,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { toast } from "@/hooks/use-toast";

interface Ticket {
  id: string;
  subject: string;
  description: string;
  category: string;
  priority: string;
  status: string;
  created_at: string;
}

interface TicketResponse {
  id: string;
  message: string;
  is_admin_response: boolean;
  created_at: string;
  profiles?: { full_name: string };
}

const categories = [
  { value: "technical", label: "Technical Issue" },
  { value: "billing", label: "Billing & Payments" },
  { value: "account", label: "Account Help" },
  { value: "feature", label: "Feature Request" },
  { value: "other", label: "Other" },
];

export default function SupportTicketForm() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [createOpen, setCreateOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [form, setForm] = useState({
    subject: "",
    description: "",
    category: "technical",
    priority: "medium",
  });

  // Fetch user's tickets
  const { data: tickets, isLoading } = useQuery({
    queryKey: ["my-support-tickets", user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      const { data, error } = await supabase
        .from("support_tickets")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Ticket[];
    },
    enabled: !!user?.id,
  });

  // Fetch responses for selected ticket
  const { data: responses } = useQuery({
    queryKey: ["my-ticket-responses", selectedTicket?.id],
    queryFn: async () => {
      if (!selectedTicket) return [];
      const { data, error } = await supabase
        .from("support_ticket_responses")
        .select(`*, profiles:user_id (full_name)`)
        .eq("ticket_id", selectedTicket.id)
        .order("created_at", { ascending: true });
      if (error) throw error;
      return data as TicketResponse[];
    },
    enabled: !!selectedTicket,
  });

  // Create ticket mutation
  const createMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("support_tickets").insert({
        user_id: user?.id,
        subject: form.subject,
        description: form.description,
        category: form.category,
        priority: form.priority,
        status: "open",
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-support-tickets"] });
      setCreateOpen(false);
      setForm({ subject: "", description: "", category: "technical", priority: "medium" });
      toast({ title: "Ticket submitted", description: "We'll respond as soon as possible." });
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  // Reply mutation
  const replyMutation = useMutation({
    mutationFn: async () => {
      if (!selectedTicket) return;
      const { error } = await supabase.from("support_ticket_responses").insert({
        ticket_id: selectedTicket.id,
        user_id: user?.id,
        message: replyMessage,
        is_admin_response: false,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-ticket-responses"] });
      setReplyMessage("");
      toast({ title: "Reply sent" });
    },
  });

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      open: "bg-blue-500/20 text-blue-400",
      in_progress: "bg-amber-500/20 text-amber-400",
      waiting: "bg-purple-500/20 text-purple-400",
      resolved: "bg-green-500/20 text-green-400",
      closed: "bg-gray-500/20 text-gray-400",
    };
    return <Badge className={styles[status] || ""}>{status.replace("_", " ")}</Badge>;
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <HeadphonesIcon className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold">Support</h3>
            <p className="text-xs text-muted-foreground">Get help from our team</p>
          </div>
        </div>
        <Button
          className="h-11 gap-2 touch-manipulation"
          onClick={() => setCreateOpen(true)}
        >
          <Plus className="h-4 w-4" />
          New Ticket
        </Button>
      </div>

      {/* Tickets List */}
      {isLoading ? (
        <div className="space-y-2">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="pt-4 pb-4"><div className="h-12 bg-muted rounded" /></CardContent>
            </Card>
          ))}
        </div>
      ) : tickets?.length === 0 ? (
        <Card>
          <CardContent className="pt-6 pb-6 text-center">
            <MessageCircle className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">No support tickets yet</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {tickets?.map((ticket) => (
            <Card
              key={ticket.id}
              className="touch-manipulation active:scale-[0.99] transition-transform cursor-pointer"
              onClick={() => setSelectedTicket(ticket)}
            >
              <CardContent className="pt-4 pb-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-sm truncate">{ticket.subject}</p>
                      {getStatusBadge(ticket.status)}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(ticket.created_at), { addSuffix: true })}
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Create Ticket Sheet */}
      <Sheet open={createOpen} onOpenChange={setCreateOpen}>
        <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl p-0">
          <div className="flex flex-col h-full">
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
            </div>
            <SheetHeader className="px-4 pb-4 border-b border-border">
              <SheetTitle>New Support Ticket</SheetTitle>
            </SheetHeader>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="space-y-2">
                <Label>Subject</Label>
                <Input
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="Brief summary of your issue"
                  className="h-11 touch-manipulation"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                    <SelectTrigger className="h-11 touch-manipulation">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Priority</Label>
                  <Select value={form.priority} onValueChange={(v) => setForm({ ...form, priority: v })}>
                    <SelectTrigger className="h-11 touch-manipulation">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Describe your issue in detail..."
                  className="min-h-[150px] touch-manipulation"
                />
              </div>
            </div>
            <SheetFooter className="p-4 border-t border-border">
              <Button
                className="w-full h-12 touch-manipulation"
                onClick={() => createMutation.mutate()}
                disabled={!form.subject.trim() || !form.description.trim() || createMutation.isPending}
              >
                {createMutation.isPending ? (
                  <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Submitting...</>
                ) : (
                  "Submit Ticket"
                )}
              </Button>
            </SheetFooter>
          </div>
        </SheetContent>
      </Sheet>

      {/* Ticket Detail Sheet */}
      <Sheet open={!!selectedTicket} onOpenChange={() => setSelectedTicket(null)}>
        <SheetContent side="bottom" className="h-[90vh] rounded-t-2xl p-0">
          <div className="flex flex-col h-full">
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
            </div>
            <SheetHeader className="px-4 pb-4 border-b border-border">
              <div className="flex items-center justify-between">
                <SheetTitle className="text-left">{selectedTicket?.subject}</SheetTitle>
                {selectedTicket && getStatusBadge(selectedTicket.status)}
              </div>
            </SheetHeader>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {/* Original message */}
              <Card>
                <CardContent className="pt-4 pb-4">
                  <p className="text-xs text-muted-foreground mb-2">You</p>
                  <p className="text-sm whitespace-pre-wrap">{selectedTicket?.description}</p>
                </CardContent>
              </Card>
              {/* Responses */}
              {responses?.map((response) => (
                <Card
                  key={response.id}
                  className={response.is_admin_response ? "border-purple-500/30 bg-purple-500/5" : ""}
                >
                  <CardContent className="pt-4 pb-4">
                    <p className="text-xs text-muted-foreground mb-2">
                      {response.is_admin_response ? (
                        <span className="text-purple-400">Elec-Mate Support</span>
                      ) : "You"}
                      {" · "}{formatDistanceToNow(new Date(response.created_at), { addSuffix: true })}
                    </p>
                    <p className="text-sm whitespace-pre-wrap">{response.message}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            {/* Reply input */}
            {selectedTicket?.status !== "closed" && selectedTicket?.status !== "resolved" && (
              <SheetFooter className="p-4 border-t border-border">
                <div className="flex gap-2 w-full">
                  <Textarea
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    placeholder="Add a reply..."
                    className="flex-1 min-h-[44px] max-h-[100px] touch-manipulation"
                  />
                  <Button
                    size="icon"
                    className="h-11 w-11 touch-manipulation shrink-0"
                    onClick={() => replyMutation.mutate()}
                    disabled={!replyMessage.trim() || replyMutation.isPending}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </SheetFooter>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
