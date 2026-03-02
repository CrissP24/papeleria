import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Phone, ArrowRight, Heart, GraduationCap, Sparkles, Clock, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const LandingPage = () => {
  const features = [
    { icon: <BookOpen className="w-6 h-6" />, title: 'Útiles Facilitadores', desc: 'Productos pensados para facilitar e incluir el aprendizaje de todos los niños.', emoji: '✏️' },
    { icon: <Heart className="w-6 h-6" />, title: 'Hecho con Amor', desc: 'Cada producto seleccionado con cariño y propósito educativo.', emoji: '💜' },
    { icon: <GraduationCap className="w-6 h-6" />, title: 'Aprendizaje Inclusivo', desc: 'Herramientas para potenciar el desarrollo en el aula, consultorio y casa.', emoji: '🌟' },
    { icon: <Sparkles className="w-6 h-6" />, title: 'Atención Personalizada', desc: 'Consultá por WhatsApp y te asesoramos con lo que necesites.', emoji: '✨' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🌱</span>
            <span className="font-display font-bold text-foreground text-lg">Creciendo con Catalina</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/productos" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Productos</Link>
            <a href="#nosotros" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Nosotros</a>
            <a href="#contacto" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contacto</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/productos">
              <Button variant="outline" size="sm">Ver Catálogo</Button>
            </Link>
            <Link to="/login">
              <Button size="sm" className="gradient-accent text-accent-foreground hover:opacity-90">Ingresar</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="gradient-primary py-20 lg:py-32 relative overflow-hidden">
        {/* Decorative floating elements */}
        <div className="absolute top-10 right-10 text-5xl opacity-20 animate-bounce" style={{animationDuration: '3s'}}>✏️</div>
        <div className="absolute bottom-16 right-1/4 text-4xl opacity-15 animate-bounce" style={{animationDuration: '4s', animationDelay: '1s'}}>📚</div>
        <div className="absolute top-1/3 right-16 text-3xl opacity-15 animate-bounce" style={{animationDuration: '3.5s', animationDelay: '0.5s'}}>🎨</div>
        <div className="absolute bottom-10 left-1/3 text-4xl opacity-10 animate-bounce" style={{animationDuration: '4.5s', animationDelay: '2s'}}>⭐</div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6 text-sm text-primary-foreground/90">
              <span>🌸</span> Papelería escolar con propósito
            </div>
            <h1 className="text-4xl lg:text-5xl font-display font-bold text-primary-foreground leading-tight">
              Útiles escolares que acompañan el aprendizaje 🌱
            </h1>
            <p className="mt-6 text-lg text-primary-foreground/70">
              Nace un nuevo espacio pensado con amor y propósito: <strong>Creciendo con Catalina</strong>. 
              Un emprendimiento que surge desde la experiencia y el deseo profundo de acompañar el aprendizaje 
              de todos los niños, ofreciendo útiles escolares facilitadores para el aprendizaje.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/productos">
                <Button size="lg" className="gradient-accent text-accent-foreground hover:opacity-90">
                  Explorar Catálogo <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <a href="https://wa.me/c/5493584015546" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                  <Phone className="w-4 h-4 mr-2" /> Contactanos
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Decorative wave divider */}
      <div className="relative -mt-1">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 30C240 60 480 0 720 30C960 60 1200 0 1440 30V60H0V30Z" fill="hsl(330 30% 98%)" />
        </svg>
      </div>

      {/* Features */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-3xl mb-3 block">✨</span>
            <h2 className="text-2xl lg:text-3xl font-display font-bold text-foreground">¿Por qué elegirnos?</h2>
            <p className="mt-2 text-muted-foreground">Herramientas pensadas para facilitar, incluir y potenciar el desarrollo</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl p-6 shadow-card text-center hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 border border-border/50">
                <div className="text-3xl mb-3">{f.emoji}</div>
                <div className="w-12 h-12 rounded-2xl gradient-accent flex items-center justify-center mx-auto mb-4 text-accent-foreground">
                  {f.icon}
                </div>
                <h3 className="font-semibold text-foreground">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="nosotros" className="py-16 lg:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-3xl mb-3 block">🌸</span>
              <h2 className="text-2xl lg:text-3xl font-display font-bold text-foreground">Nuestra Historia</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                <strong>Creciendo con Catalina</strong> es un emprendimiento que nace desde la experiencia y el deseo 
                profundo de acompañar el aprendizaje de todos los niños. Ofrecemos útiles escolares facilitadores 
                que hacen del estudio una experiencia más accesible e inclusiva.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Son herramientas pensadas para facilitar, incluir y potenciar el desarrollo en el aula, 
                en el consultorio y en casa. Cada producto es seleccionado con amor, pensando en las 
                necesidades de cada niño y su camino de aprendizaje.
              </p>
            </div>
            <div className="gradient-primary rounded-3xl p-8 text-center relative overflow-hidden">
              <div className="absolute top-3 right-3 text-2xl opacity-20">🌸</div>
              <div className="absolute bottom-3 left-3 text-2xl opacity-20">✨</div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-4xl font-display font-bold text-accent">🌱</p>
                  <p className="text-sm text-primary-foreground/70 mt-1">Crecimiento</p>
                </div>
                <div>
                  <p className="text-4xl font-display font-bold text-accent">📚</p>
                  <p className="text-sm text-primary-foreground/70 mt-1">Aprendizaje</p>
                </div>
                <div>
                  <p className="text-4xl font-display font-bold text-accent">💜</p>
                  <p className="text-sm text-primary-foreground/70 mt-1">Inclusión</p>
                </div>
                <div>
                  <p className="text-4xl font-display font-bold text-accent">✨</p>
                  <p className="text-sm text-primary-foreground/70 mt-1">Creatividad</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <span className="text-4xl mb-4 block">🎒</span>
          <h2 className="text-2xl lg:text-3xl font-display font-bold text-foreground">¿Querés ver nuestros productos?</h2>
          <p className="mt-3 text-muted-foreground">Explorá nuestro catálogo de útiles escolares facilitadores y consultá por WhatsApp.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link to="/productos">
              <Button size="lg" className="gradient-accent text-accent-foreground hover:opacity-90">
                Ver Catálogo <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline">
                Ingresar al Sistema
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contacto" className="py-16 lg:py-24 gradient-primary relative overflow-hidden">
        <div className="absolute top-6 left-10 text-4xl opacity-10">💌</div>
        <div className="absolute bottom-8 right-12 text-3xl opacity-10">📝</div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center">
            <h2 className="text-2xl lg:text-3xl font-display font-bold text-primary-foreground">Contacto</h2>
            <p className="mt-2 text-primary-foreground/70">Estamos para ayudarte</p>
          </div>
          <div className="mt-10 grid sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <a href="https://wa.me/c/5493584015546" target="_blank" rel="noopener noreferrer" className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/30 transition-all duration-300 hover:-translate-y-1">
              <Phone className="w-6 h-6 mx-auto text-white mb-3" />
              <p className="text-sm text-primary-foreground font-medium">WhatsApp</p>
              <p className="text-xs text-primary-foreground/70 mt-1">+54 9 358 401-5546</p>
            </a>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center">
              <Users className="w-6 h-6 mx-auto text-white mb-3" />
              <p className="text-sm text-primary-foreground font-medium">Redes Sociales</p>
              <p className="text-xs text-primary-foreground/70 mt-1">@creciendoconcatalina</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center">
              <Clock className="w-6 h-6 mx-auto text-white mb-3" />
              <p className="text-sm text-primary-foreground font-medium">Horario</p>
              <p className="text-xs text-primary-foreground/70 mt-1">Lun-Vie 9 a 18hs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-8 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm text-muted-foreground">🌸 © 2026 Creciendo con Catalina. Todos los derechos reservados. 🌸</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
