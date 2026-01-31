/**
 * StatusSheet
 *
 * Bottom sheet for workers to update their status/check-in.
 * Captures GPS location and updates employer_worker_locations.
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Building2,
  Navigation,
  Clock,
  X,
  Loader2,
  CheckCircle,
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useWorkerSelfService } from '@/hooks/useWorkerSelfService';
import { useActiveJobs } from '@/hooks/useJobs';
import { WorkerStatus } from '@/services/locationService';

const STATUS_OPTIONS: { value: WorkerStatus; label: string; icon: typeof MapPin; colour: string }[] = [
  { value: 'Office', label: 'Office', icon: Building2, colour: 'text-elec-yellow' },
  { value: 'En Route', label: 'En Route', icon: Navigation, colour: 'text-amber-400' },
  { value: 'On Site', label: 'On Site', icon: MapPin, colour: 'text-green-400' },
  { value: 'Off Duty', label: 'Off Duty', icon: Clock, colour: 'text-gray-400' },
];

interface StatusSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function StatusSheet({ open, onOpenChange }: StatusSheetProps) {
  const { employee, updateLocation } = useWorkerSelfService();
  const { data: jobs, isLoading: jobsLoading } = useActiveJobs();

  const [selectedStatus, setSelectedStatus] = useState<WorkerStatus>('Off Duty');
  const [selectedJobId, setSelectedJobId] = useState<string>('');
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  // Initialize with current employee status
  useEffect(() => {
    if (employee?.status) {
      setSelectedStatus(employee.status as WorkerStatus);
    }
  }, [employee?.status]);

  const handleClose = () => {
    onOpenChange(false);
  };

  const handleUpdateStatus = async () => {
    if ((selectedStatus === 'On Site' || selectedStatus === 'En Route') && !selectedJobId) {
      toast.error('Please select a job');
      return;
    }

    setIsGettingLocation(true);

    try {
      // Get GPS location
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000,
        });
      });

      const { latitude: lat, longitude: lng, accuracy } = position.coords;

      await updateLocation.mutateAsync({
        lat,
        lng,
        status: selectedStatus,
        jobId: selectedStatus === 'On Site' || selectedStatus === 'En Route' ? selectedJobId : undefined,
        accuracy,
      });

      toast.success(`Status updated to ${selectedStatus}`);
      handleClose();
    } catch (error: unknown) {
      const geoError = error as GeolocationPositionError;
      if (geoError.code === 1) {
        toast.error('Location access denied. Please enable location services.');
      } else if (geoError.code === 2) {
        toast.error('Could not determine your location. Please try again.');
      } else if (geoError.code === 3) {
        toast.error('Location request timed out. Please try again.');
      } else {
        toast.error('Failed to update status');
      }
    } finally {
      setIsGettingLocation(false);
    }
  };

  const isUpdating = updateLocation.isPending || isGettingLocation;
  const showJobSelector = selectedStatus === 'On Site' || selectedStatus === 'En Route';

  if (!employee) return null;

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden sm:max-w-lg sm:mx-auto">
        <div className="flex flex-col h-full bg-background">
          {/* Header */}
          <SheetHeader className="p-4 border-b border-white/[0.06] flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="w-10" />
              <SheetTitle className="text-lg font-semibold flex-1 text-center">
                Update Status
              </SheetTitle>
              <SheetDescription className="sr-only">
                Update your current work status and location
              </SheetDescription>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClose}
                className="h-10 w-10 touch-manipulation"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </SheetHeader>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Employee info */}
            <div className="flex items-center gap-3 p-4 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20">
              <div className="w-12 h-12 rounded-full bg-elec-yellow/20 flex items-center justify-center">
                <span className="text-sm font-semibold text-elec-yellow">
                  {employee.avatar_initials}
                </span>
              </div>
              <div>
                <p className="font-medium text-white">{employee.name}</p>
                <p className="text-sm text-white/60">{employee.role}</p>
              </div>
            </div>

            {/* Status options */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-white/80">Select Status</label>
              <div className="grid grid-cols-2 gap-3">
                {STATUS_OPTIONS.map((option) => {
                  const Icon = option.icon;
                  const isSelected = selectedStatus === option.value;

                  return (
                    <button
                      key={option.value}
                      onClick={() => setSelectedStatus(option.value)}
                      disabled={isUpdating}
                      className={cn(
                        'flex items-center gap-3 p-4 rounded-xl border transition-all touch-manipulation',
                        isSelected
                          ? 'bg-elec-yellow/10 border-elec-yellow/50'
                          : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.06]'
                      )}
                    >
                      <Icon className={cn('h-5 w-5', isSelected ? option.colour : 'text-white/60')} />
                      <span className={cn(
                        'text-sm font-medium',
                        isSelected ? 'text-white' : 'text-white/70'
                      )}>
                        {option.label}
                      </span>
                      {isSelected && (
                        <CheckCircle className="h-4 w-4 text-elec-yellow ml-auto" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Job selector */}
            <AnimatePresence>
              {showJobSelector && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-3 overflow-hidden"
                >
                  <label className="text-sm font-medium text-white/80">Select Job</label>
                  <Select
                    value={selectedJobId}
                    onValueChange={setSelectedJobId}
                    disabled={isUpdating || jobsLoading}
                  >
                    <SelectTrigger className="h-12 bg-white/[0.03] border-white/10 text-white focus:border-elec-yellow focus:ring-elec-yellow">
                      <SelectValue placeholder="Choose a job..." />
                    </SelectTrigger>
                    <SelectContent className="bg-elec-gray border-white/10">
                      {jobs?.map((job) => (
                        <SelectItem
                          key={job.id}
                          value={job.id}
                          className="text-white focus:bg-white/10 focus:text-white"
                        >
                          {job.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {!jobs?.length && !jobsLoading && (
                    <p className="text-sm text-white/50">No active jobs available</p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Location info */}
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
              <div className="flex items-center gap-3 text-white/60">
                <MapPin className="h-4 w-4" />
                <p className="text-sm">
                  Your GPS location will be captured when you update your status
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-white/[0.06] p-4 flex-shrink-0">
            <Button
              onClick={handleUpdateStatus}
              disabled={isUpdating || (showJobSelector && !selectedJobId)}
              className="w-full h-12 bg-elec-yellow hover:bg-elec-yellow/90 text-elec-dark font-semibold touch-manipulation"
            >
              {isUpdating ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <MapPin className="h-5 w-5 mr-2" />
                  Update Status
                </>
              )}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
