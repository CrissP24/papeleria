import React, { useState, useEffect } from 'react';
import { Product } from '@/types';
import { getProducts, addProduct, updateProduct, deleteProduct, getCategories, getBrands, generateId } from '@/services/storage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

const emptyForm = { name: '', categoryId: '', description: '', image: '', brandId: '' };

const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState(emptyForm);
  const categories = getCategories();
  const brands = getBrands();

  const reload = () => setProducts(getProducts());
  useEffect(() => { reload(); }, []);

  const handleOpen = (p?: Product) => {
    if (p) { setEditing(p); setForm({ name: p.name, categoryId: p.categoryId, description: p.description, image: p.image, brandId: p.brandId }); }
    else { setEditing(null); setForm(emptyForm); }
    setOpen(true);
  };

  const handleSave = () => {
    if (!form.name || !form.categoryId || !form.brandId) return;
    if (editing) updateProduct({ ...editing, ...form });
    else addProduct({ id: generateId(), ...form });
    setOpen(false); reload();
  };

  const handleDelete = (id: string) => { deleteProduct(id); reload(); };
  const catName = (id: string) => categories.find(c => c.id === id)?.name || '-';
  const brandName = (id: string) => brands.find(b => b.id === id)?.name || '-';

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-display font-bold text-foreground">Productos</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpen()} className="gradient-accent text-accent-foreground hover:opacity-90"><Plus className="w-4 h-4 mr-2" /> Nuevo Producto</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader><DialogTitle className="font-display">{editing ? 'Editar' : 'Nuevo'} Producto</DialogTitle></DialogHeader>
            <div className="space-y-4 mt-4 max-h-[60vh] overflow-y-auto pr-2">
              <div><Label>Nombre</Label><Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="mt-1" /></div>
              <div>
                <Label>Categoría</Label>
                <Select value={form.categoryId} onValueChange={v => setForm({ ...form, categoryId: v })}>
                  <SelectTrigger className="mt-1"><SelectValue placeholder="Seleccionar" /></SelectTrigger>
                  <SelectContent>{categories.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label>Marca</Label>
                <Select value={form.brandId} onValueChange={v => setForm({ ...form, brandId: v })}>
                  <SelectTrigger className="mt-1"><SelectValue placeholder="Seleccionar" /></SelectTrigger>
                  <SelectContent>{brands.map(b => <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div><Label>Descripción</Label><Textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="mt-1" rows={3} /></div>
              <div><Label>Imagen (URL)</Label><Input value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} className="mt-1" placeholder="https://..." /></div>
              <Button onClick={handleSave} className="w-full gradient-accent text-accent-foreground hover:opacity-90">Guardar</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((p, i) => (
          <motion.div key={p.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-card rounded-xl shadow-card overflow-hidden group">
            <div className="h-40 overflow-hidden bg-muted">
              <img src={p.image || '/placeholder.svg'} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-foreground text-sm">{p.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">{catName(p.categoryId)} · {brandName(p.brandId)}</p>
              <div className="flex gap-1 mt-3">
                <Button variant="ghost" size="sm" onClick={() => handleOpen(p)}><Pencil className="w-3.5 h-3.5 mr-1" /> Editar</Button>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(p.id)} className="text-destructive hover:text-destructive"><Trash2 className="w-3.5 h-3.5 mr-1" /> Eliminar</Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminProducts;
