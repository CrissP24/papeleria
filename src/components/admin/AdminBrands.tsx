import React, { useState, useEffect } from 'react';
import { Brand } from '@/types';
import { getBrands, addBrand, updateBrand, deleteBrand, generateId } from '@/services/storage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminBrands = () => {
  const [items, setItems] = useState<Brand[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Brand | null>(null);
  const [name, setName] = useState('');

  const reload = () => setItems(getBrands());
  useEffect(() => { reload(); }, []);

  const handleOpen = (item?: Brand) => {
    if (item) { setEditing(item); setName(item.name); }
    else { setEditing(null); setName(''); }
    setOpen(true);
  };

  const handleSave = () => {
    if (!name.trim()) return;
    if (editing) updateBrand({ ...editing, name });
    else addBrand({ id: generateId(), name });
    setOpen(false); reload();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-display font-bold text-foreground">Marcas</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpen()} className="gradient-accent text-accent-foreground hover:opacity-90"><Plus className="w-4 h-4 mr-2" /> Nueva Marca</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle className="font-display">{editing ? 'Editar' : 'Nueva'} Marca</DialogTitle></DialogHeader>
            <div className="space-y-4 mt-4">
              <div><Label>Nombre</Label><Input value={name} onChange={e => setName(e.target.value)} className="mt-1" /></div>
              <Button onClick={handleSave} className="w-full gradient-accent text-accent-foreground hover:opacity-90">Guardar</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="bg-card rounded-xl shadow-card overflow-hidden">
        {items.map((item, i) => (
          <motion.div key={item.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="flex items-center justify-between p-4 border-b last:border-0 hover:bg-muted/30">
            <span className="font-medium text-foreground text-sm">{item.name}</span>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" onClick={() => handleOpen(item)}><Pencil className="w-4 h-4" /></Button>
              <Button variant="ghost" size="icon" onClick={() => { deleteBrand(item.id); reload(); }} className="text-destructive hover:text-destructive"><Trash2 className="w-4 h-4" /></Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminBrands;
