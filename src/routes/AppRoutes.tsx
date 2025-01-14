import { Routes, Route } from 'react-router';
import PrivateRoute from './PrivateRoute';
import ProtectedRoute from './ProtectedRoute';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import Unauthorized from '@/pages/unauthorized/Unauthorized';
import NotFound from '@/pages/notFound/NotFound';

import Visitor from '@/pages/visitor/Visitor';
import RootLayout from '@/components/RootLayout';
import VisitorMultiStepForm from '@/components/visitor/visitor-multistep-form';
import { setEmployeesData } from '@/features/employee/employeeSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/store';
import LoginForm from '@/components/visitor/login-from';
import Home from '@/pages/home/Home';
import AppLayout from '@/components/app-layout';
import PendingMeeting from '@/pages/pending-meeting/PendingMeeting';
import UpcommingMeeting from '@/pages/upcoming-meeting';

const AppRoutes = () => {
  const dispatch = useDispatch<AppDispatch>();
  const employees = useSelector((state: RootState) => state.employee.employees);

  const fetchData = async () => {
    console.log('inside');
    const response = await fetch('https://orgsvc.dfccil.com/api/Organization/GetOrganizationHierarchy');
    if (!response.ok) {
      throw new Error('Failed to fetch employees');
    }
    const data = await response.json();
    dispatch(setEmployeesData(data.data));
    console.log('Employees fetched: ', data.data);
  };
  useEffect(() => {
    if (employees.length <= 0) {
      fetchData();
    }

    console.log('Employees from Redux:', employees);
  }, [dispatch]);
  return (
    <Routes>
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route
        path="/home"
        element={
          <AppLayout>
            <Home />
          </AppLayout>
        }
      />
      <Route
        path="/pending-meeting"
        element={
          <AppLayout>
            <PendingMeeting />
          </AppLayout>
        }
      />
      <Route
        path="/upcomming-meeting"
        element={
          <AppLayout>
            <UpcommingMeeting />
          </AppLayout>
        }
      />
      <Route
        path="/contact-list"
        element={
          <AppLayout>
            <PendingMeeting />
          </AppLayout>
        }
      />
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
