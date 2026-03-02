import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CatalogView from '@/components/CatalogView';

const PublicCatalogPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-3">
              <span className="text-2xl">🌱</span>
              <span className="font-display font-bold text-foreground text-lg">Creciendo con Catalina</span>
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/">
              <Button variant="ghost" size="sm"><ArrowLeft className="w-4 h-4 mr-1" /> Inicio</Button>
            </Link>
            <a href="https://wa.me/c/5493584015546" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm"><Phone className="w-4 h-4 mr-1" /> Contacto</Button>
            </a>
            <Link to="/login">
              <Button size="sm" className="gradient-accent text-accent-foreground hover:opacity-90">Ingresar</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-display font-bold text-foreground">Catálogo de Productos</h1>
          <p className="text-muted-foreground mt-1">Explorá nuestra línea de útiles escolares facilitadores para el aprendizaje</p>
        </div>
        <CatalogView />
      </main>

      <footer className="bg-muted border-t py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm text-muted-foreground">© 2026 Creciendo con Catalina. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default PublicCatalogPage;
