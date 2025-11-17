import { useState, useEffect } from 'react';
import { adminAPI } from '../../../api/axios';
import { Plus, Edit, Trash2, Eye, Calendar, User, Star } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '../../../components/common/Button';
import Modal from '../../../components/common/Modal';
import Input from '../../../components/common/Input';
import FileUpload from '../../../components/common/FileUpload';

const News = () => {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingNews, setEditingNews] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    excerpt: '',
    content: '',
    author: '',
    publish_date: new Date().toISOString().split('T')[0],
    is_featured: false,
    featured_image: null,
  });

  const categories = ['Events', 'News', 'Announcements', 'Products', 'Updates'];

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await adminAPI.getNews();
      setNewsList(response.data);
    } catch (error) {
      toast.error('Failed to load news');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (news = null) => {
    if (news) {
      setEditingNews(news);
      setFormData({
        title: news.title || '',
        category: news.category || '',
        excerpt: news.excerpt || '',
        content: news.content || '',
        author: news.author || '',
        publish_date: news.publish_date || new Date().toISOString().split('T')[0],
        is_featured: news.is_featured || false,
        featured_image: null,
      });
    } else {
      setEditingNews(null);
      setFormData({
        title: '',
        category: '',
        excerpt: '',
        content: '',
        author: '',
        publish_date: new Date().toISOString().split('T')[0],
        is_featured: false,
        featured_image: null,
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingNews(null);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
    } else if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append('title', formData.title);
    data.append('category', formData.category);
    data.append('excerpt', formData.excerpt);
    data.append('content', formData.content);
    data.append('author', formData.author);
    data.append('publish_date', formData.publish_date);
    data.append('is_featured', formData.is_featured);
    
    if (formData.featured_image) {
      data.append('featured_image', formData.featured_image);
    }

    try {
      if (editingNews) {
        await adminAPI.updateNews(editingNews.id, data);
        toast.success('News updated successfully');
      } else {
        await adminAPI.createNews(data);
        toast.success('News created successfully');
      }
      
      handleCloseModal();
      fetchNews();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this news article?')) {
      return;
    }

    try {
      await adminAPI.deleteNews(id);
      toast.success('News deleted successfully');
      fetchNews();
    } catch (error) {
      toast.error('Failed to delete news');
      console.error(error);
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">News & Updates</h1>
          <p className="text-gray-600 mt-1">Manage news articles and announcements</p>
        </div>
        <Button onClick={() => handleOpenModal()} icon={Plus}>
          Add News Article
        </Button>
      </div>

      {/* News List */}
      {newsList.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {newsList.map((news) => (
            <div key={news.id} className="card hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Featured Image */}
                <div className="md:w-64 flex-shrink-0">
                  {news.featured_image ? (
                    <img
                      src={`http://localhost:5000${news.featured_image}`}
                      alt={news.title}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                      <Eye className="w-12 h-12 text-gray-400" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1">
                  {/* Meta Info */}
                  <div className="flex items-center gap-4 mb-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                      {news.category}
                    </span>
                    {news.is_featured && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        <Star className="w-3 h-3 mr-1" />
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {news.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {news.excerpt}
                  </p>

                  {/* Author & Date */}
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {news.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(news.publish_date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    <Button
                      variant="secondary"
                      onClick={() => handleOpenModal(news)}
                      icon={Edit}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(news.id)}
                      icon={Trash2}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No news articles yet</h3>
          <p className="text-gray-600 mb-4">Get started by creating your first news article</p>
          <Button onClick={() => handleOpenModal()} icon={Plus}>
            Add News Article
          </Button>
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editingNews ? 'Edit News Article' : 'Add New News Article'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Featured Image */}
          <FileUpload
            label="Featured Image"
            name="featured_image"
            onChange={handleInputChange}
            accept="image/*"
            currentImage={editingNews?.featured_image ? `http://localhost:5000${editingNews.featured_image}` : null}
          />

          {/* Title */}
          <Input
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter news title"
            required
          />

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
              className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Author */}
          <Input
            label="Author"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
            placeholder="Enter author name"
            required
          />

          {/* Publish Date */}
          <Input
            label="Publish Date"
            name="publish_date"
            type="date"
            value={formData.publish_date}
            onChange={handleInputChange}
            required
          />

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Excerpt <span className="text-red-500">*</span>
            </label>
            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleInputChange}
              rows={3}
              required
              className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Brief summary of the article (150-200 characters)"
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.excerpt.length} characters
            </p>
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content <span className="text-red-500">*</span>
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              rows={10}
              required
              className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Full article content"
            />
          </div>

          {/* Is Featured */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="is_featured"
              name="is_featured"
              checked={formData.is_featured}
              onChange={handleInputChange}
              className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            />
            <label htmlFor="is_featured" className="ml-2 text-sm font-medium text-gray-700">
              Feature this article (show on homepage)
            </label>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t">
            <Button
              type="button"
              variant="secondary"
              onClick={handleCloseModal}
            >
              Cancel
            </Button>
            <Button type="submit">
              {editingNews ? 'Update Article' : 'Publish Article'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default News;