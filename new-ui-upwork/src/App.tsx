import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import JobsPage from "./pages/admin/JobsPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UsersPage from "./pages/admin/UsersPage";
import ReportsPage from "./pages/admin/ReportsPage";
import SettingsPage from "./pages/admin/SettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();



const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <DashboardLayout>
              <JobsPage />
            </DashboardLayout>
          } />
          <Route path="/dashboard" element={
            <DashboardLayout>
              <AdminDashboard />
            </DashboardLayout>
          } />
          <Route path="/jobs" element={
            <DashboardLayout>
              <JobsPage />
            </DashboardLayout>
          } />
          <Route path="/users" element={
            <DashboardLayout>
              <UsersPage />
            </DashboardLayout>
          } />
          <Route path="/reports" element={
            <DashboardLayout>
              <ReportsPage />
            </DashboardLayout>
          } />
          <Route path="/settings" element={
            <DashboardLayout>
              <SettingsPage />
            </DashboardLayout>
          } />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
