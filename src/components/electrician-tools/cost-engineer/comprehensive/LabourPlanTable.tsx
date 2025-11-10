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
    <Card className="border-elec-yellow/20">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Wrench className="h-5 w-5 text-elec-yellow" />
          Labour Plan
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task</TableHead>
                <TableHead className="text-right">Hours</TableHead>
                <TableHead className="text-right">Rate</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map((task, idx) => (
                <TableRow key={idx}>
                  <TableCell className="font-medium">
                    {task.description}
                    {(task.electricianHours || task.apprenticeHours) && (
                      <div className="text-xs text-muted-foreground">
                        {task.electricianHours && `Electrician: ${task.electricianHours}h `}
                        {task.apprenticeHours && `Apprentice: ${task.apprenticeHours}h`}
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {task.hours}h
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    £{task.rate?.toFixed(0)}/hr
                  </TableCell>
                  <TableCell className="text-right font-mono font-medium">
                    £{task.total?.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="bg-muted/50 font-bold">
                <TableCell>Total Labour:</TableCell>
                <TableCell className="text-right font-mono">{totalHours.toFixed(1)}h</TableCell>
                <TableCell></TableCell>
                <TableCell className="text-right font-mono">£{totalCost.toFixed(2)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default LabourPlanTable;
