import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Search,
  CheckCircle,
  Clock,
  AlertCircle,
  FileCheck,
  User,
  Calendar,
  Zap,
  ClipboardCheck,
  Award,
  Plus,
  Loader2,
  Eye,
  Trash2,
  XCircle,
  AlertTriangle,
  Filter
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { format } from "date-fns";
import {
  useJobTests,
  useJobTestStats,
  useCreateJobTest,
  useRecordTestResult,
  useVerifyJobTest,
  useDeleteJobTest,
  type JobTest,
  type CreateJobTestInput,
  type TestType,
  type TestResult,
  TEST_TYPE_CONFIG
} from "@/hooks/useJobTests";
import { useJobs } from "@/hooks/useJobs";
import { useEmployees } from "@/hooks/useEmployees";

import { PullToRefresh } from "@/components/ui/pull-to-refresh";
import { SwipeableRow } from "@/components/ui/swipeable-row";
import { MobileBottomSheet } from "@/components/mobile/MobileBottomSheet";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const testTypeIcons: Record<TestType, React.ElementType> = {
  "Continuity": Zap,
  "Insulation Resistance": Zap,
  "Polarity": CheckCircle,
  "Earth Fault Loop Impedance": Zap,
  "RCD": ClipboardCheck,
  "Prospective Fault Current": AlertTriangle,
  "Ring Final Circuit": Zap,
  "Functional Test": ClipboardCheck,
  "Visual Inspection": Eye,
  "Other": FileCheck,
};

const resultColors: Record<TestResult, string> = {
  "Pending": "bg-warning/20 text-warning",
  "Pass": "bg-success/20 text-success",
  "Fail": "bg-destructive/20 text-destructive",
  "N/A": "bg-muted text-muted-foreground",
  "Limited": "bg-orange-500/20 text-orange-400",
};

function TestingWorkflowSkeleton() {
  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex flex-col gap-3">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-12 w-full" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[1, 2, 3, 4].map(i => (
          <Skeleton key={i} className="h-24" />
        ))}
      </div>
      <div className="space-y-3">
        {[1, 2, 3].map(i => (
          <Skeleton key={i} className="h-32" />
        ))}
      </div>
    </div>
  );
}

