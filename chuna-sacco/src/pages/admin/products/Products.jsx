import { useState, useEffect } from 'react';
import { adminAPI } from '../../../api/axios';
import { Plus, Edit, Trash2, Package, Star, List } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '../../../components/common/Button';
import Modal from '../../../components/common/Modal';
import Input from '../../../components/common/Input';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const [productForm, setProductForm] = useState({
    product_category_id: '',
    name: '',
    slug: '',
    max_amount: '',
    description: '',
    repayment_period: '',
    interest_rate: '',
    icon_class: 'fa-solid fa-wallet',
    is_popular: false,
    display_order: 0,
    is_active: true,
    features: [''],
  });

  const [categoryForm, setCategoryForm] = useState({
    name: '',
    slug: '',
    description: '',
    display_order: 0,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        adminAPI.getProducts(),
        adminAPI.getProductCategories(),
      ]);
      setProducts(productsRes.data);
      setCategories(categoriesRes.data);
    } catch (error) {
      toast.error('Failed to load data');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.product_category_id === parseInt(selectedCategory));

  // Product Handlers
  const handleOpenProductModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setProductForm({
        product_category_id: product.product_category_id || '',
        name: product.name || '',
        slug: product.slug || '',
        max_amount: product.max_amount || '',
        description: product.description || '',
        repayment_period: product.repayment_period || '',
        interest_rate: product.interest_rate || '',
        icon_class: product.icon_class || 'fa-solid fa-wallet',
        is_popular: product.is_popular || false,
        display_order: product.display_order || 0,
        is_active: product.is_active,
        features: product.features?.map(f => f.feature_text) || [''],
      });
    } else {
      setEditingProduct(null);
      setProductForm({
        product_category_id: '',
        name: '',
        slug: '',
        max_amount: '',
        description: '',
        repayment_period: '',
        interest_rate: '',
        icon_class: 'fa-solid fa-wallet',
        is_popular: false,
        display_order: 0,
        is_active: true,
        features: [''],
      });
    }
    setShowModal(true);
  };

  const handleProductInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setProductForm({ ...productForm, [name]: checked });
    } else {
      setProductForm({ ...productForm, [name]: value });
      
      // Auto-generate slug
      if (name === 'name' && !editingProduct) {
        const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        setProductForm(prev => ({ ...prev, slug }));
      }
    }
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...productForm.features];
    newFeatures[index] = value;
    setProductForm({ ...productForm, features: newFeatures });
  };

  const addFeature = () => {
    setProductForm({ ...productForm, features: [...productForm.features, ''] });
  };

  const removeFeature = (index) => {
    const newFeatures = productForm.features.filter((_, i) => i !== index);
    setProductForm({ ...productForm, features: newFeatures });
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();

    const data = {
      ...productForm,
      features: productForm.features.filter(f => f.trim() !== ''),
    };

    try {
      if (editingProduct) {
        await adminAPI.updateProduct(editingProduct.id, data);
        toast.success('Product updated successfully');
      } else {
        await adminAPI.createProduct(data);
        toast.success('Product created successfully');
      }
      
      setShowModal(false);
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
      console.error(error);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      await adminAPI.deleteProduct(id);
      toast.success('Product deleted successfully');
      fetchData();
    } catch (error) {
      toast.error('Failed to delete product');
    }
  };

  // Category Handlers
  const handleOpenCategoryModal = (category = null) => {
    if (category) {
      setEditingCategory(category);
      setCategoryForm({
        name: category.name || '',
        slug: category.slug || '',
        description: category.description || '',
        display_order: category.display_order || 0,
      });
    } else {
      setEditingCategory(null);
      setCategoryForm({
        name: '',
        slug: '',
        description: '',
        display_order: 0,
      });
    }
    setShowCategoryModal(true);
  };

  const handleCategoryInputChange = (e) => {
    const { name, value } = e.target;
    setCategoryForm({ ...categoryForm, [name]: value });
    
    if (name === 'name' && !editingCategory) {
      const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      setCategoryForm(prev => ({ ...prev, slug }));
    }
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingCategory) {
        await adminAPI.updateProductCategory(editingCategory.id, categoryForm);
        toast.success('Category updated successfully');
      } else {
        await adminAPI.createProductCategory(categoryForm);
        toast.success('Category created successfully');
      }
      
      setShowCategoryModal(false);
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm('Are you sure? This will fail if products exist in this category.')) return;

    try {
      await adminAPI.deleteProductCategory(id);
      toast.success('Category deleted successfully');
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete category');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600 mt-1">Manage loan and savings products</p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={() => handleOpenCategoryModal()} icon={List}>
            Manage Categories
          </Button>
          <Button onClick={() => handleOpenProductModal()} icon={Plus}>
            Add Product
          </Button>
        </div>
      </div>

      {/* Categories Filter */}
      <div className="card">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedCategory === 'all'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Products ({products.length})
          </button>
          {categories.map((cat) => {
            const count = products.filter(p => p.product_category_id === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id.toString())}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === cat.id.toString()
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="card hover:shadow-lg transition-shadow">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-primary-600" />
                </div>
                <div className="flex gap-2">
                  {product.is_popular && (
                    <span className="flex items-center px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                      <Star className="w-3 h-3 mr-1" />
                      Popular
                    </span>
                  )}
                  {product.is_active ? (
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                      Active
                    </span>
                  ) : (
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">
                      Inactive
                    </span>
                  )}
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-3 mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                
                {product.category && (
                  <span className="inline-block px-2 py-1 bg-primary-50 text-primary-700 text-xs font-medium rounded">
                    {product.category.name}
                  </span>
                )}

                <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>

                <div className="space-y-2 text-sm">
                  {product.max_amount && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Max Amount:</span>
                      <span className="font-medium">{product.max_amount}</span>
                    </div>
                  )}
                  {product.interest_rate && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Interest Rate:</span>
                      <span className="font-medium">{product.interest_rate}</span>
                    </div>
                  )}
                  {product.repayment_period && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Repayment:</span>
                      <span className="font-medium">{product.repayment_period}</span>
                    </div>
                  )}
                </div>

                {/* Features */}
                {product.features && product.features.length > 0 && (
                  <div className="pt-3 border-t">
                    <p className="text-xs text-gray-500 mb-2">Features:</p>
                    <ul className="space-y-1">
                      {product.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="text-xs text-gray-600 flex items-start">
                          <span className="text-primary-600 mr-1">✓</span>
                          <span className="line-clamp-1">{feature.feature_text}</span>
                        </li>
                      ))}
                      {product.features.length > 3 && (
                        <li className="text-xs text-gray-500">+{product.features.length - 3} more</li>
                      )}
                    </ul>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-4 border-t">
                <Button
                  variant="secondary"
                  onClick={() => handleOpenProductModal(product)}
                  className="flex-1 text-sm"
                  icon={Edit}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteProduct(product.id)}
                  icon={Trash2}
                  className="text-sm"
                >
                  <span className="sr-only">Delete</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card text-center py-12">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products yet</h3>
          <p className="text-gray-600 mb-4">Create your first product to get started</p>
          <Button onClick={() => handleOpenProductModal()} icon={Plus}>
            Add Product
          </Button>
        </div>
      )}

      {/* Product Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingProduct ? 'Edit Product' : 'Add New Product'}
        size="lg"
      >
        <form onSubmit={handleProductSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {/* Category */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="product_category_id"
                value={productForm.product_category_id}
                onChange={handleProductInputChange}
                required
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              >
                <option value="">Select category</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            {/* Name */}
            <div className="col-span-2">
              <Input
                label="Product Name"
                name="name"
                value={productForm.name}
                onChange={handleProductInputChange}
                required
              />
            </div>

            {/* Slug */}
            <div className="col-span-2">
              <Input
                label="Slug"
                name="slug"
                value={productForm.slug}
                onChange={handleProductInputChange}
                required
              />
            </div>

            {/* Max Amount */}
            <Input
              label="Max Amount"
              name="max_amount"
              value={productForm.max_amount}
              onChange={handleProductInputChange}
              placeholder="Ksh 1,000,000"
            />

            {/* Interest Rate */}
            <Input
              label="Interest Rate"
              name="interest_rate"
              value={productForm.interest_rate}
              onChange={handleProductInputChange}
              placeholder="8%"
            />

            {/* Repayment Period */}
            <Input
              label="Repayment Period"
              name="repayment_period"
              value={productForm.repayment_period}
              onChange={handleProductInputChange}
              placeholder="12 months"
            />

            {/* Display Order */}
            <Input
              label="Display Order"
              name="display_order"
              type="number"
              value={productForm.display_order}
              onChange={handleProductInputChange}
            />

            {/* Description */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={productForm.description}
                onChange={handleProductInputChange}
                rows={3}
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          {/* Features */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Features
            </label>
            {productForm.features.map((feature, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={feature}
                  onChange={(e) => handleFeatureChange(index, e.target.value)}
                  placeholder="e.g., Quick approval process"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
                {productForm.features.length > 1 && (
                  <Button
                    type="button"
                    variant="danger"
                    onClick={() => removeFeature(index)}
                  >
                    Remove
                  </Button>
                )}
              </div>
            ))}
            <Button type="button" variant="secondary" onClick={addFeature} className="mt-2">
              + Add Feature
            </Button>
          </div>

          {/* Checkboxes */}
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="is_popular"
                name="is_popular"
                checked={productForm.is_popular}
                onChange={handleProductInputChange}
                className="w-4 h-4 text-primary-600 border-gray-300 rounded"
              />
              <label htmlFor="is_popular" className="ml-2 text-sm font-medium text-gray-700">
                Mark as popular
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="is_active"
                name="is_active"
                checked={productForm.is_active}
                onChange={handleProductInputChange}
                className="w-4 h-4 text-primary-600 border-gray-300 rounded"
              />
              <label htmlFor="is_active" className="ml-2 text-sm font-medium text-gray-700">
                Active
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {editingProduct ? 'Update' : 'Create'} Product
            </Button>
          </div>
        </form>
      </Modal>

      {/* Category Management Modal */}
      <Modal
        isOpen={showCategoryModal}
        onClose={() => setShowCategoryModal(false)}
        title="Manage Product Categories"
        size="lg"
      >
        <div className="space-y-6">
          {/* Add/Edit Category Form */}
          <form onSubmit={handleCategorySubmit} className="space-y-4 pb-4 border-b">
            <Input
              label="Category Name"
              name="name"
              value={categoryForm.name}
              onChange={handleCategoryInputChange}
              required
            />
            <Input
              label="Slug"
              name="slug"
              value={categoryForm.slug}
              onChange={handleCategoryInputChange}
              required
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                name="description"
                value={categoryForm.description}
                onChange={handleCategoryInputChange}
                rows={2}
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <Button type="submit">
              {editingCategory ? 'Update' : 'Add'} Category
            </Button>
          </form>

          {/* Categories List */}
          <div>
            <h3 className="font-semibold mb-3">Existing Categories</h3>
            <div className="space-y-2">
              {categories.map((cat) => (
                <div key={cat.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{cat.name}</p>
                    <p className="text-sm text-gray-500">{cat.product_count} products</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="secondary"
                      onClick={() => handleOpenCategoryModal(cat)}
                      icon={Edit}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteCategory(cat.id)}
                      icon={Trash2}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Products;