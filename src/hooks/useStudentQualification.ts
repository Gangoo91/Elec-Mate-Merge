/**
 * useStudentQualification
 *
 * Returns the currently authenticated student's active qualification
 * code and name. Joins user_qualification_selections → qualifications.
 *
 * Used by portfolio, diary coach, and requirement browser to filter
 * qualification_requirements per student.
 */

import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface StudentQualification {
  qualificationCode: string | null;
  qualificationName: string | null;
  qualificationId: string | null;
  isLoading: boolean;
}

export function useStudentQualification(): StudentQualification {
  const { user } = useAuth();
  const [qualificationCode, setQualificationCode] = useState<string | null>(null);
  const [qualificationName, setQualificationName] = useState<string | null>(null);
  const [qualificationId, setQualificationId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    let cancelled = false;

    async function load() {
      try {
        const { data, error } = await supabase
          .from('user_qualification_selections')
          .select(
            `
            qualification_id,
            qualification:qualifications(id, code, title)
          `
          )
          .eq('user_id', user!.id)
          .eq('is_active', true)
          .single();

        if (error && error.code !== 'PGRST116') throw error;

        if (!cancelled && data?.qualification) {
          const qual = data.qualification as unknown as {
            id: string;
            code: string;
            title: string;
          };
          setQualificationCode(qual.code);
          setQualificationName(qual.title);
          setQualificationId(qual.id);
        }
      } catch {
        // No active qualification — that's fine
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [user]);

  return { qualificationCode, qualificationName, qualificationId, isLoading };
}
