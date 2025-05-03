import { useState } from 'react'
import Header from './components/Header';
import Home from './pages/Home';
import CountryPage from './pages/CountryPage';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ProfilePage from './pages/ProfilePage';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");

  return (
    <div>
     
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/country/:code" element={<CountryPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
                <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
      </Routes>

     
     
    </div>
  )
}