import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Image as ImageIcon, Folder, ArrowLeft } from 'lucide-react';
import { useSafetyPhotos } from '@/hooks/useSafetyPhotos';
import { usePhotoProjects, PhotoProject } from '@/hooks/usePhotoProjects';
import { SafetyPhoto } from '@/hooks/useSafetyPhotos';
import { useOfflinePhotoQueue } from '@/hooks/useOfflinePhotoQueue';

// Tab components
import AllPhotosTab from './photo-docs/AllPhotosTab';
import CameraTab from './photo-docs/CameraTab';
import ProjectsTab from './photo-docs/ProjectsTab';
import ProjectDetailView from './photo-docs/ProjectDetailView';
import ShareProjectSheet from './photo-docs/ShareProjectSheet';

type TabId = 'projects' | 'photos' | 'camera';

interface Tab {
  id: TabId;
  label: string;
  icon: React.ReactNode;
  badge?: number;
}

interface PhotoDocumentationProps {
  onBack?: () => void;
  backLabel?: string;
}

export default function PhotoDocumentation({ onBack, backLabel }: PhotoDocumentationProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabId>('projects');
  const { stats } = useSafetyPhotos();
  const { projects } = usePhotoProjects('active');
  const { pendingCount: offlinePendingCount } = useOfflinePhotoQueue();

  // Project detail view state (lifted to this level)
  const [viewingProject, setViewingProject] = useState<PhotoProject | null>(null);

  // Camera context: when navigating from a project, camera knows the project
  const [cameraProjectRef, setCameraProjectRef] = useState<string | undefined>();
  const [cameraProjectId, setCameraProjectId] = useState<string | undefined>();

  // Share sheet state
  const [shareOpen, setShareOpen] = useState(false);
  const [shareProject, setShareProject] = useState<PhotoProject | null>(null);
  const [sharePhotos, setSharePhotos] = useState<SafetyPhoto[]>([]);

  const tabs: Tab[] = [
    {
      id: 'projects',
      label: 'Projects',
      icon: <Folder className="h-[22px] w-[22px]" />,
      badge: projects.length > 0 ? projects.length : undefined,
    },
    {
      id: 'photos',
      label: 'All Photos',
      icon: <ImageIcon className="h-[22px] w-[22px]" />,
      badge: stats.total > 0 ? stats.total : undefined,
    },
    {
      id: 'camera',
      label: 'Camera',
      icon: <Camera className="h-[22px] w-[22px]" />,
      badge: offlinePendingCount > 0 ? offlinePendingCount : undefined,
    },
  ];

  const handlePhotoUploaded = useCallback(() => {
    setCameraProjectRef(undefined);
    setCameraProjectId(undefined);
    setActiveTab('projects');
  }, []);

  const handleTabChange = useCallback(
    (tabId: TabId) => {
      // If switching to camera from a project, pass context
      if (tabId === 'camera' && viewingProject) {
        setCameraProjectRef(viewingProject.name);
        setCameraProjectId(viewingProject.id);
      } else if (tabId !== 'camera') {
        setCameraProjectRef(undefined);
        setCameraProjectId(undefined);
      }

      // If switching away from project detail, close it
      if (tabId !== 'projects' && viewingProject) {
        setViewingProject(null);
      }

      setActiveTab(tabId);
    },
    [viewingProject]
  );

  const handleSelectProject = useCallback((project: PhotoProject) => {
    setViewingProject(project);
  }, []);

  const handleBackFromProject = useCallback(() => {
    setViewingProject(null);
  }, []);

  const handleShare = useCallback((project: PhotoProject, photos: SafetyPhoto[]) => {
    setShareProject(project);
    setSharePhotos(photos);
    setShareOpen(true);
  }, []);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate('/electrician/site-safety');
    }
  };

  // When viewing a project, show full-page ProjectDetailView (hide tabs)
  if (viewingProject) {
    return (
      <div className="flex flex-col h-[calc(100vh-80px)] bg-background">
        <ProjectDetailView
          project={viewingProject}
          onBack={handleBackFromProject}
          onShare={handleShare}
          onOpenCamera={() => {
            setCameraProjectRef(viewingProject.name);
            setCameraProjectId(viewingProject.id);
            setActiveTab('camera');
          }}
        />

        {/* Share Sheet */}
        {shareProject && (
          <ShareProjectSheet
            open={shareOpen}
            onOpenChange={setShareOpen}
            projectReference={shareProject.name}
            projectId={shareProject.id}
            photos={sharePhotos}
          />
        )}
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'projects':
        return <ProjectsTab onSelectProject={handleSelectProject} />;
      case 'photos':
        return <AllPhotosTab />;
      case 'camera':
        return (
          <CameraTab
            onPhotoUploaded={handlePhotoUploaded}
            projectReference={cameraProjectRef}
            projectId={cameraProjectId}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] bg-background">
      {/* Header with back button */}
      <div className="flex-shrink-0 bg-background/95 backdrop-blur-sm border-b border-white/10">
        <div className="px-4 py-2">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-white active:opacity-70 active:scale-[0.98] transition-all touch-manipulation h-11 -ml-2 px-2 rounded-lg"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm font-medium">{backLabel || 'Site Safety'}</span>
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

      {/* Bottom tab bar */}
      <div className="flex-shrink-0 bg-background/95 backdrop-blur-xl border-t border-white/10">
        <div className="flex items-stretch">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex-1 flex flex-col items-center justify-center py-2.5 touch-manipulation transition-colors ${
                  isActive ? 'text-elec-yellow' : 'text-white active:text-white'
                }`}
              >
                {/* Icon with badge */}
                <div className="relative">
                  {tab.icon}
                  {tab.badge !== undefined && tab.badge > 0 && (
                    <span className="absolute -top-1 -right-2.5 min-w-[16px] h-[16px] px-1 rounded-full bg-elec-yellow text-black text-[9px] font-bold flex items-center justify-center">
                      {tab.badge > 99 ? '99+' : tab.badge}
                    </span>
                  )}
                </div>

                {/* Label */}
                <span
                  className={`text-[10px] mt-1 font-medium ${isActive ? 'text-elec-yellow' : ''}`}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
        {/* Safe area spacer */}
        <div className="h-[env(safe-area-inset-bottom)]" />
      </div>

      {/* Share Sheet */}
      {shareProject && (
        <ShareProjectSheet
          open={shareOpen}
          onOpenChange={setShareOpen}
          projectReference={shareProject.name}
          projectId={shareProject.id}
          photos={sharePhotos}
        />
      )}
    </div>
  );
}
