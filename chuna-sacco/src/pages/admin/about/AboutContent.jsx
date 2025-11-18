import { useState, useEffect } from 'react';
import { adminAPI } from '../../../api/axios';
import { Save, Info } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '../../../components/common/Button';
import Input from '../../../components/common/Input';
import FileUpload from '../../../components/common/FileUpload';

const AboutContent = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [sections, setSections] = useState({});
  
  const sectionKeys = [
    { key: 'brief', label: 'Brief About Us', description: 'Short introduction' },
    { key: 'mission', label: 'Mission', description: 'Organization mission statement' },
    { key: 'vision', label: 'Vision', description: 'Organization vision' },
    { key: 'csr', label: 'CSR', description: 'Corporate Social Responsibility' },
  ];

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await adminAPI.getAboutContent();
      const sectionsMap = {};
      response.data.forEach(section => {
        sectionsMap[section.section_key] = section;
      });
      setSections(sectionsMap);
    } catch (error) {
      toast.error('Failed to load content');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (sectionKey) => {
    setSaving(true);
    const section = sections[sectionKey] || {};
    
    const formData = new FormData();
    formData.append('title', section.title || '');
    formData.append('content', section.content || '');
    formData.append('video_url', section.video_url || '');
    formData.append('display_order', section.display_order || 0);
    
    if (section.newImage) {
      formData.append('image', section.newImage);
    }

    try {
      await adminAPI.updateAboutSection(sectionKey, formData);
      toast.success('Section updated successfully');
      fetchContent();
    } catch (error) {
      toast.error('Failed to update section');
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (sectionKey, field, value) => {
    setSections(prev => ({
      ...prev,
      [sectionKey]: {
        ...(prev[sectionKey] || {}),
        [field]: value
      }
    }));
  };

  const handleImageChange = (sectionKey, file) => {
    setSections(prev => ({
      ...prev,
      [sectionKey]: {
        ...(prev[sectionKey] || {}),
        newImage: file
      }
    }));
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
      <div>
        <h1 className="text-2xl font-bold text-gray-900">About Content</h1>
        <p className="text-gray-600 mt-1">Manage about page sections</p>
      </div>

      {/* Sections */}
      <div className="space-y-6">
        {sectionKeys.map(({ key, label, description }) => {
          const section = sections[key] || {};
          
          return (
            <div key={key} className="card">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Info className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">{label}</h2>
                    <p className="text-sm text-gray-500">{description}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {/* Title */}
                <Input
                  label="Title"
                  name="title"
                  value={section.title || ''}
                  onChange={(e) => handleInputChange(key, 'title', e.target.value)}
                  placeholder={`Enter ${label.toLowerCase()} title`}
                />

                {/* Content */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content
                  </label>
                  <textarea
                    value={section.content || ''}
                    onChange={(e) => handleInputChange(key, 'content', e.target.value)}
                    rows={6}
                    className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder={`Enter ${label.toLowerCase()} content`}
                  />
                </div>

                {/* Image */}
                <FileUpload
                  label="Image (Optional)"
                  name="image"
                  onChange={(e) => handleImageChange(key, e.target.files[0])}
                  accept="image/*"
                  currentImage={section.image_url ? `http://localhost:5000${section.image_url}` : null}
                />

                {/* Video URL */}
                <Input
                  label="Video URL (Optional)"
                  name="video_url"
                  value={section.video_url || ''}
                  onChange={(e) => handleInputChange(key, 'video_url', e.target.value)}
                  placeholder="https://youtube.com/..."
                />

                {/* Save Button */}
                <div className="pt-4 border-t">
                  <Button
                    onClick={() => handleSave(key)}
                    disabled={saving}
                    icon={Save}
                  >
                    {saving ? 'Saving...' : `Save ${label}`}
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AboutContent;