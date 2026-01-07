import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Wrench } from "lucide-react";
import { motion } from "framer-motion";

interface LabourPlanTableProps {
  tasks: any[];
}

const LabourPlanTable = ({ tasks }: LabourPlanTableProps) => {
  if (!tasks || tasks.length === 0) return null;

  const totalHours = tasks.reduce((sum, task) => sum + (task.hours || 0), 0);
  const totalCost = tasks.reduce((sum, task) => sum + (task.total || 0), 0);

  return (
    <Card variant="ios" className="overflow-hidden">
      <CardContent className="p-0">
        {/* Header */}
        <div className="p-4 border-b border-white/5">
          <div className="flex items-center gap-3">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center"
            >
              <Wrench className="h-5 w-5 text-orange-400" />
            </motion.div>
            <div>
              <h3 className="text-ios-headline text-white font-semibold">Labour Plan</h3>
              <p className="text-ios-caption-1 text-white/50">{tasks.length} tasks • {totalHours.toFixed(1)} hours</p>
            </div>
          </div>
        </div>

        <div className="p-4">
          {/* Mobile: Stacked Cards */}
          <div className="space-y-3 sm:hidden">
            {tasks.map((task, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="p-4 rounded-xl bg-black/30 border border-white/10"
              >
                <div className="text-ios-body font-medium text-white mb-3 leading-snug">{task.description}</div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2.5 rounded-lg bg-white/5">
                    <div className="text-ios-caption-1 text-white/50 mb-1">Hours</div>
                    <div className="font-mono text-ios-footnote font-medium text-white">{task.hours.toFixed(1)}h</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white/5">
                    <div className="text-ios-caption-1 text-white/50 mb-1">Rate</div>
                    <div className="font-mono text-ios-footnote font-medium text-white">£{task.rate?.toFixed(0)}/hr</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white/5">
                    <div className="text-ios-caption-1 text-white/50 mb-1">Total</div>
                    <div className="font-mono text-ios-footnote font-bold text-orange-400">£{task.total?.toFixed(0)}</div>
                  </div>
                </div>
                {(task.electricianHours || task.apprenticeHours) && (
                  <div className="text-ios-caption-1 text-white/50 mt-3 pt-3 border-t border-white/5">
                    {task.electricianHours && `Electrician: ${task.electricianHours.toFixed(1)}h `}
                    {task.apprenticeHours && `Apprentice: ${task.apprenticeHours.toFixed(1)}h`}
                  </div>
                )}
              </motion.div>
            ))}
            {/* Total row */}
            <div className="p-4 rounded-xl bg-orange-500/20 border border-orange-500/30">
              <div className="flex justify-between items-center">
                <span className="text-ios-body font-semibold text-white">Total Labour</span>
                <div className="text-right">
                  <div className="text-ios-caption-1 text-white/60">{totalHours.toFixed(1)} hours</div>
                  <div className="text-xl font-bold text-orange-400">£{totalCost.toFixed(2)}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop: Table */}
          <div className="hidden sm:block">
            <Table>
              <TableHeader>
                <TableRow className="border-white/10">
                  <TableHead className="text-left text-white/70 font-semibold text-ios-footnote">Task</TableHead>
                  <TableHead className="text-right text-white/70 font-semibold text-ios-footnote">Hours</TableHead>
                  <TableHead className="text-right text-white/70 font-semibold text-ios-footnote">Rate</TableHead>
                  <TableHead className="text-right text-white/70 font-semibold text-ios-footnote">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tasks.map((task, idx) => (
                  <TableRow key={idx} className="border-white/5">
                    <TableCell className="font-medium text-ios-body text-white text-left py-4">
                      {task.description}
                      {(task.electricianHours || task.apprenticeHours) && (
                        <div className="text-ios-caption-1 text-white/50 text-left">
                          {task.electricianHours && `Electrician: ${task.electricianHours.toFixed(2)}h `}
                          {task.apprenticeHours && `Apprentice: ${task.apprenticeHours.toFixed(2)}h`}
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-right font-mono text-ios-body text-white/80">
                      {task.hours.toFixed(2)}h
                    </TableCell>
                    <TableCell className="text-right font-mono text-ios-body text-white/80">
                      £{task.rate?.toFixed(0)}/hr
                    </TableCell>
                    <TableCell className="text-right font-mono font-medium text-ios-body text-white">
                      £{task.total?.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className="bg-orange-500/10 font-bold border-t border-orange-500/30">
                  <TableCell className="text-white">Total Labour:</TableCell>
                  <TableCell className="text-right font-mono text-white">{totalHours.toFixed(1)}h</TableCell>
                  <TableCell></TableCell>
                  <TableCell className="text-right font-mono text-orange-400 text-lg">£{totalCost.toFixed(2)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LabourPlanTable;
