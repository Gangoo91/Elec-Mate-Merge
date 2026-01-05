// Photo Service - Centralised photo fetching functions
import { jobPhotos, progressLogs, JobPhoto } from "@/data/employerMockData";

/**
 * Get photos by their IDs
 */
export function getPhotosByIds(photoIds: string[]): JobPhoto[] {
  return jobPhotos.filter(photo => photoIds.includes(photo.id));
}

/**
 * Get photos linked to a specific progress log
 */
export function getPhotosByProgressLogId(logId: string): JobPhoto[] {
  // First try by progressLogId field
  const byProgressLogId = jobPhotos.filter(photo => photo.progressLogId === logId);
  
  // If no direct links, fall back to photoIds in the progress log
  if (byProgressLogId.length === 0) {
    const log = progressLogs.find(l => l.id === logId);
    if (log?.photoIds) {
      return getPhotosByIds(log.photoIds);
    }
  }
  
  return byProgressLogId;
}

/**
 * Get all photos for a job
 */
export function getPhotosByJobId(jobId: string): JobPhoto[] {
  return jobPhotos.filter(photo => photo.jobId === jobId);
}

/**
 * Get the progress log associated with a photo (if any)
 */
export function getProgressLogForPhoto(photoId: string) {
  const photo = jobPhotos.find(p => p.id === photoId);
  if (photo?.progressLogId) {
    return progressLogs.find(log => log.id === photo.progressLogId);
  }
  
  // Also check by photoIds in logs
  return progressLogs.find(log => log.photoIds?.includes(photoId));
}

/**
 * Check if a photo has location data
 */
export function photoHasLocation(photo: JobPhoto): boolean {
  return !!(photo.location?.lat && photo.location?.lng);
}

/**
 * Get photos with location data from a list of photos
 */
export function getPhotosWithLocation(photos: JobPhoto[]): JobPhoto[] {
  return photos.filter(photoHasLocation);
}
