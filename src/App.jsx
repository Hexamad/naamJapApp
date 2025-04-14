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
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;