export function TestingWorkflowSection() {
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState("");
  const [resultFilter, setResultFilter] = useState<TestResult | null>(null);
  const [selectedTest, setSelectedTest] = useState<JobTest | null>(null);
  const [showCreateSheet, setShowCreateSheet] = useState(false);
  const [showRecordSheet, setShowRecordSheet] = useState(false);
  const [recordTestId, setRecordTestId] = useState<string | null>(null);
  const [recordReading, setRecordReading] = useState("");
  const [recordResult, setRecordResult] = useState<TestResult>("Pass");
  const [recordNotes, setRecordNotes] = useState("");
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState<Partial<CreateJobTestInput>>({
    job_id: "",
    test_type: "Continuity",
    circuit_ref: "",
    circuit_description: "",
    result: "Pending",
    photos: [],
  });

  // Data fetching
  const { data: tests = [], isLoading, error, refetch } = useJobTests();
  const { data: stats } = useJobTestStats();
  const { data: jobs = [] } = useJobs();
  const { data: employees = [] } = useEmployees();
  const createJobTest = useCreateJobTest();
  const recordTestResult = useRecordTestResult();
  const verifyJobTest = useVerifyJobTest();
  const deleteJobTest = useDeleteJobTest();

  const handleRefresh = useCallback(async () => {
    await refetch();
    toast({ title: "Tests refreshed" });
  }, [refetch]);

  const handleRecord = (testId: string) => {
    const test = tests.find(t => t.id === testId);
    if (test) {
      setRecordTestId(testId);
      setRecordReading(test.reading || "");
      setRecordResult("Pass");
      setRecordNotes(test.notes || "");
      setShowRecordSheet(true);
    }
  };

  const handleConfirmRecord = async () => {
    if (recordTestId) {
      await recordTestResult.mutateAsync({
        id: recordTestId,
        result: recordResult,
        reading: recordReading,
        notes: recordNotes,
      });
      setShowRecordSheet(false);
      setRecordTestId(null);
      setRecordReading("");
      setRecordNotes("");
    }
  };

  const handleVerify = async (testId: string) => {
    await verifyJobTest.mutateAsync(testId);
  };

  const handleCreate = async () => {
    if (!formData.job_id || !formData.test_type) {
      toast({ title: "Error", description: "Please fill in required fields", variant: "destructive" });
      return;
    }

    try {
      await createJobTest.mutateAsync(formData as CreateJobTestInput);
      setShowCreateSheet(false);
      resetForm();
    } catch (error) {
      // Error handled by hook
    }
  };

  const handleDelete = async () => {
    if (deleteConfirmId) {
      await deleteJobTest.mutateAsync(deleteConfirmId);
      setDeleteConfirmId(null);
    }
  };

  const resetForm = () => {
    setFormData({
      job_id: "",
      test_type: "Continuity",
      circuit_ref: "",
      circuit_description: "",
      result: "Pending",
      photos: [],
    });
  };

  const filteredTests = tests.filter(test => {
    const matchesSearch =
      test.circuit_ref?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.circuit_description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.job?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.test_type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesResult = resultFilter ? test.result === resultFilter : true;
    return matchesSearch && matchesResult;
  });

  // Group tests by job for better organisation
  const testsByJob = filteredTests.reduce((acc, test) => {
    const jobId = test.job_id;
    if (!acc[jobId]) {
      acc[jobId] = {
        job: test.job,
        tests: []
      };
    }
    acc[jobId].tests.push(test);
    return acc;
  }, {} as Record<string, { job: JobTest['job']; tests: JobTest[] }>);

  if (isLoading) {
    return <TestingWorkflowSkeleton />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <AlertCircle className="h-12 w-12 text-destructive mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">Failed to load tests</h3>
        <p className="text-sm text-foreground/70 mb-4">{error.message}</p>
        <Button onClick={() => refetch()}>Try Again</Button>
      </div>
    );
  }

  const content = (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-foreground">Testing & Sign-off</h1>
            <p className="text-sm text-muted-foreground">Electrical test results and verification</p>
          </div>
          <Button onClick={() => setShowCreateSheet(true)} className="touch-feedback">
            <Plus className="h-4 w-4 mr-2" />
            New Test
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            {!searchQuery && (
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            )}
            <Input
              placeholder="Search tests..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={cn("w-full bg-elec-gray h-12", !searchQuery && "pl-9")}
            />
          </div>
          {isMobile && (
            <MobileBottomSheet
              trigger={
                <Button variant="outline" size="icon" className="h-12 w-12 flex-shrink-0 relative">
                  <Filter className="h-5 w-5" />
                  {resultFilter && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-[10px]">1</Badge>
                  )}
                </Button>
              }
              title="Filter by Result"
              options={[
                { value: "Pending", label: "Pending", count: stats?.pending || 0 },
                { value: "Pass", label: "Pass", count: stats?.pass || 0 },
                { value: "Fail", label: "Fail", count: stats?.fail || 0 },
              ]}
              selected={resultFilter ? [resultFilter] : []}
              onSelectionChange={(vals) => setResultFilter(vals[0] as TestResult || null)}
            />
          )}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <Card
          className={cn(
            "bg-elec-gray cursor-pointer transition-all touch-feedback",
            resultFilter === "Pending" && "ring-2 ring-warning"
          )}
          onClick={() => setResultFilter(resultFilter === "Pending" ? null : "Pending")}
        >
          <CardContent className="p-3 md:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xl md:text-2xl font-bold text-warning">{stats?.pending || 0}</p>
                <p className="text-xs md:text-sm text-muted-foreground">Pending</p>
              </div>
              <Clock className="h-6 w-6 md:h-8 md:w-8 text-warning opacity-70" />
            </div>
          </CardContent>
        </Card>
        <Card
          className={cn(
            "bg-elec-gray cursor-pointer transition-all touch-feedback",
            resultFilter === "Pass" && "ring-2 ring-success"
          )}
          onClick={() => setResultFilter(resultFilter === "Pass" ? null : "Pass")}
        >
          <CardContent className="p-3 md:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xl md:text-2xl font-bold text-success">{stats?.pass || 0}</p>
                <p className="text-xs md:text-sm text-muted-foreground">Passed</p>
              </div>
              <CheckCircle className="h-6 w-6 md:h-8 md:w-8 text-success opacity-70" />
            </div>
          </CardContent>
        </Card>
        <Card
          className={cn(
            "bg-elec-gray cursor-pointer transition-all touch-feedback",
            resultFilter === "Fail" && "ring-2 ring-destructive"
          )}
          onClick={() => setResultFilter(resultFilter === "Fail" ? null : "Fail")}
        >
          <CardContent className="p-3 md:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xl md:text-2xl font-bold text-destructive">{stats?.fail || 0}</p>
                <p className="text-xs md:text-sm text-muted-foreground">Failed</p>
              </div>
              <XCircle className="h-6 w-6 md:h-8 md:w-8 text-destructive opacity-70" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-elec-gray touch-feedback">
          <CardContent className="p-3 md:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xl md:text-2xl font-bold text-elec-yellow">{stats?.passRate || 0}%</p>
                <p className="text-xs md:text-sm text-muted-foreground">Pass Rate</p>
              </div>
              <Award className="h-6 w-6 md:h-8 md:w-8 text-elec-yellow opacity-70" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Empty State */}
      {filteredTests.length === 0 && (
        <Card className="bg-elec-gray">
          <CardContent className="p-6 md:p-8 text-center">
            <FileCheck className="h-10 w-10 md:h-12 md:w-12 text-foreground/30 mx-auto mb-4" />
            <h3 className="text-base md:text-lg font-semibold text-foreground">No test results yet</h3>
            <p className="text-sm text-muted-foreground mt-1 mb-4">
              {resultFilter ? `No ${resultFilter.toLowerCase()} tests` : "Start recording electrical test results"}
            </p>
            <Button onClick={() => setShowCreateSheet(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Record First Test
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Tests grouped by job */}
      <div className="space-y-4">
        {Object.entries(testsByJob).map(([jobId, { job, tests: jobTests }]) => (
          <Card key={jobId} className="bg-elec-gray overflow-hidden">
            <CardHeader className="p-3 md:p-4 pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-sm md:text-base">{job?.title || "Unknown Job"}</CardTitle>
                  <p className="text-xs text-muted-foreground">{job?.client}</p>
                </div>
                <div className="flex gap-1">
                  <Badge className="bg-success/20 text-success text-[10px]">
                    {jobTests.filter(t => t.result === "Pass").length} Pass
                  </Badge>
                  {jobTests.filter(t => t.result === "Fail").length > 0 && (
                    <Badge className="bg-destructive/20 text-destructive text-[10px]">
                      {jobTests.filter(t => t.result === "Fail").length} Fail
                    </Badge>
                  )}
                  {jobTests.filter(t => t.result === "Pending").length > 0 && (
                    <Badge className="bg-warning/20 text-warning text-[10px]">
                      {jobTests.filter(t => t.result === "Pending").length} Pending
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-3 md:p-4 pt-0 space-y-2">
              {jobTests.map((test) => {
                const TestIcon = testTypeIcons[test.test_type] || FileCheck;
                const config = TEST_TYPE_CONFIG[test.test_type];

                const testRow = (
                  <div
                    key={test.id}
                    className={cn(
                      "p-3 rounded-lg border cursor-pointer transition-all",
                      test.result === "Fail" && "border-destructive/30 bg-destructive/5",
                      test.result === "Pass" && "border-success/30 bg-success/5",
                      test.result === "Pending" && "border-warning/30 bg-warning/5",
                      (test.result === "N/A" || test.result === "Limited") && "border-border bg-muted/30"
                    )}
                    onClick={() => setSelectedTest(test)}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
                        test.result === "Pass" && "bg-success/20",
                        test.result === "Fail" && "bg-destructive/20",
                        test.result === "Pending" && "bg-warning/20",
                        (test.result === "N/A" || test.result === "Limited") && "bg-muted"
                      )}>
                        <TestIcon className={cn(
                          "h-4 w-4",
                          test.result === "Pass" && "text-success",
                          test.result === "Fail" && "text-destructive",
                          test.result === "Pending" && "text-warning",
                          (test.result === "N/A" || test.result === "Limited") && "text-muted-foreground"
                        )} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-medium text-sm text-foreground">{test.test_type}</span>
                          <Badge className={resultColors[test.result] + " text-[10px]"}>
                            {test.result}
                          </Badge>
                          {test.verified_at && (
                            <Badge variant="outline" className="text-[10px] border-success/30 text-success">
                              Verified
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-3 mt-1 text-[10px] text-muted-foreground flex-wrap">
                          {test.circuit_ref && (
                            <span>Circuit: {test.circuit_ref}</span>
                          )}
                          {test.reading && (
                            <span className="font-medium text-foreground">
                              {test.reading}{config?.unit}
                            </span>
                          )}
                          {test.test_date && (
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {format(new Date(test.test_date), "dd MMM")}
                            </span>
                          )}
                        </div>
                      </div>
                      {test.result === "Pending" && (
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRecord(test.id);
                          }}
                          className="flex-shrink-0 touch-feedback"
                        >
                          Record
                        </Button>
                      )}
                    </div>
                  </div>
                );

                // Wrap with swipeable on mobile for pending tests
                if (isMobile && test.result === "Pending") {
                  return (
                    <SwipeableRow
                      key={test.id}
                      rightAction={{
                        icon: <CheckCircle className="h-6 w-6" />,
                        label: "Pass",
                        onClick: () => recordTestResult.mutate({ id: test.id, result: "Pass" }),
                        variant: "success"
                      }}
                      leftAction={{
                        icon: <XCircle className="h-6 w-6" />,
                        label: "Fail",
                        onClick: () => recordTestResult.mutate({ id: test.id, result: "Fail" }),
                        variant: "destructive"
                      }}
                    >
                      {testRow}
                    </SwipeableRow>
                  );
                }

                return testRow;
              })}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create Test Sheet */}
      <Sheet open={showCreateSheet} onOpenChange={setShowCreateSheet}>
        <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
          <div className="flex flex-col h-full bg-background">
            <SheetHeader className="p-4 border-b border-border">
              <SheetTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-elec-yellow" />
                New Test Record
              </SheetTitle>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Job Selection */}
              <div className="space-y-2">
                <Label>Job *</Label>
                <Select
                  value={formData.job_id}
                  onValueChange={(v) => setFormData(prev => ({ ...prev, job_id: v }))}
                >
                  <SelectTrigger className="h-12 bg-elec-gray">
                    <SelectValue placeholder="Select a job" />
                  </SelectTrigger>
                  <SelectContent className="bg-elec-gray border-elec-gray">
                    {jobs.map(job => (
                      <SelectItem key={job.id} value={job.id}>
                        {job.title} - {job.client}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Test Type */}
              <div className="space-y-2">
                <Label>Test Type *</Label>
                <Select
                  value={formData.test_type}
                  onValueChange={(v) => setFormData(prev => ({ ...prev, test_type: v as TestType }))}
                >
                  <SelectTrigger className="h-12 bg-elec-gray">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-elec-gray border-elec-gray">
                    {Object.keys(TEST_TYPE_CONFIG).map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Circuit Details */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Circuit Ref</Label>
                  <Input
                    value={formData.circuit_ref || ""}
                    onChange={(e) => setFormData(prev => ({ ...prev, circuit_ref: e.target.value }))}
                    placeholder="e.g., C1, DB1-1"
                    className="h-12 bg-elec-gray"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Test Date</Label>
                  <Input
                    type="date"
                    value={formData.test_date || ""}
                    onChange={(e) => setFormData(prev => ({ ...prev, test_date: e.target.value }))}
                    className="h-12 bg-elec-gray"
                  />
                </div>
              </div>

              {/* Circuit Description */}
              <div className="space-y-2">
                <Label>Circuit Description</Label>
                <Input
                  value={formData.circuit_description || ""}
                  onChange={(e) => setFormData(prev => ({ ...prev, circuit_description: e.target.value }))}
                  placeholder="e.g., Kitchen ring, Lighting circuit"
                  className="h-12 bg-elec-gray"
                />
              </div>

              {/* Tester */}
              <div className="space-y-2">
                <Label>Tested By</Label>
                <Select
                  value={formData.tested_by || ""}
                  onValueChange={(v) => setFormData(prev => ({ ...prev, tested_by: v || undefined }))}
                >
                  <SelectTrigger className="h-12 bg-elec-gray">
                    <SelectValue placeholder="Select tester" />
                  </SelectTrigger>
                  <SelectContent className="bg-elec-gray border-elec-gray">
                    {employees.map(emp => (
                      <SelectItem key={emp.id} value={emp.id}>
                        {emp.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Instrument */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Instrument Used</Label>
                  <Input
                    value={formData.instrument_used || ""}
                    onChange={(e) => setFormData(prev => ({ ...prev, instrument_used: e.target.value }))}
                    placeholder="e.g., Megger MFT1741"
                    className="h-12 bg-elec-gray"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Serial Number</Label>
                  <Input
                    value={formData.instrument_serial || ""}
                    onChange={(e) => setFormData(prev => ({ ...prev, instrument_serial: e.target.value }))}
                    placeholder="Serial #"
                    className="h-12 bg-elec-gray"
                  />
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <Label>Notes</Label>
                <Textarea
                  value={formData.notes || ""}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Any additional notes..."
                  className="min-h-[80px] bg-elec-gray"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-border bg-background">
              <Button
                onClick={handleCreate}
                className="w-full h-14 text-base font-semibold"
                disabled={createJobTest.isPending}
              >
                {createJobTest.isPending ? (
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                ) : (
                  <Plus className="h-5 w-5 mr-2" />
                )}
                Create Test Record
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Record Result Sheet */}
      <Sheet open={showRecordSheet} onOpenChange={setShowRecordSheet}>
        <SheetContent side="bottom" className="h-[60vh] p-0 rounded-t-2xl overflow-hidden">
          <div className="flex flex-col h-full bg-background">
            <SheetHeader className="p-4 border-b border-border">
              <SheetTitle className="flex items-center gap-2">
                <ClipboardCheck className="h-5 w-5 text-elec-yellow" />
                Record Test Result
              </SheetTitle>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Result Selection */}
              <div className="space-y-2">
                <Label>Result *</Label>
                <div className="grid grid-cols-2 gap-2">
                  {(["Pass", "Fail", "N/A", "Limited"] as TestResult[]).map(result => (
                    <Button
                      key={result}
                      variant={recordResult === result ? "default" : "outline"}
                      onClick={() => setRecordResult(result)}
                      className={cn(
                        "h-14 text-base font-semibold",
                        recordResult === result && result === "Pass" && "bg-success hover:bg-success/90",
                        recordResult === result && result === "Fail" && "bg-destructive hover:bg-destructive/90",
                        recordResult === result && (result === "N/A" || result === "Limited") && "bg-muted"
                      )}
                    >
                      {result === "Pass" && <CheckCircle className="h-5 w-5 mr-2" />}
                      {result === "Fail" && <XCircle className="h-5 w-5 mr-2" />}
                      {result}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Reading */}
              <div className="space-y-2">
                <Label>Reading</Label>
                <Input
                  value={recordReading}
                  onChange={(e) => setRecordReading(e.target.value)}
                  placeholder="Enter test reading..."
                  className="h-12 bg-elec-gray"
                />
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <Label>Notes</Label>
                <Textarea
                  value={recordNotes}
                  onChange={(e) => setRecordNotes(e.target.value)}
                  placeholder="Any observations..."
                  className="min-h-[80px] bg-elec-gray"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-border bg-background">
              <Button
                onClick={handleConfirmRecord}
                className={cn(
                  "w-full h-14 text-base font-semibold",
                  recordResult === "Pass" && "bg-success hover:bg-success/90",
                  recordResult === "Fail" && "bg-destructive hover:bg-destructive/90"
                )}
                disabled={recordTestResult.isPending}
              >
                {recordTestResult.isPending ? (
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                ) : (
                  <CheckCircle className="h-5 w-5 mr-2" />
                )}
                Record as {recordResult}
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* View Test Details Sheet */}
      <Sheet open={!!selectedTest} onOpenChange={() => setSelectedTest(null)}>
        <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
          {selectedTest && (
            <div className="flex flex-col h-full bg-background">
              <SheetHeader className="p-4 border-b border-border">
                <div className="flex items-center justify-between">
                  <SheetTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-elec-yellow" />
                    Test Details
                  </SheetTitle>
                  <Badge className={resultColors[selectedTest.result]}>
                    {selectedTest.result}
                  </Badge>
                </div>
              </SheetHeader>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* Test Info */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-foreground">{selectedTest.test_type}</h3>
                  {selectedTest.circuit_description && (
                    <p className="text-sm text-foreground/70">{selectedTest.circuit_description}</p>
                  )}
                </div>

                {/* Job Info */}
                <Card className="bg-elec-gray">
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-foreground mb-2">{selectedTest.job?.title}</h4>
                    <p className="text-sm text-foreground/70">{selectedTest.job?.client}</p>
                  </CardContent>
                </Card>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {selectedTest.circuit_ref && (
                    <div className="bg-elec-gray p-3 rounded-lg">
                      <p className="text-xs text-foreground/70 mb-1">Circuit Ref</p>
                      <p className="font-semibold text-foreground">{selectedTest.circuit_ref}</p>
                    </div>
                  )}
                  {selectedTest.reading && (
                    <div className="bg-elec-gray p-3 rounded-lg">
                      <p className="text-xs text-foreground/70 mb-1">Reading</p>
                      <p className="font-semibold text-foreground">
                        {selectedTest.reading}{TEST_TYPE_CONFIG[selectedTest.test_type]?.unit}
                      </p>
                    </div>
                  )}
                  {selectedTest.test_date && (
                    <div className="bg-elec-gray p-3 rounded-lg">
                      <p className="text-xs text-foreground/70 mb-1">Test Date</p>
                      <p className="font-semibold text-foreground">
                        {format(new Date(selectedTest.test_date), "dd MMM yyyy")}
                      </p>
                    </div>
                  )}
                  {selectedTest.tester && (
                    <div className="bg-elec-gray p-3 rounded-lg">
                      <p className="text-xs text-foreground/70 mb-1">Tested By</p>
                      <p className="font-semibold text-foreground">{selectedTest.tester.name}</p>
                    </div>
                  )}
                  {selectedTest.instrument_used && (
                    <div className="bg-elec-gray p-3 rounded-lg">
                      <p className="text-xs text-foreground/70 mb-1">Instrument</p>
                      <p className="font-semibold text-foreground">{selectedTest.instrument_used}</p>
                    </div>
                  )}
                  {selectedTest.instrument_serial && (
                    <div className="bg-elec-gray p-3 rounded-lg">
                      <p className="text-xs text-foreground/70 mb-1">Serial #</p>
                      <p className="font-semibold text-foreground">{selectedTest.instrument_serial}</p>
                    </div>
                  )}
                </div>

                {/* Notes */}
                {selectedTest.notes && (
                  <div className="space-y-2">
                    <h4 className="font-semibold text-foreground">Notes</h4>
                    <p className="text-sm text-foreground/80 bg-elec-gray p-3 rounded-lg">
                      {selectedTest.notes}
                    </p>
                  </div>
                )}

                {/* Verification Status */}
                {selectedTest.verified_at && (
                  <div className="p-3 bg-success/10 rounded-lg border border-success/20">
                    <div className="flex items-center gap-2 text-success">
                      <CheckCircle className="h-4 w-4" />
                      <span className="font-semibold">Verified</span>
                    </div>
                    <p className="text-xs text-foreground/70 mt-1">
                      {format(new Date(selectedTest.verified_at), "dd MMM yyyy 'at' HH:mm")}
                    </p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-border bg-background space-y-2">
                {selectedTest.result === "Pending" && (
                  <Button
                    onClick={() => {
                      setSelectedTest(null);
                      handleRecord(selectedTest.id);
                    }}
                    className="w-full h-14 text-base font-semibold"
                  >
                    <ClipboardCheck className="h-5 w-5 mr-2" />
                    Record Result
                  </Button>
                )}
                {selectedTest.result !== "Pending" && !selectedTest.verified_at && (
                  <Button
                    onClick={() => handleVerify(selectedTest.id)}
                    className="w-full h-14 text-base font-semibold bg-success hover:bg-success/90"
                    disabled={verifyJobTest.isPending}
                  >
                    {verifyJobTest.isPending ? (
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    ) : (
                      <Award className="h-5 w-5 mr-2" />
                    )}
                    Verify Result
                  </Button>
                )}
                <Button
                  variant="outline"
                  onClick={() => {
                    setDeleteConfirmId(selectedTest.id);
                    setSelectedTest(null);
                  }}
                  className="w-full h-12 text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Test
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteConfirmId} onOpenChange={() => setDeleteConfirmId(null)}>
        <AlertDialogContent className="bg-background border-border">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Test Record?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the test record.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteJobTest.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : null}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );

  return isMobile ? (
    <PullToRefresh onRefresh={handleRefresh} className="h-full">
      {content}
    </PullToRefresh>
  ) : content;
}
