
import { useEffect } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './AppRouter';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import TrainingActivityMonitor from '@/components/apprentice/TrainingActivityMonitor';
import { AuthProvider } from '@/contexts/AuthContext';

function App() {
  // Add any global app initialization here
  
  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="dark" storageKey="elec-ui-theme">
        <BrowserRouter>
          <TrainingActivityMonitor />
          <AppRouter />
          <Toaster />
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
