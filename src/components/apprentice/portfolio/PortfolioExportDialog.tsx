
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

  const handleExport = async () => {
    setIsExporting(true);
    
    // Mock export functionality - in a real app, this would generate actual files
    try {
      // Simulate export delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const formatName = exportOptions.format.toUpperCase();
      const entryCount = exportOptions.categories.length === 0 
        ? entries.length 
        : entries.filter(entry => exportOptions.categories.includes(entry.category.id)).length;
      
      // Mock download
      const mockFilename = `portfolio-export-${new Date().toISOString().split('T')[0]}.${exportOptions.format}`;
      
      toast({
        title: "Export Successful",
        description: `Your portfolio has been exported as ${formatName} with ${entryCount} entries. Download will begin shortly.`,
      });
      
      // In a real implementation, you'd trigger an actual download here
      console.log('Mock export:', {
        filename: mockFilename,
        options: exportOptions,
        entryCount
      });
      
      setOpen(false);
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "There was an error exporting your portfolio. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsExporting(false);
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
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export Portfolio
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

          {/* Export Button */}
          <Button 
            onClick={handleExport} 
            className="w-full gap-2" 
            disabled={isExporting || entries.length === 0}
          >
            {isExporting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                Exporting...
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
