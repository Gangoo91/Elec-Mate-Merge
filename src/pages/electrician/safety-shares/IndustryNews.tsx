import { Helmet } from "react-helmet";
import NewIndustryNewsCard from "@/components/electrician/safety-shares/NewIndustryNewsCard";

const IndustryNews = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-elec-dark via-elec-dark/98 to-elec-dark/95 text-white">
      <Helmet>
        <title>Industry Updates - Elec-Mate</title>
        <meta name="description" content="Latest regulatory updates, compliance information, and industry developments from leading electrical bodies and professional sources" />
        <meta name="keywords" content="electrical news, BS 7671, regulations, compliance, industry updates, electrical safety" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <NewIndustryNewsCard />
      </div>
    </div>
  );
};

export default IndustryNews;
