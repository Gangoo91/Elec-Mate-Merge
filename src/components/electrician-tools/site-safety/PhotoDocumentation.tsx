import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, ChevronLeft } from 'lucide-react';
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

type ViewState = 'home' | 'all-photos' | 'camera';

interface PhotoDocumentationProps {
  onBack?: () => void;
  backLabel?: string;
}

export default function PhotoDocumentation({ onBack, backLabel }: PhotoDocumentationProps) {
  const navigate = useNavigate();
  const [viewState, setViewState] = useState<ViewState>('home');
  const { stats } = useSafetyPhotos();
  const { projects } = usePhotoProjects('active');
  const { pendingCount: offlinePendingCount } = useOfflinePhotoQueue();

  // Project detail view state
  const [viewingProject, setViewingProject] = useState<PhotoProject | null>(null);

  // Camera context
  const [cameraProjectRef, setCameraProjectRef] = useState<string | undefined>();
  const [cameraProjectId, setCameraProjectId] = useState<string | undefined>();

  // Share sheet state
  const [shareOpen, setShareOpen] = useState(false);
  const [shareProject, setShareProject] = useState<PhotoProject | null>(null);
  const [sharePhotos, setSharePhotos] = useState<SafetyPhoto[]>([]);

  const handlePhotoUploaded = useCallback(() => {
    setCameraProjectRef(undefined);
    setCameraProjectId(undefined);
    setViewState('home');
  }, []);

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
    if (viewState !== 'home') {
      setViewState('home');
      return;
    }
    if (onBack) {
      onBack();
    } else {
      navigate('/electrician/business');
    }
  };

  // When viewing a project, show full-page ProjectDetailView
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
            setViewState('camera');
          }}
        />
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

  // Camera or All Photos sub-views
  if (viewState === 'camera') {
    return (
      <div className="flex flex-col h-[calc(100vh-80px)] bg-background">
        <div className="flex-shrink-0 bg-background border-b border-white/10 px-2 py-2">
          <button
            onClick={() => setViewState('home')}
            className="flex items-center gap-2 text-white h-11 px-2 rounded-lg active:bg-white/5 touch-manipulation"
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="text-sm font-medium">Photo Docs</span>
          </button>
        </div>
        <div className="flex-1 overflow-hidden">
          <CameraTab
            onPhotoUploaded={handlePhotoUploaded}
            projectReference={cameraProjectRef}
            projectId={cameraProjectId}
            onClose={() => setViewState('home')}
          />
        </div>
      </div>
    );
  }

  if (viewState === 'all-photos') {
    return (
      <div className="flex flex-col h-[calc(100vh-80px)] bg-background">
        <div className="flex-shrink-0 bg-background border-b border-white/10 px-2 py-2">
          <button
            onClick={() => setViewState('home')}
            className="flex items-center gap-2 text-white h-11 px-2 rounded-lg active:bg-white/5 touch-manipulation"
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="text-sm font-medium">Photo Docs</span>
          </button>
        </div>
        <div className="flex-1 overflow-hidden">
          <AllPhotosTab />
        </div>
      </div>
    );
  }

  // Home view — hero + projects
  return (
    <div className="flex flex-col h-[calc(100vh-80px)] bg-background relative">
      <div className="flex-1 overflow-hidden">
        <ProjectsTab
          onSelectProject={handleSelectProject}
          onViewAllPhotos={() => setViewState('all-photos')}
          totalPhotoCount={stats.total}
          totalBytes={stats.totalBytes}
          projectCount={projects.length}
          onBack={handleBack}
          backLabel={backLabel}
        />
      </div>

      {/* Floating Camera FAB */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.2 }}
        onClick={() => setViewState('camera')}
        className="absolute bottom-6 right-4 h-14 w-14 rounded-full bg-elec-yellow shadow-lg shadow-elec-yellow/30 flex items-center justify-center touch-manipulation active:scale-95 transition-transform z-20"
      >
        <Camera className="h-6 w-6 text-black" />
        {offlinePendingCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
            {offlinePendingCount}
          </span>
        )}
      </motion.button>

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
