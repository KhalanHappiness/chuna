/**
 * GalleryAdmin.jsx
 * 
 * Drop-in replacement for your old Gallery admin page.
 * It manages the "which view is active" state so the
 * router doesn't need to change.
 */
import { useState } from 'react';
import AdminGallery from './AdminGallery';
import AdminAlbumDetail from './AdminAlbumDetail';

const GalleryAdmin = () => {
  const [openAlbum, setOpenAlbum] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => setRefreshKey((k) => k + 1);

  if (openAlbum) {
    return (
      <AdminAlbumDetail
        album={openAlbum}
        onBack={() => setOpenAlbum(null)}
        onRefresh={handleRefresh}
      />
    );
  }

  return (
    <AdminGallery
      key={refreshKey}
      onOpenAlbum={(album) => setOpenAlbum(album)}
    />
  );
};

export default GalleryAdmin;