import { Routes, Route } from 'react-router';
import PrivateRoute from './PrivateRoute';
import ProtectedRoute from './ProtectedRoute';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import Unauthorized from '@/pages/unauthorized/Unauthorized';
import NotFound from '@/pages/notFound/NotFound';

import Visitor from '@/pages/visitor/Visitor';
import RootLayout from '@/components/RootLayout';
import VisitorMultiStepForm from '@/components/visitor/visitor-multistep-form';
import LoginForm from '@/components/visitor/login-from';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      <Route path="/" element={<Visitor />} />
      <Route
        path="/visitor-form"
        element={
          <RootLayout>
            <VisitorMultiStepForm />
          </RootLayout>
        }
      />

      {/* <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route path="/admin" element={<AdminDashboard />} />
      </Route> */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
