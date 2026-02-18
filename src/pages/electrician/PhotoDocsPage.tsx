import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import PhotoDocumentation from '@/components/electrician-tools/site-safety/PhotoDocumentation';

const PhotoDocsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="-mt-3 sm:-mt-4 md:-mt-6 bg-background pb-24">
      <Helmet>
        <title>Photo Documentation | Elec-Mate</title>
        <meta name="description" content="Project photos and documentation for electrical work." />
      </Helmet>
      <PhotoDocumentation
        onBack={() => navigate('/electrician/business')}
        backLabel="Business Hub"
      />
    </div>
  );
};

export default PhotoDocsPage;
