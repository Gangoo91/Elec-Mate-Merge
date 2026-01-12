import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import {
  Wrench,
  Package,
  Truck,
  Building2,
  Check,
  Calendar,
  PoundSterling,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  useRecordActualCost,
  useJobCostComparison,
  type ActualCostEntry,
} from "@/hooks/useJobFinancials";

interface RecordActualCostSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  jobId: string;
  jobTitle?: string;
}

const costCategories = [
  { id: "labour", label: "Labour", icon: Wrench, color: "blue" },
  { id: "materials", label: "Materials", icon: Package, color: "green" },
  { id: "equipment", label: "Equipment", icon: Truck, color: "purple" },
  { id: "overheads", label: "Overheads", icon: Building2, color: "orange" },
] as const;

const formSchema = z.object({
  category: z.enum(["labour", "materials", "equipment", "overheads"]),
  amount: z.coerce.number().min(0.01, "Amount must be greater than 0"),
  date: z.string().min(1, "Date is required"),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export function RecordActualCostSheet({
  open,
  onOpenChange,
  jobId,
  jobTitle,
}: RecordActualCostSheetProps) {
  const isMobile = useIsMobile();
  const [step, setStep] = useState(1);

  const recordCost = useRecordActualCost();
  const costComparison = useJobCostComparison(jobId);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "materials",
      amount: 0,
      date: format(new Date(), "yyyy-MM-dd"),
      notes: "",
    },
  });

  const { watch, setValue, handleSubmit, formState: { errors }, reset } = form;
  const values = watch();

  const handleClose = () => {
    reset();
    setStep(1);
    onOpenChange(false);
  };

  const handleFormSubmit = (data: FormData) => {
    const entry: ActualCostEntry = {
      category: data.category,
      amount: data.amount,
      date: data.date,
      notes: data.notes,
    };

    recordCost.mutate(
      { jobId, entry },
      {
        onSuccess: () => {
          handleClose();
        },
      }
    );
  };

  const selectedCategory = costCategories.find((c) => c.id === values.category);
  const CategoryIcon = selectedCategory?.icon || Package;

  // Get current budget vs actual for selected category
  const categoryComparison = costComparison.find(
    (c) => c.category.toLowerCase() === values.category
  );

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      minimumFractionDigits: 0,
    }).format(amount);

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent
        side={isMobile ? "bottom" : "right"}
        className={cn(
          "flex flex-col p-0",
          isMobile ? "h-[85vh] rounded-t-2xl" : "w-[450px]"
        )}
      >
        {/* Header */}
        <SheetHeader className="p-4 border-b border-border shrink-0">
          <SheetTitle>Record Actual Cost</SheetTitle>
          {jobTitle && (
            <p className="text-sm text-muted-foreground">{jobTitle}</p>
          )}
          {/* Progress Bar */}
          <div className="flex gap-1 mt-3">
            {[1, 2].map((i) => (
              <div
                key={i}
                className={cn(
                  "h-1 flex-1 rounded-full transition-colors",
                  i <= step ? "bg-elec-yellow" : "bg-muted"
                )}
              />
            ))}
          </div>
        </SheetHeader>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {step === 1 && (
            <div className="space-y-6">
              {/* Category Selection */}
              <div className="space-y-3">
                <Label>Cost Category</Label>
                <div className="grid grid-cols-2 gap-2">
                  {costCategories.map(({ id, label, icon: Icon, color }) => {
                    const isSelected = values.category === id;
                    const comparison = costComparison.find(
                      (c) => c.category.toLowerCase() === id
                    );

                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setValue("category", id)}
                        className={cn(
                          "flex flex-col items-start gap-2 p-3 rounded-lg border transition-all text-left",
                          "hover:bg-muted/50 active:scale-[0.98]",
                          isSelected
                            ? "border-elec-yellow bg-elec-yellow/10"
                            : "border-border"
                        )}
                      >
                        <div className="flex items-center gap-2 w-full">
                          <Icon
                            className={cn(
                              "h-5 w-5",
                              isSelected
                                ? "text-elec-yellow"
                                : "text-muted-foreground"
                            )}
                          />
                          <span
                            className={cn(
                              "text-sm font-medium flex-1",
                              isSelected
                                ? "text-foreground"
                                : "text-muted-foreground"
                            )}
                          >
                            {label}
                          </span>
                          {isSelected && (
                            <Check className="h-4 w-4 text-elec-yellow" />
                          )}
                        </div>
                        {comparison && (
                          <div className="text-xs text-muted-foreground">
                            <span>
                              {formatCurrency(comparison.actual)} /{" "}
                              {formatCurrency(comparison.budgeted)}
                            </span>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Budget Status Card */}
              {categoryComparison && (
                <Card
                  className={cn(
                    "p-3",
                    categoryComparison.variance >= 0
                      ? "bg-green-500/10 border-green-500/30"
                      : "bg-red-500/10 border-red-500/30"
                  )}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-muted-foreground">
                        {selectedCategory?.label} Budget Status
                      </p>
                      <p className="text-sm font-medium">
                        {formatCurrency(categoryComparison.actual)} of{" "}
                        {formatCurrency(categoryComparison.budgeted)}
                      </p>
                    </div>
                    <div
                      className={cn(
                        "text-sm font-bold",
                        categoryComparison.variance >= 0
                          ? "text-green-500"
                          : "text-red-500"
                      )}
                    >
                      {categoryComparison.variance >= 0 ? "+" : ""}
                      {formatCurrency(categoryComparison.variance)}
                    </div>
                  </div>
                </Card>
              )}

              {/* Amount */}
              <div className="space-y-2">
                <Label>Amount</Label>
                <div className="relative">
                  <PoundSterling className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    className={cn(
                      "pl-9 text-lg h-12",
                      errors.amount && "border-red-500"
                    )}
                    value={values.amount || ""}
                    onChange={(e) =>
                      setValue("amount", parseFloat(e.target.value) || 0)
                    }
                  />
                </div>
                {errors.amount && (
                  <p className="text-xs text-red-500">{errors.amount.message}</p>
                )}
              </div>

              {/* Date */}
              <div className="space-y-2">
                <Label>Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="date"
                    className={cn(
                      "pl-9 h-11",
                      errors.date && "border-red-500"
                    )}
                    value={values.date}
                    onChange={(e) => setValue("date", e.target.value)}
                  />
                </div>
                {errors.date && (
                  <p className="text-xs text-red-500">{errors.date.message}</p>
                )}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              {/* Notes */}
              <div className="space-y-2">
                <Label>Notes (Optional)</Label>
                <Textarea
                  placeholder="Add details about this cost..."
                  className="min-h-[120px]"
                  value={values.notes}
                  onChange={(e) => setValue("notes", e.target.value)}
                />
              </div>

              {/* Summary Card */}
              <Card className="p-4 bg-gradient-to-br from-elec-yellow/10 to-transparent border-elec-yellow/30">
                <div className="text-center mb-4">
                  <p className="text-sm text-muted-foreground">Recording</p>
                  <p className="text-3xl font-bold text-foreground">
                    {formatCurrency(values.amount)}
                  </p>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between py-2 border-b border-border/50">
                    <span className="text-muted-foreground">Category</span>
                    <span className="font-medium flex items-center gap-1">
                      <CategoryIcon className="h-4 w-4" />
                      {selectedCategory?.label}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border/50">
                    <span className="text-muted-foreground">Date</span>
                    <span className="font-medium">
                      {format(new Date(values.date), "dd MMM yyyy")}
                    </span>
                  </div>
                  {values.notes && (
                    <div className="flex justify-between py-2">
                      <span className="text-muted-foreground">Notes</span>
                      <span className="font-medium text-right max-w-[200px] truncate">
                        {values.notes}
                      </span>
                    </div>
                  )}
                </div>
              </Card>

              {/* New Budget Status Preview */}
              {categoryComparison && (
                <Card className="p-3">
                  <p className="text-xs text-muted-foreground mb-2">
                    After Recording
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">New {selectedCategory?.label} Total</span>
                    <span className="font-medium">
                      {formatCurrency(categoryComparison.actual + values.amount)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-sm text-muted-foreground">Remaining</span>
                    <span
                      className={cn(
                        "font-medium",
                        categoryComparison.budgeted -
                          (categoryComparison.actual + values.amount) >=
                          0
                          ? "text-green-500"
                          : "text-red-500"
                      )}
                    >
                      {formatCurrency(
                        categoryComparison.budgeted -
                          (categoryComparison.actual + values.amount)
                      )}
                    </span>
                  </div>
                </Card>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border shrink-0 pb-safe">
          {step === 1 ? (
            <Button
              className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90 h-12"
              onClick={() => setStep(2)}
              disabled={!values.amount || values.amount <= 0}
            >
              Continue
            </Button>
          ) : (
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 h-12"
                onClick={() => setStep(1)}
              >
                Back
              </Button>
              <Button
                className="flex-1 bg-elec-yellow text-black hover:bg-elec-yellow/90 h-12"
                onClick={handleSubmit(handleFormSubmit)}
                disabled={recordCost.isPending}
              >
                {recordCost.isPending ? "Recording..." : "Record Cost"}
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default RecordActualCostSheet;
