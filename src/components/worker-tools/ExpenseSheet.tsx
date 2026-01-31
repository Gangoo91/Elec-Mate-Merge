/**
 * ExpenseSheet
 *
 * Bottom sheet for workers to submit expense claims.
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Receipt,
  Camera,
  X,
  Loader2,
  Send,
  PoundSterling,
  ChevronDown,
  Clock,
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useMyJobs, useMyExpenses } from '@/hooks/useWorkerSelfService';

interface ExpenseSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EXPENSE_CATEGORIES = [
  { value: 'travel', label: 'Travel' },
  { value: 'materials', label: 'Materials' },
  { value: 'tools', label: 'Tools' },
  { value: 'ppe', label: 'PPE' },
  { value: 'subsistence', label: 'Subsistence' },
  { value: 'parking', label: 'Parking' },
  { value: 'other', label: 'Other' },
];

export function ExpenseSheet({ open, onOpenChange }: ExpenseSheetProps) {
  const [category, setCategory] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [description, setDescription] = useState('');
  const [selectedJobId, setSelectedJobId] = useState<string>('');
  const [showRecent, setShowRecent] = useState(false);

  const { data: jobs, isLoading: jobsLoading } = useMyJobs('active');
  const { recentExpenses, submitExpense, isSubmitting } = useMyExpenses();

  const handleClose = () => {
    onOpenChange(false);
    resetForm();
  };

  const resetForm = () => {
    setCategory('');
    setAmount('');
    setDescription('');
    setSelectedJobId('');
  };

  const handleSubmit = async () => {
    if (!category) {
      toast.error('Please select a category');
      return;
    }
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    try {
      await submitExpense({
        category,
        amount: parseFloat(amount),
        description: description.trim(),
        jobId: selectedJobId || undefined,
      });
      toast.success('Expense submitted');
      resetForm();
    } catch {
      toast.error('Failed to submit expense');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-amber-500/20 text-amber-400 border-0">Pending</Badge>;
      case 'approved':
        return <Badge className="bg-green-500/20 text-green-400 border-0">Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-red-500/20 text-red-400 border-0">Rejected</Badge>;
      case 'paid':
        return <Badge className="bg-blue-500/20 text-blue-400 border-0">Paid</Badge>;
      default:
        return <Badge className="bg-gray-500/20 text-gray-400 border-0">{status}</Badge>;
    }
  };

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden sm:max-w-xl sm:mx-auto">
        <div className="flex flex-col h-full bg-background">
          {/* Header */}
          <SheetHeader className="p-4 border-b border-white/[0.06] flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="w-10" />
              <SheetTitle className="text-lg font-semibold flex-1 text-center">
                Submit Expense
              </SheetTitle>
              <SheetDescription className="sr-only">
                Submit expense claims for reimbursement
              </SheetDescription>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClose}
                className="h-10 w-10 touch-manipulation"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </SheetHeader>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Category */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">Category</label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="h-12 bg-white/[0.03] border-white/10 text-white focus:border-elec-yellow focus:ring-elec-yellow">
                  <SelectValue placeholder="Select category..." />
                </SelectTrigger>
                <SelectContent className="bg-elec-gray border-white/10">
                  {EXPENSE_CATEGORIES.map((cat) => (
                    <SelectItem
                      key={cat.value}
                      value={cat.value}
                      className="text-white focus:bg-white/10 focus:text-white"
                    >
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Amount */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">Amount</label>
              <div className="relative">
                <PoundSterling className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="h-12 pl-10 bg-white/[0.03] border-white/10 text-white placeholder:text-white/40 focus:border-elec-yellow focus:ring-elec-yellow touch-manipulation"
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">Description</label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What was this expense for?"
                className="min-h-[80px] bg-white/[0.03] border-white/10 text-white placeholder:text-white/40 focus:border-elec-yellow focus:ring-elec-yellow resize-none touch-manipulation"
              />
            </div>

            {/* Job (optional) */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">
                Charge to Job <span className="text-white/40">(optional)</span>
              </label>
              <Select
                value={selectedJobId}
                onValueChange={setSelectedJobId}
                disabled={jobsLoading}
              >
                <SelectTrigger className="h-12 bg-white/[0.03] border-white/10 text-white focus:border-elec-yellow focus:ring-elec-yellow">
                  <SelectValue placeholder="No job selected" />
                </SelectTrigger>
                <SelectContent className="bg-elec-gray border-white/10">
                  {jobs?.map((job) => (
                    <SelectItem
                      key={job.id}
                      value={job.id}
                      className="text-white focus:bg-white/10 focus:text-white"
                    >
                      {job.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Receipt photo placeholder */}
            <Button
              variant="outline"
              className="w-full h-12 bg-white/[0.03] border-white/10 text-white/60 hover:bg-white/[0.06] hover:text-white touch-manipulation"
              disabled
            >
              <Camera className="h-5 w-5 mr-2" />
              Add Receipt Photo (Coming Soon)
            </Button>

            {/* Recent expenses */}
            {recentExpenses && recentExpenses.length > 0 && (
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => setShowRecent(!showRecent)}
                  className="flex items-center gap-2 text-sm font-medium text-white/80 touch-manipulation"
                >
                  <Clock className="h-4 w-4" />
                  Recent Expenses
                  <ChevronDown className={cn(
                    'h-4 w-4 transition-transform',
                    showRecent && 'rotate-180'
                  )} />
                </button>

                <AnimatePresence>
                  {showRecent && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-2 overflow-hidden"
                    >
                      {recentExpenses.map((expense) => (
                        <div
                          key={expense.id}
                          className="p-3 rounded-lg bg-white/[0.03] border border-white/10 flex items-center justify-between"
                        >
                          <div>
                            <p className="text-sm text-white font-medium">
                              £{expense.amount.toFixed(2)} - {expense.category}
                            </p>
                            <p className="text-xs text-white/40">
                              {new Date(expense.created_at).toLocaleDateString('en-GB', {
                                day: 'numeric',
                                month: 'short',
                              })}
                            </p>
                          </div>
                          {getStatusBadge(expense.status)}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-white/[0.06] p-4 flex-shrink-0">
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || !category || !amount}
              className="w-full h-12 bg-elec-yellow hover:bg-elec-yellow/90 text-elec-dark font-semibold touch-manipulation"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="h-5 w-5 mr-2" />
                  Submit Expense
                </>
              )}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
