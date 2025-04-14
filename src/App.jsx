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
  RouterProvider 
} from 'react-router-dom';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<NaamJap />} />
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="select-language" element={<NaamJap />} />
      <Route path="progress" element={<Progress />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;