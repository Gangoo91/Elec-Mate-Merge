
import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="container py-8 flex flex-col items-center justify-center min-h-[50vh]">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="mb-6 text-lg">The page you are looking for doesn't exist or has been moved.</p>
      <Link to="/" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Return to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
