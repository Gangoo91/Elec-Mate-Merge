import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Wrench } from "lucide-react";

interface LabourPlanTableProps {
  tasks: any[];
}

const LabourPlanTable = ({ tasks }: LabourPlanTableProps) => {
  if (!tasks || tasks.length === 0) return null;

  const totalHours = tasks.reduce((sum, task) => sum + (task.hours || 0), 0);
  const totalCost = tasks.reduce((sum, task) => sum + (task.total || 0), 0);

  return (
    <Card className="border-0 sm:border border-elec-yellow/20 rounded-none sm:rounded-xl">
      <CardHeader className="px-4 py-4 sm:px-6 sm:py-5">
        <CardTitle className="text-xl sm:text-lg font-bold text-foreground flex items-center gap-2">
          <Wrench className="h-5 w-5 text-elec-yellow" />
          Labour Plan
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-5 sm:px-6 sm:pb-6">
        {/* Mobile: Stacked Cards */}
        <div className="space-y-3 sm:hidden">
          {tasks.map((task, idx) => (
            <div key={idx} className="p-4 rounded-lg bg-background/50 border border-border/30">
              <div className="font-medium text-foreground text-base mb-3 leading-snug">{task.description}</div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2.5 rounded bg-background/50">
                  <div className="text-xs text-foreground/70 mb-1">Hours</div>
                  <div className="font-mono text-foreground font-medium">{task.hours.toFixed(1)}h</div>
                </div>
                <div className="p-2.5 rounded bg-background/50">
                  <div className="text-xs text-foreground/70 mb-1">Rate</div>
                  <div className="font-mono text-foreground font-medium">£{task.rate?.toFixed(0)}/hr</div>
                </div>
                <div className="p-2.5 rounded bg-background/50">
                  <div className="text-xs text-foreground/70 mb-1">Total</div>
                  <div className="font-mono text-elec-yellow font-bold">£{task.total?.toFixed(0)}</div>
                </div>
              </div>
              {(task.electricianHours || task.apprenticeHours) && (
                <div className="text-sm text-foreground/70 mt-3 pt-3 border-t border-border/30">
                  {task.electricianHours && `Electrician: ${task.electricianHours.toFixed(1)}h `}
                  {task.apprenticeHours && `Apprentice: ${task.apprenticeHours.toFixed(1)}h`}
                </div>
              )}
            </div>
          ))}
          {/* Total row */}
          <div className="p-4 rounded-lg bg-elec-yellow/20 border border-elec-yellow/30">
            <div className="flex justify-between items-center">
              <span className="font-bold text-foreground">Total Labour</span>
              <div className="text-right">
                <div className="text-sm text-foreground/70">{totalHours.toFixed(1)} hours</div>
                <div className="text-xl font-bold text-elec-yellow">£{totalCost.toFixed(2)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop: Table */}
        <div className="hidden sm:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-left text-foreground font-semibold text-base sm:text-sm">Task</TableHead>
                <TableHead className="text-right text-foreground font-semibold text-base sm:text-sm">Hours</TableHead>
                <TableHead className="text-right text-foreground font-semibold text-base sm:text-sm">Rate</TableHead>
                <TableHead className="text-right text-foreground font-semibold text-base sm:text-sm">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map((task, idx) => (
                <TableRow key={idx}>
                  <TableCell className="font-medium text-base sm:text-sm text-foreground text-left py-4">
                    {task.description}
                    {(task.electricianHours || task.apprenticeHours) && (
                      <div className="text-sm text-foreground text-left">
                        {task.electricianHours && `Electrician: ${task.electricianHours.toFixed(2)}h `}
                        {task.apprenticeHours && `Apprentice: ${task.apprenticeHours.toFixed(2)}h`}
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="text-right font-mono text-base sm:text-sm text-foreground">
                    {task.hours.toFixed(2)}h
                  </TableCell>
                  <TableCell className="text-right font-mono text-base sm:text-sm text-foreground">
                    £{task.rate?.toFixed(0)}/hr
                  </TableCell>
                  <TableCell className="text-right font-mono font-medium text-base sm:text-sm text-foreground">
                    £{task.total?.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="bg-elec-yellow/10 font-bold border-t-2 border-elec-yellow/30">
                <TableCell className="text-foreground">Total Labour:</TableCell>
                <TableCell className="text-right font-mono text-foreground">{totalHours.toFixed(1)}h</TableCell>
                <TableCell></TableCell>
                <TableCell className="text-right font-mono text-foreground text-lg sm:text-base">£{totalCost.toFixed(2)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default LabourPlanTable;
