
import React from 'react';
import { useParams } from 'react-router-dom';

export const Index: React.FC = () => {
  const { courseSlug } = useParams();

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-4">Course Content</h1>
      <p className="mb-6">
        We're currently rebuilding the course content for {courseSlug}.
        The content will be available soon.
      </p>
      <div className="p-4 bg-yellow-100/10 border border-yellow-300/30 rounded-md">
        <p className="text-yellow-300">
          Note: The previous course content has been removed as part of a site-wide update.
          New content is being developed and will be available shortly.
        </p>
      </div>
    </div>
  );
};
