
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Cable, Sigma, History, BookOpen, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

// Enhanced components
import { useEnhancedCableSizing } from "@/components/apprentice/calculators/cable-sizing/useEnhancedCableSizing";
import EnhancedCableSizingForm from "@/components/apprentice/calculators/cable-sizing/EnhancedCableSizingForm";
import EnhancedCableSizingResult from "@/components/apprentice/calculators/cable-sizing/EnhancedCableSizingResult";

// Legacy components
import { useCableSizing } from "@/components/apprentice/calculators/cable-sizing/useCableSizing";
import CableSizingForm from "@/components/apprentice/calculators/cable-sizing/CableSizingInputs";
import CableSizingResult from "@/components/apprentice/calculators/cable-sizing/CableSizingResult";
import CableSizingInfo from "@/components/apprentice/calculators/cable-sizing/CableSizingInfo";

const CableSizingCalculator = () => {
  const { toast } = useToast();
  const [calculatorMode, setCalculatorMode] = useState<'enhanced' | 'classic'>('enhanced');
  
  // Enhanced calculator
  const {
    inputs: enhancedInputs,
    result: enhancedResult,
    history,
    currentProject,
    updateInput: updateEnhancedInput,
    applyTemplate,
    calculateEnhancedCableSize,
    resetCalculator: resetEnhanced,
    saveToHistory,
    loadFromHistory,
    setCurrentProject,
    availableTemplates
  } = useEnhancedCableSizing();

  // Legacy calculator
  const {
    inputs: legacyInputs,
    result: legacyResult,
    updateInput: updateLegacyInput,
    setInstallationType,
    setCableType,
    calculateCableSize: calculateLegacy,
    resetCalculator: resetLegacy,
  } = useCableSizing();

  const handleEnhancedCalculate = () => {
    calculateEnhancedCableSize();
    
    if (!enhancedInputs.current || !enhancedInputs.length) {
      toast({
        title: "Input Required",
        description: "Please fill in all required fields to calculate cable size.",
        variant: "destructive",
      });
      return;
    }

    if (enhancedResult.recommendedCable && Object.keys(enhancedResult.errors).length === 0) {
      toast({
        title: "Cable Size Calculated",
        description: `Recommended ${enhancedResult.recommendedCable.cable.size} cable`,
        variant: "default",
      });
    }
  };

  const handleLegacyCalculate = () => {
    calculateLegacy();
    
    if (!legacyInputs.current || !legacyInputs.length) {
      toast({
        title: "Input Required",
        description: "Please fill in all required fields to calculate cable size.",
        variant: "destructive",
      });
    }
  };

  const handleSaveToHistory = () => {
    const projectName = currentProject || `Calculation ${new Date().toLocaleDateString()}`;
    saveToHistory(projectName, "Enhanced cable sizing calculation");
    toast({
      title: "Saved to History",
      description: "Calculation has been saved to your history.",
    });
  };

  const handleExportReport = () => {
    // TODO: Implement PDF export functionality
    toast({
      title: "Export Feature",
      description: "Report export feature coming soon!",
    });
  };

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in pb-8 px-2 sm:px-4 lg:px-0">
      {/* Header - Mobile Optimized */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Enhanced Cable Sizing Calculator</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            Advanced cable sizing with industry templates, compliance checking, and comprehensive analysis.
          </p>
        </div>
        
        {/* Controls - Mobile Stack */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <div className="flex gap-2 flex-1">
            <Button
              variant={calculatorMode === 'enhanced' ? 'default' : 'outline'}
              onClick={() => setCalculatorMode('enhanced')}
              className={`flex-1 text-sm ${calculatorMode === 'enhanced' ? 'bg-elec-yellow text-black' : ''}`}
              size="sm"
            >
              <Zap className="h-4 w-4 mr-1 sm:mr-2" />
              Enhanced
            </Button>
            <Button
              variant={calculatorMode === 'classic' ? 'default' : 'outline'}
              onClick={() => setCalculatorMode('classic')}
              className={`flex-1 text-sm ${calculatorMode === 'classic' ? 'bg-elec-yellow text-black' : ''}`}
              size="sm"
            >
              <Cable className="h-4 w-4 mr-1 sm:mr-2" />
              Classic
            </Button>
          </div>
          
          <Link to="/electrician-tools/calculations" className="sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto text-sm" size="sm">
              <ArrowLeft className="h-4 w-4 mr-1 sm:mr-2" /> Back to Calculations
            </Button>
          </Link>
        </div>
      </div>

      {/* Enhanced Calculator Mode */}
      {calculatorMode === 'enhanced' && (
        <div className="space-y-4 sm:space-y-6">
          {/* Feature Highlights - Mobile Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <Card className="border-elec-yellow/20 bg-elec-gray/30">
              <CardContent className="p-3 sm:p-4 text-center">
                <BookOpen className="h-6 w-6 sm:h-8 sm:w-8 text-elec-yellow mx-auto mb-2" />
                <div className="font-medium text-sm sm:text-base">Industry Templates</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Pre-configured settings for different sectors</div>
              </CardContent>
            </Card>
            <Card className="border-elec-yellow/20 bg-elec-gray/30">
              <CardContent className="p-3 sm:p-4 text-center">
                <Sigma className="h-6 w-6 sm:h-8 sm:w-8 text-elec-yellow mx-auto mb-2" />
                <div className="font-medium text-sm sm:text-base">Advanced Calculations</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Environmental factors & future expansion</div>
              </CardContent>
            </Card>
            <Card className="border-elec-yellow/20 bg-elec-gray/30">
              <CardContent className="p-3 sm:p-4 text-center">
                <History className="h-6 w-6 sm:h-8 sm:w-8 text-elec-yellow mx-auto mb-2" />
                <div className="font-medium text-sm sm:text-base">Project Management</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Save calculations & generate reports</div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="calculator" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="calculator" className="text-xs sm:text-sm">Calculator</TabsTrigger>
              <TabsTrigger value="history" className="text-xs sm:text-sm">History ({history.length})</TabsTrigger>
              <TabsTrigger value="templates" className="text-xs sm:text-sm">Templates ({availableTemplates.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="calculator">
              <Card className="border-elec-yellow/20 bg-elec-gray">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Cable className="h-4 w-5 sm:h-5 sm:w-5 text-elec-yellow" />
                    <CardTitle className="text-base sm:text-xl">Enhanced Cable Sizing Assistant</CardTitle>
                  </div>
                  <CardDescription className="text-sm">
                    Professional cable sizing with industry-specific templates and comprehensive analysis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Mobile: Stack vertically, Desktop: Side by side */}
                  <div className="grid grid-cols-1 xl:grid-cols-5 gap-4 sm:gap-6">
                    <div className="xl:col-span-2">
                      <EnhancedCableSizingForm
                        inputs={enhancedInputs}
                        errors={enhancedResult.errors}
                        updateInput={updateEnhancedInput}
                        applyTemplate={applyTemplate}
                        calculateCableSize={handleEnhancedCalculate}
                        resetCalculator={resetEnhanced}
                        currentProject={currentProject}
                        setCurrentProject={setCurrentProject}
                      />
                    </div>
                    
                    <div className="xl:col-span-3">
                      <div className="rounded-md bg-elec-dark p-3 sm:p-6 h-full min-h-[400px] xl:min-h-[600px]">
                        <EnhancedCableSizingResult
                          result={enhancedResult}
                          onSaveToHistory={handleSaveToHistory}
                          onExportReport={handleExportReport}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history">
              <Card className="border-elec-yellow/20 bg-elec-gray">
                <CardHeader>
                  <CardTitle className="text-base sm:text-xl">Calculation History</CardTitle>
                  <CardDescription className="text-sm">
                    View and reload previous calculations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {history.length === 0 ? (
                    <div className="text-center py-6 sm:py-8">
                      <History className="h-8 w-8 sm:h-12 sm:w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-base sm:text-lg font-medium mb-2">No calculations saved</h3>
                      <p className="text-sm text-muted-foreground">
                        Complete a calculation and save it to view it here.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {history.slice(0, 10).map((entry) => (
                        <Card key={entry.id} className="border-elec-yellow/20">
                          <CardContent className="p-3 sm:p-4">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
                              <div className="min-w-0 flex-1">
                                <h4 className="font-medium text-sm sm:text-base truncate">{entry.projectName}</h4>
                                <p className="text-xs sm:text-sm text-muted-foreground">
                                  {entry.timestamp.toLocaleDateString()} • 
                                  {entry.result.recommendedCable?.cable.size || 'No result'}
                                </p>
                              </div>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => loadFromHistory(entry.id)}
                                className="w-full sm:w-auto text-xs sm:text-sm"
                              >
                                Load
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="templates">
              <Card className="border-elec-yellow/20 bg-elec-gray">
                <CardHeader>
                  <CardTitle className="text-base sm:text-xl">Industry Templates</CardTitle>
                  <CardDescription className="text-sm">
                    Pre-configured settings for different industry sectors
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
                    {availableTemplates.map((template) => (
                      <Card key={template.id} className="border-elec-yellow/20">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base sm:text-lg">{template.name}</CardTitle>
                          <CardDescription className="text-sm">{template.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div>
                              <span className="text-xs sm:text-sm font-medium">Applications:</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {template.typicalApplications.slice(0, 3).map((app, index) => (
                                  <span key={index} className="text-xs bg-elec-yellow/20 px-2 py-1 rounded">
                                    {app}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <Button
                              size="sm"
                              onClick={() => applyTemplate(template.id)}
                              className="w-full mt-3 text-xs sm:text-sm"
                              variant={enhancedInputs.template === template.id ? "default" : "outline"}
                            >
                              {enhancedInputs.template === template.id ? "Applied" : "Apply Template"}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}

      {/* Classic Calculator Mode - Mobile Optimized */}
      {calculatorMode === 'classic' && (
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Cable className="h-4 w-5 sm:h-5 sm:w-5 text-elec-yellow" />
              <CardTitle className="text-base sm:text-xl">Classic Cable Sizing Assistant</CardTitle>
            </div>
            <CardDescription className="text-sm">
              Simple and efficient cable sizing calculations
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Mobile: Stack vertically, Desktop: Side by side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <CableSizingForm
                inputs={legacyInputs}
                errors={legacyResult.errors}
                updateInput={updateLegacyInput}
                setInstallationType={setInstallationType}
                setCableType={setCableType}
                calculateCableSize={handleLegacyCalculate}
                resetCalculator={resetLegacy}
              />
              
              <div className="flex flex-col space-y-4">
                <div className="rounded-md bg-elec-dark p-3 sm:p-6 flex-grow flex flex-col min-h-[300px]">
                  <CableSizingResult
                    recommendedCable={legacyResult.recommendedCable}
                    alternativeCables={legacyResult.alternativeCables}
                    errors={legacyResult.errors}
                    inputs={legacyInputs}
                  />
                </div>
                
                <CableSizingInfo />
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CableSizingCalculator;
