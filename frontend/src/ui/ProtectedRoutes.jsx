import React, { useEffect } from 'react'
import useAuthStore from '../store/AuthStore'
import { Navigate, useNavigate } from 'react-router-dom'

export default function ProtectedRoutes({ children }) {
  const { isAuthenticated } = useAuthStore()

  const navigate = useNavigate();

  useEffect(() => {
  if (!isAuthenticated) {
      navigate("/login");
    }

  }, [isAuthenticated,navigate])

  

  return children
}
