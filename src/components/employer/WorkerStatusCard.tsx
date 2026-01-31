import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MapPin, Building2, Navigation, Clock, Loader2, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMyEmployeeRecord, useUpdateOwnLocation } from '@/hooks/useWorkerLocations';
import { useActiveJobs } from '@/hooks/useJobs';
import { WorkerStatus } from '@/services/locationService';
import { toast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

const STATUS_OPTIONS: { value: WorkerStatus; label: string; icon: typeof MapPin; colour: string }[] = [
  { value: 'Office', label: 'Office', icon: Building2, colour: 'text-purple-400' },
  { value: 'En Route', label: 'En Route', icon: Navigation, colour: 'text-amber-400' },
  { value: 'On Site', label: 'On Site', icon: MapPin, colour: 'text-green-400' },
  { value: 'Off Duty', label: 'Off Duty', icon: Clock, colour: 'text-gray-400' },
];

export function WorkerStatusCard() {
  const { data: employee, isLoading: employeeLoading } = useMyEmployeeRecord();
  const { data: jobs, isLoading: jobsLoading } = useActiveJobs();
  const updateLocation = useUpdateOwnLocation();

  const [selectedStatus, setSelectedStatus] = useState<WorkerStatus>('Off Duty');
  const [selectedJobId, setSelectedJobId] = useState<string>('');
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  // If not linked to an employee record, don't show the card
  if (employeeLoading) {
    return (
      <Card className="bg-elec-gray border-white/10">
        <CardContent className="p-6 flex items-center justify-center">
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  if (!employee) {
    // No employee record found - don't show the card
    return null;
  }

  const handleUpdateStatus = async () => {
    // Validate: if On Site or En Route, require a job selection
    if ((selectedStatus === 'On Site' || selectedStatus === 'En Route') && !selectedJobId) {
      toast({
        title: 'Select a Job',
        description: 'Please select which job you are heading to or working on.',
        variant: 'destructive',
      });
      return;
    }

    setIsGettingLocation(true);

    try {
      // Get current GPS position
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000,
        });
      });

      const { latitude: lat, longitude: lng, accuracy } = position.coords;

      // Update location
      const result = await updateLocation.mutateAsync({
        lat,
        lng,
        status: selectedStatus,
        jobId: selectedStatus === 'On Site' || selectedStatus === 'En Route' ? selectedJobId : undefined,
        accuracy,
      });

      if (result) {
        toast({
          title: 'Status Updated',
          description: `You are now ${selectedStatus}${selectedJobId ? ` - ${jobs?.find(j => j.id === selectedJobId)?.title}` : ''}`,
          variant: 'success',
        });
      } else {
        throw new Error('Failed to update location');
      }
    } catch (error: any) {
      console.error('Failed to update status:', error);

      if (error.code === 1) {
        toast({
          title: 'Location Access Denied',
          description: 'Please enable location services to update your status.',
          variant: 'destructive',
        });
      } else if (error.code === 2) {
        toast({
          title: 'Location Unavailable',
          description: 'Could not determine your location. Please try again.',
          variant: 'destructive',
        });
      } else if (error.code === 3) {
        toast({
          title: 'Location Timeout',
          description: 'Getting your location took too long. Please try again.',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Update Failed',
          description: 'Could not update your status. Please try again.',
          variant: 'destructive',
        });
      }
    } finally {
      setIsGettingLocation(false);
    }
  };

  const isUpdating = updateLocation.isPending || isGettingLocation;
  const showJobSelector = selectedStatus === 'On Site' || selectedStatus === 'En Route';

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="bg-elec-gray border-white/10 overflow-hidden">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <MapPin className="h-4 w-4 text-elec-yellow" />
            My Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Status buttons */}
          <div className="grid grid-cols-2 gap-2">
            {STATUS_OPTIONS.map((option) => {
              const Icon = option.icon;
              const isSelected = selectedStatus === option.value;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setSelectedStatus(option.value)}
                  className={cn(
                    'flex items-center gap-2 p-3 rounded-xl border transition-all touch-manipulation',
                    isSelected
                      ? 'bg-elec-yellow/10 border-elec-yellow/50 text-elec-yellow'
                      : 'bg-white/[0.03] border-white/10 text-white/70 hover:bg-white/[0.06] active:bg-white/[0.02]'
                  )}
                  disabled={isUpdating}
                >
                  <Icon className={cn('h-4 w-4', isSelected ? option.colour : 'text-current')} />
                  <span className="text-sm font-medium">{option.label}</span>
                  {isSelected && (
                    <CheckCircle className="h-3.5 w-3.5 ml-auto text-elec-yellow" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Job selector - shown when On Site or En Route */}
          {showJobSelector && (
            <div className="space-y-2">
              <label className="text-xs text-white/60 font-medium">Select Job</label>
              <Select
                value={selectedJobId}
                onValueChange={setSelectedJobId}
                disabled={isUpdating || jobsLoading}
              >
                <SelectTrigger className="h-11 bg-white/[0.03] border-white/10 text-white focus:border-elec-yellow focus:ring-elec-yellow">
                  <SelectValue placeholder="Choose a job..." />
                </SelectTrigger>
                <SelectContent className="bg-elec-gray border-white/10">
                  {jobs?.map((job) => (
                    <SelectItem
                      key={job.id}
                      value={job.id}
                      className="text-white focus:bg-white/10 focus:text-white"
                    >
                      <div className="flex flex-col items-start">
                        <span className="font-medium">{job.title}</span>
                        <span className="text-xs text-white/50">{job.client}</span>
                      </div>
                    </SelectItem>
                  ))}
                  {(!jobs || jobs.length === 0) && (
                    <div className="px-3 py-2 text-sm text-white/50">No active jobs</div>
                  )}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Update button */}
          <Button
            onClick={handleUpdateStatus}
            disabled={isUpdating || (showJobSelector && !selectedJobId)}
            className="w-full h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-medium touch-manipulation"
          >
            {isUpdating ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Updating...
              </>
            ) : (
              <>
                <MapPin className="h-4 w-4 mr-2" />
                Update Status
              </>
            )}
          </Button>

          {/* Current employee info */}
          <div className="pt-2 border-t border-white/10">
            <div className="flex items-center gap-2 text-xs text-white/40">
              <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-medium text-white/70">
                {employee.avatar_initials}
              </div>
              <span>Logged in as {employee.name}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
