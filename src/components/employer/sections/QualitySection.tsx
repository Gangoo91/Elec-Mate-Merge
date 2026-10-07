import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { LoadingBlocks, PageFrame } from '@/components/employer/editorial';

/**
 * Quality & Snags was a second view of job_issues (Snag/Defect only) with its
 * own create flow. ELE-1967 merged it into Issues: this route now forwards to
 * Issues on the Snags & defects tab, keeping ?job= and ?issue= so old links
 * and bell notifications still land on the right thing.
 */
export function QualitySection() {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const next = new URLSearchParams(searchParams);
    next.set('section', 'issues');
    if (!next.get('type')) next.set('type', 'snags');
    setSearchParams(next, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageFrame>
      <LoadingBlocks />
    </PageFrame>
  );
}

export default QualitySection;
