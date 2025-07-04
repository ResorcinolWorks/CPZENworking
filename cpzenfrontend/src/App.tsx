import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Progress from "./pages/Progress";
import NotFound from "./pages/NotFound";
import Layout from "./pages/Layout";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ProgressProvider } from "./context/ProgressContext";

const queryClient = new QueryClient();

// Protected Route wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isSignedIn, isLoaded } = useUser();
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-foreground">Loading...</p>
        </div>
      </div>
    );
  }
  if (!isSignedIn) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

// Public Route wrapper (redirects to dashboard if signed in)
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isSignedIn, isLoaded } = useUser();
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-foreground">Loading...</p>
        </div>
      </div>
    );
  }
  if (isSignedIn) {
    return <Navigate to="/dashboard" replace />;
  }
  return <>{children}</>;
};

function App() {
  return (
    <div className="min-h-screen bg-background">
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <ProgressProvider>
            <TooltipProvider>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Layout />}>
                    <Route 
                      index 
                      element={
                        <PublicRoute>
                          <Index />
                        </PublicRoute>
                      } 
                    />
                    <Route 
                      path="dashboard" 
                      element={
                        <ProtectedRoute>
                          <Dashboard />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="progress" 
                      element={
                        <ProtectedRoute>
                          <Progress />
                        </ProtectedRoute>
                      } 
                    />
                    <Route path="*" element={<NotFound />} />
                  </Route>
                </Routes>
              </BrowserRouter>
              <Sonner />
            </TooltipProvider>
          </ProgressProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
