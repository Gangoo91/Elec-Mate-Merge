import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Wrench,
  Package,
  Truck,
  Building2,
  TrendingUp,
  Calculator,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  useJobFinancial,
  useUpdateBudgetValues,
} from "@/hooks/useJobFinancials";

interface EditJobBudgetSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  jobId: string;
  jobTitle?: string;
}

const budgetFields = [
  { id: "labour", label: "Labour", icon: Wrench, color: "blue" },
  { id: "materials", label: "Materials", icon: Package, color: "green" },
  { id: "equipment", label: "Equipment", icon: Truck, color: "purple" },
  { id: "overheads", label: "Overheads", icon: Building2, color: "orange" },
  { id: "profit", label: "Profit Margin", icon: TrendingUp, color: "yellow" },
] as const;

const formSchema = z.object({
  labour: z.coerce.number().min(0, "Must be 0 or greater"),
  materials: z.coerce.number().min(0, "Must be 0 or greater"),
  equipment: z.coerce.number().min(0, "Must be 0 or greater"),
  overheads: z.coerce.number().min(0, "Must be 0 or greater"),
  profit: z.coerce.number().min(0, "Must be 0 or greater"),
});

type FormData = z.infer<typeof formSchema>;

export function EditJobBudgetSheet({
  open,
  onOpenChange,
  jobId,
  jobTitle,
}: EditJobBudgetSheetProps) {
  const isMobile = useIsMobile();

  const { data: financial, isLoading } = useJobFinancial(jobId);
  const updateBudget = useUpdateBudgetValues();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      labour: 0,
      materials: 0,
      equipment: 0,
      overheads: 0,
      profit: 0,
    },
  });

  const { watch, setValue, handleSubmit, formState: { errors, isDirty }, reset } = form;
  const values = watch();

  // Load existing values when financial data is available
  useEffect(() => {
    if (financial && open) {
      reset({
        labour: Number(financial.budget_labour) || 0,
        materials: Number(financial.budget_materials) || 0,
        equipment: Number(financial.budget_equipment) || 0,
        overheads: Number(financial.budget_overheads) || 0,
        profit: Number(financial.budget_profit) || 0,
      });
    }
  }, [financial, open, reset]);

  const handleClose = () => {
    onOpenChange(false);
  };

  const handleFormSubmit = (data: FormData) => {
    updateBudget.mutate(
      {
        jobId,
        budgets: data,
      },
      {
        onSuccess: () => {
          handleClose();
        },
      }
    );
  };

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      minimumFractionDigits: 0,
    }).format(amount);

  // Calculate totals
  const subtotal = values.labour + values.materials + values.equipment + values.overheads;
  const total = subtotal + values.profit;
  const profitPercent = subtotal > 0 ? (values.profit / subtotal) * 100 : 0;

  // Original values for comparison
  const originalTotal = financial
    ? Number(financial.budget_labour || 0) +
      Number(financial.budget_materials || 0) +
      Number(financial.budget_equipment || 0) +
      Number(financial.budget_overheads || 0) +
      Number(financial.budget_profit || 0)
    : 0;

  const difference = total - originalTotal;

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
          <SheetTitle>Edit Job Budget</SheetTitle>
          {jobTitle && (
            <p className="text-sm text-muted-foreground">{jobTitle}</p>
          )}
        </SheetHeader>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {isLoading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-16 bg-muted animate-pulse rounded-lg" />
              ))}
            </div>
          ) : (
            <>
              {/* Budget Fields */}
              <div className="space-y-3">
                {budgetFields.map(({ id, label, icon: Icon }) => (
                  <div key={id} className="space-y-1.5">
                    <Label className="text-sm flex items-center gap-2">
                      <Icon className="h-4 w-4 text-muted-foreground" />
                      {label}
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
                        £
                      </span>
                      <Input
                        type="number"
                        step="1"
                        min="0"
                        placeholder="0"
                        className={cn(
                          "pl-8 h-11",
                          errors[id as keyof FormData] && "border-red-500"
                        )}
                        value={values[id as keyof FormData] || ""}
                        onChange={(e) =>
                          setValue(id as keyof FormData, parseFloat(e.target.value) || 0, { shouldDirty: true })
                        }
                      />
                    </div>
                    {errors[id as keyof FormData] && (
                      <p className="text-xs text-red-500">
                        {errors[id as keyof FormData]?.message}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Summary Card */}
              <Card className="p-4 bg-gradient-to-br from-elec-yellow/10 to-transparent border-elec-yellow/30">
                <div className="flex items-center gap-2 mb-3">
                  <Calculator className="h-4 w-4 text-elec-yellow" />
                  <span className="text-sm font-medium">Budget Summary</span>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-1.5 border-b border-border/50">
                    <span className="text-muted-foreground">Costs Subtotal</span>
                    <span className="font-medium">{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-border/50">
                    <span className="text-muted-foreground">
                      Profit ({profitPercent.toFixed(1)}%)
                    </span>
                    <span className="font-medium text-green-500">
                      +{formatCurrency(values.profit)}
                    </span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="font-semibold">Total Budget</span>
                    <span className="font-bold text-lg">{formatCurrency(total)}</span>
                  </div>
                </div>
              </Card>

              {/* Change Indicator */}
              {isDirty && (
                <Card
                  className={cn(
                    "p-3",
                    difference >= 0
                      ? "bg-green-500/10 border-green-500/30"
                      : "bg-red-500/10 border-red-500/30"
                  )}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Change from original
                    </span>
                    <span
                      className={cn(
                        "font-bold",
                        difference >= 0 ? "text-green-500" : "text-red-500"
                      )}
                    >
                      {difference >= 0 ? "+" : ""}
                      {formatCurrency(difference)}
                    </span>
                  </div>
                </Card>
              )}

              {/* Actual Spend Warning */}
              {financial && Number(financial.actual_total) > 0 && (
                <Card className="p-3 bg-amber-500/10 border-amber-500/30">
                  <p className="text-sm text-amber-500">
                    <strong>Note:</strong> This job has{" "}
                    {formatCurrency(Number(financial.actual_total))} in actual
                    costs recorded. Changing the budget will affect variance
                    calculations.
                  </p>
                </Card>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border shrink-0 pb-safe">
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1 h-12"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              className="flex-1 bg-elec-yellow text-black hover:bg-elec-yellow/90 h-12"
              onClick={handleSubmit(handleFormSubmit)}
              disabled={!isDirty || updateBudget.isPending}
            >
              {updateBudget.isPending ? "Saving..." : "Save Budget"}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default EditJobBudgetSheet;
