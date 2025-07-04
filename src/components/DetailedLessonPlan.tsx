
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, Users, AlertTriangle, Lightbulb, Play, Edit, Check, ArrowLeft } from 'lucide-react';

interface LessonPlanProps {
  project: any;
  onAssignToClass: (plan: any) => void;
  onBack: () => void;
}

const DetailedLessonPlan: React.FC<LessonPlanProps> = ({ project, onAssignToClass, onBack }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPlan, setEditedPlan] = useState(null);

  // Materiales del kit con imágenes y descripciones detalladas
  const kitMaterials = {
    'Motor': {
      image: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=150&h=150&fit=crop',
      description: 'Motor DC de 6V que convierte energía eléctrica en movimiento rotatorio. Ideal para bombas de agua y ventiladores.',
      specs: '6V DC, 100 RPM, bajo consumo'
    },
    'Transistores': {
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=150&h=150&fit=crop',
      description: 'BC548 (NPN) y BC558 (PNP) - Componentes que amplifican señales eléctricas pequeñas para controlar cargas mayores.',
      specs: 'Corriente máxima: 100mA, Voltaje: 45V'
    },
    'Resistores': {
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=150&h=150&fit=crop',
      description: 'Limitan el flujo de corriente eléctrica. Colores indican su valor: marrón-negro-marrón (100Ω) hasta marrón-negro-naranja (10kΩ).',
      specs: 'Valores: 100Ω, 470Ω, 1kΩ, 10kΩ'
    },
    'Fotoresistor': {
      image: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=150&h=150&fit=crop',
      description: 'Sensor que cambia su resistencia según la cantidad de luz. A más luz, menor resistencia.',
      specs: 'Rango: 1kΩ (luz) a 10MΩ (oscuridad)'
    },
    'Switch': {
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=150&h=150&fit=crop',
      description: 'Interruptor que abre o cierra un circuito permanentemente hasta que se accione nuevamente.',
      specs: 'SPDT, 250V AC / 3A'
    },
    'Pulsadores': {
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=150&h=150&fit=crop',
      description: 'Botones que se activan solo mientras se presionan. Útiles para controles momentáneos.',
      specs: 'Normalmente abierto, 12V DC'
    },
    'LED': {
      image: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=150&h=150&fit=crop',
      description: 'Diodo emisor de luz que convierte electricidad en luz. Terminal largo es positivo (+).',
      specs: 'Voltaje: 2-3V, Corriente: 20mA'
    },
    'Lámpara': {
      image: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=150&h=150&fit=crop',
      description: 'Lámpara incandescente pequeña para iluminación de mayor intensidad que el LED.',
      specs: '6V, 0.5W, rosca pequeña'
    },
    'Capacitores': {
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=150&h=150&fit=crop',
      description: 'Almacenan energía eléctrica temporalmente. 104 (0.1µF), 470µF y 1000µF para diferentes aplicaciones.',
      specs: '104: cerámico, 470µF/1000µF: electrolíticos'
    },
    'Potenciómetro': {
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=150&h=150&fit=crop',
      description: 'Resistencia variable de 100kΩ. Permite ajustar la resistencia girando un eje.',
      specs: '100kΩ lineal, 3 terminales'
    }
  };

  // Simulación de plan generado por IA con imágenes
  const generatedPlan = {
    project: project,
    totalDuration: project.duration || '60 minutos',
    estimatedStudents: project.studentsRequired || '12-15 estudiantes',
    kitAvailable: true,
    schedule: [
      {
        time: '0-10 min',
        activity: 'Introducción al Proyecto Rural',
        description: `Presentación del proyecto "${project.name}" y su importancia para la comunidad rural`,
        materials: ['Proyector', 'Presentación digital', 'Imágenes del contexto rural'],
        safetyNotes: 'Verificar que todos los estudiantes estén atentos y participando',
        image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=300&h=200&fit=crop'
      },
      {
        time: '10-25 min',
        activity: 'Presentación de Materiales del Kit',
        description: 'Mostrar cada componente, explicar su función y cómo se relaciona con el proyecto rural',
        materials: project.materials || ['Kit completo', 'Componentes individuales'],
        safetyNotes: 'Explicar el manejo seguro de cada componente, especialmente transistores y capacitores',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=200&fit=crop'
      },
      {
        time: '25-50 min',
        activity: 'Construcción Práctica del Proyecto',
        description: 'Armado paso a paso del dispositivo con supervisión continua del docente',
        materials: project.materials || ['Todos los componentes del kit'],
        safetyNotes: 'Supervisar conexiones, verificar polaridad, evitar cortocircuitos',
        image: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=300&h=200&fit=crop'
      },
      {
        time: '50-60 min',
        activity: 'Prueba y Reflexión Rural',
        description: 'Prueba de funcionamiento y reflexión sobre cómo aplicar el proyecto en la comunidad',
        materials: ['Baterías', 'Multímetro (si disponible)'],
        safetyNotes: 'Desconectar fuentes de alimentación al finalizar, guardar componentes ordenadamente',
        image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=300&h=200&fit=crop'
      }
    ],
    materials: (project.materials || ['LED', 'Resistores', 'Switch']).map((material: string, index: number) => ({
      item: material,
      quantity: '1 por grupo',
      essential: true,
      description: (kitMaterials as any)[material]?.description || 'Componente del kit educativo',
      image: (kitMaterials as any)[material]?.image,
      specs: (kitMaterials as any)[material]?.specs
    })),
    safetyPractices: [
      'Siempre desconectar la fuente de alimentación antes de modificar conexiones',
      'Verificar la polaridad de componentes (LED, capacitores electrolíticos) antes de conectar',
      'Mantener el área de trabajo limpia y componentes organizados',
      'No tocar conexiones con las manos húmedas o sucias',
      'Informar inmediatamente cualquier olor extraño, chispa o calentamiento excesivo',
      'Trabajar en grupos pequeños con supervisión constante del docente'
    ],
    pedagogicalRecommendations: [
      'Formar grupos de 2-3 estudiantes para fomentar el trabajo colaborativo',
      'Conectar cada paso con aplicaciones reales en agricultura/minería local',
      'Realizar preguntas guía: "¿Cómo ayudaría esto en tu comunidad?"',
      'Documentar el proceso con dibujos o fotos para crear un portafolio rural',
      'Asignar roles: constructor, verificador, documentador',
      'Relacionar el proyecto con saberes ancestrales y tecnología moderna'
    ],
    embeddedVideos: [
      {
        title: 'Fundamentos de Electrónica Rural',
        url: 'https://youtu.be/vFV46tUKOHg?si=3TnksI--4DoT12Hw',
        description: 'Conceptos básicos de electrónica aplicados al contexto rural'
      },
      {
        title: 'Seguridad en Proyectos Electrónicos',
        url: 'https://youtu.be/YSwRCbMBG6M?si=BtdMfftWSJOKj3rx',
        description: 'Buenas prácticas de seguridad para el manejo de componentes'
      }
    ],
    additionalResources: [
      {
        type: 'Guía PDF',
        title: 'Manual de Componentes Electrónicos',
        description: 'Guía visual con descripción detallada de cada componente del kit'
      },
      {
        type: 'Video Tutorial',
        title: 'Aplicaciones Rurales de la Electrónica',
        description: 'Ejemplos de proyectos electrónicos exitosos en comunidades rurales'
      }
    ]
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedPlan(generatedPlan);
  };

  const handleSaveEdit = () => {
    setIsEditing(false);
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
          <div className="flex gap-4 text-sm text-gray-600 mb-2">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {generatedPlan.totalDuration}
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {generatedPlan.estimatedStudents}
            </div>
          </div>
          <Badge className="bg-green-600 text-white">
            🌾 Enfoque Rural: {project.ruralFocus}
          </Badge>
        </div>
        
        <div className="flex gap-3">
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
              <div className="space-y-6">
                {generatedPlan.schedule.map((activity, index) => (
                  <div key={index} className="border-l-4 border-yatina-blue pl-6 py-4">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="md:col-span-2">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-yatina-text">{activity.activity}</h4>
                          <Badge variant="outline">{activity.time}</Badge>
                        </div>
                        <p className="text-gray-700 mb-3">{activity.description}</p>
                        <div className="text-sm text-gray-600 mb-2">
                          <span className="font-medium">Materiales: </span>
                          {Array.isArray(activity.materials) ? activity.materials.join(', ') : String(activity.materials)}
                        </div>
                        {activity.safetyNotes && (
                          <div className="flex items-start gap-2 text-sm text-red-600">
                            <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                            {activity.safetyNotes}
                          </div>
                        )}
                      </div>
                      <div>
                        <img 
                          src={activity.image} 
                          alt={activity.activity}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="materials" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Kit de Materiales con Imágenes</CardTitle>
              <CardDescription>
                Componentes del kit educativo con descripciones detalladas y especificaciones
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                {generatedPlan.materials.map((material: any, index: number) => (
                  <div key={index} className="border rounded-lg p-4 bg-gray-50">
                    <div className="grid md:grid-cols-4 gap-4">
                      <div>
                        <img 
                          src={material.image || 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=150&h=150&fit=crop'} 
                          alt={String(material.item)}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                      </div>
                      <div className="md:col-span-3">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium text-yatina-text">{String(material.item)}</span>
                          {material.essential && (
                            <Badge className="bg-yatina-orange text-white text-xs">Esencial</Badge>
                          )}
                          <span className="text-sm text-gray-600 ml-auto">{String(material.quantity)}</span>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">{String(material.description)}</p>
                        {material.specs && (
                          <p className="text-xs text-gray-600 bg-white p-2 rounded">
                            <span className="font-medium">Especificaciones: </span>{String(material.specs)}
                          </p>
                        )}
                      </div>
                    </div>
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
                  Recomendaciones Pedagógicas Rurales
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
