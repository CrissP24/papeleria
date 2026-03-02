import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import LandingPage from "./pages/LandingPage";
import PublicCatalogPage from "./pages/PublicCatalogPage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import VendedorPage from "./pages/VendedorPage";
import CatalogoPage from "./pages/CatalogoPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/productos" element={<PublicCatalogPage />} />
            <Route path="/login" element={<LoginPage />} />
            
            {/* Protected routes */}
            <Route path="/admin/*" element={<ProtectedRoute allowedRoles={['admin']}><AdminPage /></ProtectedRoute>} />
            <Route path="/vendedor/*" element={<ProtectedRoute allowedRoles={['vendedor']}><VendedorPage /></ProtectedRoute>} />
            <Route path="/catalogo" element={<ProtectedRoute allowedRoles={['comprador']}><CatalogoPage /></ProtectedRoute>} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
