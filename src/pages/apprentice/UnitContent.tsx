import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  BookOpen,
  CheckCircle,
  Shield,
  Users,
  FileText,
  Info,
  Construction,
  AlertTriangle,
  Play,
  LightbulbIcon,
  Cable,
  CircuitBoard,
} from 'lucide-react';
import { getCourseUnitById } from '@/data/courseUnits';
import { SmartBackButton } from '@/components/ui/smart-back-button';
import HealthSafetyUnit from '@/components/apprentice/units/HealthSafetyUnit';
import ElectricalTheoryUnit from '@/components/apprentice/units/ElectricalTheoryUnit';
import InstallationMethodsUnit from '@/components/apprentice/units/InstallationMethodsUnit';
import { useAuth } from '@/contexts/AuthContext';
import { userKey } from '@/lib/userStorage';
import { storageGetSync } from '@/utils/storage';
import { useCourseProgress } from '@/hooks/useCourseProgress';

const UnitContent = () => {
  const { unitId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [completedSections, setCompletedSections] = useState<Record<string, boolean>>({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const { allProgress } = useCourseProgress();

  // Get course unit data
  const unitData = unitId ? getCourseUnitById(unitId) : null;

  // Determine which unit to display based on unitId
  const isHealthSafetyUnit = unitId === 'elec2-01';
  const isElectricalTheoryUnit = unitId === 'elec2-04';
  const isInstallationMethodsUnit = unitId === 'elec2-05a';
  const unitCode = unitData?.code || '';

  // Load completed sections from DB + localStorage quiz status
  useEffect(() => {
    if (!unitId || !unitData?.code) return;
    const code = unitData.code;

    // Quiz status from localStorage (user-scoped)
    const storedQuizStatus = storageGetSync(
      userKey(user?.id, `unit_${code}_quiz_completed`)
    );
    if (storedQuizStatus === 'true') {
      setQuizCompleted(true);
    }

    // Section completion from course_progress DB
    const courseKey = isElectricalTheoryUnit ? 'electrical-theory'
      : isHealthSafetyUnit ? 'health-safety'
      : code;

    const completed: Record<string, boolean> = {};
    allProgress
      .filter((p) => p.course_key === courseKey && p.completed && p.section_key)
      .forEach((p) => {
        completed[p.section_key!] = true;
      });
    setCompletedSections(completed);
  }, [unitId, unitData, user?.id, allProgress, isElectricalTheoryUnit, isHealthSafetyUnit]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 animate-fade-in">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            <span className="gradient-text">{unitData?.title || 'Course Unit'}</span>
          </h1>
          <p className="text-white text-sm sm:text-base">
            {unitData?.code || ''}: {unitData?.description || ''}
          </p>
        </div>
        <SmartBackButton />
      </div>

      {/* Unit content based on type */}
      {isHealthSafetyUnit && (
        <HealthSafetyUnit
          unitCode={unitCode}
          onResourceClick={() => {}}
        />
      )}

      {isElectricalTheoryUnit && (
        <ElectricalTheoryUnit
          unitCode={unitCode}
          onResourceClick={() => {}}
        />
      )}

      {isInstallationMethodsUnit && (
        <InstallationMethodsUnit
          unitCode={unitCode}
          onResourceClick={() => {}}
        />
      )}

      {/* Fallback content if no specific unit component matches */}
      {!isHealthSafetyUnit && !isElectricalTheoryUnit && !isInstallationMethodsUnit && (
        <div className="bg-white/5 border border-elec-yellow/20 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-2">Unit Overview</h2>
          <p className="text-white">
            {unitData?.description ||
              'This unit covers essential knowledge and skills for electrical installation work.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default UnitContent;
