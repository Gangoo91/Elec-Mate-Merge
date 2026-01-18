/**
 * JobVacancies - Premium job search experience
 * Native mobile app feel with swipeable cards, smart search, and saved jobs
 */

import { Helmet } from "react-helmet";
import { PremiumJobsHub } from "@/components/job-vacancies/premium";

// Export interface for compatibility with existing code
export interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string | null;
  type: string;
  description: string;
  external_url: string;
  posted_date: string;
  source: string | null;
  expires_at?: string | null;
  is_remote?: boolean;
  aiMatchScore?: number;
  image_url?: string;
}

interface JobVacanciesProps {
  onBack?: () => void;
}

const JobVacancies = ({ onBack }: JobVacanciesProps) => {
  return (
    <div className="bg-background   animate-fade-in">
      <Helmet>
        <title>UK Electrician Job Vacancies | Mobile Job Search</title>
        <meta name="description" content="Find electrician jobs across the UK with mobile-first search, filters and insights. BS7671-aware." />
        <link rel="canonical" href="/electrician/job-vacancies" />
      </Helmet>

      <PremiumJobsHub />
    </div>
  );
};

export default JobVacancies;
