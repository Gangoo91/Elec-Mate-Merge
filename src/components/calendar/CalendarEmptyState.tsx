import { CalendarDays, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface CalendarEmptyStateProps {
  onCreateEvent: () => void;
}

const CalendarEmptyState = ({ onCreateEvent }: CalendarEmptyStateProps) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="flex flex-col items-center justify-center py-16 px-6 text-center"
  >
    <div className="p-5 rounded-2xl bg-blue-400/10 border border-blue-400/20 mb-5">
      <CalendarDays className="h-12 w-12 text-blue-400" />
    </div>
    <h3 className="text-lg font-bold text-white mb-1">No events yet</h3>
    <p className="text-sm text-white mb-6 max-w-[260px]">
      Add your first event to start organising your schedule
    </p>
    <Button
      onClick={onCreateEvent}
      className="h-12 px-8 bg-elec-yellow text-black text-base font-bold rounded-xl touch-manipulation active:scale-[0.98]"
    >
      <Plus className="h-5 w-5 mr-2" />
      Create Event
    </Button>
  </motion.div>
);

export default CalendarEmptyState;
