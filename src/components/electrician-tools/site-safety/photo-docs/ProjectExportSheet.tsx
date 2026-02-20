import { useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Loader2, Check, X } from 'lucide-react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { PhotoProject, PHOTO_TYPES, getPhotoTypeLabel } from '@/hooks/usePhotoProjects';
import { SafetyPhoto, getCategoryLabel } from '@/hooks/useSafetyPhotos';
import { toast } from '@/hooks/use-toast';
import jsPDF from 'jspdf';
import { format } from 'date-fns';
import JSZip from 'jszip';

interface Annotation {
  x: number;
  y: number;
  text: string;
}

function parseAnnotations(annotations: Record<string, unknown>[] | null): Annotation[] {
  if (!Array.isArray(annotations)) return [];
  return annotations.filter(
    (a): a is Annotation =>
      typeof a === 'object' && a !== null && 'x' in a && 'y' in a && 'text' in a
  ) as Annotation[];
}

/** Draw numbered annotation pins on a base64 image and return annotated base64 + legend */
async function renderAnnotationsOntoImage(
  base64: string,
  annotations: Annotation[]
): Promise<{ annotatedBase64: string; legend: { num: number; text: string }[] }> {
  if (annotations.length === 0) {
    return { annotatedBase64: base64, legend: [] };
  }

  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve({ annotatedBase64: base64, legend: [] });
        return;
      }

      ctx.drawImage(img, 0, 0);

      const legend: { num: number; text: string }[] = [];
      const pinRadius = Math.max(14, Math.min(img.width, img.height) * 0.02);

      annotations.forEach((ann, i) => {
        const num = i + 1;
        const cx = ann.x * img.width;
        const cy = ann.y * img.height;

        // Yellow circle with dark border
        ctx.beginPath();
        ctx.arc(cx, cy, pinRadius, 0, 2 * Math.PI);
        ctx.fillStyle = '#fbbf24';
        ctx.fill();
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Number text
        ctx.fillStyle = '#000000';
        ctx.font = `bold ${Math.round(pinRadius * 1.1)}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(String(num), cx, cy);

        legend.push({ num, text: ann.text });
      });

      resolve({
        annotatedBase64: canvas.toDataURL('image/jpeg', 0.9),
        legend,
      });
    };
    img.onerror = () => resolve({ annotatedBase64: base64, legend: [] });
    img.src = base64;
  });
}

interface ProjectExportSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: PhotoProject;
  photos: SafetyPhoto[];
}

type ExportType = 'pdf' | 'zip';

export default function ProjectExportSheet({
  open,
  onOpenChange,
  project,
  photos,
}: ProjectExportSheetProps) {
  const [selectedExport, setSelectedExport] = useState<ExportType | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [includeMetadata, setIncludeMetadata] = useState(true);

  // Get unique photo types from available photos
  const availableTypes = useMemo(() => {
    const types = new Set<string>();
    photos.forEach((p) => types.add(p.photo_type || p.category || 'general'));
    return Array.from(types);
  }, [photos]);

  // Filter photos by selected category
  const filteredPhotos = useMemo(() => {
    if (selectedCategory === 'all') return photos;
    return photos.filter((p) => (p.photo_type || p.category || 'general') === selectedCategory);
  }, [photos, selectedCategory]);

  // Generate PDF report
  const generatePDF = useCallback(async () => {
    if (filteredPhotos.length === 0) {
      toast({
        title: 'No photos to export',
        description: 'Select a category with photos',
        variant: 'destructive',
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
      doc.setFillColor(251, 191, 36);
      doc.rect(0, 0, pageWidth, 35, 'F');

      doc.setTextColor(0, 0, 0);
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bold');
      doc.text('Photo Documentation Report', margin, 22);

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      const dateStr = format(new Date(), 'd MMMM yyyy, HH:mm');
      doc.text(dateStr, pageWidth - margin - doc.getTextWidth(dateStr), 22);

      // Project info
      let yPos = 45;
      doc.setTextColor(60, 60, 60);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text(project.name, margin, yPos);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(100, 100, 100);
      yPos += 6;

      if (project.job_reference) {
        doc.text(`Ref: ${project.job_reference}`, margin, yPos);
        yPos += 5;
      }
      if (project.customer_name) {
        doc.text(`Customer: ${project.customer_name}`, margin, yPos);
        yPos += 5;
      }
      if (project.address) {
        doc.text(`Address: ${project.address}`, margin, yPos);
        yPos += 5;
      }
      doc.text(`Total Photos: ${filteredPhotos.length}`, margin, yPos);
      yPos += 10;

      // Photo grid - 2 per row
      const photoWidth = (usableWidth - 10) / 2;
      const photoHeight = photoWidth * 0.75;
      let col = 0;

      for (let i = 0; i < filteredPhotos.length; i++) {
        const photo = filteredPhotos[i];
        setExportProgress(Math.round(((i + 1) / filteredPhotos.length) * 100));

        const requiredHeight = photoHeight + (includeMetadata ? 35 : 15);
        if (yPos + requiredHeight > pageHeight - margin) {
          doc.addPage();
          yPos = margin;
          col = 0;
        }

        const xPos = margin + col * (photoWidth + 10);

        let annotationLegend: { num: number; text: string }[] = [];
        try {
          const response = await fetch(photo.file_url);
          const blob = await response.blob();
          let base64 = await new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.readAsDataURL(blob);
          });

          // Render annotation pins onto the image
          const annotations = parseAnnotations(photo.annotations);
          if (annotations.length > 0) {
            const result = await renderAnnotationsOntoImage(base64, annotations);
            base64 = result.annotatedBase64;
            annotationLegend = result.legend;
          }

          doc.addImage(base64, 'JPEG', xPos, yPos, photoWidth, photoHeight);
        } catch {
          doc.setFillColor(240, 240, 240);
          doc.rect(xPos, yPos, photoWidth, photoHeight, 'F');
          doc.setTextColor(150, 150, 150);
          doc.setFontSize(8);
          doc.text('Image unavailable', xPos + photoWidth / 2 - 15, yPos + photoHeight / 2);
        }

        if (includeMetadata) {
          let metaY = yPos + photoHeight + 6;

          doc.setTextColor(60, 60, 60);
          doc.setFontSize(8);
          doc.setFont('helvetica', 'bold');
          const typeLabel = getPhotoTypeLabel(photo.photo_type || photo.category || 'general');
          doc.text(typeLabel, xPos, metaY);
          metaY += 6;

          doc.setFont('helvetica', 'normal');
          doc.setFontSize(7);
          doc.setTextColor(100, 100, 100);

          const maxDescLength = 50;
          const desc =
            photo.description.length > maxDescLength
              ? photo.description.substring(0, maxDescLength) + '...'
              : photo.description;
          doc.text(desc, xPos, metaY, { maxWidth: photoWidth });
          metaY += 6;

          if (photo.location) {
            doc.text(`Location: ${photo.location}`, xPos, metaY, {
              maxWidth: photoWidth,
            });
            metaY += 6;
          }

          doc.text(format(new Date(photo.created_at), 'd MMM yyyy, HH:mm'), xPos, metaY);
          metaY += 6;

          // Annotation legend
          if (annotationLegend.length > 0) {
            doc.setFontSize(6.5);
            doc.setTextColor(80, 80, 80);
            annotationLegend.forEach((item) => {
              const legendText = `${item.num}. ${item.text}`;
              doc.text(legendText, xPos, metaY, { maxWidth: photoWidth });
              metaY += 4;
            });
          }
        }

        col++;
        if (col >= 2) {
          col = 0;
          yPos += requiredHeight + 5;
        }
      }

      // Footer
      const totalPages = doc.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text(`Page ${i} of ${totalPages}`, pageWidth / 2, pageHeight - 10, {
          align: 'center',
        });
        doc.text('Generated by Elec-Mate', margin, pageHeight - 10);
      }

      const filename = `${project.name.replace(/\s+/g, '-').toLowerCase()}-${format(new Date(), 'yyyy-MM-dd')}.pdf`;
      doc.save(filename);

      toast({
        title: 'Report generated',
        description: `${filename} downloaded`,
      });
    } catch (err) {
      console.error('PDF generation error:', err);
      toast({
        title: 'Export failed',
        description: 'Failed to generate PDF report',
        variant: 'destructive',
      });
    } finally {
      setIsExporting(false);
      setExportProgress(0);
      setSelectedExport(null);
    }
  }, [filteredPhotos, includeMetadata, project]);

  // Generate ZIP archive
  const generateZIP = useCallback(async () => {
    if (filteredPhotos.length === 0) {
      toast({
        title: 'No photos to export',
        description: 'Select a category with photos',
        variant: 'destructive',
      });
      return;
    }

    setIsExporting(true);
    setExportProgress(0);

    try {
      const zip = new JSZip();
      const byType = new Map<string, typeof filteredPhotos>();

      filteredPhotos.forEach((photo) => {
        const type = photo.photo_type || photo.category || 'general';
        if (!byType.has(type)) byType.set(type, []);
        byType.get(type)!.push(photo);
      });

      let processed = 0;

      for (const [type, typePhotos] of byType) {
        const folderName = getPhotoTypeLabel(type) || getCategoryLabel(type) || type;
        const folder = zip.folder(folderName);

        for (let i = 0; i < typePhotos.length; i++) {
          const photo = typePhotos[i];
          processed++;
          setExportProgress(Math.round((processed / filteredPhotos.length) * 100));

          try {
            const response = await fetch(photo.file_url);
            const blob = await response.blob();
            const filename = `${format(new Date(photo.created_at), 'yyyy-MM-dd_HHmm')}_${i + 1}.jpg`;
            folder?.file(filename, blob);

            if (includeMetadata) {
              const metadata = {
                description: photo.description,
                type: getPhotoTypeLabel(photo.photo_type || photo.category || 'general'),
                location: photo.location,
                project: project.name,
                tags: photo.tags,
                createdAt: photo.created_at,
                gps:
                  photo.gps_latitude && photo.gps_longitude
                    ? { lat: photo.gps_latitude, lng: photo.gps_longitude }
                    : null,
              };
              folder?.file(
                `${filename.replace('.jpg', '_metadata.json')}`,
                JSON.stringify(metadata, null, 2)
              );
            }
          } catch (err) {
            console.error(`Failed to add photo ${photo.id}:`, err);
          }
        }
      }

      const content = await zip.generateAsync({ type: 'blob' });
      const filename = `${project.name.replace(/\s+/g, '-').toLowerCase()}-${format(new Date(), 'yyyy-MM-dd')}.zip`;

      const url = URL.createObjectURL(content);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: 'Export complete',
        description: `${filename} downloaded`,
      });
    } catch (err) {
      console.error('ZIP generation error:', err);
      toast({
        title: 'Export failed',
        description: 'Failed to create archive',
        variant: 'destructive',
      });
    } finally {
      setIsExporting(false);
      setExportProgress(0);
      setSelectedExport(null);
    }
  }, [filteredPhotos, includeMetadata, project]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-auto max-h-[85vh] rounded-t-2xl p-0 overflow-hidden bg-background border-white/10"
      >
        <div className="flex flex-col">
          {/* Handle */}
          <div className="pt-3 px-4">
            <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mb-3" />
          </div>

          {/* Header */}
          <div className="px-4 pb-3 border-b border-white/[0.06]">
            <h3 className="text-base font-semibold text-white">Export: {project.name}</h3>
            <p className="text-xs text-white mt-0.5">
              {filteredPhotos.length} photo
              {filteredPhotos.length !== 1 ? 's' : ''} selected
            </p>
          </div>

          {/* Category filter chips */}
          <div className="px-4 py-3 border-b border-white/[0.06]">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`flex-shrink-0 h-8 px-3 rounded-full text-xs font-medium transition-colors touch-manipulation ${
                  selectedCategory === 'all'
                    ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-white'
                    : 'bg-white/5 border border-white/10 text-white active:bg-white/10'
                }`}
              >
                All ({photos.length})
              </button>
              {availableTypes.map((type) => {
                const typeInfo = PHOTO_TYPES.find((t) => t.value === type);
                const count = photos.filter(
                  (p) => (p.photo_type || p.category || 'general') === type
                ).length;
                return (
                  <button
                    key={type}
                    onClick={() => setSelectedCategory(type)}
                    className={`flex-shrink-0 flex items-center gap-1.5 h-8 px-3 rounded-full text-xs font-medium transition-colors touch-manipulation ${
                      selectedCategory === type
                        ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-white'
                        : 'bg-white/5 border border-white/10 text-white active:bg-white/10'
                    }`}
                  >
                    {typeInfo && <span className={`w-2 h-2 rounded-full ${typeInfo.dotColour}`} />}
                    {typeInfo?.label || type} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Include metadata toggle */}
          <div className="px-4 py-3 border-b border-white/[0.06]">
            <button
              onClick={() => setIncludeMetadata(!includeMetadata)}
              className="w-full flex items-center gap-3 h-11 touch-manipulation"
            >
              <div
                className={`w-11 h-6 rounded-full p-0.5 transition-colors ${
                  includeMetadata ? 'bg-elec-yellow' : 'bg-white/20'
                }`}
              >
                <motion.div
                  className="w-5 h-5 rounded-full bg-white shadow-sm"
                  animate={{ x: includeMetadata ? 20 : 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              </div>
              <span className="text-sm text-white">Include metadata (location, date, notes)</span>
            </button>
          </div>

          {/* Export buttons */}
          <div className="px-4 py-4 space-y-3">
            {/* PDF Report */}
            <button
              onClick={() => {
                setSelectedExport('pdf');
                generatePDF();
              }}
              disabled={isExporting || filteredPhotos.length === 0}
              className="w-full h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center gap-3 touch-manipulation active:bg-red-500/20 disabled:opacity-40 transition-colors"
            >
              {isExporting && selectedExport === 'pdf' ? (
                <Loader2 className="h-5 w-5 animate-spin text-red-400" />
              ) : (
                <FileText className="h-5 w-5 text-red-400" />
              )}
              <span className="text-sm font-medium text-white">PDF Report</span>
            </button>

            {/* ZIP Archive */}
            <button
              onClick={() => {
                setSelectedExport('zip');
                generateZIP();
              }}
              disabled={isExporting || filteredPhotos.length === 0}
              className="w-full h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center gap-3 touch-manipulation active:bg-blue-500/20 disabled:opacity-40 transition-colors"
            >
              {isExporting && selectedExport === 'zip' ? (
                <Loader2 className="h-5 w-5 animate-spin text-blue-400" />
              ) : (
                <Download className="h-5 w-5 text-blue-400" />
              )}
              <span className="text-sm font-medium text-white">ZIP Archive</span>
            </button>

            {/* Progress bar */}
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
          </div>

          {/* Safe area */}
          <div className="h-[env(safe-area-inset-bottom)]" />
        </div>
      </SheetContent>
    </Sheet>
  );
}
