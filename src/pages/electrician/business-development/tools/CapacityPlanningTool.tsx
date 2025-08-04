import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileInput } from "@/components/ui/mobile-input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import BackButton from "@/components/common/BackButton";
import { useToast } from "@/hooks/use-toast";
import { Building, Users, Clock, HelpCircle, TrendingUp, AlertCircle, CheckCircle, Download, Lightbulb, Calendar } from "lucide-react";

interface CapacityInputs {
  totalElectricians: number;
  workingHoursPerDay: number;
  workingDaysPerWeek: number;
  weeksPerYear: number;
  adminTimePercentage: number;
  travelTimePercentage: number;
  holidayDays: number;
  sickDays: number;
  trainingDays: number;
  averageJobHours: number;
  emergencyWorkPercentage: number;
  plannedMaintenancePercentage: number;
  growthTargetPercentage: number;
}

const CapacityPlanningTool = () => {
  const { toast } = useToast();
  const [inputs, setInputs] = useState<CapacityInputs>({
    totalElectricians: 1,
    workingHoursPerDay: 8,
    workingDaysPerWeek: 5,
    weeksPerYear: 52,
    adminTimePercentage: 15,
    travelTimePercentage: 20,
    holidayDays: 28,
    sickDays: 5,
    trainingDays: 3,
    averageJobHours: 6,
    emergencyWorkPercentage: 20,
    plannedMaintenancePercentage: 30,
    growthTargetPercentage: 25,
  });

  const [calculated, setCalculated] = useState(false);

  const updateInput = (field: keyof CapacityInputs, value: number) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }));
    setCalculated(false);
  };

  const calculateCapacity = () => {
    setCalculated(true);
    toast({
      title: "Capacity Calculated",
      description: "Your workforce capacity analysis has been updated.",
      variant: "success"
    });
  };

  const resetTool = () => {
    setInputs({
      totalElectricians: 1,
      workingHoursPerDay: 8,
      workingDaysPerWeek: 5,
      weeksPerYear: 52,
      adminTimePercentage: 15,
      travelTimePercentage: 20,
      holidayDays: 28,
      sickDays: 5,
      trainingDays: 3,
      averageJobHours: 6,
      emergencyWorkPercentage: 20,
      plannedMaintenancePercentage: 30,
      growthTargetPercentage: 25,
    });
    setCalculated(false);
    toast({
      title: "Tool Reset",
      description: "All fields have been cleared.",
      variant: "default"
    });
  };

  const loadExample = () => {
    setInputs({
      totalElectricians: 3,
      workingHoursPerDay: 8,
      workingDaysPerWeek: 5,
      weeksPerYear: 50,
      adminTimePercentage: 18,
      travelTimePercentage: 25,
      holidayDays: 28,
      sickDays: 7,
      trainingDays: 5,
      averageJobHours: 4,
      emergencyWorkPercentage: 25,
      plannedMaintenancePercentage: 35,
      growthTargetPercentage: 30,
    });
    setCalculated(false);
  };

  // Calculate capacity metrics
  const calculateMetrics = () => {
    if (!calculated) return {
      totalAvailableHours: 0,
      billableHours: 0,
      nonBillableHours: 0,
      jobsPerYear: 0,
      jobsPerWeek: 0,
      jobsPerDay: 0,
      utilizationRate: 0,
      capacityForGrowth: 0,
      additionalStaffNeeded: 0,
      emergencyCapacity: 0,
      maintenanceCapacity: 0,
      newWorkCapacity: 0
    };

    // Calculate total available hours
    const totalWorkingDays = (inputs.weeksPerYear * inputs.workingDaysPerWeek) - inputs.holidayDays - inputs.sickDays - inputs.trainingDays;
    const totalAvailableHours = inputs.totalElectricians * totalWorkingDays * inputs.workingHoursPerDay;

    // Calculate non-billable time
    const adminHours = totalAvailableHours * (inputs.adminTimePercentage / 100);
    const travelHours = totalAvailableHours * (inputs.travelTimePercentage / 100);
    const nonBillableHours = adminHours + travelHours;

    // Calculate billable hours
    const billableHours = totalAvailableHours - nonBillableHours;

    // Calculate job capacity
    const jobsPerYear = inputs.averageJobHours > 0 ? billableHours / inputs.averageJobHours : 0;
    const jobsPerWeek = jobsPerYear / inputs.weeksPerYear;
    const jobsPerDay = jobsPerWeek / inputs.workingDaysPerWeek;

    // Calculate utilization
    const utilizationRate = totalAvailableHours > 0 ? (billableHours / totalAvailableHours) * 100 : 0;

    // Calculate work type distribution
    const emergencyCapacity = billableHours * (inputs.emergencyWorkPercentage / 100);
    const maintenanceCapacity = billableHours * (inputs.plannedMaintenancePercentage / 100);
    const newWorkCapacity = billableHours - emergencyCapacity - maintenanceCapacity;

    // Calculate growth capacity
    const targetHours = billableHours * (1 + inputs.growthTargetPercentage / 100);
    const capacityGap = targetHours - billableHours;
    const additionalStaffNeeded = capacityGap > 0 ? 
      Math.ceil(capacityGap / ((totalAvailableHours / inputs.totalElectricians) * (utilizationRate / 100))) : 0;

    const capacityForGrowth = billableHours > 0 ? ((targetHours - billableHours) / billableHours) * 100 : 0;

    return {
      totalAvailableHours,
      billableHours,
      nonBillableHours,
      jobsPerYear: Math.round(jobsPerYear),
      jobsPerWeek: Math.round(jobsPerWeek * 10) / 10,
      jobsPerDay: Math.round(jobsPerDay * 10) / 10,
      utilizationRate,
      capacityForGrowth,
      additionalStaffNeeded,
      emergencyCapacity,
      maintenanceCapacity,
      newWorkCapacity
    };
  };

  const metrics = calculateMetrics();

  const getCapacityAssessment = () => {
    if (!calculated) return null;
    
    if (metrics.utilizationRate >= 85) {
      return {
        status: "overutilized",
        icon: <AlertCircle className="h-5 w-5" />,
        title: "High Utilization Risk",
        message: `${metrics.utilizationRate.toFixed(1)}% utilization may lead to burnout and quality issues`,
        color: "text-red-300",
        bgColor: "bg-red-500/20 border-red-500/30"
      };
    } else if (metrics.utilizationRate >= 70) {
      return {
        status: "optimal",
        icon: <CheckCircle className="h-5 w-5" />,
        title: "Optimal Utilization",
        message: `Excellent utilization at ${metrics.utilizationRate.toFixed(1)}% with room for flexibility`,
        color: "text-green-300",
        bgColor: "bg-green-500/20 border-green-500/30"
      };
    } else if (metrics.utilizationRate >= 50) {
      return {
        status: "underutilized",
        icon: <AlertCircle className="h-5 w-5" />,
        title: "Underutilized Capacity",
        message: `${metrics.utilizationRate.toFixed(1)}% utilization suggests opportunity for more work`,
        color: "text-yellow-300",
        bgColor: "bg-yellow-500/20 border-yellow-500/30"
      };
    } else {
      return {
        status: "very_low",
        icon: <AlertCircle className="h-5 w-5" />,
        title: "Very Low Utilization",
        message: `${metrics.utilizationRate.toFixed(1)}% utilization indicates serious capacity issues`,
        color: "text-orange-300",
        bgColor: "bg-orange-500/20 border-orange-500/30"
      };
    }
  };

  const capacityAssessment = getCapacityAssessment();

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col items-center justify-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-4 flex items-center gap-3">
          <Building className="h-8 w-8 text-elec-yellow" />
          Capacity Planning Tool
        </h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-6">
          Plan your workforce capacity and analyse utilization to optimize productivity and growth.
          Essential for BS7671 18th Edition compliant electrical contractors managing project workloads.
        </p>
        <BackButton customUrl="/electrician/business-development/tools" label="Back to Calculators" />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Input Section */}
        <Card className="border-elec-yellow/20 bg-elec-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Users className="h-5 w-5 text-elec-yellow" />
              Workforce & Schedule
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h4 className="text-white font-semibold">Team Structure</h4>
              
              <MobileInput
                label="Total Electricians"
                type="number"
                value={inputs.totalElectricians || ""}
                onChange={(e) => updateInput('totalElectricians', parseFloat(e.target.value) || 0)}
                hint="Number of qualified electricians"
              />

              <MobileInput
                label="Working Hours per Day"
                type="number"
                value={inputs.workingHoursPerDay || ""}
                onChange={(e) => updateInput('workingHoursPerDay', parseFloat(e.target.value) || 0)}
                hint="Standard working hours per day"
              />

              <MobileInput
                label="Working Days per Week"
                type="number"
                value={inputs.workingDaysPerWeek || ""}
                onChange={(e) => updateInput('workingDaysPerWeek', parseFloat(e.target.value) || 0)}
                hint="Operating days per week"
              />

              <MobileInput
                label="Working Weeks per Year"
                type="number"
                value={inputs.weeksPerYear || ""}
                onChange={(e) => updateInput('weeksPerYear', parseFloat(e.target.value) || 0)}
                hint="Total operating weeks annually"
              />
            </div>

            <Separator className="bg-elec-yellow/20" />

            <div className="space-y-4">
              <h4 className="text-white font-semibold">Time Allocation</h4>
              
              <MobileInput
                label="Admin Time"
                type="number"
                value={inputs.adminTimePercentage || ""}
                onChange={(e) => updateInput('adminTimePercentage', parseFloat(e.target.value) || 0)}
                unit="%"
                hint="Paperwork, quotes, admin tasks"
              />

              <MobileInput
                label="Travel Time"
                type="number"
                value={inputs.travelTimePercentage || ""}
                onChange={(e) => updateInput('travelTimePercentage', parseFloat(e.target.value) || 0)}
                unit="%"
                hint="Travel between jobs"
              />
            </div>

            <Separator className="bg-elec-yellow/20" />

            <div className="space-y-4">
              <h4 className="text-white font-semibold">Time Off (Days per Year)</h4>
              
              <MobileInput
                label="Holiday Days"
                type="number"
                value={inputs.holidayDays || ""}
                onChange={(e) => updateInput('holidayDays', parseFloat(e.target.value) || 0)}
                hint="Annual leave and bank holidays"
              />

              <MobileInput
                label="Sick Days"
                type="number"
                value={inputs.sickDays || ""}
                onChange={(e) => updateInput('sickDays', parseFloat(e.target.value) || 0)}
                hint="Average sick leave per person"
              />

              <MobileInput
                label="Training Days"
                type="number"
                value={inputs.trainingDays || ""}
                onChange={(e) => updateInput('trainingDays', parseFloat(e.target.value) || 0)}
                hint="CPD and skills development"
              />
            </div>

            <Separator className="bg-elec-yellow/20" />

            <div className="space-y-4">
              <h4 className="text-white font-semibold">Work Profile</h4>
              
              <MobileInput
                label="Average Job Duration"
                type="number"
                value={inputs.averageJobHours || ""}
                onChange={(e) => updateInput('averageJobHours', parseFloat(e.target.value) || 0)}
                unit="hours"
                hint="Typical job completion time"
              />

              <MobileInput
                label="Emergency Work"
                type="number"
                value={inputs.emergencyWorkPercentage || ""}
                onChange={(e) => updateInput('emergencyWorkPercentage', parseFloat(e.target.value) || 0)}
                unit="%"
                hint="Percentage of urgent/emergency jobs"
              />

              <MobileInput
                label="Planned Maintenance"
                type="number"
                value={inputs.plannedMaintenancePercentage || ""}
                onChange={(e) => updateInput('plannedMaintenancePercentage', parseFloat(e.target.value) || 0)}
                unit="%"
                hint="Scheduled maintenance work"
              />

              <MobileInput
                label="Growth Target"
                type="number"
                value={inputs.growthTargetPercentage || ""}
                onChange={(e) => updateInput('growthTargetPercentage', parseFloat(e.target.value) || 0)}
                unit="%"
                hint="Desired capacity increase"
              />
            </div>

            <div className="flex gap-3">
              <Button 
                onClick={calculateCapacity}
                className="flex-1 bg-elec-yellow text-black hover:bg-elec-yellow/90"
              >
                <Building className="h-4 w-4 mr-2" />
                Calculate
              </Button>
              <Button 
                onClick={loadExample}
                variant="outline"
                className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
              >
                Example
              </Button>
            </div>

            <Button 
              onClick={resetTool}
              variant="outline"
              className="w-full border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
            >
              Reset All
            </Button>
          </CardContent>
        </Card>

        {/* Results Section */}
        <Card className="border-elec-yellow/20 bg-elec-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-elec-yellow" />
              Capacity Analysis
              {calculated && (
                <Badge variant="success" className="ml-auto">
                  Calculated
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {!calculated ? (
              <div className="text-center py-12">
                <Building className="h-16 w-16 text-elec-yellow/50 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Ready to Plan</h3>
                <p className="text-muted-foreground">
                  Enter your workforce details and work patterns, then click "Calculate" to see your capacity analysis.
                </p>
              </div>
            ) : (
              <>
                {/* Key Metrics */}
                <div className="grid md:grid-cols-4 gap-4">
                  <Card className="border-elec-yellow/10 bg-elec-gray">
                    <CardContent className="pt-6 text-center">
                      <h4 className="text-white font-semibold mb-2">Billable Hours</h4>
                      <p className="text-2xl font-bold text-elec-yellow">{metrics.billableHours.toFixed(0)}</p>
                      <p className="text-sm text-muted-foreground mt-2">Per year</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-elec-yellow/10 bg-elec-gray">
                    <CardContent className="pt-6 text-center">
                      <h4 className="text-white font-semibold mb-2">Utilization Rate</h4>
                      <p className={`text-2xl font-bold ${metrics.utilizationRate >= 70 ? 'text-green-400' : metrics.utilizationRate >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>
                        {metrics.utilizationRate.toFixed(1)}%
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">Efficiency</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-elec-yellow/10 bg-elec-gray">
                    <CardContent className="pt-6 text-center">
                      <h4 className="text-white font-semibold mb-2">Jobs per Year</h4>
                      <p className="text-2xl font-bold text-blue-400">{metrics.jobsPerYear}</p>
                      <p className="text-sm text-muted-foreground mt-2">Total capacity</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-elec-yellow/10 bg-elec-gray">
                    <CardContent className="pt-6 text-center">
                      <h4 className="text-white font-semibold mb-2">Jobs per Week</h4>
                      <p className="text-2xl font-bold text-green-400">{metrics.jobsPerWeek}</p>
                      <p className="text-sm text-muted-foreground mt-2">Weekly rate</p>
                    </CardContent>
                  </Card>
                </div>

                <Separator className="bg-elec-yellow/30" />

                {/* Time Breakdown */}
                <div className="space-y-4">
                  <h4 className="text-white font-semibold flex items-center gap-2">
                    <Clock className="h-4 w-4 text-elec-yellow" />
                    Time Allocation Analysis
                  </h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h5 className="text-white font-medium">Annual Hours Breakdown</h5>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Total Available Hours:</span>
                          <span className="text-white">{metrics.totalAvailableHours.toFixed(0)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Billable Hours:</span>
                          <span className="text-green-400">{metrics.billableHours.toFixed(0)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Non-billable Hours:</span>
                          <span className="text-red-400">{metrics.nonBillableHours.toFixed(0)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h5 className="text-white font-medium">Work Type Distribution</h5>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Emergency Work:</span>
                          <span className="text-red-300">{metrics.emergencyCapacity.toFixed(0)} hrs</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Planned Maintenance:</span>
                          <span className="text-blue-300">{metrics.maintenanceCapacity.toFixed(0)} hrs</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">New Projects:</span>
                          <span className="text-green-300">{metrics.newWorkCapacity.toFixed(0)} hrs</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator className="bg-elec-yellow/30" />

                {/* Growth Analysis */}
                <div className="space-y-4">
                  <h4 className="text-white font-semibold flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-elec-yellow" />
                    Growth Capacity Analysis
                  </h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-muted-foreground text-sm">Growth Target</p>
                      <p className="text-2xl font-bold text-elec-yellow">{inputs.growthTargetPercentage}%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-muted-foreground text-sm">Additional Staff Needed</p>
                      <p className={`text-2xl font-bold ${metrics.additionalStaffNeeded === 0 ? 'text-green-400' : 'text-yellow-400'}`}>
                        {metrics.additionalStaffNeeded}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-muted-foreground text-sm">Jobs per Day</p>
                      <p className="text-2xl font-bold text-blue-400">{metrics.jobsPerDay}</p>
                    </div>
                  </div>
                </div>

                {/* Capacity Assessment */}
                {capacityAssessment && (
                  <>
                    <Separator className="bg-elec-yellow/30" />
                    <div className={`p-6 rounded-lg border ${capacityAssessment.bgColor}`}>
                      <div className={`flex items-center gap-3 mb-3 ${capacityAssessment.color}`}>
                        {capacityAssessment.icon}
                        <h3 className="font-semibold text-lg">{capacityAssessment.title}</h3>
                      </div>
                      <p className={`${capacityAssessment.color.replace('300', '200')} mb-4`}>
                        {capacityAssessment.message}
                      </p>
                      
                      <div className="bg-background/10 rounded-lg p-4 mt-4">
                        <div className="flex items-start gap-3">
                          <Lightbulb className="h-5 w-5 text-elec-yellow mt-0.5" />
                          <div>
                            <h4 className="text-white font-medium mb-2">Planning Insight</h4>
                            <p className="text-sm text-muted-foreground">
                              {capacityAssessment.status === "optimal"
                                ? "Your team is operating at an ideal utilization level. You have capacity for emergency work while maintaining quality and work-life balance."
                                : capacityAssessment.status === "overutilized"
                                ? "Consider hiring additional staff or reducing workload to prevent burnout and maintain quality standards. High utilization can lead to mistakes and safety issues."
                                : capacityAssessment.status === "underutilized"
                                ? "There's opportunity to take on more work or improve efficiency. Consider marketing efforts, expanding services, or optimizing scheduling."
                                : "Very low utilization suggests serious capacity management issues. Review pricing, marketing, and operational efficiency."
                              }
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Export Button */}
                <div className="flex justify-end pt-4">
                  <Button 
                    variant="outline"
                    className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
                    onClick={() => {
                      toast({
                        title: "Export Feature",
                        description: "Capacity planning export functionality coming soon!",
                        variant: "default"
                      });
                    }}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export Plan
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Tips */}
      <Card className="border-elec-yellow/20 bg-elec-card mt-8">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-elec-yellow" />
            Capacity Planning Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h4 className="text-elec-yellow font-semibold">Optimal Utilization</h4>
              <p className="text-sm text-muted-foreground">
                Aim for 70-80% utilization. This allows flexibility for emergency work and prevents burnout while maintaining profitability.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="text-elec-yellow font-semibold">Growth Planning</h4>
              <p className="text-sm text-muted-foreground">
                Plan staff increases 3-6 months ahead of demand. Training and certification take time, especially for BS7671 compliance.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="text-elec-yellow font-semibold">Efficiency Factors</h4>
              <p className="text-sm text-muted-foreground">
                Monitor travel time, admin burden, and job complexity. Small improvements in efficiency can significantly increase capacity.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CapacityPlanningTool;