
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Create a function to track resource clicks
const handleResourceClick = (type: string) => {
  console.log(`Resource clicked: ${type}`);
};

// Render the App with required props
createRoot(document.getElementById("root")!).render(
  <App />
);
