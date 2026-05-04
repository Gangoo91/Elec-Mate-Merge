import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TheorySections from './components/TheorySections';
import { useAuth } from '@/contexts/AuthContext';
import { userKey } from '@/lib/userStorage';
import { storageGetSync } from '@/utils/storage';

interface ElectricalTheoryUnitProps {
  unitCode: string;
  onResourceClick: (type: string) => void;
}

const ElectricalTheoryUnit = ({ unitCode, onResourceClick }: ElectricalTheoryUnitProps) => {
  const [quizCompleted, setQuizCompleted] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  // Load completion status (user-scoped)
  useEffect(() => {
    const storedQuizStatus = storageGetSync(
      userKey(user?.id, `unit_${unitCode}_quiz_completed`)
    );
    if (storedQuizStatus === 'true') {
      setQuizCompleted(true);
    }
  }, [unitCode, user?.id]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h2 className="text-[20px] sm:text-[22px] font-semibold text-white leading-tight">
          Electrical Installation Theory and Technology
        </h2>
        <p className="text-[14px] text-white/70 leading-relaxed">
          This unit covers the essential theories, regulations, and technical information related to
          electrical installations. Select a section below to begin learning.
        </p>
      </div>

      <div className="space-y-4">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Study sections
        </span>

        <TheorySections
          unitCode={unitCode}
          quizCompleted={quizCompleted}
          onResourceClick={onResourceClick}
        />
      </div>
    </div>
  );
};

export default ElectricalTheoryUnit;
