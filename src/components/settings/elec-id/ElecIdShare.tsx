import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useElecIdProfile } from "@/hooks/useElecIdProfile";
import { Drawer } from "vaul";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Download,
  Link2,
  Copy,
  Share2,
  Clock,
  Eye,
  GraduationCap,
  Briefcase,
  Wrench,
  User,
  Trash2,
  ExternalLink,
  Plus,
  Loader2,
  X,
  QrCode,
  Shield,
} from "lucide-react";
import { useNotifications } from "@/components/notifications/NotificationProvider";
import { QRCodeSVG } from "qrcode.react";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";

interface ShareLink {
  id: string;
  url: string;
  expiresAt: string | null;
  sections: string[];
  createdAt: string;
  viewCount: number;
}

// Skeleton loading component
const ShareSkeleton = () => (
  <div className="space-y-5">
    {/* Hero QR skeleton */}
    <Skeleton className="h-64 rounded-2xl bg-white/[0.06]" />

    {/* Action buttons skeleton */}
    <div className="grid grid-cols-3 gap-2">
      {[1, 2, 3].map((i) => (
        <Skeleton key={i} className="h-20 rounded-xl bg-white/[0.06]" />
      ))}
    </div>

    {/* Links section skeleton */}
    <Skeleton className="h-40 rounded-2xl bg-white/[0.06]" />
  </div>
);

