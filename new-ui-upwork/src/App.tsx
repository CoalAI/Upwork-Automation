// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { DashboardLayout } from "@/components/DashboardLayout";
// import JobsPage from "./pages/admin/JobsPage";
// import AdminDashboard from "./pages/admin/AdminDashboard";
// import UsersPage from "./pages/admin/UsersPage";
// import ReportsPage from "./pages/admin/ReportsPage";
// import SettingsPage from "./pages/admin/SettingsPage";
// import NotFound from "./pages/NotFound";

// const queryClient = new QueryClient();



// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <Toaster />
//       <Sonner />
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={
//             <DashboardLayout>
//               <JobsPage />
//             </DashboardLayout>
//           } />
//           <Route path="/dashboard" element={
//             <DashboardLayout>
//               <AdminDashboard />
//             </DashboardLayout>
//           } />
//           <Route path="/jobs" element={
//             <DashboardLayout>
//               <JobsPage />
//             </DashboardLayout>
//           } />
//           <Route path="/users" element={
//             <DashboardLayout>
//               <UsersPage />
//             </DashboardLayout>
//           } />
//           <Route path="/reports" element={
//             <DashboardLayout>
//               <ReportsPage />
//             </DashboardLayout>
//           } />
//           <Route path="/settings" element={
//             <DashboardLayout>
//               <SettingsPage />
//             </DashboardLayout>
//           } />
          
//           {/* Catch-all route */}
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </BrowserRouter>
//     </TooltipProvider>
//   </QueryClientProvider>
// );

// export default App;
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
import RequireAuth from "@/components/RequireAuth";
import Login from "./pages/admin/Login";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public route */}
<Route
  path="/login"
  element={
    <Login
      onLogin={(token: string) => {
        console.log("Logged in with token:", token);
        window.location.href = "/"; // redirect to home/dashboard after login
      }}
    />
  }
/>

          {/* Protected routes */}
          <Route
            path="/"
            element={
              <RequireAuth>
                <DashboardLayout>
                  <JobsPage />
                </DashboardLayout>
              </RequireAuth>
            }
          />
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <DashboardLayout>
                  <AdminDashboard />
                </DashboardLayout>
              </RequireAuth>
            }
          />
          <Route
            path="/jobs"
            element={
              <RequireAuth>
                <DashboardLayout>
                  <JobsPage />
                </DashboardLayout>
              </RequireAuth>
            }
          />
          <Route
            path="/users"
            element={
              <RequireAuth>
                <DashboardLayout>
                  <UsersPage />
                </DashboardLayout>
              </RequireAuth>
            }
          />
          <Route
            path="/reports"
            element={
              <RequireAuth>
                <DashboardLayout>
                  <ReportsPage />
                </DashboardLayout>
              </RequireAuth>
            }
          />
          <Route
            path="/settings"
            element={
              <RequireAuth>
                <DashboardLayout>
                  <SettingsPage />
                </DashboardLayout>
              </RequireAuth>
            }
          />

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
