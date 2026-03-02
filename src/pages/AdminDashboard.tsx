import React from 'react';
import { LayoutDashboard, Users, Package, Tags, Award } from 'lucide-react';
import { getUsers, getProducts, getCategories, getBrands } from '@/services/storage';
import { motion } from 'framer-motion';

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: 'Usuarios', href: '/admin/usuarios', icon: <Users className="w-4 h-4" /> },
  { label: 'Productos', href: '/admin/productos', icon: <Package className="w-4 h-4" /> },
  { label: 'Categorías', href: '/admin/categorias', icon: <Tags className="w-4 h-4" /> },
  { label: 'Marcas', href: '/admin/marcas', icon: <Award className="w-4 h-4" /> },
];

const StatCard = ({ title, value, icon, color }: { title: string; value: number; icon: React.ReactNode; color: string }) => (
  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl p-6 shadow-card border border-border/50 hover:shadow-card-hover transition-all duration-300">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-3xl font-display font-bold text-foreground mt-1">{value}</p>
      </div>
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${color}`}>{icon}</div>
    </div>
  </motion.div>
);

const AdminDashboard = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    <StatCard title="Productos" value={getProducts().length} icon={<Package className="w-6 h-6 text-accent-foreground" />} color="gradient-accent" />
    <StatCard title="Usuarios" value={getUsers().length} icon={<Users className="w-6 h-6 text-primary-foreground" />} color="gradient-primary" />
    <StatCard title="Categorías" value={getCategories().length} icon={<Tags className="w-6 h-6 text-accent-foreground" />} color="gradient-accent" />
    <StatCard title="Marcas" value={getBrands().length} icon={<Award className="w-6 h-6 text-primary-foreground" />} color="gradient-primary" />
  </div>
);

export { navItems };
export default AdminDashboard;
