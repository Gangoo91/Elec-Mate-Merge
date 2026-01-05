import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Receipt,
  Wrench,
  Car,
  ParkingCircle,
  Hammer,
  HardHat,
  Package,
  Send
} from "lucide-react";
import { useCreateExpenseClaim } from "@/hooks/useFinance";
import { useEmployees } from "@/hooks/useEmployees";
import { useJobs } from "@/hooks/useJobs";
import { useOptionalVoiceFormContext } from "@/contexts/VoiceFormContext";

interface CreateExpenseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CATEGORIES = [
  { value: "Materials", icon: Wrench, emoji: "🔧" },
  { value: "Travel", icon: Car, emoji: "🚗" },
  { value: "Parking", icon: ParkingCircle, emoji: "🅿️" },
  { value: "Tools", icon: Hammer, emoji: "🛠️" },
  { value: "PPE", icon: HardHat, emoji: "🦺" },
  { value: "Other", icon: Package, emoji: "📦" },
];

export function CreateExpenseDialog({ open, onOpenChange }: CreateExpenseDialogProps) {
  const [employeeId, setEmployeeId] = useState("");
  const [category, setCategory] = useState("Materials");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [jobId, setJobId] = useState<string | null>(null);

  const { data: employees = [] } = useEmployees();
  const { data: jobs = [] } = useJobs();
  const createExpenseMutation = useCreateExpenseClaim();

  const activeJobs = jobs.filter(j => j.status === "Active");

  // Voice form registration
  const voiceContext = useOptionalVoiceFormContext();
  
  useEffect(() => {
    if (!open || !voiceContext) return;
    
    voiceContext.registerForm({
      formId: 'create-expense',
      formName: 'Create Expense',
      fields: [
        { name: 'employee', label: 'Employee', type: 'text', required: true },
        { name: 'category', label: 'Category', type: 'text', required: true },
        { name: 'amount', label: 'Amount', type: 'text', required: true },
        { name: 'description', label: 'Description', type: 'text', required: true },
        { name: 'job', label: 'Linked Job', type: 'text' },
      ],
      onFillField: (field, value) => {
        switch (field) {
          case 'employee':
            const emp = employees.find(e => e.name.toLowerCase().includes(value.toLowerCase()));
            if (emp) setEmployeeId(emp.id);
            break;
          case 'category': setCategory(value); break;
          case 'amount': setAmount(value); break;
          case 'description': setDescription(value); break;
          case 'job':
            const job = activeJobs.find(j => j.title.toLowerCase().includes(value.toLowerCase()));
            if (job) setJobId(job.id);
            break;
        }
      },
      onSubmit: handleSubmit,
      onCancel: () => { resetForm(); onOpenChange(false); },
    });
    
    return () => voiceContext.unregisterForm('create-expense');
  }, [open, voiceContext, employees, activeJobs]);

  const handleSubmit = async () => {
    if (!employeeId || !amount || !description) return;

    await createExpenseMutation.mutateAsync({
      employee_id: employeeId,
      category,
      amount: Number(amount),
      description,
      job_id: jobId,
      status: "Pending",
      submitted_date: new Date().toISOString().split('T')[0],
      receipt_url: null,
      approved_by: null,
      approved_date: null,
      paid_date: null,
      rejection_reason: null
    });

    resetForm();
    onOpenChange(false);
  };

  const resetForm = () => {
    setEmployeeId("");
    setCategory("Materials");
    setAmount("");
    setDescription("");
    setJobId(null);
  };

  const selectedCategory = CATEGORIES.find(c => c.value === category);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <SheetHeader className="px-4 py-3 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-elec-yellow/10 flex items-center justify-center text-xl">
                {selectedCategory?.emoji}
              </div>
              <SheetTitle className="text-lg">Submit Expense</SheetTitle>
            </div>
          </SheetHeader>

          {/* Content */}
          <ScrollArea className="flex-1 px-4 py-4">
            <div className="space-y-4">
              {/* Employee */}
              <div className="space-y-2">
                <Label>Employee *</Label>
                <Select value={employeeId} onValueChange={setEmployeeId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select employee" />
                  </SelectTrigger>
                  <SelectContent>
                    {employees.map((emp) => (
                      <SelectItem key={emp.id} value={emp.id}>
                        {emp.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Category Pills */}
              <div className="space-y-2">
                <Label>Category *</Label>
                <div className="grid grid-cols-3 gap-2">
                  {CATEGORIES.map((cat) => (
                    <Card
                      key={cat.value}
                      className={`cursor-pointer touch-feedback transition-colors ${
                        category === cat.value 
                          ? 'bg-elec-yellow/20 border-elec-yellow' 
                          : 'bg-elec-gray hover:bg-muted'
                      }`}
                      onClick={() => setCategory(cat.value)}
                    >
                      <CardContent className="p-3 flex flex-col items-center gap-1">
                        <span className="text-2xl">{cat.emoji}</span>
                        <span className="text-xs font-medium">{cat.value}</span>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Amount */}
              <div className="space-y-2">
                <Label>Amount *</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">£</span>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="pl-8 text-lg font-medium"
                    step={0.01}
                    min={0}
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label>Description *</Label>
                <Textarea
                  placeholder="What was this expense for?"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-[80px]"
                />
              </div>

              {/* Link to Job */}
              <div className="space-y-2">
                <Label>Link to Job (Optional)</Label>
                <Select value={jobId || ""} onValueChange={(v) => setJobId(v || null)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select job (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">No job linked</SelectItem>
                    {activeJobs.map((job) => (
                      <SelectItem key={job.id} value={job.id}>
                        {job.title} - {job.client}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Receipt Upload Placeholder */}
              <Card className="bg-muted/30 border-dashed">
                <CardContent className="p-4 flex flex-col items-center gap-2">
                  <Receipt className="h-8 w-8 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground text-center">
                    Receipt upload coming soon
                  </p>
                </CardContent>
              </Card>
            </div>
          </ScrollArea>

          {/* Footer */}
          <SheetFooter className="px-4 py-3 border-t border-border pb-safe">
            <Button 
              className="w-full"
              onClick={handleSubmit}
              disabled={!employeeId || !amount || !description || createExpenseMutation.isPending}
            >
              <Send className="h-4 w-4 mr-2" />
              Submit Expense
            </Button>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
}
