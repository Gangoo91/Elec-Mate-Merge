import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";

interface ProcessingProgressProps {
  total: number;
  processed: number;
  status: string;
}

export default function ProcessingProgress({ total, processed, status }: ProcessingProgressProps) {
  const percentage = total > 0 ? (processed / total) * 100 : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {status === "completed" && <CheckCircle2 className="h-5 w-5 text-green-500" />}
          {status === "failed" && <XCircle className="h-5 w-5 text-destructive" />}
          {status === "processing" && <Loader2 className="h-5 w-5 animate-spin" />}
          Processing Results
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span className="font-medium">{processed} / {total}</span>
          </div>
          <Progress value={percentage} className="h-2" />
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold">{total}</div>
            <div className="text-xs text-muted-foreground">Total Items</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-500">{processed}</div>
            <div className="text-xs text-muted-foreground">Processed</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{Math.round(percentage)}%</div>
            <div className="text-xs text-muted-foreground">Complete</div>
          </div>
        </div>

        {status === "completed" && (
          <div className="text-sm text-green-500 text-center">
            ✓ Processing completed successfully
          </div>
        )}
        {status === "failed" && (
          <div className="text-sm text-destructive text-center">
            ✗ Processing failed - check console for errors
          </div>
        )}
      </CardContent>
    </Card>
  );
}
