
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="elecforce-theme">
        <AppRouter />
        <Toaster />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
