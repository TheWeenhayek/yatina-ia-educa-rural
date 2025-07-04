
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Wrench, Lightbulb, Zap, Settings, Flame, Cog } from 'lucide-react';

interface SyllabusViewProps {
  grade: string;
  trimester: number;
  onSelectProject: (project: any) => void;
}

const SyllabusView: React.FC<SyllabusViewProps> = ({ grade, trimester, onSelectProject }) => {
  // Kit educativo disponible
  const availableKit = [
    { name: 'Motor', icon: '⚙️', description: 'Motor DC para movimiento' },
    { name: 'Transistores BC548/BC558', icon: '🔌', description: 'Amplificación de señales' },
    { name: 'Resistores (100Ω-10kΩ)', icon: '⚡', description: 'Control de corriente' },
    { name: 'Fotoresistor', icon: '💡', description: 'Sensor de luz' },
    { name: 'Switch y Pulsadores', icon: '🔘', description: 'Control manual' },
    { name: 'LED y Lámpara', icon: '💡', description: 'Indicadores luminosos' },
    { name: 'Capacitores', icon: '🔋', description: 'Almacenamiento de energía' },
    { name: 'Potenciómetro 100k', icon: '🎛️', description: 'Control variable' }
  ];

  const getSyllabusData = (trimester: number) => {
    const syllabusData = {
      1: {
        title: 'TALLER DE ELECTRÓNICA - Primer Trimestre',
        topics: [
          {
            id: 1,
            title: 'Introducción a la electrónica',
            description: 'Fundamentos básicos de la electricidad y electrónica',
            icon: Lightbulb,
            project: {
              name: 'Sistema de Alerta Temprana para Granizo',
              description: 'Construye un detector de luz que alerte a los agricultores sobre cambios climáticos repentinos usando un fotoresistor y LED.',
              image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&h=300&fit=crop',
              materials: ['Fotoresistor', 'LED', 'Resistores', 'Switch'],
              ruralFocus: 'Protección de cultivos contra granizo',
              duration: '45 minutos',
              difficulty: 'Básico'
            }
          },
          {
            id: 2,
            title: 'Herramientas e instrumentos electrónicos',
            description: 'Conocimiento y uso seguro de herramientas básicas',
            icon: Wrench,
            project: {
              name: 'Medidor de Humedad para Invernaderos',
              description: 'Crea un sistema simple que indique cuando las plantas necesitan agua, usando resistencias como sensores.',
              image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400&h=300&fit=crop',
              materials: ['Resistores', 'LED', 'Potenciómetro', 'Pulsadores'],
              ruralFocus: 'Optimización del riego en agricultura',
              duration: '50 minutos',
              difficulty: 'Básico'
            }
          }
        ]
      },
      2: {
        title: 'TALLER DE ELECTRÓNICA - Segundo Trimestre',
        topics: [
          {
            id: 3,
            title: 'Componentes electrónicos avanzados',
            description: 'Transistores, capacitores y su aplicación práctica',
            icon: Zap,
            project: {
              name: 'Bomba de Agua Automática para Riego',
              description: 'Sistema que activa una bomba cuando detecta baja humedad, usando transistores como amplificadores.',
              image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=300&fit=crop',
              materials: ['Motor', 'Transistores', 'Fotoresistor', 'Capacitores', 'Resistores'],
              ruralFocus: 'Automatización del riego agrícola',
              duration: '60 minutos',
              difficulty: 'Intermedio'
            }
          },
          {
            id: 4,
            title: 'Circuitos de control',
            description: 'Implementación de sistemas de control básicos',
            icon: Settings,
            project: {
              name: 'Ventilador Solar para Secado de Granos',
              description: 'Motor que se activa con luz solar para secar granos de quinua o cebada, usando fotoresistor y transistores.',
              image: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=400&h=300&fit=crop',
              materials: ['Motor', 'Fotoresistor', 'Transistores', 'Switch', 'Resistores'],
              ruralFocus: 'Procesamiento de productos agrícolas',
              duration: '55 minutos',
              difficulty: 'Intermedio'
            }
          }
        ]
      },
      3: {
        title: 'TALLER DE ELECTRÓNICA - Tercer Trimestre',
        topics: [
          {
            id: 5,
            title: 'Introducción a la electrónica',
            description: 'Repaso y profundización de conceptos fundamentales',
            icon: Lightbulb,
            project: {
              name: 'Detector de Metales para Minería Artesanal',
              description: 'Sistema básico que detecta objetos metálicos usando oscilaciones electromagnéticas con transistores.',
              image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop',
              materials: ['Transistores', 'Resistores', 'Capacitores', 'LED', 'Potenciómetro'],
              ruralFocus: 'Herramientas para minería responsable',
              duration: '50 minutos',
              difficulty: 'Avanzado'
            }
          },
          {
            id: 6,
            title: 'Herramientas e instrumentos electrónicos',
            description: 'Uso avanzado de instrumentos de medición',
            icon: Wrench,
            project: {
              name: 'Iluminación LED para Gallineros',
              description: 'Sistema de iluminación automática que mejora la producción de huevos usando LEDs y control por horario.',
              image: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=400&h=300&fit=crop',
              materials: ['LED', 'Resistores', 'Switch', 'Transistores', 'Fotoresistor'],
              ruralFocus: 'Mejora de la producción avícola',
              duration: '45 minutos',
              difficulty: 'Intermedio'
            }
          },
          {
            id: 7,
            title: 'Componentes electrónicos',
            description: 'Análisis detallado de cada componente del kit',
            icon: Zap,
            project: {
              name: 'Medidor de pH para Suelos Agrícolas',
              description: 'Dispositivo que ayuda a determinar la acidez del suelo usando resistencias variables y LEDs indicadores.',
              image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&h=300&fit=crop',
              materials: ['Resistores', 'LED', 'Potenciómetro', 'Pulsadores', 'Capacitores'],
              ruralFocus: 'Análisis de calidad del suelo',
              duration: '55 minutos',
              difficulty: 'Avanzado'
            }
          },
          {
            id: 8,
            title: 'Simbología electrónica',
            description: 'Lectura e interpretación de diagramas',
            icon: Settings,
            project: {
              name: 'Alarma de Seguridad para Almacenes',
              description: 'Sistema de alerta para proteger almacenes de granos usando sensores y sirenas.',
              image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400&h=300&fit=crop',
              materials: ['Fotoresistor', 'Transistores', 'LED', 'Resistores', 'Pulsadores'],
              ruralFocus: 'Seguridad en almacenamiento agrícola',
              duration: '50 minutos',
              difficulty: 'Intermedio'
            }
          },
          {
            id: 9,
            title: 'Soldadura de componentes electrónicos',
            description: 'Técnicas básicas de soldadura y ensamblaje',
            icon: Flame,
            project: {
              name: 'Cargador Solar para Dispositivos',
              description: 'Sistema de carga que aprovecha la energía solar para cargar dispositivos móviles en zonas rurales.',
              image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=300&fit=crop',
              materials: ['Fotoresistor', 'Capacitores', 'Resistores', 'LED', 'Switch'],
              ruralFocus: 'Energía renovable en comunidades rurales',
              duration: '60 minutos',
              difficulty: 'Avanzado'
            }
          },
          {
            id: 10,
            title: 'Proyectos de electrónica',
            description: 'Integración de conocimientos en proyectos completos',
            icon: Cog,
            project: {
              name: 'Sistema de Monitoreo de Ganado',
              description: 'Dispositivo que monitorea el movimiento del ganado usando sensores y alertas remotas.',
              image: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=400&h=300&fit=crop',
              materials: ['Motor', 'Fotoresistor', 'Transistores', 'LED', 'Pulsadores', 'Resistores'],
              ruralFocus: 'Gestión inteligente de ganadería',
              duration: '75 minutos',
              difficulty: 'Avanzado'
            }
          }
        ]
      }
    };
    return syllabusData[trimester] || syllabusData[3];
  };

  const currentSyllabus = getSyllabusData(trimester);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-montserrat font-bold text-yatina-text mb-2">
          {currentSyllabus.title}
        </h2>
        <p className="text-gray-600 mb-4">
          {grade} - Proyectos enfocados en agricultura y minería rural
        </p>
        <Badge className="bg-yatina-orange text-white">
          {currentSyllabus.topics.length} temas programados
        </Badge>
      </div>

      {/* Kit Disponible */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yatina-text">
            <Cog className="w-5 h-5" />
            Kit Educativo Disponible
          </CardTitle>
          <CardDescription>
            Materiales incluidos en tu kit de electrónica para todos los proyectos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-3">
            {availableKit.map((item, index) => (
              <div key={index} className="flex items-center gap-2 p-2 bg-white rounded-lg">
                <span className="text-lg">{item.icon}</span>
                <div>
                  <p className="text-xs font-medium text-yatina-text">{item.name}</p>
                  <p className="text-xs text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Temario y Proyectos */}
      <div className="space-y-6">
        <h3 className="text-xl font-montserrat font-semibold text-yatina-text">
          Temario y Proyectos Asignados
        </h3>
        
        <div className="grid gap-6">
          {currentSyllabus.topics.map((topic, index) => (
            <Card key={topic.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="grid md:grid-cols-3 gap-0">
                  {/* Imagen del proyecto */}
                  <div className="relative">
                    <img 
                      src={topic.project.image} 
                      alt={topic.project.name}
                      className="w-full h-48 md:h-full object-cover rounded-l-lg"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-yatina-orange text-white">
                        Clase {index + 1}
                      </Badge>
                    </div>
                  </div>
                  
                  {/* Contenido */}
                  <div className="md:col-span-2 p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-yatina-blue/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <topic.icon className="w-6 h-6 text-yatina-blue" />
                      </div>
                      
                      <div className="flex-1 space-y-4">
                        <div>
                          <h4 className="text-lg font-montserrat font-bold text-yatina-text mb-1">
                            {topic.title}
                          </h4>
                          <p className="text-sm text-gray-600 mb-3">
                            {topic.description}
                          </p>
                        </div>

                        <div className="bg-yatina-orange/10 rounded-lg p-4">
                          <h5 className="font-semibold text-yatina-text mb-2">
                            🛠️ Proyecto: {topic.project.name}
                          </h5>
                          <p className="text-sm text-gray-700 mb-3">
                            {topic.project.description}
                          </p>
                          
                          <div className="flex flex-wrap gap-2 mb-3">
                            <Badge variant="outline" className="text-xs">
                              ⏱️ {topic.project.duration}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              📊 {topic.project.difficulty}
                            </Badge>
                            <Badge variant="outline" className="text-xs bg-green-50 text-green-700">
                              🌾 {topic.project.ruralFocus}
                            </Badge>
                          </div>
                          
                          <div className="mb-4">
                            <span className="text-xs font-medium text-gray-700">Materiales necesarios: </span>
                            <span className="text-xs text-gray-600">
                              {topic.project.materials.join(', ')}
                            </span>
                          </div>
                          
                          <Button
                            onClick={() => onSelectProject(topic.project)}
                            className="btn-primary w-full sm:w-auto"
                          >
                            Generar Plan de Clase
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SyllabusView;
