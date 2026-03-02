import React, { useState, useEffect, useRef } from 'react';
import { Product } from '@/types';
import { getProducts, addProduct, updateProduct, deleteProduct, getCategories, getBrands, generateId } from '@/services/storage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Pencil, Trash2, Upload, ImageIcon, X } from 'lucide-react';
import { motion } from 'framer-motion';

const emptyForm = { name: '', categoryId: '', description: '', image: '', brandId: '' };

/** Comprime y redimensiona una imagen antes de guardarla como base64 */
const compressImage = (file: File, maxW = 800, maxH = 600, quality = 0.75): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Error al leer el archivo'));
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => reject(new Error('Error al cargar la imagen'));
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let { width: w, height: h } = img;
        if (w > maxW) { h = (h * maxW) / w; w = maxW; }
        if (h > maxH) { w = (w * maxH) / h; h = maxH; }
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });

const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [imageMode, setImageMode] = useState<'file' | 'url'>('file');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const categories = getCategories();
  const brands = getBrands();

  const reload = () => setProducts(getProducts());
  useEffect(() => { reload(); }, []);

  const handleOpen = (p?: Product) => {
    if (p) {
      setEditing(p);
      setForm({ name: p.name, categoryId: p.categoryId, description: p.description, image: p.image, brandId: p.brandId });
      setImageMode(p.image.startsWith('data:') || p.image.startsWith('/') ? 'file' : 'url');
    } else {
      setEditing(null);
      setForm(emptyForm);
      setImageMode('file');
    }
    setOpen(true);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const base64 = await compressImage(file);
      setForm(f => ({ ...f, image: base64 }));
    } catch {
      console.error('Error al procesar la imagen');
    }
  };

  const clearImage = () => {
    setForm(f => ({ ...f, image: '' }));
    if (fileInputRef.current) fileInputRef.current.value = '';
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

              {/* Imagen: subida de archivo o URL */}
              <div>
                <Label className="mb-2 block">Imagen del producto</Label>
                <div className="flex gap-2 mb-3">
                  <Button type="button" size="sm" variant={imageMode === 'file' ? 'default' : 'outline'} onClick={() => setImageMode('file')} className={imageMode === 'file' ? 'gradient-accent text-accent-foreground' : ''}>
                    <Upload className="w-3.5 h-3.5 mr-1" /> Subir archivo
                  </Button>
                  <Button type="button" size="sm" variant={imageMode === 'url' ? 'default' : 'outline'} onClick={() => setImageMode('url')} className={imageMode === 'url' ? 'gradient-accent text-accent-foreground' : ''}>
                    <ImageIcon className="w-3.5 h-3.5 mr-1" /> URL
                  </Button>
                </div>

                {imageMode === 'file' ? (
                  <div>
                    <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange}
                      className="block w-full text-sm text-muted-foreground file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 file:cursor-pointer file:transition-colors" />
                  </div>
                ) : (
                  <Input value={form.image.startsWith('data:') ? '' : form.image} onChange={e => setForm({ ...form, image: e.target.value })} placeholder="https://ejemplo.com/imagen.jpg" />
                )}

                {/* Preview */}
                {form.image && (
                  <div className="mt-3 relative inline-block">
                    <img src={form.image} alt="Vista previa" className="h-32 w-auto rounded-xl border border-border object-cover" onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                    <button type="button" onClick={clearImage} className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 shadow hover:opacity-80 transition-opacity">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>

              <Button onClick={handleSave} className="w-full gradient-accent text-accent-foreground hover:opacity-90">Guardar</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((p, i) => (
          <motion.div key={p.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-card rounded-2xl shadow-card overflow-hidden group border border-border/50 hover:shadow-card-hover transition-all duration-300">
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
