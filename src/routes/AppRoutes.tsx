import { Routes, Route } from 'react-router'
import PrivateRoute from './PrivateRoute'
import ProtectedRoute from './ProtectedRoute'
import AdminDashboard from '@/pages/admin/AdminDashboard'
import Dashboards from '@/pages/dashboard/Dashboard'
import Unauthorized from '@/pages/unauthorized/Unauthorized'
import Login from '@/pages/auth/Login/Login'
import NotFound from '@/pages/notFound/NotFound'
import VisitorLog from '@/pages/visitorLog/VisitorLog'
import Visitor from '@/pages/visitor/Visitor'
import RootLayout from '@/components/RootLayout'
import VisitorMultiStepForm from '@/components/visitor/visitor-multistep-form'

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      {/* <Route path="/login" element={<Login />} />
      <Route path="/unauthorized" element={<Unauthorized />} /> */}

      <Route path="/" element={<Visitor />} />
      <Route
        path="/visitor-form"
        element={
          <RootLayout>
            <VisitorMultiStepForm />
          </RootLayout>
        }
      />

      {/* Private Route */}
      {/* <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboards />} />
        <Route path="/visitor-log" element={<VisitorLog />} />
      </Route> */}
      {/* <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route path="/admin" element={<AdminDashboard />} />
      </Route> */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes
