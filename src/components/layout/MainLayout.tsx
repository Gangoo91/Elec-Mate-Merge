
import React from 'react';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-slate-800 text-white p-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">Application</h1>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto px-4">
        <Outlet />
      </main>
      
      <footer className="bg-slate-800 text-white p-4 mt-8">
        <div className="container mx-auto text-center">
          <p>© {new Date().getFullYear()} Application</p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
