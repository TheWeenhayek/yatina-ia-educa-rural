
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, Cpu } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  description: string;
  image: string;
  recommendedLevel: string;
  duration: string;
  studentsRequired: string;
  kitRequired: boolean;
}

interface ProjectSuggestionsProps {
  grade: string;
  onSelectProject: (project: Project) => void;
}

const ProjectSuggestions: React.FC<ProjectSuggestionsProps> = ({ grade, onSelectProject }) => {
  const projects: Project[] = [
    {
      id: 'led-circuit',
      name: 'Circuito LED con Resistencia',
      description: 'Introducción a los circuitos básicos mediante la construcción de un circuito simple con LED y resistencia.',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop',
      recommendedLevel: grade,
      duration: '50 minutos',
      studentsRequired: '15-25 estudiantes',
      kitRequired: true
    },
    {
      id: 'traffic-light',
      name: 'Semáforo Inteligente',
      description: 'Crear un semáforo funcional usando LEDs de colores y programación básica con temporizadores.',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop',
      recommendedLevel: grade,
      duration: '90 minutos',
      studentsRequired: '10-20 estudiantes',
      kitRequired: true
    },
    {
      id: 'solar-car',
      name: 'Auto Solar Básico',
      description: 'Construcción de un vehículo simple impulsado por energía solar, ideal para aprender sobre energías renovables.',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop',
      recommendedLevel: grade,
      duration: '120 minutos',
      studentsRequired: '8-15 estudiantes',
      kitRequired: true
    },
    {
      id: 'alarm-system',
      name: 'Sistema de Alarma Casero',
      description: 'Diseño de un sistema de alarma usando sensores y buzzer, perfecto para entender sensores y actuadores.',
      image: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=400&h=300&fit=crop',
      recommendedLevel: grade,
      duration: '75 minutos',
      studentsRequired: '12-20 estudiantes',
      kitRequired: true
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-montserrat font-bold text-yatina-text mb-2">
          Proyectos Sugeridos para {grade}
        </h3>
        <p className="text-gray-600">
          Selecciona el proyecto que mejor se adapte a tus objetivos de clase
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <Card 
            key={project.id}
            className="cursor-pointer card-hover border-2 hover:border-yatina-orange transition-all duration-300"
            onClick={() => onSelectProject(project)}
          >
            <div className="relative">
              <img 
                src={project.image} 
                alt={project.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              {project.kitRequired && (
                <Badge className="absolute top-2 right-2 bg-yatina-blue text-white">
                  <Cpu className="w-3 h-3 mr-1" />
                  Kit Requerido
                </Badge>
              )}
            </div>
            
            <CardHeader>
              <CardTitle className="text-lg text-yatina-text">{project.name}</CardTitle>
              <CardDescription className="text-sm">
                {project.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {project.duration}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {project.studentsRequired}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProjectSuggestions;
