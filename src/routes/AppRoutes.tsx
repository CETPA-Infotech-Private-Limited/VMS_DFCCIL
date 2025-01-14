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
import { useDispatch, useSelector } from 'react-redux'
import { fetchEmployees, setEmployeesData } from '@/features/visitor/employeeSlice'
import { AppDispatch, RootState } from '@/app/store'
import { useEffect } from 'react'

const AppRoutes = () => {
  const dispatch = useDispatch<AppDispatch>()
  const employees = useSelector((state: RootState) => state.employee.employees)
  const status = useSelector((state: RootState) => state.employee.status)
  const error = useSelector((state: RootState) => state.employee.error)

  const fetchData = async () => {
    const response = await fetch('https://orgsvc.dfccil.com/api/Organization/GetOrganizationHierarchy')
    if (!response.ok) {
      throw new Error('Failed to fetch employees')
    }
    const data = await response.json()
    dispatch(setEmployeesData(data.data))
    console.log('Employees fetched: ', data.data)
  }
  useEffect(() => {
    fetchData()
    console.log('Employees from Redux:', employees)
  }, [dispatch])

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
