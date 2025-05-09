
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/contexts/AuthContext";
import { NotificationProvider } from "@/components/notifications/NotificationProvider";
import { AppRoutes } from "./routes";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <NotificationProvider>
          <Router>
            <Routes>
              <AppRoutes />
            </Routes>
            <Toaster />
          </Router>
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
