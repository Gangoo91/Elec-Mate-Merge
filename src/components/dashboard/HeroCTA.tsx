import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HeroCTA = () => {
  const navigate = useNavigate();

  return (
    <motion.button
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: 0.05 }}
      onClick={() => navigate('/electrician/inspection-testing/new')}
      className="w-full h-14 rounded-2xl bg-gradient-to-r from-elec-yellow to-amber-400 text-black font-bold text-base flex items-center justify-center gap-2.5 shadow-lg shadow-elec-yellow/25 active:scale-[0.97] transition-transform touch-manipulation"
    >
      <Plus className="h-5 w-5" strokeWidth={2.5} />
      New Certificate
    </motion.button>
  );
};

export default HeroCTA;
