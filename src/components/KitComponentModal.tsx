
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, Lightbulb, Zap, Settings } from 'lucide-react';

interface KitComponent {
  name: string;
  icon: string;
  description: string;
  image: string;
  specs: string;
  purpose: string;
  usage: string;
  safetyTips: string[];
  applications: string[];
}

interface KitComponentModalProps {
  component: KitComponent | null;
  isOpen: boolean;
  onClose: () => void;
}

const KitComponentModal: React.FC<KitComponentModalProps> = ({ component, isOpen, onClose }) => {
  if (!component) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-yatina-text">
            <span className="text-2xl">{component.icon}</span>
            {component.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Imagen del componente */}
          <div className="flex justify-center">
            <img 
              src={component.image} 
              alt={component.name}
              className="w-48 h-48 object-cover rounded-lg border-2 border-yatina-blue/20"
            />
          </div>

          {/* Descripción y propósito */}
          <Card className="bg-blue-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="w-5 h-5 text-yatina-orange" />
                <h3 className="font-semibold text-yatina-text">¿Qué es y para qué sirve?</h3>
              </div>
              <p className="text-gray-700 mb-3">{component.description}</p>
              <p className="text-gray-700">{component.purpose}</p>
            </CardContent>
          </Card>

          {/* Especificaciones técnicas */}
          <Card className="bg-gray-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Settings className="w-5 h-5 text-yatina-blue" />
                <h3 className="font-semibold text-yatina-text">Especificaciones</h3>
              </div>
              <p className="text-sm text-gray-700 bg-white p-2 rounded">
                {component.specs}
              </p>
            </CardContent>
          </Card>

          {/* Forma de uso */}
          <Card className="bg-green-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5 text-green-600" />
                <h3 className="font-semibold text-yatina-text">¿Cómo se usa?</h3>
              </div>
              <p className="text-gray-700">{component.usage}</p>
            </CardContent>
          </Card>

          {/* Buenas prácticas de seguridad */}
          <Card className="bg-red-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <h3 className="font-semibold text-yatina-text">Buenas Prácticas de Seguridad</h3>
              </div>
              <ul className="space-y-2">
                {component.safetyTips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    {tip}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Aplicaciones sencillas */}
          <Card className="bg-yatina-orange/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">🛠️</span>
                <h3 className="font-semibold text-yatina-text">Aplicaciones Sencillas</h3>
              </div>
              <div className="space-y-2">
                {component.applications.map((app, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Badge variant="outline" className="text-xs bg-yatina-orange text-white">
                      {index + 1}
                    </Badge>
                    <span className="text-sm text-gray-700">{app}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default KitComponentModal;
