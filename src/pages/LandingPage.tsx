import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Phone, ArrowRight, Heart, GraduationCap, Sparkles, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const LandingPage = () => {
  const features = [
    { icon: <BookOpen className="w-6 h-6" />, title: 'Útiles Facilitadores', desc: 'Productos pensados para facilitar e incluir el aprendizaje de todos los niños.' },
    { icon: <Heart className="w-6 h-6" />, title: 'Hecho con Amor', desc: 'Cada producto seleccionado con cariño y propósito educativo.' },
    { icon: <GraduationCap className="w-6 h-6" />, title: 'Aprendizaje Inclusivo', desc: 'Herramientas para potenciar el desarrollo en el aula, consultorio y casa.' },
    { icon: <Sparkles className="w-6 h-6" />, title: 'Atención Personalizada', desc: 'Consultá por WhatsApp y te asesoramos con lo que necesites.' },
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
      <section className="gradient-primary py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
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

      {/* Features */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-display font-bold text-foreground">¿Por qué elegirnos?</h2>
            <p className="mt-2 text-muted-foreground">Herramientas pensadas para facilitar, incluir y potenciar el desarrollo</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="bg-card rounded-xl p-6 shadow-card text-center hover:shadow-card-hover transition-shadow">
                <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center mx-auto mb-4 text-accent-foreground">
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
      <section id="nosotros" className="py-16 lg:py-24 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
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
            <div className="gradient-primary rounded-2xl p-8 text-center">
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
      <section id="contacto" className="py-16 lg:py-24 gradient-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center">
            <h2 className="text-2xl lg:text-3xl font-display font-bold text-primary-foreground">Contacto</h2>
            <p className="mt-2 text-primary-foreground/70">Estamos para ayudarte</p>
          </div>
          <div className="mt-10 grid sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <a href="https://wa.me/c/5493584015546" target="_blank" rel="noopener noreferrer" className="bg-sidebar-accent rounded-xl p-6 text-center hover:opacity-90 transition-opacity">
              <Phone className="w-6 h-6 mx-auto text-accent mb-3" />
              <p className="text-sm text-sidebar-foreground font-medium">WhatsApp</p>
              <p className="text-xs text-sidebar-foreground/70 mt-1">+54 9 358 401-5546</p>
            </a>
            <div className="bg-sidebar-accent rounded-xl p-6 text-center">
              <Users className="w-6 h-6 mx-auto text-accent mb-3" />
              <p className="text-sm text-sidebar-foreground font-medium">Redes Sociales</p>
              <p className="text-xs text-sidebar-foreground/70 mt-1">@creciendoconcatalina</p>
            </div>
            <div className="bg-sidebar-accent rounded-xl p-6 text-center">
              <Clock className="w-6 h-6 mx-auto text-accent mb-3" />
              <p className="text-sm text-sidebar-foreground font-medium">Horario</p>
              <p className="text-xs text-sidebar-foreground/70 mt-1">Lun-Vie 9 a 18hs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm text-background/60">© 2026 Creciendo con Catalina. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