const ElecIdShare = () => {
  const { addNotification } = useNotifications();
  const { profile } = useElecIdProfile();
  const isMobile = useIsMobile();
  const [isCreateLinkOpen, setIsCreateLinkOpen] = useState(false);
  const [selectedExpiry, setSelectedExpiry] = useState("7d");
  const [selectedSections, setSelectedSections] = useState<string[]>([
    "basics",
    "qualifications",
    "experience",
  ]);
  const [isDownloadingQr, setIsDownloadingQr] = useState(false);
  const [isCreatingLink, setIsCreatingLink] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<{ open: boolean; id: string | null }>({
    open: false,
    id: null,
  });
  const [isDeletingLink, setIsDeletingLink] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);

  // Get actual Elec-ID number from profile
  const elecIdNumber = profile?.elec_id_number || "EM-XXXXXX";
  const shareUrl = `https://elec-mate.com/verify/${elecIdNumber}`;

  // Get user data from profile
  const userData = {
    name: profile?.full_name || "Your Name",
    jobTitle: profile?.bio || "Electrician",
    ecsCard: profile?.ecs_card_type ? `ECS ${profile.ecs_card_type}` : "ECS Card",
    ecsExpiry: profile?.ecs_expiry_date
      ? new Date(profile.ecs_expiry_date).toLocaleDateString("en-GB", { month: "short", year: "numeric" })
      : "N/A",
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
    { id: "experience", label: "Experience", icon: Briefcase },
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
    await new Promise((resolve) => setTimeout(resolve, 800));
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
      const svg = qrRef.current?.querySelector("svg");
      if (!svg) throw new Error("QR code not found");

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Could not create canvas context");

      const padding = 40;
      const size = 400;
      canvas.width = size + padding * 2;
      canvas.height = size + padding * 2;

      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const svgData = new XMLSerializer().serializeToString(svg);
      const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
      const svgUrl = URL.createObjectURL(svgBlob);

      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, padding, padding, size, size);
        ctx.fillStyle = "#1a1a2e";
        ctx.font = "bold 20px Arial";
        ctx.textAlign = "center";
        ctx.fillText(`ELEC-iD: ${elecIdNumber}`, canvas.width / 2, canvas.height - 60);
        ctx.font = "14px Arial";
        ctx.fillStyle = "#666";
        ctx.fillText("Scan to verify credentials", canvas.width / 2, canvas.height - 35);

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
          title: `ELEC-iD: ${elecIdNumber}`,
          text: "Verify my electrical credentials",
          url: shareUrl,
        });
      } catch (error) {
        handleCopyLink(shareUrl);
      }
    } else {
      handleCopyLink(shareUrl);
    }
  };

  const handleDeleteLink = async () => {
    if (!deleteConfirm.id) return;
    setIsDeletingLink(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
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

  // Create link form content
  const CreateLinkFormContent = () => (
    <div className="space-y-5">
      {/* Expiry */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-foreground">Link Expiry</Label>
        <Select value={selectedExpiry} onValueChange={setSelectedExpiry}>
          <SelectTrigger className="h-12 bg-white/[0.06] border-white/[0.1] rounded-xl touch-manipulation">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-background border-white/[0.1] z-[200]">
            {expiryOptions.map((option) => (
              <SelectItem key={option.value} value={option.value} className="py-3 touch-manipulation">
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Sections to Include */}
      <div className="space-y-3">
        <Label className="text-sm font-medium text-foreground">Sections to Include</Label>
        <div className="grid grid-cols-2 gap-2">
          {sectionOptions.map((section) => {
            const Icon = section.icon;
            const isSelected = selectedSections.includes(section.id);
            return (
              <button
                key={section.id}
                type="button"
                onClick={() => toggleSection(section.id)}
                className={cn(
                  "p-3 rounded-xl border-2 text-left transition-all touch-manipulation active:scale-[0.98]",
                  isSelected
                    ? "bg-elec-yellow/10 border-elec-yellow"
                    : "bg-white/[0.03] border-white/[0.06] hover:bg-white/[0.06]"
                )}
              >
                <Icon className={cn("h-5 w-5 mb-1", isSelected ? "text-elec-yellow" : "text-foreground/70")} />
                <div className={cn("text-sm font-medium", isSelected ? "text-foreground" : "text-foreground/70")}>
                  {section.label}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  // Mobile bottom sheet for creating links
  const MobileCreateLinkSheet = () => (
    <Drawer.Root open={isCreateLinkOpen} onOpenChange={setIsCreateLinkOpen}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 z-50 flex flex-col max-h-[85vh] bg-background rounded-t-[20px] border-t border-white/[0.08]">
          <div className="flex justify-center pt-3 pb-2">
            <div className="w-12 h-1.5 rounded-full bg-white/20" />
          </div>
          <div className="flex items-center justify-between px-5 pb-4 border-b border-white/[0.06]">
            <Drawer.Title className="text-lg font-semibold text-foreground">
              Create Share Link
            </Drawer.Title>
            <button
              onClick={() => setIsCreateLinkOpen(false)}
              className="p-2 -mr-2 rounded-full hover:bg-white/[0.08] touch-manipulation"
            >
              <X className="w-5 h-5 text-foreground/70" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-5 py-5">
            <CreateLinkFormContent />
          </div>
          <div className="flex gap-3 p-5 border-t border-white/[0.06] bg-background/80 backdrop-blur-sm">
            <Button
              variant="outline"
              className="flex-1 h-12 rounded-xl border-white/[0.15] touch-manipulation active:scale-[0.98]"
              onClick={() => setIsCreateLinkOpen(false)}
              disabled={isCreatingLink}
            >
              Cancel
            </Button>
            <Button
              className="flex-1 h-12 rounded-xl bg-elec-yellow hover:bg-elec-yellow/90 text-elec-dark font-semibold touch-manipulation active:scale-[0.98]"
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
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );

  // Desktop dialog for creating links
  const DesktopCreateLinkDialog = () => (
    <Dialog open={isCreateLinkOpen} onOpenChange={setIsCreateLinkOpen}>
      <DialogContent className="bg-background border-white/[0.1] max-w-md">
        <DialogHeader>
          <DialogTitle className="text-foreground">Create Share Link</DialogTitle>
        </DialogHeader>
        <CreateLinkFormContent />
        <div className="flex gap-3 pt-4">
          <Button
            variant="outline"
            className="flex-1 border-white/[0.15]"
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
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="space-y-5">
      {/* Create Link Sheet/Dialog */}
      {isMobile ? <MobileCreateLinkSheet /> : <DesktopCreateLinkDialog />}

      {/* Delete Confirmation */}
      <ConfirmDeleteDialog
        open={deleteConfirm.open}
        onOpenChange={(open) => setDeleteConfirm({ open, id: open ? deleteConfirm.id : null })}
        title="Delete Share Link"
        description="Anyone with this link will no longer be able to view your profile."
        onConfirm={handleDeleteLink}
        isLoading={isDeletingLink}
      />

      {/* Hero QR Card */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/[0.08] p-6"
      >
        {/* Background glow */}
        <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-20 bg-elec-yellow" />

        <div className="relative flex flex-col items-center">
          {/* QR Code - Hero Size */}
          <div
            ref={qrRef}
            className="w-48 h-48 bg-white rounded-2xl p-4 shadow-xl shadow-black/30 mb-4"
          >
            <QRCodeSVG
              value={shareUrl}
              size={160}
              bgColor="#ffffff"
              fgColor="#1a1a2e"
              level="H"
              includeMargin={false}
            />
          </div>

          {/* ID Number */}
          <div className="flex items-center gap-2 mb-2">
            <QrCode className="h-5 w-5 text-elec-yellow" />
            <span className="text-lg font-bold text-foreground">{elecIdNumber}</span>
          </div>

          <p className="text-sm text-foreground/70 mb-4 text-center">
            Scan to instantly verify your credentials
          </p>

          {/* Copy URL Button */}
          <button
            onClick={() => handleCopyLink(shareUrl)}
            className="w-full max-w-sm flex items-center gap-2 p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] touch-manipulation active:bg-white/[0.08] active:scale-[0.99] transition-all mb-4"
          >
            <span className="font-mono text-xs text-foreground flex-1 truncate text-left">
              {shareUrl}
            </span>
            <Copy className="h-4 w-4 text-foreground/70 flex-shrink-0" />
          </button>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
            <Button
              variant="outline"
              onClick={handleDownloadQr}
              disabled={isDownloadingQr}
              className="h-12 rounded-xl border-white/[0.15] touch-manipulation active:scale-[0.97]"
            >
              {isDownloadingQr ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Download className="h-4 w-4 mr-2" />
              )}
              Download
            </Button>
            <Button
              onClick={handleShareQr}
              className="h-12 rounded-xl bg-elec-yellow hover:bg-elec-yellow/90 text-elec-dark font-semibold touch-manipulation active:scale-[0.97]"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          onClick={() => setIsCreateLinkOpen(true)}
          className="flex flex-col items-center gap-2 p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] touch-manipulation active:bg-white/[0.08] active:scale-[0.97] transition-all"
        >
          <Link2 className="h-7 w-7 text-elec-yellow" />
          <span className="text-sm font-medium text-foreground">Create Link</span>
          <span className="text-xs text-foreground/60">Generate shareable URL</span>
        </motion.button>
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onClick={() => handleCopyLink(shareUrl)}
          className="flex flex-col items-center gap-2 p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] touch-manipulation active:bg-white/[0.08] active:scale-[0.97] transition-all"
        >
          <Copy className="h-7 w-7 text-elec-yellow" />
          <span className="text-sm font-medium text-foreground">Copy URL</span>
          <span className="text-xs text-foreground/60">Quick share link</span>
        </motion.button>
      </div>

      {/* Shareable Links */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-3"
      >
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <Link2 className="h-4 w-4 text-elec-yellow" />
            <h4 className="font-medium text-foreground">Active Links</h4>
          </div>
          <Button
            onClick={() => setIsCreateLinkOpen(true)}
            size="sm"
            className="h-9 px-3 rounded-lg bg-elec-yellow hover:bg-elec-yellow/90 text-elec-dark font-semibold touch-manipulation"
          >
            <Plus className="h-4 w-4 mr-1" />
            New
          </Button>
        </div>

        <AnimatePresence mode="popLayout">
          {shareLinks.length > 0 ? (
            shareLinks.map((link, index) => (
              <motion.div
                key={link.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: index * 0.05 }}
                className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06]"
              >
                <div className="flex items-center justify-between gap-3 mb-2">
                  <span className="font-mono text-xs text-foreground truncate flex-1">
                    {link.url.split('/').pop()}
                  </span>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                      onClick={() => handleCopyLink(link.url)}
                      className="p-2 rounded-lg hover:bg-white/[0.08] touch-manipulation active:scale-[0.95]"
                    >
                      <Copy className="h-4 w-4 text-foreground/70" />
                    </button>
                    <button
                      onClick={() => window.open(link.url, "_blank")}
                      className="p-2 rounded-lg hover:bg-white/[0.08] touch-manipulation active:scale-[0.95]"
                    >
                      <ExternalLink className="h-4 w-4 text-foreground/70" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirm({ open: true, id: link.id })}
                      className="p-2 rounded-lg hover:bg-red-500/10 touch-manipulation active:scale-[0.95]"
                    >
                      <Trash2 className="h-4 w-4 text-red-400" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-xs text-foreground/70">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {link.expiresAt
                      ? new Date(link.expiresAt).toLocaleDateString("en-GB")
                      : "No expiry"}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {link.viewCount} views
                  </span>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {link.sections.map((section) => (
                    <Badge
                      key={section}
                      variant="secondary"
                      className="text-[10px] px-1.5 py-0 bg-white/[0.06]"
                    >
                      {getSectionLabel(section)}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-8 text-center"
            >
              <Link2 className="h-10 w-10 text-foreground/70/50 mx-auto mb-2" />
              <p className="text-sm text-foreground/70">No active links</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Privacy Notice */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-start gap-3 p-4 rounded-2xl bg-green-500/10 border border-green-500/20"
      >
        <Shield className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-medium text-foreground text-sm">Your data is protected</p>
          <p className="text-xs text-foreground/70">
            Only sections you choose will be visible to recipients.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ElecIdShare;
