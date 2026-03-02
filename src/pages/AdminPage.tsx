import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import AdminDashboard, { navItems } from '@/pages/AdminDashboard';
import AdminUsers from '@/components/admin/AdminUsers';
import AdminProducts from '@/components/admin/AdminProducts';
import AdminCategories from '@/components/admin/AdminCategories';
import AdminBrands from '@/components/admin/AdminBrands';

const AdminPage = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout navItems={navItems} title="Dashboard"><AdminDashboard /></DashboardLayout>} />
      <Route path="/usuarios" element={<DashboardLayout navItems={navItems} title="Usuarios"><AdminUsers /></DashboardLayout>} />
      <Route path="/productos" element={<DashboardLayout navItems={navItems} title="Productos"><AdminProducts /></DashboardLayout>} />
      <Route path="/categorias" element={<DashboardLayout navItems={navItems} title="Categorías"><AdminCategories /></DashboardLayout>} />
      <Route path="/marcas" element={<DashboardLayout navItems={navItems} title="Marcas"><AdminBrands /></DashboardLayout>} />
    </Routes>
  );
};

export default AdminPage;
