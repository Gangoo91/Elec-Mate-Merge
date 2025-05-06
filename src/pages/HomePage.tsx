
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Application</h1>
      <p className="mb-6">This is your application's homepage. Only the EAL electrical installation Level 2 content has been removed from the apprentice area, while preserving the rest of the application structure.</p>
      
      <div className="mt-8">
        <Link to="/apprentice/study">
          <Button variant="default">View Apprentice Area</Button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
