import React, { useState, useEffect } from 'react';
import { User, UserRole } from '@/types';
import { getUsers, addUser, updateUser, deleteUser, generateId } from '@/services/storage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<User | null>(null);
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'comprador' as UserRole });

  const reload = () => setUsers(getUsers());
  useEffect(() => { reload(); }, []);

  const resetForm = () => { setForm({ name: '', email: '', password: '', role: 'comprador' }); setEditing(null); };

  const handleOpen = (user?: User) => {
    if (user) { setEditing(user); setForm({ name: user.name, email: user.email, password: user.password, role: user.role }); }
    else resetForm();
    setOpen(true);
  };

  const handleSave = () => {
    if (!form.name || !form.email || !form.password) return;
    if (editing) { updateUser({ ...editing, ...form }); }
    else { addUser({ id: generateId(), ...form }); }
    setOpen(false); resetForm(); reload();
  };

  const handleDelete = (id: string) => { deleteUser(id); reload(); };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-display font-bold text-foreground">Usuarios</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpen()} className="gradient-accent text-accent-foreground hover:opacity-90"><Plus className="w-4 h-4 mr-2" /> Nuevo Usuario</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle className="font-display">{editing ? 'Editar' : 'Nuevo'} Usuario</DialogTitle></DialogHeader>
            <div className="space-y-4 mt-4">
              <div><Label>Nombre</Label><Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="mt-1" /></div>
              <div><Label>Email</Label><Input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="mt-1" /></div>
              <div><Label>Contraseña</Label><Input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} className="mt-1" /></div>
              <div>
                <Label>Rol</Label>
                <Select value={form.role} onValueChange={(v) => setForm({ ...form, role: v as UserRole })}>
                  <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="vendedor">Vendedor</SelectItem>
                    <SelectItem value="comprador">Comprador</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleSave} className="w-full gradient-accent text-accent-foreground hover:opacity-90">Guardar</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-card rounded-xl shadow-card overflow-hidden">
        <table className="w-full">
          <thead><tr className="border-b bg-muted/50">
            <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Nombre</th>
            <th className="text-left p-4 text-sm font-semibold text-muted-foreground hidden sm:table-cell">Email</th>
            <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Rol</th>
            <th className="text-right p-4 text-sm font-semibold text-muted-foreground">Acciones</th>
          </tr></thead>
          <tbody>
            {users.map((u, i) => (
              <motion.tr key={u.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }} className="border-b last:border-0 hover:bg-muted/30">
                <td className="p-4 text-sm font-medium text-foreground">{u.name}</td>
                <td className="p-4 text-sm text-muted-foreground hidden sm:table-cell">{u.email}</td>
                <td className="p-4"><span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary capitalize">{u.role}</span></td>
                <td className="p-4 text-right space-x-1">
                  <Button variant="ghost" size="icon" onClick={() => handleOpen(u)}><Pencil className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(u.id)} className="text-destructive hover:text-destructive"><Trash2 className="w-4 h-4" /></Button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
