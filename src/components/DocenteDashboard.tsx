
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Users, Settings, LogOut, Lightbulb, Cpu, CircuitBoard } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const DocenteDashboard = () => {
  const { user, logout } = useAuth();
  const [selectedGrade, setSelectedGrade] = useState<string>('');
  const [generatedContent, setGeneratedContent] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const grades = [
    '1ro Secundaria', '2do Secundaria', '3ro Secundaria',
    '4to Secundaria', '5to Secundaria', '6to Secundaria'
  ];

  const generateContent = async (grade: string) => {
    setLoading(true);
    setSelectedGrade(grade);
    
    // Simular generación de contenido por IA
    setTimeout(() => {
      const content = {
        grade,
        topic: 'Componentes Electrónicos Básicos',
        summary: `Introducción a los componentes electrónicos fundamentales para estudiantes de ${grade}. Aprenderemos sobre resistencias, LEDs, y circuitos básicos de manera práctica y segura.`,
        project: {
          title: 'Circuito LED con Resistencia',
          description: 'Construir un circuito simple que encienda un LED usando una resistencia para controlar la corriente.',
          materials: [
            '1 LED (color a elección)',
            '1 Resistencia de 220Ω',
            '1 Batería de 9V',
            '2 Cables de conexión',
            '1 Protoboard pequeña'
          ],
          steps: [
            'Identifica los componentes y sus características',
            'Conecta la resistencia al terminal positivo de la batería',
            'Conecta el ánodo del LED (terminal largo) a la resistencia',
            'Conecta el cátodo del LED (terminal corto) al terminal negativo de la batería',
            'Verifica las conexiones antes de energizar',
            'Enciende el circuito y observa el funcionamiento'
          ],
          safety: [
            'Siempre desconectar la batería antes de hacer cambios',
            'Verificar la polaridad del LED antes de conectar',
            'No exceder el voltaje recomendado',
            'Mantener el área de trabajo limpia y ordenada'
          ],
          learningGoals: [
            'Identificar componentes electrónicos básicos',
            'Comprender el concepto de resistencia eléctrica',
            'Aplicar medidas de seguridad en electrónica',
            'Construir un circuito funcional simple'
          ]
        },
        resources: [
          {
            type: 'video',
            title: 'Introducción a los LEDs',
            description: 'Video explicativo sobre el funcionamiento de los diodos LED'
          },
          {
            type: 'imagen',
            title: 'Diagrama del circuito',
            description: 'Esquema visual del circuito a construir'
          }
        ]
      };
      
      setGeneratedContent(content);
      setLoading(false);
      
      toast({
        title: "¡Contenido generado!",
        description: `Unidad didáctica creada para ${grade}`,
      });
    }, 2000);
  };

  const assignToClass = () => {
    toast({
      title: "¡Clase asignada!",
      description: "El contenido ha sido asignado a tus estudiantes",
    });
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
        {!generatedContent ? (
          <div className="space-y-8">
            {/* Welcome Section */}
            <div className="text-center">
              <h2 className="text-3xl font-montserrat font-bold text-yatina-text mb-4">
                ¡Bienvenido, {user?.nombre?.split(' ')[1]}!
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Selecciona el grado para el cual quieres generar contenido educativo. 
                La IA creará automáticamente una unidad didáctica completa adaptada al nivel.
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
                    onClick={() => generateContent(grade)}
                  >
                    <CardHeader className="text-center pb-2">
                      <div className="w-12 h-12 bg-yatina-blue/10 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Users className="w-6 h-6 text-yatina-blue" />
                      </div>
                      <CardTitle className="text-lg">{grade}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center pt-0">
                      <p className="text-sm text-gray-600">
                        Generar contenido para este nivel
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {loading && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gradient-to-r from-yatina-orange to-yatina-blue rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <Cpu className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-montserrat font-semibold text-yatina-text mb-2">
                  Generando contenido con IA...
                </h3>
                <p className="text-gray-600">
                  Creando una unidad didáctica personalizada para {selectedGrade}
                </p>
              </div>
            )}
          </div>
        ) : (
          <GeneratedContentView 
            content={generatedContent} 
            onAssign={assignToClass}
            onBack={() => setGeneratedContent(null)}
          />
        )}
      </div>
    </div>
  );
};

const GeneratedContentView = ({ content, onAssign, onBack }: any) => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-montserrat font-bold text-yatina-text mb-2">
            {content.topic}
          </h2>
          <p className="text-lg text-gray-600">{content.grade}</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={onBack}>
            Volver
          </Button>
          <Button className="btn-primary" onClick={onAssign}>
            Asignar a Clase
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Resumen Teórico */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-yatina-blue" />
              Resumen Teórico
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">{content.summary}</p>
            <div>
              <h4 className="font-semibold text-yatina-text mb-2">Objetivos de Aprendizaje:</h4>
              <ul className="space-y-1">
                {content.project.learningGoals.map((goal: string, index: number) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <Lightbulb className="w-4 h-4 text-yatina-orange mt-0.5 flex-shrink-0" />
                    {goal}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Proyecto Práctico */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CircuitBoard className="w-5 h-5 text-yatina-orange" />
              {content.project.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">{content.project.description}</p>
            
            <div className="mb-4">
              <h4 className="font-semibold text-yatina-text mb-2">Materiales Necesarios:</h4>
              <ul className="space-y-1">
                {content.project.materials.map((material: string, index: number) => (
                  <li key={index} className="text-sm text-gray-700 flex items-center gap-2">
                    <div className="w-2 h-2 bg-yatina-blue rounded-full"></div>
                    {material}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Instrucciones Paso a Paso */}
      <Card>
        <CardHeader>
          <CardTitle>Instrucciones Paso a Paso</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-yatina-text mb-3">Pasos de Construcción:</h4>
              <ol className="space-y-2">
                {content.project.steps.map((step: string, index: number) => (
                  <li key={index} className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-yatina-orange text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>
                    <span className="text-sm text-gray-700">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
            
            <div>
              <h4 className="font-semibold text-yatina-text mb-3">Medidas de Seguridad:</h4>
              <ul className="space-y-2">
                {content.project.safety.map((safety: string, index: number) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{safety}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocenteDashboard;
