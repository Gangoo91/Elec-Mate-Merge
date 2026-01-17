/**
 * ElecIdCVTab - My CV tab in the Elec-ID settings
 *
 * Shows a list of user's CVs with:
 * - Primary CV highlighted
 * - Sync status indicators
 * - Create/Edit/Download actions
 * - Empty state for first-time users
 */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  FileText,
  Plus,
  Download,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  IdCard,
  Sparkles,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { useCVs, usePrimaryCV, UserCV, calculateCVCompleteness } from "@/hooks/useCV";
import { useElecIdForCV, useCVSyncStatus } from "@/hooks/useCVSync";
import CVCard from "./CVCard";
import { toast } from "@/hooks/use-toast";

interface ElecIdCVTabProps {
  onNavigate?: (tabId: string) => void;
}

const ElecIdCVTab = ({ onNavigate }: ElecIdCVTabProps) => {
  const navigate = useNavigate();
  const { data: cvs, isLoading: isLoadingCVs, error: cvsError } = useCVs();
  const { data: elecIdData, isLoading: isLoadingElecId } = useElecIdForCV();

  const isLoading = isLoadingCVs;
  const hasElecIdProfile = !!elecIdData?.profile;

  // Sort CVs with primary first
  const sortedCVs = cvs?.slice().sort((a, b) => {
    if (a.is_primary && !b.is_primary) return -1;
    if (!a.is_primary && b.is_primary) return 1;
    return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
  });

  const handleCreateCV = () => {
    // Navigate to CV builder
    navigate("/electrician-hub/cv-builder");
  };

  const handleEditCV = (cv: UserCV) => {
    // For now, store CV data in localStorage and navigate to builder
    // Future: add query param support to CV builder
    localStorage.setItem("elecmate-cv-draft", JSON.stringify(cv.cv_data));
    localStorage.setItem("elecmate-cv-template", cv.template_id);
    localStorage.setItem("elecmate-cv-editing-id", cv.id);
    navigate("/electrician-hub/cv-builder");
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-10 w-32" />
        </div>
        {[1, 2].map((i) => (
          <Skeleton key={i} className="h-32 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  // Error state
  if (cvsError) {
    return (
      <Card className="border-red-500/30 bg-red-500/10">
        <CardContent className="p-6 text-center">
          <AlertCircle className="h-10 w-10 text-red-400 mx-auto mb-3" />
          <h3 className="font-semibold text-foreground">Failed to Load CVs</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Please refresh the page to try again.
          </p>
        </CardContent>
      </Card>
    );
  }

  // Empty state
  if (!sortedCVs || sortedCVs.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Hero section */}
        <Card className="border-white/10 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 overflow-hidden">
          <CardContent className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shrink-0">
                <FileText className="h-10 w-10 text-white" />
              </div>
              <div className="text-center sm:text-left">
                <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                  Create Your Professional CV
                </h2>
                <p className="text-muted-foreground mt-2 max-w-md">
                  Build a professional CV that showcases your electrical qualifications.
                  Import your credentials directly from your Elec-ID profile.
                </p>
                <Button
                  onClick={handleCreateCV}
                  className="mt-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white"
                  size="lg"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Create Your CV
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <FeatureCard
            icon={IdCard}
            title="Import from Elec-ID"
            description="Automatically import your skills, qualifications, and work history"
            color="from-emerald-500 to-teal-500"
          />
          <FeatureCard
            icon={Sparkles}
            title="AI Assistance"
            description="Get AI-powered suggestions to make your CV stand out"
            color="from-purple-500 to-pink-500"
          />
          <FeatureCard
            icon={Download}
            title="PDF Download"
            description="Download professionally formatted PDF files instantly"
            color="from-amber-500 to-orange-500"
          />
        </div>
      </motion.div>
    );
  }

  // Has CVs
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">My CVs</h2>
          <p className="text-sm text-muted-foreground">
            {sortedCVs.length} CV{sortedCVs.length !== 1 && "s"}
            {hasElecIdProfile && " • Synced with Elec-ID"}
          </p>
        </div>
        <Button
          onClick={handleCreateCV}
          className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          New CV
        </Button>
      </div>

      {/* Elec-ID sync banner (if profile exists and CVs exist) */}
      {hasElecIdProfile && (
        <SyncStatusBanner
          cvs={sortedCVs}
          onSyncAll={() => {
            // Future: implement bulk sync
            toast({
              title: "Sync Available",
              description: "Edit individual CVs to sync from Elec-ID.",
            });
          }}
        />
      )}

      {/* CV List */}
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {sortedCVs.map((cv, index) => (
            <motion.div
              key={cv.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.05 }}
            >
              <CVCard cv={cv} onEdit={handleEditCV} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Tip card */}
      <Card className="border-white/10 bg-white/[0.02]">
        <CardContent className="p-4 flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-elec-yellow/20 flex items-center justify-center shrink-0">
            <Sparkles className="h-4 w-4 text-elec-yellow" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">
              <span className="text-foreground font-medium">Pro tip:</span> Set your best CV as
              "Primary" to use it automatically when applying for jobs.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Feature card for empty state
const FeatureCard = ({
  icon: Icon,
  title,
  description,
  color,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
}) => (
  <Card className="border-white/10 bg-white/[0.03]">
    <CardContent className="p-4">
      <div className={cn("w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center mb-3", color)}>
        <Icon className="h-5 w-5 text-white" />
      </div>
      <h3 className="font-medium text-foreground">{title}</h3>
      <p className="text-xs text-muted-foreground mt-1">{description}</p>
    </CardContent>
  </Card>
);

// Sync status banner
const SyncStatusBanner = ({
  cvs,
  onSyncAll,
}: {
  cvs: UserCV[];
  onSyncAll: () => void;
}) => {
  // Calculate total pending updates across all CVs
  // For simplicity, we'll just show a generic message
  // Full implementation would check each CV's sync status

  return (
    <Card className="border-emerald-500/20 bg-emerald-500/5">
      <CardContent className="p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
            <RefreshCw className="h-4 w-4 text-emerald-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-emerald-400">Elec-ID Connected</p>
            <p className="text-xs text-emerald-400/70">
              Skills and certifications sync automatically
            </p>
          </div>
        </div>
        <Badge
          variant="secondary"
          className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
        >
          <CheckCircle2 className="h-3 w-3 mr-1" />
          Linked
        </Badge>
      </CardContent>
    </Card>
  );
};

export default ElecIdCVTab;
