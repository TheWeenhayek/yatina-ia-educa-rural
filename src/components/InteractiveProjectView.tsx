
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Play, Camera, CheckCircle, Lightbulb, AlertTriangle, Monitor } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface InteractiveProjectViewProps {
  user: any;
}

const InteractiveProjectView: React.FC<InteractiveProjectViewProps> = ({ user }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [showUpload, setShowUpload] = useState(false);
  const [showAlternatives, setShowAlternatives] = useState(false);

  // Proyecto asignado simulado
  const assignedProject = {
    title: 'Circuito LED con Resistencia',
    description: '¡Construye tu primer circuito electrónico y ve cómo se enciende un LED! Este proyecto te enseñará los fundamentos de la electricidad de manera divertida y segura.',
    introduction: {
      title: 'Introducción Visual Interactiva',
      content: 'En este proyecto aprenderás sobre circuitos eléctricos básicos. Un circuito es como un camino por donde viaja la electricidad, y nosotros vamos a crear uno que encienda una luz LED.',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop',
      keyPoints: [
        'Los electrones se mueven a través de cables conductores',
        'Las resistencias controlan el flujo de electricidad',
        'Los LEDs convierten electricidad en luz',
        'Siempre debemos trabajar de manera segura'
      ]
    },
    materials: [
      { name: '1 LED (rojo, verde o azul)', icon: '💡', hasKit: true },
      { name: '1 Resistencia de 220Ω', icon: '🔌', hasKit: true },
      { name: '1 Batería de 9V', icon: '🔋', hasKit: true },
      { name: '2 Cables de conexión', icon: '🔗', hasKit: true },
      { name: '1 Protoboard pequeña', icon: '📋', hasKit: true }
    ],
    embeddedVideos: [
      {
        title: 'Cómo Funcionan los LEDs',
        url: 'https://youtu.be/YSwRCbMBG6M?si=BtdMfftWSJOKj3rx',
        description: 'Video introductorio sobre el funcionamiento de los diodos LED'
      },
      {
        title: 'Seguridad en Electrónica para Estudiantes',
        url: 'https://youtu.be/vFV46tUKOHg?si=3TnksI--4DoT12Hw',
        description: 'Aprende las reglas básicas de seguridad al trabajar con componentes electrónicos'
      }
    ],
    steps: [
      {
        title: 'Conoce tus componentes',
        description: 'Identifica cada componente y aprende qué hace cada uno en el circuito.',
        details: 'El LED es como una bombillita especial que solo se enciende cuando la electricidad pasa en la dirección correcta. La resistencia es como un obstáculo que hace que la electricidad vaya más despacio para que el LED no se queme.',
        multimedia: {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=400&h=300&fit=crop'
        },
        safety: 'Maneja todos los componentes con cuidado y mantén tus manos secas.',
        alternatives: 'Si no tienes kit, puedes usar el simulador Tinkercad para practicar virtualmente.'
      },
      {
        title: 'Prepara tu espacio de trabajo',
        description: 'Organiza todos los materiales en una superficie plana y bien iluminada.',
        details: 'Un espacio ordenado te ayuda a trabajar mejor y más seguro. Coloca todos los componentes donde puedas verlos claramente.',
        safety: 'Asegúrate de tener buena luz y que no haya líquidos cerca de tu área de trabajo.',
        alternatives: 'Puedes usar una mesa o escritorio. Si no tienes protoboard, puedes usar cartón y chinchetas.'
      },
      {
        title: 'Conecta la resistencia',
        description: 'Conecta un extremo de la resistencia al terminal positivo (+) de la batería.',
        details: 'La resistencia puede conectarse en cualquier dirección, no tiene lado positivo o negativo. Su trabajo es controlar cuánta electricidad pasa.',
        multimedia: {
          type: 'video',
          title: 'Conexión de Resistencias',
          description: 'Mira cómo conectar correctamente una resistencia'
        },
        safety: 'Asegúrate de que la batería esté desconectada mientras haces las conexiones.',
        alternatives: 'Sin kit: simula la conexión dibujando el circuito en papel.'
      },
      {
        title: 'Conecta el LED',
        description: 'Conecta el terminal largo del LED (ánodo) a la resistencia.',
        details: 'El LED tiene dos terminales: el largo es positivo (+) y el corto es negativo (-). Esto es muy importante para que funcione.',
        safety: 'Si conectas el LED al revés, no se dañará, pero no se encenderá.',
        alternatives: 'En simulador: arrastra el LED y conecta siguiendo los colores de los cables.'
      },
      {
        title: 'Completa el circuito',
        description: 'Conecta el terminal corto del LED al terminal negativo (-) de la batería.',
        details: 'Ahora tienes un circuito completo: batería → resistencia → LED → batería. La electricidad puede fluir en un círculo completo.',
        safety: 'Verifica todas las conexiones antes del siguiente paso.',
        alternatives: 'Dibuja flechas en tu diagrama para mostrar el flujo de electricidad.'
      },
      {
        title: '¡Enciende tu circuito!',
        description: 'Conecta la batería y observa cómo se enciende tu LED.',
        details: '¡Felicidades! Has construido tu primer circuito electrónico funcional. La electricidad ahora puede fluir desde la batería, a través de la resistencia y el LED, y regresar a la batería.',
        multimedia: {
          type: 'celebration',
          message: '¡Excelente trabajo! Tu LED debería estar brillando ahora.'
        },
        safety: 'Si el LED no se enciende, verifica las conexiones y la polaridad. Desconecta la batería cuando termines.',
        alternatives: 'En simulador: presiona el botón de simulación para ver tu LED virtual encenderse.'
      }
    ],
    alternatives: {
      withoutKit: [
        {
          title: 'Simulador Tinkercad',
          description: 'Usa el simulador online gratuito de Tinkercad para construir tu circuito virtualmente',
          url: 'https://tinkercad.com',
          instructions: [
            'Crea una cuenta gratuita en Tinkercad',
            'Ve a la sección "Circuits"',
            'Arrastra los componentes: LED, resistencia y batería',
            'Conecta siguiendo los mismos pasos del proyecto real',
            'Presiona "Simulate" para ver funcionar tu circuito'
          ]
        },
        {
          title: 'Materiales Caseros',
          description: 'Crea un proyecto similar usando materiales que puedes encontrar en casa',
          materials: [
            'Foco pequeño de linterna (reemplaza al LED)',
            'Pila AA o AAA (reemplaza a la batería de 9V)',
            'Cable de auriculares viejos (reemplaza a los cables)',
            'Cinta aislante para conexiones'
          ],
          safety: 'Pide ayuda a un adulto para manejar cables y conexiones'
        }
      ]
    }
  };

  const completeStep = (stepIndex: number) => {
    if (!completedSteps.includes(stepIndex)) {
      setCompletedSteps([...completedSteps, stepIndex]);
      toast({
        title: "¡Paso completado!",
        description: `Has terminado: ${assignedProject.steps[stepIndex].title}`,
      });
    }
  };

  const progress = (completedSteps.length / assignedProject.steps.length) * 100;

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      toast({
        title: "¡Evidencia subida exitosamente!",
        description: "Tu proyecto ha sido enviado a tu profesor para revisión",
      });
      setShowUpload(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Introducción Interactiva */}
      <Card className="bg-gradient-to-r from-yatina-orange/10 to-yatina-blue/10">
        <CardHeader>
          <CardTitle className="text-2xl font-montserrat font-bold text-yatina-text">
            {assignedProject.introduction.title}
          </CardTitle>
          <CardDescription className="text-lg">
            {assignedProject.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <img 
                src={assignedProject.introduction.image} 
                alt="Circuito electrónico"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <p className="text-gray-700">{assignedProject.introduction.content}</p>
            </div>
            <div>
              <h4 className="font-semibold text-yatina-text mb-3">Puntos Clave:</h4>
              <ul className="space-y-2">
                {assignedProject.introduction.keyPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 text-yatina-orange mt-1 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress Overview */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-yatina-orange mb-1">
                {Math.round(progress)}%
              </div>
              <div className="text-sm text-gray-600">Completado</div>
              <Progress value={progress} className="h-2 mt-2" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-yatina-blue mb-1">
                {completedSteps.length}/{assignedProject.steps.length}
              </div>
              <div className="text-sm text-gray-600">Pasos Completados</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              {progress === 100 ? (
                <Button
                  onClick={() => setShowUpload(true)}
                  className="btn-primary flex items-center gap-2"
                >
                  <Camera className="w-4 h-4" />
                  Subir Evidencia
                </Button>
              ) : (
                <div className="text-sm text-gray-600">
                  Completa todos los pasos para subir evidencia
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Videos Embebidos */}
      <div>
        <h3 className="text-xl font-montserrat font-semibold text-yatina-text mb-4">
          Videos de Apoyo
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          {assignedProject.embeddedVideos.map((video, index) => (
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
      </div>

      {/* Alternativas sin Kit */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Monitor className="w-5 h-5 text-yatina-blue" />
            ¿No tienes kit de robótica?
          </CardTitle>
          <CardDescription>
            No te preocupes, también puedes aprender con estas alternativas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button 
              variant="outline" 
              onClick={() => setShowAlternatives(!showAlternatives)}
              className="mb-4"
            >
              {showAlternatives ? 'Ocultar' : 'Ver'} Alternativas
            </Button>
            
            {showAlternatives && (
              <div className="grid gap-4">
                {assignedProject.alternatives.withoutKit.map((alt, index) => (
                  <div key={index} className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-yatina-text mb-2">{alt.title}</h4>
                    <p className="text-sm text-gray-700 mb-3">{alt.description}</p>
                    
                    {alt.instructions && (
                      <div>
                        <span className="font-medium">Instrucciones:</span>
                        <ol className="list-decimal list-inside text-sm text-gray-700 mt-1 space-y-1">
                          {alt.instructions.map((inst, i) => (
                            <li key={i}>{inst}</li>
                          ))}
                        </ol>
                      </div>
                    )}
                    
                    {alt.materials && (
                      <div className="mt-3">
                        <span className="font-medium">Materiales alternativos:</span>
                        <ul className="list-disc list-inside text-sm text-gray-700 mt-1 space-y-1">
                          {alt.materials.map((mat, i) => (
                            <li key={i}>{mat}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Pasos del Proyecto */}
      <div>
        <h3 className="text-xl font-montserrat font-semibold text-yatina-text mb-6">
          Guía Paso a Paso
        </h3>
        <div className="space-y-6">
          {assignedProject.steps.map((step, index) => (
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
                <div className="space-y-4">
                  <div>
                    <h4 className="flex items-center gap-2 font-semibold text-yatina-text mb-2">
                      <Lightbulb className="w-4 h-4 text-yatina-orange" />
                      Explicación Detallada
                    </h4>
                    <p className="text-sm text-gray-700">{step.details}</p>
                  </div>

                  {step.multimedia && (
                    <div>
                      {step.multimedia.type === 'image' && (
                        <img 
                          src={step.multimedia.url} 
                          alt={step.title}
                          className="w-full max-w-md h-48 object-cover rounded-lg"
                        />
                      )}
                      {step.multimedia.type === 'celebration' && (
                        <div className="p-4 bg-green-100 rounded-lg text-center">
                          <div className="text-2xl mb-2">🎉</div>
                          <p className="text-green-800 font-medium">{step.multimedia.message}</p>
                        </div>
                      )}
                    </div>
                  )}
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="flex items-center gap-2 font-semibold text-yatina-text mb-2">
                        <AlertTriangle className="w-4 h-4 text-red-500" />
                        Seguridad
                      </h4>
                      <p className="text-sm text-gray-700">{step.safety}</p>
                    </div>
                    
                    <div>
                      <h4 className="flex items-center gap-2 font-semibold text-yatina-text mb-2">
                        <Monitor className="w-4 h-4 text-yatina-blue" />
                        Sin Kit
                      </h4>
                      <p className="text-sm text-gray-700">{step.alternatives}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Upload Modal */}
      {showUpload && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>¡Subir Evidencia de tu Proyecto!</CardTitle>
              <CardDescription>
                Comparte una foto o video de tu circuito funcionando
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center p-6 border-2 border-dashed border-gray-300 rounded-lg">
                  <Camera className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-4">
                    Toma una foto de tu LED encendido o un video corto mostrando cómo funciona
                  </p>
                  <input
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleFileUpload}
                    className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowUpload(false)}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                  <Button className="flex-1 btn-primary">
                    Enviar Evidencia
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default InteractiveProjectView;
