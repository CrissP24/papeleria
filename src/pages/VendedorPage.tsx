import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import AdminProducts from '@/components/admin/AdminProducts';
import { Package, ShoppingBag } from 'lucide-react';

const vendedorNav = [
  { label: 'Productos', href: '/vendedor', icon: <Package className="w-4 h-4" /> },
  { label: 'Catálogo', href: '/vendedor/catalogo', icon: <ShoppingBag className="w-4 h-4" /> },
];

const VendedorPage = () => (
  <Routes>
    <Route path="/" element={<DashboardLayout navItems={vendedorNav} title="Mis Productos"><AdminProducts /></DashboardLayout>} />
    <Route path="/catalogo" element={<DashboardLayout navItems={vendedorNav} title="Catálogo"><CatalogView /></DashboardLayout>} />
  </Routes>
);

// Inline catalog for vendedor
import CatalogView from '@/components/CatalogView';

export default VendedorPage;
