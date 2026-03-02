import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <img src="/logo.jpeg" alt="Creciendo con Catalina" className="w-20 h-20 rounded-full object-cover mx-auto mb-6 shadow-lg border-4 border-primary/20" />
        <h1 className="mb-3 text-5xl font-display font-bold text-primary">404</h1>
        <p className="mb-6 text-lg text-muted-foreground">¡Ups! Página no encontrada</p>
        <a href="/" className="inline-flex items-center gap-2 gradient-accent text-accent-foreground px-6 py-3 rounded-2xl font-semibold hover:opacity-90 transition-opacity">
          Volver al Inicio
        </a>
      </div>
    </div>
  );
};

export default NotFound;
