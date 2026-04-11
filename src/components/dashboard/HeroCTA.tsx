import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HeroCTA = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: 0.05 }}
    >
      <button
        onClick={() => navigate('/electrician/inspection-testing/new')}
        className="block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/50 rounded-2xl touch-manipulation"
      >
        <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-elec-yellow/15 via-amber-500/10 to-orange-500/5 border border-elec-yellow/20 active:scale-[0.98] transition-all duration-200">
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-elec-yellow via-amber-400 to-orange-400" />
          <div className="relative z-10 flex items-center gap-3 p-3.5">
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold text-white leading-tight">New Certificate</h3>
              <p className="text-[11px] text-white mt-0.5">Start inspection or test</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-elec-yellow flex items-center justify-center flex-shrink-0 shadow-lg shadow-elec-yellow/20">
              <Plus className="w-4 h-4 text-black" strokeWidth={2.5} />
            </div>
          </div>
        </div>
      </button>
    </motion.div>
  );
};

export default HeroCTA;
