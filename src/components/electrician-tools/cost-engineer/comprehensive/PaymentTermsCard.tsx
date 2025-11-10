import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PoundSterling } from "lucide-react";

interface PaymentTermsCardProps {
  paymentTerms: any;
  totalAmount: number;
}

const PaymentTermsCard = ({ paymentTerms, totalAmount }: PaymentTermsCardProps) => {
  return (
    <Card className="border-elec-yellow/20">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <PoundSterling className="h-5 w-5 text-elec-yellow" />
          Payment Terms
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Deposit & Balance */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-3 rounded-lg bg-background/50 border border-border/30">
            <div className="text-sm text-muted-foreground mb-1">Deposit ({paymentTerms.depositPercent}%)</div>
            <div className="text-2xl font-bold text-elec-yellow">
              £{paymentTerms.depositAmount?.toFixed(2)}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Due before work starts
            </div>
          </div>

          <div className="p-3 rounded-lg bg-background/50 border border-border/30">
            <div className="text-sm text-muted-foreground mb-1">Balance</div>
            <div className="text-2xl font-bold">
              £{paymentTerms.balanceAmount?.toFixed(2)}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Due on completion
            </div>
          </div>
        </div>

        {/* Payment Milestones */}
        {paymentTerms.paymentMilestones && paymentTerms.paymentMilestones.length > 0 && (
          <div>
            <div className="text-sm font-medium mb-2">Payment Milestones</div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Stage</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Trigger</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paymentTerms.paymentMilestones.map((milestone: any, idx: number) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium">{milestone.stage}</TableCell>
                    <TableCell className="text-right font-mono">
                      £{milestone.amount.toFixed(2)} ({milestone.percentage}%)
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {milestone.trigger}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {/* Terms */}
        {paymentTerms.terms && (
          <div className="p-3 rounded-lg bg-background/50 border border-border/30">
            <div className="text-sm font-medium mb-1">Payment Terms</div>
            <p className="text-sm text-muted-foreground">{paymentTerms.terms}</p>
          </div>
        )}

        {/* Late Fee Policy */}
        {paymentTerms.lateFeePolicy && (
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30">
            <div className="text-sm font-medium mb-1 text-red-500">Late Payment Policy</div>
            <p className="text-sm text-muted-foreground">{paymentTerms.lateFeePolicy}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PaymentTermsCard;
