
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, Users, BookOpen } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Login = () => {
  const [codigo, setCodigo] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!codigo.trim()) {
      toast({
        title: "Error",
        description: "Por favor ingresa tu código de acceso",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    setTimeout(() => {
      const success = login(codigo);
      if (!success) {
        toast({
          title: "Código incorrecto",
          description: "El código ingresado no es válido. Verifica con tu coordinador.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "¡Bienvenido a YATIÑA-IA!",
          description: "Has iniciado sesión correctamente",
        });
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yatina-blue/10 via-yatina-bg to-yatina-orange/10 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex justify-center items-center gap-3 mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-yatina-orange to-yatina-blue rounded-full flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-montserrat font-bold text-yatina-text">
              YATIÑA-IA
            </h1>
          </div>
          <p className="text-lg text-gray-600 font-roboto">
            Plataforma educativa de robótica y electrónica para comunidades rurales
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Info Section */}
          <div className="space-y-6 animate-fade-in">
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-montserrat font-semibold text-yatina-text mb-4">
                Educación tecnológica accesible para todos
              </h2>
              <p className="text-gray-600 mb-6">
                Aprende robótica y electrónica básica con proyectos prácticos, guías paso a paso y asistencia inteligente.
              </p>
            </div>

            <div className="grid gap-4">
              <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
                <div className="w-10 h-10 bg-yatina-orange/10 rounded-full flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-yatina-orange" />
                </div>
                <div>
                  <h3 className="font-montserrat font-semibold text-yatina-text">Para Docentes</h3>
                  <p className="text-sm text-gray-600">Genera contenido educativo automáticamente</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
                <div className="w-10 h-10 bg-yatina-blue/10 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-yatina-blue" />
                </div>
                <div>
                  <h3 className="font-montserrat font-semibold text-yatina-text">Para Estudiantes</h3>
                  <p className="text-sm text-gray-600">Aprende con proyectos prácticos y divertidos</p>
                </div>
              </div>
            </div>
          </div>

          {/* Login Form */}
          <Card className="shadow-xl animate-fade-in">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-montserrat text-yatina-text">
                Iniciar Sesión
              </CardTitle>
              <CardDescription>
                Ingresa tu código único para acceder a la plataforma
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="codigo" className="block text-sm font-medium text-yatina-text mb-2">
                    Código de Acceso
                  </label>
                  <Input
                    id="codigo"
                    type="text"
                    placeholder="Ej: CODDOCENTE2025"
                    value={codigo}
                    onChange={(e) => setCodigo(e.target.value.toUpperCase())}
                    className="text-center text-lg font-mono tracking-wider"
                    disabled={loading}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full btn-primary text-lg py-6"
                  disabled={loading}
                >
                  {loading ? "Verificando..." : "Ingresar"}
                </Button>
              </form>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-montserrat font-semibold text-sm text-yatina-text mb-2">
                  Códigos de prueba:
                </h4>
                <div className="space-y-1 text-sm font-mono">
                  <div>Docente: <span className="text-yatina-orange font-semibold">CODDOCENTE2025</span></div>
                  <div>Estudiante: <span className="text-yatina-blue font-semibold">CODESTUDIANTE2025</span></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
