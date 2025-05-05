
import { TimeEntry } from "@/types/time-tracking";

export const useMockEntries = () => {
  // Mock entries for development
  const loadMockEntries = (): TimeEntry[] => {
    const mockEntries: TimeEntry[] = [
      {
        id: "entry-1",
        date: new Date().toISOString().split('T')[0],
        duration: 120, // minutes
        activity: "Wiring Regulations Study",
        notes: "Completed chapters 1-3 of the BS 7671 textbook"
      },
      {
        id: "entry-2",
        date: new Date().toISOString().split('T')[0],
        duration: 90, // minutes
        activity: "Practical Workshop",
        notes: "Practiced ring final circuit installation techniques"
      }
    ];
    
    return mockEntries;
  };
  
  return { loadMockEntries };
};
