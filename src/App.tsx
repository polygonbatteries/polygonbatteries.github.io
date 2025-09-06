import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import OrderPage from "./pages/OrderPage";
import BatteryFinder from "./pages/BatteryFinder";
import OEMPortal from "./pages/OEMPortal";
import Contact from "./pages/Contact";
import BatteryDashboard from "./pages/BatteryDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/order/:type" element={<OrderPage />} />
          <Route path="/battery-finder" element={<BatteryFinder />} />
          <Route path="/oem-portal" element={<OEMPortal />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<BatteryDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
