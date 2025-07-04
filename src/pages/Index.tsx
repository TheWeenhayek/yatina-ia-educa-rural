
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import Login from '../components/Login';
import DocenteDashboard from '../components/DocenteDashboard';
import EstudianteDashboard from '../components/EstudianteDashboard';

const Index = () => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Login />;
  }

  if (user?.tipo === 'docente') {
    return <DocenteDashboard />;
  }

  if (user?.tipo === 'estudiante') {
    return <EstudianteDashboard />;
  }

  return <Login />;
};

export default Index;
