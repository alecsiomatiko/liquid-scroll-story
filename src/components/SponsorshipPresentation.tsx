import React, { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Users, Mic, Gift, Award, CheckCircle, ArrowRight, Sparkles, Building, ClipboardList, HeadphonesIcon, Shield, Menu } from 'lucide-react';

const SponsorshipPresentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const totalSlides = 6;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

    // Touch handling for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.changedTouches[0].screenX;
    };
    
    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX = e.changedTouches[0].screenX;
      if (isTransitioning) return;
      
      const difference = touchStartX - touchEndX;
      const threshold = 50;
      
      if (Math.abs(difference) > threshold) {
        if (difference > 0 && currentSlide < totalSlides - 1) {
          // Swipe left - next slide
          goToSlide(currentSlide + 1);
        } else if (difference < 0 && currentSlide > 0) {
          // Swipe right - previous slide
          goToSlide(currentSlide - 1);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentSlide, isTransitioning]);

  const goToSlide = (slideIndex: number) => {
    if (slideIndex < 0 || slideIndex >= totalSlides || isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(slideIndex);
    setTimeout(() => setIsTransitioning(false), 1000);
  };

  const GlassCard = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
    <div
      className={`
        relative backdrop-blur-3xl bg-[rgba(255,255,255,0.04)] 
        border border-[rgba(255,255,255,0.12)] rounded-3xl 
        ${isMobile ? 'p-4 sm:p-6' : 'p-8'}
        shadow-[0_8px_32px_rgba(59,130,246,0.3)]
        hover:bg-[rgba(255,255,255,0.08)] hover:scale-[1.02] 
        transition-all duration-500 ease-out
        animate-slide-in-right overflow-hidden
        ${className}
      `}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Subtle glass shine effect */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 animate-glass-shine" />
      </div>
      {children}
    </div>
  );

  const NeonOrb = ({ size = "w-32 h-32", position = "top-10 right-10", delay = 0, intensity = "normal" }: { size?: string; position?: string; delay?: number; intensity?: "normal" | "high" }) => (
    <div
      className={`absolute ${position} ${size} rounded-full animate-parallax-float ${isMobile ? 'opacity-30' : 'opacity-50'}`}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className={`w-full h-full rounded-full bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 ${intensity === "high" ? "opacity-60" : "opacity-40"} blur-3xl transition-opacity duration-500`} />
    </div>
  );

  const openWhatsApp = () => {
    const message = encodeURIComponent("Hola, me interesa la propuesta de patrocinio de Juntify para el Congreso BNI. Me gustaría programar una reunión para discutir los detalles.");
    window.open(`https://wa.me/524447001387?text=${message}`, '_blank');
  };

  const slides = [
    // Slide 1: Título Principal
    <div key={0} className={`min-h-screen flex items-center justify-center ${isMobile ? 'p-4' : 'p-8'} relative`}>
      <NeonOrb size={isMobile ? "w-48 h-48" : "w-96 h-96"} position={isMobile ? "top-10 right-4" : "top-20 right-20"} delay={0} intensity="high" />
      <NeonOrb size={isMobile ? "w-32 h-32" : "w-80 h-80"} position={isMobile ? "bottom-20 left-4" : "bottom-32 left-16"} delay={1.5} intensity="high" />
      <NeonOrb size={isMobile ? "w-24 h-24" : "w-64 h-64"} position={isMobile ? "top-32 left-8" : "top-40 left-32"} delay={3} intensity="high" />
      
      <div className={`${isMobile ? 'max-w-sm' : 'max-w-6xl'} w-full text-center space-y-8 relative z-10`}>
        <div className="space-y-6">
          <div className="relative">
            <h1 className={`${isMobile ? 'text-4xl' : 'text-8xl'} font-black text-white leading-tight drop-shadow-[0_0_30px_rgba(255,255,255,0.5)]`}>
              Propuesta de
            </h1>
            <h2 className={`${isMobile ? 'text-4xl' : 'text-8xl'} font-black text-white leading-tight drop-shadow-[0_0_30px_rgba(255,255,255,0.5)]`}>
              Intercambio
            </h2>
            <h3 className={`${isMobile ? 'text-3xl' : 'text-6xl'} font-bold text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]`}>
              de Patrocinio
            </h3>
            <Sparkles className={`absolute -top-2 -right-2 ${isMobile ? 'w-8 h-8' : 'w-16 h-16'} text-white animate-spin drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]`} />
          </div>
        </div>
        
        <GlassCard className={`${isMobile ? 'max-w-sm' : 'max-w-4xl'} mx-auto text-center`} delay={400}>
          <div className="space-y-4">
            <p className={`${isMobile ? 'text-lg' : 'text-2xl'} text-white`}>San Luis Potosí, 26 de septiembre de 2025</p>
            <div className="flex items-center justify-center space-x-4">
              <Mic className={`${isMobile ? 'w-8 h-8' : 'w-12 h-12'} text-white`} />
              <span className={`${isMobile ? 'text-2xl' : 'text-4xl'} font-bold text-white`}>Juntify</span>
              <Mic className={`${isMobile ? 'w-8 h-8' : 'w-12 h-12'} text-white`} />
            </div>
            <p className={`${isMobile ? 'text-base' : 'text-xl'} text-white/90`}>Plataforma de gestión de reuniones con IA</p>
            <div className="border-t border-white/20 pt-4 space-y-2">
              <p className={`${isMobile ? 'text-sm' : 'text-lg'} text-white/90`}>De: Ing. Alejandro Báez</p>
              <p className={`${isMobile ? 'text-sm' : 'text-lg'} text-white/90`}>Marca/Servicio: [Cero Uno Cero] – Juntify</p>
              <p className={`${isMobile ? 'text-sm' : 'text-lg'} text-white/90`}>Para: Coordinación de Congreso BNI / Sra. Marylú Amaya</p>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>,

    // Slide 2: Lo que ofrecemos - Parte 1
    <div key={1} className={`min-h-screen flex items-center justify-center ${isMobile ? 'p-4' : 'p-8'} relative`}>
      <NeonOrb size={isMobile ? "w-32 h-32" : "w-80 h-80"} position={isMobile ? "top-4 left-4" : "top-10 left-10"} delay={0.5} intensity="high" />
      <NeonOrb size={isMobile ? "w-24 h-24" : "w-72 h-72"} position={isMobile ? "bottom-10 right-4" : "bottom-20 right-20"} delay={2} intensity="high" />
      
      <div className={`${isMobile ? 'max-w-sm' : 'max-w-7xl'} w-full space-y-8 relative z-10`}>
        <h2 className={`${isMobile ? 'text-3xl' : 'text-6xl'} font-bold text-center text-white mb-8 drop-shadow-[0_0_30px_rgba(255,255,255,0.5)]`}>
          1. Lo que ofrecemos como patrocinadores
        </h2>
        
        <div className={`grid ${isMobile ? 'grid-cols-1' : 'lg:grid-cols-2'} gap-6`}>
          <GlassCard delay={200}>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Gift className={`${isMobile ? 'w-8 h-8' : 'w-12 h-12'} text-white`} />
                <h3 className={`${isMobile ? 'text-xl' : 'text-3xl'} font-bold text-white`}>Acceso gratuito a Juntify</h3>
              </div>
              <p className={`${isMobile ? 'text-sm' : 'text-lg'} text-white/90 mb-4`}>Para todos los asistentes del Congreso:</p>
              <div className="space-y-3">
                {[
                  "Cada ponencia quedará registrada en la plataforma",
                  "Los asistentes podrán consultar la transcripción completa de lo dicho",
                  "Se generarán resúmenes inteligentes con puntos clave y tareas recomendadas",
                  "Los usuarios tendrán acceso al asistente de IA para hacer preguntas específicas sobre la ponencia",
                  "Cada asistente podrá registrar hasta 5 reuniones propias de 30 minutos, como beneficio adicional",
                  "Entrega de un PDF personalizado con el resumen y puntos clave de cada ponencia"
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <CheckCircle className={`${isMobile ? 'w-4 h-4' : 'w-6 h-6'} text-white mt-0.5 flex-shrink-0`} />
                    <span className={`text-white/90 ${isMobile ? 'text-sm' : 'text-lg'}`}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>

          <GlassCard delay={400}>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Shield className={`${isMobile ? 'w-8 h-8' : 'w-12 h-12'} text-white`} />
                <h3 className={`${isMobile ? 'text-xl' : 'text-3xl'} font-bold text-white`}>Infraestructura técnica</h3>
              </div>
              <p className={`${isMobile ? 'text-sm' : 'text-lg'} text-white/90 mb-4`}>Cubierta al 100% por Juntify:</p>
              <div className="space-y-3">
                {[
                  "Servidores y almacenamiento",
                  "Consumo de IA (API OpenAI)",
                  "Soporte técnico durante el evento"
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <CheckCircle className={`${isMobile ? 'w-4 h-4' : 'w-6 h-6'} text-white mt-0.5 flex-shrink-0`} />
                    <span className={`text-white/90 ${isMobile ? 'text-sm' : 'text-lg'}`}>{item}</span>
                  </div>
                ))}
              </div>
              
              <div className={`mt-6 pt-4 border-t border-white/20`}>
                <div className="flex items-center space-x-3 mb-3">
                  <Award className={`${isMobile ? 'w-6 h-6' : 'w-8 h-8'} text-white`} />
                  <h4 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold text-white`}>Presencia de marca durante el Congreso</h4>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} text-white mt-0.5 flex-shrink-0`} />
                    <span className={`text-white/90 ${isMobile ? 'text-sm' : 'text-base'}`}>Inclusión de la marca Juntify como patrocinador oficial</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} text-white mt-0.5 flex-shrink-0`} />
                    <span className={`text-white/90 ${isMobile ? 'text-sm' : 'text-base'}`}>Participación en la agenda con una presentación de 20 minutos sobre la plataforma</span>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>,

    // Slide 3: Lo que solicitamos
    <div key={2} className={`min-h-screen flex items-center justify-center ${isMobile ? 'p-4' : 'p-8'} relative`}>
      <NeonOrb size={isMobile ? "w-28 h-28" : "w-72 h-72"} position={isMobile ? "top-8 right-4" : "top-16 right-16"} delay={1} intensity="high" />
      <NeonOrb size={isMobile ? "w-32 h-32" : "w-88 h-88"} position={isMobile ? "bottom-8 left-4" : "bottom-16 left-32"} delay={2.5} intensity="high" />
      
      <div className={`${isMobile ? 'max-w-sm' : 'max-w-7xl'} w-full space-y-8 relative z-10`}>
        <h2 className={`${isMobile ? 'text-3xl' : 'text-6xl'} font-bold text-center text-white mb-8 drop-shadow-[0_0_30px_rgba(255,255,255,0.5)]`}>
          2. Lo que solicitamos a cambio
        </h2>
        
        <div className={`grid ${isMobile ? 'grid-cols-1' : 'lg:grid-cols-2'} gap-6`}>
          <GlassCard delay={200}>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Award className={`${isMobile ? 'w-8 h-8' : 'w-12 h-12'} text-white`} />
                <h3 className={`${isMobile ? 'text-xl' : 'text-3xl'} font-bold text-white`}>Reconocimiento y espacio</h3>
              </div>
              <div className="space-y-3">
                {[
                  "Reconocimiento de patrocinio en materiales de comunicación y durante el evento (programa, menciones, banners, agradecimientos oficiales)",
                  "Espacio de 20 minutos dentro del programa del Congreso para la presentación de Juntify",
                  "Autorización para brindar acceso gratuito a los asistentes mediante un enlace único gestionado por el comité de coordinación"
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <ArrowRight className={`${isMobile ? 'w-4 h-4' : 'w-6 h-6'} text-white mt-0.5 flex-shrink-0`} />
                    <span className={`text-white/90 ${isMobile ? 'text-sm' : 'text-lg'}`}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>

          <GlassCard delay={400}>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Users className={`${isMobile ? 'w-8 h-8' : 'w-12 h-12'} text-white`} />
                <h3 className={`${isMobile ? 'text-xl' : 'text-3xl'} font-bold text-white`}>Acceso para nuestro staff</h3>
              </div>
              <div className={`bg-white/10 rounded-2xl ${isMobile ? 'p-4' : 'p-6'} mb-4 border border-white/20`}>
                <p className={`${isMobile ? 'text-2xl' : 'text-4xl'} font-bold text-white text-center`}>6 integrantes</p>
                <p className={`${isMobile ? 'text-sm' : 'text-lg'} text-center text-white/90`}>con playera corporativa</p>
              </div>
              <p className={`${isMobile ? 'text-sm' : 'text-lg'} font-semibold mb-3 text-white`}>Quienes estarán presentes para:</p>
              <div className="space-y-3">
                {[
                  "Orientar a los asistentes en el uso de la herramienta",
                  "Atender dudas técnicas o de acceso",
                  "Facilitar contactos B2B con otros participantes, de manera discreta y sin instalación de banners ni publicidad invasiva"
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <ArrowRight className={`${isMobile ? 'w-4 h-4' : 'w-6 h-6'} text-white mt-0.5 flex-shrink-0`} />
                    <span className={`text-white/90 ${isMobile ? 'text-sm' : 'text-lg'}`}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>,

    // Slide 4: Beneficios
    <div key={3} className={`min-h-screen flex items-center justify-center ${isMobile ? 'p-4' : 'p-8'} relative`}>
      <NeonOrb size={isMobile ? "w-24 h-24" : "w-64 h-64"} position={isMobile ? "top-10 left-4" : "top-20 left-20"} delay={0.8} intensity="high" />
      <NeonOrb size={isMobile ? "w-36 h-36" : "w-96 h-96"} position={isMobile ? "bottom-4 right-4" : "bottom-10 right-10"} delay={2.2} intensity="high" />
      
      <div className={`${isMobile ? 'max-w-sm' : 'max-w-7xl'} w-full space-y-8 relative z-10`}>
        <h2 className={`${isMobile ? 'text-3xl' : 'text-6xl'} font-bold text-center text-white mb-8 drop-shadow-[0_0_30px_rgba(255,255,255,0.5)]`}>
          3. Beneficios para el Congreso y los asistentes
        </h2>
        
        <div className={`grid ${isMobile ? 'grid-cols-1' : 'lg:grid-cols-2'} gap-6`}>
          <GlassCard delay={200}>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mic className={`${isMobile ? 'w-8 h-8' : 'w-12 h-12'} text-white`} />
                <h3 className={`${isMobile ? 'text-xl' : 'text-3xl'} font-bold text-white`}>Experiencia duradera</h3>
              </div>
              <p className={`${isMobile ? 'text-sm' : 'text-lg'} text-white/90`}>
                Los asistentes obtendrán no solo la experiencia en vivo, sino también un recurso práctico y duradero.
              </p>
            </div>
          </GlassCard>

          <GlassCard delay={400}>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Award className={`${isMobile ? 'w-8 h-8' : 'w-12 h-12'} text-white`} />
                <h3 className={`${isMobile ? 'text-xl' : 'text-3xl'} font-bold text-white`}>Pioneros en IA</h3>
              </div>
              <p className={`${isMobile ? 'text-sm' : 'text-lg'} text-white/90`}>
                El Congreso se distinguirá como pionero en integrar inteligencia artificial para capitalizar el aprendizaje.
              </p>
            </div>
          </GlassCard>

          <GlassCard delay={600}>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Gift className={`${isMobile ? 'w-8 h-8' : 'w-12 h-12'} text-white`} />
                <h3 className={`${isMobile ? 'text-xl' : 'text-3xl'} font-bold text-white`}>Patrocinio de alto valor</h3>
              </div>
              <p className={`${isMobile ? 'text-sm' : 'text-lg'} text-white/90`}>
                El comité organizador contará con un patrocinio en especie de alto valor tecnológico, sin requerir inversión adicional.
              </p>
            </div>
          </GlassCard>

          <GlassCard delay={800}>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <HeadphonesIcon className={`${isMobile ? 'w-8 h-8' : 'w-12 h-12'} text-white`} />
                <h3 className={`${isMobile ? 'text-xl' : 'text-3xl'} font-bold text-white`}>Mayor interacción y soporte</h3>
              </div>
              <p className={`${isMobile ? 'text-sm' : 'text-lg'} text-white/90`}>
                Mayor interacción y soporte inmediato para los asistentes, gracias a la presencia del equipo de Juntify.
              </p>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>,

    // Slide 5: Firma y contacto
    <div key={4} className={`min-h-screen flex items-center justify-center ${isMobile ? 'p-4' : 'p-8'} relative`}>
      <NeonOrb size={isMobile ? "w-32 h-32" : "w-80 h-80"} position={isMobile ? "top-16 left-4" : "top-32 left-16"} delay={1.2} intensity="high" />
      <NeonOrb size={isMobile ? "w-24 h-24" : "w-60 h-60"} position={isMobile ? "bottom-16 right-4" : "bottom-32 right-32"} delay={2.8} intensity="high" />
      
      <div className={`${isMobile ? 'max-w-sm' : 'max-w-5xl'} w-full space-y-8 relative z-10`}>
        <h2 className={`${isMobile ? 'text-3xl' : 'text-6xl'} font-bold text-center text-white mb-8 drop-shadow-[0_0_30px_rgba(255,255,255,0.5)]`}>
          Firma
        </h2>
        
        <GlassCard className={`${isMobile ? 'max-w-sm' : 'max-w-3xl'} mx-auto text-center`} delay={400}>
          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className={`${isMobile ? 'text-2xl' : 'text-4xl'} font-bold text-white`}>Ing. Alejandro Báez</h3>
              <p className={`${isMobile ? 'text-lg' : 'text-2xl'} text-white font-semibold`}>CEO – Cero Uno Cero</p>
              <p className={`${isMobile ? 'text-base' : 'text-xl'} text-white/90`}>Desarrollador de Juntify</p>
            </div>
            
            <div className="border-t border-white/20 pt-6">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <Mic className={`${isMobile ? 'w-10 h-10' : 'w-16 h-16'} text-white animate-pulse`} />
                <span className={`${isMobile ? 'text-3xl' : 'text-5xl'} font-bold text-white`}>
                  Juntify
                </span>
              </div>
              <p className={`${isMobile ? 'text-base' : 'text-lg'} text-white/90 italic`}>
                "Transformando reuniones con inteligencia artificial"
              </p>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>,

    // Slide 6: Call to Action
    <div key={5} className={`min-h-screen flex items-center justify-center ${isMobile ? 'p-4' : 'p-8'} relative`}>
      <NeonOrb size={isMobile ? "w-40 h-40" : "w-96 h-96"} position={isMobile ? "top-4 right-4" : "top-10 right-10"} delay={0} intensity="high" />
      <NeonOrb size={isMobile ? "w-32 h-32" : "w-80 h-80"} position={isMobile ? "bottom-4 left-4" : "bottom-10 left-10"} delay={1.5} intensity="high" />
      <NeonOrb size={isMobile ? "w-24 h-24" : "w-64 h-64"} position={isMobile ? "top-32 left-16" : "top-40 left-40"} delay={3} intensity="high" />
      
      <div className={`${isMobile ? 'max-w-sm' : 'max-w-6xl'} w-full space-y-8 text-center relative z-10`}>
        <h2 className={`${isMobile ? 'text-4xl' : 'text-7xl'} font-bold text-white leading-tight drop-shadow-[0_0_40px_rgba(255,255,255,0.6)]`}>
          ¿Listos para innovar juntos?
        </h2>
        
        <GlassCard className={`${isMobile ? 'max-w-sm' : 'max-w-4xl'} mx-auto`} delay={400}>
          <div className="space-y-6">
            <p className={`${isMobile ? 'text-lg' : 'text-2xl'} text-white/90 leading-relaxed`}>
              Esperamos su respuesta para comenzar esta alianza estratégica que beneficiará 
              a todos los participantes del Congreso BNI.
            </p>
            
            <div className={`flex ${isMobile ? 'flex-col' : 'flex-col sm:flex-row'} gap-4 justify-center`}>
              <Button 
                size={isMobile ? "default" : "lg"} 
                className={`${isMobile ? 'text-lg px-8 py-4' : 'text-xl px-12 py-6'} bg-white/20 hover:bg-white/30 border-0 text-white backdrop-blur-sm transition-all duration-300`}
                onClick={openWhatsApp}
              >
                Aceptar propuesta
              </Button>
              <Button 
                variant="outline" 
                size={isMobile ? "default" : "lg"} 
                className={`${isMobile ? 'text-lg px-8 py-4' : 'text-xl px-12 py-6'} border-white/30 text-white hover:bg-white/10 transition-all duration-300`}
                onClick={openWhatsApp}
              >
                Programar reunión
              </Button>
            </div>
            
            <div className="pt-4 border-t border-white/20">
              <p className={`${isMobile ? 'text-sm' : 'text-lg'} text-white/80`}>
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
      {/* Elegant blue background with subtle neon lights */}
      <div className="absolute inset-0 bg-[var(--gradient-bg)]" />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-800/20 via-cyan-800/10 to-blue-900/30" />
      
      {/* Subtle floating neon lights */}
      <div className="absolute top-20 left-20 w-3 h-3 bg-blue-400 rounded-full animate-ping opacity-40" />
      <div className="absolute top-40 right-32 w-2 h-2 bg-cyan-400 rounded-full animate-ping opacity-30" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-32 left-32 w-2 h-2 bg-blue-300 rounded-full animate-ping opacity-35" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-20 right-20 w-4 h-4 bg-cyan-300 rounded-full animate-ping opacity-25" style={{ animationDelay: '0.5s' }} />
      
      {/* Elegant light streaks */}
      <div className="absolute top-0 left-1/4 w-0.5 h-full bg-gradient-to-b from-blue-400/10 via-transparent to-cyan-400/10 transform rotate-12 animate-pulse" />
      <div className="absolute top-0 right-1/3 w-0.5 h-full bg-gradient-to-b from-cyan-400/8 via-transparent to-blue-400/8 transform -rotate-12 animate-pulse" style={{ animationDelay: '1s' }} />
      
      {/* Slides container with smooth horizontal transition */}
      <div 
        ref={containerRef}
        className="h-full transition-transform duration-[1200ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] flex will-change-transform"
        style={{ transform: `translateX(-${currentSlide * 100}vw)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="w-screen flex-shrink-0">
            {slide}
          </div>
        ))}
      </div>

      {/* Navigation arrows - hidden on mobile */}
      {!isMobile && (
        <>
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
        </>
      )}

      {/* Navigation dots */}
      <div className={`fixed ${isMobile ? 'bottom-4' : 'bottom-8'} left-1/2 transform -translate-x-1/2 flex space-x-3 z-50`}>
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            disabled={isTransitioning}
            className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} rounded-full transition-all duration-500 ${
              index === currentSlide 
                ? 'bg-white scale-125 shadow-lg shadow-white/50' 
                : 'bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 ${isMobile ? 'w-64 h-1' : 'w-80 h-2'} bg-white/10 rounded-full overflow-hidden z-50`}>
        <div 
          className="h-full bg-white transition-all duration-1000 ease-out"
          style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
        />
      </div>

      {/* Instructions */}
      <div className={`fixed ${isMobile ? 'bottom-2 left-2 text-xs' : 'bottom-4 left-4 text-sm'} text-white/60 z-50`}>
        <p>{isMobile ? 'Desliza para navegar' : 'Scroll o ← → para navegar'}</p>
      </div>
    </div>
  );
};

export default SponsorshipPresentation;