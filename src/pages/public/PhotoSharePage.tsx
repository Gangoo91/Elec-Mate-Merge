import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Camera,
  MapPin,
  Calendar,
  Tag,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  X,
  Check,
  Loader2,
  Shield,
  Eye,
  Zap,
  AlertTriangle,
  Download,
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { getCategoryColor, getCategoryLabel } from '@/hooks/useSafetyPhotos';
import { WORKFLOW_PHASES, getPhotoTypeLabel, getPhotoTypeColour } from '@/hooks/usePhotoProjects';
import JSZip from 'jszip';

interface SharePhotoData {
  id: string;
  file_url: string;
  description: string;
  category: string;
  location: string | null;
  tags: string[] | null;
  created_at: string;
  photo_type?: string | null;
  notes?: string | null;
}

interface ShareLinkData {
  id: string;
  share_token: string;
  project_reference: string;
  title: string | null;
  message: string | null;
  company_name: string | null;
  photos_data: SharePhotoData[];
  requires_signature: boolean;
  status: string;
  created_at: string;
  signed_at?: string | null;
  client_name?: string | null;
}

type PageState = 'loading' | 'viewing' | 'signing' | 'signed' | 'error' | 'expired';

export default function PhotoSharePage() {
  const { token } = useParams<{ token: string }>();
  const [pageState, setPageState] = useState<PageState>('loading');
  const [shareData, setShareData] = useState<ShareLinkData | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<SharePhotoData | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [clientName, setClientName] = useState('');
  const [isSigning, setIsSigning] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [collapsedPhases, setCollapsedPhases] = useState<Set<string>>(new Set());
  const signatureCanvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawingRef = useRef(false);

  // Swipe state for fullscreen viewer
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  // Load share data
  useEffect(() => {
    if (!token) {
      setPageState('error');
      return;
    }
    loadShareData(token);
  }, [token]);

  const loadShareData = async (shareToken: string) => {
    try {
      const { data, error } = await supabase
        .from('photo_share_links')
        .select('*')
        .eq('share_token', shareToken)
        .single();

      if (error || !data) {
        setPageState('error');
        return;
      }

      if (data.status === 'signed') {
        setShareData(data as ShareLinkData);
        setPageState('signed');
        return;
      }

      if (data.status !== 'active') {
        setPageState('expired');
        return;
      }

      if (data.expires_at && new Date(data.expires_at) < new Date()) {
        setPageState('expired');
        return;
      }

      setShareData(data as ShareLinkData);
      setPageState('viewing');

      // Increment view count
      await supabase
        .from('photo_share_links')
        .update({
          view_count: (data.view_count || 0) + 1,
          last_viewed_at: new Date().toISOString(),
        })
        .eq('id', data.id);
    } catch {
      setPageState('error');
    }
  };

  // Signature canvas setup
  useEffect(() => {
    if (pageState === 'signing' && signatureCanvasRef.current) {
      const canvas = signatureCanvasRef.current;
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, rect.width, rect.height);
      }
    }
  }, [pageState]);

  const getCoords = (e: React.TouchEvent | React.MouseEvent) => {
    const canvas = signatureCanvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    if ('touches' in e) {
      return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
    }
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const handleDrawStart = (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    isDrawingRef.current = true;
    const ctx = signatureCanvasRef.current?.getContext('2d');
    if (!ctx) return;
    const { x, y } = getCoords(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const handleDrawMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDrawingRef.current) return;
    e.preventDefault();
    const ctx = signatureCanvasRef.current?.getContext('2d');
    if (!ctx) return;
    const { x, y } = getCoords(e);
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#000000';
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
    if (!hasSignature) setHasSignature(true);
  };

  const handleDrawEnd = () => {
    isDrawingRef.current = false;
  };

  const clearSignature = () => {
    const canvas = signatureCanvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;
    const dpr = window.devicePixelRatio || 1;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width / dpr, canvas.height / dpr);
    setHasSignature(false);
  };

  const handleSubmitSignature = async () => {
    if (!shareData || !signatureCanvasRef.current || !clientName.trim()) return;
    setIsSigning(true);

    try {
      const signatureData = signatureCanvasRef.current.toDataURL('image/png');

      const { error } = await supabase
        .from('photo_share_links')
        .update({
          signature_data: signatureData,
          client_name: clientName.trim(),
          signed_at: new Date().toISOString(),
          status: 'signed',
          updated_at: new Date().toISOString(),
        })
        .eq('id', shareData.id);

      if (error) throw error;
      setPageState('signed');
    } catch {
      alert('Failed to submit signature. Please try again.');
    } finally {
      setIsSigning(false);
    }
  };

  const photos = shareData?.photos_data || [];

  // Group photos by workflow phases
  const phaseGroups = useMemo(() => {
    const hasPhotoTypes = photos.some((p) => p.photo_type);
    if (!hasPhotoTypes) return null; // Fall back to flat grid

    return WORKFLOW_PHASES.map((phase) => {
      const phasePhotos = photos.filter((p) => {
        const type = p.photo_type || 'general';
        return phase.photoTypes.includes(type);
      });
      return { ...phase, photos: phasePhotos };
    }).filter((g) => g.photos.length > 0);
  }, [photos]);

  // Uncategorised photos (not in any workflow phase)
  const uncategorisedPhotos = useMemo(() => {
    if (!phaseGroups) return [];
    const allPhaseTypes = WORKFLOW_PHASES.flatMap((p) => p.photoTypes);
    return photos.filter((p) => {
      const type = p.photo_type || 'general';
      return !allPhaseTypes.includes(type);
    });
  }, [photos, phaseGroups]);

  const handleNavigate = useCallback(
    (direction: 'prev' | 'next') => {
      const newIndex =
        direction === 'prev'
          ? Math.max(0, selectedIndex - 1)
          : Math.min(photos.length - 1, selectedIndex + 1);
      setSelectedIndex(newIndex);
      setSelectedPhoto(photos[newIndex]);
    },
    [selectedIndex, photos]
  );

  // Swipe handlers for fullscreen viewer
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (!touchStartRef.current) return;
      const dx = e.changedTouches[0].clientX - touchStartRef.current.x;
      const dy = e.changedTouches[0].clientY - touchStartRef.current.y;
      touchStartRef.current = null;

      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
        if (dx < 0) handleNavigate('next');
        else handleNavigate('prev');
      }
    },
    [handleNavigate]
  );

  const togglePhase = useCallback((phaseId: string) => {
    setCollapsedPhases((prev) => {
      const next = new Set(prev);
      if (next.has(phaseId)) next.delete(phaseId);
      else next.add(phaseId);
      return next;
    });
  }, []);

  // Download All as ZIP
  const handleDownloadAll = useCallback(async () => {
    if (photos.length === 0) return;
    setIsDownloading(true);

    try {
      const zip = new JSZip();
      for (let i = 0; i < photos.length; i++) {
        try {
          const res = await fetch(photos[i].file_url);
          const blob = await res.blob();
          const ext = photos[i].file_url.split('.').pop()?.split('?')[0] || 'jpg';
          const type = photos[i].photo_type || photos[i].category || 'photo';
          zip.file(`${type}_${i + 1}.${ext}`, blob);
        } catch {
          // Skip failed downloads
        }
      }

      const content = await zip.generateAsync({ type: 'blob' });
      const projectName = (shareData?.title || shareData?.project_reference || 'photos')
        .replace(/\s+/g, '-')
        .toLowerCase();
      const url = URL.createObjectURL(content);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${projectName}-${format(new Date(), 'yyyy-MM-dd')}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      alert('Failed to create download. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  }, [photos, shareData]);

  // Loading state
  if (pageState === 'loading') {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-amber-500 mb-3" />
        <p className="text-sm text-gray-500">Loading photos...</p>
      </div>
    );
  }

  // Error state
  if (pageState === 'error') {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
        <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-4">
          <AlertTriangle className="h-8 w-8 text-red-500" />
        </div>
        <h1 className="text-xl font-bold text-gray-900 mb-2">Link Not Found</h1>
        <p className="text-sm text-gray-500 text-center max-w-xs">
          This share link doesn't exist or has been removed. Please contact the electrician for a
          new link.
        </p>
      </div>
    );
  }

  // Expired state
  if (pageState === 'expired') {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
        <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center mb-4">
          <AlertTriangle className="h-8 w-8 text-amber-500" />
        </div>
        <h1 className="text-xl font-bold text-gray-900 mb-2">Link Expired</h1>
        <p className="text-sm text-gray-500 text-center max-w-xs">
          This share link has expired. Please contact the electrician for a new link.
        </p>
      </div>
    );
  }

  // Signed confirmation
  if (pageState === 'signed') {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mb-4 mx-auto">
            <Check className="h-10 w-10 text-green-500" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">Thank You!</h1>
          <p className="text-sm text-gray-500 mb-1">Your signature has been recorded.</p>
          {shareData?.client_name && (
            <p className="text-xs text-gray-400">
              Signed by {shareData.client_name} on{' '}
              {shareData.signed_at
                ? format(new Date(shareData.signed_at), 'd MMMM yyyy, HH:mm')
                : 'today'}
            </p>
          )}
          {shareData?.company_name && (
            <p className="text-xs text-gray-400 mt-3">Provided by {shareData.company_name}</p>
          )}
        </motion.div>
      </div>
    );
  }

  // Signing state
  if (pageState === 'signing') {
    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-4 py-3 z-10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setPageState('viewing')}
              className="p-2 -ml-2 rounded-lg active:bg-gray-100"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>
            <div>
              <h2 className="text-base font-semibold text-gray-900">Sign Off</h2>
              <p className="text-xs text-gray-500">Confirm you've reviewed the photos</p>
            </div>
          </div>
        </div>

        <div className="p-4 max-w-lg mx-auto space-y-6">
          {/* Summary */}
          <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-5 w-5 text-amber-600" />
              <h3 className="text-sm font-semibold text-gray-900">Photo Documentation Review</h3>
            </div>
            <p className="text-xs text-gray-600">
              By signing below, you confirm you have reviewed {photos.length} photo
              {photos.length !== 1 ? 's' : ''} for{' '}
              <strong>{shareData?.title || shareData?.project_reference}</strong>.
            </p>
          </div>

          {/* Name input */}
          <div>
            <label className="text-sm font-medium text-gray-700">Your Full Name *</label>
            <input
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="Enter your full name..."
              className="mt-1.5 w-full h-12 px-4 rounded-xl border border-gray-200 text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none"
            />
          </div>

          {/* Signature pad */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">Your Signature *</label>
              {hasSignature && (
                <button onClick={clearSignature} className="text-xs text-amber-600 font-medium">
                  Clear
                </button>
              )}
            </div>
            <div className="relative">
              <canvas
                ref={signatureCanvasRef}
                className="w-full border-2 border-dashed border-gray-200 rounded-xl cursor-crosshair touch-none bg-white"
                style={{ height: '160px' }}
                onMouseDown={handleDrawStart}
                onMouseUp={handleDrawEnd}
                onMouseLeave={handleDrawEnd}
                onMouseMove={handleDrawMove}
                onTouchStart={handleDrawStart}
                onTouchEnd={handleDrawEnd}
                onTouchMove={handleDrawMove}
              />
              {!hasSignature && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-sm text-gray-300">Sign here</span>
                </div>
              )}
            </div>
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmitSignature}
            disabled={!clientName.trim() || !hasSignature || isSigning}
            className="w-full h-14 rounded-xl bg-amber-500 text-white font-semibold text-base flex items-center justify-center gap-2 disabled:opacity-50 active:bg-amber-600 transition-colors"
          >
            {isSigning ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Check className="h-5 w-5" />
                Submit Signature
              </>
            )}
          </button>
        </div>
      </div>
    );
  }

  // Main viewing state
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Professional header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 py-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center flex-shrink-0">
              <Camera className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              {shareData?.company_name && (
                <p className="text-xs text-amber-600 font-medium uppercase tracking-wide">
                  {shareData.company_name}
                </p>
              )}
              <h1 className="text-lg font-bold text-gray-900 truncate">
                {shareData?.title || shareData?.project_reference}
              </h1>
            </div>
          </div>

          {shareData?.message && <p className="text-sm text-gray-600 mb-3">{shareData.message}</p>}

          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Camera className="h-3 w-3" />
              {photos.length} photo{photos.length !== 1 ? 's' : ''}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {shareData?.created_at ? format(new Date(shareData.created_at), 'd MMMM yyyy') : ''}
            </span>
            <span className="flex items-center gap-1">
              <Zap className="h-3 w-3" />
              Powered by Elec-Mate
            </span>
          </div>

          {/* Download All button */}
          {photos.length > 0 && (
            <button
              onClick={handleDownloadAll}
              disabled={isDownloading}
              className="mt-3 flex items-center gap-2 px-4 h-10 rounded-lg bg-gray-100 text-sm font-medium text-gray-700 active:bg-gray-200 disabled:opacity-50 transition-colors"
            >
              {isDownloading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Download className="h-4 w-4" />
              )}
              {isDownloading ? 'Downloading...' : 'Download All'}
            </button>
          )}
        </div>
      </div>

      {/* Photo content */}
      <div className="max-w-3xl mx-auto px-4 py-4">
        {phaseGroups && phaseGroups.length > 0 ? (
          /* Phase-grouped view */
          <div className="space-y-4">
            {phaseGroups.map((phase) => (
              <div
                key={phase.id}
                className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100"
              >
                {/* Phase header */}
                <button
                  onClick={() => togglePhase(phase.id)}
                  className="w-full flex items-center gap-2.5 px-4 py-3 active:bg-gray-50 transition-colors"
                >
                  <span className={`w-3 h-3 rounded-full ${phase.dotColour}`} />
                  <span className="text-sm font-semibold text-gray-900 flex-1 text-left">
                    {phase.label}
                  </span>
                  <span className="text-xs text-gray-500">
                    {phase.photos.length} photo{phase.photos.length !== 1 ? 's' : ''}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-gray-400 transition-transform ${
                      collapsedPhases.has(phase.id) ? '-rotate-90' : 'rotate-0'
                    }`}
                  />
                </button>

                {/* Phase photos */}
                {!collapsedPhases.has(phase.id) && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 px-3 pb-3">
                    {phase.photos.map((photo, index) => (
                      <motion.div
                        key={photo.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.03 }}
                        className="bg-gray-50 rounded-lg overflow-hidden cursor-pointer active:scale-[0.98] transition-transform border border-gray-100"
                        onClick={() => {
                          const globalIdx = photos.findIndex((p) => p.id === photo.id);
                          setSelectedPhoto(photo);
                          setSelectedIndex(globalIdx >= 0 ? globalIdx : index);
                        }}
                      >
                        <div className="aspect-square relative">
                          <img
                            src={photo.file_url}
                            alt={photo.description}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        <div className="p-2">
                          <p className="text-xs text-gray-800 font-medium line-clamp-2">
                            {photo.description}
                          </p>
                          {photo.notes && (
                            <p className="text-[10px] text-gray-500 line-clamp-1 mt-0.5">
                              {photo.notes}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Uncategorised photos */}
            {uncategorisedPhotos.length > 0 && (
              <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
                <div className="flex items-center gap-2.5 px-4 py-3">
                  <span className="w-3 h-3 rounded-full bg-gray-400" />
                  <span className="text-sm font-semibold text-gray-900 flex-1">General</span>
                  <span className="text-xs text-gray-500">{uncategorisedPhotos.length}</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 px-3 pb-3">
                  {uncategorisedPhotos.map((photo, index) => (
                    <motion.div
                      key={photo.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03 }}
                      className="bg-gray-50 rounded-lg overflow-hidden cursor-pointer active:scale-[0.98] transition-transform border border-gray-100"
                      onClick={() => {
                        const globalIdx = photos.findIndex((p) => p.id === photo.id);
                        setSelectedPhoto(photo);
                        setSelectedIndex(globalIdx >= 0 ? globalIdx : index);
                      }}
                    >
                      <div className="aspect-square">
                        <img
                          src={photo.file_url}
                          alt={photo.description}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-2">
                        <p className="text-xs text-gray-800 font-medium line-clamp-2">
                          {photo.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Flat grid (no photo_type data) */
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {photos.map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
                className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer active:scale-[0.98] transition-transform"
                onClick={() => {
                  setSelectedPhoto(photo);
                  setSelectedIndex(index);
                }}
              >
                <div className="aspect-square relative">
                  <img
                    src={photo.file_url}
                    alt={photo.description}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div
                    className={`absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-medium text-white ${getCategoryColor(photo.category)}`}
                  >
                    {getCategoryLabel(photo.category)}
                  </div>
                </div>
                <div className="p-2.5">
                  <p className="text-xs text-gray-800 font-medium line-clamp-2">
                    {photo.description}
                  </p>
                  <div className="flex items-center gap-2 mt-1.5">
                    {photo.location && (
                      <span className="flex items-center gap-0.5 text-[10px] text-gray-500">
                        <MapPin className="h-2.5 w-2.5" />
                        {photo.location}
                      </span>
                    )}
                    <span className="text-[10px] text-gray-400">
                      {format(new Date(photo.created_at), 'd MMM')}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Signature CTA (if required) */}
      {shareData?.requires_signature && (
        <div className="sticky bottom-0 bg-white border-t border-gray-100 p-4">
          <div className="max-w-3xl mx-auto">
            <button
              onClick={() => setPageState('signing')}
              className="w-full h-14 rounded-xl bg-amber-500 text-white font-semibold text-base flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 active:bg-amber-600 transition-colors"
            >
              <Shield className="h-5 w-5" />
              Review & Sign Off
            </button>
          </div>
        </div>
      )}

      {/* Full-screen photo viewer with swipe navigation */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black flex flex-col"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Viewer header */}
            <div className="flex-shrink-0 bg-black/90 backdrop-blur-sm px-3 py-2 flex items-center justify-between">
              <button
                onClick={() => setSelectedPhoto(null)}
                className="p-2 rounded-full active:bg-white/10"
              >
                <X className="h-5 w-5 text-white" />
              </button>
              <span className="text-xs text-white">
                {selectedIndex + 1} / {photos.length}
              </span>
              <div className="w-9" />
            </div>

            {/* Image */}
            <div className="flex-1 flex items-center justify-center overflow-hidden relative">
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedPhoto.id}
                  src={selectedPhoto.file_url}
                  alt={selectedPhoto.description}
                  className="max-w-full max-h-full object-contain"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                />
              </AnimatePresence>

              {/* Nav arrows */}
              {selectedIndex > 0 && (
                <button
                  onClick={() => handleNavigate('prev')}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 active:bg-black/70"
                >
                  <ChevronLeft className="h-6 w-6 text-white" />
                </button>
              )}
              {selectedIndex < photos.length - 1 && (
                <button
                  onClick={() => handleNavigate('next')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 active:bg-black/70"
                >
                  <ChevronRight className="h-6 w-6 text-white" />
                </button>
              )}
            </div>

            {/* Photo info */}
            <div className="flex-shrink-0 bg-black/90 backdrop-blur-sm px-4 py-3">
              <div className="flex items-center gap-2 mb-1">
                {selectedPhoto.photo_type ? (
                  <>
                    <span
                      className={`w-2 h-2 rounded-full ${getPhotoTypeColour(selectedPhoto.photo_type)}`}
                    />
                    <span className="text-xs text-white">
                      {getPhotoTypeLabel(selectedPhoto.photo_type)}
                    </span>
                  </>
                ) : (
                  <>
                    <span
                      className={`w-2 h-2 rounded-full ${getCategoryColor(selectedPhoto.category)}`}
                    />
                    <span className="text-xs text-white">
                      {getCategoryLabel(selectedPhoto.category)}
                    </span>
                  </>
                )}
              </div>
              <p className="text-sm text-white">{selectedPhoto.description}</p>
              {selectedPhoto.notes && (
                <p className="text-xs text-gray-300 mt-1">{selectedPhoto.notes}</p>
              )}
              <div className="flex items-center gap-3 mt-1.5 text-[10px] text-gray-400">
                {selectedPhoto.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {selectedPhoto.location}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {format(new Date(selectedPhoto.created_at), 'd MMM yyyy, HH:mm')}
                </span>
              </div>
              {selectedPhoto.tags && selectedPhoto.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {selectedPhoto.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-1.5 py-0.5 rounded-full bg-white/10 text-[10px] text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
