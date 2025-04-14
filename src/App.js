import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import NaamJap from './pages/NaamJap';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NaamJap />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/select-language" element={<NaamJap />} />
      </Routes>
    </Router>
  );
}

export default App;