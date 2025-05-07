
import { TimeEntry } from "./time-tracking";

export interface TrainingEvidence {
  id: string;
  userId: string;
  timeEntryId: string;
  evidenceType: 'screenshot' | 'activity-log' | 'automated';
  evidenceData: {
    activeTime: number;
    inactiveTime?: number;
    activityLog?: {
      timestamp: number;
      action: string;
    }[];
    screenshotUrl?: string;
  };
  createdAt: string;
}

export interface TrainingSession {
  id: string;
  startTime: number;
  endTime?: number;
  duration?: number;
  activityType: string;
  isActive: boolean;
  lastActivity: number;
  activityLog: {
    timestamp: number;
    action: string;
  }[];
}
