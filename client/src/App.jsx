import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* We will add Home and Dashboard routes tomorrow! */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;