
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Download, FileText, File, Globe } from "lucide-react";
import { PortfolioEntry, ExportOptions } from "@/types/portfolio";
import { useToast } from "@/hooks/use-toast";
import { PortfolioExportService, ExportProgress } from "@/services/portfolioExportService";

interface PortfolioExportDialogProps {
  entries: PortfolioEntry[];
}

const PortfolioExportDialog = ({ entries }: PortfolioExportDialogProps) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [exportOptions, setExportOptions] = useState<ExportOptions>({
    format: 'pdf',
    includeEvidence: true,
    includeReflections: true,
    categories: [],
  });
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState<ExportProgress | null>(null);

  const handleExport = async () => {
    setIsExporting(true);
    setExportProgress(null);
    
    try {
      const exportService = new PortfolioExportService((progress) => {
        setExportProgress(progress);
      });

      if (exportOptions.format === 'pdf') {
        await exportService.exportToPDF(entries, exportOptions);
      } else if (exportOptions.format === 'html') {
        await exportService.exportToHTML(entries, exportOptions);
      } else if (exportOptions.format === 'word') {
        // For now, show a message that Word export is coming soon
        toast({
          title: "Word Export Coming Soon",
          description: "Word document export is currently being developed. Please use PDF or HTML export for now.",
          variant: "default"
        });
        return;
      }

      const formatName = exportOptions.format.toUpperCase();
      const entryCount = exportOptions.categories.length === 0 
        ? entries.length 
        : entries.filter(entry => exportOptions.categories.includes(entry.category.id)).length;
      
      toast({
        title: "Export Successful",
        description: `Your portfolio has been exported as ${formatName} with ${entryCount} entries.`,
      });
      
      setOpen(false);
    } catch (error) {
      console.error('Export error:', error);
      toast({
        title: "Export Failed",
        description: "There was an error exporting your portfolio. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsExporting(false);
      setExportProgress(null);
    }
  };

  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'pdf': return <FileText className="h-4 w-4" />;
      case 'word': return <File className="h-4 w-4" />;
      case 'html': return <Globe className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const categoryOptions = [...new Set(entries.map(entry => entry.category))];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-1.5 border-elec-yellow/50 text-elec-yellow hover:bg-elec-yellow/10 text-sm" size="sm">
          <Download className="h-3.5 w-3.5" />
          Export
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Export Portfolio</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Export Format */}
          <div>
            <Label className="text-base font-medium">Export Format</Label>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {(['pdf', 'word', 'html'] as const).map(format => (
                <Button
                  key={format}
                  variant={exportOptions.format === format ? "default" : "outline"}
                  onClick={() => setExportOptions(prev => ({ ...prev, format }))}
                  className="gap-2"
                  size="sm"
                >
                  {getFormatIcon(format)}
                  {format.toUpperCase()}
                </Button>
              ))}
            </div>
          </div>

          {/* Content Options */}
          <div>
            <Label className="text-base font-medium">Include Content</Label>
            <div className="space-y-3 mt-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="include-evidence"
                  checked={exportOptions.includeEvidence}
                  onCheckedChange={(checked) => 
                    setExportOptions(prev => ({ ...prev, includeEvidence: checked as boolean }))
                  }
                />
                <Label htmlFor="include-evidence" className="text-sm">
                  Evidence files and attachments
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="include-reflections"
                  checked={exportOptions.includeReflections}
                  onCheckedChange={(checked) => 
                    setExportOptions(prev => ({ ...prev, includeReflections: checked as boolean }))
                  }
                />
                <Label htmlFor="include-reflections" className="text-sm">
                  Personal reflections and notes
                </Label>
              </div>
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <Label className="text-base font-medium">Categories to Export</Label>
            <div className="mt-2">
              <Select
                value={exportOptions.categories.length === 0 ? "all" : "selected"}
                onValueChange={(value) => {
                  if (value === "all") {
                    setExportOptions(prev => ({ ...prev, categories: [] }));
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories ({entries.length} entries)</SelectItem>
                  <SelectItem value="selected">Selected Categories</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {exportOptions.categories.length > 0 && (
              <div className="mt-3 space-y-2">
                {categoryOptions.map(category => (
                  <div key={category.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${category.id}`}
                      checked={exportOptions.categories.includes(category.id)}
                      onCheckedChange={(checked) => {
                        setExportOptions(prev => ({
                          ...prev,
                          categories: checked
                            ? [...prev.categories, category.id]
                            : prev.categories.filter(id => id !== category.id)
                        }));
                      }}
                    />
                    <Label htmlFor={`category-${category.id}`} className="text-sm">
                      {category.name} ({entries.filter(e => e.category.id === category.id).length} entries)
                    </Label>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Date Range */}
          <div>
            <Label className="text-base font-medium">Date Range (Optional)</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div>
                <Label htmlFor="date-from" className="text-xs text-muted-foreground">From</Label>
                <Input
                  id="date-from"
                  type="date"
                  value={exportOptions.dateRange?.from || ""}
                  onChange={(e) => setExportOptions(prev => ({
                    ...prev,
                    dateRange: { ...prev.dateRange, from: e.target.value, to: prev.dateRange?.to || "" }
                  }))}
                />
              </div>
              <div>
                <Label htmlFor="date-to" className="text-xs text-muted-foreground">To</Label>
                <Input
                  id="date-to"
                  type="date"
                  value={exportOptions.dateRange?.to || ""}
                  onChange={(e) => setExportOptions(prev => ({
                    ...prev,
                    dateRange: { ...prev.dateRange, from: prev.dateRange?.from || "", to: e.target.value }
                  }))}
                />
              </div>
            </div>
          </div>

          {/* Progress Display */}
          {exportProgress && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{exportProgress.step}</span>
                <span>{exportProgress.progress}/{exportProgress.total}</span>
              </div>
              <div className="w-full bg-elec-gray rounded-full h-2">
                <div 
                  className="bg-elec-yellow h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(exportProgress.progress / exportProgress.total) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Export Button */}
          <Button 
            onClick={handleExport} 
            className="w-full gap-2" 
            disabled={isExporting || entries.length === 0}
          >
            {isExporting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                {exportProgress ? exportProgress.step : 'Exporting...'}
              </>
            ) : (
              <>
                <Download className="h-4 w-4" />
                Export Portfolio
              </>
            )}
          </Button>
          
          {entries.length === 0 && (
            <p className="text-xs text-muted-foreground text-center">
              No portfolio entries available to export.
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PortfolioExportDialog;
