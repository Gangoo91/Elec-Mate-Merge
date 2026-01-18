import { useParams } from "react-router-dom";
import { useState } from "react";
import {
  usePortalData,
  usePortalProgressLogs,
  usePortalPhotos,
  usePortalMessages,
  useSendPortalMessage,
} from "@/hooks/usePublicPortal";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Loader2,
  Calendar,
  MapPin,
  Clock,
  Send,
  Image,
  FileText,
  MessageCircle,
  AlertCircle,
  CheckCircle2,
  CloudSun,
  Users,
  ChevronDown,
  ChevronUp,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export default function ClientPortalView() {
  const { token } = useParams<{ token: string }>();
  const { toast } = useToast();
  const [message, setMessage] = useState("");
  const [showAllLogs, setShowAllLogs] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data: portal, isLoading, error } = usePortalData(token);
  const { data: progressLogs = [] } = usePortalProgressLogs(token);
  const { data: photos = [] } = usePortalPhotos(token);
  const { data: messages = [] } = usePortalMessages(token);
  const sendMessage = useSendPortalMessage(token);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    try {
      await sendMessage.mutateAsync(message);
      setMessage("");
      toast({
        title: "Message sent",
        description: "Your message has been sent to the contractor.",
      });
    } catch {
      toast({
        title: "Failed to send",
        description: "Could not send your message. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your project portal...</p>
        </div>
      </div>
    );
  }

  // Error or not found state
  if (error || !portal) {
    return (
      <div className="bg-background flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="p-4 rounded-full bg-red-500/10 w-fit mx-auto mb-4">
            <AlertCircle className="h-12 w-12 text-red-500" />
          </div>
          <h1 className="text-xl font-bold text-foreground mb-2">Portal Not Available</h1>
          <p className="text-muted-foreground">
            This portal link is invalid or has been deactivated. Please contact your contractor for a new link.
          </p>
        </div>
      </div>
    );
  }

  // Get photo categories
  const photoCategories = [...new Set(photos.map((p) => p.category))];
  const filteredPhotos = selectedCategory
    ? photos.filter((p) => p.category === selectedCategory)
    : photos;

  // Show limited logs unless expanded
  const displayedLogs = showAllLogs ? progressLogs : progressLogs.slice(0, 3);

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "bg-green-500/20 text-green-400";
      case "in_progress":
      case "active":
        return "bg-blue-500/20 text-blue-400";
      case "on_hold":
        return "bg-yellow-500/20 text-yellow-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  const formatDate = (date: string | null) => {
    if (!date) return "TBC";
    return new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-2xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-white/20">
              <Zap className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-blue-100">Job Portal</p>
              <h1 className="text-lg font-bold">{portal.company_name}</h1>
            </div>
          </div>

          <div className="bg-white/10 rounded-xl p-4">
            <h2 className="text-xl font-bold mb-1">{portal.job_title}</h2>
            {portal.client_name && (
              <p className="text-blue-100 text-sm">Hello, {portal.client_name}</p>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Progress Section */}
        {portal.permissions.showProgress && (
          <section className="bg-card rounded-xl border border-border p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                Project Progress
              </h3>
              <Badge className={getStatusColor(portal.job_status)}>
                {portal.job_status?.replace("_", " ") || "Active"}
              </Badge>
            </div>

            <div className="mb-2">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">Completion</span>
                <span className="font-medium text-foreground">{portal.job_progress}%</span>
              </div>
              <div className="h-3 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500"
                  style={{ width: `${portal.job_progress}%` }}
                />
              </div>
            </div>
          </section>
        )}

        {/* Timeline Section */}
        {portal.permissions.showTimeline && (
          <section className="bg-card rounded-xl border border-border p-4">
            <h3 className="font-semibold text-foreground flex items-center gap-2 mb-3">
              <Calendar className="h-5 w-5 text-blue-500" />
              Timeline
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Start Date</p>
                <p className="font-medium text-foreground">{formatDate(portal.job_start_date)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Expected Completion</p>
                <p className="font-medium text-foreground">{formatDate(portal.job_end_date)}</p>
              </div>
            </div>

            {portal.job_address && (
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  Location
                </p>
                <p className="text-sm text-foreground">{portal.job_address}</p>
              </div>
            )}
          </section>
        )}

        {/* Progress Logs Section */}
        {progressLogs.length > 0 && (
          <section className="bg-card rounded-xl border border-border p-4">
            <h3 className="font-semibold text-foreground flex items-center gap-2 mb-3">
              <FileText className="h-5 w-5 text-purple-500" />
              Latest Updates
            </h3>

            <div className="space-y-3">
              {displayedLogs.map((log) => (
                <div
                  key={log.id}
                  className="p-3 rounded-lg bg-muted/50 border border-border"
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-foreground text-sm">
                      {formatDate(log.log_date)}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      {log.weather && (
                        <span className="flex items-center gap-1">
                          <CloudSun className="h-3 w-3" />
                          {log.weather}
                        </span>
                      )}
                      {log.workers_on_site && (
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {log.workers_on_site}
                        </span>
                      )}
                    </div>
                  </div>

                  {log.work_completed && (
                    <p className="text-sm text-foreground">{log.work_completed}</p>
                  )}

                  {log.work_planned && (
                    <p className="text-xs text-muted-foreground mt-2">
                      <span className="font-medium">Next:</span> {log.work_planned}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {progressLogs.length > 3 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAllLogs(!showAllLogs)}
                className="w-full mt-3 text-muted-foreground"
              >
                {showAllLogs ? (
                  <>
                    <ChevronUp className="h-4 w-4 mr-1" />
                    Show Less
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4 mr-1" />
                    Show All ({progressLogs.length} updates)
                  </>
                )}
              </Button>
            )}
          </section>
        )}

        {/* Photos Section */}
        {portal.permissions.showPhotos && photos.length > 0 && (
          <section className="bg-card rounded-xl border border-border p-4">
            <h3 className="font-semibold text-foreground flex items-center gap-2 mb-3">
              <Image className="h-5 w-5 text-orange-500" />
              Photos
            </h3>

            {/* Category Filter */}
            {photoCategories.length > 1 && (
              <div className="flex gap-2 mb-3 overflow-x-auto pb-2">
                <Button
                  variant={selectedCategory === null ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(null)}
                  className="shrink-0"
                >
                  All
                </Button>
                {photoCategories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="shrink-0 capitalize"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            )}

            {/* Photo Grid */}
            <div className="grid grid-cols-3 gap-2">
              {filteredPhotos.map((photo) => (
                <a
                  key={photo.id}
                  href={photo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="aspect-square rounded-lg overflow-hidden bg-muted relative group"
                >
                  <img
                    src={photo.url}
                    alt={photo.filename}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                    <span className="text-white text-xs capitalize">{photo.category}</span>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Messages Section */}
        {portal.permissions.allowMessages && (
          <section className="bg-card rounded-xl border border-border p-4">
            <h3 className="font-semibold text-foreground flex items-center gap-2 mb-3">
              <MessageCircle className="h-5 w-5 text-green-500" />
              Messages
            </h3>

            {/* Message Thread */}
            {messages.length > 0 && (
              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn(
                      "p-3 rounded-lg max-w-[85%]",
                      msg.sender_type === "client"
                        ? "bg-blue-500/20 ml-auto"
                        : "bg-muted"
                    )}
                  >
                    <p className="text-sm text-foreground">{msg.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      <Clock className="h-3 w-3 inline mr-1" />
                      {new Date(msg.created_at).toLocaleString("en-GB", {
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Message Input */}
            <div className="space-y-2">
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message to the contractor..."
                className="min-h-[80px] touch-manipulation text-base resize-none"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!message.trim() || sendMessage.isPending}
                className="w-full h-11 bg-blue-600 hover:bg-blue-700 touch-manipulation"
              >
                {sendMessage.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="text-center py-6">
          <p className="text-xs text-muted-foreground">
            Powered by Elec-Mate
          </p>
        </footer>
      </main>
    </div>
  );
}
