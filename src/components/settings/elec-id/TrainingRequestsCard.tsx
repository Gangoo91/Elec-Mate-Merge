import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useTrainingRequests, TrainingRequest } from "@/hooks/useTrainingRequests";
import {
  GraduationCap,
  Building2,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Loader2,
  AlertCircle,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";

interface TrainingRequestItemProps {
  request: TrainingRequest;
  onApprove: (id: string) => Promise<void>;
  onDecline: (id: string) => Promise<void>;
  isProcessing: boolean;
}

function TrainingRequestItem({ request, onApprove, onDecline, isProcessing }: TrainingRequestItemProps) {
  const isPending = request.status === "pending";
  const isApproved = request.status === "approved";
  const isDeclined = request.status === "declined";

  return (
    <div className={`p-4 rounded-lg border ${
      isPending
        ? "bg-yellow-500/5 border-yellow-500/20"
        : isApproved
          ? "bg-green-500/5 border-green-500/20"
          : "bg-red-500/5 border-red-500/20"
    }`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className={`p-2 rounded-lg ${
            isPending
              ? "bg-yellow-500/10"
              : isApproved
                ? "bg-green-500/10"
                : "bg-red-500/10"
          }`}>
            <GraduationCap className={`h-5 w-5 ${
              isPending
                ? "text-yellow-500"
                : isApproved
                  ? "text-green-500"
                  : "text-red-500"
            }`} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-foreground truncate">{request.training_name}</p>
            {request.provider && (
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-0.5">
                <Building2 className="h-3 w-3" />
                <span className="truncate">{request.provider}</span>
              </div>
            )}
            {request.completed_date && (
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-0.5">
                <Calendar className="h-3 w-3" />
                <span>{format(new Date(request.completed_date), "d MMM yyyy")}</span>
              </div>
            )}
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-2">
              <Clock className="h-3 w-3" />
              <span>
                {isPending
                  ? `Requested ${formatDistanceToNow(new Date(request.requested_at), { addSuffix: true })}`
                  : `Responded ${formatDistanceToNow(new Date(request.responded_at!), { addSuffix: true })}`
                }
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          {isPending && (
            <>
              <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/30">
                Pending
              </Badge>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 border-red-500/30 text-red-500 hover:bg-red-500/10"
                  onClick={() => onDecline(request.id)}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <Loader2 className="h-3 w-3 animate-spin" />
                  ) : (
                    <XCircle className="h-3 w-3" />
                  )}
                </Button>
                <Button
                  size="sm"
                  className="h-8 bg-green-600 hover:bg-green-700"
                  onClick={() => onApprove(request.id)}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <Loader2 className="h-3 w-3 animate-spin" />
                  ) : (
                    <>
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Approve
                    </>
                  )}
                </Button>
              </div>
            </>
          )}
          {isApproved && (
            <Badge className="bg-green-500/10 text-green-500 border-green-500/30">
              <CheckCircle className="h-3 w-3 mr-1" />
              Approved
            </Badge>
          )}
          {isDeclined && (
            <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/30">
              <XCircle className="h-3 w-3 mr-1" />
              Declined
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}

export function TrainingRequestsCard() {
  const { requests, isLoading, isSubmitting, respondToRequest, getPendingCount } = useTrainingRequests();
  const [showHistory, setShowHistory] = useState(false);

  const pendingRequests = requests.filter((r) => r.status === "pending");
  const historyRequests = requests.filter((r) => r.status !== "pending");
  const pendingCount = getPendingCount();

  const handleApprove = async (id: string) => {
    await respondToRequest(id, true);
  };

  const handleDecline = async (id: string) => {
    await respondToRequest(id, false);
  };

  if (isLoading) {
    return (
      <Card className="bg-card border-border">
        <CardContent className="p-6">
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Loading training requests...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (requests.length === 0) {
    return null; // Don't show card if no requests
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-elec-yellow/10">
              <GraduationCap className="h-5 w-5 text-elec-yellow" />
            </div>
            <div>
              <CardTitle className="text-lg">Training Requests</CardTitle>
              <CardDescription>Employer-submitted training records</CardDescription>
            </div>
          </div>
          {pendingCount > 0 && (
            <Badge variant="destructive" className="bg-yellow-500 text-black">
              {pendingCount} pending
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Pending Requests */}
        {pendingRequests.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-yellow-500" />
              <p className="text-sm font-medium text-yellow-500">
                {pendingCount} request{pendingCount > 1 ? "s" : ""} awaiting your approval
              </p>
            </div>
            {pendingRequests.map((request) => (
              <TrainingRequestItem
                key={request.id}
                request={request}
                onApprove={handleApprove}
                onDecline={handleDecline}
                isProcessing={isSubmitting}
              />
            ))}
          </div>
        )}

        {/* History Toggle */}
        {historyRequests.length > 0 && (
          <>
            {pendingRequests.length > 0 && <Separator />}
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-between text-muted-foreground"
              onClick={() => setShowHistory(!showHistory)}
            >
              <span>Past Requests ({historyRequests.length})</span>
              {showHistory ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>

            {showHistory && (
              <div className="space-y-3">
                {historyRequests.map((request) => (
                  <TrainingRequestItem
                    key={request.id}
                    request={request}
                    onApprove={handleApprove}
                    onDecline={handleDecline}
                    isProcessing={isSubmitting}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
