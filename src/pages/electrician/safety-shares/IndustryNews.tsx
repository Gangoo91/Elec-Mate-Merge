import { Helmet } from 'react-helmet';
import { Newspaper } from 'lucide-react';
import { SmartBackButton } from '@/components/ui/smart-back-button';
import NewIndustryNewsCard from '@/components/electrician/safety-shares/NewIndustryNewsCard';

const IndustryNews = () => {
  return (
    <div className="bg-gradient-to-br from-elec-dark via-elec-dark/98 to-elec-dark/95 text-white min-h-screen">
      <Helmet>
        <title>Industry Updates - Elec-Mate</title>
        <meta
          name="description"
          content="Latest regulatory updates, compliance information, and industry developments from leading electrical bodies and professional sources"
        />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 py-4 animate-fade-in">
        {/* Page header */}
        <header className="flex items-center gap-3 mb-6">
          <SmartBackButton />
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
            <Newspaper className="h-5 w-5 text-blue-400" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-elec-yellow">
              Industry Updates
            </h1>
            <p className="text-sm text-white">
              Electrical Times &bull; Professional Electrician &bull; ECN
            </p>
          </div>
        </header>

        <NewIndustryNewsCard />
      </div>
    </div>
  );
};

export default IndustryNews;
