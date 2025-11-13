import { Upload, X } from 'lucide-react';
import { useState } from 'react';

const FileUpload = ({ 
  label, 
  name, 
  value, 
  onChange, 
  accept = 'image/*',
  required = false,
  currentImage = null 
}) => {
  const [preview, setPreview] = useState(currentImage);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onChange(e);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearFile = () => {
    setPreview(null);
    onChange({ target: { name, files: [] } });
  };

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {preview ? (
        <div className="relative">
          <img 
            src={preview} 
            alt="Preview" 
            className="w-full h-48 object-cover rounded-lg border border-gray-300"
          />
          <button
            type="button"
            onClick={clearFile}
            className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary-500 hover:bg-primary-50 transition-colors">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-10 h-10 text-gray-400 mb-3" />
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>
          <input
            type="file"
            name={name}
            onChange={handleFileChange}
            accept={accept}
            className="hidden"
            required={required && !currentImage}
          />
        </label>
      )}
    </div>
  );
};

export default FileUpload;