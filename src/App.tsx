import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import TeamPage from "./pages/TeamPage.tsx";
import NewsPage from "./pages/NewsPage.tsx";
import LeaderboardPage from "./pages/LeaderboardPage.tsx";
import SurveyPage from "./pages/SurveyPage.tsx";

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
          <Route path="/news" element={<NewsPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/survey" element={<SurveyPage />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
