import React, { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Download,
  Link2,
  Copy,
  Share2,
  FileText,
  Clock,
  Eye,
  CheckCircle2,
  GraduationCap,
  Briefcase,
  Wrench,
  User,
  Trash2,
  ExternalLink,
  Plus,
  Loader2,
} from "lucide-react";
import { useNotifications } from "@/components/notifications/NotificationProvider";
import { QRCodeSVG } from "qrcode.react";
import jsPDF from "jspdf";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";

interface ShareLink {
  id: string;
  url: string;
  expiresAt: string | null;
  sections: string[];
  createdAt: string;
  viewCount: number;
}

const ElecIdShare = () => {
  const { addNotification } = useNotifications();
  const [isCreateLinkOpen, setIsCreateLinkOpen] = useState(false);
  const [selectedExpiry, setSelectedExpiry] = useState("7d");
  const [selectedSections, setSelectedSections] = useState<string[]>([
    "basics",
    "qualifications",
    "experience",
  ]);
  const [isDownloadingQr, setIsDownloadingQr] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [isCreatingLink, setIsCreatingLink] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<{ open: boolean; id: string | null }>({
    open: false,
    id: null,
  });
  const [isDeletingLink, setIsDeletingLink] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);

  const elecIdNumber = "EM-ABC123";
  const shareUrl = `https://elec-mate.com/verify/${elecIdNumber}`;

  // Mock user data - will come from database
  const userData = {
    name: "John Smith",
    jobTitle: "Approved Electrician",
    ecsCard: "ECS Gold Card",
    ecsExpiry: "Dec 2026",
  };

  // Mock share links - will be from database
  const shareLinks: ShareLink[] = [
    {
      id: "1",
      url: "https://elec-mate.com/share/abc123",
      expiresAt: "2026-02-15",
      sections: ["basics", "qualifications", "experience"],
      createdAt: "2026-01-01",
      viewCount: 12,
    },
    {
      id: "2",
      url: "https://elec-mate.com/share/def456",
      expiresAt: null,
      sections: ["basics", "qualifications"],
      createdAt: "2025-12-15",
      viewCount: 5,
    },
  ];

  const sectionOptions = [
    { id: "basics", label: "Basic Info", icon: User },
    { id: "qualifications", label: "Qualifications", icon: GraduationCap },
    { id: "experience", label: "Work Experience", icon: Briefcase },
    { id: "skills", label: "Skills", icon: Wrench },
  ];

  const expiryOptions = [
    { value: "24h", label: "24 hours" },
    { value: "7d", label: "7 days" },
    { value: "30d", label: "30 days" },
    { value: "never", label: "Never expires" },
  ];

  const handleCopyLink = (url: string) => {
    navigator.clipboard.writeText(url);
    addNotification({
      title: "Link Copied",
      message: "Share link copied to clipboard",
      type: "success",
    });
  };

  const handleCreateLink = async () => {
    setIsCreatingLink(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));
    console.log("Creating share link:", {
      expiry: selectedExpiry,
      sections: selectedSections,
    });
    setIsCreatingLink(false);
    addNotification({
      title: "Link Created",
      message: "Your shareable link has been created",
      type: "success",
    });
    setIsCreateLinkOpen(false);
  };

  const handleDownloadQr = async () => {
    setIsDownloadingQr(true);
    try {
      // Get the SVG element
      const svg = qrRef.current?.querySelector("svg");
      if (!svg) {
        throw new Error("QR code not found");
      }

      // Create canvas
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Could not create canvas context");

      // Set canvas size with padding
      const padding = 40;
      const size = 400;
      canvas.width = size + padding * 2;
      canvas.height = size + padding * 2;

      // White background
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Convert SVG to data URL
      const svgData = new XMLSerializer().serializeToString(svg);
      const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
      const svgUrl = URL.createObjectURL(svgBlob);

      // Load image and draw to canvas
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, padding, padding, size, size);

        // Add text below QR code
        ctx.fillStyle = "#1a1a2e";
        ctx.font = "bold 20px Arial";
        ctx.textAlign = "center";
        ctx.fillText(`Elec-ID: ${elecIdNumber}`, canvas.width / 2, canvas.height - 60);
        ctx.font = "14px Arial";
        ctx.fillStyle = "#666";
        ctx.fillText("Scan to verify credentials", canvas.width / 2, canvas.height - 35);

        // Download
        const link = document.createElement("a");
        link.download = `elec-id-${elecIdNumber}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();

        URL.revokeObjectURL(svgUrl);
        setIsDownloadingQr(false);
        addNotification({
          title: "QR Downloaded",
          message: "Your QR code has been downloaded",
          type: "success",
        });
      };
      img.src = svgUrl;
    } catch (error) {
      console.error("Error downloading QR:", error);
      setIsDownloadingQr(false);
      addNotification({
        title: "Download Failed",
        message: "Could not download QR code",
        type: "info",
      });
    }
  };

  const handleShareQr = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Elec-ID: ${elecIdNumber}`,
          text: "Verify my electrical credentials",
          url: shareUrl,
        });
      } catch (error) {
        // User cancelled or share failed
        handleCopyLink(shareUrl);
      }
    } else {
      handleCopyLink(shareUrl);
    }
  };

  const handleDownloadPdf = async () => {
    if (selectedSections.length === 0) return;

    setIsGeneratingPdf(true);
    try {
      // Simulate processing time
      await new Promise((resolve) => setTimeout(resolve, 500));

      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      let yPos = 20;

      // Header
      doc.setFillColor(26, 26, 46);
      doc.rect(0, 0, pageWidth, 50, "F");

      doc.setTextColor(255, 220, 0);
      doc.setFontSize(24);
      doc.setFont("helvetica", "bold");
      doc.text("ELEC-ID", pageWidth / 2, 25, { align: "center" });

      doc.setFontSize(12);
      doc.setTextColor(255, 255, 255);
      doc.text("Professional Credentials Certificate", pageWidth / 2, 35, { align: "center" });

      yPos = 65;

      // Elec-ID Number
      doc.setTextColor(26, 26, 46);
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text(`Elec-ID: ${elecIdNumber}`, pageWidth / 2, yPos, { align: "center" });
      yPos += 15;

      // Basic Info Section
      if (selectedSections.includes("basics")) {
        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(26, 26, 46);
        doc.text("Personal Information", 20, yPos);
        yPos += 8;

        doc.setDrawColor(255, 220, 0);
        doc.setLineWidth(2);
        doc.line(20, yPos, 80, yPos);
        yPos += 10;

        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.text(`Name: ${userData.name}`, 20, yPos);
        yPos += 8;
        doc.text(`Job Title: ${userData.jobTitle}`, 20, yPos);
        yPos += 8;
        doc.text(`ECS Card: ${userData.ecsCard}`, 20, yPos);
        yPos += 8;
        doc.text(`Card Expiry: ${userData.ecsExpiry}`, 20, yPos);
        yPos += 20;
      }

      // Qualifications Section
      if (selectedSections.includes("qualifications")) {
        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        doc.text("Qualifications", 20, yPos);
        yPos += 8;

        doc.setDrawColor(255, 220, 0);
        doc.line(20, yPos, 80, yPos);
        yPos += 10;

        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        const qualifications = [
          "NVQ Level 3 Electrical Installation",
          "18th Edition BS 7671",
          "2391-52 Inspection & Testing",
          "AM2 Assessment",
        ];
        qualifications.forEach((qual) => {
          doc.text(`• ${qual}`, 25, yPos);
          yPos += 8;
        });
        yPos += 12;
      }

      // Experience Section
      if (selectedSections.includes("experience")) {
        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        doc.text("Work Experience", 20, yPos);
        yPos += 8;

        doc.setDrawColor(255, 220, 0);
        doc.line(20, yPos, 80, yPos);
        yPos += 10;

        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.text("• Approved Electrician at ABC Electrical (2020-Present)", 25, yPos);
        yPos += 8;
        doc.text("• Electrician at XYZ Services (2017-2020)", 25, yPos);
        yPos += 20;
      }

      // Skills Section
      if (selectedSections.includes("skills")) {
        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        doc.text("Skills & Competencies", 20, yPos);
        yPos += 8;

        doc.setDrawColor(255, 220, 0);
        doc.line(20, yPos, 80, yPos);
        yPos += 10;

        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        const skills = [
          "Domestic Installation - Expert",
          "Commercial Installation - Advanced",
          "Testing & Inspection - Expert",
          "EV Charging - Intermediate",
        ];
        skills.forEach((skill) => {
          doc.text(`• ${skill}`, 25, yPos);
          yPos += 8;
        });
      }

      // Footer
      doc.setFillColor(245, 245, 245);
      doc.rect(0, 270, pageWidth, 30, "F");

      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text(`Generated: ${new Date().toLocaleDateString("en-GB")}`, 20, 280);
      doc.text(`Verify at: ${shareUrl}`, 20, 288);

      doc.setTextColor(26, 26, 46);
      doc.text("elec-mate.com", pageWidth - 20, 284, { align: "right" });

      // Save PDF
      doc.save(`elec-id-${elecIdNumber}.pdf`);

      addNotification({
        title: "PDF Downloaded",
        message: "Your Elec-ID PDF has been generated",
        type: "success",
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      addNotification({
        title: "PDF Failed",
        message: "Could not generate PDF",
        type: "info",
      });
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handleDeleteLink = async () => {
    if (!deleteConfirm.id) return;
    setIsDeletingLink(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 600));
    console.log("Deleting link:", deleteConfirm.id);
    setIsDeletingLink(false);
    setDeleteConfirm({ open: false, id: null });
    addNotification({
      title: "Link Deleted",
      message: "Share link has been removed",
      type: "info",
    });
  };

  const toggleSection = (sectionId: string) => {
    setSelectedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((s) => s !== sectionId)
        : [...prev, sectionId]
    );
  };

  const getSectionLabel = (sectionId: string) => {
    return sectionOptions.find((s) => s.id === sectionId)?.label || sectionId;
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* QR Code Section - Hero style */}
      <Card className="bg-gradient-to-br from-elec-gray/80 to-elec-dark/80 border-white/10 overflow-hidden">
        <CardContent className="p-0">
          {/* Mobile: Stack vertically, centered */}
          <div className="flex flex-col items-center p-6 md:hidden">
            {/* QR Code - Prominent on mobile */}
            <div ref={qrRef} className="w-40 h-40 bg-white rounded-2xl p-3 shadow-xl shadow-black/20 mb-4">
              <QRCodeSVG
                value={shareUrl}
                size={136}
                bgColor="#ffffff"
                fgColor="#1a1a2e"
                level="H"
                includeMargin={false}
              />
            </div>

            <h3 className="text-lg font-bold text-foreground mb-1 text-center">Your Elec-ID QR Code</h3>
            <p className="text-sm text-muted-foreground mb-4 text-center">
              Scan to verify credentials
            </p>

            {/* Copy URL - Compact on mobile */}
            <div className="w-full flex items-center gap-2 p-2.5 rounded-lg bg-white/5 border border-white/10 mb-4">
              <span className="font-mono text-xs text-foreground flex-1 truncate">{shareUrl}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 flex-shrink-0"
                onClick={() => handleCopyLink(shareUrl)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>

            {/* Action buttons - Full width stack on mobile */}
            <div className="w-full grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                className="border-white/20"
                onClick={handleDownloadQr}
                disabled={isDownloadingQr}
              >
                {isDownloadingQr ? (
                  <Loader2 className="h-4 w-4 mr-1.5 animate-spin" />
                ) : (
                  <Download className="h-4 w-4 mr-1.5" />
                )}
                Download
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-white/20"
                onClick={handleShareQr}
              >
                <Share2 className="h-4 w-4 mr-1.5" />
                Share
              </Button>
            </div>
          </div>

          {/* Desktop: Side by side layout */}
          <div className="hidden md:flex items-center gap-8 p-8">
            {/* QR Code */}
            <div ref={qrRef} className="w-52 h-52 bg-white rounded-2xl p-4 shadow-xl shadow-black/20 flex-shrink-0 flex items-center justify-center">
              <QRCodeSVG
                value={shareUrl}
                size={176}
                bgColor="#ffffff"
                fgColor="#1a1a2e"
                level="H"
                includeMargin={false}
              />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-2xl font-bold text-foreground mb-2">Your Elec-ID QR Code</h3>
              <p className="text-muted-foreground mb-4">
                Employers and clients can scan this code to instantly verify your credentials.
              </p>
              <div className="flex items-center gap-2 p-3 rounded-lg bg-white/5 border border-white/10 mb-4 max-w-md">
                <span className="font-mono text-sm text-foreground flex-1 truncate">{shareUrl}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 flex-shrink-0"
                  onClick={() => handleCopyLink(shareUrl)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button
                  variant="outline"
                  className="border-white/20"
                  onClick={handleDownloadQr}
                  disabled={isDownloadingQr}
                >
                  {isDownloadingQr ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Download className="h-4 w-4 mr-2" />
                  )}
                  Download QR
                </Button>
                <Button
                  variant="outline"
                  className="border-white/20"
                  onClick={handleShareQr}
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* PDF Export */}
      <Card className="bg-elec-gray/50 border-white/10">
        <CardHeader className="pb-2 md:pb-3">
          <CardTitle className="text-foreground flex items-center gap-2 text-base md:text-lg">
            <FileText className="h-5 w-5 text-elec-yellow" />
            Export PDF
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 md:space-y-4">
          <p className="text-xs md:text-sm text-muted-foreground">
            Generate a professional PDF to share with employers or clients.
          </p>

          {/* Section selector - 2x2 on mobile, 1x4 on desktop */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
            {sectionOptions.map((section) => {
              const Icon = section.icon;
              const isSelected = selectedSections.includes(section.id);
              return (
                <button
                  key={section.id}
                  onClick={() => toggleSection(section.id)}
                  className={cn(
                    "p-2.5 md:p-3 rounded-lg border transition-all flex flex-col items-center",
                    isSelected
                      ? "bg-elec-yellow/20 border-elec-yellow text-foreground"
                      : "bg-white/5 border-white/10 text-muted-foreground hover:border-white/30 active:scale-95"
                  )}
                >
                  <Icon className={cn("h-5 w-5 mb-1.5", isSelected ? "text-elec-yellow" : "")} />
                  <span className="text-xs md:text-sm font-medium text-center leading-tight">{section.label}</span>
                </button>
              );
            })}
          </div>

          <Button
            className="w-full bg-elec-yellow hover:bg-elec-yellow/90 text-elec-dark font-semibold"
            onClick={handleDownloadPdf}
            disabled={selectedSections.length === 0 || isGeneratingPdf}
          >
            {isGeneratingPdf ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Shareable Links */}
      <Card className="bg-elec-gray/50 border-white/10">
        <CardHeader className="pb-2 md:pb-3">
          <div className="flex items-center justify-between gap-2">
            <CardTitle className="text-foreground flex items-center gap-2 text-base md:text-lg">
              <Link2 className="h-5 w-5 text-elec-yellow flex-shrink-0" />
              <span className="truncate">Shareable Links</span>
            </CardTitle>
            <Dialog open={isCreateLinkOpen} onOpenChange={setIsCreateLinkOpen}>
              <DialogTrigger asChild>
                <Button className="bg-elec-yellow hover:bg-elec-yellow/90 text-elec-dark flex-shrink-0" size="sm">
                  <Plus className="h-4 w-4 md:mr-1.5" />
                  <span className="hidden md:inline">Create Link</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-elec-gray border-white/20 max-w-md mx-4">
                <DialogHeader>
                  <DialogTitle className="text-foreground">Create Shareable Link</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  {/* Expiry */}
                  <div className="space-y-2">
                    <Label className="text-foreground text-sm">Link Expiry</Label>
                    <Select value={selectedExpiry} onValueChange={setSelectedExpiry}>
                      <SelectTrigger className="bg-white/5 border-white/20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-elec-gray border-white/20">
                        {expiryOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Sections to Include */}
                  <div className="space-y-2">
                    <Label className="text-foreground text-sm">Sections to Include</Label>
                    <div className="space-y-2">
                      {sectionOptions.map((section) => (
                        <div key={section.id} className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/5 transition-colors">
                          <Checkbox
                            id={`dialog-${section.id}`}
                            checked={selectedSections.includes(section.id)}
                            onCheckedChange={() => toggleSection(section.id)}
                          />
                          <Label htmlFor={`dialog-${section.id}`} className="text-foreground cursor-pointer flex-1">
                            {section.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      variant="outline"
                      className="flex-1 border-white/20"
                      onClick={() => setIsCreateLinkOpen(false)}
                      disabled={isCreatingLink}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="flex-1 bg-elec-yellow hover:bg-elec-yellow/90 text-elec-dark font-semibold"
                      onClick={handleCreateLink}
                      disabled={selectedSections.length === 0 || isCreatingLink}
                    >
                      {isCreatingLink ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Creating...
                        </>
                      ) : (
                        "Create Link"
                      )}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {shareLinks.length > 0 ? (
            shareLinks.map((link) => (
              <div
                key={link.id}
                className="p-3 md:p-4 rounded-lg bg-white/5 border border-white/10"
              >
                {/* Mobile layout - stacked */}
                <div className="md:hidden space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs text-foreground truncate flex-1">
                      {link.url.replace('https://elec-mate.com/', '.../')}
                    </span>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => handleCopyLink(link.url)}
                      >
                        <Copy className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => window.open(link.url, "_blank")}
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => setDeleteConfirm({ open: true, id: link.id })}
                      >
                        <Trash2 className="h-3.5 w-3.5 text-red-400" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {link.expiresAt
                        ? new Date(link.expiresAt).toLocaleDateString("en-GB")
                        : "No expiry"}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {link.viewCount}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {link.sections.map((section) => (
                      <Badge key={section} variant="secondary" className="text-[10px] px-1.5 py-0.5">
                        {getSectionLabel(section)}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Desktop layout - side by side */}
                <div className="hidden md:flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-2 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm text-foreground truncate">
                        {link.url}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 flex-shrink-0"
                        onClick={() => handleCopyLink(link.url)}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 flex-shrink-0"
                        onClick={() => window.open(link.url, "_blank")}
                      >
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {link.expiresAt
                          ? `Expires ${new Date(link.expiresAt).toLocaleDateString("en-GB")}`
                          : "Never expires"}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {link.viewCount} views
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {link.sections.map((section) => (
                        <Badge key={section} variant="secondary" className="text-xs">
                          {getSectionLabel(section)}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 flex-shrink-0"
                    onClick={() => setDeleteConfirm({ open: true, id: link.id })}
                  >
                    <Trash2 className="h-4 w-4 text-red-400" />
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="py-6 md:py-8 text-center">
              <Link2 className="h-8 w-8 md:h-10 md:w-10 text-muted-foreground mx-auto mb-2 md:mb-3" />
              <p className="text-sm text-muted-foreground">No shareable links created yet</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Privacy Notice */}
      <Card className="bg-white/5 border-white/10">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-foreground">Your data is protected</p>
              <p className="text-sm text-muted-foreground">
                Only the sections you choose to share will be visible. Recipients cannot access your full profile without your permission.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Delete Link Confirmation Dialog */}
      <ConfirmDeleteDialog
        open={deleteConfirm.open}
        onOpenChange={(open) => setDeleteConfirm({ open, id: open ? deleteConfirm.id : null })}
        title="Delete Share Link"
        description="Are you sure you want to delete this share link? Anyone with this link will no longer be able to view your profile."
        onConfirm={handleDeleteLink}
        isLoading={isDeletingLink}
      />
    </div>
  );
};

export default ElecIdShare;
