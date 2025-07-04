
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { BookOpen, LogOut, ArrowLeft } from 'lucide-react';
import InteractiveProjectView from './InteractiveProjectView';

const EstudianteDashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-yatina-bg">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-yatina-orange to-yatina-blue rounded-full flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-montserrat font-bold text-yatina-text">YATIÑA-IA</h1>
                <p className="text-sm text-gray-600">Panel Estudiante</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-yatina-text">{user?.nombre}</p>
                <p className="text-xs text-gray-600">{user?.grado}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Salir
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-montserrat font-bold text-yatina-text mb-2">
            ¡Hola, {user?.nombre?.split(' ')[0]}!
          </h2>
          <p className="text-gray-600">
            Tu profesor te ha asignado un proyecto emocionante. ¡Vamos a aprender construyendo para nuestra comunidad!
          </p>
        </div>

        <InteractiveProjectView user={user} />
      </div>
    </div>
  );
};

export default EstudianteDashboard;
