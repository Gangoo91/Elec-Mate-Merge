
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Download, 
  Upload, 
  History, 
  Trash2, 
  Share2, 
  Save, 
  FileText, 
  Database,
  Archive,
  Clock,
  AlertCircle
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface CalculationResult {
  id: string;
  calculatorType: string;
  timestamp: Date;
  inputs: Record<string, any>;
  outputs: Record<string, any>;
  project?: string;
  notes?: string;
}

interface SavedCalculation {
  id: string;
  name: string;
  calculatorType: string;
  inputs: Record<string, any>;
  createdAt: Date;
  lastModified: Date;
  tags: string[];
}

interface CalculatorDataManagerProps {
  currentCalculation?: CalculationResult;
  onLoadCalculation: (calculation: SavedCalculation) => void;
}

const CalculatorDataManager: React.FC<CalculatorDataManagerProps> = ({
  currentCalculation,
  onLoadCalculation
}) => {
  const [calculationHistory, setCalculationHistory] = useState<CalculationResult[]>([]);
  const [savedCalculations, setSavedCalculations] = useState<SavedCalculation[]>([]);
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);
  const [selectedExportFormat, setSelectedExportFormat] = useState<'json' | 'csv' | 'pdf'>('json');

  useEffect(() => {
    loadDataFromStorage();
  }, []);

  const loadDataFromStorage = () => {
    const history = localStorage.getItem('calculator-history');
    const saved = localStorage.getItem('saved-calculations');
    
    if (history) {
      setCalculationHistory(JSON.parse(history).map((item: any) => ({
        ...item,
        timestamp: new Date(item.timestamp)
      })));
    }
    
    if (saved) {
      setSavedCalculations(JSON.parse(saved).map((item: any) => ({
        ...item,
        createdAt: new Date(item.createdAt),
        lastModified: new Date(item.lastModified)
      })));
    }
  };

  const saveToHistory = (calculation: CalculationResult) => {
    const newHistory = [calculation, ...calculationHistory].slice(0, 100); // Keep last 100
    setCalculationHistory(newHistory);
    localStorage.setItem('calculator-history', JSON.stringify(newHistory));
  };

  const saveCalculation = (name: string, tags: string[] = []) => {
    if (!currentCalculation) return;

    const saved: SavedCalculation = {
      id: Date.now().toString(),
      name,
      calculatorType: currentCalculation.calculatorType,
      inputs: currentCalculation.inputs,
      createdAt: new Date(),
      lastModified: new Date(),
      tags
    };

    const newSaved = [saved, ...savedCalculations];
    setSavedCalculations(newSaved);
    localStorage.setItem('saved-calculations', JSON.stringify(newSaved));
    
    toast({
      title: "Calculation Saved",
      description: `"${name}" has been saved to your collection.`
    });
  };

  const deleteFromHistory = (id: string) => {
    const newHistory = calculationHistory.filter(calc => calc.id !== id);
    setCalculationHistory(newHistory);
    localStorage.setItem('calculator-history', JSON.stringify(newHistory));
    
    toast({
      title: "Deleted from History",
      description: "Calculation has been removed from history."
    });
  };

  const deleteSavedCalculation = (id: string) => {
    const newSaved = savedCalculations.filter(calc => calc.id !== id);
    setSavedCalculations(newSaved);
    localStorage.setItem('saved-calculations', JSON.stringify(newSaved));
    
    toast({
      title: "Calculation Deleted",
      description: "Saved calculation has been removed."
    });
  };

  const exportData = (format: 'json' | 'csv' | 'pdf') => {
    const data = {
      history: calculationHistory,
      saved: savedCalculations,
      exportDate: new Date().toISOString()
    };

    let content: string;
    let filename: string;
    let mimeType: string;

    switch (format) {
      case 'json':
        content = JSON.stringify(data, null, 2);
        filename = `calculator-data-${new Date().toISOString().split('T')[0]}.json`;
        mimeType = 'application/json';
        break;
      case 'csv':
        const csvRows = [
          ['Type', 'Date', 'Inputs', 'Outputs', 'Project', 'Notes'],
          ...calculationHistory.map(calc => [
            calc.calculatorType,
            calc.timestamp.toISOString(),
            JSON.stringify(calc.inputs),
            JSON.stringify(calc.outputs),
            calc.project || '',
            calc.notes || ''
          ])
        ];
        content = csvRows.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
        filename = `calculator-data-${new Date().toISOString().split('T')[0]}.csv`;
        mimeType = 'text/csv';
        break;
      case 'pdf':
        // For PDF export, we'd typically use a library like jsPDF
        toast({
          title: "PDF Export",
          description: "PDF export functionality coming soon!"
        });
        return;
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Export Complete",
      description: `Data exported as ${format.toUpperCase()}`
    });
  };

  const importData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        
        if (data.history) {
          setCalculationHistory(data.history.map((item: any) => ({
            ...item,
            timestamp: new Date(item.timestamp)
          })));
          localStorage.setItem('calculator-history', JSON.stringify(data.history));
        }
        
        if (data.saved) {
          setSavedCalculations(data.saved.map((item: any) => ({
            ...item,
            createdAt: new Date(item.createdAt),
            lastModified: new Date(item.lastModified)
          })));
          localStorage.setItem('saved-calculations', JSON.stringify(data.saved));
        }

        toast({
          title: "Import Successful",
          description: "Calculator data has been imported successfully."
        });
      } catch (error) {
        toast({
          title: "Import Failed",
          description: "Failed to import data. Please check the file format.",
          variant: "destructive"
        });
      }
    };
    reader.readAsText(file);
  };

  const clearAllData = () => {
    setCalculationHistory([]);
    setSavedCalculations([]);
    localStorage.removeItem('calculator-history');
    localStorage.removeItem('saved-calculations');
    
    toast({
      title: "Data Cleared",
      description: "All calculator data has been cleared."
    });
  };

  const shareCalculation = (calculation: CalculationResult | SavedCalculation) => {
    const shareData = {
      calculatorType: calculation.calculatorType,
      inputs: 'inputs' in calculation ? calculation.inputs : (calculation as any).inputs,
      timestamp: new Date().toISOString()
    };

    const shareUrl = `${window.location.origin}${window.location.pathname}?shared=${btoa(JSON.stringify(shareData))}`;
    
    navigator.clipboard.writeText(shareUrl).then(() => {
      toast({
        title: "Share Link Copied",
        description: "Calculation share link copied to clipboard."
      });
    });
  };

  return (
    <div className="space-y-6">
      {/* Data Management Header */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Database className="h-5 w-5" />
            Calculator Data Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => currentCalculation && saveCalculation(`Calculation ${Date.now()}`)}
              disabled={!currentCalculation}
              className="flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              Save Current
            </Button>
            
            <Dialog open={isExportDialogOpen} onOpenChange={setIsExportDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Export Data
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-elec-dark border-elec-yellow/30">
                <DialogHeader>
                  <DialogTitle>Export Calculator Data</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-2">
                    {(['json', 'csv', 'pdf'] as const).map(format => (
                      <Button
                        key={format}
                        variant={selectedExportFormat === format ? "default" : "outline"}
                        onClick={() => setSelectedExportFormat(format)}
                        className={selectedExportFormat === format ? "bg-elec-yellow text-black" : ""}
                      >
                        {format.toUpperCase()}
                      </Button>
                    ))}
                  </div>
                  <Button
                    onClick={() => {
                      exportData(selectedExportFormat);
                      setIsExportDialogOpen(false);
                    }}
                    className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90"
                  >
                    Export as {selectedExportFormat.toUpperCase()}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <label className="cursor-pointer">
              <input
                type="file"
                accept=".json"
                onChange={importData}
                className="hidden"
              />
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Import Data
              </Button>
            </label>

            <Button
              variant="outline"
              size="sm"
              onClick={clearAllData}
              className="flex items-center gap-2 text-red-400 border-red-400/30 hover:bg-red-500/10"
            >
              <Trash2 className="h-4 w-4" />
              Clear All
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 pt-4 border-t border-elec-yellow/20">
            <div className="text-center">
              <div className="text-2xl font-bold text-elec-yellow">{calculationHistory.length}</div>
              <div className="text-sm text-muted-foreground">History Items</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-elec-yellow">{savedCalculations.length}</div>
              <div className="text-sm text-muted-foreground">Saved Calculations</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-elec-yellow">
                {new Set(calculationHistory.map(c => c.calculatorType)).size}
              </div>
              <div className="text-sm text-muted-foreground">Calculator Types</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-elec-yellow">
                {calculationHistory.filter(c => 
                  new Date(c.timestamp).toDateString() === new Date().toDateString()
                ).length}
              </div>
              <div className="text-sm text-muted-foreground">Today's Calculations</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent History */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Recent Calculations
          </CardTitle>
        </CardHeader>
        <CardContent>
          {calculationHistory.length === 0 ? (
            <div className="text-center py-8">
              <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No calculation history</h3>
              <p className="text-muted-foreground">
                Your calculation history will appear here as you use calculators.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {calculationHistory.slice(0, 5).map(calc => (
                <div key={calc.id} className="flex items-center justify-between p-3 border border-elec-yellow/20 rounded-lg">
                  <div>
                    <div className="font-medium">{calc.calculatorType}</div>
                    <div className="text-sm text-muted-foreground">
                      {calc.timestamp.toLocaleString()}
                      {calc.project && ` • Project: ${calc.project}`}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => shareCalculation(calc)}
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteFromHistory(calc.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Saved Calculations */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Archive className="h-5 w-5" />
            Saved Calculations
          </CardTitle>
        </CardHeader>
        <CardContent>
          {savedCalculations.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No saved calculations</h3>
              <p className="text-muted-foreground">
                Save frequently used calculations for quick access.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {savedCalculations.map(calc => (
                <div key={calc.id} className="flex items-center justify-between p-3 border border-elec-yellow/20 rounded-lg">
                  <div>
                    <div className="font-medium">{calc.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {calc.calculatorType} • {calc.createdAt.toLocaleDateString()}
                    </div>
                    <div className="flex gap-1 mt-1">
                      {calc.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onLoadCalculation(calc)}
                    >
                      Load
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => shareCalculation(calc)}
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteSavedCalculation(calc.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CalculatorDataManager;
