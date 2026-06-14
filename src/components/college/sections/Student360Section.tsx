/**
 * Student360Section — dashboard-tab entry point for the learner profile.
 *
 * The canonical learner profile is Student360Page (route /college/students/:id),
 * which leads with Next-Best-Action + Risk. This section used to duplicate a
 * weaker EPA/KPI-led profile; it now simply hands off to the canonical page so
 * there is a single source of truth. When a studentId is present we redirect;
 * otherwise we render a slim prompt so the tab still mounts cleanly.
 */

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { CollegeSection } from '@/pages/college/CollegeDashboard';
import {
  PageFrame,
  EmptyState,
  itemVariants,
  containerVariants,
} from '@/components/college/primitives';

interface Student360SectionProps {
  studentId: string;
  onNavigate: (section: CollegeSection) => void;
  onBack: () => void;
}

export function Student360Section({ studentId, onBack }: Student360SectionProps) {
  const navigate = useNavigate();

  // Hand off to the canonical learner profile. Replace history so Back from
  // Student360Page returns to wherever the dashboard came from, not this shim.
  useEffect(() => {
    if (studentId) {
      navigate(`/college/students/${studentId}`, { replace: true });
    }
  }, [studentId, navigate]);

  if (studentId) {
    // Brief placeholder while the redirect fires.
    return (
      <PageFrame>
        <div className="text-[13px] text-white/70">Opening learner profile…</div>
      </PageFrame>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mx-auto max-w-7xl space-y-6 sm:space-y-10 pb-12"
    >
      <motion.div variants={itemVariants}>
        <button
          onClick={onBack}
          className="text-[12.5px] font-medium text-white hover:text-white/85 transition-colors touch-manipulation"
        >
          ← Back
        </button>
      </motion.div>

      <motion.div variants={itemVariants}>
        <EmptyState
          title="No learner selected"
          description="Choose a learner from the list to open their full profile — risk, next best action, ILP, attendance, grades, OTJ, EPA and portfolio in one place."
          action="← Back to learners"
          onAction={onBack}
        />
      </motion.div>
    </motion.div>
  );
}
