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
        <CardTitle className="text-xl sm:text-lg font-bold text-white flex items-center gap-2">
          <Wrench className="h-5 w-5 text-elec-yellow" />
          Labour Plan
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-5 sm:px-6 sm:pb-6">
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <div className="min-w-[600px] px-4 sm:px-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-white font-semibold text-base sm:text-sm">Task</TableHead>
                  <TableHead className="text-right text-white font-semibold text-base sm:text-sm">Hours</TableHead>
                  <TableHead className="text-right text-white font-semibold text-base sm:text-sm">Rate</TableHead>
                  <TableHead className="text-right text-white font-semibold text-base sm:text-sm">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tasks.map((task, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium text-base sm:text-sm text-white">
                      {task.description}
                      {(task.electricianHours || task.apprenticeHours) && (
                        <div className="text-sm text-white">
                          {task.electricianHours && `Electrician: ${task.electricianHours.toFixed(2)}h `}
                          {task.apprenticeHours && `Apprentice: ${task.apprenticeHours.toFixed(2)}h`}
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-right font-mono text-base sm:text-sm text-white">
                      {task.hours.toFixed(2)}h
                    </TableCell>
                    <TableCell className="text-right font-mono text-base sm:text-sm text-white">
                      £{task.rate?.toFixed(0)}/hr
                    </TableCell>
                    <TableCell className="text-right font-mono font-medium text-base sm:text-sm text-white">
                      £{task.total?.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className="bg-elec-yellow/10 font-bold border-t-2 border-elec-yellow/30">
                  <TableCell className="text-white">Total Labour:</TableCell>
                  <TableCell className="text-right font-mono text-white">{totalHours.toFixed(1)}h</TableCell>
                  <TableCell></TableCell>
                  <TableCell className="text-right font-mono text-white text-lg sm:text-base">£{totalCost.toFixed(2)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
        <div className="text-xs text-center text-white/60 mt-2 sm:hidden">
          ← Swipe to see more →
        </div>
      </CardContent>
    </Card>
  );
};

export default LabourPlanTable;
