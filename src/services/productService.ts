// Service để làm việc với Products từ Supabase
import { supabase } from './supabase';
import { Product } from '../types';

// Lấy tất cả products
export const getProducts = async (): Promise<Product[]> => {
  if (!supabase) {
    try {
      const saved = localStorage.getItem('gerry_products');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  }

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }

  return data?.map(convertDbProductToProduct) || [];
};

// Lưu product mới
export const createProduct = async (product: Product): Promise<boolean> => {
  if (!supabase) {
    try {
      const existing = localStorage.getItem('gerry_products');
      const products = existing ? JSON.parse(existing) : [];
      products.push(product);
      localStorage.setItem('gerry_products', JSON.stringify(products));
      return true;
    } catch {
      return false;
    }
  }

  const dbProduct = convertProductToDbProduct(product);
  const { error } = await supabase
    .from('products')
    .insert(dbProduct);

  if (error) {
    console.error('Error creating product:', error);
    return false;
  }

  return true;
};

// Cập nhật product
export const updateProduct = async (product: Product): Promise<boolean> => {
  if (!supabase) {
    try {
      const existing = localStorage.getItem('gerry_products');
      const products = existing ? JSON.parse(existing) : [];
      const updated = products.map((p: Product) => p.id === product.id ? product : p);
      localStorage.setItem('gerry_products', JSON.stringify(updated));
      return true;
    } catch {
      return false;
    }
  }

  const dbProduct = convertProductToDbProduct(product);
  const { error } = await supabase
    .from('products')
    .update(dbProduct)
    .eq('id', product.id);

  if (error) {
    console.error('Error updating product:', error);
    return false;
  }

  return true;
};

// Xóa product
export const deleteProduct = async (id: string): Promise<boolean> => {
  if (!supabase) {
    try {
      const existing = localStorage.getItem('gerry_products');
      const products = existing ? JSON.parse(existing) : [];
      const filtered = products.filter((p: Product) => p.id !== id);
      localStorage.setItem('gerry_products', JSON.stringify(filtered));
      return true;
    } catch {
      return false;
    }
  }

  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting product:', error);
    return false;
  }

  return true;
};

// Lắng nghe thay đổi realtime
export const subscribeToProducts = (
  callback: (products: Product[]) => void
): (() => void) | null => {
  if (!supabase) return null;

  const channel = supabase
    .channel('products-changes')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'products' },
      async () => {
        const products = await getProducts();
        callback(products);
      }
    )
    .subscribe();

  return () => {
    if (supabase) {
      supabase.removeChannel(channel);
    }
  };
};

// Helper functions
function convertDbProductToProduct(dbProduct: any): Product {
  return {
    id: dbProduct.id,
    name: dbProduct.name,
    description: dbProduct.description,
    price: parseFloat(dbProduct.price),
    category: dbProduct.category,
    image: dbProduct.image,
    rating: dbProduct.rating || 0,
    reviewCount: dbProduct.review_count || 0,
    isAvailable: dbProduct.is_available !== false,
  };
}

function convertProductToDbProduct(product: Product): any {
  return {
    id: product.id,
    name: product.name,
    description: product.description || null,
    price: product.price,
    category: product.category,
    image: product.image || null,
    rating: product.rating || 0,
    review_count: product.reviewCount || 0,
    is_available: product.isAvailable !== false,
  };
}

