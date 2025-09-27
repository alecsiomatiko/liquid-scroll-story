import React, { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Users, Zap, Gift, Award, CheckCircle, ArrowRight, Sparkles, Building, ClipboardList, HeadphonesIcon, Shield } from 'lucide-react';

const SponsorshipPresentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const totalSlides = 6;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isTransitioning) return;

      if (e.deltaY > 0 && currentSlide < totalSlides - 1) {
        goToSlide(currentSlide + 1);
      } else if (e.deltaY < 0 && currentSlide > 0) {
        goToSlide(currentSlide - 1);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTransitioning) return;

      if (e.key === 'ArrowRight' && currentSlide < totalSlides - 1) {
        goToSlide(currentSlide + 1);
      } else if (e.key === 'ArrowLeft' && currentSlide > 0) {
        goToSlide(currentSlide - 1);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentSlide, isTransitioning]);

  const goToSlide = (slideIndex: number) => {
    if (slideIndex < 0 || slideIndex >= totalSlides || isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(slideIndex);
    setTimeout(() => setIsTransitioning(false), 800);
  };

  const GlassCard = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
    <div
      className={`
        relative backdrop-blur-3xl bg-[rgba(255,255,255,0.02)] 
        border border-[rgba(255,255,255,0.08)] rounded-3xl p-8
        shadow-[0_25px_80px_rgba(139,69,255,0.6)]
        hover:bg-[rgba(255,255,255,0.05)] hover:scale-105 
        transition-all duration-700 ease-out
        animate-slide-in-right overflow-hidden
        ${className}
      `}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Enhanced glass shine effect */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 animate-glass-shine" />
      </div>
      {children}
    </div>
  );

  const NeonOrb = ({ size = "w-32 h-32", position = "top-10 right-10", delay = 0, intensity = "normal" }: { size?: string; position?: string; delay?: number; intensity?: "normal" | "high" }) => (
    <div
      className={`absolute ${position} ${size} rounded-full animate-parallax-float`}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className={`w-full h-full rounded-full bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 animate-neon-glow ${intensity === "high" ? "opacity-90" : "opacity-70"} blur-2xl`} />
    </div>
  );

  const slides = [
    // Slide 1: Título Principal
    <div key={0} className="min-h-screen flex items-center justify-center p-8 relative">
      <NeonOrb size="w-96 h-96" position="top-20 right-20" delay={0} intensity="high" />
      <NeonOrb size="w-80 h-80" position="bottom-32 left-16" delay={1.5} intensity="high" />
      <NeonOrb size="w-64 h-64" position="top-40 left-32" delay={3} intensity="high" />
      
      <div className="max-w-6xl w-full text-center space-y-12 relative z-10">
        <div className="space-y-8">
          <div className="relative">
            <h1 className="text-8xl font-black text-white leading-tight drop-shadow-[0_0_30px_rgba(255,255,255,0.5)]">
              Propuesta de
            </h1>
            <h2 className="text-8xl font-black text-white leading-tight drop-shadow-[0_0_30px_rgba(255,255,255,0.5)]">
              Intercambio
            </h2>
            <h3 className="text-6xl font-bold text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">
              de Patrocinio
            </h3>
            <Sparkles className="absolute -top-4 -right-4 w-16 h-16 text-white animate-spin drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]" />
          </div>
        </div>
        
        <GlassCard className="max-w-4xl mx-auto text-center" delay={400}>
          <div className="space-y-6">
            <p className="text-2xl text-white">San Luis Potosí, 26 de septiembre de 2025</p>
            <div className="flex items-center justify-center space-x-6">
              <Zap className="w-12 h-12 text-white" />
              <span className="text-4xl font-bold text-white">Juntify</span>
              <Zap className="w-12 h-12 text-white" />
            </div>
            <p className="text-xl text-white/90">Plataforma de gestión de reuniones con IA</p>
            <div className="border-t border-white/20 pt-6 space-y-2">
              <p className="text-lg text-white/90">De: Ing. Alejandro Báez</p>
              <p className="text-lg text-white/90">Marca/Servicio: [Cero Uno Cero] – Juntify</p>
              <p className="text-lg text-white/90">Para: Coordinación de Congreso BNI / Sra. Marylú Amaya</p>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>,

    // Slide 2: Lo que ofrecemos - Parte 1
    <div key={1} className="min-h-screen flex items-center justify-center p-8 relative">
      <NeonOrb size="w-80 h-80" position="top-10 left-10" delay={0.5} intensity="high" />
      <NeonOrb size="w-72 h-72" position="bottom-20 right-20" delay={2} intensity="high" />
      
      <div className="max-w-7xl w-full space-y-12 relative z-10">
        <h2 className="text-6xl font-bold text-center text-white mb-16 drop-shadow-[0_0_30px_rgba(255,255,255,0.5)]">
          1. Lo que ofrecemos como patrocinadores
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <GlassCard delay={200}>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Gift className="w-12 h-12 text-white" />
                <h3 className="text-3xl font-bold text-white">Acceso gratuito a Juntify</h3>
              </div>
              <p className="text-lg text-white/90 mb-6">Para todos los asistentes del Congreso:</p>
              <div className="space-y-4">
                {[
                  "Cada ponencia quedará registrada en la plataforma",
                  "Los asistentes podrán consultar la transcripción completa de lo dicho",
                  "Se generarán resúmenes inteligentes con puntos clave y tareas recomendadas",
                  "Los usuarios tendrán acceso al asistente de IA para hacer preguntas específicas sobre la ponencia",
                  "Cada asistente podrá registrar hasta 5 reuniones propias de 30 minutos, como beneficio adicional",
                  "Entrega de un PDF personalizado con el resumen y puntos clave de cada ponencia"
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-white mt-1 flex-shrink-0" />
                    <span className="text-white/90 text-lg">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>

          <GlassCard delay={400}>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Shield className="w-12 h-12 text-white" />
                <h3 className="text-3xl font-bold text-white">Infraestructura técnica</h3>
              </div>
              <p className="text-lg text-white/90 mb-6">Cubierta al 100% por Juntify:</p>
              <div className="space-y-4">
                {[
                  "Servidores y almacenamiento",
                  "Consumo de IA (API OpenAI)",
                  "Soporte técnico durante el evento"
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-white mt-1 flex-shrink-0" />
                    <span className="text-white/90 text-lg">{item}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 pt-6 border-t border-white/20">
                <div className="flex items-center space-x-4 mb-4">
                  <Award className="w-8 h-8 text-white" />
                  <h4 className="text-xl font-bold text-white">Presencia de marca durante el Congreso</h4>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-white mt-1 flex-shrink-0" />
                    <span className="text-white/90">Inclusión de la marca Juntify como patrocinador oficial</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-white mt-1 flex-shrink-0" />
                    <span className="text-white/90">Participación en la agenda con una presentación de 20 minutos sobre la plataforma</span>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>,

    // Slide 3: Lo que solicitamos
    <div key={2} className="min-h-screen flex items-center justify-center p-8 relative">
      <NeonOrb size="w-72 h-72" position="top-16 right-16" delay={1} intensity="high" />
      <NeonOrb size="w-88 h-88" position="bottom-16 left-32" delay={2.5} intensity="high" />
      
      <div className="max-w-7xl w-full space-y-12 relative z-10">
        <h2 className="text-6xl font-bold text-center text-white mb-16 drop-shadow-[0_0_30px_rgba(255,255,255,0.5)]">
          2. Lo que solicitamos a cambio
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <GlassCard delay={200}>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Award className="w-12 h-12 text-white" />
                <h3 className="text-3xl font-bold text-white">Reconocimiento y espacio</h3>
              </div>
              <div className="space-y-4">
                {[
                  "Reconocimiento de patrocinio en materiales de comunicación y durante el evento (programa, menciones, banners, agradecimientos oficiales)",
                  "Espacio de 20 minutos dentro del programa del Congreso para la presentación de Juntify",
                  "Autorización para brindar acceso gratuito a los asistentes mediante un enlace único gestionado por el comité de coordinación"
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <ArrowRight className="w-6 h-6 text-white mt-1 flex-shrink-0" />
                    <span className="text-white/90 text-lg">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>

          <GlassCard delay={400}>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Users className="w-12 h-12 text-white" />
                <h3 className="text-3xl font-bold text-white">Acceso para nuestro staff</h3>
              </div>
              <div className="bg-white/10 rounded-2xl p-6 mb-6 border border-white/20">
                <p className="text-4xl font-bold text-white text-center">6 integrantes</p>
                <p className="text-lg text-center text-white/90">con playera corporativa</p>
              </div>
              <p className="text-lg font-semibold mb-4 text-white">Quienes estarán presentes para:</p>
              <div className="space-y-4">
                {[
                  "Orientar a los asistentes en el uso de la herramienta",
                  "Atender dudas técnicas o de acceso",
                  "Facilitar contactos B2B con otros participantes, de manera discreta y sin instalación de banners ni publicidad invasiva"
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <ArrowRight className="w-6 h-6 text-white mt-1 flex-shrink-0" />
                    <span className="text-white/90 text-lg">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>,

    // Slide 4: Beneficios
    <div key={3} className="min-h-screen flex items-center justify-center p-8 relative">
      <NeonOrb size="w-64 h-64" position="top-20 left-20" delay={0.8} intensity="high" />
      <NeonOrb size="w-96 h-96" position="bottom-10 right-10" delay={2.2} intensity="high" />
      
      <div className="max-w-7xl w-full space-y-12 relative z-10">
        <h2 className="text-6xl font-bold text-center text-white mb-16 drop-shadow-[0_0_30px_rgba(255,255,255,0.5)]">
          3. Beneficios para el Congreso y los asistentes
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <GlassCard delay={200}>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Zap className="w-12 h-12 text-white" />
                <h3 className="text-3xl font-bold text-white">Experiencia duradera</h3>
              </div>
              <p className="text-lg text-white/90">
                Los asistentes obtendrán no solo la experiencia en vivo, sino también un recurso práctico y duradero.
              </p>
            </div>
          </GlassCard>

          <GlassCard delay={400}>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Award className="w-12 h-12 text-white" />
                <h3 className="text-3xl font-bold text-white">Pioneros en IA</h3>
              </div>
              <p className="text-lg text-white/90">
                El Congreso se distinguirá como pionero en integrar inteligencia artificial para capitalizar el aprendizaje.
              </p>
            </div>
          </GlassCard>

          <GlassCard delay={600}>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Gift className="w-12 h-12 text-white" />
                <h3 className="text-3xl font-bold text-white">Patrocinio de alto valor</h3>
              </div>
              <p className="text-lg text-white/90">
                El comité organizador contará con un patrocinio en especie de alto valor tecnológico, sin requerir inversión adicional.
              </p>
            </div>
          </GlassCard>

          <GlassCard delay={800}>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <HeadphonesIcon className="w-12 h-12 text-white" />
                <h3 className="text-3xl font-bold text-white">Mayor interacción y soporte</h3>
              </div>
              <p className="text-lg text-white/90">
                Mayor interacción y soporte inmediato para los asistentes, gracias a la presencia del equipo de Juntify.
              </p>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>,

    // Slide 5: Firma y contacto
    <div key={4} className="min-h-screen flex items-center justify-center p-8 relative">
      <NeonOrb size="w-80 h-80" position="top-32 left-16" delay={1.2} intensity="high" />
      <NeonOrb size="w-60 h-60" position="bottom-32 right-32" delay={2.8} intensity="high" />
      
      <div className="max-w-5xl w-full space-y-12 relative z-10">
        <h2 className="text-6xl font-bold text-center text-white mb-16 drop-shadow-[0_0_30px_rgba(255,255,255,0.5)]">
          Firma
        </h2>
        
        <GlassCard className="max-w-3xl mx-auto text-center" delay={400}>
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-4xl font-bold text-white">Ing. Alejandro Báez</h3>
              <p className="text-2xl text-white font-semibold">CEO – Cero Uno Cero</p>
              <p className="text-xl text-white/90">Desarrollador de Juntify</p>
            </div>
            
            <div className="border-t border-white/20 pt-8">
              <div className="flex items-center justify-center space-x-6 mb-6">
                <Zap className="w-16 h-16 text-white animate-pulse" />
                <span className="text-5xl font-bold text-white">
                  Juntify
                </span>
              </div>
              <p className="text-lg text-white/90 italic">
                "Transformando reuniones con inteligencia artificial"
              </p>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>,

    // Slide 6: Call to Action
    <div key={5} className="min-h-screen flex items-center justify-center p-8 relative">
      <NeonOrb size="w-96 h-96" position="top-10 right-10" delay={0} intensity="high" />
      <NeonOrb size="w-80 h-80" position="bottom-10 left-10" delay={1.5} intensity="high" />
      <NeonOrb size="w-64 h-64" position="top-40 left-40" delay={3} intensity="high" />
      
      <div className="max-w-6xl w-full space-y-12 text-center relative z-10">
        <h2 className="text-7xl font-bold text-white leading-tight drop-shadow-[0_0_40px_rgba(255,255,255,0.6)]">
          ¿Listos para innovar juntos?
        </h2>
        
        <GlassCard className="max-w-4xl mx-auto" delay={400}>
          <div className="space-y-8">
            <p className="text-2xl text-white/90 leading-relaxed">
              Esperamos su respuesta para comenzar esta alianza estratégica que beneficiará 
              a todos los participantes del Congreso BNI.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="text-xl px-12 py-6 bg-white/20 hover:bg-white/30 border-0 text-white backdrop-blur-sm">
                Aceptar propuesta
              </Button>
              <Button variant="outline" size="lg" className="text-xl px-12 py-6 border-white/30 text-white hover:bg-white/10">
                Programar reunión
              </Button>
            </div>
            
            <div className="pt-6 border-t border-white/20">
              <p className="text-lg text-white/80">
                Esta propuesta está sujeta a términos y condiciones que pueden discutirse en reunión posterior.
              </p>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  ];

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Intense purple neon background with more lights */}
      <div className="absolute inset-0 bg-[var(--gradient-bg)]" />
      <div className="absolute inset-0 bg-gradient-to-br from-purple-800/30 via-pink-800/20 to-purple-900/40" />
      
      {/* Multiple floating neon lights */}
      <div className="absolute top-20 left-20 w-6 h-6 bg-purple-400 rounded-full animate-ping opacity-80" />
      <div className="absolute top-40 right-32 w-4 h-4 bg-pink-400 rounded-full animate-ping opacity-60" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-32 left-32 w-3 h-3 bg-purple-300 rounded-full animate-ping opacity-70" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-20 right-20 w-8 h-8 bg-pink-300 rounded-full animate-ping opacity-50" style={{ animationDelay: '0.5s' }} />
      <div className="absolute top-60 left-60 w-5 h-5 bg-purple-500 rounded-full animate-ping opacity-60" style={{ animationDelay: '1.5s' }} />
      <div className="absolute top-80 right-80 w-4 h-4 bg-pink-500 rounded-full animate-ping opacity-40" style={{ animationDelay: '2.5s' }} />
      
      {/* Additional curved light streaks */}
      <div className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-purple-400/20 via-transparent to-pink-400/20 transform rotate-12 animate-pulse" />
      <div className="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-pink-400/15 via-transparent to-purple-400/15 transform -rotate-12 animate-pulse" style={{ animationDelay: '1s' }} />
      
      {/* Slides container with horizontal transition */}
      <div 
        ref={containerRef}
        className="h-full transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] flex"
        style={{ transform: `translateX(-${currentSlide * 100}vw)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="w-screen flex-shrink-0">
            {slide}
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={() => goToSlide(currentSlide - 1)}
        disabled={currentSlide === 0 || isTransitioning}
        className="fixed left-8 top-1/2 transform -translate-y-1/2 p-4 rounded-full backdrop-blur-3xl bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-white hover:text-white hover:bg-[rgba(255,255,255,0.1)] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 z-50"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>

      <button
        onClick={() => goToSlide(currentSlide + 1)}
        disabled={currentSlide === totalSlides - 1 || isTransitioning}
        className="fixed right-8 top-1/2 transform -translate-y-1/2 p-4 rounded-full backdrop-blur-3xl bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-white hover:text-white hover:bg-[rgba(255,255,255,0.1)] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 z-50"
      >
        <ChevronRight className="w-8 h-8" />
      </button>

      {/* Navigation dots */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4 z-50">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            disabled={isTransitioning}
            className={`w-4 h-4 rounded-full transition-all duration-500 ${
              index === currentSlide 
                ? 'bg-white scale-125 shadow-lg shadow-white/50' 
                : 'bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="fixed top-8 left-1/2 transform -translate-x-1/2 w-80 h-2 bg-white/10 rounded-full overflow-hidden z-50">
        <div 
          className="h-full bg-white transition-all duration-1000 ease-out"
          style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
        />
      </div>

      {/* Instructions */}
      <div className="fixed bottom-4 left-4 text-sm text-white/70 z-50">
        <p>Scroll o ← → para navegar</p>
      </div>
    </div>
  );
};

export default SponsorshipPresentation;