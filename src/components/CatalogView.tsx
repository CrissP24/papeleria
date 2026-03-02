import React, { useState, useMemo } from 'react';
import { getProducts, getCategories, getBrands } from '@/services/storage';
import { buildWhatsAppUrl } from '@/utils/whatsapp';
import { Search, Filter, MessageCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { motion } from 'framer-motion';
import { Product } from '@/types';

const CatalogView = () => {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const products = getProducts();
  const categories = getCategories();
  const brands = getBrands();

  const filtered = useMemo(() => {
    return products.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchCat = categoryFilter === 'all' || p.categoryId === categoryFilter;
      return matchSearch && matchCat;
    });
  }, [search, categoryFilter, products]);

  const catName = (id: string) => categories.find(c => c.id === id)?.name || '-';
  const brandName = (id: string) => brands.find(b => b.id === id)?.name || '-';

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Buscar productos..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-48"><Filter className="w-4 h-4 mr-2" /><SelectValue placeholder="Categoría" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las categorías</SelectItem>
            {categories.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filtered.map((p, i) => (
          <motion.div key={p.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
            className="bg-card rounded-2xl shadow-card overflow-hidden group cursor-pointer hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 border border-border/50"
            onClick={() => setSelectedProduct(p)}>
            <div className="h-44 overflow-hidden bg-muted">
              <img src={p.image || '/placeholder.svg'} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-foreground text-sm line-clamp-1">{p.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">{catName(p.categoryId)} · {brandName(p.brandId)}</p>
              <a href={buildWhatsAppUrl(p, categories, brands)} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
                className="mt-3 flex items-center justify-center gap-2 w-full py-2 rounded-xl text-xs font-semibold bg-success text-success-foreground hover:opacity-90 transition-opacity">
                <MessageCircle className="w-3.5 h-3.5" /> Consultar por WhatsApp
              </a>
            </div>
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full text-center py-12 text-muted-foreground">No se encontraron productos</div>
        )}
      </div>

      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="max-w-lg">
          {selectedProduct && (
            <>
              <DialogHeader><DialogTitle className="font-display">{selectedProduct.name}</DialogTitle></DialogHeader>
              <div className="mt-4">
                <div className="h-56 rounded-lg overflow-hidden bg-muted mb-4">
                  <img src={selectedProduct.image || '/placeholder.svg'} alt={selectedProduct.name} className="w-full h-full object-cover" />
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-foreground">{selectedProduct.description}</p>
                  <p className="text-xs text-muted-foreground"><strong>Categoría:</strong> {catName(selectedProduct.categoryId)}</p>
                  <p className="text-xs text-muted-foreground"><strong>Marca:</strong> {brandName(selectedProduct.brandId)}</p>
                </div>
                <a href={buildWhatsAppUrl(selectedProduct, categories, brands)} target="_blank" rel="noopener noreferrer"
                  className="mt-4 flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold bg-success text-success-foreground hover:opacity-90 transition-opacity">
                  <MessageCircle className="w-4 h-4" /> Consultar por WhatsApp
                </a>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CatalogView;
