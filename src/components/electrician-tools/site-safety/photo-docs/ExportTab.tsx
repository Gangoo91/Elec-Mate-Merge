import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { FileText, Download, ChevronRight, Loader2, Check } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSafetyPhotos, PHOTO_CATEGORIES, getCategoryLabel } from "@/hooks/useSafetyPhotos";
import { toast } from "@/hooks/use-toast";
import jsPDF from "jspdf";
import { format } from "date-fns";
import JSZip from "jszip";

type ExportType = "pdf" | "zip" | "email";

export default function ExportTab() {
  const [selectedExport, setSelectedExport] = useState<ExportType | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);

  // Export options
  const [selectedProject, setSelectedProject] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [includeMetadata, setIncludeMetadata] = useState(true);

  const { photos, projects, stats } = useSafetyPhotos();

  // Get filtered photos based on selection
  const getFilteredPhotos = useCallback(() => {
    let filtered = [...photos];

    if (selectedProject !== "all") {
      filtered = filtered.filter((p) => p.project_reference === selectedProject);
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    return filtered;
  }, [photos, selectedProject, selectedCategory]);

  // Generate PDF report
  const generatePDF = useCallback(async () => {
    const filteredPhotos = getFilteredPhotos();

    if (filteredPhotos.length === 0) {
      toast({
        title: "No photos to export",
        description: "Please select photos to include in the report",
        variant: "destructive",
      });
      return;
    }

    setIsExporting(true);
    setExportProgress(0);

    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 15;
      const usableWidth = pageWidth - margin * 2;

      // Header
      doc.setFillColor(251, 191, 36); // Yellow
      doc.rect(0, 0, pageWidth, 35, "F");

      doc.setTextColor(0, 0, 0);
      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      doc.text("Photo Documentation Report", margin, 22);

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      const dateStr = format(new Date(), "d MMMM yyyy, HH:mm");
      doc.text(dateStr, pageWidth - margin - doc.getTextWidth(dateStr), 22);

      // Summary section
      let yPos = 45;
      doc.setTextColor(100, 100, 100);
      doc.setFontSize(9);

      const projectName = selectedProject === "all" ? "All Projects" : selectedProject;
      const categoryName = selectedCategory === "all" ? "All Categories" : getCategoryLabel(selectedCategory);

      doc.text(`Project: ${projectName}`, margin, yPos);
      doc.text(`Category: ${categoryName}`, margin, yPos + 5);
      doc.text(`Total Photos: ${filteredPhotos.length}`, margin, yPos + 10);

      yPos = 65;

      // Photo grid layout - 2 photos per row
      const photoWidth = (usableWidth - 10) / 2;
      const photoHeight = photoWidth * 0.75;
      let col = 0;

      for (let i = 0; i < filteredPhotos.length; i++) {
        const photo = filteredPhotos[i];
        setExportProgress(Math.round(((i + 1) / filteredPhotos.length) * 100));

        // Check if we need a new page
        const requiredHeight = photoHeight + (includeMetadata ? 35 : 15);
        if (yPos + requiredHeight > pageHeight - margin) {
          doc.addPage();
          yPos = margin;
          col = 0;
        }

        const xPos = margin + col * (photoWidth + 10);

        try {
          // Fetch and embed image
          const response = await fetch(photo.file_url);
          const blob = await response.blob();
          const base64 = await new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.readAsDataURL(blob);
          });

          doc.addImage(base64, "JPEG", xPos, yPos, photoWidth, photoHeight);
        } catch (err) {
          // Draw placeholder if image fails to load
          doc.setFillColor(240, 240, 240);
          doc.rect(xPos, yPos, photoWidth, photoHeight, "F");
          doc.setTextColor(150, 150, 150);
          doc.setFontSize(8);
          doc.text("Image unavailable", xPos + photoWidth / 2 - 15, yPos + photoHeight / 2);
        }

        // Add metadata below image
        if (includeMetadata) {
          doc.setTextColor(60, 60, 60);
          doc.setFontSize(8);
          doc.setFont("helvetica", "bold");
          doc.text(getCategoryLabel(photo.category), xPos, yPos + photoHeight + 6);

          doc.setFont("helvetica", "normal");
          doc.setFontSize(7);
          doc.setTextColor(100, 100, 100);

          // Truncate description
          const maxDescLength = 50;
          const desc = photo.description.length > maxDescLength
            ? photo.description.substring(0, maxDescLength) + "..."
            : photo.description;
          doc.text(desc, xPos, yPos + photoHeight + 12, { maxWidth: photoWidth });

          if (photo.location) {
            doc.text(`Location: ${photo.location}`, xPos, yPos + photoHeight + 22, { maxWidth: photoWidth });
          }

          doc.text(format(new Date(photo.created_at), "d MMM yyyy, HH:mm"), xPos, yPos + photoHeight + 28);
        }

        // Move to next position
        col++;
        if (col >= 2) {
          col = 0;
          yPos += requiredHeight + 5;
        }
      }

      // Add footer to all pages
      const totalPages = doc.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text(`Page ${i} of ${totalPages}`, pageWidth / 2, pageHeight - 10, { align: "center" });
        doc.text("Generated by Elec-Mate", margin, pageHeight - 10);
      }

      // Save PDF
      const filename = `photo-report-${format(new Date(), "yyyy-MM-dd-HHmm")}.pdf`;
      doc.save(filename);

      toast({
        title: "Report generated",
        description: `${filename} has been downloaded`,
      });
    } catch (err) {
      console.error("PDF generation error:", err);
      toast({
        title: "Export failed",
        description: "Failed to generate PDF report",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
      setExportProgress(0);
      setSelectedExport(null);
    }
  }, [getFilteredPhotos, includeMetadata, selectedProject, selectedCategory]);

  // Generate ZIP archive
  const generateZIP = useCallback(async () => {
    const filteredPhotos = getFilteredPhotos();

    if (filteredPhotos.length === 0) {
      toast({
        title: "No photos to export",
        description: "Please select photos to include in the archive",
        variant: "destructive",
      });
      return;
    }

    setIsExporting(true);
    setExportProgress(0);

    try {
      const zip = new JSZip();

      // Group photos by category
      const byCategory = new Map<string, typeof filteredPhotos>();
      filteredPhotos.forEach((photo) => {
        const cat = photo.category;
        if (!byCategory.has(cat)) {
          byCategory.set(cat, []);
        }
        byCategory.get(cat)!.push(photo);
      });

      let processed = 0;

      // Add photos to ZIP, organised by category
      for (const [category, photos] of byCategory) {
        const folderName = getCategoryLabel(category);
        const folder = zip.folder(folderName);

        for (let i = 0; i < photos.length; i++) {
          const photo = photos[i];
          processed++;
          setExportProgress(Math.round((processed / filteredPhotos.length) * 100));

          try {
            const response = await fetch(photo.file_url);
            const blob = await response.blob();

            const filename = `${format(new Date(photo.created_at), "yyyy-MM-dd_HHmm")}_${i + 1}.jpg`;
            folder?.file(filename, blob);

            // Add metadata file
            if (includeMetadata) {
              const metadata = {
                description: photo.description,
                category: getCategoryLabel(photo.category),
                location: photo.location,
                project: photo.project_reference,
                tags: photo.tags,
                createdAt: photo.created_at,
                gps: photo.gps_latitude && photo.gps_longitude
                  ? { lat: photo.gps_latitude, lng: photo.gps_longitude }
                  : null,
              };
              folder?.file(`${filename.replace(".jpg", "_metadata.json")}`, JSON.stringify(metadata, null, 2));
            }
          } catch (err) {
            console.error(`Failed to add photo ${photo.id}:`, err);
          }
        }
      }

      // Generate ZIP file
      const content = await zip.generateAsync({ type: "blob" });
      const filename = `safety-photos-${format(new Date(), "yyyy-MM-dd")}.zip`;

      // Download
      const url = URL.createObjectURL(content);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "Export complete",
        description: `${filename} has been downloaded`,
      });
    } catch (err) {
      console.error("ZIP generation error:", err);
      toast({
        title: "Export failed",
        description: "Failed to create archive",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
      setExportProgress(0);
      setSelectedExport(null);
    }
  }, [getFilteredPhotos, includeMetadata]);

  // Export options
  const exportOptions = [
    {
      type: "pdf" as ExportType,
      title: "PDF Report",
      description: "Professional report with photos and details",
      icon: FileText,
      color: "text-red-400",
      bgColor: "bg-red-500/10",
    },
    {
      type: "zip" as ExportType,
      title: "ZIP Archive",
      description: "Download all photos as a ZIP file",
      icon: Download,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
    },
  ];

  const filteredCount = getFilteredPhotos().length;

  // Empty state
  if (photos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-black px-4">
        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-3">
          <Download className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-base font-semibold text-white mb-1">No photos to export</h3>
        <p className="text-xs text-white text-center max-w-[200px]">
          Take photos first to export as PDF or ZIP
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-black momentum-scroll-y scrollbar-hide">
      {/* Stats summary - compact */}
      <div className="grid grid-cols-3 gap-[1px] bg-white/5">
        <div className="bg-black p-3 text-center">
          <div className="text-xl font-bold text-elec-yellow">{stats.total}</div>
          <div className="text-[10px] text-white">Photos</div>
        </div>
        <div className="bg-black p-3 text-center">
          <div className="text-xl font-bold text-elec-yellow">{projects.length}</div>
          <div className="text-[10px] text-white">Projects</div>
        </div>
        <div className="bg-black p-3 text-center">
          <div className="text-xl font-bold text-elec-yellow">{Object.keys(stats.byCategory).length}</div>
          <div className="text-[10px] text-white">Categories</div>
        </div>
      </div>

      {/* Filter options - compact */}
      <div className="px-3 py-3 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-white uppercase tracking-wide">Filters</span>
          <span className="text-xs text-elec-yellow">{filteredCount} photos</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Select value={selectedProject} onValueChange={setSelectedProject}>
            <SelectTrigger className="h-10 text-sm bg-white/5 border-0 touch-manipulation">
              <SelectValue placeholder="Project" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              {projects.map((p) => (
                <SelectItem key={p.name} value={p.name}>
                  {p.name} ({p.count})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="h-10 text-sm bg-white/5 border-0 touch-manipulation">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {PHOTO_CATEGORIES.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.icon} {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <button
          onClick={() => setIncludeMetadata(!includeMetadata)}
          className="w-full flex items-center gap-2.5 px-3 py-2.5 bg-white/5 rounded-lg touch-manipulation active:bg-white/10"
        >
          <div className={`w-4 h-4 rounded border flex items-center justify-center ${includeMetadata ? 'bg-elec-yellow border-elec-yellow' : 'border-white/30'}`}>
            {includeMetadata && <Check className="h-3 w-3 text-black" />}
          </div>
          <span className="text-sm text-white">Include metadata</span>
        </button>
      </div>

      {/* Export options - compact list */}
      <div className="px-3 pt-2">
        <span className="text-xs font-medium text-white uppercase tracking-wide">Export As</span>
      </div>
      <div className="divide-y divide-white/5">
        {exportOptions.map((option, index) => (
          <motion.button
            key={option.type}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => setSelectedExport(option.type)}
            disabled={isExporting || filteredCount === 0}
            className="w-full flex items-center gap-3 px-3 py-3 active:bg-white/5 transition-colors touch-manipulation disabled:opacity-40"
          >
            <div className={`w-10 h-10 rounded-lg ${option.bgColor} flex items-center justify-center flex-shrink-0`}>
              <option.icon className={`h-5 w-5 ${option.color}`} />
            </div>
            <div className="flex-1 min-w-0 text-left">
              <p className="text-sm font-medium text-white">{option.title}</p>
              <p className="text-[10px] text-white">{option.description}</p>
            </div>
            <ChevronRight className="h-4 w-4 text-white flex-shrink-0" />
          </motion.button>
        ))}
      </div>

      {/* Export confirmation sheet - compact */}
      <Sheet open={selectedExport !== null} onOpenChange={() => setSelectedExport(null)}>
        <SheetContent side="bottom" className="h-auto rounded-t-2xl p-0">
          <div className="p-3 border-b border-white/5">
            <div className="w-8 h-1 bg-white/20 rounded-full mx-auto mb-3" />
            <h3 className="text-sm font-semibold text-white text-center">
              {selectedExport === "pdf" ? "Generate PDF Report" : "Download ZIP Archive"}
            </h3>
          </div>

          <div className="p-3 space-y-3">
            {/* Summary - compact grid */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-white/5 rounded-lg p-2.5">
                <span className="text-white">Photos</span>
                <span className="float-right font-medium text-white">{filteredCount}</span>
              </div>
              <div className="bg-white/5 rounded-lg p-2.5">
                <span className="text-white">Metadata</span>
                <span className="float-right font-medium text-white">{includeMetadata ? "Yes" : "No"}</span>
              </div>
            </div>

            {/* Progress */}
            {isExporting && (
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-white">Generating...</span>
                  <span className="text-elec-yellow font-medium">{exportProgress}%</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-elec-yellow"
                    initial={{ width: 0 }}
                    animate={{ width: `${exportProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-2 pt-1">
              <button
                onClick={() => setSelectedExport(null)}
                disabled={isExporting}
                className="flex-1 h-11 rounded-xl bg-white/10 text-sm font-medium text-white touch-manipulation active:bg-white/15 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={selectedExport === "pdf" ? generatePDF : generateZIP}
                disabled={isExporting || filteredCount === 0}
                className="flex-[2] h-11 rounded-xl bg-elec-yellow text-sm font-semibold text-black flex items-center justify-center gap-2 touch-manipulation active:bg-yellow-400 disabled:opacity-50"
              >
                {isExporting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Exporting...</span>
                  </>
                ) : (
                  <>
                    {selectedExport === "pdf" ? <FileText className="h-4 w-4" /> : <Download className="h-4 w-4" />}
                    <span>Export</span>
                  </>
                )}
              </button>
            </div>
          </div>
          <div className="h-[env(safe-area-inset-bottom)]" />
        </SheetContent>
      </Sheet>
    </div>
  );
}
