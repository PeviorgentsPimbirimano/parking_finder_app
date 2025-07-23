import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import Owner from './pages/Owner';
import Help from './pages/Help';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminLogin from './pages/AdminLogin';
import AdminRoute from './components/AdminRoute';
import DriverDashboard from './dashboards/DriverDashboard';
import OwnerDashboard from './dashboards/OwnerDashboard';
import AdminDashboard from './dashboards/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { supabase } from './supabaseClient';

export default function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [animate, setAnimate] = useState(false);
  const [dots, setDots] = useState('');

  // Animate logo and background transition
  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Change body background after animation
  useEffect(() => {
    document.body.classList.toggle('body-animated', animate);
  }, [animate]);

  // Animate loading dots
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev.length < 3 ? prev + '.' : ''));
    }, 300);
    return () => clearInterval(interval);
  }, []);

  // Session and role management
  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data.user);
        const { data: userData } = await supabase
          .from('users')
          .select('role')
          .eq('id', data.user.id)
          .maybeSingle();

        setRole(userData?.role);
      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    };
    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          setUser(session.user);
          supabase
            .from('users')
            .select('role')
            .eq('id', session.user.id)
            .single()
            .then(({ data }) => setRole(data?.role));
        } else {
          setUser(null);
          setRole(null);
        }
      }
    );

    return () => authListener?.subscription?.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <div className={`logo ${animate ? 'animate' : ''}`}>
          <h1>
            Spot <span>On</span>
          </h1>
        </div>
        <p className="loading-text">Loading{dots}</p>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Owner" element={<Owner />} />
        <Route path="/Help" element={<Help />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/dashboard/driver"
          element={
            <ProtectedRoute user={user} role={role} requiredRole="driver">
              <DriverDashboard user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/owner"
          element={
            <ProtectedRoute user={user} role={role} requiredRole="owner">
              <OwnerDashboard user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/admin"
          element={
            <AdminRoute user={user} role={role}>
              <AdminDashboard user={user} />
            </AdminRoute>
          }
        />

        <Route
          path="*"
          element={
            user && role
              ? <Navigate to={`/dashboard/${role}`} replace />
              : <Navigate to="/Login" replace />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
