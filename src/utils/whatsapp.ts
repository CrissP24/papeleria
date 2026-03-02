import { Product, Category, Brand } from '@/types';

export function buildWhatsAppUrl(product: Product, categories: Category[], brands: Brand[]): string {
  const category = categories.find(c => c.id === product.categoryId)?.name || 'Sin categoría';
  const brand = brands.find(b => b.id === product.brandId)?.name || 'Sin marca';
  const message = `Hola, estoy interesada/o en el producto: ${product.name}.\nCategoría: ${category}.\nMarca: ${brand}.\n¿Podrían brindarme más información?`;
  return `https://wa.me/5493584015546?text=${encodeURIComponent(message)}`;
}
