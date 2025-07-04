
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, Users, AlertTriangle, Lightbulb, Play, Edit, Check } from 'lucide-react';

interface LessonPlanProps {
  project: any;
  onAssignToClass: (plan: any) => void;
  onBack: () => void;
}

const DetailedLessonPlan: React.FC<LessonPlanProps> = ({ project, onAssignToClass, onBack }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPlan, setEditedPlan] = useState(null);

  // Simulación de plan generado por IA
  const generatedPlan = {
    project: project,
    totalDuration: project.duration,
    estimatedStudents: project.studentsRequired,
    kitAvailable: project.kitRequired,
    schedule: [
      {
        time: '0-10 min',
        activity: 'Introducción al Tema',
        description: 'Presentación del proyecto y conceptos básicos de electrónica',
        materials: ['Proyector', 'Presentación digital'],
        safetyNotes: 'Verificar que todos los estudiantes estén atentos'
      },
      {
        time: '10-20 min',
        activity: 'Presentación de Materiales',
        description: 'Mostrar y explicar cada componente del circuito',
        materials: ['Kit de electrónica', 'Componentes individuales'],
        safetyNotes: 'Explicar el manejo seguro de cada componente'
      },
      {
        time: '20-40 min',
        activity: 'Construcción Práctica',
        description: 'Armado paso a paso del circuito con supervisión',
        materials: ['Protoboard', 'LEDs', 'Resistencias', 'Cables'],
        safetyNotes: 'Supervisar conexiones, verificar polaridad'
      },
      {
        time: '40-50 min',
        activity: 'Validación y Cierre',
        description: 'Prueba de funcionamiento y reflexión sobre el aprendizaje',
        materials: ['Baterías', 'Multímetro'],
        safetyNotes: 'Desconectar baterías al finalizar'
      }
    ],
    materials: [
      { item: 'LEDs (varios colores)', quantity: '1 por estudiante', essential: true },
      { item: 'Resistencias 220Ω', quantity: '1 por estudiante', essential: true },
      { item: 'Protoboard pequeña', quantity: '1 por grupo', essential: true },
      { item: 'Cables de conexión', quantity: '4 por grupo', essential: true },
      { item: 'Batería 9V', quantity: '1 por grupo', essential: true },
      { item: 'Multímetro', quantity: '1 por aula', essential: false }
    ],
    safetyPractices: [
      'Siempre desconectar la fuente de alimentación antes de modificar conexiones',
      'Verificar la polaridad de los componentes antes de conectar',
      'Mantener el área de trabajo limpia y ordenada',
      'No tocar conexiones con las manos húmedas',
      'Informar inmediatamente cualquier olor extraño o chispa'
    ],
    pedagogicalRecommendations: [
      'Formar grupos de 2-3 estudiantes para fomentar el trabajo colaborativo',
      'Realizar preguntas guía durante la construcción para verificar comprensión',
      'Conectar el proyecto con aplicaciones del mundo real',
      'Documentar el proceso con fotos para crear un portafolio',
      'Asignar roles específicos dentro de cada grupo'
    ],
    embeddedVideos: [
      {
        title: 'Introducción a los LEDs',
        url: 'https://youtu.be/vFV46tUKOHg?si=3TnksI--4DoT12Hw',
        description: 'Video explicativo sobre el funcionamiento básico de los diodos LED'
      },
      {
        title: 'Seguridad en Electrónica',
        url: 'https://youtu.be/YSwRCbMBG6M?si=BtdMfftWSJOKj3rx',
        description: 'Buenas prácticas de seguridad para proyectos electrónicos'
      }
    ],
    additionalResources: [
      {
        type: 'Artículo',
        title: 'Fundamentos de Circuitos Eléctricos',
        description: 'Guía completa sobre conceptos básicos de electricidad'
      },
      {
        type: 'Simulador',
        title: 'Tinkercad Circuits',
        description: 'Herramienta online para simular circuitos electrónicos'
      }
    ]
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedPlan(generatedPlan);
  };

  const handleSaveEdit = () => {
    setIsEditing(false);
    // Aquí guardarías los cambios
  };

  const handleAssign = () => {
    onAssignToClass(editedPlan || generatedPlan);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-montserrat font-bold text-yatina-text mb-2">
            Plan de Clase: {project.name}
          </h2>
          <div className="flex gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {generatedPlan.totalDuration}
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {generatedPlan.estimatedStudents}
            </div>
            <Badge variant={generatedPlan.kitAvailable ? "default" : "secondary"}>
              {generatedPlan.kitAvailable ? "Kit Requerido" : "Sin Kit"}
            </Badge>
          </div>
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline" onClick={onBack}>
            Volver
          </Button>
          {!isEditing ? (
            <Button variant="outline" onClick={handleEdit} className="flex items-center gap-2">
              <Edit className="w-4 h-4" />
              Ajustar Plan
            </Button>
          ) : (
            <Button onClick={handleSaveEdit} className="flex items-center gap-2">
              <Check className="w-4 h-4" />
              Guardar Cambios
            </Button>
          )}
          <Button className="btn-primary" onClick={handleAssign}>
            Asignar a Clase
          </Button>
        </div>
      </div>

      <Tabs defaultValue="schedule" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="schedule">Cronograma</TabsTrigger>
          <TabsTrigger value="materials">Materiales</TabsTrigger>
          <TabsTrigger value="safety">Seguridad</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="resources">Recursos</TabsTrigger>
        </TabsList>

        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-yatina-orange" />
                Secuencia Minuto a Minuto
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {generatedPlan.schedule.map((activity, index) => (
                  <div key={index} className="border-l-4 border-yatina-blue pl-4 py-2">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-yatina-text">{activity.activity}</h4>
                      <Badge variant="outline">{activity.time}</Badge>
                    </div>
                    <p className="text-gray-700 mb-2">{activity.description}</p>
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Materiales: </span>
                      {activity.materials.join(', ')}
                    </div>
                    {activity.safetyNotes && (
                      <div className="flex items-start gap-2 mt-2 text-sm text-red-600">
                        <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        {activity.safetyNotes}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="materials" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Lista de Materiales</CardTitle>
              <CardDescription>
                Materiales necesarios ajustados al contexto y número de estudiantes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {generatedPlan.materials.map((material, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <span className="font-medium text-yatina-text">{material.item}</span>
                      {material.essential && (
                        <Badge className="ml-2 bg-yatina-orange text-white text-xs">Esencial</Badge>
                      )}
                    </div>
                    <span className="text-sm text-gray-600">{material.quantity}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="safety" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                Buenas Prácticas de Seguridad
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {generatedPlan.safetyPractices.map((practice, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                    <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                      {index + 1}
                    </div>
                    <span className="text-gray-700">{practice}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="flex items-center gap-2 font-semibold text-yatina-text mb-2">
                  <Lightbulb className="w-4 h-4 text-yatina-orange" />
                  Recomendaciones Pedagógicas
                </h4>
                <ul className="space-y-2">
                  {generatedPlan.pedagogicalRecommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                      <div className="w-2 h-2 bg-yatina-blue rounded-full mt-2 flex-shrink-0"></div>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="videos" className="space-y-4">
          <div className="grid gap-4">
            {generatedPlan.embeddedVideos.map((video, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Play className="w-5 h-5 text-yatina-orange" />
                    {video.title}
                  </CardTitle>
                  <CardDescription>{video.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video">
                    <iframe
                      src={video.url.replace('youtu.be/', 'www.youtube.com/embed/').split('?')[0]}
                      title={video.title}
                      className="w-full h-full rounded-lg"
                      allowFullScreen
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          <div className="grid gap-4">
            {generatedPlan.additionalResources.map((resource, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Badge variant="outline">{resource.type}</Badge>
                    <div>
                      <h4 className="font-semibold text-yatina-text">{resource.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{resource.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DetailedLessonPlan;
