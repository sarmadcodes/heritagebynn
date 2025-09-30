import { useEffect, useState } from 'react';
import api from '../utils/api';

interface Product {
  _id: string;
  name: string;
  price: number;
  stock: number;
  imageUrl?: string;
}

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products');
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products');
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('stock', stock);
    if (image) formData.append('image', image);

    try {
      const response = await api.post('/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setProducts([...products, response.data]);
      setName('');
      setPrice('');
      setStock('');
      setImage(null);
    } catch (err) {
      setError('Failed to upload product');
    }
  };

  const updateStock = async (productId: string, newStock: number) => {
    try {
      await api.put(`/products/${productId}`, { stock: newStock });
      setProducts(products.map(p => (p._id === productId ? { ...p, stock: newStock } : p)));
    } catch (err) {
      setError('Failed to update stock');
    }
  };

  const deleteProduct = async (productId: string) => {
    try {
      await api.delete(`/products/${productId}`);
      setProducts(products.filter(p => p._id !== productId));
    } catch (err) {
      setError('Failed to delete product');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Manage Products</h2>
      <form onSubmit={handleUpload} className="mb-6 flex flex-col gap-2">
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Product Name"
          className="border p-2"
        />
        <input
          type="number"
          value={price}
          onChange={e => setPrice(e.target.value)}
          placeholder="Price"
          className="border p-2"
        />
        <input
          type="number"
          value={stock}
          onChange={e => setStock(e.target.value)}
          placeholder="Stock"
          className="border p-2"
        />
        <input
          type="file"
          onChange={e => setImage(e.target.files ? e.target.files[0] : null)}
          className="border p-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2">
          Upload Product
        </button>
      </form>
      <h3 className="text-lg font-semibold mb-2">Products</h3>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Name</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Stock</th>
            <th className="border p-2">Image</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product._id}>
              <td className="border p-2">{product.name}</td>
              <td className="border p-2">${product.price.toFixed(2)}</td>
              <td className="border p-2">
                <input
                  type="number"
                  value={product.stock}
                  onChange={e => updateStock(product._id, parseInt(e.target.value))}
                  className="border p-1 w-20"
                />
              </td>
              <td className="border p-2">
                {product.imageUrl ? (
                  <img src={product.imageUrl} alt={product.name} className="w-16 h-16 object-cover" />
                ) : (
                  'No Image'
                )}
              </td>
              <td className="border p-2">
                <button
                  onClick={() => deleteProduct(product._id)}
                  className="bg-red-500 text-white p-1"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsPage;
