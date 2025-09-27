import React, { useEffect, useState } from 'react';
import { PresentationSlide } from './PresentationSlide';
import { GlassCard } from './GlassCard';
import { Button } from '@/components/ui/button';
import { ChevronDown, Users, Zap, Gift, Award, CheckCircle, ArrowRight } from 'lucide-react';

const SponsorshipPresentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 6;

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaY > 0 && currentSlide < totalSlides - 1) {
        setCurrentSlide(prev => prev + 1);
      } else if (e.deltaY < 0 && currentSlide > 0) {
        setCurrentSlide(prev => prev - 1);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' && currentSlide < totalSlides - 1) {
        setCurrentSlide(prev => prev + 1);
      } else if (e.key === 'ArrowUp' && currentSlide > 0) {
        setCurrentSlide(prev => prev - 1);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentSlide]);

  const slides = [
    // Slide 1: Título Principal
    <PresentationSlide key={0} glowEffect>
      <div className="text-center space-y-8 animate-fade-in-up">
        <div className="space-y-4">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
            Propuesta de Intercambio
          </h1>
          <h2 className="text-5xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
            de Patrocinio
          </h2>
        </div>
        
        <GlassCard className="text-center">
          <div className="space-y-4">
            <p className="text-xl text-foreground/80">San Luis Potosí, 26 de septiembre de 2025</p>
            <div className="flex items-center justify-center space-x-4">
              <Zap className="w-8 h-8 text-primary" />
              <span className="text-2xl font-semibold">Juntify</span>
              <Zap className="w-8 h-8 text-primary" />
            </div>
            <p className="text-lg text-muted-foreground">Plataforma de gestión de reuniones con IA</p>
            <div className="border-t border-border pt-4">
              <p className="text-sm">De: Ing. Alejandro Báez - CEO Cero Uno Cero</p>
              <p className="text-sm">Para: Coordinación de Congreso BNI / Sra. Marylú Amaya</p>
            </div>
          </div>
        </GlassCard>

        <div className="flex justify-center animate-bounce">
          <ChevronDown className="w-8 h-8 text-primary" />
        </div>
      </div>
    </PresentationSlide>,

    // Slide 2: Lo que ofrecemos
    <PresentationSlide key={1}>
      <div className="space-y-8 animate-fade-in-up">
        <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
          Lo que ofrecemos como patrocinadores
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <GlassCard>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Gift className="w-8 h-8 text-primary" />
                <h3 className="text-xl font-semibold">Acceso gratuito a Juntify</h3>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Cada ponencia quedará registrada en la plataforma</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Transcripción completa de todas las ponencias</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Resúmenes inteligentes con puntos clave</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Asistente de IA para preguntas específicas</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>5 reuniones propias de 30 minutos por usuario</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>PDF personalizado con resúmenes</span>
                </li>
              </ul>
            </div>
          </GlassCard>

          <GlassCard>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Zap className="w-8 h-8 text-primary" />
                <h3 className="text-xl font-semibold">Infraestructura técnica</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">Cubierta al 100% por Juntify:</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Servidores y almacenamiento</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Consumo de IA (API OpenAI)</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Soporte técnico durante el evento</span>
                </li>
              </ul>
              
              <div className="mt-6 pt-4 border-t border-border">
                <div className="flex items-center space-x-3 mb-3">
                  <Award className="w-6 h-6 text-primary" />
                  <h4 className="font-semibold">Presencia de marca</h4>
                </div>
                <ul className="space-y-1 text-sm">
                  <li>• Patrocinador oficial del Congreso</li>
                  <li>• Presentación de 20 minutos</li>
                </ul>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </PresentationSlide>,

    // Slide 3: Lo que solicitamos
    <PresentationSlide key={2}>
      <div className="space-y-8 animate-fade-in-up">
        <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
          Lo que solicitamos a cambio
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <GlassCard>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Award className="w-8 h-8 text-primary" />
                <h3 className="text-xl font-semibold">Reconocimiento oficial</h3>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start space-x-2">
                  <ArrowRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Inclusión en materiales de comunicación</span>
                </li>
                <li className="flex items-start space-x-2">
                  <ArrowRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Menciones durante el evento</span>
                </li>
                <li className="flex items-start space-x-2">
                  <ArrowRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Banners y agradecimientos oficiales</span>
                </li>
                <li className="flex items-start space-x-2">
                  <ArrowRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Espacio de 20 minutos en el programa</span>
                </li>
                <li className="flex items-start space-x-2">
                  <ArrowRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Enlace único gestionado por coordinación</span>
                </li>
              </ul>
            </div>
          </GlassCard>

          <GlassCard>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Users className="w-8 h-8 text-primary" />
                <h3 className="text-xl font-semibold">Acceso para nuestro staff</h3>
              </div>
              <div className="bg-primary/10 rounded-lg p-4 mb-4">
                <p className="text-2xl font-bold text-primary text-center">6 integrantes</p>
                <p className="text-sm text-center text-muted-foreground">con playera corporativa</p>
              </div>
              <p className="text-sm font-medium mb-2">Sus funciones serán:</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start space-x-2">
                  <ArrowRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Orientar a asistentes en el uso de la herramienta</span>
                </li>
                <li className="flex items-start space-x-2">
                  <ArrowRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Atender dudas técnicas o de acceso</span>
                </li>
                <li className="flex items-start space-x-2">
                  <ArrowRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Facilitar contactos B2B discretos</span>
                </li>
              </ul>
              <p className="text-xs text-muted-foreground italic">
                *Sin instalación de banners ni publicidad invasiva
              </p>
            </div>
          </GlassCard>
        </div>
      </div>
    </PresentationSlide>,

    // Slide 4: Beneficios
    <PresentationSlide key={3}>
      <div className="space-y-8 animate-fade-in-up">
        <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
          Beneficios para el Congreso y los asistentes
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <GlassCard className="md:col-span-2">
            <div className="text-center space-y-4">
              <Zap className="w-16 h-16 text-primary mx-auto" />
              <h3 className="text-2xl font-semibold">Experiencia completa e innovadora</h3>
              <p className="text-lg text-muted-foreground">
                Los asistentes obtendrán no solo la experiencia en vivo, sino también un recurso práctico y duradero
              </p>
            </div>
          </GlassCard>

          <GlassCard>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Award className="w-8 h-8 text-primary" />
                <h3 className="text-xl font-semibold">Pioneros en IA</h3>
              </div>
              <p className="text-sm">
                El Congreso se distinguirá como pionero en integrar inteligencia artificial 
                para capitalizar el aprendizaje de manera efectiva.
              </p>
            </div>
          </GlassCard>

          <GlassCard>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Gift className="w-8 h-8 text-primary" />
                <h3 className="text-xl font-semibold">Patrocinio de alto valor</h3>
              </div>
              <p className="text-sm">
                Patrocinio en especie de alto valor tecnológico, 
                sin requerir inversión adicional del comité organizador.
              </p>
            </div>
          </GlassCard>

          <GlassCard className="md:col-span-2">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Users className="w-8 h-8 text-primary" />
                <h3 className="text-xl font-semibold">Mayor interacción y soporte</h3>
              </div>
              <p className="text-sm">
                Soporte inmediato para los asistentes gracias a la presencia del equipo de Juntify, 
                garantizando una experiencia fluida y profesional.
              </p>
            </div>
          </GlassCard>
        </div>
      </div>
    </PresentationSlide>,

    // Slide 5: Firma y contacto
    <PresentationSlide key={4}>
      <div className="space-y-8 animate-fade-in-up">
        <div className="text-center">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent mb-8">
            Contacto y firma
          </h2>
        </div>
        
        <GlassCard className="max-w-2xl mx-auto text-center">
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">Ing. Alejandro Báez</h3>
              <p className="text-lg text-primary">CEO – Cero Uno Cero</p>
              <p className="text-md text-muted-foreground">Desarrollador de Juntify</p>
            </div>
            
            <div className="border-t border-border pt-6">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <Zap className="w-12 h-12 text-primary" />
                <span className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                  Juntify
                </span>
              </div>
              <p className="text-sm text-muted-foreground italic">
                "Transformando reuniones con inteligencia artificial"
              </p>
            </div>
          </div>
        </GlassCard>
      </div>
    </PresentationSlide>,

    // Slide 6: Call to Action
    <PresentationSlide key={5} glowEffect>
      <div className="space-y-8 animate-fade-in-up text-center">
        <h2 className="text-5xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
          ¿Listos para innovar juntos?
        </h2>
        
        <GlassCard className="max-w-3xl mx-auto">
          <div className="space-y-6">
            <p className="text-xl">
              Esperamos su respuesta para comenzar esta alianza estratégica que beneficiará 
              a todos los participantes del Congreso BNI.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-4">
                Aceptar propuesta
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                Programar reunión
              </Button>
            </div>
            
            <div className="pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Esta propuesta está sujeta a términos y condiciones que pueden discutirse en reunión posterior.
              </p>
            </div>
          </div>
        </GlassCard>
      </div>
    </PresentationSlide>
  ];

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-background via-background/95 to-primary/20 overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-[var(--gradient-primary)] opacity-10" />
      
      {/* Slide content */}
      <div 
        className="h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateY(-${currentSlide * 100}vh)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="h-screen">
            {slide}
          </div>
        ))}
      </div>

      {/* Navigation dots */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 space-y-3 z-50">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-primary scale-125' 
                : 'bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 w-64 h-1 bg-white/20 rounded-full overflow-hidden z-50">
        <div 
          className="h-full bg-primary transition-all duration-700 ease-in-out"
          style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
        />
      </div>

      {/* Instructions */}
      <div className="fixed bottom-4 left-4 text-sm text-white/60 z-50">
        <p>Scroll para navegar • ↑↓ Flechas del teclado</p>
      </div>
    </div>
  );
};

export default SponsorshipPresentation;