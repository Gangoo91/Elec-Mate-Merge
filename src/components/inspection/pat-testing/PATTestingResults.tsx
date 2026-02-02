import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  ChevronDown,
  TestTube,
  CheckCircle2,
  XCircle,
  Eye,
  Zap,
  AlertTriangle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Appliance } from '@/types/pat-testing';
import { useIsMobile } from '@/hooks/use-mobile';

interface PATTestingResultsProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
}

const PATTestingResults: React.FC<PATTestingResultsProps> = ({
  formData,
  onUpdate,
}) => {
  const isMobile = useIsMobile();
  const [expandedAppliances, setExpandedAppliances] = useState<{ [key: string]: boolean }>({});

  // Calculate totals whenever appliances change
  useEffect(() => {
    const appliances = formData.appliances || [];
    const totalTested = appliances.length;
    const totalPassed = appliances.filter((a: Appliance) => a.overallResult === 'pass').length;
    const totalFailed = appliances.filter((a: Appliance) => a.overallResult === 'fail').length;

    if (formData.totalAppliancesTested !== totalTested) {
      onUpdate('totalAppliancesTested', totalTested);
    }
    if (formData.totalPassed !== totalPassed) {
      onUpdate('totalPassed', totalPassed);
    }
    if (formData.totalFailed !== totalFailed) {
      onUpdate('totalFailed', totalFailed);
    }

    // Update failed appliances list
    const failedList = appliances
      .filter((a: Appliance) => a.overallResult === 'fail')
      .map((a: Appliance) => ({
        id: a.id,
        assetNumber: a.assetNumber,
        description: a.description,
        failureReason: a.notes || 'See test results',
        actionRequired: 'Replace or repair before use',
      }));

    if (JSON.stringify(formData.failedAppliances) !== JSON.stringify(failedList)) {
      onUpdate('failedAppliances', failedList);
    }
  }, [formData.appliances]);

  const toggleAppliance = (id: string) => {
    setExpandedAppliances((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const updateAppliance = (id: string, updates: Partial<Appliance>) => {
    const appliances = formData.appliances || [];
    const updatedAppliances = appliances.map((app: Appliance) =>
      app.id === id ? { ...app, ...updates } : app
    );
    onUpdate('appliances', updatedAppliances);
  };

  const updateVisualInspection = (id: string, field: string, value: any) => {
    const appliances = formData.appliances || [];
    const appliance = appliances.find((a: Appliance) => a.id === id);
    if (!appliance) return;

    updateAppliance(id, {
      visualInspection: {
        ...appliance.visualInspection,
        [field]: value,
      },
    });
  };

  const updateElectricalTests = (id: string, testType: string, field: string, value: any) => {
    const appliances = formData.appliances || [];
    const appliance = appliances.find((a: Appliance) => a.id === id);
    if (!appliance) return;

    const currentTest = appliance.electricalTests[testType as keyof typeof appliance.electricalTests];

    if (typeof currentTest === 'object' && currentTest !== null) {
      updateAppliance(id, {
        electricalTests: {
          ...appliance.electricalTests,
          [testType]: {
            ...currentTest,
            [field]: value,
          },
        },
      });
    } else {
      updateAppliance(id, {
        electricalTests: {
          ...appliance.electricalTests,
          [testType]: value,
        },
      });
    }
  };

  const setAllPass = (id: string) => {
    const appliances = formData.appliances || [];
    const appliance = appliances.find((a: Appliance) => a.id === id);
    if (!appliance) return;

    updateAppliance(id, {
      visualInspection: {
        ...appliance.visualInspection,
        flexCondition: 'pass',
        plugCondition: 'pass',
        enclosureCondition: 'pass',
        switchesControls: 'pass',
        suitableForEnvironment: 'pass',
      },
      electricalTests: {
        ...appliance.electricalTests,
        earthContinuity: { ...appliance.electricalTests.earthContinuity, result: appliance.applianceClass === 'II' ? 'na' : 'pass' },
        insulationResistance: { ...appliance.electricalTests.insulationResistance, result: 'pass' },
        polarity: 'pass',
        functionalCheck: 'pass',
      },
      overallResult: 'pass',
    });
  };

  const appliances = formData.appliances || [];

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <div className={cn(isMobile ? "" : "eicr-section-card")}>
        <div className={cn(
          "p-4",
          isMobile ? "bg-card/30 border-y border-border/20" : ""
        )}>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
              <TestTube className="h-5 w-5 text-blue-500" />
            </div>
            <span className="font-semibold text-lg">Test Summary</span>
          </div>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-3xl font-bold">{formData.totalAppliancesTested || 0}</p>
              <p className="text-sm text-muted-foreground">Total Tested</p>
            </div>
            <div className="bg-green-500/10 rounded-lg p-4">
              <p className="text-3xl font-bold text-green-500">{formData.totalPassed || 0}</p>
              <p className="text-sm text-muted-foreground">Passed</p>
            </div>
            <div className="bg-red-500/10 rounded-lg p-4">
              <p className="text-3xl font-bold text-red-500">{formData.totalFailed || 0}</p>
              <p className="text-sm text-muted-foreground">Failed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Individual Test Results */}
      <div className={cn(isMobile ? "" : "eicr-section-card")}>
        <div className={cn(
          "p-4",
          isMobile ? "border-b border-border/20" : ""
        )}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                <Zap className="h-5 w-5 text-amber-500" />
              </div>
              <span className="font-semibold text-lg">Individual Test Results</span>
            </div>
            <span className="text-sm font-normal text-muted-foreground">
              {appliances.filter((a: Appliance) => a.overallResult).length} / {appliances.length} complete
            </span>
          </div>
        </div>
        <div className="p-4 space-y-3">
          {appliances.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <TestTube className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No appliances to test.</p>
              <p className="text-sm">Add appliances in the previous section first.</p>
            </div>
          ) : (
            appliances.map((appliance: Appliance, index: number) => (
              <Collapsible
                key={appliance.id}
                open={expandedAppliances[appliance.id]}
                onOpenChange={() => toggleAppliance(appliance.id)}
              >
                <div className={cn(
                  "rounded-lg transition-colors",
                  isMobile ? "bg-card/20 border border-border/20" : "bg-muted/30",
                  appliance.overallResult === 'pass' && "border-green-500/30",
                  appliance.overallResult === 'fail' && "border-red-500/30"
                )}>
                  <CollapsibleTrigger asChild>
                    <div className="cursor-pointer hover:bg-muted/50 p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium">#{index + 1}</span>
                          <div>
                            <p className="font-medium text-sm">
                              {appliance.assetNumber || 'No Asset No.'} - {appliance.description || 'No Description'}
                            </p>
                            <p className="text-xs text-muted-foreground">{appliance.location || 'No location'}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {appliance.overallResult === 'pass' && (
                            <Badge className="bg-green-500/20 text-green-500 border-green-500/30">
                              <CheckCircle2 className="h-3 w-3 mr-1" /> Pass
                            </Badge>
                          )}
                          {appliance.overallResult === 'fail' && (
                            <Badge className="bg-red-500/20 text-red-500 border-red-500/30">
                              <XCircle className="h-3 w-3 mr-1" /> Fail
                            </Badge>
                          )}
                          <ChevronDown className={cn(
                            "h-4 w-4 transition-transform",
                            expandedAppliances[appliance.id] && "rotate-180"
                          )} />
                        </div>
                      </div>
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="px-3 pb-3 space-y-4">
                      {/* Quick Actions */}
                      <div className="flex gap-2 pb-2 border-b border-border">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setAllPass(appliance.id)}
                          className="text-green-500 hover:bg-green-500/10 touch-manipulation"
                        >
                          <CheckCircle2 className="h-4 w-4 mr-1" />
                          Set All Pass
                        </Button>
                      </div>

                      {/* Visual Inspection */}
                      <div>
                        <h5 className="font-medium text-sm mb-2 flex items-center gap-2">
                          <Eye className="h-4 w-4" />
                          Visual Inspection
                        </h5>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {[
                            { key: 'flexCondition', label: 'Flex Condition' },
                            { key: 'plugCondition', label: 'Plug Condition' },
                            { key: 'enclosureCondition', label: 'Enclosure' },
                            { key: 'switchesControls', label: 'Switches/Controls' },
                            { key: 'suitableForEnvironment', label: 'Environment OK' },
                          ].map(({ key, label }) => (
                            <div key={key}>
                              <Label className="text-xs">{label}</Label>
                              <Select
                                value={appliance.visualInspection?.[key as keyof typeof appliance.visualInspection] || ''}
                                onValueChange={(v) => updateVisualInspection(appliance.id, key, v)}
                              >
                                <SelectTrigger className="h-9 touch-manipulation text-xs bg-elec-gray border-white/30">
                                  <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent className="z-[100] bg-background border-border">
                                  <SelectItem value="pass">Pass</SelectItem>
                                  <SelectItem value="fail">Fail</SelectItem>
                                  <SelectItem value="na">N/A</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          ))}
                          <div>
                            <Label className="text-xs">Fuse Rating</Label>
                            <Input
                              placeholder="e.g., 13A"
                              value={appliance.visualInspection?.fuseRating || ''}
                              onChange={(e) => updateVisualInspection(appliance.id, 'fuseRating', e.target.value)}
                              className="h-9 text-xs touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Electrical Tests */}
                      <div>
                        <h5 className="font-medium text-sm mb-2 flex items-center gap-2">
                          <Zap className="h-4 w-4" />
                          Electrical Tests
                        </h5>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {/* Earth Continuity */}
                          <div>
                            <Label className="text-xs">Earth (Ohms)</Label>
                            <div className="flex gap-1">
                              <Input
                                placeholder="0.05"
                                value={appliance.electricalTests?.earthContinuity?.reading || ''}
                                onChange={(e) => updateElectricalTests(appliance.id, 'earthContinuity', 'reading', e.target.value)}
                                className="h-9 text-xs touch-manipulation w-16 border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                                disabled={appliance.applianceClass === 'II'}
                              />
                              <Select
                                value={appliance.electricalTests?.earthContinuity?.result || ''}
                                onValueChange={(v) => updateElectricalTests(appliance.id, 'earthContinuity', 'result', v)}
                              >
                                <SelectTrigger className="h-9 touch-manipulation text-xs flex-1 bg-elec-gray border-white/30">
                                  <SelectValue placeholder="Result" />
                                </SelectTrigger>
                                <SelectContent className="z-[100] bg-background border-border">
                                  <SelectItem value="pass">Pass</SelectItem>
                                  <SelectItem value="fail">Fail</SelectItem>
                                  <SelectItem value="na">N/A</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          {/* Insulation Resistance */}
                          <div>
                            <Label className="text-xs">Insulation (MOhms)</Label>
                            <div className="flex gap-1">
                              <Input
                                placeholder=">999"
                                value={appliance.electricalTests?.insulationResistance?.reading || ''}
                                onChange={(e) => updateElectricalTests(appliance.id, 'insulationResistance', 'reading', e.target.value)}
                                className="h-9 text-xs touch-manipulation w-16 border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                              />
                              <Select
                                value={appliance.electricalTests?.insulationResistance?.result || ''}
                                onValueChange={(v) => updateElectricalTests(appliance.id, 'insulationResistance', 'result', v)}
                              >
                                <SelectTrigger className="h-9 touch-manipulation text-xs flex-1 bg-elec-gray border-white/30">
                                  <SelectValue placeholder="Result" />
                                </SelectTrigger>
                                <SelectContent className="z-[100] bg-background border-border">
                                  <SelectItem value="pass">Pass</SelectItem>
                                  <SelectItem value="fail">Fail</SelectItem>
                                  <SelectItem value="na">N/A</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          {/* Polarity */}
                          <div>
                            <Label className="text-xs">Polarity</Label>
                            <Select
                              value={(appliance.electricalTests?.polarity as string) || ''}
                              onValueChange={(v) => updateAppliance(appliance.id, {
                                electricalTests: { ...appliance.electricalTests, polarity: v as any }
                              })}
                            >
                              <SelectTrigger className="h-9 touch-manipulation text-xs bg-elec-gray border-white/30">
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent className="z-[100] bg-background border-border">
                                <SelectItem value="pass">Pass</SelectItem>
                                <SelectItem value="fail">Fail</SelectItem>
                                <SelectItem value="na">N/A</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          {/* Functional Check */}
                          <div>
                            <Label className="text-xs">Functional</Label>
                            <Select
                              value={(appliance.electricalTests?.functionalCheck as string) || ''}
                              onValueChange={(v) => updateAppliance(appliance.id, {
                                electricalTests: { ...appliance.electricalTests, functionalCheck: v as any }
                              })}
                            >
                              <SelectTrigger className="h-9 touch-manipulation text-xs bg-elec-gray border-white/30">
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent className="z-[100] bg-background border-border">
                                <SelectItem value="pass">Pass</SelectItem>
                                <SelectItem value="fail">Fail</SelectItem>
                                <SelectItem value="na">N/A</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>

                      {/* Overall Result & Notes */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-border">
                        <div>
                          <Label className="text-sm">Overall Result *</Label>
                          <Select
                            value={appliance.overallResult || ''}
                            onValueChange={(v) => updateAppliance(appliance.id, { overallResult: v as any })}
                          >
                            <SelectTrigger className="h-10 touch-manipulation bg-elec-gray border-white/30">
                              <SelectValue placeholder="Select result" />
                            </SelectTrigger>
                            <SelectContent className="z-[100] bg-background border-border">
                              <SelectItem value="pass">
                                <span className="flex items-center gap-2 text-green-500">
                                  <CheckCircle2 className="h-4 w-4" /> Pass
                                </span>
                              </SelectItem>
                              <SelectItem value="fail">
                                <span className="flex items-center gap-2 text-red-500">
                                  <XCircle className="h-4 w-4" /> Fail
                                </span>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-sm">Next Test Due</Label>
                          <Input
                            type="date"
                            value={appliance.nextTestDue || ''}
                            onChange={(e) => updateAppliance(appliance.id, { nextTestDue: e.target.value })}
                            className="h-10 text-sm touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <Label className="text-sm">Notes</Label>
                          <Textarea
                            placeholder="Any notes or observations..."
                            value={appliance.notes || ''}
                            onChange={(e) => updateAppliance(appliance.id, { notes: e.target.value })}
                            className="text-sm touch-manipulation min-h-[60px] border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                          />
                        </div>
                      </div>
                    </div>
                  </CollapsibleContent>
                </div>
              </Collapsible>
            ))
          )}
        </div>
      </div>

      {/* Failed Appliances Warning */}
      {(formData.failedAppliances || []).length > 0 && (
        <div className={cn(
          "rounded-lg border-red-500/30 bg-red-500/5 p-4",
          isMobile ? "" : "eicr-section-card"
        )}>
          <div className="flex items-center gap-3 mb-3">
            <div className="h-10 w-10 rounded-xl bg-red-500/20 flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-red-500" />
            </div>
            <span className="font-semibold text-lg text-red-500">Failed Appliances - Action Required</span>
          </div>
          <div className="space-y-2">
            {(formData.failedAppliances || []).map((failed: any) => (
              <div key={failed.id} className="bg-red-500/10 rounded-lg p-3">
                <p className="font-medium text-red-200">
                  {failed.assetNumber} - {failed.description}
                </p>
                <p className="text-sm text-red-300/70">{failed.actionRequired}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PATTestingResults;
