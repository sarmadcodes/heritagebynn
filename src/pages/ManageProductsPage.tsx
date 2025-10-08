import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, RefreshCw, Download, ChevronLeft, ChevronRight, Trash2, Edit2, Package, AlertCircle, Star, DollarSign } from 'lucide-react';
import api from '../utils/api';

interface Product {
  _id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  description: string;
  fabric: string;
  sizes: string[];
  colors: string[];
  occasion: string;
  careInstructions: string;
  images: string[];
  isNew: boolean;
  isFeatured: boolean;
}

export default function ManageProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const productsPerPage = 10;

  // Form states
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [fabric, setFabric] = useState('');
  const [sizes, setSizes] = useState('');
  const [colors, setColors] = useState('');
  const [occasion, setOccasion] = useState('');
  const [careInstructions, setCareInstructions] = useState('');
  const [isNew, setIsNew] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'PKR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/products');
      console.log('Products from API:', response.data);
      setProducts(response.data.sort((a: Product, b: Product) => a.name.localeCompare(b.name)));
    } catch (err: any) {
      console.error('Fetch products error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Failed to fetch products.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages(files);
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleUploadOrUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price); // Price as string from input
    formData.append('stock', stock);
    formData.append('category', category);
    formData.append('description', description);
    formData.append('fabric', fabric);
    formData.append('sizes', sizes);
    formData.append('colors', colors);
    formData.append('occasion', occasion);
    formData.append('careInstructions', careInstructions);
    formData.append('isNew', isNew ? 'true' : 'false');
    formData.append('isFeatured', isFeatured ? 'true' : 'false');
    images.forEach((image) => formData.append('images', image));

    try {
      if (editingProductId) {
        const response = await api.put(`/products/${editingProductId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setProducts(products.map(product =>
          product._id === editingProductId ? response.data : product
        ).sort((a, b) => a.name.localeCompare(b.name)));
        setEditingProductId(null);
      } else {
        const response = await api.post('/products', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setProducts([...products, response.data].sort((a, b) => a.name.localeCompare(b.name)));
      }
      resetForm();
    } catch (err: any) {
      console.error('Product operation error:', err.response?.data || err.message);
      setError(err.response?.data?.message || `Failed to ${editingProductId ? 'update' : 'upload'} product.`);
    }
  };

  const resetForm = () => {
    setName('');
    setPrice('');
    setStock('');
    setCategory('');
    setDescription('');
    setFabric('');
    setSizes('');
    setColors('');
    setOccasion('');
    setCareInstructions('');
    setIsNew(false);
    setIsFeatured(false);
    setImages([]);
    setImagePreviews([]);
    setEditingProductId(null);
  };

  const updateStock = async (productId: string, newStock: number) => {
    try {
      const response = await api.put(`/products/${productId}`, { stock: newStock });
      console.log('Product updated:', response.data);
      setProducts(products.map(product => (product._id === productId ? { ...product, stock: newStock } : product)));
    } catch (err: any) {
      console.error('Update product error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Failed to update stock.');
    }
  };

  const deleteProduct = async (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await api.delete(`/products/${productId}`);
        setProducts(products.filter(product => product._id !== productId));
        if (expandedProduct === productId) {
          setExpandedProduct(null);
        }
        if (editingProductId === productId) {
          resetForm();
        }
      } catch (err: any) {
        console.error('Delete product error:', err.response?.data || err.message);
        setError(err.response?.data?.message || 'Failed to delete product.');
      }
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProductId(product._id);
    setName(product.name);
    setPrice(product.price.toString());
    setStock(product.stock.toString());
    setCategory(product.category);
    setDescription(product.description);
    setFabric(product.fabric);
    setSizes(product.sizes.join(','));
    setColors(product.colors.join(','));
    setOccasion(product.occasion);
    setCareInstructions(product.careInstructions);
    setIsNew(product.isNew);
    setIsFeatured(product.isFeatured);
    setImages([]);
    setImagePreviews([]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const exportToCSV = () => {
    const headers = ['Product ID', 'Name', 'Category', 'Price', 'Stock', 'Fabric', 'Sizes', 'Colors', 'Occasion', 'Description', 'Care Instructions', 'Is New', 'Is Featured', 'Images'];
    const rows = products.map(product => [
      product._id,
      product.name,
      product.category,
      formatPrice(product.price),
      product.stock,
      product.fabric,
      product.sizes.join(','),
      product.colors.join(','),
      product.occasion,
      product.description,
      product.careInstructions,
      product.isNew ? 'Yes' : 'No',
      product.isFeatured ? 'Yes' : 'No',
      product.images.join(',')
    ]);
    const csv = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'products.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getProductStats = () => {
    const stats = {
      total: products.length,
      lowStock: products.filter(p => p.stock < 10).length,
      featured: products.filter(p => p.isFeatured).length,
      totalValue: products.reduce((total, product) => {
        const itemValue = (product.price / 10) * product.stock; // Temporary fix: Divide price by 10
        console.log(`Product: ${product.name}, Price: ${product.price}, Stock: ${product.stock}, Item Value: ${itemValue}`); // Debug log
        return total + itemValue;
      }, 0),
    };
    console.log('Product Stats:', stats); // Debug log
    return stats;
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-16 text-center">
        <div className="flex justify-center items-center space-x-2">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2" style={{ borderColor: '#3E0309' }}></div>
          <span className="text-gray-600">Loading products...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-16 text-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg max-w-lg mx-auto mb-4">
          <p>{error}</p>
        </div>
        <Link
          to="/admin"
          className="inline-flex items-center space-x-2 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
          style={{ backgroundColor: '#3E0309' }}
        >
          <ArrowLeft size={20} />
          <span>Back to Admin</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header and Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
          <h1 className="text-3xl font-serif" style={{ color: '#3E0309' }}>
            Manage Products
          </h1>
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <input
              type="text"
              placeholder="Search by Name or Category"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-[#3E0309]"
            />
            <button
              onClick={fetchProducts}
              className="flex items-center space-x-2 text-white px-4 py-2 rounded-lg hover:opacity-80 transition-opacity"
              style={{ backgroundColor: '#3E0309' }}
            >
              <RefreshCw size={20} />
              <span>Refresh</span>
            </button>
            <button
              onClick={exportToCSV}
              className="flex items-center space-x-2 text-white px-4 py-2 rounded-lg hover:opacity-80 transition-opacity"
              style={{ backgroundColor: '#3E0309' }}
            >
              <Download size={20} />
              <span>Export CSV</span>
            </button>
            <Link
              to="/admin"
              className="flex items-center space-x-2 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
              style={{ backgroundColor: '#3E0309' }}
            >
              <ArrowLeft size={20} />
              <span>Back to Admin</span>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Total Products</p>
                <p className="text-lg sm:text-xl font-bold text-gray-800">{getProductStats().total}</p>
              </div>
              <Package className="text-[#3E0309]" size={24} />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Low Stock</p>
                <p className="text-lg sm:text-xl font-bold text-red-600">{getProductStats().lowStock}</p>
              </div>
              <AlertCircle className="text-red-500" size={24} />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Featured Products</p>
                <p className="text-lg sm:text-xl font-bold text-blue-600">{getProductStats().featured}</p>
              </div>
              <Star className="text-blue-500" size={24} />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Total Value</p>
                <p className="text-lg sm:text-xl font-bold text-gray-800">{formatPrice(getProductStats().totalValue)}</p>
              </div>
              <DollarSign className="text-[#3E0309]" size={24} />
            </div>
          </div>
        </div>

        {/* Add/Edit Product Form */}
        <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 mb-8">
          <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-700">
            {editingProductId ? 'Edit Product' : 'Add New Product'}
          </h3>
          <form onSubmit={handleUploadOrUpdate} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Product Name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Enter product name"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E0309]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Price (PKR)</label>
              <input
                type="number"
                value={price}
                onChange={e => setPrice(e.target.value)}
                placeholder="Enter price"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E0309]"
                required
                min="0"
                step="1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Stock</label>
              <input
                type="number"
                value={stock}
                onChange={e => setStock(e.target.value)}
                placeholder="Enter stock quantity"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E0309]"
                required
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Category</label>
              <input
                type="text"
                value={category}
                onChange={e => setCategory(e.target.value)}
                placeholder="Enter category"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E0309]"
                required
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-600 mb-1">Description</label>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Enter product description"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E0309]"
                rows={4}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Fabric</label>
              <input
                type="text"
                value={fabric}
                onChange={e => setFabric(e.target.value)}
                placeholder="Enter fabric type"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E0309]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Sizes (comma separated)</label>
              <input
                type="text"
                value={sizes}
                onChange={e => setSizes(e.target.value)}
                placeholder="e.g., S,M,L,XL"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E0309]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Colors (comma separated)</label>
              <input
                type="text"
                value={colors}
                onChange={e => setColors(e.target.value)}
                placeholder="e.g., Red,Blue,Green"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E0309]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Occasion</label>
              <input
                type="text"
                value={occasion}
                onChange={e => setOccasion(e.target.value)}
                placeholder="Enter occasion"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E0309]"
                required
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-600 mb-1">Care Instructions</label>
              <textarea
                value={careInstructions}
                onChange={e => setCareInstructions(e.target.value)}
                placeholder="Enter care instructions"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E0309]"
                rows={4}
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={isNew}
                  onChange={e => setIsNew(e.target.checked)}
                  className="h-4 w-4 text-[#3E0309] focus:ring-[#3E0309] border-gray-300 rounded"
                />
                <span className="text-sm text-gray-600">Is New</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={e => setIsFeatured(e.target.checked)}
                  className="h-4 w-4 text-[#3E0309] focus:ring-[#3E0309] border-gray-300 rounded"
                />
                <span className="text-sm text-gray-600">Is Featured</span>
              </label>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-600 mb-1">Product Images</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="w-full p-3 border rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#3E030950] file:text-[#3E0309] hover:file:bg-[#3E030980]"
              />
              {imagePreviews.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {imagePreviews.map((preview, index) => (
                    <img
                      key={index}
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  ))}
                </div>
              )}
            </div>
            <div className="sm:col-span-2 flex gap-4">
              <button
                type="submit"
                className="w-full sm:w-auto text-white px-6 py-3 rounded-lg hover:opacity-80 transition-opacity"
                style={{ backgroundColor: '#3E0309' }}
              >
                {editingProductId ? 'Update Product' : 'Upload Product'}
              </button>
              {editingProductId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="w-full sm:w-auto text-white px-6 py-3 rounded-lg hover:opacity-80 transition-opacity bg-gray-500"
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Desktop Table Layout */}
        <div className="hidden md:block overflow-x-auto bg-white rounded-lg shadow-sm mb-8">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedProducts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-4 text-center text-gray-600">No products found.</td>
                </tr>
              ) : (
                paginatedProducts.map(product => (
                  <tr
                    key={product._id}
                    className="cursor-pointer hover:bg-gray-50"
                  >
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product._id.slice(-6)}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{product.name}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{formatPrice(product.price)}</td>
                    <td className="px-4 py-4 text-sm text-gray-500">
                      <input
                        type="number"
                        value={product.stock}
                        onChange={e => updateStock(product._id, parseInt(e.target.value) || 0)}
                        className="w-20 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E0309]"
                        min="0"
                      />
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500">
                      {product.images[0] ? (
                        <img
                          src={`http://localhost:5002${product.images[0]}`}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-lg"
                          onError={(e) => {
                            console.error(`Failed to load image: http://localhost:5002${product.images[0]}`);
                            e.currentTarget.src = '/fallback-image.jpg'; // Optional fallback
                          }}
                        />
                      ) : (
                        <span className="text-gray-500">No Image</span>
                      )}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(product);
                          }}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"
                          title="Edit Product"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteProduct(product._id);
                          }}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"
                          title="Delete Product"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Card Layout */}
        <div className="md:hidden space-y-4">
          {paginatedProducts.length === 0 ? (
            <div className="text-center text-gray-600 py-4">No products found.</div>
          ) : (
            paginatedProducts.map(product => (
              <div
                key={product._id}
                className="bg-white rounded-lg shadow-sm p-4"
                onClick={() => setExpandedProduct(expandedProduct === product._id ? null : product._id)}
              >
                <div className="flex justify-between items-center">
                  <div className="text-sm font-medium text-gray-900">{product.name}</div>
                  <div className="text-sm text-gray-500">{product.category}</div>
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  <div><strong>Price:</strong> {formatPrice(product.price)}</div>
                  <div><strong>Stock:</strong> {product.stock}</div>
                </div>
                {expandedProduct === product._id && (
                  <div className="mt-4 text-sm text-gray-500">
                    <div><strong>Fabric:</strong> {product.fabric}</div>
                    <div><strong>Sizes:</strong> {product.sizes.join(', ')}</div>
                    <div><strong>Colors:</strong> {product.colors.join(', ')}</div>
                    <div><strong>Occasion:</strong> {product.occasion}</div>
                    <div><strong>Description:</strong> {product.description}</div>
                    <div><strong>Care Instructions:</strong> {product.careInstructions}</div>
                    <div><strong>Is New:</strong> {product.isNew ? 'Yes' : 'No'}</div>
                    <div><strong>Is Featured:</strong> {product.isFeatured ? 'Yes' : 'No'}</div>
                    <div className="mt-2">
                      <strong>Images:</strong>
                      <div className="flex flex-wrap gap-2">
                        {product.images.map((img, index) => (
                          <img
                            key={index}
                            src={`http://localhost:5002${img}`}
                            alt={`${product.name} ${index + 1}`}
                            className="w-16 h-16 object-cover rounded-lg"
                            onError={(e) => {
                              console.error(`Failed to load image: http://localhost:5002${img}`);
                              e.currentTarget.src = '/fallback-image.jpg'; // Optional fallback
                            }}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="mt-2">
                      <strong>Update Stock:</strong>
                      <input
                        type="number"
                        value={product.stock}
                        onChange={e => {
                          e.stopPropagation();
                          updateStock(product._id, parseInt(e.target.value) || 0);
                        }}
                        className="mt-1 p-2 border border-gray-300 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-[#3E0309]"
                        min="0"
                      />
                    </div>
                    <div className="mt-2 flex flex-col gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(product);
                        }}
                        className="flex items-center space-x-2 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-opacity"
                      >
                        <Edit2 size={16} />
                        <span>Edit Product</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteProduct(product._id);
                        }}
                        className="flex items-center space-x-2 text-red-600 px-4 py-2 rounded-lg hover:bg-red-50 transition-opacity"
                      >
                        <Trash2 size={16} />
                        <span>Delete Product</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-4 mt-6">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg disabled:opacity-50"
              style={{ backgroundColor: currentPage === 1 ? '#e5e7eb' : '#3E0309', color: 'white' }}
            >
              <ChevronLeft size={20} />
            </button>
            <span className="text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg disabled:opacity-50"
              style={{ backgroundColor: currentPage === totalPages ? '#e5e7eb' : '#3E0309', color: 'white' }}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}