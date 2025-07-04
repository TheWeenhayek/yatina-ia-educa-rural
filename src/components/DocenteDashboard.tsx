
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Users, LogOut, Cpu } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import ProjectSuggestions from './ProjectSuggestions';
import DetailedLessonPlan from './DetailedLessonPlan';

const DocenteDashboard = () => {
  const { user, logout } = useAuth();
  const [selectedGrade, setSelectedGrade] = useState<string>('');
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [generatedPlan, setGeneratedPlan] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [currentView, setCurrentView] = useState<'grades' | 'projects' | 'plan'>('grades');

  const grades = [
    '1ro Secundaria', '2do Secundaria', '3ro Secundaria',
    '4to Secundaria', '5to Secundaria', '6to Secundaria'
  ];

  const selectGrade = (grade: string) => {
    setSelectedGrade(grade);
    setCurrentView('projects');
    toast({
      title: "Grado seleccionado",
      description: `Mostrando proyectos para ${grade}`,
    });
  };

  const selectProject = (project: any) => {
    setLoading(true);
    setSelectedProject(project);
    
    // Simular generación de plan de clase por IA
    setTimeout(() => {
      setLoading(false);
      setCurrentView('plan');
      toast({
        title: "¡Plan de clase generado!",
        description: `Plan detallado creado para: ${project.name}`,
      });
    }, 2500);
  };

  const assignToClass = (plan: any) => {
    toast({
      title: "¡Clase asignada exitosamente!",
      description: "El plan de clase ha sido asignado a tus estudiantes",
    });
    // Resetear al inicio
    setCurrentView('grades');
    setSelectedGrade('');
    setSelectedProject(null);
    setGeneratedPlan(null);
  };

  const goBack = () => {
    if (currentView === 'plan') {
      setCurrentView('projects');
    } else if (currentView === 'projects') {
      setCurrentView('grades');
      setSelectedGrade('');
    }
  };

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
                <p className="text-sm text-gray-600">Panel Docente</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-yatina-text">{user?.nombre}</p>
                <p className="text-xs text-gray-600">{user?.comunidad}</p>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'grades' && (
          <div className="space-y-8">
            {/* Welcome Section */}
            <div className="text-center">
              <h2 className="text-3xl font-montserrat font-bold text-yatina-text mb-4">
                ¡Bienvenido, {user?.nombre?.split(' ')[1]}!
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Selecciona el grado para el cual quieres generar contenido educativo. 
                La IA creará automáticamente proyectos y planes de clase adaptados al nivel.
              </p>
            </div>

            {/* Grade Selection */}
            <div>
              <h3 className="text-xl font-montserrat font-semibold text-yatina-text mb-6 text-center">
                Selecciona el Grado
              </h3>
              <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                {grades.map((grade) => (
                  <Card 
                    key={grade} 
                    className="cursor-pointer card-hover border-2 hover:border-yatina-orange"
                    onClick={() => selectGrade(grade)}
                  >
                    <CardHeader className="text-center pb-2">
                      <div className="w-12 h-12 bg-yatina-blue/10 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Users className="w-6 h-6 text-yatina-blue" />
                      </div>
                      <CardTitle className="text-lg">{grade}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center pt-0">
                      <p className="text-sm text-gray-600">
                        Ver proyectos disponibles
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {currentView === 'projects' && (
          <ProjectSuggestions 
            grade={selectedGrade} 
            onSelectProject={selectProject}
          />
        )}

        {loading && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gradient-to-r from-yatina-orange to-yatina-blue rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Cpu className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-montserrat font-semibold text-yatina-text mb-2">
              Generando plan de clase con IA...
            </h3>
            <p className="text-gray-600">
              Creando cronograma detallado, materiales y recursos para: {selectedProject?.name}
            </p>
          </div>
        )}

        {currentView === 'plan' && selectedProject && (
          <DetailedLessonPlan
            project={selectedProject}
            onAssignToClass={assignToClass}
            onBack={goBack}
          />
        )}
      </div>
    </div>
  );
};

export default DocenteDashboard;
