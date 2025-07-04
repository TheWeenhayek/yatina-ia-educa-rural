
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

interface TrimesterSelectionProps {
  grade: string;
  onSelectTrimester: (trimester: number) => void;
}

const TrimesterSelection: React.FC<TrimesterSelectionProps> = ({ grade, onSelectTrimester }) => {
  const trimesters = [
    {
      number: 1,
      title: '1er Trimestre',
      description: 'Fundamentos y conceptos básicos',
      period: 'Febrero - Mayo',
      topics: 4
    },
    {
      number: 2,
      title: '2do Trimestre',
      description: 'Desarrollo de habilidades prácticas',
      period: 'Mayo - Agosto',
      topics: 5
    },
    {
      number: 3,
      title: '3er Trimestre',
      description: 'Proyectos avanzados y aplicación',
      period: 'Agosto - Noviembre',
      topics: 6
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-montserrat font-bold text-yatina-text mb-2">
          Trimestres para {grade}
        </h2>
        <p className="text-gray-600">
          Selecciona el trimestre para ver el temario correspondiente
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {trimesters.map((trimester) => (
          <Card
            key={trimester.number}
            className="cursor-pointer card-hover border-2 hover:border-yatina-orange transition-all duration-300"
            onClick={() => onSelectTrimester(trimester.number)}
          >
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-yatina-orange to-yatina-blue rounded-full flex items-center justify-center mx-auto mb-3">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl font-montserrat">{trimester.title}</CardTitle>
              <CardDescription className="text-sm text-gray-500">
                {trimester.period}
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-3">
              <p className="text-sm text-gray-700">
                {trimester.description}
              </p>
              <div className="bg-yatina-blue/10 rounded-lg p-3">
                <span className="text-lg font-bold text-yatina-blue">{trimester.topics}</span>
                <p className="text-xs text-gray-600">temas incluidos</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TrimesterSelection;
