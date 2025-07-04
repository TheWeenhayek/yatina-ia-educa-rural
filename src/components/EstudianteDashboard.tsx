
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Camera, CheckCircle, LogOut, Lightbulb, AlertTriangle, Play } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const EstudianteDashboard = () => {
  const { user, logout } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [showUpload, setShowUpload] = useState(false);

  // Contenido del proyecto para estudiantes
  const projectContent = {
    title: 'Circuito LED con Resistencia',
    description: 'Vamos a construir tu primer circuito electrónico. ¡Será muy divertido ver cómo se enciende el LED!',
    materials: [
      { name: '1 LED (rojo, verde o azul)', icon: '💡' },
      { name: '1 Resistencia de 220Ω', icon: '🔌' },
      { name: '1 Batería de 9V', icon: '🔋' },
      { name: '2 Cables de conexión', icon: '🔗' },
      { name: '1 Protoboard pequeña', icon: '📋' }
    ],
    steps: [
      {
        title: 'Conoce tus componentes',
        description: 'Identifica cada componente y aprende qué hace cada uno en el circuito.',
        details: 'El LED es como una bombillita que se enciende cuando pasa electricidad. La resistencia controla cuánta electricidad pasa para que el LED no se queme.',
        safety: 'Maneja todos los componentes con cuidado.'
      },
      {
        title: 'Prepara tu espacio de trabajo',
        description: 'Organiza todos los materiales en una superficie plana y bien iluminada.',
        details: 'Es importante tener todo ordenado para trabajar de manera segura y eficiente.',
        safety: 'Asegúrate de que tus manos estén secas antes de empezar.'
      },
      {
        title: 'Conecta la resistencia',
        description: 'Conecta un extremo de la resistencia al terminal positivo (+) de la batería.',
        details: 'La resistencia puede conectarse en cualquier dirección, no tiene polaridad.',
        safety: 'Asegúrate de que la batería esté desconectada mientras haces las conexiones.'
      },
      {
        title: 'Conecta el LED',
        description: 'Conecta el terminal largo del LED (ánodo) a la resistencia.',
        details: 'El LED tiene dos terminales: el largo es positivo (+) y el corto es negativo (-).',
        safety: 'Si conectas el LED al revés, no se dañará, pero no se encenderá.'
      },
      {
        title: 'Completa el circuito',
        description: 'Conecta el terminal corto del LED al terminal negativo (-) de la batería.',
        details: 'Ahora tienes un circuito completo: batería → resistencia → LED → batería.',
        safety: 'Verifica todas las conexiones antes del siguiente paso.'
      },
      {
        title: '¡Enciende tu circuito!',
        description: 'Conecta la batería y observa cómo se enciende tu LED.',
        details: '¡Felicidades! Has construido tu primer circuito electrónico funcional.',
        safety: 'Si el LED no se enciende, verifica las conexiones y la polaridad.'
      }
    ]
  };

  const completeStep = (stepIndex: number) => {
    if (!completedSteps.includes(stepIndex)) {
      setCompletedSteps([...completedSteps, stepIndex]);
      toast({
        title: "¡Paso completado!",
        description: `Has terminado el paso ${stepIndex + 1}`,
      });
    }
  };

  const progress = (completedSteps.length / projectContent.steps.length) * 100;

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      toast({
        title: "¡Evidencia subida!",
        description: "Tu foto del proyecto ha sido enviada correctamente",
      });
      setShowUpload(false);
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
        {/* Progress Overview */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-2xl font-montserrat font-bold text-yatina-text">
                {projectContent.title}
              </h2>
              <p className="text-gray-600 mt-1">{projectContent.description}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-yatina-orange">
                {Math.round(progress)}%
              </div>
              <div className="text-sm text-gray-600">Completado</div>
            </div>
          </div>
          <Progress value={progress} className="h-3" />
          <p className="text-sm text-gray-600 mt-2">
            {completedSteps.length} de {projectContent.steps.length} pasos completados
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar - Materials */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="text-lg">Materiales Necesarios</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {projectContent.materials.map((material, index) => (
                    <div key={index} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                      <span className="text-2xl">{material.icon}</span>
                      <span className="text-sm text-gray-700">{material.name}</span>
                    </div>
                  ))}
                </div>
                
                {progress === 100 && (
                  <div className="mt-6 pt-4 border-t">
                    <Button
                      onClick={() => setShowUpload(true)}
                      className="w-full btn-primary flex items-center gap-2"
                    >
                      <Camera className="w-4 h-4" />
                      Subir Evidencia
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Main Content - Steps */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {projectContent.steps.map((step, index) => (
                <Card 
                  key={index} 
                  className={`transition-all duration-300 ${
                    completedSteps.includes(index) 
                      ? 'border-green-500 bg-green-50' 
                      : 'hover:shadow-md'
                  }`}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          completedSteps.includes(index)
                            ? 'bg-green-500 text-white'
                            : 'bg-yatina-orange text-white'
                        }`}>
                          {completedSteps.includes(index) ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : (
                            index + 1
                          )}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{step.title}</CardTitle>
                          <CardDescription className="mt-1">
                            {step.description}
                          </CardDescription>
                        </div>
                      </div>
                      
                      {!completedSteps.includes(index) && (
                        <Button
                          onClick={() => completeStep(index)}
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-2"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Completar
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="flex items-center gap-2 font-semibold text-yatina-text mb-2">
                          <Lightbulb className="w-4 h-4 text-yatina-orange" />
                          Explicación
                        </h4>
                        <p className="text-sm text-gray-700">{step.details}</p>
                      </div>
                      
                      <div>
                        <h4 className="flex items-center gap-2 font-semibold text-yatina-text mb-2">
                          <AlertTriangle className="w-4 h-4 text-red-500" />
                          Seguridad
                        </h4>
                        <p className="text-sm text-gray-700">{step.safety}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Upload Modal */}
        {showUpload && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>Subir Evidencia del Proyecto</CardTitle>
                <CardDescription>
                  Comparte una foto o video de tu circuito funcionando
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <input
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleFileUpload}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setShowUpload(false)}
                      className="flex-1"
                    >
                      Cancelar
                    </Button>
                    <Button className="flex-1 btn-primary">
                      Subir
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default EstudianteDashboard;
