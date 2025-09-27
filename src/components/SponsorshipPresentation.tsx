import React, { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Users, Zap, Gift, Award, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';

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
        relative backdrop-blur-2xl bg-[rgba(255,255,255,0.1)] 
        border border-[rgba(255,255,255,0.2)] rounded-2xl p-8
        shadow-[0_20px_60px_rgba(139,69,255,0.4)]
        hover:bg-[rgba(255,255,255,0.15)] hover:scale-105 
        transition-all duration-700 ease-out
        animate-slide-in-right overflow-hidden
        ${className}
      `}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Glass shine effect */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 animate-glass-shine" />
      </div>
      {children}
    </div>
  );

  const NeonOrb = ({ size = "w-32 h-32", position = "top-10 right-10", delay = 0 }: { size?: string; position?: string; delay?: number }) => (
    <div
      className={`absolute ${position} ${size} rounded-full animate-parallax-float`}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="w-full h-full rounded-full bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 animate-neon-glow opacity-60 blur-xl" />
    </div>
  );

  const slides = [
    // Slide 1: Título Principal
    <div key={0} className="min-h-screen flex items-center justify-center p-8 relative">
      <NeonOrb size="w-96 h-96" position="top-20 right-20" delay={0} />
      <NeonOrb size="w-64 h-64" position="bottom-32 left-16" delay={1.5} />
      <NeonOrb size="w-48 h-48" position="top-40 left-32" delay={3} />
      
      <div className="max-w-6xl w-full text-center space-y-12 relative z-10">
        <div className="space-y-8">
          <div className="relative">
            <h1 className="text-8xl font-black bg-gradient-to-r from-purple-300 via-pink-300 to-purple-400 bg-clip-text text-transparent leading-tight">
              Propuesta de
            </h1>
            <h2 className="text-8xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-purple-300 bg-clip-text text-transparent leading-tight">
              Intercambio
            </h2>
            <h3 className="text-6xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
              de Patrocinio
            </h3>
            <Sparkles className="absolute -top-4 -right-4 w-16 h-16 text-purple-300 animate-spin" />
          </div>
        </div>
        
        <GlassCard className="max-w-4xl mx-auto text-center" delay={400}>
          <div className="space-y-6">
            <p className="text-2xl text-purple-200">San Luis Potosí, 26 de septiembre de 2025</p>
            <div className="flex items-center justify-center space-x-6">
              <Zap className="w-12 h-12 text-purple-300" />
              <span className="text-4xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">Juntify</span>
              <Zap className="w-12 h-12 text-purple-300" />
            </div>
            <p className="text-xl text-purple-300">Plataforma de gestión de reuniones con IA</p>
            <div className="border-t border-purple-400/30 pt-6 space-y-2">
              <p className="text-lg text-purple-200">De: Ing. Alejandro Báez - CEO Cero Uno Cero</p>
              <p className="text-lg text-purple-200">Para: Coordinación de Congreso BNI / Sra. Marylú Amaya</p>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>,

    // Slide 2: Lo que ofrecemos
    <div key={1} className="min-h-screen flex items-center justify-center p-8 relative">
      <NeonOrb size="w-80 h-80" position="top-10 left-10" delay={0.5} />
      <NeonOrb size="w-56 h-56" position="bottom-20 right-20" delay={2} />
      
      <div className="max-w-7xl w-full space-y-12 relative z-10">
        <h2 className="text-6xl font-bold text-center bg-gradient-to-r from-purple-300 via-pink-300 to-purple-400 bg-clip-text text-transparent mb-16">
          Lo que ofrecemos como patrocinadores
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <GlassCard delay={200}>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Gift className="w-12 h-12 text-purple-300" />
                <h3 className="text-3xl font-bold text-white">Acceso gratuito a Juntify</h3>
              </div>
              <div className="space-y-4">
                {[
                  "Cada ponencia quedará registrada en la plataforma",
                  "Transcripción completa de todas las ponencias",
                  "Resúmenes inteligentes con puntos clave",
                  "Asistente de IA para preguntas específicas",
                  "5 reuniones propias de 30 minutos por usuario",
                  "PDF personalizado con resúmenes"
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-purple-300 mt-1 flex-shrink-0" />
                    <span className="text-purple-100 text-lg">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>

          <GlassCard delay={400}>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Zap className="w-12 h-12 text-purple-300" />
                <h3 className="text-3xl font-bold text-white">Infraestructura técnica</h3>
              </div>
              <p className="text-lg text-purple-200 mb-6">Cubierta al 100% por Juntify:</p>
              <div className="space-y-4">
                {[
                  "Servidores y almacenamiento",
                  "Consumo de IA (API OpenAI)",
                  "Soporte técnico durante el evento"
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-purple-300 mt-1 flex-shrink-0" />
                    <span className="text-purple-100 text-lg">{item}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 pt-6 border-t border-purple-400/30">
                <div className="flex items-center space-x-4 mb-4">
                  <Award className="w-8 h-8 text-purple-300" />
                  <h4 className="text-xl font-bold text-white">Presencia de marca</h4>
                </div>
                <div className="space-y-2">
                  <p className="text-purple-100">• Patrocinador oficial del Congreso</p>
                  <p className="text-purple-100">• Presentación de 20 minutos</p>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>,

    // Slide 3: Lo que solicitamos
    <div key={2} className="min-h-screen flex items-center justify-center p-8 relative">
      <NeonOrb size="w-72 h-72" position="top-16 right-16" delay={1} />
      <NeonOrb size="w-48 h-48" position="bottom-16 left-32" delay={2.5} />
      
      <div className="max-w-7xl w-full space-y-12 relative z-10">
        <h2 className="text-6xl font-bold text-center bg-gradient-to-r from-purple-300 via-pink-300 to-purple-400 bg-clip-text text-transparent mb-16">
          Lo que solicitamos a cambio
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <GlassCard delay={200}>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Award className="w-12 h-12 text-purple-300" />
                <h3 className="text-3xl font-bold text-white">Reconocimiento oficial</h3>
              </div>
              <div className="space-y-4">
                {[
                  "Inclusión en materiales de comunicación",
                  "Menciones durante el evento",
                  "Banners y agradecimientos oficiales",
                  "Espacio de 20 minutos en el programa",
                  "Enlace único gestionado por coordinación"
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <ArrowRight className="w-6 h-6 text-purple-300 mt-1 flex-shrink-0" />
                    <span className="text-purple-100 text-lg">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>

          <GlassCard delay={400}>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Users className="w-12 h-12 text-purple-300" />
                <h3 className="text-3xl font-bold text-white">Acceso para nuestro staff</h3>
              </div>
              <div className="bg-purple-500/20 rounded-2xl p-6 mb-6 border border-purple-400/30">
                <p className="text-4xl font-bold text-purple-300 text-center">6 integrantes</p>
                <p className="text-lg text-center text-purple-200">con playera corporativa</p>
              </div>
              <p className="text-lg font-semibold mb-4 text-white">Sus funciones serán:</p>
              <div className="space-y-4">
                {[
                  "Orientar a asistentes en el uso de la herramienta",
                  "Atender dudas técnicas o de acceso",
                  "Facilitar contactos B2B discretos"
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <ArrowRight className="w-6 h-6 text-purple-300 mt-1 flex-shrink-0" />
                    <span className="text-purple-100 text-lg">{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-purple-300 italic mt-4">
                *Sin instalación de banners ni publicidad invasiva
              </p>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>,

    // Slide 4: Beneficios
    <div key={3} className="min-h-screen flex items-center justify-center p-8 relative">
      <NeonOrb size="w-64 h-64" position="top-20 left-20" delay={0.8} />
      <NeonOrb size="w-96 h-96" position="bottom-10 right-10" delay={2.2} />
      
      <div className="max-w-7xl w-full space-y-12 relative z-10">
        <h2 className="text-6xl font-bold text-center bg-gradient-to-r from-purple-300 via-pink-300 to-purple-400 bg-clip-text text-transparent mb-16">
          Beneficios para el Congreso y los asistentes
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <GlassCard className="lg:col-span-2" delay={200}>
            <div className="text-center space-y-6">
              <Zap className="w-20 h-20 text-purple-300 mx-auto animate-pulse" />
              <h3 className="text-4xl font-bold text-white">Experiencia completa e innovadora</h3>
              <p className="text-2xl text-purple-200">
                Los asistentes obtendrán no solo la experiencia en vivo, sino también un recurso práctico y duradero
              </p>
            </div>
          </GlassCard>

          <GlassCard delay={400}>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Award className="w-12 h-12 text-purple-300" />
                <h3 className="text-3xl font-bold text-white">Pioneros en IA</h3>
              </div>
              <p className="text-lg text-purple-100">
                El Congreso se distinguirá como pionero en integrar inteligencia artificial 
                para capitalizar el aprendizaje de manera efectiva.
              </p>
            </div>
          </GlassCard>

          <GlassCard delay={600}>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Gift className="w-12 h-12 text-purple-300" />
                <h3 className="text-3xl font-bold text-white">Patrocinio de alto valor</h3>
              </div>
              <p className="text-lg text-purple-100">
                Patrocinio en especie de alto valor tecnológico, 
                sin requerir inversión adicional del comité organizador.
              </p>
            </div>
          </GlassCard>

          <GlassCard className="lg:col-span-2" delay={800}>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Users className="w-12 h-12 text-purple-300" />
                <h3 className="text-3xl font-bold text-white">Mayor interacción y soporte</h3>
              </div>
              <p className="text-lg text-purple-100">
                Soporte inmediato para los asistentes gracias a la presencia del equipo de Juntify, 
                garantizando una experiencia fluida y profesional.
              </p>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>,

    // Slide 5: Firma y contacto
    <div key={4} className="min-h-screen flex items-center justify-center p-8 relative">
      <NeonOrb size="w-80 h-80" position="top-32 left-16" delay={1.2} />
      <NeonOrb size="w-60 h-60" position="bottom-32 right-32" delay={2.8} />
      
      <div className="max-w-5xl w-full space-y-12 relative z-10">
        <h2 className="text-6xl font-bold text-center bg-gradient-to-r from-purple-300 via-pink-300 to-purple-400 bg-clip-text text-transparent mb-16">
          Contacto y firma
        </h2>
        
        <GlassCard className="max-w-3xl mx-auto text-center" delay={400}>
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-4xl font-bold text-white">Ing. Alejandro Báez</h3>
              <p className="text-2xl text-purple-300 font-semibold">CEO – Cero Uno Cero</p>
              <p className="text-xl text-purple-200">Desarrollador de Juntify</p>
            </div>
            
            <div className="border-t border-purple-400/30 pt-8">
              <div className="flex items-center justify-center space-x-6 mb-6">
                <Zap className="w-16 h-16 text-purple-300 animate-pulse" />
                <span className="text-5xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                  Juntify
                </span>
              </div>
              <p className="text-lg text-purple-200 italic">
                "Transformando reuniones con inteligencia artificial"
              </p>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>,

    // Slide 6: Call to Action
    <div key={5} className="min-h-screen flex items-center justify-center p-8 relative">
      <NeonOrb size="w-96 h-96" position="top-10 right-10" delay={0} />
      <NeonOrb size="w-80 h-80" position="bottom-10 left-10" delay={1.5} />
      <NeonOrb size="w-64 h-64" position="top-40 left-40" delay={3} />
      
      <div className="max-w-6xl w-full space-y-12 text-center relative z-10">
        <h2 className="text-7xl font-bold bg-gradient-to-r from-purple-300 via-pink-300 to-purple-400 bg-clip-text text-transparent leading-tight">
          ¿Listos para innovar juntos?
        </h2>
        
        <GlassCard className="max-w-4xl mx-auto" delay={400}>
          <div className="space-y-8">
            <p className="text-2xl text-purple-100 leading-relaxed">
              Esperamos su respuesta para comenzar esta alianza estratégica que beneficiará 
              a todos los participantes del Congreso BNI.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="text-xl px-12 py-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 border-0">
                Aceptar propuesta
              </Button>
              <Button variant="outline" size="lg" className="text-xl px-12 py-6 border-purple-400 text-purple-300 hover:bg-purple-500/20">
                Programar reunión
              </Button>
            </div>
            
            <div className="pt-6 border-t border-purple-400/30">
              <p className="text-lg text-purple-300">
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
      {/* Purple neon background with gradients */}
      <div className="absolute inset-0 bg-[var(--gradient-bg)]" />
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-pink-900/20" />
      
      {/* Additional floating lights */}
      <div className="absolute top-20 left-20 w-4 h-4 bg-purple-400 rounded-full animate-ping opacity-60" />
      <div className="absolute top-40 right-32 w-3 h-3 bg-pink-400 rounded-full animate-ping opacity-40" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-32 left-32 w-2 h-2 bg-purple-300 rounded-full animate-ping opacity-50" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-20 right-20 w-5 h-5 bg-pink-300 rounded-full animate-ping opacity-30" style={{ animationDelay: '0.5s' }} />
      
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
        className="fixed left-8 top-1/2 transform -translate-y-1/2 p-4 rounded-full backdrop-blur-xl bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.2)] text-purple-300 hover:text-white hover:bg-[rgba(255,255,255,0.2)] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 z-50"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>

      <button
        onClick={() => goToSlide(currentSlide + 1)}
        disabled={currentSlide === totalSlides - 1 || isTransitioning}
        className="fixed right-8 top-1/2 transform -translate-y-1/2 p-4 rounded-full backdrop-blur-xl bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.2)] text-purple-300 hover:text-white hover:bg-[rgba(255,255,255,0.2)] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 z-50"
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
                ? 'bg-purple-400 scale-125 shadow-lg shadow-purple-400/50' 
                : 'bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="fixed top-8 left-1/2 transform -translate-x-1/2 w-80 h-2 bg-white/10 rounded-full overflow-hidden z-50">
        <div 
          className="h-full bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-1000 ease-out"
          style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
        />
      </div>

      {/* Instructions */}
      <div className="fixed bottom-4 left-4 text-sm text-purple-300/80 z-50">
        <p>Scroll o ← → para navegar</p>
      </div>
    </div>
  );
};

export default SponsorshipPresentation;