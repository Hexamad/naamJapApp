import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material';

// Pages
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import NaamJap from './pages/NaamJap';
import Progress from './pages/Progress';
import LanguageSelect from './pages/LanguageSelect';
import Register from './pages/Register';
import ProgressDashboard from './pages/ProgressDashboard';  // Add this import

import { 
  Route,
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
  Navigate
} from 'react-router-dom';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={
        localStorage.getItem('token') ? <NaamJap /> : <Navigate to="/login" />
      } />
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="select-language" element={
        localStorage.getItem('token') ? <LanguageSelect /> : <Navigate to="/login" />
      } />
      <Route path="progress" element={
        localStorage.getItem('token') ? <Progress /> : <Navigate to="/login" />
      } />
      <Route path="naamjap" element={
        localStorage.getItem('token') ? <NaamJap /> : <Navigate to="/login" />
      } />
      <Route path="dashboard" element={
        localStorage.getItem('token') ? <ProgressDashboard /> : <Navigate to="/login" />
      } />
    </Route>
  )
);

import { useEffect } from 'react'
import { supabase } from './services/supabase'

function App() {
  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        localStorage.setItem('token', session.access_token)
      } else {
        localStorage.removeItem('token')
      }
    })
  }, [])
  return <RouterProvider router={router} />;
}

export default App;