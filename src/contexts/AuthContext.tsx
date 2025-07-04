
import React, { createContext, useContext, useState, useEffect } from 'react';
import authData from '../data/auth.json';

interface User {
  codigo: string;
  nombre: string;
  tipo: 'docente' | 'estudiante';
  nivel?: string;
  grado?: string;
  comunidad?: string;
  docente?: string;
}

interface AuthContextType {
  user: User | null;
  login: (codigo: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('yatina-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (codigo: string): boolean => {
    // Buscar en docentes
    const docente = authData.docentes.find(d => d.codigo === codigo);
    if (docente) {
      const userData: User = {
        ...docente,
        tipo: 'docente'
      };
      setUser(userData);
      localStorage.setItem('yatina-user', JSON.stringify(userData));
      return true;
    }

    // Buscar en estudiantes
    const estudiante = authData.estudiantes.find(e => e.codigo === codigo);
    if (estudiante) {
      const userData: User = {
        ...estudiante,
        tipo: 'estudiante'
      };
      setUser(userData);
      localStorage.setItem('yatina-user', JSON.stringify(userData));
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('yatina-user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
