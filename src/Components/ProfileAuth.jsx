import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

export default function ProfileAuth() {
  const user = useSelector((state) => state.user.User)
  return (
    !user ? <Navigate to="/signIn" /> : <Outlet />
  )
}
