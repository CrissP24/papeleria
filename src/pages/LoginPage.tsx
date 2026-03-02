import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const LoginPage = () => {
  const { user, login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (user) {
    if (user.role === 'admin') return <Navigate to="/admin" />;
    if (user.role === 'vendedor') return <Navigate to="/vendedor" />;
    return <Navigate to="/catalogo" />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) { setError('Completá todos los campos'); return; }
    const err = login(email, password);
    if (err) setError(err);
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 gradient-primary items-center justify-center p-12">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="text-center">
          <img src="" alt="" className="w-32 h-auto mx-auto mb-8 hidden" />
          <span className="text-6xl block mb-8">🌱</span>
          <h1 className="text-4xl font-display font-bold text-primary-foreground mb-4">Creciendo con Catalina</h1>
          <p className="text-primary-foreground/70 text-lg max-w-md">Sistema de gestión de útiles escolares facilitadores para el aprendizaje.</p>
        </motion.div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <span className="text-2xl">🌱</span>
            <span className="text-xl font-display font-bold text-foreground">Creciendo con Catalina</span>
          </div>

          <h2 className="text-2xl font-display font-bold text-foreground mb-2">Iniciar sesión</h2>
          <p className="text-muted-foreground mb-8">Ingresá tus credenciales para acceder al sistema</p>

          {error && (
            <div className="bg-destructive/10 text-destructive px-4 py-3 rounded-lg mb-6 text-sm">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="tu@email.com" value={email} onChange={e => setEmail(e.target.value)} className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="password">Contraseña</Label>
              <Input id="password" type="password" placeholder="••••••" value={password} onChange={e => setPassword(e.target.value)} className="mt-1.5" />
            </div>
            <Button type="submit" className="w-full gradient-accent text-accent-foreground hover:opacity-90 transition-opacity">
              <LogIn className="w-4 h-4 mr-2" /> Ingresar
            </Button>
          </form>

        
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
