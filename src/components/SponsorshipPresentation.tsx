import React, { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Users, Mic, Gift, Award, CheckCircle, ArrowRight, Sparkles, Building, ClipboardList, HeadphonesIcon, Shield, Menu } from 'lucide-react';
import juntifyLogo from '@/assets/juntify-logo.png';
import bniLogo from '@/assets/bni-logo.png';

const SponsorshipPresentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const totalSlides = 5;
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
      // Only prevent default on desktop, allow mobile scroll
      if (!isMobile) {
        e.preventDefault();
      }
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

    // Enhanced touch handling for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;
    
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    };
    
    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX = e.changedTouches[0].screenX;
      touchEndY = e.changedTouches[0].screenY;
      if (isTransitioning) return;
      
      const differenceX = touchStartX - touchEndX;
      const differenceY = touchStartY - touchEndY;
      const threshold = 75;
      
      // Solo navegación horizontal en móvil
      if (Math.abs(differenceX) > Math.abs(differenceY) && Math.abs(differenceX) > threshold) {
        if (differenceX > 0 && currentSlide < totalSlides - 1) {
          goToSlide(currentSlide + 1);
        } else if (differenceX < 0 && currentSlide > 0) {
          goToSlide(currentSlide - 1);
        }
      }
    };

    // Solo agregar wheel listener en desktop
    if (!isMobile) {
      window.addEventListener('wheel', handleWheel, { passive: false });
    }
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentSlide, isTransitioning, isMobile]);

  const goToSlide = (slideIndex: number) => {
    if (slideIndex < 0 || slideIndex >= totalSlides || isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(slideIndex);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  const GlassCard = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
    <div
      className={`
        relative backdrop-blur-xl bg-[rgba(255,255,255,0.06)] 
        border border-[rgba(255,255,255,0.15)] rounded-[2rem] 
        ${isMobile ? 'p-4 sm:p-6' : 'p-8'}
        shadow-[0_8px_32px_rgba(59,130,246,0.2)] 
        hover:shadow-[0_12px_40px_rgba(59,130,246,0.3)]
        hover:bg-[rgba(255,255,255,0.08)] 
        transition-all duration-500 ease-out
        overflow-hidden group
        animate-subtle-glow
        ${className}
      `}
      style={{ 
        animationDelay: `${delay}ms`,
        backgroundImage: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(255, 255, 255, 0.02) 100%)'
      }}
    >
      {/* Liquid glass shimmer effect */}
      <div className="absolute inset-0 overflow-hidden rounded-[2rem]">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-glass-shimmer" />
      </div>
      
      {/* Inner glow effect */}
      <div className="absolute inset-[1px] rounded-[calc(2rem-1px)] bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      
      {children}
    </div>
  );

  const NeonOrb = ({ size = "w-32 h-32", position = "top-10 right-10", delay = 0, intensity = "normal" }: { size?: string; position?: string; delay?: number; intensity?: "normal" | "high" }) => (
    <div
      className={`absolute ${position} ${size} rounded-full animate-liquid-float ${isMobile ? 'opacity-15' : 'opacity-30'} will-change-transform`}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className={`w-full h-full rounded-full bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 ${intensity === "high" ? "opacity-40" : "opacity-25"} blur-2xl`} />
    </div>
  );

  const openWhatsApp = () => {
    const message = encodeURIComponent("Hola, me interesa la propuesta de patrocinio de Juntify para el Congreso BNI. Me gustaría programar una reunión para discutir los detalles.");
    window.open(`https://wa.me/524447001387?text=${message}`, '_blank');
  };

  const slides = [
    // Slide 1: Título Principal
    <div key={0} className="min-h-screen flex items-center justify-center p-4 sm:p-8 relative overflow-auto">
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
            <div className="flex items-center justify-center space-x-6">
              <img 
                src={juntifyLogo} 
                alt="Juntify Logo" 
                className={`${isMobile ? 'w-16 h-16' : 'w-24 h-24'} object-contain drop-shadow-lg`}
              />
              <span className={`${isMobile ? 'text-2xl' : 'text-4xl'} font-bold text-white`}>Juntify</span>
            </div>
            <p className={`${isMobile ? 'text-base' : 'text-xl'} text-white/90`}>plataforma de gestión de reuniones con IA</p>
            <div className="border-t border-white/20 pt-4 space-y-3">
              <p className={`${isMobile ? 'text-sm' : 'text-lg'} text-white/90`}>De: Ing. Alejandro Báez</p>
              <p className={`${isMobile ? 'text-sm' : 'text-lg'} text-white/90`}>Marca/Servicio: [Cero Uno Cero] – Juntify</p>
              <div className="flex items-center justify-center space-x-4 pt-2">
                <p className={`${isMobile ? 'text-sm' : 'text-lg'} text-white/90`}>Para: Coordinación de Congreso BNI</p>
                <img 
                  src={bniLogo} 
                  alt="BNI San Luis Potosí" 
                  className={`${isMobile ? 'w-16 h-12' : 'w-20 h-16'} object-contain`}
                />
              </div>
              <p className={`${isMobile ? 'text-sm' : 'text-lg'} text-white/90`}>/ Sra. Marylú Amaya</p>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>,

    // Slide 2: Lo que ofrecemos
    <div key={1} className="min-h-screen flex items-center justify-center p-4 sm:p-8 relative overflow-auto">
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
              <p className={`${isMobile ? 'text-sm' : 'text-lg'} text-white/90 mb-4`}>para todos los asistentes del Congreso:</p>
              <div className="space-y-3">
                {[
                  "Cada ponencia quedará registrada en la plataforma.",
                  "Los asistentes podrán consultar la transcripción completa de lo dicho.",
                  "Se generarán resúmenes inteligentes con puntos clave y tareas recomendadas.",
                  "Los usuarios tendrán acceso al asistente de IA para hacer preguntas específicas sobre la ponencia.",
                  "Cada asistente podrá registrar hasta 5 reuniones propias de 30 minutos, como beneficio adicional.",
                  "Entrega de un PDF personalizado con el resumen y puntos clave de cada ponencia."
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
              <p className={`${isMobile ? 'text-sm' : 'text-lg'} text-white/90 mb-4`}>cubierta al 100% por Juntify:</p>
              <div className="space-y-3">
                {[
                  "Servidores y almacenamiento.",
                  "Consumo de IA (API OpenAI).",
                  "Soporte técnico durante el evento."
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
                  <h4 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold text-white`}>Presencia de marca durante el Congreso:</h4>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} text-white mt-0.5 flex-shrink-0`} />
                    <span className={`text-white/90 ${isMobile ? 'text-sm' : 'text-base'}`}>Inclusión de la marca Juntify como patrocinador oficial.</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} text-white mt-0.5 flex-shrink-0`} />
                    <span className={`text-white/90 ${isMobile ? 'text-sm' : 'text-base'}`}>Participación en la agenda con una presentación de 20 minutos sobre la plataforma.</span>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>,

    // Slide 3: Lo que solicitamos
    <div key={2} className="min-h-screen flex items-center justify-center p-4 sm:p-8 relative overflow-auto">
      <NeonOrb size={isMobile ? "w-28 h-28" : "w-72 h-72"} position={isMobile ? "top-8 right-4" : "top-16 right-16"} delay={1} intensity="high" />
      <NeonOrb size={isMobile ? "w-32 h-32" : "w-88 h-88"} position={isMobile ? "bottom-8 left-4" : "bottom-16 left-32"} delay={2.5} intensity="high" />
      
      <div className={`${isMobile ? 'max-w-sm' : 'max-w-7xl'} w-full space-y-8 relative z-10`}>
        <h2 className={`${isMobile ? 'text-3xl' : 'text-6xl'} font-bold text-center text-white mb-8 drop-shadow-[0_0_30px_rgba(255,255,255,0.5)]`}>
          2. Lo que solicitamos a cambio
        </h2>
        
        <div className="space-y-6">
          <GlassCard delay={200}>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Award className={`${isMobile ? 'w-8 h-8' : 'w-12 h-12'} text-white`} />
                <h3 className={`${isMobile ? 'text-xl' : 'text-3xl'} font-bold text-white`}>Reconocimiento y espacio</h3>
              </div>
              <div className="space-y-3">
                {[
                  "Reconocimiento de patrocinio en materiales de comunicación y durante el evento (programa, menciones, banners, agradecimientos oficiales).",
                  "Espacio de 20 minutos dentro del programa del Congreso para la presentación de Juntify.",
                  "Autorización para brindar acceso gratuito a los asistentes mediante un enlace único gestionado por el comité de coordinación."
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
                <h3 className={`${isMobile ? 'text-xl' : 'text-3xl'} font-bold text-white`}>Acceso para 6 integrantes de nuestro staff</h3>
              </div>
              <p className={`${isMobile ? 'text-sm' : 'text-lg'} text-white/90 mb-3`}>quienes estarán presentes con playera corporativa para:</p>
              <div className="space-y-3">
                {[
                  "Orientar a los asistentes en el uso de la herramienta.",
                  "Atender dudas técnicas o de acceso.",
                  "Facilitar contactos B2B con otros participantes, de manera discreta y sin instalación de banners ni publicidad invasiva."
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
    <div key={3} className="min-h-screen flex items-center justify-center p-4 sm:p-8 relative overflow-auto">
      <NeonOrb size={isMobile ? "w-32 h-32" : "w-80 h-80"} position={isMobile ? "top-6 right-6" : "top-12 right-24"} delay={0.8} intensity="high" />
      <NeonOrb size={isMobile ? "w-28 h-28" : "w-72 h-72"} position={isMobile ? "bottom-12 left-6" : "bottom-24 left-48"} delay={2.2} intensity="high" />
      
      <div className={`${isMobile ? 'max-w-sm' : 'max-w-7xl'} w-full space-y-8 relative z-10`}>
        <h2 className={`${isMobile ? 'text-3xl' : 'text-6xl'} font-bold text-center text-white mb-8 drop-shadow-[0_0_30px_rgba(255,255,255,0.5)]`}>
          3. Beneficios para el Congreso y los asistentes
        </h2>
        
        <GlassCard delay={200}>
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <Sparkles className={`${isMobile ? 'w-8 h-8' : 'w-12 h-12'} text-white`} />
              <h3 className={`${isMobile ? 'text-xl' : 'text-3xl'} font-bold text-white`}>Beneficios únicos</h3>
            </div>
            
            <div className="space-y-4">
              {[
                "Los asistentes obtendrán no solo la experiencia en vivo, sino también un recurso práctico y duradero.",
                "El Congreso se distinguirá como pionero en integrar inteligencia artificial para capitalizar el aprendizaje.",
                "El comité organizador contará con un patrocinio en especie de alto valor tecnológico, sin requerir inversión adicional.",
                "Mayor interacción y soporte inmediato para los asistentes, gracias a la presencia del equipo de Juntify."
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <CheckCircle className={`${isMobile ? 'w-4 h-4' : 'w-6 h-6'} text-white mt-0.5 flex-shrink-0`} />
                  <span className={`text-white/90 ${isMobile ? 'text-sm' : 'text-lg'}`}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>
      </div>
    </div>,

    // Slide 5: Firma y contacto
    <div key={4} className="min-h-screen flex items-center justify-center p-4 sm:p-8 relative overflow-auto">
      <NeonOrb size={isMobile ? "w-40 h-40" : "w-96 h-96"} position={isMobile ? "top-8 left-4" : "top-16 left-16"} delay={1} intensity="high" />
      <NeonOrb size={isMobile ? "w-28 h-28" : "w-80 h-80"} position={isMobile ? "bottom-16 right-4" : "bottom-32 right-24"} delay={2.8} intensity="high" />
      
      <div className={`${isMobile ? 'max-w-sm' : 'max-w-6xl'} w-full text-center space-y-8 relative z-10`}>
        <h2 className={`${isMobile ? 'text-3xl' : 'text-6xl'} font-bold text-white mb-8 drop-shadow-[0_0_30px_rgba(255,255,255,0.5)]`}>
          Firma
        </h2>
        
        <GlassCard className="mx-auto" delay={300}>
          <div className="space-y-6">
            <div className="flex items-center justify-center space-x-6">
              <img 
                src={juntifyLogo} 
                alt="Juntify Logo" 
                className={`${isMobile ? 'w-16 h-16' : 'w-24 h-24'} object-contain drop-shadow-lg animate-pulse`}
              />
            </div>
            
            <div className="space-y-4">
              <h3 className={`${isMobile ? 'text-2xl' : 'text-4xl'} font-bold text-white`}>Ing. Alejandro Báez</h3>
              <p className={`${isMobile ? 'text-lg' : 'text-2xl'} text-white/90`}>CEO – Cero Uno Cero</p>
              <p className={`${isMobile ? 'text-lg' : 'text-2xl'} text-white/90`}>Desarrollador de Juntify</p>
            </div>
            
            <div className="space-y-4 pt-4 border-t border-white/20">
              <Button 
                onClick={openWhatsApp}
                className={`${isMobile ? 'text-lg px-8 py-6' : 'text-2xl px-12 py-8'} bg-green-600 hover:bg-green-700 text-white font-bold rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300`}
              >
                <div className="flex items-center space-x-3">
                  <HeadphonesIcon className={`${isMobile ? 'w-6 h-6' : 'w-8 h-8'}`} />
                  <span>Contactar por WhatsApp</span>
                </div>
              </Button>
              
              <div className="space-y-2">
                <p className={`${isMobile ? 'text-sm' : 'text-lg'} text-white/70`}>WhatsApp: +52 444 700 1387</p>
                <p className={`${isMobile ? 'text-sm' : 'text-lg'} text-white/70`}>Email: alejandro@juntify.com</p>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  ];

  return (
    <div 
      ref={containerRef}
      className={`relative w-full ${isMobile ? 'min-h-screen overflow-y-auto' : 'h-screen overflow-hidden'} bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900`}
      style={{
        background: `
          radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(120, 200, 255, 0.2) 0%, transparent 50%),
          linear-gradient(135deg, #1e293b 0%, #1e40af 50%, #1e293b 100%)
        `
      }}
    >
      {/* Dynamic slides container */}
      <div 
        className={`flex transition-transform duration-500 ease-out ${isMobile ? 'flex-col' : ''}`}
        style={{ 
          transform: isMobile ? 'none' : `translateX(-${currentSlide * 100}%)`,
          minHeight: isMobile ? 'auto' : '100vh',
          height: isMobile ? 'auto' : '100vh'
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`${isMobile ? 'w-full min-h-screen' : 'w-full h-full flex-shrink-0'}`}
            style={{
              display: isMobile ? 'block' : (Math.abs(index - currentSlide) > 1 ? 'none' : 'block')
            }}
          >
            {slide}
          </div>
        ))}
      </div>

      {/* Navigation arrows - only on desktop */}
      {!isMobile && (
        <>
          <button
            onClick={() => goToSlide(currentSlide - 1)}
            disabled={currentSlide === 0 || isTransitioning}
            className="fixed left-8 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-lg border border-white/20 rounded-2xl p-4 text-white transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed z-50"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button
            onClick={() => goToSlide(currentSlide + 1)}
            disabled={currentSlide === totalSlides - 1 || isTransitioning}
            className="fixed right-8 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-lg border border-white/20 rounded-2xl p-4 text-white transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed z-50"
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
