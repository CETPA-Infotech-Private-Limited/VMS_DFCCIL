import React from 'react'
import { Navigate, Outlet } from 'react-router'
import { useAppSelector } from '../app/hooks'
import RootLayout from '@/components/RootLayout'

const PrivateRoute: React.FC = () => {
  // const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const isAuthenticated = true
  return isAuthenticated ? (
    <RootLayout>
      <Outlet />
    </RootLayout>
  ) : (
    <Navigate to="/login" replace />
  )
}

export default PrivateRoute
