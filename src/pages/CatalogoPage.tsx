import React from 'react';
import { LogOut, ShoppingBag, Phone } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import CatalogView from '@/components/CatalogView';

const CatalogoPage = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.jpeg" alt="Creciendo con Catalina" className="h-9 w-9 rounded-full object-cover shadow-sm border-2 border-primary/20" />
            <span className="font-display font-bold text-foreground text-lg">Creciendo con Catalina</span>
          </div>
          <div className="flex items-center gap-3">
            <a href="https://wa.me/c/5493584015546" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm"><Phone className="w-4 h-4 mr-1" /> Contacto</Button>
            </a>
            <Button variant="ghost" size="sm" onClick={logout}><LogOut className="w-4 h-4 mr-1" /> Salir</Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-display font-bold text-foreground">🎒 Catálogo de Productos</h1>
          <p className="text-muted-foreground mt-1">Explorá nuestra línea de útiles escolares facilitadores para el aprendizaje</p>
        </div>
        <CatalogView />
      </main>

      <footer className="bg-muted border-t py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <img src="/logo.jpeg" alt="" className="w-5 h-5 rounded-full object-cover" />
            <span className="font-display font-semibold text-sm text-foreground">Creciendo con Catalina</span>
          </div>
          <p className="text-xs text-muted-foreground">© 2026 Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default CatalogoPage;
