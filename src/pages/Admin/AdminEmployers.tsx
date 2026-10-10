/**
 * Employers. On top, ELE-1836: which firms are actually using the Employer
 * Hub (liveness, workflows used, never-done, the aha metric). Below, the
 * employer scheme (30% apprentice / 40% electrician company codes) on the same
 * page as Colleges: conversations from the tracker, take-up from Stripe,
 * owner/manager accounts from Bulk create.
 */
import { SchemePage } from '@/pages/Admin/AdminColleges';
import { PageFrame } from '@/components/admin/editorial';
import { EmployerLiveness } from '@/components/admin/employers/EmployerLiveness';

export default function AdminEmployers() {
  return (
    <>
      <PageFrame className="pb-8 sm:pb-10">
        <EmployerLiveness />
      </PageFrame>
      <SchemePage scheme="employer" />
    </>
  );
}
