
import { useEffect } from 'react';
import './App.css';
import AppRouter from './AppRouter';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import TrainingActivityMonitor from '@/components/apprentice/TrainingActivityMonitor';

function App() {
  // Add any global app initialization here
  
  return (
    <ThemeProvider defaultTheme="dark" storageKey="elec-ui-theme">
      <TrainingActivityMonitor />
      <AppRouter />
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
