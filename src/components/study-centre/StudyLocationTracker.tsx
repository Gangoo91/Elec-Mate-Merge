/**
 * StudyLocationTracker
 *
 * A simple component that tracks the user's current study location.
 * Drop this into any page to automatically track when users visit.
 *
 * Usage:
 *   <StudyLocationTracker title="BS7671 Module 4 - Protection" />
 *
 * Or auto-detect from document title:
 *   <StudyLocationTracker />
 */

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLastStudyLocation } from '@/hooks/useLastStudyLocation';

interface StudyLocationTrackerProps {
  /** The title to display in "Continue where you left off" - if not provided, uses document title */
  title?: string;
}

export const StudyLocationTracker: React.FC<StudyLocationTrackerProps> = ({ title }) => {
  const location = useLocation();
  const { updateLastLocation } = useLastStudyLocation();

  useEffect(() => {
    // Use provided title, or try to get from document title, or use generic fallback
    const trackingTitle = title || document.title?.split('|')[0]?.trim() || 'Learning';

    // Update the last study location
    updateLastLocation(location.pathname, trackingTitle);
  }, [location.pathname, title, updateLastLocation]);

  // This component renders nothing - it just tracks
  return null;
};

export default StudyLocationTracker;
