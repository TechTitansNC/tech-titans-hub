import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "./components/Navbar.tsx";
import Index from "./pages/Index.tsx";
import TeamPage from "./pages/TeamPage.tsx";
import TeamPageFTC from "./pages/TeamPageFTC.tsx";
import NewsPage from "./pages/NewsPage.tsx";
import TeamStatus from "./pages/TeamStatus.tsx";
import { FirstPitUrl } from 'react';
import { useNavigate } from 'react-router-dom';

const OpenGoogleInNewWindow = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Open First PIT in a new tab/window
    window.open('https://www.first-pit.com', '_blank', 'noopener,noreferrer');
    
    // Send the user's current tab back to the home page (or previous page)
    navigate('/'); 
  }, [navigate]);

return null; // Don't render anything
};
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/team-ftc" element={<TeamPageFTC />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/firstPit" element={<FirstPitUrl />} />
          <Route path="/team-status" element={<TeamStatus />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
