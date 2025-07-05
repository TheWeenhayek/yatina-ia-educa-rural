import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Wrench, Lightbulb, Zap, Settings, Flame, Cog } from 'lucide-react';
import KitComponentModal from './KitComponentModal';

interface SyllabusViewProps {
  grade: string;
  trimester: number;
  onSelectProject: (project: any) => void;
}

const SyllabusView: React.FC<SyllabusViewProps> = ({ grade, trimester, onSelectProject }) => {
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Kit educativo disponible con información detallada
  const availableKit = [
    { 
      name: 'Motor', 
      icon: '⚙️', 
      description: 'Control de movimiento',
      image: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=400&h=400&fit=crop',
      specs: 'Motor DC de 6V, 100 RPM, bajo consumo de energía',
      purpose: 'El motor DC convierte energía eléctrica en movimiento rotatorio. Es perfecto para crear bombas de agua, ventiladores y sistemas de movimiento en proyectos agrícolas.',
      usage: 'Conecta el terminal positivo (+) al polo positivo de la batería y el negativo (-) al negativo. Siempre verifica la polaridad antes de conectar.',
      safetyTips: [
        'Verifica siempre la polaridad antes de conectar',
        'No excedas el voltaje recomendado (6V)',
        'Desconecta la alimentación antes de manipular',
        'Mantén los dedos alejados de las partes móviles'
      ],
      applications: [
        'Bomba de agua para riego automático de cultivos',
        'Ventilador para secado de granos (quinua, cebada)',
        'Mezclador para preparación de fertilizantes',
        'Sistema de movimiento para clasificar semillas'
      ]
    },
    { 
      name: 'Transistores BC548/BC558', 
      icon: '🔌', 
      description: 'Amplificación de señales',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=400&fit=crop',
      specs: 'BC548 (NPN) y BC558 (PNP), corriente máxima 100mA, voltaje 45V',
      purpose: 'Los transistores amplifican señales eléctricas pequeñas para controlar cargas mayores. Son como interruptores controlados electrónicamente.',
      usage: 'El BC548 tiene tres patitas: colector, base y emisor. Una pequeña corriente en la base controla una corriente mayor entre colector y emisor.',
      safetyTips: [
        'Identifica correctamente las patitas antes de conectar',
        'No apliques voltajes excesivos',
        'Usa resistencias limitadoras en la base',
        'Manipula con cuidado, son componentes delicados'
      ],
      applications: [
        'Amplificador para sensores de humedad del suelo',
        'Control automático de sistemas de riego',
        'Detector de metales básico para minería',
        'Interruptor automático para luces solares'
      ]
    },
    { 
      name: 'Resistores (100Ω-10kΩ)', 
      icon: '⚡', 
      description: 'Control de corriente',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=400&fit=crop',
      specs: 'Valores disponibles: 100Ω, 470Ω, 1kΩ, 10kΩ - Potencia 1/4W',
      purpose: 'Las resistencias limitan el flujo de corriente eléctrica, protegiendo otros componentes y controlando la cantidad de electricidad que pasa por el circuito.',
      usage: 'Los colores en la resistencia indican su valor. Lee de izquierda a derecha: primer color-segundo color-multiplicador.',
      safetyTips: [
        'Identifica el valor correcto usando el código de colores',
        'No excedas la potencia máxima (1/4W)',
        'Verifica con multímetro si tienes dudas',
        'Las resistencias no tienen polaridad'
      ],
      applications: [
        'Limitador de corriente para LEDs indicadores',
        'Divisor de voltaje para sensores',
        'Control de velocidad en motores pequeños',
        'Protección de circuitos sensibles'
      ]
    },
    { 
      name: 'Fotoresistor', 
      icon: '💡', 
      description: 'Sensor de luz',
      image: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=400&h=400&fit=crop',
      specs: 'Rango de resistencia: 1kΩ (luz directa) a 10MΩ (oscuridad total)',
      purpose: 'El fotoresistor cambia su resistencia según la cantidad de luz que recibe. A más luz, menor resistencia, y viceversa.',
      usage: 'Se conecta como una resistencia normal, pero su valor cambia con la luz. Úsalo con un divisor de voltaje para crear un sensor.',
      safetyTips: [
        'No tiene polaridad, se puede conectar en cualquier dirección',
        'Protégelo de la humedad excesiva',
        'Calibra el sensor según las condiciones de luz del lugar',
        'Combínalo con resistencias fijas para mejor control'
      ],
      applications: [
        'Sistema de alerta temprana para granizo (detecta cambios de luz)',
        'Control automático de luces en gallineros',
        'Detector de día/noche para sistemas solares',
        'Sensor de sombra para invernaderos'
      ]
    },
    { 
      name: 'Switch y Pulsadores', 
      icon: '🔘', 
      description: 'Control manual',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=400&fit=crop',
      specs: 'Switch SPDT 250V AC/3A, Pulsadores normalmente abiertos 12V DC',
      purpose: 'Los switches mantienen una posición (encendido/apagado), mientras que los pulsadores solo actúan mientras se presionan.',
      usage: 'El switch tiene 3 terminales: común, normalmente abierto y normalmente cerrado. Los pulsadores tienen 2 terminales.',
      safetyTips: [
        'Identifica qué tipo de interruptor necesitas',
        'No excedas las especificaciones de corriente',
        'Verifica las conexiones antes de energizar',
        'Mantén secos los contactos'
      ],
      applications: [
        'Control manual de bombas de riego',
        'Interruptor de emergencia para maquinaria',
        'Activación de sistemas de alerta',
        'Control de iluminación en establos'
      ]
    },
    { 
      name: 'LED y Lámpara', 
      icon: '💡', 
      description: 'Indicadores luminosos',
      image: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=400&h=400&fit=crop',
      specs: 'LED: 2-3V, 20mA | Lámpara: 6V, 0.5W con rosca pequeña',
      purpose: 'Los LEDs y lámparas convierten electricidad en luz. Los LEDs consumen menos energía y duran más tiempo.',
      usage: 'Los LEDs tienen polaridad: la patita larga es positiva (+). Siempre usa una resistencia limitadora con LEDs.',
      safetyTips: [
        'Respeta la polaridad en los LEDs',
        'Usa siempre resistencia limitadora con LEDs',
        'No toques las lámparas con las manos sucias',
        'Desconecta antes de reemplazar componentes'
      ],
      applications: [
        'Indicadores de estado en sistemas de riego',
        'Iluminación de emergencia en zonas rurales',
        'Señalización de peligro en maquinaria',
        'Luces para gallineros (mejora producción de huevos)'
      ]
    },
    { 
      name: 'Capacitores', 
      icon: '🔋', 
      description: 'Almacenamiento de energía',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=400&fit=crop',
      specs: 'Cerámico 104 (0.1µF), Electrolíticos 470µF y 1000µF/16V',
      purpose: 'Los capacitores almacenan energía eléctrica temporalmente y la liberan cuando es necesario. También filtran el ruido eléctrico.',
      usage: 'Los capacitores electrolíticos tienen polaridad (+ y -). Los cerámicos no tienen polaridad.',
      safetyTips: [
        'Respeta la polaridad en capacitores electrolíticos',
        'No excedas el voltaje máximo indicado',
        'Descarga capacitores grandes antes de manipular',
        'Los capacitores pueden mantener carga aunque esté desconectado'
      ],
      applications: [
        'Filtro de ruido en sistemas de comunicación rural',
        'Reserva de energía para sistemas intermitentes',
        'Mejora de arranque en motores pequeños',
        'Estabilización de voltaje en circuitos'
      ]
    },
    { 
      name: 'Potenciómetro 100k', 
      icon: '🎛️', 
      description: 'Control variable',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=400&fit=crop',
      specs: 'Potenciómetro lineal de 100kΩ con 3 terminales',
      purpose: 'El potenciómetro es una resistencia variable que permite ajustar valores girando un eje. Es como un control de volumen.',
      usage: 'Tiene 3 terminales: dos extremos (resistencia total) y uno central (cursor móvil). El valor entre extremo y centro varía al girar.',
      safetyTips: [
        'No forces el eje más allá de sus límites',
        'Protégelo del polvo y humedad',
        'Aplica voltajes apropiados según especificaciones',
        'Verifica conexiones antes de energizar'
      ],
      applications: [
        'Control de velocidad en ventiladores de secado',
        'Ajuste de sensibilidad en detectores',
        'Control de intensidad lumínica',
        'Regulación de flujo en sistemas de riego'
      ]
    }
  ];

  const handleComponentClick = (component: any) => {
    setSelectedComponent(component);
    setIsModalOpen(true);
  };

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

      {/* Kit Disponible - Ahora clickeable */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yatina-text">
            <Cog className="w-5 h-5" />
            Kit Educativo Disponible
          </CardTitle>
          <CardDescription>
            Haz clic en cada componente para ver detalles, especificaciones y aplicaciones
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-3">
            {availableKit.map((item, index) => (
              <div 
                key={index} 
                className="flex items-center gap-2 p-3 bg-white rounded-lg cursor-pointer hover:shadow-md hover:bg-blue-50 transition-all duration-200 border border-transparent hover:border-yatina-blue/30"
                onClick={() => handleComponentClick(item)}
              >
                <span className="text-lg">{item.icon}</span>
                <div>
                  <p className="text-xs font-medium text-yatina-text">{item.name}</p>
                  <p className="text-xs text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-3 text-center">
            💡 Haz clic en cualquier componente para ver información detallada
          </p>
        </CardContent>
      </Card>

      {/* Modal para detalles del componente */}
      <KitComponentModal 
        component={selectedComponent}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

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
