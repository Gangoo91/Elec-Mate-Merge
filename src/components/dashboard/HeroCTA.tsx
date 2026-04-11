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
        <div className="group relative overflow-hidden card-surface-interactive active:scale-[0.98] transition-all duration-200">
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-elec-yellow via-amber-400 to-orange-400 opacity-60 group-hover:opacity-100 transition-opacity duration-200" />
          <div className="relative z-10 flex items-center gap-3.5 p-4">
            <div className="flex-1 min-w-0">
              <h3 className="text-[15px] font-semibold text-white leading-tight group-hover:text-elec-yellow transition-colors">
                New Certificate
              </h3>
              <p className="mt-1 text-[12px] text-white leading-tight">
                Start a new inspection or test
              </p>
            </div>
            <div className="w-8 h-8 rounded-full bg-elec-yellow flex items-center justify-center flex-shrink-0">
              <Plus className="w-4 h-4 text-black" strokeWidth={2.5} />
            </div>
          </div>
        </div>
      </button>
    </motion.div>
  );
};

export default HeroCTA;
