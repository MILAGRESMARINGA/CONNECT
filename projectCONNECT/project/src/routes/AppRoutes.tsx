import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Layouts
import AdminLayout from '../layouts/AdminLayout';
import AuthLayout from '../layouts/AuthLayout';

// Auth Pages
import Login from '../pages/auth/Login';

// Admin Pages
import Dashboard from '../pages/admin/Dashboard';
import Visitors from '../pages/admin/Visitors';
import VisitorDetail from '../pages/admin/VisitorDetail';
import Volunteers from '../pages/admin/Volunteers';
import SmallGroups from '../pages/admin/SmallGroups';
import Reports from '../pages/admin/Reports';
import Scheduling from '../pages/admin/Scheduling';
import VisitManagement from '../pages/admin/VisitManagement';
import Settings from '../pages/admin/Settings';
import VisitorTable from '../pages/admin/VisitorTable';

// Settings Pages
import UserManagement from '../pages/admin/settings/UserManagement';
import NotificationSettings from '../pages/admin/settings/NotificationSettings';
import SecuritySettings from '../pages/admin/settings/SecuritySettings';
import DataManagement from '../pages/admin/settings/DataManagement';
import WorkflowSettings from '../pages/admin/settings/WorkflowSettings';

// Callback Pages
import CallbackDashboard from '../pages/callback/CallbackDashboard';

// Public Pages
import VisitorRegistration from '../pages/public/VisitorRegistration';
import QRScanner from '../pages/public/QRScanner';

// Protected Route Component
const ProtectedRoute = ({ children, requiredPermission = '' }: { children: JSX.Element, requiredPermission?: string }) => {
  const { isAuthenticated, hasPermission } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (requiredPermission && !hasPermission(requiredPermission)) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

const AppRoutes = () => {
  const { isAuthenticated, user } = useAuth();

  // Redirect callback users to their dashboard
  if (isAuthenticated && user?.role === 'callback') {
    return (
      <Routes>
        <Route path="/callback" element={<CallbackDashboard />} />
        <Route path="*" element={<Navigate to="/callback" replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/register" element={<VisitorRegistration />} />
      <Route path="/scan" element={<QRScanner />} />
      
      {/* Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" replace />} />
      </Route>
      
      {/* Admin Routes */}
      <Route element={
        <ProtectedRoute>
          <AdminLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/visitantes" element={<VisitorTable />} />
        <Route path="/visitors" element={<Visitors />} />
        <Route path="/visitors/:id" element={<VisitorDetail />} />
        <Route path="/volunteers" element={
          <ProtectedRoute requiredPermission="manage_volunteers">
            <Volunteers />
          </ProtectedRoute>
        } />
        <Route path="/small-groups" element={<SmallGroups />} />
        <Route path="/visits" element={<VisitManagement />} />
        <Route path="/scheduling" element={<Scheduling />} />
        <Route path="/reports" element={
          <ProtectedRoute requiredPermission="view_dashboard">
            <Reports />
          </ProtectedRoute>
        } />
        
        {/* Settings Routes */}
        <Route path="/settings" element={
          <ProtectedRoute requiredPermission="manage_system">
            <Settings />
          </ProtectedRoute>
        } />
        <Route path="/settings/users" element={
          <ProtectedRoute requiredPermission="manage_system">
            <UserManagement />
          </ProtectedRoute>
        } />
        <Route path="/settings/notifications" element={
          <ProtectedRoute requiredPermission="manage_system">
            <NotificationSettings />
          </ProtectedRoute>
        } />
        <Route path="/settings/security" element={
          <ProtectedRoute requiredPermission="manage_system">
            <SecuritySettings />
          </ProtectedRoute>
        } />
        <Route path="/settings/database" element={
          <ProtectedRoute requiredPermission="manage_system">
            <DataManagement />
          </ProtectedRoute>
        } />
        <Route path="/settings/workflow" element={
          <ProtectedRoute requiredPermission="manage_system">
            <WorkflowSettings />
          </ProtectedRoute>
        } />
      </Route>
      
      {/* Redirect all unknown routes to dashboard when authenticated, otherwise to login */}
      <Route path="*" element={
        isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />
      } />
    </Routes>
  );
};

export default AppRoutes;