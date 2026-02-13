import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Grid3X3, Folder, Download, ArrowLeft } from "lucide-react";
import { useSafetyPhotos } from "@/hooks/useSafetyPhotos";

// Tab components
import GalleryTab from "./photo-docs/GalleryTab";
import CameraTab from "./photo-docs/CameraTab";
import ProjectsTab from "./photo-docs/ProjectsTab";
import ExportTab from "./photo-docs/ExportTab";

type TabId = "gallery" | "camera" | "projects" | "export";

interface Tab {
  id: TabId;
  label: string;
  icon: React.ReactNode;
  badge?: number;
}

interface PhotoDocumentationProps {
  onBack?: () => void;
}

export default function PhotoDocumentation({ onBack }: PhotoDocumentationProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabId>("gallery");
  const { stats } = useSafetyPhotos();

  const tabs: Tab[] = [
    {
      id: "gallery",
      label: "Gallery",
      icon: <Grid3X3 className="h-[22px] w-[22px]" />,
      badge: stats.total > 0 ? stats.total : undefined,
    },
    {
      id: "camera",
      label: "Camera",
      icon: <Camera className="h-[22px] w-[22px]" />,
    },
    {
      id: "projects",
      label: "Projects",
      icon: <Folder className="h-[22px] w-[22px]" />,
    },
    {
      id: "export",
      label: "Export",
      icon: <Download className="h-[22px] w-[22px]" />,
    },
  ];

  const handlePhotoUploaded = useCallback(() => {
    // Switch to gallery tab after upload
    setActiveTab("gallery");
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case "gallery":
        return <GalleryTab />;
      case "camera":
        return <CameraTab onPhotoUploaded={handlePhotoUploaded} />;
      case "projects":
        return <ProjectsTab />;
      case "export":
        return <ExportTab />;
      default:
        return null;
    }
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate('/electrician/site-safety');
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] bg-black">
      {/* Header with back button */}
      <div className="flex-shrink-0 bg-black/95 backdrop-blur-sm border-b border-white/[0.08]">
        <div className="px-4 py-2">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-white active:opacity-70 active:scale-[0.98] transition-all touch-manipulation h-11 -ml-2 px-2 rounded-lg"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm font-medium">Site Safety</span>
          </button>
        </div>
      </div>

      {/* Tab content area - full height */}
      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="h-full"
          >
            {renderTabContent()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom tab bar - true iOS style */}
      <div className="flex-shrink-0 bg-black/90 backdrop-blur-xl border-t border-white/[0.08]">
        <div className="flex items-stretch">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex flex-col items-center justify-center py-2 touch-manipulation transition-colors ${
                  isActive ? "text-elec-yellow" : "text-white active:text-white"
                }`}
              >
                {/* Icon with badge */}
                <div className="relative">
                  {tab.icon}
                  {tab.badge !== undefined && tab.badge > 0 && (
                    <span className="absolute -top-1 -right-2.5 min-w-[14px] h-[14px] px-0.5 rounded-full bg-elec-yellow text-black text-[9px] font-bold flex items-center justify-center">
                      {tab.badge > 99 ? "99+" : tab.badge}
                    </span>
                  )}
                </div>

                {/* Label */}
                <span className={`text-[9px] mt-0.5 font-medium tracking-tight ${isActive ? "text-elec-yellow" : ""}`}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
        {/* Safe area spacer */}
        <div className="h-[env(safe-area-inset-bottom)]" />
      </div>
    </div>
  );
}